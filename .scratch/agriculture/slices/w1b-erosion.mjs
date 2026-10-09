// Slice W1b: soil erosion.
import { concept, P, field, yieldPerHa, pct, round, check, table, agricultureLevels } from "../lib.mjs";

// Runoff plots for the structured item: 10 m × 4 m.
const PLOT = field(10, 4);
const LOSS = [["Bare, ploughed up and down the slope", 3.2], ["Ploughed along the contour", 1.4], ["Maize with stover mulch", 0.6]];
const perHa = LOSS.map(([, kg]) => yieldPerHa({ kg, areaHa: PLOT.ha }).kgPerHa);
check(Math.abs(perHa[0] - 800) < 1e-9 && Math.abs(perHa[2] - 150) < 1e-9, "loss per ha");
const reduction = pct(perHa[0] - perHa[2], perHa[0]);
check(Math.abs(reduction - 81.25) < 1e-9, "reduction");
const LOSS_TABLE = table(["Treatment", "Soil collected in one season (kg)"], LOSS.map(([t, kg]) => [t, kg.toFixed(1)]));

// Daily item: plot area conversion.
const D = field(25, 8); // 200 m² = 0.02 ha
const dLoss = 5;
const dPerHa = yieldPerHa({ kg: dLoss, areaHa: D.ha }).kgPerHa;
check(Math.abs(dPerHa - 250) < 1e-9, "daily");

