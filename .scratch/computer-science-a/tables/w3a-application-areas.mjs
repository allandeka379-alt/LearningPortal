import { chk, same, pyBlock, py, mdTable } from "../lib.mjs";
import { needs } from "./w3a-q.mjs";

// Irrigation controller: the pump runs for 20 minutes whenever the soil moisture reading is below 30.
export const irrigCode = `readings = [42, 35, 29, 26, 33, 31, 28]
pump_minutes = 0
for hour, moisture in enumerate(readings, start=8):
    if moisture < 30:
        action = "ON"
        pump_minutes = pump_minutes + 20
    else:
        action = "OFF"
    print(hour, moisture, action)
print("Pump minutes:", pump_minutes)`;
export const irrig = pyBlock(irrigCode);
same(irrig.text.split("\n"), ["8 42 OFF", "9 35 OFF", "10 29 ON", "11 26 ON", "12 33 OFF", "13 31 OFF", "14 28 ON", "Pump minutes: 60"]);
export const irrigMd = mdTable(["Hour", "Moisture reading", "Pump"], irrig.text.split("\n").slice(0, -1).map((l) => l.split(" ")));

// Drone spraying: 56 hectares, 3.5 hectares per flight, 20 minutes per flight including the battery change.
export const area = 56;
export const perFlight = 3.5;
export const flights = Math.ceil(area / perFlight);
chk(flights, 16);
export const minutes = flights * 20;
chk(minutes, 320);

// E-learning: a video lesson of 40 minutes at 0.7 Mbit/s; 1 byte = 8 bits, 1 MB = 1000000 bytes (decimal) is not used: use 1 MB = 1024 x 1024 bytes
export const rate = 0.7; // Mbit/s
export const lessonMin = 40;
export const megabits = rate * lessonMin * 60;
chk(megabits, 1680);
export const megabytes = megabits / 8;
chk(megabytes, 210);
export const bundle = 1024;
export const lessons = Math.floor(bundle / megabytes);
chk(lessons, 4);

if (process.argv[1]?.endsWith("w3a-application-areas.mjs")) {
  console.log(irrig.code, irrig.output, irrigMd);
  console.log({ flights, minutes, megabits, megabytes, lessons });
  needs("enterprise/application-areas", [irrig.code, irrig.output, irrigMd, "16 flights", "320 minutes", "1680", "210 MB"]);
  console.log("lesson values OK");
}
