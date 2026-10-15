// W2b exam rows (ZIMSEC): ZIM_STRUCT25 x 5 — Paper 1: environmental management x 2 (topic 3: water pollution; land degradation),
// biogeography x 2 (topic 7: savanna diversity; nutrient stores); Paper 2: energy x 1 (topic 13: household fuels, biogas, renewables).
// All datasets are invented for this exercise; every number is computed in code. The 8-mark final parts are self-marked.
import { concept, P, chk, rnd, mean, sum, simpson, checkExam, EXAM, geographyLevels, ZIM } from "../lib.mjs";
import { tbl } from "../tables/w2b-_q.mjs";

const BASE = (paper) => ({ d: 4, skill: EXAM.ZIM_STRUCT25.skill, secs: EXAM.ZIM_STRUCT25.secs, examStyle: true, paper, applies: EXAM.ZIM_STRUCT25.applies });

// ---- Item 1: water pollution below a town sewage works (topic 3)
const SITES = [["S1", 0, 8.1, 2, 40], ["S2", 2, 7.4, 3, 300], ["S3", 5, 2.6, 11, 12000], ["S4", 10, 4.1, 8, 4500], ["S5", 20, 6.3, 5, 800]];
const meanDO = chk(mean(SITES.map((s) => s[2])), 5.7, 1e-9);
const nitPct = chk(((SITES[2][3] - SITES[0][3]) / SITES[0][3]) * 100, 450, 1e-9);
const ecoliTimes = chk(SITES[2][4] / 1000, 12, 1e-9);
const WQ = tbl(["Site", "Distance downstream of the town (km)", "Dissolved oxygen (mg/L)", "Nitrate (mg/L)", "E. coli (per 100 mL)"],
  SITES.map((s) => [s[0], s[1], s[2], s[3], s[4].toLocaleString("en").replace(/,/g, " ")]));

// ---- Item 2: soil erosion plots and a gully (topic 3)
const PLOTS = [["Bare fallow", 48], ["Maize, no ridges", 30], ["Maize on contour ridges", 12], ["Maize with mulch", 6], ["Grass cover", 4]];
const redPct = rnd(((48 - 4) / 48) * 100, 1, 91.7, "redPct");
const meanMaize = chk(mean([30, 12, 6]), 16, 1e-9);
const bareTotal = chk(48 * 30, 1440);
const gullyRate = chk((107 - 35) / (2024 - 2018), 12, 1e-9);
const PT = tbl(["Plot treatment", "Soil loss (t per hectare per year)"], PLOTS);
const GT = tbl(["Date", "Length of the gully (m)"], [["January 2018", 35], ["January 2024", 107]]);

// ---- Item 3: savanna diversity (topic 7)
const A = [24, 20, 16, 12, 8];
const B = [60, 16, 12, 8, 4];
const sA = simpson(A);
const sB = simpson(B);
const dA = rnd(sA.D, 3, 0.775, "dA");
const dB = rnd(sB.D, 3, 0.592, "dB");
chk(sum(A), 80);
chk(sum(B), 100);
const SP = tbl(["Species (plants in quadrats)", "Protected area (number)", "Communal grazing area (number)"], [["Species 1", 24, 60], ["Species 2", 20, 16], ["Species 3", 16, 12], ["Species 4", 12, 8], ["Species 5", 8, 4], ["Total", 80, 100]]);

// ---- Item 4: nutrient stores (topic 7)
const NS = { rf: { B: 700, L: 40, S: 160, lf: 80 }, sv: { B: 200, L: 90, S: 410, lf: 45 } };
const rfTot = chk(NS.rf.B + NS.rf.L + NS.rf.S, 900);
const svTot = chk(NS.sv.B + NS.sv.L + NS.sv.S, 700);
const rfBpct = rnd((NS.rf.B / rfTot) * 100, 1, 77.8, "rfBpct");
const svLitterYears = chk(NS.sv.L / NS.sv.lf, 2, 1e-9);
const fireLoss = chk(0.6 * NS.sv.B, 120, 1e-9);
const NT = tbl(["Nutrient store or flow", "Tropical rainforest", "Savanna"], [
  ["Biomass store (kg/ha)", NS.rf.B, NS.sv.B],
  ["Litter store (kg/ha)", NS.rf.L, NS.sv.L],
  ["Soil store (kg/ha)", NS.rf.S, NS.sv.S],
  ["Litterfall to the soil (kg/ha per year)", NS.rf.lf, NS.sv.lf],
]);

