import { mrpTable } from "../lib.mjs";
const m = mrpTable({ workers:[1,2,3,4,5,6,7,8], tp:[16,30,42,52,60,66,70,72], price:4, wage:36 });
console.log(m.md, m.hire);
console.log(mrpTable({ workers:[1,2,3,4,5,6,7,8], tp:[16,30,42,52,60,66,70,72], price:4, wage:44 }).hire);
console.log(mrpTable({ workers:[1,2,3,4,5,6,7,8], tp:[16,30,42,52,60,66,70,72], price:5, wage:36 }).md);
