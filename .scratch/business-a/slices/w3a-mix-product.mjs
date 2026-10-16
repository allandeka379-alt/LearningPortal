// W3a: mix.product
import { concept, P, ZIM, table, r2, pctChange, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

concept("abus.mix.product", { file: "mix/product", keyPrefix: "mix.product" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following are the four elements of the basic marketing mix?",
    ok: ["The product, price, promotion and place", "Correct: these are the 4Ps."],
    bad: [["Profit, planning, people and production", "These are not the elements of the mix."], ["Price, premises, personnel and payment", "These are not the four Ps."], ["Product, purchasing, pay and position", "These are not the four Ps."]],
    explanation: "The 4Ps are product, price, promotion and place.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is a **unique selling point (USP)**?",
    ok: ["A feature that sets a product apart from all of its rivals", "Correct: it gives customers a reason to choose it."],
    bad: [["The lowest price that a firm can ever charge for a product", "A USP is not necessarily a low price."], ["The number of units that a firm hopes to sell in a year", "That is a sales target."], ["A legal right to be the only seller of a product anywhere", "That would be a patent or monopoly."]],
    explanation: "A USP is a distinctive feature valued by customers that sets the product apart.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a role of **packaging**?",
    ok: ["To protect the product and catch the eye on the shelf", "Correct: packaging protects and promotes."],
    bad: [["To fix the price of the product in the shop for good", "Prices are set by the seller, not the package."], ["To replace all other forms of promotion completely in the shop", "Packaging supports, not replaces, promotion."], ["To reduce the quality of the product inside the pack itself", "Packaging should protect quality, not reduce it."]],
    explanation: "Packaging protects, preserves, informs, promotes and positions the product.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do the extra three Ps (people, processes and physical evidence) matter more for **services** than for goods?",
    ok: ["Services are intangible, so customers judge them by staff and process", "Correct: there is no physical item to inspect."],
    bad: [["Services are always cheaper than goods and need no particular care", "Services are not always cheaper."], ["Customers never meet the staff who provide a service at all", "Customers usually meet service staff."], ["Services can be stored in a warehouse until they are needed later", "Services cannot be stored."]],
    explanation: "Customers cannot inspect a service in advance, so they use clues such as staff, process and premises.",
    applies: ZIM,
  });
  const plain = 18, brand = 22.5;
  chk(pctChange(plain, brand), 25, 1e-9);
  const p2 = 24, b2 = 28, ec = 1.2;
  chk(b2 - p2 - ec, 2.8, 1e-9);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional tea packer in Chipinge sells an unbranded packet at US\\$24 a carton and can sell a branded carton at US\\$28, but the branded packaging costs US\\$1.20 more per carton. What is the extra profit per carton from branding?",
    ok: ["US\\$2.80", "Correct: 28 − 24 − 1.20 = 2.80."],
    bad: [["US\\$4.00", "This ignores the extra packaging cost."], ["US\\$5.20", "This adds the packaging cost instead of subtracting it."], ["US\\$1.20", "This is the extra cost, not the extra profit."]],
    hints: ["Extra price − extra cost."],
    explanation: "The price rises by US\\$4.00, and the extra cost is US\\$1.20, so extra profit = US\\$2.80 per carton.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional budget bus company in Gweru advertises \"luxury travel\" but uses old, dirty buses and charges the lowest fares. What is the main problem with its marketing mix?",
    ok: ["The messages conflict, so the mix is not integrated", "Correct: promotion says luxury but the product and price say budget."],
    bad: [["The mix is fully integrated and sends one clear message", "The promotion and product contradict each other."], ["Fares are too low for any business to survive on", "The problem is the conflicting message, not the fare level."], ["The company should have no promotion at all", "Promotion is fine; the claim is the issue."]],
    hints: ["Does each P support the same image?"],
    explanation: "An integrated mix has each element supporting the same positioning.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional restaurant in Harare has excellent food but slow, untrained waiters. Which part of the extended mix is MOST likely to harm its reputation?",
    ok: ["People and processes in the delivery of the whole service", "Correct: service quality depends on staff and the process."],
    bad: [["Price, since the food itself is already of excellent quality", "The problem is service, not price."], ["Place, since the restaurant is certain to be well located", "Location is not the issue."], ["Product, since excellent food cannot affect the reputation", "Food is a strength."]],
    hints: ["Where is the weakness?"],
    explanation: "Slow, untrained staff are a weakness in people and processes, which customers use to judge a service.",
    applies: ZIM,
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional jam maker in Chipinge can pay for a distinctive jar and brand, which would add US\\$0.80 to the cost of each jar. Which statement is the BEST judgement?",
    ok: ["Worth doing if customers pay at least that much more", "Correct: the benefit must exceed the extra cost."],
    bad: [["Always worth doing, since brands never fail in any market", "Brands can fail and cost money."], ["Never worth doing, since customers ignore all packaging", "Packaging often affects choice."], ["Worth doing only if the jar is made out of glass", "The material is not the test."]],
    hints: ["Compare the extra price with the extra cost."],
    explanation: "Differentiation pays only if the extra revenue exceeds the extra cost.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A service is intangible and cannot be stored in the way that goods can.",
    answer: true,
    explanation: "True. A service is consumed as it is produced, so an empty hotel room one night cannot be sold later.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Branding allows a firm to charge a higher price only if customers believe the brand is worth more.",
    answer: true,
    explanation: "True. A brand's price premium depends on customers' trust in its quality and image.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each element of the extended mix to an example.",
    pairs: [["Product", "A bar of soap with a distinct fragrance"], ["Place", "Selling through supermarkets and a van service"], ["People", "Trained, friendly staff at a clinic"], ["Physical evidence", "A clean, well-decorated reception and branded uniforms"]],
    explanation: "Each P is a different decision in the marketing mix.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Making a product different from rivals' products in a way customers value is called {{blank:a}}, and the feature that does this is the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["differentiation"], choices: ["differentiation", "segmentation", "diversification"] },
      { id: "b", accepted: ["USP"], choices: ["USP", "tariff", "patent"] },
    ],
    explanation: "Differentiation is achieved through a unique selling point.",
  });

  const units = 8000, campaign = 4800;
  const extraProfit = (46 - 40 - 2.5) * units;
  chk(extraProfit, 28000, 1e-6);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: pctChange(plain, brand), calculator: true, daily: true, wrong: [20, 4.5],
    stem: "A fictional miller sells a plain bag of rice for US\\$18. The branded bag sells for US\\$22.50. Calculate the price premium as a percentage of the plain price, to one decimal place.",
    hints: ["Extra price ÷ plain price × 100."],
    explanation: "Extra price = 4.50. 4.50 ÷ 18 × 100 = 25.0%. Using the branded price as the base gives 20.0%.",
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: extraProfit, calculator: true, wrong: [(46 - 40) * units, 3.5],
    stem: "A fictional soap maker in Mutare sells 8,000 branded boxes a year at US\\$46 each. Unbranded boxes sold at US\\$40, and the branding adds US\\$2.50 to the cost of each box. Calculate the extra profit a year from branding, before any campaign cost.",
    hints: ["Extra profit per box × boxes."],
    explanation: "Extra profit per box = 46 − 40 − 2.50 = US\\$3.50. For 8,000 boxes = US\\$28,000. US\\$48,000 ignores the extra cost.",
  });
  const net = extraProfit - campaign;
  chk(net, 23200, 1e-6);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "units", value: Math.ceil(campaign / 3.5), calculator: true, wrong: [Math.ceil(campaign / 6), 8000],
    stem: "The soap maker's branding campaign costs US\\$4,800 (one-off). Extra profit is US\\$3.50 per branded box. How many branded boxes must be sold for the extra profit to repay the campaign? Round up to the next whole box.",
    hints: ["Campaign cost ÷ extra profit per box."],
    explanation: "4,800 ÷ 3.50 = 1,371.4, so 1,372 boxes are needed. Using US\\$6 (ignoring the extra packaging cost) gives 800 boxes, which is too few.",
    workedSolution: "1. 4,800 ÷ 3.50 = 1,371.43.\n2. Round up: 1,372 boxes.",
  });
  chk(Math.ceil(4800 / 3.5), 1372, 1e-9);

  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the three extra Ps that ZIMSEC adds to the marketing mix for services.",
    accepted: ["people processes physical evidence", "people, processes and physical evidence", "people processes and physical evidence"],
    keywords: { all: ["people", "process", "physical"] },
    model: "people, processes and physical evidence",
    explanation: "People, processes and physical evidence.",
    applies: ZIM,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** benefit to a business of branding its product.",
    points: ["A brand makes the product easy to recognise", "Customers who trust the brand buy again", "The business may charge a higher price (a premium)"],
    modelAnswer: "A brand makes the product easy to recognise, so customers who trust it buy again. The business may also be able to charge a higher price because customers value the brand.",
    hints: ["Think about recognition, loyalty and price."],
    explanation: "A benefit developed.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional honey producer in Chipinge sells honey in plain jars at a market stall. Explain **two** ways in which better packaging could help it.",
    points: ["A label with the producer's name and origin helps recognition and trust", "Application: tourists can remember and ask for the brand again", "A strong, sealed jar protects the honey", "Application: less spillage in transport allows sale in shops far away"],
    modelAnswer: "A clear label with the producer's name and origin helps recognition and trust, so tourists can remember and ask for the brand again. A strong sealed jar also protects the honey, so there is less spillage in transport and it can be sold in shops far from the market stall.",
    hints: ["Think about promotion and protection."],
    explanation: "Two roles of packaging, applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a unique selling point must be hard to copy to give a lasting advantage.",
    points: ["A USP gives the product a reason to be chosen", "If rivals copy it quickly, the difference disappears", "Customers may then compare on price", "So the firm loses its price premium and profit falls"],
    modelAnswer: "A USP gives customers a reason to choose the product. If rivals can copy it quickly, the difference disappears and customers compare on price instead. The firm then loses its price premium and its profit falls.",
    hints: ["Follow what happens when a rival copies."],
    explanation: "A chain from copying to loss of premium.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional family bakery in Bulawayo is considering stopping its standard loaf to concentrate on a more expensive, artisan range with a new brand. Evaluate this decision.",
    points: ["Artisan products can be sold at a premium and build loyalty", "A strong brand makes it harder for rivals to compete on price", "The market for expensive bread may be smaller", "Branding, ingredients and training cost money", "Loss of the standard loaf may lose regular customers", "Judgement with reason, e.g. introduce the range alongside the standard loaf first"],
    modelAnswer: "An artisan range can be sold at a premium and build loyalty, and a strong brand makes it harder for rivals to compete on price. However, the market for expensive bread may be smaller, the branding, ingredients and training cost money, and dropping the standard loaf may lose regular customers. The bakery should introduce the range alongside the standard loaf first, and drop the standard loaf only if the new range sells well.",
    hints: ["Weigh the premium against the smaller market and the risk."],
    explanation: "A balanced judgement about differentiation.",
  });

  const rows = [["Standard", 12.5, 3000], ["Premium", 18, 1800]];
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true, examStyle: true,
    stem: "A fictional water-bottling firm in Mutare sells two products.\n\n" + table(["Product", "Price per case (US\\$)", "Cases sold a month"], rows) + "\n\nThe premium case has a branded bottle and costs US\\$3.50 a case more to make than the standard case. The standard case costs US\\$8 to make.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 12.5 * 3000 + 18 * 1800, stem: "Calculate the total monthly revenue from the two products.", wrong: [12.5 * 3000, 18 * 1800], explanation: "Standard: 12.50 × 3,000 = 37,500. Premium: 18 × 1,800 = 32,400. Total = US\\$69,900." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: (12.5 - 8) * 3000 - (18 - 11.5) * 1800, stem: "Calculate how much less total profit (price minus cost, times cases) the premium product earns than the standard product each month.", wrong: [(18 - 11.5) * 1800, 13500], explanation: "Premium profit per case = 18 − 11.50 = 6.50; × 1,800 = US\\$11,700. Standard profit per case = 12.50 − 8 = 4.50; × 3,000 = US\\$13,500. Difference = 13,500 − 11,700 = US\\$1,800 less for the premium product." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** reason why the firm might still continue to sell the premium product.", points: ["The premium margin per case is higher (US\\$6.50 against US\\$4.50)", "It builds the brand and image of the firm", "Sales of the premium product may grow, whereas the standard product faces price competition"], modelAnswer: "The premium margin per case is higher, US\\$6.50 against US\\$4.50. The premium product also builds the brand and image of the firm, and its sales may grow whereas the standard product faces price competition.", explanation: "Margin per unit and brand-building." }),
    ],
    hints: ["Profit per case × cases for each product."],
    explanation: "Revenue US\\$69,900; the premium range earns US\\$1,800 less in total but US\\$2 more per case.",
  });
  chk(12.5 * 3000 + 18 * 1800, 69900, 1e-6);
  chk((18 - 11.5) * 1800 - (12.5 - 8) * 3000, -1800, 1e-6);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "Read the extract. Chipo Cosmetics is a fictional manufacturer in Harare that sells a basic skin cream in plain tubs through street vendors at a low price. Competition from cheap imports is strong. The owner proposes a new range with natural ingredients, attractive packaging, a brand name and sales through pharmacies at twice the price. It would cost US\\$30,000 to launch.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain **one** way in which the new range is differentiated from the basic cream.", points: ["It uses natural ingredients, a feature customers may value", "It has a brand and attractive packaging", "So it can be seen as higher quality than cheap imports"], modelAnswer: "The new range uses natural ingredients, which customers may value, and has a brand and attractive packaging. It can then be seen as higher quality than the cheap imports.", explanation: "Differentiation by ingredients and image." }),
      P.manual({ label: "(b)", marks: 6, stem: "Assess whether Chipo Cosmetics should launch the new range.", points: ["Differentiation avoids competing on price with imports", "A brand and pharmacy distribution suit a premium image", "Twice the price gives a higher margin per unit", "US\\$30,000 launch cost is large for a small firm", "Customers may not pay twice the price, and rivals can copy", "Judgement with reason, e.g. launch in a few pharmacies first"], modelAnswer: "Differentiation allows Chipo Cosmetics to avoid competing on price with cheap imports, and a brand with pharmacy distribution suits a premium image, with a higher margin per unit. However, a US\\$30,000 launch is large for a small firm, customers may not pay twice the price and rivals could copy the idea. The firm should launch in a few pharmacies first and expand if sales cover the cost.", explanation: "Premium positioning against cost and risk." }),
    ],
    hints: ["Compare the benefit of the premium with the cost and the risk."],
    explanation: "Differentiation offers a premium but costs money and may fail.",
  });

  b.card("DEFINITION", "Marketing mix", "The combination of product, price, promotion and place decisions (plus people, processes and physical evidence for services).");
  b.card("FACT", "The extended mix for services", "People, processes and physical evidence are added to the 4Ps.", undefined, { applies: ZIM });
  b.card("DEFINITION", "Unique selling point (USP)", "A feature that makes a product different from and better than competing products in customers' eyes.");
  b.card("DEFINITION", "Product differentiation", "Making a product different from rivals' products in a way customers value.");
  b.card("CONCEPT", "Benefits of branding", "Recognition, loyalty, a price premium, trust and a platform for new products.");
  b.card("FACT", "Roles of packaging", "Protect, preserve, inform, promote, give convenience and position the product.");
  b.card("CONCEPT", "Goods and services", "Goods are tangible and can be stored; services are intangible and cannot be stored.");
  b.card("CONCEPT", "An integrated mix", "Product, price, promotion and place all support the same target market and positioning.");
  b.card("FORMULA", "Price premium (%)", "(Branded price − plain price) ÷ plain price × 100.");
});
