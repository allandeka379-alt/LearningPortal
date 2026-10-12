// One-off: lengthens distractors / shortens keys in the w2a slice sources so that no MCQ key is a clear length cue.
// Each edit replaces a quoted option text that must occur exactly once in the named slice file.
import { readFileSync, writeFileSync } from "node:fs";

const S = ".scratch/economics-a/slices/w2a-";
const edits = {
  "short-run-production": [
    ["total product will fall from the first unit added", "total product will fall from the first unit of the variable factor added"],
    ["the price of the variable factor will fall", "the price of the variable factor will fall as more of it is used"],
    ["average cost will fall at each level of output", "average cost will fall at each level of output as more is produced"],
    ["the firm should stop hiring workers", "the firm should stop hiring workers immediately"],
    ["the time is less than one year", "the time period is less than twelve months in total"],
  ],
  "short-run-costs": [
    ["total cost divided by output", "total cost divided by the quantity produced"],
    ["at the highest point of average cost", "at the highest point of the average cost curves"],
    ["falling average fixed cost", "falling average fixed cost as output rises"],
    ["rising fixed costs", "rising fixed costs as output increases"],
    ["economies of scale in the long run", "economies of scale as the firm expands in the long run"],
    ["exactly US\\\\$25", "exactly US\\\\$25, the midpoint of 20 and 30"],
    ["exactly US\\\\$30", "exactly US\\\\$30, the marginal cost of the unit"],
    ["It rises by US\\\\$20", "It rises by US\\\\$20, the rise in fixed cost"],
  ],
  "long-run-costs-scale": [
    ["one factor is increased and the others are fixed", "one factor is increased while all the other factors are held fixed"],
    ["a fall in cost because of new technology", "a fall in cost because of a new technology being introduced"],
    ["The firm's ability to borrow at a lower interest rate", "The firm's ability to borrow at a lower interest rate than small firms"],
  ],
  "revenue-curves": [
    ["Average revenue is always zero at the margin", "Average revenue is always zero at the margin because marginal revenue is lower"],
    ["Total revenue falls as output rises", "Total revenue always falls as output rises along the demand curve"],
    ["total revenue is as large as possible", "total revenue is as large as possible, whatever the cost"],
    ["average cost equals average revenue", "average cost equals average revenue, so that only normal profit is earned"],
    ["demand is price elastic", "demand is price elastic at that output level"],
    ["Its marginal revenue is negative", "Its marginal revenue is negative at that output"],
    ["Average cost is rising", "Average cost is rising faster than marginal cost"],
  ],
  "profit-types": [
    ["the minimum profit needed to keep the entrepreneur in the industry", "the minimum profit needed to keep the owner in the industry"],
    ["the highest profit a firm can possibly earn", "the highest profit a firm can possibly earn in the long run"],
    ["profit earned only by monopolists", "profit earned only by monopolists with high barriers to entry"],
    ["price is below average fixed cost", "price is below average fixed cost at that output"],
    ["shut down, because it makes a loss", "shut down, because it makes a loss at the current price"],
    ["shut down, because price is below ATC", "shut down, because price is below ATC at that output"],
    ["subnormal profit", "subnormal profit overall"],
  ],
  "objectives": [
    ["average cost equals average revenue", "average cost is equal to average revenue"],
    ["all firms must maximise profit by law", "all firms must maximise profit by law in every country"],
    ["managers always know less about the firm than shareholders do", "managers always know less about the running of the firm than shareholders do"],
    ["The firm has only one product", "The firm has only one product and one production line"],
    ["Competition forces the firm to cut costs", "Competition forces the firm to cut its costs and its prices to survive"],
  ],
  "structures-features": [
    ["perfect competition", "perfect competition with free entry"],
  ],
  "perfect-competition": [
    ["it has no costs of production", "it has no costs of production to cover each week"],
    ["exit of existing firms and a rise in the price", "exit of existing firms and a rise in the market price"],
    ["price is above marginal cost", "price is above marginal cost and output is below the competitive level"],
    ["it earns supernormal profit", "it earns supernormal profit that attracts entrants"],
    ["shut down at once", "shut down at once and leave the industry for good"],
    ["raise its price", "raise its price until it covers average total cost"],
  ],
  "monopoly": [
    ["a firm that makes only normal profit", "a firm that makes only normal profit and faces many competitors"],
    ["high product differentiation", "high product differentiation among rivals"],
    ["equal to marginal cost", "equal to marginal cost at the profit-maximising output"],
    ["equal to marginal revenue", "equal to marginal revenue at the output chosen"],
    ["lower costs from economies of scale", "lower costs from economies of scale as the firm grows"],
    ["profit that is above normal profit", "profit that is above normal profit in the long run"],
    ["a price equal to marginal cost", "a price equal to marginal cost at the output sold"],
    ["costs that are higher than necessary because of weak competition", "costs above the minimum because of weak competition"],
    ["It faces no threat of entry", "It faces no threat of entry from new firms at all"],
  ],
  "monopolistic-competition": [
    ["firms differ only in size", "firms differ only in the size of their output and workforce"],
    ["buyers see each firm's product as different from its rivals' products", "buyers see each firm's product as different from rivals' products"],
    ["A salon cuts its price by half", "A salon cuts its price by half to attract more customers"],
    ["A salon closes for the day", "A salon closes for the day because of low sales"],
    ["always earns normal profit", "always earns only normal profit"],
    ["earns supernormal profit, because its product is unique", "earns supernormal profit, because its product is differentiated"],
    ["shift to the right", "shift to the right and become much less price elastic"],
    ["stay unchanged", "stay unchanged because entry has no effect"],
    ["firms produce more than they can sell", "firms produce more than they can sell at the going price"],
    ["firms earn supernormal profit in the long run", "firms earn supernormal profit in the long run because of unused capacity"],
    ["fall in average total cost and a leftward shift of demand", "fall in average total cost and a leftward shift of the demand curve"],
    ["rise in marginal cost to the level of price", "rise in marginal cost to the level of price in the short run, with no shift of demand"],
    ["Existing restaurants leave and demand shifts right", "Existing restaurants leave the market and demand for this restaurant shifts right"],
  ],
  "oligopoly": [
    ["demand has become perfectly elastic", "demand has become perfectly elastic at the current price"],
    ["rivals have all left the industry", "rivals have all left the industry and firms no longer react to each other"],
    ["average fixed cost has fallen", "average fixed cost has fallen because output has risen"],
    ["the firms are colluding", "the firms are colluding to fix prices with one another"],
    ["each firm has a 90% share", "each firm has a 90% share of the whole market"],
    ["entry to the market is impossible", "entry to the market is impossible for any new firm in the whole industry"],
  ],
  "collusion-game-theory": [
    ["an unspoken understanding to follow a price leader", "an unspoken understanding among firms to follow a price leader"],
    ["coordinate their behaviour without a formal agreement", "coordinate behaviour without any formal agreement"],
    ["sign a written agreement on prices", "sign a written agreement on prices and output"],
    ["merge to form a larger firm", "merge to form a single larger firm in the industry"],
    ["compete fiercely on price", "compete fiercely on price whatever their rivals do"],
    ["The firms have very different costs", "The firms have very different costs and objectives"],
    ["cartels always make losses", "cartels always make losses because of their high costs"],
    ["a government supports the cartel with import controls", "a government supports the cartel with strict import controls and subsidies"],
  ],
  "price-discrimination": [
    ["charging a price below the cost of production", "charging a price below the cost of production to drive out rivals"],
    ["charging different prices because costs differ", "charging different prices to different customers because costs differ"],
    ["each consumer is charged the maximum he or she is willing to pay", "each consumer pays the maximum he or she is willing to pay"],
    ["different groups are charged different prices", "different groups are charged different prices in separate markets"],
    ["the price depends on the quantity bought", "the price depends on the quantity bought by each customer"],
    ["Costs are different in each market", "Costs are different in each of the markets served"],
    ["price discrimination, because prices differ over time", "price discrimination, because prices differ between peak and off-peak times"],
    ["transfers all consumer surplus to the firm in every market", "transfers all of the consumer surplus to the firm in every market it serves"],
  ],
};

let bad = 0;
for (const [name, list] of Object.entries(edits)) {
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
console.log(bad ? `${bad} edits need attention` : "all edits applied");
