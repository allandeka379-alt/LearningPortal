// usage: node w3b-edit.cjs <slice-file> <json-file-with-[[old,new],...]>
const fs=require("fs");
const [,, p, rf]=process.argv;
let s=fs.readFileSync(p,"utf8");
const R=JSON.parse(fs.readFileSync(rf,"utf8"));
for(const [a,b] of R){ if(!s.includes(a)){console.log("MISSING:",a.slice(0,60));continue;} s=s.replace(a,b);} 
fs.writeFileSync(p,s);
