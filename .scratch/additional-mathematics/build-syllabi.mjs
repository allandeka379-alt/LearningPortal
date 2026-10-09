// Builds content/concepts/additional-mathematics-o.json and the two Additional Mathematics syllabus files:
//   content/syllabi/zimsec/o-level/additional-mathematics/2015-2022.json
//   content/syllabi/cambridge/igcse/additional-mathematics/2025-2027.json   (Cambridge IGCSE Additional Mathematics 0606)
// Sources (local only, not in git): .scratch/additional-mathematics/sources/zimsec-additional-mathematics.pdf (+ .txt;
// the Ministry file "Additional Mathematics O level.pdf"), 0606-2025-2027.pdf (+ .txt) and the syllabus update
// 0606-2025-2027-update.pdf (+ .txt).
// Run from the repo root: node .scratch/additional-mathematics/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

// ---------------------------------------------------------------------------------------------------------------------
// Concept registry (one concept ≈ one lesson's worth of learning). "ZIMSEC only" / "Cambridge only" in a description
// means only that board's syllabus covers the concept. Prefix amath ("math" belongs to mathematics-o).
const CONCEPTS = [
  // Indices and surds (ZIMSEC topic 6.1.1; assumed knowledge for Cambridge 0606)
  ["amath.indices.indices", "Indices and exponential equations", "ZIMSEC only (assumed knowledge for Cambridge 0606, where it is used but not tested directly). What an index is; the laws of indices including zero, negative and rational (fractional) indices; simplifying numerical and algebraic expressions with indices without a calculator; and exponential equations solved by writing both sides as powers of the same base (for example 4^(x+1) = 8^x) or by a substitution that gives a quadratic in a^x (for example 2^(2x) − 6 × 2^x + 8 = 0). Equations that need logarithms are in amath.logs.equations."],
  ["amath.indices.surds", "Surds", "ZIMSEC only (assumed knowledge for Cambridge 0606, where exact answers often need surds). Rational and irrational numbers, simplifying surds (√50 = 5√2), adding, subtracting, multiplying and dividing surds, expanding brackets containing surds, rationalising denominators of the forms a√b and a ± √b, and giving exact answers in simplest surd form."],
  // Polynomials
  ["amath.polynomials.operations", "Polynomials: terms, operations and division", "What a polynomial is (terms, degree, coefficients, leading term, constant term); adding, subtracting and multiplying polynomials (ZIMSEC: order not more than three); algebraic long division of a polynomial by a linear expression ax + b, giving the quotient and remainder; and the identity dividend = divisor × quotient + remainder. Finding the quadratic factor of a cubic by division or by comparing coefficients is practised in amath.polynomials.cubic-equations."],
  ["amath.polynomials.remainder-factor", "The remainder and factor theorems", "The remainder theorem (the remainder on dividing f(x) by x − a is f(a); by ax + b it is f(−b/a)) and the factor theorem (x − a is a factor when f(a) = 0); testing whether an expression is a factor; finding unknown coefficients from a given factor or remainder, including two unknowns from two conditions (simultaneous equations)."],
  ["amath.polynomials.cubic-equations", "Factorising cubics and solving cubic equations", "Finding a first linear factor of a cubic by trying factors of the constant term with the factor theorem, finding the quadratic factor by long division, comparing coefficients or inspection, factorising completely, and solving cubic equations (including the case where the quadratic factor gives surd roots by the formula); checking roots by substitution. Sketching cubics is in amath.graphs.cubic."],
  // Algebra
  ["amath.algebra.identities", "Identities and unknown coefficients", "ZIMSEC only. The difference between an identity (≡, true for every value of the variable) and an equation; finding unknown coefficients in an identity by equating coefficients of like powers or by substituting convenient values (for example writing 2x² + 12x + 13 ≡ a(x + b)² + c, or x³ − 2x² + 4 ≡ (x − 1)(Ax² + Bx + C) + R)."],
  ["amath.algebra.linear-inequalities", "Linear inequalities", "ZIMSEC only. Solving linear inequalities in one variable, including double inequalities and reversing the inequality sign when multiplying or dividing by a negative number; showing solution sets on a number line and in set notation; listing integer solutions. Quadratic inequalities are in amath.quadratics.inequalities; modulus inequalities (Cambridge) are in amath.modulus.inequalities."],
  ["amath.algebra.simultaneous-equations", "Simultaneous equations: one linear and one non-linear", "Solving a pair of simultaneous equations in two unknowns where one is linear and the other quadratic or otherwise non-linear (for example x² − 3xy + y² + 19 = 0, xy = 3, or x/y + 2y/x = 4) by substitution or elimination, pairing the solutions correctly, and interpreting the solutions as the intersection points of a line and a curve. Two linear equations are assumed knowledge and only revised briefly."],
  ["amath.algebra.substitution", "Equations reducible to quadratic form", "Cambridge only. Recognising and making the substitution that turns an equation into a quadratic (u = x^(1/3), u = √x, u = ln x, u = eˣ, u = 2ˣ), solving the quadratic, substituting back and rejecting impossible values (eˣ > 0, √x ≥ 0), with exact and 3-significant-figure answers."],
  // Quadratics
  ["amath.quadratics.solving", "Solving quadratic equations", "Solving quadratic equations for real roots by factorising, by completing the square and by the quadratic formula (exact surd answers and answers to 3 significant figures), rearranging equations into the form ax² + bx + c = 0 first, forming and solving quadratic equations from problems, and checking answers."],
  ["amath.quadratics.completing-square", "Completing the square, maximum and minimum values and quadratic graphs", "Writing ax² + bx + c in the form a(x + p)² + q; reading off the vertex (turning point), the line of symmetry and the maximum or minimum value; sketching y = f(x) with its intercepts and vertex; finding the range of a quadratic function for a given domain with correct notation; the quadratic as a two-to-one (many-one) mapping. The maximum or minimum by differentiation is mentioned and links to amath.calculus.stationary-points."],
  ["amath.quadratics.discriminant", "The discriminant and the nature of roots", "The discriminant b² − 4ac and the conditions for two distinct real roots, two equal roots or no real roots; finding the values or range of a constant k for which an equation has equal, real or no real roots; and (Cambridge depth) the related conditions for a given line to intersect a curve at two points, to be a tangent to it, or not to meet it, by forming a quadratic and using its discriminant."],
  ["amath.quadratics.inequalities", "Quadratic inequalities", "Solving quadratic inequalities (>, <, ≥, ≤) by finding the critical values and using a sketch of the parabola or a sign table, writing solution sets in the correct form (−3 < x < 4; x < 1 or x > 6), and inequalities that arise from discriminant conditions (the range of k for which a line meets a curve)."],
  // Modulus and graphs (Cambridge)
  ["amath.modulus.equations", "Modulus equations", "Cambridge only. The meaning of |x| as the non-negative value; solving |ax + b| = c, |ax + b| = cx + d (checking each solution), |ax + b| = |cx + d| (by squaring or by cases) and |ax² + bx + c| = d, algebraically and with graphs."],
  ["amath.modulus.inequalities", "Modulus inequalities", "Cambridge only. Solving k|ax + b| > c, k|ax + b| ≤ c, k|ax + b| ≤ |cx + d|, |ax + b| ≤ cx + d, |ax² + bx + c| > d and |ax² + bx + c| ≤ d graphically or algebraically (critical values, squaring both sides when both are non-negative), and writing the solution set correctly."],
  ["amath.graphs.modulus-functions", "Graphs of y = |f(x)|", "Cambridge only. The relationship between y = f(x) and y = |f(x)| (the parts below the x-axis are reflected in it, giving cusps) for linear, quadratic and trigonometric functions (y = a sin bx + c, a cos bx + c, a tan bx + c), intercepts and key points, and using the graphs to find the number of solutions of equations such as |f(x)| = k. Moduli of cubics are in amath.graphs.cubic."],
  ["amath.graphs.cubic", "Cubic graphs and cubic inequalities", "Cambridge only. Sketching cubic graphs given as a product of three linear factors (intercepts labelled, shape for a positive or negative leading coefficient, a repeated factor touching the axis), sketching the modulus of such a cubic, and solving cubic inequalities of the form f(x) ≥ d, > d, ≤ d, < d graphically, where f(x) is a product of three linear factors."],
  // Functions
  ["amath.functions.domain-range", "Functions: mappings, domain and range", "Mappings and functions (explaining in words why a relation is or is not a function), one-one and many-one functions, function notation f(x) and f : x ↦ …, domain and range (image set), finding the range of linear, quadratic, exponential and logarithmic functions over a given domain, restricting a domain, and illustrating functions with graphs."],
  ["amath.functions.composite", "Composite functions", "Forming composite functions fg(x) = f(g(x)) and f²(x) = f(f(x)), the fact that fg and gf usually differ, the domain and range of a composite (the range of g must lie in the domain of f), evaluating composites and solving equations such as fg(x) = 5."],
  ["amath.functions.inverse", "Inverse functions", "When a function has an inverse (it must be one-one), explaining in words why a function has no inverse and restricting its domain so that it has one, finding f⁻¹(x) algebraically with correct notation (including quadratic, exponential and logarithmic functions), the domain and range of f⁻¹, ff⁻¹(x) = x, and sketching a function and its inverse as reflections in the line y = x."],
  // Logarithms and exponentials
  ["amath.logs.laws", "Logarithms and the laws of logarithms", "The definition log_a b = c ⇔ a^c = b, converting between index and logarithmic form, common logarithms (lg) and natural logarithms (ln, base e), the laws of logarithms (product, quotient, power, log_a a = 1, log_a 1 = 0), change of base, writing expressions as a single logarithm and evaluating logarithms without a calculator."],
  ["amath.logs.equations", "Exponential and logarithmic equations", "Solving equations of the form a^x = b with logarithms (exact form and 3 significant figures), equations with different bases (for example 2^(x+1) = 3^x), logarithmic equations using the laws (for example log₂(x + 1) − log₂ x = 3) with a check that every logarithm is defined, equations involving e and ln, and simple exponential growth and decay problems. Equations that become quadratics in eˣ or ln x are in amath.algebra.substitution."],
  ["amath.logs.graphs", "Graphs of exponential and logarithmic functions", "The shapes and key features of y = eˣ, y = ln x, y = aˣ and y = log_a x, and of y = ke^(nx) + a and y = k ln(ax + b) (n, k, a, b integers): intercepts, asymptotes and their equations, growth and decay; eˣ and ln x as inverse functions (reflection in y = x); sketching a logarithmic graph and its inverse (ZIMSEC)."],
  // Coordinate geometry
  ["amath.coordinate.lines", "Straight lines: distance, midpoint, gradient and equation", "The distance between two points, the midpoint of a line segment, gradient, the equation of a straight line in the forms y = mx + c, y − y₁ = m(x − x₁) and ax + by + c = 0, intercepts, the intersection of two lines, collinear points and areas of triangles and quadrilaterals with given vertices."],
  ["amath.coordinate.parallel-perpendicular", "Parallel and perpendicular lines", "The conditions m₁ = m₂ for parallel lines and m₁m₂ = −1 for perpendicular lines, equations of lines parallel or perpendicular to a given line through a point, the normal to a line, the perpendicular bisector of a line segment, the foot of the perpendicular from a point to a line, and problems with triangles and quadrilaterals (right angles, kites, rhombuses)."],
  ["amath.coordinate.linear-law", "Reducing relationships to straight-line form", "Cambridge only. Transforming a relationship to the straight-line form Y = mX + c (for example y = Axⁿ to lg y = n lg x + lg A, y = Abˣ to lg y = x lg b + lg A, y = A/x + B), finding the unknown constants from the gradient and intercept of the transformed line, and converting a given straight line (for example of y² against x³, or of e^(2y) against x²) back into an equation in x and y."],
  ["amath.circle.equation", "The equation of a circle", "Cambridge only. The equation (x − a)² + (y − b)² = r² of a circle with centre (a, b) and radius r, the expanded form x² + y² + 2gx + 2fy + c = 0, finding the centre and radius by completing the square, finding the equation from a centre and a point or from the ends of a diameter, and deciding whether a point is inside, on or outside a circle."],
  ["amath.circle.line-tangents", "Circles, lines and tangents", "Cambridge only. Finding the points where a line meets a circle, deciding whether a line is a tangent, a chord or does not meet the circle (discriminant, or the distance from the centre compared with the radius), the equation of the tangent at a point (perpendicular to the radius) and other tangent problems, without calculus."],
  ["amath.circle.two-circles", "Intersecting circles", "Cambridge only. Deciding whether two circles intersect, touch (externally or internally) or do not meet by comparing the distance between the centres with r₁ + r₂ and |r₁ − r₂|, finding the points of intersection, and finding the equation of the common chord by subtracting the equations."],
  // Circular measure (Cambridge)
  ["amath.circular.radians", "Radian measure, arc length and sector area", "Cambridge only. The radian, converting between degrees and radians, exact radian values (π/6, π/4, π/3, …), arc length s = rθ and sector area A = ½r²θ with θ in radians (formulas not given in the exam), the perimeter of a sector, and finding r or θ from given information."],
  ["amath.circular.compound-shapes", "Arcs, sectors and segments in compound shapes", "Cambridge only. Chord lengths and segment areas (½r²(θ − sin θ)), perimeters and areas of compound shapes made of sectors, segments, triangles and rectangles, using right-angled trigonometry and the sine and cosine rules (given in the List of formulas) with radian measure; exact answers in terms of π and surds where asked."],
  // Trigonometry
  ["amath.trig.six-ratios", "The six trigonometric functions of any angle", "Sine, cosine and tangent and their reciprocals secant, cosecant and cotangent; definitions for angles of any size in degrees or radians (the four quadrants, signs of the functions, related acute angles), exact values for 30°, 45° and 60° (π/6, π/4, π/3), and finding the other ratios from one given ratio and the quadrant."],
  ["amath.trig.graphs", "Graphs of trigonometric functions", "The graphs of sine, cosine and tangent over given domains in degrees or radians; amplitude and period; y = a sin bx + c, y = a cos bx + c and y = a tan bx + c (a a positive integer, b a simple fraction or integer, c an integer) with maximum and minimum values, intercepts and the asymptotes of tangent graphs labelled; finding a, b and c from a graph; using intersections to count solutions."],
  ["amath.trig.identities", "Trigonometric identities and proofs", "tan θ = sin θ / cos θ, cot θ = cos θ / sin θ, sin²θ + cos²θ = 1, sec²θ = 1 + tan²θ and cosec²θ = 1 + cot²θ; simplifying expressions and proving identities involving the six functions (working from one side, setting out a 'show that' clearly). Equations that need identities are in amath.trig.equations-identities."],
  ["amath.trig.equations", "Solving trigonometric equations", "Solving equations such as sin x = k, cos x = k, tan x = k and their reciprocal forms in a given interval (degrees or radians): the principal value and the others from symmetry and period; equations in multiple or compound angles (sin 2x, cos(x/2 − π/3), cosec(2θ − π/2)); a sin x = b cos x via tan x; and products of factors equal to zero."],
  ["amath.trig.equations-identities", "Trigonometric equations using identities", "Equations that need an identity first, usually becoming a quadratic in one function (2 sin²x − cos x − 1 = 0, 2 sec²θ + tan θ − 3 = 0, 4 cot θ = tan θ), choosing the identity, rejecting impossible values (|sin x| ≤ 1, |sec x| ≥ 1), and checking that every solution in the interval has been found."],
  // Permutations and combinations (Cambridge)
  ["amath.counting.permutations", "Permutations", "Cambridge only. Factorial notation (0! = 1), the difference between permutations and combinations and when to use each, the formula for nPr, and arrangements of distinct objects in a line with conditions (particular items at the ends, items together or not together, forming numbers with given properties). Repeated objects, circular arrangements and problems needing both permutations and combinations are excluded."],
  ["amath.counting.combinations", "Combinations", "Cambridge only. The notation and formula for nCr, selections (committees, teams, choices from groups) with conditions (particular items included or excluded, at least or at most a number from a group) using the multiplication and addition principles, and algebraic problems such as solving nC2 = 45. Problems needing both permutations and combinations are excluded."],
  // Sequences and series
  ["amath.sequences.behaviour", "Sequences and their behaviour", "ZIMSEC only. A sequence as an ordered list of terms, notation u₁, u₂, …, uₙ, nth-term formulas and recurrence relations, and the behaviour of sequences: increasing, decreasing, periodic, oscillating, convergent (with its limit) and divergent, with examples of each."],
  ["amath.series.sigma-notation", "Series and sigma notation", "ZIMSEC only. A series as the sum of the terms of a sequence, sigma (Σ) notation, writing a series in sigma notation and expanding a sum written in it, evaluating finite sums by listing or with the arithmetic and geometric series formulas, and simple properties such as Σ(aᵣ + bᵣ) = Σaᵣ + Σbᵣ and Σ c = nc."],
  ["amath.series.arithmetic", "Arithmetic progressions", "Recognising an arithmetic progression and its common difference, the nth term a + (n − 1)d, the sum of the first n terms (both forms of the formula), finding a, d or n from given information (including the number of terms in a range, such as multiples of 7 between 100 and 300), and problems in context."],
  ["amath.series.geometric", "Geometric progressions", "Recognising a geometric progression and its common ratio, telling geometric from arithmetic progressions, the nth term arⁿ⁻¹, the sum of the first n terms, finding n with logarithms, problems in context (growth, depreciation, compound interest), and problems combining an arithmetic and a geometric progression."],
  ["amath.series.sum-to-infinity", "Convergent geometric progressions and the sum to infinity", "The condition |r| < 1 for a geometric progression to converge, the sum to infinity a/(1 − r), explaining why a given progression has or does not have a sum to infinity, recurring decimals as geometric series, and problems such as the total distance travelled by a bouncing ball."],
  ["amath.series.binomial-expansion", "The binomial expansion", "Cambridge only. Expanding (a + b)ⁿ for a positive integer n with binomial coefficients (nCr and Pascal's triangle), full expansions and the first few terms of expansions such as (2 − 3x)⁵ with simplified coefficients, and using an expansion to estimate a value (for example 1.02⁶)."],
  ["amath.series.binomial-terms", "Using the general term of a binomial expansion", "Cambridge only. The general term nCr a^(n−r) b^r, finding a specified term or coefficient, the term independent of x in expansions such as (2x + 1/x)¹⁰, coefficients in products such as (1 + kx)(2 − x)⁶, and finding an unknown n or k from given coefficients. The greatest term and properties of the coefficients are excluded."],
  // Vectors (Cambridge)
  ["amath.vectors.notation-magnitude", "Vectors: notation, magnitude and unit vectors", "Cambridge only. Vector notation (column vectors, AB with an arrow, bold letters, ai + bj), position vectors and AB = b − a, magnitude, unit vectors, adding and subtracting vectors and multiplying by scalars, parallel vectors, and finding unknowns by equating like vectors."],
  ["amath.vectors.geometry", "Vector geometry", "Cambridge only. Expressing vectors in a figure in terms of given vectors, the position vector of a point dividing a line in a ratio, showing that points are collinear or that lines are parallel, and finding unknown scalars where two lines meet by equating the coefficients of non-parallel vectors."],
  ["amath.vectors.velocity", "Velocity vectors and relative position", "Cambridge only. Composing and resolving velocities, speed as the magnitude of velocity, the position vector r = r₀ + tv of a particle moving with constant velocity, finding when particles collide or are a given distance apart, and resultant-velocity problems such as a boat crossing a river."],
  // Calculus: differentiation
  ["amath.calculus.derivative-idea", "Gradients of curves and the derived function", "The gradient of a curve at a point as the gradient of the tangent there, the informal idea of a limit through a sequence of chords (ZIMSEC asks for the gradient from first principles in simple cases; Cambridge needs only the informal idea), the derived function and the notations dy/dx, f′(x), d²y/dx², f″(x) and d/dx(…)."],
  ["amath.calculus.differentiating-powers", "Differentiating powers of x", "The derivative of xⁿ for any rational n, constant multiples, sums and differences, rewriting roots and reciprocals as powers before differentiating, evaluating a gradient at a point, and second derivatives."],
  ["amath.calculus.chain-rule", "The chain rule", "Differentiating composite functions with the chain rule, especially powers of a function such as (3x² + 4)^(1/2) and (2 − 5x)⁻³, written in either notation (dy/dx = dy/du × du/dx). Exponential, logarithmic and trigonometric composites are practised in amath.calculus.trig-exp-log."],
  ["amath.calculus.product-quotient", "The product and quotient rules", "Differentiating products uv and quotients u/v of functions (polynomials, powers, exponential, logarithmic and trigonometric functions), simplifying the result (factorising), and using it to find gradients."],
  ["amath.calculus.trig-exp-log", "Derivatives of trigonometric, exponential and logarithmic functions", "The derivatives of sin x, cos x and tan x (x in radians), eˣ, ln x and 1/x, and of composites such as e^(3x−1), ln(2x + 5), sin 3x and cos²x by the chain rule, combined with the product and quotient rules."],
  ["amath.calculus.tangents-normals", "Tangents and normals", "Using differentiation to find the gradient at a point, the equations of the tangent and the normal to a curve at a point, points where the gradient takes a given value, where tangents or normals meet the axes or each other, and areas of the triangles they form."],
  ["amath.calculus.stationary-points", "Stationary points and their nature", "Finding stationary points (dy/dx = 0), determining whether each is a maximum or a minimum with the first-derivative (change of sign) test and the second-derivative test, with full justification, and explaining how to tell a maximum from a minimum. Points of inflexion are excluded."],
  ["amath.calculus.max-min-problems", "Practical maximum and minimum problems", "Cambridge only (ZIMSEC applications name stationary points but not optimisation in context). Forming an expression for a quantity in one variable from a practical situation (boxes, cylinders, fencing, cost), using a constraint to eliminate a variable, finding the stationary value, justifying that it is a maximum or minimum, and answering in context."],
  ["amath.calculus.rates-of-change", "Rates of change and connected rates of change", "The derivative as a rate of change, and connected rates of change with the chain rule (dy/dt = dy/dx × dx/dt), for example the rate of increase of the area of a circle or of the volume of a sphere or cone, or the rate at which a liquid level rises."],
  ["amath.calculus.small-increments", "Small increments and approximations", "The approximation δy ≈ (dy/dx) δx for small changes, approximate changes and percentage changes in a quantity (for example the area of a square or the volume of a sphere), and approximate values of functions near a known value."],
  // Calculus: integration
  ["amath.calculus.integration-basics", "Integration as the reverse of differentiation", "Integration as the reverse process of differentiation, notation ∫ … dx, the arbitrary constant, integrating sums of powers of x (n ≠ −1, including roots and reciprocals rewritten as powers), finding the equation of a curve from its gradient function and a point, and 'hence' integrals that use a derivative found earlier."],
  ["amath.calculus.integration-functions", "Integrating exponential, trigonometric and linear-composite functions", "Integrating (ax + b)ⁿ for any rational n including n = −1 (giving (1/a) ln(ax + b)), 1/x, e^(ax+b), sin(ax + b), cos(ax + b) and (Cambridge) sec²(ax + b), with angles in radians and the arbitrary constant."],
  ["amath.calculus.definite-integrals-area", "Definite integrals and plane areas", "Evaluating definite integrals, the area between a curve and the x-axis (including regions below the axis), the area between a line and a curve, between two curves, and areas made of two parts."],
  ["amath.calculus.volumes-of-revolution", "Volumes of revolution", "ZIMSEC only. The volume generated when the region under y = f(x) between x = a and x = b is rotated through 360° about the x-axis, V = π∫y² dx, for simple polynomial, root and exponential functions, with exact answers in terms of π. Rotation about the y-axis is excluded (to be confirmed against the ZIMSEC syllabus)."],
  ["amath.calculus.kinematics", "Kinematics with calculus", "Cambridge only. Displacement, velocity and acceleration of a particle moving in a straight line with variable or constant acceleration: v = ds/dt, a = dv/dt, integrating back with initial conditions, instantaneous rest and change of direction, distance travelled versus displacement, and displacement–time, distance–time, velocity–time, speed–time and acceleration–time graphs. Constant-acceleration (suvat) mechanics for ZIMSEC is in amath.mechanics.constant-acceleration."],
  // Probability (ZIMSEC)
  ["amath.probability.set-language", "Probability language: sample spaces, events and Venn diagrams", "ZIMSEC only. Trials, sample spaces, outcomes and events, equally likely outcomes, set notation for events (A ∪ B, A ∩ B, A′), illustrating two or three events on Venn diagrams and finding probabilities from them."],
  ["amath.probability.approaches", "Approaches to probability", "ZIMSEC only. Objective probability, both classical (theoretical, from equally likely outcomes) and experimental (relative frequency in the long run), and subjective probability (a degree of belief); comparing the approaches, the probability scale, and expected frequencies."],
  ["amath.probability.addition-product-rules", "Addition and product rules, outcome tables and tree diagrams", "ZIMSEC only. Mutually exclusive events and the addition rule P(A ∪ B) = P(A) + P(B), the general rule P(A ∪ B) = P(A) + P(B) − P(A ∩ B), independent events and the product rule P(A ∩ B) = P(A) × P(B), outcome (possibility) tables and tree diagrams with and without replacement."],
  ["amath.probability.conditional", "Conditional probability", "ZIMSEC only. Conditional probability P(A | B) = P(A ∩ B) / P(B) from tables, Venn diagrams and tree diagrams, testing independence (P(A | B) = P(A)), and finding a 'reverse' conditional probability from a tree diagram."],
  // Statistics (ZIMSEC)
  ["amath.statistics.data-types", "Statistical terms, sources and types of data", "ZIMSEC only. Key terms (statistics, data, frequency, tally, population, sample, census), primary and secondary data and their sources with merits and demerits, classifying data, and qualitative versus quantitative and discrete versus continuous data."],
  ["amath.statistics.data-presentation", "Collecting, organising and presenting data", "ZIMSEC only. Methods of collecting data (questionnaires, interviews, observation, experiments, records) with merits and demerits, tally charts and frequency tables, grouped frequency tables (class limits, boundaries, widths and midpoints), and presenting data in bar charts, pie charts, histograms (including unequal class widths and frequency density), frequency polygons, cumulative frequency curves and stem-and-leaf diagrams, choosing an appropriate form."],
  ["amath.statistics.central-tendency", "Mean, median and mode", "ZIMSEC only. The mean, median and mode of raw data, ungrouped frequency distributions and grouped data (estimated mean from midpoints, median by interpolation or from a cumulative frequency curve, modal class), the relationship between mean, median and mode for symmetric and skewed data, and choosing an appropriate average."],
  ["amath.statistics.dispersion", "Measures of dispersion", "ZIMSEC only. Range, quartiles and interquartile range, variance and standard deviation of raw, frequency and grouped data (Σ(x − x̄)²/n and Σx²/n − x̄²), the coefficient of variation (σ/x̄ × 100%), why measures of dispersion matter, and comparing distributions."],
  // Probability distributions (ZIMSEC)
  ["amath.distributions.discrete-random-variables", "Discrete random variables", "ZIMSEC only. Discrete random variables and their probability distributions (tables, ΣP = 1), finding unknown probabilities, the expectation E(X) = Σxp and the variance Var(X) = Σx²p − [E(X)]², and cumulative probabilities."],
  ["amath.distributions.binomial", "The binomial distribution", "ZIMSEC only. The conditions for a binomial model, X ~ B(n, p), P(X = r) = nCr pʳ(1 − p)ⁿ⁻ʳ, cumulative probabilities (at most, at least, between), the mean np and variance np(1 − p), finding n or p from given information, and modelling in context."],
  ["amath.distributions.continuous-random-variables", "Continuous random variables", "ZIMSEC only. Continuous random variables and probability density functions (f(x) ≥ 0, total area 1), finding an unknown constant, probabilities as areas P(a < X < b) = ∫f(x) dx, P(X = a) = 0, and E(X) = ∫x f(x) dx and Var(X) = ∫x² f(x) dx − [E(X)]² for simple polynomial pdfs."],
  ["amath.distributions.normal", "The normal distribution", "ZIMSEC only. The properties of the normal curve (bell-shaped, symmetric about μ, about 68%, 95% and 99.7% within 1, 2 and 3 standard deviations), X ~ N(μ, σ²), standardising Z = (X − μ)/σ, using standard normal tables Φ(z) for probabilities to the left, right and between values, and the reverse use of the tables to find z, then x, from a probability."],
  ["amath.distributions.normal-parameters", "Finding the mean or standard deviation of a normal distribution", "ZIMSEC only. Finding an unknown mean μ or standard deviation σ, or both (simultaneous equations), of a normal distribution from given probabilities, using the inverse normal tables, in context."],
  // Sampling and estimation (ZIMSEC)
  ["amath.sampling.methods", "Populations, samples and sampling methods", "ZIMSEC only. Population, sample, sampling frame, census versus sample survey and reasons for sampling; random sampling (simple random using lots or random numbers, systematic, stratified, cluster) and non-random sampling (quota, convenience); bias, representative samples, and the advantages and disadvantages of each method."],
  ["amath.sampling.sample-mean", "The distribution of the sample mean and the central limit theorem", "ZIMSEC only. The sample mean X̄ as a random variable, E(X̄) = μ and Var(X̄) = σ²/n, X̄ ~ N(μ, σ²/n) when X is normal, the central limit theorem (used without proof) for large samples from any population, and probabilities about a sample mean."],
  ["amath.estimation.point", "Point estimates: unbiased estimators of the mean and variance", "ZIMSEC only. Estimators and estimates, unbiased estimates of the population mean (x̄) and variance (s² = Σ(x − x̄)²/(n − 1), equivalently n/(n − 1) times the sample variance) from raw data and from summary statistics Σx and Σx², and the standard error of the mean σ/√n."],
  ["amath.estimation.confidence-intervals", "Confidence intervals for a population mean", "ZIMSEC only. Interval estimates, confidence intervals x̄ ± z σ/√n for the mean of a normal population with known variance, or of any population from a large sample (σ estimated by s), at the 95% and 99% levels (5% and 1% significance), interpretation, the margin of error, and the sample size needed for a given width."],
  // Mechanics (ZIMSEC)
  ["amath.mechanics.kinematics-graphs", "Displacement, velocity and acceleration; motion graphs", "ZIMSEC only. Scalars and vectors (distance and displacement, speed and velocity), average speed, displacement–time graphs (gradient = velocity), velocity–time graphs (gradient = acceleration, area = displacement), and sketching and interpreting multi-stage journeys. Calculus kinematics (Cambridge) is in amath.calculus.kinematics."],
  ["amath.mechanics.constant-acceleration", "Equations of motion for constant acceleration", "ZIMSEC only. The equations v = u + at, s = ut + ½at², v² = u² + 2as, s = ½(u + v)t and s = vt − ½at², sign conventions, vertical motion under gravity (g stated in the question), and two-particle problems (meeting and overtaking)."],
  ["amath.mechanics.forces-resultants", "Forces as vectors: resultants and components", "ZIMSEC only. Force and its unit, types of force (weight, normal reaction, tension, thrust, friction, applied forces), representing forces as vectors (components or magnitude and direction), the resultant of two or more forces by components or by the triangle and cosine rule, and resolving a force into perpendicular components."],
  ["amath.mechanics.equilibrium", "Equilibrium of a particle", "ZIMSEC only. A particle is in equilibrium when the vector sum of the forces on it is zero; resolving in two perpendicular directions, three forces in equilibrium (triangle of forces), particles hanging on strings and resting on smooth inclined planes, and finding unknown forces and angles."],
  ["amath.mechanics.friction", "Friction", "ZIMSEC only. The contact force between two surfaces as a normal reaction and a frictional force, F ≤ μR, limiting equilibrium and the coefficient of friction, smooth and rough surfaces, and particles in equilibrium on rough horizontal and inclined planes. Friction during motion is in amath.mechanics.newtons-laws-planes."],
  ["amath.mechanics.newtons-laws", "Newton's laws of motion", "ZIMSEC only. Newton's three laws, F = ma for a particle of constant mass under constant forces, weight W = mg, horizontal and vertical motion (including lifts and objects moving against resistance), combined with the equations of motion."],
  ["amath.mechanics.newtons-laws-planes", "Newton's second law with resolved forces and friction", "ZIMSEC only. Applying F = ma when forces act at an angle or on inclined planes, on smooth and rough surfaces (F = μR while sliding), finding accelerations, forces and coefficients of friction, combined with the equations of motion. Connected particles over pulleys are not named in the syllabus and are excluded."],
  ["amath.mechanics.work-energy", "Work, kinetic energy and potential energy", "ZIMSEC only. Work done by a constant force when its point of application moves (Fd, and Fd cos θ for a force at an angle), kinetic energy ½mv², gravitational potential energy mgh, the principle of conservation of mechanical energy, and the work–energy principle with work done against resistance, on slopes and in vertical motion."],
  ["amath.mechanics.power", "Power", "ZIMSEC only. Power as the rate of doing work, P = W/t, P = Fv for a vehicle moving at speed v with driving force F, the watt and kilowatt, maximum speed when the driving force equals the resistance, and acceleration at a given speed using F = ma."],
];
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. Objectives are our own paraphrase. ZIMSEC: topic codes are printed (6.1.1 …), sub-topic and objective
// codes are ours. Cambridge: objective codes are the board's printed numbers (e.g. 10.5), passed as [code, text].
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

