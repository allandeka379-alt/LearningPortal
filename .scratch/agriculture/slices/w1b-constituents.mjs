// Slice W1b: soil constituents, soil water and soil organisms.
import { concept, P, pct, round, check, table, agricultureLevels } from "../lib.mjs";

// Moisture content (dry basis).
const M = { fresh: 80, dry: 64 };
const mWater = M.fresh - M.dry;
const mc = pct(mWater, M.dry);
check(mc === 25, "mc");

// Air volume.
const A = { soil: 60, water: 60, final: 102 };
const air = A.soil + A.water - A.final;
const airPct = pct(air, A.soil);
check(air === 18 && airPct === 30, "air");

// Available water.
const FC = 28, PWP = 12;
const avail = FC - PWP;

// Structured: tins.
const T = { tin: 15.0, fresh: 75.0, oven: 63.0, burnt: 60.4 };
const tWet = T.fresh - T.tin;
const tDry = T.oven - T.tin;
const tWater = tWet - tDry;
const tMc = pct(tWater, tDry);
const tOm = T.oven - T.burnt;
const tOmPct = pct(tOm, tDry);
check(Math.abs(tMc - 25) < 1e-9, "tin mc");
check(Math.abs(tOm - 2.6) < 1e-9 && Math.abs(tOmPct - 5.41667) < 1e-4, "tin om");
const TIN_TABLE = table(["Weighing", "Mass (g)"], [
  ["Empty tin", T.tin.toFixed(1)],
  ["Tin + fresh soil", T.fresh.toFixed(1)],
  ["Tin + soil after drying at 105 °C to constant mass", T.oven.toFixed(1)],
  ["Tin + soil after strong heating (burning)", T.burnt.toFixed(1)],
]);

