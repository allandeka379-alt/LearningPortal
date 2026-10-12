---
{
  "key": "enterprise.application-areas",
  "title": "Application areas of computer science and global trends",
  "summary": "How computer science is applied in engineering, research and development, agriculture, e-learning and telecommunications with local examples, and what global trends such as cloud computing, artificial intelligence, the internet of things, blockchain and green computing mean for Zimbabwe.",
  "concepts": ["acs.enterprise.application-areas"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A farmer near Kadoma checks the moisture of her soil on a phone and a pump switches on by itself. A civil engineer in Harare tests a bridge design on a computer before any concrete is poured. A learner in Hwange watches a recorded science lesson over a mobile network. These are not separate technologies but separate **application areas** of the same ideas: sensors, data, programs, networks and storage working together.

For the Enterprising part of the ZIMSEC syllabus you need to show where computer science is applied, with local examples, and to analyse the **global trends** that will shape the next ten years. Questions ask for examples, benefits, risks and a judgement about what a trend means for Zimbabwe. You should already know about the internet, embedded control and data storage from earlier lessons.

## Key definitions

:::definition{term="Application area"}
A sector of work or life, such as agriculture or education, in which computer systems are used to solve problems or to do tasks better.
:::

:::definition{term="Precision farming"}
Using sensors, drones, satellite images and software to apply water, fertiliser and chemicals only where and when they are needed on each part of a field.
:::

:::definition{term="Internet of things (IoT)"}
A network of everyday devices fitted with sensors and software that collect and exchange data over the internet.
:::

:::definition{term="Global trend"}
A development in computing that is spreading across the world and changing how people and organisations work.
:::

## Application areas

| Area | Uses of computers | Local example |
|---|---|---|
| **Engineering** | Computer-aided design (CAD), simulation and testing of structures, embedded controllers in machines, control of power stations | An engineer simulates the load on a bridge before building it |
| **Research and development** | Modelling and simulation, analysing large sets of data, sharing results online | Researchers analyse weather records to study rainfall patterns |
| **Agricultural mechanisation** | Soil and weather sensors, irrigation control, drones for monitoring and spraying, farm records, tracking of livestock | A pump switches on when the soil is dry |
| **E-learning** | Learning platforms, recorded and live lessons, online assessments, digital libraries | A learner in a rural school watches a recorded lesson on a phone |
| **Telecommunications** | Mobile and fixed networks, mobile money, messaging, billing and network management by software | Paying school fees using mobile money |

### Precision farming: a control rule

An irrigation controller reads a soil moisture sensor every hour. The rule is: if the reading is below 30 (the soil is dry) the pump runs for 20 minutes.

```python
readings = [42, 35, 29, 26, 33, 31, 28]
pump_minutes = 0
for hour, moisture in enumerate(readings, start=8):
    if moisture < 30:
        action = "ON"
        pump_minutes = pump_minutes + 20
    else:
        action = "OFF"
    print(hour, moisture, action)
print("Pump minutes:", pump_minutes)
```

```
8 42 OFF
9 35 OFF
10 29 ON
11 26 ON
12 33 OFF
13 31 OFF
14 28 ON
Pump minutes: 60
```

:::worked-solution{title="Reading the irrigation log"}
| Hour | Moisture reading | Pump |
|:-:|:-:|:-:|
| 8 | 42 | OFF |
| 9 | 35 | OFF |
| 10 | 29 | ON |
| 11 | 26 | ON |
| 12 | 33 | OFF |
| 13 | 31 | OFF |
| 14 | 28 | ON |

1. A reading below 30 switches the pump on: the readings 29, 26 and 28 do, and 31 does not.
2. The pump therefore runs three times: 3 × 20 = 60 minutes.
3. The farmer saves water and labour because the pump runs only when needed, and she can check the log from a phone.
:::

:::worked-solution{title="Planning a drone spraying job"}
A drone sprays 3.5 hectares in one flight. A flight takes 20 minutes including the battery change. A farm has 56 hectares.

1. Flights needed = 56 ÷ 3.5 = 16 flights.
2. Time = 16 × 20 = 320 minutes, which is 5 hours 20 minutes.
3. Benefits: faster than spraying by hand and the chemical can be placed exactly. Costs and risks: the price of the drone, the training of the operator, rules about flying and the weather.
:::

:::worked-solution{title="How much data does a video lesson use?"}
A recorded lesson lasts 40 minutes and the video is sent at 0.7 megabits per second. A learner has a data bundle of 1 GB (take 1 GB = 1024 MB).

1. Time = 40 × 60 = 2400 seconds.
2. Data = 0.7 × 2400 = 1680 megabits.
3. In megabytes: 1680 ÷ 8 = 210 MB.
4. Lessons per bundle = 1024 ÷ 210 = 4.9, so the learner can watch 4 whole lessons.
5. E-learning planners therefore offer lessons that can be downloaded once and viewed offline, or low-quality versions.
:::

## Benefits and limits that all the areas share

Whatever the area, computer systems bring similar benefits: work is done **faster**, with fewer **errors**, at a lower cost per task, and records are kept in a form that can be searched and analysed. They also share limits. Equipment and training cost money, the system stops when electricity or the network fails, data must be protected from loss and misuse, and some workers need new skills or may find their jobs changed. A good answer on any application area therefore names the technology, says what job it does, gives one benefit and one limit, and links them to a local setting such as a farm in Kadoma, a clinic in Hwange or a school with an unreliable signal.

## Global trends and Zimbabwe

| Trend | What it is | Opportunity for Zimbabwe | Challenge |
|---|---|---|---|
| **Cloud computing** | Renting storage, servers and software over the internet | Small firms and schools use powerful systems without buying servers | Cost and reliability of the internet; data kept abroad |
| **Artificial intelligence** | Programs that learn from data to make predictions or decisions | Crop disease detection, translation, support for learners | Needs data and skills; bias and effects on jobs |
| **Internet of things** | Sensors and connected devices | Water, energy and farm monitoring | Security of many small devices; cost |
| **Blockchain** | A shared record of transactions that is hard to change | Possible use in land, supply-chain and payment records | Energy use of some systems; new laws and skills needed |
| **Green computing** | Using less energy and producing less e-waste | Lower electricity bills, solar power, longer-lived equipment | Higher cost of efficient equipment; e-waste handling |

When you analyse a trend, separate three questions. *What is it?* Give a one-sentence meaning. *Who gains?* Name the people or organisations in Zimbabwe that could benefit, such as farmers, learners, small businesses or clinics. *What stands in the way?* Name the main obstacle, which is often cost, electricity, skills, security or law. Examiners reward answers that connect all three to a specific example.

:::example{title="Analysing a trend for a rural school"}
A rural secondary school wants to use cloud-based learning software. *Benefits*: learners reach lessons from phones, teachers share resources and the school avoids buying a server. *Challenges*: unreliable electricity and a weak signal, the cost of data, and the need to train teachers. *Judgement*: the school should start with lessons that can be downloaded and used offline, add solar power for the computer room and expand when the connection improves.
:::

:::keyfact{title="ZIMSEC only"}
This is a ZIMSEC Enterprising topic (Form 5). Cambridge examines artificial intelligence under its own topics and does not examine the other application areas. Use local examples and give a benefit and a challenge for every trend.
:::

## Common mistakes

:::mistake{title="Giving a trend without a link to Zimbabwe"}
"Cloud computing stores data on the internet" is not enough. Say what it means locally: for example that small businesses can rent software but depend on a reliable and affordable connection.
:::

:::mistake{title="Listing only benefits"}
Examiners ask for analysis. Each application and trend has costs and risks, such as training, security, power supply and data costs.
:::

:::mistake{title="Confusing megabits and megabytes"}
Network speeds are in bits per second; file sizes are in bytes. Divide bits by 8 to get bytes.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 1 asks you to *identify application areas*, *describe how computers are used* in one of them, and *analyse a global trend*. Use the pattern: area, device or software, what it does, benefit, then a limit. For a trend give meaning, a benefit for Zimbabwe and a challenge. Short calculations on data use or coverage need each step shown.
:::

## Summary

:::summary
- Computer science is applied in engineering, research and development, agriculture, e-learning and telecommunications, each with local examples.
- Precision farming uses sensors, control rules and drones to apply water and chemicals only where needed.
- E-learning depends on the data size of lessons and on connection cost: size in bytes = bits ÷ 8.
- Global trends include cloud computing, artificial intelligence, the internet of things, blockchain and green computing.
- For each trend give its meaning, an opportunity for Zimbabwe and a challenge.
:::
