# MINERVA Mobile Deployment Guide

MINERVA must support both PWA and Android packaging.

## PWA Requirements

- `manifest.webmanifest`
- Service worker
- Offline fallback
- App icons
- Install prompt
- Cached lessons and drills

## Android Requirements

Use Capacitor.

Recommended identity:

```text
appId: com.minerva.afoqt
appName: MINERVA
```

Build flow:

1. Build web app.
2. Export static or deployable web assets.
3. Add Capacitor.
4. Add Android platform.
5. Configure icons and splash screen.
6. Build debug APK.
7. Validate offline flows.
8. Prepare release build.

## Firebase Sync

The app should use local-first progress writes and sync to Firebase when online.
