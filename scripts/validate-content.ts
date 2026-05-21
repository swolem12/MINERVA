/**
 * Content integrity + app wiring audit.
 * Run: npm run validate:content
 */
import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";
import {
  ALL_LESSON_IDS,
  CAMPAIGN_DEFINITION,
  DIAGNOSTIC_QUESTIONS,
  SEED_QUESTIONS,
  getLessonById,
  getQuestionById,
  validateQuestionBank,
} from "../packages/minerva-core/src/index";

const ROOT = join(__dirname, "..");
const FRONTEND = join(ROOT, "frontend/src/app");

type Issue = { level: "error" | "warn"; code: string; message: string };

const issues: Issue[] = [];

function routeExists(...segments: string[]): boolean {
  return existsSync(join(FRONTEND, ...segments));
}

// --- Question bank schema ---
const bankResult = validateQuestionBank(SEED_QUESTIONS);
if (!bankResult.valid) {
  for (const err of bankResult.errors) {
    issues.push({ level: "error", code: "QUESTION_INVALID", message: err });
  }
}

// --- Lesson → question refs ---
const referencedQuestionIds = new Set<string>();
for (const lessonId of ALL_LESSON_IDS) {
  const lesson = getLessonById(lessonId)!;
  for (const step of lesson.steps) {
    for (const qid of step.questions ?? []) {
      referencedQuestionIds.add(qid);
      if (!getQuestionById(qid)) {
        issues.push({
          level: "error",
          code: "MISSING_QUESTION",
          message: `Lesson "${lessonId}" step "${step.title}" references unknown question "${qid}"`,
        });
      }
    }
  }
}

const orphanQuestions = SEED_QUESTIONS.filter(
  (q) => !referencedQuestionIds.has(q.id) && !q.id.startsWith("diag-")
);

for (const q of orphanQuestions) {
  issues.push({
    level: "warn",
    code: "ORPHAN_QUESTION",
    message: `Question "${q.id}" is not used in any lesson (diagnostic-only questions are OK)`,
  });
}

// --- Campaign → lesson refs ---
const campaignLessonIds = new Set<string>();
for (const region of CAMPAIGN_DEFINITION) {
  for (const node of region.nodes) {
    if (node.type === "lesson" && node.lessonId) {
      campaignLessonIds.add(node.lessonId);
      if (!getLessonById(node.lessonId)) {
        issues.push({
          level: "error",
          code: "MISSING_LESSON",
          message: `Campaign node "${node.id}" references unknown lesson "${node.lessonId}"`,
        });
      }
    }
  }
}

for (const lessonId of ALL_LESSON_IDS) {
  if (!campaignLessonIds.has(lessonId)) {
    issues.push({
      level: "warn",
      code: "ORPHAN_LESSON",
      message: `Lesson "${lessonId}" exists but is not on the campaign map`,
    });
  }
}

// --- Frontend routes (structural) ---
const requiredRoutes: Array<{ path: string; segments: string[] }> = [
  { path: "/campaign", segments: ["campaign", "page.tsx"] },
  { path: "/lesson/[id]", segments: ["lesson", "[id]", "page.tsx"] },
  { path: "/boss/[id]", segments: ["boss", "[id]", "page.tsx"] },
  { path: "/forge", segments: ["forge", "page.tsx"] },
  { path: "/onboarding/diagnostic", segments: ["onboarding", "diagnostic", "page.tsx"] },
  { path: "/missions", segments: ["missions", "page.tsx"] },
  { path: "/armory", segments: ["armory", "page.tsx"] },
  { path: "/trials", segments: ["trials", "page.tsx"] },
  { path: "/profile", segments: ["profile", "page.tsx"] },
];

for (const r of requiredRoutes) {
  if (!routeExists(...r.segments)) {
    issues.push({
      level: "error",
      code: "MISSING_ROUTE",
      message: `No frontend route for ${r.path}`,
    });
  }
}

