// W3b: sustainable production and use of resources (BES, CAM).
import { concept, P, BES, CAM, money, r2, round, table } from "../lib.mjs";

// Water saving from drip irrigation.
const waterBill = 450, cutPct = 40;
const waterSave = (waterBill * cutPct) / 100; // 180
const yearSave = waterSave * 12; // 2160
// Returnable bottles.
const bottles = 8000, newBottle = 0.18, returnRate = 75;
const bottleSave = r2(bottles * (returnRate / 100) * newBottle); // 1080
// Structured: solar water heating at a hotel.
const gasBill = 620, solarCut = 70, solarCost = 13020;
const hotelSave = (gasBill * solarCut) / 100; // 434
const hotelMonths = solarCost / hotelSave; // 30
const hTbl = table(["Item", "Amount"], [["Current monthly cost of gas for heating water", money(gasBill)], ["Expected reduction with solar water heaters", `${solarCut}%`], ["Cost of solar water heaters (installed)", money(solarCost)]]);

concept("bus.operations.sustainability", { file: "operations/sustainability", keyPrefix: "operations.sustainability" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a renewable source of energy?",
    options: [
      ["Solar power", "Correct: sunlight is replaced naturally."],
      ["Coal-fired power", "Coal is non-renewable."],
      ["Diesel", "Diesel comes from oil, which is non-renewable."],
      ["Petrol", "Petrol is non-renewable."],
    ],
    answer: "A",
    explanation: "Renewable energy (solar, wind, hydro, biogas) is replaced naturally.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is sustainable production?",
    options: [
      ["Producing in ways that do not use up or damage resources, so production can continue", "Correct."],
      ["Producing as much as possible in the shortest time, using whatever resources are available", "This ignores the use of resources."],
      ["Producing only for the home market and never exporting", "Sustainability is not about markets."],
      ["Producing goods by hand without any machines at all", "Sustainability does not require hand production."],
    ],
    answer: "A",
    explanation: "Sustainable production uses resources efficiently and protects the environment for the long term.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A drinks company collects its empty glass bottles, washes them and fills them again. Which method of sustainable production is this?",
    options: [
      ["Reusing", "Correct: the bottle is used again in its existing form."],
      ["Recycling", "Recycling would melt the glass to make new items."],
      ["Using renewable energy", "No energy source is mentioned."],
      ["Using biodegradable packaging", "Glass is not biodegradable."],
    ],
    answer: "A",
    explanation: "**Reusing** uses an item again; **recycling** processes it into new material.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an advantage to a business of becoming more sustainable?",
    options: [
      ["Lower energy and waste costs in the long run", "Correct."],
      ["No initial investment is ever needed", "Many changes need investment."],
      ["Prices of its products must always fall", "Prices may even rise."],
      ["It no longer has to follow any laws", "Laws still apply."],
    ],
    answer: "A",
    explanation: "Using less energy, water and materials cuts costs over time and improves reputation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which practice helps a farmer use land sustainably?",
    options: [
      ["Crop rotation and contour ridges", "Correct: they protect soil fertility and prevent erosion."],
      ["Keeping as many cattle as possible on one field", "Overgrazing damages land."],
      ["Clearing all trees from slopes", "This causes soil erosion."],
      ["Planting the same crop every year without rest", "This exhausts the soil."],
    ],
    answer: "A",
    explanation: "Crop rotation, contour ridges and controlled stocking keep land productive.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might a small business delay switching to recyclable packaging?",
    options: [
      ["It may cost more per unit, raising costs or prices", "Correct: a short-term cost disadvantage."],
      ["Customers never care about packaging", "Many customers do care."],
      ["Recyclable packaging is illegal for food and drink products", "It is widely used for food."],
      ["Recycling increases the amount of waste", "Recycling reduces waste."],
    ],
    answer: "A",
    hints: ["Think about cost per unit."],
    explanation: "Sustainable options can have higher initial or unit costs, which small firms may struggle to afford.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION", applies: BES,
    stem: "How can a community wildlife tourism project encourage local people to protect animals?",
    options: [
      ["By sharing income from tourism with the community", "Correct: people benefit from living animals."],
      ["By allowing unlimited hunting by visitors", "That would not be sustainable."],
      ["By clearing the bush for crops", "That destroys habitats."],
      ["By keeping all income with outside investors", "Local people would have no reason to protect wildlife."],
    ],
    answer: "A",
    hints: ["Who benefits if animals are protected?"],
    explanation: "When communities share the income, wildlife becomes a valuable resource worth protecting.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Coal is a non-renewable resource.",
    answer: true,
    explanation: "True. Once used, coal cannot be replaced.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Becoming more sustainable always increases a business's costs.",
    answer: false,
    explanation: "False. Many actions, such as cutting waste or energy use, reduce costs, although some need investment first.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each business action with the sustainable method it shows.",
    pairs: [
      ["Fitting solar panels on a factory roof", "Renewable energy"],
      ["Using drip irrigation on a farm", "Using fewer resources (water)"],
      ["Selling washing powder in refill packs", "Environmentally friendly packaging"],
      ["Turning waste paper into egg trays", "Recycling"],
      ["Planting a woodlot to replace trees cut for firewood", "Sustainable use of forests"],
    ],
    explanation: "Each action reduces the use of scarce resources or damage to the environment.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Resources such as solar energy and replanted forests are {{blank:a}}; resources such as coal and oil are {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["renewable"], choices: ["renewable", "non-renewable"] },
      { id: "b", accepted: ["non-renewable"], choices: ["renewable", "non-renewable"] },
    ],
    explanation: "Renewable resources can be replaced naturally; non-renewable ones cannot.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State the term for processing used materials such as paper or plastic so they can be made into new products.",
    accepted: ["recycling", "recycle", "recycled"],
    wrong: ["reusing"],
    explanation: "**Recycling** turns waste into new materials.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `A farm's water bill is ${money(waterBill)} a month. Drip irrigation would cut it by ${cutPct}%. Calculate the saving over a year.`,
    kind: "money", value: yearSave, wrong: [waterSave, waterBill * 12],
    explanation: `Monthly saving = ${cutPct}% × ${money(waterBill)} = ${money(waterSave)}. × 12 = ${money(yearSave)}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A brewery sells ${bottles.toLocaleString("en-GB")} bottles of drink a month. A new bottle costs ${money(newBottle)}. If ${returnRate}% of bottles are returned and reused instead of being replaced, calculate the monthly saving on new bottles.`,
    kind: "money", value: bottleSave, wrong: [r2(bottles * newBottle), r2(bottles * 0.25 * newBottle)],
    hints: ["Find how many bottles are returned, then multiply by the cost of a new bottle."],
    explanation: `Bottles returned = ${returnRate}% × ${bottles.toLocaleString("en-GB")} = ${bottles * returnRate / 100}. Saving = ${bottles * returnRate / 100} × ${money(newBottle)} = ${money(bottleSave)}.`,
    workedSolution: `1. Bottles returned = 0.${returnRate} × ${bottles} = ${bottles * returnRate / 100}.\n2. Saving = ${bottles * returnRate / 100} × ${newBottle} = ${money(bottleSave)}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **one** advantage and **one** disadvantage for a manufacturer of switching to biodegradable packaging.",
    points: [
      "Advantage: better reputation / attracts environmentally aware customers or retailers.",
      "Explained: higher sales / meets buyers' requirements / avoids future bans or fines.",
      "Disadvantage: higher cost per unit / may not protect as well.",
      "Explained: lower profit or higher price; customers may switch to cheaper rivals.",
    ],
    hints: ["Consider customers and costs."],
    modelAnswer: "Biodegradable packaging improves the firm's image with customers and retailers who care about plastic waste, which can raise sales. However, it usually costs more per unit, so the firm must accept lower profit or raise prices, and some customers may switch to cheaper rivals.",
    explanation: "Sustainable choices bring reputational benefits but may raise costs.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: `Thandeka manages a 40-room hotel in Victoria Falls. Most guests are foreign tourists. She is considering installing solar water heaters.\n\n${hTbl}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the monthly saving from the solar water heaters.",
        kind: "money", value: hotelSave, wrong: [gasBill - solarCut, r2(gasBill * 0.3)],
        explanation: `${solarCut}% × ${money(gasBill)} = ${money(hotelSave)}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate how many months it would take for the savings to cover the cost of the heaters.",
        kind: "plain", value: hotelMonths, wrong: [round(solarCost / gasBill, 1), round(hotelMonths / 12, 1)],
        explanation: `${money(solarCost)} ÷ ${money(hotelSave)} = ${hotelMonths} months.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Identify **two** other ways the hotel could produce its services more sustainably.",
        points: ["One way, e.g. rainwater harvesting / reusing towels / energy-saving lights.", "Another way, e.g. recycling waste / buying local food / treating grey water."],
      }),
      P.manual({
        label: "(d)", marks: 6, stem: "Evaluate whether Thandeka should install the solar water heaters.",
        points: [`Uses data: saving ${money(hotelSave)} a month; cost recovered in ${hotelMonths} months.`, "Hot water available during power cuts / less dependence on gas supply.", "Reputation with foreign tourists who value sustainability; marketing advantage.", "High initial cost; finance needed; maintenance; cloudy days need back-up.", "Compares with other uses of the money.", "Justified conclusion."],
        modelAnswer: `The heaters would save ${money(hotelSave)} a month and pay for themselves in ${hotelMonths} months, after which the saving adds to profit for many years. They also reduce dependence on gas, and many foreign tourists prefer hotels that use renewable energy, which Thandeka can use in her marketing. The ${money(solarCost)} cost is large and she may need a loan, and gas back-up is still needed on cloudy days. Because the cost is recovered in two and a half years and the reputational benefit is strong in tourism, Thandeka should install the heaters.`,
      }),
    ],
    hints: ["(a) Percentage of the gas bill.", "(b) Cost ÷ monthly saving.", "(d) Consider cost, savings and guests."],
    explanation: `(a) ${money(hotelSave)}. (b) ${hotelMonths} months. (c) Water, waste, lighting, local supplies. (d) Install, justified by savings and reputation.`,
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780, applies: BES,
    stem: "Farai's family farm near Masvingo grows maize and keeps cattle. Each year the topsoil on the sloping fields is washed away by heavy rain, and the family cuts trees from nearby hills for firewood. Yields are falling.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** ways in which the farm is not using resources sustainably.", points: ["Soil erosion on slopes / poor land management.", "Cutting trees without replanting / deforestation."] }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** methods the family could use to manage the land and forests sustainably.",
        points: ["Contour ridges / conservation farming / crop rotation.", "Reduce erosion, keep soil fertile, raise yields.", "Plant a woodlot / use efficient stoves.", "Steady supply of firewood without destroying hills."],
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Discuss whether sustainable methods would benefit the farm as a business.",
        points: ["Higher yields over time from fertile soil.", "Lower costs: firewood from own woodlot, less fertiliser.", "Protects the farm's main resource for future years.", "Costs: labour to build ridges, seedlings, years before trees mature.", "Short-term loss of output or time; cash constraints.", "Justified conclusion."],
        modelAnswer: "Contour ridges and crop rotation would stop topsoil washing away, so yields would recover and the farm would spend less on fertiliser. A woodlot would provide firewood without destroying the hills. These methods cost labour and money, and trees take years to grow, so benefits are not immediate. However, without them the farm's main resource, its soil, will keep declining. Sustainable methods would benefit the farm as a business in the long term, and the family should start with ridges, which are cheap and help this season.",
      }),
    ],
    hints: ["(a) Look at the soil and the trees.", "(c) Compare short-term costs with long-term yields."],
    explanation: "Sustainable land and forest use protects the resources the business depends on.",
  });
  b.card("DEFINITION", "Sustainable production?", "Producing in ways that use resources efficiently and protect the environment so production can continue long term.");
  b.card("DEFINITION", "Renewable vs non-renewable resources?", "Renewable: replaced naturally (solar, wind, replanted forests). Non-renewable: cannot be replaced (coal, oil, minerals).");
  b.card("FACT", "Methods of sustainable production?", "Renewable energy, using fewer resources, reducing waste, reusing, recycling, environmentally friendly products and packaging.");
  b.card("CONCEPT", "Reusing vs recycling?", "Reusing: using an item again in its existing form (returnable bottles). Recycling: processing it into new material.");
  b.card("CONCEPT", "Advantages of sustainability for a business?", "Lower long-run costs, better reputation, access to customers who demand standards, avoiding fines, secure supplies.");
  b.card("CONCEPT", "Disadvantages of sustainability for a business?", "High initial costs, sometimes higher unit costs, slow savings, competition from cheaper unsustainable rivals.");
  b.card("CONCEPT", "Sustainable use of land and water?", "Crop rotation, contour ridges, controlled grazing, drip irrigation, rainwater harvesting, no pollution of rivers.", "Business Enterprise and Skills.", { applies: BES });
  b.card("CONCEPT", "Sustainable use of forests and wildlife?", "Replant and cut only regrowth, woodlots, efficient stoves; protect habitats, prevent poaching, community tourism income.");
});
