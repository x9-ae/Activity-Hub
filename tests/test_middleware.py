from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route
from starlette.testclient import TestClient
from activity_hub import ActivityHub, ActivityMiddleware, ActivityReader, set_actor, forwarded_headers
from conftest import needs_clickhouse, count

SOURCE = {"app": "x9-platform", "environment": "test", "service": "trading_service"}


def build_app(hub):
    async def close_position(request):
        set_actor("account", "100234", actor_name="Ann", tenant_id="3", session_id="s1")
        hub.record_event("trade.closed", target_type="trade", target_id=request.path_params["ticket"])
        return JSONResponse({"forward": forwarded_headers()})

    async def health(request):
        return JSONResponse({"status": "ok"})

    async def save_integration(request):
        return JSONResponse({"saved": (await request.json())["name"]})

    app = Starlette(routes=[Route("/positions/{ticket}/close", close_position, methods=["POST"]),
                            Route("/healthz", health),
                            Route("/integrations/save", save_integration, methods=["POST"])])
    app.add_middleware(
        ActivityMiddleware, hub=hub,
        skip_request=lambda headers: headers.get("x-internal") == "skip",
        trust_forwarded=lambda headers: headers.get("x-service-key") == "secret",
    )
    return app


@needs_clickhouse
def test_requests_carry_who_and_where_into_events_and_the_access_log(settings, tmp_path):
    hub = ActivityHub(settings, spool_dir=str(tmp_path), **SOURCE)
    client = TestClient(build_app(hub))

    response = client.post("/positions/11450/close", headers={
        "cf-connecting-ip": "203.0.113.7", "cf-ipcountry": "AE", "x-client-origin": "web", "user-agent": "ua/1",
    })
    request_id = response.headers["x-request-id"]
    assert response.json()["forward"]["x-actor-id"] == "100234"
    client.get("/healthz")
    client.post("/positions/1/close", headers={"x-internal": "skip"})
    hub.flush()

    assert count(settings, "SELECT count() FROM events WHERE target_id = '11450' AND actor_id = '100234' "
                           "AND ip = '203.0.113.7' AND country = 'AE' AND origin = 'web' AND tenant_id = '3' "
                           "AND session_id = 's1' AND request_id = {rid:String}", rid=request_id) == 1
    assert count(settings, "SELECT count() FROM access_logs WHERE route = '/positions/{ticket}/close' "
                           "AND path = '/positions/11450/close' AND status = 200 AND actor_id = '100234' AND actor_name = 'Ann' "
                           "AND request_id = {rid:String}", rid=request_id) == 1
    assert count(settings, "SELECT count() FROM access_logs") == 1, "health checks and skipped calls are not logged"
    hub.close()


@needs_clickhouse
def test_a_change_keeps_what_was_sent_with_secrets_masked_and_the_app_still_reads_the_body(settings, tmp_path):
    hub = ActivityHub(settings, spool_dir=str(tmp_path), **SOURCE)
    # the app fails on the invalid body (a 500 here); its request is still logged
    client = TestClient(build_app(hub), raise_server_exceptions=False)
    response = client.post("/integrations/save", json={"name": "FIX", "config": {"host": "h", "password": "p"}})
    client.post("/integrations/save", content=b"not json", headers={"content-type": "application/json"})
    client.post("/integrations/save", json={"name": "x" * 40_000})
    hub.flush()
    assert response.json() == {"saved": "FIX"}

    rows = ActivityReader(settings).search_access_logs(route="/integrations/save")["items"]
    bodies = [row["request_body"] for row in reversed(rows)]
    assert bodies[0] == {"name": "FIX", "config": {"host": "h", "password": "[masked]"}}
    assert bodies[1] == {"not_kept": "body is not valid JSON"}
    assert "not_kept" in bodies[2]
    hub.close()


@needs_clickhouse
def test_forwarded_actor_is_believed_only_from_trusted_callers(settings, tmp_path):
    hub = ActivityHub(settings, spool_dir=str(tmp_path), **SOURCE)
    client = TestClient(build_app(hub))
    forwarded = {"x-actor-type": "staff", "x-actor-id": "12", "x-client-ip": "198.51.100.1", "x-request-id": "r-1"}

    client.post("/positions/5/close", headers={**forwarded, "x-service-key": "wrong"})
    client.post("/positions/6/close", headers={**forwarded, "x-service-key": "secret"})
    hub.flush()

    assert count(settings, "SELECT count() FROM access_logs WHERE path = '/positions/5/close' AND ip = '198.51.100.1'") == 0
    assert count(settings, "SELECT count() FROM access_logs WHERE path = '/positions/6/close' AND ip = '198.51.100.1' "
                           "AND request_id = 'r-1'") == 1
    hub.close()
