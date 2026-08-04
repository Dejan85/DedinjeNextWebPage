/**
 * Faza 3d i18n prevoda — korak 1/2 (export).
 *
 * Schema-driven (isti pristup kao migrate-i18n-schema.ts): čita STVARNE
 * schema definicije iz sanity/schemas/index.ts i rekurzivno hoda kroz svaki
 * dokument prateći tu strukturu. Skuplja svako {_type:"localeString"|
 * "localeText"|"localePortableText"} polje gde je `sr` popunjen a `en`
 * prazan, i ispisuje ih kao JSON niz zadataka za prevod na stdout.
 *
 * Svaki zadatak ima `path` — niz koraka (string = ime polja, {key:"..."} =
 * element niza adresiran po _key) koji `i18n-apply-translations.ts` koristi
 * da izgradi tačan Sanity patch path (npr. `pageBuilder[_key=="xxx"].heading.en`).
 *
 * Upotreba:
 *   tsx scripts/i18n-export-untranslated.ts > i18n-untranslated.json
 *   tsx scripts/i18n-export-untranslated.ts --type=page > page-untranslated.json
 */
import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { schemaTypes } from "../sanity/schemas";

dotenv.config({ path: ".env.local" });

const args = process.argv.slice(2);
const typeArg = args.find((a) => a.startsWith("--type="));
const TYPE_FILTER = typeArg ? typeArg.split("=")[1] : null;

const client = createClient({
  projectId: "haygvfxq",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

type SchemaField = {
  name?: string;
  type: string;
  fields?: SchemaField[];
  of?: SchemaField[];
};

const typesByName = new Map<string, SchemaField>();
for (const t of schemaTypes as unknown as SchemaField[]) {
  if (t.name) typesByName.set(t.name, t);
}

const LOCALIZED_TYPES = new Set(["localeString", "localeText", "localePortableText"]);

type PathStep = string | { key: string };
type TranslationTask = {
  docId: string;
  docType: string;
  label: string;
  path: PathStep[];
  kind: "localeString" | "localeText" | "localePortableText";
  sr: unknown;
};

function walk(
  value: unknown,
  fieldDef: SchemaField,
  path: PathStep[],
  tasks: TranslationTask[],
  ctx: { docId: string; docType: string; label: string }
) {
  if (value === null || value === undefined) return;

  const typeName = fieldDef.type;

  if (LOCALIZED_TYPES.has(typeName)) {
    if (typeof value !== "object" || Array.isArray(value)) return;
    const obj = value as Record<string, unknown>;
    if (obj._type !== typeName) return; // nije još migrirano na {_type,sr,en} (Faza 3c)

    if (typeName === "localePortableText") {
      const sr = obj.sr as unknown[] | undefined;
      const en = obj.en as unknown[] | undefined;
      if (Array.isArray(sr) && sr.length > 0 && (!Array.isArray(en) || en.length === 0)) {
        tasks.push({ ...ctx, path, kind: "localePortableText", sr });
      }
      return;
    }

    const sr = obj.sr as string | undefined;
    const en = obj.en as string | undefined;
    if (sr && sr.trim() !== "" && (!en || en.trim() === "")) {
      tasks.push({ ...ctx, path, kind: typeName as "localeString" | "localeText", sr });
    }
    return;
  }

  if (typeName === "array") {
    if (!Array.isArray(value)) return;
    const ofDefs = fieldDef.of ?? [];
    for (const item of value) {
      const ofDef =
        ofDefs.length === 1
          ? ofDefs[0]
          : ofDefs.find((d) => (d.name ?? d.type) === (item as { _type?: string })?._type);
      if (!ofDef) continue;
      const itemKey = (item as { _key?: string })?._key;
      const itemPath: PathStep[] = itemKey ? [...path, { key: itemKey }] : path;
      walk(item, ofDef, itemPath, tasks, ctx);
    }
    return;
  }

  let fields = fieldDef.fields;
  if (!fields) {
    const named = typesByName.get(typeName);
    if (named) fields = named.fields;
  }

  if (fields && typeof value === "object" && !Array.isArray(value)) {
    const valueObj = value as Record<string, unknown>;
    for (const f of fields) {
      if (!f.name || !(f.name in valueObj)) continue;
      walk(valueObj[f.name], f, [...path, f.name], tasks, ctx);
    }
  }
}

async function main() {
  const docTypes = (schemaTypes as unknown as SchemaField[]).filter(
    (t) =>
      (t.type === "document" || t.type === "document") &&
      (!TYPE_FILTER || t.name === TYPE_FILTER)
  );

  const allTasks: TranslationTask[] = [];

  for (const docType of docTypes) {
    const typeName = docType.name!;
    const fields = docType.fields ?? [];
    const docs: Array<Record<string, unknown> & { _id: string }> = await client.fetch(
      `*[_type == $type]`,
      { type: typeName }
    );

    for (const doc of docs) {
      const titleField = doc.title as { sr?: string } | string | undefined;
      const label =
        (typeof titleField === "object" ? titleField?.sr : titleField) ??
        (doc.name as string | undefined) ??
        doc._id;
      const ctx = { docId: doc._id, docType: typeName, label: String(label) };
      for (const f of fields) {
        if (!f.name || !(f.name in doc)) continue;
        walk(doc[f.name], f, [f.name], allTasks, ctx);
      }
    }
  }

  console.log(JSON.stringify(allTasks, null, 2));
  console.error(`\n${allTasks.length} zadataka za prevod (stderr, ne remeti stdout JSON).`);
}

main().catch((error) => {
  console.error("❌ Greška:", error);
  process.exit(1);
});
