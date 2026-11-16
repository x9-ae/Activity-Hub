import type { ReactElement } from "react"
import { createRoot, type Root } from "react-dom/client"
import styles from "./styles.css?inline"
import { ActivityLog } from "./ActivityLog"
import { ActivityTimeline } from "./ActivityTimeline"
import { PanelHost } from "./ActivityDetail"
import type { ActivityRequest } from "./types"

/** <activity-log> and <activity-timeline> for pages that are not React (Angular, plain HTML). Set the
 * element's `request` property to the function that calls the application's activity routes; the
 * attributes choose the rest:
 *
 *   <activity-timeline entity-type="account" entity-id="100234" action="user." newest-first></activity-timeline>
 *   element.request = (path, init) => fetch(`/api/activity/${path}`, ...).then((r) => r.json())
 *
 * The styles live in the element's shadow root and take the page's colours from the same theme
 * variables the React components read. */
abstract class ActivityElement extends HTMLElement {
  static observedAttributes = ["entity-type", "entity-id", "entity-label", "title", "kinds", "can-export", "action",
    "newest-first", "view", "no-status"]
  private root?: Root
  private panel?: HTMLDivElement
  private requester?: ActivityRequest

  get request() { return this.requester }
  set request(value: ActivityRequest | undefined) {
    this.requester = value
    this.render()
  }

  private theme?: MutationObserver

  connectedCallback() {
    if (!this.root) {
      // a moved element connects again: its shadow root is still there
      const shadow = this.shadowRoot ?? this.attachShadow({ mode: "open" })
      const style = document.createElement("style")
      style.textContent = styles
      const mount = document.createElement("div")
      this.panel = document.createElement("div")
      shadow.replaceChildren(style, mount, this.panel)
      this.root = createRoot(mount)
      // the page's dark theme cannot reach into the shadow root: follow it here
      const page = document.documentElement
      const follow = () => {
        const dark = page.classList.contains("dark") || page.dataset.theme === "dark"
        mount.classList.toggle("ahv-dark-host", dark)
        this.panel?.classList.toggle("ahv-dark-host", dark)
      }
      follow()
      this.theme = new MutationObserver(follow)
      this.theme.observe(page, { attributes: true, attributeFilter: ["class", "data-theme"] })
    }
    this.render()
  }

  disconnectedCallback() {
    this.theme?.disconnect()
    this.root?.unmount()
    this.root = undefined
    this.shadowRoot?.replaceChildren()
  }

  attributeChangedCallback() {
    this.render()
  }

  protected abstract view(request: ActivityRequest): ReactElement

  private render() {
    if (!this.root || !this.requester) return
    this.root.render(<PanelHost.Provider value={this.panel ?? null}>{this.view(this.requester)}</PanelHost.Provider>)
  }
}

class ActivityLogElement extends ActivityElement {
  protected view(request: ActivityRequest) {
    const type = this.getAttribute("entity-type")
    const id = this.getAttribute("entity-id")
    const kinds = (this.getAttribute("kinds") || "events,requests").split(",").map((k) => k.trim()) as ("events" | "requests")[]
    return (
      <ActivityLog request={request} title={this.getAttribute("title") || undefined} kinds={kinds}
        canExport={this.hasAttribute("can-export")} showStatus={!this.hasAttribute("no-status")}
        entity={type && id ? { type, id, label: this.getAttribute("entity-label") || `${type} ${id}` } : undefined} />
    )
  }
}

class ActivityTimelineElement extends ActivityElement {
  protected view(request: ActivityRequest) {
    return (
      <ActivityTimeline request={request} entity={{ type: this.getAttribute("entity-type") || "", id: this.getAttribute("entity-id") || "" }}
        action={this.getAttribute("action") || undefined} newestFirst={this.hasAttribute("newest-first")}
        view={this.getAttribute("view") === "important" ? "important" : "all"} />
    )
  }
}

if (!customElements.get("activity-log")) customElements.define("activity-log", ActivityLogElement)
if (!customElements.get("activity-timeline")) customElements.define("activity-timeline", ActivityTimelineElement)
