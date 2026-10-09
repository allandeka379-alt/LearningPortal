// Slice W4b: agricultural co-operatives (ZIMSEC only). All money figures are assumed.
import { concept, P, round, check, table, profitLoss } from "../lib.mjs";

const bulkSave = round((38 - (33 + 1.5)) * 25, 2);
check(bulkSave === 87.5, "bulkSave");
const refund = round((6000 * 3600) / 150000, 2);
check(refund === 144, "refund");
const capital = 45 * 4 * 10;
check(capital === 1800, "capital");
// Struct 8: co-operative year.
const INCOME = [["Sales of members' maize", 96000], ["Sales of inputs to members", 41000]];
const EXPENSES = [["Payments to members for maize", 82000], ["Cost of inputs bought", 36000], ["Transport and storage", 7400], ["Wages", 4800], ["Other running costs", 1800]];
const PL = profitLoss({ income: INCOME, expenses: EXPENSES });
check(PL.totalIncome === 137000 && PL.totalExpenses === 132000 && PL.profit === 5000, "PL");
const reserve = round(PL.profit * 0.3, 2);
const toMembers = PL.profit - reserve;
const perTonne = round(toMembers / 350, 2);
const farai = round(perTonne * 12, 2);
check(reserve === 1500 && toMembers === 3500 && perTonne === 10 && farai === 120, "share");
const PLT = table(["Item", "US\\$"], [...INCOME.map(([i, a]) => [`Income: ${i}`, a.toLocaleString("en-GB")]), ...EXPENSES.map(([i, a]) => [`Expense: ${i}`, a.toLocaleString("en-GB")])]);

