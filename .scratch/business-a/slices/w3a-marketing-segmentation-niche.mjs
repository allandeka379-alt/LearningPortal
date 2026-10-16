// W3a: marketing.segmentation-niche
import { concept, P, table, r2, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";

concept("abus.marketing.segmentation-niche", { file: "marketing/segmentation-niche", keyPrefix: "marketing.segmentation-niche" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of the following is a **niche market**?",
    ok: ["Left-handed golf clubs sold to left-handed golfers", "Correct: a specialised product for a small, defined group."],
    bad: [["Bread sold in every shop to all kinds of shoppers", "Bread is a mass-market product."], ["Soap sold to every household in the whole country", "Soap sells to the mass market."], ["Cooking oil sold in supermarkets to all age groups", "Cooking oil is a mass-market product."]],
    explanation: "A niche market is a small, specialised part of a larger market.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Dividing a market by the age, sex and income of customers is segmentation by which criterion?",
    ok: ["Demographic", "Correct: age, sex and income are population characteristics."],
    bad: [["Geographic segmentation", "That divides by where customers live."], ["Psychographic segmentation", "That divides by lifestyle and attitudes."], ["Behavioural segmentation", "That divides by how customers use the product."]],
    explanation: "Demographic segmentation uses features such as age, sex, income and occupation.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A fictional clothing shop in Mutare targets customers who value fashion and status above price. Which segmentation criterion is this?",
    ok: ["Psychographic segmentation by values", "Correct: it is based on values and attitudes."],
    bad: [["Geographic segmentation by town", "Location is not mentioned."], ["Demographic segmentation by age group", "No age group is mentioned."], ["Behavioural segmentation by usage rate", "Usage rate is not mentioned."]],
    explanation: "Psychographic segmentation uses lifestyle, values and attitudes.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a key advantage of niche marketing for a small business?",
    ok: ["Fewer direct rivals and the chance to set higher prices", "Correct: specialised customers will pay more for a good fit."],
    bad: [["Very large sales volume and low unit costs from scale", "These are features of mass marketing."], ["No need to know anything at all about customers' needs", "Niche marketing needs close knowledge of the customers."], ["No risk at all because large firms never enter the niche", "Large firms may enter a profitable niche."]],
    explanation: "Niche marketers face fewer rivals and can charge higher prices for a specialised product.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bank in Harare offers a savings account with a free mobile app to people aged 18 to 25 with a first job. Which statement describes this correctly?",
    ok: ["It targets a demographic segment with a specific product", "Correct: age and employment define the segment."],
    bad: [["It uses mass marketing for the whole of the population", "The account is for a defined group."], ["It uses only geographic segmentation by region of the country", "The segment is defined by age, not place."], ["It positions the account as a luxury only for the rich", "A first-job account is not a luxury product."]],
    hints: ["Which feature of the customers defines the segment?"],
    explanation: "The bank has chosen a segment by age and employment and designed a product for it.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional ice-cream maker in Gweru spends a lot on designing a different product for each of five segments. What is the MOST likely disadvantage?",
    ok: ["Higher costs of research and design, and smaller runs", "Correct: separate mixes raise cost and reduce economies of scale."],
    bad: [["Lower costs because the production is now more varied", "Variety normally raises cost."], ["Less need for any market research on each of the groups", "Segmentation needs more research, not less."], ["A fall in customer satisfaction in every segment", "A closer fit usually raises satisfaction."]],
    hints: ["Think about the cost of making and selling several products."],
    explanation: "Several mixes raise research, design and promotion costs and cut the size of production runs.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional organic farm in Chinhoyi sells vegetables to a small group of health-conscious customers at high prices. A national supermarket begins to sell organic vegetables at lower prices. What is the BEST analysis of the risk to the farm?",
    ok: ["The niche is attractive to larger rivals, which can price lower", "Correct: success in a niche attracts bigger competitors."],
    bad: [["The niche is protected from every rival, so there is no risk", "Large firms can enter a niche."], ["The farm should now switch to selling to the mass market at once", "A move to the mass market faces strong competition."], ["Health-conscious customers will pay any price offered", "Customers compare prices and quality."]],
    hints: ["What does a large firm do when it sees a profitable niche?"],
    explanation: "The farm's niche can be invaded; it should defend with differentiation such as freshness, trust and service.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional bakery has a small segment of loyal customers worth US\\$20,000 a year and a larger segment worth US\\$35,000 a year that is also served by three rivals. Which statement is the BEST judgement about which to target?",
    ok: ["It depends on whether it can match rivals' cost and service", "Correct: the larger segment pays more but is more competitive."],
    bad: [["The larger segment is certainly the better because it is bigger", "Size alone ignores competition and cost."], ["The smaller segment is certainly better because it is loyal", "Loyalty is valuable, but the revenue is much lower."], ["Neither segment can ever be profitable for a bakery", "Both can earn a profit."]],
    hints: ["Weigh revenue against the strength of the competition."],
    explanation: "The choice depends on revenue, competition and the firm's ability to win customers.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A niche market is a small, specialised part of a larger market.",
    answer: true,
    explanation: "True. Niche marketers tailor a product to a particular group.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Market segmentation means selling the same product in the same way to every customer.",
    answer: false,
    explanation: "False. That is mass marketing. Segmentation divides the market into groups so each can be served by a suitable mix.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each segmentation criterion to an example.",
    pairs: [["Geographic", "Urban shoppers in Harare compared with rural shoppers"], ["Demographic", "Households with an income above US\\$500 a month"], ["Psychographic", "People who see themselves as environmentally aware"], ["Behavioural", "Customers who buy the product every week"]],
    explanation: "Each criterion divides the market on a different basis: place, population characteristic, lifestyle and attitude, or behaviour.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "{{blank:a}} marketing sells a standard product to the whole market, while {{blank:b}} marketing aims a specialised product at a small group.",
    blanks: [
      { id: "a", accepted: ["Mass"], choices: ["Mass", "Niche", "Direct"] },
      { id: "b", accepted: ["niche"], choices: ["mass", "niche", "online"] },
    ],
    explanation: "Mass marketing aims at everyone; niche marketing aims at a specific group.",
  });

  const seg = [["Students", 3000, 0.04, 12], ["Workers", 2500, 0.08, 25], ["Seniors", 900, 0.2, 18]];
  const rev = seg.map(([, size, pen, fee]) => size * pen * fee * 12);
  chk(rev[0], 17280, 1e-6);
  chk(rev[1], 60000, 1e-6);
  chk(rev[2], 38880, 1e-6);
  const tbl = table(["Segment", "People in area", "Sign-up rate", "Monthly fee (US\\$)"], seg.map(([n, s, p, f]) => [n, s, `${p * 100}%`, f]));
  const seg2 = [["Teachers", 800, 0.12, 22], ["Nurses", 650, 0.1, 28]];
  const tRev = 800 * 0.12 * 22 * 12, nRev = 650 * 0.1 * 28 * 12;
  chk(tRev, 25344, 1e-6);
  chk(nRev, 21840, 1e-6);
  const tbl2 = table(["Segment", "People in area", "Sign-up rate", "Monthly fee (US\\$)"], seg2.map(([n, s, p, f]) => [n, s, `${Math.round(p * 100)}%`, f]));
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: rev[2], calculator: true, wrong: [seg[2][1] * seg[2][3] * 12, rev[2] / 12],
    stem: "A fictional fitness club in Gweru estimates the demand from three segments.\n\n" + tbl + "\n\nCalculate the annual revenue from the Seniors segment, assuming members pay the fee for 12 months.",
    hints: ["Members = people × sign-up rate."],
    explanation: "Members = 900 × 20% = 180. Revenue = 180 × 18 × 12 = US\\$38,880. Forgetting the sign-up rate gives US\\$194,400.",
  });
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: tRev - nRev, calculator: true, wrong: [tRev, nRev],
    stem: "A fictional social club in Masvingo estimates demand from two segments.\n\n" + tbl2 + "\n\nCalculate how much more annual revenue the Teachers segment earns than the Nurses segment, assuming members pay for 12 months.",
    hints: ["Find the revenue from each segment first."],
    explanation: "Teachers: 800 × 12% = 96 members; 96 × 22 × 12 = US\\$25,344. Nurses: 650 × 10% = 65 members; 65 × 28 × 12 = US\\$21,840. Difference = US\\$3,504.",
    workedSolution: "1. Teachers' members = 800 × 12% = 96; revenue = 96 × 22 × 12 = US\\$25,344.\n2. Nurses' members = 650 × 10% = 65; revenue = 65 × 28 × 12 = US\\$21,840.\n3. Difference = 25,344 − 21,840 = US\\$3,504.",
  });
  chk(tRev - nRev, 3504, 1e-6);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: 3500 * 0.04, unit: "members", daily: true, wrong: [3500 * 0.4, 4],
    stem: "A fictional dance studio in Bulawayo finds 3,500 young adults in its area and expects 4% to sign up. How many members does it expect?",
    hints: ["People × sign-up rate."],
    explanation: "3,500 × 4% = 140 members.",
  });

  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the type of segmentation that divides customers by where they live.",
    accepted: ["geographic", "geographical", "geographic segmentation", "location"],
    explanation: "Geographic segmentation.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** advantage of market segmentation for a business.",
    points: ["It divides customers into groups with similar needs", "The product and promotion can be tailored to each group", "So customers are more satisfied and money is not wasted on uninterested groups"],
    modelAnswer: "Segmentation divides customers into groups with similar needs, so the product and promotion can be tailored to each group. Customers are then more satisfied and the business does not waste money on groups that are not interested.",
    hints: ["Think about the fit between product and customer."],
    explanation: "An advantage developed.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional clothing maker in Bulawayo makes school uniforms and decides to add a range of traditional-style formal wear. Explain **two** ways in which it could segment its market for the new range.",
    points: ["By income (demographic), for example middle-income families", "Application: families who can afford to buy formal wear for weddings", "By lifestyle or values (psychographic), for example customers who value cultural heritage", "Application: promotion through cultural events and community groups"],
    modelAnswer: "The maker could segment by income, targeting middle-income families who can afford formal wear for weddings and other events. It could also segment by values, targeting customers who value cultural heritage, and promote the range at cultural events and community groups.",
    hints: ["Choose two different criteria and link each to the product."],
    explanation: "Two criteria, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a small firm may prefer a niche strategy to mass marketing.",
    points: ["A small firm lacks the scale to compete on price in the mass market", "A niche has fewer competitors", "Customers will pay more for a product that fits their needs", "So the firm can earn a profit with lower volume"],
    modelAnswer: "A small firm cannot match the low costs of large rivals in the mass market. In a niche there are fewer competitors and customers will pay more for a product that fits their needs, so the firm can earn a profit with a lower volume of sales.",
    hints: ["Compare the firm's strengths with the demands of the mass market."],
    explanation: "A chain from lack of scale to the choice of a niche.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional safari lodge near Victoria Falls has always sold to all types of tourist. The manager is considering concentrating on luxury honeymoon couples only. Evaluate this decision.",
    points: ["Couples will pay high prices, raising revenue per guest", "A clear image helps promotion and can lift loyalty and recommendations", "Fewer rivals may offer the same specialist service", "The market is smaller, and bookings may fall if demand drops or rivals copy", "Lodge needs to invest in new facilities and training", "Judgement with a reason or condition"],
    modelAnswer: "Honeymoon couples will pay high prices, so revenue per guest could rise, and a clear image would help promotion and bring recommendations. However, the market is smaller, so bookings could fall if demand drops or rivals copy the idea, and the lodge must invest in new facilities and training. The change is worthwhile if the lodge can win enough bookings at high prices to cover the extra cost; otherwise it should keep other guests as well.",
    hints: ["Weigh higher revenue and a clear image against a smaller market and extra cost."],
    explanation: "A balanced judgement about a niche strategy.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", calculator: true, examStyle: true,
    stem: "A fictional coffee shop in Harare is considering two segments for a new product. Segment A is 1,200 office workers expected to buy 15% of the time at US\\$4 a visit, 250 visits a year each buying customer. Segment B is 800 students expected to buy 20% of the time at US\\$2 a visit, 150 visits a year each buying customer.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 1200 * 0.15 * 4 * 250, stem: "Calculate the annual revenue from segment A (customers = people × 15%).", wrong: [1200 * 4 * 250, 1200 * 0.15 * 4], explanation: "Customers = 1,200 × 15% = 180. Revenue = 180 × 250 × 4 = US\\$180,000." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: 800 * 0.2 * 2 * 150, stem: "Calculate the annual revenue from segment B (customers = people × 20%).", wrong: [800 * 2 * 150, 800 * 0.2 * 2], explanation: "Customers = 800 × 20% = 160. Revenue = 160 × 150 × 2 = US\\$48,000." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** reason, apart from revenue, why the coffee shop might still choose segment B.", points: ["Students may be easier to reach through campus promotion at low cost", "Student customers may develop loyalty and become future higher-spending customers", "Competition for office workers may be stronger"], modelAnswer: "Students can be reached cheaply through campus promotion, and they may become loyal customers who spend more once they begin work. Competition for office workers may also be stronger, so the shop may lose them.", explanation: "A non-revenue reason." }),
    ],
    hints: ["Customers = people × the percentage who buy."],
    explanation: "A earns US\\$180,000; B earns US\\$48,000; other factors can affect the choice.",
  });
  chk(1200 * 0.15 * 4 * 250, 180000, 1e-6);
  chk(800 * 0.2 * 2 * 150, 48000, 1e-6);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    stem: "Read the extract. Rudo's Kitchen is a fictional catering business in Mutare. For years it has sold standard lunch boxes to any customer who orders. Sales have stagnated. A consultant suggests two options: (1) concentrate on corporate lunches for offices, with weekly contracts and a menu for staff on diets; or (2) keep the standard boxes but cut the price by 15% to attract more customers.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify the segmentation criterion in option 1 and explain how it would change Rudo's marketing mix.", points: ["Demographic (occupation) or behavioural (regular buyers) segmentation", "The product would change to a diet menu for staff", "Promotion and distribution would move to personal selling and weekly delivery to offices"], modelAnswer: "The segment is defined by occupation and by buying behaviour (regular weekly orders). The product would change to a diet menu for staff, and promotion and distribution would change to personal selling and weekly delivery to offices.", explanation: "Criterion and consequences for the mix." }),
      P.manual({ label: "(b)", marks: 6, stem: "Assess which option Rudo's Kitchen should choose.", points: ["Option 1: regular contracts give steady income and loyalty", "Option 1: a tailored product can justify higher prices", "Option 1: dependence on a few corporate customers is risky and needs new skills", "Option 2: a price cut may raise sales in the short term", "Option 2: it reduces the profit per box and rivals can copy it", "Judgement with reason, e.g. option 1 if enough corporate customers can be won"], modelAnswer: "Option 1 gives regular contracts and a steady income and a tailored menu can justify a higher price. It makes the business depend on a few corporate customers and needs new selling skills. Option 2 might raise sales quickly, but it cuts the profit on each box and rivals can copy it easily. On balance, option 1 is better if Rudo's can win enough corporate customers, because it builds loyalty instead of competing on price.", explanation: "A choice between niche targeting and a price cut, with a judgement." }),
    ],
    hints: ["Think about steady income, risk and what rivals can copy."],
    explanation: "Option 1 is a segmentation strategy; option 2 competes on price and is easily copied.",
  });

  b.card("DEFINITION", "Market segmentation", "Dividing a market into groups with similar needs or characteristics so each can be served with a suitable mix.");
  b.card("DEFINITION", "Niche marketing", "Aiming a specialised product at a small, defined part of a larger market.");
  b.card("DEFINITION", "Mass marketing", "Selling a standard product to the whole market with the same mix.");
  b.card("FACT", "Segmentation criteria", "Geographic (place), demographic (age, sex, income), psychographic (lifestyle, values) and behavioural (usage, loyalty).");
  b.card("CONCEPT", "Advantages of niche marketing", "Fewer rivals, higher prices and loyalty; but a small market and the risk that larger firms enter.");
  b.card("CONCEPT", "Advantages and costs of segmentation", "Closer fit and less waste, but extra research, design and promotion costs and smaller production runs.");
  b.card("FACT", "A good segment is", "Measurable, reachable, large enough to be profitable and different in its response.");
  b.card("DEFINITION", "Positioning", "The image of a product in customers' minds compared with competing products.");
  b.card("CONCEPT", "Targeting and differentiation", "Targeting chooses the segment; differentiation makes the product different in a way customers value.");
});
