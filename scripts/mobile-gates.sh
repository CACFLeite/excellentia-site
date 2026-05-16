#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MOBILE_DIR="$ROOT_DIR/mobile"

cd "$ROOT_DIR"
npm run build
npm run test:governance-nav

cd "$MOBILE_DIR"
npm run build
npm run lint
npx cap sync

cd "$MOBILE_DIR/android"
ANDROID_HOME="${ANDROID_HOME:-/opt/android-sdk}" ./gradlew assembleDebug
