import { D, fig, table } from "./lib.mjs";
const C = D.C;
const lab = (x, y, s, o = {}) => D.text(x, y, s, { size: 13, ...o });

// ---------------------------------------------------------------- databases
// 1. keys: Doctors / Patients
{
  const doctors = [["DoctorID", "DoctorName", "Speciality"], ["D1", "Dr Mlambo", "General"], ["D2", "Dr Sithole", "Children"], ["D3", "Dr Gumbo", "Eyes"]];
  const patients = [["PatientID", "PatientName", "Town", "DoctorID"], ["PT114", "Rudo Chari", "Gweru", "D2"], ["PT115", "Sipho Ndlovu", "Kwekwe", "D1"], ["PT118", "Chipo Marufu", "Gweru", "D2"], ["PT121", "Farai Zhou", "Shurugwi", "D3"], ["PT126", "Tendai Musa", "Gweru", "D2"]];
  let b = "";
  b += D.text(200, 24, "Doctors", { weight: 700 }) + D.text(262, 24, "primary key: DoctorID", { size: 13, fill: C.amber, weight: 700 });
  b += table(200, 34, [64, 110, 100], doctors, { colFill: { 0: C.fillAmber }, headFill: [C.fillAmber, C.fillGrey, C.fillGrey] });
  b += D.text(10, 184, "Patients", { weight: 700 }) + D.text(80, 184, "primary key: PatientID;  foreign key: DoctorID", { size: 13, fill: C.blue, weight: 700 });
  b += table(10, 194, [70, 120, 90, 76], patients, { colFill: { 0: C.fillAmber, 3: C.fillBlue }, headFill: [C.fillAmber, C.fillGrey, C.fillGrey, C.fillBlue] });
  // Farai Zhou row is body row 4 (y = 194 + 28*4)
  const yRow = 194 + 28 * 4 + 14;
  b += D.polyline([[366, yRow], [400, yRow], [400, 168], [180, 168], [180, 132], [198, 132]], { width: 2.2, stroke: C.blue, arrow: true });
  b += lab(206, 162, "Farai Zhou's D3 leads to Dr Gumbo", { fill: C.blue, weight: 700 });
  b += lab(380, 380, "D2 appears 3 times: a foreign key may repeat", { size: 13, fill: C.muted, anchor: "end" });
  await fig("keys-doctors-patients", D.svg(520, 392, b),
    "Two linked tables: Doctors has primary key DoctorID (D1, D2, D3); Patients has primary key PatientID and a foreign key DoctorID, which repeats (D2 appears three times) and leads each patient to one doctor, for example Farai Zhou's D3 leads to Dr Gumbo",
    "Figure: primary keys and a foreign key linking the Patients table to the Doctors table", "db/relational-erd", "In `Patients`, `DoctorID` is a **foreign key**.");
}

// 2. ERD (crow's foot): Borrower - Loan - Book
{
  let b = "";
  const ent = (x, y, w, name, lines) => D.rect(x, y, w, 38 + lines.length * 22, { fill: "#fff", stroke: C.axis, width: 2 }) + D.rect(x, y, w, 30, { fill: C.fillBlue, stroke: C.axis, width: 2 }) + D.text(x + w / 2, y + 21, name, { anchor: "middle", weight: 700 }) + lines.map((l, i) => D.text(x + 8, y + 50 + i * 22, l, { size: 13 })).join("");
  b += ent(10, 20, 130, "Borrower", ["BorrowerID (PK)", "Name"]);
  b += ent(220, 20, 140, "Loan", ["BorrowerID (FK)", "BookID (FK)", "Loan date", "Due date"]);
  b += ent(440, 20, 130, "Book", ["BookID (PK)", "Title"]);
  const y = 70;
  // Borrower (one) -- Loan (many)
  b += D.line(140, y, 220, y, { width: 2 }) + D.line(150, y - 9, 150, y + 9, { width: 2 });
  b += [-9, 0, 9].map((d) => D.line(206, y, 220, y + d, { width: 2 })).join("");
  // Book (one) -- Loan (many)
  b += D.line(360, y, 440, y, { width: 2 }) + D.line(430, y - 9, 430, y + 9, { width: 2 });
  b += [-9, 0, 9].map((d) => D.line(374, y, 360, y + d, { width: 2 })).join("");
  b += lab(150, y - 14, "one", { fill: C.muted }) + lab(180, y + 28, "many", { fill: C.muted, anchor: "middle" }).replace("", "") + lab(398, y + 28, "many", { fill: C.muted, anchor: "middle" }).replace("", "") + lab(430, y - 14, "one", { fill: C.muted, anchor: "end" }).replace("", "");
  b += lab(10, 178, "Plain line end = one; three prongs (crow's foot) = many.", { fill: C.muted });
  b += lab(10, 198, "One borrower has many loans; one book appears in many loans.", { fill: C.muted });
  await fig("erd-library-borrower-loan-book", D.svg(580, 214, b),
    "Entity-relationship diagram in crow's foot notation: Borrower and Book each link to Loan with a plain end (one) at Borrower or Book and a crow's foot (many) at Loan; Loan holds BorrowerID and BookID as foreign keys, so it resolves the many-to-many link",
    "Figure: an ERD for a school library with Loan as the link table", "db/relational-erd", "An ERD draws each entity as a rectangle");
}

