/**
 * Faza 3c i18n migracije — prebacuje postojeći plain-string sadržaj u
 * `production` datasetu u {_type, sr, en} oblik za sva polja koja je
 * Faza 3b (schema) obeležila kao localeString/localeText/localePortableText.
 *
 * NE koristi ručno pisanu allowlist mapu polja — umesto toga čita STVARNE
 * schema definicije (`sanity/schemas/index.ts`, isti fajl koji Studio
 * koristi) i rekurzivno hoda kroz svaki dokument prateći tu strukturu.
 * Ako polje u schema-i i dalje ima `type:"string"/"text"` (svesno ostavljeno
 * plain — imena, kontakt podaci, enumi), skripta ga ne dira. Idempotentna:
 * polja koja su već u {_type,sr,en} obliku se preskaču.
 *
 * Upotreba:
 *   tsx scripts/migrate-i18n-schema.ts --dry-run              (samo izveštaj, bez upisa)
 *   tsx scripts/migrate-i18n-schema.ts --dataset=production-i18n-test  (testni dataset)
 *   tsx scripts/migrate-i18n-schema.ts --type=page            (ograniči na jedan document tip)
 *   tsx scripts/migrate-i18n-schema.ts                        (stvarni upis u production)
 *
 * OPREZ: ovo je destruktivna operacija nad živim sadržajem. Testirati prvo
 * na kloniranom dataset-u:
 *   npx sanity dataset copy production production-i18n-test
 *   tsx scripts/migrate-i18n-schema.ts --dataset=production-i18n-test
 */
import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { schemaTypes } from "../sanity/schemas";

dotenv.config({ path: ".env.local" });

const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const datasetArg = args.find((a) => a.startsWith("--dataset="));
const DATASET = datasetArg ? datasetArg.split("=")[1] : "production";
const typeArg = args.find((a) => a.startsWith("--type="));
const TYPE_FILTER = typeArg ? typeArg.split("=")[1] : null;

