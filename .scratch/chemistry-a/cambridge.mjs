// Cambridge International AS & A Level Chemistry 9701, 2025-2027. Imported by build-syllabi.mjs. Topics 1-37 and
// sub-topics (1.1 ...) are numbered as printed; objective codes are the printed learning-outcome references (topic,
// sub-topic, outcome number, e.g. 26.1.4, as the syllabus itself cross-refers, e.g. "see 23.2.2"). The three sections
// (AS, A, PS) and the practical-skills nodes (P3, P5) are ours. Objectives paraphrase the learning outcomes.
import { section, topic, sub, o } from "./nodes.mjs";

const AS = ["1", "2"];
const AL = ["4"];
const ASL = "AS Level";
const ALO = "A Level only";

const AS_CONTENT = section("as-content", "AS", "AS Level subject content", {
  description: "Topics 1-22: studied by all candidates; examined in Papers 1 and 2 and assumed knowledge for Paper 4.",
  children: [
    topic("atomic-structure", "1", "Atomic structure", {
      components: AS,
      children: [
        sub("atomic-structure.particles", "1.1", "Particles in the atom and atomic radius", {
          stage: ASL,
          covers: ["achem.atoms.particles-isotopes"],
          objectives: [
            o("1.1.1", "Describe the atom as mostly empty space around a small dense nucleus of protons and neutrons, with electrons in shells."),
            o("1.1.2", "Give the relative charges and relative masses of protons, neutrons and electrons."),
            o("1.1.3", "Use the terms atomic (proton) number and mass (nucleon) number."),
            o("1.1.4", "Describe how mass and charge are distributed in an atom."),
            o("1.1.5", "Describe how beams of protons, neutrons and electrons at the same velocity behave in an electric field."),
            o("1.1.6", "Find the numbers of protons, neutrons and electrons in atoms and ions."),
            o("1.1.7", "State and explain qualitatively the trends in atomic and ionic radius across a period and down a group."),
          ],
        }),
        sub("atomic-structure.isotopes", "1.2", "Isotopes", {
          stage: ASL,
          description: "Taught in the lesson covered by 1.1.",
          objectives: [
            o("1.2.1", "Define isotope in terms of numbers of protons and neutrons."),
            o("1.2.2", "Use isotope notation with nucleon number and proton number."),
            o("1.2.3", "Explain why isotopes of an element have the same chemical properties."),
            o("1.2.4", "Explain why isotopes have different physical properties (mass and density)."),
          ],
        }),
        sub("atomic-structure.orbitals", "1.3", "Electrons, energy levels and atomic orbitals", {
          stage: ASL,
          covers: ["achem.atoms.orbitals-configurations"],
          objectives: [
            o("1.3.1", "Use the terms shell, sub-shell, orbital, principal quantum number and ground state."),
            o("1.3.2", "State the number of orbitals in s, p and d sub-shells and how many electrons each holds."),
            o("1.3.3", "Describe the order of increasing energy of the sub-shells in the first three shells and 4s and 4p."),
            o("1.3.4", "Describe electron configurations by shell, sub-shell and orbital."),
            o("1.3.5", "Explain electron configurations in terms of electron energy and inter-electron repulsion."),
            o("1.3.6", "Write full and shorthand electron configurations of atoms and ions (hydrogen to krypton)."),
            o("1.3.7", "Use electrons-in-boxes notation."),
            o("1.3.8", "Describe and sketch the shapes of s and p orbitals."),
            o("1.3.9", "Describe a free radical as a species with one or more unpaired electrons."),
          ],
        }),
        sub("atomic-structure.ionisation-energy", "1.4", "Ionisation energy", {
          stage: ASL,
          covers: ["achem.atoms.ionisation-energy"],
          objectives: [
            o("1.4.1", "Define and use first ionisation energy."),
            o("1.4.2", "Write equations for first, second and successive ionisation energies."),
            o("1.4.3", "Identify and explain ionisation energy trends across a period and down a group."),
            o("1.4.4", "Identify and explain the variation in successive ionisation energies of an element."),
            o("1.4.5", "Relate ionisation energy to the attraction between the nucleus and the outer electron."),
            o("1.4.6", "Explain the factors affecting ionisation energy: nuclear charge, radius, shielding and spin-pair repulsion."),
            o("1.4.7", "Deduce electron configurations from successive ionisation energies."),
            o("1.4.8", "Deduce the position of an element in the Periodic Table from successive ionisation energies."),
          ],
        }),
      ],
    }),
    topic("stoichiometry", "2", "Atoms, molecules and stoichiometry", {
      components: AS,
      children: [
        sub("stoichiometry.relative-masses", "2.1", "Relative masses of atoms and molecules", {
          stage: ASL,
          covers: ["achem.stoich.relative-masses-mole"],
          objectives: [
            o("2.1.1", "Define the unified atomic mass unit as one twelfth of the mass of a carbon-12 atom."),
            o("2.1.2", "Define relative atomic, isotopic, molecular and formula mass using the unified atomic mass unit."),
          ],
        }),
        sub("stoichiometry.mole", "2.2", "The mole and the Avogadro constant", {
          stage: ASL,
          description: "Taught in the lesson covered by 2.1.",
          objectives: [o("2.2.1", "Define and use the mole in terms of the Avogadro constant.")],
        }),
        sub("stoichiometry.formulas", "2.3", "Formulas", {
          stage: ASL,
          covers: ["achem.stoich.formulae-equations"],
          objectives: [
            o("2.3.1", "Write formulae of ionic compounds from ionic charges and oxidation numbers, predicting charges from the Periodic Table and recalling common ions."),
            o("2.3.2", "Write balanced full and ionic equations (without spectator ions) with state symbols."),
            o("2.3.3", "Define and use empirical and molecular formula."),
            o("2.3.4", "Use the terms anhydrous, hydrated and water of crystallisation."),
            o("2.3.5", "Calculate empirical and molecular formulae from data."),
          ],
        }),
        sub("stoichiometry.reacting-masses", "2.4", "Reacting masses and volumes (of solutions and gases)", {
          stage: ASL,
          covers: ["achem.stoich.reacting-masses-yield", "achem.stoich.solutions-titrations"],
          objectives: [
            o("2.4.1", "Carry out mole calculations with reacting masses and percentage yield, gas volumes, solution volumes and concentrations, and limiting and excess reagents, to appropriate significant figures, and deduce stoichiometric relationships from them."),
          ],
        }),
      ],
    }),
    topic("bonding", "3", "Chemical bonding", {
      components: AS,
      children: [
        sub("bonding.electronegativity", "3.1", "Electronegativity and bonding", {
          stage: ASL,
          description: "Taught in the ionic and metallic bonding lesson (3.2) and the polarity part of the intermolecular forces lesson (3.6).",
          objectives: [
            o("3.1.1", "Define electronegativity."),
            o("3.1.2", "Explain the factors affecting electronegativity: nuclear charge, atomic radius and shielding."),
            o("3.1.3", "State and explain electronegativity trends across a period and down a group."),
            o("3.1.4", "Use differences in Pauling electronegativity to predict ionic or covalent bonding."),
          ],
        }),
        sub("bonding.ionic", "3.2", "Ionic bonding", {
          stage: ASL,
          covers: ["achem.bonding.ionic-metallic"],
          objectives: [
            o("3.2.1", "Define ionic bonding as electrostatic attraction between oppositely charged ions."),
            o("3.2.2", "Describe ionic bonding in sodium chloride, magnesium oxide and calcium fluoride."),
          ],
        }),
        sub("bonding.metallic", "3.3", "Metallic bonding", {
          stage: ASL,
          description: "Taught in the lesson covered by 3.2.",
          objectives: [o("3.3.1", "Define metallic bonding as electrostatic attraction between positive metal ions and delocalised electrons.")],
        }),
        sub("bonding.covalent", "3.4", "Covalent bonding and coordinate (dative covalent) bonding", {
          stage: ASL,
          covers: ["achem.bonding.covalent-dative", "achem.bonding.orbitals-hybridisation"],
          objectives: [
            o("3.4.1", "Define covalent bonding; describe it in simple molecules, in period 3 compounds with an expanded octet, and coordinate bonding in NH₄⁺ and Al₂Cl₆."),
            o("3.4.2", "Describe σ and π bonds by orbital overlap in H₂, C₂H₆, C₂H₄, HCN and N₂, and use sp, sp² and sp³ hybridisation."),
            o("3.4.3", "Define bond energy and bond length and use them to compare the reactivity of covalent molecules."),
          ],
        }),
        sub("bonding.shapes", "3.5", "Shapes of molecules", {
          stage: ASL,
          covers: ["achem.bonding.shapes-vsepr"],
          objectives: [
            o("3.5.1", "State and explain the shapes and bond angles of BF₃, CO₂, CH₄, NH₃, H₂O, SF₆ and PF₅ using VSEPR theory."),
            o("3.5.2", "Predict the shapes and bond angles of analogous molecules and ions."),
          ],
        }),
        sub("bonding.intermolecular", "3.6", "Intermolecular forces, electronegativity and bond properties", {
          stage: ASL,
          covers: ["achem.bonding.intermolecular-forces"],
          objectives: [
            o("3.6.1", "Describe hydrogen bonding (N–H and O–H) and use it to explain the anomalous properties of water and ice."),
            o("3.6.2", "Explain bond polarity and molecular dipole moments using electronegativity."),
            o("3.6.3", "Describe van der Waals' forces as the generic term and its types: instantaneous dipole-induced dipole and permanent dipole-permanent dipole forces, with hydrogen bonding as a special case."),
            o("3.6.4", "State that ionic, covalent and metallic bonds are generally stronger than intermolecular forces."),
          ],
        }),
        sub("bonding.dot-and-cross", "3.7", "Dot-and-cross diagrams", {
          stage: ASL,
          description: "Taught in the ionic (3.2) and covalent (3.4) bonding lessons.",
          objectives: [o("3.7.1", "Use dot-and-cross diagrams for ionic, covalent and coordinate bonding, including expanded octets and odd-electron species.")],
        }),
      ],
    }),
    topic("states-of-matter", "4", "States of matter", {
      components: AS,
      children: [
        sub("states-of-matter.gases", "4.1", "The gaseous state: ideal and real gases and pV = nRT", {
          stage: ASL,
          covers: ["achem.states.gases"],
          objectives: [
            o("4.1.1", "Explain gas pressure in terms of molecular collisions with the container walls."),
            o("4.1.2", "State that ideal gases have zero particle volume and no intermolecular attractions."),
            o("4.1.3", "Use pV = nRT in calculations, including finding Mr."),
          ],
        }),
        sub("states-of-matter.structure", "4.2", "Bonding and structure", {
          stage: ASL,
          covers: ["achem.states.lattice-structures"],
          objectives: [
            o("4.2.1", "Describe giant ionic, simple molecular, giant molecular and giant metallic lattices with the named examples."),
            o("4.2.2", "Describe, interpret and predict how structure and bonding affect melting and boiling points, conductivity and solubility."),
            o("4.2.3", "Deduce the structure and bonding of a substance from given information."),
          ],
        }),
      ],
    }),
    topic("energetics", "5", "Chemical energetics", {
      components: AS,
      children: [
        sub("energetics.enthalpy", "5.1", "Enthalpy change, ΔH", {
          stage: ASL,
          covers: ["achem.energetics.enthalpy-calorimetry"],
          description: "Bond-energy calculations (5.1.4-5.1.6) are taught with Hess's law (5.2).",
          objectives: [
            o("5.1.1", "Recognise exothermic (negative ΔH) and endothermic (positive ΔH) changes."),
            o("5.1.2", "Construct and interpret reaction pathway diagrams showing ΔH and activation energy."),
            o("5.1.3", "Define standard conditions and the standard enthalpy changes of reaction, formation, combustion and neutralisation."),
            o("5.1.4", "Relate energy transfers to the breaking and making of bonds."),
            o("5.1.5", "Calculate enthalpy changes of reaction from bond energies."),
            o("5.1.6", "Recognise that some bond energies are exact and some are averages."),
            o("5.1.7", "Calculate enthalpy changes from experimental results using q = mcΔT and ΔH = −mcΔT/n."),
          ],
        }),
        sub("energetics.hess", "5.2", "Hess's law", {
          stage: ASL,
          covers: ["achem.energetics.hess-bond-energies"],
          objectives: [
            o("5.2.1", "Apply Hess's law to construct simple energy cycles."),
            o("5.2.2", "Calculate enthalpy changes using cycles, including ones that cannot be measured directly and ones that use bond energies."),
          ],
        }),
      ],
    }),
    topic("electrochemistry", "6", "Electrochemistry", {
      components: AS,
      children: [
        sub("electrochemistry.redox", "6.1", "Redox processes: electron transfer and changes in oxidation number (oxidation state)", {
          stage: ASL,
          covers: ["achem.electrochem.oxidation-numbers"],
          objectives: [
            o("6.1.1", "Calculate oxidation numbers of elements in compounds and ions."),
            o("6.1.2", "Use oxidation-number changes to balance equations."),
            o("6.1.3", "Explain redox, oxidation, reduction and disproportionation by electron transfer and oxidation number."),
            o("6.1.4", "Explain and use oxidising agent and reducing agent."),
            o("6.1.5", "Use Roman numerals to show oxidation numbers."),
          ],
        }),
      ],
    }),
    topic("equilibria", "7", "Equilibria", {
      components: AS,
      children: [
        sub("equilibria.chemical", "7.1", "Chemical equilibria: reversible reactions, dynamic equilibrium", {
          stage: ASL,
          covers: ["achem.equilibria.dynamic-le-chatelier", "achem.equilibria.kc-kp", "achem.equilibria.haber-contact"],
          objectives: [
            o("7.1.1", "Explain reversible reaction and dynamic equilibrium, and why a closed system is needed."),
            o("7.1.2", "State Le Chatelier's principle."),
            o("7.1.3", "Deduce qualitatively the effect of temperature, concentration, pressure or a catalyst on an equilibrium."),
            o("7.1.4", "Write Kc expressions."),
            o("7.1.5", "Use mole fraction and partial pressure."),
            o("7.1.6", "Write Kp expressions (the Kp-Kc relationship is not required)."),
            o("7.1.7", "Calculate with Kc and Kp (no quadratic equations)."),
            o("7.1.8", "Calculate the quantities present at equilibrium from given data."),
            o("7.1.9", "State which changes affect the value of an equilibrium constant."),
            o("7.1.10", "Describe and explain the conditions of the Haber and Contact processes."),
          ],
        }),
        sub("equilibria.bronsted-lowry", "7.2", "Brønsted-Lowry theory of acids and bases", {
          stage: ASL,
          covers: ["achem.acids.bronsted-lowry", "achem.acids.titration-curves-indicators"],
          objectives: [
            o("7.2.1", "Name the common acids: hydrochloric, sulfuric, nitric and ethanoic acid."),
            o("7.2.2", "Name the common alkalis: sodium hydroxide, potassium hydroxide and ammonia."),
            o("7.2.3", "Describe the Brønsted-Lowry theory of acids and bases."),
            o("7.2.4", "Describe strong acids and bases as fully dissociated and weak ones as partially dissociated."),
            o("7.2.5", "Relate pH 7, below 7 and above 7 to neutral, acidic and alkaline solutions."),
            o("7.2.6", "Explain qualitative differences between strong and weak acids (reaction with a reactive metal, pH, conductivity)."),
            o("7.2.7", "Describe neutralisation as H⁺(aq) and OH⁻(aq) forming water."),
            o("7.2.8", "State that salts form in neutralisation."),
            o("7.2.9", "Sketch pH titration curves for strong and weak acids with strong and weak alkalis."),
            o("7.2.10", "Select suitable indicators for acid-alkali titrations from given data."),
          ],
        }),
      ],
    }),
    topic("kinetics", "8", "Reaction kinetics", {
      components: AS,
      children: [
        sub("kinetics.rate", "8.1", "Rate of reaction", {
          stage: ASL,
          description: "Taught in the lesson covered by 8.2.",
          objectives: [
            o("8.1.1", "Explain rate of reaction, collision frequency, effective and non-effective collisions."),
            o("8.1.2", "Explain qualitatively the effect of concentration and pressure on rate."),
            o("8.1.3", "Calculate a rate of reaction from experimental data."),
          ],
        }),
        sub("kinetics.temperature", "8.2", "Effect of temperature on reaction rates and the concept of activation energy", {
          stage: ASL,
          covers: ["achem.kinetics.collisions-boltzmann"],
          objectives: [
            o("8.2.1", "Define activation energy as the minimum energy for an effective collision."),
            o("8.2.2", "Sketch and use the Boltzmann distribution to explain the significance of activation energy."),
            o("8.2.3", "Explain the effect of temperature on rate using the Boltzmann distribution and collision frequency."),
          ],
        }),
        sub("kinetics.catalysts", "8.3", "Homogeneous and heterogeneous catalysts", {
          stage: ASL,
          description: "Taught in the lesson covered by 8.2; the types of catalysis are taught in 26.2.",
          objectives: [o("8.3.1", "Explain catalysis as an alternative mechanism of lower activation energy, using the Boltzmann distribution and reaction pathway diagrams.")],
        }),
      ],
    }),
    topic("periodicity", "9", "The Periodic Table: chemical periodicity", {
      components: AS,
      children: [
        sub("periodicity.physical", "9.1", "Periodicity of physical properties of the elements in Period 3", {
          stage: ASL,
          covers: ["achem.periodicity.physical-properties"],
          objectives: [
            o("9.1.1", "Describe the variation in atomic radius, ionic radius, melting point and electrical conductivity across Period 3."),
            o("9.1.2", "Explain the variation in melting point and conductivity by structure and bonding."),
          ],
        }),
        sub("periodicity.chemical", "9.2", "Periodicity of chemical properties of the elements in Period 3", {
          stage: ASL,
          covers: ["achem.periodicity.element-reactions", "achem.periodicity.oxides-chlorides"],
          objectives: [
            o("9.2.1", "Describe, with equations, the reactions of the elements with oxygen, chlorine and (Na and Mg) water."),
            o("9.2.2", "Explain the variation in oxidation number of the oxides and chlorides by outer-shell electrons."),
            o("9.2.3", "Describe the reactions of the oxides with water and the pH of the solutions."),
            o("9.2.4", "Describe and explain the acid-base behaviour of the oxides and hydroxides, including amphoteric behaviour."),
            o("9.2.5", "Describe the reactions of the chlorides with water and the pH of the solutions."),
            o("9.2.6", "Explain these trends by bonding and electronegativity."),
            o("9.2.7", "Suggest the bonding in oxides and chlorides from their properties."),
          ],
        }),
        sub("periodicity.other", "9.3", "Chemical periodicity of other elements", {
          stage: ASL,
          description: "Taught in the lesson on the reactions of the Period 3 elements (9.2).",
          objectives: [
            o("9.3.1", "Predict properties of an element in a group from periodicity."),
            o("9.3.2", "Deduce the nature, position and identity of unknown elements from given properties."),
          ],
        }),
      ],
    }),
    topic("group-2", "10", "Group 2", {
      components: AS,
      children: [
        sub("group-2.trends", "10.1", "Similarities and trends in the properties of the Group 2 metals, magnesium to barium, and their compounds", {
          stage: ASL,
          covers: ["achem.group2.reactions-uses"],
          objectives: [
            o("10.1.1", "Describe with equations the reactions of the elements with oxygen, water and dilute acids."),
            o("10.1.2", "Describe with equations the reactions of the oxides, hydroxides and carbonates with water and dilute acids."),
            o("10.1.3", "Describe the thermal decomposition of the nitrates and carbonates and the trend in thermal stability."),
            o("10.1.4", "Describe and predict from the trends in properties of the elements and compounds."),
            o("10.1.5", "State the variation in solubility of the hydroxides and sulfates."),
          ],
        }),
      ],
    }),
    topic("group-17", "11", "Group 17", {
      components: AS,
      children: [
        sub("group-17.physical", "11.1", "Physical properties of the Group 17 elements", {
          stage: ASL,
          covers: ["achem.group17.properties-reactivity"],
          objectives: [
            o("11.1.1", "Describe the colours and volatility trend of chlorine, bromine and iodine."),
            o("11.1.2", "Describe and explain the trend in bond strength of the halogen molecules."),
            o("11.1.3", "Interpret volatility in terms of instantaneous dipole-induced dipole forces."),
          ],
        }),
        sub("group-17.chemical", "11.2", "The chemical properties of the halogen elements and the hydrogen halides", {
          stage: ASL,
          description: "Taught in the lesson covered by 11.1.",
          objectives: [
            o("11.2.1", "Describe the relative reactivity of the halogens as oxidising agents."),
            o("11.2.2", "Describe and explain the reactions of the halogens with hydrogen."),
            o("11.2.3", "Describe and explain the relative thermal stabilities of the hydrogen halides by bond strength."),
          ],
        }),
        sub("group-17.halide-ions", "11.3", "Some reactions of the halide ions", {
          stage: ASL,
          covers: ["achem.group17.halide-ions"],
          objectives: [
            o("11.3.1", "Describe the relative reactivity of halide ions as reducing agents."),
            o("11.3.2", "Describe and explain the reactions of halide ions with silver ions then aqueous ammonia, and with concentrated sulfuric acid."),
          ],
        }),
        sub("group-17.chlorine", "11.4", "The reactions of chlorine", {
          stage: ASL,
          covers: ["achem.group17.chlorine-uses"],
          objectives: [
            o("11.4.1", "Interpret the reactions of chlorine with cold and hot aqueous sodium hydroxide as disproportionation."),
            o("11.4.2", "Explain the use of chlorine in water purification, including HOCl and ClO⁻."),
          ],
        }),
      ],
    }),
    topic("nitrogen-sulfur", "12", "Nitrogen and sulfur", {
      components: AS,
      children: [
        sub("nitrogen-sulfur.main", "12.1", "Nitrogen and sulfur", {
          stage: ASL,
          covers: ["achem.nitrogen-sulfur.nitrogen-ammonia", "achem.nitrogen-sulfur.environment"],
          objectives: [
            o("12.1.1", "Explain the lack of reactivity of nitrogen."),
            o("12.1.2", "Describe and explain the basicity of ammonia, the structure and formation of the ammonium ion, and the displacement of ammonia from ammonium salts."),
            o("12.1.3", "State and explain sources of oxides of nitrogen and their catalytic removal from engine exhausts."),
            o("12.1.4", "Recognise that oxides of nitrogen and unburnt hydrocarbons form PAN, a component of photochemical smog."),
            o("12.1.5", "Describe the role of NO and NO₂ in acid rain, including their catalytic role in oxidising sulfur dioxide."),
          ],
        }),
      ],
    }),
    topic("organic-intro", "13", "An introduction to AS Level organic chemistry", {
      components: AS,
      children: [
        sub("organic-intro.formulas", "13.1", "Formulas, functional groups and the naming of organic compounds", {
          stage: ASL,
          covers: ["achem.organic.nomenclature-formulas"],
          objectives: [
            o("13.1.1", "Define hydrocarbon."),
            o("13.1.2", "Recognise alkanes as hydrocarbons with no functional group."),
            o("13.1.3", "Recognise that a functional group dictates physical and chemical properties."),
            o("13.1.4", "Use general, structural, displayed and skeletal formulae of the listed classes."),
            o("13.1.5", "Name simple aliphatic molecules with the listed functional groups up to six carbons."),
            o("13.1.6", "Deduce molecular and empirical formulae from structural, displayed or skeletal formulae."),
          ],
        }),
        sub("organic-intro.reactions", "13.2", "Characteristic organic reactions", {
          stage: ASL,
          covers: ["achem.organic.reaction-types"],
          objectives: [
            o("13.2.1", "Use the terminology of organic compounds and reactions (homologous series, saturation, homolytic and heterolytic fission, free radicals, nucleophiles, electrophiles, reaction types, [O] and [H])."),
            o("13.2.2", "Use the terminology of mechanisms (free-radical substitution, electrophilic addition, nucleophilic substitution, nucleophilic addition) and curly arrows."),
          ],
        }),
        sub("organic-intro.shapes", "13.3", "Shapes of organic molecules; σ and π bonds", {
          stage: ASL,
          description: "Taught in the orbitals and hybridisation lesson covered by 3.4.",
          objectives: [
            o("13.3.1", "Describe molecules as straight-chained, branched or cyclic."),
            o("13.3.2", "Describe and explain shapes and bond angles around sp, sp² and sp³ atoms."),
            o("13.3.3", "Describe the arrangement of σ and π bonds around sp, sp² and sp³ atoms."),
            o("13.3.4", "Use the term planar, for example for ethene."),
          ],
        }),
        sub("organic-intro.isomerism", "13.4", "Isomerism: structural isomerism and stereoisomerism", {
          stage: ASL,
          covers: ["achem.organic.isomerism"],
          objectives: [
            o("13.4.1", "Describe chain, positional and functional group isomerism."),
            o("13.4.2", "Describe stereoisomerism as geometrical (cis/trans) and optical isomerism."),
            o("13.4.3", "Explain cis/trans isomerism in alkenes by restricted rotation about π bonds."),
            o("13.4.4", "Explain chiral centres and enantiomers."),
            o("13.4.5", "Identify chiral centres and cis/trans isomerism in given structures, including cyclic compounds."),
            o("13.4.6", "Deduce the possible isomers of a given molecular formula."),
          ],
        }),
      ],
    }),
    topic("hydrocarbons", "14", "Hydrocarbons", {
      components: AS,
      children: [
        sub("hydrocarbons.alkanes", "14.1", "Alkanes", {
          stage: ASL,
          covers: ["achem.hydrocarbons.alkanes-crude-oil", "achem.hydrocarbons.free-radical-substitution"],
          objectives: [
            o("14.1.1", "Recall how alkanes are produced: hydrogenation of alkenes and cracking."),
            o("14.1.2", "Describe complete and incomplete combustion, and free-radical substitution of ethane by Cl₂ or Br₂ in ultraviolet light."),
            o("14.1.3", "Describe the free-radical substitution mechanism: initiation, propagation and termination."),
            o("14.1.4", "Suggest how cracking gives more useful alkanes and alkenes from heavy fractions."),
            o("14.1.5", "Explain the general unreactivity of alkanes by C–H bond strength and low polarity."),
            o("14.1.6", "Recognise the environmental effects of CO, oxides of nitrogen and unburnt hydrocarbons from engines and their catalytic removal."),
          ],
        }),
        sub("hydrocarbons.alkenes", "14.2", "Alkenes", {
          stage: ASL,
          covers: ["achem.hydrocarbons.alkenes-reactions", "achem.hydrocarbons.electrophilic-addition"],
          objectives: [
            o("14.2.1", "Recall how alkenes are produced: elimination from halogenoalkanes, dehydration of alcohols and cracking."),
            o("14.2.2", "Describe the addition of hydrogen, steam, hydrogen halides and halogens, oxidation by cold dilute and hot concentrated KMnO₄, and addition polymerisation."),
            o("14.2.3", "Describe the bromine-water test for C=C."),
            o("14.2.4", "Describe the electrophilic addition mechanism for bromine/ethene and hydrogen bromide/propene."),
            o("14.2.5", "Explain carbocation stability by inductive effects and use it to explain Markovnikov addition."),
          ],
        }),
      ],
    }),
    topic("halogen-compounds", "15", "Halogen compounds", {
      components: AS,
      children: [
        sub("halogen-compounds.halogenoalkanes", "15.1", "Halogenoalkanes", {
          stage: ASL,
          covers: ["achem.halogen.halogenoalkane-reactions", "achem.halogen.sn1-sn2"],
          objectives: [
            o("15.1.1", "Recall how halogenoalkanes are produced from alkanes, alkenes and alcohols."),
            o("15.1.2", "Classify halogenoalkanes as primary, secondary or tertiary."),
            o("15.1.3", "Describe nucleophilic substitution with NaOH(aq), KCN in ethanol, NH₃ in ethanol and aqueous silver nitrate in ethanol."),
            o("15.1.4", "Describe elimination with NaOH in ethanol."),
            o("15.1.5", "Describe the SN1 and SN2 mechanisms, including inductive effects of alkyl groups."),
            o("15.1.6", "Recall that primary halogenoalkanes tend to react by SN2, tertiary by SN1 and secondary by both."),
            o("15.1.7", "Explain the different reactivities of halogenoalkanes by C–X bond strength."),
          ],
        }),
      ],
    }),
    topic("hydroxy-compounds", "16", "Hydroxy compounds", {
      components: AS,
      children: [
        sub("hydroxy-compounds.alcohols", "16.1", "Alcohols", {
          stage: ASL,
          covers: ["achem.hydroxy.alcohols-structure", "achem.hydroxy.alcohol-reactions"],
          objectives: [
            o("16.1.1", "Recall how alcohols are produced (hydration, diol formation, hydrolysis, reductions with NaBH₄ or LiAlH₄, ester hydrolysis)."),
            o("16.1.2", "Describe combustion, substitution to halogenoalkanes, reaction with sodium, oxidation, dehydration and esterification."),
            o("16.1.3", "Classify alcohols as primary, secondary and tertiary and state distinguishing reactions."),
            o("16.1.4", "Deduce a CH₃CH(OH)– group from the reaction with alkaline iodine."),
            o("16.1.5", "Explain the acidity of alcohols compared with water."),
          ],
        }),
      ],
    }),
    topic("carbonyl-compounds", "17", "Carbonyl compounds", {
      components: AS,
      children: [
        sub("carbonyl-compounds.aldehydes-ketones", "17.1", "Aldehydes and ketones", {
          stage: ASL,
          covers: ["achem.carbonyl.aldehydes-ketones", "achem.carbonyl.nucleophilic-addition"],
          objectives: [
            o("17.1.1", "Recall how aldehydes and ketones are produced by oxidising primary and secondary alcohols."),
            o("17.1.2", "Describe reduction with NaBH₄ or LiAlH₄ and the reaction with HCN/KCN to give hydroxynitriles."),
            o("17.1.3", "Describe the nucleophilic addition mechanism of HCN with aldehydes and ketones."),
            o("17.1.4", "Describe the use of 2,4-DNPH to detect carbonyl compounds."),
            o("17.1.5", "Deduce whether a carbonyl compound is an aldehyde or a ketone from simple tests."),
            o("17.1.6", "Deduce a CH₃CO– group from the reaction with alkaline iodine."),
          ],
        }),
      ],
    }),
    topic("carboxylic-acids", "18", "Carboxylic acids and derivatives", {
      components: AS,
      children: [
        sub("carboxylic-acids.acids", "18.1", "Carboxylic acids", {
          stage: ASL,
          covers: ["achem.carboxylic.acids-reactions"],
          objectives: [
            o("18.1.1", "Recall how carboxylic acids are produced: oxidation, and hydrolysis of nitriles and esters."),
            o("18.1.2", "Describe reactions with reactive metals, alkalis and carbonates, esterification and reduction by LiAlH₄."),
          ],
        }),
        sub("carboxylic-acids.esters", "18.2", "Esters", {
          stage: ASL,
          covers: ["achem.carboxylic.esters"],
          objectives: [
            o("18.2.1", "Recall the formation of esters from an alcohol and a carboxylic acid with a concentrated H₂SO₄ catalyst."),
            o("18.2.2", "Describe the hydrolysis of esters by dilute acid and by dilute alkali."),
          ],
        }),
      ],
    }),
    topic("nitrogen-compounds", "19", "Nitrogen compounds", {
      components: AS,
      children: [
        sub("nitrogen-compounds.amines", "19.1", "Primary amines", {
          stage: ASL,
          description: "Taught in the halogenoalkane reactions lesson (15.1) and the amines lesson (34.1).",
          objectives: [o("19.1.1", "Recall the production of amines from halogenoalkanes and ammonia in ethanol under pressure.")],
        }),
        sub("nitrogen-compounds.nitriles", "19.2", "Nitriles and hydroxynitriles", {
          stage: ASL,
          covers: ["achem.amines.nitriles"],
          objectives: [
            o("19.2.1", "Recall the production of nitriles from halogenoalkanes and KCN."),
            o("19.2.2", "Recall the production of hydroxynitriles from aldehydes and ketones."),
            o("19.2.3", "Describe the hydrolysis of nitriles to carboxylic acids."),
          ],
        }),
      ],
    }),
    topic("polymerisation", "20", "Polymerisation", {
      components: AS,
      children: [
        sub("polymerisation.addition", "20.1", "Addition polymerisation", {
          stage: ASL,
          covers: ["achem.polymers.addition"],
          objectives: [
            o("20.1.1", "Describe addition polymerisation of poly(ethene) and PVC."),
            o("20.1.2", "Deduce the repeat unit of an addition polymer from its monomer."),
            o("20.1.3", "Identify the monomer(s) in a section of an addition polymer."),
            o("20.1.4", "Recognise the difficulty of disposing of poly(alkene)s."),
          ],
        }),
      ],
    }),
    topic("organic-synthesis", "21", "Organic synthesis", {
      components: AS,
      children: [
        sub("organic-synthesis.as", "21.1", "Organic synthesis", {
          stage: ASL,
          covers: ["achem.organic.synthesis-as"],
          objectives: [
            o("21.1.1", "Identify functional groups in a multifunctional molecule and predict its properties and reactions."),
            o("21.1.2", "Devise multi-step synthetic routes using the syllabus reactions."),
            o("21.1.3", "Analyse a synthetic route for reaction types, reagents and possible by-products."),
          ],
        }),
      ],
    }),
    topic("analysis-as", "22", "Analytical techniques", {
      components: AS,
      children: [
        sub("analysis-as.infrared", "22.1", "Infrared spectroscopy", {
          stage: ASL,
          covers: ["achem.analysis.infrared"],
          objectives: [o("22.1.1", "Analyse the infrared spectrum of a simple molecule to identify functional groups.")],
        }),
        sub("analysis-as.mass-spectrometry", "22.2", "Mass spectrometry", {
          stage: ASL,
          covers: ["achem.analysis.mass-spectrometry"],
          objectives: [
            o("22.2.1", "Analyse mass spectra in terms of m/e values and isotopic abundances."),
            o("22.2.2", "Calculate relative atomic mass from isotopic abundances or a mass spectrum."),
            o("22.2.3", "Deduce molecular mass from the molecular ion peak."),
            o("22.2.4", "Suggest the identity of simple fragments."),
            o("22.2.5", "Deduce the number of carbon atoms from the [M+1]⁺ peak."),
            o("22.2.6", "Deduce the presence of bromine and chlorine from the [M+2]⁺ peak."),
          ],
        }),
      ],
    }),
  ],
});

