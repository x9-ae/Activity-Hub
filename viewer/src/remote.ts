import { useCallback, useEffect, useRef, useState } from "react"
import type { ActivityRequest, Page, Row, Search } from "./types"

/** One answer from the routes, refetched when key changes (and every refreshMs when given). An
 * answer that arrives after a newer request was made is dropped. A failed refresh keeps the last
 * data and stops refreshing until refresh() works again. */
export function useRemote<T>(key: string | null, load: () => Promise<T>, refreshMs?: number) {
  const [state, setState] = useState<{ data?: T; error?: Error; loading: boolean }>({ loading: key !== null })
  const latest = useRef(0)
  const loader = useRef(load)
  loader.current = load

  const refresh = useCallback(() => {
    if (key === null) return
    const call = ++latest.current
    setState((s) => ({ ...s, loading: true }))
    loader.current().then(
      (data) => call === latest.current && setState({ data, loading: false }),
      (error: Error) => call === latest.current && setState((s) => ({ data: s.data, error, loading: false })),
    )
  }, [key])

  useEffect(() => {
    setState({ loading: key !== null })
    refresh()
  }, [key, refresh])

  const failed = Boolean(state.error)
  useEffect(() => {
    if (!refreshMs || key === null || failed) return
    const timer = setInterval(refresh, refreshMs)
    return () => clearInterval(timer)
  }, [refreshMs, key, failed, refresh])

  return { ...state, refresh }
}

// pages a list keeps; past it the newest are let go and Refresh brings them back
export const MAX_PAGES = 20

/** A search read page by page, newest first. live keeps only the newest page and reloads it. */
export function usePages(request: ActivityRequest, search: Search | null, pageSize: number, live: boolean, refreshMs: number) {
  const key = search && JSON.stringify(search)
  const [pages, setPages] = useState<Page[]>([])
  const [trimmed, setTrimmed] = useState(false)
  const [more, setMore] = useState<{ loading: boolean; error?: Error }>({ loading: false })
  // a page that arrives after the search changed belongs to the old one
  const current = useRef(key)
  current.current = key
  const first = useRemote(key, () => request("search", { method: "POST", body: { ...search, limit: pageSize } }),
    live ? refreshMs : undefined)

  // each fresh first page starts a new list: a next page asked for before it belongs to the old one
  const generation = useRef(0)
  useEffect(() => {
    if (first.data) {
      generation.current += 1
      setPages([first.data as Page])
      setTrimmed(false)
      setMore({ loading: false })
    }
  }, [first.data])
  useEffect(() => {
    setPages([])
    setMore({ loading: false })
  }, [key])

  const cursor = pages[pages.length - 1]?.next_cursor ?? null
  const loadMore = useCallback(() => {
    if (!cursor || more.loading || !search) return
    setMore({ loading: true })
    const asked = key
    const list = generation.current
    request("search", { method: "POST", body: { ...search, limit: pageSize, cursor } }).then(
      (page: Page) => {
        if (current.current !== asked || generation.current !== list) return
        setPages((kept) => [...kept, page].slice(-MAX_PAGES))
        if (pages.length >= MAX_PAGES) setTrimmed(true)
        setMore({ loading: false })
      },
      (error: Error) => current.current === asked && generation.current === list && setMore({ loading: false, error }),
    )
  }, [cursor, more.loading, search, key, request, pageSize, pages.length])

  const rows: Row[] = pages.flatMap((page) => page.items)
  return {
    rows, trimmed, hasMore: Boolean(cursor) && !live, loading: first.loading && !pages.length,
    refreshing: first.loading, error: first.error, more, loadMore, refresh: first.refresh, pageCount: pages.length,
  }
}
