// Numbers for lessons/elasticity/income-cross.md (W1b).
import { elasticity } from "../lib.mjs";
console.log("YED beef", elasticity.yed({ y1: 400, y2: 500, q1: 20, q2: 26 }));
console.log("YED cheapest meal", elasticity.yed({ y1: 400, y2: 500, q1: 40, q2: 36 }));
console.log("XED kombi vs bus", elasticity.xed({ pb1: 1.0, pb2: 1.25, qa1: 800, qa2: 900 }));
console.log("XED petrol vs cars", elasticity.xed({ pb1: 1.5, pb2: 1.8, qa1: 50, qa2: 45 }));
