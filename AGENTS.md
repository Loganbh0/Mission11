# Agents

## Purpose
Repository-specific operating guide for AI assistants working on the Marginalia bookstore codebase.

## Priority Responsibilities
- Preserve working catalog behavior (book list, paging, title sort).
- **Mission 12** deliverables remain regression targets: category filter, session cart, continue shopping, Bootstrap extensions.
- **Mission 13 / Phase 6:** book **CRUD** (API + admin UI), **`frontend/public/routes.json`** for Azure SPA routing, **Azure deployment**, submission link (deployed URL or GitHub).
- Keep backend API contracts and frontend types synchronized.
- Keep docs aligned with code after meaningful behavior changes.

## Role Expectations

### Planner
- **Mission 12 (done):** category filter, cart, continue shopping, Bootstrap feature additions.
- **Mission 13:** branch/workflow for Phase 6; backend mutations; admin React route; `routes.json`; Azure plan (CORS, API URL, persistence); manual test plan including deep links on deployed static host.
- Call out assumptions, compatibility risks, and manual test plan.

### Implementer
- Prefer smallest safe edits.
- Reuse existing `BookList` patterns for query params and state updates.
- Preserve route/contract compatibility unless user approves changes.

### Reviewer
- Focus on regressions in:
  - filtered pagination math,
  - cart totals/quantity calculations,
  - browsing state restoration,
  - **Mission 13:** catalog totals after create/update/delete; production CORS and API connectivity.

### Doc Writer
- Update `ROADMAP.md` and `DECISIONS.md` when implementation direction changes.
- Keep assignment-oriented notes clear for submission requirements.

## Constraints
- Never commit secrets.
- Avoid destructive git operations unless explicitly requested.
- Do not remove existing endpoints without replacement/migration path.
- Do not edit generated directories (`bin/`, `obj/`, `node_modules/`).

## Escalation Rules
Ask the user before proceeding when:
- Cart persistence strategy is unclear (session-only vs backend-backed).
- URL/state restore expectations for Continue Shopping are ambiguous.
- A proposed API change could break existing frontend behavior.
- **Mission 13:** Azure subscription/resource layout, connection strings or secrets handling, or whether admin routes should be authenticated (PDF does not require auth unless course adds it).

## Mission 12 Quality Checklist
- Category filter affects both result set and pagination totals.
- Cart math is correct (quantity, line subtotal, cart total).
- Cart persists during session navigation.
- Continue Shopping restores browsing context.
- Two additional Bootstrap features are implemented and documented.

## Mission 13 Quality Checklist
- Users can **add**, **update**, and **delete** books; changes persist in the database.
- Catalog read paths remain correct after mutations (paging and category behavior).
- **`frontend/public/routes.json`** exists with assignment-specified catch-all for Azure SPA deep links.
- App is **deployed to Azure** (or GitHub link submitted if deploy is not used, per assignment).
- Learning Suite receives the **deployed site URL** when applicable.

