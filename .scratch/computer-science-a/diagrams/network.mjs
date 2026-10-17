import { D, fig } from "./lib.mjs";
const { C, text, line, rect, node, arrow, circle } = D;

const pc = (cx, cy, lbl = "PC") => node(cx - 19, cy - 12, 38, 24, lbl, { size: 12 });
const sw = (cx, cy, lbl = "Switch") => node(cx - 28, cy - 14, 56, 28, lbl, { size: 12, fill: C.fillAmber });

// ---- topologies
{
  let b = "";
  const panel = (x0, y0, title, body) => text(x0 + 10, y0 + 18, title, { size: 15, weight: 700, fill: C.blue }) + `<g transform="translate(${x0} ${y0})">${body}</g>`;
  // bus
  let s = line(20, 100, 260, 100, { width: 4 }) + line(20, 90, 20, 110, { width: 3 }) + line(260, 90, 260, 110, { width: 3 }) + text(140, 122, "backbone", { anchor: "middle", size: 12, fill: C.muted });
  for (const x of [55, 140, 225]) s += line(x, 100, x, 62, { width: 2 }) + pc(x, 50);
  for (const x of [95, 185]) s += line(x, 100, x, 138, { width: 2 }) + pc(x, 150);
  b += panel(0, 0, "Bus", s);
  // star
  s = "";
  const cx = 140, cy = 110, r = 70;
  for (let i = 0; i < 5; i += 1) {
    const a = (-90 + i * 72) * Math.PI / 180;
    const px = cx + r * 1.5 * Math.cos(a), py = cy + r * 0.95 * Math.sin(a);
    s += line(cx, cy, px, py, { width: 2 }) + pc(px, py);
  }
  s += sw(cx, cy);
  b += panel(290, 0, "Star", s);
  // full mesh of 4
  s = "";
  const m = [[70, 65], [210, 65], [70, 165], [210, 165]];
  for (let i = 0; i < 4; i += 1) for (let j = i + 1; j < 4; j += 1) s += line(m[i][0], m[i][1], m[j][0], m[j][1], { width: 2 });
  m.forEach(([x, y]) => (s += pc(x, y)));
  s += text(140, 200, "4 devices, 6 links (full mesh)", { anchor: "middle", size: 12, fill: C.muted });
  b += panel(0, 215, "Mesh", s);
  // hybrid: two stars joined by a backbone
  s = "";
  const A = [70, 110], B2 = [210, 110];
  for (const [px, py] of [[30, 55], [110, 55], [70, 165]]) s += line(A[0], A[1], px, py, { width: 2 }) + pc(px, py);
  for (const [px, py] of [[170, 55], [250, 55], [210, 165]]) s += line(B2[0], B2[1], px, py, { width: 2 }) + pc(px, py);
  s += line(A[0], A[1], B2[0], B2[1], { width: 5, stroke: C.amber }) + sw(A[0], A[1], "Switch") + sw(B2[0], B2[1], "Switch");
  s += text(140, 200, "two stars joined by a backbone", { anchor: "middle", size: 12, fill: C.muted });
  b += panel(290, 215, "Hybrid", s);
  await fig("network-topologies", D.svg(580, 435, b),
    "Four network topologies: bus (devices on one backbone), star (each device cabled to a central switch), full mesh (4 devices need 6 links) and hybrid (two stars whose switches are joined by a backbone)",
    "Figure: bus, star, mesh and hybrid topologies", "network/topologies-media", "## Topologies");
}

// ---- TCP/IP encapsulation of the first segment
{
  const data = 1460, tcp = 20, ip = 20, eh = 14, et = 4;
  const rows = [
    { name: "Application layer: data", parts: [["data", data, C.fillGreen]] },
    { name: `Transport layer: segment = ${data + tcp} bytes`, parts: [["TCP 20", tcp, C.fillAmber], ["data", data, C.fillGreen]] },
    { name: `Internet layer: packet = ${data + tcp + ip} bytes`, parts: [["IP 20", ip, C.fillBlue], ["TCP 20", tcp, C.fillAmber], ["data", data, C.fillGreen]] },
    { name: `Link layer: frame = ${data + tcp + ip + eh + et} bytes`, parts: [["Eth 14", eh, C.fillGrey], ["IP 20", ip, C.fillBlue], ["TCP 20", tcp, C.fillAmber], ["data", data, C.fillGreen], ["trailer 4", et, C.fillGrey]] },
  ];
  let b = "";
  const dataX = 280, hw = 66, dw = 230;
  rows.forEach((r, i) => {
    const y = 40 + i * 62;
    b += text(20, y - 8, r.name, { size: 14, weight: 700 });
    const hdrs = r.parts.filter((p) => p[0] !== "data" && p[0] !== "trailer 4");
    let x = dataX - hdrs.length * hw;
    for (const [lbl, , fill] of r.parts) {
      const w = lbl === "data" ? dw : lbl === "trailer 4" ? 66 : hw;
      b += node(x, y, w, 34, lbl === "data" ? `data ${data} bytes` : lbl, { fill, size: 13 }).replace(/rx="8"/, 'rx="2"');
      x += w;
    }
  });
  b += text(20, 290, "Not to scale: the headers are far smaller than the data. 58 bytes are added to each 1460-byte piece.", { size: 13, fill: C.muted });
  await fig("network-encapsulation", D.svg(600, 308, b),
    "Encapsulation of the first 1460-byte piece of a file: TCP adds a 20-byte header (segment 1480 bytes), IP adds 20 bytes (packet 1500 bytes) and the link layer adds a 14-byte header and 4-byte trailer (frame 1518 bytes)",
    "Figure: each layer wraps the data in its own header, giving a segment, a packet and a frame", "network/osi-tcpip-models", "4. The link layer adds a header");
}

