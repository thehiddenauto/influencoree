/**
 * Preflight script for Influencoree (frontend)
 * - Scans repo for uppercase files (case sensitivity issues on Vercel)
 * - Validates import paths against real filesystem
 * - Runs a dry-run build if checks pass
 */

const fs = require("fs");
const path = require("path");
const glob = require("glob");
const { spawnSync } = require("child_process");

let issues = [];

/**
 * Check 1: Uppercase file/folder names
 */
glob.sync("src/**/*.*").forEach(file => {
  const rel = file.replace(/\\/g, "/");
  if (/[A-Z]/.test(path.basename(rel))) {
    issues.push(`❌ Uppercase in path: ${rel}`);
  }
});

/**
 * Check 2: Validate imports match actual files
 */
const importRegex = /from\s+["']([^"']+)["']/g;

glob.sync("src/**/*.{js,jsx,ts,tsx}").forEach(file => {
  const content = fs.readFileSync(file, "utf8");
  let match;

  while ((match = importRegex.exec(content))) {
    let importPath = match[1];

    // Only check relative and alias imports
    if (importPath.startsWith(".") || importPath.startsWith("@/")) {
      // Resolve absolute path for alias
      if (importPath.startsWith("@/")) {
        importPath = path.join("src", importPath.replace(/^@\//, ""));
      } else {
        importPath = path.resolve(path.dirname(file), importPath);
      }

      // Try possible extensions
      const candidates = [
        importPath,
        importPath + ".js",
        importPath + ".jsx",
        importPath + ".ts",
        importPath + ".tsx",
        path.join(importPath, "index.js"),
        path.join(importPath, "index.jsx"),
        path.join(importPath, "index.ts"),
        path.join(importPath, "index.tsx"),
      ];

      if (!candidates.some(p => fs.existsSync(p))) {
        issues.push(`❌ Import not found in ${file}: ${match[1]}`);
      }
    }
  }
});

/**
 * Final report
 */
if (issues.length > 0) {
  console.error("\n🚨 Preflight check failed:\n" + issues.join("\n"));
  process.exit(1);
} else {
  console.log("✅ Preflight checks passed. Running dry-run build...");

  const result = spawnSync("npm", ["run", "build"], { stdio: "inherit", shell: true });

  if (result.status !== 0) {
    console.error("🚨 Build failed during preflight.");
    process.exit(result.status);
  } else {
    console.log("✅ Build succeeded. Safe to deploy.");
  }
}
