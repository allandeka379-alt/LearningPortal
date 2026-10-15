// W3a: coastal.dunes-saltmarsh-mangrove (Cambridge only, A Level Paper 3 option 8). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3a-_q.mjs";

// Singles
const netGain = chk(7 - 4.5, 2.5, 1e-9);
const yearsGain = chk(80 / 2.5, 32, 1e-9);
const mangPct = chk(((7500 - 5850) / 7500) * 100, 22, 1e-9);
const duneRate = chk((3.5 - 0.5) / 12, 0.25, 1e-9);
// Struct 1: dune transect
const TR = [["A", "Embryo dune", 20, "0.8", "8.4", "0.3", 12], ["B", "Foredune", 60, "3.6", "7.9", "0.8", 52], ["C", "Fixed dune", 120, "2.8", "6.8", "2.1", 88], ["D", "Dune heath", 200, "2.2", "5.6", "4.5", 97]];
const TRTAB = tbl(["Site", "Dune type", "Distance from sea (m)", "Height (m)", "Soil pH", "Humus (%)", "Plant cover (%)"], TR.map((r) => r));
const humusTimes = chk(4.5 / 0.3, 15, 1e-9);
// Struct 2: mangrove land cover
const LC = [["Mangrove forest", 6800, 5100], ["Shrimp ponds", 400, 1900], ["Rice and other crops", 1200, 1500]];
const LCTAB = tbl(["Land cover", "1995 (ha)", "2020 (ha)"], LC.map((r) => [r[0], String(r[1]).replace(/(\d)(?=(\d{3})$)/, "$1 "), String(r[2]).replace(/(\d)(?=(\d{3})$)/, "$1 ")]));
const mLossPct = chk(((6800 - 5100) / 6800) * 100, 25, 1e-9);
const pondTimes = rnd(1900 / 400, 2, 4.75, "pondTimes");

