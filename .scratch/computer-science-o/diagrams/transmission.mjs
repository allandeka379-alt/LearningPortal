import { D, fig } from "./lib.mjs";
const C = D.C;
const bitBox = (x, y, s, o = {}) =>
  D.rect(x, y, 26, 26, { fill: o.fill ?? "#fff", stroke: o.stroke ?? C.axis, r: 3, width: o.width ?? 1.6 }) +
  D.text(x + 13, y + 19, s, { anchor: "middle", size: 15, weight: 700, fill: o.color });

// 1. serial vs parallel (byte 01001011)
{
  const byte = "01001011";
  let b = "";
  b += D.text(10, 22, "Serial: one wire, one bit after another", { weight: 700 });
  b += D.node(10, 38, 70, 40, "Sender", { fill: C.fillGrey }) + D.node(490, 38, 80, 40, "Receiver", { fill: C.fillGrey });
  b += D.line(80, 58, 490, 58, { width: 2.4, stroke: C.blue, arrow: true });
  [...byte].forEach((c, i) => (b += bitBox(110 + i * 42, 45, c)));
  b += D.text(10, 112, "Parallel: eight wires, all eight bits at once", { weight: 700 });
  b += D.node(10, 126, 70, 168, "Sender", { fill: C.fillGrey }) + D.node(490, 126, 80, 168, "Receiver", { fill: C.fillGrey });
  [...byte].forEach((c, i) => {
    const y = 143 + i * 19;
    b += D.line(80, y, 490, y, { width: 1.6, stroke: C.blue, arrow: true });
  });
  [...byte].forEach((c, i) => {
    const y = 143 + i * 19;
    b += D.rect(270, y - 9, 22, 18, { fill: "#fff", stroke: C.axis, r: 3, width: 1.4 }) + D.text(281, y + 5, c, { anchor: "middle", size: 14, weight: 700 });
  });
  await fig("serial-parallel-byte", D.svg(580, 308, b),
    "Serial sends the byte 01001011 as eight bits one after another along one wire; parallel sends the same eight bits at once along eight wires, one bit per wire",
    "Figure: the byte 01001011 sent serially (one wire) and in parallel (eight wires)", "transmission/methods", "## Serial and parallel transmission");
}

// 2. transmission modes
{
  let b = "";
  const rows = [
    ["Simplex", "one direction only", "sensor to data logger; radio broadcast", 0],
    ["Half-duplex", "both ways, one at a time", "two-way radios (walkie-talkies)", 1],
    ["Full-duplex", "both ways at the same time", "phone call; broadband", 2],
  ];
  rows.forEach(([name, dir, ex, k], i) => {
    const y = 20 + i * 100;
    b += D.text(10, y + 18, name, { weight: 700, size: 15 }) + D.text(10, y + 38, dir, { size: 13, fill: C.muted });
    b += D.node(190, y, 60, 54, "A", { fill: C.fillBlue, size: 16, weight: 700 }) + D.node(420, y, 60, 54, "B", { fill: C.fillBlue, size: 16, weight: 700 });
    if (k === 0) b += D.arrow(250, y + 27, 420, y + 27, { width: 2.6 });
    if (k === 1) {
      b += D.arrow(250, y + 20, 420, y + 20, { width: 2.6 }) + D.arrow(420, y + 36, 250, y + 36, { width: 2.6, stroke: C.amber, dash: true });
      b += D.text(335, y + 62, "turns: A to B, then B to A", { size: 13, anchor: "middle", fill: C.muted });
    }
    if (k === 2) b += D.arrow(250, y + 17, 420, y + 17, { width: 2.6 }) + D.arrow(420, y + 39, 250, y + 39, { width: 2.6, stroke: C.amber });
    b += D.text(10, y + 76, "e.g. " + ex, { size: 13, fill: C.muted });
  });
  await fig("transmission-modes-simplex-duplex", D.svg(500, 316, b),
    "Simplex sends data in one direction only, half-duplex sends both ways but one direction at a time (walkie-talkies), and full-duplex sends both ways at the same moment (a phone call)",
    "Figure: simplex, half-duplex and full-duplex transmission between devices A and B", "transmission/methods", "Simplex is the simplest and cheapest");
}

