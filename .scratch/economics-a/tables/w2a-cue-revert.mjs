// One-off: restores the original wording of options whose lengthening over-corrected the key-length balance.
import { readFileSync, writeFileSync } from "node:fs";

const S = ".scratch/economics-a/slices/w2a-";
const rev = {
  "short-run-production": [
    ["the time period is less than twelve months in total", "the time is less than one year"],
    ["the firm should stop hiring workers immediately", "the firm should stop hiring workers"],
  ],
  "short-run-costs": [
    ["total cost divided by the quantity produced", "total cost divided by output"],
    ["at the highest point of the average cost curves", "at the highest point of average cost"],
    ["It rises by US\\\\$20, the rise in fixed cost", "It rises by US\\\\$20"],
  ],
  "long-run-costs-scale": [
    ["one factor is increased while all the other factors are held fixed", "one factor is increased and the others are fixed"],
    ["a fall in cost because of a new technology being introduced", "a fall in cost because of new technology"],
    ["The firm's ability to borrow at a lower interest rate than small firms", "The firm's ability to borrow at a lower interest rate"],
  ],
  "revenue-curves": [
    ["demand is price elastic at that output level", "demand is price elastic"],
  ],
  "profit-types": [
    ["price is below average fixed cost at that output", "price is below average fixed cost"],
    ["subnormal profit overall", "subnormal profit"],
  ],
  "objectives": [
    ["average cost is equal to average revenue", "average cost equals average revenue"],
    ["all firms must maximise profit by law in every country", "all firms must maximise profit by law"],
    ["managers always know less about the running of the firm than shareholders do", "managers always know less about the firm than shareholders do"],
  ],
  "perfect-competition": [
    ["it has no costs of production to cover each week", "it has no costs of production"],
    ["exit of existing firms and a rise in the market price", "exit of existing firms and a rise in the price"],
  ],
  "monopoly": [
    ["a firm that makes only normal profit and faces many competitors", "a firm that makes only normal profit"],
    ["high product differentiation among rivals", "high product differentiation"],
  ],
  "monopolistic-competition": [
    ["always earns only normal profit", "always earns normal profit"],
    ["earns supernormal profit, because its product is differentiated", "earns supernormal profit, because its product is unique"],
    ["fall in average total cost and a leftward shift of the demand curve", "fall in average total cost and a leftward shift of demand"],
    ["rise in marginal cost to the level of price in the short run, with no shift of demand", "rise in marginal cost to the level of price"],
    ["Existing restaurants leave the market and demand for this restaurant shifts right", "Existing restaurants leave and demand shifts right"],
  ],
  "collusion-game-theory": [
    ["an unspoken understanding among firms to follow a price leader", "an unspoken understanding to follow a price leader"],
    ["The firms have very different costs and objectives", "The firms have very different costs"],
    ["cartels always make losses because of their high costs", "cartels always make losses"],
    ["a government supports the cartel with strict import controls and subsidies", "a government supports the cartel with import controls"],
  ],
  "price-discrimination": [
    ["Costs are different in each of the markets served", "Costs are different in each market"],
    ["price discrimination, because prices differ between peak and off-peak times", "price discrimination, because prices differ over time"],
    ["transfers all of the consumer surplus to the firm in every market it serves", "transfers all consumer surplus to the firm in every market"],
  ],
};
let bad = 0;
for (const [name, list] of Object.entries(rev)) {
  const f = `${S}${name}.mjs`;
  let s = readFileSync(f, "utf8");
  for (const [from, to] of list) {
    const q = `"${from}"`;
    const n = s.split(q).length - 1;
    if (n !== 1) { console.log(`!! ${name}: ${n} matches for ${from}`); bad++; continue; }
    s = s.replace(q, () => `"${to}"`);
  }
  writeFileSync(f, s);
}
// structures-features: only the MCQ (first occurrence) goes back
{
  const f = `${S}structures-features.mjs`;
  let s = readFileSync(f, "utf8");
  s = s.replace('["perfect competition with free entry", "Salons', '["perfect competition", "Salons');
  writeFileSync(f, s);
}
console.log(bad ? `${bad} need attention` : "reverted");
