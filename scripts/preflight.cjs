// scripts/preflight.cjs
/* Minimal preflight to catch bad imports quickly */
const fs = require("fs");
const path = require("path");

const SRC = path.resolve(process.cwd(), "src");
const aliasRoot = SRC; // "@/..." => under /src

/** Collect all source files */
function walk(dir, list = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, list);
    else if (/\.(jsx?|tsx?)$/.test(entry.name)) list.push(p);
  }
  return list;
}

function check() {
  let errors = [];
  for (const file of walk(SRC)) {
    const src = fs.readFileSync(file, "utf8");
    const re = /from\s+["'](@\/[^"']+)["']/g;
    let m;
    while ((m = re.exec(src))) {
      const spec = m[1]; // e.g. "@/pages/dashboard"
      const rel = spec.replace(/^@\//, "");
      const base = path.join(aliasRoot, rel);
      const tried = [".tsx", ".ts", ".jsx", ".js", "/index.tsx", "/index.ts", "/index.jsx", "/index.js"];
      const ok = tried.some(ext => fs.existsSync(base + ext));
      if (!ok) {
        errors.push(`${path.relative(process.cwd(), file)} imports ${spec} which doesn't resolve`);
      }
    }
  }
  if (errors.length) {
    console.error("❌ Preflight failed:\n - " + errors.join("\n - "));
    process.exit(1);
  }
  console.log("✅ Preflight OK");
}

check();