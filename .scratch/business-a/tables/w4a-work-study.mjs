import { stats, table, r2, chk, rd } from "../lib.mjs";
const obs = [2.4, 2.6, 2.5, 2.3, 2.7, 2.5, 2.4, 2.6];
const mean = stats.mean(obs); const rating = 120; const basic = mean * rating / 100; const allowance = 15; const standard = basic * (1 + allowance / 100);
console.log(mean, basic, standard);
console.log(table(["Observation", "Time (minutes)"], obs.map((o,i)=>[String(i+1), o.toFixed(1)]), ["l","r"]));
console.log(table(["Step", "Working", "Result"], [
 ["Average observed time", "20.0 ÷ 8", mean.toFixed(2) + " min"],
 ["Basic time", `${mean.toFixed(2)} × 120 ÷ 100`, basic.toFixed(2) + " min"],
 ["Standard time", `${basic.toFixed(2)} × 1.15`, standard.toFixed(3) + " min"]], ["l","l","r"]));
const shift = 8 * 60, demand = 1000;
console.log(shift/standard, demand*standard/shift);
// method study
const before = { walk: 48, steps: 12 }; const after = { walk: 18, steps: 9 };
console.log(48-18, (48-18)/60);
const b4 = [["Carry loaves from oven room to packing table","Transport",30],["Wait for loaves to cool","Delay",0],["Slice loaves","Operation",0],["Bag loaves","Operation",0],["Carry bags to inspection table","Transport",12],["Check bags","Inspection",0],["Carry bags to counter","Transport",18],["Label and shelve","Operation",0]];
const af = [["Carry loaves from oven room to packing table next door","Transport",8],["Wait for loaves to cool","Delay",0],["Slice loaves","Operation",0],["Bag loaves and check on the same table","Operation",0],["Carry bags to counter","Transport",18],["Label and shelve","Operation",0]];
const dist = (l)=>l.reduce((s,x)=>s+x[2],0); const cnt=(l,t)=>l.filter(x=>x[1]===t).length;
console.log(table(["Step","Activity (before)","Type","Distance (m)"], b4.map((x,i)=>[String(i+1),x[0],x[1],String(x[2])]),["l","l","l","r"]));
console.log(table(["Step","Activity (after)","Type","Distance (m)"], af.map((x,i)=>[String(i+1),x[0],x[1],String(x[2])]),["l","l","l","r"]));
console.log(b4.length, dist(b4), cnt(b4,"Transport"), af.length, dist(af), cnt(af,"Transport"), (dist(b4)-dist(af)), (dist(b4)-dist(af))/60, 25*(dist(b4)-dist(af))/60);
