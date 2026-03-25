# Structure

## Repository Layout

- `backend/Marginalia.API/`
  - `Program.cs` app setup (controllers, OpenAPI, Swagger UI, CORS, DbContext).
  - `Controllers/BookController.cs` catalog endpoints.
  - `Data/Book.cs`, `Data/BookDbContext.cs`, `Data/PagedBooksResponse.cs`.
  - `Bookstore.sqlite` local database file.
  - `appsettings.json` connection string (`BookConnection`).
- `frontend/`
  - `src/App.tsx` `CartProvider`, `BrowserRouter`, routes (`/`, `/cart`).
  - `src/pages/BrowsePage.tsx` header + `CartSummary` + `BookList` + `StoreInfoAccordion`.
  - `src/components/StoreInfoAccordion.tsx` Bootstrap accordion (Mission 12).
  - `src/main.tsx` entry: Bootstrap + Bootstrap Icons CSS + Bootstrap bundle JS.
  - `src/pages/CartPage.tsx` cart lines, totals, Continue shopping.
  - `src/context/CartContext.tsx` cart state + `sessionStorage` sync.
  - `src/components/BookList.tsx` catalog UI with paging/sorting/category and Add to cart.
  - `src/components/CartSummary.tsx` compact cart summary for browse view.
  - `src/utils/browseStateStorage.ts` session persistence for catalog browse context (Continue shopping).
  - `src/types/Book.ts`, `src/types/PagedBooks.ts`, `src/types/CartLineItem.ts`.
  - `src/index.css` global and theme styling.

## Where To Put Upcoming Mission 12 Work

- Category filtering (implemented)
  - Backend: optional `category` on `GET /api/Book/paged` and `GET /api/Book/categories` in `backend/Marginalia.API/Controllers/BookController.cs`.
  - Frontend category dropdown and query wiring: `frontend/src/components/BookList.tsx`.
- Cart behavior (implemented, session-only)
  - `frontend/src/context/CartContext.tsx`, `frontend/src/types/CartLineItem.ts`.
  - `frontend/src/components/CartSummary.tsx`, `frontend/src/pages/CartPage.tsx`.
  - If cart becomes backend-backed later, add controller + DTOs under `backend/Marginalia.API/Controllers` and `Data` or `Models`.
- Continue shopping (implemented)
  - Browse state key `marginalia_browse_v1`; `CartPage` navigates to `/` and `BookList` rehydrates from storage.

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

