// Builds content/concepts/mathematics-a.json and the four syllabus files of the mathematics-a family:
//   content/syllabi/zimsec/a-level/pure-mathematics/2015-2022.json   (ZIMSEC A-Level Pure Mathematics, Forms 5-6)
//   content/syllabi/zimsec/a-level/statistics/2015-2022.json         (ZIMSEC A-Level Statistics, Forms 5-6)
//   content/syllabi/zimsec/a-level/mechanics/2015-2022.json          (ZIMSEC A-Level "Mechanical Mathematics", Forms 5-6)
//   content/syllabi/cambridge/a-level/mathematics/2026-2027.json     (Cambridge International AS & A Level Mathematics 9709)
// Sources (local only, not in git): .scratch/mathematics-a/sources/zimsec-pure-mathematics.pdf, zimsec-statistics.pdf,
// zimsec-mechanical-mathematics.pdf (+ .txt; Ministry documents, copies from the zimsake.co.zw document library), and
// 9709-2026-2027.pdf (+ .txt, version 4) with the syllabus update 9709-2026-2027-update.pdf (+ .txt).
// The concept registry lives in ./concepts.mjs.
// Run from the repo root: node .scratch/mathematics-a/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";
import { CONCEPTS } from "./concepts.mjs";

const ROOT = process.cwd();
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept key in concepts.mjs");
for (const [k] of CONCEPTS) if (!/^amaths\.[a-z-]+\.[a-z-]+$/.test(k)) throw new Error(`bad concept key ${k}`);
if (new Set(CONCEPTS.map(([, n]) => n)).size !== CONCEPTS.length) throw new Error("duplicate concept names");

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. Objectives are our own paraphrase; unless given as [code, text], their code is node code + .n (ours).
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, children } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) n.objectives = objectives.map((o, i) => (Array.isArray(o) ? { code: o[0], text: o[1] } : { code: `${code}.${i + 1}`, text: o }));
  if (components) n.components = components;
  if (children) n.children = children;
  return n;
};
const section = (key, code, name, opts) => node("SECTION", key, code, name, opts);
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);
const c = (...keys) => keys.map((k) => `amaths.${k}`);

const ZIM_SOURCE_NOTE = (subject, file) =>
  `Topic names and their numbers (6.1, 6.2, …) are transcribed from the topic list (6.0) of the Ministry's ${subject} Syllabus Forms 5 - 6 (2015 - 2022); sub-topics follow the competency matrices (8.0, Form 5 and Form 6) and the scope and sequence (7.0). Sub-topic codes (6.x.y) and objective codes are ours, and the form (Form 5 or Form 6) of each objective comes from the competency matrices. Learning-objective statements are our own paraphrase; no syllabus text is reproduced. Source file: ${file}.`;
const ZIM_COMMON_NOTES = (subject, id) => [
  `Source (read 2026-10-08/09): the Ministry document '${subject} Syllabus, Forms 5 - 6, 2015 - 2022' (Curriculum Development and Technical Services, (c) 2015), copy obtained from the zimsake.co.zw softidrive document library (https://www.zimsake.co.zw/softidrive/download/${id}/sh/ddc543968e3f00852d6cecb847a6f295; the officialDocument URL records the library root). zimsake.co.zw is not an official Ministry or ZIMSEC address; the same Forms 5-6 documents are listed on the Mashonaland West provincial education office site (mopsemashwest.gov.zw, whose https certificate has expired). Replace the URL with an official ZIMSEC or Ministry address once one is confirmed.`,
  "Text extraction: the PDF was read with pdftotext in layout and raw modes and with a table extractor. Several competency-matrix pages are rotated or have columns that come out interleaved; topic headings, sub-topics and objectives were read from the raw text and cross-checked against the scope and sequence. Check every heading and objective against a clean copy.",
  `Heritage-Based Curriculum: ZIMSEC introduced Heritage-Based Curriculum syllabi for Forms 5-6, and 2024-2030 versions exist for some subjects. Confirm which ${subject} syllabus the November 2026 and later ZIMSEC A-Level examinations use, set effectiveTo on this version when it is replaced, and create a new version file for the new syllabus.`,
  "Version dates: versionLabel as printed on the cover (2015 - 2022); assumed first examined in November 2018 (effectiveFrom 2018-01-01, the two-year Forms 5-6 course starting in 2017), as for the other 2015-2022 ZIMSEC files.",
  "Subject code: not printed in the document (left null). Confirm the ZIMSEC A-Level subject code with ZIMSEC.",
];

