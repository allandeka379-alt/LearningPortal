const load=[["LED bulbs (3 x 10 W x 4 h)",3*10*4],["Phone charging (5 W x 3 h)",5*3],["Television (40 W x 3 h)",40*3]];
const tot=load.reduce((s,x)=>s+x[1],0); console.log(load, tot);
const psh=5, eff=0.7; console.log("panel W", tot/(psh*eff));
console.log("payback months", 250/10, "saving per year", 120, "bulb run cost");
console.log("battery Ah at 12V, 2 days autonomy, 50% DoD", tot*2/12/0.5);
