// W3b: both-board practical exam-format item: one PLANNING question (15 marks, ZIMSEC Paper 4 planning/design and
// Cambridge Paper 5 question 1 style): relative rates of hydrolysis of 1-chloro-, 1-bromo- and 1-iodobutane with
// ethanolic silver nitrate.
import { concept, P, t, EXAM, checkExam, Mr, sfStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const PL = { skill: EXAM.PLANNING.skill, secs: EXAM.PLANNING.secs, examStyle: true, paper: "Paper 4 (ZIMSEC), Paper 5 (CIE)" };

concept(A("skills.planning-evaluation"), { file: "exam/w3b-practical", keyPrefix: "exam.w3b-practical" }, (b) => {
  const nEach = 1.0e-3;
  const rho = 1.27;
  const vBr = (nEach * Mr("C4H9Br")) / rho;
  const tI = 48, tCl = 1250;
  const ratio = tCl / tI;
  b.struct({
    ...PL, d: 4, calculator: true,
    concepts: [A("skills.planning-evaluation"), A("halogen.halogenoalkane-reactions")],
    stem: t`You are to plan an experiment to compare the rates of hydrolysis of 1-chlorobutane, 1-bromobutane and 1-iodobutane.

When a halogenoalkane is warmed with aqueous silver nitrate dissolved in ethanol, water slowly hydrolyses it: $\ce{C4H9X + H2O -> C4H9OH + H+ + X-}$. The halide ions released form a precipitate with silver ions, $\ce{Ag+(aq) + X-(aq) -> AgX(s)}$. The time taken for a precipitate to first appear can be used as a measure of the rate: relative rate ∝ 1/time.

Data: density of 1-bromobutane 1.27 g cm⁻³; Ar: H 1.0, C 12.0, Br 79.9. Halogenoalkanes are flammable and harmful; silver nitrate stains skin and is corrosive to eyes.`,
    parts: checkExam(EXAM.PLANNING, [
      P.manual({ label: "(a)", marks: 2, stem: "Predict the order of the rates of hydrolysis, explain your prediction, and describe in words a suitable chart or graph of the expected results.", points: ["Prediction: 1-iodobutane fastest, then 1-bromobutane, then 1-chlorobutane slowest, because C–I is the weakest C–X bond and C–Cl the strongest (bond strength, not polarity, decides)", "A bar chart of relative rate (1/time) for each halogenoalkane, or a plot of 1/time against C–X bond energy falling as bond energy increases"], modelAnswer: "Rate order: iodo > bromo > chloro, because the C–X bond energy decreases from C–Cl to C–I, so the C–I bond breaks most easily. Results can be shown as a bar chart with the three halogenoalkanes on the x-axis and 1/time (relative rate) on the y-axis; the iodo bar is tallest and the chloro bar shortest (or 1/time falls as the C–X bond energy increases)." }),
      P.manual({ label: "(b)", marks: 2, stem: "Identify the independent and dependent variables, and two variables that must be controlled.", points: ["Independent: the halogen in the halogenoalkane (type of C–X bond); dependent: time for the precipitate to appear", "Controlled (any two): temperature; amount (mol) of halogenoalkane; volume and concentration of silver nitrate; volume of ethanol; size of test tubes"], modelAnswer: "Independent variable: the halogen (Cl, Br or I). Dependent variable: the time for a precipitate to first appear. Controlled variables: the temperature of the water bath and the amount of each halogenoalkane (also the volume and concentration of silver nitrate and the volume of ethanol)." }),
      P.num({ label: "(c)", marks: 2, stem: "Equal amounts, 1.00 × 10⁻³ mol, of each halogenoalkane are to be used. Calculate the volume of 1-bromobutane needed, in cm³, to three significant figures.", value: vBr, sf: 3, unit: "cm³", wrong: [nEach * Mr("C4H9Br")], explanation: `Mass = 1.00 × 10⁻³ × ${Mr("C4H9Br").toFixed(1)} = ${sfStr(nEach * Mr("C4H9Br"), 3)} g; volume = ${sfStr(nEach * Mr("C4H9Br"), 3)} ÷ 1.27 = ${sfStr(vBr, 3)} cm³ (measured with a graduated pipette or about two drops). Giving the mass in grams instead of the volume is a common slip.` }),
      P.manual({ label: "(d)", marks: 4, stem: "Describe a step-by-step method, naming the apparatus.", points: ["Put the same volume of ethanol (e.g. 1.0 cm³) into each of three test tubes and add the calculated, equal amount of each halogenoalkane using a graduated pipette; label the tubes", "Place these tubes and a tube of aqueous silver nitrate (e.g. 0.05 mol dm⁻³) in a thermostatted water bath at about 50 °C until they reach the bath temperature (check with a thermometer)", "Add the same volume of silver nitrate (e.g. 1.0 cm³) to each tube, mix, and start a stopwatch at the moment of addition", "Record the time when a precipitate first appears (view against a black background); repeat the whole experiment and take mean times"], modelAnswer: "Measure 1.0 cm³ of ethanol into each of three labelled test tubes and add the calculated volume of each halogenoalkane from a graduated pipette. Stand the tubes, and a fourth tube containing 0.05 mol dm⁻³ aqueous silver nitrate, in a water bath at 50 °C until they reach that temperature. Add 1.0 cm³ of the silver nitrate to each halogenoalkane tube, mixing, and start a stopwatch. Watch each tube against a dark background and record the time at which a precipitate first appears. Repeat the experiment twice more and calculate mean times." }),
      P.manual({ label: "(e)", marks: 1, stem: "State one safety precaution, linked to a hazard.", points: ["e.g. no naked flames (heat with a water bath) because ethanol and halogenoalkanes are flammable; or gloves and eye protection because silver nitrate is corrosive and stains skin"], modelAnswer: "Use an electrically heated water bath, not a Bunsen burner, because ethanol and the halogenoalkanes are flammable." }),
      P.manual({ label: "(f)", marks: 1, stem: "Describe a suitable results table.", points: ["Columns: halogenoalkane; time for precipitate / s for each repeat; mean time / s; relative rate (1/mean time) / s⁻¹, with units in the headings"], modelAnswer: "Columns headed: halogenoalkane | time 1 / s | time 2 / s | time 3 / s | mean time / s | relative rate (1/t) / s⁻¹." }),
      P.num({ label: "(g)", marks: 2, stem: "In a trial, the precipitate appeared after 48 s with 1-iodobutane and after 1250 s with 1-chlorobutane. Calculate how many times faster the hydrolysis of 1-iodobutane is, to two significant figures.", value: ratio, sf: 2, wrong: [tI / tCl], explanation: `Relative rate ∝ 1/t, so the ratio = (1/48) ÷ (1/1250) = 1250 ÷ 48 = ${sfStr(ratio, 2)} times faster.` }),
      P.manual({ label: "(h)", marks: 1, stem: "Explain why ethanol is used in the mixture.", points: ["Halogenoalkanes do not mix with water; ethanol dissolves both the halogenoalkane and the aqueous silver nitrate, so they form one phase and can react"], modelAnswer: "The halogenoalkanes are insoluble in water, but ethanol mixes with both the halogenoalkane and the aqueous silver nitrate, giving a single solution in which hydrolysis can occur." }),
    ]),
    hints: ["Relative rate is proportional to 1/time.", "Mass = moles × Mr; volume = mass ÷ density."],
    explanation: `Predicted order I > Br > Cl (C–X bond strength); ${sfStr(vBr, 3)} cm³ of 1-bromobutane; iodo about ${sfStr(ratio, 2)} times faster than chloro in the trial.`,
  });
});
