# Architecture

## Purpose
This document describes the current architecture of the `Marginalia` bookstore app, Mission 12 deliverables (complete), and the **planned** Mission 13 / Phase 6 direction (book admin, Azure, SPA `routes.json`).

## Current System

### Frontend (`frontend/`)
- React + TypeScript + Vite + `react-router-dom` (`/` catalog, `/cart` cart page).
- `CartProvider` wraps the app; cart lines persist in `sessionStorage` (`marginalia_cart_v1`).
- `BrowsePage` shows bookstore header (with Bootstrap Icons), `CartSummary` (with icon + link to `/cart`), `BookList`, and footer **`StoreInfoAccordion`** (Bootstrap accordion/collapse for store info, FAQ, privacy placeholder).
- Global styles/scripts in `main.tsx`: Bootstrap CSS, **Bootstrap Icons** CSS, **Bootstrap bundle JS** (for accordion collapse behavior).
- Catalog browse context (`page`, `pageSize`, `sortBy`, `categoryFilter`) is persisted in `sessionStorage` (`marginalia_browse_v1`) so **Continue shopping** from `/cart` returns to the same list context (and refresh on `/` keeps filters/paging).
- `BookList` calls `/api/Book/paged` and `/api/Book/categories` and supports:
  - pagination (`page`, `pageSize` with 5/10/20 options),
  - sorting (`sortBy=id` or `sortBy=title` with title A-Z behavior),
  - optional category filter (`category` query, exact match on `Book.Category`),
  - per-book **Add to cart** (snapshots `unitPrice` at add time),
  - loading and error UI states,
  - Bootstrap-based responsive card/grid layout.
- `CartPage` lists lines with quantity controls, line subtotals, remove, and cart total (client-side only).

### Backend (`backend/Marginalia.API/`)
- ASP.NET Core Web API with EF Core + SQLite.
- OpenAPI + Swagger UI enabled in development.
- CORS configured for local frontend origins.
- Book endpoints:
  - `GET /api/Book`
  - `GET /api/Book/{id}`
  - `GET /api/Book/categories`
  - `GET /api/Book/paged?page=1&pageSize=5&sortBy=id|title&category=` (optional `category`)

### Persistence
- SQLite database file: `Bookstore.sqlite`.
- EF Core `BookDbContext` exposes `DbSet<Book> Books`.
- Paging metadata is returned via `PagedBooksResponse` (`items`, `page`, `pageSize`, `totalCount`, `totalPages`).

## Request/Response Flow
1. User interacts with controls in `BookList` (category, page size, page nav, sort).
2. Frontend builds a query string and requests `/api/Book/paged` (and loads category options from `/api/Book/categories` once).
3. Backend validates query values and applies:
   - optional category filter before counting,
   - ordering,
   - total count computation on filtered set,
   - `Skip`/`Take` pagination.
4. Backend returns paged JSON payload.
5. Frontend normalizes response shape and renders cards.

## Mission 13 (Phase 6 — CRUD implemented; Azure pending)

- **Write API:** `POST /api/Book/AddBook`, `PUT /api/Book/UpdateBook/{bookId}`, `DELETE /api/Book/DeleteBook/{bookId}` on `BookController` (WaterProject-style verb routes). Read catalog endpoints unchanged; mutations affect paged/category results as expected.
- **Admin frontend:** React route **`/adminbooks`** with table + add/edit forms (`AdminBooksPage`, `BooksAPI`, `NewBookForm`, `EditBookForm`). The PDF does not mandate authentication; if the course adds auth later, document it in `DECISIONS.md`.
- **Azure production:** Browser loads the deployed SPA; SPA calls the deployed API base URL. SQLite may remain for class deployments or be replaced per instructor/Azure constraints—confirm before production cutover.
- **`frontend/public/routes.json`:** Required for deep navigation to client routes on **Azure static hosting** (catch-all to `index.html`); see `DECISIONS.md` ADR dated 2026-04-01.

## Architecture Rules For Future Changes
- Keep API contract and frontend types aligned in the same change.
- Keep list endpoints server-paginated and filter-aware (`Where` before `Skip`/`Take`).
- For any cart behavior, define source of truth clearly (client session storage vs backend state) before coding.
- Record notable contract or persistence choices in `DECISIONS.md`.
- For book **mutations** and **deployment** (CORS, API URL, connection strings), update OpenAPI expectations, frontend env/config, and docs in the same change—never commit secrets.

