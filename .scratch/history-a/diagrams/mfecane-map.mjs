import { D, C, place } from "../../history-o/diagrams/hlib.mjs";
const F = "history-a";
const w = 560, h = 620;
let b = D.rect(0, 0, w, h, { fill: "#fff", stroke: C.grid, width: 1 });
b += D.path_(`M470,0 L560,0 L560,620 L420,620 L440,540 L452,440 L448,330 L455,250 L470,160 L478,70 Z`, { fill: C.fillBlue, stroke: C.teal, width: 1.4 });
b += D.text(522, 300, "Indian\nOcean", { anchor: "middle", size: 14, fill: C.teal, italic: true });
b += D.polyline([[40, 150], [120, 168], [200, 150], [290, 172], [380, 150], [462, 165]], { stroke: C.teal, width: 2.4 });
b += D.text(230, 140, "Zambezi River", { size: 13, fill: C.teal });
b += D.polyline([[110, 322], [200, 308], [290, 326], [380, 310], [450, 322]], { stroke: C.teal, width: 2.4 });
b += D.text(300, 346, "Limpopo River", { size: 13, fill: C.teal });
const reg = (x, y, s, o = {}) => D.tag(x, y, s, { anchor: "middle", size: 13, ...o });
b += reg(190, 252, "Zimbabwe plateau (Rozvi lands)", { bg: C.fillGrey });
b += reg(212, 484, "Highveld");
b += reg(375, 560, "Zulu kingdom (KwaZulu-Natal)", { bg: C.fillAmber, stroke: C.amber });
b += reg(230, 604, "Basotho (Moshoeshoe): Drakensberg stronghold", { bg: C.fillGreen, stroke: C.green });
const A = (pts, col, dash) => D.path_(`M${pts.map((p) => p.join(",")).join(" L")}`, { stroke: col, width: 2.6, arrow: true, dash });
// Mzilikazi
b += A([[335, 546], [300, 515], [262, 492]], C.blue);
b += A([[212, 466], [206, 330], [200, 266]], C.blue);
b += D.text(220, 400, "Mzilikazi:\nTransvaal, then\nZimbabwe", { size: 12, fill: C.blue });
b += D.tag(216, 296, "Ndebele state", { size: 13, bg: "#fff", stroke: C.blue });
// Zwangendaba
b += A([[350, 546], [330, 440], [322, 262], [322, 200], [330, 110], [322, 68]], C.amber);
b += D.tag(316, 84, "Zwangendaba crosses", { anchor: "end", size: 13, bg: "#fff", stroke: C.amber });
b += D.tag(316, 106, "the Zambezi, 1835", { anchor: "end", size: 13, bg: "#fff", stroke: C.amber });
b += reg(300, 52, "Ngoni: Zambia, Malawi, Tanzania", { stroke: C.amber });
// Nxaba
b += A([[408, 322], [402, 250], [395, 160], [392, 80]], C.ink);
b += D.tag(448, 232, "Nxaba", { anchor: "end", size: 13, bg: "#fff", stroke: C.ink });
// Soshangane
b += A([[434, 546], [436, 440], [430, 334]], C.red);
b += D.tag(426, 410, "Gaza", { anchor: "end", size: 13, bg: "#fff", stroke: C.red });
b += D.tag(426, 432, "(Soshangane)", { anchor: "end", size: 12, bg: "#fff", stroke: C.red });
// Sobhuza
b += A([[398, 546], [396, 500]], C.purple);
b += D.tag(392, 490, "Swazi (Sobhuza)", { anchor: "end", size: 12, bg: "#fff", stroke: C.purple });
// Sebetwane
b += A([[170, 490], [60, 460], [30, 340], [40, 230], [60, 172]], C.green, true);
b += D.tag(48, 210, "Kololo (Sebetwane)", { size: 13, bg: "#fff", stroke: C.green });
b += D.tag(14, 128, "Barotseland (Kololo state)", { size: 13, bg: "#fff", stroke: C.green });
b += D.text(14, 28, "Groups that left the Zulu heartland", { size: 16, weight: 700 });
b += D.text(14, 580, "Schematic, not to scale.", { size: 12, fill: C.muted });
await place(F, "precolonial/mfecane-zulu", "## Consequences across the region", "mfecane-migrations-map", D.svg(w, h, b),
  "Schematic map of the consequences of the Mfecane: Mzilikazi's Ndebele to Zimbabwe, Zwangendaba across the Zambezi in 1835 to found Ngoni states, Nxaba north of the Zambezi, Soshangane's Gaza state in southern Mozambique, Sobhuza's Swazi, Sebetwane's Kololo in Barotseland and Moshoeshoe's Basotho in the Drakensberg.",
  "Figure: where the main groups went after the Zulu rise (schematic, not to scale)");
