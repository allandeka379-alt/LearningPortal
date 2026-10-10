// W3a: control of blood glucose and cell signalling (Cambridge only).
import { concept, P, t, chk, sfStr, dpStr, table, pctChange } from "../lib.mjs";

concept("abio.homeostasis.blood-glucose", { file: "homeostasis/blood-glucose", keyPrefix: "homeostasis.blood-glucose" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which cells secrete insulin?",
    options: [
      ["Beta cells of the islets of Langerhans", "Correct."],
      ["Alpha cells of the islets of Langerhans", "Alpha cells secrete glucagon."],
      ["Liver cells", "Liver cells are targets of insulin and glucagon."],
      ["Cells of the posterior pituitary", "The posterior pituitary releases ADH and oxytocin."],
    ],
    answer: "A",
    explanation: "**Beta cells** secrete insulin.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does insulin increase the uptake of glucose by muscle cells?",
    options: [
      ["It inserts more GLUT4 transporters into the membrane", "Correct: faster facilitated diffusion."],
      ["It actively pumps glucose into the cells using ATP", "Insulin is a hormone, not a pump."],
      ["It makes the phospholipid bilayer permeable to glucose", "Glucose needs transport proteins."],
      ["It converts glycogen into glucose inside the cells", "That is the effect of glucagon on the liver."],
    ],
    answer: "A",
    explanation: "Insulin → vesicles with **GLUT4** fuse with the membrane.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which process does glucagon stimulate in liver cells?",
    options: [
      ["Glycogenolysis", "Correct: glycogen → glucose."],
      ["Glycogenesis", "Glycogen synthesis is stimulated by insulin."],
      ["Deamination of glycogen", "Glycogen has no amino groups."],
      ["Insulin secretion", "Glucagon does not act on liver cells to make insulin."],
    ],
    answer: "A",
    explanation: "Glucagon stimulates **glycogenolysis** (and gluconeogenesis).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In the glucagon signalling pathway, which enzyme converts ATP into cyclic AMP?",
    options: [
      ["Adenylyl cyclase", "Correct."],
      ["Protein kinase A", "Protein kinase A is activated by cAMP."],
      ["Glycogen phosphorylase", "This breaks down glycogen."],
      ["ATP synthase", "This makes ATP."],
    ],
    answer: "A",
    explanation: "**Adenylyl cyclase** makes cAMP from ATP.",
    hints: ["The enzyme's name contains 'cyclase'."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does glucagon need a second messenger to affect enzymes inside liver cells?",
    options: [
      ["It is a peptide that cannot cross the cell surface membrane", "Correct: it binds to a surface receptor instead."],
      ["It is a steroid that is broken down in the cytoplasm", "Glucagon is a peptide, not a steroid."],
      ["It is too small to bind to enzymes directly", "Size is not the reason."],
      ["It is destroyed by the G-protein when it enters the cell", "Glucagon does not enter the cell."],
    ],
    answer: "A",
    explanation: "Peptide hormones are **water-soluble** and act at surface receptors.",
    hints: ["Can a charged peptide diffuse through the phospholipid bilayer?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why does glucagon not raise blood glucose by acting on skeletal muscle?",
    options: [
      ["Muscle cells have no glucagon receptors", "Correct: the liver is the target."],
      ["Muscle cells do not store glycogen", "Muscle cells store glycogen."],
      ["Muscle glycogen is converted to fat by glucagon", "Glucagon does not do this."],
      ["Glucagon cannot reach muscle in the blood", "Glucagon reaches all tissues in the blood."],
    ],
    answer: "A",
    explanation: "Only cells with the **receptor** respond.",
    hints: ["Hormones affect only cells with specific receptors."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "What is the main advantage of the enzyme cascade in glucagon signalling?",
    options: [
      ["A small amount of hormone produces a large, rapid release of glucose", "Correct: the signal is amplified."],
      ["It allows glucagon to enter the nucleus and switch on genes", "Glucagon acts through cAMP, not by entering the nucleus."],
      ["It ensures that the response lasts for many days", "The response is switched off when glucagon falls."],
      ["It prevents insulin from being secreted by the alpha cells", "Alpha cells do not secrete insulin."],
    ],
    answer: "A",
    explanation: "Each step activates many molecules: **amplification**.",
    hints: ["How many molecules does each active enzyme affect?"],
  });
  b.mcq({
    d: 4, skill: "APPLICATION",
    stem: "In a urine test strip, which enzyme catalyses the reaction that produces the coloured compound?",
    options: [
      ["Peroxidase", "Correct: it uses hydrogen peroxide to oxidise the chromogen."],
      ["Glucose oxidase", "Glucose oxidase produces hydrogen peroxide, not the colour."],
      ["Adenylyl cyclase", "This is part of cell signalling."],
      ["Amylase", "Amylase digests starch."],
    ],
    answer: "A",
    explanation: "Glucose oxidase makes H₂O₂; **peroxidase** uses it to colour the dye.",
    hints: ["Two enzymes act in sequence."],
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Insulin and glucagon have antagonistic effects on blood glucose concentration.",
    answer: true,
    explanation: "True. Insulin lowers it; glucagon raises it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Cyclic AMP is the hormone secreted by alpha cells.",
    answer: false,
    explanation: "False. Alpha cells secrete **glucagon**; cAMP is the second messenger inside target cells.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each molecule to its role in the glucagon signalling pathway.",
    pairs: [
      ["Glucagon", "First messenger binding to the receptor"],
      ["G-protein", "Activated by the receptor; activates adenylyl cyclase"],
      ["Cyclic AMP", "Second messenger that activates protein kinase A"],
      ["Glycogen phosphorylase", "Breaks down glycogen"],
    ],
    explanation: "Hormone → receptor → G-protein → adenylyl cyclase → cAMP → protein kinase A → cascade → glycogen phosphorylase.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "When blood glucose falls, {{blank:a}} cells secrete glucagon. Glucagon stimulates the liver to make glucose from amino acids and glycerol, a process called {{blank:b}}. When blood glucose rises, insulin stimulates {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["alpha"], choices: ["alpha", "beta", "liver"] },
      { id: "b", accepted: ["gluconeogenesis"], choices: ["gluconeogenesis", "glycogenesis", "glycolysis"] },
      { id: "c", accepted: ["glycogenesis"], choices: ["glycogenesis", "glycogenolysis", "gluconeogenesis"] },
    ],
    explanation: "Alpha cells → glucagon → gluconeogenesis; insulin → glycogenesis.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the second messenger produced inside liver cells when glucagon binds to its receptor.",
    accepted: ["cyclic AMP", "cAMP", "cyclic adenosine monophosphate"],
    wrong: ["ATP"],
    explanation: "**Cyclic AMP** (cAMP).",
  });

  const f = 20, n = 3;
  const amp = f ** n;
  chk(amp, 8000);
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "In a model of a signalling cascade, each active molecule activates 20 molecules of the next at each of three successive steps. By what factor is the signal amplified?",
    value: amp, wrong: [f * n, f ** 2],
    explanation: t`$20 \times 20 \times 20 = 20^3 = ${amp}$. Multiplying 20 by 3 (60) adds rather than multiplies the steps.`,
    hints: ["Each step multiplies the number of active molecules."],
  });
  const a0 = 5.2, a1 = 8.1;
  const pc = pctChange(a0, a1);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "In a glucose tolerance test, a person's blood glucose rose from 5.2 to 8.1 mmol dm⁻³. Calculate the percentage increase, to three significant figures.",
    value: pc, sf: 3, unit: "%", wrong: [sfStr(((a1 - a0) / a1) * 100, 3)],
    explanation: t`$\dfrac{8.1 - 5.2}{5.2} \times 100 = ${sfStr(pc, 3)}\%$.`,
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe how a rise in blood glucose concentration is corrected.",
    points: [
      "Beta cells in the islets of Langerhans detect the rise and secrete insulin (alpha cells secrete less glucagon)",
      "Insulin binds to receptors on muscle, liver (and fat) cells",
      "More GLUT4 transporters inserted into muscle / fat cell membranes, so more glucose enters by facilitated diffusion",
      "Glycogenesis in liver and muscle (and more respiration of glucose / conversion to fat)",
      "Blood glucose falls back to the set point; less insulin secreted: negative feedback",
    ],
    modelAnswer: "Beta cells in the islets of Langerhans detect the rise and secrete insulin, while alpha cells secrete less glucagon. Insulin binds to receptors on muscle, liver and fat cells. In muscle and fat cells, vesicles containing GLUT4 transporters fuse with the cell surface membrane, so more glucose enters by facilitated diffusion. Liver and muscle cells convert glucose to glycogen and respire more glucose. Blood glucose falls back towards the set point, and less insulin is secreted: negative feedback.",
    explanation: "Receptor and coordinator: beta cells; effectors: muscle, liver.",
    hints: ["Name the cells, the hormone, the transporter and the storage process."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 6,
    stem: "Describe how glucagon causes the breakdown of glycogen in a liver cell.",
    points: [
      "Glucagon binds to a specific receptor on the liver cell surface membrane, changing its shape",
      "Receptor activates a G-protein",
      "G-protein activates adenylyl cyclase",
      "Adenylyl cyclase converts ATP to cyclic AMP (second messenger)",
      "cAMP activates protein kinase A, which activates a cascade of enzymes (phosphorylation)",
      "Glycogen phosphorylase activated, breaking glycogen down to glucose; amplification at each step",
    ],
    modelAnswer: "Glucagon binds to a specific receptor in the liver cell surface membrane, changing its shape. The receptor activates a G-protein, which activates the enzyme adenylyl cyclase. Adenylyl cyclase converts ATP into cyclic AMP, the second messenger. Cyclic AMP activates protein kinase A, which phosphorylates and activates a cascade of enzymes, ending with glycogen phosphorylase, which breaks glycogen down into glucose. Each step activates many molecules, so the signal is amplified.",
    explanation: "Receptor → G-protein → adenylyl cyclase → cAMP → PKA → cascade.",
    hints: ["Six steps from the membrane to glycogen."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Compare the use of urine test strips and blood glucose biosensors.",
    points: [
      "Both use (immobilised) glucose oxidase, which is specific to glucose",
      "Test strip: colour change (peroxidase and chromogen) compared with a chart, semi-quantitative",
      "Biosensor: electric current, gives a precise numerical value of the current blood glucose (urine shows glucose only above the kidney threshold / over a past period)",
    ],
    modelAnswer: "Both use glucose oxidase, which is specific to glucose. A urine strip uses peroxidase and a chromogen to give a colour that is matched by eye to a chart, so it is only semi-quantitative and shows glucose only when blood levels have exceeded what the kidneys can reabsorb. A biosensor converts the reaction into an electric current, giving a precise number for the blood glucose concentration at that moment.",
    explanation: "Same enzyme, different detection.",
    hints: ["What does each one detect, and how precise is it?"],
  });

  const time = [0, 30, 60, 90, 120];
  const a = [5.1, 8.0, 6.8, 5.8, 5.3];
  const d = [7.8, 12.9, 15.6, 14.4, 13.1];
  const incB = d[2] - d[0];
  chk(incB, 7.8, 1e-9);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Two adults drank a standard glucose solution after fasting overnight. Their blood glucose concentrations were measured.\n\n${table(["Time after glucose drink / min", ...time.map(String)], [["Person A / mmol dm⁻³", ...a.map((x) => x.toFixed(1))], ["Person B / mmol dm⁻³", ...d.map((x) => x.toFixed(1))]])}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the increase in person B's blood glucose from 0 to 60 minutes, in mmol dm⁻³.", value: incB, dp: 1, wrong: [5.1], explanation: t`$15.6 - 7.8 = ${dpStr(incB, 1)}$ mmol dm⁻³.` }),
      P.manual({
        label: "(b)", marks: 3, stem: "Compare the responses of person A and person B.",
        points: ["B has a higher fasting concentration (7.8 compared with 5.1)", "B peaks later and higher (15.6 at 60 min compared with 8.0 at 30 min)", "A returns to near fasting value (5.3) by 120 min; B remains high (13.1)"],
        modelAnswer: "Person B starts higher (7.8 compared with 5.1 mmol dm⁻³), peaks later and much higher (15.6 at 60 minutes compared with 8.0 at 30 minutes), and is still 13.1 at 120 minutes, whereas person A is back to 5.3.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest an explanation for person B's results.",
        points: ["Too little insulin secreted (e.g. beta cells damaged) or target cells respond poorly to insulin (diabetes)", "So less glucose taken into cells / less glycogenesis, glucose stays in the blood"],
        modelAnswer: "Person B may have diabetes: either too little insulin is secreted or the target cells respond poorly to it, so glucose is taken up into cells and converted to glycogen too slowly and stays in the blood.",
      }),
      P.mcq({
        label: "(d)", stem: "Which hormone would person B's alpha cells secrete less of if their control were normal at 60 minutes?",
        options: [["Glucagon", "Correct: high glucose suppresses glucagon."], ["Insulin", "Insulin comes from beta cells."], ["ADH", "ADH is not from the pancreas."], ["Adrenaline", "Adrenaline is from the adrenal glands."]],
        answer: "A", explanation: "Alpha cells secrete **glucagon**.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "Suggest why both people fasted overnight before the test.",
        points: ["So that recent food does not affect the starting blood glucose / a fair baseline"],
        modelAnswer: "So that food eaten recently does not raise the starting concentration, giving a fair baseline.",
      }),
    ],
    explanation: "A normal response returns to baseline within two hours.",
    hints: ["Compare starting values, peaks and values at 120 min."],
  });

  b.struct({
    d: 3, skill: "UNDERSTANDING",
    stem: "A blood glucose meter uses a strip containing an immobilised enzyme on an electrode.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the enzyme that reacts with glucose in the strip.", accepted: ["glucose oxidase"], wrong: ["peroxidase"], explanation: "**Glucose oxidase.**" }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain how the meter gives a reading of the glucose concentration.",
        points: ["Glucose oxidase oxidises glucose (forming gluconolactone / hydrogen peroxide)", "The reaction produces an electric current at the electrode proportional to the glucose concentration, shown as a number"],
        modelAnswer: "Glucose oxidase oxidises glucose in the blood, and the reaction produces a small electric current at the electrode that is proportional to the glucose concentration; the meter converts the current into a reading.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the enzyme responds only to glucose and not to other sugars in the blood.",
        points: ["Active site has a specific shape", "Complementary only to glucose, so only glucose forms enzyme-substrate complexes"],
        modelAnswer: "The active site of glucose oxidase has a specific shape that is complementary only to glucose, so only glucose can form enzyme-substrate complexes.",
      }),
      P.tf({ label: "(d)", stem: "True or false: a biosensor reading shows the blood glucose concentration at the time of testing.", answer: true, explanation: "True; urine strips show glucose collected in urine over a period." }),
    ],
    explanation: "Biosensors couple a specific enzyme to an electrode.",
    hints: ["Which enzyme property gives specificity?"],
  });

  b.card("FACT", "Hormones of the islets of Langerhans", "Alpha cells: glucagon (raises glucose). Beta cells: insulin (lowers glucose).");
  b.card("CONCEPT", "Effects of insulin", "More GLUT4 in muscle and fat cell membranes; glycogenesis; more respiration of glucose; glucose to fat.");
  b.card("CONCEPT", "Effects of glucagon", "On liver cells: glycogenolysis and gluconeogenesis; glucose released into blood.");
  b.card("CONCEPT", "Glucagon signalling pathway", "Receptor → G-protein → adenylyl cyclase → ATP to cAMP → protein kinase A → cascade → glycogen phosphorylase.");
  b.card("DEFINITION", "Define **second messenger**.", "Molecule (e.g. cAMP) inside a cell that relays the signal from a hormone bound to a surface receptor.");
  b.card("DEFINITION", "Define **gluconeogenesis**.", "Making glucose from non-carbohydrates (amino acids, glycerol) in the liver.");
  b.card("FACT", "Enzymes on urine glucose test strips", "Glucose oxidase (glucose → H₂O₂) and peroxidase (H₂O₂ + chromogen → colour).");
  b.card("CONCEPT", "Why amplification?", "Each activated enzyme activates many of the next, so a little hormone gives a large, fast response.");
});
