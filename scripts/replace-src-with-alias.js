// scripts/replace-src-with-alias.js
const fs = require('fs');
const path = require('path');

const exts = new Set(['.js','.jsx','.ts','.tsx']);
function walk(dir){
  for(const name of fs.readdirSync(dir, { withFileTypes: true })){
    const p = path.join(dir, name.name);
    if(name.isDirectory()){
      walk(p);
    } else if(exts.has(path.extname(p))){
      let src = fs.readFileSync(p, 'utf8');
      const before = src;
      // handle: from "@/..." and import "@/..."
      src = src.replace(/from\s+(['"])src\//g, 'from $1@/');
      src = src.replace(/import\s+(['"])src\//g, 'import $1@/');
      if(src !== before){
        fs.copyFileSync(p, p + '.bak'); // backup
        fs.writeFileSync(p, src, 'utf8');
        console.log('patched', p);
      }
    }
  }
}

walk(path.resolve(process.cwd(), 'src'));
console.log('done');
