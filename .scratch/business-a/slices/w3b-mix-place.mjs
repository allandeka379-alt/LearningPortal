// W3b: mix.place
import { concept, P, chk, money, table, costing, r2 } from "../lib.mjs";
import { mc } from "../tables/w3b-lib.mjs";

concept("abus.mix.place", { file: "mix/place", keyPrefix: "mix.place" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A business that buys goods in large quantities, stores them and sells smaller quantities to retailers is a",
    ok: ["a wholesaler", "Correct: wholesalers break bulk for retailers."],
    bad: [["a retail chain", "A retailer sells to final customers, not to other retailers."], ["a sales agent", "An agent sells for a commission without owning the goods."], ["a producer", "A producer makes the goods and does not buy them in bulk."]],
    explanation: "A wholesaler buys in bulk, stores the goods and sells smaller lots to retailers.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A channel of distribution is best described as",
    ok: ["the route a product takes to the final customer", "Correct: it includes any intermediaries on the way."],
    bad: [["the price the producer charges to every retailer", "A price is not a route."], ["the place where the producer's factory is built", "A factory location is a separate decision from the channel."], ["the advertisements that customers see inside a shop", "Advertisements are promotion, not distribution."]],
    explanation: "A channel is the path of ownership and movement from producer to customer.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do fresh tomatoes usually travel through a **short** channel of distribution?",
    ok: ["They spoil quickly, so delay in a long chain lowers quality", "Correct: perishable goods need speed."],
    bad: [["They are very expensive and need many retailers to sell them", "Tomatoes are low-priced and perishable; expense is not the reason."], ["They need to be stored for many months before they are sold", "Fresh tomatoes cannot be stored for months."], ["They can only be sold by agents who work on commission", "Tomatoes can be sold by many types of seller."]],
    explanation: "Perishable products need short channels so that they reach customers while fresh.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main difference between an agent and a wholesaler?",
    ok: ["An agent sells for commission without owning the goods, a wholesaler buys and owns them", "Correct: ownership separates the two."],
    bad: [["An agent sells only to final customers and a wholesaler only to producers", "Neither restriction is true of agents or wholesalers."], ["An agent always sells at lower prices than a wholesaler does, on every sale", "Prices depend on many factors, not the type of intermediary."], ["An agent only sells goods that are made abroad, and a wholesaler only local goods", "Origin of goods is not the distinction."]],
    explanation: "A wholesaler takes ownership and risk; an agent earns commission for arranging the sale.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional manufacturer sells a bar of soap to a wholesaler at US\\$1.00. The wholesaler adds a mark-up of 20% and the retailer adds a mark-up of 50%. What does the final customer pay?",
    ok: ["US\\$1.80", "Correct: 1.00 × 1.20 × 1.50."],
    bad: [["US\\$1.70", "This adds the two mark-ups to the price instead of multiplying the stages."], ["US\\$1.50", "This applies only the retailer's mark-up."], ["US\\$2.00", "No sum of the mark-ups on the producer's price gives this result."]],
    hints: ["Apply the wholesaler's mark-up first, then the retailer's mark-up to the new price."],
    explanation: "Wholesaler's price = 1.00 × 1.20 = 1.20. Retailer's price = 1.20 × 1.50 = US\\$1.80.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional company producing expensive water-pump equipment sells directly to farms rather than through shops. Which is the **most likely** reason?",
    ok: ["Buyers need technical advice and a demonstration first", "Correct: direct selling provides explanation and after-sales service."],
    bad: [["The product is perishable and has to be sold within a few days", "Water pumps are durable goods; they are not perishable."], ["The product is bought every day in small amounts by many people", "Pumps are bought rarely and by few customers."], ["The firm wants to lengthen the chain to add more mark-ups", "A longer chain would raise the price, not help the firm."]],
    hints: ["Think about what the buyer needs to know before spending a large amount."],
    explanation: "Technical and costly goods often need direct contact to explain and support the buyer.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a **disadvantage** to a small producer of selling directly to consumers?",
    ok: ["The producer carries all the cost of selling and delivery", "Correct: no intermediary shares the work or the cost."],
    bad: [["The producer loses control of the price charged to customers", "Direct selling gives more control over price."], ["The producer cannot receive any feedback from customers", "Direct contact gives more feedback."], ["The customer's price is always higher than through a retailer", "The price is often lower without intermediary mark-ups."]],
    hints: ["Think about who does the work an intermediary would do."],
    explanation: "Selling direct brings control and feedback but the producer must pay for selling, delivery and storage.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is the **best-supported judgement** on whether a farm should sell its milk directly to households instead of to a dairy?",
    ok: ["It depends on whether the extra price covers the added selling costs", "Correct: it names the condition on which the answer rests."],
    bad: [["Yes, because the farm keeps the whole price and there are no other costs", "Delivery, selling and time costs exist, so this overstates the gain."], ["No, because households never buy their milk directly from any farm", "Many households do buy direct, so this is untrue."], ["Yes, because selling to a dairy always earns less for every litre", "The dairy price may be reasonable and sells in bulk."]],
    hints: ["A strong judgement compares the extra income with the extra cost."],
    explanation: "A conditional judgement compares the benefits of keeping the margin with the new costs and risks.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Each intermediary in a channel of distribution normally adds a mark-up to the price.",
    answer: true,
    explanation: "True. Intermediaries cover their costs and earn profit, so a longer chain normally means a higher price for the final customer unless costs are saved.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An agent takes ownership of the goods and carries the risk of unsold stock.",
    answer: false,
    explanation: "False. An agent sells on behalf of the producer for a commission and does not own the goods. A wholesaler takes ownership and carries the risk.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each channel to the example.",
    pairs: [["Direct to consumer", "A farmer sells vegetables from her own roadside stall"], ["Wholesaler", "A business buys bags of rice and sells them in smaller lots to shops"], ["Agent", "A person sells a farmer's equipment in return for a commission"], ["E-commerce", "A craft maker sells baskets through her own website"]],
    explanation: "Each example shows a different route to the customer.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "A longer chain of distribution usually {{blank:a}} the price paid by the final customer, because each intermediary adds a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["raises"], choices: ["raises", "lowers", "removes"] },
      { id: "b", accepted: ["mark-up"], choices: ["mark-up", "tax", "loan"] },
    ],
    explanation: "Intermediaries add mark-ups, so the price to the customer rises.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** factor that affects the choice of a channel of distribution.",
    accepted: ["the product", "type of product", "perishable", "cost", "the market", "control", "competitors", "location", "infrastructure", "the number of customers", "size of the market", "value of the product"],
    explanation: "The product, market, cost, control, competitors, location and infrastructure all affect the choice.",
  });

  {
    const m = 5, w = 25, r = 40;
    const price = costing.priceFromMarkUp(costing.priceFromMarkUp(m, w), r);
    chk(price, 8.75);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional furniture maker sells a chair to a wholesaler for ${money(m)}. The wholesaler adds a mark-up of ${w}% and the retailer then adds a mark-up of ${r}%. What price does the final customer pay?`,
      kind: "money", value: price, wrong: [m * (1 + (w + r) / 100), m * 1.4],
      hints: ["Apply each mark-up to the price at that stage."],
      explanation: "Wholesaler's price = 5.00 × 1.25 = 6.25. Retailer's price = 6.25 × 1.40 = US\\$8.75. Adding the two percentages (65%) gives US\\$8.25, and using only the retailer's mark-up gives US\\$7.00.",
    });
  }
  {
    const units = 400, price = 15, rate = 8;
    const com = units * price * (rate / 100);
    chk(com, 480);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional agent sells ${units} bags of fertiliser for a producer at ${money(price)} a bag and earns a commission of ${rate}% of sales. How much commission does the agent earn?`,
      kind: "money", value: com, wrong: [units * rate, units * price],
      explanation: "Sales = 400 × 15 = US\\$6,000. Commission = 8% × 6,000 = US\\$480. Multiplying the bags by 8 gives 3,200, and the sales value alone is US\\$6,000.",
    });
  }
  {
    const fixed = 900, gain = 0.3;
    const be = fixed / gain;
    chk(be, 3000, 1e-6);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional bakery plans to deliver bread to shops itself instead of selling through a wholesaler. This earns an extra ${money(gain)} on each loaf after delivery costs, but adds fixed costs of ${money(fixed)} a month for a driver and van. How many loaves a month must it sell for the change to just cover the extra fixed cost?`,
      kind: "units", value: be, wrong: [fixed * gain, fixed / (gain * 2)],
      hints: ["Divide the extra fixed cost by the extra income on each loaf."],
      workedSolution: "1. Extra income on each loaf = US\\$0.30.\n2. Extra fixed cost = US\\$900 a month.\n3. Loaves needed = 900 ÷ 0.30 = 3,000.",
      explanation: "Loaves = 900 ÷ 0.30 = 3,000 a month. Multiplying 900 by 0.30 gives 270, which is a cost, not a number of loaves.",
    });
  }
  {
    const prod = 5, final = 8.75;
    const sh = ((final - prod) / final) * 100;
    chk(sh, 42.857142857, 1e-6);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A chair leaves the factory at ${money(prod)} and is bought by the final customer for ${money(final)}. What percentage of the customer's price is taken by the intermediaries? Give your answer to one decimal place.`,
      kind: "pct", value: sh, wrong: [((final - prod) / prod) * 100, (prod / final) * 100],
      hints: ["Find the extra amount added by intermediaries and compare it with the final price."],
      explanation: "Intermediaries add 8.75 − 5.00 = US\\$3.75, so 3.75 ÷ 8.75 × 100 = 42.9%. Dividing by the producer's price gives 75.0%, and 57.1% is the producer's share.",
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain **one** advantage to a producer of selling through a wholesaler.",
    points: ["The wholesaler buys large quantities, so the producer has fewer customers to deal with", "The wholesaler stores the goods and serves many small shops, saving the producer cost and effort"],
    modelAnswer: "A wholesaler buys large quantities, so the producer has fewer customers to deal with. It also stores the goods and supplies many small shops, which saves the producer cost and effort.",
    explanation: "One mark for the advantage and one for the development.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Sipho grows oyster mushrooms in Chinhoyi, which must be sold within three days. Explain **two** factors he should consider when choosing a channel.",
    points: ["The product is perishable and needs a short channel", "Application: mushrooms lose quality in three days, so he should avoid long chains with delay", "Cost of delivery compared with the price received", "Application: delivering a small crop to Harare restaurants must cost less than the extra price they pay"],
    modelAnswer: "The mushrooms are perishable, so Sipho needs a short channel because a long chain adds delay and quality is lost within three days. He must also compare the cost of delivery with the price received, since delivering a small crop to restaurants in Harare is worthwhile only if the extra price covers the transport.",
    hints: ["Think about how long the mushrooms stay fresh and what delivery costs."],
    explanation: "Two factors, each developed with the case.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a producer may lose control of its brand image when it sells through retailers.",
    points: ["The retailer decides how the product is displayed and priced", "The retailer may sell rival products next to it or discount it", "The staff may not explain the product well or give poor service", "Poor display or service can damage the brand's image and reduce sales"],
    modelAnswer: "The retailer decides how the product is displayed and priced. It may put rival goods beside it or discount it, and its staff may give poor service. This can damage the brand's image and reduce sales.",
    hints: ["Who controls display, price and service in a retail shop?"],
    explanation: "A chain from retailer control to the effect on image and sales.",
  });

  {
    const rows = [["Wholesaler", 3.2, 0, 2200], ["Shops (direct)", 3.8, 0.4, 1500], ["Online", 4.2, 0.9, 650]];
    const net = rows.map(([, p, d, q]) => (p - d) * q);
    chk(net[0], 7040); chk(net[1], 5100); chk(net[2], 2145);
    const tbl = table(["Channel", "Price per tray (US\\$)", "Delivery cost per tray (US\\$)", "Trays a month"], rows, ["l", "r", "r", "r"]);
    b.struct({
      d: 3, skill: "ANALYSIS", examStyle: true,
      stem: `A fictional egg producer in Chinhoyi sells trays of eggs through three channels. The expected monthly sales are shown.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the net income each month (price less delivery cost, multiplied by trays) from selling direct to shops.", kind: "money", value: net[1], calculator: true, wrong: [3.8 * 1500, 0.4 * 1500], explanation: "(3.80 − 0.40) × 1,500 = 3.40 × 1,500 = US\\$5,100. Ignoring delivery cost gives US\\$5,700." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which channel gives the highest net income each month?", options: [["Wholesaler", "Correct: 3.20 × 2,200 = US\\$7,040."], ["Shops (direct)", "Net income is US\\$5,100, lower than the wholesaler."], ["Online", "Net income is US\\$2,145, the lowest."], ["All three are equal", "The three net incomes differ."]], answer: "A", explanation: "Net incomes: wholesaler US\\$7,040, shops US\\$5,100, online US\\$2,145." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why the producer may not sell all its eggs to the wholesaler even though this channel earns most.", points: ["Dependence on one buyer is risky if the wholesaler reduces orders or the price", "Application: the wholesaler buys 2,200 trays, so a lost contract would remove most income", "Selling direct to shops and online gives control over price and builds customer contacts"], modelAnswer: "Relying on one buyer is risky: if the wholesaler cuts its orders or lowers its price the producer loses most of its income. Selling direct to shops or online gives control over price and builds contacts with customers.", hints: ["Think about what could go wrong if there is only one buyer."], explanation: "Risk, application and control." }),
        P.manual({ label: "(d)", marks: 3, stem: "Assess whether the producer should stop selling online.", points: ["Online net income is the lowest at US\\$2,145 because delivery costs US\\$0.90 a tray", "Online sells only 650 trays and may help the brand and reach new customers", "Judgement with a condition, for example: stop online if the time and costs of handling orders exceed US\\$2,145"], modelAnswer: "Online sales earn the least, US\\$2,145, because delivery is costly at US\\$0.90 a tray. But they reach new customers and may help the brand. The producer should stop only if the time and cost of handling online orders are greater than the US\\$2,145 earned.", hints: ["Compare the income with the cost of handling the orders."], explanation: "Evidence, a counter-point and a conditional judgement." }),
      ],
      hints: ["Net income per tray is the price less the delivery cost."],
      explanation: "Net incomes are wholesaler US\\$7,040, shops US\\$5,100 and online US\\$2,145; the choice also depends on risk and control.",
    });
  }
  {
    const packs = 6000, price = 2.5, rate = 12, fixedTeam = 2400;
    const com = packs * price * (rate / 100);
    const perPack = price * (rate / 100);
    const be = fixedTeam / perPack;
    chk(com, 1800); chk(perPack, 0.3); chk(be, 8000, 1e-6);
    b.struct({
      d: 5, skill: "EVALUATION", examStyle: true,
      stem: `Mutare Tea Company is a fictional business that sells packs of tea at ${money(price)} each. It now uses an agent in Harare who sells ${packs.toLocaleString("en-GB")} packs a month and earns a commission of ${rate}% of sales. The owner is thinking of replacing the agent with the company's own sales team, which would cost ${money(fixedTeam)} a month in wages and transport. The agent knows many shops and customers and has built good relations with them. The owner believes sales could rise if the company controls the display and service in shops.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the commission paid to the agent each month.", kind: "money", value: com, wrong: [packs * rate, packs * price], explanation: "Sales = 6,000 × 2.50 = US\\$15,000. Commission = 12% × 15,000 = US\\$1,800." }),
        P.manual({ label: "(b)", marks: 4, stem: "Analyse **one** disadvantage of using an agent rather than the company's own sales team.", points: ["The company has less control over how the product is shown and sold", "The agent may sell rival brands and give them equal effort", "Poor display or service may reduce sales of the company's tea", "The company may also lose the relationship with shops, which belong to the agent"], modelAnswer: "The company has less control over how the tea is displayed and sold. The agent may also sell rival brands, so effort is shared, and poor display could reduce sales. The shops' loyalty may also be to the agent rather than to the company.", hints: ["Who controls the display and the relationship with shops?"], explanation: "A chain from lack of control to lower sales." }),
        P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Mutare Tea Company should replace the agent with its own sales team.", points: ["Commission is US\\$1,800 a month at present, less than the team's fixed US\\$2,400", "The team costs less only if sales exceed 8,000 packs (2,400 ÷ 0.30)", "Own staff give more control over display, service and the brand", "The agent's existing contacts and knowledge of shops would be lost", "Sales would need to rise by a third to break even on the new team (from 6,000 to 8,000)", "The change adds fixed cost and risk if the sales rise does not occur", ["Judgement with a reason, for example: keep the agent unless sales growth is likely", 1], ["Condition or time-frame, for example: review when sales approach 8,000 packs", 1]], levels: [[1, 1, 3, "General points on agents and own sales teams with little use of the figures."], [2, 4, 6, "Reasons for and against using the figures in the case."], [3, 7, 8, "Balanced evaluation using the break-even of 8,000 packs, with a justified judgement and a condition."]], modelAnswer: "The agent costs US\\$1,800 a month, 12% of US\\$15,000 sales, against US\\$2,400 for the sales team. The team becomes cheaper only above 8,000 packs, where 12% commission of US\\$2.50 is US\\$0.30 a pack, so sales would have to rise by a third. Own staff would give control over display and service, but the company would lose the agent's contacts and take on fixed cost and risk. The company should keep the agent for now, and switch to its own team only if sales are likely to approach 8,000 packs a month.", hints: ["Compare the agent's commission with the team's cost at different sales."], explanation: "At 6,000 packs the agent is cheaper; the team pays only above 8,000 packs. The judgement should rest on expected sales." }),
      ],
      hints: ["Commission is a percentage of sales value."],
      explanation: "Commission is US\\$1,800. Own staff cost less only above 8,000 packs a month, so the decision depends on expected sales and control.",
    });
  }

  b.card("DEFINITION", "Channel of distribution", "The route a product takes from producer to final customer, including any intermediaries.");
  b.card("DEFINITION", "Wholesaler", "A business that buys in bulk from producers, stores goods and sells smaller quantities to retailers.");
  b.card("DEFINITION", "Agent", "A person or business that sells for a producer in return for a commission and does not own the goods.");
  b.card("CONCEPT", "Main channels", "Direct to consumer; producer to retailer; producer to wholesaler to retailer; through an agent; e-commerce.");
  b.card("FACT", "Factors in choosing a channel", "The product, the market, cost, control, competitors, and location and infrastructure.");
  b.card("CONCEPT", "Perishable goods and channels", "Perishable goods need short, fast channels so that they reach customers while fresh.");
  b.card("CONCEPT", "Intermediaries and price", "Each intermediary adds a mark-up, so longer chains usually raise the customer's price, but save the producer cost and effort.");
  b.card("CONCEPT", "Physical distribution", "Transport, storage and handling of goods, including warehouses, packing, delivery and keeping shelves stocked. Digital products can be delivered electronically.");
  b.card("FORMULA", "Commission", "Commission = sales value × commission rate.");
});
