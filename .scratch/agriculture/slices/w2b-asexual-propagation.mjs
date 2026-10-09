// Slice W2b: asexual reproduction and vegetative propagation.
import { concept, P, plantPopulation, round, check, agricultureLevels } from "../lib.mjs";

// Cassava cuttings: 1.0 m x 0.8 m on 0.5 ha.
const cas = plantPopulation({ rowCm: 100, inRowCm: 80, areaHa: 0.5 });
check(cas.perHa === 12500 && cas.total === 6250, "cassava");

// Vine cuttings from a length of vine.
const VINE_M = 54, CUT_CM = 30;
const cuttings = Math.floor((VINE_M * 100) / CUT_CM + 1e-9);
check(cuttings === 180, "vine cuttings");

// Seed potatoes: 90 x 30 cm on 0.2 ha, 50 g seed tubers.
const ip = plantPopulation({ rowCm: 90, inRowCm: 30, areaHa: 0.2 });
const ipKg = (ip.total * 50) / 1000;
check(Math.abs(ip.total - 7407.407) < 1e-2 && Math.abs(ipKg - 370.37) < 1e-2, "seed potato");

// Sugar cane setts: 3 nodes each; buds per sett.
const SETTS = 2400, NODES = 3;
const buds = SETTS * NODES;
check(buds === 7200, "buds");

