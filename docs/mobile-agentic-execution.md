# Excellentia Mobile Agentic Execution

Status: active.
Owner: Rique.
Started: 2026-05-16.

## Autonomy Rule

Proceed without asking Caio until one of these blockers appears:

- Apple Developer/App Store Connect access, certificates, profiles, or macOS/Xcode/CI requirement;
- Google Play Console access, release signing, or public store listing decision;
- external cost, paid service, or credential not already available;
- risk of breaking the production website or changing a working public flow;
- substantive product/legal/privacy decision not already implied by the current Excellentia platform.

Do not stop after naming the next step. Move the next safe step into \`In Progress\` and execute it.

## Current State

Completed:

- mobile v1 scope documented;
- mobile architecture documented;
- teacher APIs opened for cookie or mobile token auth;
- teacher course detail JSON endpoint created;
- Capacitor/React app scaffolded;
- Android/iOS native projects added;
- Android SDK/JDK toolchain configured on VPS;
- Android debug APK build succeeded.

In Progress:

- store/account-dependent handoff.

Next Queue:

1. Prepare iOS build handoff for macOS/Xcode or macOS CI.
2. Capture final screenshots on device/emulator after install validation.
3. Add optional universal/app links after bundle/package IDs are final.
4. Configure Android upload key or Play App Signing when Play Console access exists.

## Gate Policy

Run after each meaningful implementation slice:

- \`npm run build\`
- \`npm run test:governance-nav\`
- \`cd mobile && npm run build\`
- \`cd mobile && npm run lint\`
- \`cd mobile && npx cap sync\`
- \`cd mobile/android && ANDROID_HOME=/opt/android-sdk ./gradlew assembleDebug\`

For iOS, keep project syncable here; final build remains blocked until macOS/Xcode or macOS CI exists.

## Last Update

2026-05-16: Caio challenged that the work still depended on his orientation to continue. Correction: this file is the durable execution rail. Implemented mobile magic-link/deep-link auth, Android/iOS URL scheme handling, app-side URL listener, native school invite/course flow, response saving, certificate issuing, and a single gate runner at `scripts/mobile-gates.sh`. Replaced generic Capacitor icon/splash with assets generated from the real Excellentia logo and official navy background. Added Android release signing hook through ignored `release-signing.properties`, generated unsigned release AAB, and verified it is unsigned. Full mobile gates passed after this correction.
