import { sql, sqlAfter, mdTable, codeBlock, same, chk } from "../lib.mjs";

export const setup = `
CREATE TABLE Farmer (FarmerID CHARACTER(3) PRIMARY KEY, Name VARCHAR(30), District VARCHAR(20));
CREATE TABLE Delivery (DeliveryID INTEGER PRIMARY KEY, FarmerID CHARACTER(3), Crop VARCHAR(10), Kg INTEGER, Week INTEGER, FOREIGN KEY (FarmerID) REFERENCES Farmer(FarmerID));
INSERT INTO Farmer VALUES ('F01','Tendai Moyo','Gweru'),('F02','Rudo Chikwanha','Mutare'),('F03','Farai Ncube','Masvingo'),('F04','Chipo Banda','Gweru'),('F05','Nyasha Mutasa','Mutare');
INSERT INTO Delivery VALUES (1,'F01','Maize',450,1),(2,'F01','Beans',120,1),(3,'F02','Maize',600,1),(4,'F03','Cotton',300,2),(5,'F02','Beans',90,2),(6,'F04','Maize',520,2),(7,'F01','Maize',380,3),(8,'F05','Beans',150,3),(9,'F03','Maize',410,3),(10,'F04','Beans',75,3),(11,'F02','Maize',540,3);
`;
const run = (query) => {
  const r = sql(setup, query);
  return `${codeBlock(query)}\n\n${r.md}`;
};
const result = (query) => sql(setup, query);

const farmerMd = result("SELECT * FROM Farmer").md;
const deliveryMd = result("SELECT * FROM Delivery").md;

const q1 = "SELECT Name, District\nFROM Farmer\nWHERE District = 'Gweru';";
const q2 = "SELECT DeliveryID, Crop, Kg\nFROM Delivery\nWHERE Kg > 400\nORDER BY Kg DESC;";
const q3 = "SELECT COUNT(*), SUM(Kg), AVG(Kg)\nFROM Delivery\nWHERE Crop = 'Beans';";
const q4 = "SELECT Crop, SUM(Kg)\nFROM Delivery\nGROUP BY Crop;";
const q5 = "SELECT Farmer.Name, Delivery.Crop, Delivery.Kg\nFROM Farmer\nINNER JOIN Delivery ON Farmer.FarmerID = Delivery.FarmerID\nWHERE Delivery.Crop = 'Maize'\nORDER BY Delivery.Kg DESC;";
const q6 = "SELECT Farmer.Name, SUM(Delivery.Kg)\nFROM Farmer\nINNER JOIN Delivery ON Farmer.FarmerID = Delivery.FarmerID\nGROUP BY Farmer.Name\nORDER BY SUM(Delivery.Kg) DESC;";
const q7 = "SELECT Name\nFROM Farmer\nWHERE District = 'Mutare' OR District = 'Masvingo'\nORDER BY Name;";

// checks against independent JS computation
const deliveries = result("SELECT Kg, Crop, FarmerID FROM Delivery").rows;
const beans = deliveries.filter((r) => r[1] === "Beans");
const r3 = result(q3).rows[0];
same(r3, [beans.length, beans.reduce((s, r) => s + r[0], 0), beans.reduce((s, r) => s + r[0], 0) / beans.length]);
chk(r3[0], 4);
chk(r3[1], 435);
chk(r3[2], 108.75);
const r6 = result(q6).rows;
same(r6[0], ["Rudo Chikwanha", 1230]);
const r4 = result(q4).rows;
same(r4, [["Beans", 435], ["Cotton", 300], ["Maize", 2900]]);
same(result(q2).count, 5);

// data-changing statements
const ins = "INSERT INTO Delivery (DeliveryID, FarmerID, Crop, Kg, Week)\nVALUES (12, 'F05', 'Maize', 260, 4);";
const upd = "UPDATE Delivery\nSET Kg = 480\nWHERE DeliveryID = 1;";
const del = "DELETE FROM Delivery\nWHERE Week = 1 AND Crop = 'Beans';";
const sel = "SELECT * FROM Delivery WHERE DeliveryID = 1 OR DeliveryID > 10 OR Week = 1;";
const afterIns = sqlAfter(setup, ins.replace(/\n/g, " ").replace(/;$/, ""), "SELECT * FROM Delivery WHERE Week = 4");
const afterUpd = sqlAfter(setup, upd.replace(/\n/g, " ").replace(/;$/, ""), "SELECT DeliveryID, Kg FROM Delivery WHERE DeliveryID = 1");
const afterDel = sqlAfter(setup, del.replace(/\n/g, " ").replace(/;$/, ""), "SELECT COUNT(*) FROM Delivery");
same(afterDel.rows[0][0], 10);
same(afterUpd.rows[0], [1, 480]);
same(afterIns.count, 1);

export const snips = {
  farmerMd, deliveryMd,
  q1: run(q1), q2: run(q2), q3: run(q3), q4: run(q4), q5: run(q5), q6: run(q6), q7: run(q7),
  ins: codeBlock(ins), insAfter: afterIns.md,
  upd: codeBlock(upd), updAfter: afterUpd.md,
  del: codeBlock(del), delAfter: afterDel.md,
  nAfterDel: String(afterDel.rows[0][0]),
  nBeans: String(r3[0]), sumBeans: String(r3[1]), avgBeans: String(r3[2]),
  maizeTotal: String(r4[2][1]),
  topFarmer: r6[0][0], topKg: String(r6[0][1]),
  nBig: String(result(q2).count),
};
if (process.argv[1].endsWith("w3b-sql-dml.mjs")) console.log(snips);
