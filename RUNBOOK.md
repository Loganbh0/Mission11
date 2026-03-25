# Runbook

## Purpose
Use this runbook for safe, repeatable development on the Mission 12 bookstore project.

## Local Startup

### Backend API
1. Open terminal in `backend/Marginalia.API`.
2. Run `dotnet restore`.
3. Run `dotnet run`.
4. Verify:
   - Swagger UI opens in development,
   - `GET /api/Book/paged?page=1&pageSize=5&sortBy=title` returns JSON,
   - `GET /api/Book/categories` returns a JSON array of category strings,
   - `GET /api/Book/paged?page=1&pageSize=5&sortBy=title&category=Biography` (use a real category from the DB) returns filtered `totalCount`/`totalPages`.

### Frontend
1. Open terminal in `frontend`.
2. Run `npm install` (if needed).
3. Run `npm run dev`.
4. Verify app loads at `/` with bookstore header, cart summary, and catalog.
5. Open `/cart` (or use Cart link); after adding books, refresh the page and confirm cart still populated (`sessionStorage` key `marginalia_cart_v1`).

## Feature Workflow
1. Confirm user story and acceptance criteria.
2. Identify touched layers:
   - backend endpoint/query,
   - frontend types/fetch/state,
   - UI components and Bootstrap layout.
3. Implement smallest vertical slice.
4. Verify end-to-end before moving to next slice.
5. Update docs (`ROADMAP.md`, `DECISIONS.md`) for any contract or behavior changes.

## Mission 12 Verification Checklist

### Category filtering
- Select category in UI and confirm list is filtered.
- Confirm `totalCount` and `totalPages` reflect selected category.
- Confirm page reset behavior when category changes.

### Cart behavior
- Add multiple books and confirm quantity increments (same book increases line qty).
- Confirm line subtotal and total math updates correctly (`unitPrice * quantity` per line).
- Navigate between `/` and `/cart` and refresh; cart remains for current session (same browser tab).

### Continue shopping
- From `/cart`, click Continue shopping and confirm return to `/` with prior **page**, **page size**, **sort**, and **category** (stored under `marginalia_browse_v1` in session storage).
- Optional: refresh while on `/` and confirm browse controls still match last saved context.

### Bootstrap requirements (Mission 12)
- Confirm Bootstrap **Grid** still drives catalog layout (`BookList` card columns).
- Confirm **Bootstrap Icons** (`bi` classes): e.g. `BrowsePage` title, `CartSummary`, `CartPage` heading, `StoreInfoAccordion` section heading.
- Confirm **Accordion + Collapse** at bottom of `/`: `frontend/src/components/StoreInfoAccordion.tsx` (three panels; toggles require `bootstrap.bundle.min.js` in `main.tsx`).

#### Learning Suite submission note (copy/paste)
1. **Bootstrap Icons** — package `bootstrap-icons`, CSS imported in `frontend/src/main.tsx`; icons used in `BrowsePage.tsx`, `CartSummary.tsx`, `CartPage.tsx`, `StoreInfoAccordion.tsx`.
2. **Bootstrap Accordion / Collapse** — `accordion`, `accordion-item`, `accordion-button`, `accordion-collapse`, `data-bs-toggle="collapse"`, `data-bs-target`, `data-bs-parent` in `frontend/src/components/StoreInfoAccordion.tsx` below the catalog on `/`.

## Known Issues And Recovery
- If `dotnet run` fails with file lock errors on `Marginalia.API.exe`, stop existing backend process and run again.
- If CORS issues appear, verify frontend origin matches configured origins in `Program.cs`.
- If list data casing differs unexpectedly, verify frontend normalizer handles payload shape.

