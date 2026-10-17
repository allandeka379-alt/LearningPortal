// agriculture-o reproduction diagrams (cow tract, bull tract, heat and calving timelines).
// Run: node .scratch/agriculture-o/diagrams/repro.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { lab, C, L as LP, insertAfterBlock } from "./lib.mjs";
const FAMILY = "agriculture-o";
const L = LP(FAMILY);
const tube = (d, w, fill = "#f6dcd9") => D.path_(d, { stroke: C.axis, width: w + 4 }) + D.path_(d, { stroke: fill, width: w });
const leader = (x1, y1, x2, y2) => D.line(x1, y1, x2, y2, { stroke: C.muted, width: 1 });

// ---------------------------------------------------------------- cow: female reproductive tract (front view, schematic)
{
  const W = 600, H = 470;
  let b = "";
  const cx = 300;
  b += D.circle(160, 60, 22, { fill: C.fillAmber, stroke: C.axis, width: 2 }) + D.circle(150, 56, 6, { fill: "#fff", stroke: C.axis, width: 1.4 });
  b += D.circle(440, 60, 22, { fill: C.fillAmber, stroke: C.axis, width: 2 }) + D.circle(450, 56, 6, { fill: "#fff", stroke: C.axis, width: 1.4 });
  // oviducts then horns
  b += tube("M184,66 C230,52 250,92 235,125", 5, "#f0c9c4") + tube("M416,66 C370,52 350,92 365,125", 5, "#f0c9c4");
  b += tube("M235,125 C240,180 280,195 300,245", 18) + tube("M365,125 C360,180 320,195 300,245", 18);
  b += tube("M300,245 L300,290", 34);
  b += tube("M300,290 L300,332", 34, "#e7b9b3");
  b += D.line(300, 292, 300, 330, { stroke: C.axis, width: 2 });
  b += tube("M300,340 L300,398", 26, "#f6dcd9");
  b += D.polyline([[282, 398], [300, 424], [318, 398]], { close: true, fill: "#e7b9b3", stroke: C.axis, width: 2 });
  // labels left
  b += leader(138, 60, 100, 60) + D.text(10, 52, "Ovary (two):", { size: 14, weight: 700 }) + D.text(10, 70, "eggs, oestrogen,\nprogesterone", { size: 12, fill: C.muted });
  b += leader(237, 98, 112, 148) + D.text(10, 150, "Oviduct:", { size: 14, weight: 700 }) + D.text(10, 168, "fertilisation\nhappens here", { size: 12, fill: C.muted });
  b += leader(258, 172, 125, 232) + D.text(10, 236, "Uterine horn:", { size: 14, weight: 700 }) + D.text(10, 254, "embryo implants\nand develops", { size: 12, fill: C.muted });
  // labels right
  b += leader(463, 60, 468, 60) + D.text(470, 36, "follicle (egg) becomes\ncorpus luteum\nafter ovulation", { size: 12, fill: C.muted });
  b += leader(318, 268, 400, 262) + D.text(404, 262, "Uterine body", { size: 14, weight: 700 });
  b += leader(318, 312, 400, 318) + D.text(404, 318, "Cervix:", { size: 14, weight: 700 }) + D.text(404, 336, "thick muscular neck;\nmucus plug in pregnancy,\nopens at heat and birth", { size: 12, fill: C.muted });
  b += leader(314, 370, 400, 395) + D.text(404, 400, "Vagina:", { size: 14, weight: 700 }) + D.text(404, 418, "receives penis or AI gun;\nbirth canal", { size: 12, fill: C.muted });
  b += D.text(150, 450, "Vulva: external opening, swells and reddens at heat", { size: 12, fill: C.muted, anchor: "start" });
  const alt = "Front view of the cow's reproductive tract: two ovaries, each with an oviduct where fertilisation takes place, leading to two uterine horns that join in the uterine body, then the thick-walled cervix, the vagina and the vulva.";
  const cap = "Figure: the reproductive system of the cow (schematic)";
  await D.figure(FAMILY, "cow-reproductive-system", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/livestock/reproduction.md`, "Described from the ovaries outward", D.md("cow-reproductive-system", alt, cap));
}

// ---------------------------------------------------------------- bull: male reproductive system (side view, schematic)
{
  const W = 600, H = 430;
  let b = "";
  // body wall hint
  // bladder, urethra
  b += D.circle(190, 110, 30, { fill: C.fillBlue, stroke: C.axis, width: 2 });
  b += tube("M215,125 C240,135 262,138 285,138", 10, C.fillBlue);
  // accessory glands
  b += D.circle(255, 108, 14, { fill: C.fillGreen, stroke: C.axis, width: 1.8 }) + D.circle(285, 108, 11, { fill: C.fillGreen, stroke: C.axis, width: 1.8 });
  // penis with sigmoid flexure to sheath
  b += D.rect(488, 154, 58, 32, { fill: "#f6efe4", stroke: C.axis, width: 2, r: 12 });
  b += tube("M285,138 C320,138 335,185 355,185 C385,185 380,130 410,130 C445,130 470,170 500,170 L540,170", 14, "#f0c9c4");
  // scrotum, testis, epididymis
  b += D.path_("M150,230 C100,250 100,360 170,370 C240,360 240,250 190,230 Z", { stroke: C.axis, width: 2.4, fill: "#f6efe4" });
  b += D.path_("M170,260 C140,262 135,320 165,340 C200,330 205,270 170,260 Z", { stroke: C.axis, width: 2, fill: C.fillAmber });
  b += tube("M195,262 C215,290 212,330 180,352", 6, C.fillGreen);
  // vas deferens
  b += D.path_("M190,255 C215,215 205,160 222,138", { stroke: C.blue, width: 3 });
  // labels
  b += leader(160, 100, 100, 96) + D.text(10, 100, "Bladder", { size: 14, weight: 700 });
  b += D.text(215, 34, "Accessory glands", { size: 14, weight: 700 }) + D.text(215, 50, "add fluid that feeds and carries sperm (semen)", { size: 12, fill: C.muted });
  b += leader(255, 94, 255, 58) + leader(285, 97, 285, 58);
  b += D.text(330, 240, "Sigmoid flexure:", { size: 14, weight: 700 }) + D.text(330, 257, "S-bend that straightens\nwhen the penis extends", { size: 12, fill: C.muted });
  b += leader(372, 205, 372, 228);
  b += D.text(392, 104, "Penis (urethra carries semen)", { size: 13, weight: 700 });
  b += D.text(440, 215, "Sheath: skin fold that\nprotects the penis", { size: 12, fill: C.muted });
  b += leader(520, 184, 520, 205);
  b += D.text(10, 175, "Vas deferens: carries\nsperm from epididymis\nto the urethra", { size: 12, fill: C.muted });
  b += leader(140, 195, 207, 190);
  b += D.text(250, 300, "Testis: sperm and\ntestosterone", { size: 14, weight: 700 }) + leader(205, 305, 247, 305);
  b += D.text(250, 345, "Epididymis: sperm\nmature and are stored", { size: 14, weight: 700 }) + leader(212, 340, 247, 345);
  b += D.text(250, 395, "Scrotum: holds the testes outside the body,\na few degrees cooler than the body", { size: 12, fill: C.muted });
  const alt = "Side view of the bull's reproductive system: testis and epididymis inside the scrotum, the vas deferens carrying sperm up to the urethra near the bladder, accessory glands adding fluid to make semen, and the penis with its S-shaped sigmoid flexure inside the sheath.";
  const cap = "Figure: the reproductive system of the bull (schematic)";
  await D.figure(FAMILY, "bull-reproductive-system", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/livestock/reproduction.md`, "## The male reproductive system (bull)", D.md("bull-reproductive-system", alt, cap));
}

