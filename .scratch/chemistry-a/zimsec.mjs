// ZIMSEC A-Level Chemistry, Forms 5-6, 2015-2022 (Ministry of Primary and Secondary Education syllabus). Imported by
// build-syllabi.mjs. Top-level SECTION nodes are the four areas of the topic list (6.1 Physical, 6.2 Inorganic,
// 6.3 Organic, 6.4 Applied Chemistry) with their printed numbers; TOPIC nodes are the topics listed under each area, in
// the printed order (codes 6.1.1 ... are ours: the document lists them as dashes); SUBTOPIC nodes group the items of the
// competency matrix "content" column (names as printed, adjacent items grouped; codes ours). The form of each sub-topic
// comes from the competency matrix (Form 5 syllabus: 8.1 Physical and 8.2 Inorganic; Form 6 syllabus: 8.3 Physical,
// 8.4 Organic and 8.5 Applied). Objective codes are ours (sub-topic code + .n); objective statements paraphrase the
// matrix objectives. The Practical skills node "P" is ours, from the Paper 4 description and practical guidelines.
import { section, topic, sub } from "./nodes.mjs";

const F5 = "Form 5";
const F6 = "Form 6";
const F56 = "Forms 5-6";
const THEORY = ["1", "2", "3"];

const PHYSICAL = section("physical", "6.1", "Physical Chemistry", {
  description: "Paper 3 Section A is based mainly on this area.",
  children: [
    topic("stoichiometry", "6.1.1", "Atoms, Molecules and Stoichiometry", {
      description: "Form 5 (relative masses, mass spectra, the mole, formulae, stoichiometric calculations) and Form 6 (reaction ratios, titration, percentage yield and purity).",
      components: THEORY,
      children: [
        sub("stoichiometry.relative-masses", "6.1.1.1", "Relative masses of atoms and molecules; the mole and the Avogadro constant", {
          form: F5,
          covers: ["achem.stoich.relative-masses-mole"],
          objectives: [
            "Explain relative atomic, isotopic, molecular and formula mass.",
            "Relate the mole to the Avogadro constant and calculate amounts and numbers of particles.",
            "Calculate relative atomic mass from isotopic abundances.",
          ],
        }),
        sub("stoichiometry.mass-spectra", "6.1.1.2", "Mass spectra", {
          form: F5,
          covers: ["achem.analysis.mass-spectrometry"],
          objectives: ["Analyse mass spectra in terms of isotopic abundances and molecular fragments."],
        }),
        sub("stoichiometry.formulae", "6.1.1.3", "Empirical and molecular formulae", {
          form: F5,
          covers: ["achem.stoich.formulae-equations"],
          objectives: [
            "Determine empirical and molecular formulae from combustion data or composition by mass.",
            "Construct balanced equations.",
          ],
        }),
        sub("stoichiometry.calculations", "6.1.1.4", "Stoichiometric calculations and reaction ratios; percentage yield and percentage purity", {
          form: F56,
          covers: ["achem.stoich.reacting-masses-yield"],
          objectives: [
            "Use the mole concept to calculate reacting masses and volumes of gases (Form 5, revisited in Form 6).",
            "Determine stoichiometric relationships from calculations and experimental data.",
            "Calculate percentage yield and percentage purity (Form 6).",
          ],
        }),
        sub("stoichiometry.titration", "6.1.1.5", "Titration", {
          form: F6,
          covers: ["achem.stoich.solutions-titrations"],
          objectives: [
            "Calculate volumes and concentrations of solutions with the mole concept.",
            "Perform acid-base titrations and deduce stoichiometric relationships from the results.",
          ],
        }),
      ],
    }),
    topic("atomic-structure", "6.1.2", "Atomic Structure", {
      description: "Form 5.",
      components: THEORY,
      children: [
        sub("atomic-structure.particles", "6.1.2.1", "Sub-atomic particles", {
          form: F5,
          covers: ["achem.atoms.particles-isotopes"],
          objectives: ["Describe the behaviour of sub-atomic particles (and ions) in an electric field."],
        }),
        sub("atomic-structure.configurations", "6.1.2.2", "Electronic configurations", {
          form: F5,
          covers: ["achem.atoms.orbitals-configurations"],
          objectives: [
            "Describe the electronic configuration of elements in terms of s, p and d orbitals for principal quantum numbers 1, 2 and 3.",
            "Describe the shapes of s and p orbitals.",
          ],
        }),
        sub("atomic-structure.ionisation-energy", "6.1.2.3", "Ionisation energy", {
          form: F5,
          covers: ["achem.atoms.ionisation-energy"],
          objectives: ["Explain the term ionisation energy.", "Deduce electronic configuration from successive ionisation energy data."],
        }),
      ],
    }),
    topic("bonding", "6.1.3", "Chemical Bonding", {
      description: "Form 5.",
      components: THEORY,
      children: [
        sub("bonding.ionic-metallic", "6.1.3.1", "Ionic bonding and metallic bonding", {
          form: F5,
          covers: ["achem.bonding.ionic-metallic"],
          objectives: [
            "Describe ionic bonding in sodium chloride, magnesium oxide and aluminium oxide, with dot-and-cross diagrams.",
            "Describe metallic bonding as a lattice of positive ions surrounded by mobile electrons.",
            "Describe, interpret and predict the effect of the type of bonding on physical properties.",
          ],
        }),
        sub("bonding.covalent", "6.1.3.2", "Covalent bonding, bond reactivity and dative bonding", {
          form: F5,
          covers: ["achem.bonding.covalent-dative", "achem.bonding.orbitals-hybridisation"],
          objectives: [
            "Describe covalent bonding in hydrogen, oxygen, chlorine, carbon dioxide, hydrogen chloride, ethane, ethene and benzene in terms of orbital overlap.",
            "Compare the reactivity of covalent bonds using bond length, bond energy and bond polarity.",
            "Describe dative bonding in the ammonium ion and in aluminium chloride (Al₂Cl₆).",
          ],
        }),
        sub("bonding.shapes", "6.1.3.3", "Shapes of molecules", {
          form: F5,
          covers: ["achem.bonding.shapes-vsepr"],
          objectives: ["Explain the shapes of, and bond angles in, molecules using valence shell electron pair repulsion (VSEPR) theory."],
        }),
        sub("bonding.intermolecular", "6.1.3.4", "Intermolecular forces: van der Waals' forces, hydrogen bonding and permanent dipoles", {
          form: F5,
          covers: ["achem.bonding.intermolecular-forces"],
          objectives: [
            "Describe intermolecular forces based on permanent and induced dipoles.",
            "Outline the importance of hydrogen bonding to the physical properties of substances.",
          ],
        }),
      ],
    }),
    topic("states-of-matter", "6.1.4", "States of Matter", {
      description: "Form 5.",
      components: THEORY,
      children: [
        sub("states-of-matter.gases", "6.1.4.1", "Gaseous state", {
          form: F5,
          covers: ["achem.states.gases"],
          objectives: [
            "State the basic assumptions of the kinetic theory as applied to an ideal gas.",
            "Explain how far the kinetic theory of gases applies to real gases.",
            "Use the general gas equation pV = nRT in calculations.",
          ],
        }),
        sub("states-of-matter.liquids-solids", "6.1.4.2", "Liquid state and solid state", {
          form: F5,
          covers: ["achem.states.lattice-structures"],
          objectives: [
            "Describe the liquid and solid states and their interconversion using a kinetic-molecular model.",
            "Describe the lattice structures of ionic, simple molecular, giant molecular, hydrogen-bonded and metallic crystalline solids (sodium chloride, iodine, ice, copper, silicon dioxide, diamond, graphite).",
          ],
        }),
      ],
    }),
    topic("energetics", "6.1.5", "Chemical Energetics", {
      description: "Form 5.",
      components: THEORY,
      children: [
        sub("energetics.enthalpy-changes", "6.1.5.1", "Enthalpy changes", {
          form: F5,
          covers: ["achem.energetics.enthalpy-calorimetry"],
          objectives: [
            "Explain that chemical reactions are accompanied by energy changes, mostly as heat.",
            "Explain enthalpy changes and standard enthalpy changes of reaction, formation, combustion, neutralisation, hydration and solution, and the terms bond energy, lattice energy and electron affinity.",
            "Calculate enthalpy changes from experimental results with q = mcΔT, including thermometric titrations.",
          ],
        }),
        sub("energetics.hess-born-haber", "6.1.5.2", "Hess' law and Born-Haber cycles", {
          form: F5,
          covers: ["achem.energetics.hess-bond-energies", "achem.energetics.born-haber"],
          objectives: [
            "Apply Hess' law to construct energy cycles and Born-Haber cycles.",
            "Calculate enthalpy changes using energy cycles and Born-Haber cycles.",
          ],
        }),
        sub("energetics.charge-density", "6.1.5.3", "Charge density", {
          form: F5,
          description: "Charge density is taught with lattice energy (Born-Haber lesson) and hydration enthalpy; the hydration and solution cycle is covered here.",
          covers: ["achem.energetics.solution-hydration"],
          objectives: ["Explain the factors (ionic charge and radius) affecting the size of lattice energy and hydration enthalpy."],
        }),
      ],
    }),
    topic("electrochemistry", "6.1.6", "Electrochemistry", {
      description: "Form 5 (redox, electrode potentials, electrolysis) and Form 6 (redox titration, fuel cells, quantitative electrolysis).",
      components: THEORY,
      children: [
        sub("electrochemistry.redox", "6.1.6.1", "Redox processes", {
          form: F5,
          covers: ["achem.electrochem.oxidation-numbers"],
          objectives: ["Describe redox processes in terms of electron transfer and changes in oxidation state."],
        }),
        sub("electrochemistry.electrode-potentials", "6.1.6.2", "Electrode potentials", {
          form: F5,
          covers: ["achem.electrochem.electrode-potentials"],
          objectives: [
            "Describe standard electrode potential and standard cell potential.",
            "Describe the measurement of electrode potentials using the standard hydrogen electrode.",
            "Calculate standard cell potentials and predict the feasibility of a reaction from them.",
          ],
        }),
        sub("electrochemistry.electrolysis", "6.1.6.3", "Electrolysis of acidified water", {
          form: F5,
          covers: ["achem.electrochem.electrolysis-products"],
          objectives: ["Predict the substance liberated during electrolysis from the state of the electrolyte, its position in the redox series and its concentration."],
        }),
        sub("electrochemistry.industrial", "6.1.6.4", "Electrolytic purification of copper/nickel; extraction of aluminium; production of chlorine from brine", {
          form: F5,
          covers: ["achem.electrochem.industrial-electrolysis"],
          objectives: ["Describe the production of hydrogen, oxygen, aluminium, copper, nickel and chlorine by electrolysis."],
        }),
        sub("electrochemistry.redox-titration", "6.1.6.5", "Redox titration", {
          form: F6,
          description: "The redox chemistry of transition-element complexes interpreted with E⦵ values (6.4.1) is taught in the same lesson.",
          covers: ["achem.electrochem.redox-titrations"],
          objectives: ["Use redox titration results in quantitative analysis."],
        }),
        sub("electrochemistry.fuel-cells", "6.1.6.6", "Fuel cells", {
          form: F6,
          covers: ["achem.electrochem.fuel-cells"],
          objectives: [
            "Describe how the hydrogen-oxygen fuel cell operates.",
            "Deduce the electrode reactions of a given fuel cell.",
            "Compare fuel cells with conventional cells.",
          ],
        }),
        sub("electrochemistry.quantitative", "6.1.6.7", "Quantitative electrolysis", {
          form: F6,
          covers: ["achem.electrochem.faraday"],
          objectives: [
            "Calculate the quantity of charge and the mass or volume of substance liberated during electrolysis, using F = Le.",
            "Describe how to determine a value of the Avogadro constant by an electrolytic method.",
          ],
        }),
      ],
    }),
    topic("equilibria", "6.1.7", "Equilibria", {
      description: "Form 5 (chemical and ionic equilibria) and Form 6 (buffer solutions and solubility products).",
      components: THEORY,
      children: [
        sub("equilibria.chemical", "6.1.7.1", "Chemical equilibria and factors affecting equilibrium", {
          form: F5,
          covers: ["achem.equilibria.dynamic-le-chatelier"],
          objectives: [
            "Explain reversible reaction and dynamic equilibrium.",
            "State Le Chatelier's principle and use it to deduce the effects of changes in temperature, concentration or pressure on a system at equilibrium.",
          ],
        }),
        sub("equilibria.constants", "6.1.7.2", "Equilibrium constants", {
          form: F5,
          covers: ["achem.equilibria.kc-kp"],
          objectives: [
            "Deduce expressions for equilibrium constants in terms of concentrations (Kc) and partial pressures (Kp).",
            "Calculate values of Kc and Kp and the quantities present at equilibrium.",
          ],
        }),
        sub("equilibria.bronsted-lowry", "6.1.7.3", "Brønsted-Lowry theory of acids and bases", {
          form: F5,
          covers: ["achem.acids.bronsted-lowry"],
          objectives: [
            "Apply the Brønsted-Lowry theory to define acids and bases.",
            "Distinguish strong and weak acids and bases by their extent of dissociation.",
          ],
        }),
        sub("equilibria.ph", "6.1.7.4", "pH and pOH", {
          form: F5,
          covers: ["achem.acids.ph-kw"],
          objectives: ["Calculate [H⁺(aq)] and pH for strong acids and bases.", "Explain and use pH, pOH, Kw and pKw in calculations."],
        }),
        sub("equilibria.dissociation-constants", "6.1.7.5", "Acid and base dissociation constants", {
          form: F5,
          covers: ["achem.acids.weak-acids-bases"],
          objectives: ["Calculate [H⁺(aq)] and pH for weak acids and bases.", "Explain and use Ka, pKa, Kb and pKb in calculations."],
        }),
        sub("equilibria.indicators-curves", "6.1.7.6", "Choice of indicators and titration curves", {
          form: F5,
          covers: ["achem.acids.titration-curves-indicators"],
          objectives: [
            "Explain the choice of a suitable indicator for an acid-base titration from given data.",
            "Describe graphically the changes in pH during acid-base titrations.",
          ],
        }),
        sub("equilibria.buffers", "6.1.7.7", "Buffer solutions", {
          form: F6,
          covers: ["achem.acids.buffers"],
          objectives: ["Explain how buffer solutions control pH, including blood and soil pH.", "Calculate the pH and/or pOH of buffer solutions."],
        }),
        sub("equilibria.solubility-product", "6.1.7.8", "Solubility products", {
          form: F6,
          covers: ["achem.acids.solubility-product"],
          objectives: ["Apply the concept of solubility product, Ksp.", "Calculate Ksp from concentrations and vice versa.", "Explain the common ion effect."],
        }),
      ],
    }),
    topic("kinetics", "6.1.8", "Reaction Kinetics", {
      description: "Form 5 (rates, rate equations, mechanisms) and Form 6 (catalysis).",
      components: THEORY,
      children: [
        sub("kinetics.rates", "6.1.8.1", "Reaction rates and factors affecting rates of reactions", {
          form: F5,
          covers: ["achem.kinetics.collisions-boltzmann"],
          objectives: [
            "Devise suitable experimental techniques for studying the rate of a reaction from given information.",
            "Explain rate of reaction, activation energy and catalysis.",
            "Explain, in terms of collisions and the Boltzmann distribution, the effects of concentration and temperature on rate.",
            "Explain that a catalyst provides a different mechanism of lower activation energy.",
          ],
        }),
        sub("kinetics.rate-equations", "6.1.8.2", "Rate equations", {
          form: F5,
          covers: ["achem.kinetics.rate-equations"],
          objectives: [
            "Explain rate equation, order of reaction, rate constant and half-life.",
            "Construct rate equations of the form rate = k[A]^m[B]^n with m and n equal to 0, 1 or 2.",
            "Calculate initial rate, half-life and rate constant.",
            "Deduce the order of reaction by the initial-rate method and from concentration-time graphs.",
            "Show graphically that the half-life of a first-order reaction is constant.",
          ],
        }),
        sub("kinetics.mechanisms", "6.1.8.3", "Mechanism of reactions", {
          form: F5,
          covers: ["achem.kinetics.mechanisms-rds"],
          objectives: ["Explain the rate-determining step.", "Deduce a mechanism from the order of reaction and vice versa."],
        }),
        sub("kinetics.catalysis", "6.1.8.4", "Catalysis: homogeneous and heterogeneous", {
          form: F6,
          covers: ["achem.kinetics.catalysis"],
          objectives: [
            "Outline the modes of action of homogeneous and heterogeneous catalysis: iron in the Haber process, catalytic removal of oxides of nitrogen from car exhausts, Fe²⁺ in the iodide-peroxodisulfate reaction and oxides of nitrogen in the oxidation of atmospheric sulfur dioxide.",
          ],
        }),
      ],
    }),
  ],
});