const client = createClient({
  projectId: "haygvfxq",
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// ── Schema introspekcija ────────────────────────────────────────────────

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

function genKey(): string {
  return Math.random().toString(36).slice(2, 14);
}

function transformLocalized(value: unknown, typeName: string): { value: unknown; changed: boolean } {
  if (typeName === "localePortableText") {
    if (Array.isArray(value)) {
      return { value: { _type: "localePortableText", sr: value, en: [] }, changed: true };
    }
    return { value, changed: false }; // već {_type,sr,en} ili nepoznat oblik
  }
  if (typeof value === "string") {
    return { value: { _type: typeName, sr: value, en: "" }, changed: true };
  }
  return { value, changed: false }; // već {_type,sr,en} ili nepoznat oblik
}

function resolveOfDef(ofDefs: SchemaField[], item: unknown): SchemaField | null {
  if (ofDefs.length === 0) return null;
  if (ofDefs.length === 1) return ofDefs[0];
  const itemType = (item as { _type?: string } | null | undefined)?._type;
  return ofDefs.find((d) => (d.name ?? d.type) === itemType) ?? null;
}

function transformValue(value: unknown, fieldDef: SchemaField): { value: unknown; changed: boolean } {
  if (value === null || value === undefined) return { value, changed: false };

  const typeName = fieldDef.type;

  if (LOCALIZED_TYPES.has(typeName)) {
    if (
      typeof value === "object" &&
      !Array.isArray(value) &&
      (value as Record<string, unknown>)._type === typeName
    ) {
      return { value, changed: false }; // već migrirano
    }
    return transformLocalized(value, typeName);
  }

  if (typeName === "array") {
    if (!Array.isArray(value)) return { value, changed: false };
    const ofDefs = fieldDef.of ?? [];
    let changed = false;
    const newArr = value.map((item) => {
      const ofDef = resolveOfDef(ofDefs, item);
      if (!ofDef) return item;
      const result = transformValue(item, ofDef);
      if (!result.changed) return item;
      changed = true;
      // Objekt-vrednosti u nizu treba da imaju _key (Studio array editor).
      if (
        typeof result.value === "object" &&
        result.value !== null &&
        !Array.isArray(result.value) &&
        !("_key" in (result.value as object))
      ) {
        return { ...(result.value as object), _key: genKey() };
      }
      return result.value;
    });
    return { value: newArr, changed };
  }

  // Objekat: inline fields (anonimni object) ili named type lookup
  let fields = fieldDef.fields;
  if (!fields) {
    const named = typesByName.get(typeName);
    if (named) fields = named.fields;
  }

  if (fields && typeof value === "object" && !Array.isArray(value)) {
    const valueObj = value as Record<string, unknown>;
    let changed = false;
    const newObj: Record<string, unknown> = { ...valueObj };
    for (const f of fields) {
      if (!f.name || !(f.name in valueObj)) continue;
      const result = transformValue(valueObj[f.name], f);
      if (result.changed) {
        newObj[f.name] = result.value;
        changed = true;
      }
    }
    return { value: newObj, changed };
  }

  return { value, changed: false }; // leaf tip (string/text/number/boolean/slug/datetime/url/image/reference/block)
}

// ── Migracija ────────────────────────────────────────────────────────────

type SanityDoc = Record<string, unknown> & { _id: string };

async function migrateDocType(docType: SchemaField) {
  const typeName = docType.name!;
  const fields = docType.fields ?? [];
  const docs: SanityDoc[] = await client.fetch(`*[_type == $type]`, { type: typeName });

  let docsChanged = 0;
  let fieldsChanged = 0;

  for (const doc of docs) {
    const patch: Record<string, unknown> = {};
    for (const f of fields) {
      if (!f.name || !(f.name in doc)) continue;
      const result = transformValue(doc[f.name], f);
      if (result.changed) {
        patch[f.name] = result.value;
        fieldsChanged++;
      }
    }

    if (Object.keys(patch).length === 0) continue;
    docsChanged++;

    const titleField = doc.title as { sr?: string } | string | undefined;
    const label =
      (typeof titleField === "object" ? titleField?.sr : titleField) ?? doc.name ?? doc._id;
    if (DRY_RUN) {
      console.log(`  [dry-run] ${typeName}/${doc._id} (${label}) — ${Object.keys(patch).join(", ")}`);
    } else {
      await client.patch(doc._id).set(patch).commit();
      console.log(`  ✅ ${typeName}/${doc._id} (${label}) — ${Object.keys(patch).join(", ")}`);
    }
  }

  return { total: docs.length, docsChanged, fieldsChanged };
}

async function main() {
  console.log(`\n🌍 FAZA 3c — i18n schema migracija`);
  console.log(`   dataset: ${DATASET}${DRY_RUN ? "  (DRY RUN — bez upisa)" : ""}`);
  console.log("═══════════════════════════════════════════════\n");

  const docTypes = (schemaTypes as unknown as SchemaField[]).filter(
    (t) => t.type === "document" && (!TYPE_FILTER || t.name === TYPE_FILTER)
  );

  let grandDocs = 0;
  let grandChanged = 0;
  let grandFields = 0;

  for (const docType of docTypes) {
    console.log(`📄 ${docType.name}`);
    const { total, docsChanged, fieldsChanged } = await migrateDocType(docType);
    grandDocs += total;
    grandChanged += docsChanged;
    grandFields += fieldsChanged;
    console.log(`   ${docsChanged}/${total} dokumenata izmenjeno, ${fieldsChanged} polja\n`);
  }

  console.log("═══════════════════════════════════════════════");
  console.log(
    `Gotovo. ${grandChanged}/${grandDocs} dokumenata${DRY_RUN ? " bi bilo" : ""} izmenjeno, ${grandFields} polja ukupno.`
  );
  if (DRY_RUN) console.log("Ovo je bio dry-run — ništa nije upisano. Pokreni bez --dry-run za stvarni upis.");
}

main().catch((error) => {
  console.error("❌ Greška:", error);
  process.exit(1);
});
