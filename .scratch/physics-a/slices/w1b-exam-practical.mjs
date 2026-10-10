// W1b practical exam rows: PRACTICAL_GRAPH (spring), PRACTICAL_EVALUATION (balanced metre rule), PLANNING (cantilever
// Young modulus), DATA_ANALYSIS (cantilever oscillation power law, lg-lg with worst lines).
import { concept, P, t, chk, DATA, EXAM, checkExam, sfStr, dpStr, sciTex, lg, linFit, worstLines, mean, halfRange, pctUnc, pctDifference, table } from "../lib.mjs";

const g = DATA.g;
const A = (k) => `aphys.${k}`;

concept(A("skills.planning"), { file: "exam/w1b-practical", keyPrefix: "exam.w1b-practical" }, (b) => {
  // ---------------------------------------------------------------- PRACTICAL_GRAPH: extension of a spring
  {
    const m = [50, 100, 150, 200, 250, 300]; // g
    const lo = [171, 193, 212, 232, 253, 271]; // mm, loading
    const un = [173, 192, 214, 233, 251, 273]; // mm, unloading
    const Lm = lo.map((v, i) => (v + un[i]) / 2);
    const fit = linFit(m.map((v) => v / 1000), Lm.map((v) => v / 1000));
    const k = g / fit.m;
    const hr150 = halfRange([lo[2], un[2]]);
    const tab = table(["m / g", "reading (loading) / mm", "reading (unloading) / mm"], m.map((v, i) => [String(v), String(lo[i]), String(un[i])]));
    const mPred = 0.4;
    b.struct({
      d: 4, examStyle: true, skill: EXAM.PRACTICAL_GRAPH.skill, secs: EXAM.PRACTICAL_GRAPH.secs, paper: "Cambridge P3 / ZIMSEC P4", calculator: true,
      concepts: [A("solids.hookes-law"), A("skills.tables-graphs")],
      stem: t`In this experiment you investigate how the length of a spring depends on the mass hung from it.

**Method.** (1) Clamp the spring vertically with a pointer on its lower end next to a vertical millimetre scale. (2) Hang a mass $m$ on the spring and record the pointer reading. (3) Repeat for six masses from 50 g to 300 g, then record the readings again while removing the masses. Tendai's results are:

${tab}

The length reading $L$ is expected to be related to $m$ by $L = L_0 + \dfrac{g}{k}m$, where $L_0$ is the reading with no load and $k$ is the spring constant. Take $g = 9.81\ \text{m s}^{-2}$.`,
      parts: checkExam(EXAM.PRACTICAL_GRAPH, [
        P.num({ label: "(a)", marks: 1, stem: "For m = 150 g, use half the difference between the loading and unloading readings to estimate the absolute uncertainty in the mean reading, in mm.", value: hr150, unit: "mm", wrong: [lo[2] - un[2] === 0 ? 2 : Math.abs(lo[2] - un[2])], explanation: t`$(${un[2]} - ${lo[2]})/2 = ${hr150}\ \text{mm}$.` }),
        P.manual({ label: "(b)", marks: 2, stem: "Describe the results table you would draw, including a column for the mean length in metres.", points: ["Columns headed with quantity and unit: m / kg (or g), loading / mm, unloading / mm, mean L / m.", "Mean L given to a consistent number of decimal places matching the raw data (e.g. 0.1720 m, i.e. to 0.1 mm or 0.5 mm)."], modelAnswer: "Columns: m / kg; reading loading / mm; reading unloading / mm; mean L / m. Each heading has the quantity and unit separated by a solidus; the mean is recorded to the same precision as the raw readings (0.0005 m), e.g. 0.1725 m." }),
        P.group({ label: "(c)", stem: "Processing.", parts: [
          P.num({ label: "(i)", marks: 1, stem: "Calculate the mean reading L for m = 250 g, in m.", value: Lm[4] / 1000, dp: 4, unit: "m", wrong: [Lm[4]], explanation: t`$(${lo[4]} + ${un[4]})/2 = ${Lm[4]}\ \text{mm} = ${dpStr(Lm[4] / 1000, 4)}\ \text{m}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "Calculate the weight of the 250 g mass, in N, to three significant figures.", value: 0.25 * g, unit: "N", wrong: [250 * g], explanation: t`$0.250 \times 9.81 = ${sfStr(0.25 * g, 3)}\ \text{N}$.` }),
          P.num({ label: "(iii)", marks: 1, stem: "Calculate the percentage uncertainty in the mean reading for m = 300 g, taking the absolute uncertainty as half the difference between loading and unloading, to two significant figures.", value: pctUnc(halfRange([lo[5], un[5]]), Lm[5]), sf: 2, unit: "%", wrong: [halfRange([lo[5], un[5]])], explanation: t`$\dfrac{1}{${Lm[5]}} \times 100 = ${sfStr(pctUnc(halfRange([lo[5], un[5]]), Lm[5]), 2)}\%$.` }),
        ] }),
        P.num({ label: "(d)", marks: 3, stem: t`Plot $L$ / m against $m$ / kg, draw the line of best fit and determine its gradient, in $\text{m kg}^{-1}$.`, value: fit.m, tol: 0.015, wrong: [fit.m * 1000], explanation: t`A best-fit line through the six points has gradient about $${sfStr(fit.m, 3)}\ \text{m kg}^{-1}$ (any careful line gives 0.385 to 0.413). Use a triangle covering more than half the line.` }),
        P.num({ label: "(e)", marks: 2, stem: "Determine the y-intercept of your line, in m.", value: fit.c, tol: 0.004, unit: "m", wrong: [fit.c * 1000], explanation: t`The axis starts at $m = 0$, so read or calculate $c = y - mx$: about $${dpStr(fit.c, 3)}\ \text{m}$. This is $L_0$, the unloaded reading.` }),
        P.num({ label: "(f)", marks: 2, stem: t`Use your gradient to determine the spring constant $k$, in $\text{N m}^{-1}$.`, value: k, tol: 1.0, unit: "N/m", wrong: [fit.m / g], explanation: t`Gradient $= g/k$, so $k = 9.81/${sfStr(fit.m, 3)} = ${sfStr(k, 3)}\ \text{N m}^{-1}$.` }),
        P.num({ label: "(g)", marks: 1, stem: t`Use your value of $k$ to predict the extension (from $L_0$) for a mass of $0.400\ \text{kg}$, in m, assuming Hooke's law still applies.`, value: (mPred * g) / k, tol: 0.006, unit: "m", wrong: [mPred / k], explanation: t`$x = mg/k = 0.400 \times 9.81 / ${sfStr(k, 3)} = ${sfStr((mPred * g) / k, 3)}\ \text{m}$.` }),
        P.manual({ label: "(h)", marks: 2, stem: "State whether the results show that the spring obeys Hooke's law, giving a reason, and suggest why the loading and unloading readings differ.", points: ["Yes: the points lie close to a straight line (extension proportional to load) within the uncertainty.", "Differences: friction at the pointer/scale, the spring not settling (oscillating) before reading, parallax, or slight hysteresis."], modelAnswer: "Yes: L against m is a straight line, so the extension is proportional to the load. The loading and unloading readings differ slightly because of parallax, the spring still oscillating when read, or the pointer rubbing on the scale." }),
        P.manual({ label: "(i)", marks: 2, stem: "Suggest two improvements to the experiment.", points: ["Use a set square / read at eye level against a mirror scale to avoid parallax.", "Wait for oscillations to stop (or damp them) before reading; use smaller mass steps or more masses (e.g. 25 g steps) to give more points."], modelAnswer: "Read the pointer at eye level using a set square (or a mirror scale) to avoid parallax, wait for the spring to stop oscillating before each reading, and take more readings with smaller mass steps." }),
        P.manual({ label: "(j)", marks: 2, stem: "State two precautions, one for accuracy and one for safety.", points: ["Accuracy: check the scale is vertical (plumb line) / the pointer is close to the scale.", "Safety: goggles (spring or masses may fly off) / keep feet clear of the masses (sand tray)."], modelAnswer: "Check the scale is vertical with a plumb line and the pointer is close to it; wear goggles and keep feet clear of the hanging masses." }),
      ]),
      explanation: "L = L₀ + (g/k)m: the gradient of L against m is g/k and the intercept is L₀.",
      hints: ["Convert grams to kilograms and mm to m before plotting.", "k = g ÷ gradient."],
    });
  }

  // ---------------------------------------------------------------- PRACTICAL_EVALUATION: balanced metre rule and an unknown mass
  {
    const a1 = 20.0, b1 = [31.4, 31.8, 31.6];
    const a2 = 30.0, b2 = [46.9, 47.5, 47.2];
    const mk = 100;
    const B1 = mean(b1), B2 = mean(b2);
    const M1 = (mk * B1) / a1, M2 = (mk * B2) / a2;
    const db1 = halfRange(b1);
    const pctM1 = pctUnc(db1, B1) + pctUnc(0.1, a1);
    const pd = pctDifference(M1, M2);
    chk(pd < pctM1 ? 1 : 0, 1);
    b.struct({
      d: 4, examStyle: true, skill: EXAM.PRACTICAL_EVALUATION.skill, secs: EXAM.PRACTICAL_EVALUATION.secs, paper: "Cambridge P3 / ZIMSEC P4", calculator: true,
      concepts: [A("forces.equilibrium"), A("skills.evaluation-improvements")],
      stem: t`Rudo finds the mass $M$ of a small stone using a uniform metre rule balanced on a knife edge at its $50.0\ \text{cm}$ mark. The stone, in a thread loop, hangs a distance $a$ from the knife edge on one side. A $100\ \text{g}$ mass, also in a thread loop, is moved on the other side until the rule balances; its distance from the knife edge is $b$. She repeats the balance three times for each value of $a$. By the principle of moments, $M = \dfrac{100\,b}{a}$ (in g).

| $a\,/\,\text{cm}$ | $b\,/\,\text{cm}$ (three trials) |
| --- | --- |
| ${a1.toFixed(1)} | ${b1.map((x) => x.toFixed(1)).join(", ")} |
| ${a2.toFixed(1)} | ${b2.map((x) => x.toFixed(1)).join(", ")} |

Each value of $a$ is measured to $\pm 0.1\ \text{cm}$.`,
      parts: checkExam(EXAM.PRACTICAL_EVALUATION, [
        P.group({ label: "(a)", stem: t`For $a = ${a1.toFixed(1)}\ \text{cm}$:`, parts: [
          P.num({ label: "(i)", marks: 1, stem: "calculate the absolute uncertainty in b using half the range of the trials, in cm", value: db1, dp: 1, unit: "cm", wrong: [db1 * 2], explanation: t`$(31.8 - 31.4)/2 = ${dpStr(db1, 1)}\ \text{cm}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: "calculate the percentage uncertainty in the mean value of b, to two significant figures", value: pctUnc(db1, B1), sf: 2, unit: "%", wrong: [pctUnc(db1, a1)], explanation: t`Mean $b = ${dpStr(B1, 1)}\ \text{cm}$; $\dfrac{${dpStr(db1, 1)}}{${dpStr(B1, 1)}} \times 100 = ${sfStr(pctUnc(db1, B1), 2)}\%$.` }),
        ] }),
        P.group({ label: "(b)", stem: "Calculate M, in g, to three significant figures:", parts: [
          P.num({ label: "(i)", marks: 2, stem: t`for $a = ${a1.toFixed(1)}\ \text{cm}$`, value: M1, unit: "g", wrong: [(mk * a1) / B1], explanation: t`$M = 100 \times ${dpStr(B1, 1)}/${a1.toFixed(1)} = ${sfStr(M1, 3)}\ \text{g}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`for $a = ${a2.toFixed(1)}\ \text{cm}$`, value: M2, unit: "g", wrong: [(mk * a2) / B2], explanation: t`$M = 100 \times ${dpStr(B2, 1)}/${a2.toFixed(1)} = ${sfStr(M2, 3)}\ \text{g}$.` }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the percentage uncertainty in $M$ for $a = ${a1.toFixed(1)}\ \text{cm}$ (add the percentage uncertainties in $b$ and $a$; the 100 g mass is exact), to two significant figures.`, value: pctM1, sf: 2, unit: "%", wrong: [pctUnc(db1, B1)], explanation: t`$${sfStr(pctUnc(db1, B1), 2)}\% + \dfrac{0.1}{${a1.toFixed(1)}} \times 100 = ${sfStr(pctUnc(db1, B1), 2)} + ${sfStr(pctUnc(0.1, a1), 2)} = ${sfStr(pctM1, 2)}\%$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the percentage difference between your two values of M (difference ÷ mean × 100), to two significant figures.", value: pd, sf: 2, unit: "%", wrong: [Math.abs(M1 - M2)], explanation: t`$\dfrac{|${sfStr(M1, 4)} - ${sfStr(M2, 4)}|}{\text{mean}} \times 100 = ${sfStr(pd, 2)}\%$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "State whether the results support the conclusion that the two methods give the same value of M. Explain your answer.", points: [t`Compare: the percentage difference (${sfStr(pd, 2)}%) is less than the percentage uncertainty (${sfStr(pctM1, 2)}%).`, "So the two values agree within the uncertainty: the results support the conclusion (but only two values were obtained)."], modelAnswer: t`The two values differ by ${sfStr(pd, 2)}%, which is smaller than the ${sfStr(pctM1, 2)}% uncertainty, so they agree within experimental uncertainty and support the conclusion.` }),
        P.manual({ label: "(f)", marks: 4, stem: "Identify four sources of uncertainty or limitations of this procedure.", points: [
          "Only two values of a / two sets of readings: not enough to draw a valid conclusion.",
          "Difficult to judge exactly when the rule is balanced (it rocks / settles slowly).",
          "The thread loops have width / slip, so the exact point where each mass acts is uncertain.",
          "The rule may not balance exactly at 50.0 cm (non-uniform rule or knife edge not at its centre of gravity), so its weight has a moment.",
        ], modelAnswer: "Only two values of a were used, which is too few for a firm conclusion. It is hard to judge the balance point because the rule rocks. The thread loops are wide and can slide, so the distances to the line of action are uncertain. The rule's centre of gravity may not be exactly at the 50.0 cm mark, so its own weight may have a moment." }),
        P.manual({ label: "(g)", marks: 4, stem: "Suggest an improvement for each limitation in (f).", points: [
          "Take readings for several (at least five) values of a and plot b against a; M = 100 × gradient.",
          "Use a pointer at the end of the rule against a fixed mark, or a stand to stop the rule at horizontal, to judge balance.",
          "Use fine thread / a knife edge or small hook so the point of action is well defined and measure to its centre.",
          "Balance the rule on its own first to find its centre of gravity, and place the knife edge there (or include the rule's moment).",
        ], modelAnswer: "Use at least five values of a and plot b against a, finding M from the gradient. Fix a pointer at the end of the rule against a horizontal reference mark to judge the balance. Hang the masses from fine thread or small hooks so the line of action is clear, and measure to its centre. Find the rule's own balance point first and pivot it there." }),
      ]),
      explanation: "The principle of moments gives M = 100b/a; the percentage difference between the two values is compared with the percentage uncertainty.",
      hints: ["Uncertainty = half the range of the trials.", "Percentage uncertainties add for a quotient."],
    });
  }

  // ---------------------------------------------------------------- PLANNING: Young modulus from the sag of a cantilever
  b.struct({
    d: 4, examStyle: true, skill: EXAM.PLANNING.skill, secs: EXAM.PLANNING.secs, paper: "Cambridge P5 / ZIMSEC P4", calculator: false,
    concepts: [A("solids.stress-strain-young"), A("skills.planning")],
    stem: t`A builder wants the Young modulus $E$ of a hardwood used for shelving. It is suggested that, when a thin strip of the wood is clamped horizontally at one end with a length $L$ projecting, and a load of weight $W$ hangs from its free end, the downward deflection $y$ of the free end is

$$
y = \frac{4WL^3}{Ebd^3}
$$

where $b$ is the width and $d$ the thickness of the strip. Plan an experiment to investigate how $y$ depends on $L$ and to determine $E$. Describe the arrangement in words, the measurements and how the results are analysed.`,
    parts: checkExam(EXAM.PLANNING, [
      P.manual({ label: "(a)", marks: 2, stem: "Identify the independent and dependent variables and the variables to be kept constant.", points: ["Independent: projecting length L; dependent: deflection y of the free end.", "Constant: load W (same mass), width b, thickness d (same strip), same wood/grain direction (or temperature)."], modelAnswer: "Independent variable: the length L of strip projecting beyond the clamp. Dependent variable: the deflection y of the free end. Kept constant: the load W (same mass), the width b and thickness d (same strip), and the type of wood." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the arrangement and method.", points: [
        "Strip clamped firmly to the edge of a bench (G-clamp, with a block) so a length L projects horizontally.",
        "Vertical metre rule (or a stand with a scale) at the free end; reading of the end taken unloaded and then with the load hung from the end: y = difference.",
        "Change L by moving the strip in the clamp; at least six values of L (e.g. 0.30 m to 0.80 m), repeat and average.",
      ], modelAnswer: "Clamp the strip to the edge of the bench with a G-clamp and a wooden block so that a length L projects horizontally. Fix a metre rule vertically beside the free end. Record the height of the end with no load, hang the load from the end, and record the height again; y is the difference. Slide the strip in the clamp to change L, using at least six lengths from 0.30 m to 0.80 m, and repeat each measurement." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe how each quantity would be measured and state the instruments.", points: [
        "L measured with a metre rule from the edge of the clamp to the point where the load hangs.",
        "y measured with a metre rule read at eye level (set square), or a travelling microscope / dial gauge for small deflections.",
        "b with vernier calipers and d with a micrometer (several places, averaged); W from the mass on a balance × g.",
      ], modelAnswer: "Measure L from the edge of the clamp to the load's point of attachment with a metre rule. Measure y with a vertical metre rule read at eye level using a set square (or a dial gauge for small deflections). Measure b with vernier calipers and d with a micrometer at several places, averaging. Find W by weighing the load on a balance and multiplying by g." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain how you would make sure the other variables are controlled and the deflection measured fairly.", points: ["Use the same strip, the same load, and the same clamp position/pressure; load hung at the same point (a thin loop) each time.", "Check the deflection returns to zero when unloaded (no permanent bending); take readings after the strip stops oscillating."], modelAnswer: "Use the same strip and load throughout, hang the load from a thin loop at the very end each time and tighten the clamp the same way. Check the strip returns to its original position when unloaded, so it has not been permanently bent, and read only when it has stopped oscillating." }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain how the results would be analysed to test the relationship and determine E.", points: [
        t`Plot $y$ against $L^3$ (or $\lg y$ against $\lg L$).`,
        t`Relationship valid if a straight line through the origin (or a lg–lg gradient of 3).`,
        t`Gradient $= \dfrac{4W}{Ebd^3}$, so $E = \dfrac{4W}{bd^3 \times \text{gradient}}$.`,
      ], modelAnswer: t`Plot $y$ against $L^3$. If the relationship holds, the graph is a straight line through the origin with gradient $4W/(Ebd^3)$, so $E = 4W/(bd^3 \times \text{gradient})$.` }),
      P.manual({ label: "(f)", marks: 1, stem: "State one safety precaution.", points: ["Keep feet clear of the load / use a sand tray below it in case the strip slips or breaks; wear goggles in case it snaps."], modelAnswer: "Put a box of sand under the load and keep feet clear, in case the strip slips from the clamp or snaps." }),
      P.manual({ label: "(g)", marks: 1, stem: "Give one further detail that would improve the reliability of the results.", points: ["Preliminary experiment to choose a load giving a measurable y without permanent bending / measure d at several points because it appears cubed / use small deflections (y much smaller than L)."], modelAnswer: "Do a preliminary test to choose a load that gives a clearly measurable deflection without permanently bending the strip, and measure the thickness at many points because it is cubed in the formula." }),
    ]),
    explanation: "A cantilever plan: vary L, measure y, keep W, b, d constant; y against L³ is straight through the origin with gradient 4W/(Ebd³).",
    hints: ["Which quantity is raised to the third power?", "Thickness appears cubed: measure it with the most precise instrument."],
  });

  // ---------------------------------------------------------------- DATA_ANALYSIS: cantilever oscillation, T = kL^n
  {
    const L = [0.2, 0.25, 0.3, 0.35, 0.4, 0.45];
    const T = [0.154, 0.209, 0.281, 0.35, 0.434, 0.511];
    const dT = 0.01;
    const X = L.map(lg), Y = T.map(lg);
    const dY = T.map((v) => (lg(v + dT) - lg(v - dT)) / 2);
    const pts = L.map((_, i) => ({ x: X[i], y: Y[i], dy: dY[i] }));
    const fit = linFit(X, Y);
    const w = worstLines(pts);
    const dn = Math.max(Math.abs(fit.m - w.steep.m), Math.abs(fit.m - w.shallow.m));
    const k = 10 ** fit.c;
    const kW = [10 ** w.steep.c, 10 ** w.shallow.c];
    const dk = Math.max(...kW.map((v) => Math.abs(v - k)));
    const row = 2;
    const tab = table([t`$L\,/\,\text{m}$`, t`$T\,/\,\text{s}$`, t`$\lg(L/\text{m})$`, t`$\lg(T/\text{s})$`], L.map((v, i) => [v.toFixed(3), `${dpStr(T[i], 3)} ± ${dT}`, i === row ? "" : dpStr(X[i], 3), i === row ? "" : `${dpStr(Y[i], 3)} ± ${dpStr(dY[i], 3)}`]));
    b.struct({
      d: 5, examStyle: true, skill: EXAM.DATA_ANALYSIS.skill, secs: EXAM.DATA_ANALYSIS.secs, paper: "Cambridge P5 / ZIMSEC P4", calculator: true,
      concepts: [A("skills.data-analysis")],
      stem: t`A metal ruler is clamped horizontally at one end with a length $L$ projecting and a small mass fixed to its free end. The free end is displaced and released, and the period $T$ of the vertical oscillations is found by timing 20 oscillations. It is suggested that $T = kL^{\,n}$, where $k$ and $n$ are constants.

${tab}`,
      parts: checkExam(EXAM.DATA_ANALYSIS, [
        P.manual({ label: "(a)", marks: 1, stem: "State the graph that should be plotted to determine n and k, and how n and k are found from it.", points: [t`Plot $\lg T$ against $\lg L$: gradient $= n$; $y$-intercept $= \lg k$, so $k = 10^{\text{intercept}}$.`], modelAnswer: t`Plot $\lg(T/\text{s})$ against $\lg(L/\text{m})$; the gradient is $n$ and the $y$-intercept is $\lg k$.` }),
        P.group({ label: "(b)", stem: t`Complete the row for $L = ${L[row].toFixed(3)}\ \text{m}$.`, parts: [
          P.num({ label: "(i)", marks: 1, stem: t`$\lg(L/\text{m})$, to three decimal places`, value: X[row], dp: 3, wrong: [Math.log(L[row])], explanation: t`$\lg 0.300 = ${dpStr(X[row], 3)}$.` }),
          P.num({ label: "(ii)", marks: 1, stem: t`$\lg(T/\text{s})$, to three decimal places`, value: Y[row], dp: 3, wrong: [Math.log(T[row])], explanation: t`$\lg 0.281 = ${dpStr(Y[row], 3)}$.` }),
          P.num({ label: "(iii)", marks: 1, stem: t`the absolute uncertainty in $\lg(T/\text{s})$, to three decimal places`, value: dY[row], tol: 0.002, wrong: [dT], explanation: t`$\tfrac{1}{2}[\lg(0.291) - \lg(0.271)] = ${dpStr(dY[row], 3)}$ (or $0.434 \times 0.01/0.281$).` }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: "Plot the graph with error bars, draw the best-fit line and determine its gradient.", value: fit.m, tol: 0.06, wrong: [1 / fit.m], explanation: t`Best-fit gradient $\approx ${dpStr(fit.m, 2)}$ (any value from about 1.44 to 1.56 from a good line).` }),
        P.num({ label: "(d)", marks: 2, stem: "Draw the worst acceptable line and determine the absolute uncertainty in the gradient.", value: dn, tol: 0.05, wrong: [0.5], explanation: t`Worst lines through all the error bars have gradients of about $${dpStr(w.shallow.m, 2)}$ and $${dpStr(w.steep.m, 2)}$; uncertainty $\approx ${dpStr(dn, 2)}$.` }),
        P.num({ label: "(e)", marks: 2, stem: t`Calculate the $y$-intercept of your best-fit line using $c = y - mx$ and hence determine $k$.`, value: k, tol: 0.12, wrong: [fit.c], explanation: t`$c \approx ${dpStr(fit.c, 3)}$, so $k = 10^{c} \approx ${sfStr(k, 3)}$. The intercept itself is $\lg k$, not $k$.` }),
        P.num({ label: "(f)", marks: 1, stem: "Use the worst line to estimate the absolute uncertainty in k.", value: dk, tol: 0.1, wrong: [Math.abs(fit.c - w.steep.c)], explanation: t`The worst line's intercept gives $k \approx ${sfStr(kW[0], 3)}$ (or $${sfStr(kW[1], 3)}$), so $\Delta k \approx ${dpStr(dk, 2)}$. Work out $10^{c}$ for each line; do not apply $\Delta c$ directly to $k$.` }),
        P.manual({ label: "(g)", marks: 1, stem: "State the unit of k.", points: [t`$\text{s m}^{-n}$, i.e. $\text{s m}^{-1.5}$ for $n = 1.5$.`], modelAnswer: t`$k = T/L^{\,n}$, so its unit is $\text{s m}^{-1.5}$.` }),
        P.manual({ label: "(h)", marks: 2, stem: t`Theory predicts $n = 1.5$. State and explain whether your results support this.`, points: [t`$n = ${dpStr(fit.m, 2)} \pm ${dpStr(dn, 2)}$, a range that includes 1.5.`, "So the data are consistent with n = 1.5 within the uncertainty."], modelAnswer: t`The gradient gives $n = ${dpStr(fit.m, 2)} \pm ${dpStr(dn, 2)}$, and 1.5 lies within this range, so the results support $n = 1.5$.` }),
        P.manual({ label: "(i)", marks: 1, stem: "Explain why the error bars on lg T are longer for the shorter lengths.", points: ["ΔT is the same for every row, so Δ(lg T) ≈ 0.434 ΔT/T is larger when T is smaller (shorter L)."], modelAnswer: "Every period has the same absolute uncertainty, ±0.01 s, so the uncertainty in lg T, 0.434 ΔT/T, is larger when T is small, which happens for short lengths." }),
      ]),
      explanation: t`$\lg T = n\lg L + \lg k$: gradient $n \approx ${dpStr(fit.m, 2)}$, $k = 10^{c} \approx ${sfStr(k, 3)}\ \text{s m}^{-1.5}$, with uncertainties from the worst line.`,
      hints: ["Take lg of both sides of T = kLⁿ.", "The worst line must pass through every error bar."],
    });
  }
});