const INORGANIC = section("inorganic", "6.2", "Inorganic Chemistry", {
  description: "Form 5 (competency matrix 8.2). Paper 3 Section B is based mainly on this area.",
  children: [
    topic("period-3", "6.2.1", "Chemical Periodicity of Period 3", {
      description: "Form 5.",
      components: THEORY,
      children: [
        sub("period-3.physical", "6.2.1.1", "Variation in physical properties", {
          form: F5,
          covers: ["achem.periodicity.physical-properties"],
          objectives: [
            "Describe the variation in atomic radius, ionic radius, ionisation energy, melting point and electrical conductivity of the Period 3 elements.",
            "Explain the variation in atomic radius, ionic radius and first ionisation energy.",
            "Interpret the variation in melting point and electrical conductivity in terms of bonding and structure.",
          ],
        }),
        sub("period-3.chemical", "6.2.1.2", "Variation in chemical properties", {
          form: F5,
          covers: ["achem.periodicity.element-reactions", "achem.periodicity.oxides-chlorides"],
          objectives: [
            "Describe the reactions, if any, of the elements with oxygen, chlorine and water.",
            "Explain the variation in oxidation number of the oxides and chlorides.",
            "Describe the acid-base behaviour of the oxides and the reactions of the oxides and chlorides with water.",
            "Suggest the type of bonding in chlorides and oxides from their physical and chemical properties.",
          ],
        }),
      ],
    }),
    topic("group-2", "6.2.2", "Chemistry of Group II Elements", {
      description: "Form 5.",
      components: THEORY,
      children: [
        sub("group-2.trends-uses", "6.2.2.1", "Trends in physical and chemical properties; properties and uses of Group II compounds", {
          form: F5,
          covers: ["achem.group2.reactions-uses", "achem.group2.thermal-stability-solubility"],
          objectives: [
            "Interpret the trends in physical properties using data.",
            "Describe the reactions of the elements with oxygen and water and of the oxides with water.",
            "Explain the variation in thermal decomposition of the carbonates and nitrates.",
            "Explain the variation in solubility of the sulfates.",
            "State the properties and uses of Group II compounds (magnesium oxide, calcium oxide, calcium carbonate, calcium sulfate, barium sulfate, magnesium hydroxide and magnesium trisilicate).",
          ],
        }),
      ],
    }),
    topic("group-4", "6.2.3", "Chemistry of Group IV Elements", {
      description: "Form 5.",
      components: THEORY,
      children: [
        sub("group-4.physical-uses", "6.2.3.1", "Trends in physical properties; properties and uses of Group IV elements and compounds", {
          form: F5,
          covers: ["achem.group14.elements-uses"],
          objectives: [
            "Explain the variations in melting point and electrical conductivity of the elements.",
            "Recognise the properties and uses of the elements and their compounds (glass, ceramics, dental fillings, diamond, graphite, tetrachloromethane).",
          ],
        }),
        sub("group-4.chemical", "6.2.3.2", "Trends in chemical properties", {
          form: F5,
          covers: ["achem.group14.oxides-chlorides"],
          objectives: [
            "Explain the variations in bonding, acid-base nature and thermal stability of the oxides in oxidation states II and IV.",
            "Describe the bonding, molecular shape and volatility of the tetrachlorides and explain their reactions with water in terms of structure and bonding.",
            "Describe the relative stability of the higher and lower oxidation states in the oxides and in aqueous solution.",
          ],
        }),
      ],
    }),
    topic("group-7", "6.2.4", "Chemistry of Group VII Elements", {
      description: "Form 5.",
      components: THEORY,
      children: [
        sub("group-7.physical", "6.2.4.1", "Trends in physical properties", {
          form: F5,
          covers: ["achem.group17.properties-reactivity"],
          objectives: [
            "Describe the trends in volatility and colour of chlorine, bromine and iodine and interpret volatility in terms of van der Waals' forces.",
            "Explain the relative reactivity of the elements as oxidising agents with reference to E⦵ values.",
            "Explain the reactions of the elements with hydrogen and the relative thermal stabilities of the hydrides in terms of bond energies.",
          ],
        }),
        sub("group-7.chemical", "6.2.4.2", "Trends in chemical properties", {
          form: F5,
          covers: ["achem.group17.halide-ions"],
          objectives: ["Describe the reactions of halide ions with silver ions followed by aqueous ammonia, and with concentrated sulfuric acid."],
        }),
        sub("group-7.uses", "6.2.4.3", "Properties and uses of Group VII elements and compounds", {
          form: F5,
          covers: ["achem.group17.chlorine-uses"],
          objectives: [
            "Describe the reaction of chlorine with cold and with hot aqueous sodium hydroxide.",
            "Explain the industrial importance and environmental significance of the halogens and their compounds (bleaches, PVC, halogenated solvents, refrigerants, aerosols, chlorine in water purification).",
          ],
        }),
      ],
    }),
  ],
});

