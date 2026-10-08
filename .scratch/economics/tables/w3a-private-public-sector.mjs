// Figures for lessons/firms/private-public-sector.md (W3a).
import { table, check } from "../lib.mjs";
// WE: a fictional state-owned bus company (US$ million) and the subsidy per passenger journey.
const rev = 4.0, cost = 4.8, journeys = 16; // journeys in millions
const loss = cost - rev, perJourney = loss / journeys;
check("loss", loss, 0.8); check("per", perJourney, 0.05);
console.log(table(["Item", "US\\$ million"], [["Fare revenue", rev.toFixed(1)], ["Operating costs", cost.toFixed(1)], ["Loss covered by the government", loss.toFixed(1)]]));
console.log({ loss, perJourney, fareNeeded: cost / journeys, avgFare: rev / journeys });
