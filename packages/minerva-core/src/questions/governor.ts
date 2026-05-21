import type { MinervaQuestion, ValidationResult } from "../types";
import { assertAFOQTScope, scanTextForForbiddenTopics } from "../curriculum/scope-guard";

export function validateQuestion(question: MinervaQuestion): ValidationResult {
  const errors: string[] = [];

  if (!question.id) errors.push("QuestionID is required");
  if (!question.section) errors.push("Section is required");
  if (!question.scopeClassification) errors.push("ScopeClassification is required");
  if (!question.skillTag) errors.push("SkillTag is required");
  if (!question.difficulty) errors.push("Difficulty is required");
  if (!question.prompt?.trim()) errors.push("Prompt is required");
  if (!question.explanation?.trim()) errors.push("Explanation is required");
  if (!question.commonTrap?.trim()) errors.push("CommonTrap is required");
  if (question.estimatedSolveTimeSec <= 0) errors.push("EstimatedSolveTime must be positive");

  if (!question.answerChoices || question.answerChoices.length < 2) {
    errors.push("At least 2 answer choices required");
  } else {
    const unique = new Set(question.answerChoices);
    if (unique.size !== question.answerChoices.length) {
      errors.push("Answer choices must be unique");
    }
    const correctCount = question.answerChoices.filter(
      (c) => c === question.correctAnswer
    ).length;
    if (correctCount !== 1) {
      errors.push("Exactly one correct answer must appear in choices");
    }
    if (!question.answerChoices.includes(question.correctAnswer)) {
      errors.push("CorrectAnswer must be one of the answer choices");
    }
  }

  const fullText = [
    question.prompt,
    question.explanation,
    ...question.answerChoices,
  ].join(" ");

  const scopeCheck = assertAFOQTScope(fullText, question.scopeClassification);
  if (!scopeCheck.valid) errors.push(scopeCheck.reason!);

  const forbidden = scanTextForForbiddenTopics(fullText);
  if (forbidden.length > 0) {
    errors.push(`Off-scope content: ${forbidden.join(", ")}`);
  }

  return { valid: errors.length === 0, errors };
}

export function validateQuestionBank(questions: MinervaQuestion[]): ValidationResult {
  const allErrors: string[] = [];
  const ids = new Set<string>();

  for (const q of questions) {
    if (ids.has(q.id)) allErrors.push(`Duplicate question ID: ${q.id}`);
    ids.add(q.id);
    const result = validateQuestion(q);
    if (!result.valid) {
      allErrors.push(...result.errors.map((e) => `[${q.id}] ${e}`));
    }
  }

  return { valid: allErrors.length === 0, errors: allErrors };
}
