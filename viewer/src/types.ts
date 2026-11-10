/** Calls the application's activity routes (activity_hub.api), e.g. "search" with a JSON body. The
 * application adds its own sign-in and base path, and rejects with an Error whose message a person
 * can read. */
export type ActivityRequest = (path: string, init: { method: "GET" | "POST" | "DELETE"; body?: unknown }) => Promise<any>

export type Kind = "events" | "requests"
export type View = "important" | "all" | "problems"
export type Outcome = "success" | "refused" | "failed"
export type Importance = "high" | "normal" | "low"

export type Change = { field: string; label: string; before: string | null; after: string | null }
export type Detail = { field: string; label: string; value: string }

export type ActivityEvent = {
  id: string
  occurred_at: string
  received_at: string
  app: string
  environment: string
  service: string
  tenant_id: string
  action: string
  category: string
  outcome: Outcome
  reason: string
  actor_type: string
  actor_id: string
  actor_name: string
  target_type: string
  target_id: string
  target_name: string
  related: [string, string][]
  origin: string
  ip: string
  country: string
  user_agent: string
  request_id: string
  session_id: string
  changes: Record<string, unknown> | null
  metadata: Record<string, unknown> | null
  imported: boolean
  // what a person reads, from the application's catalog
  title: string
  summary: string
  importance: Importance
  actor: string
  actor_label: string
  device: string | null
  change_list: Change[] | null
  /** with a view: the row changes the same request made */
  children?: ActivityEvent[]
  /** how many row changes the request made; children holds the first of them */
  children_count?: number
  /** in an event's detail: its metadata, labelled */
  details?: Detail[]
}

export type ApiCall = {
  id: string
  occurred_at: string
  received_at: string
  app: string
  environment: string
  service: string
  tenant_id: string
  actor_type: string
  actor_id: string
  actor_name: string
  origin: string
  method: string
  route: string
  path: string
  status: number
  duration_ms: number
  request_body: Record<string, unknown> | null
  ip: string
  country: string
  user_agent: string
  request_id: string
  session_id: string
}

export type Row = ActivityEvent | ApiCall
export const isEvent = (row: Row): row is ActivityEvent => "action" in row

export type Page<T = Row> = { items: T[]; next_cursor: string | null }

export type Search = {
  kind: Kind
  filters: Record<string, string | string[]>
  action?: string
  related_type?: string
  related_id?: string
  view?: View
  /** the search language, e.g. "actor:12 action:trade.* -result:success" */
  query?: string
  status_from?: number
  occurred_from?: string
  occurred_to?: string
}

export type Chart = { bucket_minutes: number; occurred_from: string; occurred_to: string; buckets: { at: string; count: number }[] }

export type Catalog = {
  views: View[]
  actions: Record<string, { title: string; importance: Importance; category: string }>
  actor_types: Record<string, string>
  entities: Record<string, string>
}

export type EventDetail = { event: ActivityEvent; same_request: ActivityEvent[]; requests: ApiCall[] }

/** A one-click view of the log, e.g. {label: "Money", search: {filters: {category: ["balance"]}}}. */
export type Preset = { label: string; search: Partial<Search> }

/** What a click narrows the log to: a person, or one entity's timeline. */
export type Focus = { actor_id?: string; target_type?: string; target_id?: string }
