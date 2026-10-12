// Option rewrites for W1a MCQs written with mc(): keeps the key from being the unique longest option (length cue).
// Each entry: [old content, new content]. Applied by mc() in w1a-lib.mjs to the key and the distractors.
export const E = [
  // capital.short-term-finance
  ["A loan that does not have to be repaid", "A loan that does not have to be repaid if the business makes a loss in the year"],
  ["Interest is charged on the unused limit", "Interest is charged on the whole unused part of the limit as well"],
  ["Overdrafts do not charge interest, so the bank refuses", "Overdrafts carry no interest, so banks refuse to offer them for large purchases"],
  // capital.sources-of-capital
  ["New shares given free to existing shareholders in proportion to their holdings, paid for from reserves", "New shares given free to existing shareholders, paid for from reserves"],
  ["New shares sold to existing shareholders at a price below market value", "New shares sold to existing shareholders at a price below the market value"],
  ["To raise cash from existing shareholders without diluting their proportion of ownership", "To raise cash without diluting existing shareholders' proportion of ownership"],
  ["To give shares free from reserves", "To give shares free to existing shareholders out of the company's reserves and profits"],
  ["Interest on borrowing must be paid even when profits are low, leaving less for dividends", "Interest must be paid even when profits are low, leaving less for dividends"],
  ["It automatically reduces the share price to zero", "It automatically reduces the share price to zero and ends all trading in shares"],
  ["They receive a fixed dividend before any dividend is paid to ordinary shareholders", "They receive a fixed dividend before ordinary shareholders are paid"],
  ["The dividend is an expense in the statement of profit or loss", "The dividend is an expense in the statement of profit or loss, like interest"],
  ["Control of existing shareholders is not diluted and the interest is an allowable expense", "Existing shareholders keep control and the interest is an allowable expense"],
  ["There is no commitment to pay anything to the lenders", "There is no commitment to pay interest or repay the lenders in poor years"],
  ["No security is ever required", "No security is ever required by lenders, whatever the amount lent"],
  // concepts.reporting
  ["That profit and assets are not overstated and expenses and liabilities are not understated", "That profit and assets are not overstated and liabilities are not understated"],
  ["That all assets are valued at current market value", "That all assets are valued at their current market value and reviewed each year"],
  ["Assets are valued at break-up values and liabilities may fall due immediately", "Assets are valued at break-up values and debts may fall due at once"],
  ["Depreciation is increased to match the lives of the assets", "Depreciation is increased so that the assets are written off over their lives"],
  // intro.branches-accounting
  ["To find and control the cost of products, jobs or services", "To find and control the cost of products or jobs"],
  ["To prepare accounts for the tax authority only", "To prepare accounts for the tax authority and for the bank only"],
  ["It reports past performance in set formats following laws and standards", "It reports past results in set formats under laws and standards"],
  ["It is prepared only for the owner of a business", "It is prepared only for the owner and the managers of a business"],
  ["They need not follow a format set by law and can look to the future", "They need not follow a legal format and can look to the future"],
  ["They must follow the format of the income statement", "They must follow the format of the income statement and be published each year"],
  // intro.business-entities
  ["More capital and a wider range of skills can be brought in", "More capital and a wider range of skills"],
  ["The profit does not have to be shared", "The profit does not have to be shared between the owners"],
  ["Investors know they cannot lose more than the amount they agreed to pay for their shares", "Investors cannot lose more than they agreed to pay for their shares"],
  ["Investors may use the company's assets personally", "Investors may use the company's assets personally whenever they wish"],
  ["Limited liability means the bank can claim only against the company's assets unless the directors guarantee the loan", "The bank can claim only against the company's assets unless the directors guarantee the loan"],
  ["Directors are always personally liable for company debts", "Directors are always personally liable for every debt of the company, whatever its legal form"],
  // intro.ethics
  ["Tax evasion, such as hiding sales, is illegal, but tax avoidance within the law is not", "Evasion, such as hiding sales, is illegal, but avoidance within the law is not"],
  ["Tax evasion is a way of saving tax by using allowances correctly", "Tax evasion is a lawful way of saving tax by using the allowances in the tax rules correctly"],
  ["Refuse, record the liability, explain in writing and refer to a senior person if the pressure continues", "Refuse, record the liability, explain in writing and refer upwards if the pressure continues"],
  ["Leave it out, because the director is the accountant's employer", "Leave it out, because the director is the accountant's employer and has the final say on the accounts"],
  ["Resign immediately without raising the matter", "Resign immediately without raising the matter with anyone at the company"],
  ["Lenders and investors may take decisions on false information and lose money", "Lenders and investors may decide on false information and lose money"],
  ["The business must change its financial year", "The business must change its financial year and appoint new auditors at once"],
  // intro.users-information
  ["the security of their jobs and the ability of the business to pay wages and bonuses", "the security of their jobs and the ability of the business to pay wages"],
  ["the price at which the owner could sell the business", "the price at which the owner could sell the business to a new buyer"],
  ["Current assets and current liabilities in the statement of financial position", "Current assets and current liabilities"],
  ["Management reports are detailed, can be prepared as often as needed and have no required format", "Management reports are detailed, frequent and have no required format"],
  ["Management reports are mainly for the tax authority", "Management reports are mainly for the tax authority and the bank"],
  ["Management reports must follow a format set by law", "Management reports must follow a format set by law and be audited"],
  ["They are summarised and historic, whereas managers need detail and forecasts to make decisions", "They are summarised and historic, whereas managers need detail and forecasts"],
  ["They are only available to the owner", "They are only available to the owner and are never shown to any outside user"],
  // ledger.accruals-prepayments
  ["an expense paid in advance, shown as a current asset", "an expense paid in advance for a later period, shown as a current asset"],
  ["Rent income for 2025 is US\\$2,550 and US\\$650 is a current liability at the year end", "Rent income for 2025 is US\\$2,550 and US\\$650 is a current liability"],
  // ledger.books-prime-entry
  ["Bank US\\$780 is debited; discount received US\\$20 is credited", "Bank US\\$780 is debited; discount received US\\$20 is credited; the customer is credited US\\$800"],
  ["Several people can work on different ledgers and the control account provides a check on accuracy", "Several people can work on different ledgers and the control account checks accuracy"],
  ["It removes the need for a trial balance", "It removes the need for a trial balance and for any year-end checks on the accounts"],
  // ledger.capital-revenue
  ["As capital expenditure, part of the cost of the extension", "As capital expenditure on the extension"],
  ["Profit is overstated and non-current assets are understated", "Profit is overstated and non-current assets are understated by US\\$6,000"],
  // ledger.irrecoverable-debts
  ["As an addition to capital", "As an addition to the owner's capital"],
  ["As a current liability", "As a current liability of the business"],
  ["The written-off debts have already been charged, so including them would count the same loss twice", "The written-off debts have already been charged, so including them would count the loss twice"],
  ["It gives a lower allowance, which is always more prudent", "It always gives a lower allowance, and a lower allowance is always more prudent for any business"],
];
