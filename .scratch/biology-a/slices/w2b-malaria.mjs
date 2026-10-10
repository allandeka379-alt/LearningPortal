// W2b: malaria.
import { concept, P, t, chk, table, dpStr, rnd, pctChange } from "../lib.mjs";

concept("abio.disease.malaria", { file: "disease/malaria", keyPrefix: "disease.malaria" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "To which group of organisms does the malaria pathogen *Plasmodium* belong?",
    options: [
      ["Protoctists", "Correct: *Plasmodium* is a single-celled eukaryote."],
      ["Bacteria", "Bacteria are prokaryotes; *Plasmodium* has a nucleus."],
      ["Viruses", "Viruses are not cells; *Plasmodium* is a cell."],
      ["Fungi", "*Plasmodium* has no cell wall of chitin and is not a fungus."],
    ],
    answer: "A",
    explanation: "*Plasmodium* is a **protoctist** (protist): a single-celled eukaryotic parasite.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do only female *Anopheles* mosquitoes transmit malaria?",
    options: [
      ["Only females feed on blood, which they need to make eggs", "Correct: males feed on plant juices and nectar."],
      ["Only females have salivary glands in which the parasite can live", "Males also have salivary glands; they simply do not bite people."],
      ["Male mosquitoes are killed by the parasite before they can bite", "Males do not take blood meals, so they never pick up the parasite."],
      ["Females live in houses while males live only in water", "Adult males and females both fly; larvae live in water."],
    ],
    answer: "A",
    explanation: "Only female mosquitoes take **blood meals** (for egg production), so only they pick up and pass on *Plasmodium*.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which species of *Plasmodium* causes most of the severe malaria and deaths in Africa?",
    options: [
      ["*P. falciparum*", "Correct: the most dangerous species and the commonest in Africa."],
      ["*P. vivax*", "*P. vivax* is more common in Asia and the Americas and is usually less severe."],
      ["*P. malariae*", "This species usually causes milder, long-lasting infections."],
      ["*P. ovale*", "This species is less common and usually less severe."],
    ],
    answer: "A",
    explanation: "*Plasmodium falciparum* causes most severe malaria and deaths, especially in sub-Saharan Africa.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why is malaria transmission low in Harare but high in the Zambezi valley?",
    options: [
      ["Cooler highland temperatures slow the parasite's development in the mosquito", "Correct: below about 16-18 °C the parasite cannot complete development before the mosquito dies."],
      ["People in Harare have inherited immunity to malaria from their parents", "Immunity comes from repeated infection, which is rare in Harare."],
      ["Mosquitoes cannot fly in the thinner air of the highveld", "Mosquitoes can fly at these altitudes; temperature is the limiting factor."],
      ["The parasite is killed by the treated water supply in Harare", "Malaria is not spread by drinking water."],
    ],
    answer: "A",
    explanation: "Harare is on the cool highveld. Low temperatures slow the development of *Plasmodium* inside the mosquito, so few mosquitoes live long enough to become infectious.",
    hints: ["Which part of the cycle depends on temperature?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "How does an insecticide-treated bed net protect people who do not sleep under one?",
    options: [
      ["Mosquitoes landing on treated nets die, so fewer infectious ones survive", "Correct: the community effect of insecticide-treated nets."],
      ["The nets release a smell that repels mosquitoes from every house in the whole village", "Nets work mainly by killing and blocking mosquitoes, not by a village-wide repellent."],
      ["The nets give immunity that is passed to other people", "Nets do not affect immunity."],
      ["The nets kill *Plasmodium* in the blood of the person sleeping under them", "Insecticide acts on mosquitoes, not on parasites in human blood."],
    ],
    answer: "A",
    explanation: "When many people use treated nets, mosquitoes trying to feed are killed, which lowers the number of infectious mosquitoes for everyone.",
    hints: ["What happens to a mosquito that lands on the net?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which feature of *Plasmodium* best explains why it took so long to develop an effective vaccine against malaria?",
    options: [
      ["It spends much of its life inside liver and red blood cells and changes its surface antigens", "Correct: hidden from antibodies and antigenically variable."],
      ["It reproduces only asexually, so every parasite in every person is genetically identical", "It reproduces sexually in the mosquito; genetic variation makes vaccine design harder, not easier."],
      ["It has no antigens because it is not a living cell", "*Plasmodium* is a eukaryotic cell with many antigens."],
      ["It is destroyed by the immune system before memory cells can form", "If it were destroyed so easily, malaria would not be a major disease."],
    ],
    answer: "A",
    explanation: "Inside liver cells and red blood cells the parasite is hidden from antibodies, and its surface antigens vary between stages and strains.",
    hints: ["Think about where the parasite lives and what antibodies recognise."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How does indoor residual spraying reduce malaria transmission?",
    options: [
      ["It kills female mosquitoes that rest on walls after a blood meal", "Correct: *Anopheles* often rests indoors after feeding."],
      ["It kills the larvae developing in water stored in drums and containers inside houses", "Spraying walls does not reach larvae in water."],
      ["It kills the parasites inside people who live in the house", "The insecticide acts on mosquitoes, not on people's blood."],
      ["It makes the walls too cold for mosquitoes to survive", "Spraying works by poisoning mosquitoes, not by cooling."],
    ],
    answer: "A",
    explanation: "Long-lasting insecticide on walls and ceilings kills mosquitoes resting indoors after feeding, before the parasite has developed enough for them to infect someone else.",
    hints: ["Where does a mosquito rest after feeding?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A pregnant woman with malaria gives birth to a baby who has *Plasmodium* in its blood at birth. How was the baby most likely infected?",
    options: [
      ["Parasites crossed the placenta from the mother's blood", "Correct: congenital transmission across the placenta (or at birth)."],
      ["The baby was bitten by a male mosquito in the delivery room", "Male mosquitoes do not bite."],
      ["The baby breathed in parasites from the mother's breath", "Malaria is not transmitted through the air."],
      ["The baby inherited genes for malaria from the mother", "Malaria is an infectious disease, not an inherited one."],
    ],
    answer: "A",
    explanation: "Malaria can be passed **from mother to fetus** across the placenta, or during birth.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Malaria can be transmitted by a transfusion of blood from an infected donor.",
    answer: true,
    explanation: "True. Parasites in the donor's red blood cells pass to the recipient; donated blood is therefore screened.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Penicillin is an effective treatment for malaria.",
    answer: false,
    explanation: "False. Penicillin acts on bacterial cell walls; *Plasmodium* is a protoctist. Malaria is treated with antimalarial drugs such as artemisinin combination therapy.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each malaria control measure with the stage it targets.",
    pairs: [
      ["Draining swamps and puddles", "Mosquito larvae"],
      ["Insecticide-treated bed nets", "Adult mosquitoes biting at night"],
      ["Artemisinin combination therapy", "Parasites in an infected person's blood"],
      ["Screening donated blood", "Transmission by transfusion"],
    ],
    explanation: "Control can target larvae, adult mosquitoes, parasites in people or other routes of transmission.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Malaria is caused by the protoctist {{blank:a}} and transmitted by the female {{blank:b}} mosquito, which is the {{blank:c}}. In the human body the parasite multiplies first in the {{blank:d}} and then in red blood cells.",
    blanks: [
      { id: "a", accepted: ["Plasmodium"], choices: ["Plasmodium", "Vibrio", "Mycobacterium"] },
      { id: "b", accepted: ["Anopheles"], choices: ["Anopheles", "Aedes", "Culex"] },
      { id: "c", accepted: ["vector"], choices: ["vector", "pathogen", "carrier"] },
      { id: "d", accepted: ["liver"], choices: ["liver", "lungs", "spleen"] },
    ],
    explanation: "*Plasmodium* (pathogen), *Anopheles* (vector), liver then red blood cells.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for an organism, such as the *Anopheles* mosquito, that carries a pathogen from one host to another.",
    accepted: ["vector", "a vector", "disease vector"],
    wrong: ["carrier", "host"],
    explanation: "A **vector** carries a pathogen between hosts. A *carrier* is an infected person without symptoms.",
  });

  // Numerical: percentage decrease (hypothetical, different from the lesson)
  const before = 5120, after = 3712;
  const dec = -pctChange(before, after);
  chk(rnd(dec, 1), 27.5);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "A hypothetical district recorded 5,120 malaria cases in the year before indoor residual spraying began and 3,712 in the following year. Calculate the percentage decrease. Give your answer to one decimal place.",
    value: dec, dp: 1, unit: "%",
    wrong: [rnd(((before - after) / after) * 100, 1)],
    explanation: t`Decrease $= 5120 - 3712 = 1408$. Percentage decrease $= \dfrac{1408}{5120} \times 100 = ${dpStr(dec, 1)}\%$. Dividing by 3,712 instead gives ${dpStr(((before - after) / after) * 100, 1)}%, which is wrong.`,
  });

  // Calculation: proportion of positive rapid tests (hypothetical)
  const tested = 480, pos = 129;
  const pPos = (pos / tested) * 100;
  chk(rnd(pPos, 1), 26.9);
  calc({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: "At a clinic in the Zambezi valley, 480 people with fever were given a malaria rapid diagnostic test in one month, and 129 tested positive. Calculate the percentage of people with fever who had malaria, and use your answer to suggest why the test is used before treatment.",
    value: pPos, unit: "%",
    wrong: [Number(((pos / (tested - pos)) * 100).toFixed(2))],
    explanation: t`1. Percentage positive $= \dfrac{129}{480} \times 100 = ${dpStr(pPos, 2)}\%$ = ${dpStr(pPos, 1)}% (3 s.f.).
2. Dividing by the number testing negative (351) gives ${dpStr((pos / (tested - pos)) * 100, 2)}%, which is wrong.
3. About three-quarters of the people with fever did not have malaria, so testing first avoids giving antimalarial drugs unnecessarily (saving money and slowing resistance) and makes sure the real cause of fever is looked for.`,
    hints: ["Percentage = part ÷ whole × 100."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why malaria transmission in Zimbabwe peaks during and just after the rainy season.",
    points: [
      "Rain creates standing water / pools as breeding sites for mosquito larvae",
      "So the number of (adult female Anopheles) mosquitoes increases",
      "Warm temperatures in summer allow faster development of the parasite in the mosquito, or the peak in cases lags behind rainfall because of development time",
    ],
    modelAnswer: "The rains create many pools of standing water where Anopheles larvae develop, so the mosquito population rises. The rainy season is also hot, so the parasite develops quickly inside the mosquitoes. Cases peak a few weeks after the heaviest rain because larvae, parasites and infections all need time to develop.",
    explanation: "Link rainfall to breeding sites and temperature to parasite development.",
    hints: ["Where do mosquito larvae live?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest reasons why malaria remains difficult to control even though effective nets, insecticides and drugs exist.",
    points: [
      "Parasites have become resistant to drugs (e.g. chloroquine) or mosquitoes resistant to insecticides",
      "Parasite lives inside liver / red blood cells and changes its antigens, so vaccines give only partial protection",
      "Social: nets not used / used for other purposes / people live far from clinics / movement of people",
      "Economic: cost of nets, insecticides, drugs and trained spray teams; nets and spraying must be repeated",
    ],
    modelAnswer: "Resistance has evolved: Plasmodium to drugs such as chloroquine and mosquitoes to some insecticides. The parasite hides inside cells and changes its antigens, so the vaccines give only partial protection. Nets are not always used every night, and people living far from clinics may be treated late. Nets, sprays, drugs and tests cost money and must be replaced or repeated every year.",
    explanation: "Give biological, social and economic reasons tied to malaria.",
    hints: ["Consider resistance, the parasite, people and money."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "Suggest why a person who grew up in Harare and moves to work in Hwange is at greater risk of severe malaria than a person who grew up in Hwange.",
    points: [
      "The person from Harare has had few or no previous infections, so has little or no (partial) immunity",
      "People who grew up in Hwange have had repeated infections and developed partial immunity / memory cells",
    ],
    modelAnswer: "Malaria transmission is low in Harare, so the newcomer has had few or no infections and has no partial immunity. People raised in Hwange have been infected repeatedly and have developed partial immunity that limits severe disease.",
    explanation: "Partial immunity develops only after repeated exposure.",
    hints: ["Think about previous exposure."],
  });

  // Practice structured: altitude and cases (hypothetical)
  const alt = [400, 800, 1200, 1500];
  const temp = [26, 23, 20, 18];
  const rate = [180, 95, 22, 3];
  const fold = rate[0] / rate[2];
  chk(rnd(fold, 1), 8.2);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Hypothetical data were collected from four areas at different altitudes in one country.\n\n${table(["Altitude / m", "Mean summer temperature / °C", "Malaria cases per 1000 people per year"], alt.map((a, i) => [String(a), String(temp[i]), String(rate[i])]))}`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Describe the relationship between altitude and malaria cases.",
        points: ["As altitude increases, malaria cases decrease", "Quoted figures: 180 per 1000 at 400 m falling to 3 per 1000 at 1500 m (or steepest fall between 800 and 1200 m)"],
        modelAnswer: "Cases fall as altitude rises, from 180 per 1000 people at 400 m to only 3 per 1000 at 1500 m.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate how many times greater the rate at 400 m is than at 1200 m. Give your answer to one decimal place.",
        value: fold, dp: 1, wrong: [rnd(rate[2] / rate[0], 2)],
        explanation: t`$180 \div 22 = ${dpStr(fold, 2)}$, so ${dpStr(fold, 1)} times.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain the relationship you described.",
        points: ["Temperature falls as altitude increases", "Parasite development in the mosquito is slower at low temperatures, so fewer mosquitoes become infectious (or fewer mosquitoes survive / breed)"],
        modelAnswer: "Higher areas are cooler, and at lower temperatures Plasmodium develops too slowly inside the mosquito for many mosquitoes to become infectious before they die.",
      }),
      P.mcq({
        label: "(d)", stem: "Which factor, not shown in the table, could also explain the differences between the areas?",
        options: [
          ["The amount of standing water for mosquito breeding", "Correct: rainfall, dams and irrigation affect breeding sites."],
          ["The number of male mosquitoes in each area", "Males do not transmit malaria."],
          ["The species of *Plasmodium* found in the mosquito's eggs", "The parasite is not passed through mosquito eggs."],
          ["The blood groups of people living there", "Blood group is not a main factor in malaria distribution."],
        ],
        answer: "A",
        explanation: "Breeding sites (rainfall, rivers, dams) affect the number of vectors.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest and explain how a warmer climate might change malaria in the highland area.",
        points: ["Higher temperatures allow the parasite to complete development in the mosquito / more mosquitoes survive", "So transmission could spread to higher altitudes where people have little immunity"],
        modelAnswer: "Warmer temperatures could allow the parasite to develop in mosquitoes at higher altitudes, so malaria could appear in areas that were free of it.",
      }),
    ],
    explanation: "Cooler highlands have less malaria because the parasite develops slowly in the vector.",
    hints: ["Link altitude to temperature, then temperature to the parasite."],
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Chipo is a nurse at a rural clinic near Kariba. She runs a community meeting about malaria before the rainy season.",
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Suggest two actions households can take to reduce mosquito breeding near their homes.",
        points: ["Remove / drain standing water, e.g. old tyres, tins, blocked drains", "Cover water containers / fill puddles / keep grass short near houses"],
        modelAnswer: "Empty or remove containers that collect rainwater, such as old tyres and tins, and cover water storage drums so mosquitoes cannot lay eggs.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why Chipo recommends sleeping under a treated net every night, not only when mosquitoes are noticed.",
        points: ["*Anopheles* mosquitoes bite mainly at night while people sleep (and bites may not be noticed)", "One bite from an infected mosquito can transmit the parasite, so protection must be continuous"],
        modelAnswer: "Anopheles mosquitoes bite at night when people are asleep and may not notice them. A single bite from an infected mosquito is enough to transmit Plasmodium, so the net must be used every night.",
      }),
      P.tf({
        label: "(c)", stem: "True or false: a person who has had malaria once cannot be infected again.",
        answer: false,
        explanation: "False. Immunity to malaria is partial and develops only after repeated infections; people can be reinfected many times.",
      }),
      P.short({
        label: "(d)", marks: 1, stem: "Name the type of quick test, using a drop of blood, that Chipo uses to confirm malaria before giving treatment.",
        accepted: ["rapid diagnostic test", "RDT", "malaria rapid diagnostic test", "rapid test"],
        wrong: ["blood smear"],
        explanation: "A **rapid diagnostic test** detects *Plasmodium* antigens in a drop of blood within minutes.",
      }),
    ],
    explanation: "Removing breeding sites, nightly nets and confirming cases before treatment.",
    hints: ["When do *Anopheles* mosquitoes bite?"],
  });

  b.card("FACT", "The four main *Plasmodium* species", "*P. falciparum*, *P. vivax*, *P. ovale*, *P. malariae* (protoctists).");
  b.card("DEFINITION", "What is a **vector**?", "An organism that carries a pathogen between hosts; the female *Anopheles* mosquito for malaria.");
  b.card("FACT", "Three ways malaria is transmitted", "Bites of infected female *Anopheles*; blood transfusion or shared needles; mother to fetus.");
  b.card("CONCEPT", "Why is malaria rare on the highveld?", "Low temperatures slow parasite development in the mosquito.");
  b.card("CONCEPT", "Why is malaria seasonal?", "Rains create standing water for larvae; cases peak during and after the rains.");
  b.card("FACT", "Ways to control the malaria vector", "Insecticide-treated nets, indoor residual spraying, draining breeding sites, larvicides, larva-eating fish.");
  b.card("CONCEPT", "Why is a malaria vaccine difficult to make?", "Parasite hides in liver and red blood cells and changes its antigens.");
  b.card("FACT", "Standard treatment for *P. falciparum* malaria", "Artemisinin-based combination therapy (ACT), after a positive test.");
  b.card("CONCEPT", "Biological reasons malaria control is difficult", "Drug-resistant parasites, insecticide-resistant mosquitoes, antigenic variation, two hosts.");
});
