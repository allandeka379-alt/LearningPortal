import { f, r2, table, check } from "../lib.mjs";
console.log(f.afterTradeDiscount(2400,15), f.afterBothDiscounts(2400,15,5));
const list=50*24; console.log(list, f.afterTradeDiscount(list,20), f.afterBothDiscounts(list,20,2.5), r2(list*(1-0.225)));
// statement of account example
const rows=[["1 Mar","Balance brought forward","","",350],["5 Mar","Invoice 214",960,"",1310],["12 Mar","Credit note 31 (returns)","",120,1190],["20 Mar","Payment received","",350,840],["28 Mar","Invoice 229",410,"",1250]];
let bal=350; for(const r of rows.slice(1)){bal=r2(bal+(Number(r[2])||0)-(Number(r[3])||0)); check(r[1],bal,r[4]);}
console.log(table(["Date","Details","Debit US\$","Credit US\$","Balance US\$"], rows));
