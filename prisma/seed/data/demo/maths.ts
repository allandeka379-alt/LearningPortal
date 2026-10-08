/**
 * DEV-ONLY demo content for ZIMSEC O-Level Mathematics. ORIGINAL questions, lessons and flashcards written for this
 * project (never copied from past papers or textbooks, §27). The topic tree is a DEMO structure, not the official
 * ZIMSEC syllabus (§4: real syllabuses come from authoritative documents).
 */
import { DEMO_EFFECTIVE_FROM, DEMO_SYLLABUS_TITLE, DEMO_VERSION_LABEL, type DemoSubjectContent } from "./types";

const r = String.raw;

export const MATHS_DEMO: DemoSubjectContent = {
  refPrefix: "demo:zimsec-o-math",
  boardSlug: "zimsec",
  qualificationSlug: "o-level",
  subjectSlug: "mathematics",
  syllabus: {
    versionLabel: DEMO_VERSION_LABEL,
    title: DEMO_SYLLABUS_TITLE,
    overview:
      "A demonstration topic structure for local development and testing. It is NOT the official ZIMSEC O-Level Mathematics syllabus and must never be shown to students as one.",
    assessmentOverview: "Two demo papers used to exercise mock-exam features. Durations and paper names are placeholders, not official information.",
    effectiveFrom: DEMO_EFFECTIVE_FROM,
    components: [
      { code: "P1", name: "Demo Paper 1 (short answers, no calculator)", kind: "WRITTEN", durationMinutes: 60, calculatorAllowed: false, description: "Demo paper: short questions." },
      { code: "P2", name: "Demo Paper 2 (structured questions)", kind: "WRITTEN", durationMinutes: 90, calculatorAllowed: true, description: "Demo paper: longer structured questions." },
    ],
  },
  topics: [
    {
      slug: "number",
      code: "1",
      name: "Number",
      description: "Fractions, decimals, percentages and standard form.",
      publicSummary: "Work confidently with fractions, decimals, percentages and very large or very small numbers.",
      subtopics: [
        {
          slug: "fractions-and-decimals",
          code: "1.1",
          name: "Fractions and decimals",
          objectives: [
            { statement: "Add, subtract, multiply and divide fractions and mixed numbers.", skill: "APPLICATION" },
            { statement: "Convert between fractions, decimals and percentages.", skill: "UNDERSTANDING" },
          ],
        },
        {
          slug: "percentages",
          code: "1.2",
          name: "Percentages",
          objectives: [
            { statement: "Increase or decrease an amount by a percentage using a multiplier.", skill: "APPLICATION" },
            { statement: "Find the original amount after a percentage change.", skill: "APPLICATION" },
          ],
        },
        {
          slug: "standard-form",
          code: "1.3",
          name: "Standard form",
          objectives: [{ statement: "Write numbers in standard form and calculate with them.", skill: "APPLICATION" }],
        },
      ],
    },
    {
      slug: "algebra",
      code: "2",
      name: "Algebra",
      description: "Expressions, linear and quadratic equations, and simultaneous equations.",
      publicSummary: "Expand and factorise expressions and solve the equations that appear throughout the course.",
      subtopics: [
        {
          slug: "algebraic-expressions",
          code: "2.1",
          name: "Algebraic expressions",
          objectives: [{ statement: "Expand brackets and factorise expressions, including quadratics.", skill: "APPLICATION" }],
        },
        {
          slug: "linear-equations",
          code: "2.2",
          name: "Linear equations",
          objectives: [{ statement: "Solve linear equations in one unknown, including equations with brackets and fractions.", skill: "APPLICATION" }],
        },
        {
          slug: "quadratic-equations",
          code: "2.3",
          name: "Quadratic equations",
          objectives: [
            { statement: "Solve quadratic equations by factorising.", skill: "APPLICATION" },
            { statement: "Solve quadratic equations with the quadratic formula.", skill: "APPLICATION" },
          ],
        },
        {
          slug: "simultaneous-equations",
          code: "2.4",
          name: "Simultaneous equations",
          objectives: [{ statement: "Solve a pair of linear simultaneous equations and use them to model problems.", skill: "APPLICATION" }],
        },
      ],
    },
    {
      slug: "geometry",
      code: "3",
      name: "Geometry",
      description: "Angles, polygons, circles and right-angled triangles.",
      publicSummary: "Use angle facts, circle properties and Pythagoras' theorem.",
      subtopics: [
        {
          slug: "angles-and-polygons",
          code: "3.1",
          name: "Angles and polygons",
          objectives: [{ statement: "Use angle facts for lines, triangles and polygons.", skill: "APPLICATION" }],
        },
        {
          slug: "circle-properties",
          code: "3.2",
          name: "Circle properties",
          objectives: [{ statement: "Name the parts of a circle and use angle properties of circles.", skill: "UNDERSTANDING" }],
        },
        {
          slug: "pythagoras-theorem",
          code: "3.3",
          name: "Pythagoras' theorem",
          objectives: [{ statement: "Use Pythagoras' theorem to find lengths in right-angled triangles.", skill: "APPLICATION" }],
        },
      ],
    },
    {
      slug: "mensuration",
      code: "4",
      name: "Mensuration",
      description: "Perimeter, area, volume and surface area.",
      publicSummary: "Calculate lengths, areas and volumes of everyday shapes and solids.",
      subtopics: [
        {
          slug: "area-and-perimeter",
          code: "4.1",
          name: "Area and perimeter",
          objectives: [{ statement: "Find perimeters and areas of plane shapes, including circles.", skill: "APPLICATION" }],
        },
        {
          slug: "volume-and-surface-area",
          code: "4.2",
          name: "Volume and surface area",
          objectives: [{ statement: "Find volumes and surface areas of prisms and cylinders.", skill: "APPLICATION" }],
        },
      ],
    },
    {
      slug: "statistics-and-probability",
      code: "5",
      name: "Statistics and probability",
      description: "Averages, spread and probability.",
      publicSummary: "Summarise data with averages and work out probabilities.",
      subtopics: [
        {
          slug: "averages",
          code: "5.1",
          name: "Averages",
          objectives: [{ statement: "Calculate and compare the mean, median, mode and range.", skill: "ANALYSIS" }],
        },
        {
          slug: "probability",
          code: "5.2",
          name: "Probability",
          objectives: [{ statement: "Calculate probabilities of single and combined events.", skill: "APPLICATION" }],
        },
      ],
    },
  ],
  diagrams: [
    {
      key: "circle-parts",
      altText: "A circle with its centre marked. Four lines are drawn: one from the centre to the edge, one through the centre across the circle, one joining two points on the edge without passing through the centre, and one touching the circle at a single point at the bottom.",
      caption: "Parts of a circle",
      longDescription:
        "A circle with a dot at its centre. A horizontal line passes through the centre from one side of the circle to the other. A line runs from the centre up and to the right to the edge. A short line on the upper left joins two points on the circle. A horizontal line below the circle touches it at exactly one point.",
      width: 400,
      height: 400,
      svg: r`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect width="400" height="400" fill="#ffffff"/><circle cx="200" cy="200" r="150" fill="none" stroke="#1f2933" stroke-width="3"/><line x1="50" y1="200" x2="350" y2="200" stroke="#0b6e8f" stroke-width="3"/><line x1="200" y1="200" x2="275" y2="70" stroke="#b45309" stroke-width="3"/><line x1="125" y1="70" x2="52" y2="174" stroke="#6d28d9" stroke-width="3"/><line x1="100" y1="350" x2="300" y2="350" stroke="#047857" stroke-width="3"/><circle cx="200" cy="200" r="5" fill="#1f2933"/><circle cx="200" cy="350" r="4" fill="#047857"/></svg>`,
    },
  ],
  questions: [
    // ---------------------------------------------------------------- Number
    {
      ref: "q01",
      topic: "fractions-and-decimals",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 1,
      daily: true,
      accessTier: "PUBLIC",
      stem: r`Which fraction is equal to $0.375$?`,
      payload: { selectMode: "single", shuffleOptions: true },
      answerSpec: { scoring: "all_or_nothing" },
      options: [
        { key: "A", content: r`$\frac{3}{8}$`, isCorrect: true, rationale: r`$0.375 = \frac{375}{1000} = \frac{3}{8}$.` },
        { key: "B", content: r`$\frac{3}{5}$`, isCorrect: false, rationale: r`$\frac{3}{5} = 0.6$.` },
        { key: "C", content: r`$\frac{37}{50}$`, isCorrect: false, rationale: r`$\frac{37}{50} = 0.74$.` },
        { key: "D", content: r`$\frac{1}{4}$`, isCorrect: false, rationale: r`$\frac{1}{4} = 0.25$.` },
      ],
      explanation: r`Write the decimal over $1000$ and simplify: $\frac{375}{1000} = \frac{3}{8}$ (divide top and bottom by $125$).`,
      hints: ["Write 0.375 as a fraction with denominator 1000."],
      cognitiveSkill: "UNDERSTANDING",
      estimatedSeconds: 45,
    },
    {
      ref: "q02",
      topic: "fractions-and-decimals",
      type: "SHORT_ANSWER",
      marks: 1,
      difficulty: 2,
      daily: true,
      stem: r`Work out $\frac{2}{3} + \frac{1}{4}$. Give your answer as a fraction in its simplest form (for example 5/7).`,
      payload: { maxLength: 20 },
      answerSpec: {
        accepted: [{ value: "11/12" }],
        rejected: [{ value: "3/7", feedback: "Add fractions by using a common denominator, not by adding tops and bottoms." }],
        normalise: ["trim", "remove_whitespace"],
      },
      explanation: r`Use the common denominator $12$: $\frac{2}{3} = \frac{8}{12}$ and $\frac{1}{4} = \frac{3}{12}$, so the sum is $\frac{11}{12}$.`,
      hints: ["The lowest common multiple of 3 and 4 is 12."],
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 60,
    },
    {
      ref: "q03",
      topic: "percentages",
      type: "NUMERICAL",
      marks: 1,
      difficulty: 2,
      daily: true,
      stem: r`Increase \$80 by 15%. Give your answer in dollars.`,
      payload: { unitHint: "dollars" },
      answerSpec: { value: 92, tolerance: { kind: "absolute", amount: 0.001 } },
      explanation: r`The multiplier is $1.15$, and $80 \times 1.15 = 92$, so the new amount is \$92.`,
      hints: ["Increasing by 15% means multiplying by 1.15."],
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 60,
    },
    {
      ref: "q04",
      topic: "percentages",
      type: "NUMERICAL",
      marks: 2,
      difficulty: 3,
      stem: r`After a 25% discount, a radio costs \$54. Find the original price, in dollars.`,
      payload: { unitHint: "dollars" },
      answerSpec: { value: 72, tolerance: { kind: "absolute", amount: 0.001 } },
      explanation: r`After the discount the price is 75% of the original, so original $\times 0.75 = 54$ and original $= 54 \div 0.75 = 72$ dollars.`,
      workedSolution: r`1. Multiplier for a 25% decrease: $0.75$.
2. Original $= 54 \div 0.75 = 72$.
3. Check: $72 \times 0.75 = 54$.`,
      hints: ["The sale price is 75% of the original price.", "Divide by the multiplier to undo the discount."],
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 90,
    },
    {
      ref: "q05",
      topic: "percentages",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 3,
      daily: true,
      stem: r`A village has 2 000 people. The population increases by 10% in one year and then decreases by 10% the next year. What is the population after the two years?`,
      payload: { selectMode: "single", shuffleOptions: false },
      options: [
        { key: "A", content: "2 000", isCorrect: false, rationale: "The 10% decrease is taken from 2 200, not from 2 000, so the changes do not cancel." },
        { key: "B", content: "1 980", isCorrect: true, rationale: r`$2000 \times 1.1 \times 0.9 = 1980$.` },
        { key: "C", content: "2 020", isCorrect: false, rationale: "The second change is a decrease, so the result is below 2 000." },
        { key: "D", content: "1 800", isCorrect: false, rationale: "This subtracts 10% twice from 2 000." },
      ],
      explanation: r`$2000 \times 1.10 = 2200$, then $2200 \times 0.90 = 1980$. The overall multiplier is $1.1 \times 0.9 = 0.99$.`,
      cognitiveSkill: "ANALYSIS",
      estimatedSeconds: 75,
    },
    {
      ref: "q06",
      topic: "standard-form",
      type: "TRUE_FALSE",
      marks: 1,
      difficulty: 1,
      daily: true,
      stem: r`$4.5 \times 10^{-3}$ is equal to $0.0045$.`,
      payload: { statementStyle: "true_false" },
      answerSpec: { correct: true, feedbackFalse: r`Multiplying by $10^{-3}$ moves the digits three places to the right of the decimal point: $0.0045$.` },
      explanation: r`$10^{-3} = 0.001$ and $4.5 \times 0.001 = 0.0045$.`,
      cognitiveSkill: "UNDERSTANDING",
      estimatedSeconds: 30,
    },
    {
      ref: "q07",
      topic: "standard-form",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 2,
      daily: true,
      stem: r`Write $36\,000\,000$ in standard form.`,
      payload: { selectMode: "single", shuffleOptions: true },
      options: [
        { key: "A", content: r`$3.6 \times 10^{7}$`, isCorrect: true, rationale: "3.6 lies between 1 and 10, and the decimal point moves 7 places." },
        { key: "B", content: r`$36 \times 10^{6}$`, isCorrect: false, rationale: "Equal in value, but 36 is not between 1 and 10, so this is not standard form." },
        { key: "C", content: r`$3.6 \times 10^{6}$`, isCorrect: false, rationale: "This is 3 600 000: one place too few." },
        { key: "D", content: r`$0.36 \times 10^{8}$`, isCorrect: false, rationale: "0.36 is less than 1, so this is not standard form." },
      ],
      explanation: r`Standard form is $A \times 10^n$ with $1 \le A < 10$. Here $36\,000\,000 = 3.6 \times 10^{7}$.`,
      cognitiveSkill: "UNDERSTANDING",
      estimatedSeconds: 45,
    },
    {
      ref: "q08",
      topic: "standard-form",
      type: "NUMERICAL",
      marks: 1,
      difficulty: 3,
      stem: r`Work out $(3 \times 10^{4}) \times (5 \times 10^{-2})$. Give your answer as an ordinary number.`,
      answerSpec: { value: 1500 },
      explanation: r`Multiply the numbers and add the powers: $3 \times 5 = 15$ and $10^{4} \times 10^{-2} = 10^{2}$, so the answer is $15 \times 100 = 1500$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 60,
    },
    {
      ref: "q09",
      topic: "fractions-and-decimals",
      type: "FILL_IN_THE_BLANK",
      marks: 2,
      difficulty: 2,
      stem: "Complete the conversions.",
      payload: {
        template: r`As a decimal, $\frac{1}{8}$ = {{blank:b1}}. As a percentage, $\frac{1}{8}$ = {{blank:b2}} %.`,
        blanks: [
          { id: "b1", input: "number" },
          { id: "b2", input: "number" },
        ],
      },
      answerSpec: {
        blanks: [
          { id: "b1", accepted: ["0.125"], tolerance: 0 },
          { id: "b2", accepted: ["12.5"], tolerance: 0 },
        ],
      },
      explanation: r`$1 \div 8 = 0.125$, and $0.125 \times 100 = 12.5$, so $\frac{1}{8} = 12.5\%$.`,
      cognitiveSkill: "UNDERSTANDING",
      estimatedSeconds: 60,
    },
    // ---------------------------------------------------------------- Algebra
    {
      ref: "q10",
      topic: "algebraic-expressions",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 1,
      daily: true,
      stem: r`Expand $3(2x - 5)$.`,
      payload: { selectMode: "single", shuffleOptions: true },
      options: [
        { key: "A", content: r`$6x - 15$`, isCorrect: true, rationale: "Both terms inside the bracket are multiplied by 3." },
        { key: "B", content: r`$6x - 5$`, isCorrect: false, rationale: "The 5 must be multiplied by 3 as well." },
        { key: "C", content: r`$5x - 15$`, isCorrect: false, rationale: r`$3 \times 2x = 6x$, not $5x$.` },
        { key: "D", content: r`$6x + 15$`, isCorrect: false, rationale: r`$3 \times (-5) = -15$: the sign stays negative.` },
      ],
      explanation: r`$3 \times 2x = 6x$ and $3 \times (-5) = -15$, so $3(2x - 5) = 6x - 15$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 30,
    },
    {
      ref: "q11",
      topic: "algebraic-expressions",
      type: "SHORT_ANSWER",
      marks: 1,
      difficulty: 2,
      stem: r`Factorise completely $6x^2 + 9x$.`,
      answerSpec: {
        accepted: [{ value: "3x(2x+3)" }, { value: "3x(3+2x)" }, { value: "(2x+3)3x" }],
        rejected: [
          { value: "x(6x+9)", feedback: "This is factorised, but not completely: 6 and 9 still share a factor of 3." },
          { value: "3(2x^2+3x)", feedback: "Not completely factorised: both terms inside the bracket still contain x." },
        ],
        normalise: ["trim", "lowercase", "remove_whitespace"],
      },
      explanation: r`The highest common factor of $6x^2$ and $9x$ is $3x$, so $6x^2 + 9x = 3x(2x + 3)$.`,
      hints: ["Find the highest common factor of 6 and 9, and of the powers of x."],
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 60,
    },
    {
      ref: "q12",
      topic: "linear-equations",
      type: "NUMERICAL",
      marks: 1,
      difficulty: 1,
      daily: true,
      accessTier: "PUBLIC",
      stem: r`Solve $5x - 7 = 18$.`,
      payload: { answerPrefix: "x =" },
      answerSpec: { value: 5 },
      explanation: r`Add 7 to both sides: $5x = 25$. Divide by 5: $x = 5$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 45,
    },
    {
      ref: "q13",
      topic: "linear-equations",
      type: "NUMERICAL",
      marks: 2,
      difficulty: 2,
      stem: r`Solve $3(x + 4) = 2x + 9$.`,
      payload: { answerPrefix: "x =" },
      answerSpec: { value: -3 },
      explanation: r`Expand: $3x + 12 = 2x + 9$. Subtract $2x$: $x + 12 = 9$. Subtract 12: $x = -3$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 75,
    },
    {
      ref: "q14",
      topic: "linear-equations",
      type: "NUMERICAL",
      marks: 3,
      difficulty: 4,
      isExamStyle: true,
      stem: r`Solve $\dfrac{x + 1}{3} - \dfrac{x - 2}{4} = 2$.`,
      payload: { answerPrefix: "x =" },
      answerSpec: { value: 14 },
      workedSolution: r`1. Multiply every term by 12: $4(x + 1) - 3(x - 2) = 24$.
2. Expand: $4x + 4 - 3x + 6 = 24$.
3. Simplify: $x + 10 = 24$, so $x = 14$.`,
      explanation: "Clear the fractions by multiplying by the lowest common multiple of the denominators, 12.",
      hints: ["Multiply every term, including the 2, by 12.", r`Be careful with the sign: $-3(x - 2) = -3x + 6$.`],
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 150,
    },
    {
      ref: "q15",
      topic: "quadratic-equations",
      type: "MULTIPLE_CHOICE",
      marks: 2,
      difficulty: 2,
      stem: r`Select ALL the solutions of $x^2 - x - 12 = 0$.`,
      payload: { selectMode: "multiple", shuffleOptions: false },
      answerSpec: { scoring: "partial" },
      options: [
        { key: "A", content: r`$x = 4$`, isCorrect: true, rationale: r`$4^2 - 4 - 12 = 0$.` },
        { key: "B", content: r`$x = -4$`, isCorrect: false, rationale: r`$16 + 4 - 12 = 8$, not $0$.` },
        { key: "C", content: r`$x = 3$`, isCorrect: false, rationale: r`$9 - 3 - 12 = -6$, not $0$.` },
        { key: "D", content: r`$x = -3$`, isCorrect: true, rationale: r`$9 + 3 - 12 = 0$.` },
      ],
      explanation: r`$x^2 - x - 12 = (x - 4)(x + 3)$, so $x = 4$ or $x = -3$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 75,
    },
    {
      ref: "q16",
      topic: "quadratic-equations",
      type: "TRUE_FALSE",
      marks: 1,
      difficulty: 2,
      daily: true,
      stem: r`The equation $x^2 + 9 = 0$ has two real solutions.`,
      payload: { statementStyle: "true_false" },
      answerSpec: { correct: false, feedbackTrue: r`It would need $x^2 = -9$, but the square of a real number is never negative, so there are no real solutions.` },
      explanation: r`$x^2 = -9$ has no real solution because $x^2 \ge 0$ for every real number $x$.`,
      cognitiveSkill: "UNDERSTANDING",
      estimatedSeconds: 40,
    },
    {
      ref: "q17",
      topic: "quadratic-equations",
      type: "CALCULATION",
      markingMode: "AI_ASSISTED",
      marks: 3,
      difficulty: 5,
      isExamStyle: true,
      calculatorAllowed: true,
      stem: r`Solve $2x^2 - 3x - 7 = 0$. Give the positive solution correct to 2 decimal places. Show your working.`,
      payload: { answerPrefix: "x =" },
      answerSpec: {
        value: 2.77,
        tolerance: { kind: "absolute", amount: 0.005 },
        decimalPlaces: 2,
        precisionPenaltyMarks: 1,
        methodMarks: [
          { id: "M1", description: r`Substitutes $a = 2$, $b = -3$, $c = -7$ correctly into the quadratic formula`, marks: 1 },
          { id: "M2", description: r`Evaluates the discriminant $b^2 - 4ac = 65$`, marks: 1 },
        ],
      },
      workedSolution: r`1. $a = 2$, $b = -3$, $c = -7$.
2. $b^2 - 4ac = 9 + 56 = 65$.
3. $x = \dfrac{3 \pm \sqrt{65}}{4}$.
4. $x = \dfrac{3 + 8.0623}{4} = 2.77$ (2 d.p.); the other solution, $-1.27$, is negative.`,
      explanation: "The quadratic does not factorise, so use the quadratic formula.",
      hints: [r`Write down $a$, $b$ and $c$ first, keeping their signs.`, r`$\sqrt{65} \approx 8.062$.`],
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 240,
    },
    {
      ref: "q18",
      topic: "simultaneous-equations",
      type: "NUMERICAL",
      marks: 2,
      difficulty: 3,
      stem: r`Solve the simultaneous equations $2x + y = 11$ and $x - y = 1$. Give the value of $x$.`,
      payload: { answerPrefix: "x =" },
      answerSpec: { value: 4 },
      explanation: r`Adding the equations eliminates $y$: $3x = 12$, so $x = 4$ (and then $y = 3$).`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 120,
    },
    {
      ref: "q19",
      topic: "simultaneous-equations",
      type: "STRUCTURED",
      marks: 4,
      difficulty: 3,
      isExamStyle: true,
      accessTier: "PREMIUM",
      stem: r`Tickets for a school concert cost \$$a$ for an adult and \$$c$ for a child. Three adult tickets and two child tickets cost \$23 in total. One adult ticket and four child tickets cost \$21 in total.`,
      parts: [
        {
          partLabel: "(a)",
          type: "SHORT_ANSWER",
          marks: 1,
          difficulty: 2,
          stem: "Write an equation in a and c for the first piece of information.",
          answerSpec: {
            accepted: [{ value: "3a+2c=23" }, { value: "2c+3a=23" }, { value: "23=3a+2c" }, { value: "23=2c+3a" }],
            normalise: ["trim", "lowercase", "remove_whitespace"],
          },
        },
        {
          partLabel: "(b)",
          type: "NUMERICAL",
          marks: 2,
          difficulty: 3,
          stem: "Find the cost of one adult ticket, in dollars.",
          answerSpec: { value: 5 },
        },
        {
          partLabel: "(c)",
          type: "NUMERICAL",
          marks: 1,
          difficulty: 3,
          stem: "Find the cost of one child ticket, in dollars.",
          answerSpec: { value: 4 },
        },
      ],
      workedSolution: r`1. $3a + 2c = 23$ and $a + 4c = 21$.
2. From the second equation, $a = 21 - 4c$.
3. Substitute: $3(21 - 4c) + 2c = 23$, so $63 - 10c = 23$ and $c = 4$.
4. Then $a = 21 - 16 = 5$. An adult ticket costs \$5 and a child ticket \$4.`,
      explanation: "Form two equations from the two facts, then eliminate one unknown.",
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 300,
    },
    {
      ref: "q20",
      topic: "algebraic-expressions",
      type: "MATCHING",
      marks: 4,
      difficulty: 2,
      stem: "Match each expression to its factorised form.",
      payload: {
        left: [
          { id: "l1", content: r`$x^2 - 9$` },
          { id: "l2", content: r`$x^2 + 5x + 6$` },
          { id: "l3", content: r`$x^2 - 6x + 9$` },
          { id: "l4", content: r`$2x^2 + 4x$` },
        ],
        right: [
          { id: "r1", content: r`$(x - 3)(x + 3)$` },
          { id: "r2", content: r`$(x + 2)(x + 3)$` },
          { id: "r3", content: r`$(x - 3)^2$` },
          { id: "r4", content: r`$2x(x + 2)$` },
          { id: "r5", content: r`$(x + 1)(x + 6)$` },
        ],
        shuffle: true,
      },
      answerSpec: {
        pairs: [
          { leftId: "l1", rightId: "r1" },
          { leftId: "l2", rightId: "r2" },
          { leftId: "l3", rightId: "r3" },
          { leftId: "l4", rightId: "r4" },
        ],
        marksPerPair: 1,
      },
      explanation: r`Expand each answer to check: for example $(x - 3)^2 = x^2 - 6x + 9$. The spare form $(x + 1)(x + 6)$ expands to $x^2 + 7x + 6$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 120,
    },
    {
      ref: "q21",
      topic: "quadratic-equations",
      type: "FILL_IN_THE_BLANK",
      marks: 2,
      difficulty: 2,
      stem: "Complete the solution.",
      payload: {
        template: r`The equation $x^2 - 7x + 10 = 0$ factorises as $(x - 2)(x - 5) = 0$, so the smaller solution is $x =$ {{blank:b1}} and the larger solution is $x =$ {{blank:b2}}.`,
        blanks: [
          { id: "b1", input: "number" },
          { id: "b2", input: "number" },
        ],
      },
      answerSpec: {
        blanks: [
          { id: "b1", accepted: ["2"] },
          { id: "b2", accepted: ["5"] },
        ],
      },
      explanation: r`If $(x - 2)(x - 5) = 0$ then $x - 2 = 0$ or $x - 5 = 0$.`,
      cognitiveSkill: "UNDERSTANDING",
      estimatedSeconds: 45,
    },
    // ---------------------------------------------------------------- Geometry
    {
      ref: "q22",
      topic: "angles-and-polygons",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 2,
      daily: true,
      stem: "What is the sum of the interior angles of a hexagon?",
      payload: { selectMode: "single", shuffleOptions: true },
      options: [
        { key: "A", content: r`$540^\circ$`, isCorrect: false, rationale: "That is the sum for a pentagon (5 sides)." },
        { key: "B", content: r`$720^\circ$`, isCorrect: true, rationale: r`$(6 - 2) \times 180^\circ = 720^\circ$.` },
        { key: "C", content: r`$1080^\circ$`, isCorrect: false, rationale: "That is the sum for an octagon (8 sides)." },
        { key: "D", content: r`$360^\circ$`, isCorrect: false, rationale: "360° is the sum of the EXTERIOR angles of any polygon." },
      ],
      explanation: r`Interior angle sum $= (n - 2) \times 180^\circ$. For a hexagon $n = 6$: $4 \times 180^\circ = 720^\circ$.`,
      cognitiveSkill: "RECALL",
      estimatedSeconds: 40,
    },
    {
      ref: "q23",
      topic: "angles-and-polygons",
      type: "NUMERICAL",
      marks: 1,
      difficulty: 2,
      daily: true,
      stem: r`Each exterior angle of a regular polygon is $24^\circ$. How many sides does the polygon have?`,
      answerSpec: { value: 15 },
      explanation: r`The exterior angles add up to $360^\circ$, so the number of sides is $360 \div 24 = 15$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 45,
    },
    {
      ref: "q24",
      topic: "angles-and-polygons",
      type: "TRUE_FALSE",
      marks: 1,
      difficulty: 1,
      daily: true,
      stem: "Vertically opposite angles are equal.",
      answerSpec: { correct: true, feedbackFalse: "When two straight lines cross, the angles opposite each other are always equal." },
      cognitiveSkill: "RECALL",
      estimatedSeconds: 20,
    },
    {
      ref: "q25",
      topic: "angles-and-polygons",
      type: "NUMERICAL",
      marks: 2,
      difficulty: 3,
      stem: r`In triangle $ABC$, angle $A = 2x^\circ$, angle $B = 3x^\circ$ and angle $C = 40^\circ$. Find $x$.`,
      payload: { answerPrefix: "x =" },
      answerSpec: { value: 28 },
      explanation: r`The angles of a triangle add up to $180^\circ$: $5x + 40 = 180$, so $5x = 140$ and $x = 28$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 75,
    },
    {
      ref: "q26",
      topic: "circle-properties",
      type: "DIAGRAM_LABELLING",
      marks: 4,
      difficulty: 1,
      stem: "Label the parts of the circle shown in the diagram.",
      payload: {
        mediaAssetId: "$diagram:circle-parts",
        labels: [
          { id: "L1", text: "Radius" },
          { id: "L2", text: "Diameter" },
          { id: "L3", text: "Chord" },
          { id: "L4", text: "Tangent" },
        ],
        hotspots: [
          { id: "h1", x: 59.4, y: 33.8 },
          { id: "h2", x: 27.5, y: 50 },
          { id: "h3", x: 22.2, y: 30.5 },
          { id: "h4", x: 65, y: 87.5 },
        ],
        shuffleLabels: true,
      },
      answerSpec: {
        hotspots: [
          { hotspotId: "h1", labelId: "L1" },
          { hotspotId: "h2", labelId: "L2" },
          { hotspotId: "h3", labelId: "L3" },
          { hotspotId: "h4", labelId: "L4" },
        ],
      },
      explanation: "A radius joins the centre to the circle; a diameter passes through the centre; a chord joins two points on the circle; a tangent touches the circle at exactly one point.",
      cognitiveSkill: "RECALL",
      estimatedSeconds: 60,
    },
    {
      ref: "q27",
      topic: "circle-properties",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 3,
      stem: r`An arc of a circle subtends an angle of $110^\circ$ at the centre. What angle does the same arc subtend at a point on the remaining part of the circumference?`,
      payload: { selectMode: "single", shuffleOptions: true },
      options: [
        { key: "A", content: r`$55^\circ$`, isCorrect: true, rationale: "The angle at the centre is twice the angle at the circumference." },
        { key: "B", content: r`$110^\circ$`, isCorrect: false, rationale: "The angle at the circumference is half the angle at the centre, not equal to it." },
        { key: "C", content: r`$220^\circ$`, isCorrect: false, rationale: "This doubles the angle instead of halving it." },
        { key: "D", content: r`$70^\circ$`, isCorrect: false, rationale: r`This is $180^\circ - 110^\circ$, which does not apply here.` },
      ],
      explanation: r`Angle at centre $= 2 \times$ angle at circumference, so the angle is $110^\circ \div 2 = 55^\circ$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 60,
    },
    {
      ref: "q28",
      topic: "circle-properties",
      type: "TRUE_FALSE",
      marks: 1,
      difficulty: 2,
      stem: "A tangent to a circle is perpendicular to the radius drawn to the point of contact.",
      answerSpec: { correct: true, feedbackFalse: r`The tangent and the radius at the point of contact always meet at $90^\circ$.` },
      cognitiveSkill: "RECALL",
      estimatedSeconds: 25,
    },
    {
      ref: "q29",
      topic: "pythagoras-theorem",
      type: "NUMERICAL",
      marks: 1,
      difficulty: 2,
      daily: true,
      accessTier: "PUBLIC",
      stem: "A right-angled triangle has shorter sides of 9 cm and 12 cm. Find the length of the hypotenuse.",
      payload: { unitHint: "cm" },
      answerSpec: { value: 15, units: { required: false, accepted: ["cm"] } },
      explanation: r`$c^2 = 9^2 + 12^2 = 81 + 144 = 225$, so $c = \sqrt{225} = 15$ cm.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 60,
    },
    {
      ref: "q30",
      topic: "pythagoras-theorem",
      type: "CALCULATION",
      markingMode: "AI_ASSISTED",
      marks: 3,
      difficulty: 3,
      stem: "A rectangular field is 40 m long and 30 m wide. Find the length of its diagonal. Include the unit in your answer.",
      payload: { unitHint: "m" },
      answerSpec: {
        value: 50,
        units: { required: true, accepted: ["m", "metres", "meters"], penaltyMarks: 1 },
        methodMarks: [{ id: "M1", description: r`Uses Pythagoras: $40^2 + 30^2 = 2500$`, marks: 1 }],
      },
      workedSolution: r`1. The diagonal is the hypotenuse of a right-angled triangle with sides 40 m and 30 m.
2. $d^2 = 40^2 + 30^2 = 1600 + 900 = 2500$.
3. $d = \sqrt{2500} = 50$ m.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 120,
    },
    {
      ref: "q31",
      topic: "pythagoras-theorem",
      type: "NUMERICAL",
      marks: 2,
      difficulty: 4,
      isExamStyle: true,
      stem: "A ladder 6.5 m long leans against a vertical wall. Its foot is on level ground 2.5 m from the wall. How high up the wall does the ladder reach?",
      payload: { unitHint: "m" },
      answerSpec: { value: 6, tolerance: { kind: "absolute", amount: 0.001 }, units: { required: false, accepted: ["m", "metres"] } },
      explanation: r`The ladder is the hypotenuse: $h^2 = 6.5^2 - 2.5^2 = 42.25 - 6.25 = 36$, so $h = 6$ m.`,
      hints: ["The ladder is the longest side, so subtract the squares."],
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 120,
    },
    // ---------------------------------------------------------------- Mensuration
    {
      ref: "q32",
      topic: "area-and-perimeter",
      type: "NUMERICAL",
      marks: 1,
      difficulty: 2,
      stem: "Find the area of a triangle with base 12 cm and perpendicular height 7 cm.",
      payload: { unitHint: "cm²" },
      answerSpec: { value: 42 },
      explanation: r`Area $= \frac{1}{2} \times 12 \times 7 = 42 \text{ cm}^2$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 45,
    },
    {
      ref: "q33",
      topic: "area-and-perimeter",
      type: "NUMERICAL",
      marks: 1,
      difficulty: 2,
      stem: r`Find the circumference of a circle of radius 7 cm. Use $\pi = \frac{22}{7}$.`,
      payload: { unitHint: "cm" },
      answerSpec: { value: 44, tolerance: { kind: "absolute", amount: 0.001 } },
      explanation: r`$C = 2\pi r = 2 \times \frac{22}{7} \times 7 = 44$ cm.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 45,
    },
    {
      ref: "q34",
      topic: "area-and-perimeter",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 2,
      stem: r`What is the area of a circle with diameter 10 cm? Take $\pi = 3.14$.`,
      payload: { selectMode: "single", shuffleOptions: true },
      options: [
        { key: "A", content: r`$78.5 \text{ cm}^2$`, isCorrect: true, rationale: r`$r = 5$, so $A = 3.14 \times 25 = 78.5$.` },
        { key: "B", content: r`$31.4 \text{ cm}^2$`, isCorrect: false, rationale: "This is the circumference, in cm, not the area." },
        { key: "C", content: r`$314 \text{ cm}^2$`, isCorrect: false, rationale: "This uses the diameter as the radius." },
        { key: "D", content: r`$15.7 \text{ cm}^2$`, isCorrect: false, rationale: "This is half of the circumference." },
      ],
      explanation: r`The radius is half the diameter: $r = 5$ cm, and $A = \pi r^2 = 3.14 \times 25 = 78.5 \text{ cm}^2$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 60,
    },
    {
      ref: "q35",
      topic: "volume-and-surface-area",
      type: "CALCULATION",
      marks: 2,
      difficulty: 3,
      calculatorAllowed: true,
      stem: "A cylinder has radius 3 cm and height 10 cm. Find its volume, correct to 3 significant figures. Include the unit.",
      payload: { unitHint: "cm³" },
      answerSpec: {
        value: 282.743,
        tolerance: { kind: "absolute", amount: 0.5 },
        sigFigs: { min: 3, max: 3 },
        units: { required: true, accepted: ["cm^3", "cm3", "cubic cm"], penaltyMarks: 1 },
      },
      explanation: r`$V = \pi r^2 h = \pi \times 9 \times 10 = 90\pi \approx 282.74$, which is $283 \text{ cm}^3$ to 3 significant figures.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 90,
    },
    {
      ref: "q36",
      topic: "volume-and-surface-area",
      type: "NUMERICAL",
      marks: 2,
      difficulty: 3,
      stem: "A cuboid measures 8 cm by 5 cm by 3 cm. Find its total surface area.",
      payload: { unitHint: "cm²" },
      answerSpec: { value: 158 },
      explanation: r`Surface area $= 2(8 \times 5 + 8 \times 3 + 5 \times 3) = 2(40 + 24 + 15) = 158 \text{ cm}^2$.`,
      hints: ["A cuboid has three pairs of identical rectangular faces."],
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 90,
    },
    {
      ref: "q37",
      topic: "volume-and-surface-area",
      type: "EXTENDED_RESPONSE",
      markingMode: "AI_ASSISTED",
      marks: 4,
      difficulty: 4,
      accessTier: "PREMIUM",
      stem: r`A cylindrical water tank has diameter 1.4 m and height 2 m. Explain, showing your working, whether the tank can hold 3 000 litres of water. Use $\pi = \frac{22}{7}$ and $1 \text{ m}^3 = 1000$ litres.`,
      payload: { wordLimit: { max: 200 } },
      answerSpec: {
        markScheme: {
          points: [
            { id: "P1", description: "Uses a radius of 0.7 m (half of the diameter)", marks: 1 },
            { id: "P2", description: r`Finds the volume $\frac{22}{7} \times 0.7^2 \times 2 = 3.08 \text{ m}^3$`, marks: 1 },
            { id: "P3", description: "Converts the volume to 3 080 litres", marks: 1 },
            { id: "P4", description: "Concludes that the tank CAN hold 3 000 litres, comparing 3 080 with 3 000", marks: 1 },
          ],
        },
        modelAnswer: r`The radius is $1.4 \div 2 = 0.7$ m. Volume $= \frac{22}{7} \times 0.7^2 \times 2 = 3.08 \text{ m}^3 = 3080$ litres. Since 3 080 litres is more than 3 000 litres, the tank can hold 3 000 litres.`,
      },
      cognitiveSkill: "EVALUATION",
      estimatedSeconds: 300,
    },
    // ---------------------------------------------------------------- Statistics and probability
    {
      ref: "q38",
      topic: "averages",
      type: "NUMERICAL",
      marks: 1,
      difficulty: 1,
      daily: true,
      stem: "Find the mean of 4, 7, 9, 10 and 15.",
      answerSpec: { value: 9 },
      explanation: r`Mean $= \frac{4 + 7 + 9 + 10 + 15}{5} = \frac{45}{5} = 9$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 45,
    },
    {
      ref: "q39",
      topic: "averages",
      type: "MULTIPLE_CHOICE",
      marks: 1,
      difficulty: 2,
      daily: true,
      stem: "What is the median of 3, 8, 2, 9, 5, 7?",
      payload: { selectMode: "single", shuffleOptions: true },
      options: [
        { key: "A", content: "6", isCorrect: true, rationale: "In order: 2, 3, 5, 7, 8, 9. The middle values are 5 and 7, and their mean is 6." },
        { key: "B", content: "5", isCorrect: false, rationale: "5 is only one of the two middle values." },
        { key: "C", content: "7", isCorrect: false, rationale: "7 is only one of the two middle values." },
        { key: "D", content: "5.5", isCorrect: false, rationale: "This averages the middle values of the UNSORTED list (2 and 9)." },
      ],
      explanation: "Sort the data first: 2, 3, 5, 7, 8, 9. With an even number of values, the median is the mean of the two middle values: (5 + 7) ÷ 2 = 6.",
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 50,
    },
    {
      ref: "q40",
      topic: "averages",
      type: "TRUE_FALSE",
      marks: 1,
      difficulty: 1,
      stem: "The mode of a data set is the value that occurs most often.",
      answerSpec: { correct: true, feedbackFalse: "The mode is the most frequent value; the median is the middle value." },
      cognitiveSkill: "RECALL",
      estimatedSeconds: 20,
    },
    {
      ref: "q41",
      topic: "probability",
      type: "SHORT_ANSWER",
      marks: 1,
      difficulty: 2,
      daily: true,
      stem: "A fair six-sided die is rolled once. What is the probability of getting a number greater than 4? Give your answer as a fraction in its simplest form.",
      payload: { maxLength: 20 },
      answerSpec: {
        accepted: [{ value: "1/3" }],
        rejected: [{ value: "2/6", feedback: "The right value, but give the fraction in its simplest form." }],
        normalise: ["trim", "remove_whitespace"],
      },
      explanation: r`Two outcomes (5 and 6) out of six are greater than 4, so the probability is $\frac{2}{6} = \frac{1}{3}$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 45,
    },
    {
      ref: "q42",
      topic: "probability",
      type: "NUMERICAL",
      marks: 2,
      difficulty: 4,
      isExamStyle: true,
      stem: "A bag contains 3 red counters and 5 blue counters. Two counters are taken at random without replacement. Find the probability that both counters are red. Give your answer as a decimal correct to 3 significant figures.",
      answerSpec: { value: 0.107143, tolerance: { kind: "absolute", amount: 0.0005 }, sigFigs: { min: 3, max: 3 } },
      explanation: r`$P(\text{red, red}) = \frac{3}{8} \times \frac{2}{7} = \frac{6}{56} = \frac{3}{28} \approx 0.107$.`,
      hints: ["After one red counter is taken, 2 red counters and 7 counters in total remain."],
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 120,
    },
    {
      ref: "q43",
      topic: "probability",
      type: "MATCHING",
      marks: 3,
      difficulty: 2,
      stem: "A fair coin is tossed and a fair six-sided die is rolled. Match each event to its probability.",
      payload: {
        left: [
          { id: "l1", content: "A head and a 6" },
          { id: "l2", content: "A tail and an even number" },
          { id: "l3", content: "A head or a tail" },
        ],
        right: [
          { id: "r1", content: r`$\frac{1}{12}$` },
          { id: "r2", content: r`$\frac{1}{4}$` },
          { id: "r3", content: r`$1$` },
          { id: "r4", content: r`$\frac{1}{6}$` },
        ],
        shuffle: true,
      },
      answerSpec: {
        pairs: [
          { leftId: "l1", rightId: "r1" },
          { leftId: "l2", rightId: "r2" },
          { leftId: "l3", rightId: "r3" },
        ],
        marksPerPair: 1,
      },
      explanation: r`Independent events multiply: $\frac{1}{2} \times \frac{1}{6} = \frac{1}{12}$ and $\frac{1}{2} \times \frac{1}{2} = \frac{1}{4}$. A coin always shows a head or a tail, so that probability is $1$.`,
      cognitiveSkill: "APPLICATION",
      estimatedSeconds: 90,
    },
    {
      ref: "q44",
      topic: "averages",
      type: "ESSAY",
      markingMode: "AI_ASSISTED",
      marks: 6,
      difficulty: 4,
      accessTier: "PREMIUM",
      stem: "A shop records the number of customers each day for one week: 12, 15, 14, 13, 90, 16, 14. Discuss whether the mean or the median better represents a typical day. Support your answer with calculations.",
      payload: { wordLimit: { max: 250 } },
      answerSpec: {
        markScheme: {
          points: [
            { id: "P1", description: "Calculates the mean correctly (174 ÷ 7 ≈ 24.9)", marks: 2, indicators: ["174", "24.9", "24.86"] },
            { id: "P2", description: "Finds the median, 14, from the ordered data", marks: 1 },
            { id: "P3", description: "Identifies 90 as an outlier (an unusual day)", marks: 1 },
            { id: "P4", description: "Concludes, with a reason, that the median better represents a typical day because the outlier raises the mean", marks: 2 },
          ],
          levels: [
            { level: 1, minMarks: 1, maxMarks: 2, descriptor: "Some correct calculation, little or no comparison" },
            { level: 2, minMarks: 3, maxMarks: 4, descriptor: "Correct averages with a partial explanation" },
            { level: 3, minMarks: 5, maxMarks: 6, descriptor: "Correct averages and a clear, justified conclusion" },
          ],
        },
        modelAnswer:
          "The mean is 174 ÷ 7 ≈ 24.9 customers. In order the data are 12, 13, 14, 14, 15, 16, 90, so the median is 14. Six of the seven days had between 12 and 16 customers; the 90 is an unusual day that pulls the mean up. The median, 14, is therefore the better measure of a typical day.",
      },
      cognitiveSkill: "EVALUATION",
      estimatedSeconds: 600,
    },
    {
      ref: "q45",
      topic: "area-and-perimeter",
      type: "STRUCTURED",
      marks: 5,
      difficulty: 5,
      isExamStyle: true,
      accessTier: "PREMIUM",
      calculatorAllowed: true,
      stem: r`A garden is a rectangle 12 m long and 8 m wide. A semicircular flower bed is added outside the rectangle on one of the 8 m sides, so that this side is the diameter of the semicircle. Use $\pi = 3.14$.`,
      parts: [
        { partLabel: "(a)", type: "NUMERICAL", marks: 1, difficulty: 2, stem: "Find the area of the rectangle, in m².", answerSpec: { value: 96 } },
        {
          partLabel: "(b)",
          type: "NUMERICAL",
          marks: 2,
          difficulty: 3,
          stem: "Find the area of the semicircular flower bed, in m².",
          answerSpec: { value: 25.12, tolerance: { kind: "absolute", amount: 0.01 } },
        },
        {
          partLabel: "(c)",
          type: "NUMERICAL",
          marks: 2,
          difficulty: 5,
          stem: "Find the perimeter of the whole garden (the rectangle and the flower bed together), in metres.",
          answerSpec: { value: 44.56, tolerance: { kind: "absolute", amount: 0.01 } },
        },
      ],
      workedSolution: r`1. Rectangle: $12 \times 8 = 96 \text{ m}^2$.
2. Semicircle: radius $4$ m, area $\frac{1}{2} \times 3.14 \times 4^2 = 25.12 \text{ m}^2$.
3. Perimeter: the 8 m side inside the garden is not part of the boundary. Straight edges $12 + 8 + 12 = 32$ m; curved edge $\frac{1}{2} \times 2 \times 3.14 \times 4 = 12.56$ m; total $44.56$ m.`,
      cognitiveSkill: "ANALYSIS",
      estimatedSeconds: 420,
    },
  ],
  lessons: [
    {
      ref: "lesson-quadratics",
      slug: "solving-quadratic-equations",
      title: "Solving quadratic equations",
      kind: "LESSON",
      topic: "quadratic-equations",
      extraTopics: ["algebra"],
      accessTier: "FREE",
      estimatedMinutes: 20,
      summary: "Solve quadratic equations by factorising and with the quadratic formula, and avoid the most common mistakes.",
      practice: ["q15", "q16", "q21"],
      body: r`A **quadratic equation** can be written as $ax^2 + bx + c = 0$ with $a \neq 0$. This lesson shows two reliable methods: factorising and the quadratic formula.

:::definition{term="Quadratic equation"}
An equation in one unknown whose highest power of the unknown is 2, for example $x^2 - 5x + 6 = 0$.
:::

## Method 1: solving by factorising

If a product of two factors is zero, at least one of the factors must be zero. So once the quadratic is written as a product, each factor gives a solution.

:::worked-solution[Solve $x^2 - 5x + 6 = 0$]
1. Find two numbers that multiply to $+6$ and add to $-5$: they are $-2$ and $-3$.
2. Factorise: $(x - 2)(x - 3) = 0$.
3. Set each factor equal to zero: $x - 2 = 0$ or $x - 3 = 0$.
4. So $x = 2$ or $x = 3$.
:::

Check by substituting: $2^2 - 5(2) + 6 = 4 - 10 + 6 = 0$.

:::worked-solution[Solve $2x^2 + 7x - 4 = 0$]
1. Multiply $a \times c$: $2 \times (-4) = -8$. Two numbers that multiply to $-8$ and add to $7$ are $8$ and $-1$.
2. Split the middle term: $2x^2 + 8x - x - 4 = 0$.
3. Factorise in pairs: $2x(x + 4) - 1(x + 4) = 0$, so $(2x - 1)(x + 4) = 0$.
4. So $x = \tfrac{1}{2}$ or $x = -4$.
:::

## Method 2: the quadratic formula

Use the formula when the quadratic does not factorise neatly.

:::formula{name="Quadratic formula"}
$$
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
$$
:::

:::worked-solution[Solve $x^2 + 4x - 7 = 0$, giving answers to 2 decimal places]
1. Identify $a = 1$, $b = 4$ and $c = -7$.
2. Work out $b^2 - 4ac = 16 + 28 = 44$.
3. Substitute: $x = \dfrac{-4 \pm \sqrt{44}}{2}$.
4. Since $\sqrt{44} \approx 6.633$, $x \approx 1.32$ or $x \approx -5.32$.
:::

:::mistake
Dividing both sides by $x$, as in $x^2 = 3x$ so $x = 3$, loses the solution $x = 0$. Rearrange to $x^2 - 3x = 0$ and factorise: $x(x - 3) = 0$, so $x = 0$ or $x = 3$.
:::

:::exam-tip
When a question asks for answers correct to 2 decimal places, the expression will not factorise: go straight to the formula and show the substitution clearly, because method marks are awarded for it.
:::

:::summary
- Rearrange so that one side is $0$.
- Try factorising first; otherwise use the quadratic formula.
- A quadratic equation has at most two solutions.
:::
`,
    },
    {
      ref: "lesson-pythagoras",
      slug: "pythagoras-theorem",
      title: "Pythagoras' theorem",
      kind: "LESSON",
      topic: "pythagoras-theorem",
      extraTopics: ["geometry"],
      accessTier: "PUBLIC",
      estimatedMinutes: 15,
      summary: "Find missing sides of right-angled triangles and recognise right angles from side lengths.",
      practice: ["q29", "q31"],
      body: r`In a right-angled triangle, the longest side is opposite the right angle. It is called the **hypotenuse**.

:::keyfact{title="Pythagoras' theorem"}
In a right-angled triangle with shorter sides $a$ and $b$ and hypotenuse $c$:

$$
a^2 + b^2 = c^2
$$
:::

## Finding the hypotenuse

:::worked-solution[The shorter sides of a right-angled triangle are 6 cm and 8 cm. Find the hypotenuse.]
1. $c^2 = 6^2 + 8^2 = 36 + 64 = 100$.
2. $c = \sqrt{100} = 10$ cm.
:::

## Finding a shorter side

To find a shorter side, subtract the squares instead of adding them.

:::worked-solution[The hypotenuse is 13 cm and one side is 5 cm. Find the third side.]
1. $b^2 = 13^2 - 5^2 = 169 - 25 = 144$.
2. $b = \sqrt{144} = 12$ cm.
:::

:::example{title="A ladder against a wall"}
A ladder 5 m long leans against a vertical wall with its foot 1.5 m from the wall. It reaches a height of $\sqrt{5^2 - 1.5^2} = \sqrt{22.75} \approx 4.77$ m.
:::

:::mistake
Adding the squares when you need a shorter side. Check your answer: the hypotenuse must always be the longest side.
:::

## The converse

If the sides of a triangle satisfy $a^2 + b^2 = c^2$, the triangle has a right angle. For example $9^2 + 12^2 = 81 + 144 = 225 = 15^2$, so a triangle with sides 9 cm, 12 cm and 15 cm is right-angled.

:::exam-tip
Keep the exact square root until the last step, then round to the accuracy the question asks for.
:::
`,
    },
    {
      ref: "lesson-percentages",
      slug: "percentage-change-and-reverse-percentages",
      title: "Percentage change and reverse percentages",
      kind: "LESSON",
      topic: "percentages",
      extraTopics: ["number"],
      accessTier: "PREMIUM",
      estimatedMinutes: 15,
      summary: "Use multipliers for percentage increases and decreases, percentage change and reverse percentages.",
      practice: ["q03", "q04", "q05"],
      body: r`## Percentage increase and decrease

To increase an amount by $r\%$, multiply by $1 + \frac{r}{100}$. To decrease an amount by $r\%$, multiply by $1 - \frac{r}{100}$.

:::formula{name="Multiplier method"}
$$
\text{new amount} = \text{original amount} \times \left(1 \pm \frac{r}{100}\right)
$$
:::

:::worked-solution[A bag costs \$40. Its price rises by 15%. Find the new price.]
1. The multiplier is $1 + \frac{15}{100} = 1.15$.
2. The new price is $40 \times 1.15 = 46$, so the bag now costs \$46.
:::

## Percentage change

:::formula{name="Percentage change"}
$$
\text{percentage change} = \frac{\text{new} - \text{original}}{\text{original}} \times 100\%
$$
:::

:::worked-solution[A phone bought for \$250 is sold for \$200. Find the percentage loss.]
1. The change is $200 - 250 = -50$.
2. $\frac{-50}{250} \times 100\% = -20\%$, which is a loss of 20%.
:::

## Reverse percentages

:::worked-solution[After a 20% discount a jacket costs \$36. Find the original price.]
1. After the discount the price is 80% of the original, so the multiplier is $0.8$.
2. Original $\times 0.8 = 36$, so the original price is $36 \div 0.8 = 45$ dollars.
:::

:::mistake
Finding 20% of the SALE price and adding it on gives $36 + 7.20 = 43.20$, which is wrong: the 20% was taken from the original price, not from \$36.
:::

:::exam-tip
Write the multiplier down first. It turns every percentage question into a single multiplication or division.
:::
`,
    },
  ],
  flashcards: [
    { ref: "f01", topic: "quadratic-equations", cardType: "FORMULA", front: "The quadratic formula", back: r`For $ax^2 + bx + c = 0$: $x = \dfrac{-b \pm \sqrt{b^2 - 4ac}}{2a}$` },
    { ref: "f02", topic: "quadratic-equations", cardType: "DEFINITION", front: "The discriminant of a quadratic", back: r`$b^2 - 4ac$. Positive: two real solutions. Zero: one repeated solution. Negative: no real solutions.` },
    { ref: "f03", topic: "pythagoras-theorem", cardType: "FORMULA", front: "Pythagoras' theorem", back: r`$a^2 + b^2 = c^2$, where $c$ is the hypotenuse (the longest side).` },
    { ref: "f04", topic: "area-and-perimeter", cardType: "FORMULA", front: "Area of a circle", back: r`$A = \pi r^2$` },
    { ref: "f05", topic: "area-and-perimeter", cardType: "FORMULA", front: "Circumference of a circle", back: r`$C = 2\pi r = \pi d$` },
    { ref: "f06", topic: "volume-and-surface-area", cardType: "FORMULA", front: "Volume of a cylinder", back: r`$V = \pi r^2 h$` },
    { ref: "f07", topic: "area-and-perimeter", cardType: "FORMULA", front: "Area of a triangle", back: r`$\frac{1}{2} \times \text{base} \times \text{perpendicular height}$` },
    { ref: "f08", topic: "angles-and-polygons", cardType: "FACT", front: r`Sum of the interior angles of an $n$-sided polygon`, back: r`$(n - 2) \times 180^\circ$` },
    { ref: "f09", topic: "angles-and-polygons", cardType: "FACT", front: "Sum of the exterior angles of a convex polygon", back: r`$360^\circ$` },
    { ref: "f10", topic: "averages", cardType: "DEFINITION", front: "Median", back: "The middle value when the data are in order (the mean of the two middle values when there is an even number of values)." },
    { ref: "f11", topic: "averages", cardType: "DEFINITION", front: "Range", back: "The largest value minus the smallest value." },
    { ref: "f12", topic: "percentages", cardType: "FORMULA", front: "Percentage change", back: r`$\dfrac{\text{new} - \text{original}}{\text{original}} \times 100\%$` },
    { ref: "f13", topic: "percentages", cardType: "CONCEPT", front: "Reverse percentages: how do you undo a 20% discount?", back: r`Divide by the multiplier $0.8$. For example, a sale price of \$36 means an original price of $36 \div 0.8 = 45$ dollars.` },
    { ref: "f14", topic: "standard-form", cardType: "DEFINITION", front: "Standard form", back: r`A number written as $A \times 10^n$ where $1 \le A < 10$ and $n$ is an integer.` },
    { ref: "f15", topic: "probability", cardType: "FACT", front: "Probability that an event does NOT happen", back: r`$P(\text{not } A) = 1 - P(A)$` },
    { ref: "f16", topic: "circle-properties", cardType: "FACT", front: "Angle at the centre theorem", back: "The angle an arc subtends at the centre is twice the angle it subtends at any point on the remaining part of the circumference." },
    { ref: "f17", topic: "algebraic-expressions", cardType: "DEFINITION", front: "Factorise", back: r`Write an expression as a product of factors, for example $x^2 + 5x + 6 = (x + 2)(x + 3)$.` },
  ],
  assessments: [
    {
      ref: "topic-test-algebra",
      kind: "TOPIC_TEST",
      title: "Algebra topic test (demo)",
      description: "A short demo topic test on expressions and equations.",
      instructions: "Answer every question. You have 30 minutes. Marks and explanations are shown after you submit.",
      accessTier: "FREE",
      timeLimitSeconds: 1800,
      topics: ["algebra"],
      sections: [{ title: "Algebra", questions: ["q10", "q11", "q12", "q13", "q15", "q16", "q18", "q20", "q21"] }],
    },
    {
      ref: "mock-exam",
      kind: "MOCK_EXAM",
      title: "Mathematics mock exam (demo)",
      description: "A two-paper demo mock exam for testing exam mode. Not an official paper.",
      instructions: "Each paper is timed separately. Show your working for questions worth more than one mark.",
      accessTier: "PREMIUM",
      sections: [
        {
          title: "Demo Paper 1",
          componentCode: "P1",
          timeLimitSeconds: 3600,
          instructions: "Calculators are not allowed in this paper.",
          questions: ["q01", "q05", "q07", "q22", "q24", "q27", "q34", "q38", "q39", "q41"],
        },
        {
          title: "Demo Paper 2",
          componentCode: "P2",
          timeLimitSeconds: 5400,
          instructions: "Calculators are allowed. Show all your working.",
          questions: ["q19", "q30", "q35", "q45", "q17", "q37"],
        },
      ],
    },
  ],
};
