#!/usr/bin/env node
/* scripts/fix-repo.cjs
 * Node 18+ / 24 compatible CommonJS script.
 * - Lowercases offending filenames (last segment only)
 * - Normalizes imports to use "@/..." alias across src/*
 * - Enforces special cases that preflight asked for:
 *     - src/pages/app.tsx must use relative imports for ./pages/Index and ./pages/NotFound
 *     - src/pages/main.tsx must import "./index.css"
 */

const fs = require("fs");
const path = require("path");

const repoRoot = process.cwd();
const SRC = path.join(repoRoot, "src");

const JS_TS_EXT = new Set([".js", ".jsx", ".ts", ".tsx"]);

// Aliased top-level dirs we’ll map to "@/..."
const ALIASABLE = new Set([
  "components",
  "hooks",
  "lib",
  "pages",
  "assets",
  "styles",
  "theme",
]);

const changed = [];
const renamed = [];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".git") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function relFromSrc(abs) {
  return path.relative(SRC, abs).replace(/\\/g, "/");
}

function toAlias(absTarget) {
  // convert absolute target path under src → "@/relative"
  const rel = relFromSrc(absTarget);
  return "@/" + rel.replace(/^(\.?\/)+/, "");
}

function fixCaseSensitiveNames() {
  // Lowercase only the filename (not directories) when it contains uppercase.
  // Based on your preflight: src/components/layout/Features.tsx
  const files = walk(SRC);
  for (const f of files) {
    const dir = path.dirname(f);
    const base = path.basename(f);
    if (/[A-Z]/.test(base)) {
      const lowered = base.toLowerCase();
      if (lowered !== base) {
        const target = path.join(dir, lowered);
        if (!fs.existsSync(target)) {
          fs.renameSync(f, target);
          renamed.push(`${path.relative(repoRoot, f)} -> ${path.relative(repoRoot, target)}`);
        }
      }
    }
  }
}

