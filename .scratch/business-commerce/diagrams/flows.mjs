// business-commerce-o flow and structure figures. Run from the repo root: node .scratch/business-commerce/diagrams/flows.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { FAM, L, card } from "./_h.mjs";
const { C } = D;
const put = async (name, svg, alt, cap, lesson, after) => {
  await D.figure(FAM, name, svg, { alt, caption: cap });
  D.insertAfter(L(lesson), after, D.md(name, alt, cap));
};

// 1. chain of production (production/sectors.md, "Chain of production for a loaf of bread")
{
  const steps = [
    ["A farmer grows wheat", "Primary", C.fillGreen],
    ["A miller turns the wheat into flour", "Secondary", C.fillAmber],
    ["A bakery turns the flour into bread", "Secondary", C.fillAmber],
    ["Transport carries the bread", "Tertiary", C.fillBlue],
    ["A retailer sells the bread to the consumer", "Tertiary", C.fillBlue],
  ];
  let b = D.text(20, 24, "Chain of production for a loaf of bread", { size: 15, weight: 700 });
  steps.forEach(([t, sec, fill], i) => {
    const y = 40 + i * 70;
    b += D.node(20, y, 360, 46, `${i + 1}. ${t}`, { fill, size: 14 });
    b += D.text(400, y + 28, sec, { size: 15, weight: 700 });
    if (i < steps.length - 1) b += D.arrow(200, y + 46, 200, y + 70, { width: 2 });
  });
  b += D.text(20, 40 + 5 * 70 + 6, "A bank handles the payments and an insurer covers the delivery vans.", { size: 13, fill: C.muted });
  const alt = "Chain of production for a loaf of bread: a farmer grows wheat (primary), a miller makes flour and a bakery makes bread (secondary), then transport and a retailer deliver and sell it (tertiary); value is added at every stage and a bank and insurer support the chain.";
  await put("sector-chain-of-production", D.svg(520, 430, b), alt, "Figure: the chain of production for a loaf of bread, from primary to tertiary", "production/sectors.md", "## The chain of production");
}

// 2. channels of distribution (marketing/place.md)
{
  const rows = [
    ["1. Direct", ["Producer", "Consumer"]],
    ["2. Through a retailer", ["Producer", "Retailer", "Consumer"]],
    ["3. Through a wholesaler and retailer", ["Producer", "Wholesaler", "Retailer", "Consumer"]],
    ["4. Through an agent", ["Producer", "Agent", "Wholesaler /\nretailer", "Consumer"]],
  ];
  let b = "";
  rows.forEach(([lab, chain], r) => {
    const y = 18 + r * 84;
    b += D.text(20, y, lab, { size: 14, weight: 700 });
    chain.forEach((c, i) => {
      const x = 20 + i * 132;
      const fill = i === 0 ? C.fillGreen : i === chain.length - 1 ? C.fillAmber : C.fillBlue;
      b += D.node(x, y + 12, 104, 42, c, { fill, size: 13 });
      if (i < chain.length - 1) b += D.arrow(x + 104, y + 33, x + 132, y + 33, { width: 2 });
    });
  });
  const alt = "Four channels of distribution: producer to consumer directly; producer, retailer, consumer; producer, wholesaler, retailer, consumer; and producer, agent, wholesaler or retailer, consumer. More intermediaries means more mark-ups but wider reach.";
  await put("channels-of-distribution", D.svg(560, 360, b), alt, "Figure: the four main channels of distribution", "marketing/place.md", "## The main channels");
}