concept("agri.soil.constituents", { file: "soil/constituents", keyPrefix: "soil.constituents" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which form of soil water is held in the small pores by surface tension and is the main supply of water to crops?",
    options: [
      ["Capillary water", "Correct: it is held in small pores and roots can take it up."],
      ["Gravitational water", "It drains away within a day or two after rain."],
      ["Hygroscopic water", "It is held too tightly on particle surfaces for roots to absorb."],
      ["Water vapour", "Vapour is a very small part of soil water."],
    ],
    answer: "A",
    explanation: "Capillary water is held in small pores and as films around particles; it is the water plants use.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A soil was soaked by heavy rain two days ago, and water has stopped draining from it. What is the soil's water content now called?",
    options: [
      ["Field capacity", "Correct: the water held once gravitational water has drained."],
      ["Saturation", "Saturation is when every pore is full, just after the rain."],
      ["Permanent wilting point", "That is when the soil is so dry that plants cannot recover."],
      ["Hygroscopic coefficient", "That is the tightly held film only, far drier than this."],
    ],
    answer: "A",
    explanation: "Field capacity is reached after saturation, once the gravitational water has drained (usually one to three days).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which constituent of soil supplies the oxygen needed for root respiration?",
    options: [
      ["Soil air", "Correct: oxygen is in the air-filled pores."],
      ["Hygroscopic water", "Water does not supply oxygen for respiration in useful amounts."],
      ["Humus", "Humus holds water and nutrients but does not supply oxygen."],
      ["Mineral matter", "Mineral particles supply nutrients and support."],
    ],
    answer: "A",
    explanation: "Roots and organisms take oxygen from the soil air; waterlogging fills the pores and starves them of it.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which organism lives in the root nodules of legumes and fixes atmospheric nitrogen?",
    options: [
      ["*Rhizobium* bacteria", "Correct: they form nodules on legume roots."],
      ["Mycorrhizal fungi", "Mycorrhizae help roots absorb phosphorus, not fix nitrogen."],
      ["Root-knot nematode worms", "These are pests that form galls, not nodules."],
      ["Earthworms", "Earthworms mix and aerate soil; they do not fix nitrogen."],
    ],
    answer: "A",
    explanation: "*Rhizobium* bacteria in legume root nodules change nitrogen gas into compounds the plant can use.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a moisture experiment, why is the soil dried at about 105 °C rather than burned at a much higher temperature?",
    options: [
      ["So that water is driven off without burning away the organic matter", "Correct: a higher temperature would also remove organic matter and give too high a water loss."],
      ["So that the hygroscopic water stays in the soil", "Oven drying at 105 °C removes hygroscopic water too."],
      ["Because the soil organisms must survive so they can be used in the next test", "Survival of organisms is not the purpose."],
      ["Because clay particles melt above 105 °C", "Clay does not melt at these temperatures."],
    ],
    answer: "A",
    hints: ["What else would be lost if the soil were heated until it glowed?"],
    explanation: "About 105 °C removes all water, including hygroscopic water, but leaves the organic matter. Strong heating afterwards burns the organic matter, so the two losses can be measured separately.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Two flasks of lime water are connected to jars of soil. Jar 1 holds fresh garden soil; Jar 2 holds the same soil after heating it strongly. After a day the lime water beside Jar 1 is milky and the one beside Jar 2 is clear. What does this show?",
    options: [
      ["Fresh soil contains living organisms that give off carbon dioxide", "Correct: respiration by soil organisms produced the CO₂."],
      ["Fresh soil contains more water than heated soil", "Lime water tests for carbon dioxide, not water."],
      ["Heated soil contains more air than fresh soil", "Air content is not what lime water shows."],
      ["Fresh soil contains much more mineral matter than the heated soil does", "Heating does not change the mineral matter."],
    ],
    answer: "A",
    hints: ["Lime water turns milky with carbon dioxide."],
    explanation: "Living organisms in the fresh soil respire and release carbon dioxide, which turns lime water milky. Heating killed the organisms in Jar 2 (the control).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A clay soil holds 40% water at field capacity and 26% at the permanent wilting point. A loam holds 30% and 12%. Which statement is correct?",
    options: [
      ["The loam holds more water that crops can use", "Correct: available water is 30 − 12 = 18% for loam but only 40 − 26 = 14% for clay."],
      ["The clay holds more water that crops can use", "It holds more water in total, but less between field capacity and wilting point."],
      ["Both hold the same water that crops can use", "The available water differs: 14% and 18%."],
      ["Crops can use all 40% of the water in the clay", "Water below the wilting point is not available."],
    ],
    answer: "A",
    hints: ["Available water = field capacity − permanent wilting point."],
    explanation: "Available water = field capacity − wilting point: clay 40 − 26 = 14%; loam 30 − 12 = 18%. The loam supplies more usable water.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Hygroscopic water is held so tightly on soil particles that plant roots cannot take it up.",
    answer: true,
    explanation: "True. Hygroscopic water forms a very thin film held extremely tightly; it is removed only by oven drying.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Soil air usually contains more oxygen than the air above the ground.",
    answer: false,
    explanation: "False. Roots and organisms use oxygen and release carbon dioxide, so soil air has less oxygen and more carbon dioxide than the atmosphere.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each soil organism with one role it plays.",
    pairs: [
      ["Earthworm", "Burrows, aerates the soil and leaves casts that build crumbs"],
      ["*Rhizobium*", "Fixes nitrogen in legume root nodules"],
      ["Root-knot nematode", "Forms galls on roots of tomatoes and tobacco"],
      ["Mycorrhizal fungus", "Helps roots absorb phosphorus"],
    ],
    explanation: "Earthworms improve structure; *Rhizobium* fixes nitrogen; root-knot nematodes are pests; mycorrhizae help phosphorus uptake.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Water that drains down through large pores after heavy rain is called {{blank:a}} water. The water held between field capacity and the permanent wilting point is called {{blank:b}} water.",
    blanks: [
      { id: "a", accepted: ["gravitational", "free", "drainage"] },
      { id: "b", accepted: ["available"] },
    ],
    explanation: "Gravitational water drains away; available water lies between field capacity and wilting point.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `A fresh soil sample has a mass of ${M.fresh} g. After drying in an oven to constant mass it weighs ${M.dry} g. Calculate its moisture content as a percentage of the **dry** soil mass.`,
    value: mc, unit: "%", wrong: [pct(mWater, M.fresh), mWater],
    explanation: `Water lost = ${M.fresh} − ${M.dry} = ${mWater} g. Moisture content = ${mWater} ÷ ${M.dry} × 100 = ${mc}%. Dividing by the fresh mass gives ${pct(mWater, M.fresh)}%, which is the wet-basis figure, not the one asked for.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: `Rudo adds ${A.soil} cm³ of dry, loose soil to ${A.water} cm³ of water in a measuring cylinder and stirs. The final volume is ${A.final} cm³. Calculate the volume of air in the soil as a percentage of the soil volume.`,
    value: airPct, unit: "%", wrong: [air, round(pct(air, A.final), 1)],
    hints: ["Without air spaces the total would be soil + water.", "The shortfall is the air, which water replaced."],
    explanation: `Expected volume = ${A.soil} + ${A.water} = ${A.soil + A.water} cm³. Air = ${A.soil + A.water} − ${A.final} = ${air} cm³. Percentage = ${air} ÷ ${A.soil} × 100 = ${airPct}%.`,
    workedSolution: `1. Volume expected if the soil had no air spaces = ${A.soil} + ${A.water} = ${A.soil + A.water} cm³.\n2. Volume of air (filled by water) = ${A.soil + A.water} − ${A.final} = ${air} cm³.\n3. Air as a percentage of the soil volume = ${air} ÷ ${A.soil} × 100 = ${airPct}%.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `A soil holds ${FC}% water at field capacity and ${PWP}% at the permanent wilting point (both by mass). What percentage of available water does it hold?`,
    value: avail, unit: "%", wrong: [FC + PWP, FC],
    explanation: `Available water = field capacity − permanent wilting point = ${FC} − ${PWP} = ${avail}%.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the dark, well-decomposed organic matter in soil that binds crumbs and holds water and nutrients.",
    accepted: ["humus"],
    explanation: "**Humus** is the stable, dark end-product of decomposition.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which earthworms improve soil for crops.",
    hints: ["Think about their burrows and their casts."],
    points: [
      "Burrowing makes channels / mixes the soil.",
      "So air and water enter more easily / drainage and aeration improve.",
      "Casts (or pulling leaves underground) add organic matter / bind particles into crumbs.",
      "So structure and fertility improve as residues are broken down and nutrients released.",
    ],
    modelAnswer: "Earthworms dig burrows that let air and water into the soil, improving aeration and drainage. They drag leaves underground and pass soil through their bodies, producing casts that bind particles into crumbs and release nutrients.",
    explanation: "Identify the action, then explain its effect on the soil.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the difference between gravitational, capillary and hygroscopic water.",
    hints: ["For each, say where it is held and whether plants can use it."],
    points: [
      "Gravitational: in large pores after rain, drains down under gravity, available only briefly.",
      "Capillary: held in small pores by surface tension, available to plants.",
      "Hygroscopic: thin film held tightly on particles, not available to plants.",
    ],
    modelAnswer: "Gravitational water fills the large pores after rain and drains away under gravity, so crops can use it only briefly. Capillary water is held in small pores by surface tension and is the main water used by crops. Hygroscopic water is a thin film held so tightly on each particle that roots cannot take it up.",
    explanation: "Location, holding force and availability distinguish the three forms.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Farai carried out an experiment on a garden soil and recorded these masses.\n\n${TIN_TABLE}`,
    hints: ["Subtract the empty tin from each reading first.", "Moisture content is based on the dry soil mass."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the mass of water in the fresh soil, in g.",
        value: tWater, unit: "g", wrong: [T.fresh - T.burnt],
        explanation: `${T.fresh.toFixed(1)} − ${T.oven.toFixed(1)} = ${tWater.toFixed(1)} g.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the moisture content as a percentage of the dry soil mass.",
        value: tMc, unit: "%", tol: 0.05, wrong: [round(pct(tWater, tWet), 1), round(pct(tWater, T.oven), 1)],
        explanation: `Dry soil = ${T.oven.toFixed(1)} − ${T.tin.toFixed(1)} = ${tDry.toFixed(1)} g; ${tWater.toFixed(1)} ÷ ${tDry.toFixed(1)} × 100 = ${round(tMc, 1)}%. Forgetting to subtract the tin gives a wrong answer.`,
      }),
      P.num({
        label: "(c)", stem: "Calculate the percentage of organic matter in the dry soil, to one decimal place.",
        value: tOmPct, unit: "%", tol: 0.05, wrong: [round(tOm, 1)],
        explanation: `Organic matter = ${T.oven.toFixed(1)} − ${T.burnt.toFixed(1)} = ${tOm.toFixed(1)} g; ${tOm.toFixed(1)} ÷ ${tDry.toFixed(1)} × 100 = ${round(tOmPct, 1)}%.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why the soil is heated until its mass stops changing.",
        points: ["To make sure all the water has been driven off.", "So the loss in mass is the true water content (not an underestimate)."],
        explanation: "Constant mass shows that drying is complete.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "State **three** ways in which the organic matter in this soil benefits crops.",
        points: ["Releases nutrients (N, P, S) as it decomposes.", "Holds water / increases water-holding capacity.", "Binds particles into crumbs / feeds soil organisms / holds nutrients against leaching."],
        explanation: "Organic matter improves fertility, water holding and structure.",
      }),
    ],
    explanation: "Subtract the tin, find water and organic matter losses, and express each as a percentage of the dry soil.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "A school field was irrigated until water stood on the surface. Tendai then sampled the top 30 cm each day and found that its water content fell quickly for the first two days and then much more slowly. After three weeks without rain the maize wilted in the afternoon and did not recover overnight.",
    hints: ["Which water drains in the first two days?", "What is the soil's state when the maize stays wilted?"],
    parts: [
      P.short({
        label: "(a)", stem: "Name the form of soil water lost quickly in the first two days.",
        accepted: ["gravitational water", "gravitational", "free water", "drainage water"],
        keywords: { any: ["gravitational"] },
        explanation: "Gravitational water drains through the large pores soon after saturation.",
      }),
      P.short({
        label: "(b)", stem: "Name the state of the soil water when the maize wilted and did not recover overnight.",
        accepted: ["permanent wilting point", "wilting point", "PWP"],
        keywords: { any: ["wilting point"] },
        explanation: "The permanent wilting point.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain why the water content fell slowly after the second day, and suggest why the maize wilted even though the soil still contained some water.",
        points: [
          "After two days the soil was at field capacity; only capillary and hygroscopic water remained.",
          "This water is lost only slowly, by evaporation and uptake by the crop (transpiration).",
          "By three weeks the remaining water was held very tightly (hygroscopic / in the finest pores).",
          "Roots could not take it up, so the maize could not replace water lost by transpiration and wilted.",
        ],
        explanation: "Drainage stops at field capacity; at wilting point the remaining water is unavailable.",
      }),
    ],
    explanation: "Saturation → drainage of gravitational water → field capacity → slow use of capillary water → wilting point.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Discuss whether soil organisms are more useful than harmful to a farmer.",
    hints: ["Give useful roles and harmful roles with named organisms.", "Reach a judgement and say how a farmer can favour the useful ones."],
    points: [
      "Useful: decomposers (bacteria, fungi) break down residues and release nutrients.",
      "Useful: nitrogen fixation by *Rhizobium* in legumes; mycorrhizae help phosphorus uptake.",
      "Useful: earthworms and termites mix, aerate and drain the soil and build structure.",
      "Harmful: pests and pathogens, e.g. root-knot nematodes, cutworms, damping-off fungi, bacterial wilt; termites damaging crops.",
      "Harmful: denitrifying bacteria in waterlogged soil cause loss of nitrogen.",
      "Judgement: most organisms are useful; harmful ones can be controlled by rotation, drainage and hygiene.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Most soil organisms are useful. Bacteria and fungi decompose residues and release nutrients; *Rhizobium* fixes nitrogen in legume nodules and mycorrhizal fungi help roots take up phosphorus. Earthworms and many termites mix and aerate the soil and build crumb structure. Some organisms are harmful: root-knot nematodes and cutworms damage crops, fungi cause damping-off, bacteria cause wilts, and in waterlogged soil denitrifying bacteria release nitrogen as gas. Overall the useful roles far outweigh the harmful ones, and a farmer can reduce the harmful effects through crop rotation, good drainage and field hygiene while adding organic matter to support the useful organisms.",
    explanation: "Balance named useful and harmful roles and reach a supported judgement.",
  });

  b.card("FACT", "The five soil constituents", "Mineral matter, organic matter (humus), water, air and living organisms.");
  b.card("FACT", "Typical composition of a loam by volume", "About 45% mineral matter, 5% organic matter, 25% water, 25% air (varies with wetness).");
  b.card("DEFINITION", "Field capacity", "Water held by a soil after saturation once gravitational water has drained away.");
  b.card("DEFINITION", "Permanent wilting point", "Soil water content at which plants wilt and do not recover.");
  b.card("FORMULA", "Available water", "Available water = field capacity − permanent wilting point.");
  b.card("FORMULA", "Moisture content (dry basis)", "(Fresh mass − oven-dry mass) ÷ oven-dry mass × 100.");
  b.card("CONCEPT", "Three forms of soil water", "Gravitational (drains away), capillary (available to plants), hygroscopic (held too tightly, unavailable).");
  b.card("CONCEPT", "Showing organisms in soil", "Lime water turns milky beside fresh soil (respiration gives CO₂) but not beside heat-sterilised soil.");
  b.card("CONCEPT", "Useful and harmful soil organisms", "Useful: decomposers, Rhizobium, earthworms, mycorrhizae. Harmful: root-knot nematodes, cutworms, disease fungi and bacteria, denitrifiers.");
});
