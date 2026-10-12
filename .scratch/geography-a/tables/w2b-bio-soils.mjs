import { table, mean, dpStr, rnd, chk } from "../lib.mjs";
const pos=["Crest","Upper slope","Mid slope","Foot slope","Vlei (dambo)"];
const slope=[2,8,5,2,0.5], depth=[20,35,60,80,100], sand=[78,70,55,40,20], clay=[10,15,28,40,65], ph=[5.2,5.4,5.8,6.2,6.6], moist=[6,8,12,18,34], om=[1.2,1.5,1.9,2.4,5.8];
console.log(table(["Position","Slope (°)","Topsoil depth (cm)","Sand (%)","Clay (%)","pH","Moisture (%)","Organic matter (%)"], pos.map((p,i)=>[p,slope[i],depth[i],sand[i],clay[i],dpStr(ph[i],1),moist[i],dpStr(om[i],1)])));
console.log("silt", sand.map((s,i)=>100-s-clay[i]));
console.log("mean pH", mean(ph), "clay diff", clay[4]-clay[0], "moist ratio", moist[4]/moist[0], "OM ratio", om[4]/om[0], "mean depth", mean(depth));
console.log("moisture", (120-96)/120*100, (120-96)/96*100, "LOI", (50-47)/50*100);
