// Slice G2a: rocks (ZIMSEC-only concept).
import { concept, P, geographyLevels } from "../lib.mjs";

const SAMPLES = "| Sample (fictional) | Crystals | Layers | Fossils | Reaction with dilute acid | Notes |\n|---|---|---|---|---|---|\n| W | Large, interlocking; pink, white and black | None | None | None | From a dome-shaped hill |\n| X | None visible; sand grains cemented together | Yes | Rare | None | From a river cliff |\n| Y | Very small; dark grey to black | None | None | None | From an old lava flow |\n| Z | Interlocking, sugary; white | None | None | Fizzes | From near an old intrusion in limestone country |";

concept("geo.landforms.rocks", { file: "landforms/rocks", keyPrefix: "landforms.rocks" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Igneous rocks form when:",
    options: [
      ["magma or lava cools and solidifies", "Correct: 'igneous' comes from the Latin for fire."],
      ["layers of sediment are compacted and cemented", "That is how sedimentary rocks form."],
      ["existing rocks are changed by heat and pressure", "That is how metamorphic rocks form."],
      ["plant remains are buried in swamps", "Buried plant remains become coal, a sedimentary rock."],
    ],
    answer: "A",
    explanation: "**Igneous** rocks crystallise from molten rock: magma underground or lava at the surface.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which rock is **metamorphic**?",
    options: [
      ["Marble", "Correct: limestone changed by heat and pressure."],
      ["Granite", "Granite is an intrusive igneous rock."],
      ["Sandstone", "Sandstone is a sedimentary rock of cemented sand."],
      ["Basalt", "Basalt is an extrusive igneous rock."],
    ],
    answer: "A",
    explanation: "**Marble** forms when limestone recrystallises under heat and pressure.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does granite have **larger** crystals than basalt?",
    options: [
      ["It cooled slowly, deep underground", "Correct: slow cooling gives crystals time to grow."],
      ["It cooled quickly at the surface", "Fast cooling at the surface gives small crystals, as in basalt."],
      ["It was squeezed by great pressure", "Pressure changes rocks into metamorphic rocks; it does not explain igneous crystal size."],
      ["It formed from layers of sand", "Layers of sand form sandstone, a sedimentary rock."],
    ],
    answer: "A",
    explanation: "Granite is **intrusive**: magma cooled slowly underground, so large crystals grew. Basalt is **extrusive**: lava cooled fast, giving tiny crystals.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which feature is most typical of **sedimentary** rocks?",
    options: [
      ["Layers (strata) that may contain fossils", "Correct: they build up layer by layer."],
      ["Large interlocking crystals", "Interlocking crystals are typical of igneous rocks such as granite."],
      ["Bands of crystals formed by pressure", "Banding by pressure is typical of metamorphic rocks such as gneiss."],
      ["Glassy texture from rapid cooling", "Glassy textures come from lava cooling very fast."],
    ],
    answer: "A",
    explanation: "Sedimentary rocks are laid down in **strata** and can preserve **fossils** of animals and plants buried in the sediment.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which mineral resources is the **Great Dyke** best known for?",
    options: [
      ["Chrome, platinum and nickel", "Correct: the Dyke is a long igneous intrusion rich in these metals."],
      ["Coal and coal-bed methane", "Coal occurs in Karoo sedimentary rocks, e.g. at Hwange."],
      ["Diamonds and emeralds", "These are not the Great Dyke's main minerals."],
      ["Limestone and clay", "These are sedimentary materials, not the Dyke's igneous ores."],
    ],
    answer: "A",
    explanation: "The **Great Dyke** (about 550 km long) holds major deposits of chrome, platinum-group metals and nickel.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Zimbabwe's coal at Hwange occurs in which kind of rock?",
    options: [
      ["Karoo sedimentary rocks", "Correct: coal is an organic sedimentary rock."],
      ["Granite of the plateau", "Granite is igneous; coal cannot form in it."],
      ["Great Dyke intrusions", "The Dyke is igneous and holds metal ores, not coal."],
      ["Basalt lava flows", "Basalt is volcanic; coal forms from buried plants in sedimentary basins."],
    ],
    answer: "A",
    explanation: "Coal forms from plant remains buried and compacted in sedimentary basins; Hwange's coal is in **Karoo** sediments.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A white rock fizzes with dilute acid and has interlocking crystals but no layers or fossils. It was collected next to an old igneous intrusion. What is it most likely to be?",
    options: [
      ["Marble", "Correct: it reacts like limestone but has been recrystallised by the heat of the intrusion."],
      ["Limestone", "Limestone fizzes but is usually layered and may contain fossils; heat has changed this rock."],
      ["Quartzite", "Quartzite does not fizz with acid; it is metamorphosed sandstone."],
      ["Granite", "Granite does not fizz and is not white all through; it has quartz, feldspar and mica."],
    ],
    answer: "A",
    explanation: "Fizzing shows calcium carbonate; interlocking crystals, no layers and the nearby intrusion point to **marble**.",
    hints: ["Which rocks fizz with acid?", "What happens to limestone next to hot magma?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which pair correctly shows an original rock and the metamorphic rock it becomes?",
    options: [
      ["Shale becomes slate", "Correct: heat and pressure turn shale or mudstone into slate."],
      ["Sandstone becomes marble", "Sandstone becomes quartzite; marble comes from limestone."],
      ["Limestone becomes gneiss", "Limestone becomes marble; gneiss usually comes from granite."],
      ["Basalt becomes coal", "Coal forms from plant remains, not from basalt."],
    ],
    answer: "A",
    explanation: "Shale → slate; limestone → marble; sandstone → quartzite; granite → gneiss.",
    hints: ["Match each sedimentary rock with its changed form.", "Marble always starts as limestone."],
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A Form 2 class identified 40 rock samples from a school field trip (fictional data): 22 granite, 10 sandstone, 5 quartzite and 3 basalt. What percentage of the samples were **igneous**?",
    value: 62.5, unit: "%", tol: 0.05,
    wrong: [55, 7.5],
    explanation: "Igneous = granite + basalt = 22 + 3 = 25; 25 ÷ 40 × 100 = 62.5 %.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "In a fictional lake, sediment builds up at an average of 0.4 mm per year. How many years would it take to lay down a layer of sediment 2 m thick?",
    value: 5000, unit: "years",
    wrong: [800, 500],
    explanation: "2 m = 2,000 mm; 2,000 ÷ 0.4 = 5,000 years.",
    workedSolution: "1. Convert the thickness: 2 m = 2,000 mm.\n2. Years = thickness ÷ rate = 2,000 ÷ 0.4.\n3. = 5,000 years.",
    hints: ["Put both values in millimetres.", "Divide the thickness by the yearly rate."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the rock that forms from compressed and buried plant remains and is mined at Hwange.",
    accepted: ["coal"],
    wrong: ["limestone"],
    explanation: "**Coal**, an organic sedimentary rock.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sequence by which sedimentary rocks form.",
    template: "Older rocks are {{blank:a}} and eroded. The fragments are transported and {{blank:b}} in layers. The weight of the layers above {{blank:c}} them, and minerals in water {{blank:d}} the grains together.",
    blanks: [
      { id: "a", accepted: ["weathered"], wrong: "melted" },
      { id: "b", accepted: ["deposited", "laid down"], wrong: "erupted" },
      { id: "c", accepted: ["compacts", "compresses", "squeezes"], wrong: "melts" },
      { id: "d", accepted: ["cement", "bind", "glue"], wrong: "dissolve" },
    ],
    explanation: "Weathering → transport → deposition → compaction → cementation.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each original rock to the metamorphic rock it becomes.",
    pairs: [
      ["Limestone", "Marble"],
      ["Sandstone", "Quartzite"],
      ["Shale", "Slate"],
      ["Granite", "Gneiss"],
    ],
    explanation: "Heat and pressure recrystallise each rock: limestone → marble, sandstone → quartzite, shale → slate, granite → gneiss.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "True or false: basalt is an extrusive igneous rock with very small crystals.",
    answer: true,
    feedbackTrue: "Correct: lava cools fast at the surface, so crystals are tiny.",
    feedbackFalse: "Basalt is extrusive: lava cooled quickly at the surface, giving very small crystals.",
    explanation: "Basalt forms from lava cooling quickly; Victoria Falls is cut into Karoo basalt.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: metamorphic rocks form when existing rocks melt completely and then cool.",
    answer: false,
    feedbackFalse: "Correct: metamorphism changes rock by heat and pressure WITHOUT melting it; melting and cooling make igneous rock.",
    feedbackTrue: "If the rock melts and cools again, the new rock is igneous. Metamorphism happens without melting.",
    explanation: "Metamorphic rocks recrystallise in the solid state under heat and pressure.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe **three** uses of rocks in Zimbabwe, naming the rock in each case.",
    points: [
      "A named rock and use, e.g. granite for building stone / aggregate",
      "A second named rock and use, e.g. coal for thermal power at Hwange",
      "A third named rock and use, e.g. limestone for cement / steel flux / agricultural lime",
    ],
    modelAnswer: "Granite is quarried for building stone and crushed road aggregate; coal from Hwange fuels the thermal power station; limestone is made into cement and agricultural lime.",
    explanation: "One mark for each correctly named rock with a matching use.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Explain how a rock can move from the igneous group to the sedimentary group and then to the metamorphic group in the rock cycle.",
    points: [
      "Igneous rock at the surface is weathered and eroded into fragments",
      "Fragments are transported and deposited in layers",
      "Layers are compacted and cemented into sedimentary rock",
      "Deep burial (or nearby magma / plate collision) brings heat and pressure that change it into metamorphic rock",
    ],
    modelAnswer: "Granite exposed at the surface is weathered and eroded; rivers carry the sand and deposit it in layers in a lake. Buried under more sediment, the sand is compacted and cemented into sandstone. If it is later buried deeply or squeezed in a collision zone, heat and pressure recrystallise it into quartzite, a metamorphic rock.",
    explanation: "Four linked stages of the rock cycle.",
    hints: ["Start with weathering.", "What turns sediment into rock, and what changes rock without melting it?"],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "\"The geology of Zimbabwe is the foundation of its economy.\" Discuss this statement with reference to named rock types.",
    points: [
      "Great Dyke igneous rocks: chrome, platinum and nickel mining and exports",
      "Greenstone belts: most gold mines",
      "Karoo sediments: coal at Hwange for power and industry",
      "Granite and limestone: building materials, cement, quarrying; black granite exports",
      "Limits: agriculture and tourism also matter and depend on climate and soils as much as on rock; mining income varies with world prices",
      "Judgement, e.g. geology is a major foundation, especially for exports, but not the only one",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Zimbabwe's rocks support much of its economy. The Great Dyke, a long igneous intrusion, holds chrome, platinum and nickel, which are important exports. Most gold mines lie in the old greenstone belts between the granites. Coal from the Karoo sediments at Hwange fuels a power station and industry, while limestone is made into cement and granite is quarried for building, with dark 'black granite' exported from the Mutoko area. However, geology is not the whole story: farming depends on climate and soils, tourism on landscapes and wildlife, and mining income rises and falls with world prices. Soils themselves come from weathered rock, so geology also underlies farming indirectly. Overall the statement is largely true for exports and energy, but the economy rests on several foundations, not rocks alone.",
    explanation: "Credit named rocks linked to economic activities and a balanced conclusion.",
    hints: ["Link each rock group to a resource.", "Consider what else the economy depends on."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: `Table 1 shows observations of four rock samples (fictional data).\n\n${SAMPLES}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Which sample (W, X, Y or Z) is sedimentary?", accepted: ["X", "sample X"], wrong: ["Y"], explanation: "X has cemented sand grains and layers: sandstone." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the rock that sample Y is most likely to be.", accepted: ["basalt"], wrong: ["granite"], explanation: "Very small dark crystals from a lava flow: basalt." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which sample is most likely granite?", options: [
        ["W", "Correct: large interlocking crystals of quartz, feldspar and mica."],
        ["X", "X is made of cemented sand grains, so it is sedimentary."],
        ["Y", "Y has tiny crystals from a lava flow, so it is basalt."],
        ["Z", "Z fizzes with acid, so it contains calcium carbonate."],
      ], answer: "A", explanation: "Coarse, interlocking, multi-coloured crystals indicate granite." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain the difference in crystal size between samples W and Y.", points: [
        "W (granite) cooled slowly underground, so large crystals grew",
        "Y (basalt) cooled quickly at the surface as lava, so crystals stayed very small",
      ], modelAnswer: "W cooled slowly deep underground, giving crystals time to grow large; Y was lava that cooled quickly at the surface, so its crystals are tiny.", explanation: "Link crystal size to the rate of cooling." }),
      P.manual({ label: "(e)", marks: 2, stem: "Identify sample Z and explain how it formed.", points: [
        "Marble",
        "Limestone recrystallised by heat (and pressure) from the nearby intrusion",
      ], modelAnswer: "Z is marble: limestone next to the intrusion was baked by its heat and recrystallised.", explanation: "Fizzing plus interlocking crystals near an intrusion: marble." }),
    ],
    hints: ["Crystals mean igneous or metamorphic; grains and layers mean sedimentary.", "Which rocks react with acid?"],
    explanation: "Practice in classifying rocks from their properties.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "A description of part of Zimbabwe: granite hills rise above sandy fields on the plateau; 60 km to the east a narrow ridge of dark rock runs for a long distance north to south with chrome mines along it; far to the north-west, in a low valley, layered rocks with coal seams are cut by a river.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "The narrow ridge with chrome mines is most likely:", options: [
        ["the Great Dyke", "Correct: a long, narrow igneous intrusion rich in chrome."],
        ["a greenstone belt", "Greenstone belts are known mainly for gold."],
        ["a Karoo sandstone outcrop", "Karoo sediments hold coal, not chrome."],
        ["a granite dwala", "A dwala is a bare granite dome, not a long ridge."],
      ], answer: "A", explanation: "Chrome along a long narrow ridge points to the Great Dyke." }),
      P.manual({ label: "(b)", marks: 2, stem: "To which rock group do the coal-bearing layered rocks belong? Give a reason.", points: [
        "Sedimentary",
        "Reason: they are layered / coal forms from compacted plant remains",
      ], modelAnswer: "Sedimentary, because they are layered and contain coal, which forms from buried plant remains.", explanation: "Layers and coal identify sedimentary (Karoo) rocks." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest why the soils in the granite area are sandy.", points: [
        "Granite contains a lot of quartz",
        "Quartz resists weathering and is left as sand grains when feldspar and mica break down",
      ], modelAnswer: "Granite is rich in quartz, which resists chemical weathering; when the feldspar rots to clay and is washed out, the quartz grains remain as sand.", explanation: "Quartz survives weathering as sand." }),
      P.manual({ label: "(d)", marks: 3, stem: "State **one** economic use of each of the three rock areas described.", points: [
        "Granite area: building stone / aggregate / tourism of kopjes",
        "Great Dyke: chrome (or platinum, nickel) mining",
        "Valley sediments: coal mining for power or industry",
      ], modelAnswer: "Granite: quarried for building stone. Great Dyke: chrome mining. Valley sediments: coal for power generation.", explanation: "One use for each area." }),
    ],
    hints: ["Which feature is long, narrow and rich in chrome?", "Which mineral survives weathering of granite?"],
    explanation: "Practice in linking Zimbabwe's rock areas to their features and uses.",
  });

  b.card("DEFINITION", "Igneous rock", "Rock formed when magma or lava cools and solidifies, e.g. granite, dolerite, basalt.");
  b.card("DEFINITION", "Sedimentary rock", "Rock formed from layers of sediment that are compacted and cemented, e.g. sandstone, shale, limestone, coal.");
  b.card("DEFINITION", "Metamorphic rock", "An existing rock changed by great heat and/or pressure without melting, e.g. gneiss, marble, quartzite, slate.");
  b.card("CONCEPT", "Crystal size in igneous rocks", "Slow cooling underground gives large crystals (granite); fast cooling at the surface gives small crystals (basalt).");
  b.card("FACT", "Metamorphic pairs", "Limestone → marble; sandstone → quartzite; shale → slate; granite → gneiss.");
  b.card("FACT", "The Great Dyke", "A long igneous intrusion (about 550 km long, a few km wide) running roughly NNE-SSW across Zimbabwe; chrome, platinum and nickel.");
  b.card("FACT", "Karoo rocks in Zimbabwe", "Younger sedimentary rocks (sandstone, shale, coal) in the Zambezi valley and south-east lowveld, e.g. the Hwange coalfield, plus basalt lavas (Victoria Falls).");
  b.card("CONCEPT", "The rock cycle", "Weathering and erosion → deposition → compaction and cementation (sedimentary) → heat and pressure (metamorphic) → melting → cooling (igneous).");
  b.card("VOCABULARY", "Strata", "Layers (beds) of sedimentary rock; singular stratum.");
});
