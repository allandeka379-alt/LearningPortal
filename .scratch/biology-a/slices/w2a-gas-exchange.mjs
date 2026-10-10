// W2a: the human gas exchange system (Cambridge only).
import { concept, P, t, chk, table, actualSize, magnification, sfStr, rnd } from "../lib.mjs";

concept("abio.gas-exchange.system", { file: "gas-exchange/system", keyPrefix: "gas-exchange.system" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which cells in the lining of the trachea secrete mucus?",
    options: [
      ["Goblet cells", "Correct."],
      ["Ciliated cells", "Ciliated cells move mucus; they do not secrete it."],
      ["Squamous epithelial cells", "Squamous cells line the alveoli."],
      ["Chondrocytes", "Chondrocytes are cartilage cells."],
    ],
    answer: "A",
    explanation: "**Goblet cells** (and mucous glands) secrete mucus.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In which part of the gas exchange system is cartilage absent but smooth muscle present?",
    options: [
      ["Bronchiole", "Correct: no cartilage, a ring of smooth muscle."],
      ["Trachea", "The trachea has C-shaped rings of cartilage."],
      ["Bronchus", "Bronchi have plates of cartilage."],
      ["Alveolus", "Alveoli have neither cartilage nor smooth muscle."],
    ],
    answer: "A",
    explanation: "**Bronchioles** have smooth muscle but no cartilage.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the function of the cartilage in the wall of the trachea?",
    options: [
      ["Keeps the trachea open when air pressure inside falls", "Correct: it prevents collapse during inspiration."],
      ["Narrows the trachea to control the flow of air into the lungs", "Smooth muscle changes airway diameter; cartilage is rigid."],
      ["Secretes mucus to trap dust", "Goblet cells and mucous glands secrete mucus."],
      ["Allows gas exchange across the trachea wall", "Gas exchange happens in the alveoli."],
    ],
    answer: "A",
    explanation: "Rigid **cartilage** holds the airway open.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are the cartilage rings of the trachea C-shaped rather than complete circles?",
    options: [
      ["The gap at the back lets the oesophagus expand when food is swallowed", "Correct."],
      ["The gap allows gas exchange to take place between the trachea and the blood", "No gas exchange occurs in the trachea."],
      ["The gap holds the goblet cells that make mucus", "Goblet cells are in the epithelium, all round the lumen."],
      ["The gap lets the trachea stretch to twice its length", "This is not the reason for the C shape."],
    ],
    answer: "A",
    explanation: "The oesophagus lies behind the trachea; the open part of the C lets it **expand** during swallowing.",
    hints: ["What lies directly behind the trachea?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which feature of alveoli most directly gives a short diffusion distance?",
    options: [
      ["Walls of squamous epithelium one cell thick", "Correct."],
      ["Hundreds of millions of alveoli", "This increases surface area, not reduces distance."],
      ["Elastic fibres in the walls", "Elastic fibres help ventilation, not diffusion distance."],
      ["A rich blood supply that carries oxygen away quickly", "This maintains the gradient."],
    ],
    answer: "A",
    explanation: "Thin, flattened **squamous** cells next to capillary endothelium give a very short diffusion path.",
    hints: ["Distance, not area or gradient."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Smoke stops cilia beating. What would be the most likely direct effect on the airways?",
    options: [
      ["Mucus and trapped particles build up", "Correct: they are no longer swept to the throat."],
      ["Less mucus is secreted by goblet cells", "Smoke tends to increase mucus secretion, not decrease it."],
      ["The cartilage rings soften and collapse", "Cilia do not affect cartilage."],
      ["The alveoli gain a larger surface area", "Loss of cilia does not enlarge alveoli."],
    ],
    answer: "A",
    explanation: "Cilia move mucus; when they stop, **mucus accumulates**, raising the risk of infection.",
    hints: ["What do cilia normally do with mucus?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "How is a steep concentration gradient of oxygen maintained between alveolar air and blood?",
    options: [
      ["Ventilation replaces alveolar air and blood flow removes oxygenated blood", "Correct: both sides are refreshed continuously."],
      ["Oxygen is actively pumped from the alveoli into the blood by carrier proteins", "Oxygen moves by diffusion, not active transport."],
      ["Mucus in the alveoli absorbs oxygen from the air", "There are no goblet cells in alveoli; the moist lining only dissolves gases."],
      ["Cartilage in the alveolar walls keeps them full of air", "Alveoli have no cartilage."],
    ],
    answer: "A",
    explanation: "**Ventilation** and **blood flow** keep oxygen high in the alveoli and low in the blood.",
    hints: ["What happens on each side of the alveolar wall?"],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Elastic fibres in the alveolar walls recoil during expiration, helping to push air out of the lungs.",
    answer: true,
    explanation: "True. They stretch during inspiration and recoil during expiration.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Cilia trap dust and bacteria in the trachea.",
    answer: false,
    explanation: "False. **Mucus** traps particles; cilia sweep the mucus up to the throat.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each tissue to its function in the gas exchange system.",
    pairs: [
      ["Cartilage", "Supports airways and keeps them open"],
      ["Smooth muscle", "Changes the diameter of the airways"],
      ["Elastic fibres", "Stretch and recoil during breathing"],
      ["Ciliated epithelium", "Moves mucus towards the throat"],
      ["Squamous epithelium", "Gives a short diffusion distance in alveoli"],
    ],
    explanation: "Each tissue has one main role.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The trachea has {{blank:a}} rings of cartilage, while the bronchi have {{blank:b}} of cartilage.",
    blanks: [
      { id: "a", accepted: ["C-shaped"], choices: ["C-shaped", "complete", "no"] },
      { id: "b", accepted: ["plates"], choices: ["plates", "C-shaped rings", "no pieces"] },
    ],
    explanation: "Trachea: C-shaped rings. Bronchi: irregular plates. Bronchioles: none.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of epithelium that forms the walls of the alveoli.",
    accepted: ["squamous epithelium", "squamous", "squamous epithelial cells", "simple squamous epithelium", "pavement epithelium"],
    wrong: ["ciliated epithelium", "columnar epithelium"],
    explanation: "Very thin **squamous** epithelium.",
  });

  // Sizes (different numbers from the lesson)
  const alv = actualSize(27, "mm", 120);
  chk(alv, 225);
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "On a photomicrograph at ×120, an alveolus measures 27 mm across. Calculate its actual diameter in µm.",
    value: alv, unit: "µm", wrong: [0.225, 3240],
    explanation: t`$27\ \text{mm} = 27\,000\ \mu\text{m}$; $27\,000 \div 120 = 225\ \mu\text{m}$.`,
  });
  const goblet = 15; // µm actual length
  const image = 9; // mm on micrograph
  const mag = magnification(image, "mm", goblet, "µm");
  chk(mag, 600);
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A goblet cell is 15 µm long. On a photomicrograph it measures 9 mm. Calculate the magnification of the photomicrograph.",
    value: mag, prefix: "×", wrong: [0.6, sfStr(15 / 9000, 3)],
    explanation: t`1. Image size $= 9\ \text{mm} = 9000\ \mu\text{m}$.
2. Magnification $= 9000 \div 15 = \times 600$.
3. Using 9 without converting gives 0.6.`,
    hints: ["Convert the image size to µm first."],
  });
  const rel = (0.75 * 1) / 1.25;
  b.num({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: t`The rate of diffusion is proportional to $\dfrac{\text{surface area} \times \text{concentration difference}}{\text{thickness of barrier}}$. In a lung disease the surface area falls to 0.75 of normal and the barrier becomes 1.25 times as thick, with no change in the concentration difference. Calculate the rate of diffusion as a percentage of normal.`,
    value: rel * 100, unit: "%", wrong: [sfStr(0.75 * 1.25 * 100, 3), 50],
    explanation: t`Relative rate $= \dfrac{0.75 \times 1}{1.25} = ${sfStr(rel, 2)}$, i.e. ${sfStr(rel * 100, 2)}% of normal. Multiplying by 1.25 instead of dividing gives ${sfStr(0.75 * 1.25 * 100, 3)}%.`,
    hints: ["A thicker barrier goes in the denominator."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how the trachea is kept free of dust and pathogens.",
    points: [
      "Goblet cells (and mucous glands) secrete mucus",
      "Mucus traps dust / bacteria / viruses / pollen",
      "Cilia on ciliated epithelial cells beat in a coordinated way",
      "Mucus is moved upwards to the throat, where it is swallowed (pathogens killed by stomach acid)",
    ],
    modelAnswer: "Goblet cells in the epithelium and mucous glands beneath it secrete mucus, which traps dust, bacteria and viruses. The cilia of the ciliated epithelial cells beat in a coordinated rhythm, sweeping the mucus up to the throat, where it is swallowed and pathogens are killed by stomach acid.",
    explanation: "Trap with mucus, move with cilia.",
    hints: ["Two cell types work together."],
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 5,
    stem: "Explain how the structure of the alveoli and their surroundings maximises the rate of gas exchange.",
    points: [
      "Very many alveoli give a very large surface area",
      "Walls of squamous epithelium one cell thick give a short diffusion distance",
      "Close contact with capillaries whose walls are also one cell thick / narrow capillaries press red cells against the wall",
      "Ventilation maintains high O₂ / low CO₂ in alveolar air",
      "Blood flow carries O₂ away and brings CO₂, maintaining a steep concentration gradient; moist lining lets gases dissolve",
    ],
    modelAnswer: "Hundreds of millions of alveoli give a very large surface area. Their walls are squamous epithelium one cell thick, pressed against capillaries whose walls are also one cell thick, so the diffusion distance is very short, and narrow capillaries squeeze red cells against the wall. Ventilation keeps oxygen high and carbon dioxide low in the alveoli, while blood flow carries oxygen away and brings carbon dioxide, maintaining steep gradients. A moist lining lets the gases dissolve.",
    explanation: "Area, distance, gradient (Fick's law).",
    hints: ["Think of Fick's law: area, gradient, thickness."],
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Suggest why bronchioles have smooth muscle but no cartilage, while the trachea has cartilage.",
    points: [
      "Trachea is wide and air pressure changes could collapse it, so cartilage holds it open",
      "Bronchioles are small / many, so they can be held open by surrounding lung tissue (elastic fibres) without cartilage",
      "Smooth muscle allows the diameter of bronchioles to be adjusted to control airflow to different alveoli",
    ],
    modelAnswer: "The wide trachea would tend to collapse when pressure inside falls during inspiration, so rigid cartilage holds it open. The narrow bronchioles are held open by the surrounding elastic lung tissue, and their smooth muscle lets their diameter be adjusted to control the flow of air to groups of alveoli.",
    explanation: "Support where needed; control where useful.",
    hints: ["Compare the size and job of each airway."],
  });

  // Practice structured: described micrographs
  b.struct({
    d: 4, skill: "ANALYSIS",
    stem: "Three photomicrographs of human airway sections are described.\n\nX: a large airway with a thick C-shaped band of glassy-looking tissue containing scattered cells in spaces; the lumen is lined by tall cells with hair-like projections and pale cup-shaped cells.\n\nY: a small airway with no glassy tissue, a folded lumen lined by cells with hair-like projections, surrounded by a thick ring of muscle.\n\nZ: many thin-walled air spaces separated by very thin walls containing red blood cells.",
    parts: [
      P.match({
        label: "(a)", stem: "Identify each section.",
        pairs: [["X", "Trachea"], ["Y", "Bronchiole"], ["Z", "Alveoli"]],
        extraRight: ["Bronchus"],
        explanation: "X has C-shaped cartilage (trachea); Y has no cartilage but smooth muscle (bronchiole); Z is alveolar tissue.",
      }),
      P.short({ label: "(b)", marks: 1, stem: "Name the glassy-looking tissue in X.", accepted: ["cartilage", "hyaline cartilage"], wrong: ["bone", "smooth muscle"], explanation: "Hyaline cartilage looks glassy, with chondrocytes in spaces." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the pale cup-shaped cells in X.", accepted: ["goblet cells", "goblet cell", "goblet"], wrong: ["ciliated cells"], explanation: "Goblet cells secrete mucus." }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why the lumen of Y appears folded.",
        points: ["The smooth muscle has contracted", "Narrowing the lumen and folding the lining (no cartilage to hold it open)"],
        modelAnswer: "The ring of smooth muscle has contracted, narrowing the bronchiole; with no cartilage to hold it open, the lining is thrown into folds.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Describe how a plan diagram of the wall of X should be drawn.",
        points: ["Layers drawn as regions in correct proportions: epithelium (thin band), connective tissue / glands, cartilage (thick C-shaped band), outer layer", "No cells drawn, no shading; sharp continuous lines; ruled label lines"],
        modelAnswer: "The wall would be drawn as concentric regions in correct proportions: a thin band of ciliated epithelium, a layer of connective tissue with glands, the thick C-shaped cartilage and the outer connective tissue, with the smooth muscle across the gap. No cells, no shading, sharp lines and ruled labels.",
      }),
    ],
    explanation: "Cartilage, cilia, goblet cells and smooth muscle identify each airway.",
    hints: ["Which airway has cartilage? Which has only smooth muscle?"],
  });


  const thick = 1.0;
  const xs = [1.0, 0.85, 0.65, 0.45];
  const rates = xs.map((sa) => (sa * 1) / thick);
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: `In emphysema, alveolar walls break down, so many small alveoli merge into fewer, larger air spaces. A model compares relative surface area for gas exchange.\n\n${table(["Stage of disease", "Relative surface area"], [["None", "1.0"], ["Mild", "0.85"], ["Moderate", "0.65"], ["Severe", "0.45"]])}`,
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why merging of alveoli reduces the surface area.",
        points: ["Fewer, larger air spaces have a smaller surface area to volume ratio", "Walls between alveoli are lost, so less total wall area in contact with capillaries"],
        modelAnswer: "When walls break down, the same volume is enclosed by fewer, larger spaces with a smaller surface area to volume ratio, so there is less wall area in contact with capillaries.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Assuming the concentration difference and barrier thickness do not change, by what percentage is the rate of diffusion reduced at the moderate stage?",
        value: (1 - rates[2]) * 100, unit: "%", wrong: [65],
        explanation: t`Rate is proportional to area: 0.65 of normal, a reduction of 35%.`,
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest why a person with severe emphysema becomes breathless during mild exercise.",
        points: ["Less oxygen diffuses into the blood per minute (smaller surface area)", "Muscles need more oxygen during exercise; breathing rate increases to compensate / loss of elastic recoil makes expiration difficult"],
        modelAnswer: "With much less surface area, less oxygen diffuses into the blood each minute, so during exercise the muscles' demand for oxygen cannot be met and the person breathes faster; loss of elastic fibres also makes it harder to breathe out.",
      }),
      P.tf({
        label: "(d)", stem: "True or false: in emphysema the elastic fibres in alveolar walls are damaged, so the lungs recoil less during expiration.",
        answer: true,
        explanation: "True. Loss of elastic recoil makes expiration harder.",
      }),
    ],
    explanation: "Rate of diffusion is proportional to surface area when gradient and thickness are unchanged.",
    hints: ["Rate ∝ surface area here."],
    calculator: true,
  });
  chk(rnd((1 - rates[2]) * 100, 6), 35);


  b.card("CONCEPT", "Cartilage in the airways", "Trachea: C-shaped rings. Bronchi: plates. Bronchioles and alveoli: none. Keeps airways open.");
  b.card("CONCEPT", "Goblet cells and cilia", "Goblet cells secrete mucus that traps particles; cilia sweep mucus up to the throat.");
  b.card("FACT", "Function of smooth muscle in airways", "Contracts or relaxes to change airway diameter and control airflow.");
  b.card("FACT", "Function of elastic fibres in the lungs", "Stretch during inspiration and recoil during expiration, helping to expel air.");
  b.card("DEFINITION", "Define **squamous epithelium**.", "A layer of very thin, flattened cells; forms alveolar walls, giving a short diffusion distance.");
  b.card("CONCEPT", "Features of an efficient gas exchange surface (alveoli)", "Large surface area; thin barrier; steep gradients kept by ventilation and blood flow; moist.");
  b.card("FORMULA", "Fick's law (relative rate of diffusion)", "Rate ∝ surface area × concentration difference ÷ thickness of the barrier.");
  b.card("FACT", "How to recognise a bronchiole in a section", "No cartilage; ring of smooth muscle; folded lumen; ciliated or cuboidal lining.");
  b.card("FACT", "Why are tracheal rings C-shaped?", "The gap at the back lets the oesophagus expand during swallowing.");
});
