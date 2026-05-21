"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { usePlayerStore } from "@/lib/player/player-store";
import { TacticalButton } from "@/components/ui/TacticalButton";

export default function EnlistPage() {
  const [name, setName] = useState("");
  const { enlist, skipDiagnostic } = usePlayerStore();
  const router = useRouter();

  const handleStart = () => {
    enlist(name.trim() || "Learner");
    router.push("/onboarding/diagnostic");
  };

  const handleSkip = () => {
    enlist(name.trim() || "Learner");
    skipDiagnostic();
    router.push("/campaign");
  };

  return (
    <div className="min-h-dvh bg-charcoal">
      <div className="bg-cardinal px-5 py-8 text-white">
        <div className="mx-auto max-w-lg">
          <p className="text-sm font-medium text-white/80">Almost there</p>
          <h1 className="mt-1 text-2xl font-bold">Create your profile</h1>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-lg px-5 py-6"
      >
        <div className="card p-5">
          <label htmlFor="name" className="text-sm font-semibold text-warm-white">
            What should we call you?
          </label>
          <p className="mt-1 text-sm text-sandstone">
            Optional placement check finds your starting unit — or skip and begin at Foundations.
          </p>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
            className="mt-4 w-full rounded-xl border-2 border-black/[0.1] bg-surface-muted px-4 py-3.5 text-lg text-warm-white placeholder:text-slate focus:border-cardinal focus:outline-none"
          />
          <div className="mt-5 flex flex-col gap-3">
            <TacticalButton onClick={handleStart}>Take placement check</TacticalButton>
            <TacticalButton variant="ghost" onClick={handleSkip}>
              Skip — start at Unit 1
            </TacticalButton>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
