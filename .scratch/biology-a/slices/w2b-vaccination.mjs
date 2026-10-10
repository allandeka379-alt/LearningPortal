// W2b: types of immunity and vaccination.
import { concept, P, t, chk, table, dpStr } from "../lib.mjs";

concept("abio.immunity.vaccination", { file: "immunity/vaccination", keyPrefix: "immunity.vaccination" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A baby receives antibodies from its mother's breast milk. What type of immunity is this?",
    options: [
      ["Natural passive", "Correct: antibodies received through normal life."],
      ["Natural active", "Active immunity needs the baby's own immune response."],
      ["Artificial passive", "Artificial immunity involves medical intervention, such as an injection of antibodies."],
      ["Artificial active, as with any vaccination given at the clinic", "That is vaccination; breast-milk antibodies are natural and passive."],
    ],
    answer: "A",
    explanation: "Antibodies received (passive) through normal life (natural): **natural passive** immunity.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does passive immunity last only a few weeks or months?",
    options: [
      ["No memory cells are made, and the received antibodies are broken down", "Correct: nothing replaces the antibodies."],
      ["The antibodies are destroyed by the person's T-killer cells", "Antibodies are broken down normally; they are not attacked by T-killer cells."],
      ["The antibodies are excreted immediately in the urine", "They circulate for weeks before being broken down."],
      ["Passive immunity only works against viruses, which mutate quickly", "Passive immunity works against bacteria, toxins and viruses."],
    ],
    answer: "A",
    explanation: "With passive immunity there is no immune response, so **no memory cells** are formed; the antibodies are gradually broken down.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What does a toxoid vaccine contain?",
    options: [
      ["A bacterial toxin made harmless but with the same antigens", "Correct: e.g. tetanus and diphtheria vaccines."],
      ["Live bacteria weakened so they cannot cause disease", "That is a live attenuated vaccine."],
      ["Antibodies against a bacterial toxin collected from a horse", "That is an antitoxin, giving passive immunity."],
      ["Whole bacteria killed by heat", "That is an inactivated vaccine."],
    ],
    answer: "A",
    explanation: "A **toxoid** is an inactivated toxin; it stimulates antibodies that neutralise the real toxin.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer in the Eastern Highlands steps on a rusty nail and has never been vaccinated against tetanus. Why is he given an injection of anti-tetanus antibodies as well as a tetanus vaccine?",
    options: [
      ["The antibodies protect him at once, while the vaccine builds long-term immunity", "Correct: passive immunity is immediate; active immunity takes time."],
      ["The antibodies make the vaccine enter his blood faster", "Antibodies do not help the vaccine enter the blood."],
      ["The vaccine alone would cause tetanus in an unvaccinated person", "A toxoid vaccine cannot cause tetanus."],
      ["The antibodies form memory cells that last for life", "Received antibodies do not form memory cells."],
    ],
    answer: "A",
    explanation: "Injected antibodies give **immediate** passive protection against toxin produced now; the vaccine starts a primary response that produces memory cells for the future.",
    hints: ["Which kind of immunity is immediate?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are booster doses of some vaccines given?",
    options: [
      ["Each dose causes a secondary response, increasing antibodies and memory cells", "Correct: boosters strengthen and prolong immunity."],
      ["The first dose only gives passive immunity", "Vaccines give active immunity from the first dose."],
      ["Boosters contain antibodies that replace those lost", "Boosters contain antigens, not antibodies."],
      ["The pathogen changes after each dose, so a new vaccine is needed", "Boosters are usually the same vaccine."],
    ],
    answer: "A",
    explanation: "A booster acts like a second exposure: memory cells respond, giving more antibodies and more memory cells.",
    hints: ["What happens when memory cells meet the antigen again?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which feature of smallpox made its global eradication possible?",
    options: [
      ["The virus had stable antigens and no animal reservoir", "Correct: one vaccine worked everywhere and there was nowhere else for the virus to survive."],
      ["Most infected people had no symptoms, so they rarely spread it", "Smallpox caused a distinctive rash; symptomless carriers would have made eradication harder."],
      ["The vaccine contained antibodies that gave immediate protection for life", "The vaccine was a live virus giving active immunity."],
      ["The virus was transmitted by mosquitoes, which were easy to control", "Smallpox spread directly between people."],
    ],
    answer: "A",
    explanation: "Stable antigens, no animal reservoir, easily recognised cases and a heat-stable live vaccine made **ring vaccination** around each case effective.",
    hints: ["Think about antigens and where the virus could hide."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why must a new influenza vaccine be produced every year?",
    options: [
      ["Its surface antigens change, so older memory cells may not recognise it", "Correct: antigenic variation."],
      ["The vaccine contains antibodies, and these are all broken down within a year of injection", "Influenza vaccines contain antigens, not antibodies."],
      ["Memory cells always die after exactly twelve months", "Memory cells can last years; the virus changes."],
      ["The vaccine is destroyed by the cold chain", "The cold chain protects vaccines."],
    ],
    answer: "A",
    explanation: "Influenza undergoes **antigenic variation**; vaccines are updated to match the strains expected each season.",
    hints: ["What changes, the person or the virus?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is herd immunity?",
    options: [
      ["Protection of non-immune people because enough others are immune", "Correct: chains of transmission are broken."],
      ["Immunity gained by drinking the milk of cattle that have been vaccinated on the farm", "This is not herd immunity."],
      ["The immunity every person in a population gains after one case of a disease", "One case does not immunise everyone."],
      ["Immunity passed from parents to children in their genes", "Immunity is not inherited."],
    ],
    answer: "A",
    explanation: "When enough people are immune, an infected person rarely meets a susceptible one, so even unvaccinated people are protected.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Smallpox was declared eradicated by the World Health Organization in 1980.",
    answer: true,
    explanation: "True. It was the first human disease to be eradicated, by vaccination.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Active immunity is gained more quickly than passive immunity.",
    answer: false,
    explanation: "False. Passive immunity is immediate; active immunity needs a primary response lasting days to weeks.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example with the type of immunity it gives.",
    pairs: [
      ["Recovering from chickenpox", "Natural active"],
      ["Antibodies crossing the placenta to a fetus", "Natural passive"],
      ["Measles vaccination", "Artificial active"],
      ["Antivenom after a snakebite", "Artificial passive"],
    ],
    explanation: "Active = own response; passive = received antibodies; natural = normal life; artificial = medical.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Vaccines contain {{blank:a}} that stimulate a primary response and the formation of {{blank:b}} cells. Most vaccines must be stored between 2 and 8 °C in a {{blank:c}} so that their proteins do not denature.",
    blanks: [
      { id: "a", accepted: ["antigens"], choices: ["antigens", "antibodies", "antibiotics"] },
      { id: "b", accepted: ["memory"], choices: ["memory", "plasma", "red blood"] },
      { id: "c", accepted: ["cold chain"], choices: ["cold chain", "food chain", "respiratory chain"] },
    ],
    explanation: "Antigens, memory cells, the cold chain.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for a vaccine containing living pathogens that have been weakened so that they cannot cause disease.",
    accepted: ["live attenuated vaccine", "attenuated vaccine", "live attenuated", "attenuated"],
    wrong: ["inactivated vaccine", "toxoid"],
    explanation: "A **live attenuated** vaccine, such as the measles vaccine or BCG.",
  });

  const kids = 2150, vacc = 1892;
  const cov = (vacc / kids) * 100;
  chk(cov, 88);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "In a hypothetical district, 2,150 children were due for measles vaccination and 1,892 were vaccinated. Calculate the vaccination coverage as a percentage.",
    value: cov, unit: "%",
    wrong: [Number(((kids - vacc) / kids * 100).toFixed(1))],
    explanation: t`Coverage $= \dfrac{1892}{2150} \times 100 = ${cov}\%$. Since about 95% is needed for measles, the district is at risk of outbreaks.`,
  });

  const d1 = 980, d3 = 846;
  const drop = ((d1 - d3) / d1) * 100;
  chk(Number(drop.toFixed(2)), 13.67);
  calc({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: "At a hypothetical clinic, 980 infants received the first dose of a three-dose vaccine and 846 received the third dose. Calculate the drop-out rate between the first and third doses, as a percentage of those who received the first dose. Give your answer to one decimal place.",
    value: drop, dp: 1, unit: "%",
    wrong: [Number(((d1 - d3) / d3 * 100).toFixed(1)), d1 - d3],
    explanation: t`1. Infants who did not complete $= 980 - 846 = ${d1 - d3}$.
2. Drop-out $= \dfrac{${d1 - d3}}{980} \times 100 = ${dpStr(drop, 2)}\% \approx ${dpStr(drop, 1)}\%$.
3. Dividing by 846 instead gives ${dpStr((d1 - d3) / d3 * 100, 1)}%.
4. Children who miss later doses have fewer memory cells and weaker protection, so following them up matters.`,
    hints: ["Divide by the number who started."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Compare active and passive immunity.",
    points: [
      "Active: the person's own immune response makes antibodies; passive: antibodies received from another source",
      "Active: memory cells formed; passive: no memory cells",
      "Active: takes time to develop (days to weeks); passive: immediate protection",
      "Active: long-lasting (years / life); passive: short-lived (weeks to months)",
    ],
    modelAnswer: "In active immunity the person's own lymphocytes respond to an antigen and make antibodies, while in passive immunity antibodies are received from the mother or an injection. Active immunity produces memory cells; passive does not. Active immunity takes days or weeks to develop, but passive protection is immediate. Active immunity lasts years or for life, whereas passive immunity fades within weeks or months as the antibodies are broken down.",
    explanation: "Matched pairs: source, memory cells, speed, duration.",
    hints: ["Compare point by point."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain why smallpox could be eradicated by vaccination but malaria cannot yet be controlled in this way.",
    points: [
      "Smallpox virus had stable antigens / one vaccine protected against all strains; Plasmodium varies its antigens",
      "Smallpox had no animal reservoir or vector; malaria has a mosquito vector",
      "Smallpox cases were visible (rash) so ring vaccination worked, with no symptomless carriers; malaria infections can be symptomless",
      "Smallpox vaccine was live, heat-stable and highly effective; malaria parasites hide inside liver and red blood cells and current vaccines give only partial protection",
    ],
    modelAnswer: "The smallpox virus had stable antigens, so one vaccine protected against all strains, but Plasmodium changes its antigens between stages and strains. Smallpox infected only humans, while malaria is carried by mosquitoes. Smallpox cases had an obvious rash, so contacts could be traced and ring-vaccinated, but many malaria infections are symptomless. The smallpox vaccine was live, heat-stable and gave strong immunity, while Plasmodium hides inside liver and red blood cells and the malaria vaccines give only partial protection.",
    explanation: "Contrast antigens, reservoirs, visibility of cases and vaccine effectiveness.",
    hints: ["Compare the two pathogens feature by feature."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Suggest why vaccination coverage may be lower in remote rural areas, and how this could be improved.",
    points: [
      "Long distances to clinics / poor transport, so families miss doses",
      "Cold chain difficult to maintain (refrigeration, electricity), so vaccines may be unavailable or damaged",
      "Improvement: outreach / mobile clinics, solar refrigerators, reminders and health education through community health workers",
    ],
    modelAnswer: "Families may live far from clinics with poor transport, so children miss scheduled doses, and keeping vaccines between 2 and 8 °C is difficult without reliable electricity. Coverage can be improved with outreach teams and mobile clinics, solar-powered refrigerators, and community health workers who remind families and explain the benefits.",
    explanation: "Access, cold chain and follow-up.",
    hints: ["Think about distance and refrigeration."],
  });

  const yrs = ["2019", "2020", "2021", "2022", "2023"];
  const covs = [90, 85, 78, 82, 93];
  const cases = [4, 11, 38, 26, 2];
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: `Hypothetical data for a province show measles vaccination coverage (two doses) and the number of measles cases.\n\n${table(["Year", ...yrs], [["Coverage / %", ...covs.map(String)], ["Measles cases", ...cases.map(String)]])}`,
    parts: [
      P.manual({
        label: "(a)", marks: 3, stem: "Describe the relationship between coverage and the number of cases.",
        points: [
          "As coverage falls, cases rise (negative correlation)",
          "Most cases (38) in 2021 when coverage was lowest (78%)",
          "When coverage rose to 93% in 2023, cases fell to 2",
        ],
        modelAnswer: "There is a negative correlation. Coverage fell from 90% to 78% between 2019 and 2021, while cases rose from 4 to 38. When coverage rose to 93% in 2023, cases fell to 2.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain the relationship using the idea of herd immunity.",
        points: [
          "Lower coverage means more susceptible people",
          "An infected person is more likely to meet a susceptible person, so chains of transmission continue",
          "Measles is highly infectious, so about 95% must be immune for herd immunity; below this outbreaks occur",
        ],
        modelAnswer: "When coverage falls, more children are susceptible, so an infected child is likely to meet and infect others and chains of transmission continue. Measles is very infectious, so herd immunity needs about 95% to be immune; at 78% it was lost and cases rose.",
      }),
      P.mcq({
        label: "(c)", stem: "Which of these would provide the best evidence that falling coverage caused the rise in cases?",
        options: [
          ["Most cases were in unvaccinated children", "Correct: links the cases to lack of vaccination."],
          ["Most cases occurred in the rainy season", "This links cases to season, not to vaccination."],
          ["The population of the province increased", "Population growth does not show the cause."],
          ["Cases were reported from many clinics", "This shows spread, not the cause."],
        ],
        answer: "A",
        explanation: "If cases are concentrated among unvaccinated children, vaccination status is linked to infection.",
      }),
      P.tf({
        label: "(d)", stem: "True or false: the data show that the measles vaccine stopped working in 2021.",
        answer: false,
        explanation: "False. Coverage fell, so fewer children were protected; nothing suggests the vaccine itself failed.",
      }),
    ],
    explanation: "Falling coverage removes herd immunity and allows outbreaks of measles.",
    hints: ["Compare the coverage with the about 95% needed for measles."],
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Tatenda's baby daughter is six weeks old. At the clinic in Bindura she receives several vaccines, including oral polio drops and an injection of a combined vaccine containing tetanus toxoid. The nurse explains that the baby already has some antibodies from her mother.",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the type of immunity the baby received from her mother before birth.",
        accepted: ["natural passive", "natural passive immunity", "passive natural", "passive"],
        wrong: ["natural active"],
        explanation: "Antibodies crossed the placenta: **natural passive** immunity.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why the baby still needs vaccines even though she has antibodies from her mother.",
        points: ["Maternal antibodies are broken down within weeks / months", "No memory cells were formed, so the baby needs her own active immunity"],
        modelAnswer: "The mother's antibodies are gradually broken down and none are replaced, and they did not produce memory cells, so the baby needs vaccines to develop her own long-lasting immunity.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain how the tetanus toxoid in the vaccine protects the baby.",
        points: ["Toxoid has the same antigens as the toxin, stimulating a primary response / B-cells form plasma cells and memory cells", "If the toxin enters later, memory cells give a fast secondary response, producing antibodies (antitoxins) that neutralise the toxin"],
        modelAnswer: "The toxoid carries the same antigens as tetanus toxin but is harmless, so it stimulates a primary response that forms memory cells. If tetanus toxin is made later, memory cells quickly produce antibodies that neutralise it.",
      }),
      P.tf({
        label: "(d)", stem: "True or false: vaccines must be kept in a refrigerator because heat would denature their protein antigens.",
        answer: true,
        explanation: "True. Most vaccines are stored at 2-8 °C (the cold chain).",
      }),
    ],
    explanation: "Passive maternal antibodies fade, so vaccines are needed to give active immunity with memory cells.",
    hints: ["Does passive immunity produce memory cells?"],
  });

  b.card("DEFINITION", "Active immunity", "Immunity from the body's own immune response; memory cells formed; slow to develop, long-lasting.");
  b.card("DEFINITION", "Passive immunity", "Immunity from received antibodies; no memory cells; immediate but short-lived.");
  b.card("FACT", "Examples of the four types of immunity", "Natural active: infection. Artificial active: vaccine. Natural passive: placenta, breast milk. Artificial passive: antitoxin, antivenom.");
  b.card("FACT", "Four types of vaccine", "Live attenuated (measles, BCG), inactivated, subunit (hepatitis B, HPV), toxoid (tetanus).");
  b.card("CONCEPT", "How does a vaccine give protection?", "Antigens cause a primary response and memory cells; real infection meets a fast secondary response.");
  b.card("DEFINITION", "Herd immunity", "Enough of a population is immune that the pathogen cannot spread, protecting the unvaccinated.");
  b.card("FACT", "Why was smallpox eradicated?", "Stable antigens, no animal reservoir, visible cases, no carriers, heat-stable live vaccine, ring vaccination.");
  b.card("CONCEPT", "Why is antigenic variation a problem?", "Memory cells made against old antigens do not recognise new ones (influenza, HIV, malaria).");
  b.card("DEFINITION", "Cold chain", "Keeping vaccines at about 2-8 °C from manufacture to use so antigens are not denatured.");
});
