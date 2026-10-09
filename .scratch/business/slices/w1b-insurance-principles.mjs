// W1b: principles of insurance — utmost good faith, insurable interest, indemnity, proximate cause, subrogation, contribution.
import { concept, P, money, check } from "../lib.mjs";

// Contribution
const sA = 24000;
const sB = 36000;
const lossC = 12500;
const totC = sA + sB;
const payA = (sA / totC) * lossC; // 5000
const payB = (sB / totC) * lossC; // 7500
check("contribution", payA + payB, lossC);
// Under-insurance (average)
const valueU = 45000;
const insuredU = 36000;
const lossU = 10500;
const payU = (insuredU / valueU) * lossU; // 8400
check("average", payU, 8400);
// Indemnity
const sumInsured = 9000;
const actual = 7200;
const payI = Math.min(sumInsured, actual);
// Struct: two insurers + under-insurance
const sx = 15000;
const sy = 10000;
const lossS = 8000;
const pX = (sx / (sx + sy)) * lossS; // 4800
const pY = (sy / (sx + sy)) * lossS; // 3200
check("struct contribution", pX + pY, lossS);

concept("bus.insurance.principles", { file: "insurance/principles", keyPrefix: "insurance.principles" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which principle requires both parties to disclose all material facts honestly?",
    options: [
      ["Utmost good faith", "Correct: uberrimae fidei requires full and honest disclosure."],
      ["Indemnity", "Indemnity restores the insured to the position before the loss."],
      ["Proximate cause", "Proximate cause concerns the main cause of a loss."],
      ["Contribution", "Contribution concerns insurers sharing a loss."],
    ],
    answer: "A",
    explanation: "**Utmost good faith** (uberrimae fidei): the proposer must disclose every material fact, and the insurer must explain the terms honestly.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Tatenda tries to insure his neighbour's car. The insurer refuses. Which principle explains this?",
    options: [
      ["Insurable interest", "Correct: Tatenda would suffer no financial loss if the car were damaged."],
      ["Utmost good faith", "Tatenda has not hidden any facts."],
      ["Subrogation", "Subrogation applies after a claim is paid."],
      ["Contribution", "Contribution applies when one item is insured with several insurers."],
    ],
    answer: "A",
    explanation: "You can insure only what you would lose money from: **insurable interest**. Otherwise insurance would be a bet on someone else's misfortune.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does the principle of indemnity mean?",
    options: [
      ["The insured is restored to the position just before the loss", "Correct: no better and no worse off; no profit from insurance."],
      ["The insured always receives the full sum insured", "The insurer pays the actual loss, up to the sum insured."],
      ["The insurer must pay within seven days", "Indemnity is about the amount paid, not the timing."],
      ["The insured may claim from several insurers in full", "That would give a profit; contribution prevents it."],
    ],
    answer: "A",
    explanation: "**Indemnity**: compensation restores the insured's financial position; it does not allow a profit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "To which type of policy does the principle of indemnity **not** apply?",
    options: [
      ["Life assurance", "Correct: a life cannot be valued in money, so the agreed sum assured is paid."],
      ["Fire insurance", "Fire insurance pays the actual loss: indemnity applies."],
      ["Motor insurance", "Motor insurance pays for the actual damage: indemnity applies."],
      ["Burglary insurance", "Burglary insurance pays the value of goods stolen: indemnity applies."],
    ],
    answer: "A",
    explanation: "Indemnity applies to property and liability insurance. Life assurance pays the sum assured because a human life has no money value.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An insurer pays Rudo the full value of her stolen car. Later the police recover the car. Who owns the car now?",
    options: [
      ["The insurer, under subrogation", "Correct: after paying in full, the insurer takes over the insured's rights to the property."],
      ["Rudo, because it was registered in her name", "If Rudo kept the car as well as the payment, she would profit from the loss."],
      ["The police, who recovered it", "The police return property to the person entitled to it."],
      ["The two share it equally", "There is no sharing; the insurer takes over the rights."],
    ],
    answer: "A",
    hints: ["Rudo has already been paid the car's full value."],
    explanation: "**Subrogation** passes the insured's rights to the property (salvage) and against third parties to the insurer once it has paid, so the insured is not compensated twice.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A fire in an office causes the fire brigade to spray water that ruins computers the flames never reached. A fire policy pays for the computers because of which principle?",
    options: [
      ["Proximate cause", "Correct: the fire is the dominant cause of the water damage."],
      ["Insurable interest", "Insurable interest is not in question here."],
      ["Contribution", "Only one policy is involved."],
      ["Utmost good faith", "Nothing has been hidden."],
    ],
    answer: "A",
    hints: ["What was the main cause of the damage?"],
    explanation: "Under **proximate cause**, the insurer pays when the dominant cause of the loss is an insured risk. The water was used only because of the fire.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Goods insured for ${money(sumInsured)} are completely destroyed. They were worth ${money(actual)}. How much will the insurer pay?`,
    options: [
      [money(payI), "Correct: indemnity limits payment to the actual loss."],
      [money(sumInsured), "This is the sum insured; paying it would give a profit."],
      [money(sumInsured - actual), "This is the difference, not the loss."],
      [money(sumInsured + actual), "Payment can never exceed the loss or the sum insured."],
    ],
    answer: "A",
    hints: ["The insured must not profit from the loss."],
    explanation: `Under indemnity the insurer pays the actual loss, ${money(payI)}, not the higher sum insured.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Contribution and subrogation are corollaries (consequences) of the principle of indemnity.",
    answer: true,
    explanation: "True. Both stop the insured receiving more than the loss: contribution shares the loss among insurers; subrogation passes salvage and rights to the insurer.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under contribution, two insurers covering the same goods always share a loss equally.",
    answer: false,
    explanation: "False. They share **in proportion to the sums insured** with each; the shares are equal only if the sums insured are equal.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each situation with the principle it illustrates.",
    pairs: [
      ["A claim is refused because the owner hid that petrol was stored in the shop", "Utmost good faith"],
      ["A bank insures a house on which it has lent money", "Insurable interest"],
      ["A trader is paid the value of goods lost, not the higher sum insured", "Indemnity"],
      ["Two insurers each pay part of a loss on the same stock", "Contribution"],
    ],
    explanation: "Hidden material facts → utmost good faith; a financial stake → insurable interest; no profit from loss → indemnity; sharing between insurers → contribution.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "A fact that would influence an insurer's decision to give cover or the premium it charges is called a {{blank:a}} fact.",
    blanks: [{ id: "a", accepted: ["material"], wrong: "minor" }],
    explanation: "A **material fact** must be disclosed under utmost good faith.",
  });
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: payB, calculator: true,
    stem: `Thandeka insures her shop's stock with Insurer X for ${money(sA)} and with Insurer Y for ${money(sB)}. A fire causes a loss of ${money(lossC)}. Calculate the amount Insurer Y should pay.`,
    wrong: [lossC / 2, lossC],
    hints: ["Add the two sums insured.", "Insurer Y's share = its sum insured ÷ total sum insured × loss."],
    explanation: `Total sum insured = ${money(totC)}. Y pays ${sB.toLocaleString("en-GB")} ÷ ${totC.toLocaleString("en-GB")} × ${lossC.toLocaleString("en-GB")} = ${money(payB)}. (X pays ${money(payA)}; together ${money(lossC)}.)`,
    workedSolution: `1. Total sum insured = ${sA.toLocaleString("en-GB")} + ${sB.toLocaleString("en-GB")} = ${totC.toLocaleString("en-GB")}.\n2. Y's share = ${sB.toLocaleString("en-GB")} ÷ ${totC.toLocaleString("en-GB")} × ${lossC.toLocaleString("en-GB")} = ${payB.toLocaleString("en-GB")}.\n3. Check: X pays ${payA.toLocaleString("en-GB")}; ${payA.toLocaleString("en-GB")} + ${payB.toLocaleString("en-GB")} = ${lossC.toLocaleString("en-GB")}.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: payU, calculator: true,
    stem: `A warehouse worth ${money(valueU)} is insured for only ${money(insuredU)} under a policy with an average clause. A storm causes damage of ${money(lossU)}. Calculate the amount the insurer will pay.`,
    wrong: [lossU, insuredU - lossU],
    hints: ["Find what fraction of the full value is insured.", "Multiply the loss by that fraction."],
    explanation: `Fraction insured = ${insuredU.toLocaleString("en-GB")} ÷ ${valueU.toLocaleString("en-GB")} = 0.8. Payment = 0.8 × ${money(lossU)} = ${money(payU)}. The owner bears ${money(lossU - payU)} because of under-insurance.`,
    workedSolution: `1. Fraction insured = ${insuredU.toLocaleString("en-GB")} ÷ ${valueU.toLocaleString("en-GB")} = 0.8.\n2. Payment = 0.8 × ${lossU.toLocaleString("en-GB")} = ${payU.toLocaleString("en-GB")}.\n3. The insurer pays ${money(payU)}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain the principle of insurable interest and why it is needed.",
    points: [
      "The insured must suffer a financial loss if the event happens.",
      "Example: own property, own life, spouse's life, a lender's interest in property it has lent against.",
      "Without it, people could insure others' property or lives as a bet.",
      "And might be tempted to cause the loss deliberately.",
    ],
    hints: ["Ask: who loses money if the event happens?"],
    modelAnswer: "Insurable interest means the insured must lose money if the insured event happens, for example an owner of a building or a bank that has lent money against it. Without this rule, people could insure other people's property or lives as a gamble, and some might even cause the loss to collect the money.",
    explanation: "Insurable interest links insurance to a real financial loss, preventing gambling and deliberate losses.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 900, calculator: true,
    stem: `Sipho owns a hardware shop in Masvingo. He insured his stock with Insurer P for ${money(sx)} and with Insurer Q for ${money(sy)}. On his proposal forms he did not mention that he also sells paint thinners, which catch fire easily. A burglary causes a loss of stock worth ${money(lossS)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the amount Insurer P should pay under the principle of contribution.", kind: "money", value: pX, wrong: [lossS / 2, lossS] }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the amount Insurer Q should pay.", kind: "money", value: pY, wrong: [lossS / 2] }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain why Sipho cannot claim the full loss from each insurer.",
        points: [
          "Principle of indemnity: he must not profit from the loss.",
          `Claiming in full from both would give him ${money(2 * lossS)} for an ${money(lossS)} loss.`,
          "Contribution: the insurers share the loss.",
          "In proportion to the sums insured with each.",
        ],
        modelAnswer: `Under indemnity Sipho can recover only his actual loss of ${money(lossS)}. If both insurers paid in full he would receive twice that and profit from the burglary. Under contribution, the insurers share the loss in proportion to the sums insured with each.`,
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Discuss whether the insurers could refuse the burglary claim because Sipho did not disclose the paint thinners.",
        points: [
          "Utmost good faith requires disclosure of material facts.",
          "Paint thinners are a material fact for a fire risk.",
          "But the loss is a burglary; the undisclosed fact is not related to theft risk / proximate cause is burglary.",
          "Reasoned conclusion (insurers may still cancel or adjust the policy for the future; the outcome depends on policy terms).",
        ],
        modelAnswer: "Utmost good faith requires Sipho to disclose all material facts, and flammable paint thinners are material to the risk of fire. However, this claim is for a burglary, and the thinners did not cause or increase the theft, so the insurers would find it hard to refuse this claim on that ground. They could, however, cancel the policy or raise the premium once they learn of the thinners, and the final outcome depends on the policy's terms.",
      }),
    ],
    hints: ["(a) P's sum insured ÷ total sum insured × loss.", "(d) Which risk did the hidden fact affect?"],
    explanation: `(a) ${sx.toLocaleString("en-GB")} ÷ ${(sx + sy).toLocaleString("en-GB")} × ${lossS.toLocaleString("en-GB")} = ${money(pX)}. (b) ${money(pY)}. (c) Indemnity and contribution. (d) Non-disclosure is a breach of utmost good faith, but the hidden fact relates to fire, not burglary.`,
    workedSolution: `1. Total sum insured = ${sx.toLocaleString("en-GB")} + ${sy.toLocaleString("en-GB")} = ${(sx + sy).toLocaleString("en-GB")}.\n2. P pays ${sx.toLocaleString("en-GB")} ÷ ${(sx + sy).toLocaleString("en-GB")} × ${lossS.toLocaleString("en-GB")} = ${pX.toLocaleString("en-GB")}.\n3. Q pays ${sy.toLocaleString("en-GB")} ÷ ${(sx + sy).toLocaleString("en-GB")} × ${lossS.toLocaleString("en-GB")} = ${pY.toLocaleString("en-GB")}.\n4. Check: ${pX.toLocaleString("en-GB")} + ${pY.toLocaleString("en-GB")} = ${lossS.toLocaleString("en-GB")}.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Nyasha's minibus is hit by a lorry whose driver was at fault. Her comprehensive motor insurer pays for the repairs. Nyasha then also asks the lorry owner to pay her for the same repairs.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain the principle of subrogation and apply it to Nyasha's case.",
        points: [
          "After paying a claim the insurer takes over the insured's rights.",
          "Including the right to recover the loss from a third party who caused it.",
          "Nyasha's insurer, not Nyasha, can now claim from the lorry owner.",
          "Nyasha cannot be paid twice for the same repairs.",
        ],
        modelAnswer: "Subrogation means that once an insurer has paid a claim, it takes over the insured's rights, including the right to recover the money from whoever caused the loss. Nyasha's insurer has paid for the repairs, so it, not Nyasha, can claim from the lorry owner. Nyasha cannot be paid twice.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Discuss how the principles of insurance protect both insurers and policyholders.",
        points: [
          "Utmost good faith: insurers get true information to price risk; insured must be told terms honestly.",
          "Insurable interest: stops gambling and deliberate losses, keeping premiums fair.",
          "Indemnity: stops profiting from losses, so premiums stay affordable for all.",
          "Proximate cause: clear rule on which losses are paid, reducing disputes.",
          "Subrogation and contribution: prevent double recovery.",
          "Conclusion: principles keep the pool fair and premiums low for honest policyholders.",
        ],
        modelAnswer: "Utmost good faith gives insurers accurate information to price risks, and requires them to explain terms honestly to clients. Insurable interest stops people gambling on others' losses or causing them. Indemnity, with subrogation and contribution, stops anyone profiting from a loss or being paid twice. Proximate cause gives a clear test of which losses are covered, reducing disputes. Together the principles protect the pool of premiums from abuse, which keeps premiums lower for honest policyholders as well as protecting insurers.",
      }),
    ],
    hints: ["(b) Take each principle and ask who it protects."],
    explanation: "Subrogation passes rights to the insurer after payment. The principles protect the insurance pool from abuse, which benefits honest policyholders too.",
  });
  b.card("DEFINITION", "**Utmost good faith**?", "Both parties must disclose all material facts honestly; non-disclosure lets the insurer refuse a claim or cancel the policy.");
  b.card("DEFINITION", "**Insurable interest**?", "The insured must suffer a financial loss if the insured event happens.");
  b.card("DEFINITION", "**Indemnity**?", "Compensation restores the insured to the position just before the loss: no profit.");
  b.card("DEFINITION", "**Proximate cause**?", "The insurer pays only if the dominant (nearest) cause of the loss is an insured risk.");
  b.card("DEFINITION", "**Subrogation**?", "After paying, the insurer takes over the insured's rights to salvage and to recover the loss from third parties.");
  b.card("DEFINITION", "**Contribution**?", "Insurers covering the same property share a loss in proportion to the sums each insured.");
  b.card("FORMULA", "Contribution: an insurer's share?", "Sum insured with that insurer ÷ total sum insured × loss.");
  b.card("FORMULA", "Under-insurance with an average clause: payment?", "Sum insured ÷ value of the property × loss.");
  b.card("CONCEPT", "Why does indemnity not apply to life assurance?", "A life cannot be valued in money, so the agreed sum assured is paid.");
});
