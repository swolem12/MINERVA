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
        correct ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"
      }`}
    >
      <p className={`text-sm font-bold ${correct ? "text-green-700" : "text-amber-800"}`}>
        {title}
      </p>
      <p className="mt-1 font-semibold text-warm-white">{message}</p>
      {explanation && (
        <p className="mt-2 text-sm leading-relaxed text-sandstone">{explanation}</p>
      )}
    </div>
  );
}
