# Excellentia Mobile App v1

Status: implementation planning started on 2026-05-16.

## Operating Decision

The Android and iOS apps must be real mobile clients for the Excellentia platform, not a separate platform and not a publication-only PWA. The existing website remains the production web client. The database, course records, access rules, payments, certificates, school records, and teacher subscriber state remain shared through the existing backend/API.

Mobile work must be additive. Do not replace working web flows unless a change is explicitly required for shared API support and passes the normal web gates.

## Source of Truth

- Database: existing Prisma/PostgreSQL schema.
- Backend: existing Next.js API routes, extended where needed for mobile-safe access.
- Web client: existing Next.js routes under `src/app`.
- Mobile client: new native/hybrid app shell consuming the shared backend.

## Mobile v1 Audience

Mobile v1 is for authenticated platform users who need access away from a computer:

- teacher subscribers;
- school employees/participants using an invitation token;
- school managers only for lightweight monitoring, if the current API can support it safely.

Admin operations, sensitive evidence handling, bulk imports, credential rotation, and internal support tools stay web-only in v1 unless explicitly promoted later.

## v1 Route and Feature Matrix

| Area | Web route/API today | Mobile v1 decision | Notes |
| --- | --- | --- | --- |
| Public brand/home | `/(main)`, `/sobre`, `/escolas`, `/professores`, `/formacoes`, `/blog` | Partial | Mobile app should not duplicate the marketing site. Keep a compact unauthenticated landing/login entry only. |
| Teacher access | `/acesso-professor`, `/api/professor/auth/*` | In v1 | Needs mobile-safe magic link/deep link handling while preserving web cookie flow. |
| Teacher course list | `/professor/cursos`, `/api/professor/cursos` | In v1 | Use shared API and mobile UI. |
| Teacher course detail | `/professor/cursos/[courseSlug]` | In v1 | Needs API endpoint for lesson/activity detail or extension of current course API for teacher subscribers. |
| School invite activation | `/acesso-escolar`, `/api/escolas/convites/[token]` | In v1 | Invitation links should open in app via deep link when installed and fall back to web. |
| Employee course experience | `/cursos/[courseSlug]?convite=...`, `/api/cursos/[courseSlug]` | In v1 | Mobile UI can consume existing invite-token APIs. |
| Activity answers | `/api/cursos/[courseSlug]/respostas` | In v1 | Existing token-based API is mobile-compatible, but UX needs mobile validation and offline-draft consideration. |
| Certificates | `/certificados/[verificationCode]`, `/api/certificados/[verificationCode]` | In v1 | Read/display certificate and open share/download paths if safe. |
| Communication channel | `/comunicacao`, `/api/comunicacao` | Candidate v1 | Include if token-based flow remains safe and small enough. |
| School manager panel | `/admin/escolas`, `/api/escolas/[organizationId]/painel` | Limited or defer | Current endpoint requires internal/admin access; avoid exposing full admin surface in app v1. |
| Sensitive evidence vault | `/admin/seguranca`, evidence APIs | Defer | Keep web-only until mobile authorization, upload policy, storage, audit, and legal review are explicit. |
| Stripe checkout | `/checkout-professores`, Payment Links/webhook | Web handoff | Use secure browser/payment handoff. Do not embed card collection in app v1. |
| Agent/AI bridge | `/agente-educacional`, `/api/agent` | Defer | Add later only after mobile UX/safety review. |

## Required Shared API Work

1. Add request-based teacher session resolution that can read either the existing web cookie or a mobile bearer/session token.
2. Preserve `excellentia_teacher_session` cookie behavior for the website.
3. Expose teacher course detail as JSON for the app instead of relying on server-rendered pages.
4. Keep employee invite-token course APIs compatible with mobile fetch clients.
5. Add clear JSON error shapes for unauthenticated, forbidden, expired invitation, unpublished course, and missing access states.
6. Add app metadata endpoints only if needed; avoid leaking admin/internal data.

## Native App Requirements

- Android package id: to be confirmed before signing.
- iOS bundle id: to be confirmed before signing.
- App name: Excellentia, unless store naming requires a longer public name.
- Visual identity: navy `#0a2749`, gold `#b07908`, light gold `#f4db76`, light gray `#eaeaea`.
- Typography: Plus Jakarta Sans for brand/title usage, IBM Plex Sans for body/UI where practical in the mobile stack.
- Native shell: Capacitor-based unless a later blocker justifies changing stack.
- Deep links: invitation links, teacher login links, course links, certificate links.
- Secure storage: store only mobile session material that is required for app auth; do not store secrets, Stripe keys, admin credentials, or private vault material.
- Push notifications: prepare architecture; enable only after provider/account setup and privacy text are ready.
- Payments: use external secure checkout/browser handoff and rely on Stripe webhook/backend for entitlement.

## Store Readiness Items

- Privacy policy URL.
- Support URL/contact.
- Account deletion/data request route.
- App description and screenshots.
- Content rating/classification.
- Permission declarations.
- Android signing key or Play App Signing setup.
- Apple Developer/App Store Connect access, bundle id, certificates/profiles, and macOS/Xcode or macOS CI runner.

## Gates

Before any production deploy:

- `npm run build`
- `npm run test:governance-nav`
- API smoke for teacher auth/course endpoints.
- API smoke for invite-token course endpoints.
- No regression in unauthenticated redirects for web pages.

Before app handoff:

- Android debug build succeeds.
- Mobile app can load teacher session state and course list from the shared backend.
- Mobile app can load at least one course detail shape from API.
- Invite-token school course flow is validated against API responses.
- iOS project exists and is ready for macOS/Xcode or CI build.

## Current Blockers Expected Later

- iOS final build requires macOS/Xcode or macOS CI.
- Store submission requires Caio-controlled Apple/Google access and signing/public listing decisions.
- Push notifications require Firebase/APNs setup and privacy copy.
