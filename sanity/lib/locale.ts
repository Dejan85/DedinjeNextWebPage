export type Locale = "sr" | "en";

export type LocaleField<T> = { sr?: T | null; en?: T | null } | null | undefined;

/**
 * Bira lokalizovanu vrednost iz {sr, en} polja. EN pada nazad na SR ako
 * prevod još nije unet — bitno da /en/* rute ne budu prazne pre prevoda (Faza 3d).
 */
export function pick<T>(field: LocaleField<T>, locale: Locale): T | undefined {
  if (!field) return undefined;
  if (locale === "en") return field.en ?? field.sr ?? undefined;
  return field.sr ?? undefined;
}

/**
 * Faza 3e: rekurzivno hoda kroz bilo koji fetch-ovan Sanity rezultat i
 * zamenjuje svako {_type:"localeString"/"localeText"/"localePortableText", sr, en}
 * polje sa izabranom lokalizovanom vrednošću (isti sr-fallback kao `pick`).
 * Samostalno prepoznaje polja po `_type` markeru — ne treba mu schema.
 *
 * Zašto ovo umesto pick() na svakom leaf polju: fetch-ovani podaci se
 * vraćaju u TAČNO isti plain-string oblik kakav su imali pre Faze 3b/3c,
 * pa downstream komponente (PageBuilder, ClinicPageTemplate, itd.) rade
 * bez izmena — samo page.tsx/metadata.ts fajlovi (fetch call site) treba
 * da pozovu `localize(data, locale)` odmah posle `client.fetch`.
 */
export function localize<T>(data: T, locale: Locale): T {
  if (data === null || data === undefined) return data;

  if (Array.isArray(data)) {
    return data.map((item) => localize(item, locale)) as unknown as T;
  }

  if (typeof data === "object") {
    const obj = data as Record<string, unknown>;
    const type = obj._type;

    if (type === "localeString" || type === "localeText") {
      const sr = (obj.sr as string | undefined) ?? "";
      const en = (obj.en as string | undefined) ?? "";
      return (locale === "en" ? en || sr : sr) as unknown as T;
    }

    if (type === "localePortableText") {
      const sr = (obj.sr as unknown[] | undefined) ?? [];
      const en = (obj.en as unknown[] | undefined) ?? [];
      return (locale === "en" ? (en.length ? en : sr) : sr) as unknown as T;
    }

    const result: Record<string, unknown> = {};
    for (const key of Object.keys(obj)) {
      result[key] = localize(obj[key], locale);
    }
    return result as T;
  }

  return data;
}
