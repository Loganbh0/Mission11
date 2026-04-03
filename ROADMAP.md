# Roadmap

## Current State (Completed)
- Backend connected to `Bookstore.sqlite` with EF Core.
- Book catalog endpoints available (`/api/Book`, `/api/Book/{id}`, `/api/Book/paged`).
- Server-side pagination implemented with 5/10/20 page size options.
- Sorting by title A-Z implemented.
- Frontend catalog list with Bootstrap-based cards and controls is live.

## Mission 12 Milestones

### Milestone 1: Category Filtering
**Goal:** Let users filter books by category and keep pagination accurate for the selected category.

**Acceptance criteria:**
- User can choose a category filter from the main list page.
- API supports category filtering on paged endpoint (or dedicated endpoint) and returns filtered totals.
- `totalPages` updates based on filtered `totalCount`.
- Changing category resets page safely (typically to page 1).

### Milestone 2: Session-Persistent Cart
**Goal:** Users can add books to a cart and keep cart state during the browsing session.

**Acceptance criteria:**
- User can add a book to cart from list page.
- Cart tracks quantity, line subtotal, and overall total.
- Cart remains available while navigating between pages/views during the same session.
- Cart updates immediately when quantities change.

### Milestone 3: Continue Shopping Flow
**Goal:** User can open cart and return to where they left off in browsing.

**Acceptance criteria:**
- Continue Shopping action returns user to previous list context.
- Previous context includes at least page, page size, sort, and category filter.
- Cart summary is visible on main list page.

### Milestone 4: Bootstrap Extension Requirement
**Goal:** Use two Bootstrap features not previously covered in class and document them for grading notes.

**Acceptance criteria:**
- Bootstrap Grid remains in use for overall layout.
- Two additional Bootstrap features are implemented and identified explicitly.
- Submission notes include which features were added and where they appear.

Mission 12 acceptance criteria above are **completed**; catalog, cart, continue shopping, and Bootstrap extensions remain baseline behavior for Phase 6.

## Mission 13 / Phase 6 Milestones

Work proceeds on the **Phase 6** git branch (continuing from Mission 12).

### Milestone 1: Branch and book CRUD (backend + persistence)
**Goal:** Users can **add**, **update**, and **delete** books in the database through the API.

**Acceptance criteria:**
- Create, update, and delete operations persist via EF Core and remain consistent with existing `Book` model and `BookDbContext`.
- Existing read paths (`/api/Book`, `/api/Book/{id}`, `/api/Book/paged`, `/api/Book/categories`) keep correct behavior after mutations (pagination and category totals stay coherent).

### Milestone 2: Admin UI and TA-navigable route
**Goal:** Frontend exposes a book-admin experience on a dedicated route (assignment example: `/adminbooks`) so graders can open the page directly.

**Acceptance criteria:**
- React route registered in `App.tsx` (path aligned with implementation and submission notes).
- UI supports creating, editing, and deleting books against the new API (exact layout TBD during implementation).

### Milestone 3: Azure deployment
**Goal:** Deploy the app to **Azure** and submit the live site URL.

**Acceptance criteria:**
- Production frontend and API are reachable; frontend is configured to call the deployed API base URL (environment/config pattern TBD).
- Learning Suite receives the **deployed website link**, or the **GitHub repository link** if deployment is not used.

### Milestone 4: SPA static hosting (`routes.json`)
**Goal:** Deep links to client routes (e.g. `/adminbooks`) work on Azure static hosting.

**Acceptance criteria:**
- `frontend/public/routes.json` exists with the instructor-specified catch-all: serve `/index.html` for `/*` with status `200` so the SPA router handles the path.

## Risk Register
- **State drift between list and cart context** (Med/High): centralize context state and serialize browsing state.
- **Filtered pagination bugs** (Med/Med): apply filter before count and before `Skip/Take`.
- **Inconsistent API/frontend contracts** (Med/High): update TypeScript types with backend changes in same pass.
- **Production CORS and API base URL** (Med/High): Azure frontend origin must be allowed on the API; avoid hard-coding secrets in the repo.
- **SQLite vs Azure persistence** (Med/Med): confirm with course materials whether SQLite file deployment is sufficient or a different database is required in Azure.
- **Admin deep links on static host** (Med/Low): without `routes.json`, direct navigation to `/adminbooks` can 404; verify after deploy.