// 3. SQL query stages
{
  const plants = [["Basil", "Herb", 3], ["Msasa", "Tree", 18], ["Aloe", "Succulent", 6], ["Rosemary", "Herb", 4], ["Bougainvillea", "Shrub", 9], ["Mint", "Herb", 2], ["Jacaranda", "Tree", 21], ["Snake plant", "Succulent", 8]];
  const herbs = plants.filter((p) => p[1] === "Herb");
  const sorted = [...herbs].sort((a, b) => b[2] - a[2]);
  if (sorted.map((p) => p[0]).join() !== "Rosemary,Basil,Mint") throw new Error("sql");
  let b = "";
  b += D.text(10, 20, "1  WHERE Type = 'Herb'", { size: 13, weight: 700 });
  b += table(10, 30, [96, 66, 40], [["PlantName", "Type", "Price"], ...plants], { rh: 26, size: 13, hi: new Set(plants.map((p, i) => (p[1] === "Herb" ? i : -1)).filter((i) => i >= 0)) });
  b += D.text(10, 30 + 26 * 9 + 20, "amber = kept (3 records)", { size: 13, fill: C.muted });
  b += D.arrow(214, 120, 240, 120, { width: 2.4 });
  b += D.text(244, 20, "2  ORDER BY Price DESC", { size: 13, weight: 700 });
  b += table(244, 30, [90, 60, 38], [["PlantName", "Type", "Price"], ...sorted], { rh: 26, size: 13 });
  b += D.text(244, 30 + 26 * 4 + 20, "largest price first", { size: 13, fill: C.muted });
  b += D.arrow(436, 70, 458, 70, { width: 2.4 });
  b += D.text(462, 20, "3  SELECT", { size: 13, weight: 700 }) + D.text(462, 36, "PlantName, Price", { size: 13, weight: 700 });
  b += table(462, 44, [78, 44], [["PlantName", "Price"], ...sorted.map((p) => [p[0], p[2]])], { rh: 26, size: 12 });
  await fig("sql-query-filter-sort-show", D.svg(600, 300, b),
    "SQL query stages on Rudo's plants table: WHERE Type = 'Herb' keeps Basil, Rosemary and Mint; ORDER BY Price DESC puts Rosemary (4), Basil (3), Mint (2) in that order; SELECT PlantName, Price shows only those two fields",
    "Figure: a query filters with WHERE, sorts with ORDER BY, then shows only the SELECT fields", "db/sql", "Work through a query in three steps");
}

