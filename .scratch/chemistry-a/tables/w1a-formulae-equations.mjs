import { empiricalFormula, Mr, moles, sfStr } from "../lib.mjs";
console.log(empiricalFormula({C:40.0,H:6.7,O:53.3}));
const mC=0.880*12.0/44.0, mH=0.540*2.0/18.0, mO=0.460-mC-mH; console.log(mC,mH,mO, empiricalFormula({C:mC,H:mH,O:mO}));
const w=2.46-1.20; const nS=moles(1.20,Mr("MgSO4")), nW=moles(w,Mr("H2O")); console.log(Mr("MgSO4"), nS, nW, nW/nS);
