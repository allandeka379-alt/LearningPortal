// W3a: ZIMSEC exam-format items. Paper 2 data response (STRUCTURED 20, ANALYSIS) x1: a cost and revenue table with
// profit; Paper 3 essays (STRUCTURED 10 = (a) explain 4 + (b) discuss 6, EVALUATION) x2. Fictional data, checked here.
import { concept, P, ZIM, table, check, fmt } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.costs.profit-maximisation", { file: "exam/w3a-zimsec", keyPrefix: "exam.w3a-zimsec", applies: ZIM }, (b) => {
  // ---------------- Paper 2: costs, revenue and profit of a fictional stock-feed mill (a price taker).
  {
    const out = [0, 10, 20, 30, 40, 50, 60], price = 40, tfc = 320;
    const tvc = [0, 260, 460, 640, 860, 1160, 1590];
    const tc = tvc.map((v) => v + tfc), tr = out.map((q) => q * price);
    const mc = tc.map((c, i) => (i ? (c - tc[i - 1]) / (out[i] - out[i - 1]) : null));
    const prof = tr.map((t, i) => t - tc[i]);
    const best = prof.indexOf(Math.max(...prof));
    check("best", out[best], 50); check("prof", prof[best], 520); check("mc50", mc[5], 30); check("mc60", mc[6], 43);
    const atc50 = tc[5] / 50;
    check("atc50", atc50, 29.6);
    const T = table(["Output (tonnes per day)", "Total fixed cost (US\\$)", "Total variable cost (US\\$)"], out.map((q, i) => [q, tfc, tvc[i]]));
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, secs: 2100, paper: "Paper 2",
      concepts: ["econ.costs.costs-of-production", "econ.costs.revenue", "econ.costs.profit-maximisation", "econ.structures.competitive-markets", "econ.structures.equilibrium"],
      stem: `Farai owns a fictional stock-feed mill near Gweru. It is one of many mills selling an identical feed to farmers, and it can sell any quantity at the market price of US\\$${price} per tonne. Its daily costs are shown in Table 1.\n\n**Table 1: Daily costs of the mill**\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: tfc, stem: "State the mill's total fixed cost per day.", wrong: [0], explanation: `TFC is the same at every output, including zero: US\\$${tfc}.` }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: tc[4], stem: "Calculate the total cost of producing 40 tonnes a day.", wrong: [tvc[4]], explanation: `TC = TFC + TVC = ${tfc} + ${tvc[4]} = US\\$${fmt(tc[4])}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: atc50, dp: 2, stem: "Calculate the average total cost per tonne at an output of 50 tonnes. Give your answer to two decimal places.", wrong: [tvc[5] / 50, tc[5]], explanation: `TC = ${tfc} + ${fmt(tvc[5])} = ${fmt(tc[5])}; ATC = ${fmt(tc[5])} ÷ 50 = US\\$${fmt(atc50, 2)}. (${fmt(tvc[5] / 50, 2)} is AVC.)` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: mc[5], stem: "Calculate the marginal cost per tonne when output rises from 40 to 50 tonnes.", wrong: [tc[5] - tc[4]], explanation: `MC = (${fmt(tc[5])} − ${fmt(tc[4])}) ÷ (50 − 40) = ${tc[5] - tc[4]} ÷ 10 = US\\$${mc[5]} per tonne.` }),
        P.num({ label: "(e)", marks: 1, kind: "money", value: tr[5], stem: "Calculate the mill's total revenue when it sells 50 tonnes.", wrong: [price + 50], explanation: `TR = ${price} × 50 = US\\$${fmt(tr[5])}.` }),
        P.num({ label: "(f)", marks: 2, kind: "plain", value: out[best], stem: "Using marginal revenue and marginal cost, identify the profit-maximising output, in tonnes per day.", wrong: [60, 30], explanation: `MR = price = US\\$${price} per tonne. MC per tonne: ${mc.slice(1).join(", ")}. MC is below 40 up to 50 tonnes (30), but the next 10 tonnes cost ${mc[6]} per tonne, more than 40. Best output = ${out[best]} tonnes.` }),
        P.num({ label: "(g)", marks: 1, kind: "money", value: prof[best], stem: "Calculate the mill's profit at the profit-maximising output.", wrong: [tr[best]], explanation: `Profit = TR − TC = ${fmt(tr[best])} − ${fmt(tc[best])} = US\\$${prof[best]}.` }),
        P.manual({
          label: "(h)", marks: 2,
          stem: "Explain why the mill's marginal revenue is equal to the market price.",
          points: ["The mill is a price taker: one of many mills selling an identical product.", "Every extra tonne sells at the same US\\$40, so each adds US\\$40 to total revenue (P = AR = MR)."],
          modelAnswer: "The mill is one of many sellers of an identical feed, so it is a price taker: it can sell any amount at US\\$40 a tonne. Each extra tonne therefore adds exactly US\\$40 to total revenue, so marginal revenue equals the price.",
        }),
        P.manual({
          label: "(i)", marks: 3,
          stem: "Explain what is likely to happen to the mill's profit in the long run.",
          points: [
            `At 50 tonnes AR (US\\$40) is above ATC (US\\$${fmt(atc50, 2)}): the mill earns abnormal profit.`,
            "Abnormal profit attracts new mills; there are no barriers to entry, so supply of feed rises.",
            "The market price falls until it equals the lowest ATC, so only normal profit is earned.",
          ],
          modelAnswer: `At 50 tonnes the price of US\\$40 is above the average total cost of US\\$${fmt(atc50, 2)}, so the mill earns abnormal profit. With many mills and an identical product, entry is easy, so the profit attracts new mills; the supply of feed rises and the market price falls. This continues until the price equals the lowest average total cost and the mill earns only normal profit.`,
        }),
        P.manual({
          label: "(j)", marks: 5, levels: LV(5),
          stem: "Farai wants to raise output to 60 tonnes a day to win more customers. Using the data, discuss whether he should do so.",
          points: [
            `Against: the extra 10 tonnes cost US\\$${mc[6]} per tonne but sell for US\\$40, so profit falls from US\\$${prof[5]} to US\\$${prof[6]}.`,
            "Against: as a price taker he can already sell all he wants at US\\$40; more output does not raise the price.",
            "For: more customers / market share might bring future benefits (loyalty, contracts) or lower costs if he expands the mill in the long run (economies of scale).",
            "For: costs might fall over time (e.g. cheaper inputs), making 60 tonnes profitable.",
            "Justified conclusion (e.g. stay at 50 tonnes unless costs fall or the price rises).",
          ],
          modelAnswer: `Raising output to 60 tonnes would reduce profit. The extra 10 tonnes cost US\\$${mc[6]} a tonne to produce but sell for only US\\$40, so profit would fall from US\\$${prof[5]} to US\\$${prof[6]} a day. As a price taker Farai can already sell all he produces at the market price, so winning more customers does not let him charge more. On the other hand, a larger customer base might bring loyal customers and long-term contracts, and if he later expanded the mill he might gain economies of scale that lower his costs. In the short run he should stay at 50 tonnes, where MR = MC most closely, and expand only if a larger mill would lower his marginal cost below US\\$40.`,
        }),
      ],
      explanation: `TFC US\\$${tfc}; TC at 40 tonnes US\\$${fmt(tc[4])}; ATC at 50 tonnes US\\$${fmt(atc50, 2)}; MC 40→50 tonnes US\\$${mc[5]}; TR at 50 tonnes US\\$${fmt(tr[5])}; best output ${out[best]} tonnes with profit US\\$${prof[best]}. As a price taker the mill earns abnormal profit now, which entry will compete away in the long run.`,
      hints: ["TC = TFC + TVC; MC per tonne = change in TC ÷ change in output.", "For a price taker, MR = price."],
    });
  }

  // ---------------- Paper 3 essays (one-sentence question, (a) 4 + (b) 6).
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.firms.business-organisations", "econ.firms.sources-of-finance"],
    stem: "Many small businesses in Zimbabwe are run by sole traders.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Describe **four** features of a private limited company.",
        points: [
          "Owned by shareholders whose shares cannot be offered to the general public.",
          "Limited liability: shareholders can lose only what they invested.",
          "Separate legal entity with continuity (continues if shareholders change).",
          "Run by directors; formed with a memorandum and articles of association and a certificate of incorporation; name ends in (Pvt) Ltd.",
        ],
        modelAnswer: "A private limited company is owned by shareholders, but its shares cannot be offered for sale to the general public. Its shareholders have limited liability, so they can lose only the money they invested. It is a separate legal entity that can own property and sue or be sued, and it continues to exist if shareholders change. It is run by directors and is formed by registering a memorandum and articles of association and receiving a certificate of incorporation; its name ends in (Private) Limited.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV(6),
        stem: "Discuss whether a successful sole trader should convert the business into a private limited company.",
        points: [
          "For: limited liability protects the owner's personal possessions.",
          "For: more capital from selling shares to family and friends; easier to borrow; continuity.",
          "Against: cost and paperwork of forming and running a company; more legal rules.",
          "Against: profits and control shared with other shareholders; slower decisions.",
          "Depends on the size of the planned expansion and the risks, and on how much control the owner wants to keep.",
          "Justified conclusion.",
        ],
        modelAnswer: "Converting would give the owner limited liability, so a failure would not cost them their house or savings, which matters if the business is growing and taking on debts. A company can also raise more capital by selling shares to family and friends, borrows more easily and continues if an owner dies. However, forming a company costs money and involves more paperwork and legal rules, and the owner would have to share profits and decisions with the other shareholders. If the sole trader plans a large, risky expansion that needs outside capital, conversion is sensible, keeping a majority of the shares to retain control; if the business will stay small and low-risk, remaining a sole trader keeps things simple and cheap.",
      }),
    ],
    explanation: "Part (a) describes the features of a private limited company; part (b) weighs limited liability and capital against cost and loss of control.",
    hints: ["(a) Think about ownership, liability, legal status and formation.", "(b) What are the risks of staying a sole trader?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.structures.monopoly", "econ.structures.competitive-markets", "econ.structures.equilibrium"],
    stem: "In some industries a single firm supplies the whole market.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Explain **two** barriers to entry that allow a monopoly to exist.",
        points: [
          "Names a first barrier (e.g. legal: licence, patent, government franchise).",
          "Explains how it keeps rivals out (e.g. the law forbids others from supplying).",
          "Names a second barrier (e.g. economies of scale / high start-up costs / control of raw materials).",
          "Explains how it keeps rivals out (e.g. a newcomer's average cost would be far higher, so it cannot compete).",
        ],
        modelAnswer: "First, legal barriers: the government may give one firm a licence or franchise, or a patent may protect an invention, so other firms are not allowed to supply the product. Second, economies of scale: an established firm is so large that its average cost is far below what a new, small entrant could achieve, so a newcomer could not match its prices and would make losses.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV(6),
        stem: "Discuss whether a monopoly is always worse for consumers than perfect competition.",
        points: [
          "Worse: monopoly produces where MR = MC with price above MC; higher price and lower output.",
          "Worse: abnormal profit persists in the long run (barriers); less choice; little incentive to be efficient (not at lowest ATC).",
          "Not worse: economies of scale may give lower costs and prices than many small firms (natural monopoly).",
          "Not worse: abnormal profit can fund research and new products; perfect competitors cannot afford research.",
          "Regulation or public ownership can protect consumers from monopoly pricing.",
          "Justified conclusion.",
        ],
        modelAnswer: "A monopoly maximises profit where MR = MC and sets a price above marginal cost, so consumers pay more and buy less than in perfect competition, where in the long run price equals marginal cost and the lowest average cost. Because barriers stop entry, the monopoly keeps abnormal profit, offers less choice and has little pressure to be efficient. However, a monopoly is not always worse. In a natural monopoly such as water supply, one large firm has much lower average costs than many small firms could, so prices may be lower. Abnormal profits can also pay for research and new products, which small perfect competitors cannot afford. A monopoly is therefore usually worse for consumers, but not always: where economies of scale are large and the firm is regulated, consumers may gain.",
      }),
    ],
    explanation: "Part (a) explains two barriers to entry; part (b) weighs higher prices and inefficiency against economies of scale and research.",
    hints: ["(a) Think of legal and cost barriers.", "(b) Compare price, output and efficiency, then consider economies of scale."],
  });
});
