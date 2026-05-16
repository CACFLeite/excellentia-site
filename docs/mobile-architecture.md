# Excellentia Mobile Architecture

Status: active implementation note.

## Principle

Excellentia mobile is a client of the existing platform. It must not fork the business model, data model, course model, payment state, or certificate state.

The web app and the mobile app use the same backend. Where a feature currently exists only as a server-rendered page, expose a JSON API before rebuilding that feature in the app.

## Runtime Shape

```
excellentia-site/
  src/app/                 Next.js web + API
  src/lib/                 shared backend logic
  prisma/                  shared data model
  mobile/                  Capacitor/React mobile client
```

The mobile client calls `https://excellentia-edu.com/api/...` in production and can call a local/dev base URL during development.

## Authentication

### Existing Web Behavior

Teacher subscriber login uses a magic link and the `excellentia_teacher_session` HTTP-only cookie. This remains the web default.

### Mobile-Compatible Behavior

The same `TeacherSession` records can authenticate API calls from the app. APIs that are intended for mobile should resolve teacher session from:

1. `Authorization: Bearer <teacher-session-token>`;
2. `x-excellentia-teacher-session: <teacher-session-token>`;
3. existing `excellentia_teacher_session` cookie.

This preserves the web flow and gives the native app a path to store session material in secure storage.

The next mobile auth step is to make the magic-link callback support app deep links without breaking the browser redirect.

## API Strategy

Use existing APIs where they are already token-safe:

- school invitation activation;
- employee course loading by invitation token;
- activity answers;
- certificate issuance and lookup.

Extend APIs where current product behavior is page-only:

- teacher course detail JSON;
- app session bootstrap;
- app/deep-link metadata if needed.

Avoid exposing admin/internal APIs to the app in v1.

## Mobile Client Strategy

Use Capacitor with a React mobile client. The first implementation target is a real app shell, not a store wrapper around the full marketing site.

The mobile app should contain:

- unauthenticated entry screen;
- teacher login request;
- teacher course list;
- teacher course detail;
- school invite activation;
- employee course experience by invitation token;
- certificate view/verification;
- account/support/privacy links.

The app should hand off payment to an external secure browser/checkout and let the backend/Stripe webhook grant access.

## Production Safety

Every backend change must remain additive and pass web gates. Mobile work can ship internally without changing production traffic until the API and app gates pass.

Do not move sensitive evidence vault, bulk imports, admin password rotation, or internal school operations into mobile v1.
