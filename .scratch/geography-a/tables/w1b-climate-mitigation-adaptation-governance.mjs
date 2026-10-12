console.log(12000*12, 12000/10, 80*0.65, 70-80*0.65, (70-52)/70*100);
const opts={"Sea wall":[2,4,4,1],"Mangrove restoration":[4,3,4,5],"Relocation":[3,5,2,3]};
for(const [k,v] of Object.entries(opts)) console.log(k, v.reduce((a,b)=>a+b,0));
