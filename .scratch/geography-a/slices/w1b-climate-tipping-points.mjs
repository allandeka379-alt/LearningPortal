// W1b: climate.tipping-points (Cambridge only; items tagged to Cambridge automatically). Question data are illustrative.
// Computed: 200 x 0.2 = 40; 240 x 0.9 - 240 x 0.25 = 156; ratio 153/18 = 8.5; (270 - 60)/60 = 350%; struct 300 x 0.15 = 45, 300 x 0.94 = 282;
// overturning (illustrative): 17 -> 11 Sv, fall 6, 35.3%.
import { concept, P, geographyLevels, chk, rnd } from "../lib.mjs";
import { mc, tbl } from "../tables/w1b-_q.mjs";

const absIce = chk(200 * (1 - 0.8), 40);
const extra = chk(240 * (1 - 0.1) - 240 * (1 - 0.75), 156);
const ratio = chk((180 * (1 - 0.15)) / (180 * (1 - 0.9)), 8.5);
const pct = chk(((270 - 60) / 60) * 100, 350);
const sIce = chk(rnd(300 * (1 - 0.85), 0), 45);
const sSea = chk(rnd(300 * (1 - 0.06), 0), 282);
const fall = chk(17 - 11, 6);
const fallPct = rnd((6 / 17) * 100, 1, 35.3, "fallPct");

