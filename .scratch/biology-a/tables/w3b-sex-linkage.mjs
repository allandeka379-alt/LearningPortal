// Lesson numbers for inheritance/sex-linkage (probabilities from the Punnett squares).
import { chk } from "../lib.mjs";
const outcomes = ["XHXH", "XHXh", "XHY", "XhY"];
chk(outcomes.filter((o) => o === "XhY").length / outcomes.length, 0.25);
chk(1 / outcomes.filter((o) => o.endsWith("Y")).length, 0.5);
console.log("child 1/4, son 1/2, daughter carrier 1/2");
