import { t, table, dpStr, chk } from "../lib.mjs";
import { writeLesson } from "./w1a-_write.mjs";

const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
const px = 6000, cell = 30, bands = 6;
const swath = (px * cell) / 1000; // km
const bytes = px * px * bands;
const mb = bytes / 1e6;
const burn = 2; // km2
const nPix30 = (burn * 1e6) / (cell * cell);
const nPix10 = (burn * 1e6) / (10 * 10);
const imgs = 365 / 16;
console.log({ swath, bytes, mb, nPix30, nPix10, imgs });
chk(nPix10 / nPix30, 9, 1e-9);

const body = t`
## Introduction

Not every satellite image suits every job. An image that shows individual buildings may arrive only every few weeks, while one that arrives daily may show a whole province in a few hundred pixels. Choosing the right data, displaying it in a way the eye can read and interpreting what is seen are the skills of this lesson. In ZIMSEC Form 6 and Paper 3 you may be asked to choose imagery for a task, explain a colour composite or describe how an image is turned into a map.

You should already know the remote sensing system, the spectrum bands and the spectral signatures of vegetation, water and soil (see the lesson on the remote sensing system).

## Key definitions

:::definition{term="Spatial resolution"}
The size of the smallest area on the ground that one pixel represents, such as 10 m or 30 m. Smaller pixels show finer detail.
:::

:::definition{term="Temporal resolution"}
How often a sensor can view the same place again (revisit time), for example daily or every 16 days.
:::

:::definition{term="Spectral resolution"}
The number and narrowness of the wavelength bands a sensor records. More, narrower bands allow finer separation of surfaces.
:::

:::definition{term="Colour composite"}
An image made by assigning three bands to the red, green and blue colours of a screen. The colours shown depend on which bands are assigned.
:::

:::definition{term="False-colour composite"}
A composite in which a band outside the visible range, usually near infrared, is shown in a visible colour so that features such as vegetation stand out.
:::

## Four kinds of resolution

| Resolution | Meaning | Example (approximate) | Trade-off |
|---|---|---|---|
| Spatial | Ground size of a pixel | Sentinel-2: 10 m (visible and NIR bands); Landsat: 30 m; MODIS: 250 m to 1 km | Finer detail means smaller areas per scene and larger files |
| Temporal | Revisit time | MODIS: about daily; Sentinel-2: about 5 days; Landsat: 16 days per satellite | Frequent coverage usually has coarser pixels |
| Spectral | Number and width of bands | Landsat: about 7-9 bands; hyperspectral: hundreds | More bands mean more data to process |
| Radiometric | Number of brightness levels per pixel | 8-bit: 256 levels; 12-bit: 4 096 levels | Higher levels reveal subtle differences |

Values are approximate and vary between satellites and bands.

## Choosing data for a task

| Task | Needs | Suitable choice |
|---|---|---|
| Flood extent during the rainy season | Frequent coverage, sees through cloud | Radar images (active sensor) |
| Crop condition across a country | Frequent coverage, red and NIR bands | Daily or 5-day moderate-resolution NDVI |
| Urban growth over 20 years | Fine detail, long archive | Landsat images (30 m) from several years |
| Burn scars after a veld fire | NIR and shortwave infrared bands | Landsat or Sentinel-2 with SWIR |
| Mapping individual fields | Fine spatial resolution | 10 m Sentinel-2 or finer |

## Colour composites

A screen mixes **red, green and blue light** (the additive primaries). Equal amounts of all three make white; none makes black. A composite assigns three bands to these screen colours:

- **Natural colour:** red band shown as red, green band as green, blue band as blue. The image looks as the eye would see it, with green vegetation.
- **Pseudo-natural colour:** a band such as NIR or SWIR is used in place of one visible band to make an image that looks nearly natural but has more contrast.
- **False colour (standard):** NIR shown as red, red band shown as green, green band shown as blue. Healthy vegetation looks **bright red**, water looks dark blue or black, built-up areas and bare soil look blue-grey to tan.

## Interpreting an image

Interpreters use these clues:

1. **Size:** a large rectangle might be a commercial farm, a small one a homestead plot.
2. **Shape:** straight edges suggest human features (fields, roads, buildings); winding lines suggest rivers.
3. **Tone or colour:** brightness or colour reflects reflectance (dark water, bright bare soil).
4. **Texture:** smooth (grassland, water) or rough (forest canopy, urban areas).
5. **Pattern:** regular grids of fields, dendritic drainage, rows of houses.
6. **Context and association:** a bright rectangle next to a river, with a canal, is likely irrigated land; shadows show height.

## From raw band to interpreted map

1. **Acquire** the images for the date and place; choose a cloud-free scene.
2. **Pre-process:** correct geometric distortions (georeference), correct for the atmosphere and convert to reflectance.
3. **Enhance:** stretch contrast and filter to make features stand out.
4. **Composite:** display bands as a natural or false-colour image.
5. **Classify:** assign each pixel a class by visual interpretation or by computer (supervised: trained with known samples; unsupervised: groups pixels by similarity).
6. **Check accuracy** against field data or high-resolution images.
7. **Produce the map:** add legend, scale, north arrow and source, and calculate areas.

## Worked examples

:::worked-solution[Pixels, area and data volume]
A Landsat-type scene has ${px} by ${px} pixels, ${cell} m cells and ${bands} bands, each stored with 1 byte (8 bits) per pixel.

1. Width of the scene $= ${px} \times ${cell} \div 1000 = ${dpStr(swath, 0)}$ km.
2. Number of values stored $= ${px} \times ${px} \times ${bands} = ${fmt(px * px * bands)}$, so about ${dpStr(mb, 0)} megabytes.
3. A burn scar covers ${burn} km². Area of one ${cell} m pixel $= ${cell * cell}$ m². Pixels in the scar $= ${burn} \times 1\,000\,000 \div ${cell * cell} = ${dpStr(nPix30, 0)}$ pixels (to the nearest whole pixel).
4. With 10 m pixels the same scar needs $${burn} \times 1\,000\,000 \div 100 = ${dpStr(nPix10, 0)}$ pixels, nine times as many, so detail is greater but files are larger.
5. A satellite revisits every 16 days, so in a year it gives at most $365 \div 16 = ${dpStr(imgs, 1)}$, about 22 visits per place, and cloud will remove several of these in the rainy season.
:::

:::example{title="Interpreting a false-colour image of a dam area (described)"}
A false-colour image shows bright red rectangles in regular blocks beside a dark blue-black irregular shape. A thin pale line cuts between them. The **red rectangles** are healthy irrigated crops (NIR reflected strongly and shown in red) and their **regular, straight edges** show planning. The **dark irregular shape** is the dam, because water absorbs NIR. The **pale line** is a gravel road, and the **tan areas** on the edge are bare soil or dry grassland. The context (crops beside water) supports the interpretation of irrigation.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Resolution types, colour composites and image interpretation are ZIMSEC Form 6 content. Cambridge candidates should be able to describe a satellite image or photograph using tone, pattern and shape.
:::

## Common mistakes

:::mistake{title="Calling high spatial resolution 'large pixels'"}
High spatial resolution means small pixels and fine detail. Low resolution means large pixels.
:::

:::mistake{title="Thinking red in a false-colour image means red objects"}
In the standard false-colour composite red shows near-infrared reflectance, so bright red usually means healthy vegetation. Always check the key.
:::

:::mistake{title="Choosing the sharpest image for every task"}
Monitoring crops across a country each week needs frequent coverage more than very fine detail. Match resolution to the task.
:::

## Exam tips

:::exam-tip
For "choose imagery", name the task's needs (detail, frequency, bands, cloud) and match the resolution type to each. For composites, state which band is shown in each colour, then describe how vegetation, water and soil appear. For interpretation, use the six clues (size, shape, tone, texture, pattern, context) with evidence.
:::

## Summary

:::summary
- Spatial, temporal, spectral and radiometric resolution describe what a sensor can see; there are trade-offs between them.
- Choose imagery by the task: radar for floods through cloud, frequent NDVI for crop condition, 30 m archive for urban growth, SWIR for burn scars.
- Colour composites assign three bands to red, green and blue; in standard false colour vegetation is bright red.
- Interpretation uses size, shape, tone, texture, pattern and context.
- Raw bands become maps through pre-processing, enhancement, classification, accuracy checking and cartography.
:::
`;

writeLesson("rs", "resolution-interpretation", { title: "Image resolution, colour composites and image interpretation", summary: "Compare spatial, temporal and spectral resolution, choose imagery for tasks such as flood mapping and crop monitoring, build and read colour composites and interpret images by tone, texture, pattern and context.", minutes: 40 }, body);
