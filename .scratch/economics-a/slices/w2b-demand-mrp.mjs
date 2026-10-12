// W2b: demand for labour and marginal revenue product theory (both boards; Cambridge A Level only, ZIMSEC Forms 5-6).
import { concept, P, ZIM, chk, table, mrpTable } from "../lib.mjs";
import { mc, LV8 } from "../tables/w2b-kit.mjs";

concept("aecon.labour.demand-mrp", { file: "labour/demand-mrp", keyPrefix: "labour.demand-mrp" }, (b) => {
  mc(b, [1, "RECALL"], "The demand for labour is a derived demand because it depends on",
    ["the demand for the goods labour makes", "Correct: firms want workers for what they help to make."],
    [["the supply of workers in the occupation", "Supply is a separate force."],
     ["the minimum wage set by the government", "A legal wage does not define derived demand."],
     ["the number of unemployed in the economy", "Unemployment does not define derived demand."]],
    "Labour is demanded for its contribution to output, so its demand depends on demand for the product.");

  mc(b, [1, "RECALL"], "Marginal revenue product is equal to",
    ["MPP multiplied by marginal revenue", "Correct: MRP = MPP × MR."],
    [["total product divided by the number of workers", "That is average product."],
     ["the wage multiplied by the number of workers", "That is the wage bill."],
     ["marginal cost divided by marginal revenue", "That is not a measure of labour productivity."]],
    "MRP = MPP × MR (MPP × price for a firm that sells at a given price).");

  mc(b, [2, "UNDERSTANDING"], "A profit-maximising firm that takes the wage as given will hire workers until",
    ["the marginal revenue product equals the wage", "Correct: the last worker just pays for themselves."],
    [["the marginal physical product reaches zero", "That would be beyond the profit-maximising point."],
     ["the average product of labour is at its highest", "Average product is not the hiring rule."],
     ["total revenue is equal to the total wage bill", "That would give zero profit from labour."]],
    "Hiring stops where MRP = wage (MCL).", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Marginal physical product eventually falls as more workers are hired because of",
    ["diminishing returns", "Correct: a fixed amount of land and equipment is shared among more workers."],
    [["economies of scale", "Economies of scale concern changes in all inputs."],
     ["the law of demand", "That relates price to quantity demanded."],
     ["increasing marginal utility", "That is a consumer idea."]],
    "With other inputs fixed, extra workers add less and less to output.");

  mc(b, [3, "ANALYSIS"], "Which change is most likely to shift a firm's demand for labour to the right?",
    ["A rise in the price of the firm's product", "Correct: MR and MRP rise at each level of employment."],
    [["A rise in the wage the firm must pay", "That moves the firm along its demand curve."],
     ["A fall in the productivity of its workers", "That lowers MRP and shifts demand left."],
     ["A fall in the demand for the firm's product", "That lowers MR and shifts demand left."]],
    "A higher product price raises MRP at every level of employment, shifting the demand curve for labour right.", { hints: ["Which option raises MRP at every employment level?"] });

  mc(b, [3, "ANALYSIS"], "A rise in the wage paid by a firm, other things equal, causes",
    ["a movement up along its demand curve for labour", "Correct: employment falls as the wage rises."],
    [["a shift of the demand curve for labour to the right", "A wage change does not shift the curve."],
     ["a rise in the marginal physical product of labour", "MPP depends on inputs and technology."],
     ["an increase in the price of the firm's product", "Product price is not caused by this wage rise."]],
    "The wage is on the vertical axis; a change in it moves the firm along the MRP curve.", { hints: ["What is on the axes of the demand curve?"] });

  mc(b, [4, "EVALUATION"], "A firm with market power faces falling marginal revenue as it sells more output. Compared with a price-taking firm with the same MPP, it will hire",
    ["fewer workers, because MR is below price", "Correct: MRP = MPP × MR is lower."],
    [["more workers, because it can set price", "Falling MR lowers MRP."],
     ["the same number, because MPP is the same", "MRP also depends on MR."],
     ["no workers, because MR is negative", "MR is positive when demand is elastic."]],
    "MR is below price for a firm with market power, so MRP is lower and employment is lower.", { hints: ["Which is lower for the firm with market power: MR or price?"] });

  mc(b, [4, "EVALUATION"], "A fall in the price of machines that can replace workers is most likely, in the short run, to",
    ["reduce labour demand as firms use machines", "Correct: the substitution effect shifts demand left."],
    [["increase the demand for labour by raising its MPP", "Substitute machines reduce, not raise, the use of workers."],
     ["leave the demand for labour unchanged", "Firms respond to relative input prices."],
     ["raise wages by increasing the supply of workers", "The change affects demand, not supply."]],
    "Cheaper substitute capital leads firms to use less labour, shifting the demand curve for labour left.", { hints: ["Are machines and workers substitutes or complements here?"] });

  {
    const m = mrpTable({ workers: [1, 2, 3, 4, 5, 6], tp: [20, 38, 54, 66, 74, 78], price: 3, wage: 30 });
    chk(m.hire, 4, 0);
    const mpp5 = (91 - 84) / 1;
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: mpp5, unit: "units",
      stem: "A fictional workshop produces 84 units a day with 6 workers and 91 units with 7 workers. Calculate the marginal physical product of the seventh worker.",
      wrong: [13, 91, 15],
      explanation: "MPP = change in total product = 91 − 84 = 7 units. Dividing 91 by 7 gives average product (13)." });
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: 12 * 3.5, hints: ["MRP = MPP × price."],
      stem: "The marginal physical product of a worker is 12 units and each unit sells for US\\$3.50. Calculate the worker's marginal revenue product, in US\\$.",
      wrong: [3.5, 8.5, 12],
      explanation: "MRP = MPP × price = 12 × 3.50 = US\\$42." });
    const tbl = table(["Workers", "Total product (units)"], [[1, 20], [2, 38], [3, 54], [4, 66], [5, 74], [6, 78]]);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: m.hire, unit: "workers", hints: ["Work out MPP, then MRP, for each worker and compare with the wage."],
      stem: `A fictional workshop sells its output at US\\$3 a unit and pays each worker US\\$30 a day. Its total product is shown below.\n\n${tbl}\n\nHow many workers will the workshop hire to maximise profit?`,
      wrong: [3, 5, 6],
      explanation: "MPP: 20, 18, 16, 12, 8, 4. MRP = MPP × 3: 60, 54, 48, 36, 24, 12. The fourth worker's MRP of US\\$36 exceeds the wage of US\\$30; the fifth worker's MRP of US\\$24 is below it. The workshop hires 4." });
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: 36 - 30, hints: ["Compare the 4th worker's MRP with the wage."],
      stem: "In the same workshop, by how much does hiring the fourth worker add to profit each day, in US\\$? (The fourth worker's MRP is US\\$36 and the wage is US\\$30.)",
      wrong: [36, 30, 66],
      explanation: "Extra profit = MRP − wage = 36 − 30 = US\\$6 a day." });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "A profit-maximising firm hires workers until their marginal revenue product is zero.", answer: false,
    explanation: "False. It stops where MRP equals the wage; hiring beyond that adds more to cost than to revenue." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The downward-sloping part of the MRP curve is a firm's demand curve for labour.", answer: true,
    explanation: "True. It shows the number of workers the firm will hire at each wage." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Marginal physical product", "Extra output from one more worker"], ["Marginal revenue product", "Extra revenue from one more worker"], ["Derived demand", "Demand for labour that depends on demand for the product"], ["Marginal cost of labour", "Extra cost to the firm of one more worker"]],
    explanation: "These terms underpin MRP theory." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the hiring rule.",
    template: "A firm hires workers until marginal revenue product equals the {{blank:a}}; a rise in the price of the product shifts the demand for labour to the {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["wage"], choices: ["wage", "price of the product", "profit"] }, { id: "b", accepted: ["right"], choices: ["left", "right"] }],
    explanation: "MRP = wage (MCL); a higher product price raises MRP and shifts the curve right." });

  b.short({ d: 2, skill: "RECALL", daily: true, stem: "What term describes demand for labour that depends on the demand for the product it helps to make?",
    accepted: ["derived demand", "a derived demand"], wrong: ["joint demand"],
    explanation: "Labour is demanded for its contribution to output: a derived demand." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define marginal revenue product.",
    points: ["The extra revenue a firm earns from employing one more worker.", "Equal to marginal physical product multiplied by marginal revenue (or price)."],
    modelAnswer: "Marginal revenue product is the extra revenue obtained by employing one more worker. It equals the worker's marginal physical product multiplied by marginal revenue (price for a price taker).",
    explanation: "One mark for the idea and one for the formula." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Compare the extra revenue with the extra cost."],
    stem: "Explain why a firm stops hiring workers when marginal revenue product equals the wage.",
    points: ["A worker whose MRP is above the wage adds more to revenue than to cost, so profit rises.", "Beyond the point where MRP = wage, an extra worker adds more to cost than to revenue.", "Profit is therefore at its maximum where MRP = wage."],
    modelAnswer: "A worker whose MRP is above the wage adds more to revenue than to cost, so hiring raises profit. Once MRP falls below the wage, an extra worker adds more to cost than to revenue, so profit would fall. Profit is greatest where MRP equals the wage.",
    explanation: "Compare marginal revenue with marginal cost." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Which part of MRP does training change?"],
    stem: "Analyse how an increase in the productivity of workers affects the demand for labour.",
    points: ["Higher productivity raises MPP at each level of employment.", "MRP = MPP × MR rises at each level.", "The demand curve for labour shifts to the right.", "At a given wage the firm hires more workers."],
    modelAnswer: "Higher productivity raises the marginal physical product of workers at each level of employment. Since MRP = MPP × MR, the MRP rises, so the demand curve for labour shifts to the right. At the same wage the firm finds it profitable to hire more workers.",
    explanation: "Link productivity to MPP, MRP, the shift and employment." });

  {
    const tp = [200, 380, 540, 660, 740, 780];
    const m = mrpTable({ workers: [1, 2, 3, 4, 5, 6], tp, price: 0.3, wage: 30 });
    chk(m.hire, 4, 0);
    const tbl = table(["Workers", "Loaves a day"], tp.map((v, i) => [i + 1, v]));
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["MPP is the change in total product.", "MRP = MPP × price."],
      stem: `**A bakery in Gweru (illustrative data)**\n\nA fictional bakery sells loaves at US\\$0.30 each and pays each worker US\\$30 a day. The table shows how its output changes as it hires more workers.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: 120, unit: "units", stem: "Calculate the marginal physical product of the fourth worker, in loaves.", wrong: [165, 660, 540], explanation: "660 − 540 = 120 loaves." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: 36, stem: "Calculate the marginal revenue product of the fourth worker, in US\\$.", wrong: [120, 198, 0.3], explanation: "MRP = 120 × 0.30 = US\\$36." }),
        P.mcq({ label: "(c)", marks: 1, stem: "How many workers will the bakery hire?", options: [["3", "The fourth worker's MRP exceeds the wage."], ["4", "Correct: the fourth worker's MRP is US\\$36, the fifth's is US\\$24."], ["5", "The fifth worker's MRP is below the wage."], ["6", "The sixth worker adds only US\\$12."]], answer: "B", explanation: "MRP: 60, 54, 48, 36, 24, 12. The wage is US\\$30, so 4 workers are hired." }),
        P.manual({ label: "(d)", marks: 3, stem: "The wage rises to US\\$40 a day. Explain what happens to the number of workers hired.",
          points: ["The fourth worker's MRP of US\\$36 is now below the wage.", "The third worker's MRP of US\\$48 is still above the wage.", "The bakery hires 3 workers: a movement along the demand curve for labour."],
          modelAnswer: "At US\\$40 the fourth worker's MRP of US\\$36 is below the wage, so hiring that worker would cut profit, while the third worker's MRP of US\\$48 is above it. The bakery therefore hires 3 workers, a movement up along its demand curve for labour." }),
      ],
      explanation: "MPP 120; MRP US\\$36; hire 4 at US\\$30; hire 3 at US\\$40." });
  }
  {
    const mpp = [30, 26, 22, 18, 14, 10];
    const m1 = mrpTable({ workers: [1, 2, 3, 4, 5, 6], tp: [30, 56, 78, 96, 110, 120], price: 2, wage: 40 });
    const m2 = mrpTable({ workers: [1, 2, 3, 4, 5, 6], tp: [30, 56, 78, 96, 110, 120], price: 2.5, wage: 40 });
    chk(m1.rows[2].mrp, 44, 1e-9); chk(m1.hire, 3, 0); chk(m2.hire, 4, 0);
    const tbl = table(["Diggers", "Total product (tonnes a day)"], [[1, 30], [2, 56], [3, 78], [4, 96], [5, 110], [6, 120]]);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Work out MRP for each digger.", "A change in the price of the output shifts the demand for labour."],
      stem: `**A small mine (illustrative data)**\n\nA fictional small mine sells its ore at US\\$2 a tonne and pays each digger US\\$40 a day. The table shows its output.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: m1.rows[2].mrp, stem: "Calculate the marginal revenue product of the third digger, in US\\$.", wrong: [22, 78, 52], explanation: "MPP of the third digger = 78 − 56 = 22 tonnes. MRP = 22 × 2 = US\\$44." }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: m1.hire, unit: "workers", stem: "How many diggers does the mine hire at US\\$2 a tonne?", wrong: [2, 4, 6], explanation: "MRP: 60, 52, 44, 36, 28, 20. The third digger's MRP (US\\$44) exceeds US\\$40; the fourth's (US\\$36) does not. 3 diggers." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: m2.hire, unit: "workers", stem: "The price of ore rises to US\\$2.50 a tonne. How many diggers does the mine now hire?", wrong: [3, 5, 6], explanation: "New MRP: 75, 65, 55, 45, 35, 25. The fourth digger's MRP of US\\$45 exceeds US\\$40; the fifth's of US\\$35 does not. 4 diggers." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the rise in the price of ore increases the demand for diggers.",
          points: ["The extra ore sells for more, so marginal revenue rises.", "MRP = MPP × price rises at every level of employment.", "The demand curve for labour shifts to the right, so more diggers are worth hiring at US\\$40."],
          modelAnswer: "A higher price raises the revenue from each extra tonne, so the marginal revenue product of every digger rises. The demand curve for diggers shifts to the right, and at the unchanged wage of US\\$40 it becomes profitable to hire a fourth digger." }),
        P.manual({ label: "(e)", marks: 4, stem: "Evaluate **one** limitation of using marginal revenue product theory to predict the mine's employment.",
          points: ["Limitation identified (for example, output depends on teamwork so each digger's contribution is hard to measure).", "Explained: the mine cannot separate each digger's MPP exactly, so MRP is estimated roughly.", "Wage may be set by bargaining or law rather than at the market level.", "Judgement: the theory shows the direction of change but not the exact number."],
          modelAnswer: "In a mine the diggers work as a team, so the extra output from one digger is hard to measure, and the mine can only estimate MRP. The wage may also be set by bargaining or law, not taken as given. The theory therefore gives the direction of change in employment (more diggers when the price rises) but not an exact number." }),
      ],
      explanation: "MRP of the third digger US\\$44; hire 3 at US\\$2; hire 4 at US\\$2.50; limits of the theory." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider the assumptions of the theory.", "Reach a judgement."],
    stem: "Assess whether marginal revenue product theory is a good explanation of the demand for labour.",
    points: ["It links hiring to the extra revenue a worker brings, a sensible profit-maximising rule.", "It explains why the demand curve for labour slopes downward and what shifts it.", "It predicts that higher productivity and product prices raise demand.", "It assumes that each worker's contribution can be measured; this is hard in teamwork and services.", "It assumes identical workers and a wage-taking firm.", "In practice wages are also set by bargaining, law and discrimination.", "Firms may hire for other reasons, such as quality or customer service.", "A justified judgement: a useful guide to the demand side but not a full account of pay."],
    levels: LV8,
    modelAnswer: "MRP theory links the number of workers hired to the extra revenue each adds, which is a sensible rule for a profit-maximising firm. It explains why the demand curve for labour slopes downward and why higher productivity or a higher product price increases demand. However, it assumes that each worker's contribution can be measured, which is difficult in teamwork or service jobs, and that workers are identical and the firm takes the wage as given. In practice, wages are also influenced by bargaining, legislation and discrimination, and firms may hire for reasons other than the marginal calculation. Overall the theory is a useful guide to the demand side of the labour market, but it is not a complete explanation of pay and employment.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh the logic of the theory against its assumptions, then judge." });

  b.card("DEFINITION", "Define **derived demand**.", "Demand for a factor of production that depends on the demand for the product it helps to produce.");
  b.card("DEFINITION", "Define **marginal physical product (MPP)**.", "The extra output from employing one more worker, other inputs fixed: the change in total product.");
  b.card("DEFINITION", "Define **marginal revenue product (MRP)**.", "The extra revenue from employing one more worker: MPP × marginal revenue (price for a price taker).");
  b.card("FORMULA", "State the **hiring rule**.", "Hire workers until MRP = marginal cost of labour (the wage for a wage-taking firm); never hire a worker whose MRP is below the wage.");
  b.card("CONCEPT", "What is the firm's **demand curve for labour**?", "The downward-sloping part of its MRP curve.");
  b.card("CONCEPT", "Why does MPP eventually fall?", "The law of diminishing returns: other inputs are fixed, so each extra worker adds less.");
  b.card("CONCEPT", "Name **four** things that shift the demand for labour.", "Product price or demand, productivity, technology, and prices of other inputs (substitutes and complements).");
  b.card("CONCEPT", "Why does a firm with market power hire fewer workers than a competitor with the same MPP?", "Its MR is below price, so MRP = MPP × MR is lower.");
  b.card("CONCEPT", "How does MRP theory apply to land and capital?", "A firm hires land or capital until MRP equals the cost of the factor (rent or the cost of capital).", "ZIMSEC detail", { applies: ZIM });
});
