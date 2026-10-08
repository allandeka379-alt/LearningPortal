// Builds content/concepts/accounting-o.json and the two Accounting syllabus files:
//   content/syllabi/zimsec/o-level/accounting/2015-2022.json     (Principles of Accounting, Forms 1-4)
//   content/syllabi/cambridge/igcse/accounting/2027-2029.json    (Cambridge IGCSE Accounting 0452)
// Sources (local only, not in git): .scratch/accounting/sources/zimsec-accounting.pdf (+ .txt, the Ministry file
// "Form 1-4 Accounting Syllabus.pdf"), 0452-2027-2029.pdf (+ .txt).
// Run from the repo root: node .scratch/accounting/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

// ---------------------------------------------------------------------------------------------------------------------
// Concept registry (one concept ≈ one lesson's worth of learning). Shared by both syllabi unless a description says
// otherwise. Terminology: ZIMSEC uses income statement, provision for doubtful debts, debtors/creditors (trade
// receivables/payables in its own lists), stock; Cambridge uses statement of profit or loss, allowance for
// irrecoverable debts, trade receivables/payables, inventory. Lessons teach both names.
const CONCEPTS = [
  // Fundamentals
  ["acc.fundamentals.purpose-of-accounting", "The purpose and importance of accounting", "Book-keeping versus accounting; why businesses keep records; the purposes of measuring profit or loss; the role of accounting information in monitoring progress and making decisions. Excludes the users of accounting information (acc.fundamentals.users)."],
  ["acc.fundamentals.key-terms", "Basic accounting terms", "Business, transaction, book-keeping, accounting, capital, assets (non-current and current), liabilities (non-current and current), income, expenses, profit and loss, drawings: definitions with everyday Zimbabwean business examples. Excludes the accounting equation itself."],
  ["acc.fundamentals.accounting-equation", "The accounting equation", "Assets = capital (owner's equity) + liabilities; rearranging it to find a missing figure; showing the effect of transactions (capital introduced, credit purchases, payments, profit, drawings) on the equation and on a simple statement of financial position."],
  ["acc.fundamentals.business-organisations", "Types of business activity and organisation", "Trading, manufacturing and service activities; sole traders (including vendors and small to medium enterprises), partnerships and limited companies compared (ownership, capital, liability, control, profit sharing); the advantages and disadvantages of operating as a sole trader. Partnership and company details are in acc.partnerships.formation and acc.companies.share-capital."],
  ["acc.fundamentals.users", "Users of accounting information", "Interested parties and what each uses accounting information for: owners, managers, employees, banks and lenders, investors, suppliers, customers, government and tax authorities (ZIMRA), club members, the public and environmental bodies; households as users (ZIMSEC)."],
  ["acc.fundamentals.accounting-cycle", "The accounting cycle", "ZIMSEC: the stages from transaction to source document, subsidiary book (book of prime entry), ledger, trial balance and financial statements; illustrating and explaining each stage in order."],
  // Technology
  ["acc.technology.manual-digital-records", "Manual and electronic (digital) methods of processing data", "Processing accounting data manually and electronically (computerised accounting, spreadsheets, digital documents and ledgers); the benefits and limitations of each for the original entry of transactions and for keeping ledgers; no specific software packages."],
  ["acc.technology.data-storage", "Storing accounting data safely and sustainably", "Cambridge 7.3: digital applications for all or part of the records; the need to store data safely and sustainably and the risks of not doing so; manual storage, data storage devices, cloud services and other digital services compared (advantages and disadvantages)."],
  // Documents
  ["acc.documents.source-documents", "Source (business) documents", "Invoices, debit notes, credit notes, receipts, cheques and cheque counterfoils, paying-in slips, vouchers, bank statements and statements of account: what each shows, who issues it, and which book of prime entry it is recorded in; documents produced manually or digitally."],
  // Books of prime entry
  ["acc.books.sales-purchases-journals", "Sales and purchases journals", "Recording credit sales and credit purchases of goods from invoices (net of trade discount), totalling the journals and posting to the personal accounts and to the sales and purchases accounts. Cash sales and non-goods purchases are excluded."],
  ["acc.books.returns-journals", "Sales returns and purchases returns journals", "Recording returns inwards and outwards from credit notes (and debit notes), posting to the personal accounts and the returns accounts; returns in the trading section of the income statement."],
  ["acc.books.cash-book", "The two-column cash book", "Cash and bank columns; the dual function of the cash book as a book of prime entry and a ledger account; recording receipts and payments by cash, cheque, debit and credit cards, online and bank transfers; contra entries; balancing; a bank overdraft as a credit balance."],
  ["acc.books.discounts-cash-book", "Trade and cash discounts; the three-column cash book", "Trade discount (not recorded in the ledger) and cash discount (discount allowed and discount received) calculated and treated correctly; the discount columns of the three-column cash book and posting their totals."],
  ["acc.books.petty-cash", "The petty cash book and the imprest system", "The purpose of petty cash; the imprest system and restoring the float; the analysed petty cash book and posting its analysis columns; the benefits and limitations of keeping cash on the business premises."],
  ["acc.books.general-journal", "The general journal (journal proper)", "Uses of the general journal: opening entries, credit purchase and sale of non-current assets, writing off irrecoverable debts, transfers, drawings of goods and correction of errors; layout with narratives; posting and interpreting journal entries. Correction-of-error entries are taught in acc.verification.correcting-errors."],
  // Ledger
  ["acc.ledger.double-entry", "The double entry system", "Every transaction has two equal and opposite entries; rules of debit and credit for assets, liabilities, capital, income and expenses; classifying transactions and accounts (personal, real and nominal); recording transactions in T accounts."],
  ["acc.ledger.posting-balancing", "Posting, balancing and interpreting ledger accounts", "Posting from the books of prime entry; balancing accounts (balance c/d and b/d); the three-column running balance format; interpreting what an entry or a balance means; folio columns (ZIMSEC only: Cambridge candidates need not use them)."],
  ["acc.ledger.divisions", "Divisions of the ledger", "The sales ledger (trade receivables ledger), purchases ledger (trade payables ledger) and nominal (general) ledger, and which accounts each holds; why the ledger is divided; ledgers kept digitally."],
  ["acc.ledger.closing-entries", "Closing entries and transfers to the financial statements", "Transferring income and expense balances to the income statement (statement of profit or loss) at the year end by ledger transfers or journal entries; profit and drawings transferred to capital; balances carried down to the statement of financial position."],
  // Verification
  ["acc.verification.trial-balance", "The trial balance", "The purposes and limitations of a trial balance; extracting it from ledger balances or a list of balances; deciding whether each balance is a debit or a credit; amending a trial balance that contains errors."],
  ["acc.verification.errors-not-revealed", "Errors that do not affect the trial balance", "The six types: omission, commission, principle, original entry, complete reversal and compensating errors; identifying and explaining each, with examples."],
  ["acc.verification.correcting-errors", "Correcting errors with journal entries", "Writing journal entries (with narratives) to correct the six types of error and other posting errors, without a suspense account."],
  ["acc.verification.suspense-account", "The suspense account", "Opening a suspense account to balance a trial balance temporarily; correcting errors that affect trial balance agreement through the suspense account; preparing the suspense account and the journal entries that clear it."],
  ["acc.verification.errors-effect-on-profit", "The effect of errors on profit and the statement of financial position", "Statements of corrected (revised) profit after errors are corrected; effects on gross profit and profit for the year; corrected statement of financial position items (extracts)."],
  ["acc.verification.updating-cash-book", "Bank statements and updating the cash book", "The purpose of the bank statement (from the bank's point of view); items the cash book omits (bank charges, interest paid and received, credit transfers, direct debits, standing orders, dishonoured cheques) and errors in the cash book; preparing the updated cash book (bank columns)."],
  ["acc.verification.bank-reconciliation", "Bank reconciliation statements", "The definition, importance and preparation of a bank reconciliation statement: unpresented cheques, uncredited (outstanding) deposits and bank errors; starting from either balance; treatment of a bank overdraft; causes of differences; the impact of digital transactions on the process."],
  ["acc.verification.sales-ledger-control", "Control accounts: purpose and the sales ledger control account", "The purposes and types of control accounts; the books of prime entry as sources of information; preparing a sales ledger (trade receivables) control account with credit sales, receipts, discounts allowed, returns, irrecoverable debts, dishonoured cheques, interest on overdue accounts, contras, refunds, and debit and credit opening and closing balances. Reconciling control accounts with ledger lists is excluded."],
  ["acc.verification.purchases-ledger-control", "The purchases ledger control account", "Preparing a purchases ledger (trade payables) control account with credit purchases, payments, discounts received, returns, contras, refunds, and debit and credit balances; the impact of digital recording on control accounts."],
  // Adjustments and procedures
  ["acc.adjustments.capital-revenue", "Capital and revenue expenditure and receipts", "Definitions and the distinction between capital and revenue expenditure (and Cambridge: capital and revenue receipts) with examples; how each is accounted for in the income statement and statement of financial position."],
  ["acc.adjustments.capital-revenue-errors", "Effects of incorrectly classifying expenditure", "Identifying and calculating the effect of treating capital expenditure as revenue (and the reverse) on profit, on non-current asset values and on working capital items."],
  ["acc.adjustments.depreciation-methods", "Depreciation: causes and methods", "The meaning and causes of depreciation and the need to provide for it (matching); calculating depreciation by the straight-line, reducing-balance and revaluation methods; choosing a suitable method for different non-current assets."],
  ["acc.adjustments.depreciation-accounts", "Recording depreciation in the ledger", "Journal entries and ledger accounts for depreciation: the non-current asset account at cost, the provision for depreciation (accumulated depreciation) account and the depreciation expense; showing cost, accumulated depreciation and net book value in the statement of financial position."],
  ["acc.adjustments.disposal", "Disposal of non-current assets", "Journal entries for the purchase and sale of non-current assets; the disposal account; calculating the profit or loss on disposal and showing it in the income statement."],
  ["acc.adjustments.accrued-prepaid-expenses", "Accrued and prepaid expenses", "The matching (accruals) concept applied to expenses: calculating accruals and prepayments, adjusting expense figures in the income statement and showing other payables and other receivables in the statement of financial position; ledger accounts and journal entries with opening and closing accruals and prepayments."],
  ["acc.adjustments.accrued-prepaid-income", "Accrued and prepaid income", "Income such as rent and commission receivable earned but not received, or received in advance: adjusting the income figure, the statement of financial position entries, and the ledger accounts and journal entries."],
  ["acc.adjustments.irrecoverable-debts", "Irrecoverable debts and debts recovered", "Writing off irrecoverable (bad) debts by journal and ledger entries; irrecoverable debts recovered; the effect on profit and on trade receivables."],
  ["acc.adjustments.allowance-doubtful-debts", "Allowance (provision) for irrecoverable (doubtful) debts", "Why an allowance is kept (prudence); creating, increasing and reducing the allowance; the allowance account, the income statement entry for the change and trade receivables net of the allowance in the statement of financial position. ZIMSEC calls it the provision for doubtful debts."],
  ["acc.adjustments.provision-discounts", "Provision for discounts allowable", "ZIMSEC: creating and adjusting a provision for discounts allowable on trade receivables (calculated after the provision for doubtful debts), its ledger account and its effect on the income statement and statement of financial position."],
  ["acc.adjustments.inventory-valuation", "Valuation of inventory", "Cambridge 4.5: valuing inventory at the lower of cost and net realisable value; calculating the value of inventory; the effect of an incorrect inventory valuation on gross profit, profit for the year, equity and asset values."],
  // Financial statements
  ["acc.statements.income-statement", "The income statement (statement of profit or loss)", "The trading section (revenue less returns, cost of sales with opening and closing inventory, purchases, returns and carriage inwards), gross profit, other income, expenses and profit for the year of a sole trader in trading or service businesses; vertical layout; the names used by each board."],
  ["acc.statements.financial-position", "The statement of financial position", "Classifying and presenting non-current (tangible and intangible) assets, current assets, current liabilities, non-current liabilities and capital (opening capital, profit, drawings); working capital; drawings of cash, goods and other assets and private expenses paid by the business."],
  ["acc.statements.adjusted-statements", "Sole trader financial statements with year-end adjustments", "Preparing a full income statement and statement of financial position from a trial balance with year-end adjustments (depreciation, accruals and prepayments, irrecoverable debts and the allowance, drawings of goods, closing inventory); the effect of a change in one balance on other figures; interpreting the statements."],
  ["acc.statements.departmental", "Departmental accounts", "ZIMSEC: the purpose of departmental trading accounts; preparing them in columnar form; apportioning expenses between departments on a given basis; the combined profit and loss account (income statement) and statement of financial position."],
  ["acc.manufacturing.costs", "Manufacturing costs", "Direct and indirect costs; direct materials, direct labour and direct expenses; prime cost; factory overheads; adjusting for work in progress; calculating the factory (production) cost of goods completed."],
  ["acc.manufacturing.accounts", "Manufacturing accounts and the financial statements of a manufacturer", "Preparing a manufacturing account, then the income statement (cost of sales using the production cost of finished goods) and the statement of financial position with three kinds of inventory (raw materials, work in progress, finished goods), with year-end adjustments."],
  ["acc.partnerships.formation", "Partnerships: formation and the partnership agreement", "What a partnership is and why partnerships are formed; their advantages and disadvantages; the importance and usual contents of a partnership agreement (capital, profit-sharing ratio, interest on capital and drawings, salaries, interest on loans). Dissolution, admission and changes to the profit-sharing ratio are excluded."],
  ["acc.partnerships.appropriation", "The partnership appropriation account", "Preparing the statement of profit or loss and the appropriation account: interest on partners' loans (an expense), interest on capital, partners' salaries, interest on drawings and the division of the remaining profit or loss in the profit-sharing ratio."],
  ["acc.partnerships.capital-current-accounts", "Partners' capital and current accounts", "The uses of and differences between fixed capital accounts and current accounts; preparing them in ledger (columnar) form and in the statement of financial position, including debit current account balances."],
  ["acc.companies.share-capital", "Limited companies: share capital and loan capital", "Limited liability and the advantages and disadvantages of operating as a limited company; equity; ordinary and preference shares; authorised, issued, called-up and paid-up share capital; debentures (loan capital); dividends; general reserve and retained earnings (retained profits); shareholders' funds."],
  ["acc.companies.financial-statements", "Financial statements of limited companies", "Preparing the statement of profit or loss, the statement of changes in equity (share capital, general reserve, retained earnings: profit, dividends paid, transfers) and the statement of financial position (equity and liabilities extracts) of a limited company, with sole trader adjustments."],
  // Clubs and societies
  ["acc.clubs.receipts-payments", "Not-for-profit organisations and the receipts and payments account", "Clubs and societies: key terms (surplus, deficit, accumulated fund, subscriptions, donations); sources of income; preparing a receipts and payments account and its limitations."],
  ["acc.clubs.subscriptions-activities", "Subscriptions and revenue-generating activities", "The subscriptions account with arrears and payments in advance at the start and end of the year; trading accounts (or statements) for revenue-generating activities such as a refreshment bar, shop or project; deducing missing figures from them."],
  ["acc.clubs.income-expenditure", "Income and expenditure accounts and the club's statement of financial position", "Preparing an income and expenditure account (surplus or deficit) and the statement of financial position; calculating the opening accumulated fund; applying sole trader adjustments to clubs."],
  // Incomplete records
  ["acc.incomplete.statement-of-affairs", "Single entry, statements of affairs and profit from changes in capital", "Why some businesses keep incomplete records instead of full double entry, and the advantages and disadvantages; preparing opening and closing statements of affairs; calculating profit or loss as closing capital less opening capital plus drawings less capital introduced."],
  ["acc.incomplete.missing-figures", "Calculating missing figures", "Using total trade receivables and trade payables accounts, cash and bank summaries and expense accounts to find credit sales, credit purchases, expenses, drawings, receivables and payables from incomplete information."],
  ["acc.incomplete.financial-statements", "Financial statements from incomplete records", "Preparing the income statement and statement of financial position of a sole trader from incomplete records, using mark-up, margin and inventory turnover to find missing figures such as sales, cost of sales and closing inventory. Cambridge restricts this to trading businesses."],
  // Analysis
  ["acc.analysis.profitability-ratios", "Profitability ratios", "Gross profit margin, mark-up, profit margin (net profit percentage) and (Cambridge) return on capital employed: formulas, calculating them from financial statements, and what each shows. Cambridge accepts only the formulas printed in its syllabus."],
  ["acc.analysis.liquidity-ratios", "Liquidity ratios", "The current (working capital) ratio and the acid test (quick or liquid) ratio: calculating them and presenting each as a ratio (for example 1.8 : 1), and what they show about the ability to pay short-term debts."],
  ["acc.analysis.efficiency-ratios", "Efficiency ratios", "Rate of inventory turnover (times) using average inventory; and (Cambridge) inventory turnover in days, trade receivables turnover in days and trade payables turnover in days: calculating and explaining them."],
  ["acc.analysis.mark-up-margin", "Mark-up and margin: converting and finding missing figures", "The relationship between mark-up (on cost) and margin (on selling price), converting one to the other, and using either to find sales, cost of sales, gross profit or closing inventory."],
  ["acc.analysis.interpretation", "Interpreting financial statements and ratios", "Comparing results for different years; interpreting profitability, liquidity and efficiency ratios; suggesting ways to improve profitability, liquidity and working capital; how inventory valuation, sales volume and prices affect gross profit; how other income and expenses affect profit; why profit and cash differ."],
  ["acc.analysis.inter-business-comparison", "Comparing two businesses", "Cambridge 6.3: the factors that may make the ratios of two businesses differ and the problems of comparing businesses (different accounting policies, sizes, dates, types of business, one-year data)."],
  ["acc.analysis.limitations", "Limitations of accounting statements", "Cambridge 6.5: historic cost, the effect of chosen accounting policies, and non-financial factors (workforce skills, location, economic climate) that the statements do not show."],
  // Concepts and ethics
  ["acc.concepts.foundation-concepts", "Accounting concepts: business entity, duality, money measurement, historic cost and going concern", "What each concept means and how it is applied in the records and statements, with examples of breaches. ZIMSEC lists going concern, historical cost and double entry (duality); Cambridge lists all five."],
  ["acc.concepts.applied-concepts", "Accounting concepts: matching, prudence, consistency, materiality and realisation", "What each concept means and how it shapes year-end adjustments (accruals, depreciation, allowances, inventory valuation, revenue recognition). ZIMSEC lists matching (accrual), prudence and consistency; Cambridge lists all five."],
  ["acc.ethics.professional-ethics", "Business and professional ethics in accounting", "The need for an ethical framework; integrity, objectivity, professional competence and due care, confidentiality and professional behaviour (Cambridge), and professionalism, compliance and Unhu/Ubuntu/Vumunhu (ZIMSEC); applying ethics in day-to-day business transactions and its significance to stakeholders and society."],
];
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. Objectives are our own paraphrase; codes add .n to the node code.
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, children } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) n.objectives = objectives.map((text, i) => ({ code: `${code}.${i + 1}`, text }));
  if (components) n.components = components;
  if (children) n.children = children;
  return n;
};
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);

