// WE1: liquid-in-glass from fixed points
const l0 = 25.0, l100 = 185.0, l = 112.0; console.log("theta LIG", (l - l0) / (l100 - l0) * 100);
// WE2: platinum R(θ) = R0(1 + Aθ + Bθ²)
const A = 3.9083e-3, B = -5.775e-7, R = (th) => 100 * (1 + A * th + B * th * th);
const R100 = R(100); console.log("R100", R100);
for (const th of [0, 25, 50, 75, 100]) console.log(th, R(th).toFixed(2), ((R(th) - 100) / (R100 - 100) * 100).toFixed(2));
