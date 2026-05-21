# MINERVA Mobile (Capacitor Android)

## Identity

- **appId:** `com.minerva.afoqt`
- **appName:** MINERVA

## Build Flow

1. Build the web app: `npm run build --workspace=frontend`
2. Sync to Android: `npm run prepare:android --workspace=minerva-mobile`
3. Open Android Studio: `npm run open:android --workspace=minerva-mobile`
4. Build debug APK from Android Studio

## PWA

The web app includes a PWA manifest and service worker for installable offline shell caching.
