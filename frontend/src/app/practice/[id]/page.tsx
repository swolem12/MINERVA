import { getPracticeStaticParams } from "@/lib/mobile-static-params";
import PracticePageClient from "./PracticePageClient";

export function generateStaticParams() {
  return getPracticeStaticParams();
}

export default async function PracticePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PracticePageClient id={id} />;
}
