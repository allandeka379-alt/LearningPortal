// usage: node edit.cjs file <<< JSON [[old,new],...]
const fs=require("fs");const f=process.argv[2];let s=fs.readFileSync(f,"utf8");
const pairs=JSON.parse(fs.readFileSync(0,"utf8"));
for(const [a,b] of pairs){ if(!s.includes(a)){console.error("NOT FOUND: "+a);process.exit(1)} s=s.replace(a,()=>b)}
fs.writeFileSync(f,s);
