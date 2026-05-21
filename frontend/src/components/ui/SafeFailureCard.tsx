interface SafeFailureCardProps {
  title?: string;
  message: string;
  explanation?: string;
  correct?: boolean;
}

export function SafeFailureCard({
  title = "Let's review",
  message,
  explanation,
  correct = false,
}: SafeFailureCardProps) {
  return (
    <div
      className={`rounded-xl border-2 p-4 ${
        correct ? "border-success-border bg-success-bg" : "border-error-border bg-error-bg"
      }`}
    >
      <p className={`text-sm font-bold ${correct ? "text-success-border" : "text-cardinal"}`}>
        {title}
      </p>
      <p className="mt-1 font-semibold text-primary">{message}</p>
      {explanation && (
        <p className="mt-2 text-sm leading-relaxed text-secondary">{explanation}</p>
      )}
    </div>
  );
}
