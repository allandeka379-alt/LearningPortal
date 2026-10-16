// W1b: size.mergers-takeovers
import { concept, P, chk, money } from "../lib.mjs";
import { mc } from "../tables/w1b-lib.mjs";

concept("abus.size.mergers-takeovers", { file: "size/mergers-takeovers", keyPrefix: "size.mergers-takeovers" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A **merger** is best described as",
    ok: ["two firms agreeing to join and form one business", "Correct: both sets of owners normally agree to the union."],
    bad: [["one firm opening a new branch from its own profits", "That is internal (organic) growth, not a merger."], ["a firm selling off part of its business", "That is a sale of assets or a demerger, the opposite of a merger."], ["two firms agreeing to share a price list", "Price agreements are collusion; they do not join the firms."]],
    explanation: "A merger joins two firms into one, normally by agreement and an exchange of shares.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A bakery buys the flour mill that supplies it. This is",
    ok: ["backward vertical integration", "Correct: the mill is earlier in the supply chain."],
    bad: [["forward vertical integration", "Forward integration is towards customers, such as buying shops."], ["horizontal integration", "Horizontal integration joins firms at the same stage of the same industry."], ["conglomerate integration", "A conglomerate joins unrelated industries; a mill is closely related."]],
    explanation: "Buying a supplier is backward vertical integration.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A takeover is described as **hostile** when",
    ok: ["the target's board opposes the bid", "Correct: the buyer goes straight to shareholders against the board's advice."],
    bad: [["the buyer is a foreign company", "Foreign ownership does not make a bid hostile."], ["the price offered is below the share price", "Hostility is about opposition, not price level; most bids offer a premium."], ["the target firm is making a loss", "The target's profits do not decide whether a bid is hostile."]],
    explanation: "A hostile takeover is one the target's board resists.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "Sipho's tuck-shop chain in Bulawayo buys a rival chain with eleven shops in the same city. This is an example of",
    ok: ["horizontal integration", "Correct: same industry and same stage of the chain."],
    bad: [["backward vertical integration", "A rival shop chain is not a supplier."], ["forward vertical integration", "A rival chain is not a distributor to customers; it is a competitor."], ["conglomerate integration", "Both firms are retailers, so the industries are not unrelated."]],
    explanation: "Buying a rival at the same stage of the same industry is horizontal integration.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "After a horizontal merger between the only two minibus operators on a route in Masvingo, the merged firm doubles its fares. Which stakeholder is **most** harmed?",
    ok: ["Commuters, who face higher prices and less choice", "Correct: removal of competition lets the firm raise prices."],
    bad: [["Shareholders, who receive higher profits", "Higher fares raise profit, so shareholders gain."], ["Managers, who control a larger firm", "Managers of a larger firm gain responsibility and often pay."], ["The merged firm's fuel supplier, who sells more fuel", "A larger single customer is not harmed by the merger."]],
    hints: ["Which group pays the higher fares?"],
    explanation: "With competition gone, customers pay more and have no alternative.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which situation is the **clearest** example of a culture clash after a merger?",
    ok: ["One firm's managers give orders while the other firm's staff decide for themselves", "Correct: different styles of management cause friction and staff turnover."],
    bad: [["The merged firm now serves more customers than either firm had before the merger", "More customers is a possible benefit, not a clash."], ["The merged firm buys flour in larger quantities and gets a lower price per bag", "That is an economy of scale."], ["The merged firm's share price rises sharply on the day the deal is announced", "A share price rise is a market reaction, not a conflict between staff."]],
    hints: ["Culture means the usual way of managing and behaving."],
    explanation: "A clash of cultures arises when the two workforces and management teams expect different ways of working.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why might a bakery owner buy a company in a completely unrelated industry?",
    ok: ["To spread risk, so a fall in bread sales does not threaten everything", "Correct: diversification reduces dependence on one market."],
    bad: [["To gain control of the supply of flour and so secure its raw materials", "That would be backward vertical integration."], ["To remove a competitor in the same town and gain its customers", "That would be horizontal integration."], ["To make sure its own products are always stocked on shop shelves", "That would be forward vertical integration."]],
    hints: ["Which type of integration joins unrelated industries, and what is its usual aim?"],
    explanation: "A conglomerate merger is mainly about spreading risk.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the **best** judgement on whether a takeover will achieve its objectives?",
    ok: ["It depends on whether savings exceed the premium and integration costs", "Correct: a judgement that names the condition on which the outcome depends."],
    bad: [["It will succeed because larger firms always have lower costs per unit of output", "Diseconomies of scale can make costs rise as the firm grows."], ["It will fail because takeovers are always resisted by the target's board", "Many takeovers are friendly; the claim is wrong."], ["It will succeed because the target's shareholders accept the offer", "Acceptance by shareholders does not guarantee later success."]],
    hints: ["A strong evaluation says what the outcome depends on."],
    explanation: "Evaluation gives a decision supported by a condition. Absolute statements ignore diseconomies and integration costs.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A merger of two firms at different stages of the same supply chain is called vertical integration.",
    answer: true,
    explanation: "True. Vertical integration joins a firm to its supplier (backward) or its customer or distributor (forward).",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A joint venture always involves one firm taking over the other.",
    answer: false,
    explanation: "False. In a joint venture the partner firms stay separate and set up a shared project or company; a takeover is a different method of external growth.",
    hints: ["Think of whether both firms keep their own identity."],
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each type of external growth to the example.",
    pairs: [["Horizontal integration", "A fictional poultry producer buys another poultry producer"], ["Backward vertical integration", "A poultry producer buys a stock-feed mill that supplies it"], ["Forward vertical integration", "A poultry producer buys a chain of fast-food outlets"], ["Conglomerate integration", "A poultry producer buys a hotel"]],
    explanation: "Same stage, supplier, customer or unrelated industry identify the type.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "In a {{blank:a}} takeover the board of the target company agrees to the bid, whereas in a {{blank:b}} takeover the board resists it.",
    blanks: [
      { id: "a", accepted: ["friendly"], choices: ["friendly", "hostile", "organic"] },
      { id: "b", accepted: ["hostile"], choices: ["friendly", "hostile", "organic"] },
    ],
    explanation: "The reaction of the target's board decides whether a takeover is friendly or hostile.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State the term for growth that comes from a firm's own expansion rather than from joining another firm.",
    accepted: ["internal growth", "organic growth", "internal", "organic"],
    explanation: "Internal (organic) growth uses the firm's own resources; mergers and takeovers are external growth.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** reason why a firm may fail to benefit from a merger.",
    accepted: ["clash of cultures", "culture clash", "diseconomies of scale", "overpaying", "paying too much", "integration problems", "loss of key staff", "different management styles"],
    explanation: "Culture clash, diseconomies of scale, overpaying and integration problems are the usual reasons.",
  });

  {
    const market = 900000, a = 135000, bb = 99000;
    const share = ((a + bb) / market) * 100;
    chk(share, 26, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `Two fictional furniture makers in Mutare have yearly sales of ${money(a)} and ${money(bb)} in a local market worth ${money(market)} a year. After they merge, what share of the market does the combined firm hold? Give your answer as a percentage to one decimal place.`,
      kind: "pct", value: share, wrong: [(a / market) * 100, (bb / market) * 100],
      explanation: `Combined sales are ${a} + ${bb} = ${a + bb}. Market share = ${a + bb} ÷ ${market} × 100 = 26.0%. Using only one firm's sales gives 15.0% or 11.0%.`,
    });
  }
  {
    const price = 2.4, prem = 25, shares = 400000;
    const cost = price * (1 + prem / 100) * shares;
    chk(cost, 1200000, 1e-6);
    b.calc({
      d: 3, skill: "APPLICATION",
      stem: `A fictional company wants to buy all 400,000 shares of a target whose shares trade at ${money(price)}. The bid is a premium of 25% above the share price. What will the shares cost the buyer in total?`,
      kind: "money", value: cost, wrong: [price * shares, price * shares * 1.025, price * 1.25],
      hints: ["Find the offer price per share first, then multiply by the number of shares."],
      explanation: `Offer price = 2.40 × 1.25 = US\\$3.00 per share. Total = 3.00 × 400,000 = US\\$1,200,000. Ignoring the premium gives US\\$960,000.`,
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Outline the difference between a merger and a takeover.",
    points: ["A merger is an agreed joining of two firms into one", "A takeover is when one firm buys enough shares to control another, which may be resisted"],
    modelAnswer: "In a merger the two firms agree to join and form one business. In a takeover one firm buys enough shares to control the other, and the target's board may resist.",
    explanation: "One mark for each, the second showing control by share purchase.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Chipo owns a fictional bakery in Gweru and plans to buy the flour mill that supplies it. Explain **two** benefits to her of this vertical integration.",
    points: ["Secure supply of flour, so production is not interrupted", "Application: the mill can no longer raise prices or sell flour to rivals", "Lower cost, because the mill's profit is kept inside the firm", "Application: lower cost per loaf allows lower prices or higher profit"],
    modelAnswer: "She secures her supply of flour, so the bakery will not be stopped by shortages or by the mill selling to rivals. She also keeps the mill's profit, so the cost of flour per loaf falls and she can lower prices or increase profit.",
    hints: ["Think about control of supply and about cost."],
    explanation: "Two benefits, each developed with the bakery and mill.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why two merged firms may find that their unit costs **rise** instead of falling.",
    points: ["The larger firm is harder to manage and coordinate", "Communication becomes slower and decisions are delayed", "Duplicated systems and sites are not combined quickly, so costs remain", "Diseconomies of scale or low morale after redundancies lower productivity, raising cost per unit"],
    modelAnswer: "A larger firm is harder to manage, so communication slows and decisions are delayed. If duplicated sites and systems are not combined, overhead costs stay high. Workers who fear redundancy may produce less, so the cost of each unit goes up.",
    hints: ["Think of the problems of size and of combining two organisations."],
    explanation: "A chain of cause and effect explaining diseconomies of scale and integration cost.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A fictional chain of pharmacies is considering a joint venture instead of a takeover to enter a new city. Assess whether a joint venture is the better choice.",
    points: ["The joint venture shares the cost and risk of entering the new city", "The partner brings local knowledge and customers", "Profits and control must be shared, so decisions may be slower", "A takeover gives full control but costs more and carries integration risk", "Judgement with a reason, such as: the joint venture is better when the market is unfamiliar and the chain has limited funds"],
    modelAnswer: "A joint venture shares the cost and risk, and the local partner provides knowledge of customers. However, profits and control are shared, so disagreements may slow decisions. A takeover gives full control but needs more money and risks a culture clash. For a chain with limited funds entering an unfamiliar city, a joint venture is probably better because it limits risk, though it could buy the partner later if the venture succeeds.",
    hints: ["Compare cost, risk and control, then say what the choice depends on."],
    explanation: "Both options weighed, with a reasoned judgement.",
  });

  {
    const market = 600000, a = 90000, bb = 150000, c = 60000;
    const a1 = (a / market) * 100, m = ((a + bb) / market) * 100;
    chk(m, 40, 1e-9);
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: false,
      stem: `A fictional business: Zuva Hardware (yearly sales ${money(a)}) and Kwekwe Builders' Supplies (yearly sales ${money(bb)}) are two of the hardware retailers in a town where all hardware retailers together sell ${money(market)} a year. The owners agree to merge. Zuva's owner says the merger will lower costs, but some of the combined staff fear redundancy.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the share of the market held by the merged firm. Give your answer as a percentage to one decimal place.", kind: "pct", value: m, wrong: [a1, (bb / market) * 100], explanation: `(90,000 + 150,000) ÷ 600,000 × 100 = 40.0%.` }),
        P.mcq({ label: "(b)", marks: 1, stem: "What type of integration is this merger?", options: [["Horizontal", "Correct: two retailers at the same stage of the same industry."], ["Backward vertical", "Neither firm supplies the other."], ["Forward vertical", "Neither firm is a customer of the other."], ["Conglomerate", "Both are in the hardware trade, so the industries are related."]], answer: "A", explanation: "Two hardware retailers merging is horizontal integration." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain **one** way in which the merger might lower costs.", points: ["Economies of scale, such as buying stock in larger quantities", "Application: the combined firm orders from suppliers for both shops and may be given discounts", "Result: lower cost per item, so higher profit or lower prices"], modelAnswer: "The merged firm can buy cement, paint and tools in larger quantities, so suppliers may give discounts. This lowers the cost of each item sold and raises profit or allows lower prices.", explanation: "A reason, applied, and its result." }),
        P.manual({ label: "(d)", marks: 3, stem: "Assess whether workers should fear the merger.", points: ["Duplicated jobs in accounts, management or delivery may be cut", "Growth may bring promotion and more secure jobs in a stronger firm", "Judgement: it depends on how many jobs duplicate and whether the firm grows"], modelAnswer: "Staff in duplicated posts such as accounts may lose jobs, so there is a reason to fear. But a larger firm with more sales may offer promotion and security. The fear is justified for those in duplicated roles, less so for shop-floor staff.", hints: ["Which jobs would be done twice?"], explanation: "A fear, a hope and a reasoned conclusion." }),
      ],
      hints: ["Use the figures in (a) and the type of firms in (b)."],
      explanation: "Market share is computed from the combined sales; the merger is horizontal; costs and workers are discussed with the case.",
    });
  }
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Nhema Dairy (Harare) makes milk and yoghurt. Its owners plan to buy Zambezi Cold Stores, a company that owns refrigerated trucks and warehouses in Harare, Bulawayo and Mutare, for a price that is well above the market value of its shares. Nhema's directors say the purchase would guarantee cold storage and delivery. Zambezi's directors say they will fight the bid, and key drivers have said they will leave if it succeeds.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify the type of integration and the type of takeover shown.", points: ["Vertical (forward) integration, because the target provides storage and delivery to customers", "A hostile takeover, because the target's directors oppose the bid"], modelAnswer: "It is vertical integration, moving forward towards customers, and a hostile takeover because Zambezi's directors resist.", explanation: "One mark for each type, with a reason." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse **one** reason why the takeover may not achieve Nhema's objectives.", points: ["The price is well above market value, so the premium must be earned back", "Key drivers may leave, so the trucks cannot be used well", "Fewer drivers cause delays in deliveries, harming sales", "Lower sales make it harder to recover the cost of the takeover"], modelAnswer: "Nhema is paying more than the shares are worth, so profits must rise to recover the premium. If the drivers leave, deliveries fall and milk goes unsold, so revenue falls and the premium is harder to earn back.", hints: ["Follow one chain: premium or loss of drivers, then the effect on sales."], explanation: "An analysis chain from a cause in the case to the effect on the objective." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Nhema should go ahead with the bid.", points: ["For: secure cold storage and delivery, control over quality", "For: savings on hiring other firms", "Against: premium price and integration cost", "Against: resistance and loss of key staff", ["Alternative: a strategic alliance or contract with a lower cost and less risk", 2], ["Judgement with a reason or condition", 2]], modelAnswer: "The takeover would secure cold storage and delivery and save the fees now paid to other firms. But the premium, the resistance of Zambezi's directors and the threat that drivers will leave make success uncertain. A strategic alliance could give guaranteed capacity without the risk. Nhema should go ahead only if it can keep the key drivers and the savings clearly exceed the premium; otherwise it should negotiate an alliance.", hints: ["Weigh gains against costs, mention an alternative and end with a condition."], explanation: "Both sides, an alternative and a conditional judgement." }),
    ],
    hints: ["Quote the case in every part."],
    explanation: "The type of integration is identified, a problem is analysed and the bid is evaluated against alternatives.",
  });

  b.card("DEFINITION", "Merger", "Two firms agree to join together to form one business, normally by an exchange of shares.");
  b.card("DEFINITION", "Takeover", "One firm buys enough shares of another to gain control of it. It is friendly if the target's board agrees and hostile if the board resists.");
  b.card("CONCEPT", "Horizontal integration", "Joining a firm at the same stage of production in the same industry, for example a bakery buying a bakery.");
  b.card("CONCEPT", "Vertical integration", "Joining a firm at a different stage of the supply chain: backward towards suppliers, forward towards customers.");
  b.card("CONCEPT", "Conglomerate integration", "Joining firms in unrelated industries, mainly to spread risk.");
  b.card("FACT", "Why mergers and takeovers may fail", "Clash of cultures, diseconomies of scale, overpaying, integration problems and loss of key staff.");
  b.card("CONCEPT", "Joint venture and strategic alliance", "A joint venture is a new project or company owned by two or more firms; a strategic alliance is a cooperation agreement without a merger. Both share cost and risk but reduce control.");
  b.card("FORMULA", "Market share", "Market share (%) = firm's sales ÷ total market sales × 100. After a merger, add the two firms' sales.");
  b.card("FACT", "Stakeholders in a merger", "Shareholders may gain or overpay; workers may face redundancy; customers may lose choice; suppliers gain a bigger customer or lose one; competitors face a stronger rival.");
});
