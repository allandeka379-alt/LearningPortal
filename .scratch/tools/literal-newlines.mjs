// Finds literal backslash-n sequences (the characters "\" then "n") inside the TEXT of built content: JSON string values
// and lesson Markdown. LaTeX commands (\nu, \neq, \nabla, \newline, \not, \ne ...) are fine. A String.raw template (`t`
// in the kits) keeps a typed "\n" as two characters, so stems and solutions render on one line with a visible "\n".
// Usage: node .scratch/tools/literal-newlines.mjs [family ...] [--list]
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const list = args.includes("--list");
const families = args.filter((a) => !a.startsWith("--"));
const root = "content/subjects";
const fams = families.length ? families : fs.readdirSync(root).filter((d) => fs.statSync(path.join(root, d)).isDirectory());
const BAD = /\\n(?![a-z])/g;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(json|md)$/.test(e.name)) out.push(p);
  }
  return out;
}

function strings(v, out) {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) for (const x of v) strings(x, out);
  else if (v && typeof v === "object") for (const x of Object.values(v)) strings(x, out);
  return out;
}

let total = 0;
for (const fam of fams) {
  const dir = path.join(root, fam);
  if (!fs.existsSync(dir)) continue;
  let famCount = 0;
  const hits = [];
  for (const f of walk(dir)) {
    const raw = fs.readFileSync(f, "utf8");
    const texts = f.endsWith(".json") ? strings(JSON.parse(raw), []) : [raw];
    let n = 0;
    const samples = [];
    for (const s of texts) {
      for (const m of s.matchAll(BAD)) {
        n += 1;
        if (samples.length < 2) samples.push(JSON.stringify(s.slice(Math.max(0, m.index - 40), m.index + 30)));
      }
    }
    if (n) {
      famCount += n;
      hits.push(`${f} ${n} ${samples.join(" | ")}`);
    }
  }
  total += famCount;
  if (famCount || families.length) console.log(`${fam}: ${famCount} literal \\n in ${hits.length} files`);
  if (list) for (const h of hits) console.log("  " + h);
}
console.log(`# ${total} total`);
