// Tables for lessons/algorithms/totalling-counting.md, computed from JS mirrors.
import { recordTrace, arrayMd } from "../slices/w4a-0-kit.mjs";

// WE1: total, conditional count and average over an array.
{
  const Sales = [120, 85, 60, 150, 95, 114];
  console.log(arrayMd("Sales", Sales) + "\n");
  const t = recordTrace(["Day", "Total", "Count", "Average", "OUTPUT"], (rec) => {
    const s = { Total: 0, Count: 0 };
    rec(s);
    for (let d = 1; d <= 6; d++) {
      s.Day = d;
      s.Total += Sales[d - 1];
      if (Sales[d - 1] > 100) s.Count += 1;
      rec(s);
    }
    s.Average = s.Total / 6; rec(s);
    s.OUTPUT = `Total ${s.Total} Average ${s.Average} Busy days ${s.Count}`; rec(s);
  });
  console.log(t.md + "\n");
}
// WE2: tallest and shortest of five inputs.
{
  const H = [152, 147, 163, 158, 141];
  const t = recordTrace(["Learner", "Height", "Tallest", "Shortest", "OUTPUT"], (rec) => {
    const s = {};
    s.Height = H[0]; rec(s);
    s.Tallest = s.Height; s.Shortest = s.Height; rec(s);
    for (let l = 2; l <= 5; l++) {
      s.Learner = l; s.Height = H[l - 1];
      if (s.Height > s.Tallest) s.Tallest = s.Height;
      if (s.Height < s.Shortest) s.Shortest = s.Height;
      rec(s);
    }
    s.OUTPUT = `${s.Tallest} ${s.Shortest}`; rec(s);
  });
  console.log(t.md);
}
