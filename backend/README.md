# MINERVA Firebase Backend

## Setup (new project)

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Create project: `firebase projects:create minerva-afoqt`
4. Link: project ID is set in `.firebaserc`
5. Enable Authentication (Email/Password + Google) in Firebase Console
6. Copy web app config to `frontend/.env.local` (see `.env.local.example`)
7. Deploy rules: `firebase deploy --only firestore:rules`
8. Deploy functions: `npm run build:functions && firebase deploy --only functions`

## Emulators

```bash
firebase emulators:start
```

Set `NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true` in `frontend/.env.local`.

## Collections

- `users`, `profiles`, `lessons`, `questions`, `attempts`
- `mastery/{uid}/skills`, `missions/{uid}/daily`
- `officerTrials`, `afterActionReviews`, `generatedQuestionValidation`
