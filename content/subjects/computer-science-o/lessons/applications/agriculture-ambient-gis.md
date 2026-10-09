---
{
  "key": "applications.agriculture-ambient-gis",
  "title": "Computers in agriculture, ambient systems and GIS",
  "summary": "Computer use in agriculture (precision farming, irrigation control, livestock records, market information), ambient (smart) systems in homes and buildings, geographic information systems and their uses, and how to design a model of such a system.",
  "concepts": ["comp.applications.agriculture-ambient-gis"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Agriculture employs more Zimbabweans than any other sector, and computers are changing how it is done. A commercial farmer near Chinhoyi steers a GPS-guided tractor that plants maize in perfectly straight rows; a smallholder in Gutu receives today's cattle prices by text message before deciding which market to visit; an irrigation scheme on the Lowveld switches pumps on only when soil sensors show the crop needs water. Meanwhile, in a new office block in Harare the lights dim when daylight is bright and the air conditioning switches off in empty rooms, and a council planner overlays maps of roads, water pipes and new houses on one screen.

ZIMSEC includes agriculture in every form of topic 6.2, and Form 4 asks you to **design models** of agricultural systems, ambient systems and geographic information systems (GIS). A model here means a clear description of the system: its inputs, processing, outputs and how the parts work together.

## Key definitions

:::definition{term="Precision farming"}
Using GPS, sensors, drones and computers to measure conditions in different parts of a field and apply exactly the right amount of seed, water, fertiliser or pesticide to each part.
:::

:::definition{term="Ambient (smart) system"}
A system built into a home or building that uses sensors and computers to detect the people and conditions around it and respond automatically, often without the occupants having to give commands.
:::

:::definition{term="Geographic information system (GIS)"}
A computer system that captures, stores, analyses and displays data linked to locations on the Earth's surface, usually as map layers that can be combined and queried.
:::

:::definition{term="Radio-frequency identification (RFID) tag"}
A small tag containing a chip and an antenna whose identity number can be read by radio waves from a short distance, for example an ear tag on a cow.
:::

## Computers in agriculture

| Use | How it works | Benefit |
|:--|:--|:--|
| Precision farming | GPS-guided tractors plant and spray accurately; yield monitors on harvesters map yields across a field; drones photograph crops to spot disease or water stress; the computer produces a map telling the spreader how much fertiliser to apply where | Less waste of seed, fertiliser and chemicals; higher yields |
| Irrigation control | Soil-moisture sensors send readings to a controller that compares them with set values and switches pumps or valves on and off | Water and electricity saved; crops never too dry or waterlogged |
| Greenhouse and poultry house control | Temperature, humidity and light sensors; computer controls fans, heaters, misters, lights and feeders | Ideal conditions day and night |
| Livestock records | RFID ear tags identify each animal; readers at gates and scales record weight, vaccinations, breeding and movements in a database | Traceability for disease control and export; better breeding decisions; deters stock theft |
| Market information | Price information sent by SMS or apps; online platforms connect farmers with buyers | Farmers sell at the best price and time |
| Farm management | Spreadsheets and databases for inputs, costs, labour, sales and weather records | Better planning and budgeting |

**Drawbacks:** high cost of equipment; farmers need training and reliable power and network coverage; equipment can fail or be stolen; small-scale farmers may not afford it, widening the gap with large farms.

## Ambient (smart) systems

An ambient system blends into its surroundings: the people using it may hardly notice it. Typical features:

- **Lighting:** motion and light sensors switch lights on only when someone is present and it is dark, and dim them when there is enough daylight.
- **Climate:** temperature sensors and timers control heating, fans and air conditioning room by room.
- **Security:** door and window sensors, motion detectors and cameras; alerts to a phone; smart locks.
- **Appliances and energy:** appliances and geysers switched on when electricity is cheapest or when solar panels are producing; energy use displayed.
- **Assisted living:** sensors detect if an elderly person has fallen or not moved for a long time and alert relatives.
- **Control:** devices can also be controlled by phone app or voice.

**Benefits:** comfort and convenience; energy and money saved; improved security; independence for elderly or disabled people. **Drawbacks:** expensive to install; depends on power and the network; devices connected to the internet can be hacked; privacy concerns about cameras and data collected on the occupants' habits.

## Geographic information systems

A GIS stores data in **layers**, each tied to map co-ordinates: for example roads, rivers, boreholes, soil types, rainfall, population and land ownership. The user can display several layers together and **query** them ("show areas within 2 km of a river, with sandy soil, that are not in a national park").

**Inputs:** satellite images, aerial photographs, GPS surveys, census and field data. **Processing:** combining layers, measuring distances and areas, finding patterns. **Outputs:** maps, charts and reports.

**Uses:** planning roads, schools and clinics; managing water, forests and wildlife; agriculture (soil and rainfall maps); disaster management (flood risk maps, routing emergency services); utilities (where pipes and cables run); tracking disease outbreaks; mining exploration.

**Benefits:** many types of data combined and analysed quickly; better, evidence-based decisions; maps easily updated. **Drawbacks:** expensive software and data; trained staff needed; results depend on accurate, up-to-date data.

## Designing a model of a system

To design a model, describe the system in four parts:

1. **Purpose:** what problem it solves and for whom.
2. **Inputs:** sensors, readers or data sources, and what each measures.
3. **Processing:** what is stored (limits, records, map layers) and what the computer compares, calculates or decides.
4. **Outputs:** actuators, alerts, screens, maps or reports, and when each happens.

:::example
**Model of a smart irrigation system for a smallholder plot in Gutu.**

1. **Purpose:** water a vegetable plot only when needed, saving water from a small borehole.
2. **Inputs:** a soil-moisture sensor in each bed; a rain sensor; a water-level sensor in the storage tank.
3. **Processing:** the microcontroller stores a minimum moisture level for each bed. Every 10 minutes it compares each reading with the minimum. It does not water if the rain sensor shows rain or if the tank is nearly empty.
4. **Outputs:** a valve (actuator) opens for each dry bed until its reading reaches the set level; a text message warns the farmer when the tank is low; daily water use is logged.
:::

:::example
**Using a GIS to choose a site for a new borehole.** A district council near Beitbridge needs a borehole for a village.

1. Layers loaded: village locations, existing boreholes, geology (rock types likely to hold water), roads, and land that is protected or privately owned.
2. Query: areas more than 3 km from an existing borehole, within 1 km of the village, on water-bearing rock, near a road for the drilling rig, and not on protected land.
3. Output: a map highlighting the few areas that meet every condition, which a geologist then visits.
4. Benefit: the council avoids drilling dry holes, which are expensive.
:::

## Common mistakes

:::mistake{title="Describing a GIS as 'a map'"}
A GIS is a **system** that stores, combines and analyses location-based data in layers. A map is one of its outputs.
:::

:::mistake{title="Saying ambient systems need the user to give commands"}
The point of an ambient system is that it **senses and responds automatically**; commands by app or voice are an extra.
:::

## Exam tips

:::exam-tip
For "**design a model**", use the headings purpose, inputs, processing, outputs, and name real sensors and actuators. Examiners reward a clear, workable design more than long prose.
:::

:::exam-tip
In agriculture questions, link each technology to a specific saving: water, fertiliser, labour, or losses from theft and disease.
:::

## Summary

:::summary
- Agriculture uses precision farming, sensor-controlled irrigation and greenhouses, RFID livestock records, market price services and farm management software.
- Ambient (smart) systems sense people and conditions in homes and buildings and control lighting, climate, security and appliances automatically.
- A GIS stores location-based data in layers that can be combined, queried and displayed as maps; it is used for planning, resources, agriculture and disasters.
- A model of a system states its purpose, inputs, processing and outputs.
:::
