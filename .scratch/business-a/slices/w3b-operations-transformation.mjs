// W3b: operations.transformation
import { concept, P, chk, money, table, r2, ZBE } from "../lib.mjs";
import { mc } from "../tables/w3b-lib.mjs";

concept("abus.operations.transformation", { file: "operations/transformation", keyPrefix: "operations.transformation" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In the transformational process, flour, yeast and an oven are used by bakers to make loaves. The flour, yeast and oven are",
    ok: ["inputs", "Correct: resources used to produce the output."],
    bad: [["outputs", "The loaves are the outputs."], ["added value", "Added value is the difference between price and input cost."], ["the process", "The process is the baking itself."]],
    explanation: "Inputs are the resources used. The process changes them into outputs.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these activities belongs to the **primary** stage of production?",
    ok: ["Growing maize on a farm", "Correct: primary production extracts or grows raw materials."],
    bad: [["Milling maize into meal", "Milling is secondary production."], ["Transporting maize to a shop", "Transport is a tertiary service."], ["Selling maize meal in a shop", "Retail is tertiary."]],
    explanation: "Primary production grows or extracts raw materials; milling is secondary and selling is tertiary.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Added value is calculated as",
    ok: ["selling price minus the cost of bought-in inputs", "Correct: it measures the value the business itself has created."],
    bad: [["selling price minus the wages paid to workers", "Wages are part of the added value, not subtracted from it."], ["revenue minus all costs, including wages and rent", "That is profit."], ["the cost of inputs divided by the selling price", "That is a cost share, not added value."]],
    explanation: "Added value = selling price − cost of bought-in inputs. Profit is what is left after wages and other costs.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a factor of production classed as **capital**?",
    ok: ["A baking oven used to make bread", "Correct: capital means man-made resources used to produce goods."],
    bad: [["The fertile soil of a farm", "Soil is land."], ["The effort of a worker mixing dough", "Human effort is labour."], ["The owner's willingness to take a risk", "Risk-taking is enterprise."]],
    explanation: "Capital is made by people and used in production, such as machines, tools and buildings.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional furniture firm in Mutare buys timber and screws costing US\\$40 for each table and sells the table for US\\$95. The added value for each table is",
    ok: ["US\\$55", "Correct: 95 − 40."],
    bad: [["US\\$135", "This adds the cost of inputs and the price."], ["US\\$40", "This is the cost of the inputs."], ["US\\$95", "This is the selling price, not the added value."]],
    hints: ["Subtract the cost of bought-in inputs from the selling price."],
    explanation: "Added value = 95 − 40 = US\\$55 for each table.",
  });
  mc(b, {
    d: 3, applies: ZBE, skill: "ANALYSIS",
    stem: "A country exports raw copper ore and imports copper wire. Which is the **most likely** benefit of beneficiation for that country?",
    ok: ["Earning more from the same ore and creating skilled jobs", "Correct: processing adds value and employment."],
    bad: [["Lower prices for the ore on the world markets each year", "Beneficiation does not lower world prices for the raw ore."], ["No need to invest in power, skills or any equipment", "Processing needs investment, power and skills."], ["Certain profits whatever the cost of processing", "Profit depends on costs and prices, so nothing is certain."]],
    hints: ["Think about what processing adds in terms of income and work."],
    explanation: "Processing locally earns more per tonne and creates work, but it needs investment and skills.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which stage of production does a bank providing loans to farmers belong to?",
    ok: ["Tertiary, because it is a service for production", "Correct: banking is a service."],
    bad: [["Primary, because it supplies money to the farmers", "Primary is extraction and growing, not services."], ["Secondary, because it manufactures the money", "Banks provide services, not manufactured goods."], ["It is outside all stages of production", "Services are the tertiary stage."]],
    hints: ["Does the bank grow, make or serve?"],
    explanation: "Banking is a tertiary service.",
  });
  mc(b, {
    d: 4, applies: ZBE, skill: "EVALUATION",
    stem: "Which conclusion is the **best-supported judgement** on whether a farmers' group should process its groundnuts into peanut butter instead of selling them raw?",
    ok: ["It depends on whether the extra revenue exceeds the extra processing cost", "Correct: the choice rests on a comparison of gain and cost."],
    bad: [["Yes, because processed goods always earn more profit than raw goods", "Processing costs may exceed the extra revenue."], ["No, because farmers should only grow crops and never process them", "A rigid rule ignores the possible gain."], ["Yes, because processing needs no power, skills or investment", "Processing needs all three."]],
    hints: ["Compare the extra revenue with the extra cost."],
    explanation: "A sound judgement compares extra revenue with extra cost and names the conditions.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Added value is the same as profit.",
    answer: false,
    explanation: "False. Added value is selling price minus bought-in inputs. Wages, rent and other costs must still be paid from it; what remains is profit.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each factor of production to the example in a bakery.",
    pairs: [["Land", "The plot on which the bakery stands"], ["Labour", "The bakers who mix and bake the dough"], ["Capital", "The ovens and mixing machines"], ["Enterprise", "The owner who organises the business and takes the risk"]],
    explanation: "Land is natural resources, labour is human effort, capital is made resources and enterprise is risk-taking and organisation.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Milling maize into meal is {{blank:a}} production, whereas retailing the meal in a shop is {{blank:b}} production.",
    blanks: [
      { id: "a", accepted: ["secondary"], choices: ["primary", "secondary", "tertiary"] },
      { id: "b", accepted: ["tertiary"], choices: ["primary", "secondary", "tertiary"] },
    ],
    explanation: "Milling is manufacturing (secondary); retail is a service (tertiary).",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State the term for processing a raw material in the country where it is produced, so that it is sold in a more valuable form.",
    accepted: ["beneficiation", "value addition", "value-addition", "adding value", "local processing"],
    explanation: "Beneficiation (value addition) means processing raw materials locally to sell them in a more finished form.",
  });

  {
    const price = 14.5, inputs = 9.2;
    const av = price - inputs;
    chk(av, 5.3);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional soap maker in Gweru sells a box of soap for ${money(price)}. The bought-in materials and packaging cost ${money(inputs)} a box. Calculate the added value for each box.`,
      kind: "money", value: av, wrong: [price + inputs, inputs],
      explanation: "Added value = 14.50 − 9.20 = US\\$5.30. Adding the two figures gives US\\$23.70.",
    });
  }
  {
    const price = 16, inputs = 10;
    const pct = ((price - inputs) / price) * 100;
    chk(pct, 37.5, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional candle maker in Masvingo sells a box of candles for ${money(price)}, and the bought-in wax, wicks and boxes cost ${money(inputs)}. Calculate added value as a percentage of the selling price, to one decimal place.`,
      kind: "pct", value: pct, wrong: [((price - inputs) / inputs) * 100, (inputs / price) * 100],
      hints: ["Find the added value first, then divide by the selling price."],
      explanation: "Added value = 16 − 10 = 6. 6 ÷ 16 × 100 = 37.5%. Dividing by the input cost gives 60.0%, and 62.5% is the inputs as a share of price.",
    });
  }
  {
    const rev = 84000, bought = 51500;
    const av = rev - bought;
    chk(av, 32500);
    b.num({
      d: 3, skill: "APPLICATION",
      stem: `A fictional printing business had yearly revenue of ${money(rev)}. It spent ${money(bought)} on bought-in paper, ink and services. Calculate its total added value for the year.`,
      kind: "money", value: av, wrong: [rev + bought, bought],
      hints: ["Subtract the bought-in inputs from revenue."],
      explanation: "Added value = 84,000 − 51,500 = US\\$32,500. This must pay wages, rent, interest, tax and profit.",
    });
  }
  {
    const raw = 50 * 220, proc = 36 * 340, cost = 900;
    const gain = proc - raw - cost;
    chk(raw, 11000); chk(proc, 12240); chk(gain, 340);
    b.calc({
      d: 3, applies: ZBE, skill: "APPLICATION", calculator: true,
      stem: `A fictional mining supplier can sell 50 tonnes of crushed ore at ${money(220)} a tonne. If it processes the ore it can sell 36 tonnes of concentrate at ${money(340)} a tonne, but processing costs ${money(cost)}. Calculate the extra profit from processing.`,
      kind: "money", value: gain, wrong: [proc - raw, proc - cost],
      hints: ["Compare the revenue from each choice and subtract the processing cost."],
      workedSolution: "1. Revenue from raw ore = 50 × 220 = US\\$11,000.\n2. Revenue from concentrate = 36 × 340 = US\\$12,240.\n3. Extra revenue = 12,240 − 11,000 = US\\$1,240.\n4. Extra profit = 1,240 − 900 = US\\$340.",
      explanation: "Extra revenue of US\\$1,240 less processing costs of US\\$900 gives US\\$340. Forgetting the cost gives US\\$1,240.",
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why added value is not the same as profit.",
    points: ["Added value is selling price minus the cost of bought-in inputs", "Wages, rent and other costs must be paid out of the added value, so profit is less"],
    modelAnswer: "Added value is the selling price less the cost of bought-in inputs. Wages, rent and other costs have to be paid out of it, so the profit that remains is smaller.",
    explanation: "One mark for the definition and one for the costs to be paid.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Tendai runs a fictional bakery in Harare. Explain **two** ways in which the bakery adds value to its inputs.",
    points: ["It turns flour and yeast into bread, which customers value more than the ingredients", "Application: the bread sells for more than the cost of the flour, yeast and energy", "It packages, slices and displays the bread attractively", "Application: this convenience and appearance persuade customers to pay a higher price"],
    modelAnswer: "The bakery turns flour and yeast into bread, which sells for more than the cost of the ingredients and energy. It also slices and packs the bread attractively, which customers find convenient and will pay extra for.",
    hints: ["Think about what the bakery does to the ingredients, and how it presents the bread."],
    explanation: "Two ways, each developed with the bakery.",
  });
  b.manualShort({
    d: 4, applies: ZBE, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a country that exports only raw materials may earn less than one that processes them.",
    points: ["Raw materials sell at a low price per tonne compared with processed goods", "Processors earn the added value that raw exporters do not keep", "Processing creates jobs and skills that raw exports do not", "Raw prices change sharply, so income is unstable"],
    modelAnswer: "Raw materials sell for less per tonne than processed goods, and the processors earn the added value. Processing also creates jobs and skills, whereas raw exports do not, and the price of raw materials changes sharply so income is unstable.",
    hints: ["Think about who keeps the added value."],
    explanation: "Four linked reasons for the lower earnings.",
  });
  b.manualShort({
    d: 4, applies: ZBE, skill: "EVALUATION", marks: 5,
    stem: "A fictional farmers' group in Gokwe is thinking of drying and packing its tomatoes instead of selling them fresh. Assess whether it should do so.",
    points: ["Dried tomatoes can sell for more per kilogram and keep longer", "Drying reduces waste when there is a glut of fresh tomatoes", "The group needs a dryer, power and packing, which cost money", "It also needs a market for the dried product and skills to make it", "Judgement with a reason or condition, for example: go ahead if buyers will pay enough to cover the costs"],
    modelAnswer: "Dried tomatoes keep longer and may sell at a higher price per kilogram, and drying reduces waste when fresh tomatoes are plentiful. But the group needs a dryer, power, packing and a market for the new product. It should go ahead if buyers will pay enough to cover the extra costs, and begin with a small batch to test the market.",
    hints: ["Compare the gain in value with the extra costs and skills needed."],
    explanation: "Both sides, then a conditional judgement.",
  });

  {
    const st = [["Farm", 0.4, 0.9], ["Ginnery", 0.9, 1.3], ["Garment maker", 1.3, 4.1]];
    const va = st.map(([, i, p]) => p - i);
    chk(va[2], 2.8); chk(va[0] + va[1] + va[2], 4.1 - 0.4);
    const tbl = table(["Stage", "Bought-in inputs (US\\$ per kg of cotton)", "Selling price (US\\$ per kg of cotton)"], st.map(([n, i, p]) => [n, i, p]), ["l", "r", "r"]);
    b.struct({
      d: 3, skill: "ANALYSIS", examStyle: true,
      stem: `The table shows three stages in the chain from cotton to clothing in a fictional Zimbabwean business group.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the added value of the garment maker for each kilogram of cotton.", kind: "money", value: va[2], wrong: [4.1, 1.3], explanation: "4.10 − 1.30 = US\\$2.80. Using the selling price alone gives US\\$4.10." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which stage is primary production?", options: [["Farm", "Correct: growing cotton is primary."], ["Ginnery", "Ginning is processing, a secondary activity."], ["Garment maker", "Making clothes is secondary."], ["None of the stages", "The farm is primary production."]], answer: "A", explanation: "Growing cotton on a farm is primary production." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why the country would earn more if cotton were made into garments at home than if it exported raw cotton.", points: ["The garment maker adds US\\$2.80 per kilogram of cotton, much more than the farm adds", "Local processing keeps this added value in the country as wages and profit", "It also creates jobs and skills in the garment industry"], modelAnswer: "The garment maker adds US\\$2.80 for each kilogram of cotton, far more than the farm's US\\$0.50. If the processing is done at home, the added value stays in the country as wages and profit, and the garment industry creates jobs and skills.", hints: ["Compare the value added at each stage."], explanation: "Value added figure, where it stays, and jobs." }),
        P.manual({ label: "(d)", marks: 3, stem: "Assess whether the group should build a garment factory.", points: ["The garment stage adds the most value per kilogram (US\\$2.80)", "A factory needs capital, skills, power and a market for the clothes", "Judgement with a condition, for example: build only if buyers will pay enough to cover the cost"], modelAnswer: "The garment stage adds the most value, US\\$2.80 for each kilogram of cotton, so it offers the largest gain. But a factory needs capital, skilled labour, reliable power and buyers. The group should build it only if it can sell the clothes at prices that cover those costs.", hints: ["Weigh the added value against what a factory needs."], explanation: "Gain, cost and a conditional judgement." }),
      ],
      hints: ["Value added = selling price minus bought-in inputs."],
      explanation: "Value added is US\\$0.50 at the farm, US\\$0.40 at the ginnery and US\\$2.80 at the garment maker.",
    });
  }
  {
    const nuts = 1000, price = 1.1, out = 800, p2 = 3.2, cost = 1300;
    const rawRev = nuts * price, procRev = out * p2, gain = procRev - rawRev - cost;
    chk(procRev, 2560); chk(gain, 160);
    b.struct({
      d: 5, applies: ZBE, skill: "EVALUATION", examStyle: true,
      stem: `A fictional cooperative of groundnut farmers in Gokwe sells 1,000 kg of raw groundnuts at ${money(price)} a kilogram. It is thinking of roasting and grinding them into peanut butter. From 1,000 kg of nuts it would produce ${out} kg of peanut butter, sold at ${money(p2)} a kilogram. Processing would cost ${money(cost)} for each 1,000 kg of nuts (power, jars, labour and transport). The members would need to borrow money for a grinder, and are worried that shops may not buy their brand.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the revenue from selling the peanut butter made from 1,000 kg of nuts.", kind: "money", value: procRev, wrong: [rawRev, out * price], explanation: "800 × 3.20 = US\\$2,560. Selling the raw nuts would earn 1,000 × 1.10 = US\\$1,100." }),
        P.manual({ label: "(b)", marks: 4, stem: "Analyse **one** problem the cooperative might face in starting to process groundnuts.", points: ["It must borrow money for the grinder, which adds interest and risk", "Shops may not buy an unknown brand, so sales may be lower than planned", "Lower sales would leave the cooperative unable to cover processing costs", "The members may also lack the skills to produce a consistent quality product"], modelAnswer: "The cooperative must borrow to buy the grinder, so it takes on a debt to repay. If shops do not buy the new brand, sales will be below plan and revenue may not cover the processing costs, leaving the members worse off than selling raw nuts.", hints: ["Use the loan and the shops' attitude from the case."], explanation: "A chain from the problem to the effect on income." }),
        P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether the cooperative should start making peanut butter.", points: ["Revenue rises from US\\$1,100 to US\\$2,560 per 1,000 kg of nuts", "After US\\$1,300 of processing costs, the extra profit is US\\$160 a batch (2,560 − 1,100 − 1,300)", "The gain is small and falls to nil if the price drops by about 6%, or the output of butter is lower", "Peanut butter lasts longer than nuts and may build a brand", "The loan, risk of unsold stock and the shops' reaction are against processing", "Processing could create jobs for members' families", ["Judgement with a reason, for example: the gain is too small to justify the risk without a firm buyer", 1], ["Condition or time-frame, for example: begin with a trial batch and a contract with one shop", 1]], levels: [[1, 1, 3, "General points on processing with little use of the figures."], [2, 4, 6, "Reasons for and against using the figures."], [3, 7, 8, "Balanced evaluation using the extra profit of US\\$160, with a justified judgement and a condition."]], modelAnswer: "Processing raises revenue from US\\$1,100 to US\\$2,560 for each 1,000 kg of nuts, but after processing costs of US\\$1,300 the extra profit is only US\\$160. A small fall in the price or output would remove it. Peanut butter keeps longer and could build a brand and create jobs, but the loan, the risk of unsold stock and doubt about the shops' interest weigh against it. The cooperative should not borrow for a grinder yet. It should run a trial batch and seek a contract with a shop, and invest only if the profit per batch can be raised well above US\\$160.", hints: ["Work out the extra profit first, then test how easily it could disappear."], explanation: "Extra profit is US\\$160 a batch (2,560 − 1,100 − 1,300). A sound judgement notes the narrow margin and names a condition." }),
      ],
      hints: ["Revenue is kilograms multiplied by the price per kilogram."],
      explanation: "Peanut butter earns US\\$2,560; after costs the extra profit is only US\\$160, so the margin for error is small.",
    });
  }

  b.card("DEFINITION", "Transformational process", "The way operations turn inputs (resources) into outputs (goods and services) that are worth more.");
  b.card("CONCEPT", "Factors of production", "Land (natural resources), labour (human effort), capital (man-made resources) and enterprise (risk-taking and organisation).");
  b.card("DEFINITION", "Production function", "The relationship between the amount of inputs used and the amount of output produced.");
  b.card("FORMULA", "Added value", "Added value = selling price − cost of bought-in inputs. It pays wages, rent, interest, tax and profit.");
  b.card("CONCEPT", "Primary, secondary and tertiary production", "Primary: growing or extracting raw materials. Secondary: making and processing goods. Tertiary: services such as transport, banking and retail.");
  b.card("DEFINITION", "Beneficiation (value addition)", "Processing a raw material locally so that it is sold in a more finished and more valuable form.", undefined, { applies: ZBE });
  b.card("FACT", "Benefits of beneficiation", "Higher earnings, more jobs and skills at home, less reliance on raw-material prices.", undefined, { applies: ZBE });
  b.card("FACT", "Limits of beneficiation", "Needs investment, power, water, skills, transport and a market; the extra revenue must exceed the extra cost.", undefined, { applies: ZBE });
});
