// W4b: Land degradation (her.global.land-degradation).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.global.land-degradation", { file: "global/land-degradation", keyPrefix: "global.land-degradation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **land degradation**?",
    options: [
      ["a decline in the quality and productivity of land", "Correct: the land supports less than before."],
      ["the transfer of land from one owner to another through sale or inheritance", "This is a change of ownership, not of quality."],
      ["the planting of trees on bare land", "This is afforestation, a remedy."],
      ["the division of land into provinces", "This is administration, not land quality."],
    ],
    answer: "A",
    explanation: "Land degradation is a fall in land quality and productivity.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Keeping more cattle on a piece of land than its grass can support is called",
    options: [
      ["overgrazing", "Correct: the grass is eaten faster than it grows."],
      ["afforestation", "Afforestation is planting trees."],
      ["crop rotation", "Crop rotation changes crops each season."],
      ["irrigation", "Irrigation supplies water to crops."],
    ],
    answer: "A",
    explanation: "Overgrazing destroys the grass cover and leaves the soil bare.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is **siltation**?",
    options: [
      ["the filling of rivers and dams with soil washed from the land", "Correct: silt reduces the water they can hold."],
      ["the spread of desert-like conditions in dry areas", "This is desertification."],
      ["the burning of grass in the dry season", "This describes a veld fire."],
      ["the poisoning of river water with chemicals released from a factory pipe", "This is water pollution."],
    ],
    answer: "A",
    explanation: "Siltation is the build-up of soil and sand in rivers and dams.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which farming practice **reduces** soil erosion on a sloping field?",
    options: [
      ["building contour ridges across the slope", "Correct: ridges slow running water."],
      ["ploughing up and down the slope", "This speeds water flow and increases erosion."],
      ["burning crop stalks after harvest", "This leaves the soil bare."],
      ["cultivating right up to the river bank", "This causes bank erosion and siltation."],
    ],
    answer: "A",
    explanation: "Contour ridges run across the slope and slow water so it soaks in instead of carrying soil away.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which of the following is an **effect** of land degradation rather than a cause?",
    options: [
      ["loss of soil fertility", "Correct: this results from degradation."],
      ["overgrazing by goats and cattle", "Overgrazing is a cause."],
      ["illegal gold panning in riverbeds", "Gold panning is a cause."],
      ["veld fires in the dry season", "Veld fires are a cause."],
    ],
    answer: "A",
    explanation: "Overgrazing, panning and fires cause degradation; loss of fertility is what follows.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A dam that supplies a fictional village near Gwanda dries up earlier each year, although rainfall has not changed much. Which is the **most likely** explanation?",
    options: [
      ["soil eroded from bare slopes has filled the dam with silt", "Correct: siltation reduces the dam's capacity."],
      ["the village has started recycling plastic bottles", "Recycling does not affect a dam's capacity."],
      ["the council has repaired the village water pipes", "Repairs would save water, not lose it."],
      ["villagers have begun rotational grazing on the slopes above the dam this year", "Rotational grazing protects slopes."],
    ],
    answer: "A",
    hints: ["Rain is unchanged, so what has changed inside the dam?"],
    explanation: "Silt from eroded land reduces the dam's depth, so it holds less water and dries up sooner.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which measure tackles land degradation caused by **overgrazing**?",
    options: [
      ["rotational grazing and keeping fewer animals", "Correct: grass gets time to recover."],
      ["building more houses on grazing land", "Building removes grazing land."],
      ["burning old grass so new grass appears", "Burning leaves soil bare and can spread fires."],
      ["using more mercury when panning for gold", "Mercury pollutes and has nothing to do with grazing."],
    ],
    answer: "A",
    hints: ["Which measure gives the grass a rest?"],
    explanation: "Rotational grazing and destocking reduce pressure on the grass so the soil stays covered.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why did colonial land policy contribute to land degradation in many communal areas?",
    options: [
      ["Many African families were crowded onto smaller areas of poorer land", "Correct: high pressure on poor land led to overgrazing and erosion."],
      ["Colonial laws gave African farmers more land than they could use, so it was left unused", "The opposite happened: Africans were moved onto less land."],
      ["Colonial rule banned the keeping of cattle in all communal areas from 1930", "No such total ban existed."],
      ["Colonial rule ended all farming in Zimbabwe", "Farming continued throughout."],
    ],
    answer: "A",
    hints: ["Think about the Land Apportionment Act of 1930."],
    explanation: "Laws such as the Land Apportionment Act (1930) crowded African families onto poorer land, increasing pressure on soils and grazing.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Soil erosion is the removal of topsoil by water or wind.",
    answer: true,
    explanation: "True. Water and wind remove topsoil, especially from bare land.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Once topsoil is lost to erosion, it forms again within one or two rainy seasons.",
    answer: false,
    explanation: "False. Topsoil forms very slowly and cannot be replaced in a human lifetime.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cause of land degradation with a measure that tackles it.",
    pairs: [
      ["deforestation", "planting trees (afforestation)"],
      ["overgrazing", "rotational grazing"],
      ["ploughing up and down slopes", "contour ridges"],
      ["veld fires", "fire guards and fire awareness"],
    ],
    explanation: "Each measure removes or reduces the cause it is matched with.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the chain of effects.",
    template: "Trees are cut down, so the soil is left {{blank:a}}. Heavy rain washes the topsoil away, which is called {{blank:b}}. The soil fills the dam, which is called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["bare"], choices: ["bare", "fertile", "wet", "covered"] },
      { id: "b", accepted: ["soil erosion"], choices: ["soil erosion", "irrigation", "afforestation", "recycling"] },
      { id: "c", accepted: ["siltation"], choices: ["siltation", "desertification", "pollution", "rotation"] },
    ],
    hints: ["Each blank is one link in the chain from cause to effect."],
    explanation: "Deforestation leaves soil bare; rain causes erosion; the eroded soil causes siltation.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "Identify **four** causes of land degradation in Zimbabwe.",
    points: [
      "Any one of: deforestation, overgrazing, poor farming methods (ploughing down slopes, monocropping, stream-bank cultivation), veld fires, illegal gold panning, sand/clay extraction, urban expansion",
      "A second different cause",
      "A third different cause",
      "A fourth different cause",
    ],
    modelAnswer: "Deforestation, overgrazing, veld fires and illegal gold panning.",
    explanation: "One mark per correct cause.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 6,
    stem: "Explain how **three** human activities cause land degradation.",
    points: [
      "Activity 1, e.g. overgrazing",
      "Process: grass is eaten to the roots; bare, trampled soil is washed away",
      "Activity 2, e.g. veld fires / deforestation",
      "Process: vegetation that protects the soil is removed before the rains",
      "Activity 3, e.g. gold panning / poor farming / urban expansion",
      "Process: e.g. pits and trenches left open and riverbanks broken; or ploughing down slopes speeds run-off",
    ],
    modelAnswer: "Overgrazing: too many animals eat grass to the roots and trample the soil, so it is washed away. Veld fires burn the grass and young trees, leaving the soil bare when the first heavy rains fall. Illegal gold panning digs pits and trenches that are left open and breaks riverbanks, so gullies form and rivers silt up.",
    hints: ["For each activity, say what happens to the soil cover."],
    explanation: "One mark for each activity and one for explaining the process.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Farai's family field has growing gullies. Suggest **two** things the family could do and explain how each would help.",
    points: [
      "Suggests filling/blocking gullies with stones and brush and planting grass",
      "Explains that this slows water and traps soil so the gully stops growing",
      "Suggests contour ridges / planting basins and mulching / planting trees",
      "Explains that this slows run-off or keeps soil covered so less soil is washed away",
    ],
    modelAnswer: "They could pack stones and brush into the gullies and plant grass along the edges, which slows the water and traps soil so the gullies stop growing. They could also build contour ridges across the field, so rainwater soaks in instead of rushing down the slope.",
    hints: ["Repair the damage and stop the cause."],
    explanation: "One mark for each suitable measure and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: source("Source A", "a description of a photograph of the kind used in an agriculture textbook (described in words)",
      "A hillside with almost no grass. Several goats graze among stones. Deep channels run down the slope to a field at the bottom, where maize plants are half buried in sand. In the distance, a dam shows a wide band of dry, cracked mud around a small pool of water.", { described: true }) +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which cause of land degradation is **most clearly** shown in the source?",
        options: [
          ["overgrazing by goats", "Correct: goats graze a hillside with almost no grass."],
          ["illegal gold panning", "No pits or panners are described."],
          ["urban expansion", "No buildings or roads are described."],
          ["pollution by factory effluent", "No factory is described."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** effects of land degradation shown in the source.",
        points: ["Gullies / soil erosion on the slope", "Sand covering crops or siltation of the dam"],
        modelAnswer: "Gullies on the slope and siltation of the dam (also maize buried in sand).",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the problem on the hillside has affected the dam.",
        points: [
          "Bare soil on the slope is washed away by rain",
          "The water carries the soil down the gullies into the dam",
          "The dam fills with silt, holds less water and dries up sooner",
        ],
        modelAnswer: "With little grass, the soil on the slope is washed away by rain. The run-off carries the soil down the gullies into the dam. The dam fills with silt, so it holds less water and shrinks to a small pool in the dry season.",
      }),
    ],
    hints: ["In (c), follow the soil from the hillside to the dam."],
    explanation: "A source-based practice item on the chain from cause to effect in land degradation.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "This question is about measures against land degradation.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe **two** measures used to reduce land degradation.",
        points: [
          "Measure 1, e.g. afforestation",
          "Described: how it protects the land",
          "Measure 2, e.g. contour ridges, rotational grazing, conservation farming, laws against panning and fires",
          "Described: how it protects the land",
        ],
        modelAnswer: "Afforestation means planting trees on bare land; their roots bind the soil and their leaves break the force of the rain. Contour ridges are banks of earth built across a slope; they slow run-off so water soaks in and soil stays in the field.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Land degradation in Zimbabwe can be stopped by laws alone.\" Discuss.",
        points: [
          ["Role of laws: EMA action against panning, fires, stream-bank cultivation; rehabilitation of mined land", 2],
          ["Limits: poverty and land pressure, weak enforcement, too few officers, people unaware", 2],
          ["Other measures: conservation farming, contour ridges, rotational grazing, tree planting, extension advice, community by-laws", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Laws help. EMA and councils can act against illegal gold panning, veld fires and cultivation of river banks, and miners must rehabilitate land they disturb. Fear of fines stops some people.\n\nBut laws cannot reach every field and hillside. Many families cultivate slopes or keep many animals because they are poor and have little land; enforcing a law does not give them another choice. There are also too few officers to patrol everywhere.\n\nPractical measures are needed too: contour ridges, conservation farming, rotational grazing and tree planting, supported by extension officers and by community by-laws that people have agreed to.\n\nI disagree with the statement. Laws are one tool, but land degradation is reduced mainly when farmers have the knowledge, support and reasons to protect their own land.",
      }),
    ],
    hints: ["In (b), ask why people damage land in the first place."],
    explanation: "A practice evaluative item on measures against land degradation.",
  });

  b.card("DEFINITION", "Land degradation", "A decline in the quality and productivity of land.");
  b.card("DEFINITION", "Soil erosion", "The removal of topsoil by water or wind faster than new soil forms.");
  b.card("DEFINITION", "Siltation", "The filling of rivers and dams with soil washed from the land.");
  b.card("DEFINITION", "Desertification", "The process by which land in dry areas becomes more like a desert, mainly through human activity and drought.");
  b.card("DEFINITION", "Overgrazing", "Keeping more livestock on land than its grass can support.");
  b.card("CONCEPT", "How do contour ridges reduce erosion?", "They run across the slope and slow run-off, so water soaks in instead of carrying soil away.");
  b.card("CONCEPT", "Name four causes of land degradation.", "Deforestation, overgrazing, veld fires, illegal gold panning (also poor farming, sand extraction, urban expansion).");
  b.card("CONCEPT", "Name four measures against land degradation.", "Afforestation, contour ridges, rotational grazing, conservation farming (also gully repair, fire guards, laws).");
  b.card("CONCEPT", "Why is soil erosion called an effect, not a cause?", "It results from activities such as overgrazing and deforestation that leave soil bare.");
});
