// Slice W2b: structure of roots, stems and leaves.
import { concept, P, mean, round, check, table, agricultureLevels } from "../lib.mjs";

// Stomata counts (numbers differ from the lesson's worked example).
const LOWER = [24, 27, 22, 25, 27];
const UPPER = [6, 4, 5, 7, 3];
const lowerMean = mean(LOWER);
const upperMean = mean(UPPER);
check(lowerMean === 25 && upperMean === 5, "stomata means");
const STOMA_TABLE = table(["Field of view", "1", "2", "3", "4", "5"], [
  ["Lower surface", ...LOWER],
  ["Upper surface", ...UPPER],
]);
const ratio = lowerMean / upperMean;
check(ratio === 5, "ratio");

// Single-surface count for a numerical item.
const SINGLE = [18, 21, 19, 22, 20, 20];
const singleMean = mean(SINGLE);
check(Math.abs(singleMean - 20) < 1e-9, "single mean");

concept("agri.plants.roots-stems-leaves", { file: "plants/roots-stems-leaves", keyPrefix: "plants.roots-stems-leaves" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which tissue carries water and mineral salts from the roots to the leaves?",
    options: [
      ["Xylem", "Correct: xylem vessels carry water and dissolved salts upwards."],
      ["Phloem", "Phloem carries dissolved food such as sugar."],
      ["Cortex", "The cortex passes water across the root but does not carry it up the plant."],
      ["Palisade mesophyll", "Palisade cells photosynthesise; they do not transport water."],
    ],
    answer: "A",
    explanation: "Xylem transports water and mineral salts up; phloem transports food.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main function of root hairs?",
    options: [
      ["To absorb water and mineral salts", "Correct: they give a huge surface area for absorption."],
      ["To anchor the plant firmly in the soil", "Anchorage is done mainly by the larger roots."],
      ["To store starch for the plant", "Food is stored in the cortex of storage roots, not in root hairs."],
      ["To protect the tip of the root", "The root cap protects the tip."],
    ],
    answer: "A",
    explanation: "Root hairs are thin outgrowths of epidermal cells that greatly increase the surface for absorption.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which layer of a leaf does **most** photosynthesis take place?",
    options: [
      ["Palisade mesophyll", "Correct: its cells are packed with chloroplasts just below the upper surface."],
      ["Spongy mesophyll", "Spongy cells have fewer chloroplasts; this layer is mainly for gas exchange."],
      ["Upper epidermis", "Epidermal cells are transparent and have few or no chloroplasts."],
      ["Lower epidermis", "The lower epidermis protects the leaf and carries the stomata."],
    ],
    answer: "A",
    explanation: "Palisade cells are long, closely packed and full of chloroplasts, close to the light.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How are the vascular tissues arranged in a young dicotyledonous stem?",
    options: [
      ["In bundles in a ring, with phloem outside and xylem inside", "Correct: cambium lies between them."],
      ["In bundles in a ring, with xylem outside and phloem inside", "The positions are reversed: phloem is on the outside."],
      ["In bundles scattered through the stem", "Scattered bundles are found in monocotyledons such as maize."],
      ["As a central star of xylem with phloem between the arms", "That is the arrangement in a root."],
    ],
    answer: "A",
    explanation: "Dicotyledonous stem: bundles in a ring, phloem outside, cambium, xylem inside, pith in the centre.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the function of the guard cells in a leaf?",
    options: [
      ["To open and close the stomata", "Correct: they change shape to open or close the pore."],
      ["To carry sugar from the leaf to the stem", "That is the job of the phloem."],
      ["To make the leaf waterproof on its surface", "The waxy cuticle reduces water loss through the surface."],
      ["To support the leaf blade like a skeleton", "The veins support the blade."],
    ],
    answer: "A",
    explanation: "Two guard cells surround each stoma and control its opening.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why are the stomata of most dicotyledonous crops found mainly on the **lower** surface of the leaf?",
    options: [
      ["The lower surface is shaded and cooler, so less water is lost by transpiration", "Correct: placing stomata there saves water."],
      ["Carbon dioxide is heavier than air, so the gas enters only from below the leaf", "Carbon dioxide diffuses in through any open stoma, from above or below."],
      ["The palisade cells need to be in contact with the lower epidermis to get light", "The palisade layer is near the upper surface."],
      ["Rain would wash the guard cells away if they were on the upper surface", "Guard cells are not washed away by rain."],
    ],
    answer: "A",
    hints: ["Which surface is in direct sunlight?"],
    explanation: "The upper surface is hotter, so stomata there would lose more water; most are on the cooler lower side.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Seedlings pulled by hand from a dry nursery bed wilt after transplanting. What is the most likely reason?",
    options: [
      ["Root hairs were torn off, so too little water is absorbed", "Correct: the absorbing surface was lost."],
      ["The stems were bent when lifted, which blocked the phloem that carries water", "Water travels in the xylem, not the phloem."],
      ["The leaves lost their chloroplasts when the plants were lifted", "Lifting does not remove chloroplasts."],
      ["The root cap was removed, so the roots could not anchor the plant", "Loss of the cap does not cause wilting."],
    ],
    answer: "A",
    hints: ["Which part of the root does most of the absorbing, and how strong is it?"],
    explanation: "Root hairs are delicate. Water the bed before lifting and keep soil around the roots.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A maize stalk borer larva tunnels up the inside of the stem. Why does the cob above the tunnel stay small?",
    options: [
      ["Its tunnel cuts vascular bundles, so less water and food move", "Correct: scattered bundles are damaged throughout the tunnel."],
      ["Only the pith is damaged, and this stops the leaves from photosynthesising", "Maize bundles are scattered; damage is not limited to a pith, and leaves are not directly affected."],
      ["The larva moves down and eats the root hairs, so the plant cannot absorb any water", "The stalk borer tunnels in the stem, not the roots."],
      ["The larva blocks the stomata, so carbon dioxide cannot enter the leaves", "Tunnelling in the stem does not block stomata."],
    ],
    answer: "A",
    hints: ["In maize, where are the vascular bundles?"],
    explanation: "Maize has scattered vascular bundles; tunnelling cuts xylem and phloem, reducing water supply and food movement to the cob, and weakens the stem so it may break.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The waxy cuticle on a leaf reduces water loss.",
    answer: true,
    explanation: "True. The cuticle is waterproof but transparent, so it saves water without blocking light.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Maize has a tap root system.",
    answer: false,
    explanation: "False. Maize is a monocotyledon with fibrous roots (and prop roots from the lower nodes).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each part of a leaf with its function.",
    pairs: [
      ["Waxy cuticle", "Reduces water loss"],
      ["Palisade mesophyll", "Main site of photosynthesis"],
      ["Spongy mesophyll", "Air spaces for gas exchange"],
      ["Stoma", "Lets carbon dioxide in and oxygen out"],
      ["Vein", "Brings water and takes sugar away"],
    ],
    explanation: "Each tissue of the leaf has a job that helps photosynthesis or saves water.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each external part of a plant with its main function.",
    pairs: [
      ["Root", "Anchors the plant and absorbs water"],
      ["Stem", "Holds leaves up to the light"],
      ["Flower", "Sexual reproduction"],
      ["Terminal bud", "Makes the stem grow longer"],
    ],
    explanation: "Roots anchor and absorb, stems support, flowers reproduce and buds grow into new shoots.",
  });
  b.fib({
    d: 2,
    stem: "Complete the description of a dicotyledonous stem.",
    template: "The vascular bundles form a {{blank:a}}. In each bundle the {{blank:b}} lies on the outside and the xylem on the inside, with a layer of {{blank:c}} between them that makes the stem grow thicker.",
    blanks: [
      { id: "a", accepted: ["ring", "circle"] },
      { id: "b", accepted: ["phloem"] },
      { id: "c", accepted: ["cambium"] },
    ],
    explanation: "Bundles in a ring; phloem outside, xylem inside; cambium divides to give secondary growth.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the layer of cells that protects the tip of a growing root.",
    accepted: ["root cap", "rootcap", "the root cap", "calyptra"],
    explanation: "The **root cap** protects the tip as it pushes through the soil.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `A pupil counts the stomata in six fields of view on the lower surface of a leaf: ${SINGLE.join(", ")}. Calculate the mean number of stomata per field of view.`,
    value: singleMean, wrong: [SINGLE.reduce((a, c) => a + c, 0)],
    explanation: `Total = ${SINGLE.join(" + ")} = ${SINGLE.reduce((a, c) => a + c, 0)}. Mean = ${SINGLE.reduce((a, c) => a + c, 0)} ÷ ${SINGLE.length} = ${singleMean}. Forgetting to divide gives the total, not the mean.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which the structure of a leaf is suited to photosynthesis.",
    hints: ["Give a feature and say what it does."],
    points: [
      "Broad, flat blade / large surface area.",
      "To absorb as much light as possible.",
      "Thin / air spaces in the spongy layer / many stomata.",
      "So carbon dioxide diffuses a short distance to the cells (or: palisade cells with many chloroplasts near the top absorb light; veins bring water).",
    ],
    modelAnswer: "The blade is broad and flat, giving a large surface to absorb light. It is thin with many air spaces and stomata, so carbon dioxide diffuses only a short distance to the photosynthesising cells.",
    explanation: "One mark for each feature and one for its link to photosynthesis.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the structure of a young dicotyledonous root as seen in a cross-section, from the outside inwards.",
    hints: ["There are four zones to name."],
    points: [
      "Epidermis (piliferous layer) with root hairs on the outside.",
      "A wide cortex of thin-walled cells (with the endodermis around the centre).",
      "Central vascular tissue: a star of xylem with phloem between its arms.",
    ],
    modelAnswer: "The outside is an epidermis carrying root hairs. Inside it is a wide cortex, ending in the endodermis. In the centre the xylem forms a star shape with phloem between the arms.",
    explanation: "Describe the zones in order.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `Thandeka peeled nail-varnish impressions from the two surfaces of a bean leaf and counted stomata in five fields of view.\n\n${STOMA_TABLE}`,
    hints: ["Mean = total ÷ number of fields.", "Which surface is cooler and shaded?"],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the mean number of stomata per field of view on the lower surface.",
        value: lowerMean, wrong: [LOWER.reduce((a, c) => a + c, 0)],
        explanation: `${LOWER.join(" + ")} = ${LOWER.reduce((a, c) => a + c, 0)}; ÷ 5 = ${lowerMean}.`,
      }),
      P.num({
        label: "(b)", stem: "Calculate the mean number of stomata per field of view on the upper surface.",
        value: upperMean, wrong: [UPPER.reduce((a, c) => a + c, 0)],
        explanation: `${UPPER.join(" + ")} = ${UPPER.reduce((a, c) => a + c, 0)}; ÷ 5 = ${upperMean}.`,
      }),
      P.num({
        label: "(c)", stem: "How many times more stomata are there on the lower surface than on the upper surface?",
        value: ratio, wrong: [round(upperMean / lowerMean, 1)],
        explanation: `${lowerMean} ÷ ${upperMean} = ${ratio}. Dividing the other way round gives a value less than 1.`,
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain the advantage to the bean plant of having most stomata on the lower surface.",
        points: ["The lower surface is shaded / cooler / out of direct sun.", "So less water vapour is lost through the stomata (less transpiration)."],
        explanation: "Placement of stomata saves water.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "State **three** precautions that would make the comparison fair.",
        points: [
          "Use the same leaf (or leaves of the same age and position).",
          "Use the same magnification / same field size.",
          "Count several fields chosen at random on each surface (and avoid counting over the veins).",
        ],
        explanation: "Control variables and repeat counts.",
      }),
    ],
    explanation: "Means from the counts show five times more stomata below, which reduces water loss.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "A leaf section is described from the top surface downwards: (1) a thin, transparent, non-cellular layer; (2) one layer of transparent cells; (3) long, closely packed cells full of green bodies; (4) rounded cells with large spaces between them; (5) one layer of cells with small pores, each between two bean-shaped cells.",
    hints: ["Match each description to the leaf layer in order."],
    parts: [
      P.short({ label: "(a)", stem: "Name layer (1).", accepted: ["cuticle", "waxy cuticle", "the cuticle"], explanation: "Layer 1 is the waxy cuticle." }),
      P.short({ label: "(b)", stem: "Name layer (3).", accepted: ["palisade mesophyll", "palisade layer", "palisade", "palisade cells", "palisade tissue"], explanation: "Layer 3 is the palisade mesophyll." }),
      P.short({ label: "(c)", stem: "Name the green bodies in layer (3).", accepted: ["chloroplasts", "chloroplast"], explanation: "Chloroplasts contain chlorophyll." }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain how layers (4) and (5) work together to supply carbon dioxide to layer (3).",
        points: ["Carbon dioxide enters through the stomata (pores) in layer 5.", "It diffuses through the air spaces of the spongy layer (4).", "Into the palisade cells, where it is used in photosynthesis (moving down a concentration gradient)."],
        explanation: "Stomata and air spaces form a pathway for diffusion.",
      }),
    ],
    explanation: "Identify the leaf layers in order and link structure to gas exchange.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Compare the structure of a maize plant's roots and stem with those of a bean plant, and suggest how the differences affect how each crop is managed.",
    hints: ["Think of root depth, support of a tall stem and weeding.", "Link each structural difference to a management point."],
    points: [
      "Maize has fibrous roots near the surface; bean has a tap root that goes deeper.",
      "Shallow fibrous roots mean weeding implements must not cut too deep near maize / maize needs earthing up.",
      "Maize forms prop roots from lower nodes that help hold the tall stem; earthing up covers these and improves anchorage.",
      "Maize has scattered bundles; a bean has bundles in a ring with cambium so it can thicken.",
      "Stem damage by stalk borers cuts many bundles in maize, so pest control in the stem is important.",
      "Tap-rooted beans reach deeper water / fibrous maize roots bind topsoil well against erosion; a sensible conclusion linking structure to practice.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Maize, a monocotyledon, has a mass of fibrous roots near the surface and prop roots from the lower nodes, while the bean has a tap root that goes deeper. Because maize roots are shallow, weeding near the plants must be shallow, and earthing up covers the prop roots and helps the tall stem resist lodging. The bean's tap root reaches deeper water. Inside the stem, maize has scattered vascular bundles, so a stalk borer tunnel cuts many of them and weakens the plant: stalk borer control is essential. The bean stem has bundles in a ring with cambium. Overall, knowing the structure tells the farmer how to weed, support and protect each crop.",
    explanation: "Compare structures, then apply each difference to management.",
  });

  b.card("DEFINITION", "Xylem", "Tissue that carries water and mineral salts upwards; its vessels also support the plant.");
  b.card("DEFINITION", "Phloem", "Tissue that carries dissolved food (mainly sugar) from the leaves to other parts.");
  b.card("DEFINITION", "Root hair", "A long thin outgrowth of one epidermal cell behind the root tip; gives a large surface for absorbing water and salts.");
  b.card("CONCEPT", "Root cross-section (outside in)", "Epidermis with root hairs, cortex, endodermis, central star of xylem with phloem between the arms.");
  b.card("CONCEPT", "Dicotyledonous stem cross-section", "Epidermis, cortex, vascular bundles in a ring (phloem outside, cambium, xylem inside), pith.");
  b.card("CONCEPT", "Leaf layers (top to bottom)", "Cuticle, upper epidermis, palisade mesophyll, spongy mesophyll with air spaces and veins, lower epidermis with stomata.");
  b.card("FACT", "Which leaf layer does most photosynthesis?", "The palisade mesophyll.");
  b.card("CONCEPT", "Leaf adaptations for photosynthesis", "Broad (light), thin (short diffusion), chloroplasts near the top, air spaces, stomata, veins.");
  b.card("FACT", "What do guard cells do?", "Open and close the stomata.");
});
