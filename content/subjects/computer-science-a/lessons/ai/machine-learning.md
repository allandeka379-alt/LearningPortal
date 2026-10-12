---
{
  "key": "ai.machine-learning",
  "title": "Machine learning: neural networks, deep learning and regression",
  "summary": "Supervised, unsupervised and reinforcement learning, how an artificial neural network computes an output from weights, biases and activation functions, deep learning, back propagation of errors with one weight update, and least-squares regression computed from data.",
  "concepts": ["acs.ai.machine-learning"],
  "estimatedMinutes": 60,
  "level": "core",
  "freePreview": true
}
---
## Introduction

A programmer who wants to recognise a cat in a photograph cannot write rules for every shape, colour and angle. A bank that wants to estimate a house price cannot list every case. In **machine learning** the programmer does something different: the program is given many examples and **learns** the pattern from them, so that it can deal with new cases it has never seen.

This lesson describes the three categories of machine learning, how an **artificial neural network** produces an output, what makes learning **deep**, how **back propagation** adjusts the weights to reduce an error, and how a **regression** line is fitted to data by least squares. The calculations were done by code.

You should already know what a graph of y against x looks like, and that a program takes inputs and produces outputs.

## Key definitions

:::definition{term="Machine learning"}
A branch of artificial intelligence in which a program improves its performance on a task by learning from data, instead of being given step-by-step rules.
:::

:::definition{term="Artificial neural network"}
A model made of layers of simple units (neurons). Each neuron takes weighted inputs, adds a bias, and passes the result through an activation function to give its output.
:::

:::definition{term="Back propagation"}
A method of training a neural network: the error at the output is passed backwards through the network and the weights are adjusted so that the error becomes smaller.
:::

:::definition{term="Regression"}
A method that finds the relationship between an input variable and an output value, for example a straight line fitted to data, so that the output can be predicted for new inputs.
:::

## Categories of machine learning

| Category | Data used | What the program learns | Example |
|---|---|---|---|
| Supervised learning | Labelled examples (the right answer is given for each) | A rule that maps inputs to the right outputs | Photographs of maize leaves labelled "healthy" or "diseased", used to classify new leaves |
| Unsupervised learning | Unlabelled data | Groups or patterns in the data | Grouping shop customers by what they buy, without being told the groups |
| Reinforcement learning | No examples; the program acts and receives rewards or penalties | A strategy that earns the most reward over time | A program learning to play a game, or a robot learning to walk |

:::keyfact{title="Choosing a method"}
Use supervised learning when labelled examples are available and the task is to predict a known kind of answer. Use unsupervised learning to discover structure when there are no labels. Use reinforcement learning when the program must make a series of decisions and can be told how well it did.
:::

## Artificial neural networks

A neuron computes **weighted sum + bias**, then applies an **activation function**:

| Activation function | Rule | Output for sums −2, 0 and 3 |
|:-:|:-:|:-:|
| Step | 1 if the sum is 0 or more, otherwise 0 | 0, 1, 1 |
| ReLU | the sum if positive, otherwise 0 | 0, 0, 3 |
| Sigmoid | 1 ÷ (1 + e^(−sum)), between 0 and 1 | 0.12, 0.5, 0.95 |

The neurons are arranged in layers: an **input layer** (the values), one or more **hidden layers** and an **output layer**. Information passes forward from the inputs to the output (the **forward pass**). The weights decide how much each input matters, and learning is the process of choosing good weights.

:::worked-solution{title="A forward pass"}
A network has two inputs, two hidden neurons and one output neuron, all using ReLU. The inputs are 2 and 3.

| Neuron | Inputs | Weights | Bias | Weighted sum + bias | Output (ReLU) |
|:-:|:-:|:-:|:-:|:-:|:-:|
| Hidden 1 | 2, 3 | 1, 2 | -4 | 1×2 + 2×3 − 4 = 4 | 4 |
| Hidden 2 | 2, 3 | −1, 1 | 0 | −1×2 + 1×3 + 0 = 1 | 1 |
| Output | 4, 1 | 0.5, 1 | -1 | 0.5×4 + 1×1 − 1 = 2 | 2 |

1. Hidden 1: 1 × 2 + 2 × 3 − 4 = 4, and ReLU leaves 4.
2. Hidden 2: −1 × 2 + 1 × 3 = 1, which stays 1.
3. Output: 0.5 × 4 + 1 × 1 − 1 = 2.
4. The network's output for the inputs 2 and 3 is **2**.
:::

### Deep learning

