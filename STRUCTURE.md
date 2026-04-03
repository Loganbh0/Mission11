# Structure

## Repository Layout

- `backend/Marginalia.API/`
  - `Program.cs` app setup (controllers, OpenAPI, Swagger UI, CORS, DbContext).
  - `Controllers/BookController.cs` catalog + Mission 13 mutations (`AddBook`, `UpdateBook`, `DeleteBook`).
  - `Data/Book.cs`, `Data/BookDbContext.cs`, `Data/PagedBooksResponse.cs`.
  - `Bookstore.sqlite` local database file.
  - `appsettings.json` connection string (`BookConnection`).
- `frontend/`
  - `public/` static files for Vite; **Mission 13:** add `routes.json` here for Azure static hosting (catch-all to `index.html`).
  - `src/App.tsx` `CartProvider`, `BrowserRouter`, routes (`/`, `/cart`, `/adminbooks`).
  - `src/pages/BrowsePage.tsx` header + `CartSummary` + `BookList` + `StoreInfoAccordion`.
  - `src/components/StoreInfoAccordion.tsx` Bootstrap accordion (Mission 12).
  - `src/main.tsx` entry: Bootstrap + Bootstrap Icons CSS + Bootstrap bundle JS.
  - `src/pages/CartPage.tsx` cart lines, totals, Continue shopping.
  - `src/context/CartContext.tsx` cart state + `sessionStorage` sync.
  - `src/components/BookList.tsx` catalog UI with paging/sorting/category and Add to cart.
  - `src/api/BooksAPI.ts` admin list + add/update/delete book `fetch` helpers.
  - `src/pages/AdminBooksPage.tsx` Mission 13 book admin table and wiring.
  - `src/components/NewBookForm.tsx`, `src/components/EditBookForm.tsx` admin CRUD forms.
  - `src/components/Pagination.tsx` reusable paging (admin + optional reuse).
  - `src/utils/bookPayload.ts` `BOOKS_API_BASE`, normalize book/paged/category JSON.
  - `src/components/CartSummary.tsx` compact cart summary for browse view.
  - `src/utils/browseStateStorage.ts` session persistence for catalog browse context (Continue shopping).
  - `src/types/Book.ts`, `src/types/PagedBooks.ts`, `src/types/CartLineItem.ts`.
  - `src/index.css` global and theme styling.

## Mission 12 (completed)

- Category filtering — `BookController.cs` (`category`, `categories`); `frontend/src/components/BookList.tsx`.
- Session cart — `frontend/src/context/CartContext.tsx`, `CartLineItem.ts`, `CartSummary.tsx`, `CartPage.tsx`.
- Continue shopping — `frontend/src/utils/browseStateStorage.ts`, `BookList` + `CartPage` navigation to `/`.

## Where To Put Mission 13 / Phase 6 Work

- **SPA hosting rule:** `frontend/public/routes.json` (instructor-specified JSON for `/*` → `/index.html`) — add before Azure deploy if not present.
- **Book CRUD (implemented):** `BookController` verb routes; admin UI `/adminbooks`, `BooksAPI.ts`, forms, `bookPayload.ts` — see repository layout above.
- **Azure:** deployment manifests or course-prescribed config (not necessarily in-repo); document operational steps in `RUNBOOK.md` after first successful deploy.

## Naming Conventions

- Use `Marginalia` spelling consistently in namespaces and filenames.
- Backend controllers: singular/plural by resource, but keep route consistency (`api/Book`, future `api/Cart`).
- Frontend components/types: `PascalCase` filenames and symbols.
- Query parameter names should stay predictable (`page`, `pageSize`, `sortBy`, `category`).

## Editing Guardrails

- Do not edit generated folders (`bin/`, `obj/`, `node_modules/`).
- Keep frontend and backend contracts synchronized in the same feature pass.
- Preserve existing pagination behavior when adding filters (filtered total drives `totalPages`).
- Keep Bootstrap styling additions incremental and focused on assignment requirements.
- After adding book mutations, regression-test catalog list paging and category totals; verify admin deep links on Azure once `routes.json` is deployed.

