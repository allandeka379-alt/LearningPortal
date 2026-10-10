console.log("peak", 230 * Math.SQRT2, "omega", 2 * Math.PI * 50);
const V0 = 3.2 * 2.0; console.log("V0", V0, "Vrms", V0 / Math.SQRT2, "P mean 10ohm", (V0 / Math.SQRT2) ** 2 / 10, "peak P", V0 * V0 / 10);
const I = 2000 / 230; console.log("Irms", I, "I0", I * Math.SQRT2, "Pmax", 2 * 2000, "R", 230 * 230 / 2000);
// instantaneous at t=2.5 ms for 230 V rms 50 Hz
console.log("v(2.5ms)", 230 * Math.SQRT2 * Math.sin(2 * Math.PI * 50 * 2.5e-3));
