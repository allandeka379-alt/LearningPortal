import { Mr, sfStr, moles, concFrom } from "../lib.mjs";
const n = moles(3.84, Mr("C10H8O4")); console.log("PET mol", n, "NaOH mol", 2*n, "vol 2.00M cm3", 2*n/2*1000, "diol g", sfStr(n*Mr("HOCH2CH2OH"),3), "Na2 salt", Mr("NaOOCC6H4COONa"), sfStr(n*Mr("NaOOCC6H4COONa"),3));
