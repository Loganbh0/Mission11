# Marginalia Frontend

React + TypeScript + Vite frontend for the Marginalia bookstore project.

## Current Features
- Book list rendered as responsive Bootstrap cards.
- Server-driven pagination with page sizes 5, 10, and 20.
- Sorting by title (A-Z) or default `BookId`.
- Category filter (All + options from `GET /api/Book/categories`) with correct filtered pagination totals.
- Session cart (`sessionStorage` key `marginalia_cart_v1`): add to cart from each card, summary on browse page, full cart at `/cart` with qty and totals.
- Continue shopping: catalog context saved under `marginalia_browse_v1` (page, page size, sort, category); returning from `/cart` restores it.
- Client routes: `/` (browse), `/cart` (`react-router-dom`).
- Loading and error states for API requests.
- Gentle bookstore theme styling.
- **Bootstrap Icons** (`bootstrap-icons` + CSS in `src/main.tsx`): book/cart/bag/info icons on browse, cart summary, cart page, and accordion heading.
- **Bootstrap Accordion** (`StoreInfoAccordion.tsx` at bottom of `/`): origin, FAQ, privacy placeholder copy; **Bootstrap bundle JS** in `main.tsx` powers `data-bs-toggle` collapse.

## Learning Suite / submission notes (Mission 12)

Use this wording (or adapt) for the assignment comment about the two Bootstrap features:

1. **Bootstrap Icons** — Imported `bootstrap-icons/font/bootstrap-icons.css` in [`src/main.tsx`](src/main.tsx). Icon examples: `bi-book` on the browse page title ([`BrowsePage.tsx`](src/pages/BrowsePage.tsx)), `bi-cart3` in [`CartSummary.tsx`](src/components/CartSummary.tsx), `bi-bag-check` on [`CartPage.tsx`](src/pages/CartPage.tsx), `bi-info-circle` in [`StoreInfoAccordion.tsx`](src/components/StoreInfoAccordion.tsx).

2. **Bootstrap Accordion (Collapse)** — [`StoreInfoAccordion.tsx`](src/components/StoreInfoAccordion.tsx) on the browse route below the book grid: `accordion`, `accordion-flush`, `accordion-item`, `accordion-button`, `accordion-collapse`, `collapse`, `data-bs-parent`, plus ARIA on headers. Requires `import 'bootstrap/dist/js/bootstrap.bundle.min.js'` in [`main.tsx`](src/main.tsx).

## API Dependency
The frontend expects the backend API running at:
- `https://localhost:5000`

Endpoints used by the list:
- `GET /api/Book/categories`
- `GET /api/Book/paged?page=1&pageSize=5&sortBy=title` (optional `&category=...`)

## Run Locally
From `frontend/`:

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in terminal (commonly `http://localhost:5173`).

## Project File Guide
- `src/main.tsx` Bootstrap CSS, Bootstrap Icons CSS, Bootstrap bundle JS, app entry.
- `src/App.tsx` `CartProvider`, router, and routes.
- `src/pages/BrowsePage.tsx` header, `CartSummary`, `BookList`, `StoreInfoAccordion`.
- `src/pages/CartPage.tsx` cart lines, totals, Continue shopping.
- `src/context/CartContext.tsx` cart state and persistence.
- `src/components/BookList.tsx` list UI, filters, and Add to cart.
- `src/components/CartSummary.tsx` compact cart link and totals.
- `src/components/StoreInfoAccordion.tsx` footer accordion (Mission 12 Bootstrap extension).
- `src/utils/browseStateStorage.ts` browse context for Continue shopping.
- `src/types/Book.ts`, `src/types/PagedBooks.ts`, `src/types/CartLineItem.ts`.
- `src/index.css` theme and global styling.
