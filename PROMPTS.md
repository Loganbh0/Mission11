# Prompts

## Purpose
Prompt patterns for this bookstore project: Mission 12 (complete) and **Mission 13 / Phase 6** (book admin, Azure, `routes.json`).

## Default Response Requirements
For implementation or debugging responses, include:
- affected layers (`frontend`, `backend`, `persistence`),
- endpoint impacts (especially `/api/Book/paged`, category endpoints, and **Mission 13** book mutation endpoints),
- verification checklist with concrete commands/tests,
- risks and rollback notes for contract changes.

## Template: Mission 12 Feature Request
Use when user asks for category filtering, cart, continue-shopping, or Bootstrap additions.

1. Current behavior (as-is)
2. Target behavior (to-be)
3. Layers/files to modify
4. API changes (query params, payload shape, status codes)
5. UI changes (controls, state, bootstrap usage)
6. Session/state strategy
7. Verification checklist
8. Assignment submission note impact

## Template: Mission 13 / Phase 6 Feature Request
Use for book CRUD, admin UI, `public/routes.json`, or Azure deployment tasks.

1. Current behavior (read-only catalog + Mission 12 cart/browse state)
2. Target behavior (mutations, admin route path, static hosting fallback, or production config)
3. Layers/files to modify (`backend` controllers/DTOs, `frontend` pages/routes/env, `frontend/public/routes.json`, Azure settings)
4. API changes (new verbs/routes, request bodies, status codes, validation) and impact on `GET /api/Book/paged`
5. UI changes (admin forms/tables, navigation link to admin if any)
6. Production concerns (CORS, API base URL, connection strings — no secrets in repo)
7. Verification checklist (`dotnet run`, Swagger, `npm run dev` / `npm run build`, **Azure** deep-link test)
8. Learning Suite impact (deployed URL vs GitHub link)

## Template: Backend Contract Change
1. Endpoint(s) changed
2. Request/query fields added/updated
3. Response shape changes
4. Frontend type updates required
5. Backward compatibility and fallback
6. Verification (`dotnet run` + endpoint call)

## Template: Frontend Integration Change
1. State model updates
2. Fetch/query parameter updates
3. UI controls added/changed
4. Empty/loading/error behavior
5. Verification (`npm run dev` + manual flow)

## Template: Documentation Update
1. Which behavior changed
2. Which docs updated
3. What assignment requirement it satisfies
4. How to validate docs match code

## Quick Verification Checklist Snippet
- Backend runs from `backend/Marginalia.API`.
- Frontend runs from `frontend`.
- Catalog endpoint responds: `/api/Book/paged?page=1&pageSize=5&sortBy=title`.
- Pagination and sorting work in UI.
- For Mission 12 features, verify category filter + cart persistence + continue shopping.
- For Mission 13, verify book CRUD end-to-end, `routes.json` present, and deployed admin deep link (if using Azure).

