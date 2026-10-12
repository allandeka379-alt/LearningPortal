import fs from "node:fs";
const dir = ".scratch/economics-a/slices/";
const edits = {
  "w1b-price-controls.mjs": [
    ["a surplus that the government must buy", "a surplus that the government must buy and store at its own cost"],
    ["an end to the shortage", "an end to the shortage because prices adjust to clear the market"],
    ["increase the number of people seeking work and reduce the number employers want to hire", "raise the number seeking work and cut the number employers want to hire"],
    ["reduce the number of people seeking work", "reduce the number of people seeking work and raise the number employers want to hire"],
  ],
  "w1b-taxes-subsidies.mjs": [
    ["producers earn less profit", "producers earn less profit because the subsidy lowers the price they receive"],
    ["the quantity traded falls", "the quantity traded falls because the subsidy raises the price consumers pay"],
    ["consumers pay a higher price", "consumers pay a higher price for the good because of the subsidy"],
    ["It falls heavily on poorer households and reduces consumption little", "It hits poorer households hard but cuts consumption little"],
    ["It reduces consumption by a very large amount", "It reduces consumption by a very large amount among all households"],
    ["It raises no revenue", "It raises no revenue because demand is inelastic"],
    ["Producers bear the whole tax", "Producers bear the whole of the tax because supply is elastic"],
  ],
  "w1b-equilibrium.mjs": [
    ["Price rises, quantity supplied extends and quantity demanded contracts", "Price rises, so supply extends and demand contracts"],
    ["Price falls until the shortage ends", "Price falls until the shortage ends and buyers return"],
    ["Demand falls back to its original position", "Demand falls back to its original position over time"],
    ["Prices may be controlled or set by firms with market power", "Prices may be controlled or set by large firms"],
    ["Demand curves slope downward", "Demand curves slope downward for most normal goods"],
    ["Quantity supplied rises with price", "Quantity supplied rises as the price rises in the short run"],
  ],
  "w1b-ped-revenue.mjs": [
    ["The extra output costs more to produce than the extra revenue it brings", "The extra output costs more than the extra revenue"],
    ["Revenue cannot rise when price falls", "Revenue cannot rise when price falls, whatever the elasticity"],
    ["Total revenue equals profit", "Total revenue always equals profit for a firm"],
  ],
  "w1b-ped.mjs": [
    ["Consumers have time to adjust their behaviour and find alternatives", "Consumers have time to adjust and find alternatives"],
    ["Petrol becomes a luxury over time", "Petrol becomes a luxury good as time passes"],
  ],
  "w1b-pes.mjs": [
    ["Tomatoes are a necessity", "Tomatoes are a necessity for most households"],
    ["Farmers are unwilling to earn more", "Farmers are unwilling to earn more money from sales"],
    ["all factors of production can be changed and new firms can enter", "all factors can be changed and new firms can enter"],
    ["producers become less willing to supply", "producers become less willing to supply over time"],
    ["demand becomes more elastic over time", "demand becomes more elastic as time passes"],
  ],
  "w1b-price-mechanism.mjs": [
    ["A higher price reduces the quantity demanded until it equals the supply", "A higher price cuts quantity demanded to match supply"],
    ["Firms are ordered to produce more", "Firms are ordered to produce more of the scarce good"],
  ],
  "w1b-surplus.mjs": [
    ["trades that benefited both buyers and sellers no longer take place", "mutually beneficial trades no longer take place"],
    ["consumers pay a higher price", "consumers pay a higher price than before the control"],
    ["producers earn a higher price", "producers earn a higher price than at equilibrium"],
    ["inelastic, because consumers still buy most units at the higher price", "inelastic, because they still buy most units at the higher price"],
    ["unitary elastic, because revenue is unchanged", "unitary elastic, because total revenue is unchanged by price"],
    ["It can only be measured for luxuries", "It can only be measured for luxuries and not for essentials"],
    ["It is the same as profit", "It is the same as profit earned by a firm"],
    ["It cannot be shown on a diagram", "It cannot be shown on a diagram of demand and supply"],
  ],
  "w1b-diagrams-and-data.mjs": [
    ["give a definition only", "give a definition of the term in the question only"],
    ["give a judgement without figures", "give a judgement about the data without any figures"],
  ],
  "w1b-indifference-curves.mjs": [
    ["the consumer's real income, or purchasing power, has increased", "the consumer's real income has increased"],
    ["the consumer prefers X to Y", "the consumer prefers X to Y after the price change"],
    ["X has become cheaper relative to Y", "X has become cheaper relative to Y, so she switches"],
  ],
  "w1b-marginal-utility.mjs": [
    ["the extra satisfaction from each additional unit eventually falls", "the satisfaction from each extra unit eventually falls"],
    ["total utility always falls", "total utility always falls as more units are consumed"],
    ["the price of the good falls", "the price of the good falls as more is consumed"],
  ],
};
for (const [file, pairs] of Object.entries(edits)) {
  let s = fs.readFileSync(dir + file, "utf8");
  for (const [a, b] of pairs) {
    const q = '"' + a + '"';
    if (!s.includes(q)) { console.log("NOT FOUND", file, a); continue; }
    s = s.split(q).join('"' + b + '"');
  }
  fs.writeFileSync(dir + file, s);
}
console.log("done");
