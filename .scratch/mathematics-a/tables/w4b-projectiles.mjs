import { sfStr, rad, deg, quad } from "../lib.mjs";
const g = 9.8, { sin, cos, tan, atan, sqrt, hypot } = Math;
{ const u = 25, a = rad(40); const ux = u * cos(a), uy = u * sin(a);
  console.log("Ex1 ux", ux, "uy", uy, "T", 2 * uy / g, "H", uy * uy / (2 * g), "R", ux * 2 * uy / g, "Rformula", u * u * sin(2 * a) / g, "Rmax", u * u / g); }
{ const u = 14, h = 60; const tt = sqrt(2 * h / g); const vy = g * tt;
  console.log("Ex2 t", tt, "x", u * tt, "vy", vy, "speed", hypot(u, vy), "angle below", deg(atan(vy / u))); }
{ // Ex3 trajectory: u = 30, target (60, 10): 10 = 60T - 9.8*3600(1+T^2)/(2*900)
  const u = 30, X = 60, Y = 10; const k = g * X * X / (2 * u * u); // k(1+T^2) - X T + Y = 0 -> k T^2 - X T + (k + Y) = 0
  console.log("k", k, "quad", k, -X, k + Y); const r = quad.roots(k, -X, k + Y); console.log(r, r.map((T) => deg(atan(T))));
}
