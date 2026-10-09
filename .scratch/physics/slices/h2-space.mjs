import { concept, P, t } from "../lib.mjs";

const C = ["cambridge"];
const REL2 = { kind: "relative", amount: 0.02 };

// =====================================================================================================================
concept("phys.space.earth-moon", {
  file: "space/earth-moon",
  keyPrefix: "space.earth",
  objectives: { cambridge: ["6.1.1.1", "6.1.1.2", "6.1.1.3", "6.1.1.4"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "What causes day and night?",
    options: [["The Earth spinning on its axis once every 24 hours", "Correct."], ["The Earth orbiting the Sun once every year", "That causes the year."], ["The Moon blocking the Sun's light each evening", "That would be an eclipse."], ["The Sun moving around the Earth once a day", "The Sun only appears to move."]],
    answer: "A", explanation: "As the Earth spins, each place turns into sunlight (day) and then out of it (night)." });

  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "How long does the Earth take to orbit the Sun once?",
    options: [["About 365 days", "Correct."], ["About 24 hours", "That is one rotation on its axis."], ["About one month", "That is roughly the Moon's orbit."], ["About ten years", "No."]],
    answer: "A", explanation: "One orbit of the Sun takes about 365 days: one year." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C, daily: true,
    stem: "What causes the seasons?",
    options: [["The tilt of the Earth's axis as the Earth orbits the Sun", "Correct."], ["The changing distance between the Earth and the Sun", "The distance changes only slightly and is not the cause."], ["The Moon's orbit around the Earth", "No."], ["Changes in the Sun's brightness", "No."]],
    answer: "A", explanation: "Because the axis is tilted, each hemisphere leans towards the Sun for part of the year (summer) and away from it for the rest (winter)." });

  q.mcq({ d: 2, skill: "APPLICATION", applies: C,
    stem: "In which month is it summer in Zimbabwe, and why?",
    options: [["December, because the southern hemisphere is tilted towards the Sun", "Correct."], ["June, because the southern hemisphere is tilted towards the Sun", "In June it is tilted away."], ["December, because the Earth is nearest to the Sun then", "Distance is not the cause of the seasons."], ["June, because the Earth is furthest from the Sun then", "Distance is not the cause."]],
    answer: "A", explanation: "Around December the southern hemisphere leans towards the Sun: the Sun is higher and the days are longer." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "Why does the Moon show phases?",
    options: [["As it orbits, we see different amounts of its sunlit half.", "Correct."], ["The Earth's shadow covers different parts of it.", "That happens only during a lunar eclipse."], ["The Moon gives out less light on some nights.", "The Moon gives out no light of its own."], ["Clouds in space hide different parts of it each night.", "Phases follow a regular monthly cycle, whatever the weather."]],
    answer: "A", explanation: "Half the Moon is always lit by the Sun; its position in its orbit decides how much of that half faces us." });

  q.mcq({ d: 2, skill: "APPLICATION", applies: C,
    stem: "Which phase of the Moon is seen when the Moon is between the Earth and the Sun?",
    options: [["New moon", "Correct: its lit side faces away from us."], ["Full moon", "That is when the Earth is between the Sun and the Moon."], ["First quarter", "No."], ["Waning gibbous", "No."]],
    answer: "A", explanation: "With the Moon between the Earth and the Sun, its sunlit side faces away from the Earth." });

  q.tf({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "The Sun appears to move across the sky from east to west because the Earth spins.",
    answer: true, explanation: "The Earth spins from west to east, so the Sun appears to rise in the east and set in the west." });

  q.num({ d: 3, skill: "APPLICATION", applies: C,
    stem: t`The International Space Station orbits at a radius of $6.8 \times 10^{6}\ \text{m}$ from the Earth's centre, taking 92 minutes for each orbit. Calculate its average orbital speed.`,
    value: 2 * Math.PI * 6.8e6 / (92 * 60), answer: "7740", tol: REL2, unit: "m/s", wrong: [464000, 129],
    explanation: t`$T = 92 \times 60 = 5520\ \text{s}$; $v = \dfrac{2\pi r}{T} = \dfrac{2\pi \times 6.8 \times 10^{6}}{5520} = 7.7 \times 10^{3}\ \text{m/s}$.`,
    hints: ["Convert the period into seconds.", t`Use $v = \dfrac{2\pi r}{T}$.`] });

  q.num({ d: 3, skill: "APPLICATION", applies: C,
    stem: t`Mars orbits the Sun at an average distance of $2.3 \times 10^{11}\ \text{m}$ and takes 687 days for each orbit. Calculate its average orbital speed in km/s.`,
    value: 2 * Math.PI * 2.3e11 / (687 * 86400) / 1000, answer: "24", tol: REL2, unit: "km/s", wrong: [24300, 2100],
    explanation: t`$T = 687 \times 24 \times 3600 = 5.94 \times 10^{7}\ \text{s}$; $v = \dfrac{2\pi \times 2.3 \times 10^{11}}{5.94 \times 10^{7}} = 2.4 \times 10^{4}\ \text{m/s} = 24\ \text{km/s}$.`,
    hints: ["Convert the period into seconds, then the answer from m/s into km/s."] });

  q.num({ d: 4, skill: "APPLICATION", applies: C,
    stem: t`A geostationary satellite orbits once every 24 hours at a radius of $4.2 \times 10^{7}\ \text{m}$ from the Earth's centre. Calculate its orbital speed.`,
    value: 2 * Math.PI * 4.2e7 / 86400, answer: "3050", tol: REL2, unit: "m/s", wrong: [1.1e7, 486],
    explanation: t`$v = \dfrac{2\pi \times 4.2 \times 10^{7}}{24 \times 3600} = 3.1 \times 10^{3}\ \text{m/s}$.`,
    hints: ["24 hours = 86 400 s."] });

  q.num({ d: 4, skill: "ANALYSIS", applies: C,
    stem: t`A moon moves at an average speed of $3.0\ \text{km/s}$ in a circular orbit of radius $9.0 \times 10^{8}\ \text{m}$. Calculate its orbital period in seconds.`,
    value: 2 * Math.PI * 9.0e8 / 3000, answer: "1.9e6", tol: REL2, unit: "s", wrong: [3.0e5, 1885],
    explanation: t`$T = \dfrac{2\pi r}{v} = \dfrac{2\pi \times 9.0 \times 10^{8}}{3.0 \times 10^{3}} = 1.9 \times 10^{6}\ \text{s}$ (about 22 days).`,
    hints: ["Convert the speed to m/s.", t`Rearrange $v = \dfrac{2\pi r}{T}$ for $T$.`] });

  q.match({ d: 2, skill: "RECALL", applies: C,
    stem: "Match each time with what happens in it.",
    pairs: [["About 24 hours", "One rotation of the Earth on its axis"], ["About a month", "One orbit of the Moon around the Earth"], ["About 365 days", "One orbit of the Earth around the Sun"]],
    explanation: "Day: one rotation. Month: one lunar orbit. Year: one orbit of the Sun." });

  q.struct({ d: 3, skill: "UNDERSTANDING", applies: C, examStyle: true,
    stem: "Bulawayo is in the southern hemisphere.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why days in Bulawayo are hotter and longer in December than in June.",
        points: ["In December the southern hemisphere is tilted towards the Sun, so the Sun is higher in the sky and its energy is concentrated on a smaller area", "and the days are longer, giving more hours of sunshine"] }),
      P.mcq({ label: "(b)", stem: "What season is it in London, in the northern hemisphere, in December?", options: [["Winter", "Correct."], ["Summer", "The northern hemisphere is tilted away from the Sun in December."], ["The same season as Bulawayo", "The hemispheres have opposite seasons."], ["There are no seasons in London.", "There are."]], answer: "A",
        explanation: "When the southern hemisphere has summer, the northern hemisphere has winter." }),
      P.mcq({ label: "(c)", stem: "Which statement about the Earth's distance from the Sun is correct?", options: [["It changes only slightly and does not cause the seasons.", "Correct."], ["The Earth is closest to the Sun in June each year.", "It is closest in early January."], ["The changing distance is what causes the seasons.", "The tilt causes them."], ["The distance stays exactly the same all year.", "The orbit is very slightly elliptical."]], answer: "A",
        explanation: "The Earth is actually slightly closer to the Sun in January, during the southern summer but the northern winter." }),
    ],
    explanation: "The tilt of the axis, not the distance from the Sun, causes opposite seasons in the two hemispheres.",
    hints: ["Think about the height of the Sun and the length of the day."] });

  q.card("FACT", "What causes day and night?", "The Earth spinning on its tilted axis once in about 24 hours.", undefined, { applies: C });
  q.card("FACT", "What is a year?", "The time for one orbit of the Earth around the Sun: about 365 days.", undefined, { applies: C });
  q.card("CONCEPT", "What causes the seasons?", "The tilt of the Earth's axis: the hemisphere tilted towards the Sun has a higher Sun and longer days (summer).", undefined, { applies: C });
  q.card("CONCEPT", "Why does the Moon have phases?", "We see different amounts of its sunlit half as it orbits the Earth (about once a month).", undefined, { applies: C });
  q.card("FORMULA", "Average orbital speed?", t`$v = \dfrac{2\pi r}{T}$`, undefined, { applies: C });
});

