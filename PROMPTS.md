# Prompts

## Purpose
Prompt patterns for this specific bookstore project (Mission 12 continuation).

## Default Response Requirements
For implementation or debugging responses, include:
- affected layers (`frontend`, `backend`, `persistence`),
- endpoint impacts (especially `/api/Book/paged` and future cart/category endpoints),
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

