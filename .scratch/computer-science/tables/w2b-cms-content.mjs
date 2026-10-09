// Tables for lessons/web/cms-content.md: uncompressed image sizes before and after resizing (24-bit colour).
const size = (w, h, bitsPerPixel = 24) => {
  const bytes = (w * h * bitsPerPixel) / 8;
  return { w, h, bytes, KB: bytes / 1024, MB: bytes / 1024 / 1024 };
};
const before = size(1024, 768);
const after = size(512, 384);
console.log("| Image | Width × height (pixels) | Pixels | Bytes (3 per pixel) | Size |");
console.log("|:--|:-:|--:|--:|--:|");
for (const [name, s] of [["Original photo", before], ["Resized for the web", after]]) {
  console.log(`| ${name} | ${s.w} × ${s.h} | ${(s.w * s.h).toLocaleString("en-GB")} | ${s.bytes.toLocaleString("en-GB")} | ${s.KB} KB${s.MB >= 1 ? ` (${s.MB} MB)` : ""} |`);
}
console.log(`ratio ${before.bytes / after.bytes}`);