// 3. packet structure for the 3 000-byte timetable file (3 packets of 1 000 bytes)
{
  const total = 3000, per = 1000, n = Math.ceil(total / per);
  const f = (v) => v.toLocaleString("en-GB");
  let b = D.text(10, 20, `A ${f(total)}-byte file sent in packets of up to ${f(per)} bytes of data`, { weight: 700, size: 14 });
  b += D.text(10, 46, "Header", { weight: 700, fill: C.blue, size: 14 }) + D.text(250, 46, "Payload", { weight: 700, fill: C.green, size: 14 }) + D.text(400, 46, "Trailer", { weight: 700, fill: C.amber, size: 14 });
  for (let i = 1; i <= n; i += 1) {
    const y = 56 + (i - 1) * 66;
    b += D.node(10, y, 230, 56, `To: web server, From: school\nPacket number ${i} (of ${n})`, { fill: C.fillBlue, size: 13 });
    b += D.node(240, y, 150, 56, `Data: ${f(per)} bytes\n(part ${i} of the file)`, { fill: C.fillGreen, size: 13 });
    b += D.node(390, y, 180, 56, "End marker and\nerror check (checksum)", { fill: C.fillAmber, size: 13 });
  }
  await fig("packet-structure-three-packets", D.svg(580, 56 + n * 66 + 4, b),
    "A 3,000-byte file is split into 3 packets of 1,000 bytes; each packet has a header (destination address, originator address, packet number), a payload of data and a trailer (end marker and error check)",
    "Figure: three packets from one file, each with a header, a payload and a trailer", "transmission/packets", "The addresses in the header are");
}

// 4. packet switching: packets 1,2,4 via Masvingo, 3 via Mutare
{
  let b = "";
  b += D.node(10, 100, 100, 50, "Sender", { fill: C.fillGrey }) + D.node(470, 100, 100, 50, "Receiver", { fill: C.fillGrey });
  b += D.node(220, 24, 140, 44, "Router, Masvingo", { fill: C.fillBlue, size: 13 }) + D.node(220, 182, 140, 44, "Router, Mutare", { fill: C.fillAmber, size: 13 });
  b += D.polyline([[110, 112], [180, 46], [220, 46]], { width: 2 }) + D.polyline([[360, 46], [430, 112], [470, 112]], { width: 2, arrow: true });
  b += D.polyline([[110, 138], [180, 204], [220, 204]], { width: 2 }) + D.polyline([[360, 204], [430, 138], [470, 138]], { width: 2, arrow: true });
  b += D.text(290, 16, "packets 1, 2 and 4", { size: 13, fill: C.blue, weight: 700, anchor: "middle" });
  b += D.text(290, 246, "packet 3 (Masvingo link busy)", { size: 13, fill: C.amber, weight: 700, anchor: "middle" });
  b += D.text(10, 281, "Arrival order at the receiver:", { weight: 700, size: 14 });
  [1, 2, 4, 3].forEach((p, i) => (b += bitBox(290 + i * 34, 262, String(p), { fill: p === 3 ? C.fillAmber : C.fillBlue })));
  b += D.text(10, 323, "After sorting by packet number:", { weight: 700, size: 14 });
  [1, 2, 3, 4].forEach((p, i) => (b += bitBox(290 + i * 34, 304, String(p), { fill: C.fillGreen })));
  await fig("packet-switching-out-of-order", D.svg(580, 340, b),
    "Packet switching: packets 1, 2 and 4 travel via the Masvingo router and packet 3 via Mutare because the Masvingo link is busy, so they arrive in the order 1, 2, 4, 3 and the receiver sorts them by packet number into 1, 2, 3, 4",
    "Figure: packets taking different routes, arriving out of order and being put back in order", "transmission/packets", "6. Once the last packet has arrived");
}

