// W4a: aphys.medical.x-rays-ct (Cambridge only, A Level) — X-ray production, λmin = hc/eV, imaging and contrast,
// contrast media, I = I₀e^(−μx), half-value thickness, CT.
import { concept, P, t, chk, DATA, sfStr, dpStr, sciTex, sciPlain, pctUnc, attenuate, table } from "../lib.mjs";

const { h, c, e } = DATA;

concept("aphys.medical.x-rays-ct", { file: "medical/x-rays-ct", keyPrefix: "medical.x-rays-ct" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How are X-rays produced in an X-ray tube?",
    options: [
      ["High-speed electrons strike a metal target and lose energy.", "Correct."],
      ["A small radioactive source sealed inside the tube emits gamma rays.", "X-ray tubes contain no radioactive material."],
      ["A heated filament emits X-rays directly.", "The filament emits electrons, not X-rays."],
      ["Ultrasound is converted into X-rays by a crystal.", "Piezoelectric crystals are used for ultrasound, not X-rays."],
    ],
    answer: "A",
    explanation: "Electrons from a hot cathode are accelerated through a large p.d. and decelerate in a tungsten target.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The accelerating p.d. of an X-ray tube is increased while the tube current is kept constant. What happens?",
    options: [
      ["The minimum wavelength decreases and the beam becomes more penetrating.", "Correct: higher maximum photon energy eV."],
      ["The minimum wavelength increases and the beam becomes less penetrating.", "Higher p.d. gives more energetic photons, so shorter λ_min."],
      ["Only the number of photons per second increases.", "That is the effect of increasing the current."],
      ["Nothing changes, because the current is constant.", "The p.d. sets the energy of each electron and so the maximum photon energy."],
    ],
    answer: "A",
    explanation: "λ_min = hc/(eV): a larger V gives a shorter λ_min and harder X-rays.",
  });
  {
    const V = 60e3;
    const lam = (h * c) / (e * V);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`What is the minimum wavelength of the X-rays from a tube operating at $60\ \text{kV}$?`,
      options: [
        [t`$${sciTex(lam)}\ \text{m}$`, "Correct: λ = hc/(eV)."],
        [t`$${sciTex((h * c) / V)}\ \text{m}$`, "The electron charge e has been left out."],
        [t`$${sciTex((h * c) / (e * 60))}\ \text{m}$`, "kV must be converted to V."],
        [t`$${sciTex(h / (e * V))}\ \text{m}$`, "The speed of light is missing: λ = hc/E."],
      ],
      answer: "A",
      explanation: t`$\lambda_{\text{min}} = \dfrac{hc}{eV} = \dfrac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{1.60 \times 10^{-19} \times 60 \times 10^{3}} = ${sciTex(lam)}\ \text{m}$.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is a barium sulfate meal given to a patient before an X-ray of the stomach?",
    options: [
      ["Barium absorbs X-rays strongly (high Z), outlining the stomach.", "Correct: increases contrast."],
      ["Barium emits its own X-rays, which make the stomach lining visible.", "Barium sulfate is not radioactive; it absorbs X-rays."],
      ["Barium reduces the X-ray dose received by the stomach wall.", "Its purpose is contrast, not dose reduction."],
      ["Barium makes the stomach wall transparent to the X-ray beam.", "It does the opposite: it absorbs strongly."],
    ],
    answer: "A",
    explanation: "Soft tissues have similar attenuation coefficients; a high-Z contrast medium makes the organ absorb strongly so it stands out.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement best describes how a CT scanner produces a three-dimensional image?",
    options: [
      ["Each slice is imaged from many angles and reconstructed; many slices are then stacked.", "Correct."],
      ["One X-ray image is taken from the front and one from the side, and the two are combined.", "Two views are far too few; CT uses many angles for each slice."],
      ["A single wide beam is used and each depth is found from the echo time.", "Echo timing is ultrasound, not CT."],
      ["The patient swallows a tracer that emits X-rays from inside each organ.", "That describes nuclear medicine, not CT."],
    ],
    answer: "A",
    explanation: "Many projections per slice → computer reconstruction of each slice → successive slices built into a 3D image.",
    hints: ["Think about slices and angles."],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is an aluminium filter placed in the beam from an X-ray tube?",
    options: [
      ["To remove low-energy X-rays that would only add to the skin dose.", "Correct: reduces the patient's dose."],
      ["To absorb the high-energy X-rays, which are the most harmful ones.", "High-energy photons are needed to reach the detector."],
      ["To convert the X-rays into visible light for the detector.", "That is done by a phosphor screen, not an aluminium filter."],
      ["To focus the X-ray beam onto the part of the patient being imaged.", "X-rays cannot be focused by an aluminium sheet."],
    ],
    answer: "A",
    explanation: "Soft (low-energy) X-rays would deliver dose to the skin but never reach the detector, so they are filtered out.",
    hints: ["Which photons would never reach the detector?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A material has a half-value thickness of 4.0 mm for an X-ray beam. What fraction of the intensity is transmitted by 12 mm of the material?",
    options: [
      ["1/8", "Correct: three half-value thicknesses, (1/2)³."],
      ["1/3", "The fall is exponential, not inversely proportional."],
      ["1/6", "Each half-value thickness halves; it does not subtract a fixed fraction."],
      ["1/4", "That is two half-value thicknesses (8 mm)."],
    ],
    answer: "A",
    explanation: "12/4.0 = 3 half-value thicknesses: (1/2)³ = 1/8.",
    hints: ["How many half-value thicknesses are there?"],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "About 1% of the energy of the electrons in an X-ray tube becomes X-rays. Which feature of the tube is a direct consequence of this?",
    options: [
      ["The anode is a high-melting-point metal, rotated and cooled.", "Correct: about 99% of the energy becomes heat in the target."],
      ["The tube is evacuated to a very low gas pressure.", "The vacuum prevents electrons being scattered by gas, unrelated to efficiency."],
      ["The filament is heated by its own separate low-voltage supply.", "This controls the number of electrons emitted."],
      ["The whole tube is surrounded by thick lead shielding.", "Shielding protects people from stray X-rays, not from heat."],
    ],
    answer: "A",
    explanation: "With 99% of the beam power deposited as heat, the target must survive very high temperatures: tungsten, rotating anode, oil cooling.",
    hints: ["Where does the other 99% of the energy go?"],
  });
  // Numerical
  {
    const lam = 2.0e-11;
    const V = (h * c) / (e * lam);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The shortest wavelength in the spectrum from an X-ray tube is $2.0 \times 10^{-11}\ \text{m}$. Calculate the accelerating p.d., in kV, to three significant figures.`,
      value: V / 1000, unit: "kV", wrong: [(h * c) / lam / 1000, V],
      explanation: t`1. $eV = hc/\lambda_{\text{min}}$.
2. $V = \dfrac{hc}{e\lambda_{\text{min}}} = \dfrac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{1.60 \times 10^{-19} \times 2.0 \times 10^{-11}} = ${sfStr(V, 3)}\ \text{V}$.
3. $V = ${sfStr(V / 1000, 3)}\ \text{kV}$.`,
      hints: ["The most energetic photon takes all of eV."],
    });
  }
  {
    const mu = 140, x = 0.012;
    const f = attenuate(1, mu, x);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: t`Compact bone has an attenuation coefficient of $140\ \text{m}^{-1}$ for a certain X-ray beam. Calculate the fraction of the intensity transmitted through $1.2\ \text{cm}$ of bone, to two significant figures.`,
      value: f, sf: 2, wrong: [attenuate(1, mu, 1.2), 1 - mu * x],
      explanation: t`$I/I_0 = e^{-140 \times 0.012} = e^{-1.68} = ${sfStr(f, 2)}$.`,
    });
  }
  {
    const hvt = 2.5e-3;
    const mu = Math.log(2) / hvt;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`The half-value thickness of a material for an X-ray beam is $2.5\ \text{mm}$. Calculate its linear attenuation coefficient, in $\text{m}^{-1}$, to three significant figures.`,
      value: mu, unit: "m⁻¹", wrong: [Math.log(2) / 2.5, 0.5 / hvt],
      explanation: t`$\mu = \dfrac{\ln 2}{x_{1/2}} = \dfrac{0.693}{2.5 \times 10^{-3}} = ${sfStr(mu, 3)}\ \text{m}^{-1}$.`,
      hints: ["x½ = ln 2/μ."],
    });
  }
  {
    const muT = 18, muB = 120, xT = 0.040, xB = 0.015;
    const throughT = attenuate(1, muT, xT + xB);
    const throughB = attenuate(1, muT, xT) * attenuate(1, muB, xB);
    const ratio = throughT / throughB;
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`An X-ray beam passes through an arm. Path P crosses $5.5\ \text{cm}$ of soft tissue ($\mu = 18\ \text{m}^{-1}$). Path Q crosses $4.0\ \text{cm}$ of soft tissue and $1.5\ \text{cm}$ of bone ($\mu = 120\ \text{m}^{-1}$). Calculate the ratio (intensity emerging along P) ÷ (intensity emerging along Q), to two significant figures.`,
      value: ratio, sf: 2, wrong: [Math.exp(muB * xB), attenuate(1, muT, xT + xB) / attenuate(1, muB, xB + xT)],
      explanation: t`1. P: $e^{-18 \times 0.055} = ${sfStr(throughT, 3)}$.
2. Q: $e^{-18 \times 0.040} \times e^{-120 \times 0.015} = ${sfStr(attenuate(1, muT, xT), 3)} \times ${sfStr(attenuate(1, muB, xB), 3)} = ${sfStr(throughB, 3)}$.
3. Ratio $= ${sfStr(ratio, 2)}$: equivalently $e^{(120 - 18) \times 0.015}$. This difference is the contrast that shows the bone.`,
      hints: ["Multiply the transmission factors along each path."],
    });
  }
  {
    const V = 90e3, I = 4.0e-3, eff = 0.008;
    const heat = V * I * (1 - eff);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`An X-ray tube operates at $90\ \text{kV}$ with a tube current of $4.0\ \text{mA}$. Only 0.80% of the electrons' energy becomes X-rays. Calculate the rate at which thermal energy is produced in the target, in W, to two significant figures.`,
      value: heat, sf: 2, unit: "W", wrong: [V * I * eff, V * 4.0],
      explanation: t`1. Power delivered by the beam: $P = VI = 90 \times 10^{3} \times 4.0 \times 10^{-3} = ${sfStr(V * I, 3)}\ \text{W}$.
2. Heat: $99.2\%$ of this $= ${sfStr(heat, 2)}\ \text{W}$, which is why the anode needs cooling.`,
      hints: ["Electrical power = VI."],
    });
  }
  {
    const I0 = 950, I1 = 470, dI = 15;
    const pct = pctUnc(dI, I0) + pctUnc(dI, I1);
    b.num({
      d: 4, skill: "EVALUATION", calculator: true,
      stem: t`To find the half-value thickness of aluminium, a student measures detector readings of $950 \pm 15$ with no absorber and $470 \pm 15$ with an absorber. Calculate the percentage uncertainty in the ratio $I/I_0$, to two significant figures.`,
      value: pct, sf: 2, unit: "%", wrong: [pctUnc(dI, I1)],
      explanation: t`For a quotient the percentage uncertainties add: $\dfrac{15}{950} \times 100 + \dfrac{15}{470} \times 100 = ${sfStr(pctUnc(dI, I0), 2)} + ${sfStr(pctUnc(dI, I1), 2)} = ${sfStr(pct, 2)}\%$.`,
      hints: ["Add the percentage uncertainties of I and I₀."],
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A CT scan gives a patient a larger radiation dose than a single X-ray image of the same region.",
    answer: true,
    explanation: "True. CT uses many exposures from different angles for many slices, so the dose is much larger; it is used when the extra information justifies it.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each feature of an X-ray tube with its purpose.",
    pairs: [
      ["heated filament", "releases electrons by thermionic emission"],
      ["large accelerating p.d.", "gives electrons high kinetic energy"],
      ["tungsten target", "high proton number and melting point"],
      ["rotating, oil-cooled anode", "removes the large amount of heat produced"],
    ],
    explanation: "Filament → electrons; p.d. → energy; tungsten → efficient X-ray production, survives heat; rotation/cooling → heat.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "Increasing the tube {{blank:a}} increases the number of X-ray photons per second. Increasing the accelerating {{blank:b}} decreases the minimum wavelength. Soft tissues are made visible by a contrast medium with a high {{blank:c}} number.",
    blanks: [
      { id: "a", accepted: ["current"], choices: ["current", "voltage", "temperature"] },
      { id: "b", accepted: ["potential difference"], choices: ["potential difference", "current", "resistance"] },
      { id: "c", accepted: ["proton"], choices: ["proton", "nucleon", "neutron"] },
    ],
    explanation: "Current → intensity; p.d. → λmin; contrast media: barium, iodine (high Z).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a CT scanner produces an image of a section through the body and how a three-dimensional image is obtained.",
    points: [
      "An X-ray tube and detectors rotate around the patient, so a thin slice is X-rayed from many different angles.",
      "Each detector reading gives the total attenuation along one path through the slice.",
      "A computer combines the readings to find the attenuation of each small volume (voxel) and displays the section as an image (pixel shade ∝ attenuation).",
      "The patient is moved along the axis and the process repeated for successive slices; the sections are combined into a 3D image.",
    ],
    modelAnswer: "An X-ray tube and an array of detectors rotate around the patient so that one thin slice is imaged from many directions; each reading is the total attenuation along one path. A computer uses all these readings to work out the attenuation of each small unit of the slice and displays it as an image of the section. The patient is then moved along the axis and further slices are imaged, and the computer combines the sections into a three-dimensional image.",
    explanation: "Many angles per slice; reconstruction; many slices.",
    hints: ["Separate the 2D step from the 3D step."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why bone shows clearly on an X-ray image while different soft tissues are hard to distinguish.",
    points: [
      "Bone has a much larger attenuation coefficient than soft tissue (higher density, contains calcium with higher proton number).",
      "So far fewer X-rays pass through bone, giving a sharp contrast in the image.",
      "Different soft tissues have similar attenuation coefficients, so they transmit similar intensities and give little contrast.",
    ],
    modelAnswer: "Bone is denser and contains calcium, so it has a much larger attenuation coefficient than soft tissue and transmits far fewer X-rays, producing strong contrast. Soft tissues all have similar attenuation coefficients and transmit similar intensities, so they are hard to tell apart without a contrast medium.",
    explanation: "Difference in μ gives contrast.",
    hints: ["Compare attenuation coefficients."],
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 2,
    stem: "State what is meant by half-value thickness and write down its relationship to the attenuation coefficient.",
    points: ["The thickness of material that reduces the intensity of the X-ray beam to half its value.", "x½ = ln 2/μ (= 0.693/μ)."],
    modelAnswer: "The half-value thickness is the thickness of a material that halves the intensity of the beam; x½ = ln 2/μ.",
    explanation: "Analogous to half-life.",
  });
  // Practice structured
  {
    const V = 70e3, I = 5.0e-3, eff = 0.0075;
    const lam = (h * c) / (e * V);
    const Pin = V * I;
    const PX = Pin * eff;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: t`A dental X-ray tube operates at $70\ \text{kV}$ with a tube current of $5.0\ \text{mA}$. About 0.75% of the electrons' energy is converted into X-rays.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the minimum wavelength of the X-rays, in m, to three significant figures.", value: lam, unit: "m", answer: sciPlain(lam), wrong: [(h * c) / V], explanation: t`$\lambda_{\text{min}} = hc/(eV) = ${sciTex(lam)}\ \text{m}$.` }),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the number of electrons striking the target per second, to two significant figures.", value: I / e, sf: 2, answer: sciPlain(I / e, 2), wrong: [I * e], explanation: t`$n = I/e = 5.0 \times 10^{-3}/1.60 \times 10^{-19} = ${sciTex(I / e, 2)}\ \text{s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the power emitted as X-rays, in W, to two significant figures.", value: PX, sf: 2, unit: "W", wrong: [Pin], explanation: t`$P = VI = ${sfStr(Pin, 3)}\ \text{W}$; X-rays: $0.75\% \times ${sfStr(Pin, 3)} = ${sfStr(PX, 2)}\ \text{W}$.` }),
        P.manual({ label: "(d)", marks: 3, stem: "State and explain the effect on the X-ray beam of (i) increasing the tube current and (ii) increasing the accelerating p.d.", points: ["(i) More electrons per second strike the target, so more X-ray photons per second: greater intensity, same photon energies (same λmin).", "(ii) Each electron has more kinetic energy, so the maximum photon energy rises.", "λmin decreases and the beam is more penetrating (harder); intensity also increases."], modelAnswer: "(i) A larger current means more electrons per second hit the target, so more X-ray photons are produced each second: the intensity rises, but the range of photon energies and λmin are unchanged. (ii) A larger p.d. gives each electron more kinetic energy, so the maximum photon energy increases, λmin decreases and the beam becomes more penetrating (the intensity also rises)." }),
      ],
      explanation: "λmin = hc/(eV); electrons per second = I/e; P = VI; current → intensity, p.d. → hardness.",
      hints: ["The most energetic photon takes all of an electron's kinetic energy."],
    });
  }
  {
    const xs = [0, 2, 4, 6, 8, 10]; // mm Al
    const mu = 105;
    const noise = [0, 6, -5, 4, -3, 2];
    const I0 = 820;
    const Is = xs.map((x, i) => Math.round(I0 * Math.exp((-mu * x) / 1000) + noise[i]));
    const hvt = (Math.log(2) / mu) * 1000;
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: t`A detector reading $R$ (proportional to X-ray intensity) is recorded with aluminium sheets of total thickness $x$ in the beam:

${table([t`$x\,/\,\text{mm}$`, t`$R$`], xs.map((x, i) => [x, Is[i]]))}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Use the readings to estimate the half-value thickness of aluminium for this beam, in mm, to two significant figures.", value: hvt, sf: 2, tol: 0.5, unit: "mm", wrong: [hvt * 2], explanation: t`$R$ falls to half of ${Is[0]} (≈ ${Math.round(Is[0] / 2)}) at about $x \approx ${sfStr(hvt, 2)}\ \text{mm}$ (interpolating between the readings).` }),
        P.num({ label: "(b)", marks: 2, stem: t`Hence calculate the attenuation coefficient of aluminium, in $\text{m}^{-1}$, to two significant figures.`, value: mu, sf: 2, tol: 8, unit: "m⁻¹", wrong: [mu / 1000], explanation: t`$\mu = \ln 2/x_{1/2} = 0.693/${sfStr(hvt / 1000, 2)}\ \text{m} \approx ${sfStr(mu, 2)}\ \text{m}^{-1}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Describe a graph that would give μ more reliably than reading off one half-value, and how μ is obtained from it.", points: [t`Plot $\ln R$ against $x$ (uses all the readings).`, t`Straight line with gradient $-\mu$ (with $x$ in m): $\mu = -$gradient.`], modelAnswer: t`Plot $\ln R$ against $x$: since $R = R_0e^{-\mu x}$, this is a straight line of gradient $-\mu$, and a best-fit line uses every reading.` }),
      ],
      explanation: "Half-value thickness by interpolation; μ = ln 2/x½; ln R against x gives −μ.",
      hints: ["Find where R is half its initial value."],
    });
    chk(Is.length, 6);
  }
  b.card("FORMULA", "Minimum X-ray wavelength", t`$\lambda_{\text{min}} = \dfrac{hc}{eV}$`);
  b.card("CONCEPT", "X-ray tube controls", "Tube current → number of photons (intensity); accelerating p.d. → maximum photon energy (penetration).");
  b.card("FACT", "Efficiency of an X-ray tube", "About 1% of the electrons' energy becomes X-rays; about 99% becomes heat in the target.");
  b.card("FORMULA", "Attenuation", t`$I = I_0e^{-\mu x}$`);
  b.card("DEFINITION", "**Half-value thickness**", "The thickness that halves the intensity of a beam: x½ = ln 2/μ.");
  b.card("CONCEPT", "Contrast media", "High-Z substances (barium meal, iodine injection) absorb X-rays strongly to outline soft organs.");
  b.card("CONCEPT", "CT scanning", "A slice is X-rayed from many angles; a computer reconstructs the section; many slices build a 3D image.");
  b.card("CONCEPT", "Aluminium filter", "Removes low-energy X-rays that would add dose to the skin without reaching the detector.");
  b.card("CONCEPT", "Why bone shows clearly", "Bone has a much larger attenuation coefficient than soft tissue; soft tissues are similar to each other.");
});
