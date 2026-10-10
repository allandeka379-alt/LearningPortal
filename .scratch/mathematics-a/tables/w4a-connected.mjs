// W4a lesson numbers: amaths.newton.connected-particles
const a1 = (50 - 30) / 8, T1 = 3 * (10 + a1), v1 = Math.sqrt(2 * a1 * 1.6);
console.log("Ex1", a1, T1, v1, v1 * v1 / 20, 1.6 + v1 * v1 / 20, "check 5kg", 50 - T1, 5 * a1);
const a2 = (20 - 0.25 * 40) / 6, T2 = 2 * (10 - a2);
console.log("Ex2", a2, T2, "check table", T2 - 10, 4 * a2);
const a3 = (3000 - 800) / 1600, T3 = 300 + 400 * a3;
const d3 = (1500 + 800) / 1600, F3 = 400 * d3 - 300;
console.log("Ex3", a3, T3, "brake", d3, "thrust", F3, "car check", 1500 + 500 - F3, 1200 * d3);
