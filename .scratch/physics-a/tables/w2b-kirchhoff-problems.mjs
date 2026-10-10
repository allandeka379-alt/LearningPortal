const V = 48 / 11; const I1 = (6 - V) / 2, I2 = (4 - V) / 4, I3 = V / 6;
console.log("V", V, "I1", I1, "I2", I2, "I3", I3, "sum", I1 + I2 - I3);
console.log("P E1", 6 * I1, "P E2 absorbed", -4 * I2, "dissip", I1 * I1 * 2 + I2 * I2 * 4 + I3 * I3 * 6, "net", 6 * I1 + 4 * I2);
const Rp = 1 / (1 / 100 + 1 / 200); console.log("voltmeter Rp", Rp, "reading", 10 * Rp / (Rp + 100));
