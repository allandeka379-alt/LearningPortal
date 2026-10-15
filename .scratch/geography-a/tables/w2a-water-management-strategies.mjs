console.log("irrigation saving m3", (10000 - 5500) * 200, "pct", ((10000 - 5500) / 10000) * 100);
console.log("roof m3", 120 * 0.6 * 0.8, "per person days", 57.6 / 0.02 / 1);
console.log("tank", 57.6 * 1000 / (5 * 20)); // litres per day for 5 people at 20 L
console.log("people sustained at 20 L/d", 57.6 * 1000 / 365 / 20);