// ---------------------------------------------------------------------------------------------------------------------
// ZIMSEC O-Level Additional Mathematics, Forms 3-4, 2015-2022. Section codes 6.1-6.3 and topic codes 6.1.1-6.3.4 are
// printed (6.0 Topics); sub-topic and objective codes are ours. Pure Mathematics is taught in Form 3; Probability and
// Statistics and Mechanics in Form 4 (competency matrices 8.0, 9.0 and 10.0, confirmed by the scope and sequence).
const ZIMSEC_TOPICS = [
  section("pure", "6.1", "Pure Mathematics", {
    components: ["1"],
    children: [
      topic("indices", "6.1.1", "Indices and irrational numbers", {
        children: [
          sub("indices.indices", "6.1.1.1", "Indices", {
            covers: ["amath.indices.indices"],
            objectives: [
              "Form 3: define an index and use rational indices and the rules of indices to simplify algebraic expressions.",
              "Form 3: solve equations involving indices (exponential equations).",
            ],
          }),
          sub("indices.surds", "6.1.1.2", "Irrational numbers: surds", {
            covers: ["amath.indices.surds"],
            objectives: ["Form 3: simplify surds and carry out operations with them."],
          }),
        ],
      }),
      topic("polynomials", "6.1.2", "Polynomials", {
        children: [
          sub("polynomials.operations", "6.1.2.1", "Polynomials: definition and operations", {
            covers: ["amath.polynomials.operations"],
            objectives: ["Form 3: define a polynomial and carry out operations with polynomials of order not more than three."],
          }),
          sub("polynomials.remainder", "6.1.2.2", "Remainder theorem", {
            covers: ["amath.polynomials.remainder-factor"],
            objectives: [
              "Form 3: state the remainder theorem and find the remainder when a polynomial is divided by a given linear expression.",
              "Form 3: use the remainder and factor theorems to solve problems involving polynomials.",
            ],
          }),
          sub("polynomials.factor", "6.1.2.3", "Factor theorem and factorisation", {
            covers: ["amath.polynomials.cubic-equations"],
            objectives: ["Form 3: identify factors of given polynomials and factorise them completely."],
          }),
        ],
      }),
      topic("identities", "6.1.3", "Algebraic identities, equations and inequalities", {
        children: [
          sub("identities.identities", "6.1.3.1", "Identities", {
            covers: ["amath.algebra.identities"],
            objectives: [
              "Form 3: distinguish identities from equations.",
              "Form 3: find unknown coefficients using identities.",
            ],
          }),
          sub("identities.equations", "6.1.3.2", "Equations (up to order three)", {
            covers: ["amath.quadratics.solving", "amath.algebra.simultaneous-equations"],
            objectives: [
              "Form 3: solve linear, quadratic and cubic equations.",
              "Form 3: solve a pair of simultaneous equations of which at least one is linear and at most one is quadratic.",
            ],
          }),
          sub("identities.inequalities", "6.1.3.3", "Linear and quadratic inequalities", {
            covers: ["amath.algebra.linear-inequalities", "amath.quadratics.inequalities"],
            objectives: ["Form 3: solve linear and quadratic inequalities."],
          }),
        ],
      }),
      topic("sequences", "6.1.4", "Sequences and series", {
        children: [
          sub("sequences.sequences", "6.1.4.1", "Sequences: notation and behaviour", {
            covers: ["amath.sequences.behaviour"],
            objectives: [
              "Form 3: define a sequence and identify its elements.",
              "Form 3: identify periodic, oscillating, convergent and divergent behaviour of sequences.",
            ],
          }),
          sub("sequences.series", "6.1.4.2", "Series", {
            children: [
              sub("sequences.series.sigma", "6.1.4.2.1", "Series and sigma notation", {
                covers: ["amath.series.sigma-notation"],
                objectives: ["Form 3: define sigma notation and use it to solve problems involving series."],
              }),
              sub("sequences.series.ap", "6.1.4.2.2", "Arithmetic progressions", {
                covers: ["amath.series.arithmetic"],
                objectives: ["Form 3: recognise arithmetic progressions and find the nth term and the sum of the first n terms."],
              }),
              sub("sequences.series.gp", "6.1.4.2.3", "Geometric progressions", {
                covers: ["amath.series.geometric"],
                objectives: ["Form 3: recognise geometric progressions and find the nth term and the sum of the first n terms."],
              }),
              sub("sequences.series.sum-to-infinity", "6.1.4.2.4", "Sum to infinity of a geometric progression", {
                covers: ["amath.series.sum-to-infinity"],
                objectives: ["Form 3: find the sum to infinity of a geometric progression and solve problems involving series."],
              }),
            ],
          }),
        ],
      }),
      topic("coordinate", "6.1.5", "Coordinate geometry in two dimensions", {
        children: [
          sub("coordinate.lines", "6.1.5.1", "Distance, gradient and the equation of a straight line", {
            covers: ["amath.coordinate.lines"],
            objectives: [
              "Form 3: calculate the distance and the gradient between two points.",
              "Form 3: find the equation of a straight line.",
            ],
          }),
          sub("coordinate.parallel-perpendicular", "6.1.5.2", "Parallel and perpendicular lines; normals", {
            covers: ["amath.coordinate.parallel-perpendicular"],
            objectives: ["Form 3: use the gradients of parallel and perpendicular lines to find the equation of a normal to a given straight line."],
          }),
        ],
      }),
      topic("functions", "6.1.6", "Functions", {
        children: [
          sub("functions.definitions", "6.1.6.1", "Definitions, domain, range and one-to-one mappings", {
            covers: ["amath.functions.domain-range"],
            objectives: [
              "Form 3: define a function, distinguish a function from other relations and recognise a one-to-one mapping.",
              "Form 3: find the domain and range of a function and represent functions graphically.",
            ],
          }),
          sub("functions.composite", "6.1.6.2", "Composite functions", {
            covers: ["amath.functions.composite"],
            objectives: ["Form 3: find composite functions."],
          }),
          sub("functions.inverse", "6.1.6.3", "Inverse functions and graphical illustration", {
            covers: ["amath.functions.inverse"],
            objectives: ["Form 3: find inverse functions and illustrate a function and its inverse graphically."],
          }),
        ],
      }),
      topic("quadratics", "6.1.7", "Quadratic functions", {
        children: [
          sub("quadratics.max-min", "6.1.7.1", "The quadratic function and its maximum or minimum value", {
            covers: ["amath.quadratics.completing-square"],
            objectives: [
              "Form 3: recognise a quadratic function as a two-to-one mapping.",
              "Form 3: find its maximum or minimum value from the graph or by completing the square.",
            ],
          }),
          sub("quadratics.roots", "6.1.7.2", "Nature of roots", {
            covers: ["amath.quadratics.discriminant"],
            objectives: ["Form 3: use the discriminant to determine the nature of the roots of a quadratic equation."],
          }),
        ],
      }),
      topic("logs", "6.1.8", "Logarithmic and exponential functions", {
        children: [
          sub("logs.laws", "6.1.8.1", "Logarithms: definition and laws", {
            covers: ["amath.logs.laws"],
            objectives: [
              "Form 3: define a logarithmic function and express logarithms in exponential form and vice versa.",
              "Form 3: use the laws of logarithms.",
            ],
          }),
          sub("logs.equations", "6.1.8.2", "Logarithmic and exponential equations", {
            covers: ["amath.logs.equations"],
            objectives: ["Form 3: solve logarithmic and exponential equations."],
          }),
          sub("logs.graphs", "6.1.8.3", "Graphs of logarithmic functions and their inverses", {
            covers: ["amath.logs.graphs"],
            objectives: ["Form 3: sketch the graph of a logarithmic function and of its inverse."],
          }),
        ],
      }),
      topic("trig", "6.1.9", "Trigonometrical functions", {
        children: [
          sub("trig.ratios", "6.1.9.1", "Trigonometric ratios", {
            covers: ["amath.trig.six-ratios"],
            objectives: ["Form 3: state the three basic trigonometric ratios and deduce the other three."],
          }),
          sub("trig.functions", "6.1.9.2", "Trigonometric functions and their graphs", {
            covers: ["amath.trig.graphs"],
            objectives: ["Form 3: identify trigonometric relations as functions and sketch their graphs."],
          }),
          sub("trig.identities", "6.1.9.3", "Simple identities", {
            covers: ["amath.trig.identities"],
            objectives: ["Form 3: prove simple trigonometric identities."],
          }),
          sub("trig.equations", "6.1.9.4", "Simple equations", {
            covers: ["amath.trig.equations", "amath.trig.equations-identities"],
            objectives: ["Form 3: solve trigonometric equations, including those that need simple identities."],
          }),
        ],
      }),
      topic("differentiation", "6.1.10", "Differentiation", {
        children: [
          sub("differentiation.gradient", "6.1.10.1", "Gradient of a curve and derivative notation", {
            covers: ["amath.calculus.derivative-idea"],
            objectives: [
              "Form 3: approximate the gradient of the tangent to a curve at a point from the gradients of a sequence of chords (first principles).",
              "Form 3: use appropriate notation for derivatives.",
            ],
          }),
          sub("differentiation.rules", "6.1.10.2", "Rules of derivatives and derivatives of simple functions", {
            covers: ["amath.calculus.differentiating-powers", "amath.calculus.chain-rule", "amath.calculus.product-quotient", "amath.calculus.trig-exp-log"],
            objectives: [
              "Form 3: differentiate functions such as axⁿ, ln x, sin x, cos x, tan x, 1/x and eˣ.",
              "Form 3: differentiate using the product and quotient rules.",
            ],
          }),
          sub("differentiation.stationary", "6.1.10.3", "Stationary points: maximum and minimum", {
            covers: ["amath.calculus.stationary-points"],
            objectives: ["Form 3: use differentiation to find stationary points and determine their nature by the change of sign or the second derivative."],
          }),
          sub("differentiation.applications", "6.1.10.4", "Applications: tangents, normals and rates of change", {
            covers: ["amath.calculus.tangents-normals", "amath.calculus.rates-of-change", "amath.calculus.small-increments"],
            objectives: [
              "Form 3: apply differentiation to find gradients and the equations of tangents and normals to a curve.",
              "Form 3: apply differentiation to rates of change and approximations.",
            ],
          }),
        ],
      }),
      topic("integration", "6.1.11", "Integration", {
        children: [
          sub("integration.reverse", "6.1.11.1", "Integration as the reverse of differentiation; integrating simple functions", {
            covers: ["amath.calculus.integration-basics", "amath.calculus.integration-functions"],
            objectives: [
              "Form 3: recognise integration as the reverse process of differentiation and use the notation.",
              "Form 3: integrate xⁿ (including n = −1), cos x, sin x and eˣ, and (ax + b)ⁿ, e^(ax+b) and sin(ax + b).",
            ],
          }),
          sub("integration.area", "6.1.11.2", "Area under a curve", {
            covers: ["amath.calculus.definite-integrals-area"],
            objectives: ["Form 3: apply integration to find the area under a curve."],
          }),
          sub("integration.volume", "6.1.11.3", "Volume", {
            covers: ["amath.calculus.volumes-of-revolution"],
            objectives: ["Form 3: apply integration to find a volume (of revolution about the x-axis)."],
          }),
        ],
      }),
    ],
  }),
  section("statistics", "6.2", "Probability and Statistics", {
    components: ["2"],
    children: [
      topic("probability", "6.2.1", "Probability", {
        children: [
          sub("probability.sets", "6.2.1.1", "Sets and notation", {
            covers: ["amath.probability.set-language"],
            objectives: [
              "Form 4: define probability, trial, sample space, outcome and event, and relate sets to events.",
              "Form 4: illustrate two or more events on Venn diagrams.",
            ],
          }),
          sub("probability.approaches", "6.2.1.2", "Approaches to probability", {
            covers: ["amath.probability.approaches"],
            objectives: ["Form 4: describe the objective (experimental and classical) and subjective approaches to probability."],
          }),
          sub("probability.rules", "6.2.1.3", "Addition and product rules", {
            covers: ["amath.probability.addition-product-rules"],
            objectives: [
              "Form 4: apply the addition rule for mutually exclusive events and the product rule for independent events.",
              "Form 4: calculate probabilities using outcome tables and tree diagrams.",
            ],
          }),
          sub("probability.conditional", "6.2.1.4", "Conditional probability", {
            covers: ["amath.probability.conditional"],
            objectives: ["Form 4: define conditional probability and solve problems involving it."],
          }),
        ],
      }),
      topic("data", "6.2.2", "Data collection and presentation", {
        children: [
          sub("data.terms-sources", "6.2.2.1", "Statistical key terms; sources and types of data", {
            covers: ["amath.statistics.data-types"],
            objectives: [
              "Form 4: define key statistical terms such as statistics, data, frequency, tally, population and sample.",
              "Form 4: state the sources and types of data, classify data and distinguish primary from secondary data.",
            ],
          }),
          sub("data.collection", "6.2.2.2", "Data collection and presentation", {
            covers: ["amath.statistics.data-presentation"],
            objectives: ["Form 4: outline methods of collecting data, organise data in tables and summarise it in appropriate forms."],
          }),
        ],
      }),
      topic("averages", "6.2.3", "Measures of central tendency and dispersion", {
        children: [
          sub("averages.central", "6.2.3.1", "Measures of central tendency", {
            covers: ["amath.statistics.central-tendency"],
            objectives: ["Form 4: calculate the mean, median and mode of grouped and ungrouped data."],
          }),
          sub("averages.dispersion", "6.2.3.2", "Measures of dispersion", {
            covers: ["amath.statistics.dispersion"],
            objectives: [
              "Form 4: define and calculate the range, interquartile range, variance, standard deviation and coefficient of variation.",
              "Form 4: explain the importance of measures of dispersion.",
            ],
          }),
        ],
      }),
      topic("distributions", "6.2.4", "Discrete and continuous probability distributions", {
        children: [
          sub("distributions.discrete", "6.2.4.1", "Discrete random variables and the binomial distribution", {
            covers: ["amath.distributions.discrete-random-variables", "amath.distributions.binomial"],
            objectives: [
              "Form 4: define a discrete random variable and use its probability distribution table to find E(X), Var(X) and unknown values.",
              "Form 4: state the characteristics of a binomial model, use it to calculate probabilities and calculate its mean and variance.",
            ],
          }),
          sub("distributions.continuous", "6.2.4.2", "Continuous random variables", {
            covers: ["amath.distributions.continuous-random-variables"],
            objectives: [
              "Form 4: define a continuous random variable and its probability density function.",
              "Form 4: calculate probabilities, the mean and the variance from a probability density function.",
            ],
          }),
        ],
      }),
      topic("normal", "6.2.5", "Normal distribution", {
        children: [
          sub("normal.probabilities", "6.2.5.1", "The normal curve, standardising and tables", {
            covers: ["amath.distributions.normal"],
            objectives: [
              "Form 4: explain the characteristics of the normal distribution curve.",
              "Form 4: use the standard normal variable and tables to find probabilities, including finding z when Φ(z) is known.",
            ],
          }),
          sub("normal.parameters", "6.2.5.2", "Finding the mean and variance", {
            covers: ["amath.distributions.normal-parameters"],
            objectives: ["Form 4: find the mean, the variance or both of a normal distribution from given probabilities."],
          }),
        ],
      }),
      topic("sampling", "6.2.6", "Sampling methods", {
        children: [
          sub("sampling.methods", "6.2.6.1", "Sampling techniques: random and non-random sampling", {
            covers: ["amath.sampling.methods"],
            objectives: [
              "Form 4: explain the basic sampling methods and choose samples using random and non-random methods.",
              "Form 4: apply sampling methods to obtain representative samples.",
            ],
          }),
          sub("sampling.clt", "6.2.6.2", "The sample mean and the central limit theorem", {
            covers: ["amath.sampling.sample-mean"],
            objectives: ["Form 4: use the distribution of the sample mean and (without proof) the central limit theorem."],
          }),
        ],
      }),
      topic("estimation", "6.2.7", "Estimation", {
        children: [
          sub("estimation.point", "6.2.7.1", "Point estimation of the mean and variance", {
            covers: ["amath.estimation.point"],
            objectives: [
              "Form 4: recognise the importance of estimation.",
              "Form 4: calculate unbiased estimates of the population mean and variance and the standard error of the mean.",
            ],
          }),
          sub("estimation.interval", "6.2.7.2", "Interval estimation: confidence intervals", {
            covers: ["amath.estimation.confidence-intervals"],
            objectives: ["Form 4: calculate confidence intervals for a population mean at the 5% or 1% significance level (95% or 99% confidence)."],
          }),
        ],
      }),
    ],
  }),
  section("mechanics", "6.3", "Mechanics", {
    components: ["2"],
    children: [
      topic("kinematics", "6.3.1", "Kinematics of motion in a straight line", {
        children: [
          sub("kinematics.graphs", "6.3.1.1", "Scalars and vectors; displacement–time and velocity–time graphs", {
            covers: ["amath.mechanics.kinematics-graphs"],
            objectives: [
              "Form 4: define vector and scalar quantities and distinguish velocity from acceleration.",
              "Form 4: sketch displacement–time and velocity–time graphs and use their gradients (and areas).",
            ],
          }),
          sub("kinematics.equations", "6.3.1.2", "Equations of motion", {
            covers: ["amath.mechanics.constant-acceleration"],
            objectives: ["Form 4: use the equations of motion to solve kinematics problems."],
          }),
        ],
      }),
      topic("forces", "6.3.2", "Forces and equilibrium", {
        children: [
          sub("forces.vectors", "6.3.2.1", "Types of force; resultants and components", {
            covers: ["amath.mechanics.forces-resultants"],
            objectives: [
              "Form 4: define force and identify the forces acting in a given situation.",
              "Form 4: represent forces by vectors and find resultants and components.",
            ],
          }),
          sub("forces.equilibrium", "6.3.2.2", "Equilibrium of a particle", {
            covers: ["amath.mechanics.equilibrium"],
            objectives: ["Form 4: use the principle that the vector sum of the forces on a particle in equilibrium is zero to solve problems."],
          }),
          sub("forces.friction", "6.3.2.3", "Friction", {
            covers: ["amath.mechanics.friction"],
            objectives: ["Form 4: represent the contact force between two surfaces by a normal force and a frictional force and solve problems involving friction."],
          }),
        ],
      }),
      topic("newton", "6.3.3", "Newton's laws of motion", {
        children: [
          sub("newton.laws", "6.3.3.1", "Newton's laws of motion", {
            covers: ["amath.mechanics.newtons-laws"],
            objectives: ["Form 4: state Newton's laws of motion and apply them to the linear motion of a body of constant mass under constant forces."],
          }),
          sub("newton.applications", "6.3.3.2", "Applications: resolved forces, inclined planes and friction", {
            covers: ["amath.mechanics.newtons-laws-planes"],
            objectives: ["Form 4: apply Newton's second law where forces must be resolved, including motion on inclined and rough surfaces."],
          }),
        ],
      }),
      topic("energy", "6.3.4", "Energy, work and power", {
        children: [
          sub("energy.work-energy", "6.3.4.1", "Work, energy and conservation of energy", {
            covers: ["amath.mechanics.work-energy"],
            objectives: [
              "Form 4: explain gravitational potential energy and kinetic energy.",
              "Form 4: calculate the work done by a constant force and use the principle of conservation of energy to solve problems.",
            ],
          }),
          sub("energy.power", "6.3.4.2", "Power", {
            covers: ["amath.mechanics.power"],
            objectives: ["Form 4: apply the definition of power as the rate at which work is done."],
          }),
        ],
      }),
    ],
  }),
];

