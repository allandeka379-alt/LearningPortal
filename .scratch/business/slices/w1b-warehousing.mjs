// W1b: warehousing — functions, importance, indigenous storage systems.
import { concept, P } from "../lib.mjs";

concept("bus.trade.warehousing", { file: "trade/warehousing", keyPrefix: "trade.warehousing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which gap between production and consumption does warehousing mainly bridge?",
    options: [
      ["The gap in time", "Correct: goods are stored from the time they are produced until the time they are wanted."],
      ["The gap in place", "Moving goods from where they are made to where they are wanted is the work of transport."],
      ["The gap in knowledge", "Telling consumers about goods is the work of advertising."],
      ["The gap in finance", "Providing money to pay for goods is the work of banks and other financial institutions."],
    ],
    answer: "A",
    explanation: "Each aid to trade bridges a gap: warehousing bridges the **time** gap, transport the place gap, advertising the knowledge gap, banking the finance gap and insurance the risk gap.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A warehouse receives maize meal in 1-tonne loads and sends it to tuck shops in bags of 10 kg. Which function is it performing?",
    options: [
      ["Breaking bulk", "Correct: large quantities are divided into smaller lots that retailers can buy."],
      ["Price stabilisation", "Price stabilisation means releasing stored goods when supply is low; the stem is about dividing loads."],
      ["Grading", "Grading means sorting goods by quality or size, not dividing them into smaller quantities."],
      ["Bonding", "Bonding refers to storing imports before customs duty is paid."],
    ],
    answer: "A",
    explanation: "**Breaking bulk** is dividing large consignments into smaller quantities suited to the next buyer in the chain of distribution.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are school uniforms usually stored for some months before they are sold?",
    options: [
      ["They are produced all year but demand is seasonal", "Correct: factories make uniforms steadily, but most are bought before schools open."],
      ["They are produced seasonally but demanded all year", "That describes crops such as maize, not uniforms."],
      ["Storage improves their quality", "Storage does not improve uniforms; this applies to goods such as some grains or fruit that ripen."],
      ["The law requires all clothing to be stored", "There is no such law; storage is a business decision."],
    ],
    answer: "A",
    explanation: "Goods are stored when production and demand do not happen at the same time: **steady production with seasonal demand** (uniforms, blankets, umbrellas) or **seasonal production with steady demand** (maize, cotton, groundnuts).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does warehousing help to keep the price of a crop steadier through the year?",
    options: [
      ["Stock bought at harvest is released when supply is low", "Correct: storing when supply is high and releasing it when supply is low evens out supply, and so prices."],
      ["The warehouse owner sets one price for the whole year", "Warehouse owners do not fix market prices; prices follow supply and demand."],
      ["Storage costs are added, making prices higher", "Storage costs exist, but the stabilising effect comes from evening out supply."],
      ["Goods in a warehouse are exempt from all taxes", "Storage does not remove taxes; only bonded goods delay customs duty."],
    ],
    answer: "A",
    explanation: "Without storage, the whole harvest would be sold at once (prices crash) and nothing would be left later (prices soar). Storing and releasing gradually evens out supply, so prices are steadier.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a *dura*?",
    options: [
      ["A traditional granary raised off the ground", "Correct: the dura (isiphala in Ndebele) is a raised granary that keeps grain dry and away from pests."],
      ["A modern cold storage room", "A cold room is a modern refrigerated store, not a traditional granary."],
      ["A document showing ownership of stored goods", "That is a warehouse warrant."],
      ["A customs-controlled store for imports", "That is a bonded warehouse."],
    ],
    answer: "A",
    explanation: "The **dura** (Shona) or **isiphala** (Ndebele) is an indigenous storage system: a granary of poles, mud and thatch raised on stones or a platform.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer builds her granary on large stones about half a metre above the ground. What is the main reason?",
    options: [
      ["To keep the grain dry and harder for rats to reach", "Correct: raising the store keeps out ground damp, floodwater, termites and rodents."],
      ["To make the grain easier to sell at the market", "Raising the store does not affect selling; it protects the grain."],
      ["To let customers inspect the grain more easily", "Inspection is not why granaries are raised."],
      ["To make the granary qualify for a government grant", "This is not the reason; indigenous granaries predate such schemes."],
    ],
    answer: "A",
    hints: ["Think about what damages stored grain on the ground."],
    explanation: "Protection is a core function of any store. A raised granary protects grain from damp, flooding, termites and rodents, just as a modern warehouse uses pallets, ventilation and pest control.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of these businesses would gain **least** from holding large stocks in a warehouse?",
    options: [
      ["A bakery selling fresh bread each day", "Correct: fresh bread is perishable and sold within a day, so long storage is of little use."],
      ["A wholesaler of school stationery", "Stationery is bought in bulk and sold mostly before school terms, so storage is essential."],
      ["A cotton ginnery buying the harvest", "Cotton is harvested once a year and processed over many months, so it must be stored."],
      ["A fertiliser distributor before the rains", "Fertiliser is bought in bulk and demanded seasonally, so it is stored before the season."],
    ],
    answer: "A",
    hints: ["Which product loses its value in a day or two?"],
    explanation: "Storage is most useful when there is a time gap between production and demand and the goods keep well. Fresh bread is made and sold almost immediately, so it needs little warehousing.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A warehouse warrant can be used by the owner of stored goods as security for a loan.",
    answer: true,
    explanation: "True. A warehouse warrant is a document of ownership of goods held in a (public) warehouse; it can be pledged to a bank as security or transferred to a buyer.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Warehousing makes prices higher because storage costs money.",
    answer: false,
    explanation: "False. Storage does add a cost, but its main effect on prices is to make them **steadier**, by evening out supply between harvest time and the rest of the year.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each activity in a warehouse with the function it performs.",
    pairs: [
      ["Sorting oranges into large, medium and small", "Grading"],
      ["Dividing a 30-tonne load into 50 kg bags", "Breaking bulk"],
      ["Fumigating stored maize against weevils", "Protection of goods"],
      ["Releasing stored rice during the months before harvest", "Ensuring a steady supply"],
    ],
    explanation: "Grading sorts by quality or size; breaking bulk divides large quantities; fumigation protects goods from pests; releasing stock over many months ensures a steady supply.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Warehousing creates {{blank:a}} utility because goods are available when consumers want them, while transport creates {{blank:b}} utility.",
    blanks: [
      { id: "a", accepted: ["time"], choices: ["time", "place", "form", "possession"] },
      { id: "b", accepted: ["place"], choices: ["time", "place", "form", "possession"] },
    ],
    explanation: "Warehousing adds **time** utility (goods available when wanted); transport adds **place** utility (goods available where wanted).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In Ndebele a traditional raised granary is called an *isiphala*. What is it called in Shona?",
    accepted: ["dura", "a dura", "matura"],
    wrong: ["zunde", "isiphala"],
    explanation: "The Shona **dura** (plural *matura*) and the Ndebele **isiphala** are traditional raised granaries for storing grain between harvests.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** reasons why goods need to be stored before they are sold.",
    points: [
      "Identifies seasonal production with steady demand (or steady production with seasonal demand).",
      "Explains with an example: maize harvested once a year but mealie-meal eaten all year (or uniforms bought mainly before schools open).",
      "Identifies a second reason: production in anticipation of demand, bulk imports, or waiting for better prices.",
      "Explains the second reason: goods must be ready when orders arrive / a large consignment is sold a little at a time / the trader holds stock until prices rise.",
    ],
    hints: ["Think about crops and seasons first.", "Then think about factories, imports or prices."],
    modelAnswer: "Crops such as maize are harvested once a year but people eat mealie-meal every week, so the harvest must be stored and released through the year. Also, manufacturers produce in anticipation of demand, so finished goods must be stored until customers order them.",
    explanation: "Each reason earns one mark for identifying it and one for explaining it with an example.",
  });
  b.manualShort({
    d: 3, marks: 3, skill: "EVALUATION",
    stem: "State **three** limitations of traditional granaries such as the dura compared with a modern warehouse.",
    points: [
      "Small capacity: stores only one household's or village's grain.",
      "Limited protection against fire (thatch), theft or heavy pest attack.",
      "No grading, packing, breaking bulk or price-stabilising role beyond the household / no warehouse warrant or security for loans.",
    ],
    hints: ["Think about size, safety and the other functions of a warehouse."],
    modelAnswer: "A dura holds only a small quantity of grain, its thatched roof can easily catch fire and it offers little protection against theft, and it does not grade, pack or break bulk for trade.",
    explanation: "Traditional granaries perform storage and protection well for a household, but on a small scale and without the commercial services of a warehouse.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 780,
    stem: "Tatenda buys sugar beans and groundnuts from small-scale farmers around Gokwe at harvest time. He stores them in a rented store with a concrete floor, wooden pallets and good ventilation. Over the next eight months he sorts, packs and sells them to tuck shops and vendors in Kwekwe and Gweru.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which function is Tatenda performing when he sorts the beans into first and second quality?",
        options: [["Grading", "Correct: sorting by quality is grading."], ["Breaking bulk", "Breaking bulk divides goods into smaller quantities, not by quality."], ["Branding", "Branding gives goods a name and identity; sorting by quality is a different task."], ["Bonding", "Bonding concerns imported goods held before duty is paid."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** ways in which Tatenda's store protects the goods.",
        points: [
          "Concrete floor / pallets keep goods off the ground.",
          "So they stay dry and are less likely to rot or be eaten by pests.",
          "Good ventilation stops heat and moisture building up.",
          "So beans and groundnuts do not go mouldy and keep their quality (and value).",
        ],
        modelAnswer: "The pallets and concrete floor keep the bags off the ground, so the beans stay dry and are harder for rats and termites to reach. Good ventilation stops heat and damp building up, so the groundnuts do not go mouldy.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Discuss how Tatenda's storage benefits **the farmers** and **his customers**.",
        points: [
          "Farmers: a ready buyer at harvest, so they get cash quickly.",
          "Farmers do not need their own storage and avoid losses to pests.",
          "Customers (tuck shops, vendors): beans and groundnuts available for eight months, not only at harvest.",
          "Customers buy small packed quantities they can afford (breaking bulk / packing).",
          "Steadier prices because supply is spread over the year.",
          "Balanced judgement, for example farmers might earn more by storing themselves, but most lack facilities, so both groups gain.",
        ],
        modelAnswer: "The farmers have a ready buyer at harvest, so they receive cash quickly and do not need their own stores, where pests could destroy their crop. Tuck shops and vendors can buy beans and groundnuts for eight months of the year in small packs they can afford, and prices are steadier because supply is spread out. Farmers might earn more by storing and selling later themselves, but most have no proper store, so on balance both groups gain from Tatenda's storage.",
      }),
    ],
    hints: ["(a) Sorting by quality.", "(b) Link each feature of the store to what it prevents.", "(c) Take each group in turn, then judge."],
    explanation: "(a) Grading. (b) Pallets and concrete floor keep goods dry and away from pests; ventilation prevents mould. (c) Farmers get a buyer and cash; customers get supply all year in small lots at steadier prices.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "A co-operative of small-scale farmers near Chinhoyi sells all its maize as soon as it is harvested, when prices are low. Members are discussing whether to build a shared storage shed so that they can sell some of the maize later in the year.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** functions of a warehouse, other than storage, that the shed could perform for the co-operative.",
        points: ["One function, e.g. protection from pests and weather / grading.", "A second function, e.g. breaking bulk / packing / steady supply / price stabilisation."],
        modelAnswer: "Protecting the maize from weevils and rain; grading it by quality.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain how the shed could increase the co-operative's income.",
        points: [
          "Maize is sold at harvest when supply is high and prices are low.",
          "Stored maize can be sold later when supply is lower and prices are higher.",
          "Graded and packed maize may fetch a better price.",
          "The stored maize (or a warrant) could be used as security to borrow money while waiting to sell.",
        ],
        modelAnswer: "At harvest, everyone sells at once, so prices are low. By storing maize and selling it months later when supply has fallen, the co-operative can get a higher price. Grading and packing could also earn a better price, and stored grain could be used as security for a loan while the members wait.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate whether the co-operative should build the storage shed.",
        points: [
          "Benefit: higher prices later in the year (with explanation).",
          "Benefit: less waste / protection; food security for members.",
          "Cost: building and running costs (security, fumigation, labour).",
          "Risk: prices may not rise enough / pests or theft / members need cash at harvest.",
          "Weighs benefits against costs and risks.",
          "Justified recommendation (e.g. build it if the expected price rise exceeds storage costs; start small; sell part at harvest).",
        ],
        modelAnswer: "The shed would let the co-operative sell later when prices are higher and protect the maize from waste, which would also give members food security. However, the shed costs money to build, and there are running costs for security and fumigation. Prices might not rise enough to cover these costs, and some members need cash immediately after harvest. I recommend building a modest shed and storing only part of the harvest, because the usual rise in price later in the season is likely to exceed the storage costs, while members who need cash can still sell at harvest.",
      }),
    ],
    hints: ["(b) Compare prices at harvest with prices months later.", "(c) Weigh the gain in price against the costs and risks, then decide."],
    explanation: "Storage lets producers sell when supply is low and prices are higher, protects the crop and can secure loans; the decision depends on whether the expected price gain exceeds the cost and risk of storage.",
  });
  b.card("DEFINITION", "What is a **warehouse**?", "A building or place where goods are received, stored and protected until they are needed for production, sale or use.");
  b.card("CONCEPT", "Which gap does warehousing bridge?", "The **time** gap between production and consumption (time utility).");
  b.card("DEFINITION", "What is **breaking bulk**?", "Dividing large quantities received from producers into smaller quantities that customers can buy.");
  b.card("CONCEPT", "How does warehousing **stabilise prices**?", "Goods are stored when supply is high and released when supply is low, evening out supply and so prices.");
  b.card("FACT", "Name four functions of a warehouse besides storage.", "Protection, breaking bulk, grading and packing, preparing goods for sale, steady supply, price stabilisation (any four).");
  b.card("CONCEPT", "Give an example of seasonal production with steady demand.", "Maize (or cotton, groundnuts, tobacco): harvested once a year but used all year.");
  b.card("CONCEPT", "Give an example of steady production with seasonal demand.", "School uniforms, blankets or umbrellas: made all year, bought mainly at certain times.");
  b.card("FACT", "What are the **dura** and the **isiphala**?", "Indigenous granaries (Shona and Ndebele) raised off the ground to keep grain dry and away from pests.");
  b.card("DEFINITION", "What is a **warehouse warrant**?", "A document showing ownership of goods in a public warehouse; it can be transferred to a buyer or used as security for a loan.");
});