const ORGANIC = section("organic", "6.3", "Organic Chemistry", {
  description: "Form 6 (competency matrix 8.4). Paper 3 Section C is based mainly on this area.",
  children: [
    topic("hydrocarbons", "6.3.1", "Hydrocarbons", {
      description: "Form 6.",
      components: THEORY,
      children: [
        sub("hydrocarbons.nomenclature-isomerism", "6.3.1.1", "Nomenclature and isomerism", {
          form: F6,
          covers: ["achem.organic.nomenclature-formulas", "achem.organic.isomerism"],
          objectives: [
            "Use the nomenclature, structural formulae and displayed formulae of hydrocarbons from C1 to C10.",
            "Describe the forms of isomerism found in hydrocarbons.",
          ],
        }),
        sub("hydrocarbons.preparation-properties", "6.3.1.2", "Preparation and occurrence; physical properties", {
          form: F6,
          covers: ["achem.hydrocarbons.alkanes-crude-oil"],
          objectives: [
            "Explain the use of crude oil and natural gas as sources of hydrocarbons.",
            "Explain the decrease in volatility with increasing carbon chain length.",
          ],
        }),
        sub("hydrocarbons.chemical", "6.3.1.3", "Chemical properties", {
          form: F6,
          covers: ["achem.hydrocarbons.alkenes-reactions", "achem.hydrocarbons.benzene-structure", "achem.hydrocarbons.arenes-reactions"],
          objectives: [
            "Describe the chemical reactions of alkanes (combustion, substitution by chlorine), alkenes (addition of steam, hydrogen halides, halogens and hydrogen; oxidation by cold dilute and hot concentrated manganate(VII); polymerisation) and arenes (bromination, nitration, side-chain oxidation of methylbenzene).",
            "Predict whether halogenation of an arene occurs in the side chain or in the aromatic nucleus.",
          ],
        }),
        sub("hydrocarbons.mechanisms", "6.3.1.4", "Reaction mechanisms", {
          form: F6,
          covers: ["achem.organic.reaction-types", "achem.hydrocarbons.free-radical-substitution", "achem.hydrocarbons.electrophilic-addition", "achem.hydrocarbons.electrophilic-substitution"],
          objectives: ["Describe the mechanisms of free-radical substitution, electrophilic addition and electrophilic substitution."],
        }),
      ],
    }),
    topic("halogen-derivatives", "6.3.2", "Halogen Derivatives", {
      description: "Form 6.",
      components: THEORY,
      children: [
        sub("halogen-derivatives.properties", "6.3.2.1", "Nomenclature, isomerism and chemical properties", {
          form: F6,
          covers: ["achem.halogen.halogenoalkane-reactions", "achem.halogen.sn1-sn2"],
          objectives: [
            "Use the nomenclature and displayed formulae of halogenoalkanes and halogenoarenes, and describe their isomerism.",
            "Describe the nucleophilic substitution reactions of bromoethane: hydrolysis, formation of nitriles and formation of primary amines with ammonia.",
            "Describe the SN1 and SN2 mechanisms of nucleophilic substitution in halogenoalkanes.",
            "Explain the elimination of hydrogen bromide from 2-bromopropane.",
          ],
        }),
        sub("halogen-derivatives.uses", "6.3.2.2", "Uses and environmental impact", {
          form: F6,
          description: "The lower reactivity of chlorobenzene is taught in the same lesson.",
          covers: ["achem.halogen.halogenoarenes-cfcs"],
          objectives: [
            "Interpret the different reactivities of halogenoalkanes and chlorobenzene, with reference to hydrolysis and the strengths of the C–Hal bonds.",
            "Explain the uses of fluoroalkanes and fluorohalogenoalkanes from their relative chemical inertness.",
            "Recognise the concern about the effect of chlorofluoroalkanes on the ozone layer.",
          ],
        }),
      ],
    }),
    topic("hydroxy-compounds", "6.3.3", "Hydroxy Compounds", {
      description: "Form 6.",
      components: THEORY,
      children: [
        sub("hydroxy-compounds.structure", "6.3.3.1", "Nomenclature, isomerism, manufacture of ethanol and physical properties", {
          form: F6,
          covers: ["achem.hydroxy.alcohols-structure", "achem.organic.optical-isomerism-drugs"],
          objectives: [
            "Use nomenclature and displayed formulae to describe primary, secondary and tertiary alcohols.",
            "Describe the isomerism associated with alcohols, including optical and structural isomers.",
            "Describe the manufacture of ethanol by fermentation.",
            "Explain the physical properties of hydroxy compounds in terms of bonding.",
          ],
        }),
        sub("hydroxy-compounds.alcohols", "6.3.3.2", "Chemical properties of alcohols", {
          form: F6,
          covers: ["achem.hydroxy.alcohol-reactions"],
          objectives: [
            "Describe the reactions of ethanol: combustion, substitution to halogenoalkanes, reaction with sodium, oxidation to carbonyl compounds and carboxylic acids, dehydration and ester formation.",
            "Distinguish primary, secondary and tertiary alcohols by oxidation.",
            "Describe the reaction of CH₃CH(OH)– alcohols with alkaline aqueous iodine.",
          ],
        }),
        sub("hydroxy-compounds.phenols", "6.3.3.3", "Chemical properties of phenols", {
          form: F6,
          covers: ["achem.hydroxy.phenol"],
          objectives: [
            "Describe the reactions of phenol with bases and sodium, and the nitration and bromination of its aromatic ring.",
            "Explain the relative acidities of water, phenol and ethanol.",
          ],
        }),
      ],
    }),
    topic("carbonyl-compounds", "6.3.4", "Carbonyl Compounds", {
      description: "Form 6.",
      components: THEORY,
      children: [
        sub("carbonyl-compounds.preparation", "6.3.4.1", "Nomenclature, isomerism and preparation", {
          form: F6,
          covers: ["achem.carbonyl.aldehydes-ketones"],
          objectives: [
            "Use nomenclature and displayed formulae to describe aldehydes and ketones and explain their isomerism.",
            "Describe the formation of aldehydes and ketones from primary and secondary alcohols.",
            "Describe the reduction of aldehydes and ketones with NaBH₄.",
            "Suggest a suitable test for a given carbonyl compound (2,4-DNPH, Fehling's solution, alkaline iodine, Tollens' reagent).",
          ],
        }),
        sub("carbonyl-compounds.chemical", "6.3.4.2", "Chemical properties: nucleophilic addition", {
          form: F6,
          covers: ["achem.carbonyl.nucleophilic-addition"],
          objectives: ["Outline the mechanism of the nucleophilic addition of hydrogen cyanide to aldehydes and ketones."],
        }),
      ],
    }),
    topic("carboxylic-acids", "6.3.5", "Carboxylic Acids and Derivatives", {
      description: "Form 6.",
      components: THEORY,
      children: [
        sub("carboxylic-acids.preparation", "6.3.5.1", "Nomenclature, preparation and occurrence", {
          form: F6,
          covers: ["achem.carboxylic.acids-reactions"],
          objectives: [
            "Interpret the nomenclature and formulae of carboxylic acids and their derivatives.",
            "Describe the formation of carboxylic acids from alcohols, aldehydes and nitriles.",
            "Recall the reactions of carboxylic acids that form salts, esters and acyl chlorides.",
          ],
        }),
        sub("carboxylic-acids.chemical", "6.3.5.2", "Chemical properties", {
          form: F6,
          covers: ["achem.carboxylic.acidity-further-reactions", "achem.carboxylic.acyl-chlorides"],
          objectives: [
            "Explain the acidity of carboxylic acids and of chlorine-substituted ethanoic acids in terms of their structures.",
            "Describe the reactions of acyl chlorides with water, alcohols, phenols and primary amines.",
            "Explain the relative ease of hydrolysis of acyl chlorides, alkyl chlorides and aryl chlorides.",
            "Illustrate the formation of esters from carboxylic acids or acyl chlorides, using ethyl ethanoate and phenyl benzoate.",
          ],
        }),
        sub("carboxylic-acids.uses", "6.3.5.3", "Uses of carboxylic acids and esters", {
          form: F6,
          covers: ["achem.carboxylic.esters"],
          objectives: ["Describe the acid and base hydrolysis of esters, including making soap from fats and oils.", "State the uses of carboxylic acids and esters."],
        }),
      ],
    }),
    topic("nitrogen-compounds", "6.3.6", "Nitrogen Compounds", {
      description: "Form 6. In the copy read, the amide and amino-acid objectives are printed on the page headed Polymerisation; they are placed here.",
      components: THEORY,
      children: [
        sub("nitrogen-compounds.preparation", "6.3.6.1", "Preparation and occurrence", {
          form: F6,
          covers: ["achem.amines.preparation-basicity", "achem.amines.nitriles"],
          objectives: [
            "Describe the formation of ethylamine by reduction of a nitrile and of phenylamine by reduction of nitrobenzene.",
            "Explain the relative basicity of ammonia, alkylamines and phenylamine in terms of their structures.",
          ],
        }),
        sub("nitrogen-compounds.chemical", "6.3.6.2", "Chemical properties; dyestuff", {
          form: F6,
          covers: ["achem.amines.phenylamine-azo"],
          objectives: [
            "Describe the reactions of phenylamine with aqueous bromine and with nitrous acid, and the hydrolysis of the diazonium salt to phenol.",
            "Describe the coupling of benzenediazonium chloride with phenol and the use of similar reactions to make dyestuffs.",
          ],
        }),
        sub("nitrogen-compounds.amides", "6.3.6.3", "Amides", {
          form: F6,
          covers: ["achem.amines.amides"],
          objectives: ["Describe the formation of amides from RNH₂ and R'COCl.", "Describe the acid and base hydrolysis of amides."],
        }),
        sub("nitrogen-compounds.amino-acids", "6.3.6.4", "Amino acids and proteins", {
          form: F6,
          covers: ["achem.amines.amino-acids"],
          objectives: [
            "Investigate the acid-base properties of amino acids and the formation of zwitterions, including from titration curves.",
            "Illustrate the formation of peptide bonds in polypeptides and proteins.",
            "Describe the hydrolysis of proteins.",
          ],
        }),
      ],
    }),
    topic("polymerisation", "6.3.7", "Polymerisation", {
      description: "Form 6.",
      components: THEORY,
      children: [
        sub("polymerisation.types", "6.3.7.1", "Types of polymerisation: addition and condensation", {
          form: F6,
          covers: ["achem.polymers.addition", "achem.polymers.condensation"],
          objectives: [
            "Describe the characteristics of addition polymers such as poly(ethene) and PVC.",
            "Explain condensation polymerisation in polyesters and polyamides.",
            "Predict the type of polymerisation for a given monomer or pair of monomers.",
            "Deduce the repeat unit of a polymer from its monomer(s) and identify the monomer(s) in a section of polymer.",
          ],
        }),
        sub("polymerisation.uses", "6.3.7.2", "Uses of polymers", {
          form: F6,
          covers: ["achem.polymers.uses-degradability"],
          objectives: ["Recognise the uses of polymers."],
        }),
      ],
    }),
  ],
});

