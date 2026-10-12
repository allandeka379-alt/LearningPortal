---
{
  "key": "ethics.ai-impact",
  "title": "Artificial intelligence: applications and social impact",
  "summary": "What is meant by artificial intelligence, its applications in speech and image recognition, recommendation, robotics, translation and chatbots, and its social, economic and environmental impact: jobs, bias in data, privacy, safety and energy use, discussed with balanced arguments.",
  "concepts": ["acs.ethics.ai-impact"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A farmer near Chinhoyi photographs a maize leaf with a phone and an app suggests that it is showing signs of a disease. A bank customer asks a question in a chat window and receives an answer in seconds. A voice assistant types a message while a driver keeps both hands on the wheel. Each of these uses **artificial intelligence (AI)**. They are useful, but each also raises questions: Who is responsible if the app is wrong? Whose data was used to build it? Whose job has changed?

This lesson explains what AI is, describes its main applications and discusses its **social, economic and environmental impact** in a balanced way. How AI works (graphs, neural networks and machine learning) is covered in the lessons on graph search and machine learning; this lesson is about what AI does and what follows from it.

You should already know what an algorithm is and that programs can be trained on data.

## Key definitions

:::definition{term="Artificial intelligence (AI)"}
The use of computer systems to carry out tasks that normally need human intelligence, such as recognising speech or images, translating language, making decisions and learning from experience.
:::

:::definition{term="Bias (in AI)"}
A systematic unfairness in the results of an AI system, often caused by training data that does not represent all the people or cases that the system will be used with.
:::

:::definition{term="Automation"}
The use of machines or software to do work that was done by people, with little or no human help.
:::

## Applications of AI

| Application | How AI is used | A benefit | A concern |
|:-:|:-:|:-:|:-:|
| Speech recognition | Converts spoken words to text | Hands-free control; access for users who cannot type | May work poorly for accents or languages with little training data; recordings are personal data |
| Image recognition in agriculture | Identifies crop disease or pests from photographs | Early warning for farmers with few advisers | Wrong identification can lead to wrong treatment; needs local training images |
| Image recognition in medicine | Highlights possible disease in scans | Helps a specialist to review more images | Errors can harm patients; a person must stay responsible |
| Recommendation | Suggests items or videos from past behaviour | Saves time finding content | May trap users in a narrow range of content; uses personal data |
| Robotics | Machines that sense and act, e.g. in factories | Safe, repeatable work in dangerous settings | May replace workers; safety if it fails |
| Translation | Converts text between languages, including African languages | Wider access to information | Less accurate for languages with little written data |
| Chatbots | Answer customers' questions in writing or speech | Available all day and at low cost | May give wrong answers or fail to understand an upset customer |

In every application the system has learned from data that people collected, and its results are estimates, not certainties. A responsible user treats them as help for a human decision, not as the final word, especially where health or safety is involved.

## Impact of AI

### Jobs and the economy

- **Jobs can be lost** when a task is automated, for example an answering service replaced by a chatbot, or a repeated factory task by a robot.
- **Jobs can change or be created**: people are needed to collect and check data, build and maintain systems, and handle the cases that the system cannot.
- **Productivity** can rise, so that a small business can do work that needed more staff, and services can reach people who were too far away or too costly to serve.
- **Skills** matter: workers whose tasks are automated may need training for new work, and the benefits may go to some regions or groups more than others.

### Bias and fairness

An AI system learns from examples. If the examples do not cover everyone fairly, its errors will fall more heavily on those who are missing. The test below uses invented classroom figures to show the effect.

:::worked-solution{title="Bias in a speech-recognition app"}
An app is trained on 10 000 recordings and then tested on 100 recordings from each of two groups of speakers. (The figures are invented to illustrate the idea.)

| Speaker group | Training recordings | Share of training data | Test recordings | Correct | Accuracy |
|:-:|:-:|:-:|:-:|:-:|:-:|
| Group A (language with a great deal of training data) | 9000 | 90% | 100 | 92 | 92% |
| Group B (language with little training data) | 1000 | 10% | 100 | 71 | 71% |

1. Group A makes up 90% of the training data and Group B only 10%.
2. The app is 92% accurate for Group A but only 71% accurate for Group B: a gap of 21 percentage points.
3. The overall accuracy across the two groups is 81.5%, which hides the difference. Quoting only the overall figure would make the app look fairer than it is.
4. The cause is the training data, not the speakers. The remedy is to collect more recordings from Group B, test every group separately and keep a person able to correct the results.
:::

### Privacy and safety

Many systems need personal data such as recordings, photographs, locations and purchases. This data must be collected with permission, stored securely and used only for the stated purpose. In safety-related uses (a medical scan, a vehicle, a machine) an error can hurt people, so there must be testing, a way to stop the system and a person who is accountable. It should be possible to explain, at least in outline, how a decision that affects someone was reached.

### Environment

Training a large AI model needs many powerful computers, which use a lot of electricity and produce heat that has to be removed. The energy comes from power stations, which may produce greenhouse gases, and the equipment eventually becomes e-waste. On the other hand AI can help the environment, for example by finding disease early in crops, predicting demand to reduce waste and managing power use more efficiently.

## Balanced arguments

:::example{title="Should a clinic use an AI tool to read chest X-rays?"}
**For:** it can check images quickly, point out suspicious areas for a doctor to look at, and help a clinic with few specialists to see more patients.

**Against:** it may be less accurate for patients unlike those it was trained on; patients' images are personal data that must be protected; staff may come to trust it too much.

**A reasonable conclusion:** use it as a second pair of eyes with a qualified person making the final decision, test it on local patients, and tell patients how their data is used.
:::

:::keyfact{title="How to structure a discussion"}
Give at least two benefits and two concerns, name who is affected, and finish with a judgement that follows from your points. Avoid saying that AI is simply good or simply bad.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
The applications and impact of AI are Cambridge AS content (topic 7, ethics). ZIMSEC covers social, ethical and environmental effects of computing in general but not AI as a separate topic.
:::

## Common mistakes

:::mistake{title="Saying AI is always accurate"}
AI systems make errors, and their accuracy can differ between groups of people.
:::

:::mistake{title="One-sided answers"}
A question that says "discuss" needs both benefits and drawbacks. Describing only job losses, or only advantages, scores poorly.
:::

:::mistake{title="Blaming the machine"}
AI systems are built, trained and used by people, who remain responsible for the results.
:::

:::mistake{title="Making up statistics"}
Do not quote percentages or numbers of jobs lost. Argue from reasons and examples.
:::

## Exam tips

:::exam-tip
Cambridge **Paper 1** may ask you to **describe** an application of AI, to **state** a concern such as bias or privacy, or to **discuss** the effects of AI on employment or the environment. Use the form: point, reason, example from a context such as agriculture, health or a bank.
:::

:::exam-tip
"**Explain** how bias arises": the training data does not represent all groups, so the system makes more mistakes for those groups; it can be reduced by collecting more representative data and testing groups separately.
:::

## Summary

:::summary
- AI systems carry out tasks that normally need human intelligence, such as recognising speech and images, recommending, translating and chatting.
- Benefits include speed, access and safer work; concerns include job loss, bias, privacy, safety and energy use.
- Bias comes from unrepresentative training data, and an overall accuracy figure can hide it.
- Humans stay responsible for decisions made with AI, especially for health and safety.
- In a discussion give benefits and drawbacks, name who is affected and reach a supported conclusion.
:::