// ---------------------------------------------------------------- systems analysis and design
// 4. DFD library loan
{
  let b = "";
  const entity = (x, y, w, h, t) => D.rect(x, y, w, h, { fill: C.fillGreen, stroke: C.axis, width: 2 }) + D.text(x + w / 2, y + h / 2 + 5, t, { anchor: "middle" });
  const store = (x, y, w, h, t) => D.line(x, y, x + w, y, { width: 2 }) + D.line(x, y + h, x + w, y + h, { width: 2 }) + D.line(x, y, x, y + h, { width: 2 }) + D.text(x + w / 2 + 4, y + h / 2 + 5, t, { anchor: "middle" });
  const proc = (x, y, w, h, t) => D.node(x, y, w, h, t, { fill: C.fillBlue });
  b += store(290, 10, 130, 36, "D1 Books");
  b += proc(290, 90, 130, 70, "1 Record loan");
  b += store(290, 200, 130, 36, "D2 Loans");
  b += proc(290, 276, 130, 70, "2 Produce\noverdue list");
  b += entity(10, 100, 100, 50, "Learner");
  b += entity(10, 286, 100, 50, "Librarian");
  b += D.arrow(355, 46, 355, 90, { width: 2 }) + lab(364, 72, "book details");
  b += D.arrow(110, 113, 290, 113, { width: 2 }) + lab(200, 105, "Learner ID and book", { anchor: "middle" });
  b += D.arrow(290, 138, 110, 138, { width: 2 }) + lab(200, 158, "return date", { anchor: "middle" });
  b += D.arrow(355, 160, 355, 200, { width: 2 }) + lab(364, 184, "loan details");
  b += D.arrow(355, 236, 355, 276, { width: 2 }) + lab(364, 260, "overdue loans");
  b += D.arrow(290, 311, 110, 311, { width: 2 }) + lab(200, 303, "overdue list", { anchor: "middle" });
  await fig("dfd-library-loan", D.svg(560, 360, b),
    "Data flow diagram of a library loan system: the Learner sends Learner ID and book to process 1 Record loan, which reads book details from store D1 Books, saves loan details in D2 Loans and returns a return date; process 2 reads overdue loans from D2 Loans and sends an overdue list to the Librarian",
    "Figure: a data flow diagram with two entities, two processes and two data stores", "sad/analysis-tools", "**Rules:** every data flow is labelled");
}

// 5. system flowchart: bus bookings
{
  let b = "";
  const mi = (x, y, w, h, t) => D.polyline([[x, y + 12], [x + w, y], [x + w, y + h], [x, y + h]], { fill: C.fillGreen, close: true }) + D.text(x + w / 2, y + h / 2 + 10, t, { anchor: "middle", size: 13 });
  const doc = (x, y, w, h, t) => D.path_(`M${x},${y} L${x + w},${y} L${x + w},${y + h - 8} Q${x + w * 0.75},${y + h - 22} ${x + w / 2},${y + h - 8} Q${x + w * 0.25},${y + h + 6} ${x},${y + h - 8} Z`, { fill: C.fillAmber }) + D.text(x + w / 2, y + h / 2, t, { anchor: "middle", size: 13 });
  const disp = (x, y, w, h, t) => D.polyline([[x, y + h / 2], [x + 20, y], [x + w - 20, y], [x + w, y + 4], [x + w, y + h - 4], [x + w - 20, y + h], [x + 20, y + h]], { fill: C.fillGrey, close: true }) + D.text(x + w / 2, y + h / 2 + 5, t, { anchor: "middle", size: 13 });
  const disk = (x, y, w, h, t) => D.rect(x, y + 8, w, h - 16, { fill: C.fillBlue, stroke: C.axis }) + D.path_(`M${x},${y + 8} a${w / 2},8 0 0 1 ${w},0`, { fill: C.fillBlue }) + D.path_(`M${x},${y + 8} a${w / 2},8 0 0 0 ${w},0`, { fill: C.fillBlue }) + D.path_(`M${x},${y + h - 8} a${w / 2},8 0 0 0 ${w},0`, { fill: C.fillBlue }) + D.text(x + w / 2, y + h / 2 + 12, t, { anchor: "middle", size: 13 });
  b += mi(150, 6, 220, 58, "Manual input: clerk keys in\nname, route, date, seat");
  b += D.node(150, 100, 220, 50, "Validate and check seat", { fill: C.fillBlue, size: 14 });
  b += D.node(150, 210, 220, 50, "Save booking", { fill: C.fillBlue, size: 14 });
  b += doc(150, 300, 220, 56, "Document: printed ticket");
  b += disp(430, 100, 140, 50, "Display: Seat\nalready booked").replace("", "");
  b += disk(10, 120, 90, 100, "Bookings\nfile");
  b += D.arrow(260, 64, 260, 100, { width: 2 });
  b += D.arrow(260, 150, 260, 210, { width: 2 }) + lab(270, 184, "seat free");
  b += D.arrow(260, 260, 260, 300, { width: 2 });
  b += D.arrow(370, 125, 430, 125, { width: 2 }) + lab(400, 170, "seat taken", { anchor: "middle" }).replace("", "");
  b += D.line(150, 125, 100, 150, { width: 2, arrow: true, arrowStart: true }) + lab(18, 112, "reads", { fill: C.muted });
  b += D.arrow(150, 235, 100, 195, { width: 2 }) + lab(40, 250, "writes", { fill: C.muted });
  b += lab(10, 378, "Symbols: slanted box = manual input; cylinder = disk file;", { fill: C.muted }) + lab(10, 396, "wavy box = document; pointed box = display.", { fill: C.muted });
  await fig("system-flowchart-bus-bookings", D.svg(580, 408, b),
    "System flowchart for bus bookings: the clerk's manual input goes to Validate and check seat, which reads the Bookings file; if the seat is taken the screen shows Seat already booked, if free the booking is saved to the file and a ticket is printed",
    "Figure: a system flowchart using the manual input, process, disk, display and document symbols", "sad/system-design", "| Flow line | An arrow | The direction in which data flows |");
}