// =====================================================================================================================
// ZIMSEC A-Level Pure Mathematics, Forms 5-6, 2015-2022.
const ZP_TOPICS = [
  topic("algebra", "6.1", "Algebra", {
    children: [
      sub("algebra.indices", "6.1.1", "Indices and proportionality", {
        covers: c("algebra.indices-variation"),
        objectives: [
          "Form 5: state the laws of indices and use them, with rational indices, to solve problems.",
          "Form 5: solve problems involving direct, inverse, partial and joint variation.",
        ],
      }),
      sub("algebra.polynomials", "6.1.2", "Polynomials", {
        covers: c("algebra.polynomials"),
        objectives: [
          "Form 5: add, subtract, multiply and divide polynomials.",
          "Form 5: complete the square of a quadratic polynomial.",
          "Form 5: derive and use the remainder and factor theorems.",
        ],
      }),
      sub("algebra.identities-equations", "6.1.3", "Identities, equations and inequalities", {
        covers: c("quadratics.completing-square-discriminant", "quadratics.equations-inequalities", "algebra.partial-fractions"),
        objectives: [
          "Form 5: distinguish between an equation and an identity, and find unknown coefficients in polynomials using identities.",
          "Form 5: solve simultaneous equations of which at least one is linear and at most one is quadratic.",
          "Form 5: decompose rational functions into partial fractions, including improper fractions.",
          "Form 5: use the discriminant to determine the number of real roots of a quadratic equation and solve related problems.",
          "Form 5: solve polynomial equations and problems using the factor and remainder theorems.",
          "Form 5: solve inequalities, including rational inequalities, and model situations with equations and inequalities.",
        ],
      }),
      sub("algebra.functions", "6.1.4", "Functions: logarithmic, exponential, rational and modulus functions", {
        covers: c("functions.exponential-log", "functions.logarithms", "functions.linear-law", "algebra.modulus"),
        objectives: [
          "Form 5: define a function as a mapping and sketch simple graphs of functions for a given domain.",
          "Form 5: explain exponential growth and decay and model situations with them.",
          "Form 5: solve equations of the form aˣ = b and inequalities aˣ < b or aˣ > b using logarithms.",
          "Form 5: use logarithms to transform a given relationship to linear form and find unknown constants.",
          "Form 5: describe the meaning of the absolute value notation and solve equations and inequalities involving the modulus.",
        ],
      }),
      sub("algebra.relations", "6.1.5", "Relations", {
        covers: c("functions.domain-range", "functions.composite-inverse", "functions.transformations"),
        objectives: [
          "Form 5: define a relation, its domain, co-domain and range, and describe types of relations.",
          "Form 5: define a function and distinguish between injective (one-to-one), surjective and bijective functions.",
          "Form 5: find the inverse of a given function and illustrate graphically the relation between a one-to-one function and its inverse.",
          "Form 5: illustrate the relationships between the graph of y = f(x) and the graphs of y = |f(x)|, y = af(x), y = f(x) + a, y = f(x + a) and y = f(ax).",
          "Form 5: find composite functions and model situations involving relations.",
        ],
      }),
      sub("algebra.matrices", "6.1.6", "Matrices", {
        covers: c("matrices.operations-inverses", "matrices.transformations"),
        objectives: [
          "Form 6: identify null, identity, singular and non-singular matrices and carry out basic operations on matrices.",
          "Form 6: calculate the determinant of a square matrix (up to 3 × 3) and the inverse of a non-singular 3 × 3 matrix.",
          "Form 6: apply the result (AB)⁻¹ = B⁻¹A⁻¹ for non-singular matrices.",
          "Form 6: solve simultaneous equations in two or three unknowns by writing them as a matrix equation AX = b.",
          "Form 6: construct 2 × 2 matrices for enlargements, rotations, reflections, stretches and shears, and use composite transformations AB and Aⁿ.",
          "Form 6: derive the relationship between the area scale factor of a transformation and the determinant of its matrix.",
        ],
      }),
      sub("algebra.induction", "6.1.7", "Mathematical induction", {
        covers: c("proof.induction"),
        objectives: [
          "Form 6: describe the process of mathematical induction and use it to prove given results.",
          "Form 6: conduct limited trials to formulate a conjecture and prove it by induction.",
        ],
      }),
      sub("algebra.groups", "6.1.8", "Groups", {
        covers: c("groups.binary-operations-groups"),
        objectives: [
          "Form 6: define a binary operation and the properties closure, commutativity, associativity, distributivity, identity and inverse element.",
          "Form 6: define a group and use its basic properties to show that a given structure is, or is not, a group.",
          "Form 6: solve problems involving binary operations and the properties of a group.",
        ],
      }),
    ],
  }),
  topic("geometry", "6.2", "Geometry and vectors", {
    children: [
      sub("geometry.graphs", "6.2.1", "Graphs and coordinate geometry", {
        description: "Form 5 (curve sketching, coordinate geometry, parametric equations). Reducing equations to linear form is taught with amaths.functions.linear-law (6.1.4) and parametric curves with amaths.diff.implicit-parametric (6.5.1).",
        covers: c("graphs.curve-sketching", "coordinate.straight-lines", "coordinate.circles"),
        objectives: [
          "Form 5: sketch graphs of y = kxⁿ (n an integer or ½) and of quadratic and cubic polynomials.",
          "Form 5: locate solutions of equations and inequalities using sketches of graphs.",
          "Form 5: find equations of parallel and perpendicular straight lines.",
          "Form 5: calculate the distance between two points and the perpendicular distance from a point to a straight line.",
          "Form 5: reduce an equation to a suitable linear form (such as y = ax² + b with y plotted against x²) to solve problems.",
          "Form 5: find the equation of a circle.",
          "Form 5: define a curve using parametric equations.",
        ],
      }),
      sub("geometry.vectors", "6.2.2", "Vectors (up to three dimensions)", {
        children: [
          sub("geometry.vectors.operations", "6.2.2.1", "Vector notation, operations and the scalar product", {
            description: "Form 5 (vector notation, operations, types of vectors, magnitude, dot product, area of plane shapes).",
            covers: c("vectors.basics", "vectors.scalar-product"),
            objectives: [
              "Form 5: define position and free vectors.",
              "Form 5: add and subtract vectors and multiply them by scalars.",
              "Form 5: use unit, displacement and position vectors and the scalar (dot) product to solve problems.",
            ],
          }),
          sub("geometry.vectors.lines", "6.2.2.2", "Vector and Cartesian equations of a straight line", {
            description: "Form 6.",
            covers: c("vectors.lines"),
            objectives: [
              "Form 6: find vector and Cartesian equations of a straight line in three dimensions.",
              "Form 6: determine whether two lines are parallel, intersecting or skew, and find the angle between two lines.",
              "Form 6: find the perpendicular distance from a point to a line and the coordinates of the foot of the perpendicular.",
            ],
          }),
          sub("geometry.vectors.planes", "6.2.2.3", "The cross product and equations of a plane", {
            description: "Form 6.",
            covers: c("vectors.cross-product-planes", "vectors.lines-planes"),
            objectives: [
              "Form 6: find the cross product of given vectors and use it to find areas of plane shapes.",
              "Form 6: find vector, parametric and Cartesian equations of a plane.",
              "Form 6: find the angle between a line and a plane and between two planes.",
              "Form 6: determine whether a line lies in, is parallel to or intersects a plane, and find the point of intersection.",
              "Form 6: find the line of intersection of two planes and the perpendicular distance from a point to a plane, and solve problems on lines and planes.",
            ],
          }),
        ],
      }),
    ],
  }),
  topic("series", "6.3", "Series and sequences", {
    children: [
      sub("series.sequences", "6.3.1", "Sequences", {
        description: "Form 5.",
        covers: c("series.arithmetic", "series.geometric"),
        objectives: [
          "Form 5: define a sequence and calculate successive terms from definitions such as uₙ = n² and uₙ₊₁ = 2uₙ.",
          "Form 5: distinguish among periodic, oscillating, convergent and divergent sequences.",
          "Form 5: define arithmetic and geometric progressions and find their general and other terms.",
          "Form 5: find sums of arithmetic and geometric progressions and the sum to infinity of a convergent geometric series.",
        ],
      }),
      sub("series.binomial", "6.3.2", "Series: notation and the binomial expansion", {
        description: "Form 5.",
        covers: c("series.binomial-positive", "series.binomial-rational"),
        objectives: [
          "Form 5: use Σ, n! and binomial-coefficient notation.",
          "Form 5: expand (a + b)ⁿ for a positive integer n and (1 + x)ⁿ for rational n with |x| < 1.",
          "Form 5: solve problems involving series.",
        ],
      }),
      sub("series.further", "6.3.3", "Series: standard results, method of differences, Maclaurin and Taylor series", {
        description: "Form 6.",
        covers: c("series.standard-sums-differences", "series.maclaurin-taylor"),
        objectives: [
          "Form 6: use the standard results for Σr, Σr² and Σr³ to find related sums.",
          "Form 6: use the method of differences to obtain the sum of a finite series.",
          "Form 6: use Taylor's and Maclaurin's series for approximation and solve problems involving them.",
        ],
      }),
    ],
  }),
  topic("trigonometry", "6.4", "Trigonometry", {
    description: "Form 5 only.",
    children: [
      sub("trigonometry.plane", "6.4.1", "Plane trigonometry", {
        covers: c("trig.radians-arcs-sectors"),
        objectives: [
          "Form 5: distinguish between radians and degrees and convert between them.",
          "Form 5: calculate arc lengths and sector areas and solve problems on arcs, sectors and segments.",
          "Form 5: use small-angle approximations for sin x, cos x and tan x.",
        ],
      }),
      sub("trigonometry.functions", "6.4.2", "Trigonometrical functions", {
        description: "Identities exclude half-angle identities (as printed). The form R sin(θ ± α) is not named; it is taught here as part of trigonometrical identities (confirm).",
        covers: c("trig.graphs-exact-values", "trig.basic-identities-equations", "trig.reciprocal-functions", "trig.compound-double-angle", "trig.harmonic-form"),
        objectives: [
          "Form 5: sketch and transform the graphs of the trigonometrical functions.",
          "Form 5: sketch the graphs of the inverse trigonometrical relations.",
          "Form 5: solve trigonometrical equations.",
          "Form 5: prove trigonometrical identities (excluding half-angle identities) and use them to solve problems.",
        ],
      }),
    ],
  }),
  topic("calculus", "6.5", "Calculus", {
    children: [
      sub("calculus.differentiation", "6.5.1", "Differentiation", {
        description: "Form 5.",
        covers: c("diff.first-principles", "diff.powers-chain", "diff.exp-log-trig", "diff.product-quotient", "diff.implicit-parametric", "diff.applications", "diff.stationary-points"),
        objectives: [
          "Form 5: differentiate from first principles (polynomials, rational and trigonometrical functions; not logarithmic or exponential functions).",
          "Form 5: differentiate polynomials, rational functions, natural logarithms, exponentials and trigonometrical functions.",
          "Form 5: differentiate sums, differences, products, quotients and composite functions.",
          "Form 5: carry out implicit and parametric differentiation.",
          "Form 5: find gradients, tangents, normals and rates of change.",
          "Form 5: locate stationary points and distinguish between maxima, minima and points of inflexion, and solve problems involving differentiation.",
        ],
      }),
      sub("calculus.integration", "6.5.2", "Integration", {
        description: "Form 5.",
        covers: c("integ.reverse-powers", "integ.standard-functions", "integ.recognition-substitution", "integ.partial-fractions", "integ.by-parts", "integ.definite-area", "integ.volumes"),
        objectives: [
          "Form 5: integrate polynomials, rational functions, exponentials (e^(ax+b)) and trigonometrical functions, using standard integrals and integrals that reduce to them.",
          "Form 5: integrate by recognition, by substitution and by parts.",
          "Form 5: evaluate definite integrals.",
          "Form 5: apply integration to find areas and volumes.",
        ],
      }),
      sub("calculus.differential-equations", "6.5.3", "First-order differential equations", {
        description: "Form 6.",
        covers: c("de.separable"),
        objectives: [
          "Form 6: formulate a statement involving a rate of change as a differential equation.",
          "Form 6: solve differential equations by integration when the variables are separable.",
          "Form 6: sketch typical members of the family of curves given by a general solution.",
          "Form 6: find a particular solution from initial conditions and solve problems with first-order differential equations.",
        ],
      }),
    ],
  }),
  topic("numerical", "6.6", "Numerical methods", {
    description: "Form 6 only.",
    covers: c("numerical.locating-roots", "numerical.newton-raphson", "numerical.trapezium-errors"),
    objectives: [
      "Form 6: define error, distinguish between absolute and relative error, and estimate errors in calculations.",
      "Form 6: approximate a root of an equation graphically or by a change of sign.",
      "Form 6: derive a converging iterative formula for an equation and solve the equation by iteration.",
      "Form 6: derive the Newton–Raphson formula and use it to solve equations.",
      "Form 6: recognise cases where an iterative method may fail to converge to the required root.",
      "Form 6: derive the trapezium rule, estimate areas with it, and explain how to bound an area using rectangles or trapezia.",
    ],
  }),
  topic("complex", "6.7", "Complex numbers", {
    children: [
      sub("complex.cartesian", "6.7.1", "Complex numbers: parts, operations and the Argand diagram", {
        description: "Form 5.",
        covers: c("complex.cartesian", "complex.argand-polar"),
        objectives: [
          "Form 5: find the conjugate, modulus and argument of a complex number.",
          "Form 5: add, subtract, multiply and divide complex numbers.",
          "Form 5: represent complex numbers on an Argand diagram.",
          "Form 5: interpret the geometric effects of conjugating, adding, subtracting, multiplying and dividing complex numbers.",
        ],
      }),
      sub("complex.polar-de-moivre", "6.7.2", "Polar form, equations, loci and de Moivre's theorem", {
        description: "Form 6. The polar form is taught with the Argand diagram in amaths.complex.argand-polar (6.7.1).",
        covers: c("complex.polynomial-equations", "complex.loci", "complex.de-moivre"),
        objectives: [
          "Form 6: solve polynomial equations (up to degree five) with at least one pair of non-real roots.",
          "Form 6: express complex numbers in polar form r(cos θ + i sin θ) = re^(iθ) and multiply and divide them in that form.",
          "Form 6: illustrate equations and inequalities involving complex numbers by loci in an Argand diagram.",
          "Form 6: derive and prove de Moivre's theorem and use it to prove trigonometrical identities and solve equations, including the nth roots of unity.",
        ],
      }),
    ],
  }),
];

