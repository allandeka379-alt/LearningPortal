// W1b: atmos.moisture-precipitation (both boards; the two raindrop theories are ZIMSEC detail -> applies ZIM).
// Computed: 27 - 1.5 x 10 = 12; condensation level 125 x (26 - 17) = 1125 m; ELR (26 - 5) / 3 = 7; struct: 29/21 -> 1000 m,
// 19 at the cloud base, 13 at 2000 m (SALR 6) against 11 in the environment (ELR 9); rain shadow 1180 - 470 = 710, ratio 2.5.
import { concept, P, geographyLevels, chk, rnd, tempAtHeight } from "../lib.mjs";
import { mc, tbl } from "../tables/w1b-_q.mjs";

const t12 = chk(tempAtHeight(27, 1500, 10), 12);
const lcl13 = chk(125 * (26 - 17), 1125);
const elr14 = chk((26 - 5) / 3, 7);
const lclS = chk(125 * (27 - 19), 1000);
const tBase = chk(tempAtHeight(27, lclS, 10), 17);
const tTop = chk(tempAtHeight(tBase, 2500 - lclS, 6), 8);
const tEnv = chk(tempAtHeight(27, 2500, 9), 4.5);
const diffRS = chk(1180 - 470, 710);
const ratioRS = rnd(1180 / 470, 1, 2.5, "ratio");

