// GCSE AQA Chemistry - 8 Base Topics
// Topic 1 is fully populated with user's revision notes
// Topics 2-8 show "Nothing here — please wait for update" placeholder

export interface PracticeItem {
  id: string;
  prompt_template: string;
  marks: number; // How many marks this question is worth
  type: "open" | "short-answer" | "mcq";
  difficulty: "easy" | "medium" | "hard";
  randomise: boolean;
  expected_keywords: string[]; // Keywords specific to this question
  feedback_guidance?: { // Optional - for personalized feedback
    // What to mention if certain keywords are found/missing
    topic_coverage: {
      topic: string;
      required_keywords: string[];
      feedback_if_missing: string;
      feedback_if_partial: string;
    }[];
  };
}

export interface Subsection {
  id: string;
  title: string;
  type: "content" | "practice-group";
  content_html: string;
  canonical_keywords: string[];
  practice_items: PracticeItem[];
  study_group?: number; // Group 2-3 subsections together for studying
}

export interface TopicSection {
  id: string;
  title: string;
  status: "ready" | "coming_soon";
  subsections: Subsection[];
}

export const sectionsData: TopicSection[] = [
  {
    id: "atomic-structure",
    title: "Atomic structure & periodic table",
    status: "ready",
    subsections: [
      {
        id: "1-1-1-atoms-elements-compounds",
        title: "1.1.1 ATOMS, ELEMENTS AND COMPOUNDS",
        type: "content",
        study_group: 1, // Study with 1.1.2
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What is an Atom?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>An atom is the smallest particle of an element that can exist. Every atom consists of a nucleus (containing protons and neutrons) and electrons arranged in shells around it.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Facts</h4>
    <ul>
      <li>All substances are made of atoms.</li>
      <li>Atoms are neutral overall (same number of protons and electrons).</li>
      <li>The atom's nucleus makes up almost all of its mass.</li>
      <li>Atoms are incredibly small — radius ≈ 0.1 nanometres (1 × 10⁻¹⁰ m).</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Example</h4>
    <p>A single atom of hydrogen (H) has: 1 proton, 0 neutrons, 1 electron.</p>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>When asked "What is an atom?", always include: ✅ smallest part of an element and ✅ that can exist.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – What is an Element?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>An element is a pure substance that contains only one type of atom.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Points</h4>
    <ul>
      <li>Each element is represented by a chemical symbol (e.g. O for oxygen, Na for sodium).</li>
      <li>There are about 100 known elements, shown in the Periodic Table.</li>
      <li>Elements can be classified as metals or non-metals depending on properties.</li>
      <li>The periodic table arranges elements by increasing atomic number (number of protons).</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Examples</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Element</th>
          <th>Symbol</th>
          <th>Metal/Non-metal</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hydrogen</td>
          <td>H</td>
          <td>Non-metal</td>
          <td>Lightest element</td>
        </tr>
        <tr>
          <td>Sodium</td>
          <td>Na</td>
          <td>Metal</td>
          <td>Reactive Group 1 element</td>
        </tr>
        <tr>
          <td>Chlorine</td>
          <td>Cl</td>
          <td>Non-metal</td>
          <td>Poisonous green gas</td>
        </tr>
        <tr>
          <td>Iron</td>
          <td>Fe</td>
          <td>Metal</td>
          <td>Forms rust (iron oxide)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>If asked to "define an element", always mention atoms are all the same type.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – What is a Compound?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>A compound is a substance formed when two or more elements are chemically bonded together in fixed proportions.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Points</h4>
    <ul>
      <li>Compounds contain more than one type of atom.</li>
      <li>They can only be separated by chemical reactions, not physical methods.</li>
      <li>The properties of a compound are different from those of the elements it's made from.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Examples</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Compound</th>
          <th>Elements Involved</th>
          <th>Type of Bond</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Water (H₂O)</td>
          <td>Hydrogen + Oxygen</td>
          <td>Covalent</td>
          <td>Liquid at room temp</td>
        </tr>
        <tr>
          <td>Sodium Chloride (NaCl)</td>
          <td>Sodium + Chlorine</td>
          <td>Ionic</td>
          <td>Solid salt crystals</td>
        </tr>
        <tr>
          <td>Carbon Dioxide (CO₂)</td>
          <td>Carbon + Oxygen</td>
          <td>Covalent</td>
          <td>Colourless gas</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Use "chemically joined" not "mixed" — compounds involve bonding, mixtures don't.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Naming Rules for Compounds</h3>
  
  <div class="definition-block">
    <h4>🔵 Basic Rules</h4>
    <ul>
      <li><strong>Metal + Non-Metal = Ionic Compound</strong> - Ending changes to "-ide". Example: Sodium + Chlorine → Sodium Chloride</li>
      <li><strong>If Oxygen is Included → "-ate"</strong> - Example: Copper + Sulfur + Oxygen → Copper Sulfate</li>
      <li><strong>Non-Metals Only = Covalent Compound</strong> - Use prefixes to show number of atoms: mono = 1, di = 2, tri = 3, tetra = 4. Example: CO₂ = Carbon Dioxide</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Examples</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Formula</th>
          <th>Name</th>
          <th>Type of Compound</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>NaCl</td>
          <td>Sodium Chloride</td>
          <td>Ionic</td>
        </tr>
        <tr>
          <td>H₂O</td>
          <td>Water</td>
          <td>Covalent</td>
        </tr>
        <tr>
          <td>MgO</td>
          <td>Magnesium Oxide</td>
          <td>Ionic</td>
        </tr>
        <tr>
          <td>CO</td>
          <td>Carbon Monoxide</td>
          <td>Covalent</td>
        </tr>
        <tr>
          <td>CuSO₄</td>
          <td>Copper Sulfate</td>
          <td>Ionic</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Always check for oxygen — it's the clue for "-ate".</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Writing Formulae and Equations</h3>
  
  <div class="definition-block">
    <h4>🔵 Step 1: Write the Symbols</h4>
    <p>Identify each element and write its symbol. Example: Sodium reacts with chlorine → Na + Cl.</p>
  </div>

  <div class="definition-block">
    <h4>🔵 Step 2: Balance the Charges</h4>
    <p>Combine ions so total charge = 0.</p>
    <table class="data-table">
      <thead>
        <tr>
          <th>Ion</th>
          <th>Charge</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Na⁺</td>
          <td>+1</td>
        </tr>
        <tr>
          <td>Cl⁻</td>
          <td>–1</td>
        </tr>
      </tbody>
    </table>
    <p>→ NaCl (charges cancel)</p>
  </div>

  <div class="definition-block">
    <h4>🔵 Step 3: Write the Formula</h4>
    <p>Combine elements in the correct ratio.</p>
    <p><strong>Examples:</strong></p>
    <ul>
      <li>Magnesium Oxide = Mg²⁺ + O²⁻ → MgO</li>
      <li>Calcium Chloride = Ca²⁺ + 2Cl⁻ → CaCl₂</li>
    </ul>
  </div>

  <div class="warning-block">
    <h4>🔴 Balanced Chemical Equation</h4>
    <p><strong>Example:</strong> 2Na + Cl₂ → 2NaCl (always ensure same number of atoms each side)</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Word Equation</h4>
    <p><strong>Example:</strong> Sodium + Chlorine → Sodium Chloride</p>
  </div>

  <div class="example-block">
    <h4>🟢 State Symbols</h4>
    <ul>
      <li>(s) = solid</li>
      <li>(l) = liquid</li>
      <li>(g) = gas</li>
      <li>(aq) = aqueous solution</li>
    </ul>
    <p><strong>Example with states:</strong> 2Na (s) + Cl₂ (g) → 2NaCl (s)</p>
  </div>
</div>
        `,
        canonical_keywords: [
          "atom", "nucleus", "proton", "neutron", "electron", "shells",
          "element", "chemical symbol", "periodic table", "metal", "non-metal",
          "compound", "chemical bond", "formula", "ionic", "covalent",
          "naming compounds", "-ide", "-ate", "balanced equation", "state symbols"
        ],
        practice_items: [
          {
            id: "p1",
            prompt_template: "Define what an atom is and describe its basic structure.",
            marks: 4,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: [
              "smallest particle", "element", "exist", "nucleus", "proton", "neutron", "electron", "shells"
            ],
            feedback_guidance: {
              topic_coverage: [
                {
                  topic: "Atom definition",
                  required_keywords: ["smallest", "particle", "element", "exist"],
                  feedback_if_missing: "You need to define what an atom is: the **smallest particle of an element that can exist**.",
                  feedback_if_partial: "Your definition is incomplete. Make sure to state it's the smallest particle of an element that can exist."
                },
                {
                  topic: "Atomic structure",
                  required_keywords: ["nucleus", "proton", "neutron", "electron", "shells"],
                  feedback_if_missing: "Describe the atomic structure: a **nucleus** containing protons and neutrons, with **electrons** arranged in shells around it.",
                  feedback_if_partial: "Add more detail about the structure - mention the nucleus contains protons and neutrons, and electrons are in shells."
                }
              ]
            }
          },
          {
            id: "p2",
            prompt_template: "State the definition of an element. Give two examples of elements with their chemical symbols and state whether each is a metal or non-metal.",
            marks: 5,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: [
              "pure substance", "one type", "atom", "symbol", "metal", "non-metal", "sodium", "hydrogen", "chlorine", "iron", "oxygen"
            ],
            feedback_guidance: {
              topic_coverage: [
                {
                  topic: "Element definition",
                  required_keywords: ["pure", "substance", "one type", "atom"],
                  feedback_if_missing: "Start with the definition: an element is a **pure substance that contains only one type of atom**.",
                  feedback_if_partial: "Your definition needs both parts: 'pure substance' AND 'contains only one type of atom'."
                },
                {
                  topic: "Element examples with classification",
                  required_keywords: ["symbol", "metal", "non-metal"],
                  feedback_if_missing: "Provide **two specific examples** with their symbols (e.g., Sodium, Na, metal; Oxygen, O, non-metal).",
                  feedback_if_partial: "Each example needs: the element name, its symbol, AND whether it's a metal or non-metal."
                }
              ]
            }
          },
          {
            id: "p3",
            prompt_template: "A hydrogen atom has 1 proton, 0 neutrons and 1 electron. Explain why atoms are described as neutral.",
            marks: 2,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: [
              "neutral", "protons", "electrons", "same number", "equal", "charge"
            ],
            feedback_guidance: {
              topic_coverage: [
                {
                  topic: "Neutral atoms",
                  required_keywords: ["protons", "electrons", "same", "equal"],
                  feedback_if_missing: "Explain that atoms are neutral because they have the **same number of protons and electrons**.",
                  feedback_if_partial: "Make sure to state that the number of protons equals the number of electrons, which makes the overall charge zero/neutral."
                }
              ]
            }
          },
          {
            id: "p4",
            prompt_template: "Define an element and give one example with its symbol.",
            marks: 3,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: [
              "element", "pure substance", "one type of atom", "symbol"
            ],
            feedback_guidance: {
              topic_coverage: [
                {
                  topic: "Element definition",
                  required_keywords: ["pure", "one type"],
                  feedback_if_missing: "Your definition should state that an element is a **pure substance** containing only **one type of atom**.",
                  feedback_if_partial: "Make sure both parts are clear: 'pure substance' AND 'one type of atom'."
                },
                {
                  topic: "Example with symbol",
                  required_keywords: ["symbol"],
                  feedback_if_missing: "You must provide a **specific example** with its chemical symbol (e.g., 'Oxygen, symbol O' or 'Sodium, symbol Na').",
                  feedback_if_partial: "Include both the element name and its symbol together."
                }
              ]
            }
          },
          {
            id: "p5",
            prompt_template: "State the difference between an element and a compound.",
            marks: 4,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: [
              "element", "one type", "compound", "two or more", "chemically bonded", "fixed proportions"
            ],
            feedback_guidance: {
              topic_coverage: [
                {
                  topic: "Element characteristics",
                  required_keywords: ["one type", "atom"],
                  feedback_if_missing: "Clearly state what makes an **element**: contains only one type of atom.",
                  feedback_if_partial: "Be more explicit that elements have one type of atom only."
                },
                {
                  topic: "Compound characteristics",
                  required_keywords: ["two or more", "chemically bonded", "fixed"],
                  feedback_if_missing: "Explain that **compounds** contain two or more elements that are chemically bonded in fixed proportions.",
                  feedback_if_partial: "Emphasize the key difference: compounds involve **chemical bonding** and **fixed proportions**, not just mixing."
                }
              ]
            }
          },
          {
            id: "p6",
            prompt_template: "Explain how to write a formula for an ionic compound (example NaCl).",
            marks: 5,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: [
              "ions", "charge", "balance", "metal", "non-metal", "positive", "negative", "formula"
            ],
            feedback_guidance: {
              topic_coverage: [
                {
                  topic: "Ion charges",
                  required_keywords: ["charge", "positive", "negative", "balance"],
                  feedback_if_missing: "Start by explaining that you need to **balance the charges** of the ions. Metal ions are positive (e.g., Na⁺ is +1) and non-metal ions are negative (e.g., Cl⁻ is -1).",
                  feedback_if_partial: "Be more specific about charge balancing. Explain that the total charge must equal zero, so you combine ions in the right ratio."
                },
                {
                  topic: "Writing the formula",
                  required_keywords: ["formula", "ratio"],
                  feedback_if_missing: "Explain the process: write the symbols, determine the charges, then combine in the correct ratio so charges cancel out. For NaCl: Na⁺ + Cl⁻ → NaCl (charges +1 and -1 cancel).",
                  feedback_if_partial: "Use the NaCl example to demonstrate: show that Na⁺ (+1) and Cl⁻ (-1) combine in a 1:1 ratio because the charges cancel."
                }
              ]
            }
          },
          {
            id: "p7",
            prompt_template: "Give the naming rule for compounds containing oxygen.",
            marks: 2,
            type: "short-answer",
            difficulty: "easy",
            randomise: true,
            expected_keywords: [
              "oxygen", "-ate", "ending", "sulfate", "carbonate", "nitrate"
            ],
            feedback_guidance: {
              topic_coverage: [
                {
                  topic: "Naming rule",
                  required_keywords: ["oxygen", "-ate"],
                  feedback_if_missing: "State the rule clearly: **when a compound contains oxygen, the name ends in '-ate'**.",
                  feedback_if_partial: "Be more explicit: compounds with oxygen end in '-ate'."
                },
                {
                  topic: "Examples",
                  required_keywords: ["sulfate", "carbonate", "nitrate"],
                  feedback_if_missing: "Include **examples** like copper sulfate (CuSO₄), calcium carbonate (CaCO₃), or sodium nitrate (NaNO₃).",
                  feedback_if_partial: "Add at least one specific example with its formula to illustrate the rule."
                }
              ]
            }
          }
        ]
      },
      {
        id: "1-1-2-mixtures",
        title: "1.1.2 MIXTURES",
        type: "content",
        study_group: 1, // Study with 1.1.1
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 1 – What Is a Mixture?</h3>
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>A mixture is a combination of two or more substances (elements or compounds) that are not chemically bonded together.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Key Points</h4>
    <ul>
      <li>Substances in a mixture keep their original properties.</li>
      <li>Mixtures can be easily separated by physical methods, not chemical reactions.</li>
      <li>The composition of a mixture is not fixed — it can vary.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🟢 Examples</h4>
    <table class="data-table">
      <thead>
        <tr><th>Mixture</th><th>Components</th><th>How They're Separated</th></tr>
      </thead>
      <tbody>
        <tr><td>Air</td><td>Nitrogen, oxygen, carbon dioxide</td><td>Fractional distillation of liquid air</td></tr>
        <tr><td>Sea water</td><td>Water, dissolved salts</td><td>Distillation or crystallisation</td></tr>
        <tr><td>Sand and salt</td><td>Sand, sodium chloride</td><td>Filtration + crystallisation</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">💎 Subsection 2 – Filtration (Insoluble Solid from Liquid)</h3>
  <div class="definition-block">
    <h4>🧪 Purpose</h4>
    <p>To separate an insoluble solid (that doesn't dissolve) from a liquid.</p>
  </div>
  <div class="key-facts-block">
    <h4>⚙️ Apparatus</h4>
    <ul>
      <li>Beaker</li>
      <li>Funnel</li>
      <li>Filter paper</li>
      <li>Stirring rod</li>
    </ul>
  </div>
  <div class="key-facts-block">
    <h4>🧩 Step-by-Step Method</h4>
    <ol>
      <li>1️⃣ Fold the filter paper into a cone and place it inside the funnel.</li>
      <li>2️⃣ Place the funnel into a clean beaker.</li>
      <li>3️⃣ Pour the mixture slowly through the filter paper.</li>
      <li>4️⃣ The liquid (filtrate) passes through the paper.</li>
      <li>5️⃣ The solid (residue) remains trapped on the paper.</li>
    </ol>
  </div>
  <div class="key-facts-block">
    <h4>🔍 Scientific Explanation</h4>
    <ul>
      <li>Filter paper has tiny pores that allow liquid and dissolved substances through but trap large particles.</li>
      <li>No new substances are formed → physical process only.</li>
    </ul>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Common Exam Tip</h4>
    <p>Always name both the filtrate and the residue in your answer — they're both mark points.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">❄️ Subsection 3 – Crystallisation (Soluble Solid from Solution)</h3>
  <div class="definition-block">
    <h4>🧪 Purpose</h4>
    <p>Used to obtain pure crystals of a soluble solid (solute) from a solution.</p>
  </div>
  <div class="key-facts-block">
    <h4>⚙️ Apparatus</h4>
    <ul>
      <li>Evaporating basin</li>
      <li>Tripod and gauze</li>
      <li>Bunsen burner</li>
      <li>Beaker (for hot water bath if needed)</li>
    </ul>
  </div>
  <div class="key-facts-block">
    <h4>🧩 Step-by-Step Method</h4>
    <ol>
      <li>1️⃣ Pour the solution (e.g. salt water) into an evaporating basin.</li>
      <li>2️⃣ Heat gently with a Bunsen burner (or water bath) to evaporate some of the solvent.</li>
      <li>3️⃣ Stop heating when crystals start to form at the edge of the basin (this shows the solution is concentrated).</li>
      <li>4️⃣ Leave the solution to cool slowly at room temperature — as temperature falls, solubility decreases, and crystals form.</li>
      <li>5️⃣ Filter out the crystals and dry them using filter paper or a warm oven.</li>
    </ol>
  </div>
  <div class="key-facts-block">
    <h4>🔍 Scientific Explanation</h4>
    <ul>
      <li>Heating removes solvent (usually water) → increases concentration.</li>
      <li>Cooling allows solid particles to form a regular crystal lattice as solubility decreases.</li>
    </ul>
  </div>
  <div class="warning-block">
    <h4>⚠️ Safety Note</h4>
    <p>Avoid boiling all the water away — this can decompose the salt or make crystals impure.</p>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Common Exam Tip</h4>
    <p>Always mention "heat gently" and "allow to cool slowly" — both are AQA keywords for full marks.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">💨 Subsection 4 – Simple Distillation (Solvent from Solution)</h3>
  <div class="definition-block">
    <h4>🧪 Purpose</h4>
    <p>To separate a liquid (solvent) from a solution, e.g. getting pure water from saltwater.</p>
  </div>
  <div class="key-facts-block">
    <h4>⚙️ Apparatus</h4>
    <ul>
      <li>Round-bottomed flask</li>
      <li>Thermometer</li>
      <li>Condenser (Liebig condenser)</li>
      <li>Heat source (Bunsen burner)</li>
      <li>Beaker (to collect distillate)</li>
    </ul>
  </div>
  <div class="key-facts-block">
    <h4>🧩 Step-by-Step Method</h4>
    <ol>
      <li>1️⃣ Place the solution (e.g. saltwater) in the distillation flask.</li>
      <li>2️⃣ Heat gently — the liquid with the lowest boiling point (water) evaporates first.</li>
      <li>3️⃣ Vapour travels through the condenser, which is cooled by water circulating around it.</li>
      <li>4️⃣ Vapour condenses back to liquid and is collected in the beaker (called the distillate).</li>
      <li>5️⃣ The solute (e.g. salt) remains in the flask.</li>
    </ol>
  </div>
  <div class="key-facts-block">
    <h4>🔍 Scientific Explanation</h4>
    <ul>
      <li>Separation is based on different boiling points.</li>
      <li>Condensation happens because cold water enters at the bottom of the condenser and leaves at the top, ensuring efficient cooling.</li>
    </ul>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Common Exam Tip</h4>
    <p>Label "distillate" (collected liquid) and "residue" (left in flask) correctly in diagrams — AQA often awards marks for this.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🌡 Subsection 5 – Fractional Distillation (Mixture of Liquids)</h3>
  <div class="definition-block">
    <h4>🧪 Purpose</h4>
    <p>Used to separate two or more miscible liquids (liquids that mix completely), such as ethanol and water or liquid air.</p>
  </div>
  <div class="key-facts-block">
    <h4>⚙️ Apparatus</h4>
    <ul>
      <li>Round-bottomed flask</li>
      <li>Fractionating column (glass beads inside to increase surface area)</li>
      <li>Thermometer</li>
      <li>Condenser</li>
      <li>Beaker(s)</li>
    </ul>
  </div>
  <div class="key-facts-block">
    <h4>🧩 Step-by-Step Method</h4>
    <ol>
      <li>1️⃣ Add the mixture to the flask and fit the fractionating column on top.</li>
      <li>2️⃣ Heat the mixture gently — the liquid with the lowest boiling point evaporates first.</li>
      <li>3️⃣ Vapour rises up the column.</li>
      <li>4️⃣ Cooler beads near the top cause higher-boiling vapours to condense and fall back, while lower-boiling vapours pass through.</li>
      <li>5️⃣ The vapour passes into the condenser, cools, and is collected separately.</li>
      <li>6️⃣ As temperature rises, other fractions can be collected in turn.</li>
    </ol>
  </div>
  <div class="key-facts-block">
    <h4>🔍 Scientific Explanation</h4>
    <ul>
      <li>The temperature gradient in the column ensures better separation.</li>
      <li>Each fraction condenses at its own boiling point, forming pure samples.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🧠 Real-Life Applications</h4>
    <ul>
      <li>Crude oil → separated into petrol, diesel, kerosene, etc.</li>
      <li>Air → separated into nitrogen, oxygen, argon.</li>
    </ul>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Always mention the temperature gradient — "cooler at the top, hotter at the bottom."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🎨 Subsection 6 – Paper Chromatography (Soluble Substances)</h3>
  <div class="definition-block">
    <h4>🧪 Purpose</h4>
    <p>Used to separate and identify substances in a mixture of soluble chemicals, especially coloured dyes or inks.</p>
  </div>
  <div class="key-facts-block">
    <h4>⚙️ Apparatus</h4>
    <ul>
      <li>Beaker with solvent (e.g. water or ethanol)</li>
      <li>Chromatography paper</li>
      <li>Pencil and ruler</li>
      <li>Capillary tube</li>
    </ul>
  </div>
  <div class="key-facts-block">
    <h4>🧩 Step-by-Step Method</h4>
    <ol>
      <li>1️⃣ Use a pencil to draw a baseline near the bottom of the chromatography paper.</li>
      <li>2️⃣ Place small dots of each sample on the baseline using a capillary tube.</li>
      <li>3️⃣ Hang the paper in a beaker with solvent below the baseline (so samples don't dissolve immediately).</li>
      <li>4️⃣ As solvent moves up by capillary action, it carries each dye with it.</li>
      <li>5️⃣ Different substances move at different speeds, depending on solubility and attraction to the paper.</li>
      <li>6️⃣ When the solvent front is near the top, remove the paper, mark the solvent line, and let it dry.</li>
    </ol>
  </div>
  <div class="key-facts-block">
    <h4>📊 Calculating Rf Values</h4>
    <p><strong>Rf = Distance moved by substance ÷ Distance moved by solvent front</strong></p>
    <p>Rf value = always between 0 and 1.</p>
  </div>
  <div class="key-facts-block">
    <h4>🔍 Scientific Explanation</h4>
    <ul>
      <li>The more soluble a substance, the further it travels.</li>
      <li>If a substance is strongly attracted to the paper, it moves less.</li>
    </ul>
  </div>
  <div class="warning-block">
    <h4>⚠️ Safety and Accuracy Notes</h4>
    <ul>
      <li>Always use pencil for the baseline (ink would dissolve).</li>
      <li>Make sure solvent doesn't cover the samples at the start.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">⚖️ Subsection 7 – Choosing the Correct Technique</h3>
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr><th>Type of Mixture</th><th>Correct Method</th><th>Example</th></tr>
      </thead>
      <tbody>
        <tr><td>Insoluble solid + liquid</td><td>Filtration</td><td>Sand and water</td></tr>
        <tr><td>Soluble solid + liquid</td><td>Crystallisation</td><td>Salt solution</td></tr>
        <tr><td>Solvent from solution</td><td>Simple distillation</td><td>Water from seawater</td></tr>
        <tr><td>Two liquids</td><td>Fractional distillation</td><td>Ethanol and water</td></tr>
        <tr><td>Coloured compounds</td><td>Chromatography</td><td>Ink pigments</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧠 Subsection 8 – Purity and Melting Point</h3>
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr><th>Term</th><th>Definition</th></tr>
      </thead>
      <tbody>
        <tr><td>Pure substance</td><td>A single element or compound with a fixed melting and boiling point.</td></tr>
        <tr><td>Impure substance</td><td>A mixture — melts or boils over a range of temperatures.</td></tr>
      </tbody>
    </table>
  </div>
  <div class="example-block">
    <h4>🟢 Example</h4>
    <ul>
      <li>Pure ice → melts at 0°C exactly.</li>
      <li>Ice with salt → melts between –5°C and 0°C.</li>
    </ul>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 This is how purity is tested in labs</h4>
    <p>By measuring melting/boiling point.</p>
  </div>
</div>
        `,
        canonical_keywords: [
          "mixture", "physical combination", "filtration", "residue", "filtrate",
          "crystallisation", "evaporation", "simple distillation", "fractional distillation",
          "chromatography", "Rf value", "solvent front", "purity", "melting point"
        ],
        practice_items: [
          {
            id: "p1",
            prompt_template: "Define what a mixture is. Explain how mixtures are different from compounds.",
            marks: 4,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: [
              "mixture", "not chemically joined", "physical", "separated", "properties unchanged", 
              "compound", "chemically bonded", "chemical reaction"
            ]
          },
          {
            id: "p2",
            prompt_template: "Describe how to separate a mixture of sand and salt water to obtain pure salt crystals. Include the names of all techniques used.",
            marks: 6,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: [
              "filtration", "sand", "residue", "salt water", "filtrate", "crystallisation", 
              "evaporate", "crystals", "pure"
            ]
          },
          {
            id: "p3",
            prompt_template: "Describe the process of simple distillation to separate pure water from salt water. Include equipment and key steps.",
            marks: 5,
            type: "short-answer",
            difficulty: "medium",
            randomise: true,
            expected_keywords: [
              "heat", "evaporate", "boiling point", "condenser", "cool", "distillate", "collect", "flask"
            ]
          },
          {
            id: "p4",
            prompt_template: "A student uses paper chromatography to test food colourings. Describe the method and explain how to calculate an Rf value.",
            marks: 6,
            type: "short-answer",
            difficulty: "hard",
            randomise: true,
            expected_keywords: [
              "baseline", "pencil", "solvent", "move up", "different distances",
              "Rf value", "distance moved", "substance", "solvent front", "formula"
            ]
          }
        ]
      },
      {
        id: "1-1-3-atomic-model",
        title: "1.1.3 DEVELOPMENT OF THE ATOMIC MODEL",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">🧩 Subsection 1 – Why Scientific Models Change</h3>
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>A scientific model is an idea, picture, or representation that helps to explain experimental observations. These models are updated when new evidence is discovered through experiments or improved technology.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 More Detail</h4>
    <ul>
      <li>In the 19th and 20th centuries, new experimental techniques like cathode ray tubes and alpha particle scattering allowed scientists to "see" evidence for smaller particles.</li>
      <li>This caused older models to be rejected, adapted, or refined to fit the new data.</li>
      <li>The modern atomic model is still a theoretical model, and even now, new discoveries (like quarks) refine our understanding of atomic structure.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🟢 Key Principle</h4>
    <p>"Scientific models evolve as new evidence is gathered."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">⚫ Subsection 2 – Dalton's Solid Sphere Model (1803)</h3>
  <div class="definition-block">
    <h4>🔵 Summary</h4>
    <p>John Dalton proposed that:</p>
    <ul>
      <li>All matter is made of tiny, indivisible spheres called atoms.</li>
      <li>Each element contains atoms of a single, unique type.</li>
      <li>Atoms of different elements vary in mass and properties.</li>
      <li>Atoms cannot be divided, created, or destroyed (in chemical reactions they just rearrange).</li>
    </ul>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Added Detail</h4>
    <ul>
      <li>Dalton used experimental data on gas reactions to support his ideas.</li>
      <li>His model explained the Law of Conservation of Mass (total mass before and after a reaction is the same).</li>
      <li>However, Dalton's model could not explain electricity or subatomic particles — because they hadn't been discovered yet.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>📘 Diagram Description</h4>
    <p>Atoms shown as solid, featureless spheres — like tiny billiard balls.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">⚪ Subsection 3 – Thomson's Plum Pudding Model (1897)</h3>
  <div class="definition-block">
    <h4>🔵 Discovery</h4>
    <p>J. J. Thomson discovered the electron through his cathode ray tube experiment. He found that cathode rays were negatively charged particles, smaller than atoms.</p>
  </div>
  <div class="key-facts-block">
    <h4>⚙️ Model Description</h4>
    <p>The atom was imagined as a positive sphere with negative electrons embedded throughout it, like plums in a pudding. The positive "dough" balanced the negative electrons, making the atom neutral overall.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Added Detail</h4>
    <ul>
      <li>This was the first model to include subatomic particles.</li>
      <li>It explained that atoms could conduct electricity because they contained charged particles.</li>
      <li>However, it didn't explain how electrons were arranged or why atoms emitted light at specific wavelengths.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>📘 Diagram Description</h4>
    <p>Positive background with small negative dots spread evenly through it.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">🧪 Subsection 4 – Rutherford's Nuclear Model (1909)</h3>
  <div class="definition-block">
    <h4>⚙️ Experiment: Gold Foil (Alpha Scattering)</h4>
    <p>Ernest Rutherford, with Geiger and Marsden, fired alpha particles (positive helium nuclei) at thin gold foil.</p>
  </div>
  <div class="key-facts-block">
    <h4>🔬 Observations</h4>
    <ul>
      <li>Most alpha particles passed straight through → Atom mostly empty space.</li>
      <li>Some deflected slightly → Positive charge concentrated in a small area.</li>
      <li>Few bounced straight back → The positive centre (nucleus) must be tiny and dense.</li>
    </ul>
  </div>
  <div class="key-facts-block">
    <h4>🧠 More Scientific Detail</h4>
    <ul>
      <li>The positive nucleus contained most of the atom's mass.</li>
      <li>Electrons were thought to orbit the nucleus, similar to planets around the Sun.</li>
      <li>The model explained atomic scattering patterns, but couldn't explain atomic stability or emission spectra.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🧩 Impact</h4>
    <p>This was a major breakthrough — it completely replaced the Plum Pudding model.</p>
  </div>
  <div class="example-block">
    <h4>📘 Rutherford's Nuclear Model</h4>
    <p>Small, dense nucleus in the centre; electrons orbiting in space around it.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">⚡ Subsection 5 – Bohr's Planetary Model (1913)</h3>
  <div class="definition-block">
    <h4>🔵 Discovery</h4>
    <p>Niels Bohr refined Rutherford's model using results from atomic emission spectra (coloured light emitted when atoms are excited).</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 More Detail</h4>
    <ul>
      <li>Bohr realised electrons could only occupy certain fixed energy levels (shells).</li>
      <li>When electrons move between these levels, they absorb or emit specific amounts of energy (quanta).</li>
      <li>This explained why each element produces its own unique line spectrum.</li>
      <li>The idea of quantised energy levels was revolutionary and matched experimental data perfectly.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>📘 Bohr's Model Description</h4>
    <p>Electrons orbit the nucleus in set paths (energy levels), not randomly. Each shell can hold a fixed number of electrons.</p>
  </div>
  <div class="key-facts-block">
    <h4>⚙️ Key Equations (Higher Tier)</h4>
    <p>Energy absorbed/emitted ∝ 1/n₁² – 1/n₂²<br>(This relationship explained hydrogen's emission lines — evidence for quantised orbits.)</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">⚛️ Subsection 6 – Chadwick's Discovery of the Neutron (1932)</h3>
  <div class="definition-block">
    <h4>🔵 Background</h4>
    <p>After Bohr's model, scientists still couldn't explain why the atomic mass didn't match the number of protons alone.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Discovery</h4>
    <ul>
      <li>James Chadwick performed experiments involving beryllium and alpha particles, discovering a new, neutral particle — the neutron.</li>
      <li>Neutrons had no charge, but similar mass to protons.</li>
      <li>They explained why isotopes (atoms of the same element with different masses) existed.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🟢 Significance</h4>
    <ul>
      <li>Completed the modern nuclear model.</li>
      <li>Established that the nucleus contains both protons and neutrons, surrounded by electrons in fixed shells.</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>📘 Modern Atomic Model</h4>
    <p>Dense nucleus (protons + neutrons) surrounded by electrons in fixed energy levels. Atom mostly empty space.</p>
  </div>
</div>
        `,
        canonical_keywords: ["Dalton", "Thomson", "Rutherford", "Bohr", "Chadwick", "alpha scattering", "plum pudding", "nuclear model", "electron", "neutron", "energy levels"],
        practice_items: [
          {
            id: "atomic-model-1",
            prompt_template: "Describe how the discovery of the electron led to the plum pudding model. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["Thomson", "electron", "negative charge", "positive sphere", "embedded"]
          },
          {
            id: "atomic-model-2",
            prompt_template: "Explain what the alpha scattering experiment showed about the structure of the atom. Include all three key observations. [6 marks]",
            marks: 6,
            type: "open",
            difficulty: "hard",
            randomise: false,
            expected_keywords: ["alpha particles", "gold foil", "passed through", "empty space", "deflected", "nucleus", "bounced back", "dense"]
          },
          {
            id: "atomic-model-3",
            prompt_template: "Describe Bohr's contribution to the atomic model. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["Bohr", "electrons", "fixed distances", "energy levels", "shells"]
          }
        ]
      },
      {
        id: "1-1-4-subatomic-particles",
        title: "1.1.4 RELATIVE ELECTRICAL CHARGES",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – The Three Subatomic Particles</h3>
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr><th>Particle</th><th>Symbol</th><th>Relative Charge</th><th>Relative Mass</th><th>Location</th></tr>
      </thead>
      <tbody>
        <tr><td>Proton</td><td>p⁺</td><td>+1</td><td>1</td><td>In the nucleus</td></tr>
        <tr><td>Neutron</td><td>n⁰</td><td>0</td><td>1</td><td>In the nucleus</td></tr>
        <tr><td>Electron</td><td>e⁻</td><td>–1</td><td>1/1836 (≈0)</td><td>In shells</td></tr>
      </tbody>
    </table>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Why Atoms Are Neutral</h3>
  <div class="definition-block">
    <h4>🔵 Explanation</h4>
    <p>Atoms are electrically neutral because the number of positive protons equals the number of negative electrons.</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Atomic Number and Mass Number</h3>
  <div class="definition-block">
    <h4>🔵 Definitions</h4>
    <ul>
      <li><strong>Atomic number (Z):</strong> Number of protons</li>
      <li><strong>Mass number (A):</strong> Total protons + neutrons</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🟢 Example</h4>
    <p>For chlorine-35 (³⁵₁₇Cl): Protons = 17, Neutrons = 18, Electrons = 17</p>
  </div>
</div>
        `,
        canonical_keywords: ["proton", "neutron", "electron", "charge", "mass", "nucleus", "atomic number", "mass number"],
        practice_items: [
          {
            id: "subatomic-1",
            prompt_template: "State the relative charge and relative mass of a proton, neutron, and electron. [3 marks]",
            marks: 3,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["proton", "+1", "neutron", "0", "electron", "-1", "mass", "1"]
          },
          {
            id: "subatomic-2",
            prompt_template: "Explain why atoms have no overall electrical charge. [2 marks]",
            marks: 2,
            type: "open",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["protons", "electrons", "equal", "positive", "negative", "cancel"]
          },
          {
            id: "subatomic-3",
            prompt_template: "An atom of magnesium is ²⁴₁₂Mg. Calculate the number of protons, neutrons, and electrons. [3 marks]",
            marks: 3,
            type: "short-answer",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["protons", "12", "neutrons", "12", "electrons", "12"]
          }
        ]
      },
      {
        id: "1-1-5-size-mass",
        title: "1.1.5 SIZE AND MASS OF ATOMS",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – The Size of Atoms</h3>
  <div class="key-facts-block">
    <h4>🧠 Key Facts</h4>
    <ul>
      <li>Atoms are extremely small — radius ≈ 1 × 10⁻¹⁰ m (0.1 nanometres)</li>
      <li>The nucleus is about 1 × 10⁻¹⁴ m, roughly 10,000 times smaller than the atom itself</li>
      <li>Almost all of an atom is empty space</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🟢 Visual Idea</h4>
    <p>If the atom were the size of a football stadium → the nucleus would be the size of a pea at the centre.</p>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Always include both atomic and nucleus radii if asked for a comparison.</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – The Mass of an Atom</h3>
  <div class="key-facts-block">
    <h4>🧠 Key Points</h4>
    <p>Most of an atom's mass is concentrated in the nucleus, which contains protons and neutrons.</p>
    <p>Electrons have a negligible mass compared to nucleons.</p>
  </div>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Particle</th><th>Relative Mass</th></tr></thead>
      <tbody>
        <tr><td>Proton</td><td>1</td></tr>
        <tr><td>Neutron</td><td>1</td></tr>
        <tr><td>Electron</td><td>Very small (≈1/1836)</td></tr>
      </tbody>
    </table>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Isotopes</h3>
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>Isotopes are atoms of the same element that have the same number of protons but different numbers of neutrons.</p>
  </div>
  <div class="example-block">
    <h4>🟢 Example: Hydrogen Isotopes</h4>
    <table class="data-table">
      <thead><tr><th>Isotope</th><th>Protons</th><th>Neutrons</th><th>Electrons</th></tr></thead>
      <tbody>
        <tr><td>Hydrogen-1 (¹₁H)</td><td>1</td><td>0</td><td>1</td></tr>
        <tr><td>Deuterium (²₁H)</td><td>1</td><td>1</td><td>1</td></tr>
        <tr><td>Tritium (³₁H)</td><td>1</td><td>2</td><td>1</td></tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: ["atomic radius", "nucleus", "10⁻¹⁰", "10⁻¹⁴", "isotopes", "neutrons", "mass", "empty space"],
        practice_items: [
          {
            id: "size-mass-1",
            prompt_template: "State the approximate radius of an atom and the radius of its nucleus. [2 marks]",
            marks: 2,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["1 × 10⁻¹⁰", "atom", "1 × 10⁻¹⁴", "nucleus"]
          },
          {
            id: "size-mass-2",
            prompt_template: "Explain why isotopes of the same element have the same chemical properties but different physical properties. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "hard",
            randomise: false,
            expected_keywords: ["same protons", "same electrons", "chemical", "different neutrons", "different mass", "physical"]
          }
        ]
      },
      {
        id: "1-1-6-relative-atomic-mass",
        title: "1.1.6 RELATIVE ATOMIC MASS (Aᵣ)",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What is Relative Atomic Mass?</h3>
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The relative atomic mass (Aᵣ) of an element is the average mass of all its isotopes, weighted according to their abundance, compared with 1/12 of the mass of a carbon-12 atom.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Key Ideas</h4>
    <ul>
      <li>Elements often exist as mixtures of isotopes</li>
      <li>The relative atomic mass is not a whole number because it's an average</li>
      <li>Carbon-12 is used as the standard reference atom</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🟢 Example</h4>
    <p>Chlorine has two main isotopes: ³⁵Cl (abundance 75%) and ³⁷Cl (abundance 25%)</p>
    <p>Its average atomic mass (Aᵣ) = 35.5, not 35 or 37, because it's a weighted mean.</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Formula for Calculating Aᵣ</h3>
  <div class="definition-block">
    <h4>🔴 Equation</h4>
    <p>Aᵣ = [(mass of isotope₁ × % abundance₁) + (mass of isotope₂ × % abundance₂)] ÷ 100</p>
  </div>
  <div class="example-block">
    <h4>🟢 Worked Example</h4>
    <p><strong>Question:</strong> A sample of rubidium contains 72% of Rb-85 and 28% of Rb-87. Calculate Aᵣ.</p>
    <p><strong>Solution:</strong></p>
    <p>Aᵣ = [(85 × 72) + (87 × 28)] ÷ 100</p>
    <p>Aᵣ = [6120 + 2436] ÷ 100 = 85.56</p>
    <p><strong>Answer:</strong> Aᵣ = 85.6</p>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Always multiply each mass by its % abundance, then divide by 100. Round only at the end.</p>
  </div>
</div>
        `,
        canonical_keywords: ["relative atomic mass", "Aᵣ", "isotopes", "abundance", "weighted average", "carbon-12"],
        practice_items: [
          {
            id: "ar-1",
            prompt_template: "Define relative atomic mass. [2 marks]",
            marks: 2,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["average mass", "isotopes", "abundance", "carbon-12"]
          },
          {
            id: "ar-2",
            prompt_template: "A sample of copper contains 69% of ⁶³Cu and 31% of ⁶⁵Cu. Calculate the relative atomic mass. Show your working. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["63", "69", "65", "31", "multiply", "divide", "100", "63.62"]
          }
        ]
      },
      {
        id: "1-1-7-electronic-structure",
        title: "1.1.7 ELECTRONIC STRUCTURE",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – How Electrons Fill Energy Levels</h3>
  <div class="definition-block">
    <h4>🔵 Key Concept</h4>
    <p>Electrons orbit the nucleus in regions called energy levels (or shells). Each shell can hold a limited number of electrons.</p>
  </div>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Shell</th><th>Maximum Electrons</th><th>Notes</th></tr></thead>
      <tbody>
        <tr><td>1st (closest to nucleus)</td><td>2</td><td>Lowest energy level</td></tr>
        <tr><td>2nd</td><td>8</td><td>Next energy level</td></tr>
        <tr><td>3rd</td><td>8</td><td>Fills up after 2nd for the first 20 elements</td></tr>
      </tbody>
    </table>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Key Rule</h4>
    <p>Electrons fill the lowest available energy level first, before moving to higher ones.</p>
    <p><strong>Example:</strong> Magnesium (atomic number 12) → 2,8,2</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Writing Electronic Configurations</h3>
  <div class="definition-block">
    <h4>🔵 What is Electronic Configuration?</h4>
    <p>It's a shorthand way to describe how electrons are arranged in shells.</p>
  </div>
  <div class="example-block">
    <h4>🟢 Examples</h4>
    <p>Sodium (Na, Z = 11): 2,8,1</p>
    <p>Chlorine (Cl, Z = 17): 2,8,7</p>
    <p>Calcium (Ca, Z = 20): 2,8,8,2</p>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 How to Write Configurations</h4>
    <ul>
      <li>Find atomic number → number of electrons</li>
      <li>Fill shells in order: 2,8,8,2 (up to element 20)</li>
      <li>Separate numbers with commas</li>
    </ul>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Electronic Structure and the Periodic Table</h3>
  <div class="key-facts-block">
    <h4>🧠 Key Points</h4>
    <ul>
      <li>Group number = number of outer shell electrons</li>
      <li>Period number = number of shells used</li>
      <li>Outer electrons control chemical reactivity</li>
    </ul>
  </div>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Group</th><th>Outer Electrons</th><th>Example</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>1</td><td>Sodium (Na): 2,8,1</td></tr>
        <tr><td>2</td><td>2</td><td>Magnesium (Mg): 2,8,2</td></tr>
        <tr><td>7</td><td>7</td><td>Chlorine (Cl): 2,8,7</td></tr>
        <tr><td>0 (8)</td><td>8 (full)</td><td>Neon (Ne): 2,8</td></tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: ["electronic structure", "shells", "energy levels", "configuration", "2,8,8", "outer electrons", "group"],
        practice_items: [
          {
            id: "electronic-1",
            prompt_template: "Write the electronic configuration for aluminium (atomic number 13). [1 mark]",
            marks: 1,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["2,8,3"]
          },
          {
            id: "electronic-2",
            prompt_template: "Explain the relationship between the group number and the number of outer shell electrons for elements in Groups 1-7. [2 marks]",
            marks: 2,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["group number", "same as", "outer electrons", "shell"]
          },
          {
            id: "electronic-3",
            prompt_template: "An element has the electronic configuration 2,8,7. State its group number and explain why elements in this group are reactive. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "hard",
            randomise: false,
            expected_keywords: ["Group 7", "7 outer electrons", "need 1 more", "full shell", "gain electron"]
          }
        ]
      },
      {
        id: "1-2-1-periodic-table",
        title: "1.2.1 THE PERIODIC TABLE",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Structure of the Periodic Table</h3>
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The Periodic Table arranges all known elements in order of increasing atomic number.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Key Terms</h4>
    <ul>
      <li><strong>Groups:</strong> Vertical columns (numbered 1-7 and 0)</li>
      <li><strong>Periods:</strong> Horizontal rows</li>
      <li>Elements in the same group have similar properties</li>
    </ul>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Why It's Called "Periodic"</h3>
  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <p>The table is called periodic because patterns in properties repeat at regular intervals as you go across the table.</p>
    <ul>
      <li>Elements in Group 1 (Li, Na, K) are all reactive metals</li>
      <li>Elements in Group 7 (F, Cl, Br, I) are all reactive non-metals</li>
      <li>Elements in Group 0 (He, Ne, Ar) are unreactive gases</li>
    </ul>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Groups and Periods</h3>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Group</th><th>Example Elements</th><th>Outer Electrons</th><th>Type</th><th>Typical Ion</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>Li, Na, K</td><td>1</td><td>Metals</td><td>+1</td></tr>
        <tr><td>2</td><td>Be, Mg, Ca</td><td>2</td><td>Metals</td><td>+2</td></tr>
        <tr><td>7</td><td>F, Cl, Br, I</td><td>7</td><td>Non-metals</td><td>-1</td></tr>
        <tr><td>0</td><td>He, Ne, Ar</td><td>8 (full shell)</td><td>Noble gases</td><td>None</td></tr>
      </tbody>
    </table>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Remember: All Group 1 metals form compounds with Group 7 halogens in a 1:1 ratio (e.g. NaCl, KBr).</p>
  </div>
</div>
        `,
        canonical_keywords: ["periodic table", "groups", "periods", "atomic number", "properties", "metals", "non-metals", "noble gases"],
        practice_items: [
          {
            id: "periodic-1",
            prompt_template: "State what is meant by a group in the periodic table. [1 mark]",
            marks: 1,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["vertical column", "same outer electrons"]
          },
          {
            id: "periodic-2",
            prompt_template: "Explain why elements in the same group have similar chemical properties. [2 marks]",
            marks: 2,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["same number", "outer electrons", "react similarly", "chemical properties"]
          }
        ]
      },
      {
        id: "1-2-2-development-periodic-table",
        title: "1.2.2 DEVELOPMENT OF THE PERIODIC TABLE",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Early Classification of Elements</h3>
  <div class="key-facts-block">
    <h4>🧠 Early Attempts</h4>
    <ul>
      <li><strong>Dobereiner's Triads (1817):</strong> Grouped elements in threes with similar properties. Middle element's atomic mass ≈ average of other two. Problem: Didn't work for all known elements.</li>
      <li><strong>Newlands' Law of Octaves (1864):</strong> Arranged elements by increasing atomic weight. Every 8th element had similar properties. Problems: Didn't leave gaps for new elements; mixed metals and non-metals together.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Mendeleev's Periodic Table (1869)</h3>
  <div class="definition-block">
    <h4>🔵 Key Ideas</h4>
    <p>Dmitri Mendeleev arranged the 63 known elements in order of increasing atomic weight. He grouped elements with similar chemical properties in the same column.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Mendeleev's Genius Moves</h4>
    <ul>
      <li><strong>Left Gaps for Missing Elements:</strong> Predicted the existence and properties of new elements like gallium, scandium, and germanium</li>
      <li><strong>Reordered Some Elements:</strong> Swapped elements that didn't fit by weight to better match chemical properties</li>
      <li><strong>Grouped by Properties:</strong> Elements in the same group had similar reactions</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🟢 Example: Mendeleev's Predictions</h4>
    <p>When gallium and germanium were discovered later, their measured properties matched Mendeleev's predictions exactly — proving his model was correct.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – The Modern Periodic Table</h3>
  <div class="definition-block">
    <h4>🔵 What Changed</h4>
    <p>In the early 20th century, scientists discovered protons and realised that elements are best arranged by atomic number (number of protons), not atomic mass.</p>
  </div>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Feature</th><th>Mendeleev's Table</th><th>Modern Table</th></tr></thead>
      <tbody>
        <tr><td>Basis of order</td><td>Atomic weight</td><td>Atomic number</td></tr>
        <tr><td>Gaps left</td><td>Yes (for new elements)</td><td>No (all known elements included)</td></tr>
        <tr><td>Noble gases</td><td>Not discovered yet</td><td>Present (Group 0)</td></tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: ["Mendeleev", "periodic table", "development", "atomic number", "Dobereiner", "Newlands", "predictions"],
        practice_items: [
          {
            id: "dev-pt-1",
            prompt_template: "Explain how Mendeleev overcame the problems with earlier attempts to classify elements. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "hard",
            randomise: false,
            expected_keywords: ["gaps", "predicted", "properties", "reordered", "chemical properties", "gallium", "germanium"]
          }
        ]
      },
      {
        id: "1-2-3-metals-non-metals",
        title: "1.2.3 METALS AND NON-METALS",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Where They Are Found</h3>
  <div class="definition-block">
    <h4>🔵 Key Idea</h4>
    <p>The Periodic Table is roughly divided by a diagonal "staircase line." Elements to the left and below this line are metals. Elements to the right and above are non-metals.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Physical Properties</h3>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Property</th><th>Metals</th><th>Non-Metals</th></tr></thead>
      <tbody>
        <tr><td>State at room temp</td><td>Mostly solid (except mercury)</td><td>Many gases or brittle solids</td></tr>
        <tr><td>Appearance</td><td>Shiny (lustrous)</td><td>Dull</td></tr>
        <tr><td>Melting & Boiling Point</td><td>High</td><td>Low</td></tr>
        <tr><td>Density</td><td>Usually high</td><td>Usually low</td></tr>
        <tr><td>Conductivity</td><td>Conduct heat & electricity</td><td>Poor conductors (insulators)</td></tr>
        <tr><td>Malleability</td><td>Malleable and ductile</td><td>Brittle if solid</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Chemical Properties</h3>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Property</th><th>Metals</th><th>Non-Metals</th></tr></thead>
      <tbody>
        <tr><td>Ion formation</td><td>Lose electrons → positive ions</td><td>Gain/share electrons → negative ions or covalent bonds</td></tr>
        <tr><td>Type of bonding</td><td>Metallic or Ionic</td><td>Covalent</td></tr>
        <tr><td>Reaction with Oxygen</td><td>Metal oxides (basic)</td><td>Non-metal oxides (acidic)</td></tr>
      </tbody>
    </table>
  </div>
  <div class="example-block">
    <h4>🟢 Examples</h4>
    <ul>
      <li><strong>Metal + Oxygen:</strong> 2Mg + O₂ → 2MgO (basic)</li>
      <li><strong>Non-metal + Oxygen:</strong> C + O₂ → CO₂ (acidic)</li>
    </ul>
  </div>
</div>
        `,
        canonical_keywords: ["metals", "non-metals", "conductivity", "malleability", "oxides", "basic", "acidic"],
        practice_items: [
          {
            id: "metal-nm-1",
            prompt_template: "Compare the physical properties of metals and non-metals. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["conductivity", "malleability", "melting point", "density", "shiny", "dull", "brittle"]
          }
        ]
      },
      {
        id: "1-2-4-group-0",
        title: "1.2.4 GROUP 0 (THE NOBLE GASES)",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Introducing the Noble Gases</h3>
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The noble gases are the elements in Group 0 (sometimes called Group 8) of the periodic table: Helium (He), Neon (Ne), Argon (Ar), Krypton (Kr), Xenon (Xe), Radon (Rn).</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Key Facts</h4>
    <ul>
      <li>Found on the far right-hand side of the periodic table</li>
      <li>All are non-metals and exist as single atoms (monatomic)</li>
      <li>Colourless, odourless gases at room temperature</li>
      <li>They all have full outer electron shells</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Electronic Structure and Stability</h3>
  <div class="definition-block">
    <h4>🔵 Key Idea</h4>
    <p>Each noble gas has a complete outer shell of electrons. This makes them very stable and chemically unreactive.</p>
  </div>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Element</th><th>Atomic Number</th><th>Electron Configuration</th><th>Outer Electrons</th></tr></thead>
      <tbody>
        <tr><td>Helium</td><td>2</td><td>2</td><td>2</td></tr>
        <tr><td>Neon</td><td>10</td><td>2,8</td><td>8</td></tr>
        <tr><td>Argon</td><td>18</td><td>2,8,8</td><td>8</td></tr>
      </tbody>
    </table>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Always mention "full outer shell" when explaining unreactivity.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Physical Properties and Trends</h3>
  <div class="definition-block">
    <h4>🔵 Trend Down Group 0</h4>
    <p>As you go down Group 0: atoms get larger, intermolecular forces get stronger, boiling points and densities increase.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Uses of the Noble Gases</h3>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Noble Gas</th><th>Uses</th><th>Reason</th></tr></thead>
      <tbody>
        <tr><td>Helium (He)</td><td>Balloons, airships</td><td>Low density, non-flammable</td></tr>
        <tr><td>Neon (Ne)</td><td>Advertising lights</td><td>Glows brightly when electricity passes through</td></tr>
        <tr><td>Argon (Ar)</td><td>Inert atmosphere for welding & in light bulbs</td><td>Prevents metal from reacting with oxygen</td></tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: ["noble gases", "Group 0", "helium", "neon", "argon", "unreactive", "full outer shell", "monatomic"],
        practice_items: [
          {
            id: "group0-1",
            prompt_template: "Explain why the noble gases are unreactive. [2 marks]",
            marks: 2,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["full outer shell", "stable", "no need to react", "gain", "lose", "share"]
          }
        ]
      },
      {
        id: "1-2-5-group-1",
        title: "1.2.5 GROUP 1: THE ALKALI METALS",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Electronic Structure</h3>
  <div class="key-facts-block">
    <h4>🧠 Key Facts</h4>
    <ul>
      <li>Each Group 1 atom has one electron in its outer shell</li>
      <li>This outer electron is easily lost, forming a +1 ion</li>
    </ul>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Reaction with Water</h3>
  <div class="definition-block">
    <h4>🔵 General Reaction</h4>
    <p>Metal + Water → Metal Hydroxide + Hydrogen</p>
  </div>
  <div class="example-block">
    <h4>🟢 Examples</h4>
    <ul>
      <li><strong>Lithium:</strong> Fizzes gently, moves slowly</li>
      <li><strong>Sodium:</strong> Fizzes strongly, melts into ball, yellow flame</li>
      <li><strong>Potassium:</strong> Violent reaction, lilac flame, explodes</li>
    </ul>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Trend in Reactivity</h3>
  <div class="definition-block">
    <h4>🔵 Pattern</h4>
    <p>Reactivity increases down the group: K > Na > Li</p>
    <p><strong>Reason:</strong> Outer electron farther from nucleus → weaker attraction → easier to lose</p>
  </div>
</div>
        `,
        canonical_keywords: ["alkali metals", "Group 1", "lithium", "sodium", "potassium", "water", "reactivity", "outer electron", "+1 ion"],
        practice_items: [
          {
            id: "group1-1",
            prompt_template: "Describe what you would see when sodium reacts with water. Write a balanced symbol equation for this reaction. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["fizzes", "yellow flame", "melts", "moves", "2Na", "2H₂O", "2NaOH", "H₂"]
          },
          {
            id: "group1-2",
            prompt_template: "Explain why potassium is more reactive than sodium. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["outer electron", "further from nucleus", "weaker attraction", "easier to lose", "more shells"]
          }
        ]
      },
      {
        id: "1-2-6-group-7",
        title: "1.2.6 GROUP 7: THE HALOGENS",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Introducing the Halogens</h3>
  <div class="definition-block">
    <h4>🔵 Key Facts</h4>
    <ul>
      <li>Group 7 non-metals: Fluorine, Chlorine, Bromine, Iodine</li>
      <li>Exist as diatomic molecules (F₂, Cl₂, Br₂, I₂)</li>
      <li>Have 7 electrons in outer shell</li>
      <li>Very reactive with metals</li>
    </ul>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Physical Properties</h3>
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr><th>Halogen</th><th>State</th><th>Colour</th></tr>
      </thead>
      <tbody>
        <tr><td>Chlorine</td><td>Gas</td><td>Green</td></tr>
        <tr><td>Bromine</td><td>Liquid</td><td>Red-brown</td></tr>
        <tr><td>Iodine</td><td>Solid</td><td>Grey-black</td></tr>
      </tbody>
    </table>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Displacement Reactions</h3>
  <div class="definition-block">
    <h4>🔵 Rule</h4>
    <p>A more reactive halogen displaces a less reactive halogen from its compound.</p>
    <p><strong>Reactivity:</strong> F₂ > Cl₂ > Br₂ > I₂</p>
  </div>
  <div class="example-block">
    <h4>🟢 Example</h4>
    <p>Cl₂ + 2NaBr → 2NaCl + Br₂</p>
    <p>Observation: Orange solution (bromine formed)</p>
  </div>
</div>
        `,
        canonical_keywords: ["halogens", "Group 7", "chlorine", "bromine", "iodine", "displacement", "reactivity", "diatomic"],
        practice_items: [
          {
            id: "group7-1",
            prompt_template: "Describe the physical properties of chlorine, bromine, and iodine including their state and colour. [3 marks]",
            marks: 3,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["chlorine", "gas", "green", "bromine", "liquid", "red-brown", "iodine", "solid", "grey"]
          },
          {
            id: "group7-2",
            prompt_template: "Explain what happens when chlorine is added to a solution of potassium bromide. Write a balanced equation. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "hard",
            randomise: false,
            expected_keywords: ["displacement", "chlorine", "more reactive", "bromine", "Cl₂", "KBr", "KCl", "Br₂", "orange"]
          },
          {
            id: "group7-3",
            prompt_template: "Explain why fluorine is more reactive than iodine. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["outer shell", "closer to nucleus", "stronger attraction", "easier to gain electron", "fewer shells"]
          }
        ]
      },
      {
        id: "1-3-1-transition-metals-comparison",
        title: "1.3.1 COMPARISON OF TRANSITION METALS WITH GROUP 1 ELEMENTS",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Where They Are Found</h3>
  <div class="key-facts-block">
    <ul>
      <li>Group 1 elements: the alkali metals — found on the far left of the periodic table</li>
      <li>Transition metals: located in the centre block (between Groups 2 and 3)</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Physical Property Comparison</h3>
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr><th>Property</th><th>Group 1 Metals</th><th>Transition Metals</th></tr>
      </thead>
      <tbody>
        <tr><td>Density</td><td>Low (Li, Na, K float on water)</td><td>High (Fe, Cu sink)</td></tr>
        <tr><td>Hardness</td><td>Very soft (cut with knife)</td><td>Hard and strong</td></tr>
        <tr><td>Melting/Boiling Point</td><td>Low</td><td>High</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Chemical Property Comparison</h3>
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr><th>Property</th><th>Group 1 Metals</th><th>Transition Metals</th></tr>
      </thead>
      <tbody>
        <tr><td>Reactivity</td><td>Very reactive</td><td>Much less reactive</td></tr>
        <tr><td>Reaction with Water</td><td>Vigorous → metal hydroxide + H₂</td><td>Slow or no reaction</td></tr>
        <tr><td>Reaction with Oxygen</td><td>React quickly → white oxides</td><td>Form coloured oxides</td></tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: ["transition metals", "Group 1", "alkali metals", "density", "reactivity", "hardness"],
        practice_items: [
          {
            id: "trans-comp-1",
            prompt_template: "Compare the physical properties of Group 1 metals and transition metals. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["density", "hardness", "melting point", "Group 1", "soft", "low density", "transition", "hard", "high density"]
          }
        ]
      },
      {
        id: "1-3-2-typical-transition-properties",
        title: "1.3.2 TYPICAL PROPERTIES OF TRANSITION METALS",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – General Physical Properties</h3>
  <div class="key-facts-block">
    <ul>
      <li>High melting and boiling points</li>
      <li>High density</li>
      <li>Good conductors of heat and electricity</li>
      <li>Hard and strong</li>
      <li>Malleable and ductile</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Chemical Properties</h3>
  <div class="definition-block">
    <h4>🔵 Key Properties</h4>
    <ul>
      <li><strong>Variable oxidation states:</strong> Can form ions with different charges (e.g., Fe²⁺ and Fe³⁺)</li>
      <li><strong>Form coloured compounds:</strong> Each ion absorbs different wavelengths of light</li>
      <li><strong>Catalytic activity:</strong> Increase rate of reactions without being used up</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Coloured Compounds</h3>
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr><th>Compound</th><th>Colour</th></tr>
      </thead>
      <tbody>
        <tr><td>CuSO₄ (aq)</td><td>Blue</td></tr>
        <tr><td>FeSO₄ (aq)</td><td>Pale green</td></tr>
        <tr><td>FeCl₃ (aq)</td><td>Yellow/brown</td></tr>
        <tr><td>NiSO₄ (aq)</td><td>Green</td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Catalytic Properties</h3>
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr><th>Catalyst</th><th>Reaction</th><th>Use</th></tr>
      </thead>
      <tbody>
        <tr><td>Iron (Fe)</td><td>N₂ + 3H₂ ⇌ 2NH₃</td><td>Haber Process (ammonia)</td></tr>
        <tr><td>Nickel (Ni)</td><td>Hydrogenation of alkenes</td><td>Making margarine</td></tr>
        <tr><td>Platinum (Pt)</td><td>Converts CO → CO₂</td><td>Catalytic converters</td></tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: ["transition metals", "catalysts", "coloured compounds", "variable oxidation states", "iron", "copper", "nickel"],
        practice_items: [
          {
            id: "trans-prop-1",
            prompt_template: "Explain why transition metals form coloured compounds. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "hard",
            randomise: false,
            expected_keywords: ["d-orbital", "electrons", "absorb", "light", "wavelengths", "reflected", "colour"]
          }
        ]
      }
    ]
  },
  {
    id: "bonding-structure",
    title: "Bonding, structure & the properties of matter",
    status: "ready",
    subsections: [
      {
        id: "2-1-1-chemical-bonds",
        title: "2.1.1 CHEMICAL BONDS",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What Are Chemical Bonds?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>A chemical bond is a strong attraction that holds atoms or ions together in compounds or elements. Bonds form because atoms want to achieve a full outer shell of electrons — the same stable arrangement as noble gases.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <p>When atoms bond, they either:</p>
    <ul>
      <li><strong>Transfer electrons</strong> (ionic bonding),</li>
      <li><strong>Share electrons</strong> (covalent bonding), or</li>
      <li><strong>Pool electrons</strong> (metallic bonding).</li>
    </ul>
    <p>The result is a more stable structure with lower energy.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – The Three Types of Strong Chemical Bonds</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Type of Bond</th>
          <th>Occurs Between</th>
          <th>How It Works</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Ionic</strong></td>
          <td>Metal + Non-metal</td>
          <td>Electrons are transferred from the metal to the non-metal, forming positive and negative ions held by electrostatic forces.</td>
          <td>Sodium chloride (NaCl)</td>
        </tr>
        <tr>
          <td><strong>Covalent</strong></td>
          <td>Non-metal + Non-metal</td>
          <td>Electrons are shared between atoms to achieve full outer shells.</td>
          <td>Water (H₂O), Oxygen (O₂)</td>
        </tr>
        <tr>
          <td><strong>Metallic</strong></td>
          <td>Metal + Metal</td>
          <td>Positive metal ions are held together by a sea of delocalised electrons that move freely throughout the structure.</td>
          <td>Copper (Cu), Iron (Fe)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Quick Summary</h4>
    <ul>
      <li><strong>Ionic → Transfer</strong></li>
      <li><strong>Covalent → Share</strong></li>
      <li><strong>Metallic → Delocalise</strong></li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Particles Involved in Each Bond Type</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Bond Type</th>
          <th>Particles Involved</th>
          <th>Attraction Between</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ionic</td>
          <td>Positive metal ions and negative non-metal ions</td>
          <td>Oppositely charged ions</td>
        </tr>
        <tr>
          <td>Covalent</td>
          <td>Non-metal atoms</td>
          <td>Shared pair(s) of electrons</td>
        </tr>
        <tr>
          <td>Metallic</td>
          <td>Metal atoms and delocalised electrons</td>
          <td>Positive ions ↔ delocalised electrons</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="key-facts-block">
    <h4>📘 Diagram Reminder (Visual Summary)</h4>
    <ul>
      <li><strong>Ionic</strong> → alternating + and – ions in a lattice</li>
      <li><strong>Covalent</strong> → overlapping electron shells (shared pairs)</li>
      <li><strong>Metallic</strong> → positive ion lattice + moving electrons</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Why Bonds Form (Energy Explanation)</h3>
  
  <div class="definition-block">
    <h4>⚡ The Stability Rule</h4>
    <p>Atoms bond to reach full outer shells (usually 8 electrons). When they do, they become more stable (lower potential energy).</p>
  </div>

  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Type of Bond</th>
          <th>Electron Movement</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ionic</td>
          <td>Transfer</td>
          <td>Both atoms gain stable electronic structures</td>
        </tr>
        <tr>
          <td>Covalent</td>
          <td>Share</td>
          <td>Each atom has a complete shell</td>
        </tr>
        <tr>
          <td>Metallic</td>
          <td>Delocalise</td>
          <td>Metal ions surrounded by electrons for stability</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🔋 Energy Change</h4>
    <p><strong>Bond formation = exothermic</strong> (energy released). <strong>Breaking bonds = endothermic</strong> (energy absorbed).</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Strength of Bonds</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Strength</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ionic</td>
          <td>Strong</td>
          <td>Electrostatic attraction acts in all directions in a lattice.</td>
        </tr>
        <tr>
          <td>Covalent</td>
          <td>Strong</td>
          <td>Shared electrons tightly hold atoms together.</td>
        </tr>
        <tr>
          <td>Metallic</td>
          <td>Strong</td>
          <td>Delocalised electrons form strong attraction to positive ions.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Important Note</h4>
    <p>Even though these are all "strong" bonds, remember: The forces between molecules (intermolecular forces) in simple covalent substances are weak — that's why many covalent substances are gases or liquids.</p>
  </div>
</div>
        `,
        canonical_keywords: ["chemical bonds", "ionic bonding", "covalent bonding", "metallic bonding", "electrons", "transfer", "share", "delocalised", "electrostatic forces"],
        practice_items: [
          {
            id: "bonds-1",
            prompt_template: "Describe the three types of strong chemical bonds and explain when each type forms. [6 marks]",
            marks: 6,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["ionic", "covalent", "metallic", "transfer", "share", "delocalised", "metal", "non-metal"]
          },
          {
            id: "bonds-2",
            prompt_template: "Explain why atoms form chemical bonds. Use the concept of stability in your answer. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["stable", "full outer shell", "noble gas", "lower energy"]
          }
        ]
      },
      {
        id: "2-1-2-ionic-bonding",
        title: "2.1.2 IONIC BONDING",
        type: "content",
        study_group: 1,
        content_html: `
<div class="note-block">
  <p><strong>📝 This section is one of the most examined in Paper 1.</strong> You must be able to describe how ions form, draw dot-and-cross diagrams, and explain ionic charges and forces in terms of electrostatic attraction.</p>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What Is Ionic Bonding?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>Ionic bonding is the electrostatic attraction between oppositely charged ions (positive and negative).</p>
    <p>It happens when:</p>
    <ul>
      <li>A metal atom <strong>loses electrons</strong> to form a <strong>positive ion (cation)</strong>.</li>
      <li>A non-metal atom <strong>gains those electrons</strong> to form a <strong>negative ion (anion)</strong>.</li>
    </ul>
    <p>Both atoms end up with full outer electron shells, achieving a stable noble gas configuration.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Formation of Ionic Bonds (Step-by-Step)</h3>
  
  <div class="example-block">
    <h4>🧪 Example 1 – Sodium and Chlorine</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Atom</th>
          <th>Electronic Structure</th>
          <th>What Happens</th>
          <th>Ion Formed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sodium (Na)</td>
          <td>2,8,1</td>
          <td>Loses 1 electron</td>
          <td>Na⁺</td>
        </tr>
        <tr>
          <td>Chlorine (Cl)</td>
          <td>2,8,7</td>
          <td>Gains 1 electron</td>
          <td>Cl⁻</td>
        </tr>
      </tbody>
    </table>
    
    <p><strong>Result:</strong></p>
    <p>Na → Na⁺ + e⁻</p>
    <p>Cl + e⁻ → Cl⁻</p>
    
    <p><strong>Word Equation:</strong><br>
    Sodium + Chlorine → Sodium chloride</p>
    
    <p><strong>Dot-and-Cross Diagram (described):</strong></p>
    <ul>
      <li>Sodium atom transfers one outer electron (shown by a cross) to chlorine's outer shell (shown by a dot).</li>
      <li>Sodium now has a full 2,8 shell (Na⁺) and chlorine has a full 2,8,8 shell (Cl⁻).</li>
      <li>Brackets are drawn around each ion with charges written outside.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🧪 Example 2 – Magnesium and Oxygen</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Atom</th>
          <th>Electronic Structure</th>
          <th>Change</th>
          <th>Ion Formed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Magnesium (Mg)</td>
          <td>2,8,2</td>
          <td>Loses 2 electrons</td>
          <td>Mg²⁺</td>
        </tr>
        <tr>
          <td>Oxygen (O)</td>
          <td>2,6</td>
          <td>Gains 2 electrons</td>
          <td>O²⁻</td>
        </tr>
      </tbody>
    </table>
    
    <p><strong>Result:</strong></p>
    <p>Mg → Mg²⁺ + 2e⁻</p>
    <p>O + 2e⁻ → O²⁻</p>
    
    <p><strong>Dot-and-Cross Diagram (described):</strong></p>
    <ul>
      <li>Two crosses (electrons from Mg) are transferred to oxygen's outer shell.</li>
      <li>Brackets around Mg²⁺ and O²⁻ with charges labelled.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🧪 Example 3 – Calcium and Chlorine</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Element</th>
          <th>Electronic Structure</th>
          <th>Change</th>
          <th>Ion Formed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Calcium (Ca)</td>
          <td>2,8,8,2</td>
          <td>Loses 2 electrons</td>
          <td>Ca²⁺</td>
        </tr>
        <tr>
          <td>Chlorine (Cl)</td>
          <td>2,8,7</td>
          <td>Gains 1 electron</td>
          <td>Cl⁻ (×2)</td>
        </tr>
      </tbody>
    </table>
    
    <p><strong>Equation:</strong><br>
    Ca + Cl₂ → CaCl₂</p>
    
    <p><strong>Explanation:</strong><br>
    Each chlorine atom gains one electron → two Cl⁻ ions for every Ca²⁺ ion.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Charges on Ions in Groups 1, 2, 6, and 7</h3>
  
  <div class="exam-tip-block">
    <h4>🧠 Rule</h4>
    <p>The charge equals the number of electrons lost or gained.</p>
  </div>

  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Group</th>
          <th>Example Element</th>
          <th>Ion Formed</th>
          <th>Charge Pattern</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Sodium (Na)</td>
          <td>Na⁺</td>
          <td>+1 (Lose 1 electron)</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Magnesium (Mg)</td>
          <td>Mg²⁺</td>
          <td>+2 (Lose 2 electrons)</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Oxygen (O)</td>
          <td>O²⁻</td>
          <td>-2 (Gain 2 electrons)</td>
        </tr>
        <tr>
          <td>7</td>
          <td>Chlorine (Cl)</td>
          <td>Cl⁻</td>
          <td>-1 (Gain 1 electron)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Shortcut</h4>
    <p>Group number = electrons in outer shell → number of electrons lost or gained to reach 8.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Dot-and-Cross Diagram Skills</h3>
  
  <div class="key-facts-block">
    <h4>🧠 How to Draw Step-by-Step:</h4>
    <ol>
      <li>Write electron configurations for both atoms.</li>
      <li>Show transfer of electrons with arrows.</li>
      <li>Use dots for one atom's electrons and crosses for the other's.</li>
      <li>Put brackets around each ion.</li>
      <li>Write charges outside brackets (+1, +2, -1, -2).</li>
    </ol>
  </div>

  <div class="example-block">
    <h4>📝 Common Examples You Must Know:</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Compound</th>
          <th>Metal</th>
          <th>Non-Metal</th>
          <th>Diagram Summary</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>NaCl</td>
          <td>Na →</td>
          <td>1 electron transferred</td>
          <td>[Na⁺] [Cl⁻]</td>
        </tr>
        <tr>
          <td>MgO</td>
          <td>Mg →</td>
          <td>2 electrons transferred</td>
          <td>[Mg²⁺] [O²⁻]</td>
        </tr>
        <tr>
          <td>CaF₂</td>
          <td>Ca →</td>
          <td>2 electrons transferred (to 2 F atoms)</td>
          <td>[Ca²⁺] [F⁻]₂</td>
        </tr>
        <tr>
          <td>Li₂O</td>
          <td>2 Li →</td>
          <td>2 electrons total transferred</td>
          <td>[Li⁺]₂ [O²⁻]</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Why Ionic Bonds Are Strong</h3>
  
  <div class="key-facts-block">
    <h4>📘 Explanation</h4>
    <p>Ions in an ionic compound are held together by <strong>strong electrostatic forces</strong> between oppositely charged ions. These forces:</p>
    <ul>
      <li>Act in all directions throughout the lattice,</li>
      <li>Require lots of energy to overcome.</li>
    </ul>
    <p>This is why ionic compounds have <strong>high melting and boiling points</strong>.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Representing Ionic Compounds</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Representation</th>
          <th>Description</th>
          <th>Limitation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Dot-and-cross diagram</td>
          <td>Shows electron transfer clearly</td>
          <td>Doesn't show 3D structure or bonding strength</td>
        </tr>
        <tr>
          <td>Ball-and-stick model</td>
          <td>Shows 3D arrangement and bonds</td>
          <td>Doesn't show relative ion size or electron transfer</td>
        </tr>
        <tr>
          <td>2D diagram</td>
          <td>Easy to draw</td>
          <td>No depth or perspective</td>
        </tr>
        <tr>
          <td>3D space-filling model</td>
          <td>Realistic spacing between ions</td>
          <td>Can't see internal ions; looks crowded</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Exam Tip</h4>
    <p>When asked "Describe the structure of an ionic compound," you must include: <strong>giant lattice</strong>, <strong>electrostatic forces</strong>, and <strong>ions arranged in regular pattern</strong>.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Empirical Formula of Ionic Compounds</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>The empirical formula shows the simplest whole number ratio of ions in a compound.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 How to Work It Out</h4>
    <ol>
      <li>Identify each ion and its charge.</li>
      <li>Combine so total positive = total negative charge.</li>
      <li>Write the ratio as the formula.</li>
    </ol>
  </div>

  <div class="example-block">
    <h4>🟢 Examples</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Ions</th>
          <th>Balancing Charge</th>
          <th>Formula</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Na⁺ and Cl⁻</td>
          <td>+1 and -1</td>
          <td>NaCl</td>
        </tr>
        <tr>
          <td>Mg²⁺ and O²⁻</td>
          <td>+2 and -2</td>
          <td>MgO</td>
        </tr>
        <tr>
          <td>Ca²⁺ and F⁻</td>
          <td>+2 and 2×(-1)</td>
          <td>CaF₂</td>
        </tr>
        <tr>
          <td>Al³⁺ and O²⁻</td>
          <td>2×(+3) = +6, 3×(-2) = -6</td>
          <td>Al₂O₃</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
        `,
        canonical_keywords: ["ionic bonding", "ions", "cation", "anion", "electrostatic forces", "electron transfer", "dot-and-cross diagram", "lattice", "empirical formula"],
        practice_items: [
          {
            id: "ionic-bonding-1",
            prompt_template: "Describe how ionic bonds form between sodium and chlorine atoms. Include electron configurations in your answer. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["sodium", "loses", "electron", "chlorine", "gains", "electron", "Na+", "Cl-", "electrostatic", "attraction"]
          },
          {
            id: "ionic-bonding-2",
            prompt_template: "Explain why ionic bonds are strong. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["electrostatic forces", "oppositely charged", "ions", "all directions", "lattice", "energy"]
          },
          {
            id: "ionic-bonding-3",
            prompt_template: "Work out the empirical formula for the compound formed between aluminium (Al³⁺) and oxygen (O²⁻). Show your working. [2 marks]",
            marks: 2,
            type: "short-answer",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["Al2O3", "2×(+3)", "3×(-2)", "balanced"]
          }
        ]
      },
      {
        id: "2-1-3-ionic-compounds",
        title: "2.1.3 IONIC COMPOUNDS",
        type: "content",
        study_group: 1,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Structure of Ionic Compounds</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>Ionic compounds have a <strong>giant ionic lattice structure</strong> — a three-dimensional repeating pattern of positive and negative ions held together by strong electrostatic forces acting in all directions.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Description</h4>
    <ul>
      <li>Ions are closely packed in a regular pattern.</li>
      <li>Each positive ion is surrounded by negative ions, and each negative ion is surrounded by positive ions.</li>
      <li>The structure extends throughout the solid (that's why it's "giant").</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Example – Sodium Chloride (NaCl)</h4>
    <ul>
      <li>Each Na⁺ ion is surrounded by 6 Cl⁻ ions.</li>
      <li>Each Cl⁻ ion is surrounded by 6 Na⁺ ions.</li>
      <li><strong>Arrangement:</strong> cubic lattice.</li>
      <li><strong>Bond type:</strong> Strong electrostatic attraction between Na⁺ and Cl⁻.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Forces in Ionic Compounds</h3>
  
  <div class="key-facts-block">
    <h4>🔵 Key Idea</h4>
    <p>The strength of ionic bonds depends on:</p>
    <ul>
      <li><strong>Charge of the ions</strong> – higher charges = stronger attraction. (e.g. MgO has stronger bonds than NaCl because 2+ and 2- ions attract more strongly.)</li>
      <li><strong>Size of ions</strong> – smaller ions = stronger attraction because charges are closer together.</li>
    </ul>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Therefore:</h4>
    <p>Compounds with highly charged, small ions have very high melting and boiling points.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Properties of Ionic Compounds</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>High melting and boiling points</td>
          <td>Strong electrostatic forces require a lot of energy to break.</td>
        </tr>
        <tr>
          <td>Don't conduct electricity when solid</td>
          <td>Ions fixed in lattice — cannot move.</td>
        </tr>
        <tr>
          <td>Conduct electricity when molten or dissolved (aqueous)</td>
          <td>Ions free to move → carry charge.</td>
        </tr>
        <tr>
          <td>Brittle</td>
          <td>When layers shift, like charges align → repel → lattice shatters.</td>
        </tr>
        <tr>
          <td>Usually soluble in water</td>
          <td>Polar water molecules pull ions apart due to attraction.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Explaining Conductivity</h3>
  
  <div class="key-facts-block">
    <h4>📘 In Solids</h4>
    <p>Ions are locked in fixed positions → cannot carry charge → <strong>non-conductor</strong>.</p>
    
    <h4>📘 In Molten or Solution</h4>
    <ul>
      <li>Lattice breaks apart → ions move freely.</li>
      <li>Positive ions move to negative electrode (cathode).</li>
      <li>Negative ions move to positive electrode (anode).</li>
    </ul>
    <p>This is why ionic compounds are used in electrolysis experiments.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Models of Ionic Structures</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Model Type</th>
          <th>Description</th>
          <th>Advantages</th>
          <th>Limitations</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2D lattice diagram</td>
          <td>Flat grid showing alternating ions</td>
          <td>Simple to draw</td>
          <td>Doesn't show 3D arrangement</td>
        </tr>
        <tr>
          <td>Ball-and-stick model</td>
          <td>3D lattice showing ions and bonds</td>
          <td>Shows regular pattern and bonding</td>
          <td>Not to scale – sticks not real</td>
        </tr>
        <tr>
          <td>Space-filling model</td>
          <td>Shows how ions pack together</td>
          <td>Realistic proportions</td>
          <td>Can't see internal structure</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>💡 Exam tip</h4>
    <p>When asked to "describe the structure of sodium chloride," always include:</p>
    <p>"A giant 3D lattice of positive and negative ions held together by strong electrostatic forces acting in all directions."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Comparing Different Ionic Compounds</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Compound</th>
          <th>Ion Charges</th>
          <th>Relative Strength</th>
          <th>Melting Point (°C)</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>NaCl</td>
          <td>+1 / -1</td>
          <td>Moderate</td>
          <td>801</td>
          <td>Moderate electrostatic attraction</td>
        </tr>
        <tr>
          <td>MgO</td>
          <td>+2 / -2</td>
          <td>Very strong</td>
          <td>2852</td>
          <td>High attraction due to double charges</td>
        </tr>
        <tr>
          <td>CaF₂</td>
          <td>+2 / -1</td>
          <td>Strong</td>
          <td>1418</td>
          <td>Two F⁻ per Ca²⁺ – balanced strong lattice</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Trend</h4>
    <p>Greater charge → stronger ionic bond → higher melting point.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Solubility in Water</h3>
  
  <div class="key-facts-block">
    <h4>📘 Explanation</h4>
    <p>Water is a polar molecule (O end = negative, H ends = positive). When an ionic solid is placed in water:</p>
    <ul>
      <li>The positive hydrogen attracts the negative ion (anion).</li>
      <li>The negative oxygen attracts the positive ion (cation).</li>
    </ul>
    <p>The lattice breaks apart, and ions dissolve in solution.</p>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Term</h4>
    <p>This is called <strong>dissociation</strong> — important in chemistry of acids, bases, and electrolysis.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 8 – Limitations of Ionic Models</h3>
  
  <div class="key-facts-block">
    <h4>🔍 What They Miss</h4>
    <ul>
      <li>Movement of ions isn't shown.</li>
      <li>Relative ion sizes can be inaccurate.</li>
      <li>Electrostatic forces are not visible (they act in 3D, not as rods).</li>
      <li>Dynamic nature (melting, dissolving) not represented.</li>
    </ul>
  </div>
</div>
        `,
        canonical_keywords: ["ionic compounds", "giant ionic lattice", "electrostatic forces", "conductivity", "melting point", "solubility", "brittle"],
        practice_items: [
          {
            id: "ionic-compounds-1",
            prompt_template: "Explain why ionic compounds have high melting and boiling points. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["strong", "electrostatic forces", "ions", "energy", "break", "lattice"]
          },
          {
            id: "ionic-compounds-2",
            prompt_template: "Explain why ionic compounds conduct electricity when molten but not when solid. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["solid", "ions", "fixed", "cannot move", "molten", "free to move", "carry charge"]
          }
        ]
      },
      {
        id: "2-1-4-covalent-bonding",
        title: "2.1.4 COVALENT BONDING",
        type: "content",
        study_group: 2,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What Is Covalent Bonding?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>A covalent bond is a <strong>shared pair of electrons</strong> between two non-metal atoms. Each atom contributes one or more electrons to the shared pair so that both achieve a full outer shell (stable electronic configuration).</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <ul>
      <li>Occurs between <strong>non-metals only</strong>.</li>
      <li>The shared electrons are attracted to the nuclei of both atoms, holding them together.</li>
      <li>The atoms are <strong>neutral</strong> — no ions are formed.</li>
      <li>Covalent bonds are very strong because the attraction between nuclei and shared electrons is powerful.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – How Covalent Bonds Form</h3>
  
  <div class="key-facts-block">
    <h4>🔵 Step-by-Step Explanation</h4>
    <ol>
      <li>Each atom has unfilled outer electron shells.</li>
      <li>Atoms share electrons to fill these shells.</li>
      <li>Each atom ends up with a stable configuration (usually 8 outer electrons — 2 for hydrogen).</li>
      <li>The shared electrons form a strong electrostatic attraction between the two nuclei.</li>
    </ol>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Remember</h4>
    <p>"Covalent bonding is <strong>sharing</strong>, not transfer."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Dot-and-Cross Diagrams</h3>
  
  <div class="key-facts-block">
    <p>Dot-and-cross diagrams show which electrons are shared between atoms. Use dots for one atom's electrons and crosses for the other's.</p>
  </div>

  <div class="example-block">
    <h4>🔵 Example 1 – Hydrogen (H₂)</h4>
    <ul>
      <li>Each H atom has 1 electron.</li>
      <li>They share a pair → both have 2 (first shell full).</li>
      <li><strong>Displayed formula:</strong> H–H</li>
      <li><strong>Dot-and-cross:</strong> Two overlapping circles with one dot and one cross shared.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🔵 Example 2 – Chlorine (Cl₂)</h4>
    <ul>
      <li>Each Cl atom has 7 outer electrons.</li>
      <li>They share one pair → both have 8.</li>
      <li><strong>Displayed formula:</strong> Cl–Cl</li>
      <li><strong>Dot-and-cross:</strong> Two overlapping circles; one dot and one cross shared.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🔵 Example 3 – Water (H₂O)</h4>
    <ul>
      <li>Oxygen: 6 outer electrons</li>
      <li>Each hydrogen: 1 electron → Two shared pairs of electrons.</li>
      <li><strong>Displayed formula:</strong> H–O–H</li>
      <li><strong>Dot-and-cross:</strong> Oxygen overlaps twice — one with each hydrogen.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🔵 Example 4 – Carbon Dioxide (CO₂)</h4>
    <ul>
      <li>Carbon: 4 outer electrons</li>
      <li>Oxygen: 6 outer electrons (×2) → Two double bonds form (each O shares 2 pairs).</li>
      <li><strong>Displayed formula:</strong> O=C=O</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🔵 Example 5 – Ammonia (NH₃)</h4>
    <ul>
      <li>Nitrogen: 5 outer electrons</li>
      <li>Hydrogen: 1 outer electron (×3) → Three shared pairs of electrons.</li>
      <li><strong>Displayed formula:</strong> 
        <pre>    H
    |
H—N—H</pre>
      </li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Types of Covalent Structures</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Structure Type</th>
          <th>Description</th>
          <th>Example</th>
          <th>Bonds Between Molecules</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Simple molecular</strong></td>
          <td>Small groups of atoms joined by covalent bonds</td>
          <td>H₂, O₂, H₂O, CH₄</td>
          <td>Weak forces (low melting point)</td>
        </tr>
        <tr>
          <td><strong>Giant covalent</strong></td>
          <td>Network of covalently bonded atoms</td>
          <td>Diamond, Graphite, SiO₂</td>
          <td>Strong bonds throughout (high melting point)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Point</h4>
    <p>In both types, covalent bonds are strong — the difference lies in the <strong>forces between molecules</strong>.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Properties of Simple Covalent Substances</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Low melting/boiling points</td>
          <td>Weak intermolecular forces (forces between molecules) are easy to overcome.</td>
        </tr>
        <tr>
          <td>Do not conduct electricity</td>
          <td>No free electrons or ions to carry charge.</td>
        </tr>
        <tr>
          <td>Usually gases or liquids at room temp</td>
          <td>Molecules move freely; weak attractions.</td>
        </tr>
        <tr>
          <td>Insoluble in water (mostly)</td>
          <td>Non-polar molecules; water is polar.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Terms</h4>
    <ul>
      <li><strong>Covalent bond:</strong> strong attraction within molecule.</li>
      <li><strong>Intermolecular forces:</strong> weak attractions between molecules.</li>
    </ul>
    <p><strong>For exams:</strong> Always say "weak intermolecular forces" — not "weak covalent bonds."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Multiple Bonds</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Bond Type</th>
          <th>Number of Shared Electron Pairs</th>
          <th>Example</th>
          <th>Bond Representation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Single bond</td>
          <td>1</td>
          <td>H–Cl</td>
          <td>H–Cl</td>
        </tr>
        <tr>
          <td>Double bond</td>
          <td>2</td>
          <td>CO₂</td>
          <td>O=C=O</td>
        </tr>
        <tr>
          <td>Triple bond</td>
          <td>3</td>
          <td>N₂</td>
          <td>N≡N</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Remember</h4>
    <p>More shared pairs = <strong>stronger, shorter bond</strong>.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Giant Covalent (Macromolecular) Structures</h3>
  
  <div class="key-facts-block">
    <p>Some covalently bonded substances form giant 3D networks, not small molecules.</p>
  </div>

  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Substance</th>
          <th>Structure</th>
          <th>Key Properties</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Diamond</td>
          <td>Each carbon bonded to 4 others → tetrahedral lattice</td>
          <td>Very hard, very high melting point, no conductivity</td>
        </tr>
        <tr>
          <td>Graphite</td>
          <td>Each carbon bonded to 3 others → layers</td>
          <td>Conducts electricity (delocalised electrons), soft/slippery</td>
        </tr>
        <tr>
          <td>Silicon dioxide (SiO₂)</td>
          <td>Each Si bonded to 4 O atoms</td>
          <td>Hard, high melting point, insulator</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Important</h4>
    <p>These have no weak intermolecular forces — every atom is bonded covalently, making them solid and strong.</p>
  </div>
</div>
        `,
        canonical_keywords: ["covalent bonding", "shared electrons", "non-metals", "dot-and-cross diagram", "simple molecular", "giant covalent", "intermolecular forces", "multiple bonds"],
        practice_items: [
          {
            id: "covalent-1",
            prompt_template: "Explain what a covalent bond is and describe how it forms. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["shared pair", "electrons", "non-metals", "full outer shell", "nuclei", "attraction"]
          },
          {
            id: "covalent-2",
            prompt_template: "Explain why simple covalent substances have low melting and boiling points. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["weak", "intermolecular forces", "between molecules", "easy to overcome", "little energy"]
          }
        ]
      },
      {
        id: "2-1-5-metallic-bonding",
        title: "2.1.5 METALLIC BONDING",
        type: "content",
        study_group: 2,
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – What Is Metallic Bonding?</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>Metallic bonding occurs between metal atoms. It involves a <strong>giant lattice of positive metal ions</strong> surrounded by a <strong>sea of delocalised electrons</strong> that move freely throughout the structure.</p>
  </div>

  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <p>Metal atoms lose their outer electrons, forming positive ions. These electrons become <strong>delocalised</strong> (free to move). Strong electrostatic forces of attraction between the positive ions and the negative electrons hold the metal together.</p>
  </div>

  <div class="example-block">
    <h4>📘 Representation</h4>
    <p><strong>Metal ions:</strong> ⁺⁺⁺⁺⁺</p>
    <p><strong>Delocalised electrons:</strong> e⁻ e⁻ e⁻ e⁻</p>
    <p>🧠 These electrons act like glue, holding the lattice together.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Structure of Metals</h3>
  
  <div class="key-facts-block">
    <h4>🔵 Giant Metallic Lattice</h4>
    <ul>
      <li>Atoms are arranged in regular layers.</li>
      <li>The structure extends in all directions (giant lattice).</li>
      <li>The delocalised electrons move freely between positive ions.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🟢 Example – Sodium Metal (Na)</h4>
    <ul>
      <li>Each Na atom loses 1 outer electron → Na⁺ ion.</li>
      <li>Lost electrons become delocalised.</li>
      <li>The attraction between Na⁺ ions and delocalised electrons forms metallic bonds.</li>
    </ul>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Key Properties of Metals</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>High melting and boiling points</td>
          <td>Strong electrostatic attraction between positive ions and delocalised electrons requires lots of energy to overcome.</td>
        </tr>
        <tr>
          <td>Good electrical conductivity</td>
          <td>Delocalised electrons move freely, carrying charge through the structure.</td>
        </tr>
        <tr>
          <td>Good thermal conductivity</td>
          <td>Free electrons transfer kinetic energy efficiently.</td>
        </tr>
        <tr>
          <td>Malleable (can be hammered into shape)</td>
          <td>Layers of ions can slide over each other while metallic bonds stay intact.</td>
        </tr>
        <tr>
          <td>Ductile (can be drawn into wires)</td>
          <td>Same reason — layers can move without breaking bonds.</td>
        </tr>
        <tr>
          <td>Shiny (lustrous)</td>
          <td>Delocalised electrons reflect light from surface.</td>
        </tr>
        <tr>
          <td>High density</td>
          <td>Atoms packed tightly in lattice.</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Explanation of Metallic Bond Strength</h3>
  
  <div class="key-facts-block">
    <p>The strength of metallic bonds depends on:</p>
    <ul>
      <li><strong>Number of delocalised electrons</strong> → more electrons = stronger bonding (e.g. Mg stronger than Na).</li>
      <li><strong>Size of the ions</strong> → smaller ions = stronger attraction (closer positive charge).</li>
      <li><strong>Charge on metal ion</strong> → higher charge = stronger bond (Al³⁺ > Mg²⁺ > Na⁺).</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🔬 Trend Example</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Metal</th>
          <th>Outer Electrons</th>
          <th>Ion Charge</th>
          <th>Strength</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sodium (Na)</td>
          <td>1</td>
          <td>+1</td>
          <td>Weakest</td>
        </tr>
        <tr>
          <td>Magnesium (Mg)</td>
          <td>2</td>
          <td>+2</td>
          <td>Stronger</td>
        </tr>
        <tr>
          <td>Aluminium (Al)</td>
          <td>3</td>
          <td>+3</td>
          <td>Very strong</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Metals vs Non-Metals</h3>
  
  <div class="example-block">
    <table class="data-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Metals</th>
          <th>Non-Metals</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Bond Type</td>
          <td>Metallic</td>
          <td>Covalent / Ionic</td>
        </tr>
        <tr>
          <td>Conductivity</td>
          <td>Conduct electricity and heat</td>
          <td>Poor conductors (except graphite)</td>
        </tr>
        <tr>
          <td>Melting/Boiling Point</td>
          <td>High</td>
          <td>Often low (if molecular)</td>
        </tr>
        <tr>
          <td>Strength</td>
          <td>Strong, dense</td>
          <td>Brittle, weak (if solid)</td>
        </tr>
        <tr>
          <td>Malleability</td>
          <td>Malleable & ductile</td>
          <td>Brittle</td>
        </tr>
        <tr>
          <td>Appearance</td>
          <td>Shiny</td>
          <td>Dull</td>
        </tr>
        <tr>
          <td>Typical Elements</td>
          <td>Fe, Cu, Al</td>
          <td>S, O, Cl</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>🧠 Key Point</h4>
    <p>The difference arises from the presence (metals) or absence (non-metals) of delocalised electrons.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Why Metals Conduct Electricity</h3>
  
  <div class="key-facts-block">
    <h4>🔋 In Detail</h4>
    <p>Metals contain delocalised electrons that can move freely.</p>
    <p>When voltage is applied:</p>
    <ul>
      <li>Electrons flow towards the positive terminal, carrying charge.</li>
      <li>This allows a current to pass through the entire metal.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>💧 Even in Liquid (Molten) State</h4>
    <p>Metals conduct in both solid and liquid states, because delocalised electrons remain free to move.</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Alloys</h3>
  
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>An alloy is a mixture of metals (or a metal and another element) that improves a metal's properties.</p>
  </div>

  <div class="key-facts-block">
    <h4>📘 Structure Explanation</h4>
    <ul>
      <li>Pure metals have regular layers of atoms → easy to slide → soft.</li>
      <li>Alloys contain different-sized atoms, which distort the layers, making it harder for them to slide → stronger and harder.</li>
    </ul>
  </div>

  <div class="example-block">
    <h4>🔬 Common Examples</h4>
    <table class="data-table">
      <thead>
        <tr>
          <th>Alloy</th>
          <th>Composition</th>
          <th>Properties</th>
          <th>Uses</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Steel</td>
          <td>Iron + carbon</td>
          <td>Strong, hard</td>
          <td>Construction, tools</td>
        </tr>
        <tr>
          <td>Brass</td>
          <td>Copper + zinc</td>
          <td>Hard, corrosion-resistant</td>
          <td>Musical instruments, fittings</td>
        </tr>
        <tr>
          <td>Bronze</td>
          <td>Copper + tin</td>
          <td>Tough, corrosion-resistant</td>
          <td>Medals, statues</td>
        </tr>
        <tr>
          <td>Duralumin</td>
          <td>Aluminium + copper + magnesium</td>
          <td>Strong, light</td>
          <td>Aircraft</td>
        </tr>
        <tr>
          <td>Solder</td>
          <td>Lead + tin</td>
          <td>Low melting point</td>
          <td>Joining metal parts</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="exam-tip-block">
    <h4>📝 Summary Sentence</h4>
    <p>"Alloys are harder than pure metals because the different-sized atoms distort the regular layers, preventing them from sliding."</p>
  </div>
</div>

<div class="subsection">
  <h3 class="subsection-heading">Subsection 8 – Metals and Energy</h3>
  
  <div class="key-facts-block">
    <h4>🔋 Bonding Energy</h4>
    <p>Breaking metallic bonds requires large amounts of energy because of:</p>
    <ul>
      <li>Strong electrostatic attraction, and</li>
      <li>The extensive network of bonding throughout the structure.</li>
    </ul>
  </div>
</div>
        `,
        canonical_keywords: ["metallic bonding", "delocalised electrons", "giant metallic lattice", "conductivity", "malleable", "ductile", "alloys"],
        practice_items: [
          {
            id: "metallic-1",
            prompt_template: "Describe the structure and bonding in metals. [4 marks]",
            marks: 4,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["giant lattice", "positive ions", "delocalised electrons", "electrostatic forces", "sea of electrons"]
          },
          {
            id: "metallic-2",
            prompt_template: "Explain why metals conduct electricity. [2 marks]",
            marks: 2,
            type: "short-answer",
            difficulty: "easy",
            randomise: false,
            expected_keywords: ["delocalised electrons", "free to move", "carry charge"]
          },
          {
            id: "metallic-3",
            prompt_template: "Explain why alloys are harder than pure metals. [3 marks]",
            marks: 3,
            type: "open",
            difficulty: "medium",
            randomise: false,
            expected_keywords: ["different sized atoms", "distort", "layers", "harder to slide", "irregular"]
          }
        ]
      }
    ]
  },
  {
    id: "quantitative-chemistry",
    title: "Quantitative chemistry",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "chemical-changes",
    title: "Chemical changes",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "energy-changes",
    title: "Energy changes",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "rate-extent",
    title: "Rate & extent of chemical change",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "organic-chemistry",
    title: "Organic chemistry",
    status: "coming_soon",
    subsections: []
  },
  {
    id: "chemical-analysis",
    title: "Chemical analysis, the atmosphere & using resources",
    status: "coming_soon",
    subsections: []
  }
];
