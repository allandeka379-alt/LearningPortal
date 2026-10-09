// W1a: hist.egypt.civilisation (ZIMSEC topic 3). BCE dates run backwards, so the chronology item is built by hand
// (timeline() orders by ascending year number).
import { concept, P, source, levels } from "../lib.mjs";

const POS = ["1st (earliest)", "2nd", "3rd", "4th (latest)"];

concept("hist.egypt.civilisation", { file: "egypt/civilisation", keyPrefix: "egypt.civilisation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What was the title of the king of ancient Egypt?",
    options: [
      ["Pharaoh", "Correct: the pharaoh was believed to be a god-king."],
      ["Vizier", "The vizier was the pharaoh's chief minister."],
      ["Scribe", "Scribes kept records and collected taxes."],
      ["Mutapa", "The Mutapa was the ruler of a Zimbabwean state many centuries later."],
    ],
    answer: "A",
    explanation: "The pharaoh ruled with complete authority; the vizier ran the government for him; scribes kept the records.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which direction does the River Nile flow?",
    options: [
      ["From south to north, into the Mediterranean Sea", "Correct: so the south is called Upper Egypt and the northern delta Lower Egypt."],
      ["From north to south, through the desert into the Indian Ocean", "The Nile rises in the south and flows north."],
      ["From east to west, into the Atlantic Ocean", "The Nile flows north to the Mediterranean."],
      ["From west to east, into the Red Sea", "The Nile does not flow into the Red Sea."],
    ],
    answer: "A",
    explanation: "The Nile flows north into the Mediterranean, forming a delta. Upper Egypt (the valley) is in the south; Lower Egypt (the delta) is in the north.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What was a **shaduf** used for in ancient Egypt?",
    options: [
      ["Lifting water onto the fields", "Correct: a pole with a bucket and a counterweight."],
      ["Writing hieroglyphs on papyrus", "Scribes wrote with reed pens; a shaduf is for water."],
      ["Preserving bodies for the afterlife", "That was mummification."],
      ["Measuring the height of the pyramids", "A shaduf is an irrigation device."],
    ],
    answer: "A",
    explanation: "The shaduf lifted water to gardens and fields, especially in the dry season when the river was low.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "During which Egyptian season did the Nile flood the fields?",
    options: [
      ["Akhet", "Correct: Akhet was the season of inundation (flood)."],
      ["Peret", "Peret was the growing season, when seed was sown in the wet silt."],
      ["Shemu", "Shemu was the harvest season, when the river was lowest."],
      ["Kush", "Kush was a kingdom to the south of Egypt, not a season."],
    ],
    answer: "A",
    explanation: "Three seasons of four months: Akhet (flood), Peret (growing), Shemu (harvest).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did the Egyptians practise **mummification**?",
    options: [
      ["They believed the body was needed in the afterlife", "Correct: preserving the body was part of their belief in life after death."],
      ["They wanted to stop diseases spreading from dead bodies", "This was not the purpose; the practice was religious."],
      ["Burial in the ground was forbidden by law", "Ordinary people were buried in the ground; mummification was about the afterlife."],
      ["It was a way of punishing criminals after death", "Mummification honoured the dead and prepared them for the afterlife."],
    ],
    answer: "A",
    explanation: "Egyptians believed in life after death and that the body had to be preserved for it. The process took about seventy days.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which object helped scholars to **decipher** Egyptian hieroglyphs in the 1820s?",
    options: [
      ["The Rosetta Stone, with one text in Egyptian scripts and Greek", "Correct: because Greek could be read, the hieroglyphs could be worked out."],
      ["The Great Pyramid of Khufu, which has hieroglyphs on every stone", "The pyramid did not provide a translation key."],
      ["The Edwin Smith papyrus, which is a dictionary of signs", "It is a medical papyrus about injuries and surgery."],
      ["The shaduf, which was labelled in several languages", "The shaduf is an irrigation device."],
    ],
    answer: "A",
    hints: ["To read an unknown script, what would you need?", "A text in a known language placed beside it."],
    explanation: "The Rosetta Stone carries one decree in hieroglyphs, a later Egyptian script and Greek. Jean-François Champollion used it to decipher hieroglyphs in the 1820s.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement **best explains** why ancient Egypt developed a calendar of 365 days?",
    options: [
      ["People needed to predict the yearly Nile flood, which they did by watching the stars", "Correct: the calendar grew from the needs of flood farming."],
      ["The pharaoh ordered that every year should have exactly as many days as there were gods", "This is invented; the calendar came from observing the sky and the flood."],
      ["The Greeks taught the Egyptians to count the days of the year", "Egypt's calendar was older; it influenced others."],
      ["Builders needed to know how many days it took to finish a pyramid", "Building projects were organised by season, but the calendar came from predicting the flood."],
    ],
    answer: "A",
    hints: ["What event was most important to plan for each year?"],
    explanation: "Predicting the flood mattered to every farmer and to the state's taxes, so astronomers worked out a year of 365 days: twelve months of thirty days plus five extra days.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which kingdom, to the **south** of Egypt in present-day Sudan, adopted many Egyptian ideas and built its own pyramids?",
    options: [
      ["Kush", "Correct: the kings of Kush built pyramids and for a time ruled Egypt."],
      ["Greece", "Greece is across the Mediterranean to the north."],
      ["Mutapa", "Mutapa was a Zimbabwean state of the fifteenth century CE onwards."],
      ["Rome", "Rome lay to the north-west, across the Mediterranean, and conquered Egypt in 30 BCE."],
    ],
    answer: "A",
    hints: ["The kingdom was in Nubia, along the Nile south of Egypt."],
    explanation: "Kush (Nubia) traded and fought with Egypt, adopted Egyptian religion and building styles, and its kings ruled Egypt for a period.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The pyramids of Egypt were royal tombs.",
    answer: true,
    explanation: "True. They were built as tombs for pharaohs. Temples such as Karnak were places of worship.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Most people in ancient Egypt were scribes and priests.",
    answer: false,
    explanation: "False. Most Egyptians were farmers. The farming surplus is what allowed a smaller number of scribes, priests and craftsmen to specialise.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each Egyptian achievement with its description.",
    pairs: [
      ["Hieroglyphics", "Writing with picture signs"],
      ["Papyrus", "Paper-like material made from reeds"],
      ["Basin irrigation", "Trapping floodwater in earth-banked fields"],
      ["Mummification", "Preserving the body for the afterlife"],
    ],
    explanation: "These are the key terms of Egyptian civilisation: writing (hieroglyphics), writing material (papyrus), farming (basin irrigation) and religion (mummification).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each member of Egyptian society with their role.",
    pairs: [
      ["Pharaoh", "God-king with complete authority"],
      ["Vizier", "Chief minister who ran the government"],
      ["Scribe", "Kept records and calculated taxes"],
      ["Farmer", "Grew crops and worked on royal projects in the flood season"],
    ],
    explanation: "Egyptian society was a pyramid: the pharaoh at the top, then the vizier and nobles, priests and scribes, craftsmen, and a large farming majority.",
  });
  {
    // Chronological order (earliest first): unification c. 3100 BCE; Great Pyramid c. 2560 BCE; New Kingdom from c. 1550 BCE; Roman conquest 30 BCE.
    const events = [
      "Upper and Lower Egypt are united under one king",
      "The Great Pyramid of Khufu is completed at Giza",
      "The New Kingdom begins: royal tombs are cut in the Valley of the Kings",
      "Egypt becomes a province of the Roman Empire",
    ];
    const order = [2, 0, 3, 1];
    b.match({
      d: 3, skill: "UNDERSTANDING",
      stem: "Put these events in the history of ancient Egypt in chronological order. (Remember: with BCE dates, the larger number is earlier.)",
      pairs: order.map((i) => events[i]),
      right: POS,
      rightIndex: order,
      hints: ["Unification came before any of the great building projects.", "Rome conquered Egypt at the very end of the ancient period."],
      explanation: "Unification (about 3100 BCE), the Great Pyramid (about 2560 BCE), the New Kingdom (about 1550-1070 BCE), Roman rule (from 30 BCE).",
    });
  }
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The Egyptian calendar had {{blank:a}} days: twelve months of thirty days plus {{blank:b}} extra days.",
    blanks: [
      { id: "a", accepted: ["365"], choices: ["360", "365", "354", "366"] },
      { id: "b", accepted: ["five"], choices: ["three", "five", "six", "ten"] },
    ],
    explanation: "12 × 30 = 360 days, plus 5 extra days = 365. It later influenced the Roman calendar.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the sun god of ancient Egypt.",
    accepted: ["Ra", "Re", "Amun-Ra", "Amun-Re", "Amon-Ra"],
    wrong: ["Osiris", "Anubis"],
    explanation: "**Ra** (also written Re) was the sun god. Osiris was god of the dead and the afterlife.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe **five** ways in which the River Nile helped the development of Egyptian civilisation.",
    points: [
      "The yearly flood left fertile silt for crops",
      "It provided water for irrigation in a desert land",
      "It was a transport route for boats carrying goods and stone",
      "It provided fish, papyrus reeds and clay",
      "Managing the flood encouraged government, record-keeping, mathematics and the calendar",
    ],
    modelAnswer: "The Nile flooded every year and left rich black silt, so crops grew well. It supplied water for irrigation in a desert country. Boats used it to carry grain, stone and trade goods. It provided fish to eat, papyrus reeds for writing material and clay for bricks. Planning for the flood led to government, record-keeping, mathematics and a calendar.",
    explanation: "One mark for each distinct way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the methods the Egyptians used to farm the Nile valley.",
    points: [
      "They planted in the silt after the flood (following the seasons of Akhet, Peret, Shemu)",
      "Basin irrigation: floodwater was trapped in earth-banked fields",
      "Canals carried water further from the river / the shaduf lifted water in the dry season",
      "They grew wheat, barley and flax, kept livestock and stored grain in granaries",
    ],
    hints: ["Start with the flood, then the methods of controlling water."],
    modelAnswer: "Farmers followed three seasons: after the flood (Akhet) they sowed seed in the wet silt (Peret) and harvested in Shemu. They used basin irrigation, trapping floodwater in fields with earth banks, and dug canals to take water further. In the dry season they lifted water with the shaduf. They grew wheat, barley and flax, kept cattle and goats, and stored grain in granaries.",
    explanation: "One mark per method described.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how the Egyptian farming surplus made other achievements possible.",
    points: [
      ["Surplus food fed people who did not farm, allowing specialists (scribes, priests, craftsmen, builders)", 2],
      ["Storing and taxing the surplus required government and record-keeping, which encouraged writing and mathematics", 2],
      ["A wealthy state could organise labour (farmers in the flood season) to build pyramids and temples", 2],
    ],
    hints: ["Who could be fed if farmers grew more than they needed?", "What did the state need in order to collect and store the grain?"],
    modelAnswer: "Because the flood made farming very productive, farmers grew more than they needed. This surplus fed people who did not farm, so scribes, priests, doctors and craftsmen could specialise. To store and tax the grain, the state needed officials and records, which encouraged writing and mathematics. The wealth from the surplus, and the farmers who were free during the flood season, allowed the pharaohs to build pyramids and temples.",
    explanation: "Each link in the chain (surplus → specialists → records → building) must be explained.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: [
      "Study the source and answer the questions.",
      "",
      source("Source A", "a wall painting from an Egyptian tomb, of the kind found in many tombs, described in words",
        "Men are cutting tall grain with sickles while a scribe sits on a mat writing on a roll. In the next scene, workers carry baskets of grain to a large storehouse, and an official stands at the door counting the baskets.", { described: true }),
    ].join("\n"),
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** activities shown in Source A.", points: ["Harvesting grain with sickles", "Recording/counting the harvest or carrying grain to a storehouse"] }),
      P.manual({ label: "(b)", marks: 4, stem: "What can be inferred from Source A about how the Egyptian state was organised?", points: [["Scribes recorded the harvest, showing a system of writing and record-keeping used for taxes", 2], ["Grain was stored centrally under officials, showing organised government control of the surplus", 2]] }),
      P.manual({ label: "(c)", marks: 6, stem: "How useful is a tomb painting like Source A as evidence about farming in ancient Egypt?", type: "EXTENDED_RESPONSE", points: [["Useful: produced at the time; shows tools, crops and the role of officials", 2], ["Limits: made for a tomb to show an ideal afterlife or the owner's importance, so it may show an orderly, idealised scene; does not show hardship", 2], ["Judgement supported by own knowledge (e.g. seasons, granaries, scribes and taxes)", 2]], levels: levels(6), modelAnswer: "The painting is useful because it was made in ancient Egypt and shows real tools such as sickles, the crop being harvested, and scribes and officials counting grain, which fits what we know about granaries and taxes. However, it was painted in a tomb to show the dead person's wealth or an ideal afterlife, so the scene is orderly and does not show the hard work of farmers, poor harvests or disputes. Overall it is useful evidence of methods and organisation, but it should be checked against other sources such as written records." }),
    ],
    hints: ["Why were paintings put in tombs?", "Does the scene show any problems or hardship?"],
    explanation: "Tomb paintings are primary evidence of tools and organisation, but their religious purpose means they may show an idealised picture.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true,
    stem: "Answer all parts about the achievements of ancient Egypt.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "State **four** achievements of ancient Egyptian civilisation.", points: ["Hieroglyphic writing / papyrus", "The 365-day calendar / astronomy", "Medicine (e.g. surgery, herbal remedies recorded on papyrus)", "Pyramids and temples / mathematics / mummification"] }),
      P.manual({ label: "(b)", marks: 4, stem: "Describe the influence of Egyptian civilisation on **two** other peoples.", points: [["Kush (Nubia): adopted Egyptian religion and built pyramids", 2], ["Greece or Rome: learned from Egyptian mathematics, medicine and astronomy; the calendar shaped the Roman calendar", 2]] }),
      P.manual({ label: "(c)", marks: 8, stem: "\"The pyramids were ancient Egypt's greatest achievement.\" How far do you agree?", type: "EXTENDED_RESPONSE", points: [["For: engineering, mathematics and organisation of labour; lasting fame", 2], ["For (developed): show the power of the pharaoh and religious belief in the afterlife", 2], ["Against: writing, the calendar and medicine had a wider and longer influence on other peoples", 2], ["Supported judgement", 2]], levels: levels(8), modelAnswer: "The pyramids were an enormous achievement. The Great Pyramid at Giza needed advanced mathematics, careful planning and the organisation of thousands of workers, and it shows the power of the pharaoh and the Egyptians' belief in the afterlife. It is still famous throughout the world. However, other achievements were arguably greater because they influenced more people for longer. Hieroglyphic writing on papyrus allowed records and knowledge to be kept, the 365-day calendar shaped the Roman calendar, and Egyptian medicine and geometry were studied by the Greeks. So the pyramids are the most visible achievement, but the knowledge that made them possible was more important in the long run." }),
    ],
    hints: ["In (c), compare the pyramids with achievements that spread to other peoples."],
    explanation: "A strong answer weighs the pyramids against other achievements and judges by a stated measure, such as lasting influence.",
  });

  b.card("DEFINITION", "What is a **civilisation**?", "An advanced way of life with organised government, towns, specialised workers, writing or records, organised religion and achievements in science, art and building.");
  b.card("FACT", "When were Upper and Lower Egypt united?", "Around 3100 BCE.");
  b.card("FACT", "Name the three Egyptian seasons.", "Akhet (flood), Peret (growing), Shemu (harvest).");
  b.card("DEFINITION", "What is a **shaduf**?", "A water-lifting device: a pole on a frame with a bucket at one end and a counterweight at the other.");
  b.card("DEFINITION", "What is **basin irrigation**?", "Trapping Nile floodwater in fields surrounded by earth banks so it soaks into the soil.");
  b.card("FACT", "What was papyrus?", "A paper-like writing material made from reeds that grew by the Nile.");
  b.card("FACT", "Who designed the Step Pyramid of Djoser?", "Imhotep.");
  b.card("FACT", "How many days did the Egyptian calendar have?", "365: twelve months of thirty days plus five extra days.");
  b.card("CONCEPT", "Why is the Nile called the gift that made Egypt?", "Its yearly flood left fertile silt and water in a desert; it also gave transport, fish, papyrus and clay.");
  b.card("FACT", "Which object helped decipher hieroglyphs?", "The Rosetta Stone (the same text in Egyptian scripts and Greek); Champollion deciphered them in the 1820s.");
});
