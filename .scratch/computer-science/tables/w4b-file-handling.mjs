// Values for lessons/prog/file-handling.md: JS mirror of the file operations (a file is an array of lines).
import { mdTable, recordTrace } from "../slices/w4b-0-kit.mjs";
// WE1: write 4 names to a file.
const Members = ["Tatenda", "Chipo", "Farai", "Thandeka"];
const file = [...Members];
console.log(mdTable(["Line", "Contents of members.txt"], file.map((l, i) => [i + 1, l])) + "\n");
// WE2: copy only passing results (format "name,mark" is avoided; two files of lines). Read 5 marks, write >= 50 to pass.txt and count.
const marks = ["63", "41", "77", "50", "38"];
const t = recordTrace(["Count", "MarkText", "Passes", "WRITEFILE"], (rec) => {
  const s = { Passes: 0 }; rec(s);
  for (let c = 1; c <= 5; c++) {
    s.Count = c; s.MarkText = marks[c - 1]; s.WRITEFILE = undefined;
    if (Number(s.MarkText) >= 50) { s.Passes++; s.WRITEFILE = s.MarkText; }
    rec(s);
  }
});
console.log(t.md);
console.log(marks.filter((m) => Number(m) >= 50));
