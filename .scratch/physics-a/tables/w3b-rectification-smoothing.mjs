const V0 = 12 * Math.SQRT2; console.log("V0", V0, "bridge", V0 - 1.4);
const RC = 2200e-6 * 500; console.log("RC", RC, "ripple exact", V0 * (1 - Math.exp(-0.010 / RC)), "approx", V0 * 0.010 / RC, "half-wave", V0 * (1 - Math.exp(-0.020 / RC)));
const RC2 = 220e-6 * 500; console.log("RC2", RC2, "ripple", V0 * (1 - Math.exp(-0.010 / RC2)));
