/**
 * tailwind-to-theme-codemod.js
 * Simple, conservative codemod that:
 * - Scans files under ./src for className="..." or className={'...'} / className={"..."}
 * - Replaces exact Tailwind tokens (and common variant prefixes like md: or hover:) using a mapping
 * - Dry-run by default (prints proposed changes). Use --apply to write files.
 *
 * Usage:
 *  node .\scripts\tailwind-to-theme-codemod.js        # dry-run
 *  node .\scripts\tailwind-to-theme-codemod.js --apply   # apply changes
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');

// conservative mapping
const MAPPING = {
  'bg-black': 'bg-bg',
  'bg-white': 'bg-surface',
  'bg-blue-500': 'bg-brand',
  'bg-blue-600': 'bg-brand',
  'bg-blue-700': 'bg-brand',
  'hover:bg-blue-500': 'hover:bg-brand-hover',
  'hover:bg-blue-600': 'hover:bg-brand-hover',
  'text-white': 'text-text',
  'text-black': 'text-text',
  'shadow-lg': 'shadow-elev-2',
  'shadow-md': 'shadow-elev-1',
  'border-gray-200': 'border-surface',
  'border': 'border-surface'
};

// map a single token, preserving variant prefixes (e.g. md:bg-blue-500 -> md:bg-brand)
function mapToken(token) {
  if (!token || token.trim() === '') return token;
  // direct mapping
  if (MAPPING[token]) return MAPPING[token];

  // handle prefixes like md:, sm:, hover:, lg:, dark:, etc.
  const parts = token.split(':');
  if (parts.length > 1) {
    const last = parts.pop();
    const prefix = parts.join(':');
    if (MAPPING[last]) return `${prefix}:${MAPPING[last]}`;
  }
  return token;
}

function mapClassList(classList) {
  // preserve spacing, collapse multiple spaces to single
  const tokens = classList.split(/\s+/).filter(Boolean);
  const mapped = tokens.map(mapToken);
  return mapped.join(' ');
}

function* walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      yield* walk(full);
    } else if (e.isFile() && /\.(js|jsx|ts|tsx)$/.test(e.name)) {
      yield full;
    }
  }
}

async function run() {
  const isApply = process.argv.includes('--apply');
  if (!fs.existsSync(SRC)) {
    console.error('ERROR: src folder not found at', SRC);
    process.exit(1);
  }

  const files = Array.from(walk(SRC));
  if (!files.length) {
    console.log('No JS/TS files found under src/. Nothing to do.');
    return;
  }

  const summary = [];
  for (const file of files) {
    const raw = fs.readFileSync(file, 'utf8');
    let updated = raw;
    let fileChanged = false;
    const changesForFile = [];

    // regexes for className="..." and className='...' and className={"..."} and className={'...'}
    const patterns = [
      /className\s*=\s*"([^"]*)"/g,
      /className\s*=\s*'([^']*)'/g,
      /className\s*=\s*\{\s*"([^"]*)"\s*\}/g,
      /className\s*=\s*\{\s*'([^']*)'\s*\}/g
    ];

    for (const re of patterns) {
      updated = updated.replace(re, (match, p1) => {
        const original = p1;
        const mapped = mapClassList(original);
        if (mapped !== original) {
          fileChanged = true;
          changesForFile.push({ from: original, to: mapped });
          // preserve same quoting/braces as match
          if (match.startsWith('className={')) {
            // maintain the { "..." } or { '...' } format depending on match
            const quote = match.includes("{'") ? "'" : '"';
            return `className={${quote}${mapped}${quote}}`;
          }
          // otherwise simple quotes
          const quoteChar = match.includes('className=') && match.includes("className='") ? "'" : '"';
          return `className=${quoteChar}${mapped}${quoteChar}`;
        }
        return match;
      });
    }

    if (fileChanged) {
      summary.push({ file, changes: changesForFile });
      if (isApply) {
        fs.writeFileSync(file, updated, 'utf8');
      }
    }
  }

  // print report
  if (!summary.length) {
    console.log('Dry-run: No replacements needed (no className string matches changed).');
    return;
  }

  console.log('---- Proposed replacements ----');
  for (const s of summary) {
    console.log(`\nFile: ${s.file}`);
    for (const c of s.changes) {
      console.log(`  - "${c.from}"  ->  "${c.to}"`);
    }
  }
  console.log('--------------------------------');

  if (isApply) {
    console.log(`Applied changes to ${summary.length} file(s).`);
  } else {
    console.log('Dry-run complete. Re-run with --apply to write changes.');
  }
}

run().catch(e => {
  console.error('Fatal error', e && e.stack || e);
  process.exit(1);
});
