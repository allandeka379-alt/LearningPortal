// W2a: ZIMSEC exam-format items: one Paper 2 data-response question (20 marks) and three Paper 3 essays (10 + 15 marks), on costs and market structures.
import { concept, P, chk, fmt, table, costTable, EXAM, checkExam, ZIM } from "../lib.mjs";

const A = (k) => `aecon.${k}`;
const P2 = { skill: EXAM.ZIM_P2_DATA.skill, secs: EXAM.ZIM_P2_DATA.secs, applies: EXAM.ZIM_P2_DATA.applies, examStyle: true, paper: "Paper 2" };
const P3 = { skill: EXAM.ZIM_P3_ESSAY.skill, secs: EXAM.ZIM_P3_ESSAY.secs, applies: EXAM.ZIM_P3_ESSAY.applies, examStyle: true, paper: "Paper 3" };

const LV15 = [
  [3, 11, 15, "Two-sided, developed and applied analysis with a justified conclusion that answers the question."],
  [2, 6, 10, "Some analysis of one or both sides, limited application, a partial or unsupported conclusion."],
  [1, 1, 5, "Simple, undeveloped points with little or no explanation or conclusion."],
];
const LV5 = [
  [3, 4, 5, "Both options weighed using the data, with a supported judgement."],
  [2, 2, 3, "Some weighing of options with limited use of the data."],
  [1, 1, 1, "A simple statement with little application."],
];

