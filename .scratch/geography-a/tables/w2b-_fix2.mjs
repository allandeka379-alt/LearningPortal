// One-off patch: even out MCQ option lengths in the W2b slices (run once from the repo root: node .scratch/geography-a/tables/w2b-_fix2.mjs).
import fs from "node:fs";
const S = (n) => `.scratch/geography-a/slices/w2b-${n}.mjs`;
const P = {
  "bio-soils": [
    ["The washing of fine particles and dissolved material out of a horizon", "The washing of fine particles and solutes out of a horizon"],
    ["The deposition of clay in the subsoil horizon", "The deposition of clay and iron in the subsoil horizon"],
    ["The breakdown of litter by bacteria and fungi", "The breakdown of dead litter by soil bacteria and fungi"],
    ["The mixing of topsoil by termites and earthworms", "The mixing of topsoil by termites, ants and earthworms"],
    ["Clay and iron have been washed out of the upper layer into the lower one", "Clay and iron have been washed from the upper layer to the lower"],
    ["The reddish layer is a surface layer of fresh litter", "The reddish layer is a thin surface layer of fresh leaf litter"],
  ],
  "bio-vegetation-biomes": [
    ["Biomass is a store of living material; NPP is the rate of new growth", "Biomass is a store of living material; NPP is a rate of growth"],
  ],
  "env-degradation": [
    ["The removal of topsoil by strong wind", "The removal of topsoil from open fields by strong wind"],
    ["The spread of desert conditions into farmland", "The spread of desert conditions into nearby farmland and grazing"],
    ["They have no effect on forests or water sources", "They have no effect on forests, rivers or water sources"],
    ["Trees absorb more water, so the soil becomes too dry", "Trees absorb more water, so the soil becomes much too dry"],
    ["Too much rainfall in the dam catchment", "Too much rainfall falling in the catchment of the dam"],
    ["Growth of the dam walls by natural processes", "Growth of the dam walls by natural weathering processes"],
    ["Planted grass always dies because gullies are too fertile", "Planted grass always dies because gully soils are far too fertile"],
    ["Fencing causes rain to run into the gully faster", "Fencing causes rain to run into the gully much faster than before"],
  ],
  "env-eia-projects": [
    ["To predict and evaluate the effects of a proposed development before it is approved", "To predict a development's effects before it is approved"],
    ["To measure the profit that a development will make", "To measure the profit that a development will make each year"],
    ["Checking that measures work during operation", "Checking that measures work while the project operates"],
    ["Writing the final environmental report", "Writing the final report for the authority"],
    ["It replaces the role of the environmental authority", "It replaces the role of the environmental management authority"],
    ["Plant 500 trees by March and have 400 alive after one year", "Plant 500 trees by March; 400 alive after a year"],
    ["Improve the school environment", "Improve the school environment for all pupils"],
    ["Make the school greener in the future", "Make the school much greener in the future"],
    ["Try to plant as many trees as possible", "Try to plant as many trees as possible this year"],
    ["Remove all dumped waste from the market area within four months and keep it clear", "Clear all dumped waste from the market within four months"],
    ["Clean up the village", "Clean up the whole village and make it look better"],
    ["Educate people about waste", "Educate people about waste and why it matters to them"],
    ["Make the village a better place", "Make the village a much better place to live in for everyone"],
  ],
  "env-pollution": [
    ["Fertiliser washing off many fields into a river", "Fertiliser washing off many farm fields into a nearby river"],
    ["It shows whether the water is acid or alkaline", "It shows whether the water is acid, neutral or alkaline in nature"],
    ["The town has reduced the pollution in the river", "The town has reduced the amount of pollution in the river"],
    ["Fines always increase the amount of effluent discharged", "Fines always increase the total amount of effluent discharged"],
    ["Water quality is worst upstream of the outfall", "Water quality is at its worst a long way upstream of the outfall"],
    ["The pH is highest at the outfall", "The pH is highest at the point of the sewage outfall"],
  ],
  "energy-sources-patterns": [
    ["Dams flood land, displace people and depend on reliable rainfall", "Dams flood land and depend on reliable rainfall"],
    ["It needs a continuous supply of uranium", "It needs a continuous supply of uranium from mines"],
    ["It produces radioactive waste that must be stored", "It produces radioactive waste that must be stored safely"],
    ["Wood is a more efficient fuel than gas or electricity", "Wood is a far more efficient fuel than gas or electricity"],
    ["Demand has grown so quickly that renewables have been added alongside fossil fuels", "Demand rose so fast that renewables only added to fossil fuels"],
    ["Renewables have been banned in most large countries", "Renewables have been banned in most of the large countries"],
    ["Fossil fuels are renewable on a human timescale", "Fossil fuels are renewable on a human timescale of decades"],
    ["No country has built a wind farm or solar plant", "No country has yet built a large wind farm or solar plant"],
  ],
  "energy-transition-security": [
    ["It has the world's largest coal reserves", "It has the largest reserves of coal in the whole world"],
    ["It lies on the equator with a hot climate", "It lies on the equator and has a hot, humid climate"],
    ["Coal plants already exist, coal provides jobs and the grid needs major upgrading", "Coal plants exist, coal gives jobs and the grid needs upgrading"],
    ["South Africa has no sunshine or wind to develop", "South Africa has no sunshine or wind that could be developed"],
    ["Coal is a renewable resource that cannot run out", "Coal is a renewable resource that will never run out in future"],
    ["South Africa has banned all renewable energy", "South Africa has banned all forms of renewable energy projects"],
    ["Wind and solar supply the largest share in 2023", "Wind and solar together supply the largest single share of power in 2023"],
    ["Fossil fuels have been completely replaced", "Fossil fuels have been completely replaced by renewable sources"],
  ],
  "energy-zimbabwe-clean-green": [
    ["High temperatures melt the wires leaving the station", "High temperatures melt the wires that leave the power station"],
    ["It burns the dung directly to heat water for the day", "It burns the dung directly to heat water for the whole day"],
    ["A sunny village far from the grid with many households and a clinic", "A sunny village far from the grid, with a clinic"],
    ["A shaded valley next to a large power station", "A shaded valley close to a large coal power station"],
    ["A protected forest reserve with no settlement", "A protected forest reserve with no settlement nearby"],
    ["A city centre with reliable mains supply", "A city centre with a reliable mains electricity supply"],
    ["It overlays resource and constraint layers to find the best sites", "It overlays resource and constraint layers to rank sites"],
  ],
  "mining-enterprises-impacts-safety": [
    ["Mine L uses machinery and processing that recover more gold per worker", "Mine L uses machinery and processing that raise recovery"],
    ["Mine S has richer ore than Mine L", "Mine S has richer ore than Mine L and works fewer hours"],
    ["Mine L employs fewer workers than Mine S", "Mine L employs fewer workers than Mine S, so each does more"],
    ["Mine S recovers a larger share of the gold", "Mine S recovers a larger share of the gold from its ore"],
    ["Fertiliser from a maize field", "Fertiliser washed in from a nearby maize field"],
    ["Rainwater only", "Rainwater falling on both sites equally"],
    ["Evaporation of the stream", "Evaporation of water from the stream in the dry season"],
  ],
  "mining-legislation-policy": [
    ["It grants prospecting licences to individuals", "It grants prospecting licences to individuals and companies"],
    ["To stop trade in conflict diamonds by certifying shipments", "To stop trade in conflict diamonds through certification"],
    ["To train miners in safe underground methods", "To train all miners in safe underground mining methods"],
    ["To grant pegging rights to foreign companies", "To grant pegging rights to foreign mining companies only"],
    ["To set the price of gold on world markets", "To set the price of gold on all world commodity markets"],
    ["To encourage processing in the country so that more value is kept", "To encourage processing in the country and keep more value"],
    ["To make it easier to smuggle minerals across the border", "To make it easier to smuggle raw minerals across the border"],
    ["Apply for the right to prospect and then peg and register the claim", "Apply for prospecting rights, then peg and register the claim"],
    ["Start digging, as the minerals belong to the landholder", "Start digging at once, as the minerals belong to the landholder"],
    ["If official prices or payment terms are poor, miners may sell illegally or stop mining", "If official prices or terms are poor, miners may sell illegally"],
    ["Tighter control always increases the amount of gold produced", "Tighter control always increases the total amount of gold produced"],
  ],
  "mining-prospecting-mineralogy": [
    ["Its mass compared with an equal volume of water", "Its mass compared with the mass of an equal volume of water"],
    ["Ignore the result because soil samples are unreliable", "Ignore the result because soil samples are always unreliable"],
  ],
  "exam-zimsec": [
    ["The protected area is more diverse because its species are more evenly spread", "The protected area is more diverse because species are more even"],
    ["The communal area is more diverse because Species 1 is common", "The communal area is more diverse because Species 1 is so common"],
  ],
};
for (const [name, pairs] of Object.entries(P)) {
  const f = S(name);
  let s = fs.readFileSync(f, "utf8");
  for (const [a, b] of pairs) {
    if (!s.includes(`"${a}"`)) { console.log("MISSING", name, "|", a); continue; }
    s = s.replace(`"${a}"`, `"${b}"`);
  }
  fs.writeFileSync(f, s);
}
