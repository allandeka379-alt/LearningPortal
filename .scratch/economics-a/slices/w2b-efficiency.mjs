// W2b: economic efficiency (both boards; Cambridge A Level only, ZIMSEC Form 6).
import { concept, P, ZIM, chk, fmt, dpStr, costTable, monopolyLinear, table } from "../lib.mjs";
import { mc, LV8 } from "../tables/w2b-kit.mjs";

concept("aecon.firms.efficiency", { file: "firms/efficiency", keyPrefix: "firms.efficiency" }, (b) => {
  mc(b, [1, "RECALL"], "Productive efficiency is achieved when a firm produces",
    ["at the lowest point of its ATC curve", "Correct: no resources are wasted in making each unit."],
    [["where price is equal to marginal cost", "That is the condition for allocative efficiency."],
     ["the largest output its plant can make", "Productive efficiency is about cost per unit, not the size of output."],
     ["where total revenue is at its maximum", "This has nothing to do with cost efficiency."]],
    "Productive efficiency means the lowest possible ATC, which is where MC cuts ATC from below.");

  mc(b, [2, "UNDERSTANDING"], "Allocative efficiency in a market with no externalities requires that",
    ["price equals marginal cost", "Correct: the value of the last unit equals the cost of the resources used."],
    [["price equals average total cost", "That gives normal profit, not allocative efficiency."],
     ["marginal cost is at its minimum", "The minimum of MC says nothing about what consumers value."],
     ["average cost is at its minimum", "That is productive efficiency."]],
    "P = MC shows that consumers value the last unit at exactly what it costs society to make.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which market structure is productively and allocatively efficient in the long run?",
    ["Perfect competition", "Correct: free entry drives price to minimum ATC, and P = MC."],
    [["Monopoly", "A monopolist sets a price above MC."],
     ["Monopolistic competition", "It ends with excess capacity and P above MC."],
     ["Oligopoly", "Firms normally have price-setting power, so P is above MC."]],
    "Only the perfectly competitive firm ends up with P = MC = minimum ATC.");

  mc(b, [3, "APPLICATION"], "A firm's average total cost at four outputs is US\\$14 at 10 units, US\\$12 at 20 units, US\\$11 at 30 units and US\\$13 at 40 units. Productive efficiency is most likely to be achieved at an output of",
    ["30 units", "Correct: ATC is lowest (US\\$11) at 30 units."],
    [["10 units", "ATC is highest here."], ["20 units", "ATC is still falling at this point."], ["40 units", "ATC is rising again after 30 units."]],
    "Productive efficiency is at the lowest ATC of the four outputs shown: 30 units.", { hints: ["Look for the lowest ATC."] });

  mc(b, [3, "ANALYSIS"], "A privatised bus company has costs 20% above those of a similar firm in a competitive market, because its managers face no threat from rivals. This is an example of",
    ["X-inefficiency", "Correct: slack because competitive pressure is weak."],
    [["diseconomies of scale", "That describes rising long-run average cost as output grows."],
     ["allocative inefficiency", "That is about price compared with MC."],
     ["technical efficiency", "A technically efficient firm wastes no inputs."]],
    "X-inefficiency is cost above the minimum possible caused by lack of competitive pressure.", { hints: ["Is the problem the size of output, or the cost at a given output?"] });

  mc(b, [3, "UNDERSTANDING"], "Which action is a gain in dynamic efficiency?",
    ["Using supernormal profit to buy machines that cut future costs", "Correct: investment lowers costs over time."],
    [["Cutting this month's price to equal marginal cost", "That is a move towards allocative efficiency now."],
     ["Moving to the lowest point on the existing ATC curve", "That is a gain in productive efficiency."],
     ["Letting staff finish early because there is no competition", "This is X-inefficiency."]],
    "Dynamic efficiency concerns innovation and investment that improve efficiency over time.", { hints: ["Which option affects the future cost curve rather than today's?"] });

  mc(b, [4, "ANALYSIS"], "Compared with a perfectly competitive industry with the same cost curves, a profit-maximising monopolist will normally",
    ["charge a higher price and produce a smaller output", "Correct: it restricts output to raise price above MC."],
    [["charge a lower price and produce a larger output", "This reverses the effect of market power."],
     ["produce where price equals marginal cost", "It produces where MR = MC, with P above MC."],
     ["produce at the lowest point of ATC in the long run", "It has no pressure to do so."]],
    "A monopolist sets MR = MC, giving a smaller output and a higher price than competition.", { hints: ["Compare the monopolist's MR = MC rule with P = MC."] });

  mc(b, [2, "RECALL"], "Two workshops use identical labour and machines. Workshop X makes 200 chairs a week and Workshop Y makes 160. Workshop Y is",
    ["technically inefficient, because it gets less output from the same inputs", "Correct: it is not getting the maximum output from its inputs."],
    [["technically efficient, because it uses all its inputs", "Using the inputs is not enough: the output must be the maximum."],
     ["allocatively efficient, because it makes chairs people want", "Allocative efficiency is about price and marginal cost."],
     ["dynamically efficient, because output could rise in future", "Dynamic efficiency is about innovation over time."]],
    "Technical efficiency is the maximum output from given inputs; Workshop Y falls short of Workshop X.", { applies: ZIM });

  {
    const m = monopolyLinear({ a: 90, b: 3, c: 30 });
    chk(m.welfareLoss, 150, 1e-9);
    b.num({ d: 4, skill: "APPLICATION", kind: "plain", value: m.welfareLoss, unit: "US$ thousand", hints: ["Find the monopoly and competitive outputs, then use the triangle."],
      stem: "A fictional monopoly in Harare faces demand P = 90 − 3Q (P in US\\$, Q in thousand units) and has constant marginal cost of US\\$30. Calculate the deadweight welfare loss compared with perfect competition, in US\\$ thousand.",
      wrong: [300, 75, 450],
      explanation: "MR = 90 − 6Q = 30, so the monopoly output is 10 thousand and its price is 90 − 30 = US\\$60. Competition would give P = MC: 90 − 3Q = 30, so Q = 20 thousand. Welfare loss = ½ × (60 − 30) × (20 − 10) = US\\$150 thousand. Using the whole rectangle gives 300." });
  }
  {
    const ct = costTable({ output: [0, 10, 20, 30, 40, 50], fc: 200, vc: [0, 300, 500, 660, 880, 1200] });
    const r30 = ct.rows[3];
    chk(r30.atc, 860 / 30, 1e-9);
    const waste = r30.tc - 30 * ct.rows[4].atc;
    chk(waste, 50, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", kind: "money", value: waste, hints: ["Find the lowest ATC first."],
      stem: "A fictional furniture firm has fixed costs of US\\$200 and total variable costs of US\\$300, US\\$500, US\\$660, US\\$880 and US\\$1,200 at outputs of 10, 20, 30, 40 and 50 units. Its lowest ATC is at 40 units. The firm currently makes 30 units. How much less would 30 units cost per week at that lowest ATC? Give your answer in US\\$.",
      wrong: [30, 1.67, 220],
      explanation: "1. TC at 30 units = 200 + 660 = US\\$860.\n2. Lowest ATC = (200 + 880) ÷ 40 = US\\$27.\n3. 30 units at US\\$27 would cost 30 × 27 = US\\$810.\n4. Saving = 860 − 810 = US\\$50. Subtracting ATCs (28.67 − 27 = 1.67) gives the saving per unit, not the total." });
  }
  {
    const w = (29 - 24) * 14;
    chk(w, 70, 0);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: w, unit: "US$ thousand",
      stem: "A protected monopoly makes 14 thousand units a year at an average cost of US\\$29. A competing firm of the same size could make them at US\\$24 a unit. How much does X-inefficiency cost the monopoly each year, in US\\$ thousand?",
      wrong: [5, 406, 336],
      explanation: "Excess cost per unit = 29 − 24 = US\\$5. Total = 5 × 14 thousand = US\\$70 thousand." });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A firm that produces at the lowest point of its ATC curve is always allocatively efficient.", answer: false,
    explanation: "False. Productive efficiency is about cost; allocative efficiency needs price equal to marginal cost, which a firm with market power may not meet." });
  b.tf({ d: 3, skill: "UNDERSTANDING", hints: ["Think about who has the money to pay for research."], stem: "A monopoly could be more dynamically efficient than a perfectly competitive firm.", answer: true,
    explanation: "True. Supernormal profit can fund research and investment, and patents reward innovation, although competition can also push firms to innovate." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each type of efficiency with its condition.",
    pairs: [["Productive efficiency", "Output at the lowest point of ATC (MC = ATC)"], ["Allocative efficiency", "Price equal to marginal cost"], ["Dynamic efficiency", "Innovation and investment that improve efficiency over time"], ["X-inefficiency", "Costs above the minimum because of weak competition"]],
    explanation: "Each type of efficiency has a distinct test: cost per unit, price against MC, change over time, and slack." });

  b.fib({ d: 2, skill: "RECALL", stem: "Complete the conditions.",
    template: "A firm is productively efficient where {{blank:a}} is at its minimum, and allocatively efficient where price equals {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["average total cost"], choices: ["average total cost", "average revenue", "marginal revenue"] }, { id: "b", accepted: ["marginal cost"], choices: ["marginal cost", "average cost", "marginal revenue"] }],
    explanation: "Productive efficiency is the minimum of ATC; allocative efficiency is P = MC." });

  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the type of efficiency achieved when a firm produces at the output where MC = ATC.",
    accepted: ["productive efficiency", "productive", "cost efficiency"], wrong: ["allocative efficiency"],
    explanation: "MC cuts ATC at its minimum point, so the firm is productively efficient." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define allocative efficiency.",
    points: ["Resources are allocated to produce the goods and services consumers value most.", "In a market without externalities it occurs where price equals marginal cost."],
    modelAnswer: "Allocative efficiency occurs when resources are used to produce the combination of goods that consumers want most, which in a market without externalities happens where price equals marginal cost.",
    explanation: "One mark for the idea of matching output to what consumers value and one for P = MC." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Compare price with MC at the monopolist's output."],
    stem: "Explain why a monopoly is allocatively inefficient.",
    points: ["The monopolist faces a downward-sloping demand curve, so MR is below price.", "It maximises profit where MR = MC.", "At that output price is above MC.", "Consumers value extra units at more than their cost but they are not produced, so there is a welfare (deadweight) loss."],
    modelAnswer: "A monopolist faces a downward-sloping demand curve, so its marginal revenue is below price. It produces where MR = MC, and at that output the price is above marginal cost. Consumers would pay more than the cost of extra units, yet those units are not produced, so there is a deadweight loss and resources are misallocated.",
    explanation: "Credit the MR-below-price logic, the profit-maximising rule, P > MC and the welfare loss." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Where do the funds for innovation come from?"],
    stem: "Analyse why a monopoly may be more dynamically efficient than a perfectly competitive firm.",
    points: ["A monopoly can earn supernormal profit in the long run.", "This profit can be used to fund research, development and new equipment.", "Patents or barriers protect the gains from innovation.", "Innovation lowers costs or raises quality over time, which may outweigh the static loss."],
    modelAnswer: "A monopoly can keep earning supernormal profit because of barriers to entry. These funds can pay for research and new equipment, and patents protect the rewards from innovation. New processes and products lower costs or raise quality over time, so the long-run gain may outweigh the static allocative loss, whereas a firm earning only normal profit has fewer funds.",
    explanation: "Credit profit as a source of funds, the use of funds, protection of rewards and the long-run benefit." });

  {
    const ct = costTable({ output: [0, 10, 20, 30, 40, 50], fc: 200, vc: [0, 300, 500, 660, 880, 1200] });
    chk(ct.rows[4].atc, 27, 1e-9);
    const tbl = table(["Output (units a week)", "Total cost (US\\$)", "ATC (US\\$)"], ct.rows.slice(1).map((r) => [r.q, r.tc, dpStr(r.atc, 2)]));
    const excess = ct.rows[3].tc - 30 * ct.rows[4].atc;
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["ATC = total cost ÷ output.", "Compare actual cost with cost at the lowest ATC."],
      stem: `**A furniture workshop in Gweru (illustrative data)**\n\nThe table shows the total cost of a fictional workshop that makes wardrobes.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: ct.rows[4].atc, stem: "Calculate the lowest value of ATC shown, in US\\$.", wrong: [28, 1080, 28.67], explanation: "ATC at 40 units = 1,080 ÷ 40 = US\\$27, lower than at 30 units (28.67) or 50 units (28.00)." }),
        P.mcq({ label: "(b)", marks: 1, stem: "At which output is the workshop productively efficient?", options: [["10 units", "ATC is US\\$50, the highest."], ["20 units", "ATC is US\\$35."], ["40 units", "Correct: ATC is lowest (US\\$27)."], ["50 units", "ATC has begun to rise."]], answer: "C", explanation: "The lowest ATC is at 40 units." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: excess, stem: "The workshop now makes 30 units. Calculate how much less these 30 units would cost at the lowest ATC, in US\\$.", wrong: [1.67, 860, 810], explanation: "Actual cost = US\\$860. At US\\$27 a unit, 30 units would cost 810. The difference is US\\$50." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why a firm that is productively efficient may not be allocatively efficient.",
          points: ["Productive efficiency concerns the cost of making each unit.", "Allocative efficiency needs price to equal marginal cost.", "A firm with market power can produce at lowest cost yet charge a price above MC (or make goods consumers value less)."],
          modelAnswer: "Productive efficiency is about producing at the lowest average cost. Allocative efficiency requires price to equal marginal cost, so that output matches what consumers value. A firm with market power may produce at the lowest cost but charge a price above marginal cost, restricting output, so it can be productively but not allocatively efficient." }),
        P.manual({ label: "(e)", marks: 2, stem: "State **two** ways in which the workshop might reduce X-inefficiency.",
          points: ["Greater competition or the threat of competition (for example, removing barriers or tendering for contracts).", "Better incentives and monitoring of managers and workers (for example, performance targets or profit sharing)."],
          modelAnswer: "More competition, or the threat of it, would force the workshop to keep costs down, and better monitoring and incentives such as performance targets or profit sharing would reduce slack." }),
      ],
      explanation: "Lowest ATC US\\$27 at 40 units; waste of US\\$50 at 30 units; productive efficiency differs from allocative efficiency." });
  }
  {
    const m = monopolyLinear({ a: 90, b: 3, c: 30 });
    chk(m.monopoly.quantity, 10, 1e-9); chk(m.monopoly.price, 60, 1e-9);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Set MR = MC.", "The welfare loss is a triangle."],
      stem: "**A monopoly bottler in Harare (illustrative data)**\n\nA fictional bottler is the only supplier of mineral water in a region. Demand is P = 90 − 3Q, where P is price in US\\$ and Q is output in thousand bottles. Marginal cost is constant at US\\$30. The regulator is considering a maximum price of US\\$30.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: m.monopoly.quantity, unit: "units", stem: "Calculate the profit-maximising output, in thousand bottles. (MR = 90 − 6Q.)", wrong: [20, 15, 30], explanation: "MR = MC: 90 − 6Q = 30, so Q = 10 thousand." }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: m.monopoly.price, stem: "Calculate the price the monopolist charges, in US\\$.", wrong: [30, 90, 45], explanation: "P = 90 − 3 × 10 = US\\$60." }),
        P.num({ label: "(c)", marks: 3, kind: "plain", value: m.welfareLoss, unit: "US$ thousand", stem: "Calculate the welfare loss compared with perfect competition, in US\\$ thousand.", wrong: [300, 75, 450], explanation: "Competitive output: 90 − 3Q = 30, Q = 20. Loss = ½ × (60 − 30) × (20 − 10) = US\\$150 thousand." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain how a maximum price of US\\$30 could improve allocative efficiency.",
          points: ["At a price equal to MC (US\\$30) the monopolist's price is no longer above marginal cost.", "Because the price cap makes MR equal to the cap up to the quantity demanded, the firm increases output to 20 thousand.", "Output rises to the level where P = MC, removing the welfare loss."],
          modelAnswer: "A cap of US\\$30 equals marginal cost. The firm can no longer raise price by restricting output, because up to the quantity demanded at US\\$30 each extra bottle earns US\\$30. It therefore expands output to 20 thousand bottles, where price equals marginal cost, and the welfare loss disappears." }),
        P.manual({ label: "(e)", marks: 3, stem: "Evaluate **one** disadvantage of the maximum price for the long-run efficiency of the bottler.",
          points: ["With a price equal to MC the firm earns no supernormal profit above its costs of production (and may make a loss if there are fixed costs).", "Lower profit reduces funds and incentives for research and investment (dynamic efficiency).", "The regulator may not know the true MC, and cost-plus rules reduce the incentive to cut costs."],
          modelAnswer: "A price at marginal cost leaves little or no profit to cover fixed costs, so the bottler has less money and less incentive to invest in new equipment or research, which reduces dynamic efficiency over time. The regulator may also be unsure of true costs, and if the firm expects to be paid its costs, it has less reason to cut them." }),
      ],
      explanation: "Monopoly output 10 thousand at US\\$60; welfare loss US\\$150 thousand; a cap at MC improves allocative efficiency but may harm dynamic efficiency." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare static and dynamic efficiency.", "Reach a judgement."],
    stem: "Assess whether perfect competition is more efficient than monopoly.",
    points: ["Perfect competition is productively efficient in the long run (P = minimum ATC).", "It is allocatively efficient (P = MC); monopoly charges P above MC and creates a welfare loss.", "Monopoly output is lower and price higher for the same costs.", "A monopoly may enjoy economies of scale, so its costs could be lower than a competitive industry's.", "Monopoly profit can fund R&D (dynamic efficiency); a competitive firm earns only normal profit.", "Competition forces firms to cut costs; a monopoly risks X-inefficiency.", "Perfect competition is a theoretical benchmark and its assumptions are rarely met.", "A judgement based on scale economies, regulation and the time horizon."],
    levels: LV8,
    modelAnswer: "In the long run a perfectly competitive firm produces at the lowest point of ATC and sets price equal to marginal cost, so it is productively and allocatively efficient. A monopolist restricts output and charges a price above marginal cost, so it is allocatively inefficient and causes a welfare loss, and without competitive pressure it may be X-inefficient. However, the comparison is not so simple. A monopoly can gain economies of scale that a collection of small firms cannot, so its costs might be lower, and its supernormal profit can fund research and investment, giving dynamic efficiency that a firm earning only normal profit cannot match. Perfect competition is also a benchmark that real markets rarely meet. Overall, perfect competition is more efficient in a static sense, but a regulated monopoly with large scale economies and strong investment could be more efficient over time, so the answer depends on the size of the scale economies and the effectiveness of regulation.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Contrast static efficiency with scale economies and dynamic efficiency, then reach a supported judgement." });

  b.card("DEFINITION", "Define **productive efficiency**.", "Producing output at the lowest possible average total cost: the lowest point of the ATC curve, where MC = ATC.");
  b.card("DEFINITION", "Define **allocative efficiency**.", "Resources are allocated to the goods consumers value most; with no externalities it occurs where price = marginal cost.");
  b.card("FORMULA", "State the conditions for productive and allocative efficiency.", "Productive: MC = ATC (minimum ATC). Allocative: P = MC (generally marginal social benefit = marginal social cost).");
  b.card("DEFINITION", "Define **technical efficiency**.", "Obtaining the maximum output from a given set of inputs.", "ZIMSEC detail", { applies: ZIM });
  b.card("DEFINITION", "Define **dynamic efficiency**.", "Improvements in efficiency over time through innovation, new products and investment.");
  b.card("DEFINITION", "Define **X-inefficiency**.", "Costs above the minimum possible because weak competition lets managers and workers become slack.");
  b.card("DEFINITION", "What is **Pareto efficiency**?", "A situation in which no one can be made better off without making someone else worse off.");
  b.card("CONCEPT", "Is a perfectly competitive firm efficient in the long run?", "Yes, productively and allocatively: price falls to minimum ATC and equals MC. It is weak on dynamic efficiency because it earns only normal profit.");
  b.card("CONCEPT", "Why is monopoly allocatively inefficient?", "It sets MR = MC, which gives a price above MC and output below the efficient level, creating a welfare loss.");
});