// 6. payback period graph
{
  const cost = 12000, net = 7000 - 1000;
  const years = cost / net;
  if (years !== 2) throw new Error("payback");
  const ax = D.axes({ x: [0, 5], y: [0, 30], w: 560, h: 340, xTicks: [0, 1, 2, 3, 4, 5], yTicks: [0, 6, 12, 18, 24, 30], xLabel: "Years", yLabel: "USD thousands" });
  let b = ax.frame;
  b += ax.line([[0, 0], [5, (net * 5) / 1000]], { stroke: C.blue });
  b += ax.line([[0, cost / 1000], [5, cost / 1000]], { stroke: C.red, dash: true });
  b += ax.guides(years, cost / 1000);
  b += ax.point(years, cost / 1000, { fill: C.amber, stroke: C.amber, r: 6 });
  b += ax.tag(0.1, 14.6, "Development cost: 12", { size: 13, stroke: C.red });
  b += ax.tag(3.0, 4.2, "Savings: 6 a year", { size: 13, stroke: C.blue });
  b += ax.tag(2.15, 9, "Payback: 2 years", { size: 13, stroke: C.amber });
  await fig("payback-period-graph", D.svg(560, 340, b),
    "Payback period graph: cumulative net savings of USD 6,000 a year (7,000 saving less 1,000 running cost) rise to meet the USD 12,000 development cost after 2 years, and reach USD 30,000 by year 5",
    "Figure: cumulative net savings against the 12,000 development cost, meeting at 2 years", "sad/feasibility", "A simple measure is the **payback period**");
}

// ---------------------------------------------------------------- internet
// 7. URL parts
{
  let b = "";
  const parts = [["https://", 84, "Protocol", "rules for\nthe transfer", C.fillAmber], ["www.greenvalleyschool.ac.zw", 236, "Domain name", "the web server (.zw = Zimbabwe)", C.fillBlue], ["/notes/physics.html", 160, "Path and file name", "folder notes, file physics.html", C.fillGreen]];
  let x = 10;
  parts.forEach(([t, w, name, d, f]) => {
    b += D.rect(x, 40, w, 42, { fill: f, stroke: C.axis, width: 1.6 }) + D.text(x + w / 2, 67, t, { anchor: "middle", size: 14, weight: 700 });
    b += D.line(x + w / 2, 82, x + w / 2, 106, { width: 1.6, stroke: C.muted });
    b += D.text(x + w / 2, 124, name, { anchor: "middle", size: 14, weight: 700 }) + D.text(x + w / 2, 142, d, { anchor: "middle", size: 12 });
    x += w;
  });
  await fig("url-parts-protocol-domain-path", D.svg(530, 170, b),
    "The URL https://www.greenvalleyschool.ac.zw/notes/physics.html split into the protocol https, the domain name www.greenvalleyschool.ac.zw (where .zw is the country code for Zimbabwe) and the path and file name /notes/physics.html",
    "Figure: the protocol, domain name and path of a URL", "internet/web-browsing", "URLs are used because they are easy for people to remember");
}

