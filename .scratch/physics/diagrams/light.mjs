// Run: node .scratch/physics/diagrams/light.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "physics-o", L = `content/subjects/${F}/lessons/light`;
const { C } = D;
const T = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, ...o });
const put = async (name, w, h, body, alt, cap, lesson, anchor) => {
  await D.figure(F, name, D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(`${L}/${lesson}.md`, anchor, D.md(name, alt, cap));
};
const rad = (d) => (d * Math.PI) / 180;
/** Arc about (cx,cy) radius r from compass-style angle a1 to a2 (degrees, 0 = straight up, clockwise positive). */
const arc = (cx, cy, r, a1, a2, o = {}) => {
  const p = (a) => [cx + r * Math.sin(rad(a)), cy - r * Math.cos(rad(a))];
  const [x1, y1] = p(a1), [x2, y2] = p(a2);
  return D.path_(`M${x1},${y1} A${r},${r} 0 0 ${a2 > a1 ? 1 : 0} ${x2},${y2}`, { width: 1.6, stroke: o.stroke ?? C.muted });
};
/** Point at distance d from (x,y) along a direction `a` degrees from straight up, clockwise (screen y down). */
const pt = (x, y, a, d) => [x + d * Math.sin(rad(a)), y - d * Math.cos(rad(a))];
const hatch = (x1, x2, y, dy = 10) => { let s = ""; for (let x = x1; x < x2; x += 14) s += D.line(x, y, x - 9, y + dy, { stroke: C.muted, width: 1.3 }); return s; };

// ---- reflection: ray at 35 degrees to the mirror => i = r = 55
{
  const px = 300, py = 210, i = 55, len = 170;
  const [sx, sy] = pt(px, py, -i, len), [ex, ey] = pt(px, py, i, len);
  const [nx, ny] = [px, py - 190];
  let b = D.line(100, py, 500, py, { stroke: C.ink, width: 4 }) + hatch(100, 500, py + 2) +
    D.line(px, py, nx, ny, { stroke: C.muted, width: 1.6, dash: true }) + T(px + 6, ny + 12, "normal", { fill: C.muted }) +
    D.arrow(sx, sy, px, py - 3, { stroke: C.blue, width: 3 }) + D.arrow(px, py - 3, ex, ey, { stroke: C.blue, width: 3 }) +
    arc(px, py, 70, -i, 0) + arc(px, py, 70, 0, i) + T(px - 40, py - 82, "i = 55°", { anchor: "end", weight: 700 }) + T(px + 40, py - 82, "r = 55°", { weight: 700 }) +
    arc(px, py, 110, -90, -i, { stroke: C.amber }) + T(px - 135, py - 28, "35°", { fill: C.amber, weight: 700 }) +
    T(110, 140, "incident ray", { fill: C.blue }) + T(515, 170, "reflected ray", { fill: C.blue, anchor: "end" }).replace("", "") + T(110, py + 34, "plane mirror", { fill: C.muted });
  b = b.replace(`<text x="515"`, `<text x="540"`);
  const alt = "Law of reflection: a ray meets a plane mirror at 35 degrees to the surface, so its angle of incidence from the normal is 55 degrees; the reflected ray leaves at 55 degrees on the other side of the normal. Angles are measured from the dashed normal, not from the mirror.";
  await put("reflection-law-35-degrees", 600, 270, b, alt, "Figure: angles of incidence and reflection are measured from the normal", "reflection", "The normal is at $90^\\circ$ to the mirror");
}

// ---- plane mirror image: object 1.5 m in front (100 px per m)
{
  const mx = 300, k = 100, d = 1.5;
  const ox = mx - d * k, ix = mx + d * k, ground = 250;
  const tipY = 170, eye = [90, 70];
  const hitY = eye[1] + (tipY - eye[1]) * ((mx - eye[0]) / (ix - eye[0]));
  let b = D.line(mx, 40, mx, 270, { stroke: C.ink, width: 4 }) + [...Array(11).keys()].map((n) => D.line(mx, 50 + n * 20, mx + 10, 60 + n * 20, { stroke: C.muted, width: 1.3 })).join("") +
    D.line(ox, ground, ox, tipY, { stroke: C.ink, width: 3, arrow: true }) + D.line(ix, ground, ix, tipY, { stroke: C.muted, width: 3, dash: true, arrow: true }) +
    D.line(ox, tipY, mx, hitY, { stroke: C.blue, width: 2.4 }) + D.arrow(mx, hitY, eye[0] + 6, eye[1] + 3, { stroke: C.blue, width: 2.4 }) + D.line(mx, hitY, ix, tipY, { stroke: C.blue, width: 1.8, dash: true }) +
    D.circle(eye[0] - 8, eye[1] - 2, 8, { fill: "#fff" }) + T(eye[0] - 16, eye[1] + 26, "eye", { anchor: "middle" }) +
    D.line(ox, ground + 16, mx, ground + 16, { stroke: C.amber, width: 1.8, arrow: true, arrowStart: true }) + D.line(mx, ground + 16, ix, ground + 16, { stroke: C.amber, width: 1.8, arrow: true, arrowStart: true }) +
    T((ox + mx) / 2, ground + 38, "1.5 m", { anchor: "middle", fill: C.amber, weight: 700 }) + T((mx + ix) / 2, ground + 38, "1.5 m", { anchor: "middle", fill: C.amber, weight: 700 }) +
    T(ox, tipY - 12, "object", { anchor: "middle" }) + T(ix, tipY - 12, "image (virtual)", { anchor: "middle", fill: C.muted }) + T(mx - 6, 34, "mirror", { anchor: "end", fill: C.muted });
  const alt = "Plane mirror image: an object stands 1.5 m in front of a mirror and its image appears 1.5 m behind it, upright and the same size. A ray from the object reflects into the eye; extended backwards as a dashed line it meets at the virtual image.";
  await put("plane-mirror-image", 600, 320, b, alt, "Figure: the image is as far behind the mirror as the object is in front", "reflection", "### Constructing an image");
}

// ---- refraction through a glass block, i = 40, r = 25
{
  const top = 120, bot = 240, i = 40, r = 25, p1 = [240, top];
  const p2 = [p1[0] + (bot - top) * Math.tan(rad(r)), bot];
  const [sx, sy] = pt(p1[0], p1[1], -i, 110), [ex, ey] = pt(p2[0], p2[1], 180 - i, 110);
  let b = D.rect(80, top, 440, bot - top, { fill: C.fillBlue }) + T(92, top + 22, "glass", { fill: C.blue, weight: 700 }) + T(92, top - 8, "air", { fill: C.muted }) +
    D.line(p1[0], top - 100, p1[0], top + 50, { stroke: C.muted, width: 1.4, dash: true }) + D.line(p2[0], bot - 50, p2[0], bot + 100, { stroke: C.muted, width: 1.4, dash: true }) +
    D.line(sx, sy, p1[0], p1[1], { stroke: C.amber, width: 3 }) + D.line(p1[0], p1[1], p2[0], p2[1], { stroke: C.amber, width: 3 }) + D.line(p2[0], p2[1], ex, ey, { stroke: C.amber, width: 3 }) +
    D.line(p1[0], p1[1], p1[0] + (bot - top) * Math.tan(rad(i)), bot, { stroke: C.muted, width: 1.4, dash: true }) +
    arc(p1[0], p1[1], 55, -i, 0) + T(p1[0] - 62, top - 32, "i = 40°", { anchor: "end", weight: 700 }) +
    arc(p1[0], p1[1], 60, 180 - r, 180) + T(p1[0] - 8, top + 85, "r = 25°", { weight: 700, anchor: "end" }) +
    arc(p2[0], p2[1], 55, 180 - i, 180) + T(p2[0] + 8, bot + 68, "40°", { weight: 700, size: 13 }) +
    T(p1[0] - 70, top - 70, "incident ray", { fill: C.amber, anchor: "end" }) + T(290, bot + 112, "emergent ray, parallel to the incident ray", { fill: C.amber, anchor: "end", size: 13 }) +
    T(300, 372, "n = sin 40° ÷ sin 25° = 1.52", { anchor: "middle", weight: 700 }) + T(p1[0] + 108, top + 112, "(dashed: undeflected path)", { size: 12, fill: C.muted }).replace("", "");
  const alt = "Ray through a glass block: entering from air at an angle of incidence of 40 degrees it bends towards the normal to an angle of refraction of 25 degrees, so the refractive index is sin 40 over sin 25, 1.52. It leaves the opposite face at 40 degrees, parallel to the incident ray but shifted sideways.";
  await put("refraction-glass-block", 600, 385, b, alt, "Figure: light bends towards the normal on entering glass and away on leaving", "refraction", "The ray leaving a parallel-sided block is **parallel**");
}

// ---- total internal reflection: three angles in glass (n = 1.50, c = 41.8)
{
  const n = 1.5, c = (Math.asin(1 / n) * 180) / Math.PI;
  const panel = (i, title, sub, ox) => {
    const cx = ox + 105, by = 150;
    const [sx, sy] = pt(cx, by, 180 + i, 100); // start below-left
    let s = D.rect(ox + 5, by, 200, 110, { fill: C.fillBlue, stroke: "none" }) + D.line(ox + 5, by, ox + 205, by, { stroke: C.ink, width: 2.4 }) + D.line(cx, by - 95, cx, by + 100, { stroke: C.muted, width: 1.3, dash: true }) +
      D.arrow(sx, sy, cx, by + 2, { stroke: C.amber, width: 2.6 }) + T(ox + 10, by + 104, "glass", { fill: C.blue, weight: 700, size: 13 }) + T(ox + 10, by - 6, "air", { fill: C.muted, size: 13 }) +
      T(ox + 105, 22, title, { anchor: "middle", weight: 700 }) + T(ox + 105, 42, sub, { anchor: "middle", size: 13, fill: C.muted });
    const sinr = n * Math.sin(rad(i));
    if (sinr < 0.9999) {
      const r = (Math.asin(sinr) * 180) / Math.PI;
      const [ex, ey] = pt(cx, by, r, 100);
      s += D.arrow(cx, by - 2, ex, ey, { stroke: C.amber, width: 2.6 }) + T(ex - 4, ey - 8, `r = ${r.toFixed(0)}°`, { anchor: "middle", size: 13 });
    } else if (i - c > -0.01 && i - c < 0.01) {
      s += D.arrow(cx, by - 2, cx + 95, by - 2, { stroke: C.amber, width: 2.6 }) + T(cx + 50, by - 12, "r = 90°", { anchor: "middle", size: 13 });
    } else {
      const [ex, ey] = pt(cx, by, 180 - i, 95);
      s += D.arrow(cx, by + 2, ex, ey, { stroke: C.amber, width: 2.6 }).replace(/y2="([\d.]+)"/, (m, v) => `y2="${v}"`);
    }
    return s + T(cx + 10, by + 80, `i = ${Number.isInteger(i) ? i : i.toFixed(1)}°`, { size: 13, weight: 700 });
  };
  // The reflected ray should leave upward-right when travelling in glass below the boundary: draw it below the boundary instead.
  const refl = (i, ox) => { const cx = ox + 105, by = 150, [ex, ey] = pt(cx, by, 180 - i, 110); return D.arrow(cx, by + 2, ex, ey, { stroke: C.amber, width: 2.6 }); };
  let b = panel(30, "i smaller than c", "most light refracts out", 0) + panel(c, "i equal to c", "refracted ray skims the surface", 210);
  b += panel(60, "i greater than c", "total internal reflection", 420);
  b = b.replace(/<line [^>]*y2="[^"]*"[^>]*marker-end[^>]*\/>(?=<text[^>]*>i = 60)/, (m) => m);
  const alt = `Three rays inside glass (refractive index 1.50, critical angle ${c.toFixed(1)} degrees) meeting the glass-air boundary. At 30 degrees most light refracts out, bending away from the normal to 49 degrees; at ${c.toFixed(1)} degrees the refracted ray skims along the surface; at 60 degrees all the light is reflected back into the glass.`;
  await put("tir-three-angles", 640, 290, b, alt, "Figure: the critical angle separates refraction from total internal reflection", "total-internal-reflection", "## What happens as the angle increases");
}

// ---- optical fibre
{
  const h = 60, y0 = 110, ang = 30; // ray is 30 degrees to the axis, so 60 degrees from the wall normal
  const step = h / Math.tan(rad(ang));
  let b = D.rect(30, y0, 560, h, { fill: C.fillBlue, r: 6 }) + T(40, y0 - 10, "glass core", { fill: C.blue, weight: 700 });
  let x = 40, y = y0 + h, up = true, pts = [[x, y]];
  while (x + step <= 580) { x += step; y = up ? y0 : y0 + h; up = !up; pts.push([x, y]); }
  b += D.polyline(pts, { stroke: C.amber, width: 3 }) + pts.slice(1).map(([px, py]) => D.dot(px, py, { r: 3.5, stroke: C.amber })).join("");
  const [px, py] = pts[1];
  b += D.line(px, y0 - 40, px, y0 + 40, { stroke: C.muted, width: 1.3, dash: true }) + arc(px, py, 26, 180, 240) + T(px + 8, y0 - 18, "i = 60°", { weight: 700 });
  b += T(310, 225, "Every angle of incidence is 60°, greater than the critical angle of glass (about 42°),", { anchor: "middle" }) + T(310, 247, "so the light is totally internally reflected again and again along the fibre.", { anchor: "middle" });
  const alt = "Optical fibre: a ray zigzags along a glass core, meeting the wall each time at an angle of incidence of 60 degrees, which is greater than the critical angle of about 42 degrees, so it is totally internally reflected every time and stays inside.";
  await put("optical-fibre-tir", 620, 270, b, alt, "Figure: light is trapped in a fibre by repeated total internal reflection", "total-internal-reflection", "### Optical fibres");
}

// ---- lenses: ray diagrams (f = 80 px)
function lensDiagram({ u, f, h, A = 150, Lx = 300, W = 600, H = 310, virtual }) {
  const ox = Lx - u, tipY = A - h;
  const lens = D.line(Lx, A - 110, Lx, A + 110, { width: 3, stroke: C.blue, arrow: true, arrowStart: true });
  let b = D.line(20, A, W - 20, A, { stroke: C.axis, width: 1.4 }) + lens;
  for (const [x, nm] of [[Lx - f, "F"], [Lx + f, "F"], [Lx - 2 * f, "2F"], [Lx + 2 * f, "2F"]]) b += D.dot(x, A, { r: 3.5 }) + T(x, A + 20, nm, { anchor: "middle", weight: 700 });
  b += D.line(ox, A, ox, tipY, { stroke: C.ink, width: 3, arrow: true }) + T(ox, A + 38, "object", { anchor: "middle" });
  const v = (u * f) / (u - f); // positive: real image on the far side; negative: virtual on the object side
  const ih = (h * v) / u; // image tip is at A + ih (below axis when real)
  const tip = [Lx + v, A + ih];
  // ray 1: parallel then through far focus; ray 2: through centre
  b += D.line(ox, tipY, Lx, tipY, { stroke: C.amber, width: 2.4 });
  if (!virtual) {
    b += D.arrow(Lx, tipY, Lx + 0.82 * (tip[0] - Lx), tipY + 0.82 * (tip[1] - tipY), { stroke: C.amber, width: 2.4 }) + D.line(Lx + 0.82 * (tip[0] - Lx), tipY + 0.82 * (tip[1] - tipY), tip[0], tip[1], { stroke: C.amber, width: 2.4 }) + D.arrow(ox, tipY, ox + 0.82 * (tip[0] - ox), tipY + 0.82 * (tip[1] - tipY), { stroke: C.red, width: 2.4 }) + D.line(ox + 0.82 * (tip[0] - ox), tipY + 0.82 * (tip[1] - tipY), tip[0], tip[1], { stroke: C.red, width: 2.4 }) +
      D.line(tip[0], A, tip[0], tip[1], { stroke: C.ink, width: 3, arrow: true }) + T(tip[0], tip[1] + 22, "image", { anchor: "middle" });
  } else {
    const [fx, fy] = [Lx + f, A];
    const slope = (fy - tipY) / (fx - Lx);
    const endX = Lx + 130;
    b += D.arrow(Lx, tipY, endX, tipY + slope * 130, { stroke: C.amber, width: 2.4 }) + D.line(Lx, tipY, tip[0], tip[1], { stroke: C.amber, width: 1.6, dash: true });
    const cs = (A - tipY) / (Lx - ox);
    b += D.arrow(ox, tipY, Lx + 130, A + cs * 130, { stroke: C.red, width: 2.4 }) + D.line(ox, tipY, tip[0], tip[1], { stroke: C.red, width: 1.6, dash: true }) +
      D.line(tip[0], A, tip[0], tip[1], { stroke: C.muted, width: 3, dash: true, arrow: true }) + T(tip[0], tip[1] - 10, "virtual image", { anchor: "middle", fill: C.muted });
  }
  return { b, v, ih };
}
{
  const f = 80, u = 200, h = 60;
  const { b, v, ih } = lensDiagram({ u, f, h });
  const alt = `Ray diagram for a converging lens with the object beyond 2F (200 units from the lens, focal length 80): a ray parallel to the axis passes through the far focus and a ray through the centre goes straight on; they meet at a real image ${v.toFixed(0)} units behind the lens, inverted and diminished.`;
  await put("lens-ray-diagram-beyond-2f", 600, 290, b + T(300, 275, "Object beyond 2F: image real, inverted, diminished, between F and 2F", { anchor: "middle", weight: 700, size: 13 }), alt, "Figure: converging lens with the object beyond 2F", "lenses", "Where the rays meet is the top of the image.");
}
{
  const f = 80, u = 50, h = 30;
  const { b } = lensDiagram({ u, f, h, A: 170, H: 320, virtual: true });
  const alt = "Ray diagram for a converging lens used as a magnifying glass: the object is 50 units from the lens, inside the focal length of 80. The rays leave the lens diverging; traced backwards as dashed lines they appear to come from an upright, enlarged, virtual image on the same side as the object.";
  await put("lens-ray-diagram-magnifier", 600, 310, b + T(300, 296, "Object inside F: image virtual, upright, enlarged, same side as the object", { anchor: "middle", weight: 700, size: 13 }), alt, "Figure: a converging lens as a magnifying glass", "lenses", "### The magnifying glass");
}
console.log("light done");
