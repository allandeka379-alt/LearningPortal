// Contact sheet for review: node .scratch/mathematics-o/diagrams/sheet.mjs out.png name1 name2 ...
import sharp from "sharp";
const [out, ...names] = process.argv.slice(2);
const cols = names.length >= 3 ? 3 : names.length;
const W = 720;
const imgs = await Promise.all(names.map((n) => sharp(`content/subjects/mathematics-o/media/diagrams/${n}.png`).resize({ width: W }).flatten({ background: "#fff" }).toBuffer()));
const metas = await Promise.all(imgs.map((b) => sharp(b).metadata()));
const rows = Math.ceil(names.length / cols);
const H = Math.max(...metas.map((m) => m.height));
await sharp({ create: { width: W * cols, height: H * rows, channels: 3, background: "#ffffff" } })
  .composite(imgs.map((b, i) => ({ input: b, left: (i % cols) * W, top: Math.floor(i / cols) * H })))
  .png().toFile(out);
