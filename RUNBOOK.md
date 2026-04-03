# Runbook

## Purpose
Use this runbook for safe, repeatable development on the Marginalia bookstore project (Mission 12 complete; **Mission 13 / Phase 6** adds book CRUD, Azure deployment, and `public/routes.json`).

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
5. Update docs (`ROADMAP.md`, `DECISIONS.md`, `ARCHITECTURE.md`, `STRUCTURE.md`, `RUNBOOK.md`) for any contract, mutation API, or deployment behavior changes.

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

## Mission 13 Verification Checklist

### Book CRUD (local)
- Mutation endpoints: `POST /api/Book/AddBook`, `PUT /api/Book/UpdateBook/{bookId}`, `DELETE /api/Book/DeleteBook/{bookId}`; admin UI at **`/adminbooks`** (`AdminBooksPage.tsx`).
- Use Swagger/UI or the admin page to **create** a book; confirm it appears in `GET /api/Book/paged` (and category list if applicable).
- **Update** a book; confirm storefront list and cart-related reads reflect changes where expected.
- **Delete** a book; confirm it no longer appears in paged results and operations behave safely (e.g. appropriate status if id missing).

### Admin route and `routes.json`
- After adding `frontend/public/routes.json`, confirm the file matches the assignment: `routes` with one entry mapping `/*` to `/index.html` with status `200`.
- **Local dev:** Vite dev server may handle client routes differently than Azure; still verify in-app navigation to the admin route.
- **Azure:** After deploy, open the deployed site, navigate in-app to the admin path, then **paste the admin URL directly** in the address bar and reload—should load the SPA (not 404). If 404, confirm `routes.json` is in `public/` and redeployed.

### Azure deployment
- Follow course materials for hosting the React build and the ASP.NET Core API (resource types, regions, and pricing per instructor).
- Configure **CORS** on the API for the deployed frontend origin.
- Set **API base URL** for the frontend via environment or build-time config (no secrets in git).
- Document the production URLs and any one-time setup in this section once stable (replace this bullet list with concrete steps if helpful for your team).

### Learning Suite submission (Mission 13)
- Submit the **link to the deployed website** per the assignment.
- If the site is not deployed, submit the **GitHub repository link** as instructed.

## Known Issues And Recovery
- If `dotnet run` fails with file lock errors on `Marginalia.API.exe`, stop existing backend process and run again.
- If CORS issues appear, verify frontend origin matches configured origins in `Program.cs`.
- If list data casing differs unexpectedly, verify frontend normalizer handles payload shape.

