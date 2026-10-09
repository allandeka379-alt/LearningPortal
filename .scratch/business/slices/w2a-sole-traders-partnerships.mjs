// W2a: sole traders and partnerships (COM, BES, CAM).
import { concept, P, money, fmt, check, r2, CAM } from "../lib.mjs";

concept("bus.organisation.sole-traders-partnerships", { file: "organisation/sole-traders-partnerships", keyPrefix: "organisation.sole-traders-partnerships" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who owns a sole proprietorship?",
    options: [
      ["One person", "Correct: a sole trader has a single owner, though it may employ others."],
      ["Two to twenty partners", "That describes a partnership."],
      ["Shareholders who elect directors", "That describes a limited company."],
      ["The government", "That describes a public enterprise."],
    ],
    answer: "A",
    explanation: "A sole trader (sole proprietorship) is owned and controlled by one person, who may still employ workers.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which document sets out how partners share profits and run their business?",
    options: [
      ["Partnership deed", "Correct: the deed records the partners' agreement."],
      ["Memorandum of association", "That is a company formation document."],
      ["Prospectus", "A prospectus invites the public to buy a company's shares."],
      ["Certificate of incorporation", "This shows a company has been registered."],
    ],
    answer: "A",
    explanation: "The partnership deed (deed of partnership) sets out capital, profit-sharing ratio, duties, salaries and how disputes are settled.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does **unlimited liability** mean for a sole trader?",
    options: [
      ["Personal possessions can be taken to pay business debts", "Correct: the owner is personally responsible for all debts."],
      ["The business can borrow as much as it likes", "Liability is about debts owed, not borrowing limits."],
      ["The owner can lose only the capital invested in the business", "That is limited liability."],
      ["The business never has to pay its creditors", "All businesses must pay their creditors."],
    ],
    answer: "A",
    explanation: "With unlimited liability the owner's personal assets (house, car, savings) may be used to pay debts the business cannot pay.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Two partners have no partnership deed. How is profit shared?",
    options: [
      ["Equally", "Correct: without an agreement, profits and losses are shared equally."],
      ["In the ratio of capital", "Only if the partners agree this."],
      ["All to the senior partner", "There is no such rule."],
      ["According to hours worked", "Only if the partners agree this."],
    ],
    answer: "A",
    explanation: "Where partners have not agreed a ratio, the usual rule is that profits and losses are shared equally.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an advantage of a sole proprietorship compared with a partnership?",
    options: [
      ["Decisions can be made quickly", "Correct: there is no need to consult partners."],
      ["More capital is available", "A partnership usually has more capital."],
      ["Liability is limited", "Both have unlimited liability."],
      ["Work and losses are shared", "That is an advantage of a partnership."],
    ],
    answer: "A",
    explanation: "A sole trader decides alone, so decisions are quick; the owner also keeps all the profit.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Rudo provides capital to a partnership but takes no part in running it, and her liability is limited to her capital. What kind of partner is she?",
    options: [
      ["A limited (sleeping) partner", "Correct: she invests but does not manage, with limited liability."],
      ["A general partner", "A general partner takes part in management and has unlimited liability."],
      ["A shareholder in a private company", "Shareholders own companies, not partnerships."],
      ["A sole trader", "A sole trader is the only owner of a business."],
    ],
    answer: "A",
    explanation: "A limited (sleeping) partner contributes capital, takes no part in management and has liability limited to that capital. At least one general partner must have unlimited liability.",
    hints: ["Which kind of partner does not manage the business?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do banks often refuse large loans to sole traders?",
    options: [
      ["They have little security and a high risk of failure", "Correct: small capital and few assets make lending risky."],
      ["Sole traders are not allowed by law to borrow any money", "Sole traders can borrow; the issue is risk."],
      ["Sole traders must publish their accounts", "Their accounts are private, which makes banks less sure."],
      ["Sole traders have limited liability", "Sole traders have unlimited liability."],
    ],
    answer: "A",
    explanation: "Sole traders usually have small capital and few assets to offer as security, and many small businesses fail, so lenders see them as risky.",
    hints: ["What does a bank want before lending?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A sole trader cannot employ any workers.",
    answer: false,
    explanation: "False. A sole trader has one **owner** but can employ many workers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A partnership has a separate legal identity from its partners.",
    answer: false,
    explanation: "False. A partnership is unincorporated: the partners and the business are the same in law, and general partners have unlimited liability.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each feature to the form of business it describes.",
    pairs: [
      ["Owner keeps all the profit and makes every decision", "Sole trader"],
      ["Owners agree a deed setting out the profit-sharing ratio", "Partnership"],
      ["Partner who invests but takes no part in management", "Limited partner"],
    ],
    explanation: "A sole trader keeps all profit; partners agree a deed; a limited (sleeping) partner contributes capital only.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Sole traders and partnerships are {{blank:a}} businesses, so they have no separate legal identity. Their owners have {{blank:b}} liability for the debts of the business.",
    blanks: [
      { id: "a", accepted: ["unincorporated"], choices: ["unincorporated", "incorporated", "public", "limited"] },
      { id: "b", accepted: ["unlimited"], choices: ["unlimited", "limited", "no", "shared"] },
    ],
    explanation: "Unincorporated businesses have no separate legal personality and their owners (except limited partners) have unlimited liability.",
  });
  b.short({
    d: 2,
    stem: "State the term for a business that will end when its owner dies or retires because it has no separate legal identity: it lacks ________.",
    accepted: ["continuity", "perpetual succession", "continuity of existence"],
    wrong: ["liability", "capital"],
    explanation: "Sole traders and partnerships lack **continuity**: the business may end on the death, retirement or bankruptcy of an owner.",
  });

  // Calculations (numbers differ from the lesson's worked examples).
  {
    const capN = 10000, capT = 5000, profit = 18600;
    const n = (profit * capN) / (capN + capT);
    check("n", n + (profit * capT) / (capN + capT), profit);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: n, calculator: true, daily: true,
      stem: `Nyasha invested ${money(capN)} and Tendai ${money(capT)} in a partnership. Profit is shared in the ratio of capital. Calculate Nyasha's share of a profit of ${money(profit)}.`,
      wrong: [profit / 2, (profit * capT) / (capN + capT)],
      explanation: `Ratio ${fmt(capN)} : ${fmt(capT)} = 2 : 1 (3 parts). Nyasha's share = 2/3 × ${fmt(profit)} = ${money(n)}.`,
    });
  }
  {
    const profit = 27000, salary = 2400, rem = profit - salary;
    const a = (rem * 3) / 6, bb = (rem * 2) / 6, c = (rem * 1) / 6;
    check("rem", a + bb + c, rem);
    const total = r2(c + salary);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: total, calculator: true,
      stem: `Farai, Chipo and Sipho share profit in the ratio 3 : 2 : 1 after Sipho receives a partner's salary of ${money(salary)}. Profit for the year is ${money(profit)}. Calculate Sipho's **total** income from the partnership.`,
      wrong: [r2(profit / 6 + salary), r2(c)],
      explanation: `Profit after salary = ${fmt(profit)} − ${fmt(salary)} = ${fmt(rem)}. One part = ${fmt(rem)} ÷ 6 = ${fmt(c)}. Sipho's total = ${fmt(salary)} + ${fmt(c)} = ${money(total)}.`,
      hints: ["Take the salary out of the profit first.", "Then divide what is left into 6 parts."],
    });
  }
  {
    const debts = 26500, assets = 19800, gap = debts - assets;
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: gap,
      stem: `A sole trader in Kwekwe closes, owing creditors ${money(debts)}. The business assets are sold for ${money(assets)}. How much must the owner pay from personal assets?`,
      wrong: [debts, assets],
      explanation: `${fmt(debts)} − ${fmt(assets)} = ${money(gap)}. Unlimited liability means the owner must pay this from personal savings or possessions.`,
    });
  }

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** disadvantages of a partnership.",
    points: [
      "Disadvantage 1, e.g. unlimited liability (1)",
      "Explained, e.g. a partner may lose personal assets, even for debts caused by another partner (1)",
      "Disadvantage 2, e.g. disagreements / profits shared / lack of continuity (1)",
      "Explained, e.g. disputes slow decisions or end the business (1)",
    ],
    modelAnswer: "Partners have unlimited liability, so a partner can lose personal possessions to pay debts, even debts caused by another partner's decisions. Partners may also disagree about how to run the business, which slows decisions and can break up the partnership.",
    explanation: "Identify each disadvantage and explain its effect on the partners or the business.",
    hints: ["Think about liability and about relationships between partners."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Outline **four** items usually included in a partnership deed.",
    points: [
      "Capital contributed by each partner (1)",
      "Profit- and loss-sharing ratio (1)",
      "Partners' salaries / drawings / interest on capital (1)",
      "Duties of partners / admission or retirement of partners / settling disputes (1)",
    ],
    modelAnswer: "The deed states how much capital each partner puts in, the ratio for sharing profits and losses, any salaries or drawings allowed, and how disputes are settled or a partner may leave.",
    explanation: "Any four relevant contents of a deed earn the marks.",
    hints: ["What could partners argue about later?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: "Tatenda runs a car-repair workshop in Mutare as a sole trader. Profit last year was US\\$14,400. His friend Sipho, a trained auto-electrician, offers to join him as a partner and invest US\\$6,000 for new diagnostic equipment. Sipho suggests sharing profits equally.",
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: 14400 / 2,
        stem: "If profit stayed at US\\$14,400 and was shared equally, calculate Tatenda's share.",
        wrong: [14400, 14400 / 3],
        explanation: "14,400 ÷ 2 = US\\$7,200.",
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "Which would remain the same for Tatenda if he formed the partnership?",
        options: [["He would still have unlimited liability", "Correct: general partners have unlimited liability."], ["He would still keep all the profit", "Profit would be shared."], ["He would still make all decisions alone", "Partners share decisions."], ["He would still provide all the capital", "Sipho adds capital."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** benefit to Tatenda's business of taking Sipho as a partner.",
        points: ["Identifies benefit, e.g. extra capital / new skills (1)", "Applies: buys diagnostic equipment / repairs electrical faults (1)", "Effect: more customers and higher total profit (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Should Tatenda accept the partnership on the terms Sipho suggests? Justify your answer.",
        points: [
          "For: capital and skills attract new work, so total profit may rise above US\\$14,400 (1)",
          "For: shared workload and responsibility (1)",
          "Against: Tatenda's share falls to US\\$7,200 unless profit rises a lot (1)",
          "Against: equal shares ignore that Tatenda built the business / disagreements (1)",
          "Suggests a deed with a fairer ratio or salary for Tatenda (1)",
          "Justified conclusion (1)",
        ],
        modelAnswer: "Sipho's capital and skills would let the workshop repair modern cars, which could bring in many new customers. But on equal shares profit would need to double just for Tatenda to earn what he earns now, and equal shares ignore the customers he has already built up. Tatenda should accept a partnership only with a written deed that gives him a larger share or a salary first.",
      }),
    ],
    explanation: "Equal shares of US\\$14,400 give each partner US\\$7,200, so profit must rise for Tatenda to gain. A deed can set a fairer ratio.",
    hints: ["Divide the profit by the number of partners.", "In (d), compare Tatenda's income before and after."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780, applies: CAM,
    stem: "Rudo makes and sells jewellery from home in Bulawayo. She needs little capital, wants full control of her designs and has few debts. Her cousin Thandeka, who runs an online shop, suggests they form a partnership.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify **two** features of a sole trader.",
        points: ["One owner / full control (1)", "Unlimited liability / keeps all the profit / no separate legal identity (1)"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** advantages to Rudo of forming a partnership with Thandeka.",
        points: ["Advantage 1, e.g. Thandeka's online shop gives access to more customers (1)", "Developed: higher sales and profit (1)", "Advantage 2, e.g. shared workload / more capital / new skills (1)", "Developed: Rudo can focus on design (1)"],
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Recommend whether Rudo should remain a sole trader or form a partnership. Justify your answer.",
        points: [
          "Sole trader: keeps full control of designs, which she values (1)",
          "Sole trader: keeps all the profit; little capital needed, so no need for a partner (1)",
          "Partnership: online reach could raise sales a lot (1)",
          "Partnership: must share profit and decisions; risk of disputes; unlimited liability for partner's debts (1)",
          "Alternative, e.g. sell through Thandeka's shop on commission without a partnership (1)",
          "Justified recommendation (1)",
        ],
        modelAnswer: "Rudo values control of her designs and needs little capital, so the main reasons for a partnership (capital and shared decisions) do not apply. A partnership would also make her liable for any debts of Thandeka's shop. However, Thandeka's online customers could increase her sales. Rudo should remain a sole trader and sell through Thandeka's online shop on a commission basis, gaining the customers without giving up control.",
      }),
    ],
    explanation: "A recommendation must use the case: Rudo's need for control, low capital needs and the online sales opportunity.",
    hints: ["What does Rudo value most?", "Is there a way to gain the customers without a partnership?"],
  });
  b.card("DEFINITION", "Sole trader", "A business owned and controlled by one person, who keeps all the profit and has unlimited liability.");
  b.card("DEFINITION", "Partnership", "A business owned by two or more people (commonly up to twenty) who share capital, control and profits.");
  b.card("DEFINITION", "Unlimited liability", "Owners are personally responsible for all the business's debts; personal possessions can be taken to pay them.");
  b.card("DEFINITION", "Partnership deed", "Written agreement setting out capital, profit-sharing ratio, salaries, duties and how disputes are settled.");
  b.card("FACT", "Profit sharing with no deed", "If partners have no agreement, profits and losses are shared equally.");
  b.card("DEFINITION", "Limited (sleeping) partner", "A partner who provides capital, takes no part in management and has liability limited to that capital.");
  b.card("CONCEPT", "Why unincorporated businesses lack continuity", "They have no separate legal identity, so the business may end when an owner dies, retires or goes bankrupt.");
  b.card("CONCEPT", "Sharing profit after a partner's salary", "Deduct the salary from profit first, then share the remainder in the agreed ratio; add the salary back to that partner's share.");
  b.card("CONCEPT", "Choosing sole trader or partnership", "Weigh the owner's wish for control and all the profit against the extra capital, skills and shared workload a partner brings.");
});
