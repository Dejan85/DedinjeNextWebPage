import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sr", "en"],
  defaultLocale: "sr",
  // Srpski (podrazumevani) ostaje bez prefiksa (/aktuelnosti), engleski
  // dobija /en prefiks (/en/aktuelnosti) — postojeće SR URL adrese se ne
  // menjaju. Zahteva middleware.ts (vidi napomenu tamo o build:static).
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
