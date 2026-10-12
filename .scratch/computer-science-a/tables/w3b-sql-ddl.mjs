import { DatabaseSync } from "node:sqlite";
import { mdTable, same, codeBlock } from "../lib.mjs";

const ddl = `CREATE TABLE Form (
    FormID CHARACTER(2) PRIMARY KEY,
    FormTeacher VARCHAR(30) NOT NULL,
    Room INTEGER
);

CREATE TABLE Student (
    StudentID CHARACTER(5) PRIMARY KEY,
    Surname VARCHAR(30) NOT NULL,
    DateOfBirth DATE,
    Boarder BOOLEAN,
    FeePaid REAL,
    FormID CHARACTER(2),
    FOREIGN KEY (FormID) REFERENCES Form(FormID)
);`;

const db = new DatabaseSync(":memory:");
db.exec("PRAGMA foreign_keys = ON;");
db.exec(ddl);
const info = (t) => db.prepare(`SELECT name, type, "notnull", pk FROM pragma_table_info('${t}')`).all();
const infoMd = (t) => mdTable(["Field", "Data type", "NOT NULL", "Primary key"], info(t).map((r) => [r.name, r.type, r.notnull ? "yes" : "no", r.pk ? "yes" : "no"]));
db.exec(`INSERT INTO Form VALUES ('4A', 'Mr Dube', 12), ('4B', 'Mrs Sibanda', 7);`);
db.exec(`INSERT INTO Student VALUES ('S0101', 'Moyo', '2010-03-14', 1, 45.5, '4A'), ('S0102', 'Ncube', '2010-08-02', 0, 60, '4B');`);
const rows = db.prepare("SELECT * FROM Student").all();
const showRows = mdTable(["StudentID", "Surname", "DateOfBirth", "Boarder", "FeePaid", "FormID"], rows.map((r) => [r.StudentID, r.Surname, r.DateOfBirth, r.Boarder, Number(r.FeePaid).toFixed(2), r.FormID]));
let errFK = "";
try { db.exec(`INSERT INTO Student VALUES ('S0103', 'Banda', '2010-01-30', 0, 10, '4Z');`); } catch (e) { errFK = e.message; }
let errPK = "";
try { db.exec(`INSERT INTO Student VALUES ('S0101', 'Chuma', '2010-05-05', 0, 10, '4A');`); } catch (e) { errPK = e.message; }
let errNull = "";
try { db.exec(`INSERT INTO Student (StudentID, FormID) VALUES ('S0104', '4A');`); } catch (e) { errNull = e.message; }
same(errFK, "FOREIGN KEY constraint failed");
same(errPK, "UNIQUE constraint failed: Student.StudentID");
same(errNull, "NOT NULL constraint failed: Student.Surname");
const alter = "ALTER TABLE Student ADD Phone VARCHAR(15);";
db.exec(alter);
const afterRows = db.prepare("SELECT StudentID, Surname, Phone FROM Student").all();
same(afterRows.map((r) => r.Phone), [null, null]);
const afterMd = mdTable(["StudentID", "Surname", "Phone"], afterRows.map((r) => [r.StudentID, r.Surname, r.Phone === null ? "NULL" : r.Phone]));
const infoAfter = infoMd("Student");
const infoForm = infoMd("Form");
db.close();

export const snips = {
  ddl: codeBlock(ddl),
  infoForm,
  infoStudent: "", // filled below
  rows: showRows,
  errFK, errPK, errNull,
  alter: codeBlock(alter),
  afterMd,
  infoAfter,
};
// info of Student before ALTER (rebuild a throwaway db)
{
  const d2 = new DatabaseSync(":memory:");
  d2.exec(ddl);
  const i2 = d2.prepare(`SELECT name, type, "notnull", pk FROM pragma_table_info('Student')`).all();
  snips.infoStudent = mdTable(["Field", "Data type", "NOT NULL", "Primary key"], i2.map((r) => [r.name, r.type, r.notnull ? "yes" : "no", r.pk ? "yes" : "no"]));
  d2.close();
}
if (process.argv[1].endsWith("w3b-sql-ddl.mjs")) console.log(snips);
