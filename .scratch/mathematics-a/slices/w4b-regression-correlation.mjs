// W4b: amaths.bivariate.regression-correlation (ZIMSEC only: Statistics F6, bivariate data)
import { concept, P, t, chk, biv, sum, table } from "../lib.mjs";
import { f3, f4, NB } from "../tables/w4b-kit.mjs";

const { sqrt } = Math;
const S = (n, sx, sy, sxx, syy, sxy) => {
  const Sxx = sxx - (sx * sx) / n, Syy = syy - (sy * sy) / n, Sxy = sxy - (sx * sy) / n;
  const b = Sxy / Sxx, bx = Sxy / Syy;
  return { Sxx, Syy, Sxy, b, a: sy / n - (b * sx) / n, bx, ax: sx / n - (bx * sy) / n, r: Sxy / sqrt(Sxx * Syy), mx: sx / n, my: sy / n };
};

concept("amaths.bivariate.regression-correlation", { file: "bivariate/regression-correlation", keyPrefix: "bivariate.regression-correlation" }, (b) => {
  // q01 which line
  b.mcq({
    d: 1, skill: "UNDERSTANDING", calculator: false,
    stem: "Bivariate data (x, y) are collected, where x is the explanatory variable. Which line should be used to predict y for a given value of x?",
    options: [
      ["The regression line of y on x", "Correct: it minimises the squared vertical distances, the errors in predicting y."],
      ["The regression line of x on y", "That line is for estimating x from a given y."],
      ["Either line, because they are the same", "The two lines differ unless r = ±1."],
      ["A line through the origin with gradient r", "The gradient of the y on x line is Sxy/Sxx, and the line need not pass through the origin."],
    ],
    answer: "A",
    explanation: "Predict y from x with the y on x line; estimate x from y with the x on y line.",
  });

  // q02 tf mean point
  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: t`The least-squares regression line of $y$ on $x$ always passes through the point $(\bar{x}, \bar{y})$.`,
    answer: true,
    explanation: t`$a = \bar{y} - b\bar{x}$, so when $x = \bar{x}$, $y = a + b\bar{x} = \bar{y}$. The $x$ on $y$ line also passes through $(\bar{x}, \bar{y})$.`,
  });

  // q03 Sxy
  chk(160 - (20 * 35) / 5, 20, 1e-12);
  b.num({
    d: 2, skill: "APPLICATION", calculator: false, daily: true,
    stem: t`For $5$ pairs of values, $\sum x = 20$, $\sum y = 35$ and $\sum xy = 160$. Find $S_{xy}$.`,
    value: 20, wrong: [160, 125],
    explanation: t`$S_{xy} = \sum xy - \frac{\sum x\sum y}{n} = 160 - \frac{20 \times 35}{5} = 160 - 140 = 20$.`,
  });

  // q04 b and a
  const b4 = 25 / 40, a4 = 10 - b4 * 6;
  chk(a4, 6.25, 1e-12);
  b.fib({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: t`For a set of bivariate data, $S_{xx} = 40$, $S_{xy} = 25$, $\bar{x} = 6$ and $\bar{y} = 10$. The regression line of $y$ on $x$ is $y = a + bx$. Find $b$ and $a$.`,
    template: "b = {{blank:b}}, a = {{blank:a}}",
    blanks: [NB("b", b4, 1.6), NB("a", a4, 0.4)],
    explanation: t`$b = \frac{S_{xy}}{S_{xx}} = \frac{25}{40} = 0.625$; $a = \bar{y} - b\bar{x} = 10 - 0.625 \times 6 = 6.25$. ($1.6$ is $\frac{S_{xx}}{S_{xy}}$, upside down.)`,
  });

  // q05 describe r
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "For a sample of Harare commuters, the correlation between distance from the city centre and the number of minutes early they arrive at work is r = −0.92. Which description is correct?",
    options: [
      ["Strong negative linear correlation: further away tends to mean less early", "Correct: r is close to −1, so the points lie close to a line sloping downwards."],
      ["Weak negative correlation, because r is negative", "The sign gives the direction; the size (0.92) shows the correlation is strong."],
      ["Strong positive correlation: living further away causes earlier arrival", "A negative r means one variable tends to fall as the other rises, and correlation does not show cause."],
      ["Living further away causes commuters to arrive later", "Correlation shows association only; other factors (such as transport) may be responsible."],
    ],
    answer: "A",
    explanation: "r = −0.92: strong negative linear correlation. It describes association, not cause.",
  });

  // q06 r from summary statistics
  const r6 = -33.6 / sqrt(24.5 * 60.8);
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`For a set of bivariate data, $S_{xx} = 24.5$, $S_{yy} = 60.8$ and $S_{xy} = -33.6$. Calculate the product moment correlation coefficient $r$, correct to 3 significant figures.`,
    value: r6, wrong: [f3(-r6), f3(-33.6 / (24.5 * 60.8))],
    explanation: t`$r = \frac{S_{xy}}{\sqrt{S_{xx}S_{yy}}} = \frac{-33.6}{\sqrt{24.5 \times 60.8}} = ${f3(r6)}$. (Forgetting the square root gives a tiny value; $r$ keeps the sign of $S_{xy}$.)`,
    hints: ["r has the same sign as Sxy."],
  });

  // q07 line from raw data
  const x7 = [2, 4, 5, 7, 8, 10], y7 = [16, 12, 11, 8, 6, 4];
  const r7 = biv(x7, y7);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: t`The ages $x$ (years) and resale values $y$ (thousands of US dollars) of six used pick-up trucks at a Bulawayo dealer are:

${table(["x", ...x7], [["y", ...y7]])}

Find the regression line of $y$ on $x$ in the form $y = a + bx$, giving $a$ and $b$ correct to 3 significant figures.`,
    template: "a = {{blank:a}}, b = {{blank:b}}",
    blanks: [NB("a", r7.a, f3(r7.ax)), NB("b", r7.b, f3(r7.bx))],
    explanation: t`$\bar{x} = 6$, $\bar{y} = ${f4(r7.my)}$, $S_{xx} = ${r7.Sxx}$, $S_{xy} = ${Math.round(r7.Sxy)}$. $b = \frac{${Math.round(r7.Sxy)}}{${r7.Sxx}} = ${f3(r7.b)}$; $a = ${f4(r7.my)} - (${f4(r7.b)})(6) = ${f3(r7.a)}$. So $y = ${f3(r7.a)} - ${f3(-r7.b)}x$: each extra year reduces the value by about US\$${Math.round(-r7.b * 1000)}.`,
    hints: [t`$\sum x = 36$, $\sum y = 57$.`, "b = Sxy/Sxx, then a = ȳ − b x̄."],
  });

  // q08 extrapolation
  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: "A regression line of tobacco yield on fertiliser applied was found from farms using between 100 kg and 400 kg of fertiliser per hectare, with r = 0.94. Which prediction is least reliable?",
    options: [
      ["The yield for 700 kg of fertiliser per hectare", "Correct: 700 kg is far outside the data range (extrapolation); the linear pattern may not continue."],
      ["The yield for 250 kg of fertiliser per hectare", "250 kg is inside the data range (interpolation) and r is high, so this is reliable."],
      ["The yield for 150 kg of fertiliser per hectare", "150 kg is inside the data range, so this is interpolation."],
      ["The yield for 380 kg of fertiliser per hectare", "380 kg is inside the range of the data, so the line can be used."],
    ],
    answer: "A",
    explanation: "Extrapolating far beyond the observed range is unreliable even when r is high: too much fertiliser may stop increasing (or even reduce) the yield.",
    hints: ["Which value lies outside 100 to 400 kg?"],
  });

  // q09 r²
  b.num({
    d: 2, skill: "UNDERSTANDING", calculator: false, daily: true,
    stem: "The correlation coefficient between the mass of maize seed planted and the yield on a set of plots is r = 0.8. What percentage of the variation in yield is explained by the linear relationship with the mass of seed?",
    value: 64, unit: "%", wrong: [80, 89.4],
    explanation: t`The coefficient of determination is $r^2 = 0.64$, so $64\%$ of the variation is explained. ($80\%$ uses $r$ instead of $r^2$.)`,
  });

  // q10 tf coding
  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: t`If every $x$ value is coded as $u = \frac{x - 40}{5}$, the product moment correlation coefficient between $u$ and $y$ is the same as between $x$ and $y$.`,
    answer: true,
    explanation: t`Subtracting a constant and dividing by a positive constant scales $S_{xy}$ and $\sqrt{S_{xx}}$ by the same factor, so $r$ is unchanged. (Dividing by a negative number would only change its sign.)`,
  });

  // q11 x on y line from sums
  const r11 = S(12, 96, 180, 812, 2850, 1490);
  chk(r11.bx, 1 / 3, 1e-12); chk(r11.ax, 3, 1e-9);
  b.fib({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: t`For $12$ pairs of values, $\sum x = 96$, $\sum y = 180$, $\sum y^2 = 2850$ and $\sum xy = 1490$. Find the regression line of $x$ on $y$ in the form $x = c + dy$.`,
    template: "c = {{blank:c}}, d = {{blank:d}}",
    blanks: [NB("c", r11.ax, -37), NB("d", r11.bx, 3)],
    explanation: t`$S_{yy} = 2850 - \frac{180^2}{12} = 150$; $S_{xy} = 1490 - \frac{96 \times 180}{12} = 50$. $d = \frac{S_{xy}}{S_{yy}} = \frac{50}{150} = \frac{1}{3}$; $c = \bar{x} - d\bar{y} = 8 - \frac{1}{3}(15) = 3$. So $x = 3 + \frac{1}{3}y$. ($d = 3$ inverts the fraction.)`,
    hints: ["For x on y, divide Sxy by Syy.", "The line passes through (x̄, ȳ) = (8, 15)."],
  });

  // q12 match r values
  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each value of the product moment correlation coefficient with its description.",
    pairs: [
      ["r = 0.96", "Strong positive linear correlation"],
      ["r = −0.93", "Strong negative linear correlation"],
      ["r = 0.04", "Little or no linear correlation"],
      ["r = 0.52", "Moderate positive linear correlation"],
    ],
    explanation: "The sign gives the direction and the size gives the strength; values near 0 mean little LINEAR correlation (there may still be a curved pattern).",
  });

  // q13 correlation and causation
  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "In a study of districts of Zimbabwe, the number of mobile phone shops and the number of road accidents per year have r = 0.88. A newspaper says that mobile phone shops cause accidents. Comment on this claim.",
    points: ["A high r shows strong (linear) association, not that one variable causes the other.", "A third factor, such as population size or urbanisation, increases both the number of shops and the number of accidents."],
    modelAnswer: "r = 0.88 shows a strong association, but correlation is not causation. Larger, more urban districts have both more shops and more traffic, so population is a likely common cause.",
    explanation: "Look for a lurking third variable.",
    hints: ["What could make both numbers large in the same district?"],
  });

  // q14 controlled variable
  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "In an experiment, Thandeka sets the temperature of a water bath to 20, 30, 40, 50 and 60 °C and measures the time for a tablet to dissolve. Which statement is correct?",
    options: [
      ["Temperature is explanatory; use only the line of time on temperature", "Correct: temperature is controlled, so it is not random and the time on temperature line is the one to use."],
      ["Time is the explanatory variable because it is measured", "The measured, random variable is the response; the controlled one is explanatory."],
      ["Both regression lines are equally appropriate", "When x is controlled, the x on y line has no sensible meaning."],
      ["Neither variable is explanatory in a laboratory experiment", "Temperature is set by the experimenter, so it is the explanatory variable."],
    ],
    answer: "A",
    explanation: "A controlled variable is always the explanatory variable, and only the regression of the response on it is meaningful.",
  });

  // q15 mean point and r from the two lines
  const xb = (1.5 + 0.85 * 2) / (1 - 0.85 * 0.8), yb = 2 + 0.8 * xb;
  chk(xb, 10, 1e-9); chk(yb, 10, 1e-9);
  const r15 = sqrt(0.8 * 0.85);
  b.fib({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The regression line of $y$ on $x$ is $y = 2 + 0.8x$ and the regression line of $x$ on $y$ is $x = 1.5 + 0.85y$. Find $\bar{x}$, $\bar{y}$ and the correlation coefficient $r$ (correct to 3 significant figures).`,
    template: "x̄ = {{blank:x}}, ȳ = {{blank:y}}, r = {{blank:r}}",
    blanks: [NB("x", xb, 3.2), NB("y", yb, 4.56), NB("r", r15, 0.68)],
    explanation: t`Both lines pass through $(\bar{x}, \bar{y})$: $x = 1.5 + 0.85(2 + 0.8x) = 3.2 + 0.68x$, so $\bar{x} = 10$ and $\bar{y} = 10$. Also $b \times b' = \frac{S_{xy}}{S_{xx}} \cdot \frac{S_{xy}}{S_{yy}} = r^2 = 0.68$, so $r = +\sqrt{0.68} = ${f3(r15)}$ (positive, like the gradients). ($0.68$ is $r^2$.)`,
    hints: ["Solve the two equations simultaneously.", "Multiply the two gradients."],
  });

  // q16 reliability
  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "A regression line of mark on revision hours was found from 10 learners who revised between 2 and 9 hours, with r = 0.51. Comment on the reliability of using it to predict the mark of a learner who revised for 6 hours.",
    points: ["6 hours lies within the data range (interpolation), which supports the estimate.", "But r = 0.51 is only moderate (r² ≈ 0.26, about a quarter of the variation explained) and the sample is small, so the estimate is not very reliable."],
    modelAnswer: "The estimate is an interpolation, which is good, but the correlation is only moderate (r² ≈ 0.26) and n = 10, so individual marks may differ a lot from the prediction.",
    explanation: "Reliability depends on both the range and the strength of the correlation.",
    hints: ["Consider both the data range and the size of r."],
  });

  // q17 struct 5: summary statistics
  const r17 = S(9, 45, 126, 285, 1890, 693);
  chk(r17.b, 1.05, 1e-9); chk(r17.a, 8.75, 1e-9);
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
    stem: t`For $9$ days, Sipho records the number $x$ of hours of sunshine and the number $y$ of litres of drinking water sold at his stall in Beitbridge: $\sum x = 45$, $\sum y = 126$, $\sum x^2 = 285$, $\sum y^2 = 1890$, $\sum xy = 693$.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the product moment correlation coefficient, correct to 3 significant figures.", value: r17.r, wrong: [f3(r17.r ** 2)],
        explanation: t`$S_{xx} = 60$, $S_{yy} = 126$, $S_{xy} = 63$; $r = \frac{63}{\sqrt{60 \times 126}} = ${f3(r17.r)}$.` }),
      P.fib({ label: "(b)", marks: 2, stem: "Find the regression line of y on x in the form y = a + bx.", template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [NB("a", r17.a, f3(r17.my - r17.bx * r17.mx)), NB("b", r17.b, f3(r17.bx))],
        explanation: t`$b = \frac{63}{60} = 1.05$; $a = 14 - 1.05 \times 5 = 8.75$.` }),
      P.num({ label: "(c)", marks: 1, stem: "Estimate the number of litres sold on a day with 7 hours of sunshine.", value: r17.a + r17.b * 7, wrong: [f3(r17.a + r17.b * 5)],
        explanation: t`$y = 8.75 + 1.05 \times 7 = ${f3(r17.a + r17.b * 7)}$ litres.` }),
    ],
    explanation: "Summary statistics first, then r and the y on x line.",
    hints: ["Sxx = Σx² − (Σx)²/n."],
  });

  // q18 struct 14: raw data
  const x18 = [12, 15, 18, 20, 23, 25, 28, 30], y18 = [41, 47, 50, 57, 61, 66, 70, 77];
  const r18 = biv(x18, y18);
  const p18 = r18.a + r18.b * 22;
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
    stem: t`A school tuckshop in Kariba records the maximum temperature $x$ °C and the number $y$ of cold drinks sold on eight days.

