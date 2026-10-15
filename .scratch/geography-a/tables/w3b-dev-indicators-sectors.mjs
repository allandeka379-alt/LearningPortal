// HDI by the UNDP method (2022 goalposts): life expectancy 20-85; expected years of schooling 0-18; mean years 0-15; GNI per capita (PPP US$) 100-75 000, logarithmic.
export function hdi({ le, eys, mys, gni }) {
  const lei = (le - 20) / (85 - 20);
  const eysi = eys / 18;
  const mysi = mys / 15;
  const ei = (eysi + mysi) / 2;
  const ii = (Math.log(gni) - Math.log(100)) / (Math.log(75000) - Math.log(100));
  return { lei, eysi, mysi, ei, ii, hdi: Math.cbrt(lei * ei * ii) };
}
export const X = { le: 64, eys: 11, mys: 7.5, gni: 3900 };
export const Y = { le: 75, eys: 14, mys: 10, gni: 14000 };
if (process.argv[1]?.endsWith("w3b-dev-indicators-sectors.mjs")) {
  for (const c of [X, Y]) { const r = hdi(c); console.log(c, Object.fromEntries(Object.entries(r).map(([k, v]) => [k, +v.toFixed(5)]))); }
}
