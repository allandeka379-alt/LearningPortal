// Tables for lessons/db/relational-erd.md (run: node .scratch/computer-science/tables/w4c-relational-erd.mjs).
import { table } from "../slices/w4c-0-kit.mjs";

const t = table("Doctors", [["DoctorID", "TEXT"], ["DoctorName", "TEXT"], ["Speciality", "TEXT"]], [
  ["D1", "Dr Mlambo", "General"],
  ["D2", "Dr Sithole", "Children"],
  ["D3", "Dr Gumbo", "Eyes"],
], [{ name: "Patients", columns: [["PatientID", "TEXT"], ["PatientName", "TEXT"], ["Town", "TEXT"], ["DoctorID", "TEXT"]], rows: [
  ["PT114", "Rudo Chari", "Gweru", "D2"],
  ["PT115", "Sipho Ndlovu", "Kwekwe", "D1"],
  ["PT118", "Chipo Marufu", "Gweru", "D2"],
  ["PT121", "Farai Zhou", "Shurugwi", "D3"],
  ["PT126", "Tendai Musa", "Gweru", "D2"],
] }]);
console.log(t.md + "\n\n" + t.mdOf("Patients"));
console.log(t.result("SELECT d.DoctorName, COUNT(p.PatientID) AS Patients FROM Doctors d LEFT JOIN Patients p ON p.DoctorID = d.DoctorID GROUP BY d.DoctorID").md);
console.log("orphans", t.run("SELECT PatientID FROM Patients WHERE DoctorID NOT IN (SELECT DoctorID FROM Doctors)").length);
console.log(t.result("SELECT p.PatientName, d.DoctorName FROM Patients p JOIN Doctors d ON p.DoctorID=d.DoctorID WHERE p.PatientID='PT121'").md);

const m = table("Learners", [["LearnerID", "TEXT"], ["LearnerName", "TEXT"]], [["L7", "Nyasha"], ["L8", "Tatenda"], ["L9", "Thandeka"]], [
  { name: "Clubs", columns: [["ClubID", "TEXT"], ["ClubName", "TEXT"]], rows: [["C1", "Chess"], ["C2", "Drama"], ["C3", "Robotics"]] },
  { name: "Memberships", columns: [["LearnerID", "TEXT"], ["ClubID", "TEXT"]], rows: [["L7", "C1"], ["L7", "C3"], ["L8", "C3"], ["L9", "C1"], ["L9", "C2"]] },
]);
console.log(m.md + "\n\n" + m.mdOf("Clubs") + "\n\n" + m.mdOf("Memberships"));
console.log(m.result("SELECT ClubName, COUNT(*) AS Members FROM Memberships JOIN Clubs USING(ClubID) GROUP BY ClubID").md);
console.log(m.result("SELECT LearnerName, COUNT(*) AS Clubs FROM Memberships JOIN Learners USING(LearnerID) GROUP BY LearnerID").md);
