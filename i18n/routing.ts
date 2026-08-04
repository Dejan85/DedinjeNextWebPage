import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sr", "en"],
  defaultLocale: "sr",
  // Srpski (podrazumevani) ostaje bez prefiksa (/aktuelnosti), engleski
  // dobija /en prefiks (/en/aktuelnosti) — postojeće SR URL adrese se ne
  // menjaju. Zahteva middleware.ts (vidi napomenu tamo o build:static).
  localePrefix: "as-needed",
  // Isključeno namerno: next-intl podrazumevano pamti poslednji izabrani
  // locale u NEXT_LOCALE kolačiću i redirektuje "/" nazad na taj locale
  // (npr. otvoriš /en, pa klik na "Srpski" ka "/" se vraća na /en jer
  // kolačić i dalje kaže "en" — LanguageSwitch komponenta izgleda
  // "pokvareno"). Sa eksplicitnim prekidačem u headeru ne treba nam
  // auto-detekcija — URL prefiks je jedini izvor istine za locale.
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];