// =====================================================================================================================
concept("phys.space.solar-system", {
  file: "space/solar-system",
  keyPrefix: "space.solar",
  objectives: { cambridge: ["6.1.2.1", "6.1.2.2", "6.1.2.3", "6.1.2.4", "6.1.2.5", "6.1.2.6", "6.1.2.7", "6.1.2.8", "6.1.2.9", "6.1.2.10"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "Which list gives the planets in order from the Sun?",
    options: [["Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune", "Correct."], ["Mercury, Venus, Earth, Mars, Saturn, Jupiter, Uranus, Neptune", "Jupiter comes before Saturn."], ["Venus, Mercury, Earth, Mars, Jupiter, Saturn, Neptune, Uranus", "Mercury is nearest the Sun; Uranus comes before Neptune."], ["Mercury, Earth, Venus, Mars, Jupiter, Saturn, Uranus, Neptune", "Venus comes before Earth."]],
    answer: "A", explanation: "My Very Easy Method Just Speeds Up Naming: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune." });

  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "Which is the largest planet in the Solar System?",
    options: [["Jupiter", "Correct."], ["Saturn", "Second largest."], ["Earth", "Earth is the largest rocky planet only."], ["Neptune", "No."]],
    answer: "A", explanation: "Jupiter, a gas giant, is the largest planet." });

  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "Where is the asteroid belt?",
    options: [["Between Mars and Jupiter", "Correct."], ["Between the Earth and Mars", "No."], ["Beyond Neptune", "That region has dwarf planets such as Pluto."], ["Between Venus and the Earth", "No."]],
    answer: "A", explanation: "Most asteroids orbit the Sun between Mars and Jupiter." });

  q.mcq({ d: 2, skill: "RECALL", applies: C,
    stem: "What is a comet?",
    options: [["An icy, dusty body in a long thin orbit, forming a tail near the Sun", "Correct."], ["A rock burning up as it falls through the Earth's atmosphere, leaving a bright trail", "That is a meteor."], ["One of the large moons that orbit Jupiter", "Moons orbit planets; comets orbit the Sun."], ["A small, faint star far beyond the Solar System", "A comet is a body of ice and dust in the Solar System, not a star."]],
    answer: "A", explanation: "Near the Sun a comet's ice evaporates, forming a glowing head and a tail pointing away from the Sun." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C, daily: true,
    stem: "According to the accretion model, why are the inner planets rocky and the outer planets large and gaseous?",
    options: [["Near the Sun only rock and metal stayed solid; ice and gas collected further out.", "Correct."], ["The outer planets formed billions of years before the inner, rocky planets had even begun.", "They formed at about the same time."], ["The Sun's gravity pulled all the gas inwards to the inner planets.", "The inner planets have little gas."], ["The inner planets lost their gas and ice to the outer planets.", "Material did not move between planets like this."]],
    answer: "A", explanation: "Temperature in the early disc decided what could condense: rock close in, rock plus ice and gas further out." });

  q.mcq({ d: 2, skill: "RECALL", applies: C,
    stem: "What keeps the planets in their orbits around the Sun?",
    options: [["The gravitational attraction of the Sun", "Correct."], ["Magnetic forces from the Sun's spinning core", "No."], ["Friction with space", "Space has almost nothing to cause friction."], ["The planets' own spin", "No."]],
    answer: "A", explanation: "The Sun's gravity pulls each planet towards it, keeping it moving in a curved orbit." });

  q.tf({ d: 2, skill: "RECALL", applies: C,
    stem: "The Sun contains most of the mass of the Solar System.",
    answer: true, explanation: "More than 99% of the Solar System's mass is in the Sun, which is why everything orbits it." });

  q.num({ d: 2, skill: "APPLICATION", applies: C,
    stem: t`At one time, Mars is $7.8 \times 10^{10}\ \text{m}$ from the Earth. How long does light take to travel from Mars to the Earth? (Speed of light $= 3.0 \times 10^{8}\ \text{m/s}$.)`,
    value: 260, unit: "s", wrong: [2.3e19, 0.0038],
    explanation: t`$t = \dfrac{d}{c} = \dfrac{7.8 \times 10^{10}}{3.0 \times 10^{8}} = 260\ \text{s}$ (about 4.3 minutes).` });

  q.num({ d: 3, skill: "APPLICATION", applies: C,
    stem: t`Jupiter is $6.3 \times 10^{11}\ \text{m}$ from the Earth. How many minutes does a radio signal from a spacecraft near Jupiter take to reach the Earth? (Speed $= 3.0 \times 10^{8}\ \text{m/s}$.)`,
    value: 35, unit: "min", tol: 0.5, wrong: [2100, 0.58],
    explanation: t`$t = \dfrac{6.3 \times 10^{11}}{3.0 \times 10^{8}} = 2100\ \text{s} = 35\ \text{minutes}$.`,
    hints: ["Radio waves travel at the speed of light.", "Divide the time in seconds by 60."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "Why is the gravitational field strength at the surface of the Moon (about 1.6 N/kg) much smaller than at the surface of the Earth?",
    options: [["The Moon has a much smaller mass than the Earth.", "Correct."], ["The Moon has no atmosphere to press down.", "Air does not affect gravity."], ["The Moon is further from the Sun than the Earth is.", "Not the reason."], ["The Moon does not spin on its own axis.", "It does spin, slowly; that is not the reason."]],
    answer: "A", explanation: "Surface field strength depends mainly on the mass of the planet or moon." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "A comet moves in a very elongated elliptical orbit. Where is it moving fastest?",
    options: [["When it is nearest the Sun", "Correct."], ["When it is furthest from the Sun", "It is slowest there."], ["Its speed is the same everywhere.", "Its speed changes."], ["Halfway between nearest and furthest", "No."]],
    answer: "A", explanation: "As it falls towards the Sun it loses gravitational potential energy and gains the same amount of kinetic energy.",
    hints: ["Think about energy transfers as it falls towards the Sun."] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Why does a comet speed up as it approaches the Sun?",
    options: [["It loses gravitational potential energy and gains kinetic energy.", "Correct."], ["The Sun's light pushes it forwards along its orbit.", "Not the main effect."], ["It loses mass into its tail, so it becomes lighter and easier to accelerate.", "Not the reason."], ["The solar wind blows it faster towards the Sun.", "Not the reason."]],
    answer: "A", explanation: "Energy is conserved: the decrease in gravitational potential energy appears as an increase in kinetic energy.",
    hints: ["Total energy stays the same."] });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "Which statement about the planets' orbits is supported by planetary data?",
    options: [["Planets further out take longer to orbit and move more slowly.", "Correct."], ["Planets further from the Sun orbit faster than inner ones.", "The Sun's field is weaker further out, so they move more slowly."], ["All planets take one year to orbit the Sun.", "Only the Earth does."], ["Orbital period depends only on a planet's density.", "It depends on distance from the Sun."]],
    answer: "A", explanation: "The Sun's gravitational field weakens with distance, so outer planets move more slowly and have much longer years.",
    hints: ["How does the Sun's pull change with distance?"] });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "Surface temperatures of the planets generally fall with distance from the Sun. Which planet is the main exception, being hotter than Mercury?",
    options: [["Venus", "Correct: its thick carbon dioxide atmosphere traps energy."], ["Mars", "Mars is cold."], ["Earth", "Cooler than Mercury on average."], ["Neptune", "Very cold."]],
    answer: "A", explanation: "Venus's dense atmosphere produces a strong greenhouse effect, making it the hottest planet.",
    hints: ["Which planet has a very thick atmosphere?"] });

  q.mcq({ d: 2, skill: "RECALL", applies: C,
    stem: "How does the strength of the Sun's gravitational field change with distance from the Sun?",
    options: [["It decreases.", "Correct."], ["It increases.", "No."], ["It stays the same.", "No."], ["It drops to zero beyond the Earth's orbit.", "It weakens but continues far beyond Neptune."]],
    answer: "A", explanation: "Gravitational field strength becomes weaker further from the Sun." });

  q.struct({ d: 3, skill: "APPLICATION", applies: C, examStyle: true,
    stem: "An astronaut of mass 75 kg stands on the surface of the Moon, where the gravitational field strength is 1.6 N/kg.",
    parts: [
      P.num({ label: "(a)", stem: "Calculate the astronaut's weight on the Moon.", value: 120, unit: "N", wrong: [46.9],
        explanation: t`$W = mg = 75 \times 1.6 = 120\ \text{N}$.` }),
      P.mcq({ label: "(b)", stem: "What is the astronaut's mass on the Moon?", options: [["75 kg", "Correct: mass does not change."], ["120 kg", "That is the weight in newtons."], ["12 kg", "No."], ["Zero", "No."]], answer: "A",
        explanation: "Mass is the amount of matter; it is the same everywhere." }),
      P.manual({ label: "(c)", marks: 1, stem: "Explain why the gravitational field strength on the Moon is smaller than on the Earth.",
        points: ["The Moon has a much smaller mass than the Earth"] }),
    ],
    explanation: "Weight = mg depends on the local field strength; mass does not change.",
    hints: ["W = mg"] });

  q.card("FACT", "The planets in order?", "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune.", undefined, { applies: C });
  q.card("FACT", "Members of the Solar System?", "The Sun, eight planets, moons, dwarf planets, asteroids and comets.", undefined, { applies: C });
  q.card("CONCEPT", "Why are inner planets rocky and outer planets gaseous?", "Accretion model: near the hot Sun only rock stayed solid; further out ices and gas collected too.", undefined, { applies: C });
  q.card("FACT", "What keeps the planets in orbit?", "The Sun's gravitational attraction (the Sun has most of the mass).", undefined, { applies: C });
  q.card("FORMULA", "Light travel time?", t`$t = \dfrac{d}{c}$, with $c = 3.0 \times 10^{8}\ \text{m/s}$`, undefined, { applies: C });
  q.card("CONCEPT", "Speed in an elliptical orbit?", "Fastest nearest the Sun: GPE is converted to KE as it falls inwards.", undefined, { applies: C });
});