// 5. parity block (even parity), error at byte 3 / column 4
{
  const rows = ["0 1 1 0 1 0 0 1", "0 0 1 1 0 1 1 0", "0 1 0 0 1 1 1 1", "1 0 0 1 1 0 1 0", "1 0 0 0 0 0 1 0"].map((r) => r.split(" ").map(Number));
  const names = ["Byte 1", "Byte 2", "Byte 3", "Byte 4", "Parity byte"];
  const rowOnes = rows.map((r) => r.reduce((a, c) => a + c, 0));
  const colOnes = rows[0].map((_, j) => rows.reduce((a, r) => a + r[j], 0));
  const x0 = 120, y0 = 62, cw = 36, ch = 34;
  let b = "";
  ["P", "1", "2", "3", "4", "5", "6", "7"].forEach((h, j) => (b += D.text(x0 + j * cw + cw / 2, y0 - 10, h, { anchor: "middle", size: 14, weight: 700, fill: C.muted })));
  b += D.text(x0 + 8 * cw + 14, y0 - 10, "1s", { size: 14, weight: 700, fill: C.muted }) + D.text(x0 + 8 * cw + 56, y0 - 10, "row check", { size: 14, weight: 700, fill: C.muted });
  rows.forEach((r, i) => {
    const y = y0 + i * ch;
    b += D.text(10, y + 23, names[i], { size: 14, weight: i === 4 ? 700 : 400 });
    r.forEach((v, j) => {
      const bad = i === 2 && j === 4;
      b += D.rect(x0 + j * cw, y, cw, ch, { fill: bad ? C.fillAmber : i === 4 ? C.fillGrey : "#fff", stroke: bad ? C.red : C.axis, width: bad ? 3 : 1.2 }) + D.text(x0 + j * cw + cw / 2, y + 23, String(v), { anchor: "middle", size: 16, weight: bad ? 700 : 400 });
    });
    b += D.text(x0 + 8 * cw + 14, y + 23, String(rowOnes[i]), { size: 15 }) + D.text(x0 + 8 * cw + 56, y + 23, rowOnes[i] % 2 === 0 ? "even: OK" : "odd: ERROR", { size: 13, fill: rowOnes[i] % 2 === 0 ? C.green : C.red, weight: 700 });
  });
  const yb = y0 + 5 * ch + 24;
  b += D.text(10, yb, "1s in column", { size: 14 });
  colOnes.forEach((v, j) => (b += D.text(x0 + j * cw + cw / 2, yb, String(v), { anchor: "middle", size: 15, weight: v % 2 ? 700 : 400, fill: v % 2 ? C.red : C.ink })));
  b += D.text(10, yb + 28, "Byte 3 has an odd number of 1s (5) and column 4 has an odd number (3):", { size: 13, fill: C.muted });
  b += D.text(10, yb + 46, "the outlined bit where they cross is wrong; it should be 0.", { size: 13, fill: C.muted });
  await fig("parity-block-error-location", D.svg(580, yb + 62, b),
    "Even-parity block of four bytes and a parity byte: byte 3 has five 1s and column 4 has three 1s, both odd, so the bit where they cross (byte 3, column 4) is the error and should be 0",
    "Figure: the parity block, with the failing row and column crossing at the wrong bit", "transmission/error-detection", "A wrong bit then shows up as one row");
}

// 6. symmetric and asymmetric encryption flows
{
  const shift = (s, k) => [...s].map((ch) => (/[A-Z]/.test(ch) ? String.fromCharCode(((ch.charCodeAt(0) - 65 + k + 26) % 26) + 65) : ch)).join("");
  const plain = "MEET AT NOON", cipher = shift(plain, 3);
  if (shift(cipher, -3) !== plain || cipher !== "PHHW DW QRRQ") throw new Error("cipher mismatch " + cipher);
  let b = D.text(10, 22, "Symmetric: the same key (3) encrypts and decrypts", { weight: 700 });
  b += D.node(10, 40, 140, 56, `Plaintext\n${plain}`, { fill: C.fillGreen, size: 13 });
  b += D.arrow(150, 68, 192, 68, { width: 2.4 }) + D.node(192, 44, 84, 48, "Encrypt\nkey 3", { fill: C.fillAmber, size: 13 });
  b += D.arrow(276, 68, 312, 68, { width: 2.4 });
  b += D.node(312, 40, 140, 56, `Ciphertext\n${cipher}`, { fill: C.fillGrey, size: 13 });
  b += D.arrow(452, 68, 484, 68, { width: 2.4 });
  b += D.node(484, 44, 96, 48, "Decrypt\nkey 3", { fill: C.fillAmber, size: 13 });
  b += D.text(10, 122, "The key itself must be shared safely: that is the weak point.", { size: 13, fill: C.muted });
  b += D.line(10, 140, 570, 140, { stroke: C.grid, width: 1.5 });
  b += D.text(10, 166, "Asymmetric: public key encrypts, matching private key decrypts", { weight: 700 });
  b += D.node(10, 190, 150, 70, "Sipho\nencrypts the report\nwith the PUBLIC key", { fill: C.fillBlue, size: 13 });
  b += D.node(420, 190, 150, 70, "Head office\ndecrypts with its\nPRIVATE key", { fill: C.fillBlue, size: 13 });
  b += D.arrow(420, 204, 160, 204, { width: 2.4, stroke: C.amber }) + D.text(290, 196, "1 public key (safe to share)", { size: 13, anchor: "middle", fill: C.amber, weight: 700 });
  b += D.arrow(160, 244, 420, 244, { width: 2.4 }) + D.text(290, 236, "2 ciphertext sent", { size: 13, anchor: "middle", weight: 700 });
  b += D.text(290, 264, "private key never leaves head office", { size: 13, anchor: "middle", fill: C.muted });
  await fig("encryption-symmetric-asymmetric", D.svg(590, 278, b),
    "Symmetric encryption uses one shared key (MEET AT NOON becomes PHHW DW QRRQ with key 3, and the same key decrypts it); asymmetric encryption uses the receiver's public key to encrypt and the matching private key, which never leaves the receiver, to decrypt",
    "Figure: symmetric encryption with one shared key and asymmetric encryption with a public and private key", "transmission/encryption", "Asymmetric encryption solves the key-distribution problem");
}