const A_CONTENT = section("a-content", "A", "A Level subject content", {
  description: "Topics 23-37: A Level only; examined in Paper 4 (AS Level content assumed).",
  children: [
    topic("energetics-a", "23", "Chemical energetics", {
      components: AL,
      children: [
        sub("energetics-a.born-haber", "23.1", "Lattice energy and Born-Haber cycles", {
          stage: ALO,
          covers: ["achem.energetics.born-haber"],
          objectives: [
            o("23.1.1", "Define and use enthalpy change of atomisation and lattice energy."),
            o("23.1.2", "Define first electron affinity, explain the factors affecting it and the trends in Groups 16 and 17."),
            o("23.1.3", "Construct Born-Haber cycles for ionic solids (+1, +2 cations; −1, −2 anions)."),
            o("23.1.4", "Calculate with Born-Haber cycles."),
            o("23.1.5", "Explain qualitatively the effect of ionic charge and radius on lattice energy."),
          ],
        }),
        sub("energetics-a.solution-hydration", "23.2", "Enthalpies of solution and hydration", {
          stage: ALO,
          covers: ["achem.energetics.solution-hydration"],
          objectives: [
            o("23.2.1", "Define enthalpy change of hydration and of solution."),
            o("23.2.2", "Construct an energy cycle linking enthalpy of solution, lattice energy and hydration enthalpies."),
            o("23.2.3", "Calculate with these energy cycles."),
            o("23.2.4", "Explain qualitatively the effect of ionic charge and radius on hydration enthalpy."),
          ],
        }),
        sub("energetics-a.entropy", "23.3", "Entropy change, ΔS", {
          stage: ALO,
          covers: ["achem.energetics.entropy-gibbs"],
          objectives: [
            o("23.3.1", "Define entropy in terms of the number of possible arrangements of particles and their energy."),
            o("23.3.2", "Predict and explain the sign of ΔS for changes of state, temperature changes and reactions that change the number of gas molecules."),
            o("23.3.3", "Calculate ΔS⦵ for a reaction from standard entropies."),
          ],
        }),
        sub("energetics-a.gibbs", "23.4", "Gibbs free energy change, ΔG", {
          stage: ALO,
          description: "Taught in the entropy and Gibbs free energy lesson covered by 23.3.",
          objectives: [
            o("23.4.1", "State and use ΔG⦵ = ΔH⦵ − TΔS⦵."),
            o("23.4.2", "Calculate with the Gibbs equation."),
            o("23.4.3", "Judge feasibility from the sign of ΔG."),
            o("23.4.4", "Predict the effect of temperature on feasibility from ΔH and ΔS."),
          ],
        }),
      ],
    }),
    topic("electrochemistry-a", "24", "Electrochemistry", {
      components: AL,
      children: [
        sub("electrochemistry-a.electrolysis", "24.1", "Electrolysis", {
          stage: ALO,
          covers: ["achem.electrochem.electrolysis-products", "achem.electrochem.faraday"],
          objectives: [
            o("24.1.1", "Predict electrolysis products from the state of the electrolyte, electrode potentials and concentration."),
            o("24.1.2", "State and apply F = Le."),
            o("24.1.3", "Calculate the charge passed (Q = It) and the mass or volume of substance liberated."),
            o("24.1.4", "Describe an electrolytic determination of the Avogadro constant."),
          ],
        }),
        sub("electrochemistry-a.electrode-potentials", "24.2", "Standard electrode potentials E⦵, standard cell potentials E⦵cell and the Nernst equation", {
          stage: ALO,
          covers: ["achem.electrochem.electrode-potentials", "achem.electrochem.nernst-free-energy"],
          objectives: [
            o("24.2.1", "Define standard electrode (reduction) potential and standard cell potential."),
            o("24.2.2", "Describe the standard hydrogen electrode."),
            o("24.2.3", "Describe how to measure E⦵ for metals and non-metals with their ions and for ions of the same element."),
            o("24.2.4", "Calculate E⦵cell from two electrode potentials."),
            o("24.2.5", "Use E⦵cell to deduce electrode polarity and electron flow, and to predict feasibility."),
            o("24.2.6", "Deduce the relative strength of oxidising and reducing agents from E⦵ values."),
            o("24.2.7", "Construct redox equations from half-equations."),
            o("24.2.8", "Predict qualitatively how E changes with ion concentrations."),
            o("24.2.9", "Use the Nernst equation to predict E quantitatively."),
            o("24.2.10", "Use ΔG⦵ = −nE⦵cellF."),
          ],
        }),
      ],
    }),
    topic("equilibria-a", "25", "Equilibria", {
      components: AL,
      children: [
        sub("equilibria-a.acids-bases", "25.1", "Acids and bases", {
          stage: ALO,
          description: "Conjugate acid-base pairs (25.1.1-25.1.2) are taught in the Brønsted-Lowry lesson (7.2).",
          covers: ["achem.acids.ph-kw", "achem.acids.weak-acids-bases", "achem.acids.buffers", "achem.acids.solubility-product"],
          objectives: [
            o("25.1.1", "Use the terms conjugate acid and conjugate base."),
            o("25.1.2", "Identify conjugate acid-base pairs in reactions."),
            o("25.1.3", "Define pH, Ka, pKa and Kw and use them in calculations (Kb is not tested)."),
            o("25.1.4", "Calculate [H⁺] and pH for strong acids, strong alkalis and weak acids."),
            o("25.1.5", "Define a buffer, explain how it is made and how it controls pH, and describe uses including HCO₃⁻ in blood."),
            o("25.1.6", "Calculate the pH of buffer solutions."),
            o("25.1.7", "Use the term solubility product, Ksp."),
            o("25.1.8", "Write Ksp expressions."),
            o("25.1.9", "Calculate Ksp from concentrations and vice versa."),
            o("25.1.10", "Explain and calculate the common ion effect."),
          ],
        }),
        sub("equilibria-a.partition", "25.2", "Partition coefficients", {
          stage: ALO,
          covers: ["achem.phase.partition-extraction"],
          objectives: [
            o("25.2.1", "State what a partition coefficient, Kpc, is."),
            o("25.2.2", "Calculate and use Kpc for a solute in the same physical state in both solvents."),
            o("25.2.3", "Explain how the polarities of solute and solvents affect Kpc."),
          ],
        }),
      ],
    }),
    topic("kinetics-a", "26", "Reaction kinetics", {
      components: AL,
      children: [
        sub("kinetics-a.rate-equations", "26.1", "Simple rate equations, orders of reaction and rate constants", {
          stage: ALO,
          covers: ["achem.kinetics.rate-equations", "achem.kinetics.mechanisms-rds"],
          objectives: [
            o("26.1.1", "Use rate equation, order, overall order, rate constant, half-life, rate-determining step and intermediate."),
            o("26.1.2", "Use rate equations with orders 0, 1 or 2; deduce orders from graphs, initial rates and half-lives; calculate initial rates; construct rate equations."),
            o("26.1.3", "Show that the half-life of a first-order reaction is independent of concentration and use it in calculations."),
            o("26.1.4", "Calculate rate constants from initial rates and from half-life (k = 0.693/t½)."),
            o("26.1.5", "Relate multi-step mechanisms to rate equations: suggest mechanisms, predict orders, identify intermediates, catalysts and the rate-determining step."),
            o("26.1.6", "Describe qualitatively the effect of temperature on the rate constant and rate."),
          ],
        }),
        sub("kinetics-a.catalysts", "26.2", "Homogeneous and heterogeneous catalysts", {
          stage: ALO,
          covers: ["achem.kinetics.catalysis"],
          objectives: [
            o("26.2.1", "Explain that catalysts can be homogeneous or heterogeneous."),
            o("26.2.2", "Describe heterogeneous catalysis (adsorption, bond weakening, desorption): iron in the Haber process; Pd, Pt and Rh in catalytic converters."),
            o("26.2.3", "Describe homogeneous catalysis (used in one step, reformed later): oxides of nitrogen with sulfur dioxide; Fe²⁺/Fe³⁺ in the I⁻/S₂O₈²⁻ reaction."),
          ],
        }),
      ],
    }),
    topic("group-2-a", "27", "Group 2", {
      components: AL,
      children: [
        sub("group-2-a.trends", "27.1", "Similarities and trends in the properties of the Group 2 metals, magnesium to barium, and their compounds", {
          stage: ALO,
          covers: ["achem.group2.thermal-stability-solubility"],
          objectives: [
            o("27.1.1", "Explain the trend in thermal stability of the nitrates and carbonates by cation size and polarisation of the anion."),
            o("27.1.2", "Explain the solubility of the hydroxides and sulfates and their ΔHsol by lattice and hydration enthalpies."),
          ],
        }),
      ],
    }),
    topic("transition-elements", "28", "Chemistry of transition elements", {
      components: AL,
      children: [
        sub("transition-elements.general", "28.1", "General physical and chemical properties of the first row of transition elements, titanium to copper", {
          stage: ALO,
          covers: ["achem.transition.general-properties"],
          objectives: [
            o("28.1.1", "Define a transition element."),
            o("28.1.2", "Sketch the shapes of the 3dxy and 3dz² orbitals."),
            o("28.1.3", "State the characteristic properties: variable oxidation states, catalysis, complex ions and coloured compounds."),
            o("28.1.4", "Explain variable oxidation states by the similar energies of 3d and 4s."),
            o("28.1.5", "Explain catalytic behaviour by variable oxidation states and accessible vacant d orbitals."),
            o("28.1.6", "Explain complex formation by accessible vacant d orbitals."),
          ],
        }),
        sub("transition-elements.chemical", "28.2", "General characteristic chemical properties of the first set of transition elements, titanium to copper", {
          stage: ALO,
          covers: ["achem.transition.complexes-ligands", "achem.electrochem.redox-titrations"],
          objectives: [
            o("28.2.1", "Describe complex formation by copper(II) and cobalt(II) with water, ammonia, hydroxide and chloride."),
            o("28.2.2", "Define ligand."),
            o("28.2.3", "Use monodentate, bidentate and polydentate ligand with the named examples."),
            o("28.2.4", "Define complex."),
            o("28.2.5", "Describe linear, square planar, tetrahedral and octahedral complexes."),
            o("28.2.6", "State coordination number and predict the formula and charge of a complex."),
            o("28.2.7", "Explain ligand exchange in copper(II) and cobalt(II) complexes."),
            o("28.2.8", "Predict the feasibility of redox reactions of transition elements from E⦵ values."),
            o("28.2.9", "Describe and calculate with MnO₄⁻/C₂O₄²⁻, MnO₄⁻/Fe²⁺ and Cu²⁺/I⁻."),
            o("28.2.10", "Calculate with other redox systems given suitable data."),
          ],
        }),
        sub("transition-elements.colour", "28.3", "Colour of complexes", {
          stage: ALO,
          covers: ["achem.transition.colour"],
          objectives: [
            o("28.3.1", "Use degenerate and non-degenerate d orbitals."),
            o("28.3.2", "Describe d-orbital splitting and ΔE in octahedral and tetrahedral complexes."),
            o("28.3.3", "Explain colour by absorption of light as electrons are promoted between d orbitals."),
            o("28.3.4", "Describe qualitatively the effect of ligands on ΔE, the light absorbed and the colour seen."),
            o("28.3.5", "Use copper(II) and cobalt(II) complexes as examples of ligand exchange changing colour."),
          ],
        }),
        sub("transition-elements.stereoisomerism", "28.4", "Stereoisomerism in transition element complexes", {
          stage: ALO,
          covers: ["achem.transition.stereoisomerism"],
          objectives: [
            o("28.4.1", "Describe cis/trans and optical isomerism in complexes, including those with bidentate ligands."),
            o("28.4.2", "Deduce the overall polarity of such complexes."),
          ],
        }),
        sub("transition-elements.stability", "28.5", "Stability constants, Kstab", {
          stage: ALO,
          covers: ["achem.transition.stability-constants"],
          objectives: [
            o("28.5.1", "Define the stability constant of a complex."),
            o("28.5.2", "Write Kstab expressions (water excluded)."),
            o("28.5.3", "Calculate with Kstab."),
            o("28.5.4", "Explain ligand exchange using Kstab values."),
          ],
        }),
      ],
    }),
    topic("organic-intro-a", "29", "An introduction to A Level organic chemistry", {
      components: AL,
      children: [
        sub("organic-intro-a.naming", "29.1", "Formulas, functional groups and the naming of organic compounds", {
          stage: ALO,
          description: "Aromatic naming is taught in the benzene lesson (29.3); the other A Level classes are named in their own lessons.",
          objectives: [
            o("29.1.1", "Recognise that the functional groups of arenes, halogenoarenes, phenols, acyl chlorides, amines, amides and amino acids dictate their properties."),
            o("29.1.2", "Use general, structural, displayed and skeletal formulae of these classes."),
            o("29.1.3", "Name simple aliphatic molecules with these groups, including single rings of up to six carbons."),
            o("29.1.4", "Name simple aromatic molecules with one benzene ring and simple substituents."),
          ],
        }),
        sub("organic-intro-a.reactions", "29.2", "Characteristic organic reactions", {
          stage: ALO,
          description: "Taught in the electrophilic substitution (30.1) and acyl chloride (33.3) lessons.",
          objectives: [o("29.2.1", "Use the terms electrophilic substitution and addition-elimination.")],
        }),
        sub("organic-intro-a.aromatic-shapes", "29.3", "Shapes of aromatic organic molecules; σ and π bonds", {
          stage: ALO,
          covers: ["achem.hydrocarbons.benzene-structure"],
          objectives: [o("29.3.1", "Describe and explain the shape of benzene and other aromatic molecules (sp² hybridisation, σ bonds and a delocalised π system).")],
        }),
        sub("organic-intro-a.optical", "29.4", "Isomerism: optical", {
          stage: ALO,
          covers: ["achem.organic.optical-isomerism-drugs"],
          objectives: [
            o("29.4.1", "State that enantiomers differ only in rotating plane-polarised light and possibly in biological activity."),
            o("29.4.2", "Use optically active and racemic mixture."),
            o("29.4.3", "Describe the effect of two optical isomers on plane-polarised light."),
            o("29.4.4", "Explain the relevance of chirality to drug synthesis: different activity, separating racemates, chiral catalysts."),
          ],
        }),
      ],
    }),
    topic("hydrocarbons-a", "30", "Hydrocarbons", {
      components: AL,
      children: [
        sub("hydrocarbons-a.arenes", "30.1", "Arenes", {
          stage: ALO,
          covers: ["achem.hydrocarbons.arenes-reactions", "achem.hydrocarbons.electrophilic-substitution"],
          objectives: [
            o("30.1.1", "Describe halogenation, nitration, Friedel-Crafts alkylation and acylation, side-chain oxidation and hydrogenation of benzene and methylbenzene."),
            o("30.1.2", "Describe the electrophilic substitution mechanism (nitrobenzene, bromobenzene) and why substitution predominates over addition."),
            o("30.1.3", "Predict whether halogenation occurs in the side chain or the ring from the conditions."),
            o("30.1.4", "Describe the directing effects of –NH₂, –OH, –R, –NO₂, –COOH and –COR."),
          ],
        }),
      ],
    }),
    topic("halogen-compounds-a", "31", "Halogen compounds", {
      components: AL,
      children: [
        sub("halogen-compounds-a.main", "31.1", "Halogen compounds", {
          stage: ALO,
          covers: ["achem.halogen.halogenoarenes-cfcs"],
          objectives: [
            o("31.1.1", "Recall the production of halogenoarenes from benzene and methylbenzene with Cl₂ or Br₂ and a catalyst."),
            o("31.1.2", "Explain the difference in reactivity between chloroethane and chlorobenzene."),
          ],
        }),
      ],
    }),
    topic("hydroxy-compounds-a", "32", "Hydroxy compounds", {
      components: AL,
      children: [
        sub("hydroxy-compounds-a.alcohols", "32.1", "Alcohols", {
          stage: ALO,
          description: "Taught in the acyl chloride lesson (33.3).",
          objectives: [o("32.1.1", "Describe the reaction of alcohols with acyl chlorides to form esters (ethyl ethanoate).")],
        }),
        sub("hydroxy-compounds-a.phenol", "32.2", "Phenol", {
          stage: ALO,
          covers: ["achem.hydroxy.phenol"],
          objectives: [
            o("32.2.1", "Recall the production of phenol from phenylamine via the diazonium salt."),
            o("32.2.2", "Recall the reactions of phenol with bases, sodium, diazonium salts, dilute nitric acid and bromine water."),
            o("32.2.3", "Explain the acidity of phenol."),
            o("32.2.4", "Describe and explain the relative acidities of water, phenol and ethanol."),
            o("32.2.5", "Explain why nitration and bromination of phenol need milder conditions than for benzene."),
            o("32.2.6", "Recall that –OH directs to the 2-, 4- and 6-positions."),
            o("32.2.7", "Apply the reactions of phenol to other phenolic compounds such as naphthol."),
          ],
        }),
      ],
    }),
    topic("carboxylic-acids-a", "33", "Carboxylic acids and derivatives", {
      components: AL,
      children: [
        sub("carboxylic-acids-a.acids", "33.1", "Carboxylic acids", {
          stage: ALO,
          covers: ["achem.carboxylic.acidity-further-reactions"],
          objectives: [
            o("33.1.1", "Recall the production of benzoic acid from methylbenzene."),
            o("33.1.2", "Describe the formation of acyl chlorides with PCl₅, PCl₃ or SOCl₂."),
            o("33.1.3", "Recognise the further oxidation of methanoic acid and ethanedioic acid."),
            o("33.1.4", "Describe and explain the relative acidities of carboxylic acids, phenols and alcohols."),
            o("33.1.5", "Describe and explain the relative acidities of chlorine-substituted carboxylic acids."),
          ],
        }),
        sub("carboxylic-acids-a.esters", "33.2", "Esters", {
          stage: ALO,
          description: "Taught in the acyl chloride lesson (33.3).",
          objectives: [o("33.2.1", "Recall the formation of esters from alcohols or phenols and acyl chlorides (ethyl ethanoate, phenyl benzoate).")],
        }),
        sub("carboxylic-acids-a.acyl-chlorides", "33.3", "Acyl chlorides", {
          stage: ALO,
          covers: ["achem.carboxylic.acyl-chlorides"],
          objectives: [
            o("33.3.1", "Recall how acyl chlorides are produced."),
            o("33.3.2", "Describe the reactions of acyl chlorides with water, alcohols, phenol, ammonia and amines."),
            o("33.3.3", "Describe the addition-elimination mechanism."),
            o("33.3.4", "Explain the relative ease of hydrolysis of acyl, alkyl and aryl chlorides."),
          ],
        }),
      ],
    }),
    topic("nitrogen-compounds-a", "34", "Nitrogen compounds", {
      components: AL,
      children: [
        sub("nitrogen-compounds-a.amines", "34.1", "Primary and secondary amines", {
          stage: ALO,
          covers: ["achem.amines.preparation-basicity"],
          objectives: [
            o("34.1.1", "Recall the production of primary and secondary amines (from halogenoalkanes, and reduction of amides and nitriles)."),
            o("34.1.2", "Describe the condensation of ammonia or an amine with an acyl chloride to give an amide."),
            o("34.1.3", "Describe and explain the basicity of aqueous amines."),
          ],
        }),
        sub("nitrogen-compounds-a.phenylamine", "34.2", "Phenylamine and azo compounds", {
          stage: ALO,
          covers: ["achem.amines.phenylamine-azo"],
          objectives: [
            o("34.2.1", "Describe the preparation of phenylamine from benzene via nitrobenzene."),
            o("34.2.2", "Describe the reactions of phenylamine with bromine water and with nitrous acid, and the hydrolysis of the diazonium salt."),
            o("34.2.3", "Describe and explain the relative basicities of ammonia, ethylamine and phenylamine."),
            o("34.2.4", "Recall azo coupling with phenol, the azo group and the use of azo compounds as dyes."),
          ],
        }),
        sub("nitrogen-compounds-a.amides", "34.3", "Amides", {
          stage: ALO,
          covers: ["achem.amines.amides"],
          objectives: [
            o("34.3.1", "Recall the production of amides from ammonia or primary amines and acyl chlorides."),
            o("34.3.2", "Describe the hydrolysis of amides and their reduction with LiAlH₄."),
            o("34.3.3", "Explain why amides are much weaker bases than amines."),
          ],
        }),
        sub("nitrogen-compounds-a.amino-acids", "34.4", "Amino acids", {
          stage: ALO,
          covers: ["achem.amines.amino-acids"],
          objectives: [
            o("34.4.1", "Describe the acid-base properties of amino acids, zwitterions and the isoelectric point."),
            o("34.4.2", "Describe the formation of peptide bonds in di- and tripeptides."),
            o("34.4.3", "Interpret and predict electrophoresis results for amino acids and dipeptides at different pH."),
          ],
        }),
      ],
    }),
    topic("polymerisation-a", "35", "Polymerisation", {
      components: AL,
      children: [
        sub("polymerisation-a.condensation", "35.1", "Condensation polymerisation", {
          stage: ALO,
          covers: ["achem.polymers.condensation"],
          objectives: [
            o("35.1.1", "Describe the formation of polyesters."),
            o("35.1.2", "Describe the formation of polyamides, including from amino acids."),
            o("35.1.3", "Deduce the repeat unit of a condensation polymer."),
            o("35.1.4", "Identify the monomers in a section of a condensation polymer."),
          ],
        }),
        sub("polymerisation-a.predicting", "35.2", "Predicting the type of polymerisation", {
          stage: ALO,
          description: "Taught in the condensation polymerisation lesson (35.1).",
          objectives: [
            o("35.2.1", "Predict the type of polymerisation for a given monomer or pair of monomers."),
            o("35.2.2", "Deduce the type of polymerisation from a section of polymer."),
          ],
        }),
        sub("polymerisation-a.degradable", "35.3", "Degradable polymers", {
          stage: ALO,
          covers: ["achem.polymers.uses-degradability"],
          objectives: [
            o("35.3.1", "Recognise that poly(alkenes) are inert and hard to biodegrade."),
            o("35.3.2", "Recognise that some polymers are degraded by light."),
            o("35.3.3", "Recognise that polyesters and polyamides can be hydrolysed by acid and alkali."),
          ],
        }),
      ],
    }),
    topic("organic-synthesis-a", "36", "Organic synthesis", {
      components: AL,
      children: [
        sub("organic-synthesis-a.main", "36.1", "Organic synthesis", {
          stage: ALO,
          covers: ["achem.organic.synthesis-a"],
          objectives: [
            o("36.1.1", "Identify functional groups in a multifunctional molecule and predict its properties and reactions (A Level reactions included)."),
            o("36.1.2", "Devise multi-step synthetic routes using the syllabus reactions."),
            o("36.1.3", "Analyse a synthetic route for reaction types, reagents and possible by-products."),
          ],
        }),
      ],
    }),
    topic("analysis-a", "37", "Analytical techniques", {
      components: AL,
      children: [
        sub("analysis-a.tlc", "37.1", "Thin-layer chromatography", {
          stage: ALO,
          covers: ["achem.analysis.chromatography-tlc"],
          objectives: [
            o("37.1.1", "Describe stationary phase, mobile phase, Rf value, solvent front and baseline."),
            o("37.1.2", "Interpret Rf values."),
            o("37.1.3", "Explain differences in Rf values by interaction with the stationary phase and solubility in the mobile phase."),
          ],
        }),
        sub("analysis-a.glc", "37.2", "Gas/liquid chromatography", {
          stage: ALO,
          covers: ["achem.analysis.chromatography-glc"],
          objectives: [
            o("37.2.1", "Describe the stationary phase, mobile phase and retention time."),
            o("37.2.2", "Interpret gas chromatograms to find the percentage composition of a mixture."),
            o("37.2.3", "Explain retention times by interaction with the stationary phase."),
          ],
        }),
        sub("analysis-a.c13-nmr", "37.3", "Carbon-13 NMR spectroscopy", {
          stage: ALO,
          covers: ["achem.analysis.carbon-13-nmr"],
          objectives: [
            o("37.3.1", "Analyse a 13C NMR spectrum to deduce carbon environments and possible structures."),
            o("37.3.2", "Predict or explain the number of peaks for a given molecule."),
          ],
        }),
        sub("analysis-a.proton-nmr", "37.4", "Proton (1H) NMR spectroscopy", {
          stage: ALO,
          covers: ["achem.analysis.proton-nmr"],
          objectives: [
            o("37.4.1", "Analyse a 1H NMR spectrum: environments, relative numbers of protons, splitting by the n + 1 rule and possible structures."),
            o("37.4.2", "Predict chemical shifts and splitting patterns for a given molecule."),
            o("37.4.3", "Describe the use of TMS as the standard."),
            o("37.4.4", "State the need for deuterated solvents such as CDCl₃."),
            o("37.4.5", "Describe the identification of O–H and N–H protons by D₂O exchange."),
          ],
        }),
      ],
    }),
  ],
});

