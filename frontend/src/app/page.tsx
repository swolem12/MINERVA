"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MinervaMark } from "@/components/ui/MinervaMark";
import { TacticalButton } from "@/components/ui/TacticalButton";

const STEPS = [
  { n: "1", title: "Learn", desc: "Short lessons that build one idea at a time — like Khan Academy." },
  { n: "2", title: "Practice", desc: "Answer questions until it feels natural, with hints when you need them." },
  { n: "3", title: "Progress", desc: "Follow a clear path unit by unit — like Duolingo, but for math." },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-dvh bg-charcoal-panel">
      {/* Stanford cardinal hero band */}
      <div className="bg-cardinal px-5 pb-12 pt-10 text-white">
        <div className="mx-auto max-w-lg">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium text-white/80">Stanford-inspired math tutoring</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight">MINERVA</h1>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-white/90">
                Patient, step-by-step math for adults — fractions through algebra and geometry.
              </p>
            </div>
            <MinervaMark size="sm" className="shrink-0 opacity-95" />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-lg px-5 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="-mt-6 rounded-2xl bg-charcoal-panel p-5 shadow-md"
        >
          <h2 className="text-lg font-bold text-warm-white">How it works</h2>
          <ol className="mt-4 space-y-4">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-cardinal">
                  {s.n}
                </span>
                <div>
                  <p className="font-semibold text-warm-white">{s.title}</p>
                  <p className="mt-0.5 text-sm leading-snug text-sandstone">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </motion.div>

        <div className="mt-8 flex flex-col gap-3">
          <TacticalButton className="max-w-none" onClick={() => router.push("/enlist")}>
            Get started for free
          </TacticalButton>
          <p className="text-center text-xs text-slate">
            Progress stays on your device — no account needed.
          </p>
        </div>
      </main>
    </div>
  );
}
