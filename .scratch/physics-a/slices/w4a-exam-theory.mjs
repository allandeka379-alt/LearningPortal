// W4a: THEORY10 exam-format items. T1 (AS, both boards): nuclear atom and decay equations. T2-T5 (A Level, both
// boards): photoelectric effect; energy levels and photons; mass defect and fission; radioactive decay law.
// T6 (A Level, Cambridge only): ultrasound.
import { concept, P, t, chk, DATA, CAM, EXAM, checkExam, sfStr, dpStr, sciTex, sciPlain, reflectionCoeff, attenuate } from "../lib.mjs";

const A = (k) => `aphys.${k}`;
const { h, c, e, me, u, NA } = DATA;
const MeVu = 931.5;

concept(A("nuclear.radiations-decay-equations"), { file: "exam/w4a-theory", keyPrefix: "exam.w4a-theory" }, (b) => {
  const plan = { examStyle: true, skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, calculator: true };

  // T1 (AS): the nuclear atom, radiations and decay equations.
  {
    const Ek = 5.5e6 * e, m = 6.64e-27;
    const v = Math.sqrt((2 * Ek) / m);
    b.struct({
      ...plan, d: 3, paper: "ZIMSEC P2 / Cambridge P2",
      concepts: [A("nuclear.radiations-decay-equations"), A("nuclear.atom-nucleus")],
      stem: t`Americium-241, ${"$"}{}^{241}_{95}\text{Am}$, used in smoke detectors, decays by alpha emission to neptunium (Np). The alpha particles have a kinetic energy of $5.5\ \text{MeV}$ and a mass of $6.64 \times 10^{-27}\ \text{kg}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.group({ label: "(a)", stem: "For a nucleus of americium-241, state:", parts: [
          P.num({ label: "(i)", marks: 1, stem: "the number of protons", value: 95, wrong: [241], explanation: "Z = 95." }),
          P.num({ label: "(ii)", marks: 1, stem: "the number of neutrons", value: 146, wrong: [95], explanation: "241 − 95 = 146." }),
        ] }),
        P.group({ label: "(b)", stem: t`For the neptunium nuclide formed, ${"$"}{}^{A}_{Z}\text{Np}$, state:`, parts: [
          P.num({ label: "(i)", marks: 1, stem: "its nucleon number A", value: 237, wrong: [241], explanation: "241 − 4 = 237." }),
          P.num({ label: "(ii)", marks: 1, stem: "its proton number Z", value: 93, wrong: [97], explanation: "95 − 2 = 93." }),
        ] }),
        P.num({ label: "(c)", marks: 2, stem: t`Calculate the speed of the alpha particles, in $\text{m s}^{-1}$, to two significant figures.`, value: v, sf: 2, unit: "m/s", answer: sciPlain(v, 2), wrong: [Math.sqrt(Ek / m)], explanation: t`$E_k = 5.5 \times 10^{6} \times 1.60 \times 10^{-19} = ${sciTex(Ek)}\ \text{J}$; $v = \sqrt{2E_k/m} = ${sciTex(v, 2)}\ \text{m s}^{-1}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "The smoke detector contains a small ionisation chamber. Explain why an alpha source is suitable, and why it presents little hazard to people in the room.", points: ["Alpha particles are strongly ionising, so they produce many ions in the air of the chamber, giving a measurable current (reduced when smoke enters).", "Alpha has a range of only a few cm in air and is stopped by the detector casing (or skin), so it does not reach people outside the device."], modelAnswer: "Alpha particles ionise air very strongly, so even a weak source produces enough ions to carry a measurable current across the chamber; smoke particles absorb the ions and reduce the current. The alpha particles travel only a few centimetres in air and are stopped by the plastic casing, so none reach people in the room (the source is only dangerous if swallowed or inhaled)." }),
        P.manual({ label: "(e)", marks: 2, stem: "State two differences between the alpha particles and the beta-minus particles emitted by other sources, other than their charge.", points: ["Alpha: about 7000 times more massive (helium nucleus, about 4 u) than beta (electron).", "Alpha: discrete energies from one nuclide / much more ionising / much shorter range (paper vs a few mm aluminium) / much slower; beta has a continuous energy spectrum."], modelAnswer: "An alpha particle is a helium nucleus, about 7000 times the mass of a beta particle (an electron). Alpha particles from one nuclide have discrete energies and are far more ionising and less penetrating (stopped by paper), whereas beta particles have a continuous range of energies and need a few millimetres of aluminium to stop them." }),
      ]),
      explanation: "Alpha decay: A − 4, Z − 2; E_k in J then v = √(2E_k/m); strongly ionising, short range.",
      hints: ["Neutrons = A − Z.", "Convert MeV to J."],
    });
  }

  // T2 (A): photoelectric effect.
  {
    const phi = 2.26, lam = 380e-9, Pw = 1.2e-3;
    const E = (h * c) / lam;
    const Ek = E - phi * e;
    const Vs = Ek / e;
    const N = Pw / E;
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
      concepts: [A("quantum.photoelectric"), A("quantum.photons")],
      stem: t`Ultraviolet light of wavelength $380\ \text{nm}$ falls on a potassium surface in a vacuum photocell. The work function of potassium is $2.26\ \text{eV}$. The power of the light reaching the surface is $1.2\ \text{mW}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 1, stem: "Define the work function of a metal.", points: ["The minimum energy needed to remove an electron from the surface of the metal."], modelAnswer: "The work function is the minimum energy needed to remove an electron from the surface of the metal." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the energy of one photon of the light, in J, to three significant figures.", value: E, unit: "J", answer: sciPlain(E), wrong: [(h * c) / 380], explanation: t`$E = hc/\lambda = \dfrac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{380 \times 10^{-9}} = ${sciTex(E)}\ \text{J}$ (${sfStr(E / e, 3)} eV).` }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the stopping potential, in V, to two significant figures.", value: Vs, sf: 2, unit: "V", wrong: [E / e], explanation: t`$E_{k\,\text{max}} = ${sfStr(E / e, 3)} - 2.26 = ${sfStr(Vs, 2)}\ \text{eV}$, so $V_s = ${sfStr(Vs, 2)}\ \text{V}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the number of photons arriving at the surface per second, to two significant figures.", value: N, sf: 2, answer: sciPlain(N, 2), wrong: [Pw / (phi * e)], explanation: t`$N = P/E = 1.2 \times 10^{-3}/${sciTex(E)} = ${sciTex(N, 2)}\ \text{s}^{-1}$.` }),
        P.manual({ label: "(e)", marks: 3, stem: "The intensity of the light is doubled. State and explain the effect on (i) the stopping potential and (ii) the photoelectric current.", points: ["(i) Stopping potential unchanged …", "… because each photon still has the same energy hf, and one photon gives its energy to one electron, so E_k max = hf − Φ is unchanged.", "(ii) The current doubles because twice as many photons per second release twice as many electrons per second."], modelAnswer: "(i) The stopping potential is unchanged: each photon still has energy hf and gives it all to one electron, so the maximum kinetic energy hf − Φ is the same. (ii) The current doubles, because twice as many photons arrive per second and so about twice as many electrons are released per second." }),
      ]),
      explanation: "E = hc/λ; eV_s = hf − Φ; N = P/E; intensity changes the number of photons, not their energy.",
      hints: ["Convert the work function to J or the photon energy to eV.", "Photons per second = power ÷ energy per photon."],
    });
  }

  // T3 (A): energy levels and line spectra (hydrogen data).
  {
    const L = { 1: -13.6, 2: -3.40, 3: -1.51, 4: -0.85 };
    const dE42 = L[3] - L[2];
    const lam42 = (h * c) / (dE42 * e);
    const lamIon = (h * c) / (13.6 * e);
    b.struct({
      ...plan, d: 3, paper: "ZIMSEC P2 / Cambridge P4",
      concepts: [A("quantum.energy-levels-spectra"), A("quantum.photons")],
      stem: t`Four energy levels of the hydrogen atom are $-13.6\ \text{eV}$ ($n = 1$), $-3.40\ \text{eV}$ ($n = 2$), $-1.51\ \text{eV}$ ($n = 3$) and $-0.85\ \text{eV}$ ($n = 4$). Hydrogen gas in a discharge tube emits a line spectrum.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why the energies of the levels are negative.", points: ["The zero of energy is defined as an electron completely removed from the atom (at infinity / ionised).", "A bound electron has less energy than this, since energy must be supplied to free it."], modelAnswer: "Zero energy is taken as the electron completely removed from the atom. A bound electron needs energy to be supplied to free it, so it has less than zero energy." }),
        P.num({ label: "(b)", marks: 1, stem: "State the number of different spectral lines that atoms excited to n = 4 can emit.", value: 6, wrong: [3], explanation: "4 × 3/2 = 6." }),
        P.num({ label: "(c)", marks: 3, stem: "Calculate the wavelength of the line emitted in the transition from n = 3 to n = 2, in nm, to three significant figures.", value: lam42 * 1e9, unit: "nm", wrong: [((h * c) / (1.51 * e)) * 1e9], explanation: t`$\Delta E = -1.51 - (-3.40) = ${dpStr(dE42, 2)}\ \text{eV} = ${sciTex(dE42 * e)}\ \text{J}$; $\lambda = hc/\Delta E = ${sfStr(lam42 * 1e9, 3)}\ \text{nm}$ (red).` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the longest wavelength of radiation that can ionise a hydrogen atom in its ground state, in nm, to three significant figures.", value: lamIon * 1e9, unit: "nm", wrong: [((h * c) / (10.2 * e)) * 1e9], explanation: t`$E = 13.6\ \text{eV} = ${sciTex(13.6 * e)}\ \text{J}$; $\lambda = hc/E = ${sfStr(lamIon * 1e9, 3)}\ \text{nm}$.` }),
        P.manual({ label: "(e)", marks: 2, stem: "White light is passed through cool hydrogen gas. Explain why the spectrum of the emerging light contains a dark line at the wavelength found in (c).", points: ["Atoms with electrons in n = 2 absorb photons whose energy (1.89 eV) exactly matches the gap to n = 3.", "The absorbed energy is re-emitted in all directions, so less light of that wavelength continues forward: a dark line."], modelAnswer: "Hydrogen atoms whose electrons are in the n = 2 level absorb photons of exactly 1.89 eV, raising them to n = 3. They re-emit the energy in random directions, so the forward beam is depleted at that wavelength and a dark line appears." }),
      ]),
      explanation: "Photon energy = difference between levels; λ = hc/ΔE; n(n − 1)/2 lines; absorption lines at the same wavelengths.",
      hints: ["Convert the energy difference to joules."],
    });
  }

  // T4 (A): mass defect, binding energy and fission.
  {
    const mU = 235.04393, mn = 1.008665, mSr = 89.907738, mXe = 143.938510; // atomic masses (u)
    const before = mU + mn, after = mSr + mXe + 2 * mn;
    const dm = before - after;
    const Q = dm * MeVu;
    const QJ = dm * u * c ** 2;
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
      concepts: [A("nuclear.fission-fusion"), A("nuclear.mass-defect-binding")],
      stem: t`In a nuclear reactor, one possible fission of uranium-235 is
$$
{}^{1}_{0}\text{n} + {}^{235}_{92}\text{U} \rightarrow {}^{90}_{38}\text{Sr} + {}^{144}_{54}\text{Xe} + x\,{}^{1}_{0}\text{n}
$$
Masses: neutron $1.008665\ \text{u}$, U-235 $235.043930\ \text{u}$, Sr-90 $89.907738\ \text{u}$, Xe-144 $143.938510\ \text{u}$. ($1\ \text{u} \equiv 931.5\ \text{MeV}$, $1\ \text{u} = 1.66 \times 10^{-27}\ \text{kg}$.)`,
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 1, stem: "Determine x.", value: 2, wrong: [3], explanation: "1 + 235 = 90 + 144 + x, so x = 2." }),
        P.manual({ label: "(b)", marks: 2, stem: "Define binding energy and explain, in terms of binding energy per nucleon, why this fission releases energy.", points: ["Binding energy: minimum energy needed to separate a nucleus into its individual nucleons.", "The fission products have a higher binding energy per nucleon than U-235 (they are nearer the peak at A ≈ 56), so total binding energy increases and the mass decreases; the difference is released."], modelAnswer: "Binding energy is the minimum energy needed to separate a nucleus completely into its protons and neutrons. Strontium-90 and xenon-144 lie closer to the peak of the binding-energy-per-nucleon curve than uranium-235, so the total binding energy increases, the total mass decreases, and the mass difference is released as energy." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the energy released in one fission, in MeV, to three significant figures.", value: Q, unit: "MeV", wrong: [(mU - mSr - mXe) * MeVu], explanation: t`Before: $${dpStr(before, 6)}\ \text{u}$; after: $89.907738 + 143.938510 + 2(1.008665) = ${dpStr(after, 6)}\ \text{u}$; $\Delta m = ${dpStr(dm, 6)}\ \text{u}$; $Q = ${sfStr(Q, 3)}\ \text{MeV}$.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the energy released in one fission, in J, to three significant figures.", value: QJ, unit: "J", answer: sciPlain(QJ), wrong: [dm * c ** 2], explanation: t`$\Delta m = ${dpStr(dm, 6)} \times 1.66 \times 10^{-27} = ${sciTex(dm * u)}\ \text{kg}$; $E = \Delta m\,c^2 = ${sciTex(QJ)}\ \text{J}$.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Explain the functions of the moderator and the control rods in the reactor, and why the reaction must be kept so that, on average, one neutron from each fission causes another fission.", points: ["Moderator: slows the fast fission neutrons (by collisions with light nuclei) so that they are more likely to cause fission of U-235.", "Control rods: absorb neutrons, so moving them in or out controls the rate of fission.", "If more than one neutron per fission caused further fissions, the rate (power) would grow rapidly out of control; if fewer, the chain reaction would die away."], modelAnswer: "The moderator slows the fast neutrons by repeated collisions with light nuclei, because slow neutrons are much more likely to cause uranium-235 to split. The control rods absorb neutrons, so lowering or raising them reduces or increases the fission rate. A steady chain reaction needs exactly one neutron per fission to cause another: more would make the power rise rapidly out of control, fewer would make the reaction die out." }),
      ]),
      explanation: "Balance nucleon numbers; Δm × 931.5 MeV or Δm c²; products nearer the peak of the binding-energy curve.",
      hints: ["Include the incoming neutron when balancing.", "Use all the decimal places of the masses."],
    });
  }

  // T5 (A): radioactive decay law.
  {
    const th = 8.02 * 86400, mI = 0.131;
    const lam = 0.693 / th;
    const A0 = 4.0e9;
    const N0 = A0 / lam;
    const mass = (N0 / NA) * mI;
    const tt = 14 * 86400;
    const A14 = A0 * Math.exp(-lam * tt);
    b.struct({
      ...plan, d: 4, paper: "ZIMSEC P2 / Cambridge P4",
      concepts: [A("nuclear.decay-law")],
      stem: t`Iodine-131, used to treat thyroid disease, has a half-life of 8.02 days and a molar mass of $0.131\ \text{kg mol}^{-1}$. A hospital prepares a dose with an activity of $4.0 \times 10^{9}\ \text{Bq}$. ($N_A = 6.02 \times 10^{23}\ \text{mol}^{-1}$.)`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain what is meant by the statement that radioactive decay is random and spontaneous.", points: ["Random: it cannot be predicted when a particular nucleus will decay (each has a constant probability of decay per unit time).", "Spontaneous: the decay is not affected by external factors such as temperature, pressure or chemical state."], modelAnswer: "Random means the moment at which any particular nucleus decays cannot be predicted; each nucleus has a constant probability of decaying per unit time. Spontaneous means the decay is not affected by external conditions such as temperature or chemical combination." }),
        P.num({ label: "(b)", marks: 2, stem: t`Calculate the decay constant of iodine-131, in $\text{s}^{-1}$, to three significant figures.`, value: lam, unit: "s⁻¹", answer: sciPlain(lam), wrong: [0.693 / 8.02], explanation: t`$\lambda = \dfrac{0.693}{8.02 \times 86400} = ${sciTex(lam)}\ \text{s}^{-1}$.` }),
        P.num({ label: "(c)", marks: 3, stem: "Calculate the mass of iodine-131 in the dose, in kg, to two significant figures.", value: mass, sf: 2, unit: "kg", answer: sciPlain(mass, 2), wrong: [N0 / NA, (A0 * th * mI) / NA], explanation: t`$N = A/\lambda = 4.0 \times 10^{9}/${sciTex(lam)} = ${sciTex(N0)}$; moles $= N/N_A = ${sciTex(N0 / NA)}$; mass $= \times 0.131 = ${sciTex(mass, 2)}\ \text{kg}$ (under a microgram).` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the activity of the dose 14 days after it was prepared, in Bq, to two significant figures.", value: A14, sf: 2, unit: "Bq", answer: sciPlain(A14, 2), wrong: [A0 * (1 - 14 / (2 * 8.02))], explanation: t`$A = A_0e^{-\lambda t} = 4.0 \times 10^{9} \times e^{-${sciTex(lam)} \times 14 \times 86400} = ${sciTex(A14, 2)}\ \text{Bq}$.` }),
        P.manual({ label: "(e)", marks: 1, stem: "Suggest why a half-life of about 8 days is suitable for this treatment.", points: ["Long enough for the iodine to be absorbed by the thyroid and deliver the treatment dose, short enough that the activity in the body falls to a low level within weeks."], modelAnswer: "Eight days gives time for the thyroid to absorb the iodine and receive its dose, but the activity becomes small within a few weeks, limiting the dose to the rest of the body and to other people." }),
      ]),
      explanation: "λ = 0.693/t½ (in s); N = A/λ; mass from moles; A = A₀e^(−λt).",
      hints: ["Convert days to seconds for λ in s⁻¹."],
    });
  }

  // T6 (A, Cambridge only): ultrasound.
  {
    const Zs = 1.63e6, Zg = 1.58e6, Za = 430;
    const Rgel = reflectionCoeff(Zg, Zs), Rair = reflectionCoeff(Za, Zs);
    const tEcho = 78e-6, cT = 1540;
    const d = (cT * tEcho) / 2;
    const mu = 60;
    const fr = attenuate(1, mu, 2 * d);
    b.struct({
      ...plan, d: 4, paper: "Cambridge P4", applies: CAM,
      concepts: [A("medical.ultrasound")],
      stem: t`An ultrasound transducer is placed on a patient's abdomen with a coupling gel. Acoustic impedances (in $\text{kg m}^{-2}\ \text{s}^{-1}$): air $430$, gel $1.58 \times 10^{6}$, soft tissue $1.63 \times 10^{6}$. The speed of ultrasound in soft tissue is $1540\ \text{m s}^{-1}$.`,
      parts: checkExam(EXAM.THEORY10, [
        P.manual({ label: "(a)", marks: 2, stem: "Explain how the piezoelectric transducer generates ultrasound and how it detects the echoes.", points: ["Generation: an alternating p.d. (at the crystal's resonant frequency) applied across the crystal makes it change shape / vibrate, producing ultrasound.", "Detection: a returning ultrasound wave makes the crystal vibrate (stresses it), producing an alternating p.d. across it that is amplified."], modelAnswer: "An alternating p.d. at the crystal's resonant frequency makes the piezoelectric crystal expand and contract, so it vibrates and emits ultrasound. Returning echoes stress the crystal, which then generates a small alternating p.d. that is amplified and processed." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the intensity reflection coefficient at the gel-tissue boundary, to two significant figures.", value: Rgel, sf: 2, answer: sciPlain(Rgel, 2), wrong: [(Zs - Zg) / (Zs + Zg)], explanation: t`$\dfrac{(1.63 - 1.58)^2}{(1.63 + 1.58)^2} = \dfrac{0.0025}{10.30} = ${sciTex(Rgel, 2)}$.` }),
        P.num({ label: "(c)", marks: 1, stem: "Calculate the intensity reflection coefficient at an air-tissue boundary, to three significant figures.", value: Rair, wrong: [Rgel], explanation: t`$\dfrac{(1.63 \times 10^{6} - 430)^2}{(1.63 \times 10^{6} + 430)^2} = ${sfStr(Rair, 3)}$: almost total reflection, which is why the gel is used.` }),
        P.num({ label: "(d)", marks: 2, stem: t`An echo from a boundary arrives $78\ \mu\text{s}$ after the pulse is sent. Calculate the depth of the boundary, in cm, to two significant figures.`, value: d * 100, sf: 2, unit: "cm", wrong: [cT * tEcho * 100], explanation: t`$d = ct/2 = 1540 \times 78 \times 10^{-6}/2 = ${sfStr(d, 2)}\ \text{m} = ${sfStr(d * 100, 2)}\ \text{cm}$.` }),
        P.num({ label: "(e)", marks: 3, stem: t`The attenuation coefficient of soft tissue is $60\ \text{m}^{-1}$. Calculate the fraction of the intensity entering the tissue that would return to the transducer from this boundary if the boundary reflected 1.0% of the intensity, to two significant figures.`, value: 0.010 * fr, sf: 2, answer: sciPlain(0.010 * fr, 2), wrong: [0.010 * attenuate(1, mu, d)], explanation: t`Path length $= 2d = ${sfStr(2 * d, 2)}\ \text{m}$; $e^{-60 \times ${sfStr(2 * d, 3)}} = ${sfStr(fr, 3)}$; returning fraction $= 0.010 \times ${sfStr(fr, 3)} = ${sciTex(0.010 * fr, 2)}$.` }),
      ]),
      explanation: "Piezoelectric generation and detection; (Z₁ − Z₂)²/(Z₁ + Z₂)²; d = ct/2; attenuation over 2d.",
      hints: ["The echo travels to the boundary and back."],
    });
  }
});