const zimsec = {
  board: "zimsec",
  qualification: "o-level",
  subject: "additional-mathematics",
  versionLabel: "2015-2022",
  family: "additional-mathematics-o",
  title: "ZIMSEC O-Level Additional Mathematics",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Additional Mathematics Syllabus, Forms 3 - 4, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at O Level",
    url: "https://www.mopsemashwest.gov.zw/files/Additional%20Mathematics%20O%20level.pdf",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Section and topic names and their numbers (6.1 to 6.3 and 6.1.1 to 6.3.4) are transcribed from the topic list (6.0) of the Ministry's Additional Mathematics Syllabus Forms 3 - 4 (2015 - 2022); the content of each topic and the form in which it is taught come from the scope and sequence (7.0) and the competency matrices (8.0 Form 3, 9.0 and 10.0 Form 4). Sub-topic and objective codes are ours. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-09): the Mashonaland West provincial education office's copy of the Ministry document, file 'Additional Mathematics O level.pdf' (http://www.mopsemashwest.gov.zw/files/Additional%20Mathematics%20O%20level.pdf; the site's https certificate has expired, so the https URL recorded here may not load), read through a text rendering. The cover prints 'Forms 3 - 4', '2015 - 2022' and the year 2015. The table columns come out of the text rendering scrambled; headings and the form of each item were read from the column positions and cross-checked between the scope and sequence and the competency matrices. Check every heading and objective against a clean copy from ZIMSEC.",
    "Subject code: not printed in the syllabus document; confirm the ZIMSEC O-Level Additional Mathematics subject code with ZIMSEC (left null).",
    "Version dates: assumed first examined in November 2018 (effectiveFrom 2018-01-01), as for the other 2015-2022 files. Under the Heritage-Based Curriculum (2024-2030) new syllabi were issued; confirm which syllabus the November 2026 and later O-Level Additional Mathematics examinations use, set effectiveTo, and create a new version file when a new syllabus replaces this one.",
    "Forms: the scope and sequence and the competency matrices place all of Pure Mathematics (6.1) in Form 3 and all of Probability and Statistics (6.2) and Mechanics (6.3) in Form 4.",
    "Assessment (11.0) as read: continuous assessment 30% (topic tasks, written tests, end-of-term tests and one project over five terms) and a summative examination 70%. Paper 1 Pure Mathematics (2 hours 30 minutes, 100 marks, 35% of the final mark): Section A, compulsory short-answer structured questions, 52 marks; Section B, long structured questions, candidates choose four of six, 48 marks (12 each). Paper 2 Mechanics and Statistics (2 hours 30 minutes, 100 marks, 35%): Section A, four compulsory questions from Mechanics and Statistics, 40 marks; Section B, seven Mechanics questions and Section C, seven Probability and Statistics questions, each worth 12 marks; candidates answer any five from Sections B and C together (60 marks). The text says Sections B and C are each 'marked out of 60', which only adds up to 100 for the paper if the five answers are counted together.",
    "The number of questions in Paper 1 Section A is not clearly printed: the scrambled assessment table appears to read 'four compulsory short answer structured questions' for 52 marks, but the column alignment is uncertain. Our mock exams assume four compulsory questions of 13 marks; confirm against a recent ZIMSEC paper. Skill weightings printed for the examination: Paper 1 knowledge and comprehension 50%, application and analysis 40%, synthesis and evaluation 10%; Paper 2 40%, 45%, 15%.",
    "Read with uncertainty from garbled cells: the integration content mentions finding 'volumes and area under the curve' (taught here as volumes of revolution about the x-axis; confirm the depth); integration of (ax + b)ⁿ, e^(ax+b) and sin(ax + b) by linear substitution; derivatives of axⁿ, ln x, sin x, cos x, tan x, 1/x and eˣ with the product and quotient rules (the chain rule is not named but is needed for these); confidence intervals for the mean of a normal population with known variance and for large samples; finding the mean, the variance or both of a normal distribution. The document spells 'stationery points', 'polinomials' and 'continous'; the correct spellings are used here.",
    "Applications of differentiation name tangents, normals, stationary points, rates of change and approximations, but not practical maximum and minimum problems; those are taught in the family for Cambridge 0606 (amath.calculus.max-min-problems) and ZIMSEC teachers may wish to use them too.",
    "Mechanics here is constant-force, constant-acceleration mechanics of a particle (kinematics with the equations of motion, forces and equilibrium, friction, Newton's laws, work, energy and power). Connected particles and moments are not named and are not taught. The value of g is not printed in the syllabus; every item states the value it uses.",
    "Not in this syllabus (taught in the family for Cambridge 0606 only): equations reducible to quadratic form, modulus equations, inequalities and graphs, cubic graphs and cubic inequalities, reducing relationships to straight-line form, the coordinate geometry of the circle, circular measure (radians, arcs and sectors), permutations and combinations, the binomial expansion, vectors in two dimensions (as a pure topic), practical maxima and minima, and kinematics using calculus. The continuous assessment (topic tasks, tests and the project) is not simulated.",
  ],
  overview: "The ZIMSEC O-Level Additional Mathematics syllabus (Forms 3-4) extends O-Level Mathematics for able learners. Form 3 covers Pure Mathematics: indices and surds, polynomials, identities, equations and inequalities, sequences and series, coordinate geometry, functions, quadratic functions, logarithmic and exponential functions, trigonometry, differentiation and integration. Form 4 covers Probability and Statistics (probability, data collection and presentation, averages and dispersion, discrete and continuous distributions, the normal distribution, sampling and estimation) and Mechanics (kinematics in a straight line, forces and equilibrium, Newton's laws of motion, and energy, work and power).",
  assessmentOverview: "Continuous assessment (topic tasks, tests and a project, Forms 3-4) carries 30%. The examination carries 70% in two papers of 2 hours 30 minutes and 100 marks each: Paper 1 Pure Mathematics (Section A compulsory short structured questions, 52 marks; Section B four of six long structured questions, 48 marks) and Paper 2 Mechanics and Statistics (Section A four compulsory questions, 40 marks; then any five of fourteen 12-mark questions from Section B, Mechanics, and Section C, Probability and Statistics).",
  components: [
    { code: "1", name: "Paper 1: Pure Mathematics", kind: "WRITTEN", description: "Section A: compulsory short-answer structured questions (52 marks). Section B: six long structured questions of 12 marks, of which candidates answer four (48 marks). Pure Mathematics topics only.", durationMinutes: 150, maxMarks: 100, weightingPercent: 35 },
    { code: "2", name: "Paper 2: Mechanics and Statistics", kind: "WRITTEN", description: "Section A: four compulsory questions from Mechanics and Statistics (40 marks). Section B: seven Mechanics questions; Section C: seven Probability and Statistics questions; each is worth 12 marks and candidates answer any five from Sections B and C (60 marks).", durationMinutes: 150, maxMarks: 100, weightingPercent: 35 },
    { code: "CA", name: "Continuous assessment", kind: "COURSEWORK", description: "School-based topic tasks, written tests, end-of-term tests and a project during Forms 3 and 4 (30% of the final mark under this syllabus). Not simulated on the platform.", weightingPercent: 30 },
  ],
  topics: ZIMSEC_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Cambridge IGCSE Additional Mathematics 0606, 2025-2027. Topic numbers (1-14) and content numbers (1.1-14.15) are the
// board's; where several content numbers share a node, the node code names the range (e.g. 2.1-2.2).
const C0606_TOPICS = [
  topic("functions", "1", "Functions", {
    children: [
      sub("functions.definitions", "1.1-1.3", "Functions: terms, domain, range and notation", {
        covers: ["amath.functions.domain-range"],
        objectives: [
          ["1.1", "Understand function, domain, range (image set), one-one and many-one functions, inverse and composite functions, and explain in words why a mapping is a function."],
          ["1.2", "Find the domain and range of functions."],
          ["1.3", "Recognise and use function notation."],
        ],
      }),
      sub("functions.modulus", "1.4", "The modulus of a function", {
        covers: ["amath.graphs.modulus-functions"],
        objectives: [["1.4", "Relate the graphs of y = f(x) and y = |f(x)| for linear, quadratic, cubic and trigonometric f(x)."]],
      }),
      sub("functions.inverse", "1.5-1.6, 1.8", "Inverse functions", {
        covers: ["amath.functions.inverse"],
        objectives: [
          ["1.5", "Explain in words why a given function has no inverse."],
          ["1.6", "Find the inverse of a one-one function, using correct notation."],
          ["1.8", "Sketch a function and its inverse and show they are reflections in y = x."],
        ],
      }),
      sub("functions.composite", "1.7", "Composite functions", {
        covers: ["amath.functions.composite"],
        objectives: [["1.7", "Form and use composite functions, knowing that the order matters."]],
      }),
    ],
  }),
  topic("quadratics", "2", "Quadratic functions", {
    children: [
      sub("quadratics.max-min", "2.1-2.2", "Maximum and minimum values and quadratic graphs", {
        covers: ["amath.quadratics.completing-square"],
        objectives: [
          ["2.1", "Find the maximum or minimum value of a quadratic function by completing the square or by differentiation."],
          ["2.2", "Use the maximum or minimum value to sketch the graph or to find the range for a given domain."],
        ],
      }),
      sub("quadratics.discriminant", "2.3", "The discriminant: roots and line–curve intersections", {
        covers: ["amath.quadratics.discriminant"],
        objectives: [["2.3", "Know the discriminant conditions for two real, two equal or no real roots, and for a line to meet, touch or miss a curve."]],
      }),
      sub("quadratics.solving", "2.4", "Solving quadratic equations", {
        covers: ["amath.quadratics.solving"],
        objectives: [["2.4", "Solve quadratic equations for real roots by factorising, the formula or completing the square."]],
      }),
      sub("quadratics.inequalities", "2.5", "Quadratic inequalities", {
        covers: ["amath.quadratics.inequalities"],
        objectives: [["2.5", "Find the solution set of a quadratic inequality graphically or algebraically, written in the correct form."]],
      }),
    ],
  }),
  topic("polynomials", "3", "Factors of polynomials", {
    children: [
      sub("polynomials.theorems", "3.1", "The remainder and factor theorems", {
        covers: ["amath.polynomials.remainder-factor"],
        objectives: [["3.1", "Know and use the remainder and factor theorems."]],
      }),
      sub("polynomials.factors-cubics", "3.2-3.3", "Factors of polynomials and cubic equations", {
        covers: ["amath.polynomials.operations", "amath.polynomials.cubic-equations"],
        objectives: [
          ["3.2", "Find factors of polynomials, obtaining a linear and a quadratic factor of a cubic by observation or long division."],
          ["3.3", "Solve cubic equations."],
        ],
      }),
    ],
  }),
  topic("equations", "4", "Equations, inequalities and graphs", {
    children: [
      sub("equations.modulus-equations", "4.1", "Modulus equations", {
        covers: ["amath.modulus.equations"],
        objectives: [["4.1", "Solve equations involving the modulus of linear and quadratic expressions algebraically or graphically."]],
      }),
      sub("equations.modulus-inequalities", "4.2", "Modulus inequalities", {
        covers: ["amath.modulus.inequalities"],
        objectives: [["4.2", "Solve inequalities involving the modulus of linear and quadratic expressions graphically or algebraically."]],
      }),
      sub("equations.substitution", "4.3", "Equations reducible to quadratics", {
        covers: ["amath.algebra.substitution"],
        objectives: [["4.3", "Use a substitution to form and solve a quadratic equation in order to solve a related equation."]],
      }),
      sub("equations.cubics", "4.4-4.5", "Cubic graphs and cubic inequalities", {
        covers: ["amath.graphs.cubic"],
        objectives: [
          ["4.4", "Sketch cubic graphs given as a product of three linear factors, and their moduli."],
          ["4.5", "Solve cubic inequalities graphically."],
        ],
      }),
    ],
  }),
  topic("simultaneous", "5", "Simultaneous equations", {
    covers: ["amath.algebra.simultaneous-equations"],
    objectives: [["5.1", "Solve simultaneous equations in two unknowns by elimination or substitution."]],
  }),
  topic("logs", "6", "Logarithmic and exponential functions", {
    children: [
      sub("logs.graphs", "6.1", "Properties and graphs of logarithmic and exponential functions", {
        covers: ["amath.logs.graphs"],
        objectives: [["6.1", "Know and use the properties and graphs of logarithmic and exponential functions, including ln x and eˣ and their asymptotes."]],
      }),
      sub("logs.laws", "6.2", "Laws of logarithms", {
        covers: ["amath.logs.laws"],
        objectives: [["6.2", "Know and use the laws of logarithms, including change of base."]],
      }),
      sub("logs.equations", "6.3", "Equations of the form aˣ = b", {
        covers: ["amath.logs.equations"],
        objectives: [["6.3", "Solve equations of the form aˣ = b."]],
      }),
    ],
  }),
  topic("straight-lines", "7", "Straight-line graphs", {
    children: [
      sub("straight-lines.equation", "7.1", "The equation of a straight line", {
        covers: ["amath.coordinate.lines"],
        objectives: [["7.1", "Use the equation of a straight line."]],
      }),
      sub("straight-lines.parallel-perpendicular", "7.2-7.3", "Parallel and perpendicular lines; midpoints, lengths and perpendicular bisectors", {
        covers: ["amath.coordinate.parallel-perpendicular"],
        objectives: [
          ["7.2", "Know and use the conditions for two lines to be parallel or perpendicular."],
          ["7.3", "Solve problems with midpoints and lengths of lines, including the perpendicular bisector."],
        ],
      }),
      sub("straight-lines.linear-form", "7.4", "Transforming relationships to straight-line form", {
        covers: ["amath.coordinate.linear-law"],
        objectives: [["7.4", "Transform relationships to and from straight-line form and find unknown constants from the gradient or intercept."]],
      }),
    ],
  }),
  topic("circle", "8", "Coordinate geometry of the circle", {
    children: [
      sub("circle.equation", "8.1", "The equation of a circle", {
        covers: ["amath.circle.equation"],
        objectives: [["8.1", "Know and use the equation of a circle with given centre and radius, in any form."]],
      }),
      sub("circle.line", "8.2-8.3", "Circles, lines and tangents", {
        covers: ["amath.circle.line-tangents"],
        objectives: [
          ["8.2", "Solve problems on the intersection of a circle and a straight line."],
          ["8.3", "Solve problems involving tangents to a circle."],
        ],
      }),
      sub("circle.two-circles", "8.4", "Intersection of two circles", {
        covers: ["amath.circle.two-circles"],
        objectives: [["8.4", "Solve problems on the intersection of two circles."]],
      }),
    ],
  }),
  topic("circular-measure", "9", "Circular measure", {
    children: [
      sub("circular-measure.arcs-sectors", "9.1", "Arc length and sector area in radians", {
        covers: ["amath.circular.radians", "amath.circular.compound-shapes"],
        objectives: [["9.1", "Solve problems on arc length and sector area, including compound shapes, using radian measure."]],
      }),
    ],
  }),
  topic("trigonometry", "10", "Trigonometry", {
    children: [
      sub("trigonometry.functions", "10.1", "The six trigonometric functions", {
        covers: ["amath.trig.six-ratios"],
        objectives: [["10.1", "Know and use the six trigonometric functions of angles of any magnitude."]],
      }),
      sub("trigonometry.graphs", "10.2-10.3", "Amplitude, period and graphs", {
        covers: ["amath.trig.graphs"],
        objectives: [
          ["10.2", "Understand and use the amplitude and period of a trigonometric function and relate the graphs of related functions."],
          ["10.3", "Draw and use the graphs of y = a sin bx + c, y = a cos bx + c and y = a tan bx + c."],
        ],
      }),
      sub("trigonometry.identities", "10.4, 10.6", "Identities and proofs", {
        covers: ["amath.trig.identities"],
        objectives: [
          ["10.4", "Use the Pythagorean identities in sin and cos, sec and tan, and cosec and cot."],
          ["10.6", "Prove trigonometric relationships involving the six functions."],
        ],
      }),
      sub("trigonometry.equations", "10.5", "Trigonometric equations", {
        covers: ["amath.trig.equations", "amath.trig.equations-identities"],
        objectives: [["10.5", "Solve trigonometric equations involving the six functions in a given domain, using the identities where needed."]],
      }),
    ],
  }),
  topic("permutations", "11", "Permutations and combinations", {
    children: [
      sub("permutations.counting", "11.1-11.3", "Permutations and combinations", {
        covers: ["amath.counting.permutations", "amath.counting.combinations"],
        objectives: [
          ["11.1", "Recognise the difference between permutations and combinations and know when to use each."],
          ["11.2", "Know and use n! and the expressions for permutations and combinations of n items taken r at a time."],
          ["11.3", "Solve arrangement and selection problems with permutations or combinations."],
        ],
      }),
    ],
  }),
  topic("series", "12", "Series", {
    children: [
      sub("series.binomial-expansion", "12.1", "The binomial theorem", {
        covers: ["amath.series.binomial-expansion"],
        objectives: [["12.1", "Use the binomial theorem to expand (a + b)ⁿ for a positive integer n."]],
      }),
      sub("series.binomial-terms", "12.2", "The general term", {
        covers: ["amath.series.binomial-terms"],
        objectives: [["12.2", "Use the general term of a binomial expansion, for example to find a term independent of x."]],
      }),
      sub("series.progressions", "12.3-12.4", "Arithmetic and geometric progressions", {
        covers: ["amath.series.arithmetic", "amath.series.geometric"],
        objectives: [
          ["12.3", "Recognise arithmetic and geometric progressions and the difference between them."],
          ["12.4", "Use the nth-term and sum formulas to solve problems on arithmetic and geometric progressions."],
        ],
      }),
      sub("series.sum-to-infinity", "12.5", "Sum to infinity", {
        covers: ["amath.series.sum-to-infinity"],
        objectives: [["12.5", "Use the condition for a geometric progression to converge and the formula for its sum to infinity."]],
      }),
    ],
  }),
  topic("vectors", "13", "Vectors in two dimensions", {
    children: [
      sub("vectors.notation", "13.1-13.3", "Vector notation, position and unit vectors, magnitude and operations", {
        covers: ["amath.vectors.notation-magnitude", "amath.vectors.geometry"],
        objectives: [
          ["13.1", "Understand and use vector notation."],
          ["13.2", "Know and use position vectors and unit vectors."],
          ["13.3", "Find the magnitude of a vector, add and subtract vectors and multiply them by scalars, including vector geometry."],
        ],
      }),
      sub("vectors.velocities", "13.4", "Composing and resolving velocities", {
        covers: ["amath.vectors.velocity"],
        objectives: [["13.4", "Compose and resolve velocities, including position from a velocity vector."]],
      }),
    ],
  }),
  topic("calculus", "14", "Calculus", {
    children: [
      sub("calculus.derived-function", "14.1-14.2", "The derived function and its notation", {
        covers: ["amath.calculus.derivative-idea"],
        objectives: [
          ["14.1", "Understand the idea of a derived function (informally, without first principles)."],
          ["14.2", "Use the notations for first and second derivatives."],
        ],
      }),
      sub("calculus.standard-derivatives", "14.3", "Derivatives of standard functions and the chain rule", {
        covers: ["amath.calculus.differentiating-powers", "amath.calculus.chain-rule", "amath.calculus.trig-exp-log"],
        objectives: [["14.3", "Know and use the derivatives of xⁿ, sin x, cos x, tan x, eˣ and ln x, with constant multiples, sums and the chain rule."]],
      }),
      sub("calculus.product-quotient", "14.4", "Products and quotients", {
        covers: ["amath.calculus.product-quotient"],
        objectives: [["14.4", "Differentiate products and quotients of functions."]],
      }),
      sub("calculus.tangents-normals", "14.5", "Gradients, tangents and normals", {
        covers: ["amath.calculus.tangents-normals"],
        objectives: [["14.5", "Use differentiation to find gradients, tangents and normals."]],
      }),
      sub("calculus.stationary-points", "14.6, 14.9", "Stationary points and their nature", {
        covers: ["amath.calculus.stationary-points"],
        objectives: [
          ["14.6", "Use differentiation to find stationary points."],
          ["14.9", "Use the first and second derivative tests to tell maxima from minima, with full justification."],
        ],
      }),
      sub("calculus.rates", "14.7", "Connected rates of change, small increments and approximations", {
        covers: ["amath.calculus.rates-of-change", "amath.calculus.small-increments"],
        objectives: [["14.7", "Apply differentiation to connected rates of change, small increments and approximations."]],
      }),
      sub("calculus.max-min", "14.8", "Practical maximum and minimum problems", {
        covers: ["amath.calculus.max-min-problems"],
        objectives: [["14.8", "Apply differentiation to practical problems involving maxima and minima."]],
      }),
      sub("calculus.integration", "14.10-14.11", "Integration as the reverse of differentiation", {
        covers: ["amath.calculus.integration-basics"],
        objectives: [
          ["14.10", "Understand integration as the reverse process of differentiation."],
          ["14.11", "Integrate sums of terms in powers of x, including 1/x and 1/(ax + b)."],
        ],
      }),
      sub("calculus.integration-functions", "14.12", "Integrating standard functions", {
        covers: ["amath.calculus.integration-functions"],
        objectives: [["14.12", "Integrate (ax + b)ⁿ for rational n, sin(ax + b), cos(ax + b), sec²(ax + b) and e^(ax+b)."]],
      }),
      sub("calculus.definite-integrals", "14.13", "Definite integrals and plane areas", {
        covers: ["amath.calculus.definite-integrals-area"],
        objectives: [["14.13", "Evaluate definite integrals and find plane areas, including between a line and a curve and between two curves."]],
      }),
      sub("calculus.kinematics", "14.14-14.15", "Kinematics", {
        covers: ["amath.calculus.kinematics"],
        objectives: [
          ["14.14", "Apply differentiation and integration to the displacement, velocity and acceleration of a particle moving in a straight line."],
          ["14.15", "Draw and use displacement–time, distance–time, velocity–time, speed–time and acceleration–time graphs."],
        ],
      }),
    ],
  }),
];

const c0606 = {
  board: "cambridge",
  qualification: "igcse",
  subject: "additional-mathematics",
  versionLabel: "2025-2027",
  family: "additional-mathematics-o",
  title: "Cambridge IGCSE Additional Mathematics (0606)",
  code: "0606",
  effectiveFrom: "2025-01-01",
  effectiveTo: "2027-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge IGCSE Additional Mathematics 0606 syllabus for 2025, 2026 and 2027 (version 1, with the syllabus update of February 2024)",
    url: "https://www.cambridgeinternational.org/Images/662470-2025-2027-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Topic headings and their numbers (1 to 14) are transcribed from the subject content of the official syllabus; objective codes are the syllabus's own content numbers (for example 10.5), and where several content numbers share one node the node code names them (for example 2.1-2.2). Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Read 2026-10-09 from the official PDF (version 1, for exams in 2025, 2026 and 2027): the 14 topics, every numbered content item with its notes and examples, the assessment overview, the details of the assessment, the List of formulas, the mathematical conventions, the command words and the list of changes.",
    "Syllabus update applied: the separate update notice for this syllabus (dated February 2024) records only minor amendments to the marking principles in the mark schemes and updated specimen materials. It changes no subject content, papers, timings, marks or formulas, so nothing in this file differs because of it; content writers should follow the updated specimen mark schemes' marking principles (for example full justification and accuracy conventions).",
    "Assessment as read: Paper 1, non-calculator (calculators not allowed), 2 hours, 80 marks, 50%; Paper 2, calculator (a scientific calculator is required), 2 hours, 80 marks, 50%. Both papers: structured and unstructured questions on any part of the content, all questions compulsory, externally marked. Grades A* to E (F and G not available). AO1 (knowledge and understanding of techniques) and AO2 (analyse, interpret and communicate) each 45-55% of each paper.",
    "Conventions as read: non-exact answers to 3 significant figures and angles in degrees to 1 decimal place unless stated; exact answers in terms of π, e, ln, surds where asked; 'show that' needs full working; a List of formulas is printed (circle equation, cone and sphere formulas, quadratic formula, binomial theorem, arithmetic and geometric series, the three Pythagorean trigonometric identities, sine and cosine rules and the area of a triangle); no calculus formulas are given; arc-length and sector-area formulas are not given; trigonometric calculus uses radians.",
    "Exclusions printed in the content: differentiation from first principles, points of inflexion, permutations with repeated objects or in a circle, problems needing both permutations and combinations, the greatest term and properties of binomial coefficients, and series expansions of eˣ and ln x. Indices and surds were removed as a topic for 2025 and are assumed knowledge from IGCSE Mathematics (not tested directly but needed in answers); the coordinate geometry of the circle was added and Paper 1 became a non-calculator paper.",
    "This version runs to the 2027 examinations; create a new version file when the syllabus for 2028 onwards is published.",
    "Not in this syllabus (taught in the family for ZIMSEC only): indices and exponential equations and surds as topics (assumed knowledge here), identities and unknown coefficients, linear inequalities, the behaviour of sequences, sigma notation, volumes of revolution, all of probability and statistics (probability, data, averages and dispersion, discrete and continuous random variables, binomial and normal distributions, sampling and estimation) and all of mechanics (kinematics with the equations of motion, forces, equilibrium, friction, Newton's laws, work, energy and power).",
  ],
  overview: "Cambridge IGCSE Additional Mathematics stretches able IGCSE Mathematics learners and prepares them for AS & A Level Mathematics. It covers 14 topics of pure mathematics: functions; quadratic functions; factors of polynomials; equations, inequalities and graphs (including the modulus function and cubic graphs); simultaneous equations; logarithmic and exponential functions; straight-line graphs; the coordinate geometry of the circle; circular measure; trigonometry; permutations and combinations; series (binomial theorem, arithmetic and geometric progressions); vectors in two dimensions; and calculus (differentiation, integration and kinematics).",
  assessmentOverview: "All candidates take Paper 1 (non-calculator, 2 hours, 80 marks, 50%) and Paper 2 (calculator, 2 hours, 80 marks, 50%). Both papers contain compulsory structured and unstructured questions on any part of the content. Grades A* to E.",
  components: [
    { code: "1", name: "Paper 1: Non-calculator", kind: "WRITTEN", description: "Structured and unstructured questions on any part of the content; all questions compulsory; calculators are not allowed.", durationMinutes: 120, maxMarks: 80, weightingPercent: 50, calculatorAllowed: false },
    { code: "2", name: "Paper 2: Calculator", kind: "WRITTEN", description: "Structured and unstructured questions on any part of the content; all questions compulsory; a scientific calculator is required.", durationMinutes: 120, maxMarks: 80, weightingPercent: 50, calculatorAllowed: true },
  ],
  topics: C0606_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Checks: every covered concept exists, each concept is covered at most once per syllabus (on a node without children),
// every concept is covered by at least one syllabus, node keys and objective codes are unique; report what each
// syllabus leaves out.
const coveredAnywhere = new Set();
for (const s of [zimsec, c0606]) {
  const seen = new Map();
  const codes = new Set();
  const keys = new Set();
  let nodes = 0;
  const walk = (list) => {
    for (const n of list) {
      nodes++;
      if (keys.has(n.key)) throw new Error(`${s.board}: duplicate node key ${n.key}`);
      keys.add(n.key);
      if ((n.covers ?? []).length && (n.children ?? []).length) throw new Error(`${s.board}: ${n.key} covers concepts and has children (cover on the most specific node)`);
      for (const c of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: unknown concept ${c} on ${n.key}`);
        if (seen.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: ${c} covered on ${seen.get(c)} and ${n.key}`);
        seen.set(c, n.key);
        coveredAnywhere.add(c);
      }
      for (const o of n.objectives ?? []) {
        if (codes.has(o.code)) throw new Error(`${s.board}: duplicate objective code ${o.code}`);
        codes.add(o.code);
      }
      walk(n.children ?? []);
    }
  };
  walk(s.topics);
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${s.topics.length} top-level nodes, ${nodes} nodes, ${seen.size} concepts covered, ${codes.size} objectives; not covered (${missing.length}): ${missing.join(", ") || "none"}`);
}
const orphans = [...CONCEPT_KEYS].filter((k) => !coveredAnywhere.has(k));
if (orphans.length) throw new Error(`concepts no syllabus covers: ${orphans.join(", ")}`);
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept keys");
for (const [k] of CONCEPTS) if (!/^amath\.[a-z-]+\.[a-z-]+$/.test(k)) throw new Error(`bad concept key ${k}`);
const names = new Set(CONCEPTS.map(([, n]) => n));
if (names.size !== CONCEPTS.length) throw new Error("duplicate concept names");
console.log(`${CONCEPTS.length} concepts in the registry`);

const registry = {
  family: "additional-mathematics-o",
  name: "Additional Mathematics (O-Level / IGCSE)",
  level: "O",
  prefix: "amath",
  subjects: ["zimsec/o-level/additional-mathematics", "cambridge/igcse/additional-mathematics"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description })),
};

const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/additional-mathematics-o.json", registry);
write("content/syllabi/zimsec/o-level/additional-mathematics/2015-2022.json", zimsec);
write("content/syllabi/cambridge/igcse/additional-mathematics/2025-2027.json", c0606);
