// Scratch patcher (rewritten per use): node w1b-patch.mjs
import fs from "node:fs";
const p = ".scratch/computer-science-a/tables/w1b-io-devices.tpl.md";
let s = fs.readFileSync(p, "utf8");
const r = (a, b) => {
  if (!s.includes(a)) throw new Error("missing " + a.slice(0, 70));
  s = s.split(a).join(b);
};
r(" Sensors and actuators are in the lesson on embedded systems, and storage devices have their own lesson.", "");
r("Because the whole page is prepared in memory first, a laser printer needs enough memory to hold the page image. It prints quickly and cheaply per page, which is why schools and offices use it for large jobs.", "A laser printer prints quickly and cheaply per page, which is why schools and offices use it for large jobs.");
r(" Drawbacks are slow printing of large objects, limited materials and a surface that often needs finishing.", "");
r("Uses include training (for example practising a procedure safely), virtual visits to places that are hard to reach, and design walk-throughs. Drawbacks include a powerful processor and graphics hardware, cost, and some users feeling unwell if the image lags behind the head movement.", "Uses include safe training and design walk-throughs. Drawbacks include the powerful hardware needed, cost, and some users feeling unwell if the image lags behind the head movement.");
r(":::mistake{title=\"Calling a 3D printer a subtractive machine\"}\nIt adds material layer by layer. A machine that cuts material away is a different kind of machine.\n:::\n\n", "");
r("Typical uses are prototypes of products, models for design lessons, spare parts that are no longer sold, and custom parts such as prosthetic components.", "Typical uses are prototypes, spare parts that are no longer sold, and custom parts.");
r("For \"**state**\" questions, one precise term is enough: \"capacitive\", \"stereoscopic images\", \"gyroscope\". Calculations such as pages per minute or data rates are done without a calculator, so keep the numbers simple and show the steps.", "For \"**state**\" questions, one precise term is enough: \"capacitive\", \"gyroscope\". Show the steps in any calculation.");
r("In the common **filament** type, a plastic thread is pushed into a heated nozzle, melted and laid down along the path of each layer; the plastic cools and hardens, and the next layer is placed on top. Other types harden liquid resin with light or fuse a powder with a laser.", "In the common **filament** type, a plastic thread is melted in a heated nozzle and laid down along the path of each layer, then cools and hardens before the next layer is added. Other types harden liquid resin with light or fuse a powder with a laser.");
fs.writeFileSync(p, s);