const zimsecPure = {
  board: "zimsec",
  qualification: "a-level",
  subject: "pure-mathematics",
  versionLabel: "2015-2022",
  family: "mathematics-a",
  title: "ZIMSEC A-Level Pure Mathematics",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Pure Mathematics Syllabus, Forms 5 - 6, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at A Level",
    url: "https://www.zimsake.co.zw/softidrive/",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: ZIM_SOURCE_NOTE("Pure Mathematics", "zimsake.co.zw softidrive download 33 (Pure Mathematics)"),
  notes: [
    ...ZIM_COMMON_NOTES("Pure Mathematics", 33),
    "Topics and forms as read: Form 5 covers Algebra (indices and proportionality, polynomials, identities, equations and inequalities, functions, relations), Geometry and vectors (graphs and coordinate geometry; vector notation, operations and the dot product), Series and sequences (sequences, AP and GP, binomial expansion), Trigonometry (all), Calculus (differentiation and integration) and Complex numbers (parts, operations, Argand diagram). Form 6 covers matrices, mathematical induction, groups, three-dimensional lines and planes with the cross product, standard results, the method of differences, Maclaurin and Taylor series, first-order differential equations, numerical methods (all) and complex numbers (equations up to degree five, polar form, loci, de Moivre's theorem, nth roots of unity).",
    "Assessment (9.0) as read: continuous assessment 30% (topic tasks, written tests, end-of-term tests and a project, 7.5% each, terms 2 to 5) and summative assessment 70% in two papers, Paper 1 35% and Paper 2 35%. The document prints NO durations, marks, question numbers or paper structure for the two Pure Mathematics papers (the Statistics and Mechanical Mathematics syllabi do). Components are recorded without duration or marks; our mock exams assume three hours and 120 marks each, with Paper 1 about twelve compulsory structured questions and Paper 2 a compulsory Section A and a choice of five of seven long questions in Section B (the Statistics pattern). Confirm against recent ZIMSEC Pure Mathematics papers.",
    "Read with uncertainty from scrambled cells: the transformation objective lists y = |f(x)|, y = af(x), y = f(x) + a, y = f(x + a) and y = f(ax) (a further form may be y = af(x + b)); 'Inequalities (including rational inequalities)'; integration of 'rational functions … with standard integrals and those that can be reduced to standard integrals'; the Form 5 vectors content lists 'Dot (scalar) product' and 'Area of plane shapes' in the scope and sequence but not in the competency matrix; the numerical-methods error objective ends in a symbol that did not survive extraction (probably the error in a function, δy ≈ f′(x)δx).",
    "Not named but taught in the family because they are needed for the papers or come with a named topic: the form R sin(θ ± α) (with trigonometrical identities), the derivative of tan⁻¹x and the integral of 1/(x² + a²) (with standard derivatives and integrals; confirm), and practical maximum and minimum problems (with stationary points).",
    "Not in this syllabus (taught in the family for the other syllabi only): none of the pure concepts; the statistics and mechanics concepts belong to the ZIMSEC Statistics and Mechanics syllabi and to Cambridge 9709 Papers 4-6. Small-angle approximations, points of inflexion, differentiation from first principles and the improper partial fractions are ZIMSEC additions to the Cambridge-shared concepts (each concept description says so).",
  ],
  overview: "The ZIMSEC A-Level Pure Mathematics syllabus (Forms 5-6) builds on O-Level Mathematics and Additional Mathematics. Form 5 covers algebra (indices and variation, polynomials, partial fractions, inequalities, logarithmic, exponential and modulus functions, relations and functions), coordinate geometry and curve sketching, vectors with the scalar product, sequences and series with the binomial expansion, trigonometry, differentiation and integration, and complex numbers in Cartesian form. Form 6 adds matrices and transformations, proof by induction, groups, lines and planes in three dimensions, further series (standard sums, differences, Maclaurin and Taylor), first-order differential equations, numerical methods and further complex numbers (polar form, loci, de Moivre's theorem).",
  assessmentOverview: "Continuous assessment (topic tasks, tests, end-of-term tests and a project) carries 30% and two summative papers carry 35% each. The syllabus does not print the papers' durations or marks; our practice papers assume three hours and 120 marks each (to be confirmed).",
  components: [
    { code: "1", name: "Paper 1", kind: "WRITTEN", description: "Summative written paper on the whole syllabus (35% of the final mark). Duration, marks and structure are not printed in the syllabus.", weightingPercent: 35 },
    { code: "2", name: "Paper 2", kind: "WRITTEN", description: "Summative written paper on the whole syllabus (35% of the final mark). Duration, marks and structure are not printed in the syllabus.", weightingPercent: 35 },
    { code: "CA", name: "Continuous assessment", kind: "COURSEWORK", description: "School-based topic tasks, written tests, end-of-term tests and a project in Forms 5-6 (30% of the final mark). Not simulated on the platform.", weightingPercent: 30 },
  ],
  topics: ZP_TOPICS,
};

// =====================================================================================================================
// ZIMSEC A-Level Statistics, Forms 5-6, 2015-2022.
const ZS_TOPICS = [
  topic("data", "6.1", "Representation of data", {
    description: "Form 5.",
    children: [
      sub("data.collection", "6.1.1", "Data collection", {
        description: "Collection methods and types of data are taught in amaths.data.diagrams (covered under 6.1.2).",
        objectives: [
          "Form 5: describe different methods of collecting data and design data collection instruments.",
          "Form 5: gather data using appropriate methods and classify data types.",
        ],
      }),
      sub("data.presentation", "6.1.2", "Data presentation", {
        covers: c("data.diagrams", "data.histograms-cumulative"),
        objectives: [
          "Form 5: organise data in tabular or diagrammatic form.",
          "Form 5: construct and interpret histograms, frequency polygons, stem-and-leaf diagrams, bar graphs, box-and-whisker diagrams, pie charts, cumulative frequency curves, pictograms and line graphs.",
          "Form 5: outline the advantages and disadvantages of data presentation methods.",
        ],
      }),
      sub("data.measures", "6.1.3", "Measures of central tendency and dispersion (grouped and ungrouped data)", {
        covers: c("data.location-spread", "data.mean-sd"),
        objectives: [
          "Form 5: define and calculate the mean, mode, median, range, quartiles, percentiles, variance and standard deviation.",
          "Form 5: interpret measures of central tendency and dispersion and apply them in solving problems.",
        ],
      }),
    ],
  }),
  topic("permutations", "6.2", "Permutations and combinations", {
    description: "Form 5.",
    covers: c("counting.permutations", "counting.combinations"),
    objectives: [
      "Form 5: use the notations n!, nPr and nCr.",
      "Form 5: define permutations and combinations and solve problems on arrangements and selections.",
    ],
  }),
  topic("probability", "6.3", "Probability", {
    children: [
      sub("probability.events", "6.3.1", "Probability, events and conditional probability", {
        description: "Form 5.",
        covers: c("probability.events-rules", "probability.conditional"),
        objectives: [
          "Form 5: define probability key terms and calculate probabilities of independent, mutually exclusive, exhaustive and combined events.",
          "Form 5: solve problems involving conditional probability.",
          "Form 5: use tree diagrams, Venn diagrams and outcome tables to solve problems.",
        ],
      }),
      sub("probability.bayes", "6.3.2", "Probability with permutations and combinations; Bayes' theorem", {
        description: "Form 6. Probabilities and conditional probabilities in contexts with permutations and combinations are practised in amaths.probability.events-rules and amaths.probability.conditional.",
        covers: c("probability.bayes"),
        objectives: [
          "Form 6: calculate probabilities and conditional probabilities in contexts involving permutations and combinations.",
          "Form 6: state Bayes' theorem and use it to solve probability problems.",
        ],
      }),
    ],
  }),
  topic("discrete", "6.4", "Discrete random variables", {
    children: [
      sub("discrete.random-variables", "6.4.1", "Discrete random variables", {
        description: "Form 5.",
        covers: c("discrete.random-variables"),
        objectives: [
          "Form 5: define a random variable and construct a probability distribution table.",
          "Form 5: define expectation and calculate the mean, variance and standard deviation.",
        ],
      }),
      sub("discrete.special", "6.4.2", "Special discrete distributions", {
        description: "Form 5: uniform, binomial and geometric distributions. Form 6: Bernoulli and Poisson distributions.",
        covers: c("discrete.binomial", "discrete.geometric", "discrete.poisson"),
        objectives: [
          "Forms 5-6: outline the characteristics of the uniform, binomial, geometric, Bernoulli and Poisson distributions.",
          "Forms 5-6: calculate the mean, variance and standard deviation of each distribution.",
          "Forms 5-6: calculate probabilities and solve problems involving these distributions.",
        ],
      }),
    ],
  }),
  topic("continuous", "6.5", "Continuous distributions", {
    children: [
      sub("continuous.random-variables", "6.5.1", "Probability distribution of a continuous random variable", {
        description: "Form 5 (includes the rectangular distribution, taught with the exponential distribution under 6.5.2).",
        covers: c("continuous.pdf", "continuous.cdf"),
        objectives: [
          "Form 5: differentiate and integrate polynomial and exponential functions as needed for probability density functions.",
          "Form 5: use probability density functions and cumulative distribution functions to calculate probabilities.",
          "Form 5: calculate the mean, mode, median, variance, standard deviation and percentiles.",
          "Form 5: obtain the cumulative distribution function from the density by integration and the density from the cumulative distribution function by differentiation.",
        ],
      }),
      sub("continuous.exponential", "6.5.2", "Rectangular and exponential distributions", {
        description: "Rectangular distribution: Form 5 (listed under 6.5.1). Exponential distribution: Form 6.",
        covers: c("continuous.rectangular-exponential"),
        objectives: [
          "Form 6: integrate by parts as needed for the exponential distribution.",
          "Form 6: use the exponential probability density function to calculate probabilities, the mean, variance and standard deviation, and solve problems.",
        ],
      }),
      sub("continuous.normal", "6.5.3", "Normal distribution", {
        description: "Form 5.",
        covers: c("normal.probabilities", "normal.inverse-parameters", "normal.binomial-approximation"),
        objectives: [
          "Form 5: explain the characteristics of a normal distribution curve and standardise a random variable.",
          "Form 5: use the standard normal tables to obtain probabilities.",
          "Form 5: approximate the binomial by the normal distribution when np > 5 and nq > 5, with a continuity correction.",
          "Form 5: use the normal distribution as a model to solve problems.",
        ],
      }),
    ],
  }),
  topic("linear-combinations", "6.6", "Linear combinations of random variables", {
    description: "Form 6.",
    covers: c("rv.linear-combinations"),
    objectives: [
      "Form 6: use E(aX ± b) = aE(X) ± b, Var(aX ± b) = a²Var(X), E(aX ± bY) = aE(X) ± bE(Y) and Var(aX ± bY) = a²Var(X) + b²Var(Y) for independent X and Y.",
      "Form 6: use the facts that linear combinations of independent normal variables are normal and sums of independent Poisson variables are Poisson.",
    ],
  }),
  topic("sampling", "6.7", "Sampling and estimation", {
    children: [
      sub("sampling.form5", "6.7.1", "Sampling techniques and estimation of population parameters", {
        description: "Form 5.",
        covers: c("sampling.methods", "estimation.unbiased"),
        objectives: [
          "Form 5: distinguish between a sample and a population and between probability and non-probability sampling techniques.",
          "Form 5: apply sampling methods to identify representative samples.",
          "Form 5: calculate the sample mean, variance and standard deviation and unbiased estimates of population parameters.",
        ],
      }),
      sub("sampling.form6", "6.7.2", "The central limit theorem and confidence intervals", {
        description: "Form 6. Confidence intervals for small samples with unknown variance are taught with the t-distribution (6.8.2).",
        covers: c("sampling.sample-mean-clt", "estimation.confidence-intervals"),
        objectives: [
          "Form 6: state and use the central limit theorem, recognising the sample mean as a random variable, and identify its implications for small and large samples.",
          "Form 6: determine a confidence interval for a population mean for a normal population with known variance or a large sample with unknown variance.",
          "Form 6: determine a confidence interval for a population mean for a normal population with unknown variance from a small sample.",
          "Form 6: determine from a large sample an approximate confidence interval for a population proportion.",
        ],
      }),
    ],
  }),
  topic("inference", "6.8", "Statistical inference", {
    children: [
      sub("inference.significance", "6.8.1", "Significance testing", {
        description: "Form 5.",
        covers: c("inference.hypothesis-basics", "inference.binomial-poisson-tests", "inference.normal-mean-test", "inference.errors"),
        objectives: [
          "Form 5: formulate null and alternative hypotheses and carry out one-tailed and two-tailed tests at a stated significance level.",
          "Form 5: distinguish between Type I and Type II errors and compute their probabilities.",
          "Form 5: test a single observation from a binomial population using the binomial distribution or its normal approximation.",
          "Form 5: test a population mean using a sample from a normal distribution of known variance (z-test).",
        ],
      }),
      sub("inference.further", "6.8.2", "t-tests and chi-squared tests", {
        description: "Form 6.",
        covers: c("inference.t-distribution", "inference.chi-squared"),
        objectives: [
          "Form 6: describe the characteristics of the t and chi-squared distributions.",
          "Form 6: test a population mean using a small sample from a normal distribution of unknown variance (t-test).",
          "Form 6: use a chi-squared test for independence in a contingency table and for goodness of fit.",
        ],
      }),
    ],
  }),
  topic("bivariate", "6.9", "Bivariate data (linear regression and correlation)", {
    description: "Form 6.",
    covers: c("bivariate.regression-correlation"),
    objectives: [
      "Form 6: plot scatter diagrams and draw lines of best fit.",
      "Form 6: find the equations of least-squares regression lines.",
      "Form 6: calculate Pearson's product moment correlation coefficient and the coefficient of determination, and solve problems on regression and correlation.",
    ],
  }),
  topic("time-series", "6.10", "Time series", {
    description: "Form 5 (the competency matrix places time series in Form 5 as its topic 8).",
    covers: c("timeseries.moving-averages"),
    objectives: [
      "Form 5: define time-series key terms and identify the components of a time series.",
      "Form 5: draw time-series graphs and trend lines and identify trends.",
      "Form 5: explain the purpose of smoothing, calculate moving averages and plot moving-average graphs.",
    ],
  }),
];

