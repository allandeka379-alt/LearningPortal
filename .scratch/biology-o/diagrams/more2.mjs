// biology-o: elbow muscles, skin, blood-glucose negative feedback, malaria life cycle, coronary artery
import { D, FAMILY, LES, C, call, title, ell, place } from "./_h.mjs";

const add = async (name, svg, alt, caption, lesson, after) => {
  await D.figure(FAMILY, name, svg, { alt, caption });
  place(LES(lesson), after, D.md(name, alt, caption));
};
/** spindle-shaped muscle between two points; ry is half the thickness */
const spindle = (x1, y1, x2, y2, ry, fill, stroke) => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, len = Math.hypot(x2 - x1, y2 - y1), ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return ell(mx, my, len / 2, ry, { fill, stroke, width: 2, rotate: ang });
};

// ---------- 1. Elbow: biceps and triceps (antagonistic pair)
{
  let b = "";
  const panel = (ox, bent) => {
    let s = "";
    const el = [ox + 80, 190];
    const hand = bent ? [ox + 196, 112] : [ox + 80, 330];
    s += D.line(ox + 80, 46, el[0], el[1], { stroke: "#b9b2a6", width: 16 });                  // humerus
    s += D.line(el[0], el[1], hand[0], hand[1], { stroke: "#cfc8bb", width: 14 });              // radius and ulna
    s += D.circle(el[0], el[1], 11, { fill: "#fff", stroke: C.ink, width: 2.4 });                 // elbow joint
    // tendons
    const attach = bent ? [ox + 109, 177] : [ox + 88, 222];
    s += D.line(ox + 86, 56, ox + 100, 74, { stroke: C.ink, width: 2 }) + D.line(bent ? ox + 106 : ox + 94, bent ? 140 : 168, attach[0], attach[1], { stroke: C.ink, width: 2 });
    s += D.line(ox + 62, bent ? 64 : 84, ox + 74, 50, { stroke: C.ink, width: 2 }) + D.line(ox + 60, bent ? 168 : 150, ox + 76, 190, { stroke: C.ink, width: 2 });
    // biceps (front, right of the bone) and triceps (back, left of the bone)
    s += spindle(ox + 100, 74, bent ? ox + 106 : ox + 94, bent ? 140 : 168, bent ? 15 : 7, bent ? "#f4c7c3" : "#f7e3e1", C.red);
    s += spindle(ox + 62, bent ? 64 : 84, ox + 60, bent ? 168 : 150, bent ? 7 : 15, bent ? "#e3f1f6" : "#cfe8f1", C.teal);
    s += D.text(ox + 80, 36, "Shoulder", { anchor: "middle", size: 12, fill: C.muted });
    s += call(ox + 24, 112, "Triceps", ox + 52, 112, { anchor: "end" }) + D.text(ox + 24, 130, bent ? "relaxes" : "contracts", { anchor: "end", size: 13, weight: 700, fill: bent ? C.muted : C.teal });
    s += call(ox + 140, 70, "Biceps", ox + 114, 90, { anchor: "start", fromY: 66 }) + D.text(ox + 140, 88, bent ? "contracts" : "relaxes", { size: 13, weight: 700, fill: bent ? C.red : C.muted });
    s += call(ox + 130, 236, "Elbow joint", el[0] + 8, el[1] + 6, { anchor: "start", fromY: 232 });
    s += bent ? D.text(hand[0] + 8, hand[1] + 4, "Forearm", { size: 13 }) : D.text(ox + 94, 296, "Forearm", { size: 13 });
    return s;
  };
  b += D.text(110, 22, "Bending the arm", { anchor: "middle", size: 15, weight: 700 }) + D.text(410, 22, "Straightening the arm", { anchor: "middle", size: 15, weight: 700 });
  b += panel(30, true) + panel(330, false);
  const alt = "Antagonistic muscles at the elbow: to bend the arm the biceps on the front of the upper arm contracts and the triceps on the back relaxes, pulling the radius so the forearm rises; to straighten the arm the triceps contracts and the biceps relaxes.";
  await add("elbow-antagonistic-muscles", D.svg(580, 360, b), alt, "Figure: the biceps and triceps work as an antagonistic pair at the elbow", "support/skeleton-and-movement", "At the elbow, the antagonistic pair");
}
