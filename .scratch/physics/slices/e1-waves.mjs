import { concept, P, t } from "../lib.mjs";

const r = (x, n = 3) => Number(x.toPrecision(n));
const Z = ["zimsec"];
const C = ["cambridge"];
const REL2 = { kind: "relative", amount: 0.02 };

// =====================================================================================================================
concept("phys.waves.wave-properties", {
  file: "waves/wave-properties",
  keyPrefix: "waves.properties",
  objectives: { cambridge: ["3.1.1", "3.1.2", "3.1.3", "3.1.4", "3.1.5", "3.1.6"], zimsec: ["9.1.1", "9.1.2", "9.1.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What does a wave transfer from one place to another?",
    options: [["Energy only", "Correct: the medium only vibrates about fixed positions."], ["Matter only", "The particles of the medium are not carried along."], ["Both energy and matter", "Matter is not transferred."], ["Particles of the medium", "The particles vibrate about fixed positions."]],
    answer: "A", explanation: "A wave transfers energy without transferring matter." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A cork floating on a pond is carried towards the bank by the ripples passing it.",
    answer: false, explanation: "The cork only bobs up and down as the ripples pass; waves transfer energy, not the water or the cork." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which distance is the wavelength of a wave?",
    options: [["The distance between two neighbouring crests", "Correct."], ["The distance from a crest to the next trough", "That is half a wavelength."], ["The height of a crest above the rest position", "That is the amplitude."], ["The distance the wave travels in one minute", "No: that depends on the wave speed."]],
    answer: "A", explanation: "The wavelength is the distance between neighbouring crests (or corresponding points on adjacent waves)." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a longitudinal wave?",
    options: [["Sound travelling through air", "Correct."], ["Light from the Sun", "Electromagnetic waves are transverse."], ["Ripples on the surface of a dam", "Water waves are transverse."], ["A seismic S-wave", "S-waves are transverse."]],
    answer: "A", explanation: "Sound is longitudinal: the air particles vibrate along the direction the wave travels." });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each quantity with its meaning.",
    pairs: [["Amplitude", "Maximum displacement from the rest position"], ["Frequency", "Number of waves passing a point each second"], ["Wavelength", "Distance between neighbouring crests"], ["Wave speed", "Distance a wavefront travels each second"]],
    explanation: "Amplitude: maximum displacement. Frequency: waves per second. Wavelength: crest to next crest. Speed: distance travelled per second." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: "Waves on a rope have a frequency of 4.0 Hz and a wavelength of 0.75 m. Calculate the wave speed.",
    value: 3.0, answer: "3.0", unit: "m/s", wrong: [5.3, 0.19],
    explanation: t`$v = f\lambda = 4.0 \times 0.75 = 3.0\ \text{m/s}$.` });

  q.calc({ d: 3, skill: "APPLICATION",
    stem: "A tuning fork of frequency 512 Hz produces a sound wave of wavelength 0.66 m in air. Calculate the speed of sound in air.",
    value: 512 * 0.66, unit: "m/s", wrong: [776, 0.0013],
    explanation: t`$v = f\lambda = 512 \times 0.66 = 338\ \text{m/s}$.`,
    hints: [t`Use $v = f\lambda$.`] });

  q.num({ d: 3, skill: "ANALYSIS",
    stem: "Waves on a large lake travel at 1.8 m/s with a frequency of 0.45 Hz. Calculate their wavelength.",
    value: 4.0, answer: "4.0", unit: "m", wrong: [0.81, 0.25],
    explanation: t`$\lambda = \dfrac{v}{f} = \dfrac{1.8}{0.45} = 4.0\ \text{m}$.`,
    hints: [t`Rearrange $v = f\lambda$ to make $\lambda$ the subject.`] });

  q.num({ d: 2, skill: "APPLICATION", applies: Z,
    stem: "A loudspeaker cone vibrates with a frequency of 50 Hz. What is the period of its vibration?",
    value: 0.02, answer: "0.02", unit: "s", wrong: [50, 0.2],
    explanation: t`$T = \dfrac{1}{f} = \dfrac{1}{50} = 0.02\ \text{s}$.` });

  q.calc({ d: 3, skill: "ANALYSIS", applies: Z,
    stem: "A wave has a period of 0.25 s and a wavelength of 1.6 m. Calculate its speed.",
    value: 6.4, answer: "6.4", unit: "m/s", wrong: [0.4, 0.16],
    explanation: t`$f = \dfrac{1}{T} = \dfrac{1}{0.25} = 4.0\ \text{Hz}$, so $v = f\lambda = 4.0 \times 1.6 = 6.4\ \text{m/s}$.`,
    hints: [t`First find the frequency from $f = \dfrac{1}{T}$.`] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "The vibrator in a ripple tank is made to vibrate twice as fast. The depth of the water is not changed. What happens to the wavelength of the ripples?",
    options: [["It halves.", "Correct: the speed is fixed by the water, so λ = v/f halves."], ["It doubles.", "A higher frequency gives a shorter wavelength."], ["It stays the same.", "The speed stays the same, so the wavelength must change."], ["It becomes a quarter.", "λ is inversely proportional to f, not to f²."]],
    answer: "A", explanation: t`The wave speed depends on the water, not the source. With $v$ fixed, $\lambda = \dfrac{v}{f}$, so doubling $f$ halves $\lambda$.` });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "In a transverse wave the vibrations are {{blank:a}} to the direction of travel; in a longitudinal wave they are {{blank:b}} to it.",
    blanks: [
      { id: "a", input: "select", choices: ["at right angles", "parallel"], accepted: ["at right angles"], wrong: "parallel" },
      { id: "b", input: "select", choices: ["at right angles", "parallel"], accepted: ["parallel"], wrong: "at right angles" },
    ],
    explanation: "Transverse: vibrations at right angles to the direction of travel. Longitudinal: vibrations parallel to it." });

  q.mcq({ d: 2, skill: "RECALL", applies: C,
    stem: "Which statement about seismic waves is correct?",
    options: [["P-waves are longitudinal and S-waves are transverse.", "Correct."], ["P-waves and S-waves are both transverse.", "P-waves are longitudinal."], ["P-waves and S-waves are both longitudinal.", "S-waves are transverse."], ["P-waves are transverse and S-waves are longitudinal.", "It is the other way round."]],
    answer: "A", explanation: "Seismic P-waves (primary) are longitudinal; S-waves (secondary) are transverse." });

  q.short({ d: 1, skill: "RECALL",
    stem: "Name the type of wave in which the particles vibrate parallel to the direction in which the energy travels.",
    accepted: ["longitudinal", "longitudinal wave", "longitudinal waves", "a longitudinal wave"], wrong: ["transverse"],
    explanation: "In a longitudinal wave (such as sound) the vibrations are parallel to the direction of energy transfer." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A learner shakes one end of a long rope up and down twice every second. A photograph shows that neighbouring crests on the rope are 1.2 m apart, and the vertical distance from the top of a crest to the bottom of a trough is 10 cm.",
    parts: [
      P.num({ label: "(a)", stem: "State the wavelength of the wave.", value: 1.2, answer: "1.2", unit: "m", wrong: [0.6],
        explanation: "The wavelength is the distance between neighbouring crests: 1.2 m." }),
      P.num({ label: "(b)", stem: "State the amplitude of the wave in centimetres.", value: 5.0, answer: "5.0", unit: "cm", wrong: [10],
        explanation: "The amplitude is from the rest position to a crest: half of 10 cm, which is 5.0 cm." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the speed of the wave along the rope.", value: 2.4, answer: "2.4", unit: "m/s", wrong: [0.6],
        explanation: t`The frequency is 2.0 Hz, so $v = f\lambda = 2.0 \times 1.2 = 2.4\ \text{m/s}$.` }),
      P.mcq({ label: "(d)", stem: "What does the wave carry along the rope?", options: [["Energy", "Correct."], ["Pieces of the rope", "The rope stays in place."], ["Air", "No."], ["Mass", "Matter is not transferred."]], answer: "A",
        explanation: "The wave transfers energy; each part of the rope only moves up and down." }),
    ],
    explanation: "λ = crest-to-crest distance; amplitude = half the crest-to-trough height; v = fλ.",
    hints: ["Amplitude is measured from the rest position, not from crest to trough."] });

  q.card("DEFINITION", "What is a **wave**?", "A disturbance that transfers energy from place to place without transferring matter.");
  q.card("DEFINITION", "What is the **wavelength** λ?", "The distance between two neighbouring crests (or troughs).");
  q.card("DEFINITION", "What is **frequency**?", "The number of waves passing a point each second; unit hertz (Hz).");
  q.card("DEFINITION", "What is **amplitude**?", "The maximum displacement of a point on the wave from its rest position.");
  q.card("FORMULA", "The wave equation?", t`$v = f\lambda$ (speed = frequency × wavelength).`);
  q.card("FORMULA", "Period and frequency?", t`$T = \dfrac{1}{f}$`, undefined, { applies: Z });
  q.card("CONCEPT", "Transverse vs longitudinal waves?", "Transverse: vibrations at right angles to travel (light, water waves, S-waves). Longitudinal: vibrations parallel to travel (sound, P-waves).");
  q.card("CONCEPT", "What happens to λ if a source's frequency is increased in the same medium?", "The speed stays the same, so the wavelength gets shorter.");
});

