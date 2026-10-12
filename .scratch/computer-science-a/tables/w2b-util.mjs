// BFS path through a link table
export function path(links, from, to) {
  const g = {};
  for (const [a, b] of links) { (g[a] ??= []).push(b); (g[b] ??= []).push(a); }
  const prev = { [from]: null }; const q = [from];
  while (q.length) { const u = q.shift(); for (const v of g[u] ?? []) if (!(v in prev)) { prev[v] = u; q.push(v); } }
  const p = []; for (let x = to; x !== null; x = prev[x]) p.unshift(x); return p;
}