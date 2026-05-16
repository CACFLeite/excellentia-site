# Excellentia Mobile Release Prep

Status: pre-store preparation.

## Android

Current debug build:

- project: `mobile/android`
- package id: `br.com.excellentia.app`
- debug APK: `mobile/android/app/build/outputs/apk/debug/app-debug.apk`
- unsigned release AAB: `mobile/android/app/build/outputs/bundle/release/app-release.aab`

Release target:

- artifact: Android App Bundle (`.aab`)
- signing: Play App Signing or local upload key
- secrets policy: do not commit keystores, passwords, `key.properties`, service-account JSON, or Play signing material

Recommended release path:

1. Create app in Google Play Console with package `br.com.excellentia.app`.
2. Enable Play App Signing.
3. Generate/upload an upload key outside git when Play Console is ready.
4. Store signing material outside the repo, preferably in a protected secrets location.
5. Add release Gradle signing config only through ignored local files or CI secrets.
6. Generate AAB with `./gradlew bundleRelease`.

Local/CI signing file shape, intentionally ignored by git:

```properties
storeFile=/absolute/path/to/excellentia-upload-key.jks
storePassword=...
keyAlias=excellentia
keyPassword=...
```

The Android Gradle project already loads `mobile/android/release-signing.properties` when present. Without that file, debug builds continue normally and release builds remain unsigned/not store-ready. Current `app-release.aab` has been generated and verified as unsigned; it proves the release build compiles, but it is not ready for Play Store upload until the upload key/Play signing path is configured.

Blocked until Caio/console access:

- Play Console app creation;
- signing key decision;
- release track selection;
- public listing text/screenshots approval.

## iOS

Current project:

- project: `mobile/ios`
- bundle id candidate: `br.com.excellentia.app`
- URL scheme: `excellentia`

Final iOS build requires:

- macOS with Xcode or macOS CI runner;
- Apple Developer Program access;
- App Store Connect app record;
- bundle identifier confirmation;
- signing certificate/profile or automatic signing;
- Team ID.

Blocked until Caio/Apple access or macOS CI:

- archive build;
- TestFlight upload;
- App Store submission.

## Store Metadata Draft

Working app name: Excellentia.

Short description:

> Acesse cursos, atividades, registros e certificados da plataforma Excellentia pelo celular.

Long description draft:

> O aplicativo Excellentia permite que professores e colaboradores de escolas acessem formações, atividades, registros de participação e certificados vinculados à plataforma Excellentia. O app utiliza a mesma base segura do site excellentia-edu.com, preservando cursos, convites, progresso e certificados em um único ambiente.
>
> Professores assinantes podem acessar seus cursos pelo login enviado por e-mail. Colaboradores de escolas podem ativar convites institucionais, acompanhar aulas, responder atividades e consultar certificados.
>
> Recursos iniciais:
> - acesso de professores assinantes;
> - ativação de convite institucional;
> - acesso a cursos e aulas;
> - envio de atividades formativas;
> - emissão e verificação de certificados;
> - identidade visual Excellentia integrada ao ambiente mobile.

Support URL:

- `https://excellentia-edu.com/contato`

Privacy URL:

- `https://excellentia-edu.com/privacidade`

Account/data request URL:

- `https://excellentia-edu.com/dados/titular`

## Screenshot Checklist

Capture after first device/emulator validation:

- initial entry screen;
- teacher login screen;
- teacher course list;
- teacher course detail;
- school invite validation;
- school course activity;
- certificate verification or emitted certificate state.

## Current Non-Store Gates

Run:

```bash
scripts/mobile-gates.sh
```

This verifies web build, governance nav smoke, mobile build/lint, Capacitor sync, and Android debug build.
