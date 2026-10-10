// W4a: natural selection (both boards; ZIMSEC Form 6, Cambridge A Level).
import { concept, P, t, chk, table, dpStr, sfStr, mean, pctChange } from "../lib.mjs";

concept("abio.evolution.natural-selection", { file: "evolution/natural-selection", keyPrefix: "evolution.natural-selection" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What changes in a population as a result of natural selection over many generations?",
    options: [
      ["The frequency of alleles in the gene pool", "Correct."],
      ["The alleles carried by each surviving individual", "An individual's alleles do not change during its life."],
      ["The rate of mutation in each individual", "Selection does not change the mutation rate."],
      ["The number of chromosomes in each cell", "Chromosome number is not what selection changes."],
    ],
    answer: "A",
    explanation: "Selection changes allele frequencies in populations; individuals do not evolve.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the effect of stabilising selection on the distribution of a characteristic?",
    options: [
      ["The mean stays the same and the range becomes narrower", "Correct: extremes are selected against."],
      ["The mean shifts towards one extreme", "This is directional selection."],
      ["Two peaks form at the two extremes", "This is disruptive selection."],
      ["The range becomes wider and the mean increases with each generation", "Stabilising selection narrows the range."],
    ],
    answer: "A",
    explanation: "Stabilising selection favours intermediate phenotypes, keeping the mean and reducing the variation.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How can an allele for antibiotic resistance be passed from one bacterial species to another?",
    options: [
      ["On a plasmid transferred by conjugation", "Correct: horizontal gene transfer."],
      ["By binary fission of the resistant bacterium", "Binary fission passes alleles to offspring of the same species (vertical transfer)."],
      ["By meiosis and fertilisation between bacteria", "Bacteria do not reproduce by meiosis."],
      ["Through the antibiotic causing the same mutation", "Antibiotics do not cause specific mutations."],
    ],
    answer: "A",
    explanation: "Plasmids carrying resistance genes can pass between bacteria, even of different species, by conjugation.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which sequence correctly describes the development of antibiotic resistance in a population of bacteria?",
    options: [
      ["Random mutation, antibiotic applied, resistant cells survive and divide, resistance allele becomes common", "Correct."],
      ["Antibiotic applied, bacteria mutate in response, resistant cells survive, resistance becomes common", "The antibiotic does not cause the mutation."],
      ["Antibiotic applied, bacteria become immune, immune cells divide, immunity spreads", "Bacteria are resistant, not immune."],
      ["Random mutation, resistant cells killed by the antibiotic, susceptible cells divide, and resistance then spreads quickly", "Resistant cells survive; susceptible cells are killed."],
    ],
    answer: "A",
    explanation: "Mutation is random and comes first; the antibiotic is the selection pressure.",
    hints: ["Does the mutation happen before or after the antibiotic is used?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does the sickle cell allele remain common in regions where falciparum malaria is common?",
    options: [
      ["Heterozygotes are partly protected against severe malaria and have mild symptoms", "Correct: heterozygote advantage."],
      ["People with sickle cell anaemia are fully immune to malaria", "Homozygotes suffer a serious anaemia."],
      ["Malaria parasites cause the sickle cell mutation in red blood cells", "The parasite does not cause the mutation."],
      ["People with normal haemoglobin cannot be infected by the malaria parasite at any age", "They are the most susceptible to severe malaria."],
    ],
    answer: "A",
    explanation: "Carriers ($Hb^A Hb^S$) survive malaria better than $Hb^A Hb^A$ and are much healthier than $Hb^S Hb^S$, so both alleles persist.",
    hints: ["Which genotype has the advantage?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "On an island, seeds are either very small or very large, with few of medium size. Over many generations, a finch population develops two beak-size peaks. Which type of selection is this?",
    options: [
      ["Disruptive selection", "Correct: both extremes are favoured."],
      ["Stabilising selection", "That would favour medium beaks."],
      ["Directional selection", "That would shift the mean in one direction only."],
      ["Artificial selection", "No humans are choosing which birds breed."],
    ],
    answer: "A",
    explanation: "Intermediate beaks are poorly suited to either seed size, so both extremes are favoured.",
    hints: ["Which phenotypes are favoured?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Over 30 years in one hospital, the mean birth mass of babies stayed at about 3.3 kg, while the standard deviation of birth mass fell. Survival of very small and very large babies was lower than average throughout. Which conclusion is best supported?",
    options: [
      ["Stabilising selection on birth mass, with the extremes selected against", "Correct: constant mean, narrower spread, lower survival at extremes."],
      ["Directional selection towards higher birth mass", "The mean did not change."],
      ["Disruptive selection favouring both small and large babies over average ones", "The extremes had lower, not higher, survival."],
      ["No selection, because the mean did not change", "A falling SD with poorer survival at the extremes indicates selection."],
    ],
    answer: "A",
    explanation: "A constant mean with reduced spread and lower survival of extremes is stabilising selection.",
    hints: ["Look at what happened to the mean and to the spread."],
  });

  // Numerical: percentage mortality in a bioassay (different numbers from the lesson)
  const tested = 120, alive = 27;
  const mort = ((tested - alive) / tested) * 100;
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: `In an insecticide test, ${alive} of ${tested} mosquitoes were still alive after 24 hours. Calculate the percentage mortality, to three significant figures.`,
    value: mort, sf: 3, unit: "%", wrong: [sfStr((alive / tested) * 100, 3)],
    explanation: `Dead = ${tested} − ${alive} = ${tested - alive}; ${tested - alive} ÷ ${tested} × 100 = ${sfStr(mort, 3)}%. (${sfStr((alive / tested) * 100, 3)}% is the survival, not the mortality.)`,
  });
  // Calculation: resistant fraction
  const plateNo = 312, plateAb = 39;
  const res = (plateAb / plateNo) * 100;
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `The same volume of a diluted bacterial culture was spread on two agar plates. The plate without antibiotic grew ${plateNo} colonies; the plate containing ampicillin grew ${plateAb}. Assuming each colony grew from one bacterium, calculate the percentage of bacteria in the culture that were resistant to ampicillin.`,
    value: res, unit: "%", sf: 3, wrong: [sfStr((plateAb / (plateNo + plateAb)) * 100, 3)],
    explanation: t`1. Colonies on the plain plate represent all viable bacteria: ${plateNo}.
2. Colonies on the ampicillin plate represent resistant bacteria: ${plateAb}.
3. $\dfrac{${plateAb}}{${plateNo}} \times 100 = ${sfStr(res, 3)}\%$.
Adding the two counts for the denominator is wrong: the resistant bacteria are already included in the ${plateNo}.`,
    hints: ["The plain plate grows both resistant and susceptible bacteria."],
  });
  // Numerical: percentage change in mean
  const before = 14.2, after = 16.9;
  calc({
    d: 3, skill: "APPLICATION",
    stem: `After a drought, the mean beak depth of a seed-eating bird population rose from ${before} mm to ${after} mm in one generation because only birds able to crack large, hard seeds survived. Calculate the percentage increase in mean beak depth, to three significant figures.`,
    value: pctChange(before, after), sf: 3, unit: "%", wrong: [sfStr(((after - before) / after) * 100, 3)],
    explanation: t`$\dfrac{${after} - ${before}}{${before}} \times 100 = ${sfStr(pctChange(before, after), 3)}\%$. This is directional selection.`,
    hints: ["Divide the change by the original value."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Natural selection acts on phenotypes, but it changes the frequency of alleles.",
    answer: true,
    explanation: "True. Survival depends on the phenotype; the alleles of the survivors are passed on.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Exposure to an insecticide causes mosquitoes to develop resistance alleles during their lifetime.",
    answer: false,
    explanation: "False. Resistance alleles arise by random mutation; the insecticide selects mosquitoes that already have them.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example with the type of selection it shows.",
    pairs: [
      ["Babies of very low or very high birth mass have lower survival", "Stabilising"],
      ["Bacteria in a patient treated repeatedly with one antibiotic", "Directional"],
      ["Both very small and very large seeds favour two beak sizes", "Disruptive"],
      ["Farmers choosing the highest-yielding cows to breed from", "Artificial"],
    ],
    explanation: "Extremes removed: stabilising; one extreme favoured: directional; both extremes: disruptive; humans choosing: artificial.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "Bacteria pass resistance alleles to their offspring by {{blank:a}} gene transfer, and to other bacteria on plasmids by {{blank:b}} gene transfer.",
    blanks: [
      { id: "a", accepted: ["vertical"], choices: ["vertical", "horizontal"] },
      { id: "b", accepted: ["horizontal"], choices: ["horizontal", "vertical"] },
    ],
    explanation: "Vertical: parent to offspring. Horizontal: between bacteria, e.g. by conjugation.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the process by which a plasmid is transferred from one bacterium to another through a tube between the cells.",
    accepted: ["conjugation", "bacterial conjugation"],
    wrong: ["transformation", "binary fission"],
    explanation: "Conjugation.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 5,
    stem: "Explain how a population of bacteria becomes resistant to an antibiotic.",
    points: [
      "Random mutation produces an allele for resistance (e.g. coding for an enzyme that breaks down the antibiotic)",
      "The antibiotic is a selection pressure: susceptible bacteria are killed",
      "Resistant bacteria survive and reproduce by binary fission without competition",
      "They pass the resistance allele to their offspring (vertical transfer) / on plasmids by conjugation (horizontal transfer)",
      "Over many generations the frequency of the resistance allele increases",
    ],
    modelAnswer: "A random mutation produces an allele that gives resistance, for example by coding for an enzyme that breaks down the antibiotic. When the antibiotic is used, it acts as a selection pressure: susceptible bacteria are killed but resistant ones survive. They reproduce by binary fission with little competition and pass the allele to their offspring; it may also spread to other bacteria on plasmids by conjugation. Over many generations the resistance allele becomes common in the population.",
    explanation: "Mutation, selection, survival, reproduction, allele frequency.",
    hints: ["Start with where the resistance allele comes from."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Suggest three ways in which the spread of antibiotic-resistant bacteria could be slowed.",
    points: [
      "Prescribe antibiotics only for bacterial infections (not viral) / avoid routine use in animal feed",
      "Patients complete the full course, so all bacteria are killed",
      "Use combinations or rotate different antibiotics / good hygiene and infection control in hospitals",
    ],
    modelAnswer: "Doctors should prescribe antibiotics only for bacterial infections, and their routine use in animal feed should be reduced. Patients should finish the full course. Using combinations of antibiotics, rotating them, and strict hygiene in hospitals also slow the spread.",
    explanation: "Reduce selection pressure and transmission.",
    hints: ["Think about selection pressure and spread."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain why the frequency of the sickle cell allele is high in some malarial regions of Africa but low among people whose ancestors lived where there was no malaria.",
    points: [
      "$Hb^S Hb^S$ causes sickle cell anaemia, which reduces survival / reproduction (selection against the allele)",
      "Heterozygotes ($Hb^A Hb^S$) are partly protected against severe malaria",
      "In malarial regions heterozygotes survive and reproduce more than $Hb^A Hb^A$, so $Hb^S$ is passed on and maintained (heterozygote advantage)",
      "Without malaria there is no heterozygote advantage, so selection against $Hb^S Hb^S$ keeps the allele rare",
    ],
    modelAnswer: "People who are $Hb^S Hb^S$ have sickle cell anaemia, which reduces survival, so there is selection against the allele. However, heterozygotes are partly protected against severe malaria. In malarial regions they survive and reproduce more than $Hb^A Hb^A$ people, so they pass on $Hb^S$ and the allele stays at a high frequency. Where there is no malaria, heterozygotes have no advantage, and selection against $Hb^S Hb^S$ keeps the allele rare.",
    explanation: "Heterozygote advantage in malarial regions.",
    hints: ["Compare the fitness of the three genotypes in each region."],
  });

  // Practice structured 1: mosquito resistance survey
  const years = [2018, 2020, 2022, 2024];
  const tested2 = [150, 150, 150, 150];
  const surv = [9, 24, 51, 78];
  const mortPct = surv.map((s, i) => ((tested2[i] - s) / tested2[i]) * 100);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `An illustrative data set: a malaria-control team tested female *Anopheles* mosquitoes from one district with the same dose of a pyrethroid insecticide every two years. Indoor spraying with pyrethroids took place every year.\n\n${table(["Year", ...years.map(String)], [["Mosquitoes tested", ...tested2.map(String)], ["Alive after 24 hours", ...surv.map(String)]])}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the percentage mortality in 2024, to three significant figures.", value: mortPct[3], sf: 3, unit: "%", wrong: [sfStr((surv[3] / 150) * 100, 3)], explanation: `(150 − 78) ÷ 150 × 100 = ${sfStr(mortPct[3], 3)}%.` }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe the trend in the results.", points: ["The number surviving rises each test, from 9 in 2018 to 78 in 2024", "So mortality falls from 94% to 48% / the proportion resistant increases"], modelAnswer: "The number of mosquitoes surviving the dose rises at every test, from 9 of 150 in 2018 to 78 of 150 in 2024, so mortality falls from 94% to 48%." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain the trend.", points: ["Some mosquitoes carried resistance alleles from random mutation (e.g. altered sodium channel or detoxifying enzymes)", "Spraying is a selection pressure: susceptible mosquitoes die", "Resistant mosquitoes survive, mate and lay eggs, passing on resistance alleles", "Over generations the frequency of resistance alleles increases: directional selection"], modelAnswer: "Some mosquitoes carried alleles giving resistance, which arose by random mutation, for example altering the sodium channel protein the pyrethroid binds to. Yearly spraying acted as a selection pressure, killing susceptible mosquitoes. Resistant mosquitoes survived, mated and laid eggs, passing on their resistance alleles. Over many generations the frequency of resistance alleles rose: directional selection." }),
      P.manual({ label: "(d)", marks: 1, stem: "Suggest why the team used the same dose and the same number of mosquitoes each time.", points: ["So that results from different years can be compared fairly / only the mosquito population changes"], modelAnswer: "So that the only difference between tests is the mosquito population, allowing a fair comparison between years." }),
    ],
    explanation: "Process the data, describe the trend, then explain it by mutation and selection.",
    hints: ["Mortality = dead ÷ tested × 100."],
    calculator: true,
  });

  // Practice structured 2: types of selection from distributions
  const cls = ["2.0–2.4", "2.5–2.9", "3.0–3.4", "3.5–3.9", "4.0–4.4", "4.5–4.9"];
  const born = [40, 160, 420, 300, 70, 10];
  const died = [8, 9, 10, 9, 6, 2];
  const deathPct = born.map((n, i) => (died[i] / n) * 100);
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `An illustrative data set shows the numbers of babies born in each birth-mass class at a hospital over one year and the numbers who died in the first month.\n\n${table(["Birth mass / kg", ...cls], [["Babies born", ...born.map(String)], ["Deaths in first month", ...died.map(String)]])}`,
    parts: [
      P.group({
        label: "(a)", stem: "Calculate the percentage of babies who died in each class below.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "2.0–2.4 kg.", value: deathPct[0], unit: "%", explanation: `8 ÷ 40 × 100 = ${deathPct[0]}%.` }),
          P.num({ label: "(ii)", marks: 1, stem: "3.0–3.4 kg, to three significant figures.", value: deathPct[2], sf: 3, unit: "%", explanation: `10 ÷ 420 × 100 = ${sfStr(deathPct[2], 3)}%.` }),
        ],
      }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why it is better to compare percentages than numbers of deaths.", points: ["Different numbers of babies were born in each class", "Percentages allow a fair comparison of the risk of death in each class (more deaths in a class may just reflect more births)"], modelAnswer: "The numbers born in each class are very different, so the numbers of deaths partly reflect how many babies were in each class. Percentages show the risk of death in each class and allow a fair comparison." }),
      P.manual({ label: "(c)", marks: 2, stem: "Name the type of selection shown and explain your answer.", points: ["Stabilising selection", "Mortality is highest at the extremes (20% at 2.0–2.4 kg and at 4.5–4.9 kg) and lowest near the mean (about 2.4% at 3.0–3.4 kg), so intermediate masses are favoured"], modelAnswer: "Stabilising selection. The percentage of deaths is highest at both extremes (20% for 2.0–2.4 kg and 4.5–4.9 kg) and lowest near the middle (about 2.4% for 3.0–3.4 kg), so babies of intermediate mass are favoured, keeping the mean steady and narrowing the range." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest how improved medical care might change this selection over time.", points: ["Better care for very small or very large babies (incubators, Caesarean births) raises their survival", "So the selection pressure is reduced and the range of birth mass may widen"], modelAnswer: "Neonatal intensive care for small babies and Caesarean deliveries for large ones raise survival at the extremes, reducing the selection pressure, so the spread of birth masses may widen over generations." }),
    ],
    explanation: "Percentage mortality is highest at the extremes: stabilising selection.",
    hints: ["Compare percentage deaths at the extremes and the middle."],
    calculator: true,
  });
  chk(deathPct[0], 20); chk(deathPct[5], 20);

  b.card("DEFINITION", "Natural selection", "Better-adapted individuals survive and reproduce more, passing on their alleles, so the frequency of those alleles increases over generations.");
  b.card("DEFINITION", "Selection pressure", "An environmental factor (predator, disease, climate, chemical) that affects survival and reproduction of different phenotypes.");
  b.card("CONCEPT", "Stabilising selection", "Extremes selected against: mean unchanged, range narrower (e.g. human birth mass).");
  b.card("CONCEPT", "Directional selection", "One extreme favoured, often after environmental change: the mean shifts (e.g. antibiotic resistance).");
  b.card("CONCEPT", "Disruptive selection", "Both extremes favoured, intermediates selected against: two peaks may form.");
  b.card("CONCEPT", "Vertical and horizontal gene transfer", "Vertical: parent to offspring by binary fission. Horizontal: between bacteria, e.g. plasmids by conjugation.");
  b.card("CONCEPT", "Why is Hb^S common where malaria is common?", "Heterozygotes are partly protected against severe malaria (heterozygote advantage), so the allele is maintained.");
  b.card("FACT", "Does an antibiotic cause resistance mutations?", "No. Mutations are random; the antibiotic selects bacteria that already carry resistance alleles.");
});
