import { sfStr, sciTex, table, dpStr } from "../lib.mjs";
const mu0 = 4 * Math.PI * 1e-7;
const Bw = (I, r) => (mu0 * I) / (2 * Math.PI * r);
console.log(table(["r / cm", "B / µT"], [1, 2, 4, 8].map((r) => [String(r), sfStr(Bw(12, r / 100) * 1e6, 3)])));
console.log("solenoid 2000/m 0.50 A", sciTex(mu0 * 2000 * 0.5));
// WE: two wires 5.0 A and 8.0 A, 4.0 cm apart, force per metre and on 0.50 m
const B1 = Bw(5.0, 0.04); console.log("B1", sciTex(B1), "F/L", sciTex(B1 * 8.0), "F 0.50 m", sciTex(B1 * 8.0 * 0.5));
// coil: flat coil N turns radius R: B = mu0 N I/(2R): 50 turns, 0.40 A, R 0.050
console.log("coil", sciTex(mu0 * 50 * 0.4 / (2 * 0.05)));
