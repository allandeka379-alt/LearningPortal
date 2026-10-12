// Fritsch-Carlson monotone cubic through points, plus inversion.
export function monotone(pts) {
  const n = pts.length, h = [], d = [];
  for (let i = 0; i < n - 1; i += 1) { h.push(pts[i + 1][0] - pts[i][0]); d.push((pts[i + 1][1] - pts[i][1]) / h[i]); }
  const m = new Array(n).fill(0);
  m[0] = d[0]; m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i += 1) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
  for (let i = 0; i < n - 1; i += 1) {
    if (d[i] === 0) { m[i] = 0; m[i + 1] = 0; continue; }
    const a = m[i] / d[i], b = m[i + 1] / d[i], s = a * a + b * b;
    if (s > 9) { const t = 3 / Math.sqrt(s); m[i] = t * a * d[i]; m[i + 1] = t * b * d[i]; }
  }
  const f = (x) => {
    let i = pts.findIndex((p, k) => k < n - 1 && x >= p[0] && x <= pts[k + 1][0]);
    if (i < 0) i = x < pts[0][0] ? 0 : n - 2;
    const t = (x - pts[i][0]) / h[i], t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * pts[i][1] + (t3 - 2 * t2 + t) * h[i] * m[i] + (-2 * t3 + 3 * t2) * pts[i + 1][1] + (t3 - t2) * h[i] * m[i + 1];
  };
  const inv = (y) => { let lo = pts[0][0], hi = pts[n - 1][0]; for (let k = 0; k < 80; k += 1) { const mid = (lo + hi) / 2; if (f(mid) < y) lo = mid; else hi = mid; } return (lo + hi) / 2; };
  return { f, inv };
}
