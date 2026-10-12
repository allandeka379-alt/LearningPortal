import { t, table, breakingPoint, dpStr, chk } from "../lib.mjs";
import { writeLesson } from "./w1a-_write.mjs";

// Reilly: Town A larger, Town B smaller
const PA = 200000, PB = 50000, D = 60;
const bpA = breakingPoint(D, PA, PB);
chk(bpA, 40, 1e-9);
const PA2 = 360000, PB2 = 90000, D2 = 80;
const bp2 = breakingPoint(D2, PA2, PB2);
// Threshold example
const income = 12000, spendPerPerson = 20;
const threshold = income / spendPerPerson;
// CBD blocks: [name, ground floor area, total floor space, central business floor space]
const blocks = [
  ["Block 1", 2000, 5500, 4000],
  ["Block 2", 1800, 3000, 2400],
  ["Block 3", 2200, 2600, 900],
  ["Block 4", 1600, 6400, 3400],
  ["Block 5", 2500, 2500, 600],
];
const calc = blocks.map(([n, g, tf, cb]) => ({ n, g, tf, cb, hi: cb / g, ii: (cb / tf) * 100 }));
const isCBD = (b) => b.hi >= 1 && b.ii >= 50;
const rows = calc.map((b) => [b.n, b.g, b.tf, b.cb, dpStr(b.hi, 2), dpStr(b.ii, 1), isCBD(b) ? "Yes" : "No"]);
console.log({ bpA, bp2, threshold }, calc.map((b) => [b.hi, b.ii, isCBD(b)]));
// pedestrian counts
const ped = [["Site 1 (centre)", 1840], ["Site 2", 1320], ["Site 3", 760], ["Site 4", 410], ["Site 5", 180]];

