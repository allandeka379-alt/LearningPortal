// usage: node w1a-len.cjs <questions json path>  -> key/distractor lengths for each single-answer MCQ
const fs=require("fs");
for(const q of JSON.parse(fs.readFileSync(process.argv[2],"utf8"))){
  for(const m of [q,...(q.parts??[])]){
    if(m.type!=="MULTIPLE_CHOICE"||m.payload?.selectMode==="multiple")continue;
    const l=m.options.map(o=>o.content.length);const k=m.options.findIndex(o=>o.correct);
    const sorted=[...l].sort((a,b)=>b-a);
    const flag=(l[k]===sorted[0]&&l.filter(x=>x===l[k]).length===1?"LONG ":"")+(l[k]===Math.min(...l)&&l.filter(x=>x===l[k]).length===1?"SHORT":"");
    console.log(q.key,"key",l[k],"others",l.filter((_,i)=>i!==k).join(","),flag);
  }
}