const zimsecStatistics = {
  board: "zimsec",
  qualification: "a-level",
  subject: "statistics",
  versionLabel: "2015-2022",
  family: "mathematics-a",
  title: "ZIMSEC A-Level Statistics",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Statistics Syllabus, Forms 5 - 6, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at A Level",
    url: "https://www.zimsake.co.zw/softidrive/",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: ZIM_SOURCE_NOTE("Statistics", "zimsake.co.zw softidrive download 28 (Statistics)"),
  notes: [
    ...ZIM_COMMON_NOTES("Statistics", 28),
    "Topic numbering: the topic list (6.0) numbers ten topics 6.1-6.10 (Representation of data … Time series); the competency matrices number them differently within each form (Form 5 topics 1-8, Form 6 topics 1-7). This file uses the 6.0 numbers.",
    "Forms as read: Form 5 — data collection and presentation, measures of location and spread, permutations and combinations, probability (events, conditional probability, tree and Venn diagrams, outcome tables), discrete random variables with the uniform, binomial and geometric distributions, continuous random variables (pdf, cdf, rectangular distribution), the normal distribution with the binomial approximation, sampling techniques and unbiased estimates, significance testing (hypotheses, Type I and II errors, binomial and z-tests) and time series. Form 6 — probability with permutations and combinations and Bayes' theorem, the Bernoulli and Poisson distributions, the exponential distribution, linear combinations of random variables, the central limit theorem and confidence intervals (including small samples and proportions), t-tests and chi-squared tests, and linear regression and correlation.",
    "Assessment (9.0) as read: continuous assessment 30% (Form 5 practical assignment 5% and theory test 5%; Form 6 practical assignment 5%, theory test 5% and project 10%; each task marked out of 100). Summative assessment 70%: Paper 1, structured short-answer items, about 12 compulsory structured questions on all topics, 120 marks, 3 hours, 35%; Paper 2, structured short-answer items and long questions, 3 hours, 120 marks, 35%: Section A about five compulsory questions (40 marks), Section B five of seven long questions of 16 marks each (80 marks). Specification grid: Paper 1 knowledge and comprehension 60%, application and analysis 20%, problem solving 20%; Paper 2 40%, 30%, 30%.",
    "Statistical tables: the syllabus refers to standard normal tables; t and chi-squared critical values are implied by the tests. On this platform every table value (normal, binomial, Poisson, t, chi-squared) is computed in code; items state the table convention used (z to 2 decimal places, probabilities to 4).",
    "Not in this syllabus (taught in the family for Cambridge 9709 only): the Poisson approximation to the binomial and the normal approximation to the Poisson distribution (amaths.discrete.poisson-approximations), and hypothesis tests on a Poisson mean (part of amaths.inference.binomial-poisson-tests; ZIMSEC items test binomial proportions only).",
  ],
  overview: "The ZIMSEC A-Level Statistics syllabus (Forms 5-6) develops data handling and statistical inference. It covers the collection and representation of data, measures of location and spread, permutations and combinations, probability including Bayes' theorem, discrete distributions (uniform, Bernoulli, binomial, geometric, Poisson), continuous distributions (probability density and cumulative distribution functions, rectangular, exponential and normal distributions), linear combinations of random variables, sampling, estimation and confidence intervals, hypothesis testing (binomial, z, t and chi-squared tests), linear regression and correlation, and time series.",
  assessmentOverview: "Continuous assessment (practical assignments, theory tests and a project) carries 30%. The examination carries 70% in two papers of 3 hours and 120 marks each: Paper 1, about twelve compulsory structured questions (35%); Paper 2, Section A about five compulsory questions for 40 marks and Section B five of seven 16-mark questions (35%).",
  components: [
    { code: "1", name: "Paper 1", kind: "WRITTEN", description: "About twelve compulsory structured short-answer questions on all topics.", durationMinutes: 180, maxMarks: 120, weightingPercent: 35 },
    { code: "2", name: "Paper 2", kind: "WRITTEN", description: "Section A: about five compulsory questions (40 marks). Section B: candidates answer five of seven long questions of 16 marks each (80 marks).", durationMinutes: 180, maxMarks: 120, weightingPercent: 35 },
    { code: "CA", name: "Continuous assessment", kind: "COURSEWORK", description: "Practical assignments and theory tests in Forms 5 and 6 and a project (30% of the final mark). Not simulated on the platform.", weightingPercent: 30 },
  ],
  topics: ZS_TOPICS,
};

// =====================================================================================================================
// ZIMSEC A-Level Mechanics ("Mechanical Mathematics"), Forms 5-6, 2015-2022.
const ZM_TOPICS = [
  topic("vectors", "6.1", "Vectors", {
    description: "Form 5.",
    children: [
      sub("vectors.operations", "6.1.1", "Vector representation, operations, resolution and resultants", {
        covers: c("vectors.basics"),
        objectives: [
          "Form 5: represent vectors in vector notation, describe their properties and carry out vector operations.",
          "Form 5: calculate magnitudes and use unit, position and displacement vectors (triangle law, Cartesian unit vectors) to solve problems.",
          "Form 5: resolve vectors and find resultant vectors.",
        ],
      }),
      sub("vectors.paths", "6.1.2", "Vector equations of lines and paths", {
        covers: c("kinematics.vector-motion"),
        objectives: [
          "Form 5: find the vector equation of a line and of the path of a moving particle.",
          "Form 5: determine the position vector of the point of intersection of two lines.",
        ],
      }),
      sub("vectors.moments", "6.1.3", "Moment of a force", {
        covers: c("forces.moments-rigid-body"),
        objectives: ["Form 5: solve problems involving the moment of a force and the resultant moment of a system of forces."],
      }),
    ],
  }),
  topic("forces", "6.2", "Forces and equilibrium", {
    description: "Form 5.",
    children: [
      sub("forces.particle", "6.2.1", "Forces, resultants and equilibrium of a particle", {
        covers: c("forces.equilibrium"),
        objectives: [
          "Form 5: define force, identify the forces acting in a given situation and represent forces by vectors.",
          "Form 5: find resultants and components of forces and use them to formulate equations of equilibrium.",
        ],
      }),
      sub("forces.rigid-body", "6.2.2", "Equilibrium of a rigid body under coplanar forces", {
        description: "Taught with moments in amaths.forces.moments-rigid-body (covered under 6.1.3).",
        objectives: ["Form 5: solve problems involving the equilibrium of a single rigid body under the action of coplanar forces."],
      }),
      sub("forces.friction", "6.2.3", "Friction", {
        covers: c("forces.friction"),
        objectives: [
          "Form 5: represent the contact force between two surfaces by a normal force and a frictional force.",
          "Form 5: calculate friction and solve equilibrium problems with friction.",
        ],
      }),
    ],
  }),
  topic("kinematics", "6.3", "Kinematics of motion in a straight line", {
    description: "Form 5.",
    covers: c("kinematics.graphs", "kinematics.constant-acceleration", "kinematics.calculus"),
    objectives: [
      "Form 5: define distance, displacement, speed, velocity and acceleration.",
      "Form 5: use differentiation and integration with respect to time to solve problems on displacement, velocity and acceleration.",
      "Form 5: sketch and interpret distance–time, displacement–time, velocity–time and acceleration–time graphs.",
      "Form 5: derive and use the equations of motion of a particle with constant acceleration in a straight line, including vertical motion under gravity.",
    ],
  }),
  topic("newton", "6.4", "Newton's laws of motion", {
    description: "Form 5.",
    covers: c("newton.laws", "newton.connected-particles"),
    objectives: [
      "Form 5: state Newton's laws of motion and apply them to the linear motion of a body of constant mass under constant forces.",
      "Form 5: solve problems using the relationship between mass and weight.",
      "Form 5: solve problems on two particles connected by a light inextensible string, which may pass over a fixed smooth light pulley or peg.",
      "Form 5: model motion vertically or on an inclined plane as motion with constant acceleration.",
    ],
  }),
  topic("projectiles", "6.5", "Motion of a projectile", {
    description: "Form 5.",
    covers: c("projectiles.motion"),
    objectives: [
      "Form 5: model a projectile as a particle moving with constant acceleration and use horizontal and vertical equations of motion.",
      "Form 5: find the magnitude and direction of the velocity of a projectile at a given time.",
      "Form 5: find the range on a horizontal plane and the height reached, and derive formulae for the greatest height and the maximum range.",
      "Form 5: derive the Cartesian equation of the trajectory and use it to solve problems.",
    ],
  }),
  topic("momentum", "6.6", "Momentum and impulse", {
    description: "Form 5.",
    covers: c("momentum.collisions"),
    objectives: [
      "Form 5: define and calculate linear momentum and impulse.",
      "Form 5: describe the conservation of linear momentum and use it to solve problems on collisions.",
    ],
  }),
  topic("centre-of-mass", "6.7", "Centre of mass", {
    description: "Form 6.",
    covers: c("com.centre-of-mass"),
    objectives: [
      "Form 6: define the centre of gravity and the centre of mass.",
      "Form 6: determine the centre of mass of a uniform rod, circular hoop, rectangular lamina, circular disc, triangular lamina, solid or hollow cylinder and solid or hollow sphere.",
      "Form 6: determine the centre of mass of a compound lamina and solve problems on uniform and compound laminas.",
      "Form 6: solve problems on a body suspended from a point and on the toppling or sliding of a body on an inclined plane.",
    ],
  }),
  topic("elasticity", "6.8", "Elasticity", {
    description: "Form 6.",
    covers: c("elasticity.hookes-law-energy"),
    objectives: [
      "Form 6: define elasticity in strings and springs, explain Hooke's law and calculate the modulus of elasticity.",
      "Form 6: solve problems on forces due to elastic strings or springs, including problems needing work and energy.",
    ],
  }),
  topic("energy", "6.9", "Energy, work and power", {
    description: "Form 6.",
    covers: c("energy.work-energy", "energy.power"),
    objectives: [
      "Form 6: explain gravitational, elastic and kinetic energy and solve problems using the principle of conservation of energy.",
      "Form 6: describe the work done by a force and calculate the work done by a constant force.",
      "Form 6: define and calculate power, and solve problems on energy, work and power.",
    ],
  }),
  topic("circular-motion", "6.10", "Circular motion (vertical and horizontal)", {
    description: "Form 6.",
    covers: c("circular.motion"),
    objectives: [
      "Form 6: explain and calculate angular speed and the acceleration of a particle moving in a circle with constant speed, and relate angular and linear speed.",
      "Form 6: solve problems modelled as motion in a horizontal or vertical circle.",
      "Form 6: calculate the tension and angular speed in a conical pendulum and solve problems on banked tracks.",
    ],
  }),
  topic("variable-force", "6.11", "Linear motion under a variable force", {
    description: "Form 6.",
    covers: c("variable.force"),
    objectives: [
      "Form 6: use differentiation to obtain velocity and acceleration, and express displacement as a function of time, velocity as a function of displacement and acceleration as a function of velocity.",
      "Form 6: solve problems on a particle moving under a variable force by setting up and solving differential equations.",
    ],
  }),
  topic("shm", "6.12", "Simple harmonic motion", {
    description: "Form 6.",
    covers: c("shm.motion"),
    objectives: [
      "Form 6: define simple harmonic motion and use the standard formulae.",
      "Form 6: formulate differential equations of motion leading to simple harmonic motion and solve them to obtain the period and amplitude.",
    ],
  }),
];

