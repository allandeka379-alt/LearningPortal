// Slice w3b: SQL data manipulation language (acs.db.sql-dml, both boards). Every result is produced by running the SQL on SQLite.
import { concept, P, chk, same, sql, sqlAfter, codeBlock } from "../lib.mjs";
import { mc, pm } from "../tables/w3b-q.mjs";

const setup = `
CREATE TABLE Product (ProductID CHARACTER(2) PRIMARY KEY, Name VARCHAR(20), Category VARCHAR(15), Price REAL);
CREATE TABLE Sale (SaleID INTEGER PRIMARY KEY, ProductID CHARACTER(2), Qty INTEGER, Day INTEGER, FOREIGN KEY (ProductID) REFERENCES Product(ProductID));
INSERT INTO Product VALUES ('P1','Bread','Bakery',1.5),('P2','Milk','Dairy',2),('P3','Rice','Grocery',4),('P4','Cooking oil','Grocery',3.5),('P5','Soap','Household',1),('P6','Sugar','Grocery',2.5);
INSERT INTO Sale VALUES (1,'P1',10,1),(2,'P2',6,1),(3,'P3',4,1),(4,'P1',8,2),(5,'P5',12,2),(6,'P3',5,2),(7,'P6',7,3),(8,'P4',3,3),(9,'P1',9,3),(10,'P2',4,3);
`;
const rs = (q) => sql(setup, q);
const one = (q) => rs(q).rows[0][0];
const productMd = rs("SELECT * FROM Product").md.replace(/\| 1 \|/g, "| 1.00 |");
const priceTable = (() => {
  const r = rs("SELECT * FROM Product");
  return `| ProductID | Name | Category | Price |\n|:-:|:-:|:-:|:-:|\n${r.rows.map((x) => `| ${x[0]} | ${x[1]} | ${x[2]} | ${Number(x[3]).toFixed(2)} |`).join("\n")}`;
})();
const saleMd = rs("SELECT * FROM Sale").md;
const tables = `**Product**\n\n${priceTable}\n\n**Sale**\n\n${saleMd}`;

const qDay3 = one("SELECT COUNT(*) FROM Sale WHERE Day = 3");
chk(qDay3, 4);
const qBread = one("SELECT SUM(Qty) FROM Sale WHERE ProductID = 'P1'");
chk(qBread, 27);
const qAvgBread = one("SELECT AVG(Qty) FROM Sale WHERE ProductID = 'P1'");
chk(qAvgBread, 9);
const groupDay = rs("SELECT Day, SUM(Qty) FROM Sale GROUP BY Day");
same(groupDay.rows, [[1, 20], [2, 25], [3, 23]]);
const groupProd = rs("SELECT ProductID, SUM(Qty) FROM Sale GROUP BY ProductID");
same(groupProd.rows.length, 6);
const maxQty = one("SELECT MAX(Qty) FROM Sale");
chk(maxQty, 12);
const joinQ = "SELECT Product.Name, Sale.Qty\nFROM Product\nINNER JOIN Sale ON Product.ProductID = Sale.ProductID\nWHERE Sale.Day = 2\nORDER BY Sale.Qty DESC;";
const joinR = rs(joinQ);
same(joinR.rows, [["Soap", 12], ["Bread", 8], ["Rice", 5]]);
const joinCountQ = "SELECT COUNT(*)\nFROM Product\nINNER JOIN Sale ON Product.ProductID = Sale.ProductID\nWHERE Product.Category = 'Grocery';";
const joinCount = one(joinCountQ);
chk(joinCount, 4);
const modelGrocery = "SELECT Name\nFROM Product\nWHERE Category = 'Grocery' AND Price > 3\nORDER BY Name;";
same(rs(modelGrocery).rows, [["Cooking oil"], ["Rice"]]);
const modelDay2 = joinQ;
const modelUpdate = "UPDATE Product\nSET Price = 1.75\nWHERE ProductID = 'P1';";
same(sqlAfter(setup, modelUpdate.replace(/\n/g, " ").replace(/;$/, ""), "SELECT Price FROM Product WHERE ProductID = 'P1'").rows[0][0], 1.75);
// delete and update items
const afterDelete = sqlAfter(setup, "DELETE FROM Sale WHERE Qty < 5", "SELECT COUNT(*) FROM Sale");
chk(afterDelete.rows[0][0], 7);
const afterUpdAll = sqlAfter(setup, "UPDATE Product SET Price = 2 WHERE Category = 'Grocery'", "SELECT Price FROM Product WHERE ProductID = 'P3'");
chk(afterUpdAll.rows[0][0], 2);
const noWhere = sqlAfter(setup, "UPDATE Product SET Price = 2", "SELECT COUNT(*) FROM Product WHERE Price = 2");
chk(noWhere.rows[0][0], 6);
const insertCount = sqlAfter(setup, "INSERT INTO Sale VALUES (11,'P4',2,4)", "SELECT SUM(Qty) FROM Sale WHERE ProductID = 'P4'");
chk(insertCount.rows[0][0], 5);

