// Lesson numbers for business/diminishing-returns.
import { productTable, round } from "../lib.mjs";
console.table(productTable([0, 1, 2, 3, 4, 5, 6], [0, 400, 1000, 1500, 1800, 1900, 1850]).map((r) => ({ ...r, average: r.average && round(r.average, 1) })));
const t = productTable([0, 1, 2, 3, 4, 5], [2000, 2600, 3100, 3450, 3600, 3650]);
console.table(t.map((r) => ({ ...r, value: r.marginal && round(r.marginal * 0.3, 2) })));