const APPLIED = section("applied", "6.4", "Applied Chemistry", {
  description: "Form 6 (competency matrix 8.5), except Chemistry of Nitrogen and Sulphur, which the matrix teaches in Form 5 under Inorganic Chemistry. Paper 3 Section D is based mainly on this area.",
  children: [
    topic("transition-elements", "6.4.1", "Transition Elements", {
      description: "Form 6: general properties, then vanadium, chromium, manganese, iron, cobalt, nickel, copper and the platinum group metals.",
      components: THEORY,
      children: [
        sub("transition-elements.properties", "6.4.1.1", "Characteristic properties; variable oxidation state; catalysis; magnetism", {
          form: F6,
          description: "Redox reactions of complexes in terms of E⦵ values are taught with redox titrations (6.1.6.5).",
          covers: ["achem.transition.general-properties"],
          objectives: [
            "Explain what is meant by a transition element (a d-block element forming one or more stable ions with incomplete d orbitals).",
            "Analyse the electronic configurations of the first-row transition elements and their ions.",
            "Recognise that atomic radii, ionic radii and first ionisation energies of the transition metals are relatively invariant, and contrast their properties with calcium.",
            "Describe the tendency of transition elements to have variable oxidation states.",
            "Explain the magnetic properties of transition metals and their complexes in terms of paired and unpaired d electrons.",
          ],
        }),
        sub("transition-elements.complexes", "6.4.1.2", "Complex formation", {
          form: F6,
          covers: ["achem.transition.complexes-ligands", "achem.transition.stereoisomerism", "achem.transition.stability-constants"],
          objectives: [
            "Explain the formation of complexes in terms of coordinate bonds.",
            "Describe the shapes of four-fold and six-fold complexes and the types of isomerism complexes may show.",
            "Explain ligand exchange in terms of competing equilibria and stability constants.",
            "Explain redox reactions of complexes in terms of E⦵ values and interpret the effect of ligand exchange on E⦵ values.",
          ],
        }),
        sub("transition-elements.colour", "6.4.1.3", "Colour concept", {
          form: F6,
          covers: ["achem.transition.colour"],
          objectives: [
            "Explain, in terms of d-orbital splitting, why transition element complexes are usually coloured.",
            "Explain colour changes of complexes caused by ligand exchange.",
          ],
        }),
        sub("transition-elements.vanadium-chromium", "6.4.1.4", "Vanadium and chromium", {
          form: F6,
          covers: ["achem.transition.vanadium-chromium"],
          objectives: [
            "Describe the occurrence, relative stability and colours of vanadium ions and compounds, and the uses of vanadium and its compounds.",
            "Describe the occurrence, relative stability and colours of chromium(III) and chromium(VI) ions and compounds, and the uses of chromium and its compounds.",
            "Describe the use of dichromate(VI) as an oxidising agent and the chromate(VI)-dichromate(VI) interconversion with dilute acid and alkali.",
          ],
        }),
        sub("transition-elements.manganese", "6.4.1.5", "Manganese", {
          form: F6,
          covers: ["achem.transition.manganese"],
          objectives: [
            "Describe the occurrence, relative stability and colours of manganese ions and compounds in the +2, +4, +6 and +7 oxidation states.",
            "Demonstrate redox reactions involving MnO₂, MnO₄²⁻ and MnO₄⁻.",
          ],
        }),
        sub("transition-elements.iron", "6.4.1.6", "Iron", {
          form: F6,
          covers: ["achem.transition.iron"],
          objectives: [
            "Describe the occurrence, extraction, relative stability and colours of iron compounds.",
            "Describe the effect of pH and of the cyanide ligand on the stability of iron and its ions.",
            "Explain the biochemical importance of iron in haemoglobin and in cytochromes.",
            "Analyse the rusting of iron and its prevention.",
            "Distinguish Fe²⁺(aq) and Fe³⁺(aq) using Fe(CN)₆³⁻(aq) and SCN⁻(aq), and describe the uses of iron and its compounds.",
          ],
        }),
        sub("transition-elements.cobalt-nickel", "6.4.1.7", "Cobalt and nickel", {
          form: F6,
          covers: ["achem.transition.cobalt-nickel"],
          objectives: [
            "Describe the occurrence, relative stability and colours of cobalt ions and compounds in the +2 and +3 oxidation states.",
            "Explain the effect of ligands and temperature on the stability and geometry of cobalt complexes ([Co(H₂O)₆]²⁺, [CoCl₄]²⁻, [Co(NH₃)₆]²⁺, [Co(NH₃)₆]³⁺).",
            "Explain the uses of cobalt in alloys, of anhydrous cobalt(II) ions as a test for water, and its biochemical importance.",
            "Describe the occurrence, production and purification of nickel from its sulfide ore, and its uses in alloys and as a hydrogenation catalyst.",
          ],
        }),
        sub("transition-elements.copper", "6.4.1.8", "Copper", {
          form: F6,
          covers: ["achem.transition.copper"],
          objectives: [
            "Describe the occurrence, production and purification of copper.",
            "Describe the relative stability of copper(I) and copper(II) ions and compounds, including the disproportionation and stabilisation of Cu⁺(aq).",
            "Describe the reaction of Cu²⁺(aq) with I⁻(aq).",
            "Explain the uses of copper and its compounds (brass, bronze, other alloys, the test for aldehydes).",
          ],
        }),
        sub("transition-elements.pgm", "6.4.1.9", "Platinum group metals (PGM)", {
          form: F6,
          covers: ["achem.transition.platinum-group-metals"],
          objectives: [
            "Describe the occurrence and extraction of platinum and identify the elements that occur with it.",
            "Suggest uses of the platinum group metals.",
          ],
        }),
      ],
    }),
    topic("phase-equilibria", "6.4.2", "Phase Equilibria", {
      description: "Form 6.",
      components: THEORY,
      children: [
        sub("phase-equilibria.steam-distillation", "6.4.2.1", "Steam distillation", {
          form: F6,
          covers: ["achem.phase.steam-distillation"],
          objectives: ["Explain the steam distillation of two immiscible liquids.", "Show awareness of the applications of steam distillation."],
        }),
        sub("phase-equilibria.partition", "6.4.2.2", "Distribution between phases", {
          form: F6,
          covers: ["achem.phase.partition-extraction"],
          objectives: [
            "Explain the term partition coefficient.",
            "Calculate a partition coefficient for a solute in the same molecular state in the two solutions.",
            "Explain solvent extraction.",
          ],
        }),
        sub("phase-equilibria.chromatography", "6.4.2.3", "Chromatography", {
          form: F6,
          covers: ["achem.analysis.chromatography-tlc", "achem.analysis.chromatography-glc"],
          objectives: [
            "Explain paper, high-performance liquid, ion-exchange, thin-layer, column and gas-liquid chromatography in terms of adsorption and/or partition.",
            "Show awareness of the applications of chromatography in industry and medicine.",
          ],
        }),
        sub("phase-equilibria.electrophoresis", "6.4.2.4", "Electrophoresis and genetic fingerprinting", {
          form: F6,
          covers: ["achem.analysis.electrophoresis"],
          objectives: [
            "Describe the process of electrophoresis and the effect of pH.",
            "Describe the hydrolysis of proteins and the separation and detection of the products by electrophoresis.",
            "Outline the analysis of genes and genetic fingerprinting.",
          ],
        }),
      ],
    }),
    topic("environmental-chemistry", "6.4.3", "Environmental Chemistry", {
      description: "Form 6.",
      components: THEORY,
      children: [
        sub("environmental-chemistry.air", "6.4.3.1", "Air pollution and control; power generation", {
          form: F6,
          covers: ["achem.environment.air-pollution-energy"],
          objectives: [
            "Outline the main industrial methods of controlling sulfur dioxide emissions (flue-gas desulfurisation, alkaline scrubbing, limestone-based fluidised beds).",
            "Recognise the use of lean-burn engines and catalytic converters in reducing emissions from petrol-driven cars.",
            "Deduce environmental considerations in the use and generation of power, with particular reference to fossil fuels and nuclear energy, and identify other potential power sources.",
            "Recognise the hazards of emissions from uranium-bearing rocks and of nuclear accidents.",
          ],
        }),
        sub("environmental-chemistry.waste", "6.4.3.2", "Waste management: ion exchange, incineration, landfilling, recycling", {
          form: F6,
          covers: ["achem.environment.waste-management"],
          objectives: [
            "Outline the use of ion exchange in treating industrial waste.",
            "Recognise the consequences of landfilling and incineration of solid waste, including temperature control and the possible release of dioxins.",
            "Outline the advantages and disadvantages of dumping waste at sea and in rivers, including sewage and oil spills.",
            "Recognise the problems of heavy metals (lead, mercury, chromium), radioactive waste and mine waste in the environment.",
          ],
        }),
      ],
    }),
    topic("nano-chemistry", "6.4.4", "Nano Chemistry", {
      description: "Form 6.",
      components: THEORY,
      children: [
        sub("nano-chemistry.nanomaterials", "6.4.4.1", "Properties and applications of nanomaterials", {
          form: F6,
          covers: ["achem.nano.nanomaterials"],
          objectives: [
            "Discuss nanoscience, nanotechnology and the properties of nanomaterials.",
            "Recognise the potential applications of nanomaterials in medicine, water purification and environmental pollution control and remediation, and their risks.",
          ],
        }),
      ],
    }),
    topic("nitrogen-sulphur", "6.4.5", "Chemistry of Nitrogen and Sulphur", {
      description: "Listed under Applied Chemistry in the topic list, but taught in Form 5 under Inorganic Chemistry in the scope and sequence chart and the competency matrix (8.2).",
      components: THEORY,
      children: [
        sub("nitrogen-sulphur.nitrogen", "6.4.5.1", "Chemical properties of nitrogen", {
          form: F5,
          covers: ["achem.nitrogen-sulfur.nitrogen-ammonia"],
          objectives: ["Explain the lack of reactivity of nitrogen.", "Describe the formation and structure of the ammonium ion and its reaction with alkalis."],
        }),
        sub("nitrogen-sulphur.processes", "6.4.5.2", "Chemical properties of sulphur; Haber process; Contact process", {
          form: F5,
          covers: ["achem.equilibria.haber-contact"],
          objectives: [
            "Explain the manufacture of ammonia by the Haber process in terms of the principles of kinetics and equilibria.",
            "Explain the manufacture of sulfuric acid by the Contact process in terms of the principles of kinetics and equilibria.",
            "Recognise the industrial importance of sulfuric acid and ammonia.",
          ],
        }),
        sub("nitrogen-sulphur.environment", "6.4.5.3", "Environmental impacts of nitrogen and sulphur compounds", {
          form: F5,
          covers: ["achem.nitrogen-sulfur.environment"],
          objectives: [
            "Recognise the environmental consequences of nitrogen and sulfur compounds (nitrates, oxides of nitrogen, sulfur oxides).",
            "Explain the catalytic removal of oxides of nitrogen.",
            "Describe the use of sulfur dioxide in food preservation.",
          ],
        }),
      ],
    }),
  ],
});