A network with **many hidden layers** is called a **deep** neural network, and training one is **deep learning**. The early layers learn simple features (for example edges in an image) and later layers combine them into complex ones (shapes, then objects), so the programmer does not have to design the features. Deep learning needs a large amount of data and a great deal of processing, but can give high accuracy for images, speech and text.

## Back propagation

At first the weights are guesses, so the output is wrong. Training repeats these steps:

1. do a forward pass and find the **error** (target output − actual output);
2. pass the error backwards through the layers, to work out how much each weight contributed;
3. change each weight a little in the direction that reduces the error: new weight = old weight + learning rate × error × input (for a simple linear neuron);
4. repeat for many examples until the error is small.

The **learning rate** is a small number that controls the size of each change: too large and the weights overshoot, too small and learning is slow.

:::worked-solution{title="One weight update"}
A single neuron has output = weight × input. The weight is 0.5, the input is 3, the target is 6 and the learning rate is 0.1.

| Quantity | Working | Value |
|:-:|:-:|:-:|
| Output | 0.5 × 3 | 1.5 |
| Error | 6 − 1.5 | 4.5 |
| Weight change | 0.1 × 4.5 × 3 | 1.35 |
| New weight | 0.5 + 1.35 | 1.85 |
| New output | 1.85 × 3 | 5.55 |

1. The output 1.5 is much less than the target 6, so the weight is too small.
2. The weight increases by 0.1 × 4.5 × 3 = 1.35 to 1.85.
3. With the new weight the output is 5.55, which is much closer to the target.
:::

## Regression

Linear regression fits a straight line `y = m x + c` to data. The **least squares** line is the one that makes the total of the squared vertical distances from the points as small as possible. For n points:

`m = (n × Σxy − Σx × Σy) ÷ (n × Σx² − (Σx)²)` and `c = (Σy − m × Σx) ÷ n`

:::worked-solution{title="A line for study hours and test scores"}
Six students record the hours x they studied for a test and the score y they obtained.

| Hours x | Score y | x × y | x² |
|:-:|:-:|:-:|:-:|
| 1 | 35 | 35 | 1 |
| 2 | 42 | 84 | 4 |
| 3 | 50 | 150 | 9 |
| 4 | 53 | 212 | 16 |
| 5 | 61 | 305 | 25 |
| 6 | 68 | 408 | 36 |
| **Sum 21** | **Sum 309** | **Sum 1194** | **Sum 91** |

1. Numerator: 6 × 1194 − 21 × 309 = 675. Denominator: 6 × 91 − 21² = 105.
2. The gradient is m = 675 ÷ 105 = 6.43 (to 2 decimal places).
3. The intercept is c = (309 − m × 21) ÷ 6 = 29.
4. The line is y = 6.43 x + 29. For 7 hours of study it predicts a score of 74.
:::

A prediction is reliable only for inputs inside the range of the data and when the relationship really is close to a straight line.

:::keyfact{title="ZIMSEC and Cambridge"}
Machine learning, neural networks, back propagation and regression are Cambridge A Level content (topic 18.1). ZIMSEC does not examine them.
:::

## Common mistakes

:::mistake{title="Confusing supervised and unsupervised learning"}
Supervised learning uses data that carries the right answers (labels). Unsupervised learning has no labels and looks for structure.
:::

:::mistake{title="Saying back propagation passes the inputs backwards"}
It is the **error** that is passed back through the network to adjust the weights.
:::

:::mistake{title="Forgetting the bias"}
Each neuron adds a bias to the weighted sum before the activation function is applied.
:::

:::mistake{title="Using regression far outside the data"}
A line fitted to 1 to 6 hours of study may not hold for 20 hours. Predictions are least reliable outside the range of the data.
:::

## Exam tips

:::exam-tip
Cambridge **Paper 3** may ask you to **describe** the categories of learning with an example, to **calculate** the output of a small network for given weights, or to **explain** back propagation. Show each neuron's weighted sum before the activation function.
:::

:::exam-tip
"**Explain** why deep learning needs large amounts of data and processing": there are many weights to adjust, and each must be set from many examples. "**Compare** supervised and unsupervised": labelled against unlabelled data, with an example of each.
:::

## Summary

:::summary
- Machine learning programs learn patterns from data; the categories are supervised, unsupervised and reinforcement learning.
- A neuron computes a weighted sum plus a bias and applies an activation function; layers of neurons form a neural network.
- Deep learning uses networks with many hidden layers to learn features automatically.
- Back propagation passes the output error backwards and adjusts the weights to reduce it.
- Least-squares regression gives the straight line closest to the data, used to predict new values.
:::
