import fs from 'node:fs';
const [,, file, ...pairs] = process.argv;
let s = fs.readFileSync(file,'utf8');
for (let i=0;i<pairs.length;i+=2){ const a=pairs[i], b=pairs[i+1]; if(!s.includes(a)) {console.error('MISSING: '+a); process.exit(1);} s=s.split(a).join(b);} 
fs.writeFileSync(file,s);