concept(A("firms.perfect-competition"), { file: "exam/w2a-zimsec", keyPrefix: "exam.w2a-zimsec", applies: ZIM }, (b) => {
  // ------------------------------------------------------------------ Paper 2 data response: a brickworks facing a lower price
  const out = [0, 1, 2, 3, 4, 5, 6, 7];
  const vc = [0, 36, 62, 84, 108, 138, 176, 224];
  const ct = costTable({ output: out, fc: 50, vc, marginal: true });
  const R = ct.rows;
  const profit = (price, q) => price * q - R[q].tc;
  const bestQ = (price) => R.slice(1).reduce((m, r) => (profit(price, r.q) > profit(price, m.q) ? r : m)).q;
  chk(bestQ(32), 5); chk(profit(32, 5), -28); chk(R[5].atc, 37.6, 1e-9); chk(R[5].mc, 30); chk(R[5].avc, 27.6, 1e-9);
  chk(R[0].tc, 50); chk((32 - R[5].avc) * 5, 22, 1e-9);
  if (!(R[4].mc < R[5].mc && R[5].mc < R[6].mc)) throw new Error("MC must rise");
  const md = ct.md;

  b.struct({
    ...P2, d: 4, calculator: true,
    concepts: [A("costs.short-run-costs"), A("costs.revenue-curves"), A("costs.profit-types"), A("firms.perfect-competition")],
    hints: ["The firm is a price-taker: it produces where marginal cost is just below the price.", "Compare the loss from producing with the loss from closing."],
    stem: `**Zandia Brickworks** (a fictional business)\n\nZandia Brickworks is one of about 60 small firms that make clay bricks for builders in the fictional town of Zandia. The bricks made by the different firms are almost identical, and builders buy from whichever firm offers the lowest price. The market price is set by the total supply of all the firms and the demand of builders, so no single firm can influence it. Entry into brick making is easy, because a small kiln can be built for little money and the skills are widely known.\n\nFor several years the price of bricks was high and many firms made good profits. This attracted new brickmakers, and last year the number of firms in the district rose from 45 to 60. As more bricks reached the market, the price fell to US\\$32 per unit (a unit is a thousand bricks). The owner of Zandia Brickworks, Tendai, is worried. He pays fixed costs of US\\$50 a week for the kiln site, a licence and a loan on equipment, whatever he produces. His variable costs are mainly clay, firewood and labour paid by the day. Wages are rising, and, because the kiln cannot be enlarged, each extra worker adds less output than the previous worker.\n\nTendai could close the brickworks and look for a job, but he would lose the equipment and his customers would turn to other firms. He believes that building in Zandia will increase when the new housing estate is finished, which should raise the demand for bricks.\n\n**Table 1: weekly costs of Zandia Brickworks** (illustrative data; output in units of 1,000 bricks)\n\n${md}`,
    parts: checkExam(EXAM.ZIM_P2_DATA, [
      P.num({ label: "(a)", marks: 2, kind: "money", value: R[5].atc, dp: 2, stem: "Using Table 1, calculate the average total cost of producing 5 units, in US\\$.", wrong: [27.6, 188, 30],
        explanation: "TC at 5 units = 188; ATC = 188 ÷ 5 = US\\$37.60." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: R[5].mc, stem: "Calculate the marginal cost of the fifth unit, in US\\$.", wrong: [37.6, 138, 27.6],
        explanation: "MC = change in TC = 188 − 158 = US\\$30 (the change in total variable cost, 138 − 108)." }),
      P.group({ label: "(c)", stem: "The market price is US\\$32 per unit.", parts: [
        P.num({ label: "(i)", marks: 1, kind: "plain", value: 5, unit: "units", stem: "State the output at which Tendai maximises profit (minimises his loss).", wrong: [4, 6, 7],
          explanation: "MC of the fifth unit (30) is below the price; MC of the sixth (38) is above it." }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: profit(32, 5), stem: "Calculate his profit at that output (a loss is negative), in US\\$.", wrong: [160, 188, 28],
          explanation: "TR = 32 × 5 = 160; TC = 188; profit = −US\\$28, a loss of US\\$28." }),
      ] }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain why Tendai may continue to produce in the short run even though he is making a loss.",
        points: ["Fixed costs (US\\$50) must be paid whether or not he produces.", "The price (US\\$32) is above average variable cost (US\\$27.60 at 5 units), so each unit contributes to fixed costs.", "The loss from producing (US\\$28) is smaller than the loss from closing (US\\$50).", "The price may recover when the housing estate is built; closing would lose equipment and customers."],
        modelAnswer: "Tendai has to pay the fixed costs of US\\$50 whether or not he produces. The price of US\\$32 is above the average variable cost of US\\$27.60, so every unit sold covers its variable cost and contributes towards the fixed costs: US\\$22 in total. His loss from producing is therefore US\\$28, which is less than the US\\$50 he would lose by closing. He also expects demand to rise when the new housing estate is finished, and closing would lose his equipment and customers." }),
      P.manual({ label: "(e)", marks: 4, stem: "Analyse how the entry of new brickmakers into the district caused the price of bricks to fall.",
        points: ["High profits attracted new firms because entry was easy (supernormal profit).", "The number of firms rose from 45 to 60, so industry supply increased (shifted to the right).", "With demand unchanged, a larger supply gives a surplus at the old price.", "The price fell until the market cleared (to US\\$32)."],
        modelAnswer: "The high prices gave supernormal profits, and because entry into brick making is easy, new firms were attracted into the district. The number of firms rose from 45 to 60, which increased the industry's supply and shifted the supply curve to the right. With demand unchanged, there was a surplus at the old price, so sellers lowered their prices to sell their bricks, and the price fell until the market cleared at US\\$32." }),
      P.manual({ label: "(f)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { min: 80, max: 250 }, levels: LV5,
        stem: "Discuss whether Tendai should close the brickworks permanently.",
        points: ["In the short run the price covers average variable cost, so he can reduce the loss by producing.", "In the long run the price (US\\$32) is below the average total cost (US\\$37.60), so he earns less than normal profit.", "If the price stays low, firms will leave until it returns to normal profit; Tendai may be one of them.", "Expected rise in demand from the housing estate might raise the price above average total cost.", "Closing loses equipment and customers; the decision depends on his expectations and alternative income."],
        modelAnswer: "In the short run the price of US\\$32 covers the average variable cost, so producing reduces his loss from US\\$50 to US\\$28, which is an argument for staying open. In the long run, however, the price is below the average total cost of US\\$37.60 at his best output, so he earns less than normal profit, and if the price stays low he should leave the industry, as other firms are likely to do until the price recovers. On the other hand, he expects demand to rise with the new housing estate, which might lift the price above his average total cost, and closing would lose his equipment and customers. On balance he should not close permanently yet: he should keep producing while the price covers variable cost and review the decision when he sees whether the price recovers; if it stays below US\\$37.60 he should leave." }),
    ]),
    explanation: "ATC at 5 units US\\$37.60; MC of the fifth unit US\\$30; at US\\$32 he produces 5 units and loses US\\$28 (against US\\$50 if he closed); entry shifted supply right and lowered the price.",
  });

  // ------------------------------------------------------------------ Paper 3 essays
  // Essay 1: how a perfectly competitive firm decides output; is perfect competition best for consumers
  b.struct({
    ...P3, d: 5,
    concepts: [A("firms.perfect-competition"), A("costs.revenue-curves"), A("costs.profit-types"), A("firms.monopoly")],
    hints: ["In (a) describe the revenue curves, the rule and the shutdown condition.", "In (b) compare perfect competition with monopoly on price, output, efficiency and innovation."],
    stem: "Farmers selling maize at a town market act as price-takers.",
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({ label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { min: 150, max: 400 },
        stem: "Explain how a price-taking firm decides how much to produce in the short run.",
        points: [
          "A price-taker cannot influence the market price: its demand curve is horizontal at the price.",
          "So price = average revenue = marginal revenue.",
          "Marginal cost first falls and then rises because of diminishing marginal returns.",
          "If MR exceeds MC, the next unit adds more to revenue than to cost, so the firm expands.",
          "If MC exceeds MR, the last unit lowers profit, so the firm cuts output.",
          "Profit is greatest where MC = MR (= price), with MC rising.",
          "The profit is (price − average total cost) × output.",
          "The firm should continue only if the price is at least average variable cost.",
          "If price is below AVC the loss from producing exceeds the fixed cost, so the firm shuts down.",
          "Gives a numerical or diagrammatic illustration (for example price US\\$36, MC US\\$30 for the sixth unit and US\\$42 for the seventh, so output is 6).",
        ],
        modelAnswer: "A price-taker is too small to influence the market price, so its demand curve is horizontal at that price, and price, average revenue and marginal revenue are all equal. Its marginal cost first falls and then rises, because of diminishing marginal returns. If the marginal revenue from the next unit is greater than its marginal cost, producing it adds to profit, so the firm expands; if marginal cost is greater, the last unit lowered profit, so the firm cuts back. Profit is therefore greatest where marginal cost equals the price, with marginal cost rising. For example, at a price of US\\$36, if the sixth unit costs US\\$30 and the seventh US\\$42, the firm produces 6 units. Profit is (price − average total cost) × output. The firm should carry on producing in the short run only if the price covers average variable cost: if it does not, the loss from producing is greater than the fixed cost, so the firm should shut down." }),
      P.manual({ label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { min: 300, max: 700 }, levels: LV15,
        stem: "Discuss whether consumers are better served by perfect competition than by monopoly.",
        points: [
          "Perfect competition: price is driven down to minimum average total cost in the long run.",
          "Allocative efficiency: price equals marginal cost; productive efficiency: output at minimum ATC.",
          "Only normal profit, so no exploitation of consumers.",
          "Monopoly: output is restricted and price is above marginal cost, creating a deadweight loss.",
          "Supernormal profit transfers income from consumers to the owners.",
          "Lack of competition may cause X-inefficiency and poor service.",
          "Economies of scale: a monopoly may have lower costs than many small firms.",
          "Natural monopoly: competition would duplicate networks and raise costs.",
          "Dynamic efficiency: monopoly profit may finance research and innovation; perfect competition leaves little profit for it.",
          "Perfect competition has identical products, so there is little choice or product development.",
          "Perfect competition is a benchmark; few real markets meet the assumptions.",
          "Regulation, price caps and competition law can improve a monopoly's performance.",
          "The threat of entry or imports may discipline a monopolist.",
          "The best structure depends on the economies of scale in the industry.",
          "A justified conclusion.",
        ],
        modelAnswer: "In perfect competition many small firms sell identical products, and free entry competes supernormal profit away, so in the long run the price falls to the minimum average cost. Consumers get the good at the lowest possible cost: output is productively efficient, and because price equals marginal cost it is also allocatively efficient. Firms earn only normal profit and cannot exploit buyers. A monopolist, by contrast, restricts output to raise the price above marginal cost, which creates a deadweight loss and shifts income from consumers to the owners. With no rivals it may become X-inefficient and offer poor service. However, monopoly is not always worse for consumers. A large firm may enjoy economies of scale that give lower costs than many small firms could reach, and in a natural monopoly such as an electricity network competition would only duplicate the network and raise costs. Monopoly profit can also pay for research and innovation, whereas perfect competition leaves little profit for investment and offers identical products with little choice. A monopoly can be improved by regulation, such as price caps, and by the threat of entry or imports. In practice the perfectly competitive market is a benchmark which few real markets meet, so the right comparison is with competitive markets in the real world. Overall, consumers are usually better served by competition, especially where economies of scale are small, but where they are large, a regulated monopoly may serve them better." }),
    ]),
    explanation: "(a) Produce where MC = price with MC rising; shut down if price < AVC. (b) Competition gives low prices and efficiency; monopoly may offer economies of scale and innovation if regulated.",
  });

  // Essay 2: economies and diseconomies of scale
  b.struct({
    ...P3, d: 5,
    concepts: [A("costs.long-run-costs-scale"), A("costs.short-run-costs"), A("firms.structures-features")],
    hints: ["In (a) give a mechanism for each economy, not just its name.", "In (b) consider the limits to economies of scale and the effect on prices."],
    stem: "A large brewing company plans to double the size of its plant.",
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({ label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { min: 150, max: 400 },
        stem: "Explain the economies of scale that the company may enjoy as it expands.",
        points: [
          "Economies of scale are falls in long-run average cost as output increases.",
          "Technical: large machines and continuous production lines spread cost over more units.",
          "Technical: increased dimensions (a bigger vat holds more for a smaller increase in cost).",
          "Managerial: specialist managers in finance, marketing and production work more efficiently.",
          "Financial: large firms are less risky and borrow at lower interest rates.",
          "Purchasing: bulk orders earn discounts from suppliers.",
          "Marketing: advertising and distribution costs are spread over more units.",
          "Risk-bearing: selling many products in many markets reduces the effect of a failure of one.",
          "External economies: a skilled labour force and suppliers nearby lower costs for all firms in the area.",
          "Links to long-run average cost falling until the minimum efficient scale is reached.",
        ],
        modelAnswer: "Economies of scale are falls in long-run average cost as a firm increases its output. A brewery can gain technical economies: large machines and continuous bottling lines spread their cost over a much bigger output, and a vat twice the size costs less than twice as much. It can employ specialist managers in finance, marketing and production, who raise efficiency (managerial economies). Because large firms are less risky they can borrow at lower interest, which is a financial economy. Buying grain and bottles in bulk wins discounts from suppliers (purchasing economies), and the cost of advertising and delivery is spread over more units (marketing economies). Selling many brands in many markets spreads risk. There may also be external economies, such as a skilled workforce and specialist suppliers in the area, which lower costs for all firms. As the company expands, these economies reduce its long-run average cost until it reaches the minimum efficient scale." }),
      P.manual({ label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { min: 300, max: 700 }, levels: LV15,
        stem: "Discuss whether the growth of large firms is always in the interest of consumers.",
        points: [
          "Economies of scale lower average costs and may allow lower prices.",
          "Larger firms can invest more in research, quality and variety.",
          "Large firms can serve large markets and export, earning foreign exchange and jobs.",
          "But economies are limited: beyond the minimum efficient scale diseconomies (communication, coordination) raise costs.",
          "Growth may reduce competition: a dominant firm may raise prices and restrict output.",
          "Barriers to entry such as economies of scale make it hard for small firms to compete.",
          "Cost savings may be kept as profit instead of being passed on in lower prices.",
          "Consumers may lose variety if small firms are driven out.",
          "Small firms are flexible, close to customers and provide local employment.",
          "The effect depends on the size of the economies of scale in the industry.",
          "Competition law and regulation can check abuse of dominance.",
          "Competition from imports or the threat of entry can discipline large firms.",
          "Large firms may be more efficient in industries such as electricity, cement and brewing.",
          "Consumers benefit more when growth is by expansion than by takeover of rivals.",
          "A justified conclusion.",
        ],
        modelAnswer: "The growth of large firms can benefit consumers. Economies of scale reduce average cost, and if firms pass on some of the saving, prices fall. Large firms can also invest more in research, quality and variety, and can supply large markets and export. However, the benefits are not automatic. Economies of scale are limited: beyond the minimum efficient scale, communication, coordination and motivation problems cause diseconomies and raise costs. Growth may also reduce competition. Economies of scale are a barrier to entry, so a dominant firm may face little pressure to keep its prices low, may restrict output, and may keep the cost savings as profit instead of lowering prices. Small firms can be driven out, reducing variety, although they are flexible and provide local jobs. The outcome depends on the industry: in electricity or cement the economies of scale are large and a few large firms are more efficient than many small ones, while in hairdressing a small scale is enough. It also depends on whether the firm faces competition from imports, the threat of entry or competition law, which can force it to share the gains with consumers. Overall, the growth of large firms benefits consumers where economies of scale are real and competition is maintained, but not where growth creates a dominant firm that is free to exploit its power." }),
    ]),
    explanation: "(a) Technical, managerial, financial, purchasing, marketing and risk-bearing economies lower long-run average cost. (b) Lower costs benefit consumers only if the savings are passed on and competition remains.",
  });

  // Essay 3: oligopoly and collusion
  b.struct({
    ...P3, d: 5,
    concepts: [A("firms.oligopoly"), A("firms.collusion-game-theory")],
    hints: ["In (a) explain interdependence and the kinked demand curve.", "In (b) weigh the gains from agreeing against the incentive to cheat and the effect on consumers."],
    stem: "The three largest mobile networks in a fictional country together supply most of its customers.",
    parts: checkExam(EXAM.ZIM_P3_ESSAY, [
      P.manual({ label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { min: 150, max: 400 },
        stem: "Explain why firms in an oligopoly are reluctant to change their prices.",
        points: [
          "An oligopoly has a few large firms, so each firm's actions affect the others (interdependence).",
          "Each firm must predict how its rivals will react before changing price.",
          "If it raises its price, rivals are assumed not to follow, so it loses many customers.",
          "Demand above the current price is therefore elastic, and a price rise cuts revenue.",
          "If it cuts its price, rivals are assumed to follow, so it gains few customers.",
          "Demand below the current price is less elastic, so a price cut also lowers revenue.",
          "The demand curve is kinked at the current price.",
          "The marginal revenue curve therefore has a gap, and small changes in cost do not change the profit-maximising price.",
          "Price wars lower profit for all, so firms prefer non-price competition (advertising, quality, service).",
          "Firms may also follow a price leader, avoiding competition without an agreement.",
        ],
        modelAnswer: "In an oligopoly a few large firms dominate the market, so each is interdependent: before changing its price a firm must predict how its rivals will react. If it raises its price, rivals are assumed not to follow, so it loses many customers to them: demand above the present price is elastic and revenue falls. If it cuts its price, rivals are expected to match it, so it gains few extra customers: demand below the present price is less elastic and revenue also falls. The demand curve therefore has a kink at the current price, and the marginal revenue curve has a vertical gap beneath it. As long as marginal cost stays within the gap, the profit-maximising price and output do not change, so prices tend to be stable even when costs change. Because price wars lower profit for everybody, oligopolists prefer to compete in other ways, such as advertising, quality and customer service, or to follow a price leader, which avoids competition without a formal agreement." }),
      P.manual({ label: "(b)", marks: 15, type: "EXTENDED_RESPONSE", wordLimit: { min: 300, max: 700 }, levels: LV15,
        stem: "Discuss whether the networks would be better off if they agreed to fix their prices.",
        points: [
          "Price fixing (a cartel) lets firms act like a monopolist, restricting output and raising price and joint profit.",
          "It avoids damaging price wars and reduces uncertainty.",
          "Each member can gain by cheating (producing more or cutting price secretly).",
          "If all cheat, the price falls and the cartel collapses (Prisoner's Dilemma).",
          "A cartel needs few firms, similar products, high barriers and ability to monitor.",
          "New entrants or imports could undercut the agreed price.",
          "Demand may be elastic (customers switch, or substitutes exist), limiting the gain from raising price.",
          "Price fixing is illegal in most countries; fines and the loss of reputation are costs.",
          "Consumers are harmed by higher prices and lower output (a welfare loss).",
          "Customers may switch to other services (for example internet calls) if prices rise.",
          "Tacit collusion or price leadership may achieve some of the benefits without an agreement.",
          "Firms may prefer non-price competition to build loyalty.",
          "The outcome depends on the conditions in the market and on enforcement.",
          "Short-run gains may be offset by a long-run loss of customers and regulatory action.",
          "A justified conclusion.",
        ],
        modelAnswer: "If the networks fixed their prices they could behave like a monopolist, restricting output, raising price and increasing joint profit. They would avoid damaging price wars and reduce uncertainty about each other's reactions. But the agreement would be hard to maintain. Each network could gain by secretly cutting its price or expanding output while the others kept to the agreement, and if all did so, the price would fall and the cartel would collapse: the logic of the Prisoner's Dilemma. A cartel works best when there are few firms, the products are similar, entry is difficult and cheating can be spotted, and these conditions may partly hold in mobile services. However, a new entrant or substitutes such as internet calling could undercut the fixed price, and demand may be elastic enough that a higher price reduces revenue. Price fixing is also illegal in most countries, so the networks would risk fines and damage to their reputation, and consumers would suffer higher prices and less choice. The networks could try tacit collusion or price leadership instead, which is harder to prove, or compete through quality and service. On balance the networks might gain in the short run, but the incentive to cheat, the risk of entry and the law make price fixing unreliable and risky, and they are probably better off with tacit coordination and non-price competition than with a formal agreement." }),
    ]),
    explanation: "(a) Interdependence and the kinked demand curve explain price rigidity. (b) A cartel raises joint profit but is unstable, risky and illegal.",
  });
});
