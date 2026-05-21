# Firebase setup for MINERVA

Primary repo: [github.com/swolem12/MINERVA](https://github.com/swolem12/MINERVA)

## 1. Create / select a Firebase project

```bash
npx firebase-tools@latest login
npx firebase-tools@latest use minerva-21e28
```

Update `.firebaserc` if your project ID differs.

## 2. Enable services (Firebase Console)

- **Authentication** → Email/Password + Google
- **Firestore** → Create database (production mode; rules deploy from this repo)
- **Functions** → Blaze plan required for scheduled `syncDailyMissions`

## 3. Register the web app

Firebase Console → Project settings → Add app (Web). Copy config into `frontend/.env.local`:

```env
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## 4. Local emulators (optional)

```bash
npm run firebase:emulators
```

Set in `frontend/.env.local`:

```env
NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true
```

## 5. Deploy rules & functions

```bash
npm run build:core
npm run build:functions
npx firebase-tools@latest deploy --only firestore:rules,functions
```

## What syncs today

| Data | Firestore path | When |
|------|----------------|------|
| Profile | `profiles/{uid}` | Sign-up / profile update |
| User record | `users/{uid}` | Sign-up |
| Game progress | `users/{uid}/game/player` | Debounced on progress change (signed-in users) |

Local-only mode still works when `NEXT_PUBLIC_DEMO_MODE=true` or when the user skips sign-in via `/enlist`.

## Auth routes

- `/auth` — email, Google sign-in
- `/enlist` — local profile without account
- **You** tab → Cloud sync section
