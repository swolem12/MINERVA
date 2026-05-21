"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { MinervaQuestion } from "@minerva/core";
import { MathDisplay } from "@/components/ui/MathDisplay";
import { TacticalButton } from "@/components/ui/TacticalButton";
import { SafeFailureCard } from "@/components/ui/SafeFailureCard";

interface QuestionCardProps {
  question: MinervaQuestion;
  onSubmit: (selectedAnswer: string, confidence: 1 | 2 | 3 | 4 | 5, timeMs: number) => void;
  onContinue?: () => void;
  showHints?: boolean;
  hint?: string | null;
  onRequestHint?: () => void;
  onStuck?: () => void;
}

export function QuestionCard({
  question,
  onSubmit,
  onContinue,
  showHints = false,
  hint,
  onRequestHint,
  onStuck,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [startTime] = useState(Date.now());
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showWorkedExample, setShowWorkedExample] = useState(false);

  const handleSubmit = () => {
    if (!selected || submitted) return;
    const timeMs = Date.now() - startTime;
    const correct = selected === question.correctAnswer;
    setFeedback({
      correct,
      text: correct
        ? question.explanation
        : `${question.commonTrap} ${question.explanation}`,
    });
    setSubmitted(true);
    onSubmit(selected, confidence, timeMs);
  };

  const choiceClass = (isSelected: boolean, isCorrect: boolean, isWrong: boolean) => {
    if (isCorrect) return "border-success-border bg-success-bg text-primary";
    if (isWrong) return "border-error-border bg-error-bg text-primary";
    if (isSelected) return "border-cardinal bg-brand-soft text-cardinal";
    return "border-black/[0.1] bg-surface-card text-primary hover:border-cardinal/40";
  };

  return (
    <div className="space-y-4">
      <MathDisplay size="lg">{question.prompt}</MathDisplay>

      <div className="space-y-2">
        {question.answerChoices.map((choice) => {
          const isSelected = selected === choice;
          const isCorrect = submitted && choice === question.correctAnswer;
          const isWrong = submitted && isSelected && !isCorrect;

          return (
            <motion.button
              key={choice}
              type="button"
              disabled={submitted}
              whileTap={!submitted ? { scale: 0.98 } : {}}
              onClick={() => setSelected(choice)}
              className={`w-full rounded-xl border-2 px-4 py-3.5 text-left text-base font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cardinal ${choiceClass(isSelected, isCorrect, isWrong)}`}
            >
              {choice}
            </motion.button>
          );
        })}
      </div>

      {!submitted && (
        <>
          <div>
            <p className="mb-1 text-sm font-medium text-secondary">How sure are you?</p>
            <p className="mb-2 text-xs text-muted">1 = guessing · 5 = sure</p>
            <div className="flex gap-2" role="group" aria-label="Confidence level">
              {([1, 2, 3, 4, 5] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={`Confidence ${c} of 5`}
                  onClick={() => setConfidence(c)}
                  className={`h-9 w-9 rounded-lg text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-cardinal ${
                    confidence === c
                      ? "bg-cardinal text-white"
                      : "bg-surface-muted text-secondary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {showHints && onRequestHint && (
              <TacticalButton variant="ghost" onClick={onRequestHint}>
                Show hint
              </TacticalButton>
            )}
            {onStuck && (
              <TacticalButton variant="ghost" onClick={() => setShowWorkedExample(true)}>
                I&apos;m stuck
              </TacticalButton>
            )}
          </div>

          {showWorkedExample && (
            <p className="rounded-xl bg-gold-soft px-4 py-3 text-sm text-secondary">
              Worked example: {question.explanation}
            </p>
          )}

          {hint && <p className="rounded-xl bg-gold-soft px-4 py-3 text-sm text-secondary">{hint}</p>}

          <TacticalButton onClick={handleSubmit} disabled={!selected}>
            Check
          </TacticalButton>
        </>
      )}

      {feedback && (
        <>
          <SafeFailureCard
            correct={feedback.correct}
            title={feedback.correct ? "Correct!" : "Not quite — that's okay"}
            message={feedback.correct ? "Nice work." : "Here's what to remember."}
            explanation={feedback.text}
          />
          {onContinue && (
            <TacticalButton onClick={onContinue}>
              Continue
            </TacticalButton>
          )}
        </>
      )}
    </div>
  );
}
