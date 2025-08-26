// scripts/diagnose.js
// Run: node scripts/diagnose.js
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');
const exts = ['.js', '.jsx', '.ts', '.tsx', '.cjs', '.mjs'];

function walk(dir) {
  const entries = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) entries.push(...walk(full));
    else entries.push(full);
  }
  return entries;
}

function existsWithExt(basePath) {
  if (fs.existsSync(basePath) && fs.statSync(basePath).isFile()) return basePath;
  for (const e of exts) {
    if (fs.existsSync(basePath + e)) return basePath + e;
    if (fs.existsSync(path.join(basePath, 'index' + e))) return path.join(basePath, 'index' + e);
  }
  return null;
}

const files = walk(SRC).filter(f => exts.includes(path.extname(f)));
const report = {
  missingTargets: [],
  pagesMissingDefault: [],
  importsDefaultButTargetHasNoDefault: [],
  summary: {}
};

const importRegex = /import\s+(?:.+?)\s+from\s+['"]([^'"]+)['"]/g;
const defaultImportRegex = /import\s+([A-Za-z0-9_$]+)\s+from\s+['"]([^'"]+)['"]/;

const fileContents = {};
for (const f of files) fileContents[f] = fs.readFileSync(f, 'utf8');

for (const f of files) {
  const content = fileContents[f];
  let m;
  while ((m = importRegex.exec(content))) {
    const imp = m[1];
    // handle alias @/ => src/
    if (imp.startsWith('@/')) {
      const targetRel = imp.replace(/^@\//, '');
      const candidate = path.join(ROOT, 'src', targetRel);
      const resolved = existsWithExt(candidate);
      if (!resolved) {
        report.missingTargets.push({ file: path.relative(ROOT, f), import: imp, expected: candidate });
      } else {
        // check casing exactness
        const actual = resolved;
        // nothing more here; resolved exists
      }
    } else if (imp.startsWith('./') || imp.startsWith('../')) {
      const candidate = path.resolve(path.dirname(f), imp);
      const resolved = existsWithExt(candidate);
      if (!resolved) {
        report.missingTargets.push({ file: path.relative(ROOT, f), import: imp, expected: candidate });
      }
    }
    // check default import vs target having default later
    const defaultMatch = content.match(defaultImportRegex);
    // we will check after gathering page exports
  }
}

// Check pages for default export
const pages = files.filter(ff => ff.includes(path.join('src', 'pages')));
for (const p of pages) {
  const c = fileContents[p];
  if (!/export\s+default/.test(c)) {
    // try detect named component
    const m = c.match(/export\s+(?:const|function)\s+([A-Za-z0-9_]+)/) || c.match(/function\s+([A-Za-z0-9_]+)\s*\(/);
    report.pagesMissingDefault.push({ file: path.relative(ROOT, p), reason: m ? `named ${m[1]}` : 'no default found' });
  }
}

// Check imports that expect default but target lacks it
for (const f of files) {
  const content = fileContents[f];
  let match;
  while ((match = importRegex.exec(content))) {
    const impPath = match[1];
    const defaultMatch = content.substring(match.index, match.index + 200).match(defaultImportRegex);
    if (defaultMatch) {
      const importName = defaultMatch[1];
      // resolve target
      let candidate;
      if (impPath.startsWith('@/')) candidate = path.join(ROOT, 'src', impPath.replace('@/', ''));
      else candidate = path.resolve(path.dirname(f), impPath);
      const resolved = existsWithExt(candidate);
      if (resolved) {
        const targetContent = fs.readFileSync(resolved, 'utf8');
        if (!/export\s+default/.test(targetContent)) {
          report.importsDefaultButTargetHasNoDefault.push({
            importer: path.relative(ROOT, f),
            importPath: impPath,
            target: path.relative(ROOT, resolved),
            importName
          });
        }
      }
    }
  }
}

report.summary.totalFilesScanned = files.length;
report.summary.pagesChecked = pages.length;
report.summary.missingTargets = report.missingTargets.length;
report.summary.pagesMissingDefault = report.pagesMissingDefault.length;
report.summary.importsDefaultButTargetHasNoDefault = report.importsDefaultButTargetHasNoDefault.length;

console.log(JSON.stringify(report, null, 2));
fs.writeFileSync(path.join(ROOT, 'diagnostics.report.json'), JSON.stringify(report, null, 2));
console.log('Wrote diagnostics.report.json');
