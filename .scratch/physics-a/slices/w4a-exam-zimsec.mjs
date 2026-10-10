// W4a: ZIMSEC Paper 3 free-response items (format assumed, see BRIEF): Z1 charged particles (thermionic emission,
// e/m, Millikan); Z2 photoelectric effect and electron diffraction; Z3 binding energy, alpha decay and the decay law.
import { concept, P, t, chk, DATA, EXAM, checkExam, sfStr, dpStr, sciTex, sciPlain } from "../lib.mjs";

const A = (k) => `aphys.${k}`;
const { h, c, e, me, u, g, NA } = DATA;
const MeVu = 931.5;

concept(A("particles.electron-charge-mass"), { file: "exam/w4a-zimsec", keyPrefix: "exam.w4a-zimsec", applies: EXAM.ZIM_P3_FREE.applies }, (b) => {
  const plan = { examStyle: true, skill: EXAM.ZIM_P3_FREE.skill, secs: EXAM.ZIM_P3_FREE.secs, applies: EXAM.ZIM_P3_FREE.applies, paper: "ZIMSEC P3", calculator: true };

  // Z1: charged particles.
  {
    const V = 2200, B = 1.5e-3, r = 0.105;
    const em = (2 * V) / (B * B * r * r);
    const v = Math.sqrt(2 * em * V);
    const rad = 1.1e-6, rho = 890, d = 5.0e-3;
    const m = (4 / 3) * Math.PI * rad ** 3 * rho;
    const Vbal = (m * g * d) / (2 * e);
    const Vgiven = 760;
    const q = (m * g * d) / Vgiven;
    chk(Math.round(q / e), 2);
    b.struct({
      ...plan, d: 5,
      concepts: [A("particles.electron-charge-mass")],
      stem: t`Electrons emitted from a heated filament are accelerated through a p.d. of $2200\ \text{V}$ and enter a uniform magnetic field of flux density $1.5\ \text{mT}$ at right angles to their velocity. They move in a circle of radius $10.5\ \text{cm}$. In a separate experiment, an oil drop of radius $1.1 \times 10^{-6}\ \text{m}$ and density $890\ \text{kg m}^{-3}$ is held stationary between horizontal plates $5.0\ \text{mm}$ apart.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 5, stem: "Explain thermionic emission, describe how the electron beam is produced and controlled, and define the electronvolt.", points: [
          "Thermionic emission: emission of electrons from the surface of a heated metal …",
          "… because some free electrons gain enough (thermal) kinetic energy to escape the surface (exceed the work function).",
          "A positive anode at p.d. V accelerates the electrons; each gains kinetic energy eV; a hole in the anode forms a narrow beam; the tube is evacuated.",
          "Filament temperature controls the beam current (number per second); anode p.d. controls the speed.",
          "1 eV is the energy gained by an electron moving through a p.d. of 1 V (1.60 × 10⁻¹⁹ J).",
        ], modelAnswer: "Thermionic emission is the release of electrons from a heated metal surface: at high temperature some free electrons have enough kinetic energy to escape. In an electron gun the electrons from a hot filament are accelerated towards a positive anode; each gains kinetic energy eV, and those passing through a hole in the anode form a narrow beam in an evacuated tube. Raising the filament temperature increases the number of electrons per second, and raising the anode p.d. increases their speed. One electronvolt is the energy gained by an electron moving through a p.d. of one volt, 1.60 × 10⁻¹⁹ J." }),
        P.manual({ label: "(b)", marks: 5, stem: t`Derive an expression for the specific charge $e/m_e$ in terms of the accelerating p.d. $V$, the flux density $B$ and the radius $r$, explaining why the path is a circle.`, points: [
          "The magnetic force Bev is always perpendicular to the velocity …",
          "… so it does no work: the speed is constant and the force provides a centripetal force (uniform circular motion).",
          t`$Bev = m_ev^2/r$, so $v = Ber/m_e$.`,
          t`$eV = \tfrac{1}{2}m_ev^2$.`,
          t`Eliminating $v$: $e/m_e = 2V/(B^2r^2)$.`,
        ], modelAnswer: t`The magnetic force $Bev$ is perpendicular to the velocity, so it changes only the direction of motion; its magnitude is constant, so it acts as a centripetal force and the path is a circle. Then $Bev = m_ev^2/r$, giving $v = Ber/m_e$. From the accelerating p.d., $eV = \tfrac{1}{2}m_ev^2$. Substituting, $eV = \tfrac{1}{2}m_e(Ber/m_e)^2$, so $e/m_e = 2V/(B^2r^2)$.` }),
        P.group({ label: "(c)", stem: "For the electron beam:", parts: [
          P.num({ label: "(i)", marks: 3, stem: t`calculate $e/m_e$, in $\text{C kg}^{-1}$, to three significant figures`, value: em, answer: sciPlain(em), wrong: [V / (B * B * r * r), (2 * V) / (B * B * 0.21 * 0.21)], explanation: t`$\dfrac{e}{m_e} = \dfrac{2 \times 2200}{(1.5 \times 10^{-3})^2 \times (0.105)^2} = ${sciTex(em)}\ \text{C kg}^{-1}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`calculate the speed of the electrons, in $\text{m s}^{-1}$, to three significant figures`, value: v, unit: "m/s", answer: sciPlain(v), wrong: [Math.sqrt(em * V)], explanation: t`$v = \sqrt{2(e/m_e)V} = ${sciTex(v)}\ \text{m s}^{-1}$ (or $v = (e/m_e)Br$).` }),
        ] }),
        P.group({ label: "(d)", stem: "For the oil drop:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "calculate the weight of the drop, in N, to three significant figures", value: m * g, unit: "N", answer: sciPlain(m * g), wrong: [m], explanation: t`$m = \tfrac{4}{3}\pi(1.1 \times 10^{-6})^3 \times 890 = ${sciTex(m)}\ \text{kg}$; $W = mg = ${sciTex(m * g)}\ \text{N}$.` }),
          P.num({ label: "(ii)", marks: 3, stem: t`the drop is balanced when the p.d. is $760\ \text{V}$; calculate the charge on the drop, in C, to two significant figures, and state how many electronic charges this is`, value: q, sf: 2, unit: "C", answer: sciPlain(q, 2), wrong: [(m * d) / Vgiven, (m * g * Vgiven) / d], explanation: t`$\dfrac{qV}{d} = mg \Rightarrow q = \dfrac{mgd}{V} = \dfrac{${sciTex(m * g)} \times 5.0 \times 10^{-3}}{760} = ${sciTex(q, 2)}\ \text{C}$, which is $${dpStr(q / e, 2)}e \approx 2e$. The charge is a whole number of electronic charges, as Millikan found.` }),
        ] }),
      ]),
      explanation: "Thermionic emission and the electron gun; e/m = 2V/(B²r²); oil drop: qV/d = mg.",
      hints: ["Eliminate v between the energy and force equations.", "Weight = (4/3)πr³ρg."],
    });
  }

  // Z2: photoelectric effect and electron diffraction.
  {
    const lam1 = 250e-9, Vs1 = 1.84;
    const phi = (h * c) / lam1 / e - Vs1;
    const f0 = (phi * e) / h;
    const Vacc = 4500;
    const lamE = h / Math.sqrt(2 * me * e * Vacc);
    b.struct({
      ...plan, d: 5,
      concepts: [A("quantum.photoelectric"), A("quantum.wave-particle-duality"), A("quantum.photons")],
      stem: t`When ultraviolet light of wavelength $250\ \text{nm}$ falls on a clean metal surface, the stopping potential is $1.84\ \text{V}$. In a separate experiment, electrons accelerated from rest through $4.5\ \text{kV}$ pass through a thin graphite film and produce rings on a fluorescent screen.`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 5, stem: "Describe the photoelectric effect and explain how the photon model accounts for (i) the existence of a threshold frequency and (ii) the fact that the maximum kinetic energy of the photoelectrons does not depend on the intensity.", points: [
          "Photoelectric effect: emission of electrons from a metal surface when electromagnetic radiation of high enough frequency falls on it.",
          "Light consists of photons, each of energy hf; one photon is absorbed by one electron, giving it all its energy.",
          "(i) An electron needs at least the work function Φ to escape; if hf < Φ no electron escapes however many photons arrive, so f₀ = Φ/h.",
          "(ii) E_k max = hf − Φ depends only on the photon energy (frequency) …",
          "… greater intensity means more photons per second (more electrons per second, larger current) but the same energy per photon.",
        ], modelAnswer: "In the photoelectric effect, electrons are emitted from a metal surface when electromagnetic radiation above a certain frequency falls on it. Radiation consists of photons of energy hf, and each photon is absorbed by a single electron, transferring all its energy. (i) An electron needs at least the work function Φ to leave the surface, so if hf is less than Φ no electron can escape, whatever the intensity; the threshold frequency is f₀ = Φ/h. (ii) The most energetic electrons leave with hf − Φ, which depends only on the frequency; a more intense beam delivers more photons per second, releasing more electrons per second, but each photon has the same energy." }),
        P.manual({ label: "(b)", marks: 5, stem: "Explain how the electron diffraction experiment shows that electrons behave as waves, and why the rings become smaller when the accelerating p.d. is increased.", points: [
          "The rings are a diffraction pattern, which only waves produce.",
          "The spacing between carbon atoms in graphite is comparable with the electrons' de Broglie wavelength, so they are diffracted (random crystal orientations give rings).",
          "Increasing the p.d. increases the electrons' momentum (p = √(2meV)) …",
          "… so λ = h/p decreases and the diffraction angles (ring radii) decrease.",
          "A magnet near the tube moves the pattern, showing it is produced by charged particles (electrons), not by X-rays or light.",
        ], modelAnswer: "The concentric rings are a diffraction pattern, which is a wave effect: the electrons' de Broglie wavelength is comparable with the spacing of the carbon atoms, so the crystal lattice diffracts them, and randomly oriented crystals give rings. A larger accelerating p.d. gives the electrons more momentum, so their wavelength h/p is shorter, the diffraction angles are smaller and the rings shrink." }),
        P.group({ label: "(c)", stem: "For the metal surface:", parts: [
          P.num({ label: "(i)", marks: 3, stem: "calculate the work function, in eV, to three significant figures", value: phi, unit: "eV", wrong: [(h * c) / lam1 / e + Vs1, (h * c) / lam1 / e], explanation: t`$hc/\lambda = \dfrac{6.63 \times 10^{-34} \times 3.00 \times 10^{8}}{250 \times 10^{-9}} = ${sciTex((h * c) / lam1)}\ \text{J} = ${sfStr((h * c) / lam1 / e, 4)}\ \text{eV}$; $\Phi = ${sfStr((h * c) / lam1 / e, 4)} - 1.84 = ${sfStr(phi, 3)}\ \text{eV}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "calculate the threshold frequency, in Hz, to three significant figures", value: f0, unit: "Hz", answer: sciPlain(f0), wrong: [phi / h], explanation: t`$f_0 = \Phi/h = ${sciTex(phi * e)}/6.63 \times 10^{-34} = ${sciTex(f0)}\ \text{Hz}$.` }),
        ] }),
        P.group({ label: "(d)", stem: "For the electrons in the diffraction tube:", parts: [
          P.num({ label: "(i)", marks: 3, stem: "calculate their de Broglie wavelength, in m, to three significant figures", value: lamE, unit: "m", answer: sciPlain(lamE), wrong: [h / (2 * me * e * Vacc), h / Math.sqrt(me * e * Vacc)], explanation: t`$p = \sqrt{2m_eeV} = \sqrt{2 \times 9.11 \times 10^{-31} \times 1.60 \times 10^{-19} \times 4500} = ${sciTex(Math.sqrt(2 * me * e * Vacc))}\ \text{kg m s}^{-1}$; $\lambda = h/p = ${sciTex(lamE)}\ \text{m}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: t`calculate the accelerating p.d. that would give a wavelength of $1.3 \times 10^{-11}\ \text{m}$, in kV, to two significant figures`, value: ((h / 1.3e-11) ** 2 / (2 * me * e)) / 1000, sf: 2, unit: "kV", wrong: [((h / 1.3e-11) / (2 * me * e)) / 1000], explanation: t`$p = h/\lambda = ${sciTex(h / 1.3e-11)}\ \text{kg m s}^{-1}$; $V = \dfrac{p^2}{2m_ee} = ${sfStr((h / 1.3e-11) ** 2 / (2 * me * e), 3)}\ \text{V} = ${sfStr(((h / 1.3e-11) ** 2 / (2 * me * e)) / 1000, 2)}\ \text{kV}$.` }),
        ] }),
      ]),
      explanation: "hf = Φ + eV_s; f₀ = Φ/h; λ = h/√(2meV).",
      hints: ["Photon energy in eV minus the stopping potential gives Φ in eV.", "p = √(2meV)."],
    });
  }

  // Z3: binding energy, alpha decay and the decay law.
  {
    const mRa = 226.025410, mRn = 222.017578, mHe = 4.002603; // atomic masses (u)
    const dm = mRa - mRn - mHe;
    const Q = dm * MeVu;
    const Ka = (Q * 222) / 226;
    const th = 1600 * 3.16e7, mS = 2.0e-3, M = 0.226;
    const N = (mS / M) * NA, lam = 0.693 / th, Act = lam * N;
    const yrs = 600;
    const frac = Math.exp(-(0.693 / 1600) * yrs);
    b.struct({
      ...plan, d: 5,
      concepts: [A("nuclear.mass-defect-binding"), A("nuclear.radiations-decay-equations"), A("nuclear.decay-law")],
      stem: t`Radium-226 (${"$"}{}^{226}_{88}\text{Ra}$) decays by alpha emission to radon-222 with a half-life of 1600 years. Atomic masses: Ra-226 $226.025410\ \text{u}$, Rn-222 $222.017578\ \text{u}$, He-4 $4.002603\ \text{u}$. ($1\ \text{u} \equiv 931.5\ \text{MeV}$; 1 year $= 3.16 \times 10^{7}\ \text{s}$; molar mass of Ra-226 $= 0.226\ \text{kg mol}^{-1}$; $N_A = 6.02 \times 10^{23}\ \text{mol}^{-1}$.)`,
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.manual({ label: "(a)", marks: 5, stem: "Define binding energy, binding energy per nucleon, activity and decay constant, and state what is meant by half-life.", points: [
          "Binding energy: minimum energy needed to separate a nucleus completely into its individual nucleons.",
          "Binding energy per nucleon: binding energy divided by the nucleon number.",
          "Activity: number of nuclei decaying per unit time (becquerel = one decay per second).",
          "Decay constant: probability of a nucleus decaying per unit time.",
          "Half-life: mean time for half the undecayed nuclei of a nuclide to decay.",
        ], modelAnswer: "Binding energy is the minimum energy needed to separate a nucleus into its individual protons and neutrons; the binding energy per nucleon is this divided by the nucleon number. Activity is the number of nuclei that decay per unit time, measured in becquerels. The decay constant is the probability that a nucleus decays per unit time. The half-life is the mean time taken for half the undecayed nuclei of a nuclide to decay." }),
        P.manual({ label: "(b)", marks: 5, stem: t`Starting from the idea that each nucleus has a constant probability $\lambda$ of decaying per unit time, explain why the number of undecayed nuclei falls exponentially, and show that $t_{1/2} = \dfrac{0.693}{\lambda}$.`, points: [
          t`In time $\Delta t$ the expected number of decays is $\lambda N\Delta t$, so the rate of decay is proportional to the number of undecayed nuclei: $\Delta N/\Delta t = -\lambda N$ (activity $A = \lambda N$).`,
          "A rate of decrease proportional to the amount present gives exponential decay: N = N₀e^(−λt) (equal fractions decay in equal times).",
          t`At $t = t_{1/2}$, $N = N_0/2$: $\tfrac{1}{2} = e^{-\lambda t_{1/2}}$.`,
          t`Taking ln: $\lambda t_{1/2} = \ln 2$.`,
          t`$t_{1/2} = \ln 2/\lambda = 0.693/\lambda$.`,
        ], modelAnswer: t`If each nucleus decays with probability $\lambda$ per unit time, then in a short time $\Delta t$ about $\lambda N\Delta t$ of the $N$ nuclei decay, so $\Delta N/\Delta t = -\lambda N$: the rate of decrease is proportional to the number left, the condition for exponential decay, $N = N_0e^{-\lambda t}$. After one half-life $N = N_0/2$, so $e^{-\lambda t_{1/2}} = \tfrac{1}{2}$, giving $\lambda t_{1/2} = \ln 2$ and $t_{1/2} = 0.693/\lambda$.` }),
        P.group({ label: "(c)", stem: "For the alpha decay of one radium-226 nucleus:", parts: [
          P.num({ label: "(i)", marks: 3, stem: "calculate the energy released, in MeV, to three significant figures", value: Q, unit: "MeV", wrong: [(mRa - mRn) * MeVu], explanation: t`$\Delta m = 226.025410 - (222.017578 + 4.002603) = ${dpStr(dm, 6)}\ \text{u}$ (electrons balance); $Q = ${dpStr(dm, 6)} \times 931.5 = ${sfStr(Q, 3)}\ \text{MeV}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "the alpha particle receives 222/226 of this energy; calculate its kinetic energy, in MeV, to four significant figures", value: Ka, sf: 4, unit: "MeV", wrong: [(Q * 4) / 226], explanation: t`$E_\alpha = ${sfStr(Q, 3)} \times 222/226 = ${sfStr(Ka, 4)}\ \text{MeV}$ (momentum conservation gives the lighter particle the larger share).` }),
        ] }),
        P.group({ label: "(d)", stem: "For a sample of 2.0 g of radium-226:", parts: [
          P.num({ label: "(i)", marks: 3, stem: "calculate its activity, in Bq, to two significant figures", value: Act, sf: 2, unit: "Bq", answer: sciPlain(Act, 2), wrong: [(0.693 / 1600) * N, lam * ((2.0 / M) * NA)], explanation: t`$N = \dfrac{2.0 \times 10^{-3}}{0.226} \times 6.02 \times 10^{23} = ${sciTex(N)}$; $\lambda = \dfrac{0.693}{1600 \times 3.16 \times 10^{7}} = ${sciTex(lam)}\ \text{s}^{-1}$; $A = \lambda N = ${sciTex(Act, 2)}\ \text{Bq}$.` }),
          P.num({ label: "(ii)", marks: 2, stem: "calculate the fraction of the radium remaining after 600 years, to two significant figures", value: frac, sf: 2, wrong: [1 - 600 / 3200], explanation: t`$N/N_0 = e^{-(0.693/1600) \times 600} = ${sfStr(frac, 2)}$.` }),
        ] }),
      ]),
      explanation: "Q from the mass change × 931.5 MeV; A = λN with N from moles; N/N₀ = e^(−λt).",
      hints: ["Check that electrons balance before using atomic masses.", "Convert the half-life to seconds for λ in s⁻¹."],
    });
  }
});
