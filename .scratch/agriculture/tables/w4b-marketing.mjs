// Lesson numbers for business/marketing (assumed prices).
import { round } from "../lib.mjs";
const net = round(7 - 1.2 - 0.3, 2);
console.log("net per crate town", net, "extra per crate", round(net - 4, 2), "60 crates", round((net - 4) * 60, 2));
const graded = round(1.6 * 290 + 0.4 * 250, 2), ungraded = 2 * 260;
console.log("graded", graded, "ungraded", ungraded, "gain", graded - ungraded);