const zimsecMechanics = {
  board: "zimsec",
  qualification: "a-level",
  subject: "mechanics",
  versionLabel: "2015-2022",
  family: "mathematics-a",
  title: "ZIMSEC A-Level Mechanics (Mechanical Mathematics)",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Mechanical Mathematics Syllabus, Forms 5 - 6, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at A Level",
    url: "https://www.zimsake.co.zw/softidrive/",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: ZIM_SOURCE_NOTE("Mechanical Mathematics", "zimsake.co.zw softidrive download 37 (Mechanical Mathematics)"),
  notes: [
    ...ZIM_COMMON_NOTES("Mechanical Mathematics", 37),
    "Name: the catalogue subject is 'Mechanics' (zimsec/a-level/mechanics); the Ministry document is titled 'Mechanical Mathematics'. Confirm with ZIMSEC whether the examined subject name and code are Mechanical Mathematics.",
    "Forms as read (scope and sequence 7.0 and the competency matrices 8.1 and 8.2): Form 5 — vectors (including moments), forces and equilibrium (particles and rigid bodies, friction), kinematics in a straight line, Newton's laws, projectiles, momentum and impulse. Form 6 — centre of mass, elasticity, energy, work and power, circular motion, motion under a variable force and simple harmonic motion.",
    "Assessment (9.0) as read: continuous assessment 30% (topic tasks, written tests, end-of-term tests and a project in four terms, 7.5% each). Summative assessment 70% in two papers of 3 hours each: Paper 1, about 15 compulsory short-answer structured questions, 100 marks, 35%; Paper 2, eight structured questions of 20 marks of which candidates answer any five, 100 marks, 35%. Specification grid: Paper 1 knowledge and comprehension 50%, application and analysis 40%, synthesis and evaluation 10%; Paper 2 30%, 50%, 20%.",
    "Read with uncertainty: the circular-motion objectives speak of motion in a vertical circle 'with constant speed' (vertical circles with varying speed and energy methods are usual at this level; confirm the depth); the value of g is not printed (every item states the value it uses); impulse and impulsive forces are named but the coefficient of restitution is not (excluded).",
    "Not in this syllabus (taught in the family for the other syllabi): all pure mathematics except vectors (the calculus and trigonometry needed come from ZIMSEC Pure Mathematics), and all statistics.",
  ],
  overview: "The ZIMSEC A-Level Mechanics syllabus (the Ministry's Mechanical Mathematics, Forms 5-6) models the motion and equilibrium of particles and rigid bodies. Form 5 covers vectors and moments, forces and equilibrium with friction, kinematics in a straight line, Newton's laws of motion including connected particles, projectiles, and momentum and impulse. Form 6 covers centres of mass, elasticity, energy, work and power, circular motion, linear motion under a variable force and simple harmonic motion.",
  assessmentOverview: "Continuous assessment (topic tasks, tests and a project) carries 30%. The examination carries 70% in two 3-hour papers of 100 marks: Paper 1, about fifteen compulsory short structured questions (35%); Paper 2, any five of eight 20-mark structured questions (35%).",
  components: [
    { code: "1", name: "Paper 1", kind: "WRITTEN", description: "About fifteen compulsory short-answer structured questions.", durationMinutes: 180, maxMarks: 100, weightingPercent: 35 },
    { code: "2", name: "Paper 2", kind: "WRITTEN", description: "Eight structured questions of 20 marks each; candidates answer any five.", durationMinutes: 180, maxMarks: 100, weightingPercent: 35 },
    { code: "CA", name: "Continuous assessment", kind: "COURSEWORK", description: "School-based topic tasks, written tests, end-of-term tests and a project in Forms 5-6 (30% of the final mark). Not simulated on the platform.", weightingPercent: 30 },
  ],
  topics: ZM_TOPICS,
};