concept("agri.plants.asexual-propagation", { file: "plants/asexual-propagation", keyPrefix: "plants.asexual-propagation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which crop is usually propagated from vine cuttings?",
    options: [
      ["Sweet potato", "Correct: vine pieces about 30 cm long are planted on ridges."],
      ["Irish potato", "Irish potatoes are grown from seed tubers."],
      ["Onion", "Onions are grown from seed or small bulbs (sets)."],
      ["Maize", "Maize is grown from seed."],
    ],
    answer: "A",
    explanation: "Sweet potatoes are planted from vine (stem) cuttings; roots form at buried nodes.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What name is given to the pieces of sugar cane stem used for planting?",
    options: [
      ["Setts", "Correct: each sett has two or three nodes with buds."],
      ["Suckers", "Suckers are shoots from the base of plants such as bananas."],
      ["Runners", "Runners grow along the soil surface, as in strawberries."],
      ["Cloves", "Cloves are the small bulbs of garlic."],
    ],
    answer: "A",
    explanation: "Sugar cane is planted from setts laid in furrows.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In budding and grafting, which tissues of the scion and the stock must be in close contact?",
    options: [
      ["The cambium layers", "Correct: dividing cambium cells grow together to form the union."],
      ["The pith of each stem", "Pith does not divide to join the two parts."],
      ["The outer bark layers", "Bark-to-bark contact does not make a union."],
      ["The epidermis and cuticle", "These outer layers do not form the union."],
    ],
    answer: "A",
    explanation: "The cambium of the scion must touch the cambium of the stock for the union to form.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an **advantage** of propagating oranges by budding rather than from seed?",
    options: [
      ["The trees are true to type and bear fruit sooner", "Correct: budded trees are clones of a good variety and mature earlier."],
      ["The trees are free of all diseases of the parent", "Budwood can carry the parent's diseases, especially viruses."],
      ["The trees show more variation for selection", "Budding gives identical trees, not variation."],
      ["Budding needs no skill or special tools", "Budding needs skill and a sharp budding knife."],
    ],
    answer: "A",
    explanation: "Vegetative propagation keeps the good qualities of the variety and shortens the time to bearing.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about the offspring of asexual reproduction is correct?",
    options: [
      ["They are genetically identical to the parent", "Correct: they form a clone."],
      ["They show more variation than offspring from seed", "Variation comes from sexual reproduction."],
      ["They always resist the diseases of the parent", "They carry the same susceptibility as the parent."],
      ["They are produced by the fusion of two gametes", "That describes sexual reproduction."],
    ],
    answer: "A",
    explanation: "One parent, no fusion of gametes: the offspring are identical (a clone).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer plants sweet potato vines from an old field where the plants had small, crinkled, mottled leaves. Why is this unwise?",
    options: [
      ["Viruses in the parent vines pass into the new plants", "Correct: vegetative material carries viruses."],
      ["Cuttings from old fields always fail to form roots", "Cuttings from healthy old plants root well; disease is the problem."],
      ["The new plants will show far too much variation to give an even crop", "Cuttings produce identical plants, not variation."],
      ["Sweet potatoes can only be grown from seed", "Sweet potatoes are normally grown from vine cuttings."],
    ],
    answer: "A",
    hints: ["Mottled, crinkled leaves suggest a virus."],
    explanation: "Diseases, especially viruses, are passed on in vegetative planting material; use clean vines.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why are seed potatoes stored in diffuse light to form short green sprouts before planting?",
    options: [
      ["Short, sturdy sprouts give quick, even emergence", "Correct: chitting speeds up establishment."],
      ["Light kills most of the eyes, so that only one strong stem grows from each tuber", "Light does not kill the eyes; it keeps the sprouts short and strong."],
      ["Green sprouts can be eaten safely before planting", "Green parts of potatoes contain toxic substances and are not eaten."],
      ["Light turns the starch in the tuber into protein", "Light does not convert starch into protein."],
    ],
    answer: "A",
    hints: ["Compare short, strong sprouts with long, pale ones formed in the dark."],
    explanation: "Chitting gives short, strong sprouts that grow away quickly and evenly.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "All the bananas on a plantation came from suckers of one parent. A new disease arrives and attacks every plant. What explains this?",
    options: [
      ["They are a clone, so none of them has resistance", "Correct: lack of variation is a risk of asexual reproduction."],
      ["Plants grown from suckers are always weaker than seedlings, so they catch every disease", "Suckers grow vigorously; the issue is identical genes."],
      ["Bananas lose their resistance when they flower", "Flowering does not remove resistance."],
      ["The disease is spread only by suckers, not by other means", "Diseases can spread in many ways; the uniform susceptibility is the key point."],
    ],
    answer: "A",
    hints: ["What do clones share?"],
    explanation: "Identical plants are equally susceptible, so a new disease can destroy a whole clonal crop.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In grafting, the rootstock is the rooted plant onto which the scion is joined.",
    answer: true,
    explanation: "True. The scion provides the fruiting variety; the stock provides the roots.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Vegetative planting material is lighter and easier to store than seed.",
    answer: false,
    explanation: "False. Tubers, cuttings and setts are bulky and perishable; seed is small, light and stores well.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each crop with the planting material normally used.",
    pairs: [
      ["Irish potato", "Seed tubers"],
      ["Cassava", "Woody stem cuttings"],
      ["Sugar cane", "Setts with two or three nodes"],
      ["Garlic", "Cloves"],
      ["Strawberry", "Rooted runners"],
    ],
    explanation: "Each crop is multiplied from the vegetative part that carries buds.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences about budding.",
    template: "A T-shaped cut is made in the bark of the {{blank:a}}. A single {{blank:b}} cut from the wanted variety is slipped under the bark so that its {{blank:c}} touches that of the stock.",
    blanks: [
      { id: "a", accepted: ["rootstock", "stock", "root stock"] },
      { id: "b", accepted: ["bud"] },
      { id: "c", accepted: ["cambium"] },
    ],
    explanation: "T-budding joins a bud of the scion variety to the rootstock, cambium to cambium.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Name the method of propagation in which a low branch is pegged into the soil to form roots while still attached to the parent.",
    accepted: ["layering", "simple layering", "ground layering", "layerage"],
    explanation: "**Layering**: the branch roots before it is cut from the parent.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `Cassava cuttings are planted at 1.0 m between rows and 0.8 m within the row. How many cuttings are needed for ${cas.total / cas.perHa} ha?`,
    value: cas.total, unit: "plants", wrong: [cas.perHa, cas.total * 100],
    explanation: `Area per cutting = 1.0 × 0.8 = 0.8 m². Per ha = 10,000 ÷ 0.8 = ${cas.perHa.toLocaleString("en-GB")}. For 0.5 ha: ${cas.perHa.toLocaleString("en-GB")} × 0.5 = ${cas.total.toLocaleString("en-GB")} cuttings.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `Thandeka has ${VINE_M} m of healthy sweet potato vine. How many ${CUT_CM} cm cuttings can she cut from it?`,
    value: cuttings, unit: "plants", wrong: [VINE_M / CUT_CM, round((VINE_M * 100) / CUT_CM / 100, 1)],
    explanation: `${VINE_M} m = ${VINE_M * 100} cm. ${VINE_M * 100} ÷ ${CUT_CM} = ${cuttings} cuttings. Forgetting to convert metres to centimetres gives a much smaller number.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Seed potatoes of about 50 g each are planted at 90 cm × 30 cm on 0.2 ha. Calculate the mass of seed potatoes needed, in kg, to the nearest kg.",
    value: ipKg, unit: "kg", tol: 0.5, answer: String(round(ipKg, 0)), wrong: [round((ip.perHa * 50) / 1000, 0), round(ip.total * 50, 0)],
    hints: ["Find plants per hectare from the spacing in metres.", "Multiply by the area, then by the mass of one tuber."],
    explanation: `Area per plant = 0.9 × 0.3 = 0.27 m²; plants per ha = 10,000 ÷ 0.27 = ${round(ip.perHa, 0).toLocaleString("en-GB")}; for 0.2 ha = ${round(ip.total, 0).toLocaleString("en-GB")} plants; mass = ${round(ip.total, 0).toLocaleString("en-GB")} × 50 g ÷ 1,000 = ${round(ipKg, 0)} kg.`,
    workedSolution: `1. Area per plant = 0.90 × 0.30 = 0.27 m².\n2. Plants per hectare = 10,000 ÷ 0.27 = ${round(ip.perHa, 1).toLocaleString("en-GB")}.\n3. Plants for 0.2 ha = ${round(ip.perHa, 1).toLocaleString("en-GB")} × 0.2 = ${round(ip.total, 1).toLocaleString("en-GB")}.\n4. Mass = ${round(ip.total, 1).toLocaleString("en-GB")} × 50 g = ${round(ip.total * 50, 0).toLocaleString("en-GB")} g = ${round(ipKg, 0)} kg (to the nearest kg).\n5. Using the per-hectare figure without multiplying by 0.2 gives ${round((ip.perHa * 50) / 1000, 0)} kg, five times too much.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "State **two** advantages and **two** disadvantages of asexual reproduction in crop production.",
    hints: ["Think about uniformity, speed, disease and storage."],
    points: [
      "Advantage: offspring are true to type / identical to a good parent.",
      "Advantage: faster maturity / earlier bearing (or: crops with little viable seed can be multiplied; rootstocks give resistance).",
      "Disadvantage: diseases (especially viruses) pass to the offspring.",
      "Disadvantage: no variation, so all are equally susceptible (or: bulky material that is hard to store and transport).",
    ],
    modelAnswer: "Advantages: the new plants are identical to a good parent, and they mature or bear earlier. Disadvantages: viruses in the parent are passed on, and there is no variation, so a new disease can attack every plant.",
    explanation: "Two of each, clearly labelled.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how sugar cane is planted from setts.",
    hints: ["Choose, cut, place and cover."],
    points: [
      "Cut setts from healthy, disease-free mature cane.",
      "Each sett has two or three nodes (buds).",
      "Lay the setts end to end in furrows (horizontally) in moist soil.",
      "Cover with soil; shoots grow from the buds and roots form at the nodes.",
    ],
    modelAnswer: "Healthy mature cane is cut into setts with two or three nodes each. The setts are laid flat, end to end, in furrows in moist soil and covered. Buds at the nodes grow into shoots and roots form at the nodes.",
    explanation: "Material, preparation and planting.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8,
    stem: `Tatenda is setting up a sugar cane plot. He has ${SETTS.toLocaleString("en-GB")} setts, each with ${NODES} nodes. He also plans a small orchard of a sweet orange variety.`,
    hints: ["Each node carries one bud.", "Think about uniformity and time to bearing for the oranges."],
    parts: [
      P.num({
        label: "(a)", stem: "Calculate the total number of buds on the setts, if each node carries one bud.",
        value: buds, wrong: [SETTS, SETTS / NODES],
        explanation: `${SETTS} × ${NODES} = ${buds.toLocaleString("en-GB")} buds.`,
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why each sett is cut with more than one node.",
        points: ["Each node has a bud (and roots form at nodes).", "If one bud is damaged or fails, another can still grow, so fewer gaps occur."],
        explanation: "Spare buds insure against failure.",
      }),
      P.short({
        label: "(c)", stem: "Name the method by which a single bud of the orange variety is joined to a rootstock seedling.",
        accepted: ["budding", "t-budding", "t budding", "shield budding", "bud grafting"],
        explanation: "Citrus is usually propagated by budding.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State **two** reasons for using a rootstock rather than growing the orange tree on its own roots from seed.",
        points: ["The rootstock can resist soil diseases / tolerate the soil / give vigour.", "The budded tree is true to type and bears earlier than a seedling."],
        explanation: "Rootstock benefits plus true-to-type scion.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why Tatenda should buy budded trees from a certified nursery.",
        points: ["Budwood can carry diseases, especially viruses, from the parent.", "Certified nurseries use disease-free budwood and true-to-name varieties."],
        explanation: "Clean material prevents disease spread.",
      }),
    ],
    explanation: "Count buds from nodes; budding on rootstocks gives true-to-type trees; use clean material.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    stem: "A farmer compares two ways of starting mango trees: (1) planting seeds from fruit bought at the market; (2) buying grafted trees of a named variety.",
    hints: ["Consider variation, time to bearing and cost."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which statement about trees from method (1) is correct?",
        options: [
          ["The trees may vary and differ from the parent fruit", "Correct: seedlings result from sexual reproduction."],
          ["The trees will be identical to the parent", "Only vegetative propagation gives identical offspring."],
          ["The trees will bear fruit sooner than grafted trees", "Seedlings usually take longer to bear."],
          ["The trees will carry all the parent's virus diseases", "Most viruses are not passed through seed."],
        ],
        answer: "A",
        explanation: "Seedlings vary because of sexual reproduction.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain **three** advantages of method (2).",
        points: ["Trees are true to type, so fruit quality of the named variety is known.", "Trees bear fruit sooner.", "Uniform trees are easier to manage and harvest (or: rootstock can give vigour or disease tolerance)."],
        explanation: "Grafting benefits.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Give **two** disadvantages of method (2).",
        points: ["Grafted trees cost more to buy / grafting needs skill.", "Diseases in the scion can be passed on / all trees are equally susceptible to a new disease."],
        explanation: "Cost and disease risk.",
      }),
    ],
    explanation: "Sexual propagation gives variation; grafting gives uniform, early-bearing trees at a cost.",
  });
  b.ext({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate the use of asexual reproduction for producing Irish potatoes on a smallholding.",
    hints: ["Weigh true-to-type yields and speed against disease build-up and the cost of seed tubers.", "Conclude with advice."],
    points: [
      "Seed tubers give plants identical to a good variety, so yield and quality are predictable.",
      "Tubers contain stored food, so plants establish quickly and mature within one season.",
      "Diseases, especially viruses, build up when farmers replant their own tubers year after year, lowering yields.",
      "Seed tubers are bulky and expensive and need careful storage (diffuse light, cool, dry).",
      "No variation, so a new disease or pest can affect the whole crop.",
      "Judgement: asexual reproduction is the practical method, but certified disease-free seed should be bought regularly.",
    ],
    levels: agricultureLevels(6),
    modelAnswer: "Irish potatoes are propagated from seed tubers, so the crop is identical to the chosen variety and yields and quality are predictable. The stored food in the tuber means plants emerge and grow quickly, giving a crop within one season. However, seed tubers are bulky, a large mass is needed for each hectare, and they must be stored carefully. When a farmer replants his own tubers every year, viruses and other tuber-borne diseases build up and yields fall, and because all the plants are a clone a new disease can attack the whole crop. Overall, vegetative propagation is the practical method for potatoes, but the farmer should buy certified, disease-free seed potatoes every few seasons.",
    explanation: "Balance the benefits against disease build-up and cost, then advise.",
  });

  b.card("DEFINITION", "Asexual reproduction", "Reproduction from one parent without fusion of gametes; offspring are identical (a clone).");
  b.card("DEFINITION", "Vegetative propagation", "Growing new plants from stems, roots, leaves or buds instead of seed.");
  b.card("DEFINITION", "Scion and rootstock", "Scion: bud or shoot of the wanted variety. Rootstock: rooted plant it is joined to.");
  b.card("FACT", "Planting material: sweet potato, cassava, sugar cane", "Vine cuttings; woody stem cuttings; setts with 2-3 nodes.");
  b.card("CONCEPT", "Key to a successful graft or bud", "Cambium of scion and stock in close contact; clean sharp knife; firm tying.");
  b.card("CONCEPT", "Advantages of asexual reproduction", "True to type, uniform, earlier maturity, multiplies seedless crops, rootstocks add resistance.");
  b.card("CONCEPT", "Disadvantages of asexual reproduction", "Passes on diseases (viruses), no variation, bulky perishable material, needs skill.");
  b.card("CONCEPT", "Advantages of sexual reproduction", "Variation for breeding, seed small and easy to store, few viruses carried.");
  b.card("FORMULA", "Planting pieces per hectare", "10,000 m² ÷ (row spacing in m × in-row spacing in m).");
});
