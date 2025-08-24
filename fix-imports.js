import fs from "fs";
import path from "path";

const srcDir = path.join(process.cwd(), "src");

function walk(dir) {
  let files = [];
  for (const file of fs.readdirSync(dir)) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(walk(fullPath));
    } else if (/\.(ts|tsx|jsx)$/.test(file)) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = walk(srcDir);

for (const filePath of files) {
  let content = fs.readFileSync(filePath, "utf-8");

  // Regex to find imports and replace with lowercase paths
  content = content.replace(
    /from\s+['"](@\/[^\s'"]+)['"]/g,
    (match, p1) => {
      const parts = p1.split("/");
      const lowerPath = parts.map((part, i) =>
        i === 0 ? part : part.toLowerCase()
      ).join("/");
      return `from '${lowerPath}'`;
    }
  );

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`Fixed imports in ${filePath}`);
}

console.log("All imports fixed!");