concept("agri.soil.erosion", { file: "soil/erosion", keyPrefix: "soil.erosion" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of water erosion removes a thin, even layer of topsoil from a wide area?",
    options: [
      ["Sheet erosion", "Correct: a thin sheet of runoff removes soil evenly."],
      ["Gully erosion", "Gullies are deep channels."],
      ["Rill erosion", "Rills are small channels a few centimetres deep."],
      ["Splash erosion", "Splash erosion is detachment by raindrops."],
    ],
    answer: "A",
    explanation: "Sheet erosion is the even removal of a thin layer of topsoil; it is widespread and hard to notice.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What are the two main agents of soil erosion?",
    options: [
      ["Water and wind", "Correct: they detach and carry soil."],
      ["Overgrazing and deforestation", "These are causes that expose soil to the agents."],
      ["Termites and earthworms", "These organisms mix soil; they are not the main agents."],
      ["Frost and heat", "These weather rock; they do not carry soil away."],
    ],
    answer: "A",
    explanation: "Running water and wind are the agents; human activities are causes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Small stones standing on top of little columns of soil in a field are a sign of",
    options: [
      ["sheet and splash erosion", "Correct: the stones protected the soil beneath them while the surrounding soil was removed."],
      ["wind deposition", "Deposition adds soil; the columns show soil removed."],
      ["waterlogging", "Waterlogging gives grey, mottled soil, not pedestals."],
      ["gully erosion", "Gullies are deep channels, not stone pedestals."],
    ],
    answer: "A",
    explanation: "Pedestals form where stones shield the soil from raindrops while sheet and splash erosion lower the surface around them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does ploughing up and down a slope increase soil erosion?",
    options: [
      ["The furrows channel runoff straight downhill so it flows fast", "Correct: water flows along the furrows and gains speed."],
      ["It buries all the topsoil below the subsoil", "Ploughing turns soil but does not bury it all."],
      ["It adds clay to the surface, which caps", "Ploughing does not change texture."],
      ["It increases the organic matter, making the soil too light and fluffy to stay in place", "Ploughing reduces organic matter."],
    ],
    answer: "A",
    explanation: "Furrows running downslope act as channels, so runoff concentrates, speeds up and forms rills. Contour ploughing makes furrows that hold water back.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the most important **off-farm** effect of soil erosion?",
    options: [
      ["Siltation of rivers and dams", "Correct: eroded soil fills rivers and dams downstream."],
      ["Loss of topsoil from fields", "That is an on-farm effect."],
      ["Lower crop yields on the eroded land", "That is an on-farm effect."],
      ["Gullies dividing fields into pieces", "That is an on-farm effect."],
    ],
    answer: "A",
    explanation: "Off the farm, sediment silts up dams, rivers and canals, increases flooding and carries pollutants.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Wind erosion is most likely in which situation?",
    options: [
      ["A dry, bare, fine sandy field in the dry season", "Correct: loose dry particles with no cover are easily lifted."],
      ["A moist clay field under a maize crop", "Moist clay is cohesive and the crop shelters it."],
      ["A grassland with thick cover in the rainy season", "Cover and moisture protect the soil."],
      ["A wet vlei covered by reeds", "Wet soil under vegetation is not lifted by wind."],
    ],
    answer: "A",
    hints: ["Wind needs loose, dry particles and no cover."],
    explanation: "Wind erosion needs dry, loose, fine particles and no vegetation, as in bare sandy fields in the dry season.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A gully has formed where a cattle path meets a field. What is the most likely cause?",
    options: [
      ["Trampling compacted the path, so runoff concentrated along it and cut a channel", "Correct: compacted, bare paths concentrate runoff."],
      ["Cattle dung along the path made the soil too loose and fertile, so it collapsed", "Dung improves soil; it does not cause gullies."],
      ["The cattle drank too much water from the river", "Drinking does not cut channels in fields."],
      ["Wind blew loose soil from the bare path and scoured a deep channel into the field", "A gully is cut by running water, not wind."],
    ],
    answer: "A",
    hints: ["What happens to rain on compacted, bare ground?"],
    explanation: "Bare, compacted cattle tracks shed runoff that concentrates and deepens into a gully, which then grows back upslope.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two fields on the same slope receive the same storm. Field 1 lost much more soil than Field 2. Which difference would best explain this?",
    options: [
      ["Field 1 was bare after burning; Field 2 had a stover mulch", "Correct: mulch protects from raindrop impact and slows runoff."],
      ["Field 1 had more earthworms than Field 2", "Earthworms improve infiltration, which reduces erosion."],
      ["Field 1 had more organic matter than Field 2", "Organic matter strengthens structure and reduces erosion."],
      ["Field 1 was ploughed along the contour; Field 2 up and down", "Contour ploughing reduces erosion, so Field 1 should lose less."],
    ],
    answer: "A",
    hints: ["Which factor increases detachment and runoff?"],
    explanation: "Bare, burned soil is detached by raindrops and sheds runoff; a mulch absorbs impact, slows water and keeps soil in place.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Rill erosion forms small channels that can usually be removed by normal cultivation.",
    answer: true,
    explanation: "True. Rills are a few centimetres deep and can be filled by cultivation. If neglected they may deepen into gullies, which cannot.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Veld fires reduce erosion because the ash protects the soil surface.",
    answer: false,
    explanation: "False. Fires remove grass and litter, leaving bare soil exposed to the first heavy storms; ash is easily washed or blown away.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each sign with the type of erosion it shows.",
    pairs: [
      ["Soil splashed onto plant stems and walls", "Splash erosion"],
      ["Paler soil and exposed roots over a wide area", "Sheet erosion"],
      ["Small channels a few centimetres deep after a storm", "Rill erosion"],
      ["Deep channel too wide to cross with a plough", "Gully erosion"],
    ],
    explanation: "Splash detaches, sheet removes thin layers, rills are small channels and gullies are large channels.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences about wind erosion.",
    template: "Fine dust carried high in the air moves by {{blank:a}}. Sand grains that bounce along the surface move by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["suspension"] },
      { id: "b", accepted: ["saltation"] },
    ],
    explanation: "Suspension carries fine particles; saltation is bouncing; larger grains roll by surface creep.",
  });
  b.num({
    d: 3, skill: "APPLICATION", daily: true,
    stem: `A runoff plot measuring ${25} m × ${8} m lost ${dLoss} kg of soil in one season. Calculate the soil loss in kg/ha.`,
    value: dPerHa, unit: "kg/ha", wrong: [dLoss * D.m2, round(dLoss / D.m2, 3)],
    hints: ["Convert the plot area to hectares: 1 ha = 10,000 m²."],
    explanation: `Area = 25 × 8 = ${D.m2} m² = ${D.ha} ha. Loss = ${dLoss} ÷ ${D.ha} = ${dPerHa} kg/ha. Multiplying by the area in m² or dividing by m² mixes up the units.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the process in which eroded soil is deposited in rivers and dams, making them shallower.",
    accepted: ["siltation", "silting", "sedimentation", "silting up"],
    explanation: "**Siltation** reduces the storage capacity of dams and increases flooding.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how overgrazing leads to soil erosion.",
    hints: ["Use a chain: practice → cover → runoff → erosion."],
    points: [
      "Too many animals eat the grass down and remove the plant cover.",
      "Trampling compacts the soil, so less rain infiltrates.",
      "More runoff flows over the bare soil and carries topsoil away (paths become gullies).",
    ],
    modelAnswer: "Too many animals graze the grass down to the ground, leaving bare soil. Their hooves compact the surface, so rain cannot soak in. More water runs off, detaching and carrying away topsoil, and cattle paths develop into gullies.",
    explanation: "A clear cause-and-effect chain earns the marks.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "State **two** effects of soil erosion on the farm and **two** effects off the farm.",
    hints: ["On the farm: soil and crops. Off the farm: rivers, dams, roads."],
    points: [
      "On the farm: loss of fertile topsoil / nutrients / organic matter.",
      "On the farm: lower yields / reduced water-holding / gullies blocking implements.",
      "Off the farm: siltation of rivers, dams and canals.",
      "Off the farm: flooding / pollution of water / damage to roads and bridges / dust.",
    ],
    modelAnswer: "On the farm, erosion removes the fertile topsoil and its nutrients, so yields fall, and gullies cut fields into pieces. Off the farm, the soil silts up rivers and dams, reducing their storage, and makes flooding and water pollution worse.",
    explanation: "Separate on-farm and off-farm effects clearly.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `Three runoff plots, each ${PLOT.m2 / 4} m × 4 m, were set up on the same slope at a school near Masvingo. The soil washed off each plot was collected and weighed.\n\n${LOSS_TABLE}`,
    hints: ["Area of each plot in ha = m² ÷ 10,000.", "Percentage reduction = (difference ÷ original) × 100."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the area of one plot in hectares.",
        value: PLOT.ha, unit: "ha", wrong: [PLOT.m2, PLOT.m2 / 1000],
        answer: "0.004",
        explanation: `${PLOT.m2 / 4} × 4 = ${PLOT.m2} m²; ${PLOT.m2} ÷ 10,000 = ${PLOT.ha} ha.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the soil loss from the bare plot in kg/ha.",
        value: perHa[0], unit: "kg/ha", wrong: [LOSS[0][1] * PLOT.m2],
        explanation: `${LOSS[0][1]} ÷ ${PLOT.ha} = ${perHa[0]} kg/ha.`,
      }),
      P.num({
        label: "(c)", stem: "Calculate the percentage reduction in soil loss of the mulched plot compared with the bare plot, to one decimal place.",
        value: reduction, unit: "%", tol: 0.05, wrong: [round(pct(LOSS[2][1], LOSS[0][1]), 1)],
        explanation: `(${LOSS[0][1]} − ${LOSS[2][1]}) ÷ ${LOSS[0][1]} × 100 = ${round(reduction, 1)}%. The same answer is found from the kg/ha figures.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why ploughing along the contour reduced soil loss.",
        points: ["Furrows and ridges run across the slope and hold back runoff.", "So water slows down / soaks in instead of carrying soil downhill."],
        explanation: "Contour furrows act as small barriers to runoff.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Explain why the plot with stover mulch lost the least soil.",
        points: [
          "Mulch absorbs the impact of raindrops, so particles are not detached / no cap forms.",
          "Mulch slows runoff so more water infiltrates.",
          "Mulch adds organic matter that improves structure / maize roots bind soil.",
        ],
        explanation: "Cover protects the soil from detachment and transport.",
      }),
    ],
    explanation: "Scale plot losses to a hectare, compare treatments and link cover and contour working to detachment and runoff.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "A communal grazing area near Gweru has little grass left by October. Cattle walk along the same paths to the river every day. After the first storms, deep channels have formed along the paths, and the dam downstream has become shallower over recent years.",
    hints: ["Identify the type of erosion, the cause, then the effect downstream."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the type of erosion that has formed along the cattle paths.",
        accepted: ["gully erosion", "gully", "gullies", "gullying"],
        keywords: { any: ["gully", "gullies", "gullying"] },
        explanation: "Deep channels are gullies.",
      }),
      P.short({
        label: "(b)", stem: "Name the process that has made the dam shallower.",
        accepted: ["siltation", "silting", "sedimentation", "deposition", "silting up"],
        explanation: "Eroded soil is deposited in the dam: siltation.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain how the grazing practices described have caused this erosion.",
        points: [
          "Too many cattle / overgrazing removed the grass cover by October.",
          "Bare soil was exposed to raindrop impact and runoff at the first storms.",
          "Daily walking along the same paths compacted and wore them bare.",
          "Runoff concentrated along the paths and cut deep channels that grew into gullies.",
        ],
        explanation: "Overgrazing and trampling concentrate runoff.",
      }),
    ],
    explanation: "Cause (overgrazing, trampling) → bare, compacted soil → concentrated runoff → gullies → siltation downstream.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "\"Sheet erosion is more dangerous to a farmer than gully erosion.\" Discuss this statement.",
    hints: ["Compare how visible each type is and how much damage it does to fertility.", "Come to a judgement."],
    points: [
      "Sheet erosion removes a thin layer evenly over a wide area, so it is hard to notice.",
      "It removes the most fertile topsoil, humus and nutrients over the whole field, steadily lowering yields.",
      "Farmers often do not act until much topsoil is lost.",
      "Gully erosion is very visible and dramatic; it cuts fields, blocks implements and lowers the water table.",
      "But gullies affect a smaller area and are noticed and treated sooner (although costly to repair).",
      "Judgement with reason, e.g. agrees, because sheet erosion destroys fertility over the whole field unnoticed.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Sheet erosion removes a thin, even layer of soil from the whole field. Because no channels form, it is hardly noticed, but it takes the topsoil with its humus and nutrients, so yields fall year after year and more fertiliser is needed. Gully erosion is spectacular: it cuts fields into pieces, blocks ploughs and lowers the water table, and gullies are expensive to repair. However, gullies affect a smaller area and are noticed and tackled sooner. On balance the statement is fair: sheet erosion is more dangerous because it damages the fertility of the whole field before the farmer realises it, while gullies, though serious, are obvious and localised.",
    explanation: "Weigh visibility, area affected and fertility loss, then judge.",
  });

  b.card("DEFINITION", "Soil erosion", "The removal of soil, especially topsoil, by water and wind faster than new soil forms.");
  b.card("FACT", "Sequence of water erosion", "Splash → sheet → rill → gully.");
  b.card("CONCEPT", "Sheet erosion", "Even removal of a thin layer of topsoil over a wide area; signs: pale patches, exposed roots, stone pedestals.");
  b.card("CONCEPT", "Rill versus gully", "Rills are small channels removable by cultivation; gullies are deep channels that implements cannot cross.");
  b.card("CONCEPT", "Wind erosion movements", "Suspension (dust), saltation (bouncing grains), surface creep (rolling grains).");
  b.card("FACT", "Main human causes of erosion", "Overgrazing, deforestation, cultivating slopes and stream banks, veld fires, poor tillage.");
  b.card("CONCEPT", "Agent versus cause", "Agents (water, wind) move soil; causes (overgrazing, burning) make soil vulnerable.");
  b.card("FACT", "Off-farm effects of erosion", "Siltation of dams and rivers, flooding, water pollution, damaged roads and bridges, dust.");
  b.card("FORMULA", "Soil loss per hectare from a plot", "Soil lost (kg) ÷ plot area (ha); plot area in ha = m² ÷ 10,000.");
});
