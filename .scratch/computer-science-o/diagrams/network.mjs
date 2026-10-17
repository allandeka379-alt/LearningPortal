import { D, wire, fig } from "./lib.mjs";
const C = D.C;
const pc = (x, y, label, o = {}) => D.circle(x, y, 14, { fill: o.fill ?? C.fillBlue, stroke: C.blue }) + D.text(x, y + 5, label, { anchor: "middle", size: 13, weight: 700 });
const pent = (cx, cy, r) => [0, 1, 2, 3, 4].map((i) => [cx + r * Math.sin((i * 2 * Math.PI) / 5), cy - r * Math.cos((i * 2 * Math.PI) / 5)]);

// 1. topologies (5 computers each, matching the cable count in the worked example)
{
  let b = "";
  const panel = (ox, oy, title, note) => D.rect(ox, oy, 270, 214, { fill: "#fff", stroke: C.grid, width: 1, r: 8 }) + D.text(ox + 12, oy + 22, title, { weight: 700, size: 15 }) + D.text(ox + 258, oy + 22, note, { anchor: "end", size: 13, fill: C.muted });
  // star
  { const ox = 10, oy = 10; b += panel(ox, oy, "Star", "5 cables");
    const cx = ox + 135, cy = oy + 120, pts = pent(cx, cy, 70);
    pts.forEach(([x, y]) => (b += D.line(cx, cy, x, y, { width: 2 })));
    b += D.rect(cx - 22, cy - 11, 44, 22, { fill: C.fillAmber, stroke: C.amber, r: 4 }) + D.text(cx, cy + 5, "switch", { anchor: "middle", size: 12 });
    pts.forEach(([x, y], i) => (b += pc(x, y, i + 1))); }
  // bus
  { const ox = 290, oy = 10; b += panel(ox, oy, "Bus", "one backbone");
    const y0 = oy + 120; b += D.line(ox + 22, y0, ox + 248, y0, { width: 3, stroke: C.blue });
    b += D.line(ox + 22, y0 - 10, ox + 22, y0 + 10, { width: 4 }) + D.line(ox + 248, y0 - 10, ox + 248, y0 + 10, { width: 4 });
    const xs = [55, 95, 135, 175, 215].map((v) => ox + v);
    xs.forEach((x, i) => { const up = i % 2 === 0, y = up ? y0 - 52 : y0 + 52; b += D.line(x, y0, x, y, { width: 2 }) + pc(x, y, i + 1); });
    b += D.text(ox + 22, y0 + 90, "terminator at each end", { size: 13, fill: C.muted }); }
  // ring
  { const ox = 10, oy = 234; b += panel(ox, oy, "Ring", "one direction");
    const cx = ox + 135, cy = oy + 122, pts = pent(cx, cy, 68);
    pts.forEach(([x, y], i) => { const [x2, y2] = pts[(i + 1) % 5]; const dx = x2 - x, dy = y2 - y, d = Math.hypot(dx, dy); b += D.arrow(x + (dx / d) * 16, y + (dy / d) * 16, x2 - (dx / d) * 18, y2 - (dy / d) * 18, { width: 2, stroke: C.blue }); });
    pts.forEach(([x, y], i) => (b += pc(x, y, i + 1))); }
  // mesh
  { const ox = 290, oy = 234; b += panel(ox, oy, "Full mesh", "10 cables");
    const cx = ox + 135, cy = oy + 122, pts = pent(cx, cy, 68);
    for (let i = 0; i < 5; i += 1) for (let j = i + 1; j < 5; j += 1) b += D.line(pts[i][0], pts[i][1], pts[j][0], pts[j][1], { width: 1.5, stroke: C.teal });
    pts.forEach(([x, y], i) => (b += pc(x, y, i + 1))); }
  await fig("network-topologies-five-computers", D.svg(580, 460, b),
    "Four topologies with five computers each: star (5 cables to a central switch), bus (one backbone with a terminator at each end), ring (each computer linked to two neighbours, data in one direction) and full mesh (every pair linked, 10 cables)",
    "Figure: star, bus, ring and full mesh topologies for five computers", "network/types-topologies", "## Network topologies");
}

