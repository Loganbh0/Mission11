# Agents

## Purpose
Repository-specific operating guide for AI assistants working on the Marginalia bookstore codebase.

## Priority Responsibilities
- Preserve working catalog behavior (book list, paging, title sort).
- Implement Mission 12 requirements incrementally and verify each slice.
- Keep backend API contracts and frontend types synchronized.
- Keep docs aligned with code after meaningful behavior changes.

## Role Expectations

### Planner
- Break Mission 12 work into small milestones:
  - category filter,
  - cart,
  - continue shopping,
  - bootstrap feature additions.
- Call out assumptions, compatibility risks, and manual test plan.

### Implementer
- Prefer smallest safe edits.
- Reuse existing `BookList` patterns for query params and state updates.
- Preserve route/contract compatibility unless user approves changes.

### Reviewer
- Focus on regressions in:
  - filtered pagination math,
  - cart totals/quantity calculations,
  - browsing state restoration.

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

## Mission 12 Quality Checklist
- Category filter affects both result set and pagination totals.
- Cart math is correct (quantity, line subtotal, cart total).
- Cart persists during session navigation.
- Continue Shopping restores browsing context.
- Two additional Bootstrap features are implemented and documented.

