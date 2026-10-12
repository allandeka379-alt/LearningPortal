// Slice w2a: machine learning (acs.ai.machine-learning, Cambridge A Level).
import { concept, P, chk, same, CAM, neuron, leastSquares, mdTable, round, codeBlock } from "../lib.mjs";
import { mc } from "../tables/w2a-q.mjs";

concept("acs.ai.machine-learning", { file: "ai/machine-learning", keyPrefix: "ai.machine-learning", applies: CAM }, (b) => {
  // step neuron questions
  const n1 = neuron([1, 0, 1], [2, -1, 1], -2, "step");
  const n2 = neuron([1, 1, 0], [2, -1, 1], -2, "step");
  chk(n1.sum, 1); chk(n1.output, 1); chk(n2.sum, -1); chk(n2.output, 0);
  // small network: 2 inputs, hidden (relu) x2, output relu
  const hid = (x) => [neuron(x, [2, -1], 1, "relu"), neuron(x, [1, 1], -2, "relu")];
  const x = [3, 2];
  const [h1, h2] = hid(x);
  const o = neuron([h1.output, h2.output], [1, 2], 0, "relu");
  chk(h1.sum, 5); chk(h2.sum, 3); chk(o.output, 11);
  // back propagation
  const w = 2, xin = 4, target = 10, lr = 0.05;
  const out = w * xin, err = target - out, w2 = w + lr * err * xin, out2 = w2 * xin;
  chk(out, 8); chk(err, 2); chk(round(w2, 2), 2.4); chk(round(out2, 2), 9.6);
  // regression
  const xs = [1, 2, 3, 4, 5], ys = [12, 15, 19, 22, 26];
  const ls = leastSquares(xs, ys);
  chk(ls.slope, 3.5); chk(round(ls.intercept, 1), 8.3);
  const pred6 = round(ls.intercept + ls.slope * 6, 1);
  chk(pred6, 29.3);
  const dataTable = mdTable(["Day x", "Cups sold y"], xs.map((v, i) => [v, ys[i]]));
  chk(3 * 4 + 4 * 2, 20); chk(4 + 2, 6);

  // ---- multiple choice
  mc(b, 2, "UNDERSTANDING", "A program is trained on thousands of photographs, each labelled by an expert as 'healthy maize' or 'diseased maize'. Which category of learning is this?",
    ["Supervised learning", "Correct: the training data carries the right answers."],
    [["Unsupervised learning", "Unsupervised learning has no labels."], ["Reinforcement learning", "There is no reward-based sequence of actions."], ["Symbolic learning", "That is not one of the three categories."]],
    "Labelled examples mean supervised learning.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "A shop's program groups its customers by buying habits without being told what the groups should be. Which category of learning is this?",
    ["Unsupervised learning", "Correct: it finds structure in unlabelled data."],
    [["Supervised learning", "That would need labelled customers."], ["Reinforcement learning", "No rewards are used."], ["Regression", "Regression predicts a numeric value."]],
    "Finding groups without labels is unsupervised learning.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "In reinforcement learning, what does the program receive after it acts?",
    ["A reward or a penalty", "Correct: it learns a strategy that earns the most reward."],
    [["A label for the training data", "Labels belong to supervised learning."], ["A copy of the program's source code", "That is not feedback."], ["A list of the weights", "The program changes weights itself."]],
    "Rewards and penalties guide learning.");
  mc(b, 3, "UNDERSTANDING", "What is the job of the activation function in a neuron?",
    ["It turns the weighted sum into the neuron's output", "Correct."],
    [["It chooses the learning rate for the whole network", "The learning rate is set separately."], ["It stores all of the training data that was used", "Data is not stored in the activation function."], ["It adds a new layer to the network as it learns", "The layers are part of the design."]],
    "Step, ReLU and sigmoid are examples of activation functions.", { hints: ["What is done to the weighted sum before the output is passed on?"] });
  mc(b, 3, "ANALYSIS", "What is passed backwards through the network in back propagation?",
    ["The error at the output", "Correct: it is used to adjust the weights."],
    [["The input values", "The inputs go forwards."], ["The training labels only", "The labels are used to find the error."], ["The final answer of the program", "The answer is produced by the forward pass."]],
    "Back propagation uses the output error to update the weights.", { hints: ["What does the network need to know in order to improve?"] });
  mc(b, 3, "UNDERSTANDING", "What makes a neural network 'deep'?",
    ["It has many hidden layers", "Correct."],
    [["It uses a very large screen", "Size of display has no effect."], ["It has only an input layer and an output layer", "That is a shallow network."], ["It is trained only once", "Training frequency does not decide depth."]],
    "Deep learning uses networks with many hidden layers.", { hints: ["Where in the network are the extra layers?"] });
  mc(b, 3, "APPLICATION", "During training, the learning rate is made much too large. What is the most likely result?",
    ["The weights overshoot, so the error may not settle", "Correct."],
    [["Learning becomes perfect after a single step", "A large rate causes overshooting."], ["The network ignores the training data it is given", "It still uses the data."], ["The activation function is removed from each neuron", "The activation function is unaffected."]],
    "Steps that are too large jump past the best weights.", { hints: ["Think of taking steps that are too big when walking towards a gate."] });
  mc(b, 2, "UNDERSTANDING", "What does a least-squares regression line show?",
    ["The straight line closest to the points overall", "Correct."],
    [["A line through the first point and the last point only", "All points are used."], ["The label that belongs to each point", "Regression predicts values."], ["The group that each point is placed in", "That is clustering."]],
    "Least squares minimises the total of the squared distances.");

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In unsupervised learning, each training example is labelled with the correct answer.", answer: false,
    explanation: "False. Unsupervised learning uses unlabelled data." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A regression line can be used to predict a value of y for a new value of x.", answer: true,
    explanation: "True. That is the purpose of the fitted line, provided x is within the range of the data." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each task to the most suitable category of learning.",
    pairs: [["Classifying emails as spam or not spam using emails already labelled", "Supervised learning"], ["Finding groups of similar villages from survey data with no labels", "Unsupervised learning"], ["A robot learning to move through a maze using rewards", "Reinforcement learning"], ["Predicting a number from data using a fitted line", "Regression"]],
    explanation: "The type of data and feedback decides the category." });
  b.fib({ d: 3, skill: "UNDERSTANDING", hints: ["Say what a neuron adds and what it applies."],
    stem: "Complete the description of a neuron.",
    template: "A neuron multiplies each input by a {{blank:a}}, adds them, adds a {{blank:b}}, and passes the result through an {{blank:c}} function.",
    blanks: [
      { id: "a", accepted: ["weight"], choices: ["weight", "label", "layer", "reward"] },
      { id: "b", accepted: ["bias"], choices: ["bias", "error", "target", "gradient"] },
      { id: "c", accepted: ["activation"], choices: ["activation", "regression", "memory", "sorting"] },
    ], explanation: "Weights, bias, activation function." });

  // ---- numerical
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Work out each hidden neuron first, then the output neuron."],
    stem: "A network has two inputs, 3 and 2. Hidden neuron 1 has weights 2 and −1 and bias 1. Hidden neuron 2 has weights 1 and 1 and bias −2. The output neuron has weights 1 and 2 and bias 0. All neurons use ReLU (the output is the sum if positive, otherwise 0). What is the output of the network?",
    value: o.output, wrong: [8, 5], workedSolution: `1. Hidden 1: 2×3 + (−1)×2 + 1 = ${h1.sum}, ReLU gives ${h1.output}.\n2. Hidden 2: 1×3 + 1×2 − 2 = ${h2.sum}, ReLU gives ${h2.output}.\n3. Output: 1×${h1.output} + 2×${h2.output} + 0 = ${o.sum}.`, explanation: "5 + 2 × 3 = 11." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Multiply each input by its weight, add the bias, then apply the step rule."],
    stem: "A neuron has inputs 1, 0, 1, weights 2, −1, 1 and bias −2. The activation function is a step function: output 1 if the sum is 0 or more, otherwise 0. What is the output?",
    value: n1.output, wrong: [0, 2], workedSolution: "1. Sum = 1×2 + 0×(−1) + 1×1 − 2 = 1.\n2. 1 is 0 or more, so the output is 1.", explanation: "The sum is 1, so the step function gives 1." });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["Output = weight × input; error = target − output; new weight = weight + learning rate × error × input."],
    stem: "A single neuron has output = weight × input. The weight is 2, the input is 4, the target is 10 and the learning rate is 0.05. What is the weight after one update by back propagation (new weight = weight + learning rate × error × input)?",
    value: 2.4, wrong: [2.2, 10], workedSolution: "1. Output = 2 × 4 = 8.\n2. Error = 10 − 8 = 2.\n3. Change = 0.05 × 2 × 4 = 0.4.\n4. New weight = 2 + 0.4 = 2.4.", explanation: "The new weight is 2.4." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Each of the 3 inputs is joined to each of the 4 hidden neurons, and each hidden neuron to each of the 2 outputs."],
    stem: "A fully connected network has 3 input values, one hidden layer of 4 neurons and 2 output neurons. How many weights does it have (not counting biases)?",
    value: 20, wrong: [9, 12], workedSolution: "1. Input to hidden: 3 × 4 = 12.\n2. Hidden to output: 4 × 2 = 8.\n3. Total 20.", explanation: "12 + 8 = 20 weights." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the category of machine learning that uses labelled training data.", accepted: ["supervised learning", "supervised"], wrong: ["unsupervised learning", "reinforcement learning"], explanation: "Supervised learning." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Define each and give an example."],
    stem: "Describe supervised learning and unsupervised learning, giving an example of each. [4]",
    points: ["Supervised learning uses labelled training data (each example has the correct answer)", "Example: classifying images/e-mails/diseased plants from labelled examples", "Unsupervised learning uses unlabelled data to find patterns or groups", "Example: grouping customers by buying behaviour"],
    modelAnswer: "In supervised learning the training examples are labelled with the correct answers, for example classifying photographs of leaves as healthy or diseased. In unsupervised learning the data has no labels and the program finds patterns or groups, for example grouping customers by what they buy.",
    explanation: "Definition and example for each." });
  b.manualShort({ d: 4, skill: "UNDERSTANDING", marks: 4, hints: ["Start from the forward pass and the error."],
    stem: "Explain how back propagation is used to train a neural network. [4]",
    points: ["A forward pass produces an output for a training example", "The output is compared with the target to give an error", "The error is passed backwards through the layers to find how each weight contributed", "The weights are adjusted to reduce the error, and the process is repeated for many examples"],
    modelAnswer: "A forward pass produces an output, which is compared with the target to give an error. The error is passed backwards through the layers to find how much each weight contributed, and the weights are adjusted to reduce the error. This is repeated for many examples.",
    explanation: "Forward pass, error, backward, adjust." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 3, hints: ["Think about data and processing."],
    stem: "Give two reasons why deep learning needs a great deal of data and processing power, and one benefit. [3]",
    points: ["There are very many weights to adjust, so many training examples are needed", "Each training step involves calculations on all the layers, which needs a lot of processing", "Benefit: it learns features automatically and can reach high accuracy on images, speech or text"],
    modelAnswer: "There are very many weights, so many examples are needed to set them, and every training step calculates through all the layers, which needs much processing. The benefit is that it learns features automatically and can be very accurate.",
    explanation: "Data, processing, benefit." });

  // ---- structured practice
  const pump = (d, h, r) => neuron([d, h, r], [2, 1, -2], -1, "step");
  chk(pump(1, 1, 0).sum, 2); chk(pump(1, 1, 0).output, 1);
  chk(pump(1, 0, 1).sum, -1); chk(pump(1, 0, 1).output, 0);
  chk(pump(0, 1, 0).sum, 0); chk(pump(0, 1, 0).output, 1);
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Work out the weighted sum plus bias before applying the step rule.", "The step function gives 1 when the sum is 0 or more."],
    explanation: "A single neuron with a step activation function evaluated for three sets of inputs.",
    stem: "A farm program in Marondera decides whether to switch on an irrigation pump. It uses one neuron with three inputs: soil dry (1 or 0), hot day (1 or 0) and rain forecast (1 or 0). The weights are 2, 1 and −2, the bias is −1, and the activation function is a step: the output is 1 (pump on) if the sum is 0 or more, otherwise 0 (pump off).",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the weighted sum plus bias when the soil is dry, the day is hot and no rain is forecast (inputs 1, 1, 0).", value: pump(1, 1, 0).sum, type: "CALCULATION", wrong: [3, 1], workedSolution: "2×1 + 1×1 + (−2)×0 − 1 = 2.", explanation: "The sum is 2." }),
      P.num({ label: "(b)", marks: 1, stem: "What is the output when the soil is dry, the day is not hot and rain is forecast (inputs 1, 0, 1)?", value: pump(1, 0, 1).output, wrong: [1, -1], workedSolution: "2 + 0 − 2 − 1 = −1, which is less than 0, so the output is 0.", explanation: "The sum is −1, so the pump stays off." }),
      P.num({ label: "(c)", marks: 1, stem: "What is the output when the soil is not dry, the day is hot and no rain is forecast (inputs 0, 1, 0)?", value: pump(0, 1, 0).output, wrong: [0, 2], workedSolution: "0 + 1 + 0 − 1 = 0; the step gives 1 when the sum is 0 or more.", explanation: "The sum is 0, so the output is 1." }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain the roles of the weights and of the bias in this neuron, and how the weights could be chosen.", points: ["A weight shows how much an input matters to the decision", "A negative weight (rain forecast) makes that input push the output towards off", "The bias shifts the sum, so it sets how large the weighted inputs must be before the pump switches on", "The weights and bias are found by training on examples (adjusted by back propagation) so that the outputs match the correct decisions"], modelAnswer: "Each weight shows how much its input matters; the negative weight on the rain forecast pushes the output towards off. The bias shifts the sum and sets how strong the inputs must be before the pump switches on. The values are found by training on examples and adjusting them, for example by back propagation.", explanation: "Weights, sign, bias, training." }),
      P.mcq({ label: "(e)", marks: 1, stem: "The weights were set using records of past days labelled 'pump needed' or 'pump not needed'. Which category of learning is this?", options: [["Supervised learning", "Correct: the examples are labelled."], ["Unsupervised learning", "There would be no labels."], ["Reinforcement learning", "No reward-based actions are involved."], ["Regression", "The output is a decision, not a fitted line."]], answer: "A", explanation: "Labelled examples mean supervised learning." }),
    ] });
  const line = (v) => round(8.3 + 3.5 * v, 1);
  chk(line(8), 36.3); chk(line(3), 18.8); chk(round(19 - line(3), 1), 0.2);
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Substitute the value of x into the equation of the line."],
    explanation: "Using a least-squares line to predict and to check against the data.",
    stem: "The stall in Gweru fits the line y = 3.5x + 8.3 to the cups sold on days 1 to 5 (day 3 sold 19 cups):\n\n" + dataTable,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Use the line to predict the number of cups sold on day 8.", value: line(8), wrong: [28, 8.3], workedSolution: "3.5 × 8 + 8.3 = 28 + 8.3 = 36.3.", explanation: "36.3 cups." }),
      P.num({ label: "(b)", marks: 1, stem: "The line gives a prediction for day 3. By how much does the actual value of 19 differ from the prediction?", value: 0.2, tol: 0.01, wrong: [1, 18.8], workedSolution: "Prediction = 3.5 × 3 + 8.3 = 18.8. 19 − 18.8 = 0.2.", explanation: "The difference is 0.2 cups." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the prediction for day 40 would be unreliable.", points: ["Day 40 is far outside the range of days 1 to 5 that the line was fitted to", "The relationship may not stay a straight line (sales may level off or change with the season)"], modelAnswer: "Day 40 is far outside the data the line was fitted to, and sales may not keep rising in a straight line.", explanation: "Extrapolation." }),
      P.mcq({ label: "(d)", marks: 1, stem: "What does the least-squares method make as small as possible?", options: [["The total of the squared distances from the line", "Correct."], ["The number of the points that lie on the line", "Points need not be on the line."], ["The gradient of the line that is drawn", "The gradient is whatever fits best."], ["The range of the days in the table", "The range is the data."]], answer: "A", explanation: "That is how the best-fit line is chosen." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Machine learning", "A program improves at a task by learning from data instead of following fixed rules.");
  b.card("FACT", "Three categories", "Supervised (labelled data), unsupervised (unlabelled data, finds patterns), reinforcement (learns from rewards and penalties).");
  b.card("CONCEPT", "A neuron", "Weighted sum of inputs plus a bias, passed through an activation function such as step, ReLU or sigmoid.");
  b.card("DEFINITION", "Deep learning", "Training neural networks with many hidden layers, which learn features automatically; needs much data and processing.");
  b.card("DEFINITION", "Back propagation", "The output error is passed backwards through the network and the weights are adjusted to reduce it.");
  b.card("FORMULA", "Weight update", "New weight = old weight + learning rate × error × input (simple linear neuron).");
  b.card("DEFINITION", "Regression", "Fitting a line to data, for example by least squares, so that values can be predicted.");
  b.card("FORMULA", "Least-squares gradient", "m = (nΣxy − ΣxΣy) ÷ (nΣx² − (Σx)²); c = (Σy − mΣx) ÷ n.");
  b.card("CONCEPT", "Learning rate", "A small number that sets the size of each weight change: too big overshoots, too small is slow.");
});