// =====================================================================================================================
concept("phys.space.sun", {
  file: "space/sun",
  keyPrefix: "space.sun",
  objectives: { cambridge: ["6.2.1.1", "6.2.1.2"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "What is the Sun?",
    options: [["A medium-sized star", "Correct."], ["A planet", "No."], ["One of the largest stars in the galaxy", "It is medium-sized."], ["A galaxy", "No."]],
    answer: "A", explanation: "The Sun is a medium-sized star." });

  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "What is the Sun mainly made of?",
    options: [["Hydrogen and helium", "Correct."], ["Oxygen and nitrogen", "No."], ["Iron and nickel", "No."], ["Carbon", "No."]],
    answer: "A", explanation: "About three-quarters hydrogen and one-quarter helium by mass." });

  q.mcq({ d: 3, skill: "RECALL", applies: C, multiple: true,
    stem: "Select **all three** regions of the electromagnetic spectrum in which the Sun gives out most of its energy.",
    options: [["Infrared", "Correct."], ["Visible light", "Correct."], ["Ultraviolet", "Correct."], ["Radio waves", "Only a tiny amount."], ["X-rays", "Only a tiny amount."], ["Gamma rays", "Almost none escapes."]],
    answer: ["A", "B", "C"], explanation: "The Sun radiates mainly infrared, visible light and ultraviolet.",
    hints: ["Which of these can you feel, see or get sunburnt by?"] });

  q.mcq({ d: 2, skill: "RECALL", applies: C, daily: true,
    stem: "What process provides the energy of the Sun?",
    options: [["Nuclear fusion of hydrogen into helium", "Correct."], ["Burning of coal and gas", "The Sun does not burn chemically."], ["Nuclear fission of uranium", "No."], ["Chemical reaction of hydrogen with oxygen", "No."]],
    answer: "A", explanation: "In the Sun's core, hydrogen nuclei fuse to form helium, releasing energy." });

  q.tf({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "The Sun produces its energy by burning gas, like a very large fire.",
    answer: false, explanation: "Its energy comes from nuclear fusion, not chemical burning." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "In a stable star such as the Sun, what balances the inward pull of gravity?",
    options: [["Outward pressure from the energy released by fusion", "Correct."], ["Magnetic forces from its spinning hot core pushing outwards", "Magnetic forces are not what holds a star up."], ["The star's fast rotation about its own axis", "Not the main balance."], ["Nothing: the star is slowly collapsing.", "A stable star keeps the same size."]],
    answer: "A", explanation: "Fusion heats the gas, creating outward pressure that balances gravity.",
    hints: ["Something must push outwards."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "Why does the Sun look so much larger and brighter than the other stars?",
    options: [["It is much closer to us than any other star.", "Correct."], ["It is the largest star in the galaxy.", "It is medium-sized."], ["It is not really a star.", "It is a star."], ["It is made of different gases from other stars.", "Most stars are mainly hydrogen and helium."]],
    answer: "A", explanation: "The Sun is about 8 light-minutes away; the next nearest star is over 4 light-years away." });

  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "Which radiation from the Sun causes sunburn?",
    options: [["Ultraviolet", "Correct."], ["Infrared", "We feel infrared as warmth."], ["Visible light", "No."], ["Radio waves", "No."]],
    answer: "A", explanation: "Ultraviolet radiation damages skin cells, causing sunburn." });

  q.match({ d: 2, skill: "RECALL", applies: C,
    stem: "Match each type of radiation from the Sun with its effect on us.",
    pairs: [["Infrared", "Felt as warmth"], ["Visible light", "Lets us see"], ["Ultraviolet", "Can cause sunburn"]],
    explanation: "Infrared: warmth. Visible: sight. Ultraviolet: sunburn." });

  q.struct({ d: 3, skill: "UNDERSTANDING", applies: C, examStyle: true,
    stem: "The Sun has been a stable star for about 4.6 billion years.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which element is produced by fusion in the Sun's core?", options: [["Helium", "Correct."], ["Hydrogen", "Hydrogen is the fuel."], ["Carbon", "Not in the Sun's main fusion."], ["Uranium", "No."]], answer: "A",
        explanation: "Hydrogen nuclei fuse to form helium." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why fusion in the Sun releases energy.",
        points: ["The helium formed has slightly less mass than the hydrogen nuclei that fused", "The lost mass is released as energy, which the Sun radiates"] }),
      P.mcq({ label: "(c)", stem: "What will happen when the hydrogen in the Sun's core runs out?", options: [["It will expand into a red giant.", "Correct."], ["It will explode as a supernova.", "Only much more massive stars do that."], ["It will become a black hole.", "The Sun is not massive enough."], ["It will go out at once.", "No."]], answer: "A",
        explanation: "A star like the Sun becomes a red giant and then a white dwarf." }),
    ],
    explanation: "Hydrogen fuses into helium; the small mass loss is radiated as energy; the Sun will become a red giant.",
    hints: ["Compare the mass before and after fusion."] });

  q.card("FACT", "What kind of star is the Sun?", "A medium-sized star, mostly hydrogen and helium.", undefined, { applies: C });
  q.card("FACT", "Main radiation from the Sun?", "Infrared, visible light and ultraviolet.", undefined, { applies: C });
  q.card("FACT", "What powers stable stars?", "Nuclear fusion of hydrogen into helium.", undefined, { applies: C });
  q.card("CONCEPT", "Why is a stable star stable?", "Inward gravity is balanced by outward pressure from the energy released by fusion.", undefined, { applies: C });
});