${table(["x", ...x18], [["y", ...y18]])}

$\sum x = ${sum(x18)}$, $\sum y = ${sum(y18)}$, $\sum x^2 = ${sum(x18.map((v) => v * v))}$, $\sum y^2 = ${sum(y18.map((v) => v * v))}$, $\sum xy = ${sum(x18.map((v, i) => v * y18[i]))}$.`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Calculate Sxx, Syy and Sxy (exact values, or correct to 1 decimal place).", template: "Sxx = {{blank:a}}, Syy = {{blank:b}}, Sxy = {{blank:c}}",
        blanks: [{ id: "a", input: "number", accepted: [String(r18.Sxx)], tolerance: 0.05 }, { id: "b", input: "number", accepted: [String(r18.Syy)], tolerance: 0.05 }, { id: "c", input: "number", accepted: [String(r18.Sxy)], tolerance: 0.05 }],
        explanation: t`$S_{xx} = ${sum(x18.map((v) => v * v))} - \frac{${sum(x18)}^2}{8} = ${r18.Sxx}$; $S_{yy} = ${sum(y18.map((v) => v * v))} - \frac{${sum(y18)}^2}{8} = ${r18.Syy}$; $S_{xy} = ${sum(x18.map((v, i) => v * y18[i]))} - \frac{${sum(x18)} \times ${sum(y18)}}{8} = ${r18.Sxy}$.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the product moment correlation coefficient, correct to 3 significant figures.", value: r18.r, wrong: [f3(r18.r ** 2)],
        explanation: t`$r = \frac{${r18.Sxy}}{\sqrt{${r18.Sxx} \times ${r18.Syy}}} = ${f3(r18.r)}$.` }),
      P.fib({ label: "(c)", marks: 3, stem: "Find the regression line of y on x in the form y = a + bx, giving a and b correct to 3 significant figures.", template: "a = {{blank:a}}, b = {{blank:b}}",
        blanks: [NB("a", r18.a, f3(r18.ax), 1), NB("b", r18.b, f3(r18.bx), 2)],
        explanation: t`$b = \frac{${r18.Sxy}}{${r18.Sxx}} = ${f3(r18.b)}$; $a = ${r18.my} - ${f4(r18.b)} \times ${r18.mx} = ${f3(r18.a)}$.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Interpret the value of b in context.",
        points: [t`For each extra $1$ °C of maximum temperature, about $${f3(r18.b)}$ more cold drinks are sold (on average).`, "The statement refers to the context (temperature and drinks) with the correct direction."],
        modelAnswer: t`Sales rise by about ${f3(r18.b)} drinks for every 1 °C increase in the day's maximum temperature.`,
        explanation: "The gradient is the change in y per unit increase in x." }),
      P.num({ label: "(e)", marks: 2, stem: "Estimate the number of drinks sold on a day with maximum temperature 22 °C, correct to 3 significant figures.", value: p18, wrong: [f3(r18.ax + r18.bx * 22)],
        explanation: t`$y = ${f3(r18.a)} + ${f3(r18.b)} \times 22 = ${f3(p18)}$ drinks (about 60).` }),
      P.manual({ label: "(f)", marks: 2, stem: "Comment on the reliability of using the line to estimate sales when the maximum temperature is 45 °C.",
        points: ["45 °C is far outside the observed range 12 °C to 30 °C: extrapolation.", "The linear pattern may not continue (stock or customer limits, very unusual weather), so the estimate is unreliable despite the high r."],
        modelAnswer: t`Unreliable: $45$ °C is well beyond the data ($12$–$30$ °C), so the line is being extrapolated, and sales are unlikely to keep rising in a straight line (the tuckshop may run out of stock).`,
        explanation: "Extrapolation is unreliable even with a strong correlation." }),
    ],
    explanation: "Sums → S values → r and the y on x line → interpretation and prediction.",
    hints: ["Keep Sxx, Syy, Sxy exact before dividing.", "Is 45 °C inside the data range?"],
  });

  // ---------------------------------------------------------------- cards
  b.card("FORMULA", "Summary statistics", t`$S_{xx} = \sum x^2 - \dfrac{(\sum x)^2}{n}$, $S_{yy} = \sum y^2 - \dfrac{(\sum y)^2}{n}$, $S_{xy} = \sum xy - \dfrac{\sum x \sum y}{n}$`);
  b.card("FORMULA", "Regression line of y on x", t`$y = a + bx$, $b = \dfrac{S_{xy}}{S_{xx}}$, $a = \bar{y} - b\bar{x}$; passes through $(\bar{x}, \bar{y})$.`);
  b.card("FORMULA", "Regression line of x on y", t`$x = a' + b'y$, $b' = \dfrac{S_{xy}}{S_{yy}}$, $a' = \bar{x} - b'\bar{y}$.`);
  b.card("FORMULA", "Product moment correlation coefficient", t`$r = \dfrac{S_{xy}}{\sqrt{S_{xx}S_{yy}}}$, $-1 \le r \le 1$; and $r^2 = b \times b'$.`);
  b.card("DEFINITION", "Coefficient of determination", t`$r^2$: the proportion of the variation in $y$ explained by the linear relationship with $x$.`);
  b.card("CONCEPT", "Interpolation and extrapolation", "Predictions inside the data range (interpolation) are reasonable; outside it (extrapolation) they are unreliable.");
  b.card("CONCEPT", "Which line to use", "Predict y from x with y on x; estimate x from y with x on y. If x is controlled, use only y on x.");
  b.card("FACT", "Correlation is not causation", "A strong r shows association; a third variable may cause both.");
});
