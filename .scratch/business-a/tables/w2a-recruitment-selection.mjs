import { table, chk, r2, money } from "../lib.mjs";
// Example: cost of filling a post - advertise vs agency
const salary = 9600;
const agency = r2(salary * 0.15);
const advert = 180, interviewTime = 4 * 45; // 4 interviews at 45 per candidate time cost
const totalDirect = r2(advert + interviewTime);
console.log(agency, totalDirect);
console.log(table(["Route", "Cost items", "Cost (US$)"], [["Advertise and interview in-house", "Advertisement 180 + 4 interviews at 45 of manager time", totalDirect], ["Use an agency", "Fee of 15% of first-year salary of 9,600", agency], ["Difference", "Agency less in-house", r2(agency - totalDirect)]]));
