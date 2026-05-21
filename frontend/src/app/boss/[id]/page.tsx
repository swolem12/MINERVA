import { getBossStaticParams } from "@/lib/mobile-static-params";
import BossPageClient from "./BossPageClient";

export function generateStaticParams() {
  return getBossStaticParams();
}

export default async function BossPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BossPageClient id={id} />;
}