// ---------------------------------------------------------------------------------------------------------------------
// ZIMSEC O-Level Principles of Accounting, Forms 1-4, 2015-2022. Topic order and names follow the topic list (6.0);
// the form in which each item is taught (scope and sequence 7.0, competency matrix 8.0) is given in the objectives.
const ZIMSEC_TOPICS = [
  topic("introduction", "1", "Introduction to Principles of Accounting", {
    description: "Form 1: accounting terms, types of business activity and organisation, the importance of accounting and its users.",
    covers: ["acc.fundamentals.purpose-of-accounting", "acc.fundamentals.key-terms", "acc.fundamentals.accounting-equation", "acc.fundamentals.business-organisations", "acc.fundamentals.users"],
    objectives: [
      "Form 1: define business, accounting, transaction, book-keeping, capital, assets, liabilities, income, expenses and profit.",
      "Form 1: state, explain and distinguish trading, manufacturing and service activities and sole proprietors, partnerships and limited companies.",
      "Form 1: explain why accounting is important and identify the users of accounting information.",
    ],
  }),
  topic("accounting-cycle", "2", "The Accounting Cycle", {
    description: "Form 1: transactions, source documents, subsidiary books, ledger, trial balance and financial statements.",
    covers: ["acc.fundamentals.accounting-cycle"],
    objectives: ["Form 1: define, illustrate and explain the stages of the accounting cycle in order."],
  }),
  topic("data-processing", "3", "Data Processing Methods: Manual and Electronic", {
    description: "Forms 1 and 3: manual and electronic methods of processing accounting data.",
    covers: ["acc.technology.manual-digital-records"],
    objectives: [
      "Form 1: name the methods of processing accounting data and list the advantages and disadvantages of each.",
      "Form 3: apply manual methods and demonstrate the use of electronic methods of processing data.",
    ],
  }),
  topic("source-documents", "4", "Source Documents", {
    description: "Form 1: receipts, cheques, invoices, debit notes, credit notes, vouchers, bank statements and statements of account.",
    covers: ["acc.documents.source-documents"],
    objectives: ["Form 1: describe each source document, explain its significance and match it to the subsidiary book in which it is recorded."],
  }),
  topic("subsidiary-books", "5", "Subsidiary Books", {
    description: "Forms 1 to 3: the books of original entry.",
    children: [
      sub("subsidiary-books.cash-books", "5.1", "Cash books", {
        description: "Form 1: the two-column cash book. Form 2: the three-column cash book, trade and cash discounts.",
        covers: ["acc.books.cash-book", "acc.books.discounts-cash-book"],
        objectives: [
          "Form 1: record transactions in a two-column cash book and interpret its entries.",
          "Form 2: define and calculate trade and cash discounts and record transactions in a three-column cash book.",
        ],
      }),
      sub("subsidiary-books.journals", "5.2", "Sales, purchases and returns journals", {
        description: "Form 1: sales journal, purchases journal, sales returns journal and purchases returns journal.",
        covers: ["acc.books.sales-purchases-journals", "acc.books.returns-journals"],
        objectives: [
          "Form 1: label the columns of the subsidiary books, classify transactions and record them in the correct journal.",
          "Form 1: explain and interpret the entries in the subsidiary books.",
        ],
      }),
      sub("subsidiary-books.petty-cash", "5.3", "Petty cash book", {
        description: "Form 2: the purpose and use of the petty cash book.",
        covers: ["acc.books.petty-cash"],
        objectives: ["Form 2: explain the purpose of the petty cash book and record transactions in it."],
      }),
      sub("subsidiary-books.general-journal", "5.4", "General journal", {
        description: "Forms 2 and 3: the general journal (journal proper).",
        covers: ["acc.books.general-journal"],
        objectives: ["Forms 2 and 3: state the uses of the general journal, prepare and post journal entries and interpret them."],
      }),
    ],
  }),
  topic("ledger", "6", "The Ledger", {
    description: "Forms 1 to 3: classification, posting and balancing of ledger accounts, folio numbers and the types of ledger.",
    covers: ["acc.ledger.double-entry", "acc.ledger.posting-balancing", "acc.ledger.divisions"],
    objectives: [
      "Form 1: classify transactions, post entries from the subsidiary books to the ledger and balance the accounts.",
      "Forms 2 and 3: use folio numbers and post entries to the trade receivables ledger, trade payables ledger and general ledger.",
      "Forms 1 to 3: explain the entries in ledger accounts and interpret their final balances.",
    ],
  }),
  topic("trial-balance-errors", "7", "Trial Balance and Errors", {
    description: "Forms 1 to 4: preparing a trial balance, errors, the suspense account and the effect of errors on profit.",
    children: [
      sub("trial-balance-errors.trial-balance", "7.1", "The trial balance", {
        description: "Forms 1 and 2: purpose and preparation.",
        covers: ["acc.verification.trial-balance"],
        objectives: ["Forms 1 and 2: define a trial balance, explain its purposes and construct one from ledger balances."],
      }),
      sub("trial-balance-errors.errors", "7.2", "Errors not revealed by the trial balance", {
        description: "Form 2: errors that do not affect trial balance agreement.",
        covers: ["acc.verification.errors-not-revealed"],
        objectives: ["Form 2: state and explain the errors that a trial balance does not reveal."],
      }),
      sub("trial-balance-errors.correction", "7.3", "Correction of errors and the suspense account", {
        description: "Form 3: correction of errors, the suspense account and correcting the trial balance.",
        covers: ["acc.verification.correcting-errors", "acc.verification.suspense-account"],
        objectives: ["Form 3: correct errors by journal entries, open and clear a suspense account and correct the trial balance."],
      }),
      sub("trial-balance-errors.effect-on-profit", "7.4", "Effect of errors on profit", {
        description: "Form 4: adjustments to gross and net profit and revised statements after the correction of errors.",
        covers: ["acc.verification.errors-effect-on-profit"],
        objectives: [
          "Form 4: explain the effect of errors on profit and adjust gross or net profit after correcting them.",
          "Form 4: prepare revised statements of profit and of financial position (extracts) after the correction of errors.",
        ],
      }),
    ],
  }),
  topic("accounting-concepts", "8", "Accounting Concepts", {
    description: "Form 3 (scope and sequence): matching/accrual, prudence, going concern, consistency, historical cost and double entry.",
    covers: ["acc.concepts.foundation-concepts", "acc.concepts.applied-concepts"],
    objectives: ["Form 3: explain the listed accounting concepts and apply them in preparing financial statements."],
  }),
  topic("financial-statements", "9", "End of Year Financial Statements", {
    description: "Forms 2 and 3: the income statement and statement of financial position, closing entries and the interpretation of financial statements.",
    children: [
      sub("financial-statements.income-statement", "9.1", "Income statement", {
        description: "Forms 2 and 3.",
        covers: ["acc.statements.income-statement"],
        objectives: ["Form 2: define the income statement, explain why it is needed and draw one up for a sole trader."],
      }),
      sub("financial-statements.financial-position", "9.2", "Statement of financial position", {
        description: "Forms 2 and 3.",
        covers: ["acc.statements.financial-position"],
        objectives: ["Form 2: define the statement of financial position and prepare one for a sole trader."],
      }),
      sub("financial-statements.closing-entries", "9.3", "Closing entries", {
        description: "Form 3 (scope and sequence).",
        covers: ["acc.ledger.closing-entries"],
        objectives: ["Form 3: make the closing entries that transfer income and expenses to the income statement."],
      }),
      sub("financial-statements.interpretation", "9.4", "Interpretation of financial statements", {
        description: "Form 3 (scope and sequence).",
        covers: ["acc.analysis.interpretation"],
        objectives: ["Form 3: interpret financial statements for the benefit of their users."],
      }),
    ],
  }),
  topic("adjustments", "10", "End of Year Adjustments", {
    description: "Forms 2 and 3: accruals and prepayments, depreciation and disposals, provisions, and financial statements with adjustments.",
    children: [
      sub("adjustments.accruals-prepayments", "10.1", "Accruals and prepayments", {
        description: "Form 2: for income and expenses in the financial statements only (ledger accounts not required). Form 3: ledger accounts of income and expenses.",
        covers: ["acc.adjustments.accrued-prepaid-expenses", "acc.adjustments.accrued-prepaid-income"],
        objectives: [
          "Form 2: define accruals and prepayments and show the adjustments in end-of-year financial statements.",
          "Form 3: prepare ledger accounts for income and expenses with accruals and prepayments.",
        ],
      }),
      sub("adjustments.depreciation", "10.2", "Depreciation and disposal of non-current assets", {
        description: "Form 2: causes of depreciation, straight-line and reducing-balance methods. Form 3: accounting for depreciation (including the revaluation method) and disposals.",
        covers: ["acc.adjustments.depreciation-methods", "acc.adjustments.depreciation-accounts", "acc.adjustments.disposal"],
        objectives: [
          "Form 2: define depreciation, state its causes and calculate it by the straight-line and reducing-balance methods.",
          "Form 3: account for depreciation by the straight-line, reducing-balance and revaluation methods.",
          "Form 3: record the disposal of non-current assets.",
        ],
      }),
      sub("adjustments.provisions", "10.3", "Provisions for doubtful debts and discounts allowable", {
        description: "Form 3 (scope and sequence). Writing off bad (irrecoverable) debts is not listed separately but underlies the provision for doubtful debts.",
        covers: ["acc.adjustments.irrecoverable-debts", "acc.adjustments.allowance-doubtful-debts", "acc.adjustments.provision-discounts"],
        objectives: ["Form 3: create and adjust provisions for doubtful debts and for discounts allowable and record them."],
      }),
      sub("adjustments.statements", "10.4", "Income statement and statement of financial position with adjustments", {
        description: "Form 3 (scope and sequence).",
        covers: ["acc.statements.adjusted-statements"],
        objectives: ["Form 3: prepare the income statement and statement of financial position after year-end adjustments."],
      }),
    ],
  }),
  topic("capital-revenue", "11", "Capital and Revenue Expenditure", {
    description: "Form 2: definitions and differences. Form 3: accounting treatment and the effects of incorrect classification.",
    covers: ["acc.adjustments.capital-revenue", "acc.adjustments.capital-revenue-errors"],
    objectives: [
      "Form 2: define and distinguish capital and revenue expenditure.",
      "Form 3: show capital and revenue expenditure correctly in the financial statements.",
      "Form 3: state the effects of incorrect classification on profit, non-current assets and working capital.",
    ],
  }),
  topic("control-accounts", "12", "Control Accounts", {
    description: "Form 3: purposes, types, sources of information and preparation.",
    covers: ["acc.verification.sales-ledger-control", "acc.verification.purchases-ledger-control"],
    objectives: [
      "Form 3: define control accounts, state their purposes, name their types and identify their sources of information.",
      "Form 3: prepare sales ledger and purchases ledger control accounts.",
    ],
  }),
  topic("bank-reconciliation", "13", "Bank Reconciliation", {
    description: "Form 2: bank reconciliation statements. Form 3: errors, the updated cash book and bank overdrafts.",
    covers: ["acc.verification.updating-cash-book", "acc.verification.bank-reconciliation"],
    objectives: [
      "Form 2: define bank reconciliation statements, explain their importance, state the causes of differences and prepare them.",
      "Form 3: identify errors in the cash book and bank statement and draw up an updated cash book.",
      "Form 3: prepare bank reconciliation statements, including the treatment of a bank overdraft.",
    ],
  }),
  topic("ratios", "14", "Accounting Ratios", {
    description: "Form 4: profitability ratios (mark-up, margin, net profit percentage) and liquidity ratios (current ratio, quick ratio, rate of inventory turnover).",
    covers: ["acc.analysis.profitability-ratios", "acc.analysis.liquidity-ratios", "acc.analysis.efficiency-ratios", "acc.analysis.mark-up-margin"],
    objectives: [
      "Form 4: recall the profitability and liquidity ratio formulae and compute the ratios.",
      "Form 4: apply the ratios to arrive at missing figures.",
    ],
  }),
  topic("incomplete-records", "15", "Single Entry and Incomplete Records", {
    description: "Form 4: statements of affairs, missing figures and financial statements.",
    covers: ["acc.incomplete.statement-of-affairs", "acc.incomplete.missing-figures", "acc.incomplete.financial-statements"],
    objectives: [
      "Form 4: define the terms and calculate opening and closing capital using statements of affairs.",
      "Form 4: calculate missing sales, purchases, expenses, gross profit, net profit, drawings and income.",
      "Form 4: draw up end-of-year financial statements from incomplete records.",
    ],
  }),
  topic("not-for-profit", "16", "Not for Profit Making Organisations (Non-Trading Concerns)", {
    description: "Form 2: key terms, receipts and payments accounts, income and expenditure accounts and statements of financial position. Form 4: sources of income, subscriptions accounts, missing figures and trading accounts of profit-making projects.",
    covers: ["acc.clubs.receipts-payments", "acc.clubs.subscriptions-activities", "acc.clubs.income-expenditure"],
    objectives: [
      "Form 2: define surplus, deficit, accumulated fund and subscriptions, and draw up receipts and payments accounts.",
      "Form 2: prepare simple income and expenditure accounts and statements of financial position.",
      "Form 4: state sources of income, construct subscriptions accounts with adjustments and deduce missing figures.",
      "Form 4: compile trading accounts for profit-making projects and prepare income and expenditure accounts and statements of financial position.",
    ],
  }),
  topic("departmental-accounts", "17", "Departmental Accounts", {
    description: "Form 3: departmental trading accounts, apportionment of expenses and the combined profit and loss account.",
    covers: ["acc.statements.departmental"],
    objectives: [
      "Form 3: state the purpose of departmental trading accounts and prepare them in columnar form.",
      "Form 3: apportion expenses among departments and draw up a combined profit and loss account and statement of financial position.",
    ],
  }),
  topic("manufacturing-accounts", "18", "Manufacturing Accounts", {
    description: "Form 4: direct and indirect costs, prime cost, work in progress, income statements and statements of financial position.",
    covers: ["acc.manufacturing.costs", "acc.manufacturing.accounts"],
    objectives: [
      "Form 4: define and classify manufacturing costs.",
      "Form 4: prepare manufacturing accounts, income statements and statements of financial position.",
    ],
  }),
  topic("partnerships", "19", "Partnership Formation: End of Year Financial Statements", {
    description: "Form 4: formation, advantages and disadvantages, income statements, appropriation accounts, capital and current accounts and statements of financial position.",
    covers: ["acc.partnerships.formation", "acc.partnerships.appropriation", "acc.partnerships.capital-current-accounts"],
    objectives: [
      "Form 4: define a partnership, state reasons for forming one and outline the importance and contents of a partnership agreement.",
      "Form 4: prepare appropriation accounts.",
      "Form 4: prepare current and capital accounts and statements of financial position showing current accounts within or outside the statement.",
    ],
  }),
  topic("company-accounts", "20", "Company Accounts", {
    description: "Form 4: terms (shares, debentures, share capital, shareholders' funds, dividends, reserves, retained profits), statements of changes in equity and statements of financial position (extracts).",
    covers: ["acc.companies.share-capital", "acc.companies.financial-statements"],
    objectives: [
      "Form 4: define company accounting terms, outline the capital structure of a company and state the advantages of forming a company.",
      "Form 4: prepare statements of changes in equity and statements of financial position (capital structure extracts).",
    ],
  }),
  topic("business-ethics", "21", "Business Ethics", {
    description: "Form 4: professionalism, integrity, confidentiality, competence, objectivity and compliance.",
    covers: ["acc.ethics.professional-ethics"],
    objectives: [
      "Form 4: define business ethics and identify the professional ethics in accounting.",
      "Form 4: apply business ethics in day-to-day business transactions.",
    ],
  }),
];

