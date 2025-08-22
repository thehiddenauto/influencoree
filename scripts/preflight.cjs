// scripts/preflight.cjs
// Fails fast on casing problems & missing files for alias/relative imports.

const fs = require("fs");
const path = require("path");
const glob = require("glob");

const SRC = path.join(process.cwd(), "src");
let issues = [];

// 1) Disallow ANY uppercase in filenames (Linux servers are case-sensitive)
glob.sync("src/**/*", { nodir: false }).forEach((p) => {
  const base = path.basename(p);
  if (/[A-Z]/.test(base)) issues.push(`Uppercase name found: ${p}`);
});

// 2) Verify imports resolve on disk (supports @ alias and relative)
const importRe = /(?:import|export)\s+(?:[^'"]*\s+from\s+)?['"]([^'"]+)['"]/g;

function existsAny(p) {
  const exts = ["", ".jsx", ".js", ".tsx", ".ts", "/index.jsx", "/index.js", "/index.tsx", "/index.ts"];
  return exts.some((ext) => fs.existsSync(p + ext));
}

glob.sync("src/**/*.{js,jsx,ts,tsx}").forEach((file) => {
  const code = fs.readFileSync(file, "utf8");
  let m;
  while ((m = importRe.exec(code))) {
    const imp = m[1];
    if (imp.startsWith("@/")) {
      const resolved = path.join(SRC, imp.slice(2));
      if (!existsAny(resolved)) issues.push(`Missing alias import in ${file}: ${imp}`);
    } else if (imp.startsWith(".")) {
      const resolved = path.resolve(path.dirname(file), imp);
      if (!existsAny(resolved)) issues.push(`Missing relative import in ${file}: ${imp}`);
    }
  }
});

if (issues.length) {
  console.error("\n❌ Preflight failed:");
  issues.forEach((i) => console.error(" - " + i));
  process.exit(1);
} else {
  console.log("✅ Preflight passed");
}
