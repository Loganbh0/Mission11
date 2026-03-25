# Decisions (ADR)

## 2026-03-16 - Server-Side Pagination And Sorting For Catalog

### Status
Accepted

### Context
The bookstore list needs stable pagination with controllable page size and deterministic ordering.

### Decision
Implement paging and sorting in backend endpoint `GET /api/Book/paged` with:
- `page`,
- `pageSize` constrained to 5, 10, or 20,
- `sortBy` constrained to `id` or `title` (title is A-Z).

### Alternatives Considered
- Frontend-only pagination/sorting from full dataset response.
  - Rejected due to scalability and unnecessary payload size.

### Consequences
- Pros: stable output, smaller responses, consistent totals.
- Cons: frontend must keep query params and response metadata synchronized.

### Rollback Strategy
Fallback to `GET /api/Book` full list endpoint and remove paged usage in `frontend/src/components/BookList.tsx`.

## 2026-03-16 - Frontend Uses Response Normalization For Payload Casing

### Status
Accepted

### Context
JSON payload property casing may vary between environments/configuration.

### Decision
Normalize incoming payload in frontend before assigning to typed state.

### Alternatives Considered
- Enforce strict casing only on backend serializer.
  - Not chosen as sole strategy to avoid brittle UI behavior.

### Consequences
- Pros: resilient UI parsing and fewer runtime failures.
- Cons: extra mapping code in `BookList`.

### Rollback Strategy
Remove normalization helpers if contract is guaranteed stable and verified end-to-end.

## 2026-03-16 - Mission 12 Cart Persistence Scope

### Status
Accepted

### Context
Mission 12 requires cart state persistence for the session and continue-shopping behavior.

### Decision
- Client-only cart aligned with WaterProject-style `CartContext` (`addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`).
- Persist cart JSON in `sessionStorage` under key `marginalia_cart_v1`.
- Line items store `bookId`, `title`, `unitPrice` (snapshot at add time), and `quantity`. Line subtotal and cart total are derived as `unitPrice * quantity` and summed on the client.
- SPA routes: `/` browse catalog with `CartSummary`, `/cart` full cart view (`react-router-dom`).

### Alternatives Considered
- Backend cart persistence immediately.
  - Higher complexity and more API surface than current assignment requires.

### Consequences
- Pros: faster implementation, fewer backend changes, aligns with session requirement; survives in-tab refresh and navigation.
- Cons: cart does not survive closing the tab/window; price does not auto-sync if catalog prices change after add.

### Rollback Strategy
Remove `CartProvider`, routes, and storage key usage; drop cart UI from `BookList`.

## 2026-03-25 - Category Filter On Paged Catalog

### Status
Accepted

### Context
Mission 12 requires filtering by book category with pagination totals that reflect the filtered set only.

### Decision
- Extend `GET /api/Book/paged` with optional query parameter `category`. When present (non-whitespace after trim), filter with exact match on `Book.Category` before `CountAsync` and before `Skip`/`Take`.
- Add `GET /api/Book/categories` returning distinct category names ordered alphabetically for the main list dropdown.
- Route `categories` is defined before `GET /api/Book/{id}` so it is not captured as an integer id.

### Alternatives Considered
- Load all books on the client and derive categories locally.
  - Rejected: unnecessary payload and does not scale.
- Case-insensitive or partial category match.
  - Rejected: assignment examples use fixed category strings; exact match keeps behavior predictable.

### Consequences
- Pros: small API surface, correct filtered totals, reusable category list.
- Cons: category string must match database value exactly (including spacing/casing).

### Rollback Strategy
Remove `category` handling from `GetPagedBooks`, remove `GetCategories`, and strip category query/UI from `BookList`.

## 2026-03-26 - Continue Shopping Browse State In SessionStorage

### Status
Accepted

### Context
Mission 12 requires returning from the cart to the same catalog context (page, page size, sort, category).

### Decision
Persist catalog UI state in `sessionStorage` under key `marginalia_browse_v1` as JSON: `page`, `pageSize` (5/10/20), `sortBy`, `categoryFilter`. `BookList` initializes from `readStoredBrowseView()` and writes on change via `writeStoredBrowseView`. Continue Shopping on `/cart` uses `navigate('/')`; restored state loads automatically. Helpers live in `frontend/src/utils/browseStateStorage.ts` (`clampPageSize` shared for API and select values).

### Alternatives Considered
- URL query params for all browse state.
  - Larger change and not required for session-only restore.
- React Router `location.state` only.
  - Lost on full refresh; sessionStorage matches assignment persistence.

### Consequences
- Pros: restore survives refresh on browse page; same tab session as cart.
- Cons: stale page index possible if dataset changes; API already clamps page in response.

### Rollback Strategy
Remove storage module usage from `BookList` and delete `browseStateStorage.ts` if reverting.

## 2026-03-26 - Mission 12 Bootstrap Extensions (Icons + Accordion)

### Status
Accepted

### Context
Mission 12 requires two Bootstrap capabilities beyond what was already used in class (grid, cards, forms, buttons), documented for TA review.

### Decision
- Add **Bootstrap Icons** via npm package `bootstrap-icons` and import `bootstrap-icons/font/bootstrap-icons.css` in `frontend/src/main.tsx`.
- Add **Bootstrap Accordion / Collapse** using `accordion`, `accordion-item`, `accordion-button`, `accordion-collapse`, `collapse`, `data-bs-toggle`, `data-bs-target`, `data-bs-parent`, and ARIA attributes in `frontend/src/components/StoreInfoAccordion.tsx` (mounted at bottom of `BrowsePage`).
- Import `bootstrap/dist/js/bootstrap.bundle.min.js` in `main.tsx` so collapse toggles work without custom React state.

### Alternatives Considered
- React-only open/close state for accordion (no Bootstrap JS).
  - More code; data-attribute pattern matches Bootstrap coursework.

### Consequences
- Pros: clear rubric alignment; small dependency footprint; icons reusable across header, cart summary, and cart page.
- Cons: global Bootstrap JS runs once per app load.

### Rollback Strategy
Remove `bootstrap-icons` dependency and related imports; delete `StoreInfoAccordion` usage and component file.

## ADR Template

### YYYY-MM-DD - Short summary
Status: Proposed | Accepted | Rejected

#### Context
Problem and constraints.

#### Decision
Chosen approach and rules.

#### Alternatives Considered
Other options and why rejected.

#### Consequences
Tradeoffs.

#### Rollback Strategy
Safe revert path.