// =====================================================================================================================
concept("phys.waves.wave-behaviour", {
  file: "waves/wave-behaviour",
  keyPrefix: "waves.behaviour",
  objectives: { cambridge: ["3.1.7", "3.1.8", "3.1.9", "3.1.10"], zimsec: ["9.1.4"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "What is diffraction?",
    options: [["The spreading out of waves through a gap or around an edge", "Correct."], ["The bouncing back of waves from a barrier", "That is reflection."], ["The change of direction caused by a change of speed", "That is refraction."], ["A change in the frequency of a wave", "Frequency does not change."]],
    answer: "A", explanation: "Diffraction is the spreading of waves as they pass through a gap or around the edge of an obstacle." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Water waves pass from deep water into shallow water. Which quantity stays the same?",
    options: [["Frequency", "Correct: it is set by the source."], ["Speed", "Waves slow down in shallow water."], ["Wavelength", "The wavelength gets shorter."], ["Direction, whatever the angle", "Waves arriving at an angle change direction."]],
    answer: "A", explanation: "The frequency is fixed by the source; the speed and wavelength both decrease in shallow water." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "What happens to the speed and wavelength of water waves as they move from deep into shallow water?",
    options: [["Both decrease.", "Correct."], ["Both increase.", "Waves slow down in shallow water."], ["The speed decreases but the wavelength increases.", "With the same frequency, a lower speed means a shorter wavelength."], ["The speed stays the same but the wavelength decreases.", "The speed decreases."]],
    answer: "A", explanation: t`Waves travel more slowly in shallow water; since $f$ is unchanged, $\lambda = \dfrac{v}{f}$ also decreases.` });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When water waves reflect from a straight barrier, their wavelength becomes shorter.",
    answer: false, explanation: "Reflection changes only the direction of the waves; the wavelength, frequency and speed stay the same." });

  q.num({ d: 1, skill: "APPLICATION",
    stem: "Straight water waves strike a flat barrier with an angle of incidence of 28°. What is the angle of reflection?",
    value: 28, unit: "°", wrong: [62],
    explanation: "The angle of reflection equals the angle of incidence: 28°." });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "Ripples of frequency 8.0 Hz travel at 0.24 m/s in the deep part of a ripple tank. Calculate their wavelength in centimetres.",
    value: 3.0, answer: "3.0", unit: "cm", wrong: [0.03, 1.9, 33],
    explanation: t`$\lambda = \dfrac{v}{f} = \dfrac{0.24}{8.0} = 0.030\ \text{m} = 3.0\ \text{cm}$.` });

  q.num({ d: 3, skill: "ANALYSIS",
    stem: "Water waves have a wavelength of 2.5 cm in deep water. They pass into shallow water, where their speed is 60% of the speed in deep water. What is their wavelength in the shallow water?",
    value: 1.5, answer: "1.5", unit: "cm", wrong: [2.5, 4.2],
    explanation: t`The frequency does not change, so the wavelength is proportional to the speed: $\lambda = 0.60 \times 2.5 = 1.5\ \text{cm}$.`,
    hints: ["The frequency stays the same, so the wavelength changes in proportion to the speed."] });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "How can water waves in a ripple tank be made to refract?",
    options: [["Place a glass plate in the tank to make a region of shallower water", "Correct: waves slow down over the plate."], ["Put a barrier with a narrow gap across the middle of the tank", "That shows diffraction."], ["Place a straight barrier across the path of the oncoming waves", "That shows reflection."], ["Make the vibrator vibrate faster so the waves bend as they travel", "That shortens the wavelength everywhere but causes no bending."]],
    answer: "A", explanation: "Refraction needs a change of speed: waves slow down where the water is shallower." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "Straight water waves pass through a gap in a barrier. For which gap do the waves spread out the most?",
    options: [["A gap about the same width as the wavelength", "Correct."], ["A gap much wider than the wavelength", "The waves pass through almost straight."], ["A gap ten times the wavelength", "Too wide: little spreading."], ["The spreading does not depend on the gap", "It depends on the gap width compared with the wavelength."]],
    answer: "A", explanation: "Diffraction is greatest when the gap is similar in size to the wavelength." });

  q.tf({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "When waves diffract through a gap, their wavelength stays the same.",
    answer: true, explanation: "Diffraction changes the direction and shape of the wavefronts, not their spacing (wavelength)." });

  q.mcq({ d: 3, skill: "ANALYSIS", applies: C,
    stem: "A house in a valley receives long-wave radio signals from a transmitter behind a hill, but it cannot receive a signal of much shorter wavelength from the same transmitter. What is the best explanation?",
    options: [["Longer wavelengths diffract more around the edge of the hill.", "Correct."], ["Long waves travel faster than short waves, so they reach further.", "All electromagnetic waves travel at the same speed in air."], ["Short waves are absorbed completely by the air above the valley.", "Not the reason."], ["Short waves are sound waves, which cannot reach the valley.", "Both are electromagnetic waves."]],
    answer: "A", explanation: "Diffraction at an edge increases with wavelength, so long waves bend around the hilltop into the valley while short waves do not.",
    hints: ["How does wavelength affect diffraction at an edge?"] });

  q.match({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "Match each ripple-tank arrangement with what it shows.",
    pairs: [["Waves strike a straight metal barrier", "Reflection"], ["Waves cross over a submerged glass plate at an angle", "Refraction"], ["Waves pass through a narrow gap in a barrier", "Diffraction at a gap"], ["Waves pass the end of a long barrier", "Diffraction at an edge"]],
    explanation: "A barrier reflects; a change of depth refracts; gaps and edges diffract." });

  q.short({ d: 1, skill: "RECALL", applies: C,
    stem: "Name the effect in which waves spread out after passing through a gap.",
    accepted: ["diffraction"], wrong: ["refraction"],
    explanation: "This is diffraction." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A learner places a glass plate in one half of a ripple tank so that the water there is shallower. A vibrating bar makes straight waves of frequency 12 Hz. In the deep region the wavefronts are 2.5 cm apart.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the speed of the waves in the deep region in cm/s.", value: 30, unit: "cm/s", wrong: [4.8, 0.21],
        explanation: t`$v = f\lambda = 12 \times 2.5 = 30\ \text{cm/s}$.` }),
      P.mcq({ label: "(b)", stem: "How does the spacing of the wavefronts change in the shallow region?", options: [["They are closer together.", "Correct: the waves slow down, so the wavelength is shorter."], ["They are further apart.", "Slower waves have a shorter wavelength."], ["The spacing does not change.", "The wavelength changes with speed."], ["The wavefronts become circular.", "Not over a flat plate."]], answer: "A",
        explanation: "In shallow water the waves slow down; the frequency is unchanged, so the wavelength decreases." }),
      P.manual({ label: "(c)", marks: 2, stem: "The waves cross the boundary at an angle. Describe and explain what happens to their direction.",
        points: ["The waves change direction, bending towards the normal", "because their speed decreases in the shallow water"] }),
      P.tf({ label: "(d)", stem: "The frequency of the waves in the shallow region is less than 12 Hz.", answer: false,
        explanation: "The frequency is set by the vibrator and does not change." }),
    ],
    explanation: "Waves slow down in shallow water: the wavelength shortens, the frequency stays the same, and waves arriving at an angle bend towards the normal.",
    hints: [t`Use $v = f\lambda$, and remember the frequency is set by the source.`] });

  q.card("DEFINITION", "What is **refraction** of a wave?", "A change in direction when a wave enters a new medium at an angle, caused by a change in speed.");
  q.card("DEFINITION", "What is **diffraction**?", "The spreading out of waves as they pass through a gap or around an edge.", undefined, { applies: C });
  q.card("CONCEPT", "Water waves going from deep to shallow water?", "Speed and wavelength decrease; frequency unchanged; they bend towards the normal.");
  q.card("FACT", "Which wave quantity never changes when a wave enters a new medium?", "Its frequency (set by the source).");
  q.card("CONCEPT", "When is diffraction through a gap greatest?", "When the gap is about the same size as the wavelength.", undefined, { applies: C });
  q.card("CONCEPT", "How does wavelength affect diffraction at an edge?", "Longer wavelengths diffract (bend round the edge) more.", undefined, { applies: C });
  q.card("CONCEPT", "What does reflection change about a wave?", "Only its direction: angle of incidence = angle of reflection; wavelength, frequency and speed are unchanged.");
});

