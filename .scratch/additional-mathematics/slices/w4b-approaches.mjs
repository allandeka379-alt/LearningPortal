// W4b: amath.probability.approaches (ZIMSEC only)
import { concept, P, t, chk } from "../lib.mjs";

concept("amath.probability.approaches", { file: "probability/approaches", keyPrefix: "probability.approaches" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "A probability is worked out from the number of equally likely outcomes, without doing any experiment. Which approach to probability is this?",
    options: [
      ["Classical (theoretical) probability", "Correct: classical probability uses n(A)/n(S) for equally likely outcomes."],
      ["Experimental probability (relative frequency)", "Experimental probability needs the results of repeated trials."],
      ["Subjective probability", "Subjective probability is a personal judgement, not a count of outcomes."],
      ["Expected frequency", "Expected frequency is a number of occurrences, n × P(A), not a probability."],
    ],
    answer: "A",
    explanation: t`Classical probability: $P(A) = \frac{n(A)}{n(S)}$ when every outcome is equally likely, for example $P(\text{six}) = \frac{1}{6}$ for a fair die.`,
  });

  b.mcq({
    d: 1, skill: "RECALL", calculator: false,
    stem: "A weather forecaster says there is a 70% chance of rain in Bulawayo tomorrow. Which kind of probability is this best described as?",
    options: [
      ["Subjective probability", "Correct: tomorrow cannot be repeated, so the figure is an informed judgement."],
      ["Classical probability", "Rain and no rain are not equally likely outcomes, so no symmetry argument applies."],
      ["Experimental probability from repeated trials of tomorrow", "The same day cannot be repeated as a trial."],
      ["A certain event", "A probability of 0.7 is less than 1, so the event is not certain."],
    ],
    answer: "A",
    explanation: "A one-off event with no equally likely outcomes gets a probability from expert judgement, which is subjective (even when it uses data and models).",
  });

  {
    const p = 352 / 400;
    chk(p, 0.88);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: "A seed company near Chinhoyi plants 400 maize seeds from a new batch and 352 of them germinate. Estimate the probability that a seed from this batch germinates. Give your answer as a decimal.",
      value: p, wrong: [48 / 400, 352],
      explanation: t`Relative frequency $= \frac{352}{400} = 0.88$. This is an experimental estimate; 0.12 is the estimate for not germinating.`,
    });
  }

  {
    const e = 750 * 0.04;
    chk(e, 30);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false, daily: true,
      stem: "The probability that a light bulb from a factory is faulty is 0.04. A shop in Gweru receives 750 of these bulbs. How many faulty bulbs should the shop expect?",
      value: e, wrong: [3, 720],
      explanation: t`Expected frequency $= n \times p = 750 \times 0.04 = 30$. The answer 720 is the expected number of good bulbs.`,
    });
  }

  {
    const p = (4 + 11) / 24;
    chk(p, 0.625);
    b.num({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: "A box holds 4 yellow, 9 black and 11 white pens. Rudo takes one pen at random. Find the probability that it is not black. Give your answer as a fraction or a decimal.",
      value: p, wrong: [9 / 24, 15 / 9],
      explanation: t`There are $4 + 9 + 11 = 24$ pens. Not black: $4 + 11 = 15$, so $P = \frac{15}{24} = \frac{5}{8}$ (or $1 - \frac{9}{24}$).`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL", calculator: false,
    stem: "A probability can be greater than 1 if the event is very likely.",
    answer: false,
    explanation: "False. Every probability lies from 0 (impossible) to 1 (certain). A very likely event has a probability close to 1, never above it.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A relative frequency based on many trials is generally a better estimate of a probability than one based on a few trials.",
    answer: true,
    explanation: "True. Relative frequencies settle down towards the true probability as the number of trials increases, so the estimate from the largest number of trials is the most reliable.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "A fair die is rolled 60 times. It will show a six exactly 10 times.",
    answer: false,
    explanation: t`False. The expected frequency is $60 \times \frac{1}{6} = 10$, but this is a long-run average. The actual number of sixes will vary; 8, 11 or 13 are all quite possible.`,
  });

  b.match({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Match each statement with the best description.",
    pairs: [
      [t`$P(\text{head}) = \frac{1}{2}$ for a fair coin because the two faces are equally likely.`, "Classical probability"],
      [t`Of 500 bolts tested, 12 were faulty, so $P(\text{faulty}) \approx 0.024$.`, "Experimental probability"],
      ["A farmer believes there is a 60% chance of good rains this season.", "Subjective probability"],
      ["Rolling a 7 with an ordinary six-sided die.", "An event with probability 0"],
      ["Rolling a score less than 7 with an ordinary six-sided die.", "An event with probability 1"],
    ],
    explanation: "Equally likely outcomes give classical probability; counts from trials give experimental probability; judgement gives subjective probability. Impossible events have probability 0 and certain events probability 1.",
  });

  {
    const rf = 63 / 300, exp = 300 / 6;
    chk(rf, 0.21); chk(exp, 50);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "Tatenda rolls a die 300 times and gets 63 fours.",
      template: "The relative frequency of a four is {{blank:r}}. If the die is fair, the expected number of fours is {{blank:e}}.",
      blanks: [
        { id: "r", input: "number", accepted: [rf], tolerance: 0.0005, wrong: "63" },
        { id: "e", input: "number", accepted: [exp], wrong: "63" },
      ],
      explanation: t`Relative frequency $= \frac{63}{300} = 0.21$. For a fair die $P(4) = \frac{1}{6}$, so the expected number is $300 \times \frac{1}{6} = 50$. 63 is somewhat more than 50, which might suggest bias, but more rolls would be needed to be sure.`,
      hints: ["Relative frequency = number of fours ÷ number of rolls."],
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING", calculator: false,
    stem: "Four learners each estimate the probability that a bottle top lands upside down. Whose estimate is most reliable?",
    options: [
      ["Chipo: 249 times out of 640 throws", "Correct: the estimate from the largest number of trials is the most reliable."],
      ["Sipho: 6 times out of 10 throws", "Only 10 throws: this relative frequency could easily be far from the true value."],
      ["Thandeka: 17 times out of 40 throws", "40 throws is better than 10 but still a small experiment."],
      ["Farai: 61 times out of 160 throws", "160 throws is good, but Chipo used four times as many."],
    ],
    answer: "A",
    explanation: "Relative frequency approaches the true probability as the number of trials grows, so 640 throws give the best estimate.",
  });

  {
    const p = 18 / 120, e = p * 80;
    chk(p, 0.15); chk(e, 12);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "A kombi operator on the Harare–Mutare road found that the kombi arrived late on 18 of its last 120 trips. Use this to estimate how many of its next 80 trips will arrive late.",
      value: e, wrong: [18, 68],
      explanation: t`Estimated probability of a late arrival $= \frac{18}{120} = 0.15$. Expected late trips $= 80 \times 0.15 = 12$. The answer 68 is the number expected on time.`,
      hints: ["First estimate the probability of being late, then multiply by the number of trips."],
    });
  }

  {
    const x = (1 - 0.3 - 0.25) / 3;
    chk(x, 0.15);
    const e = 2 * x * 500;
    chk(e, 150);
    b.num({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: t`A biased spinner has four sections A, B, C and D. $P(A) = 0.3$, $P(B) = 0.25$, $P(C) = x$ and $P(D) = 2x$. The spinner is spun 500 times. Find the expected number of times it lands on D.`,
      value: e, wrong: [75, 112.5],
      explanation: t`The probabilities add up to 1: $0.3 + 0.25 + x + 2x = 1$, so $3x = 0.45$ and $x = 0.15$. $P(D) = 2x = 0.3$, so the expected number is $500 \times 0.3 = 150$. The answer 75 uses $x$ instead of $2x$.`,
      hints: ["The four probabilities must add up to 1."],
    });
  }

  b.mcq({
    d: 3, skill: "EVALUATION", calculator: false,
    stem: "A die is rolled 600 times and shows a six 140 times. Which conclusion is most reasonable?",
    options: [
      ["There is evidence that the die is biased towards six.", "Correct: 140 is far above the 100 expected from a fair die over many rolls."],
      ["The die is fair, because 140 is a whole number of sixes.", "Fairness is judged by comparing 140 with the expected 100, not by the type of number."],
      ["The probability of a six is exactly 140/600 for this die.", "A relative frequency is an estimate, not the exact probability."],
      ["Nothing can be said, because 600 rolls are too few for a die.", "600 rolls is a large experiment; the difference of 40 is too big to ignore."],
    ],
    answer: "A",
    explanation: t`For a fair die the expected number of sixes is $600 \times \frac{1}{6} = 100$. The relative frequency $\frac{140}{600} \approx 0.233$ is well above $\frac{1}{6} \approx 0.167$ after many rolls, so bias is likely. $\frac{140}{600}$ is the best estimate of $P(6)$, not its exact value.`,
    hints: ["Work out how many sixes a fair die would be expected to give."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", calculator: false, marks: 2,
    stem: "Sipho says: \"A bottle top can land the right way up or upside down, so the probability that it lands upside down is one half.\" Explain why Sipho is wrong and how the probability could be found.",
    points: [
      "Classical probability needs equally likely outcomes, and there is no reason to believe the two ways of landing are equally likely (the bottle top is not symmetrical).",
      "Throw the bottle top many times and use the relative frequency (number upside down ÷ number of throws) as an estimate.",
    ],
    modelAnswer: "The two outcomes are not equally likely because the bottle top is not symmetrical, so n(A)/n(S) cannot be used. Instead, throw it a large number of times and use the relative frequency of 'upside down' as an experimental estimate.",
    explanation: "Two outcomes does not mean a probability of one half: the outcomes must also be equally likely.",
    hints: ["What condition does the classical approach need?"],
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", calculator: false, marks: 2,
    stem: "Give one advantage and one disadvantage of estimating a probability by experiment (relative frequency).",
    points: [
      "Advantage: it can be used when outcomes are not equally likely or when there is no theory (e.g. germination of seeds, a biased die).",
      "Disadvantage: it is only an estimate; it needs many repeatable trials, which can take time or cost money, and different experiments give different estimates.",
    ],
    modelAnswer: "Advantage: it works even when the outcomes are not equally likely, such as estimating the germination rate of a seed batch. Disadvantage: the answer is only an estimate, which needs a large number of repeatable trials to be reliable.",
    explanation: "Experimental probability trades certainty for flexibility.",
    hints: ["Think of a situation where the classical approach cannot be used."],
  });

  {
    const t1 = 32 / 50, t2 = 212 / 400, e = t2 * 1000;
    chk(t1, 0.64); chk(t2, 0.53); chk(e, 530);
    b.struct({
      d: 3, skill: "ANALYSIS", calculator: false, examStyle: true,
      stem: "Tendai and Rudo want to know whether a coin is fair. Tendai tosses it 50 times and gets 32 heads. Rudo tosses it 400 times and gets 212 heads.",
      parts: [
        P.num({ label: "(a)", marks: 1, stem: "Find the relative frequency of heads in Tendai's experiment.", value: t1, wrong: [32],
          explanation: t`$\frac{32}{50} = 0.64$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Find the relative frequency of heads in Rudo's experiment.", value: t2, wrong: [212],
          explanation: t`$\frac{212}{400} = 0.53$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Whose estimate of the probability of a head is more reliable? Give a reason.",
          points: ["Rudo's estimate.", "Because it is based on many more tosses (400 against 50); relative frequency is more reliable with more trials."],
          modelAnswer: "Rudo's, because 400 tosses is a much larger number of trials than 50, and relative frequencies become more reliable as the number of trials grows.",
          explanation: "The larger experiment gives the better estimate." }),
        P.num({ label: "(d)", marks: 2, stem: "Using the more reliable estimate, how many heads would you expect in 1000 tosses of this coin?", value: e, wrong: [640, 500],
          explanation: t`$1000 \times 0.53 = 530$. The answer 500 assumes the coin is fair; 640 uses Tendai's smaller experiment.` }),
      ],
      explanation: "Relative frequency = count ÷ trials; the largest experiment gives the best estimate; expected frequency = n × p.",
      hints: ["Compare the number of tosses in each experiment."],
    });
  }

  {
    const p = 215 / 250, e = 3000 * p, claim = 0.9 * 250;
    chk(p, 0.86); chk(e, 2580); chk(claim, 225);
    b.struct({
      d: 4, skill: "EVALUATION", calculator: false, examStyle: true,
      stem: "A supplier claims that 90% of its bean seeds germinate. Chipo plants a sample of 250 of the seeds and 215 germinate.",
      parts: [
        P.mcq({ label: "(a)", marks: 1, stem: "Which approach to probability does Chipo's experiment use?",
          options: [
            ["Experimental (relative frequency)", "Correct: the probability is estimated from repeated trials."],
            ["Classical (equally likely outcomes)", "Germinating and not germinating are not equally likely outcomes."],
            ["Subjective (degree of belief)", "Chipo counts results rather than giving an opinion."],
            ["Expected frequency", "Expected frequency is n × p, a number of seeds, not an approach."],
          ],
          answer: "A", explanation: "An estimate from the results of trials is experimental probability." }),
        P.num({ label: "(b)", marks: 1, stem: "Estimate the probability that a seed germinates, as a decimal.", value: p, wrong: [0.9],
          explanation: t`$\frac{215}{250} = 0.86$.` }),
        P.num({ label: "(c)", marks: 1, stem: "If the supplier's claim is true, how many of the 250 seeds would be expected to germinate?", value: claim, wrong: [215],
          explanation: t`$250 \times 0.9 = 225$.` }),
        P.num({ label: "(d)", marks: 2, stem: "A farmer near Marondera plants 3000 of these seeds. Using Chipo's estimate, how many are expected to germinate?", value: e, wrong: [2700, 420],
          explanation: t`$3000 \times 0.86 = 2580$. Using the supplier's 90% gives 2700; 420 is the number expected not to germinate.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Comment on the supplier's claim.",
          points: ["Compares: 215 germinated against 225 expected (0.86 against 0.9), slightly fewer than claimed.", "Concludes sensibly: the difference is small and could be chance, so this one sample gives only weak evidence against the claim; a larger trial would help."],
          modelAnswer: "Chipo observed 215 germinations where the claim predicts 225 (0.86 against 0.9). The germination rate is a little lower than claimed, but the difference is small enough to be due to chance in a sample of 250, so the evidence against the claim is weak. A larger trial would give a firmer conclusion.",
          explanation: "Compare observed with expected and judge the size of the difference." }),
      ],
      explanation: "Relative frequency estimates the probability; expected frequency = n × p lets you compare a claim with data.",
      hints: ["Expected frequency = number of seeds × probability.", "Is 215 a lot less than 225?"],
    });
  }

  // flashcards
  b.card("DEFINITION", "Classical (theoretical) probability", t`Probability from equally likely outcomes: $P(A) = \dfrac{n(A)}{n(S)}$. No experiment is needed.`);
  b.card("DEFINITION", "Experimental probability (relative frequency)", t`If an event happens $k$ times in $n$ trials, its relative frequency $\dfrac{k}{n}$ estimates the probability.`);
  b.card("DEFINITION", "Subjective probability", "A degree of belief based on judgement, experience or information, e.g. a forecaster's chance of rain.");
  b.card("CONCEPT", "Objective probability", "Probability based on facts: classical (equally likely outcomes) or experimental (relative frequency). Contrast with subjective probability.");
  b.card("FORMULA", "Expected frequency", t`$\text{expected frequency} = n \times P(A)$`, "A long-run average, not an exact prediction.");
  b.card("FACT", "The probability scale", "0 = impossible, 1 = certain, 0.5 = as likely as not. No probability is below 0 or above 1.");
  b.card("CONCEPT", "Law of large numbers (informal)", "As the number of trials increases, the relative frequency of an event settles down towards its probability.");
  b.card("CONCEPT", "Testing whether a die is fair", "Roll it many times and compare observed frequencies with the expected frequencies n × 1/6; a large, persistent difference suggests bias.");
});
