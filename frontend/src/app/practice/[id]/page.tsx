"use client";

import { use } from "react";
import { CenteredScreen } from "@/components/ui/CenteredScreen";
import { MissionBriefing } from "@/components/ui/MissionBriefing";
import { TacticalButton } from "@/components/ui/TacticalButton";
import { useRouter } from "next/navigation";

export default function PracticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  return (
    <CenteredScreen>
      <MissionBriefing title="Guided Practice" subtitle={`Practice ${id.replace(/-/g, " ")}`}>
        <p>Hint ladder and error-trap feedback engine ready.</p>
      </MissionBriefing>
      <TacticalButton onClick={() => router.push("/campaign")}>Back to Learning Path</TacticalButton>
    </CenteredScreen>
  );
}