concept("ageo.coastal.dunes-saltmarsh-mangrove", { file: "coastal/dunes-saltmarsh-mangrove", keyPrefix: "coastal.dunes-saltmarsh-mangrove", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "Which plant is the main stabiliser of foredunes on temperate coasts?", [
    ["Marram grass", "Correct: it grows upwards through burial and binds the sand."],
    ["Glasswort", "Glasswort is a pioneer of saltmarsh mud."],
    ["Red mangrove", "Mangroves grow on tropical muddy shores."],
    ["Sea purslane", "Sea purslane belongs to the middle zone of a saltmarsh."],
  ], "**Marram grass** grows through burial and binds the sand of foredunes.");
  mc(b, 2, "UNDERSTANDING", "Why do soils become darker and more acid with distance inland across a dune system?", [
    ["Humus builds up as plants die and shell fragments are leached", "Correct: older dunes have more plant cover and more decay."],
    ["The wind brings fresh sand to the inner dunes at every storm", "The inner dunes are older and more stable, with little fresh sand."],
    ["The sea water reaches the inner dunes at all high tides", "The inner dunes lie above the reach of the tide."],
    ["Plant cover decreases, so less organic matter is added to the soil", "Plant cover increases inland, which adds organic matter."],
  ], "Older, inland dunes have more **humus** and have lost their shell fragments.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the importance of flocculation on a saltmarsh?", [
    ["Clay particles clump in salt water and sink so mud accumulates", "Correct: the clumps settle faster and build up the marsh."],
    ["Salt crystals form on the surface of the mud as the tide falls", "That is salt crust formation, not flocculation."],
    ["Marsh plants take in salt from the sea water through their leaves", "That does not describe flocculation."],
    ["Strong waves break the mud into fine clay particles and carry them off", "Flocculation makes particles settle, not break up."],
  ], "In salt water, fine clay **clumps and settles** more quickly.");
  mc(b, 2, "UNDERSTANDING", "What is the function of the pneumatophores of Avicennia mangroves?", [
    ["They take in oxygen for roots in waterlogged mud", "Correct: they grow upwards and have pores for gas exchange."],
    ["They store fresh water to be used in the dry season", "They are breathing roots, not water stores."],
    ["They anchor the tree against strong waves and storm surges", "Prop roots support the tree; pneumatophores supply air."],
    ["They release salt from the tree into the surrounding sea water", "Salt is excreted by leaves or excluded at the roots."],
  ], "**Pneumatophores** are breathing roots for waterlogged soil.");
  mc(b, 3, "ANALYSIS", "How does vivipary help mangrove seedlings to survive?", [
    ["The seedling falls with a root already formed and anchors fast", "Correct: it can establish before the tide washes it away."],
    ["The seedling grows on the ground below the tree in a dry soil", "Mangrove soil is wet and waterlogged."],
    ["The seeds need to dry out completely before they are able to grow", "Mangrove seeds germinate on the tree and do not dry out."],
    ["The seeds are carried far inland by the wind to avoid the salt water", "They are mostly dispersed by water, not the wind."],
  ], "**Vivipary** gives the propagule a head start in soft, moving mud.", { hints: ["Why is a seed in soft mud at risk from tides?"] });
  mc(b, 3, "ANALYSIS", "What is coastal squeeze?", [
    ["A saltmarsh trapped between the rising sea and a fixed wall", "Correct: the marsh cannot migrate inland and is lost."],
    ["The compression of a dune system by strong onshore winds in storms", "This does not describe coastal squeeze."],
    ["The reduction of a sandy beach by constructive waves", "Constructive waves build beaches."],
    ["The narrowing of a river mouth by the growth of a spit", "That is a different process."],
  ], "**Coastal squeeze** traps habitats between the rising sea and fixed defences.", { hints: ["Where would a saltmarsh move if sea level rose?"] });
  mc(b, 3, "ANALYSIS", "Why do different plants dominate different zones of a saltmarsh?", [
    ["Flooding time and salinity differ across the marsh", "Correct: each species tolerates a different level of flooding and salt."],
    ["The wind blows stronger on the landward side than on the seaward side", "Wind does not control the zonation."],
    ["The seeds of each species only drift to one place on the marsh", "Seeds are widely dispersed; survival differs."],
    ["Rainfall is higher on the seaward side of the marsh than the landward side", "Rainfall is similar across a small marsh."],
  ], "Zonation is controlled by **flooding frequency and salinity**.", { hints: ["How often is the pioneer zone covered compared with the upper marsh?"] });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Mangrove swamps are found mainly on sheltered tropical and subtropical coasts.", answer: true,
    feedbackTrue: "Correct: they need warm water and low-energy muddy shores.", feedbackFalse: "Not so: mangroves are tropical and subtropical trees of sheltered shores.",
    explanation: "Mangroves need **warm temperatures and shelter**." });
  b.match({ d: 2, skill: "RECALL", stem: "Match each term to its meaning.",
    pairs: [
      ["Halophyte", "Plant adapted to salty conditions"],
      ["Pneumatophore", "Breathing root that grows up out of the mud"],
      ["Embryo dune", "Small dune forming around pioneer plants on the upper beach"],
      ["Dune slack", "Damp hollow between dunes where the water table is high"],
      ["Managed realignment", "Allowing the sea to flood land behind a breached defence"],
    ], explanation: "Each term belongs to the dune, saltmarsh or mangrove system." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The sequence of plant communities on sand dunes is a {{blank:a}}. The succession on a tidal mud flat is a {{blank:b}}. Trees that grow in salt water on tropical shores are {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["psammosere"], choices: ["psammosere", "halosere", "lithosere"] },
      { id: "b", accepted: ["halosere"], choices: ["halosere", "psammosere", "hydrosere"] },
      { id: "c", accepted: ["mangroves"], choices: ["mangroves", "xerophytes", "epiphytes"] },
    ], explanation: "Psammosere for sand, halosere for salt marsh, and mangroves for tropical shores." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the type of plant that is adapted to live in salty conditions, such as glasswort.",
    accepted: ["halophyte", "a halophyte", "halophytes"], explanation: "A **halophyte** tolerates salt." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "mm",
    stem: "A saltmarsh surface is rising by 7 mm a year, and sea level is rising by 4.5 mm a year (illustrative data). Calculate the net gain in height of the marsh relative to the sea, in mm per year.",
    hints: ["Subtract the rate of sea-level rise from the rate of accretion."],
    value: netGain, dp: 1, wrong: [11.5, 1.6],
    explanation: "7 − 4.5 = **2.5 mm per year**. The value 11.5 adds the two rates." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "years",
    stem: "Using the net gain of 2.5 mm a year, how many years would it take the marsh to gain a further 80 mm of height relative to the sea?",
    hints: ["Divide the height by the net gain per year."],
    value: yearsGain, wrong: [200, 0.03],
    explanation: "80 ÷ 2.5 = **32 years**. The value 200 multiplies the two numbers." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A bay had 7 500 ha of mangrove in 1998 and 5 850 ha in 2022 (illustrative data). Calculate the percentage loss of mangrove.",
    hints: ["Loss ÷ original × 100."],
    value: mangPct, wrong: [28.2, 1650],
    explanation: "Loss = 7 500 − 5 850 = 1 650 ha. 1 650 ÷ 7 500 × 100 = **22%**. The value 28.2 divides by the final area (1 650 ÷ 5 850)." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "A foredune grew from a height of 0.5 m to a height of 3.5 m in 12 years (illustrative data). Calculate the mean rate of growth, in metres per year.",
    hints: ["Increase in height ÷ time."],
    value: duneRate, dp: 2, wrong: [3, 0.29],
    explanation: "1. Increase in height = 3.5 − 0.5 = 3.0 m.\n2. Rate = 3.0 ÷ 12 = **0.25 m per year**. The value 3 is the total increase." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a dune system changes with distance inland from the beach.",
    points: [
      "Dunes change from low embryo dunes, to taller foredunes, then fixed (grey) dunes and heath or woodland inland.",
      "Plant cover and diversity increase, from a few pioneer grasses to grasses, herbs, mosses, shrubs and eventually trees.",
      "Soil depth and humus content increase, and the pH falls (the soil becomes less alkaline and more acid).",
    ],
    modelAnswer: "Dunes change from low embryo dunes to taller foredunes, then fixed grey dunes and heath or woodland inland. Plant cover and diversity increase from a few pioneer grasses to herbs, mosses, shrubs and trees. Soil depth and humus increase and pH falls.",
    explanation: "Describe dune type, plants and soil." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the role of marram grass in the development of sand dunes.",
    hints: ["Think of burial, roots and leaves."],
    points: [
      "Marram grass is stimulated to grow upwards when it is buried by sand, so it can keep pace with the growing dune.",
      "Its stems and leaves slow the wind and trap more sand.",
      "Its long roots bind the sand and make the dune stable.",
      "Its rolled leaves reduce water loss, so it tolerates dry, salty conditions, and its dead material adds humus for later colonists.",
    ],
    modelAnswer: "Marram grass grows upwards when it is buried, so it keeps pace with the growing dune. Its stems and leaves slow the wind and trap more sand, and its long roots bind the sand. Its rolled leaves reduce water loss, so it tolerates dry, salty conditions, and its dead material adds humus for later colonists.",
    explanation: "Marram traps, binds and adds humus while tolerating the conditions." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how mangrove forests protect tropical coasts.",
    hints: ["Think of waves, sediment and storms."],
    points: [
      "The dense roots and trunks slow the water and absorb wave energy, so waves reaching the shore are smaller.",
      "The roots trap and bind sediment, which builds up the surface and reduces erosion.",
      "During storms and cyclones, mangroves reduce the height and force of storm surges and winds reaching land.",
      "The forest forms a buffer zone, so that settlements and farmland behind it suffer less damage.",
    ],
    modelAnswer: "The dense roots and trunks slow water and absorb wave energy, so smaller waves reach the shore. The roots trap and bind sediment, which builds the surface and reduces erosion. In storms and cyclones mangroves reduce the height and force of surges and winds, and form a buffer for the settlements and farmland behind.",
    explanation: "Roots absorb energy, trap sediment and buffer storms." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why saltmarshes are threatened by rising sea level.",
    hints: ["Think about where the marsh could move."],
    points: [
      "If sea level rises faster than the marsh surface builds up, the marsh is flooded for longer and drowns.",
      "Where there is a sea wall or farmland behind the marsh, it cannot migrate inland (coastal squeeze).",
      "Stronger waves reach the marsh in deeper water and erode its seaward edge.",
    ],
    modelAnswer: "If sea level rises faster than the marsh surface builds up, the marsh is flooded for longer and drowns. If there is a sea wall or farmland behind it, the marsh cannot move inland, so it is squeezed. Deeper water allows stronger waves to erode the seaward edge.",
    explanation: "Accretion may not keep up, and the marsh may have no room to move." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `A transect across a dune system was surveyed from the beach inland (illustrative data, invented for this exercise).\n\n${TRTAB}`,
    hints: ["Humus at D ÷ humus at A.", "Think about what happens to organic matter as the dunes become stable."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "How many times greater is the humus content at Site D than at Site A?", value: humusTimes, wrong: [4.2, 0.07, 85],
        explanation: "4.5 ÷ 0.3 = 15 times. The value 4.2 is the difference in percentage points." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the changes in soil and vegetation with distance from the sea.",
        points: [
          "Soil pH falls steadily from 8.4 at A to 5.6 at D, so the soil changes from alkaline to acid.",
          "Humus increases from 0.3% at A to 4.5% at D.",
          "Plant cover increases from 12% to 97%, with the largest increase between A and B (40 percentage points).",
        ],
        modelAnswer: "Soil pH falls steadily from 8.4 at A to 5.6 at D, so the soil changes from alkaline to acid. Humus increases from 0.3% to 4.5%. Plant cover increases from 12% to 97%, with the largest increase between A and B, where it rises by 40 percentage points.",
        explanation: "Quote start and end figures for each variable." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain the changes in soil with distance from the sea.",
        points: [
          "Pioneer plants and marram trap sand and stabilise it, so that plant cover increases and more organic matter is added as plants die.",
          "Decay of the plant material increases the humus, and organic acids and leaching of shell fragments lower the pH.",
          "Inland dunes are older and more sheltered from salt spray and wind, so more species can colonise and add humus.",
        ],
        modelAnswer: "Pioneer plants and marram trap and stabilise sand, so plant cover increases and more organic matter is added as plants die. Decay increases the humus, and organic acids and leaching of shell fragments lower the pH. The inland dunes are older and more sheltered from salt spray and wind, so more species can colonise them.",
        explanation: "Succession adds humus and acidity with time and shelter." }),
    ], explanation: "Calculate a ratio, describe the transect and explain dune succession." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table shows land cover in a tropical delta, taken from satellite images (illustrative data, invented for this exercise).\n\n${LCTAB}`,
    hints: ["Loss ÷ original × 100.", "Shrimp ponds are often built by clearing mangrove."],
    parts: [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the percentage loss of mangrove forest between 1995 and 2020.", value: mLossPct, unit: "%", wrong: [33.3, 1700],
            explanation: "Loss = 6 800 − 5 100 = 1 700 ha. 1 700 ÷ 6 800 × 100 = 25%. The value 33.3 divides by the final area (1 700 ÷ 5 100)." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "How many times larger was the area of shrimp ponds in 2020 than in 1995?", options: [
            ["4.75 times", "Correct: 1 900 ÷ 400 = 4.75."],
            ["1 500 times", "1 500 is the increase in hectares, not the ratio."],
            ["0.21 times", "This divides the 1995 area by the 2020 area."],
            ["19 times", "This misplaces the decimal point."],
          ], answer: "A", explanation: "1 900 ÷ 400 = 4.75." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why shrimp farming has increased the loss of mangrove.",
        points: [
          "Shrimp ponds are best built in the intertidal zone, where mangrove grows, because they need salt water, so mangrove is cleared for them.",
          "Shrimp farming gives high profits for exports, so there is a strong economic incentive to clear forest.",
          "Ponds are often abandoned after a few years because the soil and water are polluted, so new areas of mangrove are cleared.",
        ],
        modelAnswer: "Shrimp ponds need salt water and are built in the intertidal zone, where mangrove grows, so the forest is cleared. Shrimp farming gives high export profits, which creates a strong incentive. The ponds are often abandoned after a few years because the soil and water are polluted, so new areas of mangrove are cleared.",
        explanation: "Location, profit and short-lived ponds." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe the consequences of losing mangrove for the people of the delta.",
        points: [
          "Coastal settlements and farmland are less protected from waves, storm surges and cyclones, so flood damage increases.",
          "Fish and prawn nurseries are lost, so local fisheries decline and incomes and food supplies fall.",
          "Supplies of timber, fuelwood and charcoal are reduced, and carbon stored in the mangrove is released.",
        ],
        modelAnswer: "Coastal settlements and farmland are less protected from waves and storm surges, so flood damage increases. The nurseries of fish and prawns are lost, so fisheries decline and incomes fall. Supplies of timber and fuelwood are reduced, and the carbon stored in the mangrove is released.",
        explanation: "Loss of protection, fisheries and resources." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest ways in which the remaining mangrove could be managed sustainably.",
        points: [
          "Legal protection of the remaining forest, with controls on new shrimp ponds and enforcement.",
          "Replanting of cleared and abandoned pond areas, with the involvement of local communities.",
          "Sustainable use, such as limited harvesting of timber, ecotourism and integrated shrimp–mangrove systems.",
        ],
        modelAnswer: "The remaining forest can be given legal protection, with controls on new shrimp ponds and enforcement. Cleared and abandoned pond areas can be replanted with the involvement of local communities. Sustainable use, such as limited harvesting, ecotourism and shrimp farms integrated with mangrove, gives people an income without clearing the forest.",
        explanation: "Protection, restoration and sustainable use." }),
    ], explanation: "Calculate change in land cover, explain the cause and suggest management." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the extent to which the threats to coastal dunes, saltmarshes or mangrove swamps are caused by human activity rather than natural processes.",
    hints: ["Name the system you will use.", "Give human and natural threats and a judgement."],
    points: [
      "Names one system (for example mangroves) and gives its natural role (protection, nursery, carbon store).",
      "Human threats: clearance for shrimp ponds, farming, settlement, logging and charcoal, pollution, and changes to river flow by dams.",
      "These are often large and permanent, because the whole forest is cleared and replaced by another land use.",
      "Natural threats: storms and cyclones, erosion, and sea-level rise, which can drown the system if the surface does not rise fast enough.",
      "Natural processes cause change in the short term, but the system usually recovers, for example when storm damage is followed by regrowth.",
      "Human activity makes natural threats worse: removing mangrove or building sea walls prevents the system from recovering or moving inland, and climate change (caused by people) raises sea level.",
      "Evidence: losses in many regions have been linked more closely to clearance and conversion than to natural events.",
      "Judgement: human activity is the main cause of loss, both directly and by increasing natural threats, but natural processes are important in the long term.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "In mangrove swamps, human activity is the main cause of loss. Forest has been cleared for shrimp ponds, farming, settlement, logging and charcoal, and dams and pollution have changed the flow and quality of the water. These changes are large and permanent, because the forest is replaced by another land use. Natural threats include storms and cyclones, erosion and sea-level rise, which can drown the forest if the surface does not build up fast enough. However, natural damage in the short term is often followed by regrowth, and human activity makes the natural threats worse by removing the forest, blocking its movement inland and raising sea level through climate change. I conclude that human activity is the main cause, both directly and by increasing natural threats, although natural processes matter over the longer term.",
    wordLimit: { max: 300 }, explanation: "Weigh human and natural threats using one system, then judge." });

  b.card("DEFINITION", "Psammosere", "The succession of plant communities on sand dunes: embryo dunes, foredunes, fixed dunes, slacks and a stable community inland.");
  b.card("CONCEPT", "Marram grass", "A dune plant that grows up through burial, traps sand with its stems and binds it with long roots; rolled leaves reduce water loss.");
  b.card("DEFINITION", "Halosere", "The succession on a tidal mud flat, from pioneers such as glasswort and cord grass to upper marsh, controlled by flooding and salinity.");
  b.card("DEFINITION", "Halophyte", "A plant adapted to salty conditions, for example by excreting salt, storing water in succulent tissue or tolerating high salt levels.");
  b.card("CONCEPT", "Mangrove adaptations", "Prop roots for support, pneumatophores for oxygen, salt excretion or exclusion, and viviparous seeds that drop as rooted seedlings.");
  b.card("CONCEPT", "Mangrove zonation", "From the sea: pioneers such as Avicennia, then Rhizophora, then other species where flooding is less frequent, then land plants.");
  b.card("CONCEPT", "Coastal squeeze", "A habitat such as a saltmarsh trapped between rising sea level and a fixed barrier such as a sea wall, so it cannot move inland.");
  b.card("CONCEPT", "Benefits of dunes, marshes and mangroves", "Coastal protection, nursery for fish, wildlife habitat, carbon storage and resources such as timber and grazing.");
  b.card("FORMULA", "Net gain of a saltmarsh", "Net gain (mm per year) = rate of accretion − rate of sea-level rise; a negative value means that the marsh is drowning.");
});
