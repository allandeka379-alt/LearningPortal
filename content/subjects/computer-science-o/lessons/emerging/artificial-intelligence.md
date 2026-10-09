---
{
  "key": "emerging.artificial-intelligence",
  "title": "Artificial intelligence and expert systems",
  "summary": "What artificial intelligence is; its characteristics (data and rules, reasoning, learning and adapting); expert systems (knowledge base, rule base, inference engine, interface) and machine learning; intelligent systems in use.",
  "concepts": ["comp.emerging.artificial-intelligence"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Rudo's phone suggests the next word as she types a message, sorts junk email out of her inbox, and unlocks when it recognises her face. An agricultural extension officer in Masvingo enters the symptoms of a sick maize crop into a program, which asks a few questions and then suggests the most likely disease and a treatment. None of these programs is "thinking" the way a person does, yet each behaves in a way we would call intelligent. This is **artificial intelligence** (AI).

Cambridge 0478 (topic 6.3) limits AI to **expert systems** and **machine learning**, and asks you to describe the main characteristics of AI and how these systems work. ZIMSEC Form 3 asks how **intelligent systems** are applied. Questions often ask you to name and describe the parts of an expert system, or to explain how a system learns.

## Key definitions

:::definition{term="Artificial intelligence (AI)"}
The branch of computer science dealing with the simulation of intelligent behaviour by computers, such as reasoning, recognising patterns, making decisions and learning.
:::

:::definition{term="Expert system"}
An AI system that uses a knowledge base and rules, built from the knowledge of human experts, to reason about a problem in a narrow field and give advice or a decision, with an explanation.
:::

:::definition{term="Machine learning"}
A type of AI in which a program automatically adapts its own processes and/or data, improving its performance from experience (data) without being explicitly reprogrammed.
:::

:::definition{term="Inference engine"}
The part of an expert system that applies the rules in the rule base to the facts in the knowledge base and the user's answers, to reach conclusions.
:::

## Characteristics of AI

Cambridge describes three main characteristics:

1. **A collection of data and the rules for using that data.** The system stores facts (the data) and rules that say what to do with them, for example "IF the leaves have yellow stripes AND the plant is stunted THEN the disease may be maize streak virus".
2. **The ability to reason.** The system applies its rules to the data and to new inputs to reach a conclusion, as a person reasons from evidence.
3. **The ability to learn and adapt** (in some AI systems). The system changes its own rules or data as a result of new information or feedback, so its performance improves.

## Expert systems

An expert system captures the knowledge of human experts (doctors, geologists, mechanics, agronomists) so that non-experts can use it. It has four components:

| Component | What it does |
|:--|:--|
| Knowledge base | A database of facts about the field, collected from experts and other sources |
| Rule base | A set of rules, usually IF … THEN rules, that relate facts to conclusions |
| Inference engine | Applies the rules to the facts and to the user's answers; decides which question to ask next; reaches a conclusion, often with a probability |
| Interface | Lets the user enter information and answer questions, and displays the conclusion, with an explanation of how it was reached |

### How an expert system is used

1. The **interface** asks the user a series of questions, usually yes/no or multiple-choice.
2. The **inference engine** compares the answers with the facts in the **knowledge base**, using the **rule base**.
3. Based on each answer, the inference engine chooses the next question, narrowing down the possibilities.
4. The system gives a conclusion or advice, often with a probability ("78% likely"), and can **explain** the reasoning (which rules were used).

### Uses and evaluation

Expert systems are used for medical diagnosis, plant and animal disease identification, mineral prospecting (predicting where ore deposits are likely), car and equipment fault diagnosis, tax and financial advice, and chess.

**Advantages:** expert knowledge is available anywhere, at any time, even where no expert is present; answers are consistent and not affected by tiredness; it can hold the knowledge of many experts; it can explain its reasoning. **Disadvantages:** expensive and slow to build; it is only as good as its knowledge base and rules; it lacks common sense and cannot deal with situations outside its field; users may trust it too much; the knowledge must be kept up to date.

## Machine learning

In machine learning, a program is given large amounts of example data and finds the patterns in it. It then uses those patterns to make predictions or decisions about new data. When it receives feedback ("this prediction was wrong"), it **adjusts its own processes or data**, so it becomes more accurate over time without a programmer rewriting it.

Examples include spam filters, recommending videos or products from what a user has watched or bought, recognising faces and speech, predictive text, detecting fraudulent card transactions, and estimating crop yields from satellite images.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0478 limits AI to expert systems and machine learning and names the three characteristics above. ZIMSEC Form 3 asks how intelligent systems are applied, so be ready to describe uses such as medical diagnosis, mineral exploration, voice assistants, face recognition and fraud detection, with their benefits and drawbacks.
:::

:::example
**An expert system for maize diseases.** Thandeka, an extension worker near Masvingo, uses an expert system on a tablet.

1. The **interface** asks: "Are there yellow stripes on the leaves?" She answers yes.
2. The **inference engine** checks the **rule base**. Rules with yellow stripes lead to two possible diseases, so it asks a question that tells them apart: "Are the plants stunted?" She answers yes.
3. A rule applies: IF yellow stripes AND stunted THEN maize streak virus is likely. The **knowledge base** holds the facts about this disease (how it spreads and how to control it).
4. The interface displays: "Maize streak virus is the most likely cause (high probability). Control the leafhoppers that spread it; remove badly infected plants." It explains which answers led to the conclusion.
5. The system did not learn anything from this session; only an expert or knowledge engineer updates its rules. This is the difference from machine learning.
:::

:::example
**How a spam filter learns.** Farai's email service uses machine learning.

1. The filter is trained on millions of emails already labelled "spam" or "not spam" and finds patterns (certain words, links, senders).
2. A new email arrives; the filter scores it using these patterns and moves it to the spam folder.
3. Farai marks the email "not spam" because it is from his school. This is feedback.
4. The filter **adapts its own data**: similar emails from that sender are now more likely to reach his inbox. No programmer changed the code; the system learned from experience.
:::

## Common mistakes

:::mistake{title="Saying an expert system learns by itself"}
A basic expert system reasons with fixed rules. **Machine learning** is the kind of AI that adapts its own processes or data.
:::

:::mistake{title="Mixing up the knowledge base and the inference engine"}
The knowledge base **stores** facts; the inference engine **reasons** with them.
:::

:::mistake{title="Saying AI is 'a computer that thinks like a human'"}
AI **simulates** intelligent behaviour. Use the examinable wording: simulation of intelligent behaviour by computers.
:::

## Exam tips

:::exam-tip
For "**describe** the components of an expert system", give each name with its job: knowledge base (facts), rule base (IF … THEN rules), inference engine (applies the rules to reach a conclusion), interface (questions in, conclusion and explanation out).
:::

:::exam-tip
For "**explain** how a system uses machine learning", mention training data, finding patterns, making a prediction, receiving feedback and **adapting its own processes or data**.
:::

## Summary

:::summary
- AI is the simulation of intelligent behaviour by computers.
- Its characteristics: data and rules for using that data; the ability to reason; and, in some systems, the ability to learn and adapt.
- An expert system has a knowledge base, a rule base, an inference engine and an interface; it asks questions, applies rules and gives a conclusion with an explanation.
- Machine learning programs find patterns in data and adapt their own processes or data from feedback.
- Intelligent systems are used in diagnosis, prospecting, fraud detection, recommendations, face and speech recognition.
:::
