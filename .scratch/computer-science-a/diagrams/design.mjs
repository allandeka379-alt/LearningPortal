import { D, fig, figBefore } from "./lib.mjs";
const { C, text, line, rect, node, arrow, circle, path_, polyline } = D;

// ---- ER diagram (crow's foot) of the library
{
  const ent = (x, y, w, name, attrs) => {
    const h = 28 + attrs.length * 20 + 8;
    let s = rect(x, y, w, h, { fill: "#fff", stroke: C.axis, width: 2 }) + rect(x, y, w, 28, { fill: C.fillBlue, stroke: C.axis, width: 2 }) + text(x + w / 2, y + 19, name, { anchor: "middle", size: 15, weight: 700 });
    attrs.forEach((a, i) => (s += text(x + 8, y + 28 + 18 + i * 20, a, { size: 13, weight: /PK|FK/.test(a) ? 700 : 400 })));
    return { s, x, y, w, h };
  };
  const cat = ent(10, 20, 150, "Category", ["CategoryID (PK)", "CategoryName"]);
  const book = ent(250, 20, 160, "Book", ["BookID (PK)", "Title", "Author", "CategoryID (FK)"]);
  const mem = ent(10, 220, 150, "Member", ["MemberID (PK)", "Name", "Phone"]);
  const loan = ent(250, 220, 160, "Loan", ["LoanID (PK)", "DateOut", "DateDue", "MemberID (FK)", "BookID (FK)"]);
  // foot at box edge (x,y) with the line running away along (dx,dy); bar at the one end
  const foot = (x, y, dx, dy) => {
    const ax = x + dx * 16, ay = y + dy * 16;
    return [-1, 0, 1].map((s) => line(ax, ay, x - dy * s * 9, y + dx * s * 9, { width: 2 })).join("");
  };
  const bar = (x, y, dx, dy) => line(x + dx * 14 + dy * 9, y + dy * 14 - dx * 9, x + dx * 14 - dy * 9, y + dy * 14 + dx * 9, { width: 2.5 });
  let b = cat.s + book.s + mem.s + loan.s;
  // Category (one) - Book (many): horizontal
  b += line(160, 52, 250, 52) + bar(160, 52, 1, 0) + foot(250, 52, -1, 0);
  // Member (one) - Loan (many)
  b += line(160, 252, 250, 252) + bar(160, 252, 1, 0) + foot(250, 252, -1, 0);
  // Book (one) - Loan (many): vertical
  const bx = 330, by = book.y + book.h, ly = loan.y;
  b += line(bx, by, bx, ly) + bar(bx, by, 0, 1) + foot(bx, ly, 0, -1);
  b += text(10, 376, "Bar = one, crow's foot = many. PK: primary key, FK: foreign key.", { size: 12, fill: C.muted });
  await figBefore("db-er-library", D.svg(430, 392, b),
    "E-R diagram of the library in crow's foot notation: one Category has many Books, one Member has many Loans and one Book has many Loans, so Loan is the link table holding the foreign keys MemberID and BookID",
    "Figure: the library E-R diagram with primary and foreign keys", "db/er-diagrams", "## Analysing a scenario");
}

// ---- state-transition diagram
{
  const P = { Start: [75, 90], OneWrong: [225, 90], TwoWrong: [375, 90], Blocked: [525, 90], Menu: [300, 245] };
  const R = 36, T = {};
  const link = (a, c, lbl, o = {}) => {
    const [x1, y1] = P[a], [x2, y2] = P[c];
    const d = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / d, uy = (y2 - y1) / d;
    let s = arrow(x1 + ux * R, y1 + uy * R, x2 - ux * (R + 3), y2 - uy * (R + 3), { width: 2, stroke: o.stroke });
    const t = o.t ?? 0.5; s += D.tag(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t + (o.dy ?? 0), lbl, { anchor: "middle", size: 13 });
    return s;
  };
  let b = "";
  b += link("Start", "OneWrong", "wrong", { dy: -14 }) + link("OneWrong", "TwoWrong", "wrong", { dy: -14 }) + link("TwoWrong", "Blocked", "wrong", { dy: -14 });
  b += link("Start", "Menu", "correct", { t: 0.45, stroke: C.blue }) + link("OneWrong", "Menu", "correct", { t: 0.5, stroke: C.blue }) + link("TwoWrong", "Menu", "correct", { t: 0.45, stroke: C.blue });
  for (const [k, [x, y]] of Object.entries(P)) b += circle(x, y, R, { fill: k === "Blocked" ? C.fillAmber : k === "Menu" ? C.fillGreen : C.fillBlue }) + text(x, y + 5, k, { anchor: "middle", size: 14, weight: 700 });
  b += arrow(14, 90, 42, 90) + text(10, 66, "begin", { size: 12, fill: C.muted });
  // self loops
  b += path_("M510,58 C495,22 555,22 540,58", { arrow: true }) + text(525, 16, "any input", { anchor: "middle", size: 13 });
  b += path_("M286,279 C270,335 330,335 314,279", { arrow: true }) + text(300, 356, "any input", { anchor: "middle", size: 13 });
  await figBefore("sdlc-state-transition-pin", D.svg(600, 370, b),
    "State-transition diagram for a wallet PIN: from Start, OneWrong and TwoWrong a wrong PIN moves to the next state and three wrong PINs reach Blocked; a correct PIN from any of those three states goes to Menu; Blocked and Menu stay in the same state for any input",
    "Figure: states and transitions for the three-wrong-PINs rule", "sdlc/program-design", ":::worked-solution{title=\"Tracing two sequences of inputs\"}");
}

