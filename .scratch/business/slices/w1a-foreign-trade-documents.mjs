// W1a: documents and customs in foreign trade (COM).
import { concept, P } from "../lib.mjs";

concept("bus.trade.foreign-trade-documents", { file: "trade/foreign-trade-documents", keyPrefix: "trade.foreign-trade-documents" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which document is a **document of title** to goods sent by sea?",
    options: [
      ["Bill of lading", "Correct: whoever holds it can claim the goods."],
      ["Airway bill", "The airway bill is used for air freight and is not a document of title."],
      ["Certificate of origin", "This states where goods were made."],
      ["Indent", "An indent is an order for goods from abroad."],
    ],
    answer: "A",
    explanation: "The bill of lading is a receipt, evidence of the contract of carriage and a document of title.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "An order sent by an importer for goods from abroad is called:",
    options: [
      ["an indent", "Correct: open indents leave the choice of supplier to the agent; closed indents name it."],
      ["a consular invoice", "A consular invoice confirms the value of goods."],
      ["a bill of exchange", "A bill of exchange is an order to pay money."],
      ["a customs declaration", "A customs declaration gives details of goods to customs."],
    ],
    answer: "A",
    explanation: "The indent is the foreign-trade order.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main purpose of a **certificate of origin**?",
    options: [
      ["To show the country where the goods were made", "Correct: it allows the right duty to be charged, e.g. lower duty for trading-bloc partners."],
      ["To prove that the goods have been insured", "That is the insurance certificate."],
      ["To guarantee that the importer will pay", "That is the role of a letter of credit."],
      ["To act as a receipt from the airline", "That is the airway bill."],
    ],
    answer: "A",
    explanation: "Customs use the certificate of origin to apply preferential duties under trade agreements and to enforce restrictions on goods from some countries.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Imported goods are stored in a bonded warehouse and later re-exported. How much customs duty is paid on them?",
    options: [
      ["None, because they are re-exported", "Correct: duty is paid only on goods released for home use."],
      ["Full duty when they enter the warehouse", "Duty is not paid on entering a bonded warehouse."],
      ["Half duty, because they were stored", "There is no half duty for storage."],
      ["Full duty when they leave the country", "Re-exported goods do not pay import duty."],
    ],
    answer: "A",
    explanation: "Bonded warehouses delay duty until goods are released at home; re-exported goods pay no import duty.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A letter of credit is issued by:",
    options: [
      ["the importer's bank", "Correct: the bank promises to pay the exporter when the documents are presented."],
      ["the shipping company", "The shipping company issues the bill of lading."],
      ["the customs authority", "Customs collects duties and checks declarations."],
      ["the exporter's insurer", "Insurers issue insurance certificates."],
    ],
    answer: "A",
    explanation: "Letters of credit are bank guarantees of payment, released against shipping documents.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why would an exporter dealing with a new foreign buyer insist on a letter of credit?",
    options: [
      ["It makes payment certain once the goods are shipped", "Correct: the bank, not the unknown buyer, promises to pay."],
      ["It reduces the customs duty charged on the goods", "Duty depends on the goods and their origin, not on the payment method."],
      ["It speeds up the transport of the goods", "Payment documents do not change transport time."],
      ["It proves where the goods were manufactured", "That is the certificate of origin."],
    ],
    answer: "A",
    explanation: "With a letter of credit, the exporter relies on a bank's promise rather than an unknown buyer's.",
    hints: ["What risk does an exporter face with a buyer it has never dealt with?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is **not** a function of ZIMRA's customs division?",
    options: [
      ["Setting the exchange rate of the currency", "Correct: exchange-rate policy belongs to the central bank, not to customs."],
      ["Collecting import duties", "This is a main customs function."],
      ["Preventing smuggling", "This is a customs function."],
      ["Collecting trade statistics from customs declarations", "Customs declarations provide trade statistics."],
    ],
    answer: "A",
    explanation: "Customs collects duties, prevents smuggling, enforces restrictions, controls bonded warehouses and collects trade statistics.",
    hints: ["Three options are customs duties at the border; one is a central bank matter."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "An airway bill is a document of title to the goods.",
    answer: false,
    explanation: "False. The airway bill is a receipt and contract of carriage; air freight is delivered to the named consignee.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Customs declarations help the government to calculate the balance of trade.",
    answer: true,
    explanation: "True. Declarations record the value of imports and exports, which are used for trade statistics.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each document with its purpose.",
    pairs: [
      ["Consular invoice", "Confirms the value of goods, certified by the importing country's consul"],
      ["Bill of exchange", "Order to pay a stated sum on demand or at a future date"],
      ["Customs declaration", "Gives customs the type, quantity, value and origin of goods"],
      ["Airway bill", "Receipt and contract of carriage for air freight"],
    ],
    explanation: "Learn who prepares each document and why.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Goods sent by sea need a {{blank:a}}; goods sent by air need an {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["bill of lading"], choices: ["bill of lading", "airway bill", "indent", "consular invoice"] },
      { id: "b", accepted: ["airway bill"], choices: ["bill of lading", "airway bill", "indent", "advice note"] },
    ],
    explanation: "Bill of lading for sea freight; airway bill for air freight.",
  });
  b.short({
    d: 2,
    stem: "Name the type of warehouse where imported goods are stored without paying duty until they are released.",
    accepted: ["bonded warehouse", "a bonded warehouse", "bonded warehouses", "bond", "customs bonded warehouse"],
    wrong: ["public warehouse", "cold store"],
    explanation: "Bonded warehouses are controlled by customs.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** functions of the bill of lading.",
    points: [
      "Receipt for goods taken on board (1)",
      "Explained: proves what was shipped and in what condition (1)",
      "Document of title / evidence of contract of carriage (1)",
      "Explained, e.g. can be transferred to sell goods in transit / importer presents it to collect goods (1)",
    ],
    modelAnswer: "It is a receipt from the shipping company, proving which goods were loaded and in what condition. It is also a document of title: the importer must present it to collect the goods, and it can be transferred to another buyer while the goods are still at sea.",
    explanation: "Name and explain two of the three functions.",
    hints: ["Who issues it, and what does the importer need to collect the goods?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** benefits of bonded warehouses to an importer.",
    points: [
      "Benefit 1, e.g. pays duty only when goods are released (1)",
      "Explained: improves cash flow, duty paid as goods are sold (1)",
      "Benefit 2, e.g. no duty on re-exports / goods can be repacked, sampled, blended (1)",
      "Explained (1)",
    ],
    modelAnswer: "The importer pays duty only when goods are taken out for sale, a little at a time, so money is not tied up paying duty on goods that may not sell for months. Goods that are re-exported pay no duty at all, and goods can be repacked or sampled for buyers while still in bond.",
    explanation: "Link each benefit to cash flow or flexibility.",
    hints: ["When is the duty paid?"],
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, secs: 840,
    stem: "Gweru Engineering, a fictional company, is importing a machine from overseas for the first time. The machine will travel by sea to a port in Mozambique and then by rail to Zimbabwe. The supplier has never dealt with Gweru Engineering before. The country of manufacture belongs to a trade agreement that gives its goods lower duty in Zimbabwe.",
    parts: [
      P.fib({
        label: "(a)", marks: 3,
        stem: "Identify the documents.",
        template: "Gweru Engineering's order: {{blank:a}}. The shipping company's document of title: {{blank:b}}. The document needed to claim the lower duty: {{blank:c}}.",
        blanks: [
          { id: "a", accepted: ["indent"], choices: ["indent", "airway bill", "credit note", "consular invoice"] },
          { id: "b", accepted: ["bill of lading"], choices: ["bill of lading", "airway bill", "indent", "receipt"] },
          { id: "c", accepted: ["certificate of origin"], choices: ["certificate of origin", "bill of exchange", "delivery note", "indent"] },
        ],
        wrong: [["indent", "airway bill", "consular invoice"]],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain why the supplier is likely to ask for a letter of credit.",
        points: ["Supplier does not know Gweru Engineering (1)", "Risk of not being paid after shipping (1)", "Bank guarantees payment once documents are presented (1)"],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Describe **two** things ZIMRA will do when the machine reaches the border.",
        points: ["Check the customs declaration and documents (1)", "To confirm value/origin (1)", "Collect any import duty and taxes due (1)", "Record the import in trade statistics / ensure no prohibited goods (1)"],
      }),
    ],
    explanation: "Indent, bill of lading and certificate of origin; a letter of credit protects a supplier against non-payment; ZIMRA checks documents, collects duty and records the trade.",
    hints: ["Which document is used for sea transport?", "What does customs do with the declaration?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780,
    stem: "Nyasha imports cases of cooking oil and sells some in Zimbabwe and re-exports some to Zambia. She currently pays full import duty on all the oil at the border.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** functions of a customs authority.",
        points: ["Collect duties (1)", "Any other, e.g. prevent smuggling, control bonded warehouses, enforce quotas, collect statistics (1)"],
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Evaluate whether Nyasha should store her oil in a bonded warehouse.",
        points: [
          "No duty on the oil that is re-exported to Zambia (1)",
          "Duty on home sales paid only as oil is released: better cash flow (1)",
          "Oil can be repacked/sampled in bond (1)",
          "Costs: warehouse rent / paperwork / customs rules on release (1)",
          "Conclusion (1)",
          "Justified, e.g. worthwhile if the duty saved exceeds storage costs (1)",
        ],
        modelAnswer: "A bonded warehouse would save Nyasha the duty she now pays on oil she re-exports to Zambia, and she would pay duty on oil for the home market only when she releases it, which helps her cash flow. However, she must pay rent for the bonded space and follow customs procedures for every release. Because part of her trade is re-exports, the duty saved is likely to be greater than the storage costs, so using a bonded warehouse is a sensible decision.",
      }),
    ],
    explanation: "Bonded warehouses suit importers who re-export or sell slowly; storage costs and paperwork must be weighed against duty saved.",
    hints: ["What duty is paid on re-exported goods in bond?"],
  });
  b.card("DEFINITION", "Indent", "An importer's order for goods from abroad; open (agent chooses supplier) or closed (supplier named).");
  b.card("DEFINITION", "Bill of lading", "Sea freight: receipt for goods, contract of carriage and document of title.");
  b.card("DEFINITION", "Airway bill", "Air freight: receipt and contract of carriage; not a document of title.");
  b.card("DEFINITION", "Consular invoice", "Invoice certified by the importing country's consul to confirm the value of goods.");
  b.card("DEFINITION", "Certificate of origin", "States where goods were made; used for preferential duty and trade restrictions.");
  b.card("DEFINITION", "Letter of credit", "Importer's bank promises to pay the exporter on presentation of the shipping documents.");
  b.card("DEFINITION", "Bill of exchange", "Order to pay a stated sum on demand or at a future date; can be discounted at a bank.");
  b.card("FACT", "Functions of customs (ZIMRA)", "Collect duties, prevent smuggling, enforce restrictions, control bonded warehouses, collect trade statistics.");
  b.card("DEFINITION", "Bonded warehouse", "Customs-controlled store where imported goods wait without paying duty until released for home use or re-exported.");
});
