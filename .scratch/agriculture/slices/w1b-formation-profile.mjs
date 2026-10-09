// Slice W1b: soil formation and the soil profile.
import { concept, P, check, agricultureLevels } from "../lib.mjs";

// A described soil pit (depths in cm from the surface).
const PIT = { topBottom: 30, subBottom: 95, cBottom: 140 };
const subsoilCm = PIT.subBottom - PIT.topBottom;
check(subsoilCm === 65, "subsoil thickness");
const PIT_TEXT = `A soil pit dug by Form 3 pupils at a school near Chinhoyi showed: dark brown, crumbly soil from the surface to ${PIT.topBottom} cm; red-brown, firmer soil from ${PIT.topBottom} cm to ${PIT.subBottom} cm; broken, partly weathered rock from ${PIT.subBottom} cm to ${PIT.cBottom} cm; solid rock below ${PIT.cBottom} cm.`;

const PIT2 = { top: 20, sub: 90 };
const sub2 = PIT2.sub - PIT2.top;
check(sub2 === 70, "pit 2");

concept("agri.soil.formation-profile", { file: "soil/formation-profile", keyPrefix: "soil.formation-profile" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **weathering**?",
    options: [
      ["The breakdown of rock into smaller particles where it lies", "Correct: weathering breaks rock down in place; nothing is carried away."],
      ["The removal of soil particles by running water or wind", "That is erosion: it moves particles away."],
      ["The deposit of soil particles carried by a river onto a floodplain", "That is deposition, which follows erosion and transport."],
      ["The mixing of organic matter into topsoil by ploughing", "Ploughing mixes soil; it does not break rock down."],
    ],
    answer: "A",
    explanation: "Weathering is the breakdown of rock in place by physical, chemical and biological processes. Erosion and deposition move and lay down the particles afterwards.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A granite dome heats strongly in the sun and cools quickly at night. Over many years thin, curved sheets of rock peel off its surface. Which type of weathering is this?",
    options: [
      ["Physical weathering", "Correct: repeated expansion and contraction breaks the rock without changing its minerals (exfoliation)."],
      ["Chemical weathering", "No new minerals are formed; the rock simply cracks into sheets."],
      ["Biological weathering", "No living thing is involved in the heating and cooling."],
      ["Wind erosion", "Erosion removes material; the sheets break off where they are."],
    ],
    answer: "A",
    explanation: "Daily heating and cooling makes the outer layer of rock expand and contract more than the inside, so curved sheets peel off. This is physical weathering called exfoliation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which process is an example of **chemical** weathering?",
    options: [
      ["Iron in a rock reacting with oxygen to form red iron oxide", "Correct: oxidation changes the mineral into a new substance."],
      ["A rock splitting as water in its cracks freezes and expands", "Freeze-thaw only breaks the rock; it is physical weathering."],
      ["Pebbles in a river being worn smooth as they knock together", "Abrasion by running water is a physical process."],
      ["A tree root widening a crack in a boulder as it grows", "Root action is biological weathering (mechanical in effect)."],
    ],
    answer: "A",
    explanation: "Chemical weathering changes the minerals: oxidation (iron to iron oxide), hydrolysis (feldspar to clay) and carbonation (carbonic acid dissolving limestone).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Rainwater dissolves carbon dioxide from the air and slowly dissolves limestone rock. What is this process called?",
    options: [
      ["Carbonation", "Correct: carbonic acid formed from carbon dioxide and water attacks carbonate rocks."],
      ["Hydrolysis", "Hydrolysis is water reacting with minerals such as feldspar to form clay."],
      ["Oxidation", "Oxidation is oxygen reacting with iron in minerals."],
      ["Exfoliation", "Exfoliation is physical peeling of rock sheets by heating and cooling."],
    ],
    answer: "A",
    explanation: "Carbonation: water + carbon dioxide → carbonic acid, a weak acid that dissolves calcium carbonate in limestone.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Lichens growing on bare rock help to form soil mainly by",
    options: [
      ["producing weak acids that attack the rock surface", "Correct: the acids weather the rock, and the dead lichen adds the first organic matter."],
      ["shading the rock so that it stops expanding", "Shading would reduce, not cause, weathering by heating."],
      ["trapping wind-blown sand that then wears the rock down", "Lichens are too small and flat to trap much sand; their main effect is chemical."],
      ["sending long roots deep into cracks in the rock", "Lichens have no true roots; deep root action is done by trees and shrubs."],
    ],
    answer: "A",
    explanation: "Lichens are early colonisers of bare rock. Their acids attack the surface (biological weathering with a chemical effect) and their remains add organic matter.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a soil profile, which horizon is the topsoil?",
    options: [
      ["Horizon A", "Correct: horizon A is the topsoil, darkened by humus."],
      ["Horizon B", "Horizon B is the subsoil."],
      ["Horizon C", "Horizon C is the partly weathered parent material."],
      ["Horizon R", "R is used for the solid bedrock below the profile."],
    ],
    answer: "A",
    explanation: "From the surface down: A = topsoil, B = subsoil, C = parent material, then bedrock.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A pit dug in a vlei (a low-lying wet area) shows a grey subsoil with orange and rusty spots from 25 cm downwards. What does this subsoil show?",
    options: [
      ["Water stands in the soil for long periods, so drainage is poor", "Correct: grey colours and mottles form when iron is reduced in waterlogged soil."],
      ["The soil is very rich in humus and nitrogen", "Humus makes topsoil dark brown or black, not grey with mottles."],
      ["The soil is well aerated and suits deep-rooted crops", "Well-aerated subsoils are usually uniformly red or brown."],
      ["The parent material was granite, so the subsoil is coarse and sandy", "Colour mottling shows drainage, not the parent rock."],
    ],
    answer: "A",
    hints: ["Think about what happens to iron when there is no oxygen.", "Red-brown means oxidised iron; grey means the opposite."],
    explanation: "When a soil is waterlogged for long periods, oxygen is used up and iron compounds are reduced, giving grey colours with rusty mottles where air enters along cracks and old root channels. It is a sign of poor drainage.",
  });
  b.mcq({
    d: 4, skill: "APPLICATION",
    stem: "Two farms receive the same rainfall. Farm X lies on granite and Farm Y lies on dolerite. Which statement is most likely to be correct?",
    options: [
      ["Farm X has sandier soils than Farm Y", "Correct: granite weathers to coarse quartz sand; dolerite has no quartz and weathers to finer clay."],
      ["Farm X has heavier clay soils than Farm Y", "The opposite is usual: dolerite gives the heavier soils."],
      ["Both farms have the same soil texture", "Parent material is a major factor in texture, so they usually differ."],
      ["Farm Y has paler soils because dolerite has less iron", "Dolerite is rich in iron and usually gives red or dark soils."],
    ],
    answer: "A",
    hints: ["Parent material is one of the five factors of soil formation.", "Which rock contains a lot of quartz that does not weather to clay?"],
    explanation: "Parent material controls texture. Granite contains a lot of quartz, which resists weathering and remains as sand. Dolerite and basalt have no quartz and weather to finer, red or dark clay soils.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Physical weathering changes the chemical composition of the minerals in a rock.",
    answer: false,
    explanation: "False. Physical weathering only breaks rock into smaller pieces. A change in the minerals (for example feldspar to clay) is chemical weathering.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Soils on steep slopes are usually shallower than soils in the valley bottom below them.",
    answer: true,
    explanation: "True. On steep slopes soil is removed by erosion almost as fast as it forms; the material collects at the foot of the slope, so valley soils are deeper. This is the effect of topography (relief).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each process with the type of weathering it belongs to.",
    pairs: ["Hydrolysis of feldspar to clay", "Exfoliation of a granite dome", "Termites bringing subsoil to the surface", "Water freezing in a rock crack"],
    right: ["Chemical", "Physical", "Biological"],
    rightIndex: [0, 1, 2, 1],
    explanation: "Hydrolysis forms new minerals (chemical). Exfoliation and freeze-thaw break rock without chemical change (physical). Termites are living organisms (biological).",
  });
  b.fib({
    d: 2,
    stem: "Complete the description of a soil profile.",
    template: "The darkest layer, coloured by humus, is the {{blank:a}}. Below it lies the {{blank:b}}, which has little humus. Under that is the partly weathered {{blank:c}} material, which rests on solid bedrock.",
    blanks: [
      { id: "a", accepted: ["topsoil", "top soil", "A horizon", "horizon A"] },
      { id: "b", accepted: ["subsoil", "sub soil", "B horizon", "horizon B"] },
      { id: "c", accepted: ["parent"] },
    ],
    explanation: "Topsoil (A) is dark with humus, subsoil (B) has little organic matter, and the C horizon is partly weathered parent material over bedrock.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of chemical weathering in which water reacts with minerals such as feldspar to form clay.",
    accepted: ["hydrolysis"],
    wrong: ["hydration", "oxidation"],
    explanation: "**Hydrolysis**: water reacts with feldspar and similar minerals, which slowly change into clay minerals. Hydration is the absorption of water by a mineral, making it swell.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `In a soil pit near Marondera the dark topsoil reaches a depth of ${PIT2.top} cm, and the subsoil continues below it to a depth of ${PIT2.sub} cm, where weathered rock begins. How thick is the subsoil (B horizon), in cm?`,
    value: sub2, unit: "cm", wrong: [PIT2.sub, PIT2.sub + PIT2.top],
    explanation: `The subsoil runs from ${PIT2.top} cm to ${PIT2.sub} cm: ${PIT2.sub} − ${PIT2.top} = ${sub2} cm. ${PIT2.sub} cm is its lower boundary, not its thickness.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how living organisms help to form soil from rock. Give **two** different organisms in your answer.",
    hints: ["Think of plants on rock and animals in the soil.", "Say what each organism does and how that breaks rock down or builds soil."],
    points: [
      "Names a suitable organism, e.g. plant roots, lichens, termites, earthworms or bacteria and fungi.",
      "Describes its action, e.g. roots grow into cracks and widen them as they thicken.",
      "Names a second, different organism.",
      "Describes its action, e.g. lichens produce acids that dissolve the rock surface / micro-organisms release carbon dioxide and acids / termites mix and bring up particles.",
    ],
    modelAnswer: "Plant roots grow into cracks in the rock and widen them as they thicken, so the rock splits. Lichens on bare rock produce weak acids that attack the rock surface, and when they die they add organic matter to the new soil.",
    explanation: "Biological weathering combines mechanical effects (roots, burrowing animals) and chemical effects (acids from lichens and micro-organisms). Organisms also add organic matter.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3,
    stem: "Explain why soils in hot, wet areas are usually deeper and more weathered than soils in cool, dry areas.",
    hints: ["Which kind of weathering needs warmth and water?"],
    points: [
      "Chemical weathering needs water and is faster at higher temperatures.",
      "So rock is broken down faster and to a greater depth in hot, wet areas.",
      "More vegetation (and organisms) in wet areas adds organic matter and speeds weathering (also: more leaching gives deep, weathered profiles).",
    ],
    modelAnswer: "Chemical weathering reactions need water and go faster when it is warm, so in hot, wet areas rock is broken down more quickly and to a greater depth. The thicker vegetation there also adds organic matter and acids that speed up weathering.",
    explanation: "Climate is a factor of soil formation: rainfall and temperature control the rate of chemical weathering and leaching.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8,
    stem: PIT_TEXT,
    hints: ["Work from the surface downwards.", "Link colour to humus and drainage."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the horizon found from the surface to 30 cm.",
        accepted: ["topsoil", "top soil", "A horizon", "horizon A", "A"],
        explanation: "The dark brown, crumbly surface layer is the topsoil (A horizon).",
      }),
      P.short({
        label: "(b)", stem: "Name the material found from 95 cm to 140 cm.",
        accepted: ["parent material", "C horizon", "horizon C", "weathered rock", "parent rock"],
        keywords: { any: ["parent"] },
        explanation: "Broken, partly weathered rock above solid rock is the parent material (C horizon).",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the top layer is darker than the layer below it.",
        points: [
          "The top layer contains more humus / organic matter.",
          "Because plant remains and dung fall on the surface and are decomposed there, and most roots and organisms live there.",
        ],
        explanation: "Humus is dark; it builds up where organic residues are added and decomposed.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State what the red-brown colour of the middle layer tells you about the soil.",
        points: [
          "The soil is well drained / well aerated.",
          "Iron compounds are oxidised (iron oxide gives the red colour).",
        ],
        explanation: "Red-brown colours come from oxidised iron, formed where air reaches the subsoil.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **one** reason why this profile is suitable for growing maize.",
        points: [
          "Identifies a feature: deep profile / thick topsoil / well-drained subsoil.",
          "Explains it: roots can grow deep for water and nutrients / roots get enough oxygen.",
        ],
        explanation: "Link the profile feature to what the crop's roots need.",
      }),
    ],
    explanation: "A profile description is read from the surface downward: name, appearance and meaning of each horizon.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "Nyasha compares two fields on her family's farm near Gokwe. Field 1 is on a steep, rocky hillside; Field 2 is on gently sloping land at the foot of the same hill.",
    hints: ["Topography is one of the five factors of soil formation.", "What happens to soil on a steep slope during heavy rain?"],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which field is likely to have the deeper soil?",
        options: [
          ["Field 2, at the foot of the hill", "Correct: soil washed off the slope collects at the foot."],
          ["Field 1, on the steep hillside", "Steep slopes lose soil by erosion, so the soil stays shallow."],
          ["Both fields equally, because the rock is the same", "The same rock does not mean the same depth: slope matters."],
          ["Neither field, because hillside soils are too young to form", "Soils form on both; the slope decides how much stays."],
        ],
        answer: "A",
        explanation: "Topography controls soil depth: erosion thins soils on steep slopes and deposition thickens them below.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain your answer to (a).",
        points: [
          "On the steep slope runoff erodes soil about as fast as it forms, so the soil stays shallow.",
          "The eroded soil is deposited at the foot of the slope, so the soil there is deeper.",
        ],
        explanation: "Removal on slopes and deposition at the foot.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Apart from topography, state **three** other factors that affect the kind of soil that forms.",
        points: ["Parent material (parent rock).", "Climate (rainfall and temperature).", "Living organisms (vegetation, animals, micro-organisms) or time."],
        explanation: "The five factors are parent material, climate, living organisms, topography and time.",
      }),
    ],
    explanation: "Soil depth on a hillside is explained by erosion on the slope and deposition below it.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "Discuss how the five factors of soil formation explain why the soils of a farm differ from one field to another.",
    hints: ["Take each factor in turn and give a farm example.", "Finish by saying which factors matter most on one farm, where the climate is the same everywhere."],
    points: [
      "Parent material: fields on granite are sandy; fields on basalt or dolerite are heavier clays.",
      "Topography: slopes have shallow, eroded soils; low ground has deep, sometimes waterlogged soils.",
      "Living organisms: fields under long-term grass or woodland have more humus than long-cultivated fields.",
      "Time: older, stable land surfaces have deeper soils with clearer horizons than young, recently exposed ones.",
      "Climate is usually the same across one farm, so it explains differences between regions rather than between fields.",
      "Judgement: on one farm parent material and topography usually explain most of the difference.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Parent material differs across a farm: a field over granite has coarse, sandy soil while a field over a dolerite dyke has red clay. Topography matters too: on a slope erosion keeps the soil shallow and stony, while the vlei at the bottom has deep, grey soil that becomes waterlogged. Living organisms affect humus: land kept under grass for years has darker topsoil than a field cropped every year. Time matters where rock has been recently exposed by erosion and the soil is young and thin. Climate is the same on one farm, so it explains differences between natural regions rather than between fields. On one farm, parent material and topography explain most of the differences.",
    explanation: "A good answer applies each factor to fields on one farm and recognises that climate varies little over a small area.",
  });

  b.card("DEFINITION", "Weathering", "The breakdown of rock into smaller particles where it lies, by physical, chemical and biological processes.", "Erosion carries the particles away; weathering does not.");
  b.card("CONCEPT", "Physical weathering", "Breaks rock into smaller pieces with no chemical change: heating and cooling (exfoliation), freeze-thaw, abrasion by water and wind.");
  b.card("CONCEPT", "Chemical weathering", "Changes minerals into new substances: hydrolysis (feldspar → clay), oxidation (iron → iron oxide), carbonation (carbonic acid dissolves limestone).");
  b.card("CONCEPT", "Biological weathering", "Living things break rock: roots widen cracks, lichens produce acids, termites and earthworms mix soil, micro-organisms release acids and CO₂.");
  b.card("FACT", "The five factors of soil formation", "Parent material, climate, living organisms, topography (relief) and time.");
  b.card("FACT", "Horizons of a soil profile", "A = topsoil, B = subsoil, C = parent material, then bedrock.");
  b.card("CONCEPT", "Why topsoil is dark", "It contains most of the humus, from plant and animal remains decomposed at the surface.");
  b.card("FACT", "What does a grey, mottled subsoil show?", "Poor drainage: water stands in the soil and iron is reduced. Red-brown subsoil shows good drainage and aeration.");
  b.card("FACT", "Granite versus dolerite soils", "Granite (quartz-rich) weathers to pale, sandy soils; dolerite and basalt weather to red or dark clay soils.");
});
