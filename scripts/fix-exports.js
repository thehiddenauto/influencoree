import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, "../src/pages");
const exts = [".jsx", ".tsx"];

for (const file of fs.readdirSync(pagesDir)) {
  if (!exts.some((e) => file.endsWith(e))) continue;
  const fp = path.join(pagesDir, file);
  let src = fs.readFileSync(fp, "utf8");

  const hasDefault = /export\s+default\s+/m.test(src);
  const named = src.match(/export\s+const\s+(\w+)/);

  if (!hasDefault && named) {
    const name = named[1];
    src += `\nexport default ${name};\n`;
    fs.writeFileSync(fp, src, "utf8");
    console.log(`Added default export to ${file}`);
  }
}
console.log("Done.");