// ---- OOP class diagram
{
  const cls = (x, y, w, name, props, meths) => {
    const lh = 20;
    const h1 = 30, h2 = props.length * lh + 10, h3 = meths.length * lh + 10;
    let s = rect(x, y, w, h1 + h2 + h3, { fill: "#fff", stroke: C.axis, width: 2 }) + rect(x, y, w, h1, { fill: C.fillBlue, stroke: C.axis, width: 2 }) + text(x + w / 2, y + 21, name, { anchor: "middle", size: 15, weight: 700 });
    s += line(x, y + h1 + h2, x + w, y + h1 + h2, { width: 1.5, stroke: C.axis });
    props.forEach((p, i) => (s += text(x + 8, y + h1 + 20 + i * lh, p, { size: 13 })));
    meths.forEach((m, i) => (s += text(x + 8, y + h1 + h2 + 20 + i * lh, m, { size: 13 })));
    return { s, h: h1 + h2 + h3, cx: x + w / 2, top: y, bottom: y + h1 + h2 + h3 };
  };
  const item = cls(180, 10, 200, "Item", ["- Title", "- ItemID"], ["+ NEW", "+ GetTitle", "+ Describe"]);
  const book = cls(20, 220, 200, "Book", ["- Pages"], ["+ NEW", "+ Describe (overrides)"]);
  const dvd = cls(340, 220, 200, "Dvd", ["- Minutes"], ["+ NEW", "+ Describe (overrides)"]);
  let b = item.s + book.s + dvd.s;
  const jy = 192;
  b += line(book.cx, book.top, book.cx, jy) + line(dvd.cx, dvd.top, dvd.cx, jy) + line(book.cx, jy, dvd.cx, jy);
  b += line(item.cx, jy, item.cx, item.bottom + 16);
  b += polyline([[item.cx, item.bottom], [item.cx - 11, item.bottom + 18], [item.cx + 11, item.bottom + 18]], { fill: "#fff", close: true });
  b += text(item.cx + 20, jy - 8, "inherits from", { size: 12, fill: C.muted });
  b += text(10, 345, "- private, + public. Hollow triangle: Book and Dvd are subclasses of Item.", { size: 12, fill: C.muted });
  await figBefore("prog-oop-class-diagram", D.svg(560, 360, b),
    "Class diagram: the superclass Item has private Title and ItemID and methods NEW, GetTitle and Describe; subclasses Book (Pages) and Dvd (Minutes) inherit from Item and each overrides Describe",
    "Figure: Book and Dvd inherit from Item and override Describe", "prog/oop-concepts", ":::worked-solution{title=\"Polymorphism in action\"}");
}