const PRACTICAL = topic("practical-skills", "P", "Practical skills (Paper 4)", {
  description: "Not a content topic of the syllabus: this node is ours, from the Paper 4 description (three compulsory structured questions on qualitative analysis, quantitative analysis and planning/design) and the practical guidelines and qualitative analysis notes in the appendix.",
  components: ["4"],
  children: [
    sub("practical-skills.quantitative", "P.1", "Quantitative analysis", {
      form: F56,
      covers: ["achem.skills.quantitative-practical"],
      objectives: [
        "Carry out a volumetric analysis from one set of titrations (acids and alkalis with indicators; iron(II) and ethanedioic acid with manganate(VII); iodine with sodium thiosulfate), recording burette readings to 0.05 cm³ with at least two titres within 0.10 cm³.",
        "Determine a quantity such as an enthalpy change or a rate of reaction by simple manipulation of laboratory apparatus, recording masses to 0.01 g and temperatures to 0.1 °C where the thermometer allows.",
      ],
    }),
    sub("practical-skills.qualitative", "P.2", "Qualitative analysis", {
      form: F56,
      covers: ["achem.skills.qualitative-analysis"],
      objectives: [
        "Investigate an unknown substance by specified tests, using the reactions of the listed cations and anions and the tests for the listed gases.",
        "Record observations (colours, precipitates, gases with their tests) and deductions linked to them; recognise simple organic functional groups by test-tube reactions.",
      ],
    }),
    sub("practical-skills.planning", "P.3", "Planning and design", {
      form: F56,
      covers: ["achem.skills.planning-evaluation"],
      objectives: [
        "Design a practical solution to a problem, selecting techniques, apparatus and materials.",
        "Interpret and evaluate observations and data, and evaluate methods and suggest improvements.",
      ],
    }),
  ],
});

