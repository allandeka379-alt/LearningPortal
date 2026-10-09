// Lesson numbers for livestock/reproduction (gestation and heat dates).
const addDays = (iso, n) => { const d = new Date(`${iso}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const fmt = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
console.log("cow served 12 Jan 2026 + 283 =", fmt(addDays("2026-01-12", 283)));
console.log("heat 3 Mar 2026 next heats", fmt(addDays("2026-03-03", 21)), fmt(addDays("2026-03-03", 42)));
console.log("calving interval 283 + 85 =", 283 + 85, "; 365 - 283 =", 365 - 283);