// ---- compilation stages
{
  const items = [
    ["data", "Source code"],
    ["stage", "Lexical analysis", "finds illegal characters and invalid names"],
    ["data", "Tokens + symbol table"],
    ["stage", "Syntax analysis", "finds statements that break the grammar"],
    ["data", "Parse tree"],
    ["stage", "Code generation", "no errors found here"],
    ["data", "Intermediate or object code"],
    ["stage", "Optimisation", "no errors found here"],
    ["data", "Faster or smaller code"],
  ];
  let b = "", y = 10;
  items.forEach((it, i) => {
    const h = it[0] === "stage" ? 38 : 30;
    b += node(20, y, 230, h, it[1], { fill: it[0] === "stage" ? C.fillBlue : C.fillGrey, kind: it[0] === "stage" ? undefined : "terminator", size: 14, weight: it[0] === "stage" ? 700 : 400 });
    if (it[2]) b += text(266, y + 24, it[2], { size: 13, fill: C.muted });
    y += h;
    if (i < items.length - 1) { b += arrow(135, y, 135, y + 20); y += 20; }
  });
  await figBefore("translation-compilation-stages", D.svg(560, y + 14, b),
    "The four stages of compilation: lexical analysis turns source code into tokens and a symbol table, syntax analysis builds a parse tree, code generation produces intermediate or object code, and optimisation makes it faster or smaller; errors are found in the first two stages",
    "Figure: the four compilation stages and what each one produces", "translation/compilation-stages", "### 1. Lexical analysis");
}
// ---- parse tree
{
  let b = "";
  const nodes = { "+": [250, 35, "op"], "*": [150, 105, "op"], "15": [350, 105, "leaf"], Price: [95, 180, "leaf"], Qty: [205, 180, "leaf"] };
  const edge = (a, c) => (b += line(nodes[a][0], nodes[a][1], nodes[c][0], nodes[c][1], { width: 2 }));
  edge("+", "*"); edge("+", "15"); edge("*", "Price"); edge("*", "Qty");
  for (const [k, [x, y, t]] of Object.entries(nodes)) b += t === "op" ? circle(x, y, 20, { fill: C.fillAmber }) + text(x, y + 6, k, { anchor: "middle", size: 18, weight: 700 }) : node(x - 30, y - 16, 60, 32, k, { fill: C.fillBlue, size: 14 });
  b += text(122, 112, "applied first", { anchor: "end", size: 12, fill: C.muted });
  b += text(285, 36, "applied second", { size: 12, fill: C.muted });
  b += text(20, 230, "Parse tree for Price * Qty + 15: the lower the operator, the earlier it is applied.", { size: 12, fill: C.muted });
  await figBefore("translation-parse-tree", D.svg(460, 246, b),
    "Parse tree of Price * Qty + 15: the root is + with children the * node and 15, and the * node has children Price and Qty, so multiplication (lower in the tree) is carried out before the addition",
    "Figure: the parse tree for Price * Qty + 15", "translation/compilation-stages", ":::worked-solution{title=\"Parse tree of Price * Qty + 15\"}");
}

// ---- symmetric and asymmetric encryption
{
  const row = (y0, title, k1, k2, same) => {
    let s = text(10, y0, title, { size: 14, weight: 700, fill: C.blue });
    const y = y0 + 14, h = 42;
    const els = [[10, 88, "Plain text\n(sender)", C.fillGreen], [126, 76, "Encrypt", C.fillBlue], [230, 88, "Cipher text\n(in transit)", C.fillGrey], [346, 76, "Decrypt", C.fillBlue], [450, 88, "Plain text\n(receiver)", C.fillGreen]];
    els.forEach(([x, w, l, f], i) => {
      s += node(x, y, w, h, l, { fill: f, size: 13 });
      if (i < els.length - 1) s += arrow(x + w, y + h / 2, els[i + 1][0], y + h / 2);
    });
    s += line(164, y + h, 164, y + h + 16, { stroke: C.amber, width: 2 }) + node(104, y + h + 16, 120, 38, k1, { fill: C.fillAmber, size: 12 });
    s += line(384, y + h, 384, y + h + 16, { stroke: C.amber, width: 2 }) + node(324, y + h + 16, 120, 38, k2, { fill: C.fillAmber, size: 12 });
    return s;
  };
  let b = row(20, "Symmetric: one shared secret key", "Secret key K", "Same secret key K", true);
  b += row(170, "Asymmetric: the receiver's key pair", "Receiver's\nPUBLIC key", "Receiver's\nPRIVATE key", false);
  b += text(10, 300, "Symmetric: fast, but the key must be shared secretly.", { size: 12, fill: C.muted }) + text(10, 318, "Asymmetric: slower, but the public key can be shared openly.", { size: 12, fill: C.muted });
  await figBefore("security-symmetric-asymmetric", D.svg(560, 332, b),
    "Symmetric encryption uses the same secret key to encrypt and decrypt; asymmetric encryption for confidentiality encrypts with the receiver's public key and only the receiver's private key can decrypt",
    "Figure: key use in symmetric and asymmetric encryption", "security/encryption", "## Simple ciphers");
}

// ---- waterfall model
{
  const st = ["Analysis", "Design", "Coding", "Testing", "Maintenance"];
  let b = "";
  st.forEach((s, i) => {
    const x = 10 + i * 100, y = 15 + i * 48;
    b += node(x, y, 120, 36, `${i + 1} ${s}`, { fill: i === 4 ? C.fillAmber : C.fillBlue, size: 14, weight: 700 });
    if (i < st.length - 1) b += path_(`M${x + 60},${y + 36} V${y + 48 + 18} H${x + 100}`, { arrow: true });
  });
  b += text(10, 280, "The output of each stage flows to the next. Going back is possible but expensive.", { size: 13, fill: C.muted });
  await figBefore("sdlc-waterfall", D.svg(560, 296, b),
    "Waterfall model: analysis, design, coding, testing and maintenance follow each other like steps, with the output of each stage flowing to the next",
    "Figure: the five stages of the waterfall model", "sdlc/life-cycles", "**Benefits:**");
}

