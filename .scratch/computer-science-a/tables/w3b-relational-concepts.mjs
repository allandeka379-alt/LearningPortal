import { mdTable, chk, same } from "../lib.mjs";
const flat = [
  ["S101", "Tendai Moyo", "4A", "Mr Dube", 12],
  ["S102", "Rudo Chikwanha", "4A", "Mr Dube", 12],
  ["S103", "Farai Ncube", "4B", "Mrs Sibanda", 7],
  ["S104", "Chipo Banda", "4A", "Mr Dube", 12],
  ["S105", "Nyasha Mutasa", "4C", "Ms Gumbo", 3],
  ["S106", "Sipho Ndlovu", "4B", "Mrs Sibanda", 7],
];
const classes = [...new Map(flat.map((r) => [r[2], [r[2], r[3], r[4]]])).values()];
const flatCells = flat.length * 2; // teacher + room repeated per student
const relCells = classes.length * 2;
chk(flatCells, 12);
chk(relCells, 6);
same(classes.length, 3);
const dube = flat.filter((r) => r[3] === "Mr Dube").length;
chk(dube, 3);
const teachers = [
  ["T01", "Mr Dube", "8801234A12", "dube@school.example", "Mathematics"],
  ["T02", "Mrs Sibanda", "7705678B34", "sibanda@school.example", "English"],
  ["T03", "Ms Gumbo", "9109012C56", "gumbo@school.example", "Mathematics"],
];
export const snips = {
  flat: mdTable(["StudentID", "Name", "ClassID", "ClassTeacher", "Room"], flat),
  student: mdTable(["StudentID (PK)", "Name", "ClassID (FK)"], flat.map((r) => [r[0], r[1], r[2]])),
  classTable: mdTable(["ClassID (PK)", "ClassTeacher", "Room"], classes),
  teachers: mdTable(["TeacherID", "Name", "NationalIDNo", "Email", "Subject"], teachers),
  flatCells: String(flatCells),
  relCells: String(relCells),
  saved: String(flatCells - relCells),
  dube: String(dube),
  nStudents: String(flat.length),
  nClasses: String(classes.length),
};
if (process.argv[1].endsWith("w3b-relational-concepts.mjs")) console.log(snips);