const PRACTICAL = section("practical-skills", "PS", "Practical skills", {
  description: "Not a content section of the syllabus: our grouping of the Practical assessment section (Papers 3 and 5) and the Mathematical requirements.",
  children: [
    topic("practical-skills.paper-3", "P3", "Advanced practical skills (Paper 3)", {
      components: ["3"],
      description: "AS Level: manipulation, measurement and observation; presentation of data and observations; analysis, conclusions and evaluation.",
      children: [
        sub("practical-skills.paper-3.quantitative", "P3.1", "Quantitative experiments: measurement, presentation and analysis", {
          stage: ASL,
          covers: ["achem.skills.quantitative-practical"],
          objectives: [
            o("P3.1.1", "Carry out titrations (acid-alkali, manganate(VII), thiosulfate-iodine) to concordant titres, and rates, gravimetric, thermometric and gas-volume experiments."),
            o("P3.1.2", "Record raw data to the precision of the apparatus in a single well-headed table and process it to the correct significant figures."),
            o("P3.1.3", "Plot graphs to the stated conventions, find gradients and intercepts, and draw conclusions."),
            o("P3.1.4", "Identify systematic and random errors, calculate percentage uncertainty and suggest improvements."),
          ],
        }),
        sub("practical-skills.paper-3.qualitative", "P3.2", "Qualitative analysis", {
          stage: ASL,
          covers: ["achem.skills.qualitative-analysis"],
          objectives: [
            o("P3.2.1", "Carry out tests from the qualitative analysis notes on unknown substances, safely and in appropriate quantities."),
            o("P3.2.2", "Record observations precisely and deduce the ions, gases or functional groups present."),
            o("P3.2.3", "Select reagents to distinguish between given ions and decide when confirmatory tests are needed."),
          ],
        }),
      ],
    }),
    topic("practical-skills.paper-5", "P5", "Planning, analysis and evaluation (Paper 5)", {
      components: ["5"],
      description: "A Level: planning, analysis, conclusions and evaluation in contexts that may lie outside the syllabus content.",
      children: [
        sub("practical-skills.paper-5.planning", "P5.1", "Planning, analysis and evaluation", {
          stage: ALO,
          covers: ["achem.skills.planning-evaluation"],
          objectives: [
            o("P5.1.1", "Define the problem: prediction, independent, dependent and controlled variables, and a safe, reliable procedure with risks identified."),
            o("P5.1.2", "Describe a method in full: apparatus, quantities and concentrations, standard laboratory practice, controls and results tables."),
            o("P5.1.3", "Process data: calculations, appropriate graphs, gradient and intercept of y = mx + c, percentage error, significant figures."),
            o("P5.1.4", "Draw conclusions and evaluate anomalies, replication, range, control of variables, weaknesses and confidence."),
          ],
        }),
      ],
    }),
  ],
});

