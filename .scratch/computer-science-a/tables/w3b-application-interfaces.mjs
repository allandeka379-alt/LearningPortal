import { pyBlock, same, chk } from "../lib.mjs";

const prog1 = `import sqlite3

conn = sqlite3.connect(":memory:")
cur = conn.cursor()
cur.execute("CREATE TABLE Learner (LearnerID TEXT PRIMARY KEY, Surname TEXT, Form TEXT, Mark INTEGER)")
data = [("L01", "Moyo", "5A", 64), ("L02", "Ncube", "5A", 72),
        ("L03", "Banda", "5B", 58), ("L04", "Chuma", "5B", 81)]
cur.executemany("INSERT INTO Learner VALUES (?, ?, ?, ?)", data)
conn.commit()

cur.execute("SELECT Surname, Mark FROM Learner WHERE Form = ?", ("5B",))
for row in cur.fetchall():
    print(row[0], row[1])

cur.execute("SELECT AVG(Mark) FROM Learner")
print("Average mark:", cur.fetchone()[0])
conn.close()`;
const r1 = pyBlock(prog1);
same(r1.text, "Banda 58\nChuma 81\nAverage mark: 68.75");
chk(((64 + 72 + 58 + 81) / 4), 68.75);

const prog2 = `import sqlite3

conn = sqlite3.connect(":memory:")
cur = conn.cursor()
cur.execute("CREATE TABLE Learner (LearnerID TEXT PRIMARY KEY, Surname TEXT, Form TEXT, Mark INTEGER)")
cur.executemany("INSERT INTO Learner VALUES (?, ?, ?, ?)",
                [("L01", "Moyo", "5A", 64), ("L02", "Ncube", "5A", 72), ("L03", "Banda", "5B", 58)])

new_mark = 66
learner = "L03"
cur.execute("UPDATE Learner SET Mark = ? WHERE LearnerID = ?", (new_mark, learner))
print("Records changed:", cur.rowcount)

cur.execute("SELECT LearnerID, Mark FROM Learner ORDER BY LearnerID")
for row in cur.fetchall():
    print(row)
conn.close()`;
const r2 = pyBlock(prog2);
same(r2.text, "Records changed: 1\n('L01', 64)\n('L02', 72)\n('L03', 66)");

const prog3 = `import sqlite3

conn = sqlite3.connect(":memory:")
cur = conn.cursor()
cur.execute("CREATE TABLE Account (UserName TEXT, Pin TEXT)")
cur.executemany("INSERT INTO Account VALUES (?, ?)", [("tendai", "4821"), ("rudo", "1937")])

user = "nobody"
pin = "x' OR '1'='1"

unsafe = "SELECT COUNT(*) FROM Account WHERE UserName = '" + user + "' AND Pin = '" + pin + "'"
print(unsafe)
print("Unsafe query matches:", cur.execute(unsafe).fetchone()[0])

safe = "SELECT COUNT(*) FROM Account WHERE UserName = ? AND Pin = ?"
print("Parameterised query matches:", cur.execute(safe, (user, pin)).fetchone()[0])
conn.close()`;
const r3 = pyBlock(prog3);
same(r3.text.split("\n").slice(1), ["Unsafe query matches: 2", "Parameterised query matches: 0"]);
// note: the unsafe query's AND binds tighter than OR, so the OR '1'='1' makes the whole WHERE true.

export const snips = {
  prog1: r1.code, out1: r1.output,
  prog2: r2.code, out2: r2.output,
  prog3: r3.code, out3: r3.output,
  injected: r3.text.split("\n")[0],
};
if (process.argv[1].endsWith("w3b-application-interfaces.mjs")) console.log(snips);
