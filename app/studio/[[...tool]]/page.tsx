import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const dynamic = "force-static";

// Potrebno za `output: "export"` (build:static) — generiše samo osnovnu
// /studio HTML ljusku; Sanity Studio dalje sam rutira interno preko
// client-side History API-ja posle hidratacije.
export function generateStaticParams() {
  return [{ tool: [] }];
}

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
