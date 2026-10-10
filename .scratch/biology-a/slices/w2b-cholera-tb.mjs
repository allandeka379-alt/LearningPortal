// W2b: cholera and tuberculosis.
import { concept, P, t, chk, table, dpStr, rnd, pctChange } from "../lib.mjs";

concept("abio.disease.cholera-tb", { file: "disease/cholera-tb", keyPrefix: "disease.cholera-tb" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which organism causes cholera?",
    options: [
      ["*Vibrio cholerae*", "Correct: a comma-shaped, flagellated bacterium."],
      ["*Mycobacterium tuberculosis*", "This bacterium causes tuberculosis."],
      ["*Plasmodium falciparum*", "This protoctist causes malaria."],
      ["*Mycobacterium bovis*", "This bacterium causes TB in cattle and can infect humans."],
    ],
    answer: "A",
    explanation: "Cholera is caused by the bacterium *Vibrio cholerae*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is cholera transmitted?",
    options: [
      ["By swallowing water or food contaminated with infected faeces", "Correct: the faecal-oral route."],
      ["By breathing in droplets released when an infected person coughs nearby", "This is how TB spreads, not cholera."],
      ["By the bite of an infected female mosquito feeding at night", "This is how malaria spreads."],
      ["By sexual contact or by sharing needles with an infected person", "These routes transmit HIV."],
    ],
    answer: "A",
    explanation: "*V. cholerae* is passed in faeces and swallowed in contaminated water or food: the **faecal-oral route**.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Cholera toxin causes intestinal epithelial cells to secrete chloride ions into the lumen of the small intestine. Why does this cause watery diarrhoea?",
    options: [
      ["The water potential of the lumen falls, so water leaves the cells and blood by osmosis", "Correct: solutes lower the water potential of the lumen and water follows."],
      ["Chloride ions digest the epithelium, so blood plasma leaks out through the damaged lining", "The lining is not digested; water moves by osmosis."],
      ["The water potential of the lumen rises, so water moves out of the lumen into the blood", "Adding ions lowers the water potential of the lumen; water moves into the lumen."],
      ["Chloride ions block the active transport of water into the blood", "Water is not actively transported; it moves by osmosis."],
    ],
    answer: "A",
    explanation: "Chloride ions (followed by sodium ions) in the lumen **lower its water potential**, so water moves out of the epithelial cells and blood into the lumen by **osmosis**.",
    hints: ["What happens to water potential when solutes are added?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why does an oral rehydration solution contain glucose as well as sodium salts?",
    options: [
      ["Glucose and sodium ions are co-transported into cells, and water follows", "Correct: the sodium-glucose co-transporter is not affected by the toxin."],
      ["Glucose kills *Vibrio cholerae* in the small intestine before it can multiply further", "Glucose is not an antibiotic."],
      ["Glucose provides respiratory energy to replace the energy lost in the diarrhoea", "Some energy is supplied, but its main role is to drive sodium and water uptake."],
      ["Glucose raises the water potential of the lumen so water is pushed out", "Glucose lowers water potential; its role is to be absorbed with sodium."],
    ],
    answer: "A",
    explanation: "Sodium-glucose **co-transporter** proteins still work. Absorbing glucose and sodium lowers the water potential of the epithelial cells, so water is absorbed by osmosis.",
    hints: ["Which membrane protein carries glucose and sodium ions together?"],
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How is *Mycobacterium bovis* most commonly passed to humans?",
    options: [
      ["In unpasteurised milk from infected cattle", "Correct: pasteurisation kills the bacteria."],
      ["In water contaminated with faeces from infected cattle", "This is the route for cholera, not bovine TB."],
      ["By ticks that feed on cattle and then on humans", "TB is not spread by ticks."],
      ["Through cuts on the hands when handling cattle feed", "TB is not usually spread through skin cuts."],
    ],
    answer: "A",
    explanation: "*M. bovis* reaches humans mainly in **unpasteurised milk**; pasteurising milk and testing cattle prevent this.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why are people living with HIV much more likely to develop active tuberculosis?",
    options: [
      ["HIV destroys T-helper cells, so latent TB bacteria are no longer kept in check", "Correct: weakened cell-mediated immunity lets latent infection become active."],
      ["HIV and the TB bacterium are carried in the same droplets so they always infect together", "They are different pathogens with different routes; co-infection is not automatic."],
      ["HIV converts into TB bacteria inside the lungs", "A virus cannot turn into a bacterium."],
      ["Antiretroviral drugs damage the lungs and allow bacteria to enter", "Antiretroviral therapy reduces TB risk by restoring immunity."],
    ],
    answer: "A",
    explanation: "Latent TB is held in check by the immune system. HIV destroys **T-helper cells**, so the bacteria can multiply and active TB develops.",
    hints: ["Which cells does HIV infect?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why is the treatment for tuberculosis at least six months long and given as a combination of several antibiotics?",
    options: [
      ["The bacteria grow slowly, some hide in macrophages, and drug combinations limit resistance", "Correct: slow growth, hidden bacteria and the risk of selecting resistant mutants."],
      ["The bacteria are viruses that hide inside cells, so ordinary antibiotics act very slowly", "TB is caused by bacteria, not viruses."],
      ["The BCG vaccine must be given at the same time and takes six months to work", "BCG is a vaccine given to babies, not part of the treatment course."],
      ["Each antibiotic kills the bacteria in a different organ of the body, so all of them are needed", "The drugs are combined to prevent resistance, not because each works in one organ."],
    ],
    answer: "A",
    explanation: "*M. tuberculosis* divides slowly and can survive inside macrophages and in damaged tissue, so a long course is needed. A bacterium is very unlikely to carry mutations resisting **several** drugs at once, so combinations reduce resistance.",
    hints: ["Think about how fast the bacteria grow and where they hide."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main purpose of DOTS in tuberculosis control?",
    options: [
      ["To make sure patients take every dose and complete the full course", "Correct: directly observed treatment improves completion."],
      ["To vaccinate all contacts of a patient against tuberculosis with BCG", "DOTS is about treatment, not vaccination."],
      ["To test milk for *Mycobacterium bovis*", "Milk is made safe by pasteurisation; DOTS is a treatment programme."],
      ["To isolate patients in hospital for six months so they cannot infect others", "Most DOTS patients are treated in the community."],
    ],
    answer: "A",
    explanation: "In **DOTS** a health worker or trained supporter watches each dose being taken, so the course is completed and drug resistance is less likely.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A person with latent tuberculosis infection has no symptoms and does not pass the bacteria on.",
    answer: true,
    explanation: "True. In latent TB the bacteria are walled off and inactive; only active lung TB is infectious.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Antibiotics are the most important treatment for saving the lives of people with severe cholera.",
    answer: false,
    explanation: "False. Death is caused by dehydration, so **rehydration** (oral or intravenous) saves lives; antibiotics only shorten the illness.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each control measure with the way it reduces disease.",
    pairs: [
      ["Chlorinating piped water", "Kills *Vibrio cholerae* before water is drunk"],
      ["Pasteurising milk", "Kills *Mycobacterium bovis* from infected cattle"],
      ["BCG vaccination of babies", "Gives immunity against severe childhood TB"],
      ["Improving ventilation in crowded housing", "Reduces airborne droplet transmission of TB"],
    ],
    explanation: "Each measure breaks a different transmission route or builds immunity.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Tuberculosis is caused by the bacterium {{blank:a}} and is spread mainly by {{blank:b}}. Babies are protected by the {{blank:c}} vaccine. Bacteria resistant to isoniazid and rifampicin cause {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["Mycobacterium tuberculosis"], choices: ["Mycobacterium tuberculosis", "Vibrio cholerae", "Plasmodium vivax"] },
      { id: "b", accepted: ["airborne droplets"], choices: ["airborne droplets", "contaminated water", "mosquito bites"] },
      { id: "c", accepted: ["BCG"], choices: ["BCG", "oral cholera", "measles"] },
      { id: "d", accepted: ["MDR-TB"], choices: ["MDR-TB", "latent TB", "AIDS"] },
    ],
    explanation: "*M. tuberculosis*, droplets, BCG, and multidrug-resistant TB (MDR-TB).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of cell in the lungs that engulfs *Mycobacterium tuberculosis* but in which the bacteria can survive.",
    accepted: ["macrophage", "macrophages", "alveolar macrophage", "alveolar macrophages"],
    wrong: ["neutrophil", "T-helper cell"],
    explanation: "TB bacteria are engulfed by **macrophages** in the alveoli but resist digestion and survive inside them.",
  });

  // Numerical: case fatality rate (hypothetical, different numbers from the lesson)
  const cases = 640, deaths = 22;
  const cfr = (deaths / cases) * 100;
  chk(rnd(cfr, 2), 3.44);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "In a hypothetical cholera outbreak in a rural district, 640 cases and 22 deaths were recorded. Calculate the case fatality rate as a percentage. Give your answer to two decimal places.",
    value: cfr, dp: 2, unit: "%",
    wrong: [rnd((cases / deaths), 2)],
    explanation: t`Case fatality rate $= \dfrac{22}{640} \times 100 = ${dpStr(cfr, 2)}\%$. Dividing cases by deaths (640 ÷ 22) inverts the fraction.`,
  });

  // Calculation: percentage decrease in TB notifications (hypothetical)
  const before = 1480, after = 1110;
  const fall = -pctChange(before, after);
  chk(fall, 25);
  calc({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `A hypothetical district recorded the number of new active TB cases each year before and after antiretroviral therapy became widely available.\n\n${table(["Year", "New active TB cases"], [["Before wide antiretroviral therapy", String(before)], ["Five years later", String(after)]])}\n\nCalculate the percentage decrease in new active TB cases.`,
    value: fall, unit: "%",
    wrong: [rnd(((before - after) / after) * 100, 1)],
    explanation: t`1. Decrease $= ${before} - ${after} = ${before - after}$.
2. Percentage decrease $= \dfrac{${before - after}}{${before}} \times 100 = ${fall}\%$.
3. Dividing by the later value (${after}) gives ${dpStr(((before - after) / after) * 100, 1)}%, which is wrong: always divide by the starting value.
4. A plausible explanation: therapy restores T-helper cells, so fewer latent infections become active.`,
    hints: ["Divide the decrease by the original number."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how *Vibrio cholerae* causes severe dehydration.",
    points: [
      "Bacteria attach to (epithelial cells of) the small intestine and release a toxin",
      "The toxin causes chloride ions to be secreted (through channels) into the lumen",
      "This lowers the water potential of the lumen (sodium ions follow)",
      "Water moves from cells / blood into the lumen by osmosis and is lost as watery diarrhoea",
    ],
    modelAnswer: "The bacteria that survive the stomach attach to the epithelium of the small intestine and release cholera toxin. The toxin enters the epithelial cells and makes them secrete chloride ions into the lumen, followed by sodium ions. This lowers the water potential of the lumen, so water moves out of the cells and blood by osmosis and is lost in large volumes of watery diarrhoea, causing dehydration.",
    explanation: "Bacteria → toxin → chloride ions out → water potential of lumen falls → osmosis → diarrhoea.",
    hints: ["Follow the chloride ions, then the water."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest why the 2008-09 cholera outbreak in Zimbabwe spread so widely, with reference to biological, social and economic factors.",
    points: [
      "Biological: carriers / people with mild symptoms spread bacteria without knowing; bacteria survive in water",
      "Water treatment and piped supplies failed, so people used unsafe sources",
      "Sewage systems broke down / burst sewers contaminated water sources",
      "Health services were under strain / lack of funds for chemicals, repairs or staff delayed treatment and reporting; or movement of people spread it to new areas",
    ],
    modelAnswer: "Infected people without symptoms continued to pass bacteria in their faeces. In towns, water treatment and piped supplies had failed and sewers had burst, so faeces contaminated the water that people collected from wells and streams. There was little money for water-treatment chemicals and repairs, and clinics were short of staff, so cases were treated and reported late. People travelling to rural homes carried the infection to new areas.",
    explanation: "Credit specific, accurate factors linked to transmission; avoid blaming individuals.",
    hints: ["Think about water, sewage, health services and carriers."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why stopping a course of TB treatment early can lead to multidrug-resistant TB.",
    points: [
      "Some bacteria survive when treatment stops early (they are not all killed)",
      "Survivors are more likely to be those with (chance) mutations giving resistance; resistance arises by mutation, not caused by the drug",
      "They multiply and are passed on, so the resistant form becomes more common (natural selection)",
    ],
    modelAnswer: "If treatment stops before all bacteria are killed, the survivors are most likely to be bacteria that happen to carry mutations making them less sensitive to the drugs. These multiply and can be passed to other people, so resistant strains become more common by natural selection.",
    explanation: "Resistance comes from random mutation; the antibiotic only selects.",
    hints: ["Do antibiotics cause mutations, or select them?"],
  });

  // Practice structured: ORS trial (hypothetical)
  const ors = [3, 5, 4, 6, 4, 5, 3, 4];
  const ivOnly = [7, 6, 8, 7, 9, 6, 8, 7];
  const mOrs = ors.reduce((s, x) => s + x, 0) / ors.length;
  const mIv = ivOnly.reduce((s, x) => s + x, 0) / ivOnly.length;
  chk(mOrs, 4.25);
  chk(mIv, 7.25);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `In a hypothetical cholera treatment centre, adults with moderate dehydration were given either oral rehydration salts (ORS) by mouth or plain water by mouth after a first litre of intravenous fluid. The volume of intravenous fluid each patient needed afterwards was recorded.\n\n${table(["Patient", "1", "2", "3", "4", "5", "6", "7", "8"], [["ORS group / dm³", ...ors.map(String)], ["Plain water group / dm³", ...ivOnly.map(String)]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the mean volume of intravenous fluid needed by the ORS group, in dm³, to two decimal places.",
        value: mOrs, dp: 2, unit: "dm³",
        wrong: [4],
        explanation: t`$34 \div 8 = ${dpStr(mOrs, 2)}\ \text{dm}^3$.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the mean for the plain water group, in dm³, to two decimal places.",
        value: mIv, dp: 2, unit: "dm³",
        wrong: [7],
        explanation: t`$58 \div 8 = ${dpStr(mIv, 2)}\ \text{dm}^3$.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why the ORS group needed less intravenous fluid.",
        points: [
          "ORS contains glucose and sodium ions, which are absorbed together by co-transporter proteins (not affected by the toxin)",
          "This lowers the water potential of the epithelial cells / blood",
          "So water is absorbed from the intestine by osmosis, replacing water lost; plain water alone is not absorbed as well",
        ],
        modelAnswer: "ORS supplies glucose and sodium ions, which are absorbed together through sodium-glucose co-transporter proteins that the toxin does not affect. Their uptake lowers the water potential of the epithelial cells and blood, so water follows by osmosis. Plain water without solutes is not absorbed as effectively while chloride is being secreted, so more fluid had to be given into a vein.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest two reasons why the results should be treated with caution.",
        points: ["Small sample (only 8 per group), so results may be due to chance", "Patients may differ in severity of dehydration / body mass, or the groups were not randomised or blinded"],
        modelAnswer: "Only eight patients were in each group, so chance differences matter, and their initial dehydration and body mass may have differed between the groups.",
      }),
      P.tf({
        label: "(e)", stem: "True or false: these data show that ORS kills *Vibrio cholerae* in the intestine.",
        answer: false,
        explanation: "False. ORS replaces water and ions; it has no effect on the bacteria.",
      }),
    ],
    explanation: "ORS works through sodium-glucose co-transport, so less intravenous fluid is needed.",
    hints: ["Which membrane protein still works during cholera?"],
  });

  b.struct({
    d: 4, skill: "APPLICATION",
    stem: "Sipho, a miner from Gweru, has had a cough for five weeks, night sweats and weight loss. A sputum test confirms active pulmonary tuberculosis. He shares a small room with four other workers. An HIV test is offered to him as part of routine care.",
    parts: [
      P.short({
        label: "(a)", marks: 1, stem: "Name the bacterium most likely to have caused Sipho's TB.",
        accepted: ["Mycobacterium tuberculosis", "M. tuberculosis", "M tuberculosis"],
        wrong: ["Mycobacterium bovis"],
        explanation: "Pulmonary TB passed between people is caused by *Mycobacterium tuberculosis*.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why Sipho's roommates are at high risk of infection.",
        points: ["TB is spread by airborne droplets when he coughs / talks", "Crowded, (poorly ventilated) room means close, prolonged contact / high concentration of droplets"],
        modelAnswer: "Sipho releases bacteria in droplets when he coughs. In a small, crowded room his roommates breathe in these droplets for long periods.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why an HIV test is part of routine TB care.",
        points: ["HIV weakens the immune system / destroys T-helper cells, making active TB more likely", "If positive, antiretroviral therapy can start, improving the outcome of TB treatment / reducing risk of death"],
        modelAnswer: "HIV greatly raises the risk of latent TB becoming active, so many TB patients also have HIV. Knowing his status means antiretroviral therapy can be started alongside TB treatment, improving his chances of recovery.",
      }),
      P.mcq({
        label: "(d)", stem: "Which measure best protects the roommates?",
        options: [
          ["Tracing and testing them, and treating any active TB found", "Correct: contact tracing finds and treats cases early."],
          ["Giving all of them a single dose of penicillin", "A single dose would not treat TB and penicillin is not used for TB."],
          ["Giving all of them BCG regardless of age", "BCG protects adults poorly; it is given to babies."],
          ["Asking them to drink only pasteurised milk", "This prevents *M. bovis* infection, not droplet spread from Sipho."],
        ],
        answer: "A",
        explanation: "Contact tracing and testing finds infected contacts early.",
      }),
    ],
    explanation: "Droplet spread, crowding, HIV co-infection and contact tracing.",
    hints: ["Think about the route of transmission and the immune system."],
  });

  b.card("FACT", "Pathogen that causes cholera", "*Vibrio cholerae*, a comma-shaped bacterium with a flagellum.");
  b.card("FACT", "How is cholera transmitted?", "Faecal-oral route: water or food contaminated with infected faeces.");
  b.card("CONCEPT", "How does cholera toxin cause diarrhoea?", "Intestinal cells secrete chloride ions into the lumen; water potential falls; water follows by osmosis.");
  b.card("CONCEPT", "Why does oral rehydration solution contain glucose?", "Sodium-glucose co-transport still works, so glucose and sodium are absorbed and water follows by osmosis.");
  b.card("FACT", "Pathogens that cause TB", "*Mycobacterium tuberculosis* (droplets) and *M. bovis* (unpasteurised milk from cattle).");
  b.card("CONCEPT", "Why is TB common among people living with HIV?", "HIV destroys T-helper cells, so latent TB becomes active.");
  b.card("DEFINITION", "What is **DOTS**?", "Directly observed treatment, short course: a supporter watches each dose so the six-month course is completed.");
  b.card("DEFINITION", "What is **MDR-TB**?", "TB resistant to at least isoniazid and rifampicin, selected when treatment is incomplete.");
  b.card("FACT", "Ways to prevent cholera", "Treated piped water, sanitation, hand washing, cooking food well, oral vaccines.");
});
