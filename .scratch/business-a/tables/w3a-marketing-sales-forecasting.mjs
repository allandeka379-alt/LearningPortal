import { movingAverage4, table, r2, chk } from "../lib.mjs";
export function maTable(values, labels){
  const m=movingAverage4(values);
  const rows=m.rows.map((r,i)=>[labels[i], values[i], r.movingTotal===undefined?"":r.movingTotal, r.centred===undefined?"":r.centred, r.seasonal===undefined?"":r.seasonal]);
  return {m, md: table(["Period","Sales","4-quarter moving total (between periods)","Centred moving average (trend)","Seasonal variation"], rows)};
}
if (process.argv[1].endsWith("w3a-marketing-sales-forecasting.mjs")) {
const v=[40,62,80,50,46,68,88,56,52,74,96,62];
const lab=["Y1 Q1","Y1 Q2","Y1 Q3","Y1 Q4","Y2 Q1","Y2 Q2","Y2 Q3","Y2 Q4","Y3 Q1","Y3 Q2","Y3 Q3","Y3 Q4"];
const {m,md}=maTable(v,lab); console.log(md);
console.log(m.rows.map(r=>[r.i,r.q,r.centred,r.seasonal].join(" ")).join("\n"));
console.log("seasonal avg", m.seasonalAverage, "trend", m.trendChange, "f1", m.forecast(1), m.forecast(2),m.forecast(3),m.forecast(4));
}
if (process.argv[1].endsWith("w3a-marketing-sales-forecasting.mjs")) {
console.log("=== DATA A (lesson) ===");
const v=[40,62,84,50,46,68,88,56,52,74,96,62];
const lab=["Y1 Q1","Y1 Q2","Y1 Q3","Y1 Q4","Y2 Q1","Y2 Q2","Y2 Q3","Y2 Q4","Y3 Q1","Y3 Q2","Y3 Q3","Y3 Q4"];
const m=movingAverage4(v,{adjust:false});
const rows=m.rows.map((r,i)=>[lab[i], v[i], r.movingTotal??"", r.centred??"", r.seasonal??""]);
console.log(table(["Period","Sales","Moving total of 4 quarters","Centred moving average","Seasonal variation"],rows));
console.log(m.seasonalAverage, m.trendChange);
const cs=m.rows.filter(r=>r.centred!==undefined); console.log(cs.map(r=>r.centred).join(" "));
console.log("first",cs[0].centred,"last",cs[cs.length-1].centred, "n quarters", cs[cs.length-1].i-cs[0].i);
for(let n=1;n<=4;n++) console.log("forecast",n,m.forecast(n));
}