export const zimsec = {
  board: "zimsec",
  qualification: "a-level",
  subject: "chemistry",
  versionLabel: "2015-2022",
  family: "chemistry-a",
  title: "ZIMSEC A-Level Chemistry",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Chemistry Syllabus, Forms 5 - 6, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at A Level",
    url: "https://www.zimsake.co.zw/softidrive/",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Area and topic names and their order are transcribed from the topic list (6.0) of the Ministry's Chemistry Syllabus Forms 5 - 6 (2015 - 2022); the areas keep their printed numbers (6.1-6.4) and the topics, listed as dashes in the document, are numbered by us (6.1.1 ...). Sub-topics group the items of the competency-matrix content column (8.0) with their printed names (adjacent items grouped; codes 6.1.1.1 ... ours), and the form of each comes from the matrix and the scope and sequence chart (7.0). All objective codes and the Practical skills node are ours. Learning-objective statements are our own paraphrase of the matrix objectives; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-09): Ministry document, copy obtained from zimsake.co.zw softidrive (the zimsake.co.zw document library; the URL recorded is the library's https address because the file has no stable direct link). The same Ministry documents are listed on the Mashonaland West provincial education office site. The cover prints 'Chemistry Syllabus, Forms 5 - 6, 2015 - 2022' (Curriculum Development and Technical Services, 2015). It was read through a pdftotext rendering in which the scope-and-sequence chart, the competency matrix and the assessment table come out with columns interleaved; check every heading, the form of each item and each objective against a clean copy from ZIMSEC.",
    "Subject code: not printed in the syllabus document. ZIMSEC A-Level Chemistry is commonly cited as 6031; confirm it (code left null).",
    "Heritage-Based Curriculum: ZIMSEC introduced Heritage-Based Curriculum syllabi, and 2024-2030 versions exist for Forms 5-6 in some subjects. Confirm which Chemistry syllabus November 2026 and later A-Level candidates sit, set effectiveTo, and create a new version file when a new syllabus replaces this one. Version dates assumed: first examined in November 2018 (effectiveFrom 2018-01-01).",
    "Structure: the topic list (6.0) has four areas: 6.1 Physical Chemistry (atoms, molecules and stoichiometry; atomic structure; chemical bonding; states of matter; chemical energetics; electrochemistry; equilibria; reaction kinetics), 6.2 Inorganic Chemistry (Period 3; Groups II, IV and VII), 6.3 Organic Chemistry (hydrocarbons; halogen derivatives; hydroxy compounds; carbonyl compounds; carboxylic acids and derivatives; nitrogen compounds; polymerisation) and 6.4 Applied Chemistry (transition elements; phase equilibria; environmental chemistry; nano chemistry; chemistry of nitrogen and sulphur). The competency matrix teaches Physical (8.1) and Inorganic (8.2, including nitrogen and sulphur) in Form 5 and Physical (8.3: stoichiometric ratios, titration, yield and purity, redox titration, fuel cells, quantitative electrolysis, buffers, solubility products, catalysis), Organic (8.4) and Applied (8.5) in Form 6.",
    "Placement uncertainties: Chemistry of Nitrogen and Sulphur is listed under Applied Chemistry in the topic list but under Inorganic Chemistry (Form 5) in the scope and sequence chart and the matrix; it is kept in 6.4 here (code 6.4.5), so it is not clear whether Paper 3 questions on it fall in Section B or D. The amide and amino-acid objectives are printed on the matrix page headed Polymerisation and are placed under Nitrogen Compounds. The matrix row for Group VII places 'explain the relative reactivity as oxidising agents with reference to E⦵ values' beside the physical-properties items; it is grouped with them here.",
    "Assessment (9.0) as read: continuous assessment 30% (Form 5: practical tests and theory tests 10%; Form 6: practical tests, theory tests and a project 20%) and a summative examination 70%, all four papers compulsory: Paper 1 multiple choice (1 hour, 40 marks, 11%), Paper 2 structured theory (1 hour 30 minutes, 60 marks, 17%), Paper 3 free response (2 hours 30 minutes, 90 marks, 28%) and Paper 4 practical examination (50 marks, 14%). The table's columns are interleaved in the copy: the Paper 4 duration is read as 2 hours 30 minutes (confirm). Paper 1: 40 compulsory items, 30 of the direct-choice type and 10 of the multiple-completion type, each with four responses. Paper 2: six compulsory structured questions of 10 marks each, answered on the question paper. Paper 3: four sections (A mainly physical, B mainly inorganic, C mainly organic, D mainly applied chemistry); candidates answer six questions, two from A, one from B, two from C and one from D; marked out of 90 and scaled to 50 (as printed). Paper 4: three compulsory structured questions on qualitative analysis, quantitative analysis and planning/design, 50 marks. Skills grid: Paper 1 knowledge 18 and handling information 22 marks; Paper 2 25 and 35; Paper 3 40 and 60 (which totals 100, not 90: confirm); Paper 4 practical skills 50. The number of questions offered in each Paper 3 section is not printed.",
    "Paper 4 practical guidelines (appendix): one volumetric problem from one set of titrations (acids and alkalis; iron(II) and ethanedioic acid or its salts with manganate(VII); iodine and thiosulfate); an experiment determining a quantity such as an enthalpy change or a rate; an observational problem on an unknown using the listed cations (NH₄⁺, Mg²⁺, Al³⁺, Ca²⁺, Cr³⁺, Mn²⁺, Fe²⁺, Fe³⁺, Cu²⁺, Zn²⁺, Ba²⁺, Pb²⁺), anions (CO₃²⁻, NO₃⁻, NO₂⁻, SO₄²⁻, SO₃²⁻, Cl⁻, Br⁻, I⁻, CrO₄²⁻) and gases (NH₃, CO₂, Cl₂, H₂, O₂, SO₂), with qualitative-analysis notes supplied; burette readings to 0.05 cm³ with two titres within 0.10 cm³, weighings to 0.01 g, temperatures to 0.1 °C with a 0.2 °C thermometer. The practical paper itself cannot be simulated; written items practise its skills. Continuous assessment is not a component here and is not simulated.",
    "Not in this syllabus (Cambridge-only concepts in this family): entropy and Gibbs free energy, the Nernst equation and ΔG = −nFE, infrared and NMR spectroscopy and the organic synthesis topics. ZIMSEC-only concepts: industrial electrolysis, fuel cells, steam distillation, Group IV, the individual transition elements (vanadium to copper and the platinum group metals), electrophoresis and genetic fingerprinting, environmental chemistry and nano chemistry.",
    "Many concepts are shared with Cambridge 9701 (concepts achem.*). Lessons are written to the depth of the deeper board; parts named only by ZIMSEC (pOH and Kb, real gases, hydration enthalpy in Form 5, ligand effects on E⦵, magnetism of complexes, uses of Group II compounds, steam distillation, the platinum group metals) are marked as ZIMSEC detail.",
  ],
  overview: "The ZIMSEC A-Level Chemistry syllabus (Forms 5-6) is organised in four areas. Physical chemistry covers atoms, molecules and stoichiometry, atomic structure, chemical bonding, states of matter, chemical energetics with Born-Haber cycles, electrochemistry including fuel cells and quantitative electrolysis, chemical and ionic equilibria with buffers and solubility products, and reaction kinetics with catalysis. Inorganic chemistry covers Period 3 and Groups II, IV and VII. Organic chemistry covers hydrocarbons, halogen derivatives, hydroxy and carbonyl compounds, carboxylic acids and derivatives, nitrogen compounds and polymerisation. Applied chemistry covers the transition elements (including vanadium, chromium, manganese, iron, cobalt, nickel, copper and the platinum group metals), phase equilibria and chromatography, environmental chemistry, nano chemistry and the chemistry of nitrogen and sulphur.",
  assessmentOverview: "Continuous assessment (practical tests, theory tests and a project over the first five terms) carries 30%. The examination carries 70%: Paper 1 multiple choice (1 hour, 40 marks, 11%), Paper 2 six compulsory structured questions of 10 marks (1 hour 30 minutes, 60 marks, 17%), Paper 3 free response in four sections, six questions answered (2 hours 30 minutes, 90 marks, 28%) and Paper 4 a practical examination of three compulsory questions on qualitative analysis, quantitative analysis and planning (50 marks, 14%).",
  components: [
    { code: "1", name: "Paper 1: Multiple choice", kind: "MULTIPLE_CHOICE", description: "40 compulsory items with four responses each: 30 direct-choice and 10 multiple-completion items, on the whole syllabus.", durationMinutes: 60, maxMarks: 40, weightingPercent: 11 },
    { code: "2", name: "Paper 2: Structured theory questions", kind: "WRITTEN", description: "Six compulsory structured questions of 10 marks each, answered on the question paper.", durationMinutes: 90, maxMarks: 60, weightingPercent: 17 },
    { code: "3", name: "Paper 3: Free response questions", kind: "WRITTEN", description: "Four sections (A physical, B inorganic, C organic, D applied chemistry); six questions answered: two from A, one from B, two from C and one from D; marked out of 90 (scaled to 50 as printed).", durationMinutes: 150, maxMarks: 90, weightingPercent: 28 },
    { code: "4", name: "Paper 4: Practical examination", kind: "PRACTICAL", description: "Three compulsory structured questions on qualitative analysis, quantitative analysis and planning/design.", durationMinutes: 150, maxMarks: 50, weightingPercent: 14 },
  ],
  topics: [PHYSICAL, INORGANIC, ORGANIC, APPLIED, PRACTICAL],
};

