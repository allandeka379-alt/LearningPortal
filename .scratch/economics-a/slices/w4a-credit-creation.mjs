// W4a: credit creation and the bank credit multiplier (both boards; ZIMSEC Form 5, Cambridge A Level).
import { concept, P, chk, creditCreation, fmt, roundTo } from "../lib.mjs";
import { mc, LV8 } from "../tables/w4a-kit.mjs";

const LV5 = [
  [3, 4, 5, "Two-sided, developed and applied to the data, with a supported judgement."],
  [2, 2, 3, "Some development of one side or limited use of the data."],
  [1, 1, 1, "A simple statement."],
];

concept("aecon.money.credit-creation", { file: "money/credit-creation", keyPrefix: "money.credit-creation" }, (b) => {
  mc(b, [2, "RECALL"], "Fractional reserve banking means that banks",
    ["keep only a fraction of deposits as reserves and lend the rest", "Correct: this lets loans create new deposits."],
    [["keep all of their deposits as reserves and make no loans", "That would be 100% reserve banking and no credit would be created."],
     ["lend only the money that comes from shareholders' capital", "Banks lend mainly deposits, not only capital."],
     ["hold reserves only in the form of foreign currency notes", "Reserves are mainly cash and balances at the central bank."]],
    "Because only a fraction of deposits is needed in reserve, banks can lend the rest and create deposits.", { daily: true });

  mc(b, [2, "APPLICATION"], "The reserve ratio is 25%. The simple credit multiplier is",
    ["4", "Correct: 1 ÷ 0.25."],
    [["0.25", "This is the reserve ratio itself."],
     ["2.5", "This is not 1 divided by 0.25."],
     ["25", "This multiplies by 100 instead of inverting."]],
    "Credit multiplier = 1 ÷ reserve ratio = 1 ÷ 0.25 = 4.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "A fall in the required reserve ratio will, other things equal,",
    ["increase the credit multiplier and the potential supply of bank deposits", "Correct: banks can lend a larger share of each deposit."],
    [["reduce the credit multiplier and the potential supply of bank deposits", "A lower ratio increases the multiplier."],
     ["leave the credit multiplier unchanged because only cash matters", "The multiplier is 1 ÷ the reserve ratio."],
     ["increase the reserves that banks are forced to hold with the central bank", "A lower ratio reduces required reserves."]],
    "Multiplier = 1 ÷ reserve ratio, so a lower ratio gives a larger multiplier.");

  {
    const d = 500, r = 0.1; chk(d / r - d, 4500);
    mc(b, [3, "APPLICATION"], "A customer deposits US\\$500 and the reserve ratio is 10%. The maximum amount of NEW deposits created by lending is",
      ["US\\$4,500", "Correct: 500 × 10 = 5,000 total, minus the original 500."],
      [["US\\$5,000", "This is the total deposits, including the original deposit."],
       ["US\\$450", "This is the amount of the first loan only."],
       ["US\\$50", "This is the reserves held against the first deposit."]],
      "Total deposits = 500 ÷ 0.10 = 5,000; new deposits = 5,000 − 500 = 4,500.", { hints: ["Find the total, then subtract the original deposit."] });
  }

  mc(b, [3, "ANALYSIS"], "Which of the following would reduce the amount of credit that the banking system creates from a given deposit?",
    ["Households keep part of their money as cash instead of depositing it", "Correct: cash drain leaves the banking system."],
    [["Banks lend all their spare reserves each time", "This is an assumption of the simple model that gives the maximum."],
     ["Borrowers spend the money they borrow and the sellers deposit it", "Redepositing is what keeps credit creation going."],
     ["Firms and households wish to borrow more at the current interest rate", "Stronger loan demand supports credit creation."]],
    "Cash held outside the banks cannot be lent again, which reduces the multiplier.", { hints: ["Which option removes money from the banks?"] });

  mc(b, [3, "UNDERSTANDING"], "A central bank raises the required reserve ratio from 10% to 20%. The most likely effect is that banks",
    ["are able to create fewer deposits and may reduce lending", "Correct: the multiplier falls from 10 to 5."],
    [["can create more deposits from the same reserves", "A higher ratio reduces the multiplier."],
     ["will need fewer reserves to back their deposits", "They need more."],
     ["see no change because only the interest rate matters", "The reserve requirement is a policy tool."]],
    "A higher reserve ratio lowers the multiplier, so the same reserves support fewer deposits.", { hints: ["Work out the multiplier before and after."] });

  mc(b, [4, "EVALUATION"], "In a recession, banks hold large excess reserves and firms do not wish to borrow. A cut in the reserve requirement is likely to",
    ["have little effect on lending, because loan demand is weak", "Correct: banks do not lend even though they could."],
    [["increase lending greatly, because reserves are the only constraint", "Weak loan demand is a constraint too."],
     ["cause lending to fall, because banks have fewer reserves", "A lower requirement frees reserves."],
     ["raise the credit multiplier to infinity, because banks lend everything", "Demand limits lending; the multiplier cannot be infinite."]],
    "The simple multiplier assumes banks lend all excess reserves and borrowers exist. Neither holds in a deep recession.", { hints: ["Is the quantity of reserves the only limit on lending?"] });

  {
    const m = 1 / 0.05; chk(m, 20);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "elasticity", value: m, dp: 2, hints: ["Multiplier = 1 ÷ reserve ratio."],
      stem: "The reserve ratio is 5%. Calculate the simple credit multiplier.",
      wrong: [0.05, 5, 0.2], explanation: "Credit multiplier = 1 ÷ 0.05 = 20." });
    const D = 2400 * (1 / 0.2); chk(D, 12000);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: D, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Total deposits = initial deposit × multiplier."],
      stem: "An initial deposit of US\\$2,400 million is made in a banking system with a reserve ratio of 20%. Calculate the maximum total deposits that can be created, in US\\$ million.",
      wrong: [480, 9600, 2880], explanation: "Multiplier = 1 ÷ 0.2 = 5; total deposits = 2,400 × 5 = US\\$12,000 million." });
    const N = 900 * 10 - 900; chk(N, 8100);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: N, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Subtract the original deposit from the total."],
      stem: "An initial deposit of US\\$900 million is made when the reserve ratio is 10%. Calculate the maximum amount of new deposits created by bank lending, in US\\$ million.",
      wrong: [9000, 810, 90], explanation: "Total deposits = 900 × 10 = 9,000; new deposits = 9,000 − 900 = US\\$8,100 million." });
    const before = 160 / 0.08, after = 160 / 0.10; chk(before, 2000); chk(after, 1600);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "plain", value: after - before, unit: "US$ million", dp: 0, tol: 0.5, hints: ["Deposits supported = reserves ÷ reserve ratio, before and after."],
      stem: "Banks hold reserves of US\\$160 million. The central bank raises the required reserve ratio from 8% to 10%. Calculate the change in the maximum deposits that the reserves can support, in US\\$ million (a fall is a negative number).",
      wrong: [400, -40, -1600], explanation: "1. Before: 160 ÷ 0.08 = US\\$2,000 million.\n2. After: 160 ÷ 0.10 = US\\$1,600 million.\n3. Change = 1,600 − 2,000 = −US\\$400 million." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false,
    stem: "True or false: the credit multiplier is the same as the reserve ratio.",
    feedbackFalse: "The credit multiplier is 1 divided by the reserve ratio.",
    explanation: "A reserve ratio of 20% gives a multiplier of 5." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Reserve ratio", "The fraction of deposits that banks hold in reserve"], ["Credit multiplier", "1 divided by the reserve ratio"], ["Cash drain", "Money held as cash outside the banking system"], ["Excess reserves", "Reserves held above the required minimum"]],
    explanation: "Each term describes part of the credit creation process." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "The credit multiplier is 1 divided by the reserve {{blank:a}}. If households keep cash and do not deposit it, this {{blank:b}} reduces the credit created.",
    blanks: [{ id: "a", accepted: ["ratio"], choices: ["ratio", "deposit", "loan"] }, { id: "b", accepted: ["cash drain"], choices: ["cash drain", "injection", "subsidy"] }],
    explanation: "Multiplier = 1 ÷ reserve ratio; cash held outside banks is a cash drain." });

  b.short({ d: 2, skill: "RECALL", stem: "What name is given to the fraction of its deposits that a bank holds as cash and balances at the central bank?",
    accepted: ["reserve ratio", "the reserve ratio", "cash ratio", "reserves ratio"], wrong: ["capital ratio"],
    explanation: "The reserve ratio determines the credit multiplier." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, hints: ["Use the formula in words."],
    stem: "Define the credit multiplier.",
    points: ["The number of times an initial deposit of reserves is multiplied into total bank deposits.", "In the simple model it is 1 divided by the reserve ratio."],
    modelAnswer: "The credit multiplier is the number of times an initial deposit is multiplied into total bank deposits; in the simple model it is 1 divided by the reserve ratio.",
    explanation: "Meaning and formula." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Follow one deposit through two banks."],
    stem: "Explain how a bank loan creates a new bank deposit.",
    points: ["A bank keeps a fraction of a deposit as reserves and lends the rest.", "The borrower spends the money, and the person who receives it deposits it in a bank.", "This is a new deposit, part of which is lent again.", "So deposits are multiplied through successive rounds, up to the limit set by the reserve ratio."],
    modelAnswer: "A bank keeps a fraction of a deposit as reserves and lends the rest. The borrower spends the money, and the person who receives it deposits it in a bank, which creates a new deposit. Part of this deposit is lent again, so deposits are multiplied through successive rounds up to the limit set by the reserve ratio.",
    explanation: "Reserve fraction, lending, redeposit, repeated rounds." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Name two limits and explain each."],
    stem: "Explain two reasons why the actual increase in deposits may be less than the maximum shown by the credit multiplier.",
    points: ["Cash drain: some people hold money as cash and do not redeposit it.", "Cash outside the banks cannot be lent again, so each round is smaller.", "Banks hold excess reserves, or there is little demand for loans.", "So not all spare reserves are lent."],
    modelAnswer: "Some people hold part of their money as cash and do not redeposit it, and cash outside the banks cannot be lent again, so each round of lending is smaller than the simple model assumes. Banks may also hold excess reserves, or there may be little demand for loans, so not all spare reserves are lent.",
    explanation: "Cash drain; excess reserves or weak loan demand." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Start with the effect on the multiplier."],
    stem: "Analyse the likely effects of a fall in the required reserve ratio on the money supply and the economy.",
    points: ["A lower reserve ratio raises the credit multiplier.", "Banks can lend more from the same reserves, so deposits and the money supply can rise.", "Lower interest rates on loans may result as the supply of credit rises.", "Higher borrowing raises investment and consumption, so aggregate demand increases.", "Output and employment rise, but prices may rise if capacity is limited."],
    modelAnswer: "A lower reserve ratio raises the credit multiplier, so banks can lend more from the same reserves and deposits and the money supply can rise. The supply of credit increases, which may lower the interest rate charged on loans. Higher borrowing raises investment and consumption, so aggregate demand increases and output and employment rise, although prices may also rise if capacity is limited.",
    explanation: "Multiplier, lending, money supply, interest rate, AD." });

  {
    const cc = creditCreation({ deposit: 500, reserveRatio: 0.25, rounds: 5 });
    const rows4 = creditCreation({ deposit: 500, reserveRatio: 0.25, rounds: 4 });
    const r5 = cc.rows[4].deposit; chk(roundTo(r5, 2), 158.2);
    chk(cc.multiplier, 4); chk(cc.maxDeposits, 2000);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Each new deposit is 75% of the one before.", "Maximum total deposits = initial deposit × multiplier."],
      stem: `**Credit creation in a fictional banking system (illustrative)**\n\nA customer deposits US\\$500 in a bank. Every bank in the system keeps 25% of each deposit as reserves and lends the rest. All the money lent is spent and redeposited in the banking system. The first four rounds are shown.\n\n${rows4.md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: r5, stem: "Calculate the new deposit in round 5, in US\\$ to the nearest cent.", wrong: [210.94, 118.65, 125], explanation: "Round 4's new deposit is 210.94 and 75% of it is lent: 210.9375 × 0.75 = US\\$158.20." }),
        P.num({ label: "(b)", marks: 1, kind: "elasticity", value: cc.multiplier, dp: 2, stem: "Calculate the credit multiplier.", wrong: [0.25, 2.5, 25], explanation: "1 ÷ 0.25 = 4." }),
        P.num({ label: "(c)", marks: 1, kind: "money", value: cc.maxDeposits, stem: "Calculate the maximum total deposits that the original deposit can support, in US\\$.", wrong: [125, 1500, 500], explanation: "500 × 4 = US\\$2,000." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain two reasons why total deposits are likely to be less than your answer to (c).",
          points: ["Some households and firms may hold part of the money as cash instead of redepositing it (cash drain).", "That cash cannot be lent again.", "Banks may keep more than 25% in reserve (excess reserves) or find too few borrowers.", "So less is lent in each round."],
          modelAnswer: "Some households and firms may hold part of the money as cash instead of redepositing it, and that cash cannot be lent again. Banks may also keep more than 25% in reserve or may find too few borrowers, so less is lent in each round and total deposits are lower than 2,000." }),
      ],
      explanation: "Round 5 deposit US\\$158.20; multiplier 4; maximum deposits US\\$2,000; cash drain and excess reserves reduce the total." });
  }
  {
    const r = 0.125; const k = 1 / r; chk(k, 8);
    const dD = 60 * k; chk(dD, 480);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Multiplier = 1 ÷ reserve ratio.", "In (d) think about what the central bank can and cannot control."],
      stem: "**Money creation in Mbira (a fictional economy, illustrative)**\n\nThe central bank of Mbira wants to raise lending to small businesses. It buys government securities worth US\\$60 million from the commercial banks, which raises their reserves by US\\$60 million. The banks keep a reserve ratio of 12.5%. However, many people in Mbira prefer to hold cash, the banks are cautious about lending after some earlier loans were not repaid, and many small firms say that interest rates are too high to borrow.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "elasticity", value: k, dp: 2, stem: "Calculate the credit multiplier.", wrong: [0.125, 12.5, 80], explanation: "1 ÷ 0.125 = 8." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: dD, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the maximum increase in bank deposits, in US\\$ million.", wrong: [60, 7.5, 420], explanation: "Maximum increase = 60 × 8 = US\\$480 million." }),
        P.manual({ label: "(c)", marks: 4, stem: "Using the information, explain two reasons why the increase in deposits in Mbira is likely to be smaller than your answer to (b).",
          points: ["Many people prefer to hold cash, so part of each loan is not redeposited (cash drain).", "So the banks have less to lend in each round.", "Banks are cautious and may hold excess reserves instead of lending.", "And firms say interest rates are too high, so loan demand is weak."],
          modelAnswer: "Many people in Mbira prefer to hold cash, so part of each loan is not redeposited and the banks have less to lend in each round. The banks are also cautious after some bad loans and may hold excess reserves instead of lending, and small firms say that interest rates are too high, so the demand for loans is weak." }),
        P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { min: 90, max: 250 }, levels: LV5,
          stem: "Assess whether a central bank can control the amount of credit created by commercial banks.",
          points: ["It can change reserves (open-market operations) and the reserve requirement, which set the maximum possible credit.", "It can influence the interest rate and so loan demand.", "It cannot force banks to lend or firms to borrow, as in Mbira.", "Cash drain and excess reserves make the multiplier unstable.", "Judgement: it can limit credit more easily than it can force it to expand."],
          modelAnswer: "A central bank can change banks' reserves by open-market operations and can change the reserve requirement, which sets the maximum amount of credit that can be created, and it can influence the interest rate and so the demand for loans. However, it cannot force banks to lend or firms to borrow, as the example of Mbira shows, and cash drain and excess reserves make the multiplier unstable. A central bank can therefore limit credit more easily than it can force credit to expand." }),
      ],
      explanation: "Multiplier 8; maximum rise US\\$480 million; cash drain, cautious banks and weak demand reduce it; the central bank limits but cannot force credit." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider cash drain, excess reserves, loan demand and regulation."],
    stem: "Assess the factors that limit the ability of commercial banks to create credit.",
    points: ["The reserve ratio sets the maximum: credit multiplier = 1 ÷ reserve ratio.", "Cash drain reduces the funds that are redeposited.", "Banks may hold excess reserves for safety.", "Loan demand may be weak in a recession or when interest rates are high.", "Banks lend only to creditworthy borrowers.", "Central bank controls (reserve and capital requirements, credit ceilings).", "Importance varies: demand is the main limit in a slump, regulation in a boom.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "The reserve ratio sets the maximum, because the credit multiplier is 1 divided by the reserve ratio. In practice credit is lower because of cash drain, since money that people hold as cash is not redeposited and cannot be lent again, and because banks may hold excess reserves for safety. Banks can lend only if people want to borrow and are creditworthy, so in a recession or when interest rates are high the demand for loans may be weak. Central bank controls such as capital requirements and credit ceilings also limit lending. The importance of the limits varies: in a slump weak demand and cautious banks are the main constraints, whereas in a boom regulation is the main limit. The most binding limit is usually the willingness of banks to lend and of the public to borrow, not the reserve ratio.",
    explanation: "Weigh reserve ratio, cash drain, excess reserves, loan demand and regulation." });

  b.card("DEFINITION", "Define **fractional reserve banking**.", "Banks keep only a fraction of deposits as reserves and lend the rest.");
  b.card("FORMULA", "Credit multiplier?", "1 ÷ reserve ratio (as a fraction).");
  b.card("FORMULA", "Maximum total deposits?", "Initial deposit × credit multiplier.");
  b.card("FORMULA", "New deposits created by lending?", "Maximum total deposits − initial deposit.");
  b.card("CONCEPT", "What is cash drain?", "Money held as cash outside the banking system, so it cannot be lent again.");
  b.card("CONCEPT", "Name four limits to credit creation.", "Cash drain, excess reserves, weak loan demand and regulation.");
  b.card("CONCEPT", "Effect of a higher reserve requirement?", "The multiplier falls, so banks can support fewer deposits and may reduce lending.");
  b.card("CONCEPT", "Why is the credit multiplier a maximum?", "It assumes no cash drain, no excess reserves and enough borrowers.");
  b.card("CONCEPT", "Two names for the multiplier?", "ZIMSEC: money multiplier. Cambridge: bank credit multiplier.");
});
