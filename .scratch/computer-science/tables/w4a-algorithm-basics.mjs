// Tables for lessons/algorithms/algorithm-basics.md (worked examples), computed from JS mirrors.
import { recordTrace } from "../slices/w4a-0-kit.mjs";

// Worked example 1: minutes to hours and minutes.
{
  const t = recordTrace(["TotalMinutes", "Hours", "Minutes", "OUTPUT"], (rec) => {
    const s = { OUTPUT: "Enter the journey time in minutes" };
    rec(s);
    s.OUTPUT = undefined; s.TotalMinutes = 195; rec(s);
    s.Hours = Math.floor(s.TotalMinutes / 60); rec(s);
    s.Minutes = s.TotalMinutes % 60; rec(s);
    s.OUTPUT = `${s.TotalMinutes} minutes is ${s.Hours} hours and ${s.Minutes} minutes`; rec(s);
  });
  console.log(t.md + "\n");
}
// Worked example 2: swap.
{
  const t = recordTrace(["First", "Second", "Temp", "OUTPUT"], (rec) => {
    const s = {};
    s.First = 8; rec(s);
    s.Second = 3; rec(s);
    s.Temp = s.First; rec(s);
    s.First = s.Second; rec(s);
    s.Second = s.Temp; rec(s);
    s.OUTPUT = `${s.First} ${s.Second}`; rec(s);
  });
  console.log(t.md + "\n");
}
// Worked example 3: average of three marks.
{
  const m = [64, 71, 58];
  const total = m[0] + m[1] + m[2];
  console.log("total", total, "avg", total / 3, "round1", Math.round((total / 3) * 10) / 10);
}
