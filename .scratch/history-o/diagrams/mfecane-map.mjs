import { D, C, place } from "./hlib.mjs";
const F = "history-o";
const w = 560, h = 560;
let b = D.rect(0, 0, w, h, { fill: "#fff", stroke: C.grid, width: 1 });
b += D.path_(`M470,0 L560,0 L560,560 L420,560 L440,480 L452,400 L448,330 L455,250 L470,160 L478,70 Z`, { fill: C.fillBlue, stroke: C.teal, width: 1.4 });
b += D.text(522, 300, "Indian\nOcean", { anchor: "middle", size: 14, fill: C.teal, italic: true });
b += D.polyline([[40, 150], [120, 168], [200, 150], [290, 172], [380, 150], [462, 165]], { stroke: C.teal, width: 2.4 });
b += D.text(230, 140, "Zambezi River", { size: 13, fill: C.teal });
b += D.polyline([[110, 322], [200, 308], [290, 326], [380, 310], [450, 322]], { stroke: C.teal, width: 2.4 });
b += D.text(300, 346, "Limpopo River", { size: 13, fill: C.teal });
const reg = (x, y, s, o = {}) => D.tag(x, y, s, { anchor: "middle", size: 13, ...o });
b += reg(190, 252, "Zimbabwe plateau (Rozvi lands)", { bg: C.fillGrey });
b += reg(212, 424, "Highveld");
b += reg(380, 480, "Zulu kingdom (KwaZulu-Natal)", { bg: C.fillAmber, stroke: C.amber });
b += reg(300, 530, "Sotho (Moshoeshoe)", { bg: C.fillGreen, stroke: C.green });
const A = (pts, col, dash) => D.path_(`M${pts.map((p) => p.join(",")).join(" L")}`, { stroke: col, width: 2.6, arrow: true, dash });
// Mzilikazi
b += A([[340, 462], [300, 440], [262, 426]], C.blue);
b += A([[212, 406], [206, 330], [200, 266]], C.blue);
b += D.text(220, 372, "1837: leaves\nthe Transvaal", { size: 12, fill: C.blue });
b += D.tag(216, 290, "Ndebele,", { size: 13, bg: "#fff", stroke: C.blue }) + D.tag(216, 312, "c. 1838-1840", { size: 13, bg: "#fff", stroke: C.blue });
// Zwangendaba
b += A([[372, 462], [330, 380], [322, 262], [322, 200], [330, 110], [322, 68]], C.amber);
b += D.tag(316, 84, "Zwangendaba crosses", { anchor: "end", size: 13, bg: "#fff", stroke: C.amber });
b += D.tag(316, 106, "the Zambezi, 1835", { anchor: "end", size: 13, bg: "#fff", stroke: C.amber });
b += reg(330, 50, "to Malawi, Zambia, Tanzania", { stroke: C.amber });
// Soshangane
b += A([[432, 462], [434, 400], [430, 334]], C.red);
b += D.tag(426, 392, "Gaza", { anchor: "end", size: 13, bg: "#fff", stroke: C.red }) + D.tag(426, 414, "(Soshangane)", { anchor: "end", size: 12, bg: "#fff", stroke: C.red });
// Sebetwane
b += A([[170, 428], [60, 400], [30, 300], [40, 220], [60, 172]], C.green, true);
b += D.tag(48, 214, "Kololo (Sebetwane)", { size: 13, bg: "#fff", stroke: C.green });
b += D.tag(14, 128, "upper Zambezi (Barotseland)", { size: 13, bg: "#fff", stroke: C.green });
b += D.text(14, 548, "Schematic, not to scale: positions are approximate.", { size: 12, fill: C.muted });
b += D.text(14, 28, "Mfecane movements, 1810s-1830s", { size: 16, weight: 700 });
await place(F, "precolonial/mfecane-zulu", "## Effects of the Mfecane", "mfecane-migrations-map", D.svg(w, h, b),
  "Schematic map: groups leaving the Zulu heartland after the Mfecane. Mzilikazi's Ndebele go via the Highveld to south-western Zimbabwe (c. 1838-1840), Zwangendaba crosses the Zambezi in 1835, Soshangane founds Gaza in southern Mozambique and Sebetwane's Kololo reach the upper Zambezi.",
  "Figure: main Mfecane migrations (schematic, not to scale)");