// ---- RPN evaluation stack
{
  const tokens = "8 4 + 3 * 10 5 / -".split(" ");
  const st = [], snaps = [];
  for (const t of tokens) {
    if (/^\d+$/.test(t)) st.push(Number(t));
    else { const r = st.pop(), l = st.pop(); st.push(t === "+" ? l + r : t === "-" ? l - r : t === "*" ? l * r : l / r); }
    snaps.push([...st]);
  }
  if (snaps.at(-1)[0] !== 34 || snaps.at(-1).length !== 1) throw new Error("rpn");
  let b = "";
  const cw = 58, ch = 28, y0 = 50;
  snaps.forEach((s, i) => {
    const x = 10 + i * cw;
    b += text(x + 24, 28, tokens[i], { anchor: "middle", size: 16, weight: 700, fill: /^\d+$/.test(tokens[i]) ? C.ink : C.amber });
    for (let k = 0; k < 3; k += 1) {
      const y = y0 + (2 - k) * ch;
      const v = s[k];
      b += rect(x, y, 48, ch, { fill: v === undefined ? "#fff" : C.fillBlue, stroke: C.axis, width: 1.2 }) + (v === undefined ? "" : text(x + 24, y + 19, String(v), { anchor: "middle", size: 14, weight: k === s.length - 1 ? 700 : 400 }));
    }
  });
  b += text(10, 160, "Each column is the stack after reading the token above it (top of the stack is the highest filled cell).", { size: 12, fill: C.muted });
  b += text(10, 180, "The last operator subtracts the top (2) from the value below it (36): 36 - 2 = 34.", { size: 13, weight: 700 });
  await figBefore("translation-rpn-stack", D.svg(540, 196, b),
    "Evaluating 8 4 + 3 * 10 5 / - with a stack: the stack goes 8; 8,4; 12; 12,3; 36; 36,10; 36,10,5; 36,2; and finally 34, because each operator replaces the top two values by their result",
    "Figure: the stack after each token of the postfix expression", "translation/rpn", ":::worked-solution{title=\"Evaluating 8 4 + 3 * 10 5 / -\"}");
}

// ---- Dijkstra town graph
{
  const P = { H: [300, 50], M: [440, 95], C: [175, 95], R: [540, 150], K: [110, 175], T: [540, 245], N: [540, 335], G: [270, 240], W: [90, 270], B: [185, 340] };
  const E = [["H", "C", 100], ["H", "M", 70], ["C", "K", 60], ["K", "W", 90], ["W", "G", 55], ["G", "B", 165], ["W", "B", 220], ["M", "G", 250], ["K", "G", 140], ["M", "R", 75], ["R", "T", 85], ["T", "N", 60]];
  const path = ["H", "C", "K", "G", "B"];
  let total = 0;
  const onPath = (a, c) => { const i = path.indexOf(a), j = path.indexOf(c); return i >= 0 && j >= 0 && Math.abs(i - j) === 1; };
  let b = "";
  for (const [a, c, w] of E) if (onPath(a, c)) total += w;
  if (total !== 465) throw new Error("path total " + total);
  for (const [a, c] of E) b += line(P[a][0], P[a][1], P[c][0], P[c][1], { stroke: onPath(a, c) ? C.amber : C.muted, width: onPath(a, c) ? 4.5 : 2 });
  for (const [a, c, w] of E) b += D.tag((P[a][0] + P[c][0]) / 2, (P[a][1] + P[c][1]) / 2 + 7, String(w), { anchor: "middle", size: 13 });
  for (const [k, [x, y]] of Object.entries(P)) b += circle(x, y, 19, { fill: path.includes(k) ? C.fillAmber : C.fillBlue }) + text(x, y + 5, k, { anchor: "middle", size: 15, weight: 700 });
  b += text(10, 20, "Amber: the shortest path H, C, K, G, B = 100 + 60 + 140 + 165 = 465", { size: 13, weight: 700 });
  b += text(330, 300, "H Harare, C Chegutu, K Kadoma,", { size: 12, fill: C.muted }) + text(330, 316, "W Kwekwe, G Gweru, B Bulawayo,", { size: 12, fill: C.muted }) + text(330, 332, "M Marondera, R Rusape,", { size: 12, fill: C.muted }) + text(330, 348, "T Mutare, N Nyanga", { size: 12, fill: C.muted });
  await figBefore("ai-town-graph-dijkstra", D.svg(580, 370, b),
    "Weighted graph of ten towns with the twelve road distances from the lesson; Dijkstra's shortest path from Harare to Bulawayo is H, C, K, G, B with total distance 100 + 60 + 140 + 165 = 465",
    "Figure: the town graph with the shortest path from Harare to Bulawayo highlighted", "ai/graphs-search", ":::worked-solution{title=\"Dijkstra from Harare (H)\"}");
}
