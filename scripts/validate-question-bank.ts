import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { validateQuestionBank } from "../packages/minerva-core/src/questions/governor";
import type { MinervaQuestion } from "../packages/minerva-core/src/types";

const dataDir = join(__dirname, "../packages/minerva-core/src/data");

function loadJsonFiles(dir: string): MinervaQuestion[] {
  const questions: MinervaQuestion[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) continue;
    if (entry.name.endsWith(".json")) {
      const raw = JSON.parse(readFileSync(full, "utf-8"));
      if (Array.isArray(raw)) {
        questions.push(...raw);
      }
    }
  }
  return questions;
}

const questions = loadJsonFiles(dataDir);
const result = validateQuestionBank(questions);

if (!result.valid) {
  console.error("Question bank validation FAILED:");
  for (const err of result.errors) console.error("  -", err);
  process.exit(1);
}

console.log(`Validated ${questions.length} questions successfully.`);
