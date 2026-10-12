import { mdTable, chk } from "../lib.mjs";
const dict = [
  ["StudentID", "Student", "CHARACTER(5)", "Primary key; format S followed by 4 digits", "Yes"],
  ["Surname", "Student", "VARCHAR(30)", "Presence check", "Yes"],
  ["DateOfBirth", "Student", "DATE", "Range check: not in the future", "Yes"],
  ["FormID", "Student", "CHARACTER(2)", "Foreign key to Form(FormID)", "Yes"],
  ["FeesPaid", "Account", "REAL", "Range check: 0 or more", "No"],
];
const rights = [
  ["Teacher", "Read", "Read and write", "None"],
  ["Registrar", "Read and write", "Read", "None"],
  ["Bursar", "Read", "None", "Read and write"],
  ["Head teacher", "Read", "Read", "Read"],
];
// backup volume for a week: full backup on day 1, incremental backups on days 2 to 7
const dbGB = 12;
const dailyChange = 0.03;
const incrGB = dbGB * dailyChange;
const weekly = dbGB + 6 * incrGB;
const fullEveryDay = 7 * dbGB;
chk(incrGB, 0.36, 1e-9);
chk(weekly, 14.16, 1e-9);
chk(fullEveryDay, 84);
export const snips = {
  dict: mdTable(["Field", "Table", "Data type", "Validation or key", "Required"], dict),
  rights: mdTable(["User group", "Student table", "Marks table", "Fees table"], rights),
  dbGB: String(dbGB),
  incr: String(incrGB),
  weekly: String(Number(weekly.toFixed(2))),
  fullEveryDay: String(fullEveryDay),
  saved: String(Number((fullEveryDay - weekly).toFixed(2))),
};
if (process.argv[1].endsWith("w3b-dbms.mjs")) console.log(snips);
