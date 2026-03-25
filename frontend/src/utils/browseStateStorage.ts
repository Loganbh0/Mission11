const STORAGE_KEY = 'marginalia_browse_v1'

export type BrowseViewState = {
  page: number
  pageSize: 5 | 10 | 20
  sortBy: 'id' | 'title'
  categoryFilter: string
}

const DEFAULTS: BrowseViewState = {
  page: 1,
  pageSize: 5,
  sortBy: 'id',
  categoryFilter: ''
}

export function clampPageSize(n: number): 5 | 10 | 20 {
  if (n === 10 || n === 20) {
    return n
  }
  return 5
}

export function readStoredBrowseView(): BrowseViewState {
  if (typeof sessionStorage === 'undefined') {
    return DEFAULTS
  }
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return DEFAULTS
    }
    const o = JSON.parse(raw) as Record<string, unknown>
    const page = Math.max(1, Math.floor(Number(o.page) || 1))
    const pageSize = clampPageSize(Number(o.pageSize) || 5)
    const sortBy = o.sortBy === 'title' ? 'title' : 'id'
    const categoryFilter =
      typeof o.categoryFilter === 'string' ? o.categoryFilter : ''
    return { page, pageSize, sortBy, categoryFilter }
  } catch {
    return DEFAULTS
  }
}

export function writeStoredBrowseView(state: BrowseViewState): void {
  if (typeof sessionStorage === 'undefined') {
    return
  }
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // ignore quota / private mode
  }
}