// =====================================================================================================================
concept("phys.space.stars", {
  file: "space/stars",
  keyPrefix: "space.stars",
  objectives: { cambridge: ["6.2.2.1", "6.2.2.2", "6.2.2.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "What is a galaxy?",
    options: [["A huge group of billions of stars held together by gravity", "Correct."], ["A group of planets and moons orbiting one star", "That is a planetary system."], ["A single very large star with many planets", "A galaxy contains billions of stars."], ["A cloud of gas and dust surrounding the Sun and its family of planets", "A galaxy is far larger than the Solar System."]],
    answer: "A", explanation: "A galaxy contains many billions of stars, with gas and dust." });

  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "Which galaxy contains the Sun?",
    options: [["The Milky Way", "Correct."], ["Andromeda", "A neighbouring galaxy."], ["The Large Magellanic Cloud", "A small nearby galaxy."], ["Proxima Centauri", "That is a star."]],
    answer: "A", explanation: "The Sun is one of the stars in the Milky Way." });

  q.mcq({ d: 2, skill: "RECALL", applies: C, daily: true,
    stem: "What is a light-year?",
    options: [["The distance light travels in one year", "Correct."], ["The time light takes to travel from the Sun to the Earth", "That is about 8 minutes."], ["A year on another planet", "No."], ["The age of a star", "No."]],
    answer: "A", explanation: "A light-year is a unit of distance: about 9.5 × 10¹⁵ m." });

  q.num({ d: 3, skill: "APPLICATION", applies: C,
    stem: t`Sirius is 8.6 light-years from the Earth. Calculate this distance in metres. (1 light-year $= 9.5 \times 10^{15}\ \text{m}$.)`,
    value: 8.6 * 9.5e15, answer: "8.2e16", tol: REL2, unit: "m", wrong: [1.1e15, 9.5e15],
    explanation: t`$8.6 \times 9.5 \times 10^{15} = 8.2 \times 10^{16}\ \text{m}$.`,
    hints: ["Multiply the number of light-years by the length of one light-year in metres."] });

  q.num({ d: 3, skill: "APPLICATION", applies: C,
    stem: t`A star is $3.8 \times 10^{17}\ \text{m}$ from the Earth. How far is this in light-years? (1 light-year $= 9.5 \times 10^{15}\ \text{m}$.)`,
    value: 40, unit: "light-years", tol: 1, wrong: [3.6e33, 0.025],
    explanation: t`$\dfrac{3.8 \times 10^{17}}{9.5 \times 10^{15}} = 40$ light-years.`,
    hints: ["Divide the distance by the length of one light-year."] });

  q.mcq({ d: 2, skill: "RECALL", applies: C,
    stem: "How does a star begin to form?",
    options: [["A cloud of gas and dust collapses under its own gravity.", "Correct."], ["A red giant cools down and shrinks to a new star.", "That is near the end of a star's life."], ["A white dwarf heats up again and starts to fuse.", "White dwarfs are the cooling remains of stars."], ["A supernova contracts back into a smaller, hotter new star.", "A supernova is the explosion at the end of a large star's life."]],
    answer: "A", explanation: "Gravity pulls a cloud of gas and dust together; it heats up to form a protostar." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "What happens when a protostar becomes a stable star?",
    options: [["Its core gets hot enough for hydrogen to fuse into helium.", "Correct."], ["It explodes and scatters its outer layers into space.", "Explosion (supernova) comes at the end of a massive star's life."], ["It cools down and shrinks to become a white dwarf.", "That happens at the end of a low-mass star's life."], ["It collapses inwards to become a small black hole.", "Black holes form only after very massive stars explode."]],
    answer: "A", explanation: "Fusion starts, and its outward pressure balances gravity." });

  q.mcq({ d: 3, skill: "RECALL", applies: C,
    stem: "What will the Sun eventually become?",
    options: [["A red giant and then a white dwarf", "Correct."], ["A supernova and then a neutron star", "Only much more massive stars do this."], ["A black hole", "The Sun is not massive enough."], ["It will stay as it is for ever.", "Its hydrogen will run out."]],
    answer: "A", explanation: "Low-mass stars like the Sun become red giants, then shed their outer layers, leaving white dwarfs.",
    hints: ["The Sun is a low-mass star."] });

  q.mcq({ d: 3, skill: "RECALL", applies: C,
    stem: "What can be left behind after a supernova?",
    options: [["A neutron star or a black hole", "Correct."], ["A white dwarf with a gas cloud", "White dwarfs come from low-mass stars without supernovae."], ["A new protostar", "That is the start of a star's life."], ["A red giant", "No."]],
    answer: "A", explanation: "The collapsed core of a massive star becomes a neutron star or, for the most massive, a black hole.",
    hints: ["Supernovae happen to the most massive stars."] });

  q.fib({ d: 3, skill: "RECALL", applies: C,
    stem: "Complete the life cycle of a massive star.",
    template: "interstellar cloud → {{blank:a}} → stable star → {{blank:b}} → supernova → neutron star or black hole",
    blanks: [
      { id: "a", input: "select", choices: ["protostar", "red supergiant", "white dwarf", "planetary nebula"], accepted: ["protostar"], wrong: "white dwarf" },
      { id: "b", input: "select", choices: ["protostar", "red supergiant", "white dwarf", "planetary nebula"], accepted: ["red supergiant"], wrong: "planetary nebula" },
    ],
    explanation: "Cloud → protostar → stable star → red supergiant → supernova → neutron star or black hole.",
    hints: ["Massive stars swell into red supergiants."] });

  q.tf({ d: 1, skill: "RECALL", applies: C,
    stem: "Stars other than the Sun are much further away from the Earth than the Sun is.",
    answer: true, explanation: "The Sun is about 8 light-minutes away; the nearest other star is over 4 light-years away." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Why are supernovae important for forming new stars and planets?",
    options: [["They scatter heavy elements made in stars into new nebulae.", "Correct."], ["They make the hydrogen that new stars need.", "Hydrogen came from the early Universe."], ["They create whole new galaxies around them.", "A supernova is one star; galaxies hold billions."], ["They cool down nearby stars so they can form planets.", "A supernova does not cool its neighbours."]],
    answer: "A", explanation: "The debris of a supernova enriches clouds of gas and dust from which new stars and planets form.",
    hints: ["Where did the heavy elements in the Earth come from?"] });

  q.struct({ d: 3, skill: "UNDERSTANDING", applies: C, examStyle: true,
    stem: "Stars form, shine and die over millions or billions of years.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe how a stable star forms from an interstellar cloud.",
        points: ["Gravity makes a cloud of gas and dust collapse; it heats up and becomes a protostar", "When the core is hot enough, hydrogen fusion starts and the star becomes stable"] }),
      P.mcq({ label: "(b)", stem: "A star much more massive than the Sun runs out of hydrogen in its core. What does it become next?", options: [["A red supergiant", "Correct."], ["A white dwarf", "That follows a red giant for low-mass stars."], ["A protostar", "That comes before the stable stage."], ["A planetary nebula", "No."]], answer: "A",
        explanation: "Massive stars expand into red supergiants." }),
      P.mcq({ label: "(c)", stem: "During which stage does a star stay the same size for millions or billions of years?", options: [["The stable star stage, with gravity balanced by fusion", "Correct."], ["The protostar stage, as gas and dust collect", "It is still collapsing."], ["The supernova stage, after the core collapses", "That is an explosion."], ["The red giant stage, when its outer layers swell", "It has expanded."]], answer: "A",
        explanation: "As long as hydrogen fusion continues steadily, the forces balance." }),
    ],
    explanation: "Cloud → protostar → stable star; then the path depends on mass.",
    hints: ["Gravity starts the process; fusion holds the star up."] });

  q.card("DEFINITION", "What is a **galaxy**?", "A group of many billions of stars held together by gravity; the Sun is in the Milky Way.", undefined, { applies: C });
  q.card("DEFINITION", "What is a **light-year**?", t`The distance light travels in one year, about $9.5 \times 10^{15}\ \text{m}$.`, undefined, { applies: C });
  q.card("FACT", "How does a star form?", "A cloud of gas and dust collapses under gravity → protostar → fusion starts → stable star.", undefined, { applies: C });
  q.card("FACT", "End of a low-mass star like the Sun?", "Red giant → white dwarf.", undefined, { applies: C });
  q.card("FACT", "End of a massive star?", "Red supergiant → supernova → neutron star or black hole.", undefined, { applies: C });
});