// =====================================================================================================================
// Cambridge International AS & A Level Mathematics 9709, 2026-2027. Section and topic numbers (1-6, 1.1-6.5) are the
// board's. The bullets are not numbered in the syllabus: objective codes are ours (topic number + bullet position).
// Papers 2 and 3 share most content (Paper 2 content is "largely a subset" of Paper 3): it is listed once, in one
// section for both papers, with node components ["2", "3"]; Paper-3-only nodes have ["3"] and the Paper-2-only node
// (the trapezium rule) ["2"]. Shared bullets carry their Paper 3 code; sub-topic codes such as 3.1a are ours.
const P23 = ["2", "3"];
const P3 = ["3"];
const C9709_TOPICS = [
  section("pure-1", "1", "Pure Mathematics 1 (Paper 1)", {
    description: "AS Level and A Level (compulsory for both).",
    components: ["1"],
    children: [
      topic("pure-1.quadratics", "1.1", "Quadratics", {
        covers: c("quadratics.completing-square-discriminant", "quadratics.equations-inequalities"),
        objectives: [
          "Complete the square for ax² + bx + c and use the completed-square form (vertex, sketch).",
          "Find and use the discriminant, including the number of real roots and repeated roots.",
          "Solve quadratic equations and quadratic inequalities in one unknown.",
          "Solve by substitution a pair of simultaneous equations, one linear and one quadratic.",
          "Recognise and solve equations in x that are quadratic in some function of x.",
        ],
      }),
      topic("pure-1.functions", "1.2", "Functions", {
        covers: c("functions.domain-range", "functions.composite-inverse", "functions.transformations"),
        objectives: [
          "Understand function, domain, range, one-one function, inverse function and composition of functions.",
          "Identify the range of a given function in simple cases and find the composition of two given functions.",
          "Determine whether a function is one-one and find the inverse of a one-one function in simple cases.",
          "Illustrate graphically the relation between a one-one function and its inverse.",
          "Understand and use the transformations y = f(x) + a, y = f(x + a), y = af(x), y = f(ax) and simple combinations of them.",
        ],
      }),
      topic("pure-1.coordinate", "1.3", "Coordinate geometry", {
        covers: c("coordinate.straight-lines", "coordinate.circles"),
        objectives: [
          "Find the equation of a straight line given sufficient information.",
          "Interpret and use the forms y = mx + c, y − y₁ = m(x − x₁) and ax + by + c = 0.",
          "Understand that (x − a)² + (y − b)² = r² is the circle with centre (a, b) and radius r.",
          "Solve problems on lines and circles with algebraic methods.",
          "Relate a graph to its equation and use points of intersection of graphs to solve equations.",
        ],
      }),
      topic("pure-1.circular", "1.4", "Circular measure", {
        covers: c("trig.radians-arcs-sectors"),
        objectives: [
          "Understand the radian and convert between radians and degrees.",
          "Use s = rθ and A = ½r²θ to solve problems on arc length and sector area.",
        ],
      }),
      topic("pure-1.trigonometry", "1.5", "Trigonometry", {
        covers: c("trig.graphs-exact-values", "trig.basic-identities-equations"),
        objectives: [
          "Sketch and use the graphs of sine, cosine and tangent for angles of any size in degrees or radians.",
          "Use the exact values of sine, cosine and tangent of 30°, 45°, 60° and related angles.",
          "Use the notations sin⁻¹x, cos⁻¹x and tan⁻¹x for principal values.",
          "Use the identities tan θ ≡ sin θ / cos θ and sin²θ + cos²θ ≡ 1.",
          "Find all the solutions of simple trigonometric equations in a specified interval.",
        ],
      }),
      topic("pure-1.series", "1.6", "Series", {
        covers: c("series.binomial-positive", "series.arithmetic", "series.geometric"),
        objectives: [
          "Use the expansion of (a + b)ⁿ for a positive integer n.",
          "Recognise arithmetic and geometric progressions.",
          "Use the nth-term and sum formulae to solve problems on arithmetic and geometric progressions.",
          "Use the condition for convergence of a geometric progression and its sum to infinity.",
        ],
      }),
      topic("pure-1.differentiation", "1.7", "Differentiation", {
        covers: c("diff.first-principles", "diff.powers-chain", "diff.applications", "diff.stationary-points"),
        objectives: [
          "Understand the gradient of a curve as the limit of gradients of chords, and use the derivative notations.",
          "Differentiate xⁿ for rational n, with constant multiples, sums, differences and composites (chain rule).",
          "Apply differentiation to gradients, tangents and normals, increasing and decreasing functions and rates of change.",
          "Locate stationary points, determine their nature and use them in sketching graphs.",
        ],
      }),
      topic("pure-1.integration", "1.8", "Integration", {
        covers: c("integ.reverse-powers", "integ.definite-area", "integ.volumes"),
        objectives: [
          "Understand integration as reverse differentiation and integrate (ax + b)ⁿ for rational n ≠ −1 with constant multiples, sums and differences.",
          "Solve problems involving the constant of integration.",
          "Evaluate definite integrals.",
          "Use definite integration for areas (curve and lines parallel to the axes, curve and line, two curves) and volumes of revolution about either axis.",
        ],
      }),
    ],
  }),
  section("pure-2-3", "2-3", "Pure Mathematics 2 and Pure Mathematics 3 (Papers 2 and 3)", {
    description: "Paper 2 (AS Level only) and Paper 3 (A Level only) are alternatives: a candidate never takes both in one series. Paper 2 content (topics 2.1-2.6) is largely a subset of Paper 3 content (3.1-3.6) and is listed once; node components show which paper examines each part. Both papers assume the Paper 1 content.",
    children: [
      topic("pure-2-3.algebra", "2.1, 3.1", "Algebra", {
        children: [
          sub("pure-2-3.algebra.modulus", "3.1a", "The modulus function", {
            components: P23,
            covers: c("algebra.modulus"),
            objectives: [["3.1.1", "Papers 2 and 3: understand |x|, sketch y = |ax + b| and use |a| = |b| ⇔ a² = b² and |x − a| < b ⇔ a − b < x < a + b in equations and inequalities."]],
          }),
          sub("pure-2-3.algebra.polynomials", "3.1b", "Polynomial division; the factor and remainder theorems", {
            components: P23,
            covers: c("algebra.polynomials"),
            objectives: [
              ["3.1.2", "Papers 2 and 3: divide a polynomial of degree up to 4 by a linear or quadratic polynomial, identifying quotient and remainder."],
              ["3.1.3", "Papers 2 and 3: use the factor and remainder theorems."],
            ],
          }),
          sub("pure-2-3.algebra.partial-fractions", "3.1c", "Partial fractions", {
            components: P3,
            covers: c("algebra.partial-fractions"),
            objectives: [["3.1.4", "Paper 3: express rational functions in partial fractions with denominators no more complicated than (ax + b)(cx + d)(ex + f), (ax + b)(cx + d)² and (ax + b)(cx² + d)."]],
          }),
          sub("pure-2-3.algebra.binomial", "3.1d", "The binomial expansion for a rational index", {
            components: P3,
            covers: c("series.binomial-rational"),
            objectives: [["3.1.5", "Paper 3: use the expansion of (1 + x)ⁿ for rational n and |x| < 1."]],
          }),
        ],
      }),
      topic("pure-2-3.logarithms", "2.2, 3.2", "Logarithmic and exponential functions", {
        components: P23,
        covers: c("functions.exponential-log", "functions.logarithms", "functions.linear-law"),
        objectives: [
          ["3.2.1", "Papers 2 and 3: relate logarithms to indices and use the laws of logarithms (excluding change of base)."],
          ["3.2.2", "Papers 2 and 3: understand the definition, properties and graphs of eˣ and ln x as inverse functions."],
          ["3.2.3", "Papers 2 and 3: use logarithms to solve equations and inequalities in which the unknown appears in an index."],
          ["3.2.4", "Papers 2 and 3: transform a relationship to linear form with logarithms and find unknown constants from the gradient or intercept."],
        ],
      }),
      topic("pure-2-3.trigonometry", "2.3, 3.3", "Trigonometry", {
        components: P23,
        covers: c("trig.reciprocal-functions", "trig.compound-double-angle", "trig.harmonic-form"),
        objectives: [
          ["3.3.1", "Papers 2 and 3: relate sec, cosec and cot to cos, sin and tan, and use the properties and graphs of all six functions."],
          ["3.3.2", "Papers 2 and 3: use identities, including sec²θ ≡ 1 + tan²θ, cosec²θ ≡ 1 + cot²θ, the compound-angle and double-angle formulae and the forms R sin(θ ± α) and R cos(θ ± α), to simplify, evaluate exactly and solve equations."],
        ],
      }),
      topic("pure-2-3.differentiation", "2.4, 3.4", "Differentiation", {
        description: "The derivative of tan⁻¹x is Paper 3 only.",
        components: P23,
        covers: c("diff.exp-log-trig", "diff.product-quotient", "diff.implicit-parametric"),
        objectives: [
          ["3.4.1", "Papers 2 and 3: use the derivatives of eˣ, ln x, sin x, cos x and tan x (and, Paper 3 only, tan⁻¹x) with constant multiples, sums, differences and composites."],
          ["3.4.2", "Papers 2 and 3: differentiate products and quotients."],
          ["3.4.3", "Papers 2 and 3: find and use the first derivative of a function defined parametrically or implicitly."],
        ],
      }),
      topic("pure-2-3.integration", "2.5, 3.5", "Integration", {
        children: [
          sub("pure-2-3.integration.standard", "3.5a", "Standard integrals and trigonometric relationships", {
            description: "The integral of 1/(x² + a²) is Paper 3 only.",
            components: P23,
            covers: c("integ.standard-functions"),
            objectives: [
              ["3.5.1", "Papers 2 and 3: integrate e^(ax+b), 1/(ax + b), sin(ax + b), cos(ax + b), sec²(ax + b) and (Paper 3 only) 1/(x² + a²)."],
              ["3.5.2", "Papers 2 and 3: use trigonometric relationships in carrying out integration."],
            ],
          }),
          sub("pure-2-3.integration.trapezium", "2.5b", "The trapezium rule", {
            components: ["2"],
            covers: c("numerical.trapezium-errors"),
            objectives: [["2.5.3", "Paper 2: understand and use the trapezium rule to estimate a definite integral, and decide from a sketch whether it over- or under-estimates."]],
          }),
          sub("pure-2-3.integration.recognition", "3.5b", "Integration by recognition and by substitution", {
            components: P3,
            covers: c("integ.recognition-substitution"),
            objectives: [
              ["3.5.4", "Paper 3: recognise an integrand of the form k f′(x)/f(x) and integrate it."],
              ["3.5.6", "Paper 3: use a given substitution to simplify and evaluate a definite or indefinite integral."],
            ],
          }),
          sub("pure-2-3.integration.partial-fractions", "3.5c", "Integration using partial fractions", {
            components: P3,
            covers: c("integ.partial-fractions"),
            objectives: [["3.5.3", "Paper 3: integrate rational functions by decomposition into partial fractions."]],
          }),
          sub("pure-2-3.integration.by-parts", "3.5d", "Integration by parts", {
            components: P3,
            covers: c("integ.by-parts"),
            objectives: [["3.5.5", "Paper 3: recognise when an integrand is usefully a product and use integration by parts."]],
          }),
        ],
      }),
      topic("pure-2-3.numerical", "2.6, 3.6", "Numerical solution of equations", {
        components: P23,
        covers: c("numerical.locating-roots"),
        objectives: [
          ["3.6.1", "Papers 2 and 3: locate a root approximately by graphical considerations or a change of sign."],
          ["3.6.2", "Papers 2 and 3: understand and use the notation for a sequence of approximations converging to a root."],
          ["3.6.3", "Papers 2 and 3: relate an iterative formula xₙ₊₁ = F(xₙ) to the equation being solved and use it to find a root to a prescribed accuracy."],
        ],
      }),
      topic("pure-2-3.vectors", "3.7", "Vectors", {
        components: P3,
        covers: c("vectors.basics", "vectors.scalar-product", "vectors.lines"),
        objectives: [
          "Paper 3: use standard vector notations in two and three dimensions.",
          "Paper 3: add and subtract vectors and multiply by scalars, interpreting the operations geometrically.",
          "Paper 3: calculate magnitudes and use unit, displacement and position vectors.",
          "Paper 3: understand and find the equation of a line r = a + tb.",
          "Paper 3: determine whether two lines are parallel, intersect or are skew, and find their point of intersection.",
          "Paper 3: calculate scalar products and use them in problems on lines and points.",
        ],
      }),
      topic("pure-2-3.differential-equations", "3.8", "Differential equations", {
        components: P3,
        covers: c("de.separable"),
        objectives: [
          "Paper 3: formulate a simple statement about a rate of change as a differential equation.",
          "Paper 3: find the general solution of a first-order differential equation with separable variables.",
          "Paper 3: use an initial condition to find a particular solution.",
          "Paper 3: interpret the solution in the context of the problem modelled.",
        ],
      }),
      topic("pure-2-3.complex", "3.9", "Complex numbers", {
        components: P3,
        covers: c("complex.cartesian", "complex.argand-polar", "complex.polynomial-equations", "complex.loci"),
        objectives: [
          "Paper 3: understand complex numbers, real and imaginary parts, modulus, argument and conjugate, and equality of complex numbers.",
          "Paper 3: add, subtract, multiply and divide complex numbers in Cartesian form.",
          "Paper 3: use the fact that non-real roots of a real polynomial occur in conjugate pairs.",
          "Paper 3: represent complex numbers on an Argand diagram.",
          "Paper 3: multiply and divide complex numbers in polar form r(cos θ + i sin θ) = re^(iθ).",
          "Paper 3: find the two square roots of a complex number.",
          "Paper 3: understand the geometric effects of conjugating, adding, subtracting, multiplying and dividing.",
          "Paper 3: illustrate simple equations and inequalities by loci in an Argand diagram.",
        ],
      }),
    ],
  }),
  section("mechanics", "4", "Mechanics (Paper 4)", {
    description: "AS Level and A Level. Particles only; g = 10 m s⁻²; vector notation is not used in the question papers.",
    components: ["4"],
    children: [
      topic("mechanics.forces", "4.1", "Forces and equilibrium", {
        covers: c("forces.equilibrium", "forces.friction"),
        objectives: [
          "Identify the forces acting in a situation.",
          "Understand the vector nature of force and find and use components and resultants.",
          "Use the principle that the forces on a particle in equilibrium have zero vector sum (components in any direction sum to zero).",
          "Represent a contact force by normal and frictional components and use the smooth-contact model, understanding its limitations.",
          "Understand limiting friction and limiting equilibrium, recall the coefficient of friction and use F = μR or F ≤ μR.",
          "Use Newton's third law.",
        ],
      }),
      topic("mechanics.kinematics", "4.2", "Kinematics of motion in a straight line", {
        covers: c("kinematics.graphs", "kinematics.constant-acceleration", "kinematics.calculus"),
        objectives: [
          "Distinguish distance and speed (scalars) from displacement, velocity and acceleration (vectors).",
          "Sketch and interpret displacement–time and velocity–time graphs, using areas and gradients.",
          "Use differentiation and integration with respect to time for displacement, velocity and acceleration.",
          "Use the formulae for motion with constant acceleration in a straight line.",
        ],
      }),
      topic("mechanics.momentum", "4.3", "Momentum", {
        covers: c("momentum.collisions"),
        objectives: [
          "Use the definition of linear momentum and its vector nature (one dimension).",
          "Use conservation of linear momentum for the direct impact of two bodies, including coalescence.",
        ],
      }),
      topic("mechanics.newton", "4.4", "Newton's laws of motion", {
        covers: c("newton.laws", "newton.connected-particles"),
        objectives: [
          "Apply Newton's laws to the linear motion of a particle of constant mass under constant forces, including friction, tension and thrust.",
          "Use the relationship between mass and weight.",
          "Solve problems on motion vertically or on an inclined plane with constant acceleration.",
          "Solve problems on connected particles.",
        ],
      }),
      topic("mechanics.energy", "4.5", "Energy, work and power", {
        covers: c("energy.work-energy", "energy.power"),
        objectives: [
          "Calculate the work done by a constant force whose point of application moves, not necessarily along the force.",
          "Use the formulae for gravitational potential energy and kinetic energy.",
          "Relate the change in energy of a system to the work done by external forces and use conservation of energy where appropriate.",
          "Use power as the rate of doing work and P = Fv for a force along the motion.",
          "Solve problems such as the instantaneous acceleration of a car on a hill against resistance.",
        ],
      }),
    ],
  }),
  section("statistics-1", "5", "Probability & Statistics 1 (Paper 5)", {
    description: "AS Level and A Level (compulsory for A Level).",
    components: ["5"],
    children: [
      topic("statistics-1.data", "5.1", "Representation of data", {
        covers: c("data.diagrams", "data.histograms-cumulative", "data.location-spread", "data.mean-sd"),
        objectives: [
          "Select a suitable way of presenting raw data and discuss its advantages and disadvantages.",
          "Draw and interpret stem-and-leaf diagrams, box-and-whisker plots, histograms and cumulative frequency graphs.",
          "Understand and use measures of central tendency and variation.",
          "Use a cumulative frequency graph to estimate medians, quartiles, percentiles and proportions.",
          "Calculate and use the mean and standard deviation from data, totals or coded totals, for up to two data sets.",
        ],
      }),
      topic("statistics-1.permutations", "5.2", "Permutations and combinations", {
        covers: c("counting.permutations", "counting.combinations"),
        objectives: [
          "Understand permutation and combination and solve simple problems on selections.",
          "Solve problems on arrangements in a line with repetition and restriction.",
        ],
      }),
      topic("statistics-1.probability", "5.3", "Probability", {
        covers: c("probability.events-rules", "probability.conditional"),
        objectives: [
          "Evaluate probabilities by enumerating equiprobable outcomes or with permutations and combinations.",
          "Add and multiply probabilities in simple cases.",
          "Understand exclusive and independent events and test independence with P(A ∩ B) and P(A) × P(B).",
          "Calculate and use conditional probabilities in simple cases.",
        ],
      }),
      topic("statistics-1.discrete", "5.4", "Discrete random variables", {
        covers: c("discrete.random-variables", "discrete.binomial", "discrete.geometric"),
        objectives: [
          "Draw up a probability distribution table for a discrete random variable and calculate E(X) and Var(X).",
          "Use the binomial and geometric probability formulae and recognise situations they model.",
          "Use the mean and variance of the binomial distribution and the expectation of the geometric distribution.",
        ],
      }),
      topic("statistics-1.normal", "5.5", "The normal distribution", {
        covers: c("normal.probabilities", "normal.inverse-parameters", "normal.binomial-approximation"),
        objectives: [
          "Use a normal distribution to model a continuous random variable and use normal tables.",
          "Find probabilities such as P(X > x₁) given x₁, μ and σ.",
          "Find a relationship between x₁, μ and σ from a given probability.",
          "Recall the conditions for the normal approximation to the binomial and use it with a continuity correction.",
        ],
      }),
    ],
  }),
  section("statistics-2", "6", "Probability & Statistics 2 (Paper 6)", {
    description: "A Level only. Assumes Paper 5 and the calculus of Paper 3.",
    components: ["6"],
    children: [
      topic("statistics-2.poisson", "6.1", "The Poisson distribution", {
        covers: c("discrete.poisson", "discrete.poisson-approximations"),
        objectives: [
          "Calculate probabilities for Po(λ) and use mean = variance = λ.",
          "Understand the relevance of the Poisson distribution to random events and use it as a model.",
          "Use the Poisson approximation to the binomial where appropriate.",
          "Use the normal approximation, with continuity correction, to the Poisson where appropriate.",
        ],
      }),
      topic("statistics-2.linear-combinations", "6.2", "Linear combinations of random variables", {
        covers: c("rv.linear-combinations"),
        objectives: ["Use the expectation and variance results for linear combinations, and the distributions of linear combinations of independent normal and of sums of independent Poisson variables."],
      }),
      topic("statistics-2.continuous", "6.3", "Continuous random variables", {
        covers: c("continuous.pdf"),
        objectives: [
          "Understand continuous random variables and recall and use properties of a probability density function.",
          "Use a probability density function for probabilities, the mean and the variance.",
        ],
      }),
      topic("statistics-2.sampling", "6.4", "Sampling and estimation", {
        covers: c("sampling.methods", "sampling.sample-mean-clt", "estimation.unbiased", "estimation.confidence-intervals"),
        objectives: [
          "Distinguish a sample from a population and appreciate the need for randomness.",
          "Explain why a given sampling method may be unsatisfactory.",
          "Treat a sample mean as a random variable with E(X̄) = μ and Var(X̄) = σ²/n, normal when X is normal, and use the central limit theorem.",
          "Calculate unbiased estimates of population mean and variance from raw or summarised data.",
          "Determine and interpret a confidence interval for a population mean (normal with known variance, or large sample).",
          "Determine from a large sample an approximate confidence interval for a population proportion.",
        ],
      }),
      topic("statistics-2.hypothesis-tests", "6.5", "Hypothesis tests", {
        covers: c("inference.hypothesis-basics", "inference.binomial-poisson-tests", "inference.normal-mean-test", "inference.errors"),
        objectives: [
          "Understand the nature of a hypothesis test, one- and two-tailed tests and the associated terms.",
          "Test a single observation from a binomial or Poisson distribution, directly or by a normal approximation.",
          "Test a population mean (normal with known variance, or large sample).",
          "Understand Type I and Type II errors and calculate their probabilities in specific situations.",
        ],
      }),
    ],
  }),
];