// 8. DNS lookup and page request
{
  let b = "";
  b += D.node(10, 100, 120, 90, "Browser\n(user's device)", { fill: C.fillGreen });
  b += D.node(400, 14, 170, 60, "DNS server", { fill: C.fillAmber });
  b += D.node(400, 216, 170, 60, "Web server", { fill: C.fillBlue });
  b += D.arrow(130, 112, 400, 34, { width: 2.2 });
  b += D.arrow(400, 58, 130, 134, { width: 2.2, stroke: C.amber });
  b += D.arrow(130, 150, 400, 226, { width: 2.2 });
  b += D.arrow(400, 262, 130, 178, { width: 2.2, stroke: C.blue });
  b += D.tag(268, 58, "2 domain name", { anchor: "middle", size: 13 }) + D.tag(268, 124, "3-4 IP address", { anchor: "middle", size: 13, stroke: C.amber });
  b += D.tag(268, 172, "5 request to the IP address", { anchor: "middle", size: 13 }) + D.tag(268, 256, "6 HTML and images", { anchor: "middle", size: 13, stroke: C.blue });
  b += D.text(10, 84, "1 user types a URL", { size: 13, weight: 700 }) + D.text(10, 214, "7 browser renders\nthe HTML", { size: 13, weight: 700 });
  await fig("dns-lookup-page-request", D.svg(580, 292, b),
    "How a web page is retrieved: the browser sends the domain name to a DNS server, which returns the IP address; the browser then sends a request to the web server at that IP address, the server returns HTML and images, and the browser renders them",
    "Figure: the seven steps from typing a URL to seeing the page", "internet/web-browsing", "7. The browser **renders** the HTML");
}

// ---------------------------------------------------------------- sensors
{
  let b = "";
  b += D.node(220, 8, 190, 50, "Warning: alarm or message\n(a person decides)", { fill: C.fillGrey, size: 13 });
  b += D.node(10, 100, 100, 56, "Sensor\nmeasures", { fill: C.fillGreen, size: 14 });
  b += D.node(140, 100, 100, 56, "ADC\nanalogue to\ndigital", { size: 13 });
  b += D.node(270, 100, 130, 56, "Microprocessor\ncompares with\nstored limits", { fill: C.fillAmber, size: 13 });
  b += D.node(430, 100, 140, 56, "Actuator\n(vent, pump)", { fill: C.fillBlue, size: 14 });
  b += D.arrow(110, 128, 140, 128, { width: 2.2 }) + D.arrow(240, 128, 270, 128, { width: 2.2 }) + D.arrow(400, 128, 430, 128, { width: 2.2 });
  b += D.arrow(335, 100, 335, 58, { width: 2.2, stroke: C.red }) + D.text(345, 84, "monitoring only", { size: 13, fill: C.red });
  b += D.node(130, 196, 300, 46, "Conditions change (temperature, soil moisture ...)", { fill: C.fillGrey, size: 13 });
  b += D.polyline([[500, 156], [500, 219], [430, 219]], { width: 2.2, arrow: true });
  b += D.polyline([[130, 219], [60, 219], [60, 156]], { width: 2.2, arrow: true });
  b += D.text(290, 262, "Control: the sensor keeps reading, so the microprocessor sees the effect of the actuator (feedback).", { anchor: "middle", size: 13, fill: C.muted });
  await fig("sensor-control-feedback-loop", D.svg(580, 276, b),
    "Monitoring and control: a sensor's reading goes through an ADC to the microprocessor, which compares it with stored limits; in monitoring it only warns a person, in control it also signals an actuator whose effect on the conditions is read again by the sensor, forming a feedback loop",
    "Figure: sensor, ADC, microprocessor and actuator in a control loop, with the monitoring branch", "hardware/sensors", "### Monitoring or control?");
}