// separate small datasets so that no two practice questions share their numbers
const tripSetup = `CREATE TABLE Trip (TripID INTEGER PRIMARY KEY, Route CHARACTER(1), Passengers INTEGER);
INSERT INTO Trip VALUES (1,'A',34),(2,'B',41),(3,'A',28),(4,'B',52),(5,'A',37),(6,'B',46);`;
const tripMd = sql(tripSetup, "SELECT * FROM Trip").md;
const tripA = sql(tripSetup, "SELECT SUM(Passengers) FROM Trip WHERE Route = 'A'").rows[0][0];
const tripB = sql(tripSetup, "SELECT SUM(Passengers) FROM Trip WHERE Route = 'B'").rows[0][0];
const tripAll = sql(tripSetup, "SELECT SUM(Passengers) FROM Trip").rows[0][0];
chk(tripA, 99);
chk(tripB, 139);
chk(tripAll, 238);
const rainSetup = `CREATE TABLE Rain (RainID INTEGER PRIMARY KEY, Town VARCHAR(10), Mm INTEGER);
INSERT INTO Rain VALUES (1,'Hwange',18),(2,'Kariba',23),(3,'Hwange',31),(4,'Masvingo',16),(5,'Kariba',27),(6,'Masvingo',21);`;
const rainMd = sql(rainSetup, "SELECT * FROM Rain").md;
const rainGroup = sql(rainSetup, "SELECT Town, SUM(Mm) FROM Rain GROUP BY Town ORDER BY Town");
same(rainGroup.rows, [["Hwange", 49], ["Kariba", 50], ["Masvingo", 37]]);
const pupilSetup = `CREATE TABLE Pupil (PupilID CHARACTER(2) PRIMARY KEY, Surname VARCHAR(12), Form CHARACTER(2));
INSERT INTO Pupil VALUES ('P1','Moyo','4B'),('P2','Ncube','4A'),('P3','Banda','4B'),('P4','Chuma','4C'),('P5','Dube','4B'),('P6','Sibanda','4A'),('P7','Gumbo','4B');`;
const pupilMd = sql(pupilSetup, "SELECT * FROM Pupil").md;
const pupil4B = sql(pupilSetup, "SELECT COUNT(*) FROM Pupil WHERE Form = '4B'").rows[0][0];
chk(pupil4B, 4);
const fuelSetup = `CREATE TABLE Fuel (Day INTEGER PRIMARY KEY, Litres INTEGER);
INSERT INTO Fuel VALUES (1,48),(2,63),(3,57),(4,66);`;
const fuelMd = sql(fuelSetup, "SELECT * FROM Fuel").md;
const fuelSum = sql(fuelSetup, "SELECT SUM(Litres) FROM Fuel WHERE Day > 1").rows[0][0];
chk(fuelSum, 186);
const teamSetup = `CREATE TABLE Team (TeamID CHARACTER(2) PRIMARY KEY, Town VARCHAR(10));
CREATE TABLE Player (PlayerID INTEGER PRIMARY KEY, TeamID CHARACTER(2), Goals INTEGER, FOREIGN KEY (TeamID) REFERENCES Team(TeamID));
INSERT INTO Team VALUES ('T1','Gweru'),('T2','Mutare'),('T3','Gweru');
INSERT INTO Player VALUES (1,'T1',7),(2,'T2',3),(3,'T1',5),(4,'T3',2),(5,'T2',9),(6,'T3',4),(7,'T1',1);`;
const teamMd = `**Team**\n\n${sql(teamSetup, "SELECT * FROM Team").md}\n\n**Player**\n\n${sql(teamSetup, "SELECT * FROM Player").md}`;
const joinQ2 = "SELECT COUNT(*)\nFROM Team\nINNER JOIN Player ON Team.TeamID = Player.TeamID\nWHERE Team.Town = 'Gweru';";
const teamCount = sql(teamSetup, joinQ2).rows[0][0];
chk(teamCount, 5);
// fines (struct 2)
const fineSetup = `CREATE TABLE Member (MemberID CHARACTER(2) PRIMARY KEY, Name VARCHAR(10), Town VARCHAR(10));
CREATE TABLE Fine (FineID INTEGER PRIMARY KEY, MemberID CHARACTER(2), Amount INTEGER, FOREIGN KEY (MemberID) REFERENCES Member(MemberID));
INSERT INTO Member VALUES ('M1','Tendai','Gweru'),('M2','Rudo','Mutare'),('M3','Farai','Gweru'),('M4','Chipo','Kadoma');
INSERT INTO Fine VALUES (1,'M1',3),(2,'M2',5),(3,'M1',2),(4,'M3',6),(5,'M2',4);`;
const fineMd = `**Member**\n\n${sql(fineSetup, "SELECT * FROM Member").md}\n\n**Fine**\n\n${sql(fineSetup, "SELECT * FROM Fine").md}`;
const fineQ = "SELECT Member.Name, Fine.Amount\nFROM Member\nINNER JOIN Fine ON Member.MemberID = Fine.MemberID\nWHERE Member.Town = 'Gweru'\nORDER BY Fine.Amount DESC;";
same(sql(fineSetup, fineQ).rows, [["Farai", 6], ["Tendai", 3], ["Tendai", 2]]);
const fineInsert = "INSERT INTO Fine (FineID, MemberID, Amount)\nVALUES (6, 'M4', 5);";
const fineTotalAfter = sqlAfter(fineSetup, fineInsert.replace(/\n/g, " ").replace(/;$/, ""), "SELECT SUM(Amount) FROM Fine").rows[0][0];
chk(fineTotalAfter, 25);
const fineLeft = sqlAfter(fineSetup, "DELETE FROM Fine WHERE Amount < 3", "SELECT COUNT(*) FROM Fine").rows[0][0];
chk(fineLeft, 4);