// =====================================================================================================================
concept("phys.waves.sound", {
  file: "waves/sound",
  keyPrefix: "waves.sound",
  objectives: { cambridge: ["3.4.1", "3.4.2", "3.4.3", "3.4.4", "3.4.5", "3.4.6", "3.4.7", "3.4.10", "3.4.11"], zimsec: ["9.2.1", "9.2.2", "9.2.3", "9.2.4", "9.2.5"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the approximate range of frequencies that a healthy young person can hear?",
    options: [["20 Hz to 20 000 Hz", "Correct."], ["2 Hz to 2000 Hz", "Too low."], ["20 kHz to 200 kHz", "That is ultrasound."], ["200 Hz to 200 000 Hz", "No."]],
    answer: "A", explanation: "Human hearing ranges from about 20 Hz to 20 000 Hz (20 kHz)." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is the approximate speed of sound in air?",
    options: [["About 330 to 350 m/s", "Correct."], ["About 33 m/s", "Far too slow."], ["About 3300 m/s", "That is closer to the speed in some solids."], [t`$3.0 \times 10^{8}\ \text{m/s}$`, "That is the speed of light."]],
    answer: "A", explanation: "Sound travels at about 330–350 m/s in air." });

  q.tf({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Sound can travel through a vacuum.",
    answer: false, explanation: "Sound needs a medium: its vibrations are passed on by particles, and a vacuum has none." });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why can two astronauts on a spacewalk not hear each other shout, even when they are close together?",
    options: [["There is no air in space to carry the sound.", "Correct: sound needs a medium."], ["Sound travels too fast in space to be heard.", "Sound cannot travel in space at all."], ["Space is too cold for sound waves to form.", "Temperature is not the reason."], ["Their helmets reflect the sound back to them.", "Without air there is no sound to reflect."]],
    answer: "A", explanation: "Sound is passed on by vibrating particles; space is a near vacuum, so there is no medium to carry it." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A musician plays the same note more loudly. What property of the sound wave has increased?",
    options: [["Its amplitude", "Correct."], ["Its frequency", "That would raise the pitch."], ["Its speed", "The speed depends on the medium."], ["Its wavelength", "The note (frequency) is the same, so the wavelength is the same."]],
    answer: "A", explanation: "Loudness depends on amplitude; pitch depends on frequency." });

  q.mcq({ d: 3, skill: "ANALYSIS",
    stem: "Two sounds are displayed on an oscilloscope with the same settings. Trace X shows 4 complete waves across the screen; trace Y shows 8 complete waves of the same height. Compared with sound X, sound Y is:",
    options: [["higher in pitch and equally loud", "Correct: double the frequency, same amplitude."], ["louder and the same pitch", "The heights (amplitudes) are equal."], ["lower in pitch and equally loud", "More waves on the screen means a higher frequency."], ["louder and higher in pitch", "The amplitudes are the same."]],
    answer: "A", explanation: "More waves across the same screen means a higher frequency (higher pitch); equal heights mean equal amplitude (equal loudness).",
    hints: ["The number of waves on the screen shows the frequency; their height shows the amplitude."] });

  q.mcq({ d: 2, skill: "RECALL", applies: C,
    stem: "In which material does sound generally travel fastest?",
    options: [["Steel", "Correct: sound is fastest in solids."], ["Water", "Liquids are slower than solids."], ["Air", "Gases are slowest."], ["A vacuum", "Sound cannot travel in a vacuum."]],
    answer: "A", explanation: "Sound generally travels fastest in solids, slower in liquids and slowest in gases." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: "During a storm, a learner sees a flash of lightning and hears the thunder 3.5 s later. The speed of sound in air is 343 m/s. How far away is the lightning, in metres?",
    value: 3.5 * 343, unit: "m", wrong: [600, 98],
    explanation: t`Light arrives almost instantly, so distance $= \text{speed} \times \text{time} = 343 \times 3.5 = 1200\ \text{m}$ (about 1.2 km).` });

  q.calc({ d: 3, skill: "ANALYSIS",
    stem: "Two learners stand 680 m apart. One fires a starting pistol; the other starts a stopwatch on seeing the smoke and stops it on hearing the bang. The times recorded are 1.92 s, 2.01 s, 1.95 s, 1.98 s and 2.04 s. Calculate the speed of sound.",
    value: 680 / 1.98, unit: "m/s", wrong: [354, 1350],
    explanation: t`Mean time $= \dfrac{1.92 + 2.01 + 1.95 + 1.98 + 2.04}{5} = 1.98\ \text{s}$. Speed $= \dfrac{680}{1.98} = 343\ \text{m/s}$.`,
    hints: ["First find the mean of the five times.", "speed = distance ÷ time"] });

  q.num({ d: 2, skill: "APPLICATION",
    stem: "A note of frequency 440 Hz is played in air, where the speed of sound is 330 m/s. Calculate the wavelength of the sound.",
    value: 0.75, answer: "0.75", unit: "m", wrong: [1.33, 145200],
    explanation: t`$\lambda = \dfrac{v}{f} = \dfrac{330}{440} = 0.75\ \text{m}$.` });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Sound waves are {{blank:a}} waves, made of compressions and {{blank:b}}.",
    blanks: [
      { id: "a", input: "select", choices: ["transverse", "longitudinal"], accepted: ["longitudinal"], wrong: "transverse" },
      { id: "b", accepted: ["rarefactions", "rarefaction"], wrong: "crests" },
    ],
    explanation: "Sound is a longitudinal wave of compressions (particles closer together) and rarefactions (particles further apart)." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "A guitar and a flute play the same note equally loudly, yet they sound different. Which property of the sound is different?",
    options: [["Its quality (timbre), set by the shape of the waveform", "Correct."], ["Its pitch, set by how high or low the note is", "The same note has the same pitch."], ["Its frequency, the number of vibrations per second", "The same note has the same frequency."], ["Its amplitude, the size of each vibration of the air", "They are equally loud."]],
    answer: "A", explanation: "Quality (timbre) depends on the waveform shape, which differs between instruments playing the same note." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Why does sound generally travel faster in solids than in gases?",
    options: [["Closer, strongly linked particles pass vibrations on faster.", "Correct."], ["Solids are colder than gases, so sound loses less energy.", "Temperature is not the main reason."], ["Sound becomes a transverse wave in solids, which travels faster.", "Sound in a solid can be longitudinal; that is not the reason."], ["Solids have no air in them to slow the sound down.", "Sound needs particles; air is not what slows it."]],
    answer: "A", explanation: "In a solid, closely packed, strongly bonded particles pass vibrations on quickly, so sound travels faster.",
    hints: ["Think about how far apart the particles are and how strongly they are linked."] });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Two learners plan to measure the speed of sound in air on the school sports field.",
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Describe how they should carry out the experiment.",
        points: ["Measure a large distance between them (several hundred metres) with a long tape or trundle wheel", "One makes a sound that can also be seen, such as banging two blocks together or firing a starting pistol", "The other starts a stopwatch on seeing the action and stops it on hearing the sound", "Repeat, find the mean time and calculate speed = distance ÷ time"] }),
      P.mcq({ label: "(b)", stem: "Why should the distance be large?", options: [["So the time is long compared with the observer's reaction time", "Correct: this reduces the percentage error."], ["So the sound is louder", "A larger distance makes it quieter."], ["Because sound travels faster over long distances", "The speed does not depend on distance."], ["So the light arrives first", "Light always arrives first."]], answer: "A",
        explanation: "A longer time makes the reaction-time error a smaller fraction of the measurement." }),
      P.mcq({ label: "(c)", stem: "Why can the time taken by the light be ignored?", options: [["Light travels about a million times faster than sound.", "Correct."], ["Light has no speed: it arrives everywhere instantly.", "Light travels at a finite speed."], ["Light travels more slowly than sound over short distances.", "It is far faster."], ["Light cannot travel through air, so it is not timed.", "It can."]], answer: "A",
        explanation: "Light crosses a few hundred metres in about a microsecond, which is negligible." }),
    ],
    explanation: "Use a large measured distance, time from seeing to hearing, repeat and average, then speed = distance ÷ time.",
    hints: ["The observer must see the sound being made."] });

  q.card("FACT", "Range of human hearing?", "About 20 Hz to 20 000 Hz (20 kHz).");
  q.card("FACT", "Speed of sound in air?", "About 330–350 m/s.");
  q.card("CONCEPT", "Why can sound not travel through a vacuum?", "Sound is passed on by vibrating particles; a vacuum has no particles (no medium).");
  q.card("DEFINITION", "**Compression** and **rarefaction**?", "Compression: particles closer together (higher pressure). Rarefaction: particles further apart (lower pressure).");
  q.card("CONCEPT", "What sets pitch and loudness?", "Pitch: frequency. Loudness: amplitude.");
  q.card("FACT", "Speed of sound in solids, liquids and gases?", "Generally fastest in solids, slower in liquids, slowest in gases.", undefined, { applies: C });
  q.card("CONCEPT", "What is the **quality** (timbre) of a sound?", "What makes the same note sound different on different instruments; it depends on the waveform shape.", undefined, { applies: Z });
  q.card("CONCEPT", "How do you measure the speed of sound in air?", "Measure a large distance; time from seeing a sound made to hearing it; repeat, average; speed = distance ÷ time.");
});