// 3. sequence of home-trade documents (trade/home-trade-documents.md)
{
  const steps = [
    ["B", "1 Letter of enquiry"], ["S", "2 Quotation, price list\nor catalogue"], ["B", "3 Order"], ["S", "4 Pro forma invoice\n(if needed)"],
    ["S", "5 Advice note"], ["S", "6 Delivery note\n(with the goods)"], ["S", "7 Invoice"], ["S", "8 Debit note"], ["S", "9 Credit note"],
    ["S", "10 Statement of account"], ["B", "11 Payment"], ["S", "11 Receipt"],
  ];
  const gap = 58, top = 52;
  let b = D.text(145, 24, "BUYER", { anchor: "middle", size: 15, weight: 700 }) + D.text(435, 24, "SELLER", { anchor: "middle", size: 15, weight: 700 });
  const pos = steps.map(([lane, t], i) => {
    const two = t.includes("\n");
    const h = two ? 42 : 32;
    const y = top + i * gap + (two ? 0 : 5);
    const x = lane === "B" ? 20 : 310;
    return { x, y, h, lane, t };
  });
  pos.forEach((p, i) => {
    b += D.node(p.x, p.y, 250, p.h, p.t, { fill: p.lane === "B" ? C.fillAmber : C.fillBlue, size: 13 });
    if (i > 0) {
      const q = pos[i - 1];
      if (q.lane === p.lane) b += D.arrow(q.x + 125, q.y + q.h, p.x + 125, p.y, { width: 1.6 });
      else if (q.lane === "S" && p.lane === "B") b += D.arrow(q.x, q.y + q.h / 2, p.x + 250, p.y + p.h / 2, { width: 1.6 });
      else b += D.arrow(q.x + 250, q.y + q.h / 2, p.x, p.y + p.h / 2, { width: 1.6 });
    }
  });
  const alt = "Sequence of home-trade documents between buyer and seller: the buyer sends the enquiry and order; the seller replies with quotation, pro forma invoice if needed, advice note, delivery note, invoice, debit or credit notes and a statement; the buyer pays and the seller issues a receipt.";
  await put("home-trade-document-sequence", D.svg(580, top + 12 * gap + 10, b), alt, "Figure: who sends each document in home trade, in order", "trade/home-trade-documents.md", "## The sequence of documents");
}

// 4. import documents order (trade/foreign-trade-documents.md)
{
  const steps = [
    ["Importer", "1  Sends an indent (order) for the goods", ""],
    ["Exporter", "2  Replies with a pro forma invoice", "Importer arranges currency or import licence and, if\nrequired, a letter of credit with its bank"],
    ["Exporter", "3  Ships the goods; shipping company issues\n    the bill of lading", "Exporter insures the goods and obtains a certificate\nof origin (and consular invoice where required)"],
    ["Banks", "4  Shipping documents pass through the banks,\n    often with a bill of exchange", "Importer's bank pays (or importer accepts the bill)\nand releases the documents"],
    ["Importer", "5  Presents documents and customs declaration\n    (usually through a clearing agent)", "Pays any duty and collects the goods"],
  ];
  let y = 14, b = "";
  steps.forEach(([who, t, d], i) => {
    const tl = t.split("\n").length - 1;
    const h = d ? 22 + tl * 17 + 21 + (d.split("\n").length - 1) * 16 + 16 : 22 + tl * 17 + 16;
    b += D.rect(20, y, 540, h, { fill: who === "Importer" ? C.fillAmber : who === "Exporter" ? C.fillBlue : C.fillGreen, r: 8, width: 1.6 });
    b += D.text(32, y + 22, t, { size: 14, weight: 700 });
    if (d) b += D.text(32, y + 22 + (t.split("\n").length - 1) * 17 + 21, d, { size: 13, fill: C.muted });
    b += D.text(548, y + 22, who, { anchor: "end", size: 13, weight: 700 });
    if (i < steps.length - 1) b += D.arrow(290, y + h, 290, y + h + 20, { width: 2 });
    y += h + 20;
  });
  const alt = "Order of documents in a typical import by sea: indent, pro forma invoice with letter of credit arranged, bill of lading with insurance and certificate of origin, shipping documents through the banks with a bill of exchange, then customs declaration and collection of the goods.";
  await put("import-documents-order", D.svg(580, y - 6, b), alt, "Figure: the order in which documents are used in a typical import by sea", "trade/foreign-trade-documents.md", "### The order in which the documents are used");
}

