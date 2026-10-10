import { table, dpStr } from "../lib.mjs";
const mm=(Vm,Km,S)=>Vm*S/(Km+S);
const S=[0.5,1,2,4,8,16,32];
console.log(table(["Substrate / mmol dm⁻³","No inhibitor","Inhibitor P","Inhibitor Q"], S.map(s=>[dpStr(s,1).replace(/\.0$/,""), dpStr(mm(0.8,2,s),2), dpStr(mm(0.8,5,s),2), dpStr(mm(0.4,2,s),2)])));
console.log(S.map(s=>[s,mm(0.8,2,s),mm(0.8,5,s),mm(0.4,2,s)]));
