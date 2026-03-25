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

## Risk Register
- **State drift between list and cart context** (Med/High): centralize context state and serialize browsing state.
- **Filtered pagination bugs** (Med/Med): apply filter before count and before `Skip/Take`.
- **Inconsistent API/frontend contracts** (Med/High): update TypeScript types with backend changes in same pass.

