// W3a: market segmentation (Commerce, BES, Cambridge 0264).
import { concept, P } from "../lib.mjs";

concept("bus.marketing.segmentation", { file: "marketing/segmentation", keyPrefix: "marketing.segmentation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is market segmentation?",
    options: [
      ["Dividing a market into groups of customers with similar needs", "Correct: groups are then targeted separately."],
      ["Selling the same product in the same way to everyone in the market", "That is mass marketing."],
      ["Dividing a business into departments", "That is organisational structure."],
      ["Splitting profit between partners", "That has nothing to do with marketing."],
    ],
    answer: "A",
    explanation: "**Segmentation** divides a market into groups (segments) of customers with similar characteristics.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a common basis for segmenting a market?",
    options: [
      ["Income", "Correct: customers are often grouped by income."],
      ["The colour of the business's logo", "This is about the business, not customers."],
      ["The number of the business's employees", "This does not group customers."],
      ["The business's bank account", "This does not group customers."],
    ],
    answer: "A",
    explanation: "Markets are segmented by age, income, location, gender, lifestyle and interests.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A fertiliser company advertises mainly on rural radio stations and through agro-dealers in farming areas. Which basis of segmentation is it mainly using?",
    options: [
      ["Location", "Correct: it targets customers by where they live and farm."],
      ["Gender", "Nothing suggests it targets men or women."],
      ["Age", "Nothing suggests age groups are targeted."],
      ["Interests", "Farming here is about location and occupation, not a hobby."],
    ],
    answer: "A",
    explanation: "Targeting rural farming areas is **geographic (location)** segmentation.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A detergent maker sells its powder in 50 g sachets as well as 2 kg boxes, so that low-income customers can afford it. Which basis of segmentation is this?",
    options: [
      ["Income", "Correct: small packs suit customers with less money."],
      ["Lifestyle", "The focus is on what customers can afford."],
      ["Gender", "Pack size is not about gender."],
      ["Location", "Nothing is said about where customers live."],
    ],
    answer: "A",
    explanation: "Different pack sizes for different budgets is segmentation by **income**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a benefit to a business of segmenting its market?",
    options: [
      ["Promotion can be aimed at the customers most likely to buy", "Correct: targeted promotion wastes less money."],
      ["It removes the need for market research", "Research is needed to identify segments."],
      ["It lowers the cost of making several product versions", "Extra versions raise costs."],
      ["It guarantees every customer will buy", "No method guarantees sales."],
    ],
    answer: "A",
    explanation: "Segmentation lets a business target promotion, products and prices to each group.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might segmentation reduce a business's economies of scale?",
    options: [
      ["It makes several smaller batches instead of one large run", "Correct: smaller runs cost more per unit."],
      ["It always reduces the total sales of the business", "Segmentation often increases sales."],
      ["It stops the business buying in bulk", "Bulk buying may be reduced but not stopped."],
      ["It requires the business to close factories", "No closure is needed."],
    ],
    answer: "A",
    hints: ["What happens to the output of each version?"],
    explanation: "Several versions mean smaller production runs, so costs per unit may rise.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A gym in Harare offers early-morning classes for office workers and afternoon classes for retired people. How does this help the gym?",
    options: [
      ["It meets the needs of different segments, attracting more members", "Correct: each group is served at times that suit it."],
      ["It cuts the gym's staff wages and electricity costs to almost nothing", "Classes still cost money to run."],
      ["It makes the gym a mass-market business", "It is targeting segments, not treating everyone the same."],
      ["It ensures every member pays the same", "Nothing is said about prices."],
    ],
    answer: "A",
    hints: ["Do office workers and retired people want classes at the same time?"],
    explanation: "Segmenting by age and lifestyle lets the gym serve each group better.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A market segment is a group of customers with similar characteristics.",
    answer: true,
    explanation: "True. Segments share characteristics such as age, income or lifestyle.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Segmentation has no costs for a business.",
    answer: false,
    explanation: "False. Research, extra product versions and separate promotion all cost money.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each marketing decision with the basis of segmentation it uses.",
    pairs: [
      ["Cartoon characters on cereal packets", "Age"],
      ["A premium range priced for wealthy customers", "Income"],
      ["Heavier blankets marketed in the cold Eastern Highlands", "Location"],
      ["Ready meals for busy office workers", "Lifestyle"],
      ["Fishing rods advertised to anglers at Kariba", "Interests"],
    ],
    explanation: "Each decision targets a group defined by a different characteristic.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The segment of customers a business chooses to sell to is called its {{blank:a}} market.",
    blanks: [{ id: "a", accepted: ["target"], choices: ["target", "mass", "global"] }],
    explanation: "The **target market** is the chosen segment(s).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the term for an identifiable group of customers within a market who share similar characteristics.",
    accepted: ["market segment", "segment", "a market segment", "a segment"],
    wrong: ["niche"],
    explanation: "A **market segment** is a group of similar customers.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "Explain **two** ways a mobile network operator could segment its market.",
    points: [
      "Basis 1, e.g. age: young people / students.",
      "Applied: cheap night or social-media data bundles.",
      "Basis 2, e.g. income / occupation (business users) / location.",
      "Applied: business bundles with more calls / rural coverage offers.",
    ],
    hints: ["Think about who uses data and calls, and how."],
    modelAnswer: "By age: young people and students can be offered cheap night-time and social-media bundles. By income or occupation: traders and small businesses can be offered bundles with more calling minutes and priority service.",
    explanation: "Choose a basis, name the group and show how the offer differs.",
  });
  b.manualShort({
    d: 4, marks: 6, skill: "EVALUATION",
    stem: "Discuss whether a small clothing manufacturer should segment its market or sell one standard range to everyone.",
    points: [
      "Segmentation: products match needs (age, gender, income), so more sales and loyalty.",
      "Segmentation: targeted promotion is cheaper per customer reached.",
      "Costs: research, more designs and sizes, more stock.",
      "Small firm: fewer economies of scale; may not afford many versions.",
      "One standard range: low cost but competes with cheap imports / large firms.",
      "Justified conclusion, e.g. target one or two segments.",
    ],
    hints: ["Can a small firm afford many product versions?"],
    modelAnswer: "Segmenting lets the manufacturer design clothes for particular groups, such as school uniforms for children or work wear for factory workers, which meets needs more closely and builds loyalty, and promotion can be targeted cheaply. However, research and extra designs, sizes and stock cost money, and a small firm loses economies of scale with many short runs. Selling one standard range keeps costs low but puts it in direct competition with large firms and cheap imports. The best approach is to target one or two segments where it can stand out, rather than many.",
    explanation: "Segmentation helps a small firm stand out but must stay affordable.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Tendai runs a bakery in Gweru that sells one type of white loaf to everyone. Research shows that office workers want healthy wholemeal rolls, schools want small buns for lunchboxes, and many low-income families want a cheaper, smaller loaf.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Tendai's present approach of selling one loaf to everyone is:",
        options: [["Mass marketing", "Correct: one product for the whole market."], ["Niche marketing", "He is not targeting a small group."], ["Segmentation", "He has not divided the market."], ["The selling concept", "Nothing suggests pressure selling."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Identify **three** bases of segmentation shown by the research.",
        points: ["Lifestyle / occupation (office workers wanting healthy food).", "Age (schoolchildren).", "Income (low-income families)."],
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Recommend whether Tendai should target all three segments. Justify your answer.",
        points: [
          "Benefits: more customers, higher sales, products match needs.",
          "Targeted promotion (offices, schools, high-density suburbs).",
          "Costs: new recipes, equipment, packaging; smaller batches; more stock.",
          "Capacity / skills of a single bakery.",
          "Prioritise segment(s) with greatest demand / easiest to supply.",
          "Justified recommendation.",
        ],
        modelAnswer: "Targeting the three segments would raise sales because each group's needs would be met, and Tendai could promote each product where its customers are: offices, schools and high-density suburbs. However, new recipes, packaging and smaller batches raise costs, and one bakery may not have the capacity or skills to make all three at once. He should start with the cheaper, smaller loaf, which uses his existing recipe and equipment, and school buns, which can be sold in bulk to schools, then add wholemeal rolls once the first two are profitable.",
      }),
    ],
    hints: ["(b) Who is each group?", "(c) Which segments are easiest to serve first?"],
    explanation: "Segmenting can increase sales, but a small business may need to target segments one at a time.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Rudo owns a small hotel in Kariba. Most guests are local families on holiday in December. Her hotel is nearly empty for the rest of the year. She is considering segmenting her market to attract anglers who come for fishing competitions, businesses holding conferences, and foreign tourists.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define **target market** and give **one** example from the case.",
        points: ["The segment(s) a business chooses to sell to.", "Example: anglers / businesses holding conferences / foreign tourists / local families."],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** ways Rudo could change her marketing to attract anglers.",
        points: [
          "Product: boat hire, early breakfasts, fish storage / freezers.",
          "Meets anglers' specific needs, so they choose her hotel.",
          "Promotion: advertise through angling clubs, competition organisers, fishing social-media groups.",
          "Targeted, cheap promotion reaching likely buyers.",
        ],
        modelAnswer: "Rudo could offer packages with boat hire, early breakfasts and freezer space for catches, meeting anglers' specific needs. She could advertise through angling clubs and competition organisers, which reaches likely guests at low cost.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate whether segmenting her market is likely to solve Rudo's problem of low bookings outside December.",
        points: [
          "Anglers and conferences can come at other times of the year: fills empty rooms.",
          "Different segments spread risk / reduce seasonality.",
          "Costs: conference room equipment, boats, marketing to each group.",
          "Competition from other hotels already serving these segments.",
          "Foreign tourists depend on factors outside her control.",
          "Justified judgement.",
        ],
        modelAnswer: "Segmenting could fill rooms outside December, because fishing competitions and business conferences happen at other times of the year, and having several segments reduces her dependence on one holiday season. However, each segment needs investment: conference rooms need equipment, anglers need boats and storage, and each group needs its own promotion. Other Kariba hotels may already serve these segments, and foreign tourist numbers depend on things she cannot control. Segmentation is likely to reduce the problem but not solve it completely; she should start with the segment that costs least to serve, probably anglers, and add conferences once bookings improve.",
      }),
    ],
    hints: ["(c) When do the new segments visit?", "(c) What will it cost to serve each one?"],
    explanation: "Segmentation can reduce seasonal dependence but each segment needs investment and targeted marketing.",
  });
  b.card("DEFINITION", "What is **market segmentation**?", "Dividing a market into groups of customers with similar characteristics and needs.");
  b.card("DEFINITION", "What is a **target market**?", "The segment or segments a business chooses to sell to.");
  b.card("FACT", "Six bases of segmentation?", "Age, income, location, gender, lifestyle, interests.");
  b.card("CONCEPT", "Why segment a market?", "Meet needs closely, target promotion, set suitable prices, find gaps, increase sales and market share.");
  b.card("CONCEPT", "Disadvantages of segmentation?", "Research costs, extra product versions and stock, fewer economies of scale, segments may be too small.");
  b.card("CONCEPT", "Segmentation and niche marketing?", "Targeting one small segment is niche marketing; ignoring segments is mass marketing.");
  b.card("FACT", "Example of segmentation by income?", "Small, cheap sachets for low-income buyers and large or premium packs for higher-income buyers.");
  b.card("CONCEPT", "Segment or product?", "A segment is a group of customers (e.g. low-income households); a product is what is sold to them.");
});
