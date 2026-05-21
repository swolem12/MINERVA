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
  showHints?: boolean;
  hint?: string | null;
  onRequestHint?: () => void;
}

export function QuestionCard({
  question,
  onSubmit,
  showHints = false,
  hint,
  onRequestHint,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<1 | 2 | 3 | 4 | 5>(3);
  const [startTime] = useState(Date.now());
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);

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
              className={`w-full rounded-xl border-2 px-4 py-3.5 text-left text-base font-medium transition-all ${
                isCorrect
                  ? "border-green-500 bg-green-50 text-green-900"
                  : isWrong
                    ? "border-red-400 bg-red-50 text-red-900"
                    : isSelected
                      ? "border-cardinal bg-brand-soft text-cardinal"
                      : "border-black/[0.1] bg-charcoal-panel text-warm-white hover:border-cardinal/40"
              }`}
            >
              {choice}
            </motion.button>
          );
        })}
      </div>

      {!submitted && (
        <>
          <div>
            <p className="mb-2 text-sm font-medium text-sandstone">Confidence</p>
            <div className="flex gap-2">
              {([1, 2, 3, 4, 5] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setConfidence(c)}
                  className={`h-9 w-9 rounded-lg text-sm font-bold ${
                    confidence === c
                      ? "bg-cardinal text-white"
                      : "bg-surface-muted text-sandstone"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {showHints && onRequestHint && (
            <TacticalButton variant="ghost" onClick={onRequestHint}>
              Show hint
            </TacticalButton>
          )}

          {hint && <p className="rounded-xl bg-gold-soft px-4 py-3 text-sm text-sandstone">{hint}</p>}

          <TacticalButton onClick={handleSubmit} disabled={!selected}>
            Check
          </TacticalButton>
        </>
      )}

      {feedback && (
        <SafeFailureCard
          correct={feedback.correct}
          title={feedback.correct ? "Correct!" : "Not quite"}
          message={feedback.correct ? "Nice work." : "Here's the explanation."}
          explanation={feedback.text}
        />
      )}
    </div>
  );
}
