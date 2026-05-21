import { getLessonStaticParams } from "@/lib/mobile-static-params";
import LessonPageClient from "./LessonPageClient";

export function generateStaticParams() {
  return getLessonStaticParams();
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LessonPageClient id={id} />;
}
