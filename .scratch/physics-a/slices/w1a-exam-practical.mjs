// W1a: practical exam-format items (Cambridge Paper 3, ZIMSEC Paper 4 style): PRACTICAL_GRAPH ×2 (simple pendulum,
// ball rolling down a ramp) and PRACTICAL_EVALUATION ×2 (trolley down a slope at two heights, paper cones).
import { concept, P, t as raw, chk, sfStr, dpStr, table, mean, halfRange, pctUnc, pctDifference, linFit, EXAM, checkExam, DATA } from "../lib.mjs";

// String.raw keeps "\n" literally: turn \n (not followed by a lower-case letter, so \nu and \neq survive) into a newline.
const t = (s, ...v) => raw(s, ...v).replace(/\\n(?![a-z])/g, "\n");

const A = (k) => `aphys.${k}`;
const g = DATA.g;
const PG = EXAM.PRACTICAL_GRAPH;
const PE = EXAM.PRACTICAL_EVALUATION;
const paper = "Paper 3";

concept(A("skills.tables-graphs"), { file: "exam/w1a-practical", keyPrefix: "exam.w1a-practical" }, (b) => {
  // PG1: simple pendulum, T² against l (l measured to the top of the bob).
  {
    const ls = [0.25, 0.35, 0.45, 0.55, 0.65, 0.75];
    const r1 = [20.6, 24.0, 27.4, 30.0, 32.8, 35.1];
    const r2 = [20.4, 24.3, 27.0, 30.2, 32.5, 34.9];
    const T = ls.map((_, i) => (r1[i] + r2[i]) / 2 / 20);
    const T2 = T.map((x) => x * x);
    const fit = linFit(ls, T2);
    const gExp = (4 * Math.PI ** 2) / fit.m;
    const rExp = fit.c / fit.m;
    console.log("PG1 fit", fit, "g", gExp, "r", rExp, "T2", T2);
    b.struct({
      d: 4, skill: PG.skill, secs: PG.secs, examStyle: true, paper, calculator: true,
      concepts: [A("skills.tables-graphs"), A("measurement.instruments")],
      stem: t`In this experiment you investigate how the period of a simple pendulum depends on its length.\n\nMethod: (1) Hang a small steel bob on a thread from a split cork clamped to a stand. (2) Measure the length $l$ from the bottom of the cork to the **top** of the bob with a metre rule. (3) Displace the bob through a small angle and release it. Using a stop-watch and a fiducial mark at the centre of the swing, time 20 complete oscillations; repeat. (4) Repeat for other values of $l$.\n\nRudo's results:\n\n${table([t`$l\,/\,\text{m}$`, t`$20T_1\,/\,\text{s}$`, t`$20T_2\,/\,\text{s}$`], ls.map((l, i) => [dpStr(l, 3), dpStr(r1[i], 1), dpStr(r2[i], 1)]))}\n\nTheory: $T^2 = \dfrac{4\pi^2}{g}(l + r)$, where $r$ is the radius of the bob.`,
      parts: checkExam(PG, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why 20 oscillations are timed, and why the timing is started and stopped as the bob passes a fiducial mark at the centre of the swing.", points: ["The reaction-time uncertainty (≈0.2 s) is shared over 20 oscillations, so the percentage uncertainty in T is much smaller", "At the centre the bob moves fastest, so the instant it passes the mark is judged most precisely"], modelAnswer: "Reaction time adds an uncertainty of about 0.2 s to each timing, whatever its length; over 20 oscillations this is a much smaller fraction of the time measured, so T is more precise. The bob moves fastest at the centre of its swing, so the moment it passes a mark there can be judged most precisely." }),
        P.num({ label: "(b)", marks: 1, stem: t`Calculate the period $T$ for $l = 0.450\ \text{m}$, in s.`, value: T[2], sf: 3, unit: "s", wrong: [(r1[2] + r2[2]) / 2], explanation: t`Mean $20T = (27.4 + 27.0)/2 = 27.2\ \text{s}$; $T = 27.2/20 = ${sfStr(T[2], 3)}\ \text{s}$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Calculate $T^2$ for $l = 0.450\ \text{m}$, in $\text{s}^2$, to three significant figures.`, value: T2[2], sf: 3, explanation: t`$${sfStr(T[2], 3)}^2 = ${sfStr(T2[2], 3)}\ \text{s}^2$.` }),
        P.manual({ label: "(d)", marks: 2, stem: t`Describe how the extra columns for $T$ and $T^2$ should be headed and recorded in the results table.`, points: [t`Headings with quantity and unit: $T\,/\,\text{s}$ and $T^2\,/\,\text{s}^2$`, t`Calculated values to the same number of significant figures as the raw times (3) or one more, e.g. $T^2 = 1.65$; all values in a column to the same precision`], modelAnswer: t`Head the columns $T\,/\,\text{s}$ and $T^2\,/\,\text{s}^2$, with no units in the body. Since the raw times have three significant figures, give $T$ and $T^2$ to three (or four) significant figures, consistently down each column.` }),
        P.manual({ label: "(e)", marks: 2, stem: t`State the graph you would plot to test the theory, and the features you would expect it to show.`, points: [t`Plot $T^2$ (y-axis) against $l$ (x-axis)`, t`Expect a straight line with gradient $4\pi^2/g$ and a small positive intercept on the $T^2$ axis equal to $4\pi^2 r/g$ (not through the origin)`], modelAnswer: t`Plot $T^2$ against $l$. The theory predicts a straight line of gradient $4\pi^2/g$ which does not pass exactly through the origin: it cuts the $T^2$ axis at $4\pi^2 r/g$, a small positive value, because $l$ was measured to the top of the bob.` }),
        P.num({ label: "(f)", marks: 2, stem: t`Rudo plots the graph and draws the best-fit line. Determine its gradient, in $\text{s}^2\ \text{m}^{-1}$.`, value: fit.m, tol: 0.1, unit: "", explanation: t`Using two points on the line far apart, gradient $\approx ${sfStr(fit.m, 3)}\ \text{s}^2\ \text{m}^{-1}$ (any value from a good line within about $\pm 0.1$ is accepted).` }),
        P.num({ label: "(g)", marks: 2, stem: t`Determine the intercept on the $T^2$ axis, in $\text{s}^2$.`, value: fit.c, tol: 0.04, unit: "", explanation: t`$c = T^2 - (\text{gradient}) \times l$ using a point on the line: about $${sfStr(fit.c, 2)}\ \text{s}^2$ (accepted within about $\pm 0.04$).` }),
        P.num({ label: "(h)", marks: 3, stem: t`Use your gradient to determine $g$, in $\text{m s}^{-2}$.`, value: gExp, tol: 0.25, unit: "m/s²", wrong: [fit.m], explanation: t`Gradient $= 4\pi^2/g$, so $g = \dfrac{4\pi^2}{\text{gradient}} = \dfrac{39.48}{${sfStr(fit.m, 3)}} = ${sfStr(gExp, 3)}\ \text{m s}^{-2}$ (unit: $\text{m}\ \text{s}^{-2}$ from $\text{m}/\text{s}^2$).` }),
        P.num({ label: "(i)", marks: 2, stem: t`Use the gradient and the intercept to determine the radius $r$ of the bob, in m.`, value: rExp, tol: 0.008, unit: "m", wrong: [fit.c], explanation: t`Intercept $= \dfrac{4\pi^2}{g}r = \text{gradient} \times r$, so $r = \dfrac{\text{intercept}}{\text{gradient}} = \dfrac{${sfStr(fit.c, 2)}}{${sfStr(fit.m, 3)}} \approx ${sfStr(rExp, 2)}\ \text{m}$ (about a centimetre, sensible for a small bob).` }),
        P.manual({ label: "(j)", marks: 2, stem: "Explain why the line does not pass through the origin even if there are no random errors.", points: ["l is measured to the top of the bob, but the pendulum's effective length is to the centre of the bob (l + r)", "So every point is shifted by the same amount (a systematic effect): T² is not zero when l = 0, giving a positive intercept"], modelAnswer: "The pendulum behaves as if its length were measured to the centre of mass of the bob, l + r, but l was measured only to the top of the bob. Every length is therefore too short by r, a constant (systematic) amount, so the line is shifted and cuts the T² axis at a positive value instead of passing through the origin." }),
        P.mcq({ label: "(k)", stem: "What is the unit of the gradient of the graph of T² against l?", options: [[t`$\text{s}^2\ \text{m}^{-1}$`, "Correct: s² divided by m."], [t`$\text{m s}^{-2}$`, "This is the unit of g, the inverse."], [t`$\text{s m}^{-1}$`, "The y-quantity is T², with unit s², not s."], ["no unit", "s² and m do not cancel."]], answer: "A", explanation: t`Gradient $= \Delta(T^2)/\Delta l$: $\text{s}^2/\text{m} = \text{s}^2\ \text{m}^{-1}$, consistent with $4\pi^2/g$.` }),
      ]),
      explanation: t`Plot $T^2$ against $l$: gradient $\approx ${sfStr(fit.m, 3)}\ \text{s}^2\ \text{m}^{-1}$ gives $g \approx ${sfStr(gExp, 3)}\ \text{m s}^{-2}$; the intercept $\approx ${sfStr(fit.c, 2)}\ \text{s}^2$ gives a bob radius of about $${sfStr(rExp, 2)}\ \text{m}$.`,
      hints: ["T = (mean of the two times) ÷ 20.", "Compare T² = (4π²/g)l + (4π²/g)r with y = mx + c.", "r = intercept ÷ gradient."],
    });
  }

  // PG2: ball rolling down a ramp, d against t².
  {
    const ds = [0.22, 0.37, 0.52, 0.67, 0.82, 0.97];
    const tt = [
      [1.05, 0.99, 1.02],
      [1.35, 1.3, 1.34],
      [1.55, 1.61, 1.58],
      [1.8, 1.76, 1.81],
      [1.95, 2.01, 1.97],
      [2.17, 2.13, 2.16],
    ];
    const tm = tt.map(mean);
    const t2 = tm.map((x) => x * x);
    const fit = linFit(t2, ds);
    const acc = 2 * fit.m;
    const gExp = (7 * acc * 1.5) / (5 * 0.09);
    console.log("PG2 tm", tm, "fit", fit, "a", acc, "g", gExp);
    b.struct({
      d: 4, skill: PG.skill, secs: PG.secs, examStyle: true, paper, calculator: true,
      concepts: [A("skills.tables-graphs"), A("kinematics.suvat")],
      stem: t`In this experiment you investigate the motion of a ball rolling down a ramp.\n\nMethod: (1) Set up a straight grooved ramp $1.500\ \text{m}$ long with its upper end raised $0.090\ \text{m}$ above its lower end. (2) Release a steel ball from rest at the top and start a stop-watch. (3) Stop the watch when the ball passes a mark a distance $d$ down the ramp. Time each distance three times. (4) Repeat for other values of $d$.\n\nNyasha's results:\n\n${table([t`$d\,/\,\text{m}$`, t`$t_1\,/\,\text{s}$`, t`$t_2\,/\,\text{s}$`, t`$t_3\,/\,\text{s}$`], ds.map((d, i) => [dpStr(d, 3), ...tt[i].map((x) => dpStr(x, 2))]))}\n\nTheory: the ball accelerates uniformly from rest, so $d = \tfrac{1}{2}at^2$, where for a solid ball rolling without slipping $a = \tfrac{5}{7}g\dfrac{h}{L}$ ($h = 0.090\ \text{m}$, $L = 1.500\ \text{m}$).`,
      parts: checkExam(PG, [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the mean time for $d = 0.520\ \text{m}$, in s.`, value: tm[2], dp: 2, unit: "s", explanation: t`$(1.55 + 1.61 + 1.58)/3 = ${dpStr(tm[2], 2)}\ \text{s}$.` }),
        P.manual({ label: "(b)", marks: 2, stem: t`Explain why each time was measured three times, and estimate the absolute uncertainty in the mean time for $d = 0.520\ \text{m}$.`, points: ["Hand timing has random errors (reaction time); averaging repeats reduces their effect / identifies anomalies", t`Uncertainty ≈ half the range: $(1.61 - 1.55)/2 = 0.03\ \text{s}$`], modelAnswer: t`Starting and stopping the watch by hand introduces random errors from reaction time, so repeating and taking the mean reduces their effect and shows up any anomalous reading. The uncertainty in the mean is about half the range, $(1.61 - 1.55)/2 = 0.03\ \text{s}$.` }),
        P.num({ label: "(c)", marks: 1, stem: t`Calculate $t^2$ for $d = 0.520\ \text{m}$, in $\text{s}^2$, to three significant figures.`, value: t2[2], sf: 3, explanation: t`$${dpStr(tm[2], 2)}^2 = ${sfStr(t2[2], 3)}\ \text{s}^2$.` }),
        P.manual({ label: "(d)", marks: 2, stem: t`Describe how the mean-time and $t^2$ columns should be headed and to what precision they should be recorded.`, points: [t`Headings quantity/unit: mean $t\,/\,\text{s}$ and $t^2\,/\,\text{s}^2$`, t`Mean $t$ to the same 2 d.p. as the raw times; $t^2$ to 3 (or 4) significant figures, consistently in each column`], modelAnswer: t`Head them "mean $t\,/\,\text{s}$" and "$t^2\,/\,\text{s}^2$". Record the mean times to two decimal places like the raw times, and $t^2$ to three (or four) significant figures, the same for every row.` }),
        P.mcq({ label: "(e)", stem: "Which graph should Nyasha plot to obtain a straight line whose gradient gives the acceleration?", options: [[t`$d$ against $t^2$`, "Correct: d = (a/2)t², a straight line through the origin of gradient a/2."], [t`$d$ against $t$`, "d is proportional to t², so this curves."], [t`$\sqrt{d}$ against $t^2$`, "√d is proportional to t, not t²."], [t`$t$ against $d$`, "t is proportional to √d, so this curves."]], answer: "A", explanation: t`$d = \left(\tfrac{a}{2}\right)t^2$ has the form $y = mx$ with $y = d$ and $x = t^2$.` }),
        P.num({ label: "(f)", marks: 2, stem: t`She plots $d$ against $t^2$ and draws the best-fit line. Determine its gradient, in $\text{m s}^{-2}$.`, value: fit.m, tol: 0.015, unit: "m/s²", explanation: t`From two well-separated points on the line, gradient $\approx ${sfStr(fit.m, 3)}\ \text{m s}^{-2}$ (accepted within about $\pm 0.015$).` }),
        P.num({ label: "(g)", marks: 2, stem: t`Determine the intercept on the $d$ axis, in m.`, value: fit.c, tol: 0.03, unit: "m", explanation: t`$c = d - (\text{gradient})t^2$ for a point on the line: about $${sfStr(fit.c, 1)}\ \text{m}$, close to zero (accepted within about $\pm 0.03\ \text{m}$).` }),
        P.num({ label: "(h)", marks: 2, stem: t`Use your gradient to determine the acceleration $a$ of the ball, in $\text{m s}^{-2}$.`, value: acc, tol: 0.03, unit: "m/s²", wrong: [fit.m], explanation: t`Gradient $= a/2$, so $a = 2 \times ${sfStr(fit.m, 3)} = ${sfStr(acc, 3)}\ \text{m s}^{-2}$.` }),
        P.num({ label: "(i)", marks: 2, stem: t`Use $a = \tfrac{5}{7}g\dfrac{h}{L}$ and your value of $a$ to determine $g$, in $\text{m s}^{-2}$.`, value: gExp, tol: 0.5, unit: "m/s²", wrong: [(acc * 1.5) / 0.09], explanation: t`$g = \dfrac{7aL}{5h} = \dfrac{7 \times ${sfStr(acc, 3)} \times 1.500}{5 \times 0.090} = ${sfStr(gExp, 3)}\ \text{m s}^{-2}$. Leaving out the $\tfrac{5}{7}$ (treating the ball as sliding) gives a value well below 9.81.` }),
        P.manual({ label: "(j)", marks: 2, stem: "Comment on whether the intercept is consistent with the theory, and suggest one systematic error that would produce a non-zero intercept.", points: ["The theory predicts a line through the origin; the intercept is close to zero (within the scatter), so it is consistent", "A systematic error such as a constant reaction-time delay in stopping the watch (times too long) or measuring d from the wrong point on the ball shifts the line"], modelAnswer: t`Theory predicts zero intercept; her intercept, about $${sfStr(fit.c, 1)}\ \text{m}$, is small compared with the distances, so it is consistent with the theory. A constant error in every time, such as consistently stopping the watch late, or measuring $d$ from the front rather than the centre of the ball, would shift the line and give a non-zero intercept.` }),
        P.manual({ label: "(k)", marks: 3, stem: "Describe one significant limitation of the method and two specific improvements.", points: ["Limitation: times of 1–2 s are short compared with reaction time, so hand timing (start and stop) is a large source of uncertainty; or the release may give the ball a push", "Improvement: use light gates at the release point and at the mark connected to an electronic timer (or a data logger / video with timer)", "Improvement: release the ball by removing a card or using an electromagnet, so it starts from rest without a push"], modelAnswer: "The times are only 1–2 s, so the reaction time in starting and stopping the stop-watch is a large part of each reading. Placing light gates at the start and at each mark, connected to an electronic timer, would remove this. Holding the ball against a card that is pulled away (or an electromagnet) would ensure it starts from rest without being pushed." }),
      ]),
      explanation: t`Plot $d$ against $t^2$: gradient $\approx ${sfStr(fit.m, 3)}\ \text{m s}^{-2}$ so $a \approx ${sfStr(acc, 3)}\ \text{m s}^{-2}$, giving $g \approx ${sfStr(gExp, 3)}\ \text{m s}^{-2}$ from $a = \tfrac{5}{7}g h/L$.`,
      hints: ["Mean of three timings, then square.", "d = ½at² has the form y = mx.", "a = 2 × gradient; then rearrange a = (5/7)g h/L."],
    });
  }

  // PE1: trolley rolling down a slope from two heights.
  {
    const h1 = 0.08;
    const h2 = 0.2;
    const ts1 = [1.69, 1.59, 1.65];
    const ts2 = [1.09, 1.03, 1.06];
    const m1 = mean(ts1);
    const m2 = mean(ts2);
    const u1 = halfRange(ts1);
    const p1 = pctUnc(u1, m1);
    const ph = pctUnc(0.002, h1);
    const pk = p1 + 0.5 * ph;
    const k1 = m1 * Math.sqrt(h1);
    const k2 = m2 * Math.sqrt(h2);
    const pd = pctDifference(k1, k2);
    console.log("PE1", m1, m2, u1, p1, ph, pk, k1, k2, pd);
    b.struct({
      d: 4, skill: PE.skill, secs: PE.secs, examStyle: true, paper, calculator: true,
      concepts: [A("skills.evaluation-improvements"), A("kinematics.suvat")],
      stem: t`In this experiment you investigate how the time taken by a trolley to roll down a slope depends on the height of the slope.\n\nMethod: a runway $1.00\ \text{m}$ long has its upper end raised a height $h$ above its lower end, measured with a metre rule. A trolley is released by hand from rest at the top and timed with a stop-watch until it reaches the bottom.\n\n${table([t`$h\,/\,\text{m}$`, t`$t_1\,/\,\text{s}$`, t`$t_2\,/\,\text{s}$`, t`$t_3\,/\,\text{s}$`], [[dpStr(h1, 3), ...ts1.map((x) => dpStr(x, 2))], [dpStr(h2, 3), ...ts2.map((x) => dpStr(x, 2))]])}\n\nThe heights were measured to $\pm 0.002\ \text{m}$. It is suggested that $t = \dfrac{k}{\sqrt{h}}$, where $k$ is a constant.`,
      parts: checkExam(PE, [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the mean time for $h = 0.080\ \text{m}$, in s.`, value: m1, dp: 2, unit: "s", explanation: t`$(1.69 + 1.59 + 1.65)/3 = ${dpStr(m1, 2)}\ \text{s}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Estimate the absolute uncertainty in this mean time, in s.", value: u1, dp: 2, unit: "s", wrong: [2 * u1], explanation: t`Half the range: $(1.69 - 1.59)/2 = ${dpStr(u1, 2)}\ \text{s}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the percentage uncertainty in this mean time, to two significant figures.", value: p1, sf: 2, unit: "%", explanation: t`$\dfrac{${dpStr(u1, 2)}}{${dpStr(m1, 2)}} \times 100 = ${sfStr(p1, 2)}\,\%$.` }),
        P.num({ label: "(d)", marks: 1, stem: t`Calculate the percentage uncertainty in $h = 0.080\ \text{m}$, to two significant figures.`, value: ph, sf: 2, unit: "%", explanation: t`$\dfrac{0.002}{0.080} \times 100 = ${sfStr(ph, 2)}\,\%$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`Calculate the percentage uncertainty in $k = t\sqrt{h}$ for this set of readings, to two significant figures.`, value: pk, sf: 2, unit: "%", wrong: [p1 + ph], explanation: t`$\%\,\Delta k = \%\,\Delta t + \tfrac{1}{2}\%\,\Delta h = ${sfStr(p1, 2)} + \tfrac{1}{2}(${sfStr(ph, 2)}) = ${sfStr(pk, 2)}\,\%$.` }),
        P.num({ label: "(f)", marks: 1, stem: t`Calculate $k_1$ for $h = 0.080\ \text{m}$, in $\text{s m}^{1/2}$, to three significant figures.`, value: k1, sf: 3, wrong: [m1 / Math.sqrt(h1)], explanation: t`$k = t\sqrt{h} = ${dpStr(m1, 2)} \times \sqrt{0.080} = ${sfStr(k1, 3)}\ \text{s m}^{1/2}$.` }),
        P.num({ label: "(g)", marks: 1, stem: t`Calculate $k_2$ for $h = 0.200\ \text{m}$, in $\text{s m}^{1/2}$, to three significant figures.`, value: k2, sf: 3, wrong: [m2 / Math.sqrt(h2)], explanation: t`Mean $t = ${dpStr(m2, 2)}\ \text{s}$; $k = ${dpStr(m2, 2)} \times \sqrt{0.200} = ${sfStr(k2, 3)}\ \text{s m}^{1/2}$.` }),
        P.num({ label: "(h)", marks: 2, stem: "Calculate the percentage difference between $k_1$ and $k_2$, to two significant figures.", value: pd, sf: 2, unit: "%", explanation: t`$\dfrac{|${sfStr(k1, 3)} - ${sfStr(k2, 3)}|}{\tfrac{1}{2}(${sfStr(k1, 3)} + ${sfStr(k2, 3)})} \times 100 = ${sfStr(pd, 2)}\,\%$.` }),
        P.manual({ label: "(i)", marks: 2, stem: "Explain whether your results support the suggested relationship.", points: [`Criterion stated: the percentage uncertainty in k (about ${sfStr(pk, 2)} %) or an estimated experimental uncertainty (e.g. 10 %)`, `The percentage difference (${sfStr(pd, 2)} %) is less than the criterion, so the results support the relationship (within the uncertainty)`], modelAnswer: `My estimated uncertainty in k is about ${sfStr(pk, 2)} %. The two values of k differ by only ${sfStr(pd, 2)} %, which is less than this, so the results are consistent with (support) t = k/√h. (Two readings cannot prove it.)` }),
        P.manual({ label: "(j)", marks: 4, stem: "Identify four sources of uncertainty or limitations of this procedure (quantity and reason).", points: ["Only two values of h: too few to draw a valid conclusion", "Starting and stopping the stop-watch by hand: reaction time is significant for times of 1–2 s", "Releasing the trolley by hand may give it a push (not starting from rest)", "Difficult to judge exactly when the trolley reaches the bottom; or h difficult to measure because the rule is not vertical / runway sags; or friction varies"], modelAnswer: "(1) Only two heights were used, so the relationship cannot be tested properly. (2) The times are short, so reaction time in starting and stopping the watch is large compared with them. (3) Releasing the trolley by hand may push it, so it does not start from rest. (4) It is hard to judge the moment the trolley reaches the end of the runway; also h is hard to measure accurately with a hand-held rule that may not be vertical." }),
        P.manual({ label: "(k)", marks: 4, stem: "Suggest four improvements that could be made to this experiment. You may suggest the use of other apparatus or different procedures.", points: ["Take readings for at least six heights and plot a graph of t against 1/√h (or lg t against lg h)", "Use light gates at the top and bottom connected to an electronic timer (or a video with a timer)", "Release the trolley by removing a card/pin (or with an electromagnet) so that it starts from rest", "Use a set square to keep the rule vertical when measuring h (or a stop at the end to define the finish; or compensate friction / clean runway)"], modelAnswer: "(1) Use six or more heights and plot t against 1/√h to test for a straight line through the origin. (2) Time the trolley with light gates at the top and bottom connected to a timer. (3) Hold the trolley with a card at the top and release it by sliding the card away. (4) Measure h with the metre rule held vertical against a set square, to the top surface of the runway at its end." }),
      ]),
      explanation: t`$k_1 = ${sfStr(k1, 3)}$, $k_2 = ${sfStr(k2, 3)}\ \text{s m}^{1/2}$: a ${sfStr(pd, 2)} % difference, within the ${sfStr(pk, 2)} % uncertainty, so the data support $t = k/\sqrt{h}$. Limitations and improvements must be specific and paired.`,
      hints: ["Half the range gives the uncertainty in the mean.", "k = t√h: the √ halves the percentage uncertainty in h.", "Compare the percentage difference with a stated criterion."],
    });
  }

  // PE2: nested paper cones falling.
  {
    const ts1 = [1.62, 1.55, 1.71];
    const ts4 = [0.88, 0.94, 0.85];
    const m1 = mean(ts1);
    const m4 = mean(ts4);
    const u1 = halfRange(ts1);
    const p1 = pctUnc(u1, m1);
    const k1 = m1 ** 2 * 1;
    const k4 = m4 ** 2 * 4;
    const pd = pctDifference(k1, k4);
    const pk = 2 * p1;
    console.log("PE2", m1, m4, u1, p1, k1, k4, pd, pk);
    b.struct({
      d: 5, skill: PE.skill, secs: PE.secs, examStyle: true, paper, calculator: true,
      concepts: [A("skills.evaluation-improvements"), A("dynamics.drag-terminal-velocity")],
      stem: t`In this experiment you investigate how the time taken for paper cones to fall depends on their mass.\n\nMethod: identical paper cones are nested together in a stack of $n$ cones. The stack is held, point down, at a height of $1.80\ \text{m}$ above the floor, released by hand and timed with a stop-watch until it lands.\n\n${table([t`$n$`, t`$t_1\,/\,\text{s}$`, t`$t_2\,/\,\text{s}$`, t`$t_3\,/\,\text{s}$`], [["1", ...ts1.map((x) => dpStr(x, 2))], ["4", ...ts4.map((x) => dpStr(x, 2))]])}\n\nIt is suggested that the cones fall at terminal velocity for the whole distance, so that $t^2 n = k$, where $k$ is a constant.`,
      parts: checkExam(PE, [
        P.num({ label: "(a)", marks: 1, stem: t`Calculate the mean time for $n = 1$, in s.`, value: m1, dp: 2, unit: "s", explanation: t`$(1.62 + 1.55 + 1.71)/3 = ${dpStr(m1, 2)}\ \text{s}$.` }),
        P.num({ label: "(b)", marks: 1, stem: t`Estimate the absolute uncertainty in the mean time for $n = 1$, in s.`, value: u1, dp: 2, unit: "s", wrong: [2 * u1], explanation: t`Half the range: $(1.71 - 1.55)/2 = ${dpStr(u1, 2)}\ \text{s}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the percentage uncertainty in this mean time, to two significant figures.", value: p1, sf: 2, unit: "%", explanation: t`$\dfrac{${dpStr(u1, 2)}}{${dpStr(m1, 3)}} \times 100 = ${sfStr(p1, 2)}\,\%$.` }),
        P.num({ label: "(d)", marks: 1, stem: t`Calculate the mean time for $n = 4$, in s.`, value: m4, dp: 2, unit: "s", explanation: t`$(0.88 + 0.94 + 0.85)/3 = ${dpStr(m4, 2)}\ \text{s}$.` }),
        P.num({ label: "(e)", marks: 1, stem: t`Calculate $k = t^2 n$ for $n = 1$, in $\text{s}^2$, to three significant figures.`, value: k1, sf: 3, explanation: t`$${sfStr(m1, 4)}^2 \times 1 = ${sfStr(k1, 3)}\ \text{s}^2$.` }),
        P.num({ label: "(f)", marks: 1, stem: t`Calculate $k$ for $n = 4$, in $\text{s}^2$, to three significant figures.`, value: k4, sf: 3, wrong: [m4 ** 2], explanation: t`$${sfStr(m4, 4)}^2 \times 4 = ${sfStr(k4, 3)}\ \text{s}^2$.` }),
        P.num({ label: "(g)", marks: 2, stem: "Calculate the percentage difference between the two values of $k$, to two significant figures.", value: pd, sf: 2, unit: "%", explanation: t`$\dfrac{${sfStr(k4, 3)} - ${sfStr(k1, 3)}}{\tfrac{1}{2}(${sfStr(k1, 3)} + ${sfStr(k4, 3)})} \times 100 = ${sfStr(pd, 2)}\,\%$.` }),
        P.num({ label: "(h)", marks: 2, stem: t`Calculate the percentage uncertainty in $k$ for $n = 1$, to two significant figures.`, value: pk, sf: 2, unit: "%", wrong: [p1], explanation: t`$k \propto t^2$, so $\%\,\Delta k = 2 \times ${sfStr(p1, 2)} = ${sfStr(pk, 2)}\,\%$ ($n$ is exact).` }),
        P.manual({ label: "(i)", marks: 2, stem: "Explain whether the results support the suggestion, and suggest a physical reason for your conclusion.", points: [`The percentage difference (${sfStr(pd, 2)} %) is larger than the uncertainty in k (about ${sfStr(pk, 2)} %), so the results do not support t²n = k`, "Reason: the cones start from rest and accelerate before reaching terminal velocity (heavier stacks take longer to reach it), so they do not fall at terminal velocity for the whole distance"], modelAnswer: `The values of k differ by ${sfStr(pd, 2)} %, more than the ${sfStr(pk, 2)} % uncertainty in k, so the results do not support the suggestion. The cones start from rest and must accelerate before they reach terminal velocity; the heavier stack takes longer and falls further before doing so, so the assumption of terminal velocity throughout the fall is not valid.` }),
        P.manual({ label: "(j)", marks: 4, stem: "Identify four sources of uncertainty or limitations of this procedure (quantity and reason).", points: ["Only two values of n: too few to test the relationship", "The fall time is short (≈1–2 s), so reaction time in starting and stopping the watch is significant", "The cones are not at terminal velocity at the start (they accelerate from rest), so t is not simply height ÷ terminal velocity", "Cones drift sideways or tilt / air currents; or it is hard to release them without a push or to judge when they land; or the release height is hard to keep constant"], modelAnswer: "(1) Only two values of n were used. (2) The times are short, so reaction time in operating the stop-watch is a large fraction of each. (3) The cones accelerate from rest at first, so they are not at terminal velocity for the whole fall. (4) The cones drift and wobble in air currents, and it is hard to release them at exactly 1.80 m without a push." }),
        P.manual({ label: "(k)", marks: 4, stem: "Suggest four improvements that could be made to this experiment.", points: ["Use at least six values of n and plot a graph (e.g. t² against 1/n)", "Time with light gates / video with a timer (frame by frame) instead of a hand-held stop-watch", "Measure the time over a lower section only (e.g. between two light gates 1.0 m apart, starting well below the release point) so the cones are at terminal velocity, or drop from a greater height", "Release from a fixed clamp or a card that is pulled away, shield from draughts (close windows, switch off fans), and use a vertical metre rule/marker to fix the height"], modelAnswer: "(1) Use six or more values of n and plot t² against 1/n. (2) Film the fall beside a vertical scale with a timer in view, or use light gates, instead of a hand stop-watch. (3) Time the cones only over the lower metre, between two light gates, so they have reached terminal velocity, or release them from a greater height. (4) Release the cones from a clamp or a card pulled away at a fixed, measured height, with windows closed and fans off to avoid draughts." }),
      ]),
      explanation: t`$k$ changes from $${sfStr(k1, 3)}$ to $${sfStr(k4, 3)}\ \text{s}^2$, a ${sfStr(pd, 2)} % difference, larger than the ${sfStr(pk, 2)} % uncertainty: the cones are not at terminal velocity for the whole fall.`,
      hints: ["Half the range gives the uncertainty.", "t is squared in k, so double its percentage uncertainty.", "Do the cones start at terminal velocity?"],
    });
  }
});
