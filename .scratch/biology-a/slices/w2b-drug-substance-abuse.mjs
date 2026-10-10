// W2b: drug and substance abuse (ZIMSEC only).
import { concept, P, t, chk, table, dpStr, sfStr, ZIM } from "../lib.mjs";

concept("abio.disease.drug-substance-abuse", { file: "disease/drug-substance-abuse", keyPrefix: "disease.drug-substance-abuse", applies: ZIM }, (b) => {
  const calc = (o) => b.calc({ ...o, workedSolution: o.workedSolution ?? o.explanation });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by tolerance to a drug?",
    options: [
      ["A larger dose is needed to produce the same effect", "Correct: the body adapts, so the effect of a dose falls."],
      ["The drug no longer has any harmful effects on the body", "Harmful effects continue and often increase with larger doses."],
      ["The person feels unwell when the drug is stopped", "These are withdrawal symptoms, a sign of dependence."],
      ["The drug is legal and accepted by society", "Tolerance is a biological effect, not a legal or social one."],
    ],
    answer: "A",
    explanation: "**Tolerance**: repeated use reduces the effect of a dose, so more is needed for the same effect.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Ethanol is described as a depressant. What does this mean?",
    options: [
      ["It slows the activity of the nervous system", "Correct: synaptic transmission is slowed."],
      ["It always makes the drinker feel sad", "Depressant refers to nervous activity, not necessarily mood."],
      ["It reduces the volume of blood in the body", "This is not the meaning of depressant."],
      ["It lowers the concentration of glucose in the blood", "Depressant refers to the nervous system."],
    ],
    answer: "A",
    explanation: "A **depressant** slows nervous system activity: reaction times increase and coordination falls.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which component of tobacco smoke binds to haemoglobin and reduces the oxygen carried by the blood?",
    options: [
      ["Carbon monoxide", "Correct: it forms carboxyhaemoglobin."],
      ["Nicotine", "Nicotine is addictive and affects heart rate, but does not bind haemoglobin in this way."],
      ["Tar", "Tar contains carcinogens and damages the airways."],
      ["Carbon dioxide", "Carbon dioxide is not the main harmful gas in smoke."],
    ],
    answer: "A",
    explanation: "**Carbon monoxide** binds haemoglobin more strongly than oxygen, forming carboxyhaemoglobin.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is heavy, long-term drinking of alcohol especially damaging to the liver?",
    options: [
      ["The liver metabolises ethanol to toxic ethanal, which damages liver cells", "Correct: fatty liver, hepatitis and cirrhosis."],
      ["Ethanol is stored unchanged in the liver until it fills the cells", "Ethanol is metabolised, not stored."],
      ["The liver produces ethanol, so drinking adds to an existing excess", "The liver breaks ethanol down."],
      ["Alcohol blocks the hepatic artery, so liver cells receive no blood", "Ethanol harms liver cells chemically, not by blocking the artery."],
    ],
    answer: "A",
    explanation: "The liver metabolises ethanol to **ethanal** (acetaldehyde), which is toxic. Repeated exposure causes fatty liver, alcoholic hepatitis and finally **cirrhosis**.",
    hints: ["Which organ breaks ethanol down?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A person who has drunk a large amount of a codeine cough syrup together with alcohol is found breathing very slowly. What is the most likely explanation?",
    options: [
      ["Both substances depress the breathing centre in the brainstem", "Correct: opioids and alcohol add together to depress breathing."],
      ["The syrup has blocked the trachea with sugar", "Breathing is slowed by the nervous system, not a blockage."],
      ["Codeine is a stimulant that tires out the diaphragm", "Codeine is an opioid depressant, not a stimulant."],
      ["Alcohol converts codeine into carbon monoxide", "This conversion does not happen."],
    ],
    answer: "A",
    explanation: "Codeine is converted partly to morphine, an opioid that **depresses the breathing centre**; alcohol, also a depressant, adds to the effect.",
    hints: ["Which part of the brain controls breathing rate?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does methamphetamine produce such strong dependence?",
    options: [
      ["It releases large amounts of dopamine in the reward pathway, and the brain adapts", "Correct: intense reward followed by adaptation and craving."],
      ["It is a depressant that slows down every part of the nervous system", "Methamphetamine is a stimulant, not a depressant."],
      ["It is broken down so slowly that it stays in the brain for years after a single dose", "Dependence is caused by brain adaptation, not by permanent presence."],
      ["It replaces glucose as the brain's main respiratory substrate", "It is not a respiratory substrate."],
    ],
    answer: "A",
    explanation: "Methamphetamine releases large amounts of **dopamine** and blocks reuptake. Nerve cells adapt, so tolerance, craving and withdrawal follow.",
    hints: ["Which neurotransmitter gives the feeling of reward?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement correctly distinguishes the effects of nicotine from the effects of tar in tobacco smoke?",
    options: [
      ["Nicotine causes addiction and raises heart rate; tar contains carcinogens and damages cilia", "Correct: each component has a different main effect."],
      ["Nicotine contains carcinogens; tar raises heart rate and blood pressure", "These effects are reversed."],
      ["Nicotine binds haemoglobin; tar causes addiction", "Carbon monoxide binds haemoglobin; nicotine causes addiction."],
      ["Nicotine and tar both act only on the lungs and have no effect on the heart or the blood vessels", "Nicotine affects the heart and blood vessels."],
    ],
    answer: "A",
    explanation: "**Nicotine**: addiction, raised heart rate and blood pressure, vasoconstriction. **Tar**: carcinogens, paralysed cilia, mucus, bronchitis and emphysema.",
    hints: ["Which component is the addictive one?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of medicinal (not recreational) drug use?",
    options: [
      ["Taking a prescribed painkiller at the stated dose after an operation", "Correct: used to treat a medical condition as prescribed."],
      ["Drinking cough syrup in large amounts to feel relaxed", "This is misuse for its effects on mood."],
      ["Smoking cannabis at a party to relax with friends at the weekend", "This is recreational use."],
      ["Taking methamphetamine to stay awake for a night out", "This is recreational use."],
    ],
    answer: "A",
    explanation: "Medicinal use treats or prevents illness at a prescribed or recommended dose.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Ethanol can cross the placenta and harm the developing fetus.",
    answer: true,
    explanation: "True. It can cause fetal alcohol syndrome: restricted growth, facial features and permanent brain damage.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Withdrawal symptoms are a sign of physical dependence on a drug.",
    answer: true,
    explanation: "True. The body has adapted to the drug, so stopping it causes unpleasant effects.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each substance with one of its main biological effects.",
    pairs: [
      ["Ethanol", "Cirrhosis of the liver with heavy long-term use"],
      ["Carbon monoxide", "Reduced oxygen transport by haemoglobin"],
      ["THC in cannabis", "Impaired short-term memory and coordination"],
      ["Methamphetamine", "Raised heart rate and body temperature, with euphoria"],
    ],
    explanation: "Each substance affects a different system.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Codeine is an {{blank:a}} drug; part of it is converted to {{blank:b}} in the liver. Methamphetamine is a {{blank:c}} that increases the release of {{blank:d}} in the brain.",
    blanks: [
      { id: "a", accepted: ["opioid"], choices: ["opioid", "antibiotic", "stimulant"] },
      { id: "b", accepted: ["morphine"], choices: ["morphine", "ethanol", "nicotine"] },
      { id: "c", accepted: ["stimulant"], choices: ["stimulant", "depressant", "hallucinogen"] },
      { id: "d", accepted: ["dopamine"], choices: ["dopamine", "insulin", "acetylcholinesterase"] },
    ],
    explanation: "Codeine: opioid, converted partly to morphine. Methamphetamine: stimulant releasing dopamine.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the condition in a baby caused by the mother drinking alcohol during pregnancy, which includes restricted growth and permanent brain damage.",
    accepted: ["fetal alcohol syndrome", "foetal alcohol syndrome", "FAS", "fetal alcohol spectrum disorder", "foetal alcohol spectrum disorder", "FASD"],
    wrong: ["Down syndrome"],
    explanation: "**Fetal alcohol syndrome** (part of fetal alcohol spectrum disorder).",
  });

  // Numerical: ethanol in a drink (different from the lesson)
  const vol = 330, abv = 12;
  const eth = (vol * abv) / 100;
  chk(eth, 39.6);
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "A 330 cm³ can of a sweet alcoholic drink contains 12% ethanol by volume. Calculate the volume of ethanol in the can, in cm³.",
    value: eth, unit: "cm³",
    wrong: [vol * abv, 3960],
    explanation: t`Volume of ethanol $= 330 \times \dfrac{12}{100} = ${eth}\ \text{cm}^3$. Forgetting to divide by 100 gives 3,960, more than the volume of the can.`,
  });

  const mass = eth * 0.79;
  const drinks = mass / 10;
  chk(Number(drinks.toFixed(2)), 3.13);
  calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Using your answer for the 330 cm³ can of 12% drink (39.6 cm³ of ethanol), calculate the number of standard drinks in the can. The density of ethanol is 0.79 g/cm³ and one standard drink contains 10 g of ethanol. Give your answer to two decimal places.",
    value: drinks, dp: 2,
    wrong: [3.96, Number((eth / 0.79 / 10).toFixed(2))],
    explanation: t`1. Mass of ethanol $= 39.6 \times 0.79 = ${dpStr(mass, 3)}$ g.
2. Standard drinks $= ${dpStr(mass, 3)} \div 10 = ${dpStr(drinks, 2)}$.
3. Forgetting the density gives $39.6 \div 10 = 3.96$; dividing by the density instead of multiplying gives ${dpStr(eth / 0.79, 2)} g and so about 5 drinks.
4. One small can is about three standard drinks.`,
    hints: ["Convert volume to mass with the density first."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how tolerance and dependence develop when a person repeatedly uses a drug that increases dopamine release.",
    points: [
      "The drug increases dopamine in the reward pathway, giving pleasure that reinforces use",
      "Nerve cells adapt, e.g. fewer dopamine receptors / less natural neurotransmitter released",
      "So the same dose has less effect and a larger dose is needed (tolerance)",
      "Without the drug the brain works below normal, causing craving and withdrawal symptoms (dependence)",
    ],
    modelAnswer: "The drug increases dopamine in the brain's reward pathway, causing pleasure that makes the person want to repeat it. With repeated use, nerve cells adapt, for example by reducing the number of dopamine receptors. The same dose then has a smaller effect, so more is taken: tolerance. Without the drug the adapted brain functions below normal, so the person feels craving and withdrawal symptoms: dependence.",
    explanation: "Reward → adaptation → tolerance → dependence.",
    hints: ["What happens to receptors after repeated stimulation?"],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain why smoking increases the risk of coronary heart disease.",
    points: [
      "Nicotine raises heart rate and blood pressure / causes vasoconstriction",
      "Carbon monoxide (and other chemicals) damage the endothelium of arteries, promoting atherosclerosis",
      "Nicotine makes platelets stickier, increasing the risk of clots in narrowed coronary arteries",
    ],
    modelAnswer: "Nicotine raises heart rate and blood pressure and narrows arteries. Carbon monoxide and other chemicals damage the lining of arteries, where fatty deposits build up (atherosclerosis). Nicotine also makes platelets stickier, so a clot is more likely to block a narrowed coronary artery.",
    explanation: "Blood pressure, artery damage, clotting.",
    hints: ["Think about blood pressure, artery walls and clots."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Discuss the social and economic consequences of drug and substance abuse among young people, and suggest how communities can support those affected.",
    points: [
      "Social: poorer school performance / dropping out, family conflict, crime, violence or accidents",
      "Health-linked: sharing equipment or unprotected sex increases risk of HIV / mental illness such as psychosis",
      "Economic: lost earnings and productivity, cost of health care and policing, money diverted from food or fees",
      "Support: counselling / support groups / supervised withdrawal / non-judgemental approach that reduces stigma and keeps young people in school or activities",
    ],
    modelAnswer: "Young people who abuse substances may fall behind or drop out of school, and families experience conflict; crime, violence and road accidents increase. Impaired judgement and shared injecting equipment raise the risk of HIV, and drugs such as methamphetamine can cause psychosis. Economically, people lose earnings, families spend money on drugs instead of food or school fees, and health and police services bear the cost. Communities can help through counselling, support groups and medically supervised withdrawal, and by treating dependence as a health problem rather than shaming people, so they seek help early.",
    explanation: "Give social and economic effects, then support.",
    hints: ["Consider the person, the family, the community and the economy."],
  });

  // Practice structured: smoking and lung function (hypothetical)
  const yrs = [0, 10, 20, 30];
  const fev = [3.8, 3.5, 3.0, 2.4];
  const fall = ((fev[0] - fev[3]) / fev[0]) * 100;
  chk(Number(fall.toFixed(1)), 36.8);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Hypothetical data show the mean volume of air that men aged 50 could breathe out in the first second of a forced breath (FEV₁), grouped by years of smoking.\n\n${table(["Years of smoking", ...yrs.map(String)], [["Mean FEV₁ / dm³", ...fev.map((x) => x.toFixed(1))]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the percentage decrease in FEV₁ between non-smokers and men who had smoked for 30 years. Give your answer to one decimal place.",
        value: fall, dp: 1, unit: "%", wrong: [Number((((fev[0] - fev[3]) / fev[3]) * 100).toFixed(1))],
        explanation: t`$\dfrac{3.8 - 2.4}{3.8} \times 100 = \dfrac{1.4}{3.8} \times 100 = ${dpStr(fall, 1)}\%$.`,
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain how tar in tobacco smoke could cause the trend shown.",
        points: [
          "Tar paralyses / destroys cilia and stimulates mucus secretion, so mucus builds up (chronic bronchitis)",
          "Airways become inflamed and narrowed, increasing resistance to airflow",
          "Elastic tissue / alveolar walls break down (emphysema), so lungs recoil less and less air is forced out",
        ],
        modelAnswer: "Tar paralyses and destroys cilia and makes goblet cells secrete more mucus, which accumulates and causes chronic bronchitis, narrowing the airways. Inflammation damages the alveolar walls and their elastic tissue (emphysema), so the lungs recoil less and less air is forced out in the first second.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why the men were all the same age.",
        points: ["Lung function / FEV₁ changes (falls) with age", "Age is a confounding variable; controlling it means differences can be linked to smoking"],
        modelAnswer: "FEV₁ falls naturally with age, so using one age group means differences are due to smoking.",
      }),
      P.tf({
        label: "(d)", stem: "True or false: these data alone prove that smoking causes the decrease in FEV₁.",
        answer: false,
        explanation: "False. They show a correlation; other variables (occupation, air pollution) may differ. The mechanism and many other studies support a causal link.",
      }),
    ],
    explanation: "Longer smoking is associated with lower FEV₁, explained by damage to airways and alveoli.",
    hints: ["What does tar do to cilia and mucus?"],
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "Farai, aged 17, has started using crystal methamphetamine with friends in Mutare. His mother notices that he hardly sleeps or eats for days, then sleeps for long periods and seems very low. He has become suspicious and aggressive.",
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why Farai does not sleep or eat while he is using the drug.",
        points: ["Methamphetamine is a stimulant (increases dopamine / noradrenaline)", "This increases alertness and reduces appetite and the need for sleep"],
        modelAnswer: "Methamphetamine is a stimulant that increases dopamine and noradrenaline, making him alert and suppressing appetite and sleep.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Suggest why he feels very low after the drug wears off.",
        points: ["Dopamine stores are depleted / the brain has adapted to the drug", "So reward activity is below normal, causing exhaustion and depression (withdrawal)"],
        modelAnswer: "The drug has used up dopamine and the brain has adapted, so when it wears off reward activity falls below normal and he feels exhausted and depressed.",
      }),
      P.short({
        label: "(c)", marks: 1, stem: "Name the serious mental health condition, involving loss of contact with reality, that his suspicion and aggression may indicate.",
        accepted: ["psychosis", "drug-induced psychosis", "methamphetamine psychosis", "stimulant psychosis"],
        wrong: ["anxiety"],
        explanation: "Repeated methamphetamine use can cause **psychosis**, including paranoia.",
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "Suggest one way his family could help him.",
        points: ["Any valid supportive action: encourage counselling / clinic visit / support group, stay supportive and non-judgemental"],
        modelAnswer: "Encourage him, without blame, to see a counsellor or clinic that supports young people with substance use.",
      }),
    ],
    explanation: "A stimulant with a crash afterwards; long-term use risks psychosis; support helps recovery.",
    hints: ["Is methamphetamine a stimulant or a depressant?"],
  });

  b.card("DEFINITION", "What is a **drug**?", "A substance that changes the way the body or mind works.");
  b.card("DEFINITION", "Tolerance versus dependence", "Tolerance: bigger dose needed for same effect. Dependence: need for the drug, with withdrawal symptoms when stopped.");
  b.card("FACT", "Effects of heavy alcohol use on the liver", "Fatty liver → alcoholic hepatitis → cirrhosis (scar tissue); raised liver cancer risk.");
  b.card("FACT", "Fetal alcohol syndrome", "Ethanol crossing the placenta causes restricted growth, facial features and permanent brain damage.");
  b.card("FACT", "Effects of nicotine", "Addictive; raises heart rate and blood pressure; vasoconstriction; stickier platelets.");
  b.card("FACT", "Effects of tar", "Carcinogens; paralyses cilia; more mucus; bronchitis and emphysema.");
  b.card("FACT", "Effects of cannabis (THC)", "Impaired short-term memory and coordination; dependence; raised psychosis risk in vulnerable young people.");
  b.card("FACT", "Effects of methamphetamine", "Stimulant: dopamine release, euphoria, no sleep or appetite; strong dependence; paranoia and psychosis.");
  b.card("CONCEPT", "Why is misusing codeine syrup dangerous?", "Codeine (an opioid, partly converted to morphine) depresses breathing, especially with alcohol; causes dependence.");
});
