// W4a: Contemporary methods of manufacturing goods (her.production.manufacturing).
// Reviewer note: no company names; examples are fictional or generic. Inhibiting factors only mentioned.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.production.manufacturing", { file: "production/manufacturing", keyPrefix: "production.manufacturing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **manufacturing**?",
    options: [
      ["changing raw materials or parts into finished goods", "Correct: this is the meaning of manufacturing."],
      ["growing crops and rearing animals", "This is agriculture, a primary industry."],
      ["selling finished goods to customers in shops and markets", "This is retail, a tertiary industry."],
      ["digging minerals out of the ground", "This is mining, a primary industry."],
    ],
    answer: "A",
    explanation: "Manufacturing turns raw materials or parts into finished goods; it is secondary industry.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Putting ready-made parts together to make a bus is an example of which process?",
    options: [
      ["assembling", "Correct: parts are put together."],
      ["processing", "Processing changes the form of raw materials."],
      ["packaging", "Packaging wraps and labels finished goods."],
      ["mining", "Mining extracts minerals."],
    ],
    answer: "A",
    explanation: "Assembling combines ready-made parts into a finished product.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A bakery makes 200 loaves, then changes its machines to make 100 buns. Which production method is this?",
    options: [
      ["batch production", "Correct: a set number of one item, then another."],
      ["mass production", "Mass production makes one item continuously in huge numbers."],
      ["job production", "Job production makes one unique item to order."],
      ["handicraft production", "The bakery uses machines and makes many identical items."],
    ],
    answer: "A",
    explanation: "Batch production makes a set quantity of one product before switching to another.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a function of **packaging**?",
    options: [
      ["protecting goods and giving information such as the expiry date", "Correct: packaging protects and informs."],
      ["growing the raw materials", "This is farming."],
      ["changing maize into mealie-meal", "This is processing."],
      ["repairing and servicing the machines on the factory production line", "This is maintenance."],
    ],
    answer: "A",
    explanation: "Packaging protects goods, keeps food clean, carries information and helps sell the product.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Nokuthula orders a metal gate made to fit her yard exactly. Which production method will the welder use?",
    options: [
      ["job production", "Correct: one unique item to the customer's order."],
      ["mass production", "Mass production makes identical items in huge numbers."],
      ["batch production", "Batch production makes sets of identical items."],
      ["assembly-line production", "An assembly line produces many identical items."],
    ],
    answer: "A",
    hints: ["How many gates of this exact size will be made?"],
    explanation: "Job production makes a single item to a customer's specification.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does mass production usually make goods **cheaper**?",
    options: [
      ["The cost per item falls when huge numbers are made", "Correct: fixed costs are spread over many items."],
      ["Workers in factories are never paid", "Factory workers are paid wages."],
      ["Machines need no electricity or maintenance", "Machines do need power and maintenance."],
      ["Raw materials are given free to factories", "Factories buy their raw materials."],
    ],
    answer: "A",
    hints: ["Think about cost per item."],
    explanation: "Producing large quantities spreads the cost of machines and buildings over many items, lowering the cost of each one.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A soap factory replaces twenty workers with one new packing machine. Which is the **most likely** disadvantage?",
    options: [
      ["Some workers lose their jobs", "Correct: mechanisation can reduce the number of workers needed."],
      ["The soap becomes impossible to sell", "The product does not change."],
      ["Production becomes much slower", "Machines usually increase speed."],
      ["The factory no longer needs electricity", "A machine needs more power, not less."],
    ],
    answer: "A",
    hints: ["What happens to the twenty workers?"],
    explanation: "Mechanisation raises output but can reduce employment.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which argument **best** supports adding value by manufacturing in Zimbabwe instead of exporting raw cotton?",
    options: [
      ["It creates jobs and earns more from each bale", "Correct: processed goods are worth more than raw materials."],
      ["It means cotton no longer has to be grown", "Manufacturing still needs raw cotton."],
      ["It removes the need for packaging", "Finished goods still need packaging."],
      ["It guarantees that power cuts will end", "Manufacturing does not solve power cuts."],
    ],
    answer: "A",
    hints: ["Which is worth more: lint or a finished shirt?"],
    explanation: "Turning cotton into cloth and clothing adds value, creating jobs and higher earnings.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Processing, assembling and packaging are processes of manufacturing.",
    answer: true,
    explanation: "True. Most manufactured goods pass through these three processes.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In mass production, each item is made by one person from start to finish.",
    answer: false,
    explanation: "False. Mass production uses division of labour: each worker or machine does one task on an assembly line.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example with the production method.",
    pairs: [
      ["a carver making one stone sculpture by hand", "handicraft production"],
      ["a tailor sewing one wedding dress to order", "job production"],
      ["a bakery making 200 loaves then 100 buns", "batch production"],
      ["a factory bottling drinks non-stop on a line", "mass production"],
    ],
    explanation: "Each method suits a different scale and type of product.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each process.",
    template: "Grinding maize into mealie-meal is {{blank:a}}. Fixing wheels and seats onto a bus body is {{blank:b}}. Sealing mealie-meal in labelled bags is {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["processing"], choices: ["processing", "assembling", "packaging"] },
      { id: "b", accepted: ["assembling"], choices: ["assembling", "processing", "packaging"] },
      { id: "c", accepted: ["packaging"], choices: ["packaging", "processing", "assembling"] },
    ],
    explanation: "Processing changes raw materials; assembling joins parts; packaging wraps and labels.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the statement.",
    template: "Splitting production into separate tasks, each done by a different worker, is called the {{blank:a}}. It allows workers to {{blank:b}} in one task.",
    blanks: [
      { id: "a", accepted: ["division of labour"], choices: ["division of labour", "rule of law", "factor of production", "informal sector"] },
      { id: "b", accepted: ["specialise"], choices: ["specialise", "retire", "vote", "migrate"] },
    ],
    hints: ["Think of an assembly line."],
    explanation: "Division of labour lets workers specialise and become skilled and quick at one task.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to making goods mainly by hand, with simple tools, in small quantities?",
    accepted: ["handicraft", "handicraft production", "craft production", "hand production"],
    wrong: ["mass production"],
    explanation: "Handicraft production uses hand skills and simple tools.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** advantages of mass production.",
    points: [
      "Any one of: large quantities produced quickly; lower cost per item / cheaper goods; standard quality; workers specialise; goods can be exported; related jobs created",
      "A second different advantage",
      "A third different advantage",
    ],
    modelAnswer: "Large quantities are produced quickly, goods are cheaper, and every item is of the same quality.",
    explanation: "One mark per correct advantage.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** disadvantages of modern methods of manufacturing.",
    points: [
      "Identifies: job losses as machines replace workers",
      "Develops: families lose incomes and unemployment rises",
      "Identifies: dependence on electricity / high cost of machines / pollution / boring repetitive work / loss of craft skills",
      "Develops: e.g. power cuts stop the whole production line, so output and income are lost",
    ],
    modelAnswer: "Machines can replace workers, so some people lose their jobs and their families lose incomes. Modern factories also depend on electricity, so when there are power cuts the whole production line stops and output and earnings are lost.",
    hints: ["Think about workers and about power."],
    explanation: "One mark for each disadvantage and one for its development.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "A small furniture maker in Gweru wants to produce more chairs without losing quality. Suggest **two** changes and explain each.",
    points: [
      "Suggests buying or sharing simple machines (e.g. power saw, planer)",
      "Explains that machines speed up cutting and make parts uniform",
      "Suggests batch production / dividing tasks among workers (cutting, joining, finishing)",
      "Explains that workers specialise and become faster and more skilled, keeping quality high",
    ],
    modelAnswer: "The furniture maker could buy or share simple machines such as a power saw and planer, so parts are cut faster and to the same size. He could also make chairs in batches and divide the work, with one worker cutting, another joining and another finishing, so each becomes skilled and quick at one task while quality stays high.",
    hints: ["Think about machines and about division of labour."],
    explanation: "One mark for each suggestion and one for its explanation.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a description of a fictional peanut-butter factory in Marondera, 2026",
      "Groundnuts from local farmers are cleaned, roasted and ground by machines. The peanut butter is pumped into jars, which are sealed and labelled with the ingredients, weight and expiry date. Each worker has one job: some roast, some operate the grinders, others check the jars. The factory produces thousands of identical jars a week.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which production method does the factory use?",
        options: [
          ["mass production", "Correct: thousands of identical jars made by machines and specialised workers."],
          ["job production", "Job production makes single items to order."],
          ["handicraft production", "The factory uses machines."],
          ["subsistence production", "The factory produces for sale, not for its own use."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **one** example of processing and **one** example of packaging from the source.",
        points: ["Processing: cleaning, roasting or grinding the groundnuts", "Packaging: filling, sealing or labelling the jars"],
        modelAnswer: "Processing: roasting and grinding the groundnuts. Packaging: sealing and labelling the jars.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the factory benefits local farmers and the community.",
        points: [
          "It buys groundnuts from local farmers, giving them a market and income",
          "It employs workers (roasting, grinding, checking), giving jobs",
          "It adds value to a local crop / supplies a local product, reducing imports",
        ],
        modelAnswer: "The factory buys groundnuts from local farmers, giving them a reliable market and income. It employs local people to roast, grind and check the product. It also adds value to a local crop, so peanut butter does not have to be imported.",
      }),
    ],
    hints: ["In (c), think about farmers, workers and the country."],
    explanation: "A source-based practice item on manufacturing processes and methods.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about modern manufacturing.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the difference between handicraft production and mass production.",
        points: [
          "Handicraft: goods made by hand with simple tools",
          "in small quantities, each item often unique (e.g. a carved stool)",
          "Mass production: goods made by machines on an assembly line",
          "in huge numbers of identical items with division of labour (e.g. bottled drinks)",
        ],
        modelAnswer: "Handicraft production makes goods by hand with simple tools, in small quantities, and each item is often unique, like a carved stool. Mass production uses machines on an assembly line, with each worker doing one task, to make huge numbers of identical items such as bottled drinks.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Modern methods of manufacturing have done more good than harm in Zimbabwe.\" How far do you agree?",
        points: [
          ["Good: large output of cheaper, standard goods; value added to local raw materials; exports", 2],
          ["Good: jobs in factories and related services; skills and technology", 2],
          ["Harm: machines replace workers; costly machines and dependence on power; pollution; loss of craft skills", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Modern methods have brought clear benefits. Factories produce large quantities of cheaper, standard goods such as mealie-meal, cooking oil and clothing. They add value to local raw materials like maize, cotton and groundnuts, and some goods are exported. Factories create jobs, both inside and in transport, sales and maintenance, and workers learn new skills.\n\nThere are also harms. Machines can replace workers, so mechanisation may reduce employment. Machines are expensive and depend on electricity, so power cuts stop production. Factories can pollute air and water, and cheap factory goods can push out craft producers.\n\nI largely agree. Modern manufacturing has done more good, as it supplies goods and jobs and adds value, but its harms must be managed through training, pollution control and support for small producers.",
      }),
    ],
    hints: ["In (b), consider consumers, workers and the environment."],
    explanation: "A practice evaluative item on the impact of modern manufacturing.",
  });

  b.card("DEFINITION", "Manufacturing", "Changing raw materials or parts into finished goods, by hand or by machine.");
  b.card("DEFINITION", "Mass production", "Making huge numbers of identical goods continuously, usually on an assembly line.");
  b.card("DEFINITION", "Division of labour", "Splitting production into separate tasks, each done by different workers who specialise.");
  b.card("FACT", "Name the three processes of manufacturing.", "Processing, assembling and packaging.");
  b.card("FACT", "Name four methods of production.", "Handicraft, job, batch and mass production (also mechanised production).");
  b.card("CONCEPT", "Batch or mass production: what is the difference?", "Batch makes a set number of one item, then changes; mass makes the same item continuously in huge numbers.");
  b.card("CONCEPT", "Give three functions of packaging.", "Protects goods, carries information (ingredients, weight, expiry date), helps sell the product.");
  b.card("CONCEPT", "Give three advantages of modern manufacturing.", "Large output, lower cost per item, standard quality (also exports and specialised skills).");
  b.card("CONCEPT", "Give three disadvantages of modern manufacturing.", "Job losses, costly machines and dependence on electricity, pollution (also boring work, loss of craft skills).");
});