function ensureMainCss() {
  const main = path.join(SRC, "pages", "main.tsx");
  if (!fs.existsSync(main)) return;
  const code = fs.readFileSync(main, "utf8");
  if (!/import\s+["']\.\/index\.css["'];?/.test(code)) {
    const patched = `import "./index.css";\n` + code;
    fs.writeFileSync(main, patched);
    changed.push("add ./index.css -> src/pages/main.tsx");
  }
}

function rewriteImports() {
  const files = walk(SRC).filter(f => JS_TS_EXT.has(path.extname(f)));

  for (const file of files) {
    let code = fs.readFileSync(file, "utf8");
    let original = code;

    const relPath = path.relative(repoRoot, file).replace(/\\/g, "/");

    // Special-case: src/pages/app.tsx
    if (relPath === "src/pages/app.tsx") {
      // Enforce the two relative imports preflight demanded.
      // Replace any imports of .../pages/Index with "./pages/Index"
      code = code.replace(
        /from\s+["'](?:@\/)?pages\/Index["']/g,
        `from "./pages/Index"`
      );
      code = code.replace(
        /from\s+["'](?:@\/)?pages\/NotFound["']/g,
        `from "./pages/NotFound"`
      );
    }

    // General import normalization:
    // 1) Bare imports like "components/..." → "@/components/..."
    code = code.replace(
      /from\s+["'](?!(?:@\/|\.{1,2}\/))([a-zA-Z0-9_-]+\/[^"']*)["']/g,
      (m, p1) => {
        const top = p1.split("/")[0];
        if (ALIASABLE.has(top)) {
          return `from "@/${p1}"`;
        }
        return m;
      }
    );

    // 2) Make relative imports under src prefer "@/..." instead of ../../../
    //    (Skip app.tsx to preserve its required relatives to ./pages/*)
    if (relPath !== "src/pages/app.tsx") {
      code = code.replace(
        /from\s+["'](\.{1,2}\/[^"']*)["']/g,
        (m, p1) => {
          // Resolve relative path → absolute
          const absTarget = path.resolve(path.dirname(file), p1);
          if (!absTarget.startsWith(SRC)) return m; // outside src, leave it
          const aliasPath = toAlias(absTarget).replace(/\.(tsx|ts|jsx|js)$/, "");
          return `from "${aliasPath}"`;
        }
      );
    }

    // 3) Enforce common UI alias paths (just in case)
    code = code.replace(/from\s+["'].*\/ui\/button["']/g, 'from "@/components/ui/button"');
    code = code.replace(/from\s+["'].*\/ui\/card["']/g, 'from "@/components/ui/card"');
    code = code.replace(/from\s+["'].*\/ui\/badge["']/g, 'from "@/components/ui/badge"');
    code = code.replace(/from\s+["'].*\/ui\/input["']/g, 'from "@/components/ui/input"');
    code = code.replace(/from\s+["'].*\/ui\/label["']/g, 'from "@/components/ui/label"');
    code = code.replace(/from\s+["'].*\/ui\/textarea["']/g, 'from "@/components/ui/textarea"');
    code = code.replace(/from\s+["'].*\/ui\/select["']/g, 'from "@/components/ui/select"');
    code = code.replace(/from\s+["'].*\/ui\/progress["']/g, 'from "@/components/ui/progress"');
    code = code.replace(/from\s+["'].*\/ui\/tooltip["']/g, 'from "@/components/ui/tooltip"');
    code = code.replace(/from\s+["'].*\/ui\/skeleton["']/g, 'from "@/components/ui/skeleton"');
    code = code.replace(/from\s+["'].*\/ui\/toaster["']/g, 'from "@/components/ui/toaster"');
    code = code.replace(/from\s+["'].*\/ui\/sonner["']/g, 'from "@/components/ui/sonner"');
    code = code.replace(/from\s+["'].*\/theme\/ThemeToggle["']/g, 'from "@/components/theme/ThemeToggle"');

    // 4) Hooks used in your preflight list
    code = code.replace(/from\s+["'].*\/hooks\/useBackend["']/g, 'from "@/hooks/useBackend"');
    code = code.replace(/from\s+["'].*\/hooks\/use-toast["']/g, 'from "@/hooks/use-toast"');

    // 5) Lib utils
    code = code.replace(/from\s+["'].*\/lib\/utils["']/g, 'from "@/lib/utils"');

    if (code !== original) {
      fs.writeFileSync(file, code);
      changed.push(relPath);
    }
  }
}

function ensureViteAndTSConfig() {
  // Make sure alias "@" -> "./src" exists in vite config and tsconfig
  const viteCandidates = ["vite.config.ts", "vite.config.js"].map(f => path.join(repoRoot, f));
  for (const vite of viteCandidates) {
    if (!fs.existsSync(vite)) continue;
    let v = fs.readFileSync(vite, "utf8");
    if (!/alias\s*:\s*{[^}]*["@']\s*:\s*path\.resolve\(__dirname,\s*["']\.\/src["']\)/s.test(v)) {
      // naive insert or patch
      if (!/resolve\s*:\s*{/.test(v)) {
        v = v.replace(
          /export default defineConfig\(\s*{/,
          `export default defineConfig({\n  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },`
        );
      } else if (/alias\s*:\s*{/.test(v)) {
        // alias object exists—skip to avoid breaking
      } else {
        v = v.replace(
          /resolve\s*:\s*{([^}]*)}/s,
          (m, inner) => `resolve: { ${inner}, alias: { "@": path.resolve(__dirname, "./src") } }`
        );
      }
      if (!/import\s+path\s+from\s+["']path["']/.test(v)) {
        v = `import path from "path";\n` + v;
      }
      fs.writeFileSync(vite, v);
      changed.push(path.basename(vite));
    }
  }

  const tsconfigs = ["tsconfig.json", "tsconfig.paths.json"].map(f => path.join(repoRoot, f));
  for (const cfg of tsconfigs) {
    if (!fs.existsSync(cfg)) continue;
    let t = JSON.parse(fs.readFileSync(cfg, "utf8"));
    t.compilerOptions = t.compilerOptions || {};
    if (!t.compilerOptions.baseUrl) t.compilerOptions.baseUrl = ".";
    const paths = t.compilerOptions.paths || {};
    if (!paths["@/*"]) {
      paths["@/*"] = ["src/*"];
      t.compilerOptions.paths = paths;
      fs.writeFileSync(cfg, JSON.stringify(t, null, 2));
      changed.push(path.basename(cfg));
    }
  }
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error("❌ src/ not found. Run this from the repo root.");
    process.exit(1);
  }

  fixCaseSensitiveNames();
  rewriteImports();
  ensureMainCss();
  ensureViteAndTSConfig();

  console.log("✅ Done.");
  if (renamed.length) {
    console.log("\nRenamed:");
    for (const r of renamed) console.log(" -", r);
  }
  if (changed.length) {
    console.log("\nUpdated:");
    for (const c of changed) console.log(" -", c);
  } else {
    console.log("\nNo changes were needed.");
  }
}

main();
