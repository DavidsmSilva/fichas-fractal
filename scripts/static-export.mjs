// Static export helper for GitHub Pages.
//
// Runs the built Nitro node server (STATIC_EXPORT=true build), fetches "/",
// and writes the SSR-rendered HTML as index.html inside .output/public so the
// static site can be published as-is (GitHub Pages can't run SSR).
//
// Usage (after `bun run build` with STATIC_EXPORT=true):
//   bun run scripts/static-export.mjs
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const serverFile = join(root, ".output", "server", "index.mjs");
const publicDir = join(root, ".output", "public");
const port = process.env.STATIC_PORT || "3210";

if (!existsSync(serverFile)) {
  console.error(
    "Build output not found. Run `bun run build` with STATIC_EXPORT=true first.",
  );
  process.exit(1);
}

const child = spawn(process.execPath, [serverFile], {
  env: { ...process.env, NITRO_PORT: port },
  stdio: "ignore",
});

const url = `http://127.0.0.1:${port}/`;
let html = "";
let done = false;

const timeout = setTimeout(() => {
  if (!done) {
    console.error("Timed out waiting for the SSR server.");
    child.kill();
    process.exit(1);
  }
}, 20000);

for (let attempt = 0; attempt < 40 && !done; attempt++) {
  try {
    const res = await fetch(url);
    if (res.status === 200) {
      html = await res.text();
      done = true;
      break;
    }
  } catch {
    // Server still booting.
  }
  await new Promise((r) => setTimeout(r, 250));
}

clearTimeout(timeout);
child.kill();

if (!done || !html) {
  console.error("SSR server did not return the page.");
  process.exit(1);
}

await mkdir(publicDir, { recursive: true });
await writeFile(join(publicDir, "index.html"), html, "utf8");
console.log(`Static index.html written (${html.length} bytes) to .output/public/index.html`);