const c9709 = {
  board: "cambridge",
  qualification: "a-level",
  subject: "mathematics",
  versionLabel: "2026-2027",
  family: "mathematics-a",
  title: "Cambridge International AS & A Level Mathematics (9709)",
  code: "9709",
  effectiveFrom: "2026-01-01",
  effectiveTo: "2027-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge International AS & A Level Mathematics 9709 syllabus for examination in 2026 and 2027 (version 4, December 2025)",
    url: "https://www.cambridgeinternational.org/Images/697427-2026-2027-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Section and topic names and numbers (1 Pure Mathematics 1 to 6 Probability & Statistics 2; topics 1.1 to 6.5) are transcribed from the subject content of the official syllabus. The learning-outcome bullets are not numbered in the syllabus: objective codes are ours (topic number plus the bullet's position), content shared by Papers 2 and 3 is listed once with its Paper 3 code, and sub-topic codes such as 3.1a are ours. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Read 2026-10-09 from the official PDF (version 4, published December 2025, for examination in June and November 2026 and 2027): the content overview, the structure and routes, the assessment overview, the assessment objectives, the subject content of all six components with notes and examples, and the details of the assessment (degrees of accuracy, calculators, command words).",
    "Syllabus update applied: the separate update notice lists version 2 (November 2024: headers on page 14 updated), version 3 (February 2025: typographical errors on pages 21, 26 and 28 corrected) and version 4 (December 2025: a weblink on page 56 updated). The PDF read is version 4, so all three changes are already in it; none affects topics, papers, timings or marks. Specimen materials were not updated.",
    "Assessment as read: Paper 1 Pure Mathematics 1, 1 hour 50 minutes, 75 marks, 10-12 structured questions, 60% of AS Level, 30% of A Level, compulsory for both. Paper 2 Pure Mathematics 2, 1 hour 15 minutes, 50 marks, 6-8 structured questions, 40% of AS Level, AS only. Paper 3 Pure Mathematics 3, 1 hour 50 minutes, 75 marks, 9-11 structured questions, 30% of A Level, compulsory for A Level. Paper 4 Mechanics, 1 hour 15 minutes, 50 marks, 6-8 questions, 40% of AS / 20% of A Level. Paper 5 Probability & Statistics 1, 1 hour 15 minutes, 50 marks, 6-8 questions, 40% of AS / 20% of A Level, compulsory for A Level. Paper 6 Probability & Statistics 2, 1 hour 15 minutes, 50 marks, 6-8 questions, 20% of A Level, A Level only. All questions compulsory; parts labelled (a), (b), (c) with sub-parts (i), (ii), (iii). AO1 knowledge and understanding 55%, AO2 application and communication 45% (Paper 3: 45% / 55%; A Level overall 52% / 48%).",
    "Routes as read: AS Level is Paper 1 with Paper 2, Paper 4 or Paper 5 (the Paper 1 + Paper 2 route cannot be carried forward to A Level). A Level is Papers 1 and 3 with either Papers 4 and 5 or Papers 5 and 6 (Papers 4 and 6 cannot be combined, because Paper 6 needs Paper 5), taken in one series (linear) or staged over two years with the AS result carried forward. AS grades a-e; A Level grades A*-E. weightingPercent is left out of the components because each paper's share depends on the route; the shares are in the descriptions.",
    "Conventions as read: non-exact answers to 3 significant figures (angles in degrees to 1 decimal place) unless stated; a scientific calculator in every paper (no graphical or symbolic calculators); full working needed; the list of formulae and statistical tables MF19 is supplied (on this platform table values are computed in code). Mechanics uses g = 10 m s⁻² and treats every body as a particle.",
    "Exclusions printed in the content include: graphs of y = |f(x)| and y = f(|x|) for non-linear f; change of base of logarithms; points of inflexion; general solutions of trigonometric equations; the greatest term and properties of binomial coefficients; the general term of the rational binomial expansion; derivatives of sin⁻¹x and cos⁻¹x; the general method of integration by substitution (Paper 2); the convergence condition for iterations; the vector product, the shortest distance between skew lines and the common perpendicular; impulse and the coefficient of restitution; arrangements in a circle; the explicit general addition rule; the cumulative distribution function; particular sampling methods such as quota or stratified sampling.",
    "This version covers the 2026 and 2027 examinations; create a new version file when the syllabus for 2028 onwards is published (do not edit this one after publication).",
    "Not in this syllabus (taught in the family for ZIMSEC only): indices and variation, matrices, proof by induction, groups, curve sketching as a topic, small-angle approximations, standard sums and the method of differences, Maclaurin and Taylor series, the Newton–Raphson method and numerical errors, the vector product and planes, de Moivre's theorem, Bayes' theorem, the discrete uniform and Bernoulli distributions, cumulative distribution functions, the rectangular and exponential distributions, t-tests and chi-squared tests, regression and correlation, time series, moments and rigid bodies, vectors in kinematics, projectiles, impulse, centres of mass, elasticity, circular motion, variable forces and simple harmonic motion.",
  ],
  overview: "Cambridge International AS & A Level Mathematics has six components. Pure Mathematics 1 (quadratics, functions, coordinate geometry, circular measure, trigonometry, series, differentiation and integration) is the foundation for all the others. Pure Mathematics 2 (AS Level only) and Pure Mathematics 3 (A Level) extend it with the modulus function, polynomials, logarithms and exponentials, further trigonometry, differentiation, integration and numerical methods; Paper 3 adds partial fractions, the general binomial expansion, vectors, differential equations and complex numbers. Mechanics covers forces and equilibrium, kinematics, momentum, Newton's laws and energy, work and power. Probability & Statistics 1 covers data, permutations and combinations, probability, discrete distributions and the normal distribution; Probability & Statistics 2 covers the Poisson distribution, linear combinations, continuous random variables, sampling and estimation, and hypothesis tests.",
  assessmentOverview: "AS Level: Paper 1 (1 h 50 min, 75 marks, 60%) with Paper 2, 4 or 5 (1 h 15 min, 50 marks, 40%). A Level: Papers 1 and 3 (each 1 h 50 min, 75 marks, 30%) with Papers 4 and 5 or Papers 5 and 6 (each 1 h 15 min, 50 marks, 20%). All papers are written, externally marked, with compulsory structured questions; a calculator is allowed in all papers.",
  components: [
    { code: "1", name: "Paper 1: Pure Mathematics 1", kind: "WRITTEN", description: "10-12 structured questions on Pure Mathematics 1. 60% of AS Level, 30% of A Level; compulsory for both.", durationMinutes: 110, maxMarks: 75, calculatorAllowed: true },
    { code: "2", name: "Paper 2: Pure Mathematics 2", kind: "WRITTEN", description: "6-8 structured questions on Pure Mathematics 2. 40% of AS Level; AS Level only (cannot count towards A Level).", durationMinutes: 75, maxMarks: 50, calculatorAllowed: true },
    { code: "3", name: "Paper 3: Pure Mathematics 3", kind: "WRITTEN", description: "9-11 structured questions on Pure Mathematics 3. 30% of A Level; A Level only, compulsory.", durationMinutes: 110, maxMarks: 75, calculatorAllowed: true },
    { code: "4", name: "Paper 4: Mechanics", kind: "WRITTEN", description: "6-8 structured questions on Mechanics. 40% of AS Level, 20% of A Level.", durationMinutes: 75, maxMarks: 50, calculatorAllowed: true },
    { code: "5", name: "Paper 5: Probability & Statistics 1", kind: "WRITTEN", description: "6-8 structured questions on Probability & Statistics 1. 40% of AS Level, 20% of A Level; compulsory for A Level.", durationMinutes: 75, maxMarks: 50, calculatorAllowed: true },
    { code: "6", name: "Paper 6: Probability & Statistics 2", kind: "WRITTEN", description: "6-8 structured questions on Probability & Statistics 2. 20% of A Level; A Level only (not with Paper 4).", durationMinutes: 75, maxMarks: 50, calculatorAllowed: true },
  ],
  routes: [
    {
      code: "AS",
      name: "AS Level",
      description: "Paper 1 and one of Paper 2 (pure only; cannot be carried forward to A Level), Paper 4 or Paper 5, in the same series. Grades a-e.",
      components: [
        "1",
        { code: "2", compulsory: false, choiceGroup: "Second AS paper" },
        { code: "4", compulsory: false, choiceGroup: "Second AS paper" },
        { code: "5", compulsory: false, choiceGroup: "Second AS paper" },
      ],
    },
    {
      code: "A",
      name: "A Level",
      description: "Papers 1, 3 and 5 with either Paper 4 or Paper 6 (Papers 4 and 6 cannot be combined), linear or staged over two years. Grades A*-E.",
      isDefault: true,
      components: [
        "1",
        "3",
        "5",
        { code: "4", compulsory: false, choiceGroup: "Fourth paper" },
        { code: "6", compulsory: false, choiceGroup: "Fourth paper" },
      ],
    },
  ],
  topics: C9709_TOPICS,
};

