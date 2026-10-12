// node .scratch/physics-a/montage.mjs out.png name1 name2 ... (stacks diagrams in 2 columns)
import sharp from "sharp";
const [out, ...names] = process.argv.slice(2);
const dir = "content/subjects/physics-a/media/diagrams/";
const imgs = await Promise.all(names.map(async (n) => { const b = await sharp(dir + n + ".png").resize({ width: 760 }).png().toBuffer(); const m = await sharp(b).metadata(); return { b, h: m.height }; }));
const rows = []; for (let i = 0; i < imgs.length; i += 2) rows.push(imgs.slice(i, i + 2));
let y = 0; const comps = [];
for (const r of rows) { comps.push(...r.map((im, j) => ({ input: im.b, left: j * 770, top: y }))); y += Math.max(...r.map((i) => i.h)) + 10; }
await sharp({ create: { width: 1530, height: y, channels: 3, background: "#cccccc" } }).composite(comps).png().toFile(out);
