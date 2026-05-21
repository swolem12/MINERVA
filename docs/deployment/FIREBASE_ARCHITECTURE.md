# Firebase Architecture

## Services

- Firebase Authentication
- Firestore
- Firebase Storage
- Cloud Functions
- Firebase Hosting

## Core Collections

```text
users
profiles
lessons
questions
attempts
mastery
missions
officerTrials
afterActionReviews
generatedQuestionValidation
```

## Security Model

- Users can read and write their own progress.
- Users cannot modify official curriculum.
- Admins can publish lessons and question banks.
- Generated questions must pass validation before publication.
