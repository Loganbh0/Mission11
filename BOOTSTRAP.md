# Bootstrap usage in Marginalia

This project uses **Bootstrap 5** for layout and components. Mission 12 calls for two features **beyond** typical class usage (grid, cards, buttons, form controls). Those extensions are **Bootstrap Icons** and the **Accordion / Collapse** pattern, documented in detail below.

## Global setup

| What | Where |
|------|--------|
| Bootstrap CSS | [frontend/src/main.tsx](frontend/src/main.tsx) — `import 'bootstrap/dist/css/bootstrap.min.css'` |
| Bootstrap Icons (CSS + webfont) | [frontend/src/main.tsx](frontend/src/main.tsx) — `import 'bootstrap-icons/font/bootstrap-icons.css'` |
| Bootstrap JavaScript (bundle, includes Popper) | [frontend/src/main.tsx](frontend/src/main.tsx) — `import 'bootstrap/dist/js/bootstrap.bundle.min.js'` |

The bundle is required so accordion panels respond to `data-bs-toggle="collapse"` without custom React toggle logic.

| npm package | File |
|---------------|------|
| `bootstrap` | [frontend/package.json](frontend/package.json) |
| `bootstrap-icons` | [frontend/package.json](frontend/package.json) |

## Baseline Bootstrap (already used across the app)

These are used for the bookstore UI but are **not** counted as the two “new” Mission 12 extensions:

- **Grid**: responsive columns in the book catalog (e.g. `row`, `col-12`, `col-md-6`, `col-lg-4`) in [frontend/src/components/BookList.tsx](frontend/src/components/BookList.tsx).
- **Cards**: book tiles (`card`, `card-body`) in `BookList` and the cart summary card in [frontend/src/components/CartSummary.tsx](frontend/src/components/CartSummary.tsx).
- **Forms**: `form-select`, `form-select-sm` for category, page size, and sort in `BookList`.
- **Buttons / utilities**: `btn`, `d-flex`, spacing, typography classes throughout browse and cart pages.

Custom colors use [frontend/src/index.css](frontend/src/index.css) (CSS variables and classes like `.book-card`, `.btn-book-accent`).

---

## Mission 12 extension 1: Bootstrap Icons

**Description:** Icon glyphs via the `bootstrap-icons` package. After the CSS import in `main.tsx`, use `<i>` elements with classes `bi` and `bi-*` (see [Bootstrap Icons](https://icons.getbootstrap.com/)).

**Where to find them in this repo:**

| Location | Icon class(es) | Role |
|----------|----------------|------|
| [frontend/src/pages/BrowsePage.tsx](frontend/src/pages/BrowsePage.tsx) | `bi-book` | Next to the main “Marginalia Bookstore” heading |
| [frontend/src/components/CartSummary.tsx](frontend/src/components/CartSummary.tsx) | `bi-cart3` | Next to the “Cart” label in the summary link |
| [frontend/src/pages/CartPage.tsx](frontend/src/pages/CartPage.tsx) | `bi-bag-check` | Next to the “Your cart” heading |
| [frontend/src/components/StoreInfoAccordion.tsx](frontend/src/components/StoreInfoAccordion.tsx) | `bi-info-circle` | Next to the “About Marginalia” section title |

Decorative icons use `aria-hidden="true"` where they sit beside visible text.

---

## Mission 12 extension 2: Accordion + Collapse

**Description:** Bootstrap’s **accordion** composes **collapse** behavior: only one panel stays open per accordion (via `data-bs-parent`), headers use `accordion-button`, and bodies live in `accordion-collapse` + `collapse` regions. Attributes include `data-bs-toggle="collapse"`, `data-bs-target`, `aria-expanded`, and `aria-controls`.

**Where to find it:**

| File | Notes |
|------|--------|
| [frontend/src/components/StoreInfoAccordion.tsx](frontend/src/components/StoreInfoAccordion.tsx) | Full implementation: `accordion`, `accordion-flush`, three `accordion-item` blocks (origin, FAQ, privacy). Wrapper id `margStoreAccordion`. First panel starts expanded (`collapse show`); others use `collapsed` on the button. |
| [frontend/src/pages/BrowsePage.tsx](frontend/src/pages/BrowsePage.tsx) | Renders `<StoreInfoAccordion />` below `<BookList />` inside a `row` / `col-12` (bottom of the browse page at `/`). |

**Related docs in-repo:** ADR in [DECISIONS.md](DECISIONS.md) (Bootstrap Icons + Accordion), verification bullets in [RUNBOOK.md](RUNBOOK.md), and copy-paste submission wording in [frontend/README.md](frontend/README.md).
