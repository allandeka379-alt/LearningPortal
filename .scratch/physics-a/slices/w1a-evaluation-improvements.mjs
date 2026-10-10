// W1a: skills.evaluation-improvements — uncertainties in readings, the two-readings test, limitations and improvements.
import { concept, P, t as raw, chk, sfStr, dpStr, table, mean, halfRange, pctUnc, pctDifference, fracUnc } from "../lib.mjs";

// String.raw keeps "\n" literally: turn \n (not followed by a lower-case letter, so \nu and \neq survive) into a newline.
const t = (s, ...v) => raw(s, ...v).replace(/\\n(?![a-z])/g, "\n");

const K = "aphys.skills.evaluation-improvements";

concept(K, { file: "skills/evaluation-improvements", keyPrefix: "skills.evaluation-improvements" }, (b) => {
  {
    const ts = [1.82, 1.94, 1.86];
    const h = halfRange(ts);
    chk(h, 0.06, 1e-9);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: t`A student times a paper cone falling from a fixed height three times: $1.82\ \text{s}$, $1.94\ \text{s}$ and $1.86\ \text{s}$. The stop-watch reads to $0.01\ \text{s}$. What is the best estimate of the absolute uncertainty in the time?`,
      options: [
        [t`$\pm 0.06\ \text{s}$`, "Correct: half the range of the repeats, (1.94 − 1.82)/2."],
        [t`$\pm 0.12\ \text{s}$`, "This is the whole range; the convention is half the range."],
        [t`$\pm 0.01\ \text{s}$`, "The resolution of the watch is much smaller than the scatter of the repeats, so it underestimates the uncertainty."],
        [t`$\pm 0.04\ \text{s}$`, "Dividing the range by the number of readings is not a convention used for uncertainty."],
      ],
      answer: "A",
      explanation: t`With repeated readings, the absolute uncertainty is half the range: $(1.94 - 1.82)/2 = 0.06\ \text{s}$. The repeats scatter far more than the $0.01\ \text{s}$ resolution because of reaction time and the cone's wobble.`,
    });
  }
  {
    const k1 = 2.48;
    const k2 = 2.17;
    const pd = pctDifference(k1, k2);
    console.log("eval mcq pd", pd);
    b.mcq({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`Two sets of readings give $k_1 = 2.48$ and $k_2 = 2.17$ (same unit) for a suggested relationship $y = kx$. The student estimates that the uncertainty in her experiment is 10 %. Which conclusion is correct?`,
      options: [
        ["The percentage difference is about 13 %, more than 10 %, so the readings do not support the relationship.", "Correct: |2.48 − 2.17| ÷ 2.325 × 100 = 13 %, larger than the stated 10 % criterion."],
        ["The percentage difference is about 13 %, more than 10 %, so the readings support the relationship.", "The calculation is right but the logic is reversed: a difference bigger than the uncertainty means the values do not agree."],
        ["The two values differ by only 0.31, which is small, so the readings support the relationship.", "An absolute difference must be compared with the size of k: as a percentage it is 13 %, beyond the criterion."],
        ["The percentage difference is about 7 %, less than 10 %, so the readings support the relationship.", "About 7 % comes from dividing the difference by the sum instead of the mean of the two values."],
      ],
      answer: "A",
      explanation: t`Percentage difference $= \dfrac{|2.48 - 2.17|}{\tfrac{1}{2}(2.48 + 2.17)} \times 100 = ${sfStr(pd, 2)}\,\%$. This exceeds the 10 % criterion, so the two values of $k$ do not agree within the uncertainty: the readings do not support $y = kx$.`,
      hints: ["Divide the difference by the mean of the two values.", "Compare the result with the stated 10 %."],
    });
  }
  b.mcq({
    d: 2, skill: "EVALUATION",
    stem: "In a hand-timed experiment, a trolley takes about 1.5 s to roll down a slope. Which improvement would gain credit in a practical examination?",
    options: [
      ["Use two light gates connected to an electronic timer to measure the time.", "Correct: it removes reaction time, the main source of uncertainty, and names specific apparatus."],
      ["Repeat the experiment more carefully to avoid human error in every reading.", "Vague: it does not identify the problem or the method that would fix it."],
      ["Use a stop-watch that reads to 0.001 s instead of one that reads to 0.01 s.", "The resolution is not the problem; reaction time (tenths of a second) is, and a finer display does not remove it."],
      ["Carry out the experiment in a vacuum chamber to remove all air resistance.", "Impractical in a school laboratory and does not deal with the timing uncertainty."],
    ],
    answer: "A",
    explanation: "An improvement must be a specific, realistic change that deals with a stated limitation. For short hand-timed events the limitation is reaction time; light gates and a timer (or video with a timer in view) remove it.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A student drops a paper cone about 1.8 m and times its fall. Which is a creditworthy statement of a limitation?",
    options: [
      ["The fall time is short, so reaction time in starting and stopping the watch is a large fraction of it.", "Correct: names the quantity (fall time) and the reason it is uncertain."],
      ["There was human error in all of the readings that were taken during the whole experiment.", "'Human error' names no quantity and no reason, so it never scores."],
      ["Parallax errors were made because the readings were not taken at eye level every time.", "No instrument or quantity is named, and parallax is not a significant problem when timing a fall."],
      ["The results are not accurate enough because the experiment was not done carefully.", "This says nothing about which measurement was difficult or why."],
    ],
    answer: "A",
    explanation: "A limitation scores when it names the quantity affected and gives the physical reason it is difficult to measure (here: the fall time is short compared with reaction time). Generic phrases such as human error, parallax or 'not accurate' score nothing on their own.",
    hints: ["Which option names a specific quantity and a specific reason?"],
  });
  {
    const pct = pctUnc(0.01, 0.42);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The diameter of a wire is measured with a micrometer as $0.42 \pm 0.01\ \text{mm}$. What is the percentage uncertainty in the cross-sectional area of the wire?`,
      options: [
        [`${sfStr(2 * pct, 2)} %`, "Correct: area ∝ d², so the percentage uncertainty doubles: 2 × 2.4 %."],
        [`${sfStr(pct, 2)} %`, "This is the percentage uncertainty in the diameter; the area depends on d squared."],
        [`${sfStr(pct / 2, 2)} %`, "Using the radius does not halve the percentage uncertainty: Δr/r = Δd/d."],
        [`${sfStr(pct ** 2, 2)} %`, "Powers multiply the percentage uncertainty by the power; they do not square it."],
      ],
      answer: "A",
      explanation: t`$\%\,\Delta d = \dfrac{0.01}{0.42} \times 100 = ${sfStr(pct, 2)}\,\%$. Since $A = \pi d^2/4$, $\%\,\Delta A = 2 \times ${sfStr(pct, 2)} = ${sfStr(2 * pct, 2)}\,\%$.`,
      hints: ["Find the percentage uncertainty in d first.", "For a power n, multiply the percentage uncertainty by n."],
    });
  }
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A student has two sets of readings that give values of $k$ agreeing within the stated uncertainty. Why should she still not claim that the relationship has been proved?",
    options: [
      ["Two points are consistent with many different relationships, so more readings over a wider range are needed.", "Correct: two readings can rule a relationship out, but many curves pass through two points."],
      ["The uncertainty in each reading must be exactly zero before a relationship can be proved.", "No measurement has zero uncertainty; the issue is the number of readings, not perfection."],
      ["Values of k from two readings always agree, whatever the relationship really is.", "They need not agree: if the relationship is wrong, the two values of k usually differ."],
      ["A relationship can only ever be tested by calculation, never by plotting a graph.", "A graph of many readings is exactly the better test the student should use."],
    ],
    answer: "A",
    explanation: "Agreement of two values of k shows the data are consistent with the relationship, not that it is true: many relationships fit two points. Six or more readings over a wide range, plotted as a graph, test it properly.",
    hints: ["How many different curves can be drawn through two points?"],
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A paper cone is dropped from 1.0 m and timed by hand. Which change would most reduce the percentage uncertainty in the measured fall time?",
    options: [
      ["Drop the cone from a greater height, such as 2.0 m, so that the fall time is longer.", "Correct: the reaction-time uncertainty stays about the same while the time measured increases."],
      ["Use a stop-watch with a display reading to 0.001 s rather than to 0.01 s.", "The resolution is not the limiting factor; reaction time is, and it is unchanged."],
      ["Use a heavier cone so that it reaches the ground more quickly every time.", "A shorter fall time makes the reaction-time uncertainty a larger percentage."],
      ["Record each time to more decimal places than the stop-watch displays.", "Inventing digits does not make the reading more precise."],
    ],
    answer: "A",
    explanation: "Percentage uncertainty = Δt/t × 100. Hand timing has an uncertainty of a few tenths of a second whatever the duration, so increasing t (a longer fall) reduces the percentage uncertainty.",
    hints: ["Which part of Δt/t can you change?"],
  });

  // Numerical items
  {
    const pct = pctUnc(0.3, 36.0);
    b.num({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: t`A length is measured as $36.0 \pm 0.3\ \text{cm}$. Calculate the percentage uncertainty, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [36.0 / 0.3, 0.3 / 36.0],
      explanation: t`$\dfrac{0.3}{36.0} \times 100 = ${sfStr(pct, 2)}\,\%$. Forgetting the factor 100 gives 0.0083; dividing the wrong way gives 120.`,
    });
  }
  {
    const v1 = 1.52;
    const h1 = 0.15;
    const v2 = 2.36;
    const h2 = 0.4;
    const k1 = v1 / Math.sqrt(h1);
    const k2 = v2 / Math.sqrt(h2);
    const pd = pctDifference(Number(sfStr(k1, 3)), Number(sfStr(k2, 3)));
    console.log("eval v-h k1", k1, "k2", k2, "pd", pd);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`Chipo releases a ball from height $h$ on a curved track and measures its speed $v$ at the bottom with a light gate. She suggests $v = k\sqrt{h}$. For $h = 0.400\ \text{m}$ she records $v = 2.36\ \text{m s}^{-1}$. Calculate $k$ for this set of readings, in $\text{m}^{1/2}\ \text{s}^{-1}$, to three significant figures.`,
      value: k2, sf: 3, wrong: [v2 / h2, v2 * Math.sqrt(h2)],
      explanation: t`1. Rearrange: $k = \dfrac{v}{\sqrt{h}}$.\n2. $k = \dfrac{2.36}{\sqrt{0.400}} = \dfrac{2.36}{0.632}$.\n3. $k = ${sfStr(k2, 3)}\ \text{m}^{1/2}\ \text{s}^{-1}$.\n\nDividing by $h$ instead of $\sqrt{h}$ gives 5.90; multiplying gives 1.49.`,
      hints: ["Make k the subject: k = v/√h."],
    });
    b.num({
      d: 3, skill: "EVALUATION", calculator: true,
      stem: t`For a second set of Chipo's readings, $h = 0.150\ \text{m}$ and $v = 1.52\ \text{m s}^{-1}$, giving $k_1 = ${sfStr(k1, 3)}$. Using your value $k_2 = ${sfStr(k2, 3)}$ from $h = 0.400\ \text{m}$, calculate the percentage difference between the two values of $k$, to two significant figures.`,
      value: pd, sf: 2, unit: "%", wrong: [(Math.abs(Number(sfStr(k1, 3)) - Number(sfStr(k2, 3))) / Number(sfStr(k2, 3))) * 100],
      explanation: t`Percentage difference $= \dfrac{|${sfStr(k1, 3)} - ${sfStr(k2, 3)}|}{\tfrac{1}{2}(${sfStr(k1, 3)} + ${sfStr(k2, 3)})} \times 100 = ${sfStr(pd, 2)}\,\%$. Divide by the **mean** of the two values. (Real tracks lose some energy to friction, so $k$ need not be exactly constant.)`,
      hints: ["Find the mean of the two values of k.", "Divide the difference by that mean and multiply by 100."],
    });
  }
  {
    // % uncertainty in k = d / t^2
    const d = 0.65;
    const dd = 0.002;
    const tt = 2.4;
    const dt = 0.1;
    const pk = fracUnc([[d, dd, 1], [tt, dt, 2]]) * 100;
    b.num({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A student finds $k = \dfrac{d}{t^2}$ with $d = 0.650 \pm 0.002\ \text{m}$ and $t = 2.4 \pm 0.1\ \text{s}$. Calculate the percentage uncertainty in $k$, to two significant figures.`,
      value: pk, sf: 2, unit: "%", wrong: [fracUnc([[d, dd, 1], [tt, dt, 1]]) * 100, fracUnc([[tt, dt, 2]]) * 100 - fracUnc([[d, dd, 1]]) * 100],
      explanation: t`$\%\,\Delta d = \dfrac{0.002}{0.650} \times 100 = ${sfStr(pctUnc(dd, d), 2)}\,\%$ and $\%\,\Delta t = \dfrac{0.1}{2.4} \times 100 = ${sfStr(pctUnc(dt, tt), 2)}\,\%$. For a quotient the percentage uncertainties add, and $t$ is squared: $\%\,\Delta k = ${sfStr(pctUnc(dd, d), 2)} + 2 \times ${sfStr(pctUnc(dt, tt), 2)} = ${sfStr(pk, 2)}\,\%$. Forgetting the power gives 4.5 %; subtracting for the division is never right.`,
      hints: ["Percentage uncertainties add for products and quotients.", "Multiply the percentage uncertainty of t by its power, 2."],
    });
  }
  {
    const k = 0.512;
    const abs = 0.04 * k;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A spring constant is calculated as $k = 0.512\ \text{N cm}^{-1}$ with a percentage uncertainty of 4 %. Calculate the absolute uncertainty in $k$, in $\text{N cm}^{-1}$, to one significant figure.`,
      value: abs, sf: 1, wrong: [4 * k, 0.04], hints: ["Absolute uncertainty = (percentage / 100) × value."],
      explanation: t`$\Delta k = \dfrac{4}{100} \times 0.512 = 0.020\ \text{N cm}^{-1}$, so $k = 0.51 \pm 0.02\ \text{N cm}^{-1}$ (the value is then rounded to the same decimal place as its uncertainty).`,
    });
  }

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When repeated readings of a time vary by several tenths of a second, the uncertainty in the time should still be taken as the resolution of the stop-watch.",
    answer: false,
    explanation: "False. The uncertainty is the larger of the resolution and half the range of the repeats; here the scatter (from reaction time) is far bigger than the 0.01 s resolution.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "If the percentage difference between two calculated values of a constant is smaller than the stated percentage uncertainty of the experiment, the readings are consistent with the suggested relationship.",
    answer: true,
    explanation: "True. The values agree within the uncertainty, so the data support (are consistent with) the relationship. They do not prove it; more readings and a graph are a stronger test.",
  });
  b.match({
    d: 3, skill: "EVALUATION",
    stem: "Match each limitation with the improvement that deals with it.",
    pairs: [
      ["Only two sets of readings were taken.", "Take six or more readings over a wide range and plot a graph."],
      ["Reaction time was large compared with the short time measured.", "Use light gates connected to an electronic timer."],
      ["The trolley was sometimes pushed slightly on release.", "Hold it with a card or pin and release it by removing the card."],
      ["It was hard to see where the ball first touched the floor.", "Let it land on carbon paper over white paper to leave a mark."],
    ],
    explanation: "Each improvement removes the cause stated in its limitation: more data for a reliable test, electronic timing instead of a hand-held watch, a release that cannot push, and a record of the landing point instead of a judgement by eye.",
    hints: ["Pair each problem with the change that removes its cause."],
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the rules for uncertainties.",
    template: "The absolute uncertainty of a set of repeated readings is half the {{blank:a}} of the readings. The percentage uncertainty in $t^2$ is {{blank:b}} the percentage uncertainty in $t$.",
    blanks: [
      { id: "a", accepted: ["range"], choices: ["range", "mean", "sum"] },
      { id: "b", accepted: ["twice"], choices: ["twice", "the same as", "the square of"] },
    ],
    explanation: "Half the range estimates the spread of repeats; raising a quantity to the power n multiplies its percentage uncertainty by n, so squaring doubles it.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Repeating readings and calculating a mean reduces the effect of which type of error?",
    accepted: ["random", "random error", "random errors", "random uncertainty"],
    rejected: [{ value: "systematic", feedback: "Systematic errors shift every reading the same way, so averaging does not remove them." }],
    wrong: ["systematic", "zero error"],
    explanation: "Averaging reduces **random** errors, which scatter readings both ways. Systematic errors (such as a zero error) shift every reading by the same amount and must be found and corrected instead.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Nyasha investigates how the time $t$ for a toy car to roll down a ramp depends on the height $h$ of the raised end. She raises the end on blocks, measures $h$ with a metre rule held by hand, releases the car by hand and times it with a stop-watch. She takes one reading at each of two heights. Identify **two** limitations of her method and suggest an improvement for each.",
    points: [
      "Limitation: only two heights (one reading each), not enough to test the relationship / draw a conclusion",
      "Improvement: take readings at six or more heights, repeat each, and plot a suitable graph",
      "Limitation: the time is short and hand timing (reaction time) makes t uncertain; or the car may be pushed on release; or h is hard to measure because the rule may not be vertical",
      "Matching improvement: light gates and a timer (or video with a timer); or release by removing a card/pin; or measure h with a set square to keep the rule vertical",
    ],
    modelAnswer: "(1) Only two heights were used, with one reading each, so the relationship cannot be tested reliably: use at least six heights, repeat each timing and plot a graph. (2) The roll lasts only about a second, so reaction time in starting and stopping the stop-watch is a large part of t: use light gates at the top and bottom connected to a timer.",
    explanation: "Each limitation must name the quantity and the reason; each improvement must deal with that reason using specific apparatus or method.",
    hints: ["Think about how many readings she took, and how she measured t and h."],
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: t`Farai obtains $k_1 = 0.84$ and $k_2 = 0.79$ for a suggested relationship and estimates the uncertainty in his experiment as 10 %. Explain whether his results support the relationship.`,
    points: [
      t`Percentage difference calculated: $\dfrac{0.05}{0.815} \times 100 \approx 6\,\%$`,
      "Compared with the stated criterion: 6 % is less than 10 %",
      "Conclusion: the two values agree within the uncertainty, so the results support (are consistent with) the relationship",
    ],
    modelAnswer: t`Percentage difference $= \dfrac{0.84 - 0.79}{\tfrac{1}{2}(0.84 + 0.79)} \times 100 = ${sfStr(pctDifference(0.84, 0.79), 2)}\,\%$. This is less than the 10 % uncertainty, so the values of $k$ agree within the uncertainty and the results support the relationship.`,
    explanation: "Calculate, compare with a stated criterion, conclude: the three steps examiners look for.",
    hints: ["Calculate the percentage difference using the mean of the two values."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 2,
    stem: "Explain why \"repeat the readings\" on its own does not earn credit as an improvement, and how it should be written to earn credit.",
    points: [
      "Repeating alone does not say which uncertainty it reduces or how the results are used, and it does not deal with systematic errors or a poor method",
      "Creditworthy form: repeat each reading and calculate a mean (to reduce a named random uncertainty), or take more readings at more values and plot a graph",
    ],
    modelAnswer: "Simply repeating a flawed method gives the same flawed readings and does not remove systematic errors; on its own it does not identify the problem. It earns credit when made specific: for example, 'take readings at six or more heights and plot a graph of t against 1/√h', or 'repeat each timing and calculate a mean to reduce the effect of reaction time'.",
    explanation: "Examiners reward improvements that match a stated limitation and say exactly what would be done.",
    hints: ["What does repeating fail to fix?"],
  });

  // Practice structured 1: wire length and current (two readings test).
  {
    const E = 1.5;
    const r = 0.5;
    const rho = 4.2; // Ω per metre of wire
    const L = [0.3, 0.7];
    const Iexact = L.map((l) => E / (r + rho * l));
    const I = Iexact.map((x) => Number(dpStr(x, 2)));
    console.log("eval wire I", Iexact, I);
    const k1 = I[0] * L[0];
    const k2 = I[1] * L[1];
    const pd = pctDifference(Number(sfStr(k1, 3)), Number(sfStr(k2, 3)));
    console.log("wire k", k1, k2, "pd", pd);
    b.struct({
      d: 4, skill: "EVALUATION", calculator: true, examStyle: true,
      stem: t`Tendai connects a $1.5\ \text{V}$ cell, an ammeter and a length $L$ of resistance wire in series, attaching the wire with crocodile clips. He suggests that the current $I$ is inversely proportional to $L$, so that $IL = k$. His two sets of readings:\n\n${table([t`$L\,/\,\text{m}$`, t`$I\,/\,\text{A}$`], L.map((l, i) => [dpStr(l, 3), dpStr(I[i], 2)]))}\n\n$L$ was measured with a metre rule to $\pm 0.002\ \text{m}$; the ammeter reading flickered by $\pm 0.01\ \text{A}$.`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the percentage uncertainty in $L = 0.300\ \text{m}$, to two significant figures.`, value: pctUnc(0.002, 0.3), sf: 2, unit: "%", explanation: t`$\dfrac{0.002}{0.300} \times 100 = ${sfStr(pctUnc(0.002, 0.3), 2)}\,\%$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Calculate $k_1 = IL$ for the first set of readings, in $\text{A m}$, to three significant figures.`, value: k1, sf: 3, wrong: [I[0] / L[0]], explanation: t`$k_1 = ${dpStr(I[0], 2)} \times 0.300 = ${sfStr(k1, 3)}\ \text{A m}$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Calculate $k_2$ for the second set, in $\text{A m}$, to three significant figures.`, value: k2, sf: 3, wrong: [I[1] / L[1]], explanation: t`$k_2 = ${dpStr(I[1], 2)} \times 0.700 = ${sfStr(k2, 3)}\ \text{A m}$.` }),
        P.num({ label: "(d)", marks: 1, stem: "Calculate the percentage difference between $k_1$ and $k_2$, to two significant figures.", value: pd, sf: 2, unit: "%", explanation: t`$\dfrac{|${sfStr(k1, 3)} - ${sfStr(k2, 3)}|}{\tfrac{1}{2}(${sfStr(k1, 3)} + ${sfStr(k2, 3)})} \times 100 = ${sfStr(pd, 2)}\,\%$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Tendai estimates that the uncertainty in his experiment is 10 %. Explain whether his readings support the suggestion.", points: [`The percentage difference (${sfStr(pd, 2)} %) is greater than the 10 % criterion`, "So the values of k do not agree within the uncertainty: the readings do not support I ∝ 1/L"], modelAnswer: `The percentage difference of ${sfStr(pd, 2)} % is larger than the 10 % uncertainty, so the two values of k are not consistent with each other: the readings do not support the suggestion that I is inversely proportional to L.` }),
        P.manual({ label: "(f)", marks: 4, stem: "Identify two limitations of Tendai's method and suggest an improvement for each.", points: ["Limitation: only two readings, too few to draw a valid conclusion", "Improvement: take six or more lengths and plot I against 1/L (or 1/I against L)", "Limitation: contact resistance / position of the crocodile clips makes L uncertain; or the wire heats up so its resistance changes; or the reading flickers", "Matching improvement: use a sliding contact or knife-edge jockey on a wire fixed along a metre rule; or switch off between readings / use smaller currents; or record the mean of the fluctuating reading (or use a digital meter)"], modelAnswer: "(1) Only two lengths were used, so the relationship cannot be tested properly: use at least six lengths and plot a graph of 1/I against L. (2) The crocodile clips touch the wire over a few millimetres and add contact resistance, so the effective length is uncertain: fix the wire along a metre rule and use a jockey with a sharp edge, cleaning the wire first." }),
        P.manual({ label: "(g)", marks: 2, stem: "Suggest a physical reason, other than experimental uncertainty, why $I$ is not exactly inversely proportional to $L$ in this circuit.", points: ["The cell has internal resistance (and the ammeter and leads have resistance), which is in series with the wire", t`So $I = E/(r + R_{\text{wire}})$: the total resistance is not proportional to $L$, and $IL$ increases with $L$`], modelAnswer: t`The cell has an internal resistance $r$ in series with the wire, so $I = \dfrac{E}{r + R}$ where $R \propto L$. Because $r$ does not change with $L$, the total resistance is not proportional to $L$, and the product $IL$ increases as $L$ increases, as Tendai's results show.` }),
      ],
      explanation: t`$k_1 = ${sfStr(k1, 3)}$ and $k_2 = ${sfStr(k2, 3)}\ \text{A m}$ differ by ${sfStr(pd, 2)} %, more than the 10 % criterion, so the data do not support $I \propto 1/L$. The internal resistance of the cell explains why: $I = E/(r + R)$.`,
      hints: ["k = IL for each row.", "Percentage difference uses the mean of the two values.", "What else in the circuit has resistance?"],
    });
  }

  // Practice structured 2: micrometer readings of a wire diameter.
  {
    const ds = [0.36, 0.38, 0.35, 0.37, 0.36];
    const m = mean(ds);
    const h = halfRange(ds);
    const pD = pctUnc(h, m);
    const A = (Math.PI * (m / 1000) ** 2) / 4;
    console.log("eval micrometer mean", m, "h", h, "pD", pD, "A", A);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true, examStyle: true,
      stem: t`Rudo measures the diameter $d$ of a wire with a micrometer screw gauge at five places along it, turning the wire between readings:\n\n${table([t`$d\,/\,\text{mm}$`, "", "", ""], [ds.map((x) => dpStr(x, 2))])}`,
      parts: [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the mean diameter, in mm, to three significant figures.`, value: m, sf: 3, unit: "mm", explanation: t`$(0.36 + 0.38 + 0.35 + 0.37 + 0.36)/5 = 1.82/5 = ${sfStr(m, 3)}\ \text{mm}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the absolute uncertainty in the diameter, in mm, as half the range.", value: h, unit: "mm", tol: 0.0051, explanation: t`Half the range $= (0.38 - 0.35)/2 = 0.015\ \text{mm}$, about $0.02\ \text{mm}$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Calculate the percentage uncertainty in the diameter, using $d = 0.364\ \text{mm}$ and $\Delta d = 0.015\ \text{mm}$, to two significant figures.`, value: pD, sf: 2, unit: "%", explanation: t`$\dfrac{0.015}{0.364} \times 100 = ${sfStr(pD, 2)}\,\%$.` }),
        P.num({ label: "(d)", marks: 1, stem: "State the percentage uncertainty in the cross-sectional area of the wire, to two significant figures.", value: 2 * pD, sf: 2, unit: "%", wrong: [pD], explanation: t`$A = \pi d^2/4$, so the percentage uncertainty doubles: $2 \times ${sfStr(pD, 2)} = ${sfStr(2 * pD, 2)}\,\%$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`Calculate the cross-sectional area using $d = 0.364\ \text{mm}$, in $\text{m}^2$, to three significant figures.`, value: A, sf: 3, unit: "m²", wrong: [Math.PI * (m / 1000) ** 2, (Math.PI * m ** 2) / 4], explanation: t`$d = 0.364 \times 10^{-3}\ \text{m}$; $A = \dfrac{\pi d^2}{4} = \dfrac{\pi (0.364 \times 10^{-3})^2}{4} = ${sfStr(A * 1e7, 3)} \times 10^{-7}\ \text{m}^2$. Using $d$ as the radius gives four times this; forgetting to convert mm to m gives ${sfStr((Math.PI * m ** 2) / 4, 3)}.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain why Rudo measured the diameter at several places and turned the wire between readings.", points: ["The wire may not be uniform along its length, or may not be perfectly circular in cross-section", "Measuring at different places and orientations and averaging gives a more representative diameter (reduces the effect of these variations)"], modelAnswer: "The wire may vary in thickness along its length and its cross-section may be slightly oval. Taking readings at different places and in different directions and averaging them gives a more representative value of the diameter." }),
      ],
      explanation: t`Mean $d = 0.364\ \text{mm}$, uncertainty $\pm 0.015\ \text{mm}$ (${sfStr(pD, 2)} %); the area has twice the percentage uncertainty (${sfStr(2 * pD, 2)} %) and is $${sfStr(A * 1e7, 3)} \times 10^{-7}\ \text{m}^2$.`,
      hints: ["Half the range gives the absolute uncertainty.", "Area depends on d², so double the percentage uncertainty.", "Convert mm to m before squaring."],
    });
  }

  // Flashcards
  b.card("DEFINITION", "Absolute uncertainty", "The range (±) within which the true value of a reading is expected to lie, in the same unit as the reading.");
  b.card("FORMULA", "Percentage uncertainty", t`$\dfrac{\Delta x}{x} \times 100\,\%$`);
  b.card("FACT", "Uncertainty of repeated readings", "Half the range of the repeats (or the instrument resolution if that is larger).");
  b.card("FORMULA", "Percentage difference between two values of k", t`$\dfrac{|k_1 - k_2|}{\tfrac{1}{2}(k_1 + k_2)} \times 100\,\%$`);
  b.card("CONCEPT", "How do you test y = kx with two sets of readings?", "Calculate k for each, find the percentage difference, compare with a stated criterion (your estimated percentage uncertainty) and conclude.");
  b.card("CONCEPT", "What makes a limitation creditworthy?", "It names the quantity affected and the physical reason it was hard to measure or control.");
  b.card("CONCEPT", "What makes an improvement creditworthy?", "A specific, realistic change (apparatus or method) that deals with the reason given in a matching limitation.");
  b.card("FACT", "Phrases that never score as limitations", "'Human error', 'parallax error' with no instrument, 'not accurate', 'be more careful', 'repeat readings' with no purpose.");
  b.card("CONCEPT", "Why can two readings not prove a relationship?", "Many relationships fit two points; only many readings over a wide range, plotted as a graph, test it properly.");
});
