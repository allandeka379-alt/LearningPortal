---
{
  "key": "applications.transport-health-environment",
  "title": "Computers in transport, health and environmental management",
  "summary": "Computer systems for transport management (ticketing and booking, traffic control, vehicle tracking), health (patient records, monitoring, diagnosis support, health information systems) and environmental management (monitoring weather, pollution and natural resources).",
  "concepts": ["comp.applications.transport-health-environment"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A long-distance bus leaves Harare for Bulawayo. Its seats were booked online, its position is tracked by GPS so the depot knows when it will arrive, and the traffic lights it passes through in the city are timed by a computer. At a district hospital along the route, a nurse looks up a patient's record on a computer, while a monitor beside another bed sounds an alarm when a heart rate rises too high. Further on, an automatic weather station on a farm sends rainfall readings to a national database used to warn of drought.

ZIMSEC Form 2 (topic 6.2, Application of Computer Science) asks how computers are applied in transport management, health and environmental management. As with all applications questions, marks come from naming the system, describing how it works (input, processing, output) and giving specific benefits and drawbacks.

## Key definitions

:::definition{term="Global Positioning System (GPS)"}
A satellite navigation system: a receiver calculates its exact position on Earth from the signals of several satellites.
:::

:::definition{term="Vehicle tracking system"}
A system in which a GPS receiver in each vehicle sends its position over the mobile network to a central computer, which shows every vehicle on a map.
:::

:::definition{term="Electronic health record (EHR)"}
A patient's medical history (personal details, diagnoses, treatments, medicines, test results, allergies) stored on a computer system so that authorised staff can access it.
:::

:::definition{term="Patient monitoring system"}
A computer-controlled system that uses sensors to measure a patient's vital signs continuously, displays them and raises an alarm when a reading goes outside safe limits.
:::

:::definition{term="Data logging"}
Collecting data automatically from sensors at set time intervals and storing it for later analysis.
:::

## Transport management

| System | How computers are used | Benefits |
|:--|:--|:--|
| Booking and ticketing | Customers book bus, rail or air seats online or at a terminal; the central database records which seats are sold, preventing double booking; e-tickets with barcodes or QR codes are scanned when boarding | Book any time; fewer queues; no double booking |
| Traffic control | Sensors (induction loops in the road, cameras) count vehicles; a computer changes the timing of traffic lights to reduce queues; cameras detect speeding or red-light offences | Smoother traffic flow; fewer accidents; less fuel wasted |
| Vehicle tracking and fleet management | GPS receivers in vehicles send positions to a central computer; managers plan routes, check speed and fuel use, and locate stolen vehicles | Efficient routes; safer driving; theft recovery; arrival times for customers |
| Navigation | Satellite navigation calculates the best route and updates it if there is congestion | Fewer wrong turns and delays |
| Toll gates and licensing | Vehicle registration and tolls paid electronically; databases of vehicles and drivers | Faster payment; easier checking by authorities |

**Drawbacks:** systems are expensive to install and maintain; a computer or power failure can cause chaos (traffic lights failing, booking systems offline); tracking raises privacy concerns for drivers; online booking excludes people without internet access.

## Health

- **Patient records:** electronic health records replace paper files. They can be searched instantly, shared between departments and clinics, and backed up. Prescriptions can be checked against allergies automatically.
- **Patient monitoring:** sensors measure heart rate, blood pressure, temperature and blood oxygen continuously. The computer compares each reading with safe limits set by the doctor and sounds an alarm if a reading is outside them, freeing nurses from constant manual checks.
- **Diagnosis support:** expert systems and medical imaging (X-ray, ultrasound, scans) help doctors identify conditions; images can be sent to specialists far away (telemedicine).
- **Health information systems:** clinics send figures (cases of malaria, vaccinations given, births) to a national database, so health authorities can track outbreaks and plan where to send medicines.
- **Other uses:** pharmacy stock control, appointment booking, and computer-controlled equipment such as dialysis machines.

**Drawbacks:** patient data is highly sensitive, so it must be protected from hackers and unauthorised staff; equipment is expensive; staff need training; a system failure could stop access to records; over-reliance on computer alarms.

## Environmental management

- **Weather monitoring:** automatic weather stations log temperature, rainfall, humidity, wind speed and pressure. Computers use the data in models to produce forecasts and early warnings of storms, floods and drought.
- **Pollution monitoring:** sensors measure air quality near factories and mines, or the pH and chemical content of rivers; readings outside legal limits trigger warnings.
- **Natural resources:** satellite images and geographic information systems map forests, land use and water levels in dams; data loggers record river flow.
- **Wildfire and flood warnings:** sensor networks and satellite images detect fires and rising water, and alerts are sent by text message.

**Benefits:** readings are taken day and night, in remote or dangerous places, more accurately than by hand; large amounts of data can be analysed to spot trends; early warnings save lives and crops. **Drawbacks:** equipment in remote areas can be damaged, stolen or lose power; installation is costly; forecasts from models are not always right.

:::example
**How a patient monitoring system works.** Rudo is recovering from an operation at a hospital in Mutare.

1. **Input:** sensors attached to Rudo measure her heart rate, blood pressure and blood oxygen continuously.
2. **Processing:** the readings are converted to digital and sent to a computer, which compares each reading with the safe range entered by the doctor.
3. **Output:** the readings are shown on a screen as numbers and graphs and stored in her record. If a reading goes outside the range, an alarm sounds at the nurses' station.
4. **Benefit:** nurses can watch several patients at once and respond immediately. **Drawback:** a faulty sensor can cause false alarms, so staff must still check patients.
:::

:::example
**A city traffic control system.** Bulawayo's city council wants to reduce queues at a busy junction.

1. Induction loops under the road and cameras detect how many vehicles are waiting in each direction.
2. The traffic control computer receives the counts and compares them with the queues on other approaches.
3. It lengthens the green light for the busier road and shortens it for the quieter one, and coordinates lights along the route so that traffic moves in a "green wave".
4. Benefits: shorter queues, less fuel wasted and less pollution. Drawbacks: cost of sensors and cameras; if power fails, the lights stop working unless there is a backup supply.
:::

## Common mistakes

:::mistake{title="Saying GPS tracks the vehicle by itself"}
The GPS receiver only works out its position. A **tracking** system also needs a mobile network link to send the position to a central computer.
:::

:::mistake{title="Saying patient monitors replace nurses"}
They support nurses by checking continuously and raising alarms; staff still assess and treat the patient.
:::

## Exam tips

:::exam-tip
Structure "**describe** how the system works" as input (sensors, scanners), processing (compare with limits, update the database) and output (screen, alarm, report).
:::

:::exam-tip
For health systems, always mention **data security and confidentiality** among the drawbacks: patient records are personal data.
:::

## Summary

:::summary
- Transport: online booking and e-tickets, computer-controlled traffic lights, GPS vehicle tracking and navigation.
- Health: electronic health records, patient monitoring with alarms, diagnosis support and telemedicine, national health information systems.
- Environment: automatic weather stations, pollution sensors, satellite images and GIS, early warning systems.
- Benefits: continuous, accurate, fast, life-saving; drawbacks: cost, failures, privacy and security of data.
:::