// ---------------------------------------------------------------- heat dates (worked example: 3 March 2026 + 21 days, twice)
const utc = (y, m, d) => Date.UTC(y, m - 1, d);
const addDays = (t, n) => t + n * 86400000;
const fmtDay = (t) => { const d = new Date(t); return `${d.getUTCDate()} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getUTCMonth()]}`; };
{
  const W = 600, H = 220, cycle = 21;
  const t0 = utc(2026, 3, 3);
  const heats = [0, 1, 2].map((i) => addDays(t0, i * cycle));
  const labels = heats.map(fmtDay);
  if (labels.join() !== "3 Mar,24 Mar,14 Apr") throw new Error("dates " + labels);
  const X = (day) => 40 + (day / (2 * cycle + 7)) * 520;
  let b = "";
  b += D.arrow(40, 130, 580, 130, { width: 2 });
  for (let d = 0; d <= 2 * cycle + 7; d += 7) { b += D.line(X(d), 126, X(d), 136, { stroke: C.axis, width: 1.4 }) + D.text(X(d), 154, `day ${d}`, { anchor: "middle", size: 12, fill: C.muted }); }
  heats.forEach((t, i) => {
    const d = i * cycle;
    b += D.rect(X(d) - 4, 92, 8, 38, { fill: C.red, stroke: C.red, width: 1 });
    b += D.text(X(d), 80, labels[i], { anchor: "middle", size: 14, weight: 700, fill: C.red });
    b += D.text(X(d), 64, i === 0 ? "heat seen" : "expected heat", { anchor: "middle", size: 12, fill: C.muted });
    if (i < 2) {
      b += D.line(X(d) + 8, 178, X((i + 1) * cycle) - 8, 178, { stroke: C.blue, width: 2, arrow: true, arrowStart: true });
      b += D.text((X(d) + X((i + 1) * cycle)) / 2, 198, `${cycle} days`, { anchor: "middle", size: 13, fill: C.blue, weight: 700 });
    }
  });
  const alt = "Timeline of the Jersey heifer's heats: standing heat seen on 3 March 2026, then expected heats 21 days later on 24 March and again on 14 April, each heat lasting less than a day.";
  const cap = "Figure: predicting the next heats of the heifer, 21 days apart (3 March, 24 March, 14 April 2026)";
  await D.figure(FAMILY, "heifer-heat-dates-timeline", D.svg(W, H, b), { alt, caption: cap });
  insertAfterBlock(`${L}/livestock/reproduction.md`, "Chipo sees a Jersey heifer on standing heat", D.md("heifer-heat-dates-timeline", alt, cap));
}