// ---- packet switching: 4500-byte message
{
  const payloads = [1000, 1000, 1000, 1000, 500];
  const size = (p) => p + 20 + 4;
  const total = payloads.reduce((t, p) => t + size(p), 0);
  if (total !== 4620) throw new Error("total");
  const order = [2, 1, 3, 5, 4];
  let b = text(20, 24, "A 4500-byte message is split into 5 packets (header 20 B + payload + trailer 4 B)", { size: 14, weight: 700 });
  const bw = 100, gap = 12;
  const row = (y, ids, fill, big) => ids.map((id, i) => {
    const x = 16 + i * (bw + gap);
    const p = payloads[id - 1];
    return big ? node(x, y, bw, 62, `Packet ${id}\npayload ${p}\n${size(p)} bytes`, { fill, size: 13 }) : node(x, y, bw, 36, `Packet ${id}`, { fill, size: 14 });
  }).join("");
  b += row(40, [1, 2, 3, 4, 5], C.fillBlue, true);
  b += arrow(290, 108, 290, 150) + text(300, 134, "packets take different routes", { size: 13 });
  b += text(20, 168, "Order of arrival at the destination", { size: 13, fill: C.muted });
  b += row(176, order, C.fillAmber, false);
  b += arrow(290, 216, 290, 258) + text(300, 242, "the receiver sorts them by packet number", { size: 13 });
  b += row(266, [1, 2, 3, 4, 5], C.fillGreen, false);
  b += text(20, 330, `Total sent = 4500 + 5 x 24 = ${total} bytes.`, { size: 14, weight: 700 });
  await fig("network-packet-switching", D.svg(580, 345, b),
    "Packet switching: a 4500-byte message becomes 5 packets of payload 1000, 1000, 1000, 1000 and 500 bytes, each with a 20-byte header and 4-byte trailer; they arrive in the order 2, 1, 3, 5, 4 and are put in order by packet number",
    "Figure: splitting a message into packets and reassembling them in order", "network/switching", "## Packet switching");
}

// ---- bank branch path
{
  const nodes = {
    L1: [8, 40, "Laptop\nL1"], L2: [8, 150, "Laptop\nL2"], SA: [112, 95, "Switch\nA"], RA: [216, 95, "Router\nA"], RB: [320, 95, "Router\nB"], SB: [424, 95, "Switch\nB"], P1: [528, 40, "PC\nP1"], S1: [528, 150, "Server\nS1"],
  };
  const w = 72, h = 46;
  const ctr = (k) => [nodes[k][0] + w / 2, nodes[k][1] + h / 2];
  const links = [[1, "L1", "SA", true], [2, "L2", "SA", false], [3, "SA", "RA", true], [4, "RA", "RB", true], [5, "RB", "SB", true], [6, "SB", "P1", false], [7, "SB", "S1", true]];
  let b = text(10, 20, "Bank network: the path from Laptop L1 to Server S1 (amber)", { size: 14, weight: 700 });
  for (const [n, a, c, on] of links) {
    const [x1, y1] = ctr(a), [x2, y2] = ctr(c);
    b += line(x1, y1, x2, y2, { stroke: on ? C.amber : C.muted, width: on ? 4 : 2 });
  }
  for (const [k, [x, y, lbl]] of Object.entries(nodes)) {
    const fill = k.startsWith("R") ? C.fillAmber : k.startsWith("S") && k !== "S1" ? C.fillBlue : k === "S1" ? C.fillGreen : "#fff";
    b += node(x, y, w, h, lbl, { fill, size: 13 });
  }
  for (const [n, a, c] of links) {
    const [x1, y1] = ctr(a), [x2, y2] = ctr(c);
    b += circle((x1 + x2) / 2, (y1 + y2) / 2, 11, { fill: "#fff", stroke: C.ink, width: 1.5 }) + text((x1 + x2) / 2, (y1 + y2) / 2 + 5, String(n), { anchor: "middle", size: 13, weight: 700 });
  }
  b += text(268, 175, "link 4 is the WAN link", { anchor: "middle", size: 13, fill: C.muted });
  b += text(10, 225, "Path: L1, SwitchA, RouterA, RouterB, SwitchB, S1 (links 1, 3, 4, 5, 7)", { size: 13 });
  await fig("network-bank-path", D.svg(610, 240, b),
    "Two bank branches: laptops L1 and L2 join SwitchA (links 1 and 2), SwitchA joins RouterA (3), the WAN link 4 joins RouterA and RouterB, RouterB joins SwitchB (5), and SwitchB joins PC P1 (6) and Server S1 (7); the path from L1 to S1 uses links 1, 3, 4, 5 and 7",
    "Figure: the bank network with the path from Laptop L1 to Server S1 highlighted", "network/lan-wan-models", "## How a packet travels between two hosts");
}