concept("ageo.atmos.moisture-precipitation", { file: "atmos/moisture-precipitation", keyPrefix: "atmos.moisture-precipitation" }, (b) => {
  mc(b, 1, "RECALL", "What is the approximate value of the dry adiabatic lapse rate (DALR)?", [
    ["10 °C per 1 000 m", "Correct: unsaturated rising air cools by about 10 °C for each 1 000 m."],
    ["6.5 °C per 1 000 m", "That is the average environmental lapse rate."],
    ["5 °C per 1 000 m", "Saturated air cools more slowly, at about 5–9 °C per 1 000 m."],
    ["1 °C per 100 m of descent", "This describes warming of sinking air, not the cooling rate asked for."],
  ], "The **DALR** is about 10 °C per 1 000 m. The SALR is smaller because condensation releases latent heat.");
  mc(b, 1, "RECALL", "What is **sublimation**?", [
    ["Ice changing directly to water vapour", "Correct: a change from solid to gas without passing through liquid."],
    ["Water vapour changing to liquid water", "That is condensation."],
    ["Liquid water changing to ice crystals", "That is freezing."],
    ["Ice changing into liquid water", "That is melting."],
  ], "**Sublimation** is the direct change between solid and vapour.");
  mc(b, 2, "UNDERSTANDING", "Why does saturated rising air cool more slowly than dry rising air?", [
    ["Condensation releases latent heat", "Correct: the heat released warms the air and offsets some of the cooling."],
    ["Saturated air contains no water vapour", "Saturated air holds as much vapour as it can."],
    ["Saturated air is compressed as it rises", "Rising air expands, which is what cools it."],
    ["Saturated air absorbs more shortwave radiation", "The change in cooling rate is caused by the change of state, not by radiation."],
  ], "Above the condensation level, **latent heat** from condensation warms the parcel, so the SALR is lower than the DALR.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Under which condition is the atmosphere **absolutely stable**?", [
    ["The ELR is smaller than the SALR", "Correct: a lifted parcel is colder than its surroundings at all heights and sinks back."],
    ["The ELR is greater than the DALR", "That is absolute instability."],
    ["The ELR lies between the SALR and DALR", "That is conditional instability."],
    ["The DALR equals the SALR", "These two rates are never equal while condensation is occurring."],
  ], "If the **ELR is less than the SALR**, the parcel is always cooler than the surrounding air, so the air is absolutely stable.");
  mc(b, 2, "APPLICATION", "Which type of rainfall mainly explains the high rainfall on the windward slopes of the Eastern Highlands?", [
    ["Orographic (relief) rainfall", "Correct: moist air is forced to rise over the high ground, cools and condenses."],
    ["Convectional rainfall only", "Convection occurs too, but the persistent heavy rain on slopes is caused by forced uplift."],
    ["Frontal rainfall from a depression", "Depressions do not bring most of the rain to Zimbabwe."],
    ["Radiation cooling and dew", "Dew gives only small amounts of water and not heavy rainfall."],
  ], "On the windward slopes the air is forced to rise: **orographic rainfall**. The lee side is a rain shadow.");
  mc(b, 2, "UNDERSTANDING", "How does radiation fog form?", [
    ["The ground chills the air to its dew point on a clear night", "Correct: the lowest layer of air is cooled below the dew point and condenses."],
    ["Warm moist air is carried over a cold ocean current", "That is advection fog."],
    ["Strong winds mix warm and cold air during the afternoon", "Strong mixing prevents fog by keeping the air above its dew point."],
    ["Cumulonimbus clouds sink to the ground", "Fog is not caused by a storm cloud sinking."],
  ], "**Radiation fog** forms when the ground cools by radiation and chills the air above it below the dew point.");
  mc(b, 3, "ANALYSIS", "In the **Bergeron–Findeisen** process, why do ice crystals grow at the expense of water droplets?", [
    ["Vapour pressure at saturation is lower over ice", "Correct: vapour moves to the ice, which grows while droplets evaporate."],
    ["Droplets are heavier than ice crystals and so fall out first", "The process depends on vapour movement, not weight."],
    ["Ice crystals are warmer than the droplets around them", "The crystals are not warmer; the vapour pressure difference drives the growth."],
    ["Droplets collide with each other and merge", "That is the collision–coalescence process."],
  ], "Because vapour pressure over ice is lower than over supercooled water, vapour deposits on the crystals.", { hints: ["Think about where water vapour moves when two surfaces differ in saturation pressure."], applies: ["zimsec"] });
  b.tf({ d: 1, skill: "RECALL", stem: "Air cools as it rises because it expands as the pressure falls.", answer: true,
    feedbackTrue: "Correct: rising air expands as the surrounding pressure falls, and expansion cools it.",
    feedbackFalse: "Not so: rising air meets lower pressure, expands and cools; it does not lose heat to its surroundings.",
    explanation: "This is an **adiabatic** cooling process: no heat is exchanged with the surroundings." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Hail forms mainly in stable layered clouds such as stratus.", answer: false, daily: true,
    feedbackFalse: "Correct: hail forms in deep cumulonimbus clouds with strong up-currents.",
    feedbackTrue: "Not so: stable layered cloud has weak up-currents and cannot grow hailstones.",
    explanation: "**Hail** needs strong up-currents that carry ice pellets repeatedly above the freezing level, as in cumulonimbus." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Air that is cooled to its {{blank:a}} becomes saturated. Condensation needs tiny particles called condensation {{blank:b}}. The land on the lee side of mountains that receives little rain is a {{blank:c}} shadow.",
    blanks: [
      { id: "a", accepted: ["dew point"], choices: ["dew point", "freezing point", "melting point"] },
      { id: "b", accepted: ["nuclei"], choices: ["nuclei", "rates", "cells"] },
      { id: "c", accepted: ["rain"], choices: ["rain", "wind", "cloud"] },
    ], explanation: "Dew point; condensation nuclei; rain shadow." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each process to the cause of cooling or uplift.",
    pairs: [
      ["Convectional rainfall", "Strong surface heating makes moist air rise"],
      ["Orographic rainfall", "Air is forced to rise over a mountain range"],
      ["Frontal rainfall", "Warm air is forced up over colder air"],
      ["Dew and radiation fog", "Ground cooling at night chills the air to its dew point"],
      ["Advection fog", "Warm moist air moves over a cold surface"],
    ], explanation: "Each type has a distinct cause of cooling or uplift." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "°C",
    stem: "A parcel of unsaturated air at the surface has a temperature of 27 °C. It rises 1 500 m. Using the DALR of 10 °C per 1 000 m, calculate its temperature at 1 500 m, in °C.",
    value: t12, wrong: [17, 24.5],
    explanation: "Cooling = 1.5 × 10 = 15 °C. Temperature = 27 − 15 = **12 °C**. The value 17 comes from using the cooling of only 1 000 m." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "m",
    stem: "At the surface the air temperature is 26 °C and the dew point is 17 °C. Using the rule that the condensation level is 125 m above the surface for each degree of difference between temperature and dew point, calculate the height of the cloud base, in metres.",
    hints: ["Find the difference between temperature and dew point first.", "Multiply by 125 m."],
    value: lcl13, wrong: [1500, 9],
    explanation: "Difference = 26 − 17 = 9 °C. Height = 9 × 125 = **1 125 m**." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "°C per 1000 m",
    stem: "A weather balloon records 26 °C at ground level and 5 °C at a height of 3 000 m. Calculate the environmental lapse rate, in °C per 1 000 m.",
    hints: ["Find the total fall in temperature.", "Divide by the height in thousands of metres."],
    value: elr14, wrong: [21, 0.14],
    explanation: "Fall = 26 − 5 = 21 °C over 3 000 m = 21 ÷ 3 = **7 °C per 1 000 m**." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the temperature at which air becomes saturated and condensation begins.",
    accepted: ["dew point", "the dew point", "dew-point"], wrong: ["freezing point"],
    explanation: "The **dew point** is the temperature at which air is saturated." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the type of rainfall caused when moist air is forced to rise over high ground.",
    accepted: ["orographic", "relief", "orographic rainfall", "relief rainfall", "orographic (relief)"], wrong: ["convectional"],
    explanation: "Forced uplift over relief gives **orographic** (relief) rainfall." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how convectional rainfall forms.",
    hints: ["Start with the heating of the ground."],
    points: [
      "The ground is strongly heated by the Sun, warming the air above it by conduction and convection.",
      "The warm, moist air rises and cools adiabatically until it reaches its dew point.",
      "Condensation forms cloud and releases latent heat, which keeps the air rising (cumulonimbus), until raindrops are heavy enough to fall.",
    ],
    modelAnswer: "The Sun heats the ground and the air above it, so warm moist air rises. As it rises it cools to its dew point and the vapour condenses, releasing latent heat that helps the air to keep rising. A tall cumulonimbus cloud builds and heavy rain falls.",
    explanation: "Heating, uplift, cooling to the dew point, condensation and latent heat." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how raindrops form by collision and coalescence in a warm cloud.",
    hints: ["Think about droplets of different sizes falling at different speeds."],
    points: [
      "Cloud droplets form on condensation nuclei by condensation and are too small to fall as rain.",
      "Droplets of different size fall at different speeds because larger droplets fall faster.",
      "Larger droplets collide with smaller ones in their path and merge (coalesce) into bigger drops.",
      "The drop becomes heavy enough to overcome the up-currents and falls as rain; the process works best in deep clouds with strong up-currents.",
    ],
    modelAnswer: "Droplets form on condensation nuclei. Larger droplets fall faster than smaller ones, collide with them and merge. The growing drops become heavy enough to fall against the up-currents and reach the ground as rain, especially in deep warm clouds in the tropics.",
    explanation: "Collision–coalescence needs droplets of different sizes in a warm cloud.", applies: ["zimsec"] });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why air in an unstable atmosphere keeps rising once it has been lifted.",
    hints: ["Compare the temperature of the rising parcel with the temperature of the air around it."],
    points: [
      "In an unstable atmosphere the environmental lapse rate is steep (greater than the lapse rate of the rising parcel).",
      "The rising parcel therefore stays warmer than the surrounding air at each height.",
      "Being warmer, it is less dense and buoyant, so it continues to rise until it reaches air as warm as itself.",
    ],
    modelAnswer: "In unstable conditions the surrounding air cools quickly with height. The lifted parcel cools more slowly, so it is warmer and less dense than the air around it and continues to rise until the temperatures become equal.",
    explanation: "Instability means the parcel is warmer than its surroundings, so it is buoyant." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "A parcel of air at the surface has a temperature of 27 °C and a dew point of 19 °C. The condensation level is 125 m for each degree of difference between temperature and dew point. The parcel rises at the DALR (10 °C per 1 000 m) until condensation starts, then cools at the SALR (6 °C per 1 000 m). The environmental lapse rate (ELR) is 9 °C per 1 000 m.",
    hints: ["Find the dew point depression first.", "Use the DALR to the cloud base and the SALR above it."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the height of the cloud base, in metres.", value: lclS, unit: "m", wrong: [8, 1250],
        explanation: "27 − 19 = 8 °C; 8 × 125 = 1 000 m." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the temperature of the parcel at the cloud base, in °C.", value: tBase, unit: "°C", wrong: [27, 19],
        explanation: "Cooling at the DALR for 1 000 m = 10 °C. 27 − 10 = 17 °C." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the temperature of the parcel at a height of 2 500 m, in °C.", value: tTop, unit: "°C", wrong: [2, 11],
        explanation: "From 1 000 m to 2 500 m it cools at the SALR: 1.5 × 6 = 9 °C. 17 − 9 = 8 °C." }),
      P.num({ label: "(d)", marks: 2, stem: "Calculate the temperature of the surrounding air at 2 500 m, in °C.", value: tEnv, unit: "°C", wrong: [9, 22.5],
        explanation: "27 − 2.5 × 9 = 27 − 22.5 = 4.5 °C." }),
      P.manual({ label: "(e)", marks: 4, stem: "Use your answers to explain whether the atmosphere is stable or unstable at this height, and describe the likely weather.",
        points: [
          "At 2 500 m the parcel (8 °C) is warmer than the surrounding air (4.5 °C).",
          "A warmer parcel is less dense and buoyant, so it continues to rise: the atmosphere is unstable.",
          "Condensation continues and releases latent heat, supporting further uplift into tall cumulus or cumulonimbus clouds.",
          "Likely weather: heavy showers or thunderstorms, possibly with hail.",
        ],
        modelAnswer: "The parcel at 2 500 m is 8 °C, warmer than the surroundings at 4.5 °C, so it is buoyant and keeps rising. The atmosphere is unstable. Latent heat from continuing condensation sustains the uplift and cumulonimbus clouds may build, giving heavy showers or thunderstorms.",
        explanation: "Compare the parcel with the environment to judge stability." }),
    ], explanation: "Work up through the cloud base and compare the parcel with the environment." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "Illustrative data for two stations on either side of a mountain range in the path of moist south-easterly winds:\n\n" + tbl(["", "Station W (windward)", "Station L (leeward)"], [["Height above sea level (m)", 1650, 1000], ["Mean annual rainfall (mm)", 1180, 470]]),
    hints: ["Subtract for a difference; divide for a ratio."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate how much more rain Station W receives than Station L each year, in mm.", value: diffRS, unit: "mm", wrong: [1650, 2.5],
        explanation: "1 180 − 470 = 710 mm." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate how many times greater the rainfall at W is than at L, to 1 decimal place.", value: ratioRS, dp: 1, unit: "times", wrong: [0.4, 710],
        explanation: "1 180 ÷ 470 = 2.5 times." }),
      P.short({ label: "(c)", stem: "Name the type of rainfall that mainly explains the high total at Station W.", accepted: ["orographic", "relief", "orographic rainfall", "relief rainfall"],
        explanation: "Forced uplift over the range gives orographic (relief) rainfall." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why Station L receives much less rain than Station W.",
        points: [
          "The moist air loses most of its water vapour as rain on the windward slope after being forced to rise and cool.",
          "On the leeward side the air descends and is compressed, so it warms.",
          "Warmer air is further from its dew point and can hold more vapour, so cloud dissolves and little rain falls (rain shadow).",
        ],
        modelAnswer: "Air rising over the range cools, condenses and loses most of its moisture as rain on the windward side. On the leeward side the dry air descends and warms by compression, so it is far from saturation and clouds break up. This produces a rain shadow.",
        explanation: "Windward uplift removes the moisture; leeward descent warms and dries the air." }),
    ], explanation: "Compare the totals and explain the rain shadow." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the relative importance of convectional and orographic rainfall in explaining the rainfall of Zimbabwe.",
    hints: ["Describe the contribution of each, then compare where and how much each contributes.", "Reach a judgement."],
    points: [
      "Convectional rain: strong heating of the interior in the hot, wet season creates thunderstorms, giving much of the summer rain over most of the country.",
      "Convectional rain is intense but often patchy and variable from year to year.",
      "Orographic rain is concentrated on the windward slopes of the Eastern Highlands, which receive the highest totals.",
      "Orographic uplift also triggers cloud and drizzle in the cool season when moist south-easterly air reaches the highlands.",
      "Orographic rain affects a small area; most of the country (the plateau and lowveld) depends on convection and the ITCZ/low-pressure system.",
      "Rain-shadow areas on the leeward side and lowveld show how relief reduces rainfall elsewhere.",
      "Other factors such as the ITCZ, tropical cyclones and El Niño also affect the totals.",
      "Judgement: convection is more important for the national total because it covers more area, but orographic rainfall is more important in the highlands.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Convectional rain is the main source of rainfall over most of Zimbabwe. In the hot summer, heating of the interior makes moist air rise, producing thunderstorms between November and March. These storms are intense but patchy and variable. Orographic rainfall matters mainly in the Eastern Highlands, where moist south-easterly air is forced to rise over the escarpment and the windward slopes receive the highest totals, with drizzle even in the cool season; leeward areas and parts of the lowveld lie in a rain shadow. Other influences such as the ITCZ, tropical cyclones and El Niño also affect the amounts. I conclude that convection is more important for the national rainfall because it affects far more of the country, while relief rainfall is the key control in the highlands.",
    wordLimit: { max: 300 }, explanation: "Compare area, amounts and reliability of each type, then judge." });

  b.card("FORMULA", "Temperature at height", "Temperature = surface temperature − lapse rate × (height in m ÷ 1 000). DALR about 10, SALR about 5-9, ELR average about 6.5 °C per 1 000 m.");
  b.card("DEFINITION", "Dew point", "The temperature at which air becomes saturated; cooling below it causes condensation.");
  b.card("CONCEPT", "Stable and unstable air", "Stable: ELR less than the SALR (parcel sinks back). Unstable: ELR greater than the DALR (parcel keeps rising). Conditionally unstable: ELR between the two.");
  b.card("FORMULA", "Cloud base estimate", "Height of condensation level ≈ 125 m × (surface temperature − dew point in °C).");
  b.card("CONCEPT", "Four causes of precipitation", "Convection (surface heating), orographic (forced uplift over relief), frontal (warm air over cold air), radiation cooling (dew, fog, frost).");
  b.card("CONCEPT", "Rain shadow", "Dry area on the lee of mountains: air descends, warms and dries after losing its moisture on the windward slope.");
  b.card("CONCEPT", "Collision–coalescence", "Warm cloud process: larger droplets fall faster, collide with smaller ones and merge until heavy enough to fall as rain (ZIMSEC detail).", undefined, { applies: ["zimsec"] });
  b.card("CONCEPT", "Bergeron–Findeisen process", "Cold cloud process: ice crystals grow at the expense of supercooled droplets because vapour pressure is lower over ice (ZIMSEC detail).", undefined, { applies: ["zimsec"] });
  b.card("DEFINITION", "Hail", "Layered balls of ice formed in cumulonimbus clouds, where strong up-currents lift ice pellets repeatedly above the freezing level.");
  b.card("DEFINITION", "Temperature inversion", "A layer in which temperature rises with height; it is very stable and can trap smoke and fog below it.");
});