// ---- Item 5: household energy (topic 13)
const FUEL = [["Firewood", 252], ["Charcoal", 32], ["Electricity", 60], ["Liquefied petroleum gas (LPG)", 28], ["Solar cookers and lamps", 12], ["Biogas", 16]];
chk(sum(FUEL.map((f) => f[1])), 400);
const fwPct = chk((252 / 400) * 100, 63, 1e-9);
const modPct = chk(((60 + 28 + 12 + 16) / 400) * 100, 29, 1e-9);
const bioHours = chk(2.4 / 0.4, 6, 1e-9);
const FT = tbl(["Main cooking fuel", "Households (out of 400)"], FUEL);

concept("ageo.env.pollution", { file: "exam/w2b-zimsec", keyPrefix: "exam.w2b-zimsec", applies: ZIM }, (b) => {
  // ============================================================ Item 1: water pollution
  b.struct({
    ...BASE("Paper 1"),
    concepts: ["ageo.env.pollution"],
    hints: ["Percentage increase = (new − old) ÷ old × 100.", "In (e) cover laws and community action, give limits and reach a judgement."],
    stem: `A stream flows through a town in Zimbabwe. A sewage works discharges treated and partly treated effluent into it. Students sampled five sites (data invented for this exercise).\n\n${WQ}`,
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the mean dissolved oxygen of the five sites, in mg/L.", value: meanDO, wrong: [28.5, 6.3],
            explanation: "(8.1 + 7.4 + 2.6 + 4.1 + 6.3) ÷ 5 = 28.5 ÷ 5 = 5.7 mg/L." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the percentage increase in nitrate between S1 and S3.", value: nitPct, unit: "%", wrong: [9, 82],
            explanation: "(11 − 2) ÷ 2 × 100 = 450%. Giving 9 is the increase, not a percentage; 82 divides by the new value." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Which site is most likely to be just below the sewage works?", options: [
            ["S3", "Correct: it has the lowest oxygen and the highest nitrate and E. coli."],
            ["S1", "S1 is upstream and has the best water quality."],
            ["S2", "S2 is only slightly polluted."],
            ["S5", "S5 is 20 km downstream, where the stream has recovered."],
          ], answer: "A", explanation: "The worst values are at S3." }),
          P.mcq({ label: "(iv)", marks: 1, stem: "Which measurement gives evidence of contamination by human or animal faeces?", options: [
            ["E. coli count", "Correct: E. coli lives in the gut and shows faecal pollution."],
            ["Distance downstream", "Distance is a location, not a measure of quality."],
            ["Dissolved oxygen", "Oxygen shows organic pollution but not faecal contamination directly."],
            ["Nitrate", "Nitrate shows nutrient enrichment."],
          ], answer: "A", explanation: "E. coli is the usual indicator of faecal contamination." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain why dissolved oxygen falls sharply at S3.",
        points: [
          "The effluent contains organic matter (human waste and food waste).",
          "Bacteria decompose the organic matter and use oxygen in respiration.",
          "Nitrates and phosphates encourage the growth of algae, which die and are decomposed using more oxygen (eutrophication).",
          "Less oxygen is added because the water is warm and slow or covered with algae, so oxygen use is greater than supply.",
        ],
        modelAnswer: "The effluent contains organic matter. Bacteria decompose it using oxygen, so the oxygen level falls. Nitrates encourage algal growth; when the algae die, more oxygen is used in decomposition. Oxygen is not replaced fast enough in the slow, warm water.",
        explanation: "Decomposition of organic waste and algae uses up oxygen." }),
      P.group({
        label: "(c)", stem: "Public health.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "The limit used in this exercise is 1 000 E. coli per 100 mL. How many times greater than the limit is the count at S3?", value: ecoliTimes, unit: "times", wrong: [11, 0.083],
            explanation: "12 000 ÷ 1 000 = 12 times." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which disease is spread most directly by drinking water polluted with sewage?", options: [
            ["Cholera", "Correct: cholera is a waterborne disease."],
            ["Malaria", "Malaria is spread by mosquitoes."],
            ["Tuberculosis", "TB is spread by droplets in the air."],
            ["Rabies", "Rabies is spread by animal bites."],
          ], answer: "A", explanation: "Cholera spreads through water contaminated with faeces." }),
        ],
      }),
      P.manual({ label: "(d)", marks: 4, stem: "Suggest four ways in which the pollution in the stream could be reduced.",
        points: [
          "Upgrade and maintain the sewage works so that effluent is fully treated before release.",
          "Stop industries and households connecting illegal discharges, and enforce penalties.",
          "Plant buffer strips of vegetation along the banks to filter runoff.",
          "Monitor the water quality regularly and publish results.",
        ],
        modelAnswer: "Upgrade the sewage works so that effluent is fully treated, enforce penalties on illegal discharges, plant buffer strips along the banks, and monitor and publish the water quality.",
        explanation: "Treat at source, enforce the law, filter runoff and monitor." }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Assess the effectiveness of legislation and community action in controlling water pollution in towns in Zimbabwe.",
        points: [
          "The Environmental Management Act (Chapter 20:27) sets standards and lets the Environmental Management Agency (EMA) license discharges.",
          "The polluter-pays principle, fines and orders to clean up give a reason for firms and councils to comply.",
          "The law is only effective if monitoring and inspection take place, and these need laboratories, vehicles and staff.",
          "Local authorities run the sewage works, and ageing equipment and shortage of money cause failures that the law alone cannot solve.",
          "Community action such as clean-up campaigns, river-watch groups and reporting of leaks makes use of local knowledge.",
          "Community groups lack legal powers and funds, and clean-ups treat the symptoms rather than the sources.",
          "Education changes behaviour but is slow, and poor households may have no alternative to unsafe disposal.",
          "Judgement: law and community action work best together; the law is needed for large point sources, while community action is better for small, scattered ones, but both depend on resources and enforcement.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "The Environmental Management Act allows the Environmental Management Agency to license discharges and to penalise polluters, and the polluter-pays principle gives firms and councils a reason to comply. However, the law works only if there is regular monitoring, which needs laboratories, vehicles and staff, and many pollution failures come from ageing sewage works and shortages of money which fines cannot cure. Community action, such as river clean-ups, reporting leaks and educating neighbours, uses local knowledge and builds responsibility, but community groups have no legal powers, little money and tend to treat the symptoms rather than the sources. I conclude that the two work best together: law and inspection for large point sources such as sewage works and factories, and community action for small scattered sources, though both are limited unless they are properly resourced.",
        explanation: "Weigh law and community action, say what limits each and judge." }),
    ]),
    explanation: "Interpret water quality data, explain eutrophication and oxygen depletion, and assess control measures.",
  });

  // ============================================================ Item 2: soil erosion and gully
  b.struct({
    ...BASE("Paper 1"),
    concepts: ["ageo.env.degradation"],
    hints: ["Mean of three values = sum ÷ 3.", "Rate of gully growth = change in length ÷ number of years.", "In (e) weigh indigenous knowledge against modern methods and judge."],
    stem: `On a communal farm in the Midlands of Zimbabwe, students measured soil loss from small plots on the same slope for one rainy season, and measured a gully on the farm (data invented for this exercise).\n\n${PT}\n\n${GT}`,
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Use the tables.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the percentage reduction in soil loss of the grass cover plot compared with the bare fallow plot, to 1 decimal place.", value: redPct, dp: 1, unit: "%", wrong: [8.3, 12],
            explanation: "(48 − 4) ÷ 48 × 100 = 91.7%. Dividing by the grass figure instead gives 1 100%." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the mean soil loss of the three maize plots, in t per hectare per year.", value: meanMaize, wrong: [48, 12],
            explanation: "(30 + 12 + 6) ÷ 3 = 48 ÷ 3 = 16 t/ha per year." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Which maize treatment lost the least soil?", options: [
            ["Maize with mulch", "Correct: 6 t/ha per year."],
            ["Maize, no ridges", "This lost the most of the three maize plots."],
            ["Maize on contour ridges", "This lost 12 t/ha, twice as much as mulch."],
            ["Bare fallow", "This is not a maize plot and lost the most soil."],
          ], answer: "A", explanation: "Mulch protects the soil from raindrop impact and slows runoff." }),
          P.num({ label: "(iv)", marks: 2, stem: "If 30 hectares of the farm were left bare, how much soil would be lost in a year at the rate for bare fallow, in tonnes?", value: bareTotal, unit: "t", wrong: [48, 1.6],
            explanation: "48 × 30 = 1 440 t." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain why bare soil is eroded faster than soil under grass.",
        points: [
          "Raindrops hit bare soil directly, breaking up the soil structure and splashing particles.",
          "Grass leaves intercept rain and reduce the force of drops.",
          "Roots bind the soil and increase infiltration, so less runoff is produced on grass.",
          "Bare soil has crusts and low infiltration, so runoff is faster and carries more soil.",
        ],
        modelAnswer: "Raindrops strike bare soil directly and break up its structure, whereas grass leaves intercept the rain. Roots bind the soil and open pores that increase infiltration, so grass produces less runoff. On bare soil a crust forms, infiltration is low and fast runoff carries away soil.",
        explanation: "Cover protects from splash and runoff; roots bind and infiltrate." }),
      P.group({
        label: "(c)", stem: "The gully.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the mean rate of growth in length of the gully between January 2018 and January 2024, in metres per year.", value: gullyRate, unit: "m", wrong: [72, 107],
            explanation: "(107 − 35) ÷ 6 = 12 m per year. The difference 72 m is the total growth, not the rate." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which process mainly lengthens a gully?", options: [
            ["Headward erosion by concentrated runoff", "Correct: water cuts back at the head of the gully."],
            ["Wind blowing soil from the surface", "Gullies are formed by running water, not wind."],
            ["Deposition of sand in the channel", "Deposition fills a channel."],
            ["Soil creep on gentle slopes", "Creep is slow and does not cut channels."],
          ], answer: "A", explanation: "Concentrated flow erodes at the head and the sides." }),
        ],
      }),
      P.manual({ label: "(d)", marks: 3, stem: "State three ways of controlling the growth of the gully.",
        points: [
          "Divert runoff above the gully with contour ridges or channels.",
          "Build check dams of stones, logs or sandbags across the gully to slow the flow and trap silt.",
          "Plant grass, vetiver or trees in and around the gully, and fence it to keep out livestock.",
        ],
        modelAnswer: "Divert runoff above the gully with contour ridges, build check dams of stones or logs to slow the flow and trap silt, and plant grass or trees and fence out livestock.",
        explanation: "Reduce the flow, trap soil and stabilise with vegetation." }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Evaluate the importance of indigenous knowledge systems in conserving land in communal areas.",
        points: [
          "Indigenous knowledge includes sacred groves and forests protected by custom, and rules about cutting trees near springs and rivers.",
          "Practices such as mulching, rotation, mixed cropping and leaving fallow protect soil and maintain fertility.",
          "Traditional contour ridges, stone lines and bunds slow runoff, using local materials at low cost.",
          "Chiefs and elders enforce rules through community respect, so compliance is high.",
          "Strengths: local, cheap, tested over generations and accepted by the community.",
          "Weaknesses: population pressure, shorter fallows, loss of respect for customs and new threats (gold panning, cash crops) overwhelm older rules.",
          "Modern methods (conservation agriculture, terraces, extension advice) can add knowledge and funds, but may be costly or ignore local conditions.",
          "Judgement: indigenous knowledge is valuable and should be combined with modern science, with the community leading, because neither alone can address all pressures.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Indigenous knowledge systems include sacred groves, rules about cutting trees near springs, mulching, rotations, mixed cropping and the use of fallow, and traditional contour ridges and stone lines that slow runoff. They are cheap, use local materials and are enforced by chiefs and elders through respect, so compliance can be high. However, population pressure shortens fallows, respect for custom is weaker among some young people, and new pressures such as gold panning and cash cropping are beyond the traditional rules. Modern methods such as conservation agriculture, terraces and extension advice add knowledge and resources, but they may be costly or poorly suited to local conditions. I conclude that indigenous knowledge is very valuable, particularly for community acceptance, but is most effective when combined with modern science under community leadership.",
        explanation: "Weigh strengths and limits of indigenous knowledge against modern methods and judge." }),
    ]),
    explanation: "Calculate and interpret erosion data, explain splash and runoff, and evaluate indigenous conservation knowledge.",
  });

  // ============================================================ Item 3: savanna diversity
  b.struct({
    ...BASE("Paper 1"),
    concepts: ["ageo.bio.biodiversity-ecosystems", "ageo.bio.plant-succession"],
    hints: ["Simpson's index D = 1 − Σ(n ÷ N)²; find each fraction, square it and add.", "In (e) consider what communities can do and what limits them."],
    stem: `Students used quadrats to count plants of five woody and grass species in a protected savanna area and in a nearby communal grazing area in Zimbabwe (data invented for this exercise).\n\n${SP}\n\nSimpson's index of diversity is D = 1 − Σ(n ÷ N)², where n is the number of one species and N is the total. A higher D means greater diversity.`,
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Calculate Simpson's index.",
        parts: [
          P.num({ label: "(i)", marks: 3, stem: "Calculate D for the protected area, to 3 decimal places.", value: dA, dp: 3, wrong: [0.225, 0.8],
            explanation: "Fractions 0.30, 0.25, 0.20, 0.15, 0.10; squares 0.09, 0.0625, 0.04, 0.0225, 0.01; sum 0.225; D = 1 − 0.225 = 0.775. Stopping at 0.225 forgets to subtract." }),
          P.num({ label: "(ii)", marks: 3, stem: "Calculate D for the communal grazing area, to 3 decimal places.", value: dB, dp: 3, wrong: [0.408, 0.6],
            explanation: "Fractions 0.60, 0.16, 0.12, 0.08, 0.04; squares 0.36, 0.0256, 0.0144, 0.0064, 0.0016; sum 0.408; D = 1 − 0.408 = 0.592." }),
        ],
      }),
      P.mcq({ label: "(b)", marks: 1, stem: "What do the results show?", options: [
        ["The protected area is more diverse because species are more even", "Correct: D is 0.775 compared with 0.592, and no species dominates."],
        ["The communal area is more diverse because Species 1 is so common", "Dominance by one species lowers diversity."],
        ["Both areas have the same diversity", "The indices are different."],
        ["The protected area has fewer individuals so it is less diverse", "Diversity depends on evenness and richness, not total numbers."],
      ], answer: "A", explanation: "A higher D and more even numbers show greater diversity in the protected area." }),
      P.manual({ label: "(c)", marks: 5, stem: "Explain how overgrazing and veld fires can reduce plant diversity in the communal area.",
        points: [
          "Overgrazing removes the palatable grasses and seedlings, so they cannot set seed and the numbers fall.",
          "Livestock trample soil, causing compaction and erosion, which reduces seedling survival.",
          "Unpalatable or thorny species survive and spread, so one species dominates.",
          "Frequent fires kill seedlings and fire-sensitive trees before they mature.",
          "Fire exposes the soil to erosion, which removes seeds and nutrients.",
        ],
        modelAnswer: "Overgrazing removes the palatable grasses and seedlings before they can seed, so their numbers fall, while trampling compacts the soil. Unpalatable species survive and spread and begin to dominate. Frequent fires kill seedlings and fire-sensitive trees, and bare soil is eroded, which removes seeds and nutrients.",
        explanation: "Selective removal, trampling and fire reduce evenness and richness." }),
      P.manual({ label: "(d)", marks: 5, stem: "Describe the stages of secondary succession on a field abandoned after cultivation in the savanna.",
        points: [
          "Annual weeds and pioneer grasses colonise the bare soil first, because seeds and nutrients are already present.",
          "Perennial grasses and herbs replace the annuals as soil cover and organic matter increase.",
          "Shrubs and pioneer trees (such as acacias) become established and shade out some grasses.",
          "Species diversity and soil fertility increase as the community develops.",
          "The stable community (climax or plagioclimax if fire and grazing continue) is savanna woodland, reached more quickly than in primary succession.",
        ],
        modelAnswer: "Annual weeds and pioneer grasses colonise first because seeds and nutrients are present. Perennial grasses and herbs follow as cover and organic matter increase, then shrubs and pioneer trees such as acacias become established. Diversity and soil fertility rise, and the community reaches savanna woodland, or a plagioclimax if fire and grazing continue, faster than in primary succession.",
        explanation: "Secondary succession starts with soil already present and proceeds to a woodland-grass community." }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Assess the effectiveness of community-based approaches to conserving savanna biodiversity in Zimbabwe.",
        points: [
          "Community programmes such as CAMPFIRE let communities earn income from wildlife, which gives a reason to protect it.",
          "Fire committees, early burning and fire breaks reduce damaging late-season fires.",
          "School and village woodlots reduce the cutting of natural woodland for fuel and building.",
          "Local people know the area and can monitor poaching and illegal cutting.",
          "Income may be unevenly shared, and a few benefit more than the many, so support may fall.",
          "Human-wildlife conflict (crop raiding, livestock losses) can turn people against conservation.",
          "Community groups need training, funds and legal support, and national agencies such as Parks and Wildlife Management and EMA provide these.",
          "Judgement: community-based approaches work when benefits are shared and rules are enforced with state support; alone they cannot resist large pressures such as commercial poaching.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Programmes such as CAMPFIRE let communities earn income from wildlife, which gives people a reason to protect it. Fire committees, early burning and fire breaks reduce damaging late fires, and woodlots reduce cutting of natural woodland. Local people can monitor poaching because they know the area. However, if income is shared unevenly, or crop raiding and livestock losses are not compensated, support falls. Groups also need training, funds and legal backing from agencies such as Parks and Wildlife Management and EMA. I conclude that community approaches work when benefits are shared and rules are enforced with state support, but alone they cannot withstand large pressures such as commercial poaching.",
        explanation: "Weigh benefits and limits of community conservation and judge." }),
    ]),
    explanation: "Calculate Simpson's index, explain loss of diversity, describe succession and assess community conservation.",
  });

  // ============================================================ Item 4: nutrient stores and deforestation
  b.struct({
    ...BASE("Paper 1"),
    concepts: ["ageo.bio.nutrient-cycles", "ageo.bio.soils"],
    hints: ["Residence time = store ÷ annual flow.", "In (e) link loss of biomass and litter to leaching and erosion."],
    stem: `The table shows illustrative nutrient stores and litterfall for a tropical rainforest and a savanna (data invented for this exercise; a Gersmehl diagram would show the same stores as circles of different sizes).\n\n${NT}`,
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the percentage of the rainforest's total nutrients stored in biomass, to 1 decimal place.", value: rfBpct, dp: 1, unit: "%", wrong: [70, 4.4],
            explanation: "Total = 700 + 40 + 160 = 900 kg/ha. 700 ÷ 900 × 100 = 77.8%." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate how many years of litterfall are needed to equal the savanna's litter store (litter store ÷ litterfall).", value: svLitterYears, unit: "years", wrong: [0.5, 135],
            explanation: "90 ÷ 45 = 2 years. 0.5 is the answer for the rainforest (40 ÷ 80)." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Which is the largest nutrient store in the savanna?", options: [
            ["The soil", "Correct: 410 kg/ha."],
            ["The biomass", "Biomass holds only 200 kg/ha."],
            ["The litter", "Litter holds 90 kg/ha."],
            ["All three are equal", "The stores are very different."],
          ], answer: "A", explanation: "In the savanna most nutrients are in the soil." }),
          P.mcq({ label: "(iv)", marks: 1, stem: "Which statement about the rainforest is correct?", options: [
            ["Most nutrients are held in the vegetation, so removing it removes the store", "Correct: biomass holds 700 of 900 kg/ha."],
            ["Most nutrients are held in the soil", "The soil holds only 160 kg/ha."],
            ["The litter store is the largest", "The litter store is the smallest."],
            ["Litterfall is smaller than in the savanna", "Litterfall is 80 compared with 45 kg/ha."],
          ], answer: "A", explanation: "The rainforest keeps its nutrients in biomass." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the differences in nutrient stores between the rainforest and the savanna.",
        points: [
          "The rainforest holds most nutrients in biomass (700 kg/ha) compared with 200 kg/ha in the savanna.",
          "The savanna holds most in the soil (410 kg/ha) compared with 160 kg/ha in the rainforest.",
          "The savanna litter store is larger (90 compared with 40 kg/ha), although its litterfall is smaller (45 compared with 80 kg/ha).",
        ],
        modelAnswer: "The rainforest holds most nutrients in biomass (700 kg/ha, against 200 in the savanna), whereas the savanna holds most in the soil (410, against 160). The savanna litter store is larger (90 against 40 kg/ha) even though its litterfall is smaller (45 against 80 kg/ha).",
        explanation: "Quote figures for biomass, soil and litter." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain why litter decomposes faster in the rainforest than in the savanna.",
        points: [
          "The warm, humid conditions of the rainforest favour decomposers (fungi, bacteria, termites).",
          "Moisture is available all year, whereas the savanna has a long dry season when decomposition stops.",
          "Rainforest leaves are soft and quickly broken down, while savanna grasses and leaves are often tough and dry.",
          "Nutrients are quickly recycled by roots, so the litter does not accumulate.",
        ],
        modelAnswer: "Warm, humid conditions in the rainforest favour fungi, bacteria and termites, and moisture is available all year, whereas decomposition in the savanna stops in the long dry season. Savanna litter is also tougher and drier. Nutrients in the rainforest are taken up quickly by roots, so litter does not accumulate.",
        explanation: "Heat, moisture and decomposers speed decomposition." }),
      P.group({
        label: "(d)", stem: "Burning.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "A fire destroys 60% of the nutrients in savanna biomass. How many kg/ha are removed from the biomass store?", value: fireLoss, wrong: [200, 12],
            explanation: "0.60 × 200 = 120 kg/ha." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain why some of these nutrients are returned to the soil but others are lost.",
            points: [
              "Ash contains minerals which are washed into the soil by rain, so some nutrients are returned.",
              "Nitrogen is lost as gas in the smoke, and light ash and soil may be blown or washed away.",
            ],
            modelAnswer: "Minerals in the ash are washed into the soil by rain, returning part of the nutrients. Nitrogen escapes as gas in the smoke, and light ash and exposed soil are blown or washed away.",
            explanation: "Ash returns minerals; gas, wind and runoff remove some." }),
        ],
      }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Assess the effects of clearing and burning tropical rainforest on soil fertility.",
        points: [
          "Most nutrients are in the biomass, so removal of the trees removes the main store.",
          "Burning gives a short-term fertiliser effect as ash releases minerals into the soil.",
          "Without the canopy, rain falls directly on the soil, increasing erosion and leaching of nutrients.",
          "Litter input falls, so the supply of organic matter and humus falls and soil structure weakens.",
          "The soil store is small, so it quickly runs out of nutrients, and crops decline after two or three years.",
          "Heat and sunlight increase the loss of organic matter, and the soil may harden and become less permeable.",
          "Recovery through secondary succession takes decades, and may be limited by repeated clearing.",
          "Judgement: the fertility gain is brief, while the long-term loss is severe; the effects are greater on rainforest than on savanna because rainforest nutrients are held in biomass.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Most nutrients in the rainforest are in the biomass, so clearing the trees removes the main store. Burning gives a short-term gain as ash releases minerals, but without a canopy rain falls directly on the soil, which increases erosion and leaches nutrients. Litter input falls, so organic matter and humus decline, and the soil structure weakens. As the soil store is small, fertility is exhausted within a few years and crops fail. Recovery through secondary succession takes decades and may be prevented by repeated clearing. I conclude that the fertility gain is brief and the long-term loss severe, and that the effect is greater on rainforest than savanna because the rainforest holds its nutrients in the vegetation.",
        explanation: "Weigh short-term gain against long-term loss and judge." }),
    ]),
    explanation: "Use nutrient store data, explain decomposition rates and assess the effects of clearance and burning.",
  });

  // ============================================================ Item 5: household energy (topic 13, Paper 2)
  b.struct({
    ...BASE("Paper 2"),
    concepts: ["ageo.energy.zimbabwe-clean-green", "ageo.energy.sources-patterns"],
    hints: ["Percentage = households ÷ 400 × 100.", "Hours = gas produced ÷ gas used per hour.", "In (e) weigh potential against cost, reliability and the grid."],
    stem: `A survey of 400 households in a district in Zimbabwe asked about the main cooking fuel (data invented for this exercise).\n\n${FT}`,
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the percentage of households using firewood as the main fuel.", value: fwPct, unit: "%", wrong: [252, 6.3],
            explanation: "252 ÷ 400 × 100 = 63%." }),
          P.num({ label: "(ii)", marks: 2, stem: "Modern fuels are electricity, LPG, solar and biogas. Calculate the percentage of households using them as the main fuel.", value: modPct, unit: "%", wrong: [116, 71],
            explanation: "(60 + 28 + 12 + 16) ÷ 400 × 100 = 116 ÷ 400 × 100 = 29%. The value 71 is the share using firewood or charcoal." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Which is a likely environmental effect of the high use of firewood?", options: [
            ["Deforestation and loss of soil cover", "Correct: collection removes trees and exposes the soil."],
            ["Acid rain over the whole of Africa", "Household firewood does not cause continental acid rain."],
            ["Ozone depletion", "Ozone depletion is caused by other gases."],
            ["Rising water tables", "Tree removal tends to change runoff, not raise water tables."],
          ], answer: "A", explanation: "Collection of firewood leads to deforestation." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain two problems for women and children of relying on firewood.",
        points: [
          "Collecting firewood takes hours, which reduces time for school, farm work and rest, particularly as trees become scarce.",
          "Carrying heavy loads over long distances causes injury and fatigue, and travel can be unsafe.",
          "Smoke from indoor cooking causes breathing problems and eye disease.",
          "Open fires can burn children and start house fires.",
        ],
        modelAnswer: "Collecting firewood takes hours each week, which reduces time for school, work and rest, and heavy loads cause injury. Smoke from indoor cooking causes breathing problems and eye disease, and open fires cause burns.",
        explanation: "Time, injury, smoke and burns." }),
      P.group({
        label: "(c)", stem: "A household biogas digester.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "A digester produces 2.4 m³ of gas a day and a stove uses 0.4 m³ in an hour. For how many hours a day can the household cook?", value: bioHours, unit: "h", wrong: [0.17, 6.4],
            explanation: "2.4 ÷ 0.4 = 6 hours." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which material is used to feed a household biogas digester?", options: [
            ["Cattle dung mixed with water", "Correct: anaerobic bacteria break it down to produce methane."],
            ["Plastic bags and cans", "These do not produce biogas and pollute."],
            ["Sand and gravel", "Inert material produces no gas."],
            ["Engine oil", "Oil does not produce biogas safely."],
          ], answer: "A", explanation: "Dung and other organic waste produce gas when digested without air." }),
        ],
      }),
      P.manual({ label: "(d)", marks: 5, stem: "Outline how GIS and remote sensing could be used to identify areas suitable for a solar power plant.",
        points: [
          "Satellite images and data show the land cover and identify bare or low-value land that can be used.",
          "A solar radiation (sunshine) layer shows where the highest radiation is received.",
          "Slope and aspect from a digital elevation model show flat or north-facing sites.",
          "Layers for roads, power lines and substations show where the plant can be connected.",
          "GIS overlays the layers and excludes protected areas, farmland and settlements, to rank the best sites.",
        ],
        modelAnswer: "Remote sensing identifies land cover and bare land. A solar radiation layer shows where most sunshine falls, and a digital elevation model shows flat sites with a suitable aspect. Layers for roads and power lines show where the plant could be connected. GIS overlays the layers, excludes protected areas, farms and settlements, and ranks the best sites.",
        explanation: "Overlay suitability layers and exclude unsuitable land." }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Evaluate the contribution that renewable energy can make to solving the shortage of electricity in Zimbabwe.",
        points: [
          "Zimbabwe has high solar radiation, so solar plants and rooftop panels can be built quickly and in stages.",
          "Small hydro, biogas and biomass can supply rural areas away from the national grid.",
          "Renewable energy reduces the need for imported fuel and for coal, which lowers pollution.",
          "Solar power has no fuel cost, so running costs are low once the system is built.",
          "Hydropower at Kariba depends on rainfall in the Zambezi basin, and drought has cut output in some years.",
          "Solar power works only in the daytime, so batteries or other sources are needed, which raises the cost.",
          "Capital costs, a weak grid and the need for foreign currency to import equipment limit the speed of growth.",
          "Judgement: renewables can make a large contribution, especially solar with storage and off-grid systems, but they work best with a stronger grid and a mix of sources.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Zimbabwe receives a lot of sunshine, so solar plants and rooftop panels can be built quickly and in stages, and have no fuel cost once built. Small hydro, biogas and biomass can supply rural areas away from the grid, and renewables reduce the need for imported fuel and for coal, which cuts pollution. However, hydropower at Kariba depends on rainfall in the Zambezi basin and has been reduced by drought, solar power works only by day and needs batteries or other sources, and capital costs, a weak grid and the need for foreign currency to import equipment slow the growth. I conclude that renewables can make a large contribution, especially solar with storage and off-grid systems, but they will work best with a stronger grid and a mix of sources.",
        explanation: "Weigh the potential of renewables against cost, reliability and the grid, and judge." }),
    ]),
    explanation: "Interpret a household fuel survey, calculate biogas use, plan a GIS site search and evaluate renewable energy.",
  });
});