concept("acs.db.sql-dml", { file: "db/sql-dml", keyPrefix: "db.sql-dml" }, (b) => {
  mc(b, 1, "RECALL", "Which SQL statement is used to retrieve data from a table?",
    ["SELECT", "Correct."],
    [["INSERT INTO", "INSERT INTO adds a new record."], ["UPDATE", "UPDATE changes existing records."], ["CREATE TABLE", "CREATE TABLE is data definition, not retrieval."]],
    "SELECT retrieves data.");
  mc(b, 2, "RECALL", "Which clause is used to keep only the records that meet a condition?",
    ["WHERE", "Correct."],
    [["ORDER BY", "ORDER BY sorts the records."], ["GROUP BY", "GROUP BY forms groups."], ["FROM", "FROM names the table."]],
    "WHERE filters the records.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What does the clause `ORDER BY Price DESC` do?",
    ["Sorts the records from the highest price to the lowest", "Correct: DESC means descending."],
    [["Sorts the records from the lowest price to the highest", "That is ascending order, the default."], ["Deletes the records with the highest price", "ORDER BY never deletes data."], ["Groups the records with the same price", "Grouping is done by GROUP BY."]],
    "DESC reverses the sort order so the largest value is first.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which function returns the number of records that meet a condition?",
    ["COUNT", "Correct."],
    [["SUM", "SUM adds the values of a numeric field."], ["AVG", "AVG finds the mean of the values."], ["SELECT *", "SELECT * shows all the fields; it does not count records."]],
    "COUNT counts records; SUM adds values; AVG finds the mean.");
  mc(b, 3, "APPLICATION", `${tripMd}\n\nWhat does this query return?\n\n${codeBlock("SELECT SUM(Passengers)\nFROM Trip\nWHERE Route = 'A';")}`,
    [String(tripA), "Correct: 34 + 28 + 37."],
    [[String(tripB), "That is the total for route B."], [String(tripAll), "That is the total for all the trips."], ["3", "That is the number of trips on route A, not the number of passengers."]],
    "The trips on route A are 1, 3 and 5 with 34, 28 and 37 passengers, which add up to 99.", { hints: ["Select the trips on route A first."] });
  mc(b, 3, "APPLICATION", "A table `Product` has the fields `ProductID`, `Name`, `Category` and `Price`. Which query lists the names of all the products in the Grocery category in alphabetical order?",
    ["`SELECT Name FROM Product WHERE Category = 'Grocery' ORDER BY Name;`", "Correct."],
    [["`SELECT Name FROM Product WHERE Category = Grocery ORDER BY Name;`", "The text value Grocery must be in quotation marks."], ["`SELECT Name FROM Product ORDER BY Name WHERE Category = 'Grocery';`", "WHERE must come before ORDER BY."], ["`SELECT Name WHERE Category = 'Grocery' FROM Product;`", "FROM must come before WHERE."]],
    "The clauses are in the order SELECT, FROM, WHERE, ORDER BY and text is in quotes.", { hints: ["Check the order of the clauses and the quotation marks."] });
  mc(b, 3, "ANALYSIS", "A table `Product` has the fields `ProductID`, `Name`, `Category` and `Price`. A programmer runs `UPDATE Product SET Price = 2;` with no WHERE clause. What is the result?",
    ["Every product now has the price 2", "Correct: without WHERE, every record is changed."],
    [["Only the first product has its price changed", "UPDATE has no 'first only' behaviour."], ["The statement is rejected because it needs a WHERE clause", "A WHERE clause is optional in UPDATE."], ["The prices that are already 2 are deleted", "UPDATE does not delete records."]],
    "UPDATE without WHERE changes all the records.", { hints: ["Which records does the statement apply to?"] });
  mc(b, 4, "ANALYSIS", "A table `Product` has the fields `ProductID`, `Name`, `Category` and `Price`. A query must show each category name and the number of products in it. Which is correct?",
    ["`SELECT Category, COUNT(*) FROM Product GROUP BY Category;`", "Correct: every field not in an aggregate is in GROUP BY."],
    [["`SELECT Category, COUNT(*) FROM Product;`", "Without GROUP BY the category would not be grouped."], ["`SELECT Category, COUNT(*) FROM Product ORDER BY Category;`", "ORDER BY sorts but does not form groups."], ["`SELECT COUNT(Category) FROM Product WHERE Category;`", "The condition is incomplete and the category is not shown."]],
    "GROUP BY Category makes one row for each category with its count.", { hints: ["Which clause makes one result row for each category?"] });
  b.tf({ d: 1, skill: "RECALL", stem: "INSERT INTO is used to add a new record to a table.", answer: true, explanation: "True." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In SQL, text values in a WHERE clause are written in single quotation marks.", answer: true, explanation: "True. For example WHERE Category = 'Grocery'." });
  b.tf({ d: 3, skill: "ANALYSIS", hints: ["What does an inner join do with records that have no match?"],
    stem: "A shop has the tables `Product(ProductID, Name, Category, Price)` and `Sale(SaleID, ProductID, Qty, Day)`. An INNER JOIN between Product and Sale on ProductID lists a product that has never been sold.", answer: false, explanation: "False. An inner join keeps only the records that have a match in both tables." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each SQL keyword to its purpose.",
    pairs: [["WHERE", "Keeps only the records that meet a condition"], ["ORDER BY", "Sorts the result"], ["GROUP BY", "Makes one row for each group of records"], ["INNER JOIN", "Combines records from two tables using matching keys"], ["DELETE FROM", "Removes records from a table"]],
    explanation: "Each keyword has one job." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Add the rainfall in each group."],
    stem: `A query is run on the table below.\n\n${rainMd}\n\n${codeBlock("SELECT Town, SUM(Mm)\nFROM Rain\nGROUP BY Town\nORDER BY Town;")}\n\nComplete the result.`,
    template: "Hwange: SUM(Mm) = {{blank:a}}\n\nKariba: SUM(Mm) = {{blank:b}}\n\nMasvingo: SUM(Mm) = {{blank:c}}",
    blanks: rainGroup.rows.map((r, i) => ({ id: "abc"[i], input: "number", accepted: [String(r[1])], wrong: "0" })),
    explanation: "Hwange: 18 + 31 = 49. Kariba: 23 + 27 = 50. Masvingo: 16 + 21 = 37." });
  b.num({ d: 2, skill: "APPLICATION", calculator: false, hints: ["Count the rows with Form = '4B'."],
    stem: `${pupilMd}\n\nWhat value is returned by this query?\n\n${codeBlock("SELECT COUNT(*)\nFROM Pupil\nWHERE Form = '4B';")}`,
    value: pupil4B, wrong: [3, 7], workedSolution: "1. The pupils in 4B are P1, P3, P5 and P7.\n2. There are 4.", explanation: "Four pupils are in form 4B." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Select the days after day 1 first, then add the litres."],
    stem: `${fuelMd}\n\nWhat value is returned by this query?\n\n${codeBlock("SELECT SUM(Litres)\nFROM Fuel\nWHERE Day > 1;")}`,
    value: fuelSum, wrong: [234, 63], workedSolution: "1. The days greater than 1 are 2, 3 and 4.\n2. 63 + 57 + 66 = 186.", explanation: "63 + 57 + 66 = 186." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["The join keeps one row for each player of a Gweru team."],
    stem: `${teamMd}\n\nHow many rows are returned by this query?\n\n${codeBlock(joinQ2)}`,
    value: teamCount, wrong: [2, 7], workedSolution: "1. The Gweru teams are T1 and T3.\n2. T1 has players 1, 3 and 7; T3 has players 4 and 6.\n3. That is 5 rows.", explanation: "Three players of T1 and two players of T3: 5 rows." });
  b.manualShort({ d: 3, skill: "CREATION", marks: 3, hints: ["Combine two conditions with AND.", "Sort by Name."],
    stem: "A table `Product` has the fields `ProductID`, `Name`, `Category` and `Price`. Write an SQL query to show the names of all the Grocery products that cost more than 3.00, in alphabetical order of name. [3]",
    points: ["SELECT Name FROM Product", "WHERE Category = 'Grocery' AND Price > 3", "ORDER BY Name"],
    modelAnswer: `\n${codeBlock(modelGrocery)}`,
    explanation: "The query returns Cooking oil and Rice." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 4, hints: ["The tables are linked by ProductID.", "Use Table.Field for fields that exist in both tables."],
    stem: "A shop has the tables `Product(ProductID, Name, Category, Price)` and `Sale(SaleID, ProductID, Qty, Day)`. Write an SQL query that shows the name of each product sold on Day 2 and the quantity sold, with the largest quantity first. Use both tables. [4]",
    points: ["SELECT Product.Name, Sale.Qty FROM Product", "INNER JOIN Sale ON Product.ProductID = Sale.ProductID", "WHERE Sale.Day = 2", "ORDER BY Sale.Qty DESC"],
    modelAnswer: `\n${codeBlock(modelDay2)}`,
    explanation: "The query returns Soap 12, Bread 8 and Rice 5." });
  b.manualShort({ d: 3, skill: "CREATION", marks: 2, hints: ["Which statement changes existing values?"],
    stem: "A table `Product` has the fields `ProductID`, `Name`, `Category` and `Price`. The price of Bread (ProductID P1) rises to 1.75. Write an SQL statement to change the record. [2]",
    points: ["UPDATE Product SET Price = 1.75", "WHERE ProductID = 'P1' so that only that record changes"],
    modelAnswer: `\n${codeBlock(modelUpdate)}`,
    explanation: "UPDATE ... SET ... WHERE." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 3, hints: ["Compare the number of records each statement affects."],
    stem: "A table `Sale` has the fields `SaleID`, `ProductID`, `Qty` and `Day`. Compare the effect of `DELETE FROM Sale WHERE Day = 1;` with the effect of `DELETE FROM Sale;`. [3]",
    points: ["The first statement removes only the sales on Day 1", "The second statement has no WHERE clause, so it removes every record in the Sale table", "The table structure remains in both cases (the table is empty after the second)"],
    modelAnswer: "The first removes only the sales made on Day 1. The second has no WHERE clause, so it removes every record in Sale. In both cases the table itself still exists.",
    explanation: "WHERE limits the records affected." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Work out the result of each query from the tables."],
    explanation: "The queries are answered from the Sale table: 20 items on Day 1; the mean quantity of bread sold is 9; there are six groups.",
    stem: `A shop's database holds these tables.\n\n${tables}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: `State the value returned by:\n\n${codeBlock("SELECT SUM(Qty)\nFROM Sale\nWHERE Day = 1;")}`, value: 20, wrong: [10, 3], explanation: "10 + 6 + 4 = 20.", workedSolution: "1. The sales on Day 1 are SaleIDs 1, 2 and 3.\n2. 10 + 6 + 4 = 20." }),
      P.num({ label: "(b)", marks: 1, stem: `State the value returned by:\n\n${codeBlock("SELECT AVG(Qty)\nFROM Sale\nWHERE ProductID = 'P1';")}`, value: qAvgBread, wrong: [27, 3], explanation: "(10 + 8 + 9) ÷ 3 = 9.", workedSolution: "1. " + ("(10 + 8 + 9) ÷ 3 = 9.") }),
      P.num({ label: "(c)", marks: 1, stem: `How many rows are returned by:\n\n${codeBlock("SELECT ProductID, SUM(Qty)\nFROM Sale\nGROUP BY ProductID;")}`, value: groupProd.rows.length, wrong: [10, 5], explanation: "Six products were sold, so there are six groups.", workedSolution: "1. " + ("Six products were sold, so there are six groups.") }),
      P.short({ label: "(d)", marks: 1, stem: "Name the clause in the query in part (c) that makes one result row for each product.", accepted: ["GROUP BY", "group by"], explanation: "GROUP BY forms the groups." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why the query `SELECT Name, SUM(Qty) FROM Sale GROUP BY ProductID;` cannot be run on the Sale table.", points: ["Name is not a field of the Sale table (it is in Product)", "A join with Product is needed to show the product name"], modelAnswer: "The Sale table has no Name field; the name is in Product, so the tables would have to be joined.", explanation: "Names are in the Product table." }),
    ] });
  b.struct({ d: 4, skill: "CREATION", examStyle: true, hints: ["Join on MemberID.", "A new fine has the next number."],
    explanation: "The first query joins Member and Fine for Gweru members; the second adds a fine; the last two predict a total and a count.",
    stem: `A library's database holds these tables.\n\n${fineMd}`,
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Write an SQL query to show the name of each member from Gweru and the amount of each of their fines, with the largest fine first.", points: ["SELECT Member.Name, Fine.Amount FROM Member", "INNER JOIN Fine ON Member.MemberID = Fine.MemberID", "WHERE Member.Town = 'Gweru'", "ORDER BY Fine.Amount DESC"], modelAnswer: `\n${codeBlock(fineQ)}`, explanation: "Join, filter and sort." }),
      P.manual({ label: "(b)", marks: 2, stem: "Chipo (member M4) is given a new fine of 5, numbered 6. Write the SQL statement to add this record.", points: ["INSERT INTO Fine (with or without the field list)", "VALUES (6, 'M4', 5);"], modelAnswer: `\n${codeBlock(fineInsert)}`, explanation: "INSERT INTO ... VALUES." }),
      P.num({ label: "(c)", marks: 1, stem: `After the record in part (b) has been added, what value is returned by:\n\n${codeBlock("SELECT SUM(Amount)\nFROM Fine;")}`, value: fineTotalAfter, wrong: [20, 5], explanation: "3 + 5 + 2 + 6 + 4 = 20, and 20 + 5 = 25.", workedSolution: "1. The original total is 3 + 5 + 2 + 6 + 4 = 20.\n2. After adding 5 the total is 25." }),
      P.num({ label: "(d)", marks: 1, stem: `The original tables are used again. The statement\n\n${codeBlock("DELETE FROM Fine\nWHERE Amount < 3;")}\n\nis run. How many records are left in the Fine table?`, value: fineLeft, wrong: [1, 5], explanation: "Only fine 3 (amount 2) is below 3, so one record is removed from five, leaving four.", workedSolution: "1. Only FineID 3 has an Amount below 3.\n2. 5 − 1 = 4 records are left." }),
    ] });
  b.card("FACT", "SELECT statement order", "SELECT fields FROM table [INNER JOIN ... ON ...] [WHERE ...] [GROUP BY ...] [ORDER BY ...];");
  b.card("CONCEPT", "WHERE and text values", "WHERE keeps records that meet a condition; text values are in single quotes: WHERE Category = 'Grocery'.");
  b.card("FACT", "COUNT, SUM, AVG", "COUNT counts records, SUM adds values, AVG finds the mean. Each returns one value for a set of records.");
  b.card("CONCEPT", "GROUP BY", "Makes one result row for each group; every non-aggregated field in SELECT must be in GROUP BY.");
  b.card("CONCEPT", "INNER JOIN", "Combines two tables on matching key values (ON table1.key = table2.key); unmatched records are left out.");
  b.card("FACT", "INSERT INTO", "INSERT INTO Table (fields) VALUES (values); adds one record.");
  b.card("FACT", "UPDATE", "UPDATE Table SET Field = value WHERE condition; without WHERE every record is changed.");
  b.card("FACT", "DELETE FROM", "DELETE FROM Table WHERE condition; without WHERE every record is removed.");
  b.card("CONCEPT", "ORDER BY", "Sorts the result; ASC (default) smallest first, DESC largest first.");
});
