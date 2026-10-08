---
{
  "key": "number.time",
  "title": "Time",
  "summary": "Convert between units of time and between the 12-hour and 24-hour clocks, calculate time intervals, read timetables and work with time zones.",
  "concepts": ["math.number.time"],
  "objectives": ["zimsec/o-level/mathematics:4.1.2", "cambridge/igcse/mathematics:1.15.1", "cambridge/igcse/mathematics:1.15.2", "cambridge/igcse/mathematics:1.15.3"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Coach timetables, school bells, football fixtures and flight bookings all depend on time. Time is tricky because it does not use base ten: there are 60 minutes in an hour and 24 hours in a day, so the usual column methods for decimals do not work. This lesson shows reliable methods for the questions that appear on exam papers.

## Key definitions

:::keyfact{title="Units of time"}
$60$ seconds $= 1$ minute; $60$ minutes $= 1$ hour; $24$ hours $= 1$ day; $7$ days $= 1$ week; $365$ days $= 1$ year ($366$ in a leap year).
:::

:::definition{term="12-hour clock"}
Times from 1 to 12 followed by **am** (midnight to just before noon) or **pm** (noon to just before midnight), for example 6:20 pm.
:::

:::definition{term="24-hour clock"}
Times written with four digits from 00:00 (midnight) to 23:59, for example 18:20. No am or pm is needed.
:::

:::definition{term="Time zone"}
A region that uses the same local time. Zimbabwe uses Central Africa Time, which is **UTC+2**: two hours ahead of Coordinated Universal Time (UTC).
:::

## Changing between the 12-hour and 24-hour clocks

- Morning (am) times keep their digits: 7:05 am is 07:05.
- Afternoon and evening (pm) times: add 12 to the hours. 3:45 pm is 15:45.
- The hour after midnight is 00: 12:40 am is 00:40.
- The hour after noon stays 12: 12:40 pm is 12:40.

## Time intervals

Do not subtract times like decimals. Count on in steps: up to the next whole hour, then whole hours, then the remaining minutes.

:::worked-solution[Example 1: how long is it from 08:47 to 13:15?]
1. 08:47 to 09:00 is 13 minutes.
2. 09:00 to 13:00 is 4 hours.
3. 13:00 to 13:15 is 15 minutes.
4. Total: 4 hours and $13 + 15 = 28$ minutes, so 4 h 28 min.
:::

Subtracting $13.15 - 8.47$ would give $4.68$, which is meaningless: there is no such thing as 68 minutes past an hour.

When an interval passes midnight, split it there. From 21:50 to 06:15 the next morning is 2 h 10 min to midnight plus 6 h 15 min, which is 8 h 25 min.

## Timetables

This is the timetable of an example coach service between Harare and Bulawayo.

| Stop | Coach A | Coach B |
| --- | :---: | :---: |
| Harare (depart) | 07:30 | 13:15 |
| Chegutu | 08:40 | 14:20 |
| Kadoma | 09:25 | 15:00 |
| Kwekwe | 10:30 | 16:05 |
| Gweru | 11:35 | 17:05 |
| Bulawayo (arrive) | 14:05 | 19:30 |

:::worked-solution[Example 2: using the timetable]
How long does Coach A take from Harare to Bulawayo, and which coach is faster?
1. Coach A: 07:30 to 14:05. 07:30 to 08:00 is 30 min; 08:00 to 14:00 is 6 h; 14:00 to 14:05 is 5 min. Total 6 h 35 min.
2. Coach B: 13:15 to 19:30. 13:15 to 19:15 is 6 h; plus 15 min. Total 6 h 15 min.
3. Coach B is faster by 20 minutes.
:::

## Time zones (Cambridge)

Places to the east of Zimbabwe are usually **ahead** of us, and places to the west are **behind**. Use the UTC offsets to find the difference: Dubai is UTC+4, so it is $4 - 2 = 2$ hours ahead of Harare.

:::worked-solution[Example 3: a flight from Harare to Dubai]
A flight leaves Harare at 23:30 local time and takes 6 h 45 min. Dubai is UTC+4. Find the local time in Dubai when it lands.
1. Arrival in Harare time: 23:30 + 6 h 45 min. 23:30 + 30 min = 00:00; then 6 h 15 min more gives 06:15 the next day.
2. Dubai is 2 hours ahead of Harare.
3. Local time in Dubai: 06:15 + 2 h = 08:15 the next day.
:::

Some countries change their clocks in summer, so their UTC offset changes during the year. Exam questions always give you the offset or the time difference to use.

## Changing units

- Hours and minutes to minutes: $3$ h $25$ min $= 3 \times 60 + 25 = 205$ minutes.
- Large numbers of hours to days: $2000 \div 24 = 83$ remainder $8$, so 2000 hours $= 83$ days $8$ hours.

## Common mistakes

:::mistake{title="Subtracting times as decimals"}
13:15 − 08:47 is not 4.68 hours or "4 h 68 min". Count on in hours and minutes.
:::

:::mistake{title="Mixing up 12 am and 12 pm"}
12:40 pm is just after noon (12:40); 12:40 am is just after midnight (00:40).
:::

:::mistake{title="Adding the time difference the wrong way"}
If a city is ahead of Harare, its clock shows a **later** time. When it is 10:00 in Harare it is 12:00 in Dubai, not 08:00.
:::

:::mistake{title="Writing 24-hour times with am or pm"}
"15:45 pm" is wrong. A 24-hour time never has am or pm.
:::

## Exam tips

:::exam-tip
Write intermediate steps such as "08:47 → 09:00 = 13 min". A single slip then costs one mark rather than all of them.
:::

:::exam-tip
For journeys that cross time zones, work out the arrival time in the departure city's time first, then convert to local time at the end.
:::

:::exam-tip
Read whether the question wants the answer in hours and minutes, in minutes only, or as a time of day.
:::

## Summary

:::summary
- 60 s = 1 min, 60 min = 1 h, 24 h = 1 day; time is not base ten.
- pm times: add 12 to the hours for the 24-hour clock; 12 am is 00 hours.
- Find intervals by counting on to the next hour, then whole hours, then minutes, splitting at midnight if needed.
- Read timetables row by row and column by column; the journey time is arrival minus departure.
- Zimbabwe is UTC+2; places ahead of Zimbabwe show later times.
:::