// =====================================================================================================================
concept("phys.waves.echoes-ultrasound", {
  file: "waves/echoes-ultrasound",
  keyPrefix: "waves.echoes",
  objectives: { cambridge: ["3.4.8", "3.4.9", "3.4.12"], zimsec: ["9.2.6"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is an echo?",
    options: [["A sound that has been reflected", "Correct."], ["A sound that has been refracted", "Echoes are reflections."], ["A sound that has spread through a gap", "That is diffraction."], ["A very loud sound", "Loudness is not the point."]],
    answer: "A", explanation: "An echo is a reflected sound." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "What is ultrasound?",
    options: [["Sound with a frequency above 20 kHz", "Correct."], ["Sound with a frequency below 20 Hz", "That is infrasound."], ["An electromagnetic wave", "Ultrasound is a sound wave."], ["Any very loud sound", "It is defined by frequency, not loudness."]],
    answer: "A", explanation: "Ultrasound is sound with a frequency higher than 20 kHz, above the range of human hearing." });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: "A learner stands 99 m from a large wall and claps once. The speed of sound is 330 m/s. How long after the clap is the echo heard?",
    value: 0.6, answer: "0.6", unit: "s", wrong: [0.3, 3.3],
    explanation: t`The sound travels to the wall and back: $2 \times 99 = 198\ \text{m}$. Time $= \dfrac{198}{330} = 0.6\ \text{s}$.` });

  q.num({ d: 2, skill: "APPLICATION", daily: true,
    stem: "A herder cracks a whip near a granite kopje and hears the echo 0.90 s later. The speed of sound in air is 330 m/s. How far away is the kopje?",
    value: 330 * 0.9 / 2, unit: "m", wrong: [297, 367],
    explanation: t`Distance $= \dfrac{\text{speed} \times \text{time}}{2} = \dfrac{330 \times 0.90}{2} = 149\ \text{m}$.` });

  q.num({ d: 3, skill: "APPLICATION",
    stem: "A fishing boat's echo sounder sends ultrasound pulses down through a lake. The echo from the lake bed returns 0.040 s after a pulse is sent. Sound travels at 1450 m/s in the water. Calculate the depth of the lake.",
    value: 29, unit: "m", tol: 0.5, wrong: [58],
    explanation: t`Depth $= \dfrac{1450 \times 0.040}{2} = 29\ \text{m}$.`,
    hints: ["The pulse travels down and back up.", "depth = speed × time ÷ 2"] });

  q.num({ d: 4, skill: "ANALYSIS",
    stem: "A ship's sonar receives an echo from a shoal of fish 0.012 s after sending a pulse, and an echo from the seabed 0.050 s after the pulse. Sound travels at 1480 m/s in seawater. How far above the seabed is the shoal?",
    value: (0.050 - 0.012) * 1480 / 2, unit: "m", wrong: [56.2, 37],
    explanation: t`Shoal depth $= \dfrac{1480 \times 0.012}{2} = 8.9\ \text{m}$; seabed depth $= \dfrac{1480 \times 0.050}{2} = 37\ \text{m}$. The shoal is $37 - 8.9 = 28\ \text{m}$ above the seabed.`,
    hints: ["Find the depth of the shoal and the depth of the seabed separately.", "Remember to halve each echo distance."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why is ultrasound, rather than X-rays, used to check the health of an unborn baby?",
    options: [["Ultrasound is not ionising, so it does not damage cells.", "Correct."], ["Ultrasound passes through bone more easily than X-rays.", "Not the reason."], ["Ultrasound travels faster than X-rays.", "X-rays are far faster."], ["X-rays cannot pass through skin.", "They can."]],
    answer: "A", explanation: "Ultrasound is not ionising and is safe for soft tissue; X-rays are ionising and could harm the developing baby." });

  q.mcq({ d: 2, skill: "APPLICATION", applies: C,
    stem: "An engineer sends ultrasound pulses into a steel rail. As well as the echo from the bottom of the rail, an extra echo arrives earlier. What does this show?",
    options: [["There is a crack or flaw inside the rail.", "Correct: the flaw reflects some of the ultrasound."], ["The rail is longer than expected.", "Length along the rail is not being measured."], ["The steel is hotter than normal.", "Not shown by an extra echo."], ["The ultrasound has changed frequency.", "Frequency does not change on reflection."]],
    answer: "A", explanation: "A hidden crack reflects ultrasound before it reaches the far side, giving an early echo: this is non-destructive testing." });

  q.tf({ d: 2, skill: "UNDERSTANDING",
    stem: "Humans can hear ultrasound if it is loud enough.",
    answer: false, explanation: "Ultrasound is above the frequency range of human hearing (above 20 kHz), however loud it is." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In echo calculations, why is the distance travelled by the sound divided by 2?",
    options: [["The sound travels to the reflecting surface and back again.", "Correct."], ["The sound slows to half its speed after reflecting.", "Its speed does not change."], ["Half of the sound is absorbed.", "Absorption does not change the distance."], ["Sound waves are longitudinal.", "Not the reason."]],
    answer: "A", explanation: "The echo time is for the journey there and back, so the distance to the surface is half the total distance." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Bats can hunt insects in complete darkness. How do they find them?",
    options: [["They send out ultrasound and detect the echoes.", "Correct."], ["They detect light emitted by the insects.", "Most insects give out no light."], ["They send out radio waves.", "Bats use sound."], ["They feel the insects' wings moving the air.", "Not their main method."]],
    answer: "A", explanation: "Bats emit ultrasound pulses and use the echoes from insects to locate them (echolocation)." });

  q.match({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "Match each use of ultrasound with what reflects the pulses.",
    pairs: [["Sonar on a ship", "The seabed or a shoal of fish"], ["Medical scanning", "Boundaries between soft tissues"], ["Testing a metal casting", "A crack inside the metal"]],
    explanation: "Sonar: the seabed or fish. Medical scanning: tissue boundaries. Non-destructive testing: hidden cracks." });

  q.short({ d: 1, skill: "RECALL",
    stem: "What name is given to sound with a frequency above 20 kHz?",
    accepted: ["ultrasound", "ultrasonic sound", "ultrasonic", "ultrasound waves"], wrong: ["infrasound"],
    explanation: "Sound above 20 kHz is called ultrasound." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A learner stands 78 m from a tall wall and claps so that each clap coincides with the echo of the one before. A second learner finds that the time for 30 intervals between claps is 13.8 s.",
    parts: [
      P.num({ label: "(a)", stem: "Calculate the time for one interval (the time for sound to reach the wall and return).", value: 0.46, answer: "0.46", unit: "s", wrong: [0.92],
        explanation: t`$\dfrac{13.8}{30} = 0.46\ \text{s}$.` }),
      P.num({ label: "(b)", stem: "State the distance the sound travels in this time.", value: 156, unit: "m", wrong: [78],
        explanation: t`To the wall and back: $2 \times 78 = 156\ \text{m}$.` }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the speed of sound.", value: 156 / 0.46, unit: "m/s", wrong: [170],
        explanation: t`$v = \dfrac{156}{0.46} = 339\ \text{m/s}$.` }),
      P.manual({ label: "(d)", marks: 1, stem: "Suggest why the learners time 30 intervals instead of one.",
        points: ["Timing many intervals reduces the effect of reaction time, making the result more accurate"] }),
    ],
    explanation: "One interval is the time for the round trip of 156 m; speed = 156 ÷ 0.46 = 339 m/s.",
    hints: ["In one interval the sound goes to the wall and back."] });

  q.card("DEFINITION", "What is an **echo**?", "A sound heard after reflection from a surface.");
  q.card("DEFINITION", "What is **ultrasound**?", "Sound with a frequency above 20 kHz, too high for humans to hear.");
  q.card("FORMULA", "Distance to a reflecting surface from an echo?", "distance = speed × echo time ÷ 2 (the sound goes there and back).");
  q.card("FACT", "Three uses of ultrasound?", "Sonar (depth and fish finding), medical scanning of soft tissue, finding cracks in metals (non-destructive testing).");
  q.card("CONCEPT", "Why is ultrasound used for pregnancy scans?", "It is not ionising, so it is safe for soft tissue and the baby.");
  q.card("CONCEPT", "How does an echo sounder find depth?", "It times an ultrasound pulse to the bottom and back; depth = speed × time ÷ 2.");
});

