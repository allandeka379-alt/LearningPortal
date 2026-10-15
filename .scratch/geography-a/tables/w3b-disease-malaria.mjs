import { pearson, regression, table, mean } from "../lib.mjs";
export const ALT = [450, 600, 800, 1000, 1200, 1400, 1500, 1650];
export const INC = [262, 300, 195, 190, 140, 60, 75, 10];
export const pr = pearson(ALT, INC);
export const rg = regression(ALT, INC);
if (process.argv[1]?.endsWith("w3b-disease-malaria.mjs")) {
  console.log(pr, rg.a, rg.b, rg.r2, rg.predict(1100));
  console.log(mean(ALT), mean(INC));
}