// =====================================================================================================================
// Checks: every covered concept exists, each concept is covered at most once per syllabus (on a node without
// children), every concept is covered by at least one syllabus, node keys and objective codes are unique, node codes are
// unique; report what each syllabus leaves out.
const SYLLABI = [zimsecPure, zimsecStatistics, zimsecMechanics, c9709];
const coveredAnywhere = new Set();
const coverage = {};
for (const s of SYLLABI) {
  const id = `${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}`;
  const seen = new Map();
  const codes = new Set();
  const nodeCodes = new Set();
  const keys = new Set();
  const compCodes = new Set(s.components.map((x) => x.code));
  let nodes = 0;
  const walk = (list) => {
    for (const n of list) {
      nodes++;
      if (keys.has(n.key)) throw new Error(`${id}: duplicate node key ${n.key}`);
      keys.add(n.key);
      if (n.code) {
        if (nodeCodes.has(n.code)) throw new Error(`${id}: duplicate node code ${n.code}`);
        nodeCodes.add(n.code);
      }
      for (const comp of n.components ?? []) if (!compCodes.has(comp)) throw new Error(`${id}: ${n.key} names unknown component ${comp}`);
      if ((n.covers ?? []).length && (n.children ?? []).length) throw new Error(`${id}: ${n.key} covers concepts and has children (cover on the most specific node)`);
      for (const k of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(k)) throw new Error(`${id}: unknown concept ${k} on ${n.key}`);
        if (seen.has(k)) throw new Error(`${id}: ${k} covered on ${seen.get(k)} and ${n.key}`);
        seen.set(k, n.key);
        coveredAnywhere.add(k);
      }
      for (const o of n.objectives ?? []) {
        if (codes.has(o.code)) throw new Error(`${id}: duplicate objective code ${o.code}`);
        codes.add(o.code);
      }
      walk(n.children ?? []);
    }
  };
  walk(s.topics);
  coverage[id] = seen;
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${id}: ${s.topics.length} top-level nodes, ${nodes} nodes, ${seen.size} concepts covered, ${codes.size} objectives; not covered: ${missing.length}`);
}
const orphans = [...CONCEPT_KEYS].filter((k) => !coveredAnywhere.has(k));
if (orphans.length) throw new Error(`concepts no syllabus covers: ${orphans.join(", ")}`);
console.log(`${CONCEPTS.length} concepts in the registry`);

// Consistency of the "who examines it" prefix of each description with the actual coverage.
const zp = coverage["zimsec/a-level/pure-mathematics/2015-2022"];
const zs = coverage["zimsec/a-level/statistics/2015-2022"];
const zm = coverage["zimsec/a-level/mechanics/2015-2022"];
const cam = coverage["cambridge/a-level/mathematics/2026-2027"];
for (const [k, , d] of CONCEPTS) {
  const zimsecAny = zp.has(k) || zs.has(k) || zm.has(k);
  if (d.startsWith("ZIMSEC only") && cam.has(k)) throw new Error(`${k}: says ZIMSEC only but Cambridge covers it`);
  if (d.startsWith("Cambridge only") && zimsecAny) throw new Error(`${k}: says Cambridge only but a ZIMSEC syllabus covers it`);
  if (!d.startsWith("ZIMSEC only") && !cam.has(k)) throw new Error(`${k}: not covered by Cambridge; description should start "ZIMSEC only"`);
  if (!d.startsWith("Cambridge only") && !zimsecAny) throw new Error(`${k}: not covered by ZIMSEC; description should start "Cambridge only"`);
}
const zimOnly = CONCEPTS.filter(([k]) => !cam.has(k)).length;
const camOnly = CONCEPTS.filter(([k]) => !zp.has(k) && !zs.has(k) && !zm.has(k)).length;
console.log(`ZIMSEC only: ${zimOnly}; Cambridge only: ${camOnly}; shared: ${CONCEPTS.length - zimOnly - camOnly}`);

const registry = {
  family: "mathematics-a",
  name: "Mathematics (A-Level: Pure Mathematics, Statistics, Mechanics / AS & A Level Mathematics)",
  level: "A",
  prefix: "amaths",
  subjects: ["zimsec/a-level/pure-mathematics", "zimsec/a-level/statistics", "zimsec/a-level/mechanics", "cambridge/a-level/mathematics"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description })),
};

const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/mathematics-a.json", registry);
write("content/syllabi/zimsec/a-level/pure-mathematics/2015-2022.json", zimsecPure);
write("content/syllabi/zimsec/a-level/statistics/2015-2022.json", zimsecStatistics);
write("content/syllabi/zimsec/a-level/mechanics/2015-2022.json", zimsecMechanics);
write("content/syllabi/cambridge/a-level/mathematics/2026-2027.json", c9709);
