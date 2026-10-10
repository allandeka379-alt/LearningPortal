import { dpStr } from "../lib.mjs";
const water = { 95: 84.5, 96: 87.7, 97: 90.9, 98: 94.3, 99: 97.8, 100: 101.3 };
const oilY = { 96: 9.0, 97: 9.5, 98: 10.0 };
for (const T of [96, 97, 98]) console.log(T, water[T], oilY[T], dpStr(water[T] + oilY[T], 1));