const zimsec = {
  board: "zimsec",
  qualification: "o-level",
  subject: "accounting",
  versionLabel: "2015-2022",
  family: "accounting-o",
  title: "ZIMSEC O-Level Principles of Accounting",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Principles of Accounting Syllabus, Forms 1 - 4, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at O Level",
    url: "https://www.mopsemashwest.gov.zw/files/Form%201-4%20Accounting%20Syllabus.pdf",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Topic names and their order are transcribed from the topic list (6.0) of the Ministry's Principles of Accounting Syllabus Forms 1 - 4 (2015 - 2022); the content of each topic and the form in which it is taught come from the scope and sequence (7.0) and the competency matrix (8.0). The document does not number its topics: every topic, sub-topic and objective code here is ours. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-08): the Mashonaland West provincial education office's copy of the Ministry document, file 'Form 1-4 Accounting Syllabus.pdf' (http://www.mopsemashwest.gov.zw/files/Form%201-4%20Accounting%20Syllabus.pdf; the site's https certificate has expired, so the https URL recorded here may not load), read through a text rendering. The cover prints 'Forms 1 - 4' and '2015 - 2022' and the copyright year 2015. The scope-and-sequence and competency-matrix tables come out of the text rendering with their columns scrambled; the form assigned to each item is read from the column positions and cross-checked against the matrix, and some items (accounting concepts, closing entries, provisions, depreciation by revaluation, correction of errors) appear only in the scope and sequence. Check every heading, the form of each item and each objective against a clean copy from ZIMSEC.",
    "Subject code: not printed in the syllabus document. ZIMSEC O-Level Principles of Accounting is commonly cited as 7112; confirm it (code left null).",
    "Version dates: assumed first examined in November 2018 (effectiveFrom 2018-01-01), as for the other 2015-2022 files. Under the Heritage-Based Curriculum (2024-2030) new syllabi were issued; confirm which syllabus the November 2026 and later O-Level Principles of Accounting examinations use, set effectiveTo, and create a new version file when a new syllabus replaces this one.",
    "Assessment (9.0) as read: continuous assessment 30% (theory tests, practical assignments and projects in Forms 1 to 4: Form 1 5%, Form 2 5%, Form 3 10%, Form 4 10%) and a summative examination 70%: Paper 1, 40 multiple-choice questions with four options, all compulsory (40 marks, 20% of the subject); Paper 2, five compulsory structured questions of 20 marks each (100 marks, 50% of the subject). The specification grid prints '1 1/2 hours' twice in a scrambled table; both papers are recorded as 1 hour 30 minutes, which must be confirmed (a 100-mark structured paper is often longer). Calculator rules are not stated.",
    "Assessment objective 2 allows ledger accounts in 'T' account, running balance or balanced journal format; content may use either the T-account or the three-column running balance layout.",
    "The document mixes older and newer terms (income statement, statement of financial position, trade receivables and payables, inventory, but also profit and loss account, provision for doubtful debts and stock in teaching practice); content uses the syllabus's terms and gives the Cambridge equivalents.",
    "Not in this syllabus (taught in the family for Cambridge IGCSE only): valuation of inventory at the lower of cost and net realisable value, data storage and sustainability, inter-business comparison and the limitations of accounting statements, return on capital employed and the receivables, payables and inventory-days ratios. The project and practical assignments are continuous assessment only and are not simulated.",
  ],
  overview: "The ZIMSEC O-Level Principles of Accounting syllabus (Forms 1-4) takes learners through the accounting cycle: source documents, subsidiary books, the ledger and trial balance, then end-of-year financial statements and adjustments for sole traders, followed by control accounts, bank reconciliation, ratios, incomplete records, non-trading concerns, departmental and manufacturing accounts, partnerships, company accounts and business ethics. It stresses practical skills for small to medium enterprises, enterprise and Unhu/Ubuntu/Vumunhu (good business ethics).",
  assessmentOverview: "Continuous assessment (theory tests, practical assignments and projects, Forms 1-4) carries 30%. The examination carries 70%: Paper 1 has 40 compulsory four-option multiple-choice questions (40 marks, 20%) and Paper 2 has five compulsory structured questions of 20 marks each (100 marks, 50%).",
  components: [
    { code: "1", name: "Paper 1: Multiple choice", kind: "MULTIPLE_CHOICE", description: "40 compulsory multiple-choice questions with four options each, covering the whole syllabus.", durationMinutes: 90, maxMarks: 40, weightingPercent: 20 },
    { code: "2", name: "Paper 2: Structured questions", kind: "WRITTEN", description: "Five compulsory structured questions of 20 marks each.", durationMinutes: 90, maxMarks: 100, weightingPercent: 50 },
  ],
  topics: ZIMSEC_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Cambridge IGCSE Accounting 0452, 2027-2029. Topic and subtopic headings and numbers are the board's.
const C0452_TOPICS = [
  topic("fundamentals", "1", "The fundamentals of accounting", {
    children: [
      sub("fundamentals.purpose", "1.1", "The purpose of accounting", {
        covers: ["acc.fundamentals.purpose-of-accounting"],
        objectives: [
          "Distinguish book-keeping from accounting.",
          "Explain why businesses measure profit and loss and how accounting information supports monitoring and decision-making.",
        ],
      }),
      sub("fundamentals.equation", "1.2", "The accounting equation", {
        covers: ["acc.fundamentals.key-terms", "acc.fundamentals.accounting-equation"],
        objectives: [
          "Explain assets, liabilities and owner's equity.",
          "State the accounting equation and apply it to find missing figures and show the effect of transactions.",
        ],
      }),
    ],
  }),
  topic("recording", "2", "Sources and recording of data", {
    children: [
      sub("recording.double-entry", "2.1", "The double entry system of book-keeping", {
        covers: ["acc.ledger.double-entry", "acc.ledger.posting-balancing", "acc.ledger.divisions", "acc.ledger.closing-entries"],
        objectives: [
          "Prepare ledger accounts and post transactions using double entry.",
          "Calculate balances, transfer them to the financial statements and interpret accounts and balances.",
          "Use the three-column running balance format.",
          "Explain the division of the ledger into sales, purchases and nominal (general) ledgers and how ledgers can be kept digitally (folio columns are not required).",
        ],
      }),
      sub("recording.documents", "2.2", "Business documents", {
        covers: ["acc.documents.source-documents"],
        objectives: [
          "Describe invoices, debit notes, credit notes, cheque counterfoils, paying-in slips, receipts, bank statements and statements of account.",
          "Use business documents, manual or digital, as sources of information for the records.",
        ],
      }),
      sub("recording.prime-entry", "2.3", "Books of prime entry", {
        covers: ["acc.books.sales-purchases-journals", "acc.books.returns-journals", "acc.books.cash-book", "acc.books.discounts-cash-book", "acc.books.petty-cash", "acc.books.general-journal", "acc.technology.manual-digital-records"],
        objectives: [
          "Process data in the cash book, petty cash book, sales, purchases and returns journals and the general journal, and post the ledger entries.",
          "Treat trade discount and cash discount correctly.",
          "Explain the dual function of the cash book and record receipts and payments by cash, cheque, card and transfer.",
          "Explain and apply the imprest system and weigh the benefits and limitations of keeping cash on the premises.",
          "Evaluate manual and digital methods for the original entry of transactions.",
        ],
      }),
    ],
  }),
  topic("verification", "3", "Verification of accounting records", {
    children: [
      sub("verification.trial-balance", "3.1", "The trial balance", {
        covers: ["acc.verification.trial-balance", "acc.verification.errors-not-revealed"],
        objectives: [
          "State the purposes and limitations of a trial balance.",
          "Prepare a trial balance from a list of balances and amend one that contains errors.",
          "Identify the six types of error that do not affect the trial balance.",
        ],
      }),
      sub("verification.errors", "3.2", "Correction of errors", {
        covers: ["acc.verification.correcting-errors", "acc.verification.suspense-account", "acc.verification.errors-effect-on-profit"],
        objectives: [
          "Correct errors using journal entries.",
          "Use and clear a suspense account.",
          "Adjust profit for the period after correcting errors and show the effect on the statement of financial position.",
        ],
      }),
      sub("verification.bank-reconciliation", "3.3", "Bank reconciliation", {
        covers: ["acc.verification.updating-cash-book", "acc.verification.bank-reconciliation"],
        objectives: [
          "Explain the use and purpose of a bank statement.",
          "Update the cash book for bank charges, interest, errors, credit transfers, direct debits and standing orders.",
          "Prepare a bank reconciliation statement with bank errors, uncredited deposits and unpresented cheques.",
          "Explain how digital transactions affect bank reconciliation.",
        ],
      }),
      sub("verification.control-accounts", "3.4", "Control accounts", {
        covers: ["acc.verification.sales-ledger-control", "acc.verification.purchases-ledger-control"],
        objectives: [
          "Explain the purposes of sales ledger and purchases ledger control accounts and their sources of information.",
          "Prepare sales and purchases ledger control accounts with the full range of entries and debit and credit balances.",
          "Explain the impact of digital recording on control accounts.",
        ],
      }),
    ],
  }),
  topic("procedures", "4", "Accounting procedures", {
    children: [
      sub("procedures.capital-revenue", "4.1", "Capital and revenue expenditure and receipts", {
        covers: ["acc.adjustments.capital-revenue", "acc.adjustments.capital-revenue-errors"],
        objectives: [
          "Distinguish and account for capital and revenue expenditure and capital and revenue receipts.",
          "Calculate the effect of incorrect treatment on profit and on asset values.",
        ],
      }),
      sub("procedures.depreciation", "4.2", "Accounting for depreciation and disposal of non-current assets", {
        covers: ["acc.adjustments.depreciation-methods", "acc.adjustments.depreciation-accounts", "acc.adjustments.disposal"],
        objectives: [
          "Explain the meaning of and need for depreciation.",
          "Calculate depreciation by the straight-line, reducing-balance and revaluation methods and choose a suitable method.",
          "Prepare journal entries and ledger accounts for depreciation and for the purchase and sale of non-current assets.",
          "Calculate the profit or loss on disposal.",
        ],
      }),
      sub("procedures.other-payables-receivables", "4.3", "Other payables and other receivables", {
        covers: ["acc.adjustments.accrued-prepaid-expenses", "acc.adjustments.accrued-prepaid-income"],
        objectives: [
          "Explain the importance of matching costs and revenues.",
          "Prepare journal entries and ledger accounts for accrued and prepaid expenses and incomes.",
        ],
      }),
      sub("procedures.irrecoverable-debts", "4.4", "Irrecoverable debts and allowance for irrecoverable debts", {
        covers: ["acc.adjustments.irrecoverable-debts", "acc.adjustments.allowance-doubtful-debts"],
        objectives: [
          "Record irrecoverable debts and irrecoverable debts recovered by journal and ledger entries.",
          "Explain the need for an allowance for irrecoverable debts and record its creation and adjustment.",
        ],
      }),
      sub("procedures.inventory", "4.5", "Valuation of inventory", {
        covers: ["acc.adjustments.inventory-valuation"],
        objectives: [
          "Value inventory at the lower of cost and net realisable value.",
          "Explain the effect of an incorrect inventory valuation on profit, equity and assets.",
        ],
      }),
    ],
  }),
  topic("statements", "5", "Preparation of financial statements", {
    children: [
      sub("statements.sole-traders", "5.1", "Sole traders", {
        covers: ["acc.fundamentals.business-organisations", "acc.statements.income-statement", "acc.statements.financial-position", "acc.statements.adjusted-statements"],
        objectives: [
          "State the advantages and disadvantages of operating as a sole trader.",
          "Prepare statements of profit or loss for trading, service and manufacturing businesses.",
          "Prepare statements of financial position, classifying assets, liabilities and capital.",
          "Make adjustments for depreciation, accruals and prepayments, irrecoverable debts and the allowance, and drawings.",
        ],
      }),
      sub("statements.partnerships", "5.2", "Partnerships", {
        covers: ["acc.partnerships.formation", "acc.partnerships.appropriation", "acc.partnerships.capital-current-accounts"],
        objectives: [
          "State the advantages and disadvantages of partnerships and the contents of a partnership agreement.",
          "Prepare statements of profit or loss and appropriation accounts with interest, salaries and the share of profit.",
          "Prepare partners' capital and current accounts and the statement of financial position.",
        ],
      }),
      sub("statements.companies", "5.3", "Limited companies", {
        covers: ["acc.companies.share-capital", "acc.companies.financial-statements"],
        objectives: [
          "Explain limited liability, equity, the capital structure and the features of shares and debentures.",
          "Prepare a statement of profit or loss, a statement of changes in equity and a statement of financial position for a limited company.",
        ],
      }),
      sub("statements.manufacturing", "5.4", "Manufacturing accounts", {
        covers: ["acc.manufacturing.costs", "acc.manufacturing.accounts"],
        objectives: [
          "Classify direct and indirect costs and calculate prime cost and the factory cost of production, adjusting for work in progress.",
          "Prepare manufacturing accounts, statements of profit or loss and statements of financial position.",
        ],
      }),
      sub("statements.clubs", "5.5", "Clubs and societies", {
        covers: ["acc.clubs.receipts-payments", "acc.clubs.subscriptions-activities", "acc.clubs.income-expenditure"],
        objectives: [
          "Prepare receipts and payments accounts.",
          "Prepare accounts for revenue-generating activities and subscriptions.",
          "Prepare income and expenditure accounts and statements of financial position and calculate the accumulated fund.",
        ],
      }),
      sub("statements.incomplete-records", "5.6", "Incomplete records", {
        covers: ["acc.incomplete.statement-of-affairs", "acc.incomplete.missing-figures", "acc.incomplete.financial-statements", "acc.analysis.mark-up-margin"],
        objectives: [
          "Explain why businesses keep incomplete records and the advantages and disadvantages.",
          "Prepare statements of affairs and calculate profit from changes in capital.",
          "Calculate missing figures and prepare financial statements from incomplete records, using mark-up, margin and inventory turnover.",
        ],
      }),
    ],
  }),
  topic("analysis", "6", "Analysis and interpretation", {
    children: [
      sub("analysis.ratios", "6.1", "Calculation and understanding of accounting ratios", {
        covers: ["acc.analysis.profitability-ratios", "acc.analysis.liquidity-ratios", "acc.analysis.efficiency-ratios"],
        objectives: [
          "Calculate gross profit margin, mark-up, profit margin and return on capital employed.",
          "Calculate the current ratio and the acid test ratio.",
          "Calculate the rate of inventory turnover and inventory, trade receivables and trade payables turnover in days.",
        ],
      }),
      sub("analysis.interpretation", "6.2", "Interpretation of accounting ratios", {
        covers: ["acc.analysis.interpretation"],
        objectives: [
          "Prepare and comment on comparisons of results for different years and interpret the ratios.",
          "Suggest improvements to profitability, liquidity and working capital.",
          "Explain what affects gross profit and profit for the year and why cash and profit differ.",
        ],
      }),
      sub("analysis.comparison", "6.3", "Inter-business comparison", {
        covers: ["acc.analysis.inter-business-comparison"],
        objectives: ["Explain the factors that affect two businesses' ratios and the problems of comparing them."],
      }),
      sub("analysis.interested-parties", "6.4", "Interested parties", {
        covers: ["acc.fundamentals.users"],
        objectives: ["Explain how each interested party uses accounting information to make decisions."],
      }),
      sub("analysis.limitations", "6.5", "Limitations of accounting statements", {
        covers: ["acc.analysis.limitations"],
        objectives: ["Explain the limitations of accounting statements: historic cost, accounting policies and non-financial factors."],
      }),
    ],
  }),
  topic("concepts-practice", "7", "Accounting concepts and modern practice", {
    children: [
      sub("concepts-practice.concepts", "7.1", "Accounting concepts", {
        covers: ["acc.concepts.foundation-concepts", "acc.concepts.applied-concepts"],
        objectives: ["Explain and apply business entity, consistency, duality, going concern, historic cost, matching, materiality, money measurement, prudence and realisation."],
      }),
      sub("concepts-practice.ethics", "7.2", "Ethical considerations", {
        covers: ["acc.ethics.professional-ethics"],
        objectives: [
          "Explain the need for an ethical framework in accounting and its fundamental principles.",
          "Explain the significance to stakeholders and society of applying an ethical framework.",
        ],
      }),
      sub("concepts-practice.technology", "7.3", "Technology and sustainability", {
        covers: ["acc.technology.data-storage"],
        objectives: [
          "Explain the use of digital applications for accounting records.",
          "Compare manual, device, cloud and other digital storage, and explain the need for and risks of safe, sustainable storage.",
        ],
      }),
    ],
  }),
];

const c0452 = {
  board: "cambridge",
  qualification: "igcse",
  subject: "accounting",
  versionLabel: "2027-2029",
  family: "accounting-o",
  title: "Cambridge IGCSE Accounting (0452)",
  code: "0452",
  effectiveFrom: "2027-01-01",
  effectiveTo: "2029-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge IGCSE Accounting 0452 syllabus for 2027, 2028 and 2029 (version 1)",
    url: "https://www.cambridgeinternational.org/Images/718141-2027-2029-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Topic and subtopic headings and their numbers (1 to 7, 1.1 to 7.3) are transcribed from the subject content of the official syllabus. Objective codes (subtopic code plus .n) are ours. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Read 2026-10-08 from the official PDF (version 1, for exams in 2027, 2028 and 2029): the seven topics, every numbered subtopic and the assessment overview.",
    "This version is examined from 2027. A student sitting the examination in 2026 is examined on the 2024-2026 syllabus, which is not in the repository; the 2027-2029 version is published as the current version because new students now will sit 2027 or later. Changes listed for 2027: Paper 1 increased from 35 to 40 questions and from 1 hour 15 minutes to 1 hour 30 minutes; Paper 2 unchanged.",
    "Assessment overview as read: all candidates take Paper 1 Multiple Choice (1 hour 30 minutes, 40 marks, 30%, 40 questions on all the content, calculators allowed) and Paper 2 Structured Written Paper (1 hour 45 minutes, 100 marks, 70%, five compulsory questions of 20 marks each, based on stimulus material; tasks include calculations, completing a cash book or an incomplete statement, preparing accounts, suspense accounts and journal entries; calculators allowed). Grades A* to G; no tiers.",
    "The syllabus prints the only accepted ratio formulas: gross profit margin, mark-up, profit margin, ROCE (profit for the year before interest over capital employed, where capital employed = issued shares + reserves + non-current liabilities), current ratio and acid test ratio (as ratios), rate of inventory turnover (cost of sales over average inventory), and inventory, trade receivables (credit sales) and trade payables (credit purchases) turnover in days using 365 days. Content must use exactly these formulas.",
    "Exclusions stated in the syllabus: folio columns; reconciling control accounts with ledger balances; partnership dissolution, changes in profit-sharing ratio, limited liability partnerships and admission or departure of partners; incomplete records for service or manufacturing businesses; specific accounting software.",
    "Not in this syllabus (taught in the family for ZIMSEC only): the accounting cycle as a topic, departmental accounts and the provision for discounts allowable.",
  ],
  overview: "Cambridge IGCSE Accounting covers seven topics: the fundamentals of accounting and the accounting equation; double entry, business documents and books of prime entry; verification through trial balances, correction of errors, bank reconciliation and control accounts; accounting procedures (capital and revenue items, depreciation and disposals, accruals and prepayments, irrecoverable debts, inventory valuation); the financial statements of sole traders, partnerships, limited companies, manufacturers, clubs and businesses with incomplete records; ratio analysis and interpretation; and accounting concepts, ethics, technology and sustainability.",
  assessmentOverview: "All candidates take Paper 1 Multiple Choice (1 hour 30 minutes, 40 questions, 40 marks, 30%) and Paper 2 Structured Written Paper (1 hour 45 minutes, five compulsory 20-mark questions based on stimulus material, 100 marks, 70%). Calculators may be used in both.",
  components: [
    { code: "1", name: "Paper 1: Multiple Choice", kind: "MULTIPLE_CHOICE", description: "40 compulsory multiple-choice questions on all the subject content, including calculations.", durationMinutes: 90, maxMarks: 40, weightingPercent: 30, calculatorAllowed: true },
    { code: "2", name: "Paper 2: Structured Written Paper", kind: "WRITTEN", description: "Five compulsory structured questions of 20 marks each based on stimulus material: calculations, completing books and statements, preparing accounts, suspense accounts and journal entries, analysis and evaluation.", durationMinutes: 105, maxMarks: 100, weightingPercent: 70, calculatorAllowed: true },
  ],
  topics: C0452_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Checks: every covered concept exists, each concept is covered at most once per syllabus, every concept is covered
// by at least one syllabus, and report what each syllabus leaves out.
const coveredAnywhere = new Set();
for (const s of [zimsec, c0452]) {
  const seen = new Map();
  const codes = new Set();
  const keys = new Set();
  const walk = (nodes) => {
    for (const n of nodes) {
      if (keys.has(n.key)) throw new Error(`${s.board}: duplicate node key ${n.key}`);
      keys.add(n.key);
      for (const c of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: unknown concept ${c} on ${n.key}`);
        if (seen.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: ${c} covered on ${seen.get(c)} and ${n.key}`);
        seen.set(c, n.key);
        coveredAnywhere.add(c);
      }
      for (const o of n.objectives ?? []) {
        if (codes.has(o.code)) throw new Error(`${s.board}: duplicate objective code ${o.code}`);
        codes.add(o.code);
      }
      walk(n.children ?? []);
    }
  };
  walk(s.topics);
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${s.topics.length} topics, ${seen.size} concepts covered, ${codes.size} objectives; not covered: ${missing.join(", ") || "none"}`);
}
const orphans = [...CONCEPT_KEYS].filter((k) => !coveredAnywhere.has(k));
if (orphans.length) throw new Error(`concepts no syllabus covers: ${orphans.join(", ")}`);
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept keys");
console.log(`${CONCEPTS.length} concepts in the registry`);

const registry = {
  family: "accounting-o",
  name: "Accounting (O-Level / IGCSE)",
  level: "O",
  prefix: "acc",
  subjects: ["zimsec/o-level/accounting", "cambridge/igcse/accounting"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description })),
};

const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/accounting-o.json", registry);
write("content/syllabi/zimsec/o-level/accounting/2015-2022.json", zimsec);
write("content/syllabi/cambridge/igcse/accounting/2027-2029.json", c0452);
