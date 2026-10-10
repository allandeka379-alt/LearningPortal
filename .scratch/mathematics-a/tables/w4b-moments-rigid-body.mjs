// W4b lesson numbers: forces.moments-rigid-body
import { sfStr, rad, deg } from "../lib.mjs";
const g = 9.8;
// Ex1: beam AB 6 m, 40 kg uniform, supports C (1 m from A) and D (4.5 m from A), 25 kg load at B
{
  const W = 40 * g, L = 25 * g;
  // moments about C: RD*3.5 = W*2 + L*5
  const RD = (W * 2 + L * 5) / 3.5, RC = W + L - RD;
  console.log("Ex1 W", W, "L", L, "RD", RD, sfStr(RD), "RC", RC, sfStr(RC));
  // max load at B before tipping about D: RC=0: W*(4.5-3) = M g *1.5 -> M = 40*1.5/1.5
  console.log("tip mass at B", (40 * 1.5) / 1.5);
}
// Ex2: ladder 5 m, 200 N, smooth wall, rough ground, angle 60 with ground, man 700 N at 4 m up ladder
{
  const th = rad(60), W = 200, M = 700;
  const R = W + M; // vertical
  // moments about foot: S*5 sin th = W*2.5 cos th + M*4 cos th
  const S = (W * 2.5 * Math.cos(th) + M * 4 * Math.cos(th)) / (5 * Math.sin(th));
  console.log("Ex2 R", R, "S=F", S, sfStr(S), "mu min", S / R, sfStr(S / R));
}
// Ex3: rod AB 2 m, 50 N, hinged at A, horizontal, string at B to wall at 30 deg to rod
{
  const W = 50, th = rad(30);
  const T = (W * 1) / (2 * Math.sin(th));
  const X = T * Math.cos(th), Y = W - T * Math.sin(th);
  console.log("Ex3 T", T, "X", X, sfStr(X), "Y", Y, "R", Math.hypot(X, Y), sfStr(Math.hypot(X, Y)), "angle", deg(Math.atan2(Y, X)));
}
