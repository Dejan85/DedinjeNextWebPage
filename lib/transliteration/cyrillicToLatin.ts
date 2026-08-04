// Mapa srpske ćirilice u latinicu. Digrafi (Љ/Њ/Џ) se razrešavaju u transliterate()
// jer zavise od okolnih slova (LJ vs Lj, NJ vs Nj, DŽ vs Dž).
const DIGRAPHS: Record<string, [string, string, string]> = {
  Љ: ["LJ", "Lj", "lj"],
  Њ: ["NJ", "Nj", "nj"],
  Џ: ["DŽ", "Dž", "dž"],
};

const SIMPLE_MAP: Record<string, string> = {
  А: "A", Б: "B", В: "V", Г: "G", Д: "D", Ђ: "Đ", Е: "E", Ж: "Ž", З: "Z",
  И: "I", Ј: "J", К: "K", Л: "L", М: "M", Н: "N", О: "O", П: "P", Р: "R",
  С: "S", Т: "T", Ћ: "Ć", У: "U", Ф: "F", Х: "H", Ц: "C", Ч: "Č", Ш: "Š",
  а: "a", б: "b", в: "v", г: "g", д: "d", ђ: "đ", е: "e", ж: "ž", з: "z",
  и: "i", ј: "j", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", ћ: "ć", у: "u", ф: "f", х: "h", ц: "c", ч: "č", ш: "š",
};

function isUpper(ch: string): boolean {
  return ch !== ch.toLowerCase() && ch === ch.toUpperCase();
}

/**
 * Transliteruje srpski ćirilični tekst u latinicu. Ne-ćirilična slova
 * (brojevi, postojeći latinični tekst, email/URL) ostaju netaknuta jer
 * mapa menja samo poznate ćirilične kod-tačke.
 */
export function transliterate(text: string): string {
  let result = "";
  const chars = Array.from(text);

  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    const digraph = DIGRAPHS[ch];

    if (digraph) {
      const next = chars[i + 1];
      if (isUpper(ch) && next && isUpper(next)) {
        result += digraph[0]; // cela reč caps: LJ/NJ/DŽ
      } else if (isUpper(ch)) {
        result += digraph[1]; // title case: Lj/Nj/Dž
      } else {
        result += digraph[2]; // lj/nj/dž
      }
      continue;
    }

    result += SIMPLE_MAP[ch] ?? ch;
  }

  return result;
}

/** Da li tekst sadrži bar jedan ćirilični karakter iz mape iznad. */
export function containsCyrillic(text: string): boolean {
  for (const ch of text) {
    if (SIMPLE_MAP[ch] || DIGRAPHS[ch]) return true;
  }
  return false;
}