// 2. path of a web request through school network devices
{
  const steps = [
    ["Computer\n(with NIC)", "Sends the request as packets onto the cable."],
    ["Switch", "Reads the destination MAC address and sends\nthe packets only to the router's port."],
    ["Router", "Reads the destination IP address, checks its\nrouting table and forwards towards the ISP."],
    ["Modem", "Converts the digital data into a signal for the\nline, if the line carries analogue signals."],
    ["Internet routers\nand web server", "Each router chooses the next step; the reply\nreturns the same way, and the switch delivers\nit only to Rudo's computer."],
  ];
  let b = "";
  const bh = 52, gap = 24;
  steps.forEach(([t, d], i) => {
    const y = 14 + i * (bh + gap);
    b += D.node(16, y, 150, bh, t, { fill: i === 4 ? C.fillGrey : C.fillBlue, size: 14 });
    b += D.text(186, y + 21, d, { size: 14 });
    if (i < steps.length - 1) b += D.arrow(91, y + bh, 91, y + bh + gap, { width: 2 });
  });
  await fig("lan-devices-request-path", D.svg(580, 14 + 5 * (bh + gap) - gap + 14, b),
    "Path of a web page request from a school computer: the NIC sends packets, the switch uses the MAC address to pass them only to the router, the router uses the IP address to forward them towards the ISP, and a modem converts the signal if the line is analogue",
    "Figure: the devices a web request passes through, from computer to internet", "network/devices", "### Wireless access point");
}

// 3. TCP/IP vs OSI
{
  const osi = [["7", "Application"], ["6", "Presentation"], ["5", "Session"], ["4", "Transport"], ["3", "Network"], ["2", "Data link"], ["1", "Physical"]];
  const rh = 44;
  let b = D.text(20, 22, "TCP/IP (4 layers)", { weight: 700, size: 14 }) + D.text(262, 22, "OSI (7 layers)", { weight: 700, size: 14 }) + D.text(530, 22, "Device", { weight: 700, size: 14, anchor: "end" });
  const top = 34;
  osi.forEach(([n, name], i) => { b += D.node(262, top + i * rh, 190, rh - 4, `${n}  ${name}`, { fill: C.fillGrey, size: 14 }); });
  const tcp = [[0, 3, "4. Application\nHTTP, HTTPS, FTP,\nSMTP, POP3, IMAP", C.fillBlue], [3, 1, "3. Transport (TCP)", C.fillBlue], [4, 1, "2. Internet (IP)", C.fillBlue], [5, 2, "1. Link\nEthernet, Wi-Fi", C.fillBlue]];
  tcp.forEach(([s, n, label]) => { b += D.node(20, top + s * rh, 200, n * rh - 4, label, { size: 14 }); b += D.line(222, top + s * rh + (n * rh - 4) / 2, 260, top + s * rh + (n * rh - 4) / 2, { width: 1.5, stroke: C.muted, dash: true }); });
  [[6, "hub"], [5, "switch"], [4, "router"]].forEach(([i, d]) => { b += D.text(530, top + i * rh + 24, d, { anchor: "end", size: 14, fill: C.amber, weight: 700 }); });
  await fig("tcpip-osi-layers", D.svg(560, top + 7 * rh + 4, b),
    "TCP/IP has four layers (application, transport, internet, link) lined up against the seven OSI layers: application covers OSI 5 to 7, transport is layer 4, internet is layer 3 and link covers layers 1 and 2; a hub works at physical, a switch at data link, a router at network",
    "Figure: the four TCP/IP layers against the seven OSI layers, with the layer each device works at", "network/protocols", "The TCP/IP application layer covers");
}
