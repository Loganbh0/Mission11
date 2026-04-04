/**
 * `BOOKS_API_BASE` points at the deployed Book API (`.../api/Book`).
 * Normalizers accept either PascalCase or camelCase JSON from ASP.NET to keep the React `Book` type stable.
 */
import type { Book } from "../types/Book";
import type { PagedBooks } from "../types/PagedBooks";

export const BOOKS_API_BASE =
  "https://marginalia-hanson-backend-dkbgayffbhc8bde8.eastus-01.azurewebsites.net/api/Book";

/** Map one API book object to the frontend Book shape. */
export function normalizeBook(raw: any): Book {
  return {
    bookId: raw.bookId ?? raw.BookId ?? 0,
    title: raw.title ?? raw.Title ?? "",
    author: raw.author ?? raw.Author ?? "",
    publisher: raw.publisher ?? raw.Publisher ?? "",
    isbn: raw.isbn ?? raw.ISBN ?? "",
    classification: raw.classification ?? raw.Classification ?? "",
    category: raw.category ?? raw.Category ?? "",
    pageCount: raw.pageCount ?? raw.PageCount ?? 0,
    price: raw.price ?? raw.Price ?? 0,
  };
}

/** Map paged API payload (items + metadata) to PagedBooks. */
export function normalizePagedBooks(raw: any): PagedBooks {
  const itemsRaw = raw?.items ?? raw?.Items ?? [];

  const pageRaw = raw?.page ?? raw?.Page ?? 1;
  const pageSizeRaw = raw?.pageSize ?? raw?.PageSize ?? 5;
  const totalCountRaw = raw?.totalCount ?? raw?.TotalCount ?? 0;
  const totalPagesRaw = raw?.totalPages ?? raw?.TotalPages ?? 0;

  const items = Array.isArray(itemsRaw) ? itemsRaw.map(normalizeBook) : [];

  return {
    items,
    page: Number(pageRaw) || 1,
    pageSize: Number(pageSizeRaw) || 5,
    totalCount: Number(totalCountRaw) || 0,
    totalPages: Number(totalPagesRaw) || 0,
  };
}

/** Distinct category strings from GET /categories. */
export function normalizeCategories(raw: unknown): string[] {
  if (!Array.isArray(raw)) {
    return [];
  }
  return raw.map((c) => String(c ?? "").trim()).filter(Boolean);
}