concept("ageo.climate.tipping-points", { file: "climate/tipping-points", keyPrefix: "climate.tipping-points" }, (b) => {
  mc(b, 1, "RECALL", "What is a **positive feedback** in the climate system?", [
    ["A process that amplifies an initial change", "Correct: the change leads to effects that make the change larger."],
    ["A process that reverses an initial change", "That is a negative feedback."],
    ["A change that is good for human societies", "In feedback, positive refers to amplification, not to benefit."],
    ["A change that has no effect on temperature", "A feedback by definition affects the original change."],
  ], "A **positive feedback** amplifies the change that started it.");
  mc(b, 1, "UNDERSTANDING", "Which process is an example of a **positive** feedback?", [
    ["Melting ice lowers albedo, so more heat is absorbed", "Correct: the melting leads to more absorption and more melting."],
    ["A warmer Earth radiates more energy to space", "This reduces warming, so it is a negative feedback."],
    ["The oceans absorb part of the extra carbon dioxide", "This reduces the rise in CO2, a negative feedback."],
    ["Low clouds reflect more sunlight and cool the surface", "This cools the surface and so reduces warming."],
  ], "Melting reduces albedo and increases absorption: **positive feedback**.");
  mc(b, 2, "UNDERSTANDING", "Which feature is part of the definition of a climate tipping point?", [
    ["A threshold beyond which change is self-sustaining", "Correct: past the threshold, feedbacks keep the change going."],
    ["A change that is always sudden and over within a year", "Some tipping points take centuries."],
    ["A change that reverses when emissions fall", "Tipping points are hard to reverse on human timescales."],
    ["A change that is proportional to the cause", "Tipping points are non-linear."],
  ], "A tipping point has a **threshold**, **self-sustaining** change and is **hard to reverse**.");
  mc(b, 2, "UNDERSTANDING", "Why could meltwater from ice sheets slow the North Atlantic overturning circulation?", [
    ["Fresh water makes surface water less dense", "Correct: reduced sinking weakens the circulation."],
    ["Fresh water makes the surface water saltier and heavier", "Fresh water makes the water less salty, not saltier."],
    ["Fresh water blocks the wind from reaching the sea surface", "Winds are not blocked by meltwater."],
    ["Fresh water raises the temperature of the deep ocean", "The key effect is on density, not on deep temperature."],
  ], "Meltwater **freshens** the surface, lowering its density; this reduces sinking and slows the circulation.");
  mc(b, 2, "RECALL", "Why is the West Antarctic ice sheet considered vulnerable to rapid loss?", [
    ["Much of it rests on land below sea level", "Correct: warm ocean water can reach and undercut the ice."],
    ["It lies north of the Arctic Circle", "Antarctica is in the far south."],
    ["It is much smaller than the Greenland ice sheet", "Its size is not the reason for its vulnerability."],
    ["It is made of salt water ice", "Ice sheets are made of snow that has compacted into fresh-water ice."],
  ], "The ice rests on bedrock **below sea level**, so warm ocean water can undercut it.");
  mc(b, 3, "ANALYSIS", "A student writes: 'Thawing permafrost releases greenhouse gases, which warm the air, which thaws more permafrost.' What does this show?", [
    ["A positive feedback loop", "Correct: the output of the loop makes the starting condition stronger."],
    ["A negative feedback loop", "A negative feedback would reduce the thaw."],
    ["A tipping point that has been passed", "A loop alone does not show that a threshold has been crossed."],
    ["A natural cause of the ice ages", "The loop is part of today's warming, not the cause of the ice ages."],
  ], "The output (warming) strengthens the input (thaw): a **positive feedback** loop.", { hints: ["Does the end of the loop make the starting change bigger or smaller?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Because of tipping points, the change in climate is always proportional to the change in greenhouse gases.", answer: false, daily: true,
    feedbackFalse: "Correct: tipping points make the response non-linear.",
    feedbackTrue: "Not so: past a threshold a small extra change can produce a very large response.",
    explanation: "Tipping points mean **non-linear** change." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A feedback that reduces change is a {{blank:a}} feedback. A threshold past which change is self-sustaining is a {{blank:b}} point. Meltwater makes ocean surface water less {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["negative"], choices: ["negative", "positive", "neutral"] },
      { id: "b", accepted: ["tipping"], choices: ["tipping", "dew", "melting"] },
      { id: "c", accepted: ["dense"], choices: ["dense", "salty-free", "deep"] },
    ], explanation: "Negative; tipping; dense (less dense)." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each feedback to its description.",
    pairs: [
      ["Ice–albedo feedback", "Less ice gives a darker surface, more absorption and more melting"],
      ["Water vapour feedback", "Warmer air holds more vapour, which adds to the greenhouse effect"],
      ["Permafrost carbon feedback", "Thaw releases CO2 and methane, causing more warming"],
      ["Longwave emission", "A warmer Earth radiates more energy to space and limits warming"],
      ["Ocean CO2 uptake", "The sea absorbs some of the extra CO2, reducing the rise in the air"],
    ], explanation: "The first three amplify change; the last two reduce it." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: "In summer sea ice with an albedo of 0.8 receives 200 W/m² of solar radiation. Calculate the radiation it absorbs, in W/m².",
    value: absIce, wrong: [160, 1000],
    explanation: "Absorbed = 200 × (1 − 0.8) = 200 × 0.2 = **40 W/m²**. The value 160 is the reflected radiation." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "Sea ice with an albedo of 0.75 melts and is replaced by open ocean with an albedo of 0.1. The insolation is 240 W/m². Calculate the increase in absorbed radiation, in W/m².",
    hints: ["Find the radiation absorbed by the ocean.", "Subtract the radiation absorbed by the ice."],
    value: extra, wrong: [216, 36],
    explanation: "Ocean: 240 × 0.9 = 216 W/m². Ice: 240 × 0.25 = 60 W/m². Increase = 216 − 60 = **156 W/m²**." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, dp: 1,
    stem: "Old, snow-covered sea ice has an albedo of 0.9 and open ocean has an albedo of 0.15. For insolation of 180 W/m², calculate how many times more radiation the open ocean absorbs than the ice.",
    hints: ["Divide the absorbed radiation of the ocean by that of the ice."],
    value: ratio, wrong: [6, 0.12],
    explanation: "Ocean absorbs 180 × 0.85 = 153 W/m²; ice absorbs 180 × 0.1 = 18 W/m². 153 ÷ 18 = **8.5 times**. This large difference is why the feedback is strong." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "Illustrative data: the mass lost by a glacier rose from 60 Gt per year in one decade to 270 Gt per year in a later decade. Calculate the percentage increase.",
    hints: ["Percentage increase = (new − old) ÷ old × 100."],
    value: pct, wrong: [78, 210],
    explanation: "(270 − 60) ÷ 60 × 100 = 210 ÷ 60 × 100 = **350%**. Dividing by 270 gives 78%, the wrong base." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the type of feedback that amplifies an initial change.",
    accepted: ["positive", "positive feedback", "a positive feedback"], wrong: ["negative"],
    explanation: "A **positive** feedback amplifies change." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the feedback in which melting reduces the reflectivity of the surface and so increases warming.",
    accepted: ["ice-albedo feedback", "ice albedo", "ice-albedo", "albedo feedback", "ice–albedo feedback", "ice albedo feedback", "albedo"], wrong: ["water vapour feedback"],
    explanation: "The **ice–albedo feedback**." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by a climate tipping point.",
    hints: ["Include the threshold, what happens after it, and the time scale."],
    points: [
      "A critical threshold in the climate system (such as a level of warming).",
      "Beyond it the change becomes self-sustaining because of positive feedbacks and may be abrupt or rapid.",
      "The change is irreversible, or very difficult to reverse, on a human timescale.",
    ],
    modelAnswer: "A tipping point is a threshold in the climate system. Once it is passed, positive feedbacks keep the change going and the system moves to a new state, which cannot easily be reversed within a human lifetime.",
    explanation: "Threshold, self-sustaining change and irreversibility." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how melting of the Greenland ice sheet could affect the circulation of the North Atlantic.",
    hints: ["Think about the density of the surface water and what happens to sinking."],
    points: [
      "Meltwater adds large amounts of fresh water to the surface of the North Atlantic.",
      "Fresh water is less dense than salty water, so the surface water is less able to sink.",
      "Reduced sinking weakens the overturning circulation that brings warm surface water north.",
      "This changes heat transport and weather patterns (for example cooler north-west Europe and shifts in tropical rainfall).",
    ],
    modelAnswer: "Meltwater adds fresh water to the North Atlantic, so surface water is less dense and sinks less. The overturning circulation weakens and carries less warm water northwards, which would change regional climates, for instance cooling north-west Europe and shifting tropical rain belts.",
    explanation: "Fresh water, lower density, weaker sinking, changed heat transport." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain, as a series of stages, how the thawing of permafrost forms a positive feedback loop.",
    hints: ["Start with rising temperature and end where you started."],
    points: [
      "Higher global temperature warms the permafrost and causes it to thaw.",
      "Microbes decompose the organic matter that was frozen and release carbon dioxide and methane.",
      "The greenhouse gases increase the greenhouse effect and raise the temperature further.",
      "The extra warming thaws more permafrost, so the loop reinforces itself.",
    ],
    modelAnswer: "Rising temperature thaws permafrost. Microbes break down the thawed organic matter and release carbon dioxide and methane. These gases strengthen the greenhouse effect and raise temperature further, which thaws more permafrost, so the process reinforces itself.",
    explanation: "A positive feedback returns to its starting stage and strengthens it." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "In Arctic summer the insolation is 300 W/m² (illustrative values).\n\n" + tbl(["Surface", "Albedo"], [["Snow-covered sea ice", 0.85], ["Ice with melt ponds", 0.55], ["Open ocean", 0.06]]),
    hints: ["Absorbed = insolation × (1 − albedo)."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the radiation absorbed by snow-covered sea ice, in W/m².", value: sIce, wrong: [255, 15],
        explanation: "300 × (1 − 0.85) = 300 × 0.15 = 45 W/m²." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the radiation absorbed by open ocean, in W/m².", value: sSea, wrong: [18, 300],
        explanation: "300 × (1 − 0.06) = 300 × 0.94 = 282 W/m²." }),
      P.mcq({ label: "(c)", stem: "Which statement is supported by your calculations?", options: [
        ["Open ocean absorbs over six times as much as snow-covered ice", "Correct: 282 ÷ 45 = 6.3."],
        ["Snow-covered ice absorbs more radiation than open ocean does", "The ice reflects most of the radiation."],
        ["The surfaces absorb equal amounts of radiation", "The absorbed amounts differ greatly."],
        ["Melt ponds make the ice reflect much more radiation", "Melt ponds lower the albedo from 0.85 to 0.55."],
      ], answer: "A", explanation: "282 ÷ 45 = 6.3 times." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how the figures show a positive feedback if the ice melts.",
        points: [
          "Melting replaces bright ice (albedo 0.85) with dark ocean (0.06), so the surface absorbs much more radiation.",
          "The extra energy warms the water and the air, causing more ice to melt.",
          "More melting exposes more ocean, so absorption increases further: the change amplifies itself.",
        ],
        modelAnswer: "When ice melts, the surface changes from bright ice (albedo 0.85) to dark ocean (0.06) and absorbs about six times as much energy. The extra energy melts more ice, which exposes more ocean, so the change reinforces itself.",
        explanation: "Lower albedo, more absorption, more melting." }),
    ], explanation: "Compute absorbed radiation and link it to the feedback." });

  b.struct({ d: 4, skill: "EVALUATION",
    stem: "Illustrative strength of the North Atlantic overturning circulation (in sverdrups, Sv, a unit of water flow) in a hypothetical model:\n\n" + tbl(["Year", "2000", "2050", "2100"], [["Strength (Sv)", 17, 14, 11]]),
    hints: ["Subtract for the fall; divide by the 2000 value for the percentage."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the fall in strength between 2000 and 2100, in Sv.", value: fall, wrong: [3, 28],
        explanation: "17 − 11 = 6 Sv." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the fall as a percentage of the 2000 value, to 1 decimal place.", value: fallPct, dp: 1, unit: "%", wrong: [54.5, 6],
        explanation: "6 ÷ 17 × 100 = 35.3%." }),
      P.short({ label: "(c)", stem: "Name the substance added to the North Atlantic surface by melting ice that reduces the density of surface water.", accepted: ["fresh water", "freshwater", "meltwater", "melt water", "fresh meltwater"],
        explanation: "Fresh (melt) water makes the surface less dense." }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain how a large weakening of this circulation could affect climates around the North Atlantic and in the tropics.",
        points: [
          "Less warm surface water is carried northwards, so north-west Europe could become cooler than it would be otherwise.",
          "The temperature contrast between north and south changes, shifting wind systems and storm tracks.",
          "The tropical rain belt (ITCZ) could shift southward, changing rainfall in places that rely on it, such as the Sahel.",
          "Sea level on the Atlantic coast of North America could rise more as the ocean slows.",
        ],
        modelAnswer: "With less warm water carried north, north-west Europe could cool, and the changed north–south temperature contrast would shift winds and storm tracks. The tropical rain belt could move south, changing rainfall for regions such as the Sahel, and sea level on the western Atlantic coast could rise more.",
        explanation: "Changed heat transport alters regional temperatures and rainfall." }),
      P.manual({ label: "(e)", marks: 3, stem: "Evaluate how certain scientists can be about this projection.",
        points: [
          "The data are from a single hypothetical model; different models give different amounts of weakening.",
          "The size of the freshwater input from ice sheets and its effect are uncertain.",
          "Scientists have only a short direct record of the circulation, so it is hard to detect a trend or the position of a threshold.",
        ],
        modelAnswer: "Scientists are uncertain. Models differ in how much the circulation weakens, the amount of meltwater is hard to predict and the direct record of the circulation is short, so the exact threshold for a collapse cannot be identified.",
        explanation: "Model differences and short records create uncertainty." }),
    ], explanation: "Calculate the change, explain its effects and judge the certainty." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the extent to which tipping points make climate change harder to manage.",
    hints: ["Say how tipping points change the speed and size of change.", "Then consider why management is harder or still possible."],
    points: [
      "Tipping points mean change can become abrupt or self-sustaining, so outcomes may not be proportional to emissions.",
      "Irreversibility means damage (such as ice sheet loss and sea-level commitment) cannot be undone by later action.",
      "Uncertainty about thresholds makes it hard to set safe limits and plan adaptation.",
      "Some responses take decades (such as switching energy systems), so action may come too late for fast tipping points.",
      "Slow tipping points (ice sheets over centuries) give time to adapt and to cut emissions to avoid the worst.",
      "Reducing emissions quickly lowers the risk of crossing thresholds, which makes management still worthwhile.",
      "International governance is difficult because the effects (sea-level rise) fall on countries that did not cause them.",
      "Judgement: tipping points make management more urgent and more difficult, but not impossible, because early mitigation reduces the likelihood of crossing thresholds.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Tipping points make climate change harder to manage because change may become abrupt, self-sustaining and irreversible, so the response is not proportional to emissions and damage cannot be undone later. Uncertainty about where thresholds lie makes it difficult to set safe limits, and measures that take decades to put in place, such as changing energy systems, may come too late for faster tipping points. Some tipping points, such as the loss of ice sheets, take centuries, which gives time to adapt and to cut emissions. Rapid mitigation also lowers the chance of crossing thresholds, so management remains worthwhile. I conclude that tipping points make management more urgent and more difficult, but they do not make it impossible, since early action reduces the risk.",
    wordLimit: { max: 300 }, explanation: "Weigh the difficulties created by tipping points against the benefits of early action." });

  b.card("DEFINITION", "Positive feedback", "A process that amplifies an initial change, e.g. ice–albedo, water vapour and permafrost carbon feedbacks.");
  b.card("DEFINITION", "Negative feedback", "A process that reduces an initial change, e.g. more longwave emission from a warmer Earth, ocean uptake of CO2.");
  b.card("DEFINITION", "Climate tipping point", "A threshold beyond which change is self-sustaining, often abrupt, and hard to reverse on human timescales.");
  b.card("CONCEPT", "Ice–albedo feedback", "Melting exposes darker surfaces that absorb more radiation (sea ice albedo about 0.7-0.85 against about 0.06 for open ocean), causing more melting.");
  b.card("FACT", "Ice sheets and sea level", "If melted completely, Greenland would raise sea level by about 7 m and West Antarctica by about 3 m; loss would take centuries.");
  b.card("CONCEPT", "Slowing of the North Atlantic overturning", "Meltwater makes surface water less dense, reducing sinking and weakening the circulation that carries warm water north.");
  b.card("CONCEPT", "Permafrost feedback loop", "Warming, thaw, release of CO2 and methane, more warming, more thaw: a positive feedback.");
  b.card("CONCEPT", "Non-linear change", "After a tipping point, a small extra change can cause a disproportionately large and lasting response.");
  b.card("CONCEPT", "Interactions between environments", "Atmospheric warming melts ice (cold environments); meltwater changes ocean circulation (marine); thawing releases gases to the atmosphere.");
});