// --- Known wiring gaps (static checks on source) ---
const forgeSrc = readFileSync(join(FRONTEND, "forge/page.tsx"), "utf-8");
if (!forgeSrc.includes("searchParams") && !forgeSrc.includes("useSearchParams")) {
  issues.push({
    level: "warn",
    code: "DRILL_NODE_IGNORED",
    message: "Forge page does not read ?node= — campaign drill nodes all open the same drill",
  });
}

const trialsSrc = readFileSync(join(FRONTEND, "trials/page.tsx"), "utf-8");
if (!trialsSrc.includes("createTrial") || !trialsSrc.includes("onClick")) {
  issues.push({
    level: "warn",
    code: "TRIALS_NOT_PLAYABLE",
    message: "Trials page shows metadata only — no start-test flow",
  });
}

const missionsSrc = readFileSync(join(FRONTEND, "missions/page.tsx"), "utf-8");
if (!missionsSrc.includes("m.href") && !missionsSrc.includes("router.push")) {
  issues.push({
    level: "warn",
    code: "MISSIONS_NOT_PLAYABLE",
    message: "Daily missions are listed but not linked to playable practice",
  });
}

const bossSrc = readFileSync(join(FRONTEND, "boss/[id]/page.tsx"), "utf-8");
if (bossSrc.includes('.slice(0, 5)') && bossSrc.includes('["percentages", "ratios", "fractions"]')) {
  issues.push({
    level: "warn",
    code: "BOSS_GENERIC_QUESTIONS",
    message: "Boss battles use a generic question slice — not tailored per boss id",
  });
}

// --- Summary ---
const lessonStepCounts = ALL_LESSON_IDS.map((id) => {
  const l = getLessonById(id)!;
  return { id, steps: l.steps.length, practiceSteps: l.steps.filter((s) => s.questions?.length).length };
});

const thinLessons = lessonStepCounts.filter((l) => l.steps < 5);

const summary = {
  questions: SEED_QUESTIONS.length,
  diagnosticQuestions: DIAGNOSTIC_QUESTIONS.length,
  lessons: ALL_LESSON_IDS.length,
  campaignRegions: CAMPAIGN_DEFINITION.length,
  campaignNodes: CAMPAIGN_DEFINITION.flatMap((r) => r.nodes).length,
  lessonNodesOnMap: CAMPAIGN_DEFINITION.flatMap((r) => r.nodes).filter((n) => n.type === "lesson").length,
  questionsUsedInLessons: referencedQuestionIds.size,
  orphanQuestions: orphanQuestions.length,
  thinLessons: thinLessons.map((l) => l.id),
  errors: issues.filter((i) => i.level === "error").length,
  warnings: issues.filter((i) => i.level === "warn").length,
};

console.log("\n=== MINERVA Content Audit ===\n");
console.log("Inventory:");
console.log(`  Questions:           ${summary.questions} (${summary.diagnosticQuestions} diagnostic)`);
console.log(`  Lessons:             ${summary.lessons} (all ${summary.lessonNodesOnMap} on campaign map)`);
console.log(`  Campaign:            ${summary.campaignRegions} units, ${summary.campaignNodes} nodes`);
console.log(`  Questions in lessons: ${summary.questionsUsedInLessons} unique IDs referenced`);
console.log(`  Orphan questions:    ${summary.orphanQuestions} (not in lessons, non-diag)`);
if (summary.thinLessons.length) {
  console.log(`  Thin lessons (<5 steps): ${summary.thinLessons.join(", ")}`);
}

if (issues.length === 0) {
  console.log("\n✓ No issues found.\n");
  process.exit(0);
}

console.log(`\nIssues: ${summary.errors} error(s), ${summary.warnings} warning(s)\n`);
for (const issue of issues) {
  const tag = issue.level === "error" ? "ERROR" : "WARN ";
  console.log(`  [${tag}] ${issue.code}: ${issue.message}`);
}
console.log("");

process.exit(summary.errors > 0 ? 1 : 0);
