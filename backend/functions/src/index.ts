import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
import {
  validateQuestion,
  createAfterActionReviewEngine,
  createDailyMissionEngine,
} from "@minerva/core";
import type { MinervaQuestion, QuestionAttempt } from "@minerva/core";

admin.initializeApp();
const db = admin.firestore();

const DEFAULT_PROFILE = {
  displayName: "Learner",
  rank: "Novice",
  xp: 0,
  streak: 0,
  startingRegion: "arithmetic_frontier",
  weaknessMap: {},
  confidenceProfile: {},
  diagnosticCompleted: false,
  settings: {
    reducedMotion: false,
    largeText: false,
    highContrast: false,
  },
};

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const now = new Date().toISOString();
  const profile = {
    uid: user.uid,
    ...DEFAULT_PROFILE,
    displayName: user.displayName || "Learner",
    createdAt: now,
    lastActiveAt: now,
  };

  await db.collection("users").doc(user.uid).set({
    email: user.email,
    createdAt: now,
  });

  await db.collection("profiles").doc(user.uid).set(profile);

  const missionEngine = createDailyMissionEngine();
  const today = new Date().toISOString().slice(0, 10);
  const missions = missionEngine.generateDailyMissions(today, {});

  await db
    .collection("missions")
    .doc(user.uid)
    .collection("daily")
    .doc(today)
    .set({ missions, date: today });
});

export const validateGeneratedQuestion = functions.https.onCall(
  async (data: { question: MinervaQuestion }) => {
    const result = validateQuestion(data.question);
    if (result.valid) {
      await db.collection("generatedQuestionValidation").add({
        question: data.question,
        valid: true,
        validatedAt: new Date().toISOString(),
      });
    }
    return result;
  }
);

export const generateAfterActionReview = functions.https.onCall(
  async (data: { attempts: QuestionAttempt[]; streak: number }, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError("unauthenticated", "Auth required");
    }
    const engine = createAfterActionReviewEngine();
    const review = engine.generate(data.attempts, data.streak);

    const reviewRef = await db
      .collection("afterActionReviews")
      .doc(context.auth.uid)
      .collection("reviews")
      .add({
        ...review,
        createdAt: new Date().toISOString(),
      });

    return { id: reviewRef.id, ...review };
  }
);

export const syncDailyMissions = functions.pubsub
  .schedule("0 6 * * *")
  .timeZone("America/New_York")
  .onRun(async () => {
    const today = new Date().toISOString().slice(0, 10);
    const profiles = await db.collection("profiles").get();
    const missionEngine = createDailyMissionEngine();

    const batch = db.batch();
    profiles.docs.forEach((doc) => {
      const data = doc.data();
      const missions = missionEngine.generateDailyMissions(
        today,
        data.weaknessMap ?? {}
      );
      const ref = db
        .collection("missions")
        .doc(doc.id)
        .collection("daily")
        .doc(today);
      batch.set(ref, { missions, date: today });
    });

    await batch.commit();
  });
