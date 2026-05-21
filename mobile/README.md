# MINERVA Mobile (Capacitor Android)

## Download (easiest)

Install the latest Android APK from **[GitHub Releases](https://github.com/swolem12/MINERVA/releases)** — download the `MINERVA-*-android.apk` file, then open it on your phone.

## Identity

- **appId:** `com.minerva.afoqt`
- **appName:** MINERVA

## Build Flow

1. Build the web app and sync to Android:

   ```bash
   npm run build:mobile
   ```

2. Build a debug APK (requires Android SDK + JDK):

   ```bash
   npm run build:apk
   ```

   Output: `mobile/android/app/build/outputs/apk/debug/app-debug.apk`

3. Open in Android Studio (optional):

   ```bash
   npm run open:android --workspace=minerva-mobile
   ```

## PWA

The web app includes a PWA manifest and service worker for installable offline shell caching.
