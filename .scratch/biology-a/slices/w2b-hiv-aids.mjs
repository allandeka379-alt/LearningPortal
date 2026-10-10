// W2b: HIV and AIDS.
import { concept, P, t, chk, table, dpStr, rnd, pctChange } from "../lib.mjs";

concept("abio.disease.hiv-aids", { file: "disease/hiv-aids", keyPrefix: "disease.hiv-aids" }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of cell is the main target of HIV?",
    options: [
      ["T-helper lymphocytes", "Correct: they carry the CD4 receptor that HIV binds."],
      ["Red blood cells", "Red blood cells have no CD4 receptors or nucleus for the virus to use."],
      ["Neutrophils", "Neutrophils are not the main target of HIV."],
      ["Plasma cells", "Plasma cells secrete antibodies; they are not HIV's main target."],
    ],
    answer: "A",
    explanation: "HIV binds the **CD4 receptor** found mainly on T-helper cells (and some macrophages).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the role of reverse transcriptase in the life cycle of HIV?",
    options: [
      ["It makes a DNA copy of the viral RNA inside the host cell", "Correct: RNA → DNA, the reverse of transcription."],
      ["It makes viral RNA from the host cell's DNA", "That would be ordinary transcription, done by RNA polymerase."],
      ["It inserts viral DNA into a host chromosome", "This is the role of integrase."],
      ["It cuts long viral proteins into shorter working proteins", "This is the role of protease."],
    ],
    answer: "A",
    explanation: "**Reverse transcriptase** uses viral RNA as a template to make DNA, which integrase then inserts into the host's DNA.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Where does the lipid envelope of an HIV particle come from?",
    options: [
      ["The cell surface membrane of the host cell it budded from", "Correct: the virus takes membrane as it buds out."],
      ["It is made from lipids coded for by viral genes", "Viral genes code for proteins; the lipids are from the host."],
      ["The nuclear envelope of the host cell", "HIV buds from the cell surface membrane."],
      ["The capsid proteins folding into a double layer", "The capsid is protein; the envelope is lipid."],
    ],
    answer: "A",
    explanation: "New particles **bud** from the host cell, wrapping themselves in its cell surface membrane, which carries viral glycoproteins.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does the destruction of T-helper cells by HIV make a person vulnerable to many different infections?",
    options: [
      ["T-helper cells release cytokines that activate B-cells and T-killer cells", "Correct: without them, specific responses to most pathogens fail."],
      ["T-helper cells are the only cells in the body that produce and secrete antibodies", "Antibodies are made by plasma cells (from B-cells)."],
      ["T-helper cells engulf and digest bacteria directly", "That is the role of phagocytes."],
      ["T-helper cells form the skin barrier against pathogens", "The skin is made of epithelial cells, not lymphocytes."],
    ],
    answer: "A",
    explanation: "T-helper cells coordinate the immune response. Without their **cytokines**, B-cells are not stimulated to form plasma cells and T-killer cells are not activated.",
    hints: ["What do T-helper cells release?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A person was infected with HIV two weeks ago, but an antibody test is negative. What is the most likely explanation?",
    options: [
      ["Antibodies have not yet been made in detectable amounts (the window period)", "Correct: antibody tests can miss very recent infections."],
      ["HIV is destroyed by antibodies within two weeks of infection", "Antibodies do not clear HIV."],
      ["The virus has not yet entered any T-helper cells, so there is nothing for the test to find", "Viral replication is very rapid in early infection."],
      ["The test detects only the bacteria that cause AIDS", "AIDS is caused by a virus, not bacteria."],
    ],
    answer: "A",
    explanation: "B-cells take some weeks to produce enough antibodies to be detected. During this **window period** the viral load is high and the person can transmit HIV.",
    hints: ["What does the test detect, and how long does it take to appear?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why has it proved so difficult to develop a vaccine against HIV?",
    options: [
      ["Reverse transcriptase makes many errors, so the virus's surface antigens change rapidly", "Correct: high mutation rate gives many antigen variants."],
      ["HIV has no antigens at all on its surface for antibodies or memory cells to recognise", "HIV has envelope glycoproteins that act as antigens."],
      ["HIV is a bacterium, and vaccines only work against viruses", "HIV is a virus, and vaccines work against many bacteria too."],
      ["The virus only infects red blood cells, which are not reached by vaccines", "HIV infects T-helper cells, not red blood cells."],
    ],
    answer: "A",
    explanation: "Reverse transcriptase is error-prone, so HIV mutates rapidly and its **envelope glycoproteins vary**; memory cells made to one form may not recognise another. The provirus also hides in host DNA.",
    hints: ["Think about the enzyme that copies its genome."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Why does antiretroviral therapy for the mother reduce mother-to-child transmission of HIV?",
    options: [
      ["It lowers her viral load, so less virus reaches the baby", "Correct: transmission depends on the amount of virus in body fluids."],
      ["It gives the baby antibodies that destroy HIV permanently before birth", "ART is not an antibody treatment."],
      ["It stops the placenta from forming blood vessels", "ART does not affect placental development."],
      ["It makes breast milk contain antibiotics that kill HIV", "Antibiotics do not act on viruses."],
    ],
    answer: "A",
    explanation: "ART suppresses replication, so the **viral load** in the mother's blood and milk falls and transmission becomes rare.",
    hints: ["What does ART do to the amount of virus?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these does NOT transmit HIV?",
    options: [
      ["Sharing cups and plates with a person living with HIV", "Correct: HIV is not spread by casual contact or saliva on utensils."],
      ["Sharing needles with a person who has a detectable viral load", "Blood in shared needles can transmit HIV."],
      ["Unprotected sex with a person who has a detectable viral load", "This is the main route of transmission."],
      ["Breastfeeding by an untreated mother living with HIV", "HIV is present in breast milk."],
    ],
    answer: "A",
    explanation: "HIV is transmitted in blood, semen, vaginal fluids and breast milk, not by sharing utensils, touching or mosquitoes.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "HIV is a retrovirus with RNA as its genetic material.",
    answer: true,
    explanation: "True. It carries two copies of single-stranded RNA and the enzyme reverse transcriptase.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Antiretroviral therapy removes the HIV provirus from the DNA of infected cells, curing the infection.",
    answer: false,
    explanation: "False. ART blocks replication, but the provirus remains in host DNA, so treatment is lifelong.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each component of HIV with its function.",
    pairs: [
      ["Reverse transcriptase", "Makes DNA from the viral RNA"],
      ["Integrase", "Inserts viral DNA into a host chromosome"],
      ["gp120 glycoprotein", "Binds the CD4 receptor on T-helper cells"],
      ["Capsid", "Protein coat around the RNA and enzymes"],
    ],
    explanation: "Each structure has a role in entering cells or copying the genome.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "AIDS is diagnosed when the number of T-helper cells falls below about {{blank:a}} cells per mm³ of blood. Infections such as TB that take advantage of the weakened immune system are called {{blank:b}} infections. The amount of virus in the blood is measured as the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["200"], choices: ["200", "2000", "20"] },
      { id: "b", accepted: ["opportunistic"], choices: ["opportunistic", "congenital", "acute"] },
      { id: "c", accepted: ["viral load"], choices: ["viral load", "CD4 count", "antibody titre"] },
    ],
    explanation: "Below about 200 CD4 cells per mm³, opportunistic infections develop; viral load measures the virus in blood.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the receptor on T-helper cells to which HIV binds.",
    accepted: ["CD4", "CD4 receptor", "CD4 glycoprotein", "CD4 protein"],
    wrong: ["CD8"],
    explanation: "The viral glycoprotein gp120 binds the **CD4** receptor (with a co-receptor).",
  });

  // Numerical: CD4 recovery (different numbers from the lesson)
  const s = 150, e = 465;
  const inc = pctChange(s, e);
  chk(inc, 210);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "A patient's CD4 count rose from 150 to 465 cells per mm³ during the first two years of antiretroviral therapy. Calculate the percentage increase.",
    value: inc, unit: "%",
    wrong: [rnd((e / s) * 100, 0), rnd(((e - s) / e) * 100, 1)],
    explanation: t`Increase $= 465 - 150 = 315$. Percentage increase $= \dfrac{315}{150} \times 100 = ${inc}\%$. Calculating 465 ÷ 150 × 100 = 310% gives the new value as a percentage of the old, not the increase.`,
  });

  const months = [0, 6, 12, 18, 24, 30];
  const cd4 = [820, 760, 690, 640, 575, 520];
  const rate = (cd4[0] - cd4[5]) / (months[5] / 12);
  chk(rate, 120);
  calc({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The CD4 count of a hypothetical person who did not take treatment was measured every 6 months.\n\n${table(["Months after diagnosis", ...months.map(String)], [["CD4 count / cells per mm³", ...cd4.map(String)]])}\n\nCalculate the mean rate of decrease in CD4 count, in cells per mm³ per year, over the whole period.`,
    value: rate,
    wrong: [(cd4[0] - cd4[5]) / 30, cd4[0] - cd4[5]],
    explanation: t`1. Total decrease $= 820 - 520 = 300$ cells per mm³.
2. Time $= 30$ months $= 2.5$ years.
3. Rate $= 300 \div 2.5 = ${rate}$ cells per mm³ per year.
4. Dividing by 30 gives a rate per month (10), not per year.`,
    hints: ["Convert months to years before dividing."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how HIV infects a T-helper cell and causes new virus particles to be made.",
    points: [
      "Viral glycoprotein (gp120) binds to the CD4 receptor; envelope fuses with the cell surface membrane / RNA and enzymes enter",
      "Reverse transcriptase makes DNA from the viral RNA",
      "Integrase inserts the viral DNA into a host chromosome (provirus)",
      "Provirus transcribed and viral proteins made by host ribosomes; new particles assemble and bud from the cell",
    ],
    modelAnswer: "The glycoprotein gp120 on the envelope binds to CD4 receptors on the T-helper cell, the envelope fuses with the membrane and the RNA and enzymes enter. Reverse transcriptase makes a DNA copy of the RNA, and integrase inserts this DNA into a host chromosome as a provirus. When the cell is activated, the provirus is transcribed and the host's ribosomes make viral proteins; new particles assemble and bud from the cell surface, taking membrane as their envelope.",
    explanation: "Attach and enter → reverse transcribe → integrate → transcribe and translate → bud.",
    hints: ["Name each viral enzyme in the order it acts."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain why tuberculosis is a common cause of death among people with untreated HIV infection.",
    points: [
      "HIV destroys T-helper cells, so the immune response is weakened",
      "Latent TB bacteria are no longer contained / new TB infections are not controlled, so active TB develops",
      "T-helper cells normally activate macrophages / T-killer cells needed to control TB, so TB spreads through the lungs and body",
    ],
    modelAnswer: "HIV destroys T-helper cells. These cells normally release cytokines that activate macrophages and T-killer cells, which keep TB bacteria walled off. Without them, latent TB becomes active and new infections are not controlled, so TB spreads through the lungs and other organs.",
    explanation: "TB is an opportunistic infection in advanced HIV.",
    hints: ["What keeps latent TB in check?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss how biological and social factors make HIV difficult to control.",
    points: [
      "Biological: virus integrates as a provirus so infection cannot be cured / treatment is lifelong",
      "Biological: high mutation rate (error-prone reverse transcriptase) causes drug resistance and has prevented an effective vaccine",
      "Biological: people may have no symptoms for years / window period, so they transmit without knowing",
      "Social: stigma / discrimination discourages testing, disclosure and taking treatment; or difficulty negotiating condom use",
    ],
    modelAnswer: "HIV integrates into host DNA, so it cannot be removed and treatment must continue for life. Its reverse transcriptase makes many errors, so drug-resistant strains arise and antigens vary too much for a vaccine. People can feel well for years and tests may be negative in the window period, so they may pass the virus on without knowing. Socially, stigma discourages people from testing, telling partners or taking pills openly, and some people find it difficult to insist on condom use.",
    explanation: "Give both biological and social points, each linked to HIV.",
    hints: ["Consider the provirus, mutation, symptomless years and stigma."],
  });

  // Practice structured: PMTCT (hypothetical clinic data)
  const groups = [["No ART during pregnancy", 220, 33], ["ART during pregnancy and breastfeeding", 410, 6]];
  const pct = groups.map(([, n, inf]) => (inf / n) * 100);
  chk(pct[0], 15);
  chk(rnd(pct[1], 2), 1.46);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Hypothetical data from clinics compare babies born to mothers living with HIV. The babies were tested for HIV at 18 months.\n\n${table(["Group", "Number of babies", "Babies infected with HIV"], groups.map(([g, n, i]) => [g, String(n), String(i)]))}`,
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the percentage of babies infected in the group whose mothers had no ART.",
        value: pct[0], unit: "%", wrong: [rnd((groups[0][1] / groups[0][2]), 1)],
        explanation: t`$33 \div 220 \times 100 = ${pct[0]}\%$.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the percentage for the ART group. Give your answer to two decimal places.",
        value: pct[1], dp: 2, unit: "%", wrong: [6],
        explanation: t`$6 \div 410 \times 100 = ${dpStr(pct[1], 2)}\%$.`,
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain the difference between the two groups.",
        points: [
          "ART stops the virus replicating, so the mother's viral load falls",
          "Fewer virus particles reach the baby across the placenta / during birth",
          "Fewer virus particles in breast milk, so less transmission during breastfeeding",
        ],
        modelAnswer: "ART blocks viral replication, so the mother's viral load becomes very low. Far fewer virus particles reach the baby in pregnancy and at birth, and there is little virus in the breast milk, so transmission falls from 15% to about 1.5%.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Suggest why the babies were tested at 18 months rather than at birth with an antibody test.",
        points: ["Maternal antibodies cross the placenta, so a baby's antibody test can be positive at birth even if the baby is not infected (or breastfeeding continued after birth)"],
        modelAnswer: "Antibodies from the mother cross the placenta and stay in the baby's blood for months, so an antibody test at birth could be positive even in an uninfected baby; transmission can also occur during breastfeeding.",
      }),
    ],
    explanation: "ART lowers viral load and so prevents most mother-to-child transmission.",
    hints: ["Link viral load to the three times a baby can be infected."],
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Nyasha, aged 19, attends a youth-friendly clinic in Masvingo. She tests HIV-negative. Her partner has recently tested HIV-positive and has just started antiretroviral therapy.",
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Suggest two ways in which Nyasha can reduce her risk of infection.",
        points: ["Use condoms consistently (barrier to body fluids)", "Take PrEP (pre-exposure prophylaxis) / partner keeps taking ART until viral load is undetectable"],
        modelAnswer: "She can use condoms every time, and she can take PrEP daily while her partner's viral load is still detectable.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why her partner's risk of passing on HIV falls after several months of treatment.",
        points: ["ART stops viral replication, so viral load falls", "When viral load is undetectable, HIV is not transmitted sexually"],
        modelAnswer: "The drugs stop HIV replicating, so his viral load falls; once it is undetectable he does not transmit HIV through sex.",
      }),
      P.tf({
        label: "(c)", stem: "True or false: Nyasha should be retested because she might be in the window period.",
        answer: true,
        explanation: "True. A recent infection may not yet show on the test, so retesting after some weeks is advised.",
      }),
      P.short({
        label: "(d)", marks: 1, stem: "Give the term for the stigma-reducing approach in which an HIV test is offered as a standard part of every clinic visit.",
        accepted: ["routine testing", "routine HIV testing", "provider-initiated testing", "opt-out testing", "provider-initiated testing and counselling", "PITC"],
        wrong: ["contact tracing"],
        explanation: "**Routine** (provider-initiated, opt-out) testing treats an HIV test as ordinary care, which reduces stigma and finds more infections.",
      }),
    ],
    explanation: "Condoms, PrEP and treatment as prevention protect HIV-negative partners.",
    hints: ["Think about barriers and about viral load."],
  });

  b.card("DEFINITION", "What is a **retrovirus**?", "An RNA virus that uses reverse transcriptase to make DNA from its RNA in the host cell.");
  b.card("FACT", "Structure of HIV (inside out)", "Two RNA strands, reverse transcriptase, integrase, protease, protein capsid, lipid envelope with glycoproteins (gp120).");
  b.card("CONCEPT", "How does HIV cause AIDS?", "It destroys T-helper cells, so B-cells and T-killer cells are not activated and opportunistic infections develop.");
  b.card("FACT", "CD4 count at which AIDS is diagnosed", "Below about 200 cells per mm³ (healthy adults about 500-1,500).");
  b.card("FACT", "Routes of HIV transmission", "Unprotected sex, infected blood (needles, transfusion), mother to child (pregnancy, birth, breastfeeding).");
  b.card("CONCEPT", "How does ART work?", "Drugs inhibit reverse transcriptase, integrase or protease, so replication stops, viral load falls and CD4 count recovers.");
  b.card("DEFINITION", "What is **PrEP**?", "Pre-exposure prophylaxis: HIV-negative people take antiretroviral drugs to prevent infection.");
  b.card("DEFINITION", "Opportunistic infection", "An infection that causes serious disease only when immunity is weakened, e.g. TB, oral thrush.");
  b.card("CONCEPT", "Why can't HIV be cured?", "Viral DNA is integrated into host chromosomes as a provirus in long-lived cells.");
});
