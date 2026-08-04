// Next.js ne dozvoljava proxy.ts zajedno sa `output: "export"`.
// Ovaj wrapper privremeno sklanja proxy.ts pre static exporta i vraća
// ga posle (uspešno ili ne) — vidi proxy.ts i docs/ARHITEKTURA.md.
// Posledica: static export nema locale middleware, pa next-intl generiše
// SVE rute prefiksovane (/sr/*, /en/*) umesto da SR ostane bez prefiksa.
import { existsSync, renameSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const middlewarePath = join(rootDir, "proxy.ts");
const parkedPath = join(rootDir, "proxy.ts.static-disabled");

const hadMiddleware = existsSync(middlewarePath);
if (hadMiddleware) {
  renameSync(middlewarePath, parkedPath);
  console.log("[build-static] proxy.ts privremeno uklonjen (output: export ga ne podržava).");
}

let exitCode = 1;
try {
  const result = spawnSync("next", ["build"], {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, BUILD_STATIC: "true" },
  });
  exitCode = result.status ?? 1;
} finally {
  if (hadMiddleware && existsSync(parkedPath)) {
    renameSync(parkedPath, middlewarePath);
    console.log("[build-static] proxy.ts vraćen.");
  }
}

process.exit(exitCode);
