// Lesson numbers for structures/fence-construction.
import { fence, field, money } from "../lib.mjs";
const pad = field(200, 150); const F = fence({ perimeterM: pad.perimeterM, postSpacingM: 10, strands: 4, rollM: 500, droppersPerSpan: 3 });
console.log(pad, F);
const cost = F.posts * 5 + F.rolls * 60 + F.droppers * 0.8; console.log("cost", F.posts * 5, F.rolls * 60, F.droppers * 0.8, cost, money(cost));
