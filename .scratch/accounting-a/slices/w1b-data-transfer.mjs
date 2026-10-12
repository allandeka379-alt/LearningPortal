// W1b: systems.data-transfer (Cambridge A Level only)
import { concept, P, money, fmt, check, chk, r2, sum, rd, table } from "../lib.mjs";
import { mc, U } from "../tables/w1b-lib.mjs";

concept("aacc.systems.data-transfer", { file: "systems/data-transfer", keyPrefix: "systems.data-transfer" }, (b) => {
  // --- MCQ
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is the purpose of cleansing the data before it is transferred to a new computerised system?",
    right: ["To remove errors, duplicates and out-of-date records so they are not carried across", "Correct."],
    wrong: [["To make the old system run faster", "Cleansing is done for the new system's data."], ["To avoid the need to prepare and check an opening trial balance in the new computerised system", "A trial balance is still needed to check the transfer."], ["To copy the data onto a backup disk", "That is a backup, not cleansing."]],
    explanation: "Data cleansing improves the accuracy of the opening data in the new system.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is parallel running?",
    right: ["Operating the old and new systems together and comparing their results", "Correct."],
    wrong: [["Stopping the old system completely and starting the new one on a fixed date", "That is direct changeover."], ["Introducing the new system one section at a time", "That is phased changeover."], ["Training staff on the new system before it is installed", "Training is part of planning, not parallel running."]],
    explanation: "Parallel running allows errors in the new system to be found by comparing the two sets of outputs.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an example of a control total used when transferring accounting data?",
    right: ["The total of all customer balances before and after the transfer", "Correct: it should be the same before and after."],
    wrong: [["The password used by the system manager to log in each day", "A password is not a control total."], ["The date on which the new system starts", "A date is not a control total."], ["The number of staff trained on the new system", "This does not check the data."]],
    explanation: "Control totals, such as the number of records and the total of balances, are compared before and after transfer.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A business cannot afford to stop trading and wants to find errors in the new system before relying on it. Which changeover method is most suitable?",
    right: ["Parallel running", "Correct: the old system continues and the outputs are compared."],
    wrong: [["Direct changeover", "If the new system fails there is no fallback."], ["Switching off the old system at the end of the year", "This is a form of direct changeover."], ["Training staff but not using the system until later", "It does not test the system with real transactions."]],
    hints: ["Which method keeps the old system available?"],
    explanation: "Parallel running is safest because the old system continues, though it is more costly.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "After the opening balances are imported into the new system, the trial balance does not agree. What is the most appropriate first step?",
    right: ["Compare the record counts and control totals with the old data to find what is missing", "Correct: find the records or balances that were lost or changed."],
    wrong: [["Put the difference in a suspense account and carry on trading as normal while staff look for it", "The cause should be found before the new system is used."], ["Delete the old system's records so there is only one set", "The old records are needed to find the cause."], ["Ask all of the customers to send in new balances for checking", "This is slow and unnecessary; the old records are available."]],
    hints: ["Where would a missing balance show up first?"],
    explanation: "Control totals and lists of balances show where records were lost or changed.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which is a disadvantage of direct changeover?",
    right: ["If the new system fails there is no fallback", "Correct: the old system has been stopped."],
    wrong: [["It takes longer than the other methods", "Direct changeover is the quickest method."], ["The two systems must be run together at double the cost", "That is parallel running."], ["Only one section of the business is affected", "That is phased changeover."]],
    hints: ["What happens if the new system has a fault?"],
    explanation: "Direct changeover is fast and cheap but risky because there is no fallback.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which check would best show that some customer accounts were lost during a transfer?",
    right: ["Comparing the record count and total balances before and after", "Correct: lost records change the count and the total."],
    wrong: [["Checking that every user of the new system has a strong password", "Passwords do not show whether records were lost."], ["Testing that all of the screens load quickly enough", "Speed does not indicate completeness."], ["Printing the help file supplied with the new system", "A help file says nothing about the data."]],
    hints: ["Which figures would change if records were lost?"],
    explanation: "Control totals before and after transfer reveal missing or changed records.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A business with several branches introduces its new system in one branch first and then in the others. What is the main advantage of this approach?",
    right: ["Problems are limited to one branch and the rest can learn from it", "Correct: this is a phased changeover."],
    wrong: [["The new system is installed at the lowest possible cost", "Phased changeover takes longer and has extra running costs."], ["It removes the need to cleanse the data", "Data must still be cleansed."], ["All branches change at the same time", "That would be direct changeover."]],
    hints: ["What is limited if only one part changes first?"],
    explanation: "A phased changeover reduces the risk and lets staff learn gradually.",
  });

  // --- True / false
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If the trial balance in the new system agrees, it proves that all customer and supplier records have been transferred.",
    answer: false,
    hints: ["Could a record be missing from both columns?"],
    explanation: "False. The trial balance can agree even if a balance is missing from both columns; counts of records and lists of balances must also be checked.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Parallel running costs more than direct changeover because two systems are operated at the same time.",
    answer: true,
    explanation: "True. Staff must enter and process data twice during the parallel period.",
  });

  // --- Matching
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each changeover method to its description.",
    pairs: [["Direct changeover", "The old system stops and the new one starts on a set date"], ["Parallel running", "Both systems operate together and their results are compared"], ["Phased changeover", "The new system is introduced one part of the business at a time"], ["Data cleansing", "Removing errors and duplicates before the data is transferred"]],
    explanation: "Each is a key term in changing from manual to computerised records.",
  });

  // --- Fill in the blank
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "Before data is transferred it should be {{blank:a}} to remove duplicates. After the transfer the number of records and the total of balances are compared with the {{blank:b}} totals.",
    blanks: [
      { id: "a", accepted: ["cleansed"], choices: ["cleansed", "encrypted", "deleted"] },
      { id: "b", accepted: ["control"], choices: ["control", "password", "backup"] },
    ],
    explanation: "Cleansing removes duplicates; control totals show that the transfer was complete.",
  });

  // --- Numerical
  const n1 = [["Mr Banda", 1840], ["Zimplast", 2960], ["Mrs Dube", 735], ["Hwange Traders", 4120], ["Mr Chuma", 1065], ["Kariba Foods", 2380]];
  const n1t = sum(n1.map((x) => x[1]));
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", 
    value: n1t, wrong: [r2(n1t - 735)],
    stem: `Farai's old receivables list contains six accounts:\n\n${table(["Account", `Balance ${U}`], n1)}\n\nCalculate the control total of the balances to be compared after the transfer.`,
    explanation: `${n1.map((x) => fmt(x[1])).join(" + ")} = ${fmt(n1t)}.`,
  });
  const n2 = { recs: 1240, dup: 38, dormant: 52 };
  b.num({
    d: 3, skill: "APPLICATION", kind: "units",
    value: n2.recs - n2.dup - n2.dormant, wrong: [n2.recs, n2.recs - n2.dup],
    stem: `A wholesale business has ${n2.recs} customer records. Cleansing removes ${n2.dup} duplicate records and ${n2.dormant} closed accounts with nil balances. How many records should be in the new system after the transfer?`,
    hints: ["Subtract both groups of removed records."],
    explanation: "1,240 − 38 − 52 = 1,150 records.",
  });
  const n3 = { old: 86420, dup: 3150, fix: 720, newTot: 83340 };
  const n3exp = chk(n3.old - n3.dup + n3.fix, 83990);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", calculator: true,
    value: n3exp - n3.newTot, wrong: [n3.old - n3.newTot, r2(n3exp)],
    stem: `The total of the old receivables balances is ${money(n3.old)}. Cleansing removes duplicates worth ${money(n3.dup)} and corrects an understated balance by adding ${money(n3.fix)}. After the transfer the new system shows a total of ${money(n3.newTot)}. Calculate the amount by which the new system total is lower than it should be.`,
    hints: ["First work out the expected control total after cleansing."],
    explanation: "Expected total = 86,420 − 3,150 + 720 = 83,990. The new system shows 83,340, so 650 is missing and must be traced.",
  });

  // --- Short answer
  b.short({
    d: 1, skill: "RECALL",
    stem: "Name the changeover method in which the old and the new systems are run together for a period.",
    accepted: ["parallel running", "parallel", "parallel changeover", "parallel run"],
    explanation: "Parallel running allows the outputs of the two systems to be compared.",
  });

  // --- Self-marked
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why data should be cleansed before it is transferred to a computerised system.",
    points: ["Old errors, duplicates and dormant accounts would otherwise be carried into the new system", "The reports and balances produced by the new system would be unreliable", "Cleansing is easier before the transfer, because the old records and documents are still available"],
    modelAnswer: "Without cleansing, errors, duplicates and dormant accounts would be carried across, so the new system's reports would be unreliable. It is also easier to correct them before the transfer while the old records are available.",
    hints: ["What would happen to old errors if they were transferred?"],
    explanation: "Link cleansing to the reliability of the new system.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** checks that help to ensure that the data transferred to a new system is accurate.",
    points: ["Control totals: the number of records and the total of balances are compared before and after", "Explained: a difference shows that records were lost or changed", "Trial balance agreement or reconciliation to control accounts", "Explained: shows that debits equal credits and that the lists agree with the control accounts"],
    modelAnswer: "Control totals compare the number of records and the total of balances before and after the transfer; a difference shows that records were lost or changed. The opening trial balance and the lists of balances are also agreed to the control accounts, which shows that the data is complete and balanced.",
    hints: ["Think of one check on totals and one reconciliation."],
    explanation: "Two checks, each explained.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe parallel running and state one disadvantage.",
    points: ["The old and the new systems operate together for a period", "Their outputs are compared to find errors in the new system", "Disadvantage: double the work and cost, or staff overload"],
    modelAnswer: "In parallel running the old and new systems operate together and their results are compared so that errors in the new system can be found. A disadvantage is that staff must do the work twice, which costs time and money.",
    hints: ["What is compared, and what is the cost of running two systems?"],
    explanation: "Description, purpose and one drawback.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A supermarket chain in Harare with five shops is replacing its manual accounts with a computerised system. Evaluate whether it should use direct, parallel or phased changeover.",
    points: ["Direct: quick and cheap but a failure would leave no fallback in a large business", "Parallel: safest because the old system continues and results are compared", "Parallel: costs more because the work is done twice and staff may be overloaded", "Phased: starting with one shop limits risk and lets staff learn, but takes longer", "Links the choice to the business (several shops, high volume of transactions)", "Recommends a method with a reason, such as a phased changeover with parallel running in the first shop"],
    modelAnswer: "Direct changeover is quick and cheap but too risky for a chain with five shops, since a failure would stop the accounts with no fallback. Parallel running is safest because the old system continues, but it doubles the work. A phased changeover starting with one shop limits the risk and lets staff learn before the other shops change. The chain should use a phased changeover, with parallel running in the first shop.",
    hints: ["Compare at least two methods against the size of the business."],
    explanation: "A balanced evaluation compares the methods for this business and reaches a reasoned recommendation.",
  });

  // --- Practice structured 1 (8 marks)
  const s1 = { total: 53120, recs: 240, dup: 11, dupVal: 4260, closed: 17, over: 270 };
  const s1ct = chk(s1.total - s1.dupVal - s1.over, 48590);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Sipho's hardware business in Gweru has ${s1.recs} customer records in its old ledger with total balances of ${money(s1.total)}. Before transfer to a computerised system: ${s1.dup} duplicate records with balances totalling ${money(s1.dupVal)} are deleted; ${s1.closed} closed accounts with nil balances are deleted; and one balance that was overstated by ${money(s1.over)} is corrected.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: s1ct, wrong: [s1.total, r2(s1.total - s1.dupVal + s1.over)], stem: "Calculate the control total of balances expected in the new system.", explanation: "53,120 − 4,260 − 270 = 48,590." }),
      P.num({ label: "(b)", marks: 1, kind: "units", value: s1.recs - s1.dup - s1.closed, wrong: [s1.recs - s1.dup], stem: "Calculate the number of records expected in the new system.", explanation: "240 − 11 − 17 = 212." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the control total and the number of records are checked after the transfer.", points: ["To show that no records were lost or changed during the transfer", "A difference from the expected figures shows that an error has occurred and must be traced"], modelAnswer: "They show that no records were lost or changed. If either figure differs from the expected one, an error has occurred and must be traced.", explanation: "Control totals confirm completeness." }),
      P.manual({ label: "(d)", marks: 3, stem: "State **three** other checks which help to ensure the accuracy of the transferred data.", points: ["Agreeing the list of balances to the control account", "Checking that the opening trial balance agrees", "Testing the system and having an authorised person sign it off"], modelAnswer: "Agree the list of balances to the control account, check that the opening trial balance agrees, and test the system with sign-off by an authorised person.", explanation: "Any three valid checks." }),
    ],
    hints: ["Subtract the deleted amounts and records.", "Corrected overstatement reduces the total."],
    explanation: "This item practises control totals and checks during a transfer.",
  });

  // --- Practice structured 2 (10 marks)
  const s2 = { salesM: 37600, salesC: 37600, purM: 24150, purC: 24610, payM: 11320, payC: 11780 };
  b.struct({
    d: 4, skill: "EVALUATION", calculator: true,
    stem: `Rudo's bakery in Mutare runs its manual and computerised systems in parallel for one month. The outputs are:\n\n${table(["Output", `Manual ${U}`, `Computerised ${U}`], [["Credit sales", s2.salesM, s2.salesC], ["Credit purchases", s2.purM, s2.purC], ["Closing trade payables", s2.payM, s2.payC]])}\n\nThe difference in purchases is traced to one supplier's invoice that was entered twice in the new system.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: s2.purC - s2.purM, stem: "Calculate the difference in credit purchases between the two systems.", explanation: "24,610 − 24,150 = 460." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: s2.payC - s2.payM, wrong: [s2.purC - s2.purM + s2.payM], stem: "Calculate the difference in closing trade payables between the two systems.", explanation: "11,780 − 11,320 = 460. The duplicated invoice increases both purchases and payables." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain what Rudo should do about the difference and why.", points: ["Correct the duplicate entry in the new system (debit trade payables, credit purchases 460)", "Identify why the duplicate was possible, for example no duplicate invoice check, and fix it", "Continue parallel running until the outputs agree, because the error was found only by comparison"], modelAnswer: "She should cancel the duplicate entry (debit trade payables, credit purchases 460) and find out why it was accepted, for example by adding a check for duplicate invoice numbers. She should continue parallel running until the outputs agree.", explanation: "Correct the error, fix the cause, continue until the results agree." }),
      P.manual({ label: "(d)", marks: 4, stem: "Evaluate whether Rudo should now stop using the manual system.", points: ["Sales agree and the only difference has been explained", "One month is a short test; other types of transaction may not have been tested", "Risk of relying on the new system alone if other errors appear", "Justified conclusion, for example run for a further month and then switch"], modelAnswer: "Sales agree and the only difference has been explained, which is encouraging. However, one month is a short test and other types of transaction may not have occurred, so there could be other errors. She should continue for a further month with no differences before relying on the new system alone.", explanation: "A balanced judgement with a recommendation." }),
    ],
    hints: ["An invoice entered twice affects both purchases and payables.", "What does a difference during parallel running tell you?"],
    explanation: "This item practises interpreting the results of parallel running.",
  });

  // --- Flashcards
  b.card("DEFINITION", "Data cleansing", "Correcting or removing errors, duplicates and out-of-date records before data is transferred.");
  b.card("DEFINITION", "Control total", "A total (such as the number of records or the sum of balances) compared before and after a transfer to check completeness.");
  b.card("DEFINITION", "Direct changeover", "The old system stops and the new one starts on a set date. Cheap and quick but there is no fallback.");
  b.card("DEFINITION", "Parallel running", "The old and new systems run together and their outputs are compared. Safe but costly.");
  b.card("DEFINITION", "Phased changeover", "The new system is introduced one part at a time, limiting risk but taking longer.");
  b.card("FACT", "Stages of changeover", "Plan; cleanse data; transfer opening balances and check the trial balance; test; change over; sign off; review.");
  b.card("FACT", "Checks on transferred data", "Control totals, trial balance agreement, reconciliations, validation and verification checks, testing and sign-off.");
  b.card("CONCEPT", "Why an agreeing trial balance is not enough", "A record can be missing from both columns; counts of records and lists of balances must also be compared.");
  b.card("CONCEPT", "Risks of a changeover", "Loss or corruption of data, disruption, cost, errors carried across, resistance from staff.");
});
