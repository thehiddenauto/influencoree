// scripts/fix-imports-and-casing.cjs
// Run: node scripts/fix-imports-and-casing.cjs
const fs = require('fs');
const path = require('path');

const root = path.resolve(process.cwd(), 'src');
const exts = ['.js','.jsx','.ts','.tsx','.tsx','.ts','.cjs','.mjs'];

function listFiles(dir){
  try { return fs.readdirSync(dir, { withFileTypes: true }); }
  catch(e){ return []; }
}

function findEntryCaseInsensitive(dir, name){
  // returns the actual entry name if exists ignoring case, otherwise null
  const entries = listFiles(dir);
  const lower = name.toLowerCase();
  for(const e of entries){
    if(e.name.toLowerCase() === lower) return e.name;
  }
  return null;
}

function resolveActualPathParts(parts){
  // parts are relative to root (e.g. ['components','hero'])
  let cur = root;
  const actualParts = [];
  for(const p of parts){
    const match = findEntryCaseInsensitive(cur, p);
    if(!match) {
      // not found in directory
      actualParts.push(p);
      cur = path.join(cur, p);
    } else {
      actualParts.push(match);
      cur = path.join(cur, match);
    }
  }
  return actualParts;
}

function findExistingFileCandidates(base){
  // base: absolute path without extension or with trailing folder (like .../button)
  // try file.ext and index.ext
  for(const ext of exts){
    const f = base + ext;
    if(fs.existsSync(f)) return f;
  }
  for(const ext of exts){
    const idx = path.join(base, 'index' + ext);
    if(fs.existsSync(idx)) return idx;
  }
  return null;
}

function ensureDir(p){
  if(!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function backupFile(file){
  const bak = file + '.bak';
  if(!fs.existsSync(bak)) fs.copyFileSync(file, bak);
}

function fixFileImports(file){
  let src = fs.readFileSync(file, 'utf8');
  const original = src;
  // Replace any "from 'src/..." or import 'src/...' usage to @/
  src = src.replace(/from\s+(['"])src\//g, 'from $1@/').replace(/import\s+(['"])src\//g, 'import $1@/');

  // For imports that start with @/components/... try to adjust casing to actual files
  const importRegex = /from\s+(['"])(@\/[^'"]+)['"]/g;
  src = src.replace(importRegex, (m, quote, imp) => {
    // imp is like "@/components/hero/sub"
    const rel = imp.replace(/^@\//, '');
    const parts = rel.split('/');
    const actualParts = resolveActualPathParts(parts);
    const candidateBase = path.join(root, ...actualParts);
    const found = findExistingFileCandidates(candidateBase);
    // if we find a file (or index) with proper case, return that path (with same extless import)
    if(found){
      // compute import path without extension: use joined actualParts
      const corrected = '@/' + actualParts.join('/');
      return `from ${quote}${corrected}${quote}`;
    } else {
      // no match found: still return the original import unchanged
      return `from ${quote}${imp}${quote}`;
    }
  });

  if(src !== original){
    backupFile(file);
    fs.writeFileSync(file, src, 'utf8');
    console.log('patched', path.relative(process.cwd(), file));
  }
}

function ensureUseToast(){
  const uiDir = path.join(root, 'components', 'ui');
  ensureDir(uiDir);
  const target = path.join(uiDir, 'use-toast.jsx');
  if(fs.existsSync(target)) {
    console.log('use-toast exists, skipping creation:', target);
    return;
  }
  const content = `// Auto-generated placeholder useToast - replace with your app implementation
export function useToast(){
  // minimal no-op toast - replace with real implementation
  const toast = (opts) => {
    if (typeof window !== 'undefined') {
      console.log('[toast]', opts);
    }
  };
  return { toast };
}
`;
  fs.writeFileSync(target, content, 'utf8');
  console.log('created placeholder', path.relative(process.cwd(), target));
}

function fixDashboardDefaultExport(){
  const dash = path.join(root, 'pages', 'dashboard.jsx');
  if(!fs.existsSync(dash)) return;
  let src = fs.readFileSync(dash, 'utf8');
  if(/export\s+default\s+/.test(src)) {
    console.log('dashboard.jsx already has default export');
    return;
  }
  // look for export const Dashboard or export function Dashboard
  if(/export\s+(?:const|let|var)\s+Dashboard\s*=/.test(src) || /export\s+function\s+Dashboard\s*\(/.test(src)){
    backupFile(dash);
    // remove 'export ' from the declaration
    src = src.replace(/export\s+(const|let|var)\s+Dashboard\s*=/, '$1 Dashboard =');
    src = src.replace(/export\s+function\s+Dashboard\s*\(/, 'function Dashboard(');
    // append default export if not already present
    if(!/export\s+default\s+Dashboard/.test(src)) src = src + '\n\nexport default Dashboard;\n';
    fs.writeFileSync(dash, src, 'utf8');
    console.log('converted Dashboard to default export in pages/dashboard.jsx');
    return;
  }
  // if there's a named export like `export { Dashboard }` -> convert by adding default export if Dashboard exists
  if(/export\s+\{[^}]*Dashboard[^}]*\}/.test(src)){
    // try to see if Dashboard is declared
    if(/(?:const|let|var|function)\s+Dashboard\s*=|function\s+Dashboard\s*\(/.test(src)){
      backupFile(dash);
      if(!/export\s+default\s+Dashboard/.test(src)) src = src + '\n\nexport default Dashboard;\n';
      fs.writeFileSync(dash, src, 'utf8');
      console.log('added default export for Dashboard in pages/dashboard.jsx');
      return;
    }
  }
}

function walkAndFix(){
  const files = [];
  function walk(dir){
    const items = listFiles(dir);
    for(const it of items){
      const full = path.join(dir, it.name);
      if(it.isDirectory()){
        walk(full);
      } else {
        const ext = path.extname(it.name).toLowerCase();
        if(['.js','.jsx','.ts','.tsx'].includes(ext)){
          files.push(full);
        }
      }
    }
  }
  walk(root);
  for(const f of files) fixFileImports(f);
  // create placeholder if missing
  ensureUseToast();
  // dashboard default
  fixDashboardDefaultExport();
  console.log('done');
}

if(!fs.existsSync(root)){
  console.error('Error: src directory not found at', root);
  process.exit(1);
}
walkAndFix();