concept("agri.business.cooperatives", { file: "business/cooperatives", keyPrefix: "business.cooperatives" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many votes does each member usually have at a co-operative's general meeting?",
    options: [
      ["One vote, whatever the number of shares", "Correct: democratic member control."],
      ["One vote for each share owned", "That is how a company works."],
      ["Votes in proportion to produce delivered", "Trade affects the refund, not votes."],
      ["Only committee members may vote", "All members vote."],
    ],
    answer: "A",
    explanation: "Democratic control: one member, one vote.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A co-operative that buys fertiliser and seed in bulk and sells them to its members is a:",
    options: [
      ["supply co-operative", "Correct: it supplies inputs."],
      ["marketing co-operative", "Marketing co-operatives sell members' produce."],
      ["savings and credit co-operative", "That lends members' savings."],
      ["producer co-operative", "Members produce together."],
    ],
    answer: "A",
    explanation: "Supply (input) co-operatives buy inputs in bulk for members.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How is the surplus of a co-operative usually returned to members?",
    options: [
      ["In proportion to each member's trade with it", "Correct: a patronage refund."],
      ["Equally to every member, whatever their trade with it", "Not the usual principle."],
      ["Mainly in proportion to shares held", "Interest on shares is limited."],
      ["Only to the committee members", "All members share."],
    ],
    answer: "A",
    explanation: "The surplus is returned according to use of the co-operative, such as litres delivered.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is the main purpose of a co-operative's by-laws?",
    options: [
      ["To set out its rules and how it is run", "Correct."],
      ["To list the prices of all members' produce", "Prices are not set in by-laws."],
      ["To record the daily milk deliveries", "That is a production record."],
      ["To advertise the co-operative's goods", "Not their purpose."],
    ],
    answer: "A",
    explanation: "By-laws set the name, aims, membership, shares, elections, meetings and sharing of surplus.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Smallholders want loans for inputs but banks refuse them. Which type of co-operative would help most?",
    options: [
      ["A savings and credit co-operative", "Correct: lends members' pooled savings."],
      ["A marketing co-operative only", "Markets produce but may not lend."],
      ["A producer co-operative only", "Shares production, not credit."],
      ["A consumer co-operative", "Sells household goods."],
    ],
    answer: "A",
    hints: ["Which type handles savings and loans?"],
    explanation: "SACCOs pool members' savings and lend to members at fair interest.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why does registration with the registrar of co-operatives help a co-operative?",
    options: [
      ["It gives the group legal status to own property and borrow", "Correct."],
      ["It guarantees that the co-operative will make a surplus every year", "No guarantee of surplus."],
      ["It allows the government to run it", "Co-operatives stay independent."],
      ["It removes the need to keep accounts", "Accounts must still be kept and audited."],
    ],
    answer: "A",
    hints: ["What can a registered body do in its own name?"],
    explanation: "Registration makes the co-operative a legal body that can own property, open accounts, borrow and sign contracts.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Members of a marketing co-operative often sell to roadside traders who pay cash, instead of delivering to the co-operative. What is the most serious effect?",
    options: [
      ["It cannot meet contracts or recover input loans", "Correct: side-selling weakens the co-operative."],
      ["The members will get larger patronage refunds", "Refunds fall as trade falls."],
      ["The co-operative's costs per tonne will fall", "Fixed costs are spread over less produce, so they rise."],
      ["Buyers will offer the co-operative higher prices", "Unreliable supply weakens bargaining."],
    ],
    answer: "A",
    hints: ["What does the co-operative depend on?"],
    explanation: "Without members' produce the co-operative loses contracts, cannot recover loans and its costs per unit rise.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a principle of co-operatives?",
    options: [
      ["Voluntary and open membership", "Correct."],
      ["Profit shared only by the largest shareholders", "Contradicts member economic participation."],
      ["Control by an outside company", "Contradicts autonomy and independence."],
      ["Membership limited to one family", "Contradicts open membership."],
    ],
    answer: "A",
    hints: ["Who may join?"],
    explanation: "Anyone able to use the services and accept the duties may join.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a co-operative a member who owns many shares has more votes than a member who owns one share.",
    answer: false,
    explanation: "False. Each member has one vote regardless of shares.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of co-operative with what it does.",
    pairs: [
      ["Marketing co-operative", "Assembles and sells members' produce"],
      ["Supply co-operative", "Buys inputs in bulk for members"],
      ["Savings and credit co-operative", "Lends members' pooled savings"],
      ["Producer co-operative", "Members farm together with shared resources"],
      ["Multipurpose co-operative", "Combines several services"],
    ],
    explanation: "Know the function of each type.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The meeting held every year at which members receive the accounts and elect the committee is the {{blank:a}} general meeting.",
    blanks: [{ id: "a", accepted: ["annual"] }],
    explanation: "The **annual** general meeting (AGM).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for the money left after a co-operative has paid all its costs for the year.",
    accepted: ["surplus", "the surplus", "net surplus"],
    keywords: { any: ["surplus"] },
    explanation: "The **surplus**.",
  });
  b.num({
    d: 3, skill: "APPLICATION", daily: true,
    stem: "Assume fertiliser costs US\\$38 a bag in town. A co-operative buys it at US\\$33 a bag plus US\\$1.50 a bag transport. Calculate a member's saving on 25 bags.",
    value: bulkSave, prefix: "US$", answer: "87.50", wrong: [(38 - 33) * 25, round(38 - 34.5, 2)],
    hints: ["Saving per bag = town price − (co-operative price + transport)."],
    explanation: `Co-operative cost = 33 + 1.50 = US\\$34.50; saving per bag = US\\$3.50; × 25 = US\\$${bulkSave.toFixed(2)}. Forgetting transport gives US\\$125.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "A dairy co-operative returns US\\$6,000 of its surplus to members in proportion to milk delivered. Members delivered 150,000 L in the year; Thandeka delivered 3,600 L. Calculate Thandeka's refund.",
    value: refund, prefix: "US$", wrong: [round(6000 / 3600, 2), round((3600 / 6000) * 150, 2)],
    hints: ["Refund per litre = amount shared ÷ total litres."],
    explanation: `Per litre = 6,000 ÷ 150,000 = US\\$0.04; 3,600 × 0.04 = US\\$${refund}.`,
    workedSolution: `1. Refund per litre = 6,000 ÷ 150,000 = US\\$0.04.\n2. Thandeka's refund = 3,600 × 0.04 = US\\$${refund}.`,
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A new co-operative has 45 members, each buying 4 shares at US\\$10 a share. Calculate the share capital raised.",
    value: capital, prefix: "US$", wrong: [45 * 10, 4 * 10],
    explanation: `45 × 4 × 10 = US\\$${capital.toLocaleString("en-GB")}.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** benefits a smallholder gains from joining a marketing co-operative.",
    hints: ["Think of bargaining power and shared facilities."],
    points: [
      "Produce from many members is assembled into large lots.",
      "Giving bargaining power for better prices / attracting large buyers and contracts.",
      "Shared facilities such as storage, cooling, grading and transport.",
      "Which a single smallholder could not afford, reducing losses and costs; surplus returned to members.",
    ],
    modelAnswer: "The co-operative combines members' produce into large lots, so it can bargain for better prices and win contracts with big buyers. It also provides shared storage, cooling and transport that one smallholder could not afford, reducing losses and costs.",
    explanation: "Benefit plus explanation, twice.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Suggest **two** problems a farmers' co-operative may face and a solution to each.",
    hints: ["Management, money, members."],
    points: [
      "Problem 1, e.g. poor management or dishonest officials / misuse of funds.",
      "Solution: train the committee and staff, keep audited accounts and present them to members at the AGM.",
      "Problem 2, e.g. lack of capital / late payment / side-selling by members.",
      "Solution: build reserves and members' shares, seek credit as a registered body / pay members promptly / enforce by-laws fairly.",
    ],
    modelAnswer: "Officials may lack business skills or misuse funds; training and audited accounts presented at the AGM help. Members may side-sell when traders pay cash; prompt payment by the co-operative and fair enforcement of the by-laws keep them loyal.",
    explanation: "Matched problem and solution.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 8, calculator: true,
    stem: `A multipurpose co-operative near Gokwe had these results for one year (assumed figures). Members delivered 350 t of maize.\n\n${PLT}`,
    hints: ["Surplus = total income − total expenses.", "Refund per tonne = amount for members ÷ tonnes delivered."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the surplus for the year.",
        value: PL.profit, prefix: "US$", wrong: [PL.totalIncome, 96000 - 82000],
        explanation: `Income ${PL.totalIncome.toLocaleString("en-GB")} − expenses ${PL.totalExpenses.toLocaleString("en-GB")} = US\\$${PL.profit.toLocaleString("en-GB")}.`,
      }),
      P.num({
        label: "(b)", marks: 1, stem: "The AGM puts 30% of the surplus into reserves. Calculate the amount left to return to members.",
        value: toMembers, prefix: "US$", wrong: [reserve, PL.profit],
        explanation: `Reserve = 0.30 × ${PL.profit.toLocaleString("en-GB")} = US\\$${reserve.toLocaleString("en-GB")}; left = US\\$${toMembers.toLocaleString("en-GB")}.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "The amount for members is shared in proportion to maize delivered. Farai delivered 12 t. Calculate his refund.",
        value: farai, prefix: "US$", wrong: [round((PL.profit / 350) * 12, 2), round(toMembers / 12, 2)],
        explanation: `Per tonne = ${toMembers.toLocaleString("en-GB")} ÷ 350 = US\\$${perTonne}; × 12 = US\\$${farai}.`,
      }),
      P.manual({
        label: "(d)", marks: 1, stem: "State **one** reason for keeping part of the surplus as a reserve.",
        points: ["To buy or repair equipment / meet future losses or emergencies / expand services without borrowing."],
        explanation: "Reserves strengthen the co-operative.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why the surplus is shared by maize delivered rather than by shares held.",
        points: ["Co-operative principle: the surplus comes from members' trade with the co-operative, so it is returned to those who used it most.", "This rewards loyal members who deliver their crop (discouraging side-selling); interest on shares is limited so investors do not take control."],
        explanation: "Patronage principle.",
      }),
    ],
    explanation: "Calculate a co-operative's surplus and patronage refunds and explain the principle.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 6,
    stem: "Thirty goat keepers near Masvingo want to sell their goats together to a buyer in Bulawayo and to buy dip chemicals and dewormers in bulk. An extension officer advises them to form a co-operative.",
    hints: ["Think of the steps from idea to registration."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which type of co-operative best suits their aims?",
        options: [
          ["Multipurpose co-operative", "Correct: marketing and supply together."],
          ["Savings and credit co-operative", "They have not asked for loans."],
          ["Producer co-operative", "They keep their own goats; they do not farm jointly."],
          ["Consumer co-operative", "Sells household goods to consumers."],
        ],
        answer: "A",
        explanation: "They want both marketing (selling goats) and supply (buying chemicals): a multipurpose co-operative.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Describe **three** steps the goat keepers should follow to form and register the co-operative.",
        points: ["Hold a first (inaugural) meeting, agree to form the co-operative and elect an interim committee.", "Study whether the business is viable and draw up by-laws (rules on membership, shares, committee, sharing surplus).", "Apply to the registrar of co-operatives for registration, sell shares and hold the first AGM to elect the management committee."],
        explanation: "Meeting, by-laws, registration.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain how selling the goats together could raise their income.",
        points: ["A large lot of goats attracts a big buyer and gives bargaining power for a better price.", "Transport and selling costs are shared, so cost per goat falls (higher net price)."],
        explanation: "Bargaining power and shared costs.",
      }),
    ],
    explanation: "Choose a type of co-operative, describe its formation and explain a benefit.",
  });

  b.card("DEFINITION", "Co-operative", "A voluntary association of people who jointly own and democratically control a business to meet shared needs.");
  b.card("CONCEPT", "The seven co-operative principles", "Open membership; democratic control (one member, one vote); economic participation (limited interest, surplus by trade); independence; education; co-operation among co-operatives; concern for community.");
  b.card("CONCEPT", "Steps in forming a co-operative", "Common need → first meeting and interim committee → viability study → by-laws → registration with the registrar → shares sold → AGM elects committee.");
  b.card("CONCEPT", "Types of agricultural co-operative", "Producer, marketing, supply (input), savings and credit, multipurpose.");
  b.card("CONCEPT", "Benefits of co-operatives", "Bulk buying, bargaining power, shared facilities, credit, training, democratic control, surplus returned to members.");
  b.card("CONCEPT", "Problems of co-operatives", "Poor management, little capital, dishonesty, low commitment and side-selling, late payment, conflict, outside interference.");
  b.card("DEFINITION", "Patronage refund", "Part of the surplus returned to members in proportion to their trade with the co-operative.");
  b.card("FACT", "Co-operative versus company voting", "Co-operative: one member, one vote. Company: votes by number of shares.");
});
