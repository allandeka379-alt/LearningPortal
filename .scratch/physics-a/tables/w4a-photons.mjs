import { DATA, sfStr, sciTex, table, photonEnergy, JtoeV } from "../lib.mjs";
const { h, c } = DATA;
const rows = [["radio (FM)", 3.0], ["microwave", 0.12], ["infrared", 1.0e-5], ["red light", 700e-9], ["violet light", 400e-9], ["ultraviolet", 100e-9], ["X-ray", 1.0e-10], ["gamma", 1.0e-12]];
console.log(table(["radiation", "λ / m", "f / Hz", "E / J", "E / eV"], rows.map(([n, l]) => [n, sciTex(l, 2), sciTex(c / l, 2), sciTex(photonEnergy(l), 2), sciTex(JtoeV(photonEnergy(l)), 2)])));
const E589 = photonEnergy(589e-9); console.log("WE1", sciTex(E589), sfStr(JtoeV(E589), 3));
const N = 5.0e-3 / photonEnergy(633e-9); console.log("WE2 E633", sciTex(photonEnergy(633e-9)), "N", sciTex(N));
console.log("WE3 p", sciTex(photonEnergy(450e-9) / c), "h/λ", sciTex(h / 450e-9), "F", sciTex(2.0e3 / c));
