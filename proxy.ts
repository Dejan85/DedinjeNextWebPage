import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// NAPOMENA: Next.js 16 preimenovao je "middleware" konvenciju u "proxy"
// (ovaj fajl je bio middleware.ts). I dalje važi: Next.js ne dozvoljava
// proxy/middleware zajedno sa `output: "export"` (build:static).
// `scripts/build-static.mjs` zato privremeno uklanja ovaj fajl pre static
// exporta i vraća ga posle — vidi taj skript i docs/ARHITEKTURA.md. Static
// export gubi "bez prefiksa za SR" trik i generiše sve rute prefiksovane
// (/sr/*, /en/*), što je poznat i prihvaćen kompromis (Vercel je primarna
// platforma).
export default createMiddleware(routing);

export const config = {
  // Isključi /studio (Sanity Studio nema i18n), API rute, statičke fajlove
  // i Next internals iz locale rutiranja.
  matcher: ["/((?!api|studio|_next|_vercel|.*\\..*).*)"],
};
