import { haversineKm } from "../lib.mjs";
// Saffir-Simpson categories by sustained wind (km/h): 119-153 1; 154-177 2; 178-208 3; 209-251 4; >=252 5
export const cat = (kmh) => (kmh < 119 ? 0 : kmh < 154 ? 1 : kmh < 178 ? 2 : kmh < 209 ? 3 : kmh < 252 ? 4 : 5);
export const TRACK = [
  { t: 0, lat: -14.0, lon: 42.0, w: 95 },
  { t: 12, lat: -15.0, lon: 41.0, w: 130 },
  { t: 24, lat: -16.2, lon: 39.9, w: 175 },
  { t: 36, lat: -17.6, lon: 38.8, w: 215 },
  { t: 48, lat: -19.0, lon: 36.4, w: 120 },
];
if (process.argv[1]?.endsWith("w3b-hazard-tropical-cyclones.mjs")) {
  for (let i = 1; i < TRACK.length; i++) {
    const a = TRACK[i-1], b = TRACK[i];
    const d = haversineKm(a.lat, a.lon, b.lat, b.lon);
    console.log(a.t, b.t, d.toFixed(1), (d/(b.t-a.t)).toFixed(2), "km/h");
  }
  console.log(TRACK.map(x=>cat(x.w)));
  console.log("total", [1,2,3,4].reduce((s,i)=>s+haversineKm(TRACK[i-1].lat,TRACK[i-1].lon,TRACK[i].lat,TRACK[i].lon),0));
}