// ---------------------------------------------------------------- calving interval (worked example: 283 + 85 = 368 vs 365)
{
  const gest = 283, afterCalving = 85, target = 365, mustConceive = target - gest;
  if (mustConceive !== 82 || gest + afterCalving !== 368) throw new Error("calving numbers");
  const W = 600, H = 240;
  const X = (d) => 30 + (d / 380) * 540;
  let b = "";
  b += D.text(30, 30, "Tendai's cow: one calving to the next", { weight: 700, size: 14 });
  b += D.rect(X(0), 70, X(afterCalving) - X(0), 34, { fill: C.fillAmber, stroke: C.amber, width: 1.6 });
  b += D.text((X(0) + X(afterCalving)) / 2, 92, `${afterCalving} days to conceive`, { anchor: "middle", size: 12 });
  b += D.rect(X(afterCalving), 70, X(afterCalving + gest) - X(afterCalving), 34, { fill: C.fillBlue, stroke: C.blue, width: 1.6 });
  b += D.text((X(afterCalving) + X(afterCalving + gest)) / 2, 92, `${gest} days gestation`, { anchor: "middle", size: 13 });
  b += D.text(X(0), 124, "Calving", { anchor: "start", size: 12, fill: C.muted });
  b += D.text(X(190), 124, `Next calving: ${gest + afterCalving} days after the last`, { anchor: "middle", size: 13, weight: 700 });
  // target bar
  b += D.line(X(target), 56, X(target), 150, { stroke: C.red, width: 2, dash: true });
  b += D.text(X(target) - 6, 52, `${target}-day target (one calf a year)`, { anchor: "end", size: 12, fill: C.red });
  b += D.line(X(mustConceive), 130, X(mustConceive), 160, { stroke: C.green, width: 2 });
  b += D.text(X(mustConceive), 180, `Must conceive within ${mustConceive} days`, { anchor: "start", size: 13, fill: C.green, weight: 700 });
  b += D.text(X(mustConceive), 198, `of calving to reach ${target} days (${target} − ${gest} = ${mustConceive})`, { anchor: "start", size: 12, fill: C.muted });
  b += D.line(X(0), 150, X(target) , 150, { stroke: C.axis, width: 1 });
  const alt = "Bar showing a cow's calving interval of 368 days: 85 days from calving to conception plus a 283-day gestation, which overshoots the 365-day target; to calve every year she must conceive within 82 days of calving (365 minus 283).";
  const cap = "Figure: the calving interval of Tendai's cow (85 + 283 = 368 days) against the 365-day target";
  await D.figure(FAMILY, "calving-interval-bar", D.svg(W, H, b), { alt, caption: cap });
  insertAfterBlock(`${L}/livestock/reproduction.md`, "Tendai's cow is served on 12 January 2026", D.md("calving-interval-bar", alt, cap));
}
console.log("repro done");