// =====================================================================================================================
concept("phys.waves.em-spectrum", {
  file: "waves/em-spectrum",
  keyPrefix: "waves.em",
  objectives: { cambridge: ["3.3.1", "3.3.2", "3.3.3", "3.3.4", "3.3.6"], zimsec: ["9.3.1", "9.3.2", "9.3.3"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which list shows parts of the electromagnetic spectrum in order of increasing frequency?",
    options: [["radio waves, infrared, ultraviolet, gamma rays", "Correct."], ["gamma rays, ultraviolet, infrared, radio waves", "That is decreasing frequency."], ["infrared, radio waves, ultraviolet, gamma rays", "Radio waves have a lower frequency than infrared."], ["radio waves, ultraviolet, infrared, gamma rays", "Infrared has a lower frequency than ultraviolet."]],
    answer: "A", explanation: "In order of increasing frequency: radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays." });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which type of electromagnetic radiation has the longest wavelength?",
    options: [["Radio waves", "Correct."], ["Gamma rays", "They have the shortest wavelength."], ["X-rays", "Very short wavelength."], ["Visible light", "Much shorter than radio waves."]],
    answer: "A", explanation: "Radio waves have the longest wavelengths (and lowest frequencies) in the electromagnetic spectrum." });

  q.tf({ d: 2, skill: "RECALL", daily: true,
    stem: "All electromagnetic waves travel at the same speed in a vacuum.",
    answer: true, explanation: t`All electromagnetic waves travel at $3.0 \times 10^{8}\ \text{m/s}$ in a vacuum; they differ in frequency and wavelength.` });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Which statement is NOT true for all electromagnetic waves?",
    options: [["They all have the same frequency.", "Correct: this is false; each region has a different range of frequencies."], ["They are all transverse waves.", "True for all."], ["They can all travel through a vacuum.", "True for all."], ["They all transfer energy.", "True for all."]],
    answer: "A", explanation: "Electromagnetic waves share their nature and speed, but differ in frequency and wavelength." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: Z,
    stem: "Ultraviolet and infrared radiation are compared. In which way are they different?",
    options: [["Frequency and wavelength", "Correct."], ["Speed in a vacuum", "All electromagnetic waves have the same speed in a vacuum."], ["Ability to travel through a vacuum", "Both can."], ["Whether they are transverse", "Both are transverse."]],
    answer: "A", explanation: "Electromagnetic waves differ only in frequency and wavelength (and so in how they interact with matter)." });

  q.match({ d: 2, skill: "RECALL",
    stem: "Match each type of radiation with a typical use.",
    pairs: [["Radio waves", "Radio and television broadcasting"], ["Infrared", "Television remote controls"], ["Ultraviolet", "Detecting forged banknotes"], ["X-rays", "Imaging broken bones"], ["Gamma rays", "Sterilising medical equipment"]],
    explanation: "Radio: broadcasting. Infrared: remote controls. Ultraviolet: security marks. X-rays: bone images. Gamma: sterilising." });

  q.match({ d: 3, skill: "RECALL", applies: C,
    stem: "Match each type of radiation with a harmful effect of excessive exposure.",
    pairs: [["Microwaves", "Internal heating of body cells"], ["Infrared", "Skin burns"], ["Ultraviolet", "Damage to surface cells and eyes"], ["Gamma rays", "Mutation and cancer"]],
    explanation: "Microwaves heat body cells; infrared burns skin; ultraviolet damages skin and eyes; gamma rays (and X-rays) cause mutations and cancer.",
    hints: ["Higher frequencies penetrate and ionise; lower ones mainly heat."] });

  q.num({ d: 2, skill: "APPLICATION",
    stem: t`A mobile phone signal has a frequency of 900 MHz ($9.0 \times 10^{8}\ \text{Hz}$). The speed of electromagnetic waves is $3.0 \times 10^{8}\ \text{m/s}$. Calculate the wavelength.`,
    value: 3.0e8 / 9.0e8, unit: "m", wrong: [3, 2.7e17],
    explanation: t`$\lambda = \dfrac{v}{f} = \dfrac{3.0 \times 10^{8}}{9.0 \times 10^{8}} = 0.33\ \text{m}$.` });

  q.calc({ d: 3, skill: "APPLICATION",
    stem: t`Red light has a wavelength of $6.0 \times 10^{-7}\ \text{m}$. The speed of light is $3.0 \times 10^{8}\ \text{m/s}$. Calculate its frequency.`,
    value: 5.0e14, answer: "5.0e14", tol: REL2, unit: "Hz", wrong: [180, 2e-15],
    explanation: t`$f = \dfrac{v}{\lambda} = \dfrac{3.0 \times 10^{8}}{6.0 \times 10^{-7}} = 5.0 \times 10^{14}\ \text{Hz}$.`,
    hints: [t`Rearrange $v = f\lambda$ to give $f = \dfrac{v}{\lambda}$.`, "Take care with the powers of ten."] });

  q.mcq({ d: 2, skill: "UNDERSTANDING",
    stem: "Why are X-rays used to produce images of broken bones?",
    options: [["X-rays pass through soft tissue but are absorbed by bone.", "Correct."], ["X-rays are reflected by the skin and show its outline.", "X-rays pass through skin."], ["Bones give out X-rays, which the film detects.", "Bones do not emit X-rays."], ["X-rays are completely harmless, so any dose can be used.", "X-rays are ionising, so doses are kept low."]],
    answer: "A", explanation: "Bone absorbs X-rays much more than soft tissue does, so bones show up as shadows on the detector." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Why must exposure to X-rays and gamma rays be limited?",
    options: [["They can damage cells, causing mutations and cancer.", "Correct."], ["They mainly heat the body like microwaves.", "Their main danger is cell damage, not heating."], ["They only cause mild sunburn.", "They are far more dangerous."], ["They make the body permanently radioactive.", "Exposure to X-rays or gamma rays does not make the body radioactive."]],
    answer: "A", explanation: "X-rays and gamma rays are ionising: they damage DNA in cells, which can cause mutations and cancer.",
    hints: ["Think about what high-frequency radiation does to the atoms in cells."] });

  q.fib({ d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Going through the spectrum from radio waves to gamma rays, the frequency {{blank:a}} and the wavelength {{blank:b}}.",
    blanks: [
      { id: "a", input: "select", choices: ["increases", "decreases", "stays the same"], accepted: ["increases"], wrong: "decreases" },
      { id: "b", input: "select", choices: ["increases", "decreases", "stays the same"], accepted: ["decreases"], wrong: "increases" },
    ],
    explanation: t`Frequency increases from radio to gamma; because $v = f\lambda$ with $v$ the same, the wavelength decreases.` });

  q.mcq({ d: 1, skill: "RECALL",
    stem: "Which type of radiation does a television remote control use?",
    options: [["Infrared", "Correct."], ["Ultraviolet", "No."], ["X-rays", "No: X-rays are ionising."], ["Gamma rays", "No."]],
    answer: "A", explanation: "Remote controls send coded pulses of infrared to the receiver." });

  q.struct({ d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Radiation from the Sun includes infrared, visible light and ultraviolet.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which of these three has the highest frequency?", options: [["Ultraviolet", "Correct."], ["Visible light", "Lower than ultraviolet."], ["Infrared", "The lowest of the three."], ["They have the same frequency", "No."]], answer: "A",
        explanation: "Ultraviolet comes after visible light in order of increasing frequency." }),
      P.manual({ label: "(b)", marks: 1, stem: "State one use of ultraviolet radiation.",
        points: ["Any one: detecting security marks or forged banknotes; sterilising water; sun tanning"] }),
      P.num({ label: "(c)", marks: 2, stem: t`Light from the Sun takes 500 s to reach the Earth. Calculate the distance from the Sun to the Earth. (Speed of light $= 3.0 \times 10^{8}\ \text{m/s}$.)`, value: 1.5e11, answer: "1.5e11", tol: REL2, unit: "m", wrong: [6e5],
        explanation: t`$d = vt = 3.0 \times 10^{8} \times 500 = 1.5 \times 10^{11}\ \text{m}$.` }),
    ],
    explanation: "Ultraviolet has the highest frequency of the three; distance = speed × time.",
    hints: [t`distance = speed × time; write the answer in standard form.`] });

  q.card("FACT", "EM spectrum in order of increasing frequency?", "Radio, microwaves, infrared, visible, ultraviolet, X-rays, gamma rays.");
  q.card("FACT", "Speed of electromagnetic waves in a vacuum?", t`$3.0 \times 10^{8}\ \text{m/s}$ (about the same in air).`);
  q.card("CONCEPT", "Properties shared by all EM waves?", "Transverse; travel through a vacuum at the same speed; obey v = fλ; transfer energy.");
  q.card("FACT", "Uses of radio waves, microwaves and infrared?", "Radio: broadcasting. Microwaves: satellites, phones, ovens. Infrared: remote controls, heaters, thermal imaging.");
  q.card("FACT", "Uses of ultraviolet, X-rays and gamma rays?", "UV: security marks, sterilising water. X-rays: bone images, airport scanners. Gamma: sterilising, cancer treatment.");
  q.card("CONCEPT", "Harmful effects of EM radiation?", "Microwaves: internal heating. Infrared: burns. UV: skin and eye damage. X-rays and gamma: mutation and cancer.", undefined, { applies: C });
  q.card("CONCEPT", "Higher frequency EM radiation means…?", "Shorter wavelength, more energy, and generally more harmful.");
});