export const c9701 = {
  board: "cambridge",
  qualification: "a-level",
  subject: "chemistry",
  versionLabel: "2025-2027",
  family: "chemistry-a",
  title: "Cambridge International AS & A Level Chemistry (9701)",
  code: "9701",
  effectiveFrom: "2025-01-01",
  effectiveTo: "2027-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge International AS & A Level Chemistry 9701 syllabus for 2025, 2026 and 2027 (version 1, published September 2022)",
    url: "https://www.cambridgeinternational.org/Images/664563-2025-2027-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Topic and sub-topic headings (1 Atomic structure ... 37.4 Proton (1H) NMR spectroscopy) are transcribed with their printed numbers; objective codes are the printed learning-outcome references (topic, sub-topic, outcome number, e.g. 26.1.4, as the syllabus cross-refers). Objectives paraphrase the learning outcomes in our own words, and some lettered sub-outcomes are combined under their outcome number. The three sections and the practical-skills topics P3 and P5 (codes P3.1 ... P5.1.4) are ours, summarising the Practical assessment section and the Mathematical requirements. No syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-09): the official PDF 'Cambridge International AS & A Level Chemistry 9701 syllabus for 2025, 2026 and 2027', version 1, published September 2022, read through a pdftotext rendering (subscripts and some symbols are lost in it). Exams in the June and November series (March for India). Check the headings and objective codes against the PDF.",
    "Routes as printed: AS Level only (Papers 1, 2 and 3 in one series; grades a-e); A Level staged over two years (AS in year 1, carried forward, then Papers 4 and 5); A Level in one series (all five papers; grades A*-E). Route A here covers both A Level routes.",
    "Weightings: Paper 1 31% of AS and 15.5% of A Level; Paper 2 46% and 23%; Paper 3 23% and 11.5%; Paper 4 38.5% of A Level; Paper 5 11.5% of A Level. weightingPercent records the A Level share; the AS shares are in each paper's description.",
    "Topics 1-22 are AS content (Papers 1 and 2, assumed knowledge for Paper 4); topics 23-37 are A Level only (Paper 4). Electrode potentials, electrolysis, pH calculations, buffers, Ksp, rate equations, Born-Haber cycles, transition elements, arenes, phenol, acyl chlorides, amines (beyond their formation from halogenoalkanes), condensation polymers, chromatography and NMR are therefore A Level only for Cambridge although ZIMSEC teaches several of them in Form 5. Concept descriptions say which parts are A Level only.",
    "Paper 3 (40 marks, two or three questions): one observational (qualitative analysis) question with the qualitative analysis notes provided, and one or more quantitative questions (titration or measurement of time, temperature, mass or gas volume); at least 12 + 6 marks for manipulation, measurement and observation, 10 for presentation and 12 for analysis, conclusions and evaluation, the rest varying. Paper 5 (30 marks, two or more questions): at least 12 marks planning and 12 analysis, conclusions and evaluation; no laboratory work; contexts may lie outside the syllabus content. The practical paper cannot be simulated; written items practise its skills.",
    "A Data section (constants, ionisation energies, bond energies, standard electrode potentials, electronegativities, NMR and IR tables, Periodic Table with relative atomic masses) is printed in the syllabus and used in the examinations: R = 8.31 J K⁻¹ mol⁻¹, F = 9.65 × 10⁴ C mol⁻¹, L = 6.022 × 10²³ mol⁻¹, e = −1.60 × 10⁻¹⁹ C, Vm = 22.4 dm³ mol⁻¹ at s.t.p. (101 kPa, 273 K) and 24.0 dm³ mol⁻¹ at room conditions, Kw = 1.00 × 10⁻¹⁴ mol² dm⁻⁶ at 298 K, c(water) = 4.18 J g⁻¹ K⁻¹.",
    "Paper 2 and Paper 4 question structures and part marks are not printed in the syllabus; our practice exam-format items use a convention that a reviewer must check against recent papers.",
    "Nodes without covers (1.2, 2.2, 3.1, 3.3, 3.7, 8.1, 8.3, 9.3, 11.2, 13.3, 19.1, 23.4, 29.1, 29.2, 32.1, 33.2, 35.2) are taught in the lesson named in their description.",
    "This syllabus is for examination in 2025-2027. Candidates from 2028 will follow a later syllabus (not in the repository); check the Cambridge website for it and add a new version file.",
  ],
  overview: "Cambridge International AS & A Level Chemistry (9701) is a two-stage course. The AS Level content (topics 1-22) covers atomic structure, stoichiometry, bonding, states of matter, energetics, redox, equilibria and acid-base theory, kinetics, Period 3, Groups 2 and 17, nitrogen and sulfur, the main aliphatic organic functional groups with their mechanisms, addition polymers, synthesis, and infrared and mass spectrometry. The A Level content (topics 23-37) adds lattice and solution energetics, entropy and Gibbs free energy, electrochemistry with the Nernst equation, quantitative acid-base and solubility equilibria, rate equations and catalysis, the transition elements, aromatic chemistry, acyl chlorides, amines, amides and amino acids, condensation polymers, multi-step synthesis, chromatography and NMR spectroscopy, together with practical skills of planning, analysis and evaluation.",
  assessmentOverview: "AS Level candidates take Paper 1 Multiple Choice (1 hour 15 minutes, 40 marks), Paper 2 AS Level Structured Questions (1 hour 15 minutes, 60 marks) and Paper 3 Advanced Practical Skills (2 hours, 40 marks). A Level candidates also take Paper 4 A Level Structured Questions (2 hours, 100 marks) and Paper 5 Planning, Analysis and Evaluation (1 hour 15 minutes, 30 marks), in the same series or a later one, carrying forward their AS result.",
  components: [
    { code: "1", name: "Paper 1: Multiple Choice", kind: "MULTIPLE_CHOICE", description: "40 four-choice multiple-choice questions on the AS Level content (AO1 and AO2). 31% of AS Level, 15.5% of A Level.", durationMinutes: 75, maxMarks: 40, weightingPercent: 15.5, calculatorAllowed: true },
    { code: "2", name: "Paper 2: AS Level Structured Questions", kind: "WRITTEN", description: "Structured questions on the AS Level content (AO1 and AO2). 46% of AS Level, 23% of A Level.", durationMinutes: 75, maxMarks: 60, weightingPercent: 23, calculatorAllowed: true },
    { code: "3", name: "Paper 3: Advanced Practical Skills", kind: "PRACTICAL", description: "A laboratory practical test of two or three questions (AO3): a qualitative analysis problem and quantitative work (titration or measurement). 23% of AS Level, 11.5% of A Level.", durationMinutes: 120, maxMarks: 40, weightingPercent: 11.5, calculatorAllowed: true },
    { code: "4", name: "Paper 4: A Level Structured Questions", kind: "WRITTEN", description: "Structured questions on the A Level content, with AS Level content assumed (AO1 and AO2). 38.5% of A Level.", durationMinutes: 120, maxMarks: 100, weightingPercent: 38.5, calculatorAllowed: true },
    { code: "5", name: "Paper 5: Planning, Analysis and Evaluation", kind: "WRITTEN", description: "A written paper of two or more questions on planning experiments and analysing and evaluating given data (AO3); no laboratory work. 11.5% of A Level.", durationMinutes: 75, maxMarks: 30, weightingPercent: 11.5, calculatorAllowed: true },
  ],
  routes: [
    { code: "AS", name: "AS Level", description: "Papers 1, 2 and 3 (grades a-e). Also the first year of the staged A Level route.", components: ["1", "2", "3"] },
    { code: "A", name: "A Level", description: "All five papers, in one series or staged (AS Level carried forward, then Papers 4 and 5) (grades A*-E).", isDefault: true, components: ["1", "2", "3", "4", "5"] },
  ],
  topics: [AS_CONTENT, A_CONTENT, PRACTICAL],
};