// 5. franchise relationship (organisation/franchises-joint-ventures.md)
{
  let b = D.rect(20, 40, 150, 120, { fill: C.fillBlue, r: 8 }) + D.text(95, 70, "Franchisor", { anchor: "middle", weight: 700 }) + D.text(95, 92, "owns the brand and\nthe business format", { anchor: "middle", size: 13, fill: C.muted });
  b += D.rect(410, 40, 150, 120, { fill: C.fillAmber, r: 8 }) + D.text(485, 70, "Franchisee", { anchor: "middle", weight: 700 }) + D.text(485, 92, "provides the capital,\nstaff and runs the\noutlet day to day", { anchor: "middle", size: 13, fill: C.muted });
  b += D.arrow(176, 82, 404, 82, { stroke: C.blue, width: 2.4 });
  b += D.text(290, 36, "Brand, products or recipes,\ntraining, manual, national advertising", { anchor: "middle", size: 13 });
  b += D.arrow(404, 128, 176, 128, { stroke: C.amber, width: 2.4 });
  b += D.text(290, 152, "Initial fee + royalties (often a % of sales)", { anchor: "middle", size: 13 });
  b += D.text(290, 190, "The franchisee must follow the franchisor's rules on prices, menu, layout and quality.", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "A franchise: the franchisor supplies the brand, recipes, training, manual and national advertising; the franchisee supplies capital, staff and day-to-day running and pays an initial fee and royalties, often a percentage of sales, while following the franchisor's rules.";
  await put("franchise-relationship", D.svg(580, 210, b), alt, "Figure: what the franchisor and franchisee give each other", "organisation/franchises-joint-ventures.md", "## How a franchise works");
}

// 6. stages of economic integration (trade/trading-blocs.md)
{
  const st = [
    ["Free trade area", "Free trade between members"],
    ["Customs union", "+ a common external tariff"],
    ["Common market", "+ free movement of labour and capital"],
    ["Economic (and monetary) union", "+ common economic policies or currency"],
  ];
  let b = D.text(20, 22, "Each stage includes everything in the stage before it", { size: 13, fill: C.muted });
  st.forEach(([t, d], i) => {
    const x = 20 + i * 30, y = 230 - i * 62, w = 350;
    b += card(x, y, w, 52, t, d, { fill: [C.fillGrey, C.fillBlue, C.fillAmber, C.fillGreen][i] });
    if (i > 0) b += D.arrow(x + 15, y + 62 + 0, x + 15, y + 52 + 0, { width: 1.6 });
  });
  const alt = "Stages of economic integration, each including the one below it: a free trade area has free trade between members; a customs union adds a common external tariff; a common market adds free movement of labour and capital; an economic union adds common economic policies or currency.";
  await put("economic-integration-stages", D.svg(480, 300, b), alt, "Figure: the four stages of economic integration", "trade/trading-blocs.md", "## Stages of economic integration");
}

// 7. business plan sections (enterprise/business-plan.md)
{
  const secs = [
    ["Executive summary", "idea, objectives, target market, finance needed"],
    ["Business background", "name, location, ownership, owners' experience"],
    ["Products or services", "features and unique selling point"],
    ["Market research and analysis", "customers, market size, competitors"],
    ["Marketing plan", "price, promotion, place, product; sales forecast"],
    ["Operations plan", "premises, equipment, suppliers, hours"],
    ["Management and people", "managers, staff, skills, wages, chart"],
    ["Financial plan", "start-up costs, finance, profit and cash flow forecasts, break-even"],
  ];
  let b = "";
  secs.forEach(([t, d], i) => {
    const y = 12 + i * 56;
    b += card(20, y, 540, 46, `${i + 1}. ${t}`, d, { fill: i === 7 ? C.fillAmber : C.fillBlue, size: 14, dsize: 13 });
  });
  const alt = "The eight main sections of a business plan in order: executive summary, business background, products or services, market research, marketing plan, operations plan, management and people, and the financial plan with start-up costs, forecasts and break-even.";
  await put("business-plan-sections", D.svg(580, 12 + 8 * 56, b), alt, "Figure: the main sections of a business plan", "enterprise/business-plan.md", "## Main sections of a business plan");
}

// 8. services of a commercial bank (finance/commercial-banks.md)
{
  let b = D.node(190, 12, 200, 40, "Commercial bank", { fill: C.fillBlue, weight: 700, size: 15 });
  const boxes = [
    [20, 80, "Accepting deposits", "Current account\nSavings account\nFixed deposit"],
    [300, 80, "Lending", "Overdrafts\nLoans (often with collateral)\nMortgages and asset finance"],
    [20, 220, "Making payments", "Cheques; debit and credit cards\nand ATMs; EFT and RTGS;\nstanding orders; debit orders;\nPOS machines"],
    [300, 220, "Other services", "Safe custody; foreign exchange\nLetters of credit; financial advice\nNight safes; statements, references\nPayroll services"],
  ];
  boxes.forEach(([x, y, t, d], i) => {
    const h = i < 2 ? 120 : 130;
    b += D.rect(x, y, 260, h, { fill: C.fillGrey, r: 8, width: 1.6 }) + D.text(x + 10, y + 22, t, { weight: 700 }) + D.text(x + 10, y + 44, d, { size: 13, fill: C.ink });
    b += D.line(x < 200 ? 280 : 300, y + h / 2, 290, y + h / 2, { stroke: C.muted, width: 1.6 });
  });
  b += D.line(290, 52, 290, 350, { stroke: C.muted, width: 1.6 });
  const alt = "Services of a commercial bank in four groups: accepting deposits (current, savings, fixed deposit), lending (overdrafts, loans, mortgages and asset finance), making payments (cheques, cards, EFT and RTGS, standing and debit orders, POS) and other services such as foreign exchange and letters of credit.";
  await put("commercial-bank-services", D.svg(580, 370, b), alt, "Figure: the main services of a commercial bank", "finance/commercial-banks.md", "## Functions and services of commercial banks");
}

// 9. stakeholder map (enterprise/stakeholders.md)
{
  let b = D.text(20, 22, "INTERNAL STAKEHOLDERS", { size: 13, weight: 700, fill: C.muted });
  const inn = [["Owners", "profit, dividends"], ["Managers", "salaries, job security"], ["Employees", "fair wages, safe work"]];
  inn.forEach(([t, d], i) => (b += card(20 + i * 187, 30, 177, 50, t, d, { fill: C.fillAmber })));
  b += D.line(290, 82, 290, 116, { width: 2 });
  b += D.node(190, 116, 200, 46, "The business", { fill: C.fillBlue, weight: 700, size: 16 });
  b += D.line(290, 162, 290, 200, { width: 2 });
  b += D.text(20, 210, "EXTERNAL STAKEHOLDERS", { size: 13, weight: 700, fill: C.muted });
  const ext = [
    ["Customers", "quality, fair prices"], ["Suppliers", "orders, prompt payment"], ["Lenders", "repayment with interest"],
    ["Government", "taxes, legal behaviour"], ["Local community", "jobs, little pollution"], ["Competitors", "fair competition"],
  ];
  ext.forEach(([t, d], i) => (b += card(20 + (i % 3) * 187, 218 + Math.floor(i / 3) * 60, 177, 50, t, d, { fill: C.fillGreen })));
  const alt = "Stakeholder map: the business sits between internal stakeholders (owners, managers, employees) and external stakeholders (customers, suppliers, lenders, government, local community, competitors), each shown with its main objective, such as profit for owners and prompt payment for suppliers.";
  await put("stakeholder-map", D.svg(580, 350, b), alt, "Figure: internal and external stakeholders and what each wants", "enterprise/stakeholders.md", "## Stakeholder groups and their objectives");
}

// 10. marketing mix (marketing/marketing-strategy.md)
{
  let b = D.node(200, 130, 180, 56, "Target market", { fill: C.fillAmber, weight: 700, size: 16 });
  const ps = [
    [20, 20, "Product", "meets customers' needs"], [320, 20, "Price", "the only P that earns revenue"],
    [20, 240, "Place", "customers find it easily"], [320, 240, "Promotion", "customers know it exists"],
  ];
  ps.forEach(([x, y, t, d]) => {
    b += card(x, y, 240, 56, t, d, { fill: C.fillBlue, size: 15 });
    b += D.arrow(x < 200 ? x + 240 : x, y < 100 ? y + 56 : y, x < 200 ? 200 : 380, y < 100 ? 130 : 186, { width: 1.8 });
  });
  const alt = "The marketing mix: product, price, place and promotion must fit together and fit the target market; product must meet needs, price is the only P that earns revenue, place makes the product easy to find and promotion makes customers aware of it.";
  await put("marketing-mix-fit", D.svg(580, 316, b), alt, "Figure: the four Ps of the marketing mix all aimed at the target market", "marketing/marketing-strategy.md", "## The importance of each element");
}