const body = t`
## Introduction

Why do people from a rural area travel past one small town to shop in a larger one? Why is the middle of every town crowded with shops, banks and offices while its edges are quiet? These two questions are about the **sphere of influence** of a service centre and the **central business district (CBD)**. Both can be measured, and in ZIMSEC Form 6 you may be asked to calculate a breaking point or CBD indices, or to explain the results with Zimbabwean examples such as Gweru, Kwekwe or Masvingo.

You should already know the idea of a settlement hierarchy (hamlet, village, town, city) and that bigger centres offer more goods and services.

## Key definitions

:::definition{term="Sphere of influence"}
The area around a service centre from which people come to use its goods and services. It is also called a catchment area, hinterland or trade area.
:::

:::definition{term="Threshold and range"}
The **threshold** is the minimum population (or income) needed to keep a service in business. The **range** is the maximum distance people will travel to use a service.
:::

:::definition{term="Breaking point"}
The point between two competing towns where customers are equally likely to go to either. Reilly's law of retail gravitation uses town size and distance to estimate it.
:::

:::definition{term="Central business district (CBD)"}
The core of a town or city where shops, offices, banks and public services are concentrated, accessibility is highest and land values peak.
:::

## Sphere of influence

A town's sphere of influence grows with its size, the range of its services, the quality of roads and transport, and the lack of competing centres. Low-order goods (bread, airtime) have a small threshold and short range; high-order goods (a specialist hospital, a university) have a large threshold and long range, so they are found only in large towns that serve large areas.

Knowing the sphere of influence helps planners decide where to place a clinic, school, bank or bus service, and helps businesses to estimate their market.

## Reilly's breaking point

Reilly's law says that two towns pull customers in proportion to their populations and in inverse proportion to the square of the distance. The breaking point, measured from the larger town A, is

$$
d_A = \frac{d_{AB}}{1 + \sqrt{P_B / P_A}}
$$

where $d_{AB}$ is the distance between the towns and $P_A > P_B$ are their populations. The breaking point lies closer to the smaller town because the larger town attracts more strongly.

## Delimiting the CBD

A CBD can be bounded by fieldwork using several measures:

- **Central Business Height Index (CBHI)** $= \dfrac{\text{floor space in central business uses}}{\text{ground floor area}}$ (shows how many floors of CBD use per unit of ground).
- **Central Business Intensity Index (CBII)** $= \dfrac{\text{floor space in central business uses}}{\text{total floor space}} \times 100$ (shows how much of the building is CBD use).
- A common rule counts a block as part of the CBD if the CBHI is **at least 1** and the CBII is **at least 50%**.
- **Pedestrian and vehicle counts:** the highest counts mark the core (the peak land value intersection); counts fall away from it.
- **Traffic-light display:** colour each block (green meets both rules, amber meets one, red meets neither) to see the core, the frame and the outside at a glance.

Central business uses include shops, banks, offices, restaurants and cinemas; non-central uses include homes, warehouses, schools and car parks.

## Worked examples

:::worked-solution[Breaking point between two towns]
Town A has ${PA.toLocaleString("en-GB").replace(/,/g, " ")} people and Town B has ${PB.toLocaleString("en-GB").replace(/,/g, " ")}; they are ${D} km apart (illustrative data).

1. $P_B \div P_A = ${PB} \div ${PA} = 0.25$.
2. $\sqrt{0.25} = 0.5$.
3. $d_A = ${D} \div (1 + 0.5) = ${dpStr(bpA, 0)}$ km from Town A.
4. Distance from Town B $= ${D} - ${dpStr(bpA, 0)} = ${D - bpA}$ km. Customers living closer to A than 40 km tend to use A; those living nearer to B use B. The breaking point is closer to B because A is four times larger.
:::

:::worked-solution[CBD indices for five blocks]
Illustrative survey data (floor areas in m²). A block is in the CBD if CBHI is at least 1 and CBII is at least 50%.

${table(["Block", "Ground floor area", "Total floor space", "Central business floor space", "CBHI", "CBII (%)", "CBD?"], rows)}

1. Block 1: CBHI $= 4000 \div 2000 = ${dpStr(calc[0].hi, 2)}$; CBII $= 4000 \div 5500 \times 100 = ${dpStr(calc[0].ii, 1)}\%$. Both rules are met, so it is in the CBD.
2. Block 3 has CBHI $= ${dpStr(calc[2].hi, 2)}$, below 1, and CBII $= ${dpStr(calc[2].ii, 1)}\%$, below 50%, so it is outside the CBD.
3. Block 4 meets both rules, but only just on intensity: its CBII is $${dpStr(calc[3].ii, 1)}\%$, a little above 50%. Check both rules for every block and show both calculations.
:::

:::example{title="Reading pedestrian counts"}
Illustrative pedestrian counts in 15 minutes along a street leading out of the town centre:

${table(["Site", "Count"], ped)}

The count falls from ${ped[0][1]} at the centre to ${ped[4][1]} at Site 5, a decrease of ${dpStr(((ped[0][1] - ped[4][1]) / ped[0][1]) * 100, 0)}%. The highest count marks the core of the CBD, and the steep fall between Sites 2 and 4 suggests the edge (the CBD frame) lies near Site 3 or 4.
:::

:::example{title="Threshold of a shop"}
A hardware shop needs a monthly turnover of US\$${income} to survive. If the average person spends US\$${spendPerPerson} a month on hardware, the threshold population is $${income} \div ${spendPerPerson} = ${dpStr(threshold, 0)}$ people. A growth point whose sphere of influence has fewer than ${dpStr(threshold, 0)} people cannot support the shop.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Spheres of influence, Reilly's breaking point and CBD delimitation are ZIMSEC Form 6 content. Cambridge covers urban land use zones and CBD change under urban structure rather than these calculations.
:::

## Common mistakes

:::mistake{title="Measuring the breaking point from the wrong town"}
The formula gives the distance from the larger town. The distance from the smaller town is the total distance minus this value.
:::

:::mistake{title="Using the same units in the wrong indices"}
CBHI is a ratio (no units) and CBII is a percentage. Use the same area unit (m²) for all floor areas before dividing.
:::

:::mistake{title="Confusing threshold and range"}
Threshold is about numbers of customers (demand); range is about distance travelled. Both determine whether a service can survive.
:::

## Exam tips

:::exam-tip
Show Reilly's formula, the substitution and the answer with units, then state which town the distance is measured from. For CBD indices complete a table for each block and state the rule you apply before concluding. *Explain* why the sphere of influence of a town may be smaller than expected by using competition, poor roads or limited range of services.
:::

## Summary

:::summary
- A sphere of influence is the area served by a centre; threshold and range limit it.
- Reilly: $d_A = d_{AB} \div (1 + \sqrt{P_B/P_A})$ from the larger town A; the breaking point lies nearer the smaller town.
- CBHI = central business floor space ÷ ground floor area; CBII = central business floor space ÷ total floor space × 100.
- A block is CBD if CBHI ≥ 1 and CBII ≥ 50% (a common rule); counts of pedestrians and vehicles locate the core.
- Results help planners to site services and businesses.
:::
`;

writeLesson("settle", "sphere-cbd", { title: "Spheres of influence and delimiting the CBD", summary: "Explain the sphere of influence of a service centre with threshold and range, calculate Reilly's breaking point, and delimit the central business district with height and intensity indices and pedestrian and vehicle counts.", minutes: 35 }, body);
