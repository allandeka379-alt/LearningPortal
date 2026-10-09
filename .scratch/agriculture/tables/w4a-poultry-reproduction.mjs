// Lesson numbers for livestock/poultry-reproduction.
import { pct, round, check } from "../lib.mjs";
const egg = 60, shell = 6, alb = 36, yolk = 18;
check(shell + alb + yolk === egg, "egg");
console.log("shell", pct(shell, egg), "albumen", pct(alb, egg), "yolk", pct(yolk, egg));
const set = 120, fertile = 108, hatched = 96;
console.log("fertility", pct(fertile, set), "hatch of fertile", round(pct(hatched, fertile), 1), "hatch of set", pct(hatched, set));
console.log("oviduct hours total", 0.25 + 3 + 1.25 + 20);