// =====================================================================================================================
concept("phys.waves.communication", {
  file: "waves/communication",
  keyPrefix: "waves.communication",
  objectives: { cambridge: ["3.3.5", "3.3.7", "3.3.8", "3.3.9", "3.3.10"] },
}, (q) => {
  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "Which type of electromagnetic wave is mainly used to communicate with artificial satellites?",
    options: [["Microwaves", "Correct: they pass through the atmosphere."], ["Gamma rays", "No."], ["Ultraviolet", "No."], ["X-rays", "No."]],
    answer: "A", explanation: "Communication with satellites is mainly by microwaves, which pass straight through the atmosphere." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "Why can a satellite TV dish on a house stay pointed in one fixed direction?",
    options: [["It is geostationary: it stays above the same point on the Earth.", "Correct."], ["The satellite does not move at all; it hangs still in space.", "It orbits, but in step with the Earth's rotation."], ["The Earth does not rotate under the satellite's orbit.", "The Earth rotates once a day."], ["The signal fills the whole sky equally, so any direction works.", "The dish must point at the satellite."]],
    answer: "A", explanation: "A geostationary satellite orbits above the equator once every 24 hours, so it stays above the same point and the dish can be fixed." });

  q.tf({ d: 2, skill: "RECALL", applies: C, daily: true,
    stem: "A geostationary satellite orbits the Earth above the equator once every 24 hours.",
    answer: true, explanation: "That is why it stays above the same point on the Earth's surface." });

  q.mcq({ d: 2, skill: "RECALL", applies: C,
    stem: "Which type of electromagnetic wave is used by Bluetooth?",
    options: [["Radio waves", "Correct: they pass through walls and are weakened, giving a short range."], ["Gamma rays", "No."], ["Ultraviolet", "No."], ["X-rays", "No."]],
    answer: "A", explanation: "Bluetooth uses low-power radio waves, which pass through walls but are weakened in doing so." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "Why are microwaves used for mobile phones and wireless internet?",
    options: [["They can pass through some walls and need only a short aerial.", "Correct."], ["They are completely absorbed by buildings, so they are safe.", "Then signals would not reach indoors."], ["They are ionising, so they carry more energy and data.", "Microwaves are not ionising."], ["They travel faster than other electromagnetic waves in air.", "All EM waves travel at the same speed."]],
    answer: "A", explanation: "Microwaves penetrate some walls and only need short aerials for transmitting and receiving." });

  q.mcq({ d: 2, skill: "UNDERSTANDING", applies: C,
    stem: "Why are optical fibres used for high-speed broadband?",
    options: [["Glass is transparent to light and infrared, which carry data very fast.", "Correct."], ["The glass fibres carry an electric current that holds the data.", "They carry light."], ["Light in glass travels faster than in a vacuum or in copper wire.", "Light is slower in glass."], ["The light leaks out along the way to reach nearby homes.", "Total internal reflection keeps it inside."]],
    answer: "A", explanation: "Visible light and short-wavelength infrared pass along glass with little loss and carry very high data rates." });

  q.mcq({ d: 1, skill: "RECALL", applies: C,
    stem: "What is a digital signal?",
    options: [["A signal with only a few values, usually two (1 and 0)", "Correct."], ["A signal that varies continuously, like a sound wave", "That is an analogue signal."], ["A signal that can only be sent by radio waves", "Digital signals can travel by fibre, cable or radio."], ["A signal that cannot carry sound, only text", "Sound is often sent digitally."]],
    answer: "A", explanation: "A digital signal takes only a few values, usually two: on and off, 1 and 0." });

  q.tf({ d: 2, skill: "RECALL", applies: C,
    stem: "Sound can be transmitted either as an analogue signal or as a digital signal.",
    answer: true, explanation: "A microphone gives an analogue signal; it can be sampled and converted to a digital signal for transmission." });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C,
    stem: "Why can a digital signal travel a long distance with very little loss of quality?",
    options: [["Regenerators read each pulse as 1 or 0 and send a clean copy.", "Correct."], ["Digital signals do not pick up any noise along the way.", "They do; the noise can be removed."], ["Digital signals travel faster than analogue signals.", "Speed is not the reason."], ["Digital signals do not get weaker as they travel.", "All signals weaken."]],
    answer: "A", explanation: "Each regenerator rebuilds a perfect digital signal, so noise does not build up as it does when analogue signals are amplified.",
    hints: ["What happens to noise when an analogue signal is amplified?"] });

  q.mcq({ d: 3, skill: "UNDERSTANDING", applies: C, multiple: true,
    stem: "Select **all** the benefits of digital signalling.",
    options: [["Data can be sent at a higher rate.", "Correct."], ["The signal can travel further, because it can be regenerated accurately.", "Correct."], ["Noise can be removed when the signal is regenerated.", "Correct."], ["No aerial is ever needed.", "Not a benefit of digital signals."], ["The signal never gets weaker.", "All signals weaken with distance."], ["The signal travels faster than light.", "Impossible."]],
    answer: ["A", "B", "C"], explanation: "Digital signals allow faster data transmission and a longer range, because regenerators remove the noise.",
    hints: ["Think about data rate and what regenerators can do."] });

  q.match({ d: 2, skill: "RECALL", applies: C,
    stem: "Match each use with the electromagnetic waves it uses.",
    pairs: [["Mobile phones", "Microwaves"], ["Bluetooth", "Radio waves"], ["Cable television through optical fibres", "Visible light or infrared"]],
    explanation: "Mobile phones: microwaves. Bluetooth: radio waves. Optical fibres: visible light or infrared." });

  q.struct({ d: 3, skill: "APPLICATION", applies: C, examStyle: true,
    stem: "A rural school connects to the internet by a satellite link and shares the connection by Wi-Fi.",
    parts: [
      P.short({ label: "(a)", stem: "Name the type of electromagnetic wave used to communicate with the satellite.", accepted: ["microwaves", "microwave"], wrong: ["radio waves"],
        explanation: "Satellite links use microwaves." }),
      P.manual({ label: "(b)", marks: 2, stem: "Data are sent as digital signals. Explain one advantage of digital over analogue signals.",
        points: ["Noise can be removed when the signal is regenerated (it is only recognised as 1 or 0)", "so the signal can travel further / data can be sent at a higher rate without loss of quality"] }),
      P.mcq({ label: "(c)", stem: "Some satellite phone networks use low-orbit satellites. What is an advantage of a low orbit compared with a geostationary orbit?", options: [["The signals travel a shorter distance, so there is less delay.", "Correct."], ["The satellite stays above the same point on the Earth.", "That is a geostationary satellite."], ["Fewer satellites are needed to cover the Earth.", "More are needed, because each moves across the sky."], ["The signals can be sent as sound.", "Sound cannot travel through space."]], answer: "A",
        explanation: "Low-orbit satellites are much closer, so the signal delay is shorter." }),
    ],
    explanation: "Satellites use microwaves; digital signals can be regenerated without noise; low orbits are closer, so delays are shorter.",
    hints: ["Which waves pass through the atmosphere?"] });

  q.card("FACT", "Which EM waves are used for satellite communication?", "Microwaves (they pass through the atmosphere).", undefined, { applies: C });
  q.card("DEFINITION", "What is a **geostationary** satellite?", "One that orbits above the equator once every 24 hours, so it stays above the same point on the Earth.", undefined, { applies: C });
  q.card("FACT", "Why microwaves for mobile phones and Wi-Fi?", "They penetrate some walls and need only short aerials.", undefined, { applies: C });
  q.card("FACT", "Why radio waves for Bluetooth?", "They pass through walls but are weakened, so the range is short.", undefined, { applies: C });
  q.card("FACT", "Why light or infrared in optical fibres?", "Glass is transparent to them, and they carry very high data rates.", undefined, { applies: C });
  q.card("DEFINITION", "**Analogue** vs **digital** signals?", "Analogue: varies continuously. Digital: only a few values, usually 1 and 0.", undefined, { applies: C });
  q.card("CONCEPT", "Benefits of digital signalling?", "Faster data transmission and longer range, because regenerators remove noise and rebuild the signal exactly.", undefined, { applies: C });
});
