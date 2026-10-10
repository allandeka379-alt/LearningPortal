// W2b: THEORY10 exam-format items (ZIMSEC Paper 2; Cambridge Paper 2, AS concepts): disease and immunity.
import { concept, P, t, chk, table, dpStr, sum, EXAM, checkExam, CAM } from "../lib.mjs";

const A = (k) => `abio.${k}`;
const T = { examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs };

concept(A("disease.cholera-tb"), { file: "exam/w2b-theory", keyPrefix: "exam.w2b-theory" }, (b) => {
  // ---------------------------------------------------------------- T1: a cholera outbreak
  const wk = [1, 2, 3, 4, 5, 6, 7, 8];
  const cases = [12, 45, 130, 210, 180, 95, 40, 15];
  const total = sum(cases);
  chk(total, 727);
  const deaths = 23;
  const cfr = (deaths / total) * 100;
  chk(Number(cfr.toFixed(2)), 3.16);
  b.struct({
    ...T, d: 4, paper: "ZIMSEC P2 / Cambridge P2",
    concepts: [A("disease.cholera-tb")],
    stem: `A hypothetical cholera outbreak occurred in a town after a sewage pipe burst near a borehole. At the start of week 5, the borehole was closed, chlorinated water was delivered by tanker and oral rehydration points were opened. The table shows the number of new cases each week; there were ${deaths} deaths in total.\n\n${table(["Week", ...wk.map(String)], [["New cases", ...cases.map(String)]])}`,
    parts: checkExam(EXAM.THEORY10, [
      P.short({
        label: "(a)", marks: 1, stem: "Name the organism that causes cholera.",
        accepted: ["Vibrio cholerae", "V. cholerae", "V cholerae", "Vibrio"],
        wrong: ["Mycobacterium tuberculosis"],
        explanation: "*Vibrio cholerae*.",
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the case fatality rate for the whole outbreak as a percentage. Give your answer to two decimal places.",
        value: cfr, dp: 2, unit: "%", wrong: [Number((deaths / cases[3] * 100).toFixed(2))],
        explanation: t`Total cases $= ${total}$. Case fatality rate $= \dfrac{${deaths}}{${total}} \times 100 = ${dpStr(cfr, 2)}\%$.`,
      }),
      P.mcq({
        label: "(c)", stem: "Which route of transmission is most likely in this outbreak?",
        options: [
          ["Drinking borehole water contaminated with faeces", "Correct: the faecal-oral route via water."],
          ["Breathing in droplets from infected people", "Cholera is not airborne."],
          ["Bites of insects that bred near the burst pipe", "Cholera has no insect vector."],
          ["Sharing needles at the clinic", "Cholera is not blood-borne."],
        ],
        answer: "A",
        explanation: "Sewage reached the borehole: faecal-oral transmission in water.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why oral rehydration solution reduces deaths from cholera.",
        points: [
          "Death is caused by dehydration / loss of water and ions in diarrhoea",
          "ORS contains glucose and sodium ions, which are absorbed together by co-transporter proteins not affected by the toxin",
          "This lowers the water potential of the epithelial cells / blood, so water is absorbed by osmosis, replacing what was lost",
        ],
        modelAnswer: "People die of dehydration as water and ions are lost in diarrhoea. ORS supplies glucose and sodium ions, which are absorbed together by sodium-glucose co-transporters that the toxin does not affect. Their uptake lowers the water potential of the cells and blood, so water is absorbed by osmosis, replacing the water lost.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Using the data, suggest why the number of cases continued for several weeks after week 5 before falling to a low level.",
        points: [
          "Cases fell from 210 (week 4) to 15 (week 8), not immediately to zero",
          "People already infected before week 5 still became ill (incubation period) / carriers or contaminated food and hands spread it further / not everyone used the safe water at once",
        ],
        modelAnswer: "Cases fell steadily from 210 in week 4 to 15 in week 8 rather than stopping at once, because people infected before the borehole was closed still developed symptoms, and carriers and contaminated hands and food spread some infection after the water was made safe.",
      }),
      P.tf({
        label: "(f)", stem: "True or false: a vaccine against cholera would make chlorinating the water unnecessary.",
        answer: false,
        explanation: "False. Oral cholera vaccines give only partial, short-lived protection; safe water and sanitation remain essential.",
      }),
    ]),
    explanation: "Faecal contamination of water caused the outbreak; safe water and ORS reduced cases and deaths.",
    hints: ["Add the cases for all eight weeks first.", "Link ORS to co-transport and osmosis."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T2: TB and HIV
  const plhiv = 12000, tbH = 96, neg = 188000, tbN = 94;
  const rH = (tbH / plhiv) * 1e5;
  const rN = (tbN / neg) * 1e5;
  chk(rH, 800);
  chk(rN, 50);
  const ratio = rH / rN;
  chk(ratio, 16);
  b.struct({
    ...T, d: 4, paper: "ZIMSEC P2 / Cambridge P2",
    concepts: [A("disease.cholera-tb"), A("disease.hiv-aids")],
    stem: `Hypothetical data for new cases of active tuberculosis in one year in a district:\n\n${table(["Group", "Number of people", "New cases of active TB"], [["People living with HIV", String(plhiv), String(tbH)], ["People without HIV", String(neg), String(tbN)]])}`,
    parts: checkExam(EXAM.THEORY10, [
      P.num({
        label: "(a)", marks: 2, stem: t`The incidence among people without HIV is 50 per 100,000 per year. Calculate the incidence among people living with HIV, and hence how many times greater it is.`,
        value: ratio, wrong: [rH, Number((tbH / tbN).toFixed(2))],
        explanation: t`Incidence $= \dfrac{96}{12\,000} \times 100\,000 = ${rH}$ per 100,000. $${rH} \div ${rN} = ${ratio}$ times greater. Comparing raw cases (96 and 94) would hide the difference.`,
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain why people living with HIV are much more likely to develop active TB.",
        points: [
          "HIV infects and destroys T-helper cells",
          "So cytokines that activate macrophages / T-killer cells / B-cells are lacking",
          "Latent TB bacteria are no longer contained (or new infections not controlled), so they multiply and active TB develops",
        ],
        modelAnswer: "HIV destroys T-helper cells, so fewer cytokines are released to activate macrophages, T-killer cells and B-cells. The immune system can no longer keep latent TB bacteria walled off or control new infections, so the bacteria multiply and active TB develops.",
      }),
      P.short({
        label: "(c)", marks: 1, stem: "Name the vaccine given to babies to protect them against severe forms of TB.",
        accepted: ["BCG", "bacillus Calmette-Guerin", "bacille Calmette-Guerin", "BCG vaccine", "bacillus Calmette-Guérin", "bacille Calmette-Guérin"],
        wrong: ["MMR"],
        explanation: "**BCG**, a live attenuated strain of *Mycobacterium bovis*.",
      }),
      P.mcq({
        label: "(d)", stem: "Which practice best reduces the development of drug-resistant TB?",
        options: [
          ["Directly observed treatment until the full course is complete", "Correct: DOTS ensures every dose is taken."],
          ["Giving one antibiotic at a time, changing it every month", "Single drugs make resistance more likely."],
          ["Stopping treatment as soon as the cough clears", "Stopping early selects resistant bacteria."],
          ["Treating TB with antiviral drugs", "TB is bacterial."],
        ],
        answer: "A",
        explanation: "**DOTS** makes sure the full multi-drug course is taken.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain how incomplete treatment can lead to multidrug-resistant TB.",
        points: ["Bacteria that survive a short course are more likely to carry (chance) resistance mutations", "They multiply and spread, so resistant strains become more common (natural selection)"],
        modelAnswer: "If treatment stops early, the surviving bacteria are most likely those with random mutations giving some resistance; they multiply and are transmitted, so resistant strains increase by natural selection.",
      }),
      P.tf({
        label: "(f)", stem: "True or false: antiretroviral therapy for people living with HIV is likely to reduce their risk of active TB.",
        answer: true,
        explanation: "True. ART restores T-helper cells, improving control of TB.",
      }),
    ]),
    explanation: "HIV destroys T-helper cells, greatly raising TB incidence; full treatment courses prevent resistance.",
    hints: ["Convert both groups to rates per 100,000.", "Which cells does HIV destroy?"],
    calculator: true,
  });

  // ---------------------------------------------------------------- T3: malaria and bed nets
  const use = [10, 35, 60, 85];
  const mal = [220, 150, 85, 33];
  const dec = ((mal[0] - mal[3]) / mal[0]) * 100;
  chk(dec, 85);
  b.struct({
    ...T, d: 4, paper: "ZIMSEC P2 / Cambridge P2",
    concepts: [A("disease.malaria")],
    stem: `Four hypothetical villages in the Zambezi valley differed in the percentage of people sleeping under insecticide-treated nets. Malaria cases were recorded for one rainy season.\n\n${table(["Village", "P", "Q", "R", "S"], [["People using treated nets / %", ...use.map(String)], ["Malaria cases per 1000 people", ...mal.map(String)]])}`,
    parts: checkExam(EXAM.THEORY10, [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage difference in malaria cases in village S compared with village P. Give your answer to three significant figures.",
        value: dec, sf: 3, unit: "%", wrong: [Number(((mal[0] - mal[3]) / mal[3] * 100).toFixed(0))],
        explanation: t`$\dfrac{220 - 33}{220} \times 100 = ${dpStr(dec, 1)}\%$ fewer cases in village S.`,
      }),
      P.short({
        label: "(b)", marks: 1, stem: "Name the genus of protoctist that causes malaria.",
        accepted: ["Plasmodium"],
        wrong: ["Anopheles"],
        explanation: "*Plasmodium* (the mosquito, *Anopheles*, is the vector).",
      }),
      P.mcq({
        label: "(c)", stem: "Which organism is the vector of malaria?",
        options: [
          ["Female *Anopheles* mosquito", "Correct: only females take blood meals."],
          ["Male *Anopheles* mosquito", "Males do not feed on blood."],
          ["*Plasmodium falciparum*", "This is the pathogen, not the vector."],
          ["The tsetse fly", "Tsetse flies transmit trypanosomes, not malaria."],
        ],
        answer: "A",
        explanation: "The **female *Anopheles*** mosquito.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why high net use reduces cases even among people who do not sleep under a net.",
        points: ["Mosquitoes landing on treated nets are killed by the insecticide", "Fewer infectious mosquitoes survive in the village, so everyone is bitten by fewer infected mosquitoes"],
        modelAnswer: "Mosquitoes that land on treated nets are killed, so when many people use nets the number of infectious mosquitoes in the village falls, protecting people without nets too.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest two reasons why there were still some cases in village S.",
        points: ["Mosquitoes bite people outdoors / in the evening before bed / some people do not use nets every night", "Mosquitoes resistant to the insecticide, or nets torn / old, or infections acquired elsewhere"],
        modelAnswer: "Some bites happen outdoors or in the evening before people go to bed, and some mosquitoes may be resistant to the insecticide or nets may be torn.",
      }),
      P.manual({
        label: "(f)", marks: 2, stem: "Suggest why it has been difficult to develop a fully effective vaccine against malaria.",
        points: ["The parasite spends much of its life inside liver / red blood cells, hidden from antibodies", "It changes its surface antigens between stages / strains (antigenic variation)"],
        modelAnswer: "Plasmodium lives inside liver cells and red blood cells, where antibodies cannot reach it, and its surface antigens change between stages and strains.",
      }),
    ]),
    explanation: "Treated nets protect users and the community; the parasite's intracellular life and antigenic variation hinder vaccines.",
    hints: ["Divide the difference by the value for village P.", "Think about what the insecticide does to mosquitoes."],
    calculator: true,
  });

  // ---------------------------------------------------------------- T4: penicillin (Cambridge only)
  const hrs = [0, 1, 2, 3, 4];
  const sens = [5, 10, 20, 8, 2];
  const res = [5, 10, 20, 40, 80];
  const fall = ((sens[2] - sens[4]) / sens[2]) * 100;
  chk(fall, 90);
  b.struct({
    ...T, d: 4, paper: "Cambridge P2", applies: CAM,
    concepts: [A("disease.antibiotics")],
    stem: `Two strains of a bacterium, X and Y, were grown in separate flasks of nutrient broth. Penicillin was added to both flasks at 2 hours. The number of live bacteria was estimated every hour.\n\n${table(["Time / hours", ...hrs.map(String)], [["Strain X / millions per cm³", ...sens.map(String)], ["Strain Y / millions per cm³", ...res.map(String)]])}`,
    parts: checkExam(EXAM.THEORY10, [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage decrease in live bacteria of strain X between 2 hours and 4 hours.",
        value: fall, unit: "%", wrong: [Number(((sens[2] - sens[4]) / sens[4] * 100).toFixed(0)), 18],
        explanation: t`$\dfrac{20 - 2}{20} \times 100 = ${fall}\%$.`,
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain how penicillin caused the decrease in strain X.",
        points: [
          "Penicillin inhibits the enzymes that form cross-links in peptidoglycan",
          "As the bacteria grow, the cell wall is weakened",
          "Water enters by osmosis and the cells burst (osmotic lysis)",
        ],
        modelAnswer: "Penicillin inhibits the transpeptidases that form cross-links between peptidoglycan chains. As the bacteria grow, their walls become weak, and water entering by osmosis makes them swell and burst.",
      }),
      P.short({
        label: "(c)", marks: 1, stem: "Strain Y produces an enzyme that breaks down penicillin. Name this enzyme.",
        accepted: ["penicillinase", "beta-lactamase", "β-lactamase", "b-lactamase", "beta lactamase"],
        wrong: ["lysozyme"],
        explanation: "**Penicillinase** (β-lactamase).",
      }),
      P.mcq({
        label: "(d)", stem: "Why did penicillin have no effect on the numbers of either strain before 2 hours?",
        options: [
          ["It had not yet been added to the flasks", "Correct: penicillin was added at 2 hours."],
          ["Bacteria are resistant to penicillin while they are growing", "Growing bacteria are the most susceptible."],
          ["Penicillin needs two hours to be converted into its active form", "Penicillin is already active."],
          ["Both strains produce penicillinase for the first two hours", "Only strain Y is resistant."],
        ],
        answer: "A",
        explanation: "Read the method: penicillin was added at 2 hours.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest how a strain such as Y could become common in a hospital where penicillin is widely used.",
        points: ["Penicillin kills susceptible bacteria, so resistant ones survive (selection)", "Resistant bacteria multiply / pass the gene on plasmids to other bacteria, and spread between patients"],
        modelAnswer: "Where penicillin is used often, susceptible bacteria are killed but resistant ones survive and multiply, and the resistance gene can pass to other bacteria on plasmids, so resistant strains spread between patients.",
      }),
      P.tf({
        label: "(f)", stem: "True or false: penicillin would also reduce the number of influenza viruses in an infected person.",
        answer: false,
        explanation: "False. Viruses have no cell wall for penicillin to act on.",
      }),
    ]),
    explanation: "Penicillin weakens the walls of growing bacteria, which burst; penicillinase gives resistance.",
    hints: ["Compare 2 hours with 4 hours for strain X.", "What happens to a cell with a weak wall in a dilute medium?"],
    calculator: true,
  });

  // ---------------------------------------------------------------- T5: primary and secondary response
  const w = [0, 2, 4, 6, 8, 10, 12];
  const ab = [0, 8, 24, 10, 160, 410, 330];
  const fold = 410 / 24;
  chk(Number(fold.toFixed(2)), 17.08);
  b.struct({
    ...T, d: 4, paper: "ZIMSEC P2 / Cambridge P2",
    concepts: [A("immunity.immune-response"), A("immunity.vaccination")],
    stem: `A child received a first dose of a vaccine in week 0 and a second dose in week 6. The concentration of the specific antibody in her blood was measured.\n\n${table(["Week", ...w.map(String)], [["Antibody / arbitrary units", ...ab.map(String)]])}`,
    parts: checkExam(EXAM.THEORY10, [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate how many times higher the peak after the second dose is than the peak after the first dose. Give your answer to three significant figures.",
        value: fold, sf: 3, wrong: [410 - 24],
        explanation: t`Peaks: 24 (week 4) and 410 (week 10). $410 \div 24 = ${dpStr(fold, 3)} \approx ${dpStr(fold, 1)}$.`,
      }),
      P.mcq({
        label: "(b)", stem: "Which cells secrete the antibody?",
        options: [
          ["Plasma cells", "Correct: from activated B-cells."],
          ["T-helper cells", "They release cytokines."],
          ["Macrophages", "They present antigens."],
          ["Memory T-cells", "They do not secrete antibodies."],
        ],
        answer: "A",
        explanation: "**Plasma cells** secrete antibodies.",
      }),
      P.short({
        label: "(c)", marks: 1, stem: "Name the cells, formed after the first dose, that are responsible for the larger response to the second dose.",
        accepted: ["memory cells", "memory B cells", "memory B-cells", "memory lymphocytes", "memory cell"],
        wrong: ["plasma cells"],
        explanation: "**Memory cells** formed in the primary response.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain why the response to the second dose is faster and larger.",
        points: [
          "First dose: few B-cells match the antigen, so clonal selection and expansion take time (primary response)",
          "Memory cells formed in the primary response are much more numerous than the original matching cells",
          "They recognise the antigen at once and divide rapidly into many plasma cells",
        ],
        modelAnswer: "After the first dose only a few B-cells had complementary receptors, so selection and division took weeks. Memory cells formed then and are far more numerous; at the second dose they recognised the antigen immediately and divided rapidly into many plasma cells, producing more antibody sooner.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain the type of immunity this child has gained.",
        points: ["Artificial active immunity", "Her own lymphocytes produced antibodies and memory cells in response to the vaccine (not received antibodies), so it is long-lasting"],
        modelAnswer: "Artificial active immunity: the vaccine caused her own B-cells to make antibodies and memory cells, so protection is long-lasting.",
      }),
      P.tf({
        label: "(f)", stem: "True or false: the fall in antibody between weeks 4 and 6 means she has lost her immunity.",
        answer: false,
        explanation: "False. Memory cells remain even when antibody levels fall.",
      }),
    ]),
    explanation: "The booster triggers a secondary response from memory cells: faster and larger.",
    hints: ["Find the two peaks first.", "Which cells remain after the first response?"],
    calculator: true,
  });

  // ---------------------------------------------------------------- T6: monoclonal antibodies in a malaria rapid test
  const conf = 480, posC = 463;
  const sensP = (posC / conf) * 100;
  chk(Number(sensP.toFixed(1)), 96.5);
  b.struct({
    ...T, d: 4, paper: "ZIMSEC P2 / Cambridge P2",
    concepts: [A("immunity.antibodies"), A("disease.malaria")],
    stem: "A malaria rapid diagnostic test strip contains three zones. At the sample end, mobile monoclonal antibodies attached to coloured gold particles bind a protein released by *Plasmodium falciparum*. At the test line, immobilised monoclonal antibodies bind a different site on the same protein. At the control line, immobilised antibodies bind the mobile antibodies. Blood and buffer move along the strip by capillary action.",
    parts: checkExam(EXAM.THEORY10, [
      P.match({
        label: "(a)", marks: 3, stem: "Match each part of an antibody molecule with its feature.",
        pairs: [
          ["Variable region", "Forms the antigen-binding site"],
          ["Disulfide bond", "Holds the polypeptide chains together"],
          ["Hinge region", "Gives flexibility to the arms"],
        ],
        explanation: "Variable region: binding site; disulfide bonds: hold chains; hinge: flexibility.",
      }),
      P.mcq({
        label: "(b)", stem: "A test shows a test line but no control line. What should the health worker conclude?",
        options: [
          ["The test is invalid and must be repeated", "Correct: no control line means the test did not run properly."],
          ["The patient has malaria", "Without a control line the result cannot be trusted."],
          ["The patient does not have malaria", "A missing control line makes any reading invalid."],
          ["The patient has a very high parasite count", "The intensity of lines is not read this way."],
        ],
        answer: "A",
        explanation: "No control line → **invalid** test.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how a coloured test line forms when a patient's blood contains the *P. falciparum* protein.",
        points: [
          "The protein (antigen) binds the mobile coloured antibodies at the sample end",
          "The complex moves along the strip to the test line",
          "Immobilised antibodies bind another site on the protein, trapping the coloured complexes so a line appears",
        ],
        modelAnswer: "The parasite protein binds to the mobile antibodies carrying gold particles. The complexes move along the strip by capillary action. At the test line, fixed antibodies bind a different site on the protein and trap the complexes, so the coloured particles accumulate as a visible line.",
      }),
      P.num({
        label: "(d)", marks: 2, stem: "In a trial, 480 patients with malaria confirmed by microscopy were tested and 463 tested positive. Calculate the percentage of infected patients detected. Give your answer to one decimal place.",
        value: sensP, dp: 1, unit: "%", wrong: [Number(((conf - posC) / conf * 100).toFixed(1))],
        explanation: t`$\dfrac{463}{480} \times 100 = ${dpStr(sensP, 2)} \approx ${dpStr(sensP, 1)}\%$.`,
      }),
      P.tf({
        label: "(e)", stem: "True or false: the test uses monoclonal antibodies so that only the *P. falciparum* protein is detected.",
        answer: true,
        explanation: "True. Each monoclonal antibody binds one specific site, giving specificity.",
      }),
    ]),
    explanation: "Monoclonal antibodies bind specific antigen sites; the control line validates the test.",
    hints: ["Which antibodies move and which are fixed?", "Detected ÷ total infected × 100."],
    calculator: true,
  });
});
