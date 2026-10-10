// W2b: phagocytes, lymphocytes and the immune response.
import { concept, P, t, chk, table, dpStr } from "../lib.mjs";

concept("abio.immunity.immune-response", { file: "immunity/immune-response", keyPrefix: "immunity.immune-response" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which cells secrete antibodies?",
    options: [
      ["Plasma cells", "Correct: plasma cells develop from activated B-cells."],
      ["Memory B-cells", "Memory cells wait for a second exposure; they do not secrete antibodies themselves."],
      ["T-killer cells that have been activated by cytokines", "T-killer cells kill infected cells; they do not secrete antibodies."],
      ["Neutrophils", "Neutrophils are phagocytes."],
    ],
    answer: "A",
    explanation: "Only **plasma cells** secrete antibodies.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In phagocytosis, what happens immediately after the pathogen has been enclosed in a phagosome?",
    options: [
      ["Lysosomes fuse with the phagosome", "Correct: they release hydrolytic enzymes into it."],
      ["The phagocyte moves towards the pathogen by chemotaxis", "Chemotaxis happens before engulfing."],
      ["The pathogen is released from the cell by exocytosis without being digested", "The pathogen is digested before any products are released."],
      ["The phagocyte divides by mitosis", "Phagocytosis does not involve cell division."],
    ],
    answer: "A",
    explanation: "Chemotaxis → binding → endocytosis into a phagosome → **lysosomes fuse** → digestion by hydrolytic enzymes.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Where do T-lymphocytes mature?",
    options: [
      ["Thymus", "Correct: T for thymus."],
      ["Bone marrow, where they stay until an antigen enters the blood", "B-cells mature in bone marrow; T-cells move to the thymus."],
      ["Spleen", "The spleen holds lymphocytes but is not where T-cells mature."],
      ["Liver", "The liver is not where lymphocytes mature."],
    ],
    answer: "A",
    explanation: "T-lymphocytes are made in the bone marrow but mature in the **thymus**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the role of T-helper cells in the immune response?",
    options: [
      ["They release cytokines that stimulate B-cells and T-killer cells", "Correct: they coordinate the specific response."],
      ["They secrete antibodies that bind directly to the antigens on pathogens in the blood", "Antibodies are secreted by plasma cells."],
      ["They engulf pathogens and digest them in lysosomes", "This is the role of phagocytes."],
      ["They make holes in the membranes of infected cells", "This is the role of T-killer cells."],
    ],
    answer: "A",
    explanation: "Activated T-helper cells release **cytokines** that stimulate B-cells to divide and form plasma cells, and activate T-killer cells and phagocytes.",
    hints: ["Which cells do they signal to?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why is the secondary immune response faster than the primary response?",
    options: [
      ["Many memory cells specific to the antigen are already present", "Correct: no slow search and expansion from a few cells."],
      ["Antibodies made in the primary response stay at a high level in the blood for life", "Antibody concentration falls after the primary response; memory cells persist."],
      ["The pathogen is weaker the second time it enters the body", "The pathogen is the same; the host's response has changed."],
      ["Lymphocytes change their receptors to fit the antigen more closely", "Lymphocyte receptors are fixed; selection, not change, explains specificity."],
    ],
    answer: "A",
    explanation: "Memory cells are much more numerous than the original matching lymphocytes, so they recognise the antigen at once and divide rapidly.",
    hints: ["What remains in the body after the first infection?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Plasma cells contain large amounts of rough endoplasmic reticulum and many Golgi bodies. Why?",
    options: [
      ["They synthesise and secrete large quantities of protein (antibodies)", "Correct: RER makes proteins and the Golgi packages them for exocytosis."],
      ["They engulf and digest large numbers of bacteria", "Phagocytes digest bacteria using lysosomes."],
      ["They store lipids that are released during an infection", "Antibodies are proteins, not lipids."],
      ["They need a lot of ATP for cell division", "ATP is made in mitochondria; RER and Golgi are for protein secretion."],
    ],
    answer: "A",
    explanation: "Antibodies are proteins made on ribosomes of the **RER**, modified and packaged by the **Golgi body**, and secreted by exocytosis.",
    hints: ["What do plasma cells secrete, and what kind of molecule is it?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Lymphocytes with receptors for a newly evolved virus are present in a person before that person ever meets the virus. Which statement explains this?",
    options: [
      ["Millions of lymphocytes with different receptors form at random, before infection", "Correct: the antigen selects a matching cell that already exists."],
      ["The virus's antigens enter the bone marrow and instruct new lymphocytes to make matching receptors", "Antigens do not instruct receptor shape; this is selection, not instruction."],
      ["The person inherited memory cells for this virus from their parents", "Memory cells are not inherited."],
      ["Lymphocytes copy receptor genes from the virus's genome", "Lymphocytes do not take genes from pathogens."],
    ],
    answer: "A",
    explanation: "A huge variety of receptor shapes arises as lymphocytes mature. When an antigen arrives, it **selects** the cell whose receptor fits: **clonal selection**.",
    hints: ["Does the antigen change the lymphocyte, or choose it?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which cells kill body cells that have been infected by a virus?",
    options: [
      ["T-killer cells", "Correct: they make holes in the infected cell's membrane."],
      ["T-helper cells, using the antibodies they secrete", "T-helper cells release cytokines; they neither secrete antibodies nor kill cells."],
      ["Plasma cells", "Plasma cells secrete antibodies."],
      ["Memory B-cells", "Memory cells respond to re-infection; they do not kill cells."],
    ],
    answer: "A",
    explanation: "**T-killer** (cytotoxic) cells bind to cells displaying the antigen and release chemicals such as perforin that make holes in the membrane.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Neutrophils and macrophages are both phagocytes.",
    answer: true,
    explanation: "True. Neutrophils are short-lived first responders; macrophages are long-lived and present antigens.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "During the primary immune response, a person usually develops symptoms of the disease because the response takes several days.",
    answer: true,
    explanation: "True. Few lymphocytes match the antigen at first, so clonal expansion takes days, during which the pathogen multiplies.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cell with its role.",
    pairs: [
      ["Macrophage", "Engulfs pathogens and presents their antigens"],
      ["T-helper cell", "Releases cytokines that activate other lymphocytes"],
      ["Plasma cell", "Secretes antibodies"],
      ["Memory cell", "Responds rapidly to a second exposure to the antigen"],
      ["T-killer cell", "Destroys infected body cells"],
    ],
    explanation: "Each cell type has a distinct role in the response.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Phagocytes move towards chemicals released by pathogens, a process called {{blank:a}}. The pathogen is engulfed into a vesicle called a {{blank:b}}, which fuses with {{blank:c}} containing hydrolytic enzymes.",
    blanks: [
      { id: "a", accepted: ["chemotaxis"], choices: ["chemotaxis", "osmosis", "phototropism"] },
      { id: "b", accepted: ["phagosome"], choices: ["phagosome", "ribosome", "nucleolus"] },
      { id: "c", accepted: ["lysosomes"], choices: ["lysosomes", "mitochondria", "centrioles"] },
    ],
    explanation: "Chemotaxis, phagosome, lysosomes.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for a molecule that stimulates an immune response and is recognised as non-self.",
    accepted: ["antigen", "an antigen", "antigens"],
    wrong: ["antibody"],
    explanation: "An **antigen** stimulates the response; an antibody is made in response to it.",
  });

  // Numerical: fold increase (different data from the lesson)
  const p1 = 12, p2 = 540;
  const fold = p2 / p1;
  chk(fold, 45);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "The peak antibody concentration was 12 arbitrary units in a primary response and 540 arbitrary units in the secondary response to the same antigen. How many times higher was the secondary peak?",
    value: fold,
    wrong: [p2 - p1, Number((p1 / p2).toFixed(3))],
    explanation: t`$540 \div 12 = ${fold}$ times higher. Subtracting (528) gives the difference, not how many times larger.`,
  });

  const days = [0, 3, 6, 9, 12, 15];
  const ab = [0, 0, 6, 22, 30, 18];
  const rate = (ab[3] - ab[2]) / (days[3] - days[2]);
  chk(Number(rate.toFixed(2)), 5.33);
  calc({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The concentration of an antibody in a person's blood was measured after the first exposure to an antigen on day 0.\n\n${table(["Day", ...days.map(String)], [["Antibody / arbitrary units", ...ab.map(String)]])}\n\nCalculate the mean rate of increase in antibody concentration between day 6 and day 9, in arbitrary units per day. Give your answer to two decimal places.`,
    value: rate, dp: 2,
    wrong: [16, Number((ab[3] / days[3]).toFixed(2))],
    explanation: t`1. Increase $= 22 - 6 = 16$ arbitrary units.
2. Time $= 9 - 6 = 3$ days.
3. Rate $= 16 \div 3 = ${dpStr(rate, 2)}$ arbitrary units per day.
4. No antibody appears for the first few days because the few matching B-cells must first be selected and multiply.`,
    hints: ["Rate = change in concentration ÷ time taken."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a neutrophil destroys a bacterium.",
    points: [
      "Moves towards the bacterium by chemotaxis (attracted by chemicals released)",
      "Receptors bind the bacterium / antibodies on it; membrane surrounds it",
      "Engulfs it by endocytosis into a phagosome",
      "Lysosomes fuse with the phagosome and hydrolytic enzymes digest the bacterium",
    ],
    modelAnswer: "The neutrophil moves towards chemicals released by the bacteria and damaged tissue (chemotaxis). Receptors on its surface bind to the bacterium, often to antibodies attached to it, and its membrane extends around it, engulfing it by endocytosis into a phagosome. Lysosomes fuse with the phagosome and release hydrolytic enzymes, which digest the bacterium.",
    explanation: "Chemotaxis → binding → endocytosis → lysosome fusion → digestion.",
    hints: ["Put the steps in order from attraction to digestion."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 5,
    stem: "Explain how the primary immune response leads to the production of antibodies against a bacterium.",
    points: [
      "Macrophage engulfs the bacterium and presents its antigens on its surface (antigen-presenting cell)",
      "T-helper cell with a complementary receptor binds the antigen and is activated (clonal selection)",
      "T-helper cells divide and release cytokines",
      "B-cell with complementary antibody receptors is selected and, stimulated by cytokines, divides by mitosis (clonal expansion)",
      "B-cells differentiate into plasma cells that secrete antibodies (and memory cells)",
    ],
    modelAnswer: "A macrophage engulfs the bacterium, digests it and displays its antigens on its surface. A T-helper cell with complementary receptors binds the presented antigen, is activated, divides and releases cytokines. A B-cell whose surface antibodies are complementary to the antigen is selected; stimulated by the cytokines it divides repeatedly by mitosis to form a clone. Most of these cells become plasma cells, which secrete large amounts of antibody; some become memory cells.",
    explanation: "Presentation → T-helper activation → cytokines → B-cell clonal selection and expansion → plasma cells.",
    hints: ["Start with antigen presentation."],
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3,
    stem: "Suggest why a person can catch a cold many times but usually has measles only once.",
    points: [
      "Colds are caused by many different viruses / strains with different antigens",
      "Memory cells from one cold are specific to that virus's antigens and do not recognise others, so each cold is a new primary response",
      "Measles virus has stable antigens, so memory cells from the first infection give lifelong immunity",
    ],
    modelAnswer: "Many different viruses cause colds, each with different antigens. Memory cells are specific, so those made after one cold do not recognise a different virus, and each new cold starts a primary response. The measles virus has stable antigens, so memory cells formed in the first infection recognise it again and destroy it before symptoms develop.",
    explanation: "Specificity of memory cells and antigen variety.",
    hints: ["Are memory cells specific?"],
  });

  // Practice structured: antibody data after two exposures
  const d2 = [0, 5, 10, 15, 20, 25, 30, 35];
  const c2 = [0, 2, 15, 6, 2, 95, 240, 190];
  const ratio = 240 / 15;
  chk(ratio, 16);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A mouse was injected with a harmless protein antigen on day 0 and again on day 20. The concentration of the specific antibody in its blood was measured.\n\n${table(["Day", ...d2.map(String)], [["Antibody / arbitrary units", ...c2.map(String)]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate how many times greater the second peak is than the first peak.",
        value: ratio, wrong: [225],
        explanation: t`Peaks: 15 (day 10) and 240 (day 30). $240 \div 15 = ${ratio}$.`,
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Compare the responses to the first and second injections.",
        points: [
          "Second response starts faster: 95 units within 5 days, against 2 units 5 days after the first",
          "Second response is much larger: peak 240 against 15 units",
          "Second response lasts longer / falls more slowly (still 190 at day 35)",
        ],
        modelAnswer: "After the second injection, antibody rose much faster (95 units within 5 days, compared with 2 units 5 days after the first). The second peak was much higher, 240 against 15 units, and the concentration stayed high for longer, still 190 units at day 35.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain the differences you have described.",
        points: [
          "The first injection caused a primary response; few B-cells matched the antigen, so clonal selection and expansion took time",
          "Memory cells were formed in the primary response",
          "On the second injection, many memory cells recognised the antigen at once and divided rapidly into plasma cells",
        ],
        modelAnswer: "In the primary response only a few B-cells had receptors complementary to the antigen, so selection and division took several days before many plasma cells existed. Memory cells formed then. At the second injection these numerous memory cells recognised the antigen immediately and divided quickly into many plasma cells, producing more antibody faster.",
      }),
      P.mcq({
        label: "(d)", stem: "Why did the antibody concentration fall between day 10 and day 20?",
        options: [
          ["Antibodies were broken down and plasma cells died once the antigen had been removed", "Correct: production stops and antibodies are gradually broken down."],
          ["The antigen destroyed the plasma cells", "A harmless protein does not destroy plasma cells."],
          ["Memory cells absorbed the antibodies from the blood to store them for later", "Memory cells do not remove antibodies."],
          ["The mouse lost blood each time a sample was taken", "Small samples would not explain the fall."],
        ],
        answer: "A",
        explanation: "With no antigen left, plasma cells die and antibodies are broken down, so the concentration falls.",
      }),
    ],
    explanation: "Memory cells make the secondary response faster, larger and longer.",
    hints: ["Compare the speed, size and duration of the two responses."],
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Thandeka cuts her hand on a rusty wire while working in a garden in Gweru. The next day the area around the cut is red, swollen and contains pus.",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the type of phagocyte that arrives first in large numbers and makes up most of the pus.",
        accepted: ["neutrophil", "neutrophils"],
        wrong: ["macrophage", "lymphocyte"],
        explanation: "**Neutrophils** arrive quickly, engulf bacteria and die, forming pus.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain how phagocytes find the bacteria in the cut.",
        points: ["Bacteria / damaged cells release chemicals", "Phagocytes move up the concentration gradient of these chemicals (chemotaxis), leaving capillaries to enter the tissue"],
        modelAnswer: "Bacteria and damaged cells release chemicals; phagocytes squeeze out of capillaries and move up the concentration gradient of these chemicals to the site (chemotaxis).",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why macrophages are important for starting the specific immune response to these bacteria.",
        points: ["Macrophages engulf bacteria and present their antigens on their surface", "This allows T-helper cells with complementary receptors to be selected and activated"],
        modelAnswer: "Macrophages engulf the bacteria and display their antigens on their cell surface, so T-helper cells with complementary receptors can bind and be activated, starting the specific response.",
      }),
      P.tf({
        label: "(d)", stem: "True or false: the redness and swelling are caused by the bacteria secreting antibodies.",
        answer: false,
        explanation: "False. Bacteria do not secrete antibodies; inflammation is the body's response (wider, leakier capillaries).",
      }),
    ],
    explanation: "Neutrophils and macrophages give the first, non-specific response; macrophages present antigens to start the specific response.",
    hints: ["Which phagocytes are short-lived and which present antigens?"],
  });

  b.card("DEFINITION", "What is an **antigen**?", "A molecule (usually protein or glycoprotein) recognised as non-self that stimulates an immune response.");
  b.card("FACT", "Steps of phagocytosis", "Chemotaxis → binding → endocytosis into phagosome → lysosomes fuse → hydrolytic enzymes digest.");
  b.card("CONCEPT", "Neutrophils versus macrophages", "Neutrophils: short-lived, fast, lobed nucleus. Macrophages: long-lived, in tissues, present antigens.");
  b.card("FACT", "Where do B- and T-cells mature?", "B-cells: bone marrow. T-cells: thymus.");
  b.card("DEFINITION", "Clonal selection and expansion", "The lymphocyte with a matching receptor is selected by the antigen and divides by mitosis to form a clone.");
  b.card("FACT", "Role of T-helper cells", "Release cytokines that stimulate B-cells (to form plasma cells), T-killer cells and phagocytes.");
  b.card("FACT", "Role of T-killer cells", "Bind infected or cancer cells showing the antigen and make holes in their membranes (perforin).");
  b.card("CONCEPT", "Secondary versus primary response", "Secondary: faster, larger, longer-lasting, because memory cells are present.");
  b.card("CONCEPT", "Why do plasma cells have much RER and Golgi?", "They synthesise and secrete large amounts of protein (antibodies).");
});