// =====================================================================================================================
concept("phys.space.universe", {
  file: "space/universe",
  keyPrefix: "space.universe",
  objectives: { cambridge: ["6.2.3.1", "6.2.3.2", "6.2.3.3", "6.2.3.4", "6.2.3.5", "6.2.3.6", "6.2.3.7", "6.2.3.8", "6.2.3.9", "6.2.3.10", "6.2.3.11"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "About how wide is the Milky Way galaxy?",
    options: [["100 000 light-years", "Correct."], ["100 light-years", "Far too small."], ["100 million kilometres", "That is less than the Earth–Sun distance."], ["1 light-year", "Far too small."]],
    answer: "A", explanation: "The Milky Way is about 100 000 light-years across." });

  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "What is redshift?",
    options: [["An increase in the observed wavelength of radiation from a source moving away", "Correct."], ["A decrease in the observed wavelength of radiation from a distant source moving away", "The wavelength increases."], ["The reddening of starlight by dust", "Not this effect."], ["The cooling of old stars", "No."]],
    answer: "A", explanation: "Light from receding galaxies arrives with longer wavelengths than expected." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C, daily: true,
    stem: "What does the redshift of light from distant galaxies show?",
    options: [["They are moving away from us: the Universe is expanding.", "Correct."], ["They are moving towards us, and will collide with us.", "That would give a blueshift."], ["They are made mostly of cool red stars.", "Redshift is a shift of the whole spectrum, not a colour of stars."], ["The Universe is shrinking towards a point.", "A shrinking Universe would give blueshift."]],
    answer: "A", explanation: "Redshift from almost all galaxies shows they are receding, so the Universe is expanding." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "How does the redshift of a galaxy depend on its distance from us?",
    options: [["More distant galaxies have a greater redshift.", "Correct."], ["More distant galaxies have a smaller redshift.", "No."], ["All galaxies have the same redshift.", "No."], ["Redshift is not related to distance.", "It is."]],
    answer: "A", explanation: "Greater redshift means faster recession; more distant galaxies recede faster." });

  q.tf({ d: 2, skill: "RECALL", applies: C,
    stem: "The Big Bang theory states that the Universe began from a single, extremely hot and dense point and has been expanding ever since.",
    answer: true, explanation: "Redshift and the cosmic microwave background both support this theory." });

  q.mcq({ d: 2, skill: "RECALL", applies: C,
    stem: "What is the cosmic microwave background radiation (CMBR)?",
    options: [["Microwaves from every direction, left over from the early Universe", "Correct."], ["Radiation leaking from microwave ovens, phone masts and other devices on Earth", "It comes from space, equally from every direction."], ["Radio waves given out by the Sun and all the planets", "It comes from every direction, not from the Sun."], ["X-rays from black holes at the centres of galaxies", "It is microwave radiation from the early Universe."]],
    answer: "A", explanation: "The CMBR is radiation from the early Universe, now detected as microwaves from every direction." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Why is the CMBR now in the microwave region of the spectrum?",
    options: [["The expansion of the Universe has stretched its wavelength.", "Correct."], ["It was produced as microwaves.", "It began as much higher-energy radiation."], ["Dust in space has absorbed the shorter wavelengths over billions of years.", "Not the reason."], ["The Earth's atmosphere changes it.", "No."]],
    answer: "A", explanation: "As space expanded, the radiation's wavelength was stretched into the microwave region.",
    hints: ["What does expansion do to wavelengths?"] });

  q.mcq({ d: 2, skill: "RECALL", applies: C,
    stem: "How do astronomers find the speed at which a distant galaxy is moving away?",
    options: [["From the redshift of its light", "Correct."], ["From the brightness of a supernova in it", "That gives its distance."], ["From the size of the galaxy", "No."], ["From the colour of its planets", "No."]],
    answer: "A", explanation: "The greater the redshift, the faster the galaxy is receding." });

  q.mcq({ d: 2, skill: "RECALL", applies: C,
    stem: "How can astronomers find the distance to a very distant galaxy?",
    options: [["From the brightness of a supernova seen in it", "Correct."], ["By timing radar echoes bounced back from it", "Far too distant."], ["By measuring the temperature of its stars", "Temperature does not give distance."], ["By counting the stars that can be seen in it", "Star counts do not give distance."]],
    answer: "A", explanation: "Supernovae of a particular type have the same peak brightness, so how bright one looks tells us how far away it is." });

  q.num({ d: 3, skill: "APPLICATION", applies: C,
    stem: t`A galaxy is moving away from the Earth at $5.5 \times 10^{6}\ \text{m/s}$. Using $H_0 = 2.2 \times 10^{-18}\ \text{s}^{-1}$, calculate its distance.`,
    value: 5.5e6 / 2.2e-18, answer: "2.5e24", tol: REL2, unit: "m", wrong: [1.2e-11, 4.0e-25],
    explanation: t`$d = \dfrac{v}{H_0} = \dfrac{5.5 \times 10^{6}}{2.2 \times 10^{-18}} = 2.5 \times 10^{24}\ \text{m}$.`,
    hints: [t`Rearrange $H_0 = \dfrac{v}{d}$.`] });

  q.num({ d: 3, skill: "APPLICATION", applies: C,
    stem: t`A galaxy is $9.0 \times 10^{24}\ \text{m}$ away. Using $H_0 = 2.2 \times 10^{-18}\ \text{s}^{-1}$, calculate the speed at which it is moving away.`,
    value: 2.2e-18 * 9.0e24, answer: "1.98e7", tol: REL2, unit: "m/s", wrong: [4.1e42, 2.4e-43],
    explanation: t`$v = H_0 d = 2.2 \times 10^{-18} \times 9.0 \times 10^{24} = 2.0 \times 10^{7}\ \text{m/s}$.`,
    hints: [t`Rearrange $H_0 = \dfrac{v}{d}$ to give $v = H_0 d$.`] });

  q.num({ d: 4, skill: "ANALYSIS", applies: C,
    stem: t`Suppose the Hubble constant were $2.0 \times 10^{-18}\ \text{s}^{-1}$. Estimate the age of the Universe in years. (1 year $= 3.15 \times 10^{7}\ \text{s}$.)`,
    value: 1 / 2.0e-18 / 3.15e7, answer: "1.6e10", tol: REL2, unit: "years", wrong: [5.0e17, 6.3e-11],
    explanation: t`Age $\approx \dfrac{1}{H_0} = \dfrac{1}{2.0 \times 10^{-18}} = 5.0 \times 10^{17}\ \text{s} = \dfrac{5.0 \times 10^{17}}{3.15 \times 10^{7}} = 1.6 \times 10^{10}$ years.`,
    hints: [t`The age is about $\dfrac{1}{H_0}$ in seconds.`, "Then convert seconds to years."] });

  q.struct({ d: 3, skill: "ANALYSIS", applies: C, examStyle: true,
    stem: t`Astronomers measure three galaxies. Galaxy A: distance $1.0 \times 10^{24}\ \text{m}$, speed $2.2 \times 10^{6}\ \text{m/s}$. Galaxy B: $2.0 \times 10^{24}\ \text{m}$, $4.4 \times 10^{6}\ \text{m/s}$. Galaxy C: $3.0 \times 10^{24}\ \text{m}$, $6.6 \times 10^{6}\ \text{m/s}$.`,
    parts: [
      P.mcq({ label: "(a)", stem: "What do the data show about speed and distance?", options: [["Speed is directly proportional to distance.", "Correct."], ["Speed decreases as distance increases.", "No."], ["Speed does not depend on distance.", "No."], ["Speed is inversely proportional to distance.", "No."]], answer: "A",
        explanation: "Doubling or tripling the distance doubles or triples the speed." }),
      P.num({ label: "(b)", marks: 2, stem: "Use the data to calculate the Hubble constant.", value: 2.2e-18, answer: "2.2e-18", tol: REL2, unit: "s⁻¹", wrong: [4.5e17],
        explanation: t`$H_0 = \dfrac{v}{d} = \dfrac{2.2 \times 10^{6}}{1.0 \times 10^{24}} = 2.2 \times 10^{-18}\ \text{s}^{-1}$.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain how observations like these support the Big Bang theory.",
        points: ["All the galaxies are moving away from us, faster the further away they are, so the Universe is expanding", "Running the expansion backwards means all the matter was once together at a single point"] }),
    ],
    explanation: "Speed ∝ distance gives H₀ = v/d; an expanding Universe traced backwards began from a single point.",
    hints: [t`$H_0 = \dfrac{v}{d}$`] });

  q.card("FACT", "Size of the Milky Way?", "About 100 000 light-years across; one of billions of galaxies.", undefined, { applies: C });
  q.card("DEFINITION", "What is **redshift**?", "An increase in the observed wavelength of radiation from a receding star or galaxy.", undefined, { applies: C });
  q.card("CONCEPT", "What does galactic redshift show?", "Galaxies are moving away, faster when further: the Universe is expanding, supporting the Big Bang.", undefined, { applies: C });
  q.card("DEFINITION", "What is the **CMBR**?", "Microwave radiation from every direction: radiation from the early Universe stretched by expansion.", undefined, { applies: C });
  q.card("FORMULA", "Hubble constant?", t`$H_0 = \dfrac{v}{d} \approx 2.2 \times 10^{-18}\ \text{s}^{-1}$`, undefined, { applies: C });
  q.card("CONCEPT", "Estimating the age of the Universe?", "Age ≈ d/v = 1/H₀ ≈ 4.5 × 10¹⁷ s, about 14 billion years.", undefined, { applies: C });
});
