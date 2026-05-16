# Excellentia Mobile

Capacitor/React mobile client for the Excellentia platform.

This app is a mobile client of the existing Excellentia backend. It does not own a separate database and must not duplicate critical business rules from the Next.js API.

## Development

```bash
npm install
npm run build
npx cap sync
```

Set `VITE_EXCELLENTIA_API_BASE_URL` to point the app at a non-production backend during local testing. If unset, the app uses `https://excellentia-edu.com`.

## Android

This VPS has a working Android debug build toolchain:

- JDK 21
- Android SDK at `/opt/android-sdk`
- local Gradle project at `android/`

```bash
ANDROID_HOME=/opt/android-sdk ./gradlew assembleDebug
```

Debug APK output:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

Release/AAB builds still require Play signing decisions and production package metadata.

## iOS

The iOS Capacitor project exists under `ios/`, but final iOS build and signing require macOS with Xcode or a macOS CI runner.

## Current v1 Screens

- mobile home/entry;
- teacher access request;
- teacher course list from shared API;
- teacher course detail from shared API;
- school invitation handoff;
- certificate verification handoff.

## Current Backend Support

Teacher APIs can resolve sessions from:

- existing web cookie;
- `Authorization: Bearer <teacher-session-token>`;
- `x-excellentia-teacher-session`.

This preserves the current website while opening the mobile API path.
