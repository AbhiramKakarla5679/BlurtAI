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
  <h3 class="subsection-heading">Subsection 1 – What is a Mixture?</h3>
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>A mixture is a combination of two or more substances (elements or compounds) not chemically joined together.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Key Points</h4>
    <ul>
      <li>The substances in a mixture keep their own properties.</li>
      <li>There are no chemical bonds between the substances.</li>
      <li>Mixtures can be easily separated by physical methods.</li>
      <li>The composition of a mixture can vary (unlike a compound).</li>
    </ul>
  </div>
  <div class="example-block">
    <h4>🟢 Examples</h4>
    <table class="data-table">
      <thead><tr><th>Mixture</th><th>Components</th><th>Notes</th></tr></thead>
      <tbody>
        <tr><td>Air</td><td>Nitrogen, Oxygen, CO₂, Argon, etc.</td><td>Gas mixture</td></tr>
        <tr><td>Sea Water</td><td>Water + Dissolved Salts</td><td>Can be separated by distillation</td></tr>
        <tr><td>Crude Oil</td><td>Many Hydrocarbons</td><td>Can be separated by fractional distillation</td></tr>
      </tbody>
    </table>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Never say "a mixture is chemically joined." Always write: "A mixture is a physical combination of substances."</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Mixtures vs Compounds</h3>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Property</th><th>Mixture</th><th>Compound</th></tr></thead>
      <tbody>
        <tr><td>Joined by</td><td>Physical mixing</td><td>Chemical bonds</td></tr>
        <tr><td>Separation</td><td>Physical methods</td><td>Chemical reactions</td></tr>
        <tr><td>Composition</td><td>Variable</td><td>Fixed ratio</td></tr>
        <tr><td>Properties</td><td>Same as original substances</td><td>New properties formed</td></tr>
      </tbody>
    </table>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Filtration</h3>
  <div class="definition-block">
    <h4>🔵 Purpose</h4>
    <p>To separate an insoluble solid from a liquid.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Apparatus</h4>
    <p>Beaker, Funnel, Filter paper</p>
  </div>
  <div class="key-facts-block">
    <h4>🧩 Method</h4>
    <p>Place the filter paper inside the funnel. Pour the mixture into the funnel slowly. The liquid (filtrate) passes through the paper. The solid (residue) remains on the filter paper.</p>
  </div>
  <div class="example-block">
    <h4>🟢 Example</h4>
    <p>Separating sand from a sand-water mixture.</p>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Use terms "filtrate" (liquid) and "residue" (solid) correctly — they're often marks in 6-mark practical questions.</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Crystallisation</h3>
  <div class="definition-block">
    <h4>🔵 Purpose</h4>
    <p>Used to obtain a soluble solid from a solution.</p>
  </div>
  <div class="key-facts-block">
    <h4>Method</h4>
    <p>Heat the solution gently to evaporate water until it becomes concentrated. Stop heating when crystals begin to form. Allow the solution to cool slowly. Filter and dry the crystals.</p>
  </div>
  <div class="example-block">
    <h4>🟢 Example</h4>
    <p>Separating salt from saltwater.</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Simple Distillation</h3>
  <div class="definition-block">
    <h4>🔵 Purpose</h4>
    <p>Used to separate a solvent from a solution (e.g. water from salty water).</p>
  </div>
  <div class="key-facts-block">
    <h4>Method</h4>
    <p>Heat the solution in a flask. The liquid with the lowest boiling point evaporates first. The vapour passes into the condenser and cools. The condensed pure liquid (distillate) is collected.</p>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Always write: "Cold water enters the condenser at the bottom and leaves at the top — this ensures efficient cooling."</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Fractional Distillation</h3>
  <div class="definition-block">
    <h4>🔵 Purpose</h4>
    <p>Used to separate two or more liquids that are miscible (mix completely) and have different boiling points.</p>
  </div>
  <div class="key-facts-block">
    <h4>Method</h4>
    <p>Heat the mixture in a flask. The vapour rises through the fractionating column. As it cools, vapours condense at different heights. Each liquid (fraction) is collected separately.</p>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Always mention the temperature gradient — this is a common AQA mark point.</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 7 – Paper Chromatography</h3>
  <div class="definition-block">
    <h4>🔵 Purpose</h4>
    <p>Used to separate and identify mixtures of soluble substances, especially dyes or inks.</p>
  </div>
  <div class="key-facts-block">
    <h4>Method</h4>
    <p>Draw a pencil baseline on the paper. Place small dots of the mixture (e.g. ink) on the line. Dip the paper into solvent (below the pencil line). As solvent moves up, different substances travel different distances. Calculate the Rf value for identification.</p>
  </div>
  <div class="key-facts-block">
    <h4>🟢 Key Terms</h4>
    <ul>
      <li>Solvent front – the highest point reached by solvent.</li>
      <li>Rf value = distance moved by substance ÷ distance moved by solvent.</li>
    </ul>
  </div>
  <div class="exam-tip-block">
    <h4>🧠 Exam Tip</h4>
    <p>Always use pencil, not pen, for the baseline (ink dissolves). Solvent must be below the baseline or the samples will dissolve into it.</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 8 – Choosing Separation Techniques</h3>
  <div class="example-block">
    <table class="data-table">
      <thead><tr><th>Type of Mixture</th><th>Suitable Process</th><th>Example</th></tr></thead>
      <tbody>
        <tr><td>Insoluble solid + liquid</td><td>Filtration</td><td>Sand + water</td></tr>
        <tr><td>Soluble solid + liquid</td><td>Crystallisation</td><td>Salt from solution</td></tr>
        <tr><td>Solvent from solution</td><td>Simple distillation</td><td>Water from saltwater</td></tr>
        <tr><td>Two miscible liquids</td><td>Fractional distillation</td><td>Ethanol + water</td></tr>
        <tr><td>Soluble coloured substances</td><td>Chromatography</td><td>Ink pigments</td></tr>
      </tbody>
    </table>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 9 – Purity and Melting Point</h3>
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>A pure substance is a single element or compound not mixed with any other substance.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Key Points</h4>
    <ul>
      <li>Pure substances melt and boil at fixed temperatures.</li>
      <li>Mixtures melt/boil over a range of temperatures.</li>
    </ul>
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
        title: "1.1.3 THE DEVELOPMENT OF THE ATOMIC MODEL",
        type: "content",
        content_html: `
<div class="subsection">
  <h3 class="subsection-heading">Subsection 1 – Why Scientific Models Change</h3>
  <div class="definition-block">
    <h4>🔵 Definition</h4>
    <p>A scientific model is a representation or idea used to explain observations and evidence.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Key Idea</h4>
    <p>Models change when new experimental evidence cannot be explained by the old model.</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 2 – Dalton's Solid Sphere Model (1803)</h3>
  <div class="definition-block">
    <h4>🔵 Summary</h4>
    <p>John Dalton proposed that all matter is made of tiny indivisible particles called atoms.</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 3 – Thomson's Plum Pudding Model (1897)</h3>
  <div class="definition-block">
    <h4>🔵 Discovery</h4>
    <p>J. J. Thomson discovered the electron. Model: Atom = a sphere of positive charge with electrons embedded throughout.</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 4 – Rutherford's Nuclear Model (1909)</h3>
  <div class="definition-block">
    <h4>🔵 The Alpha Scattering Experiment</h4>
    <p>Rutherford fired alpha particles at gold foil.</p>
  </div>
  <div class="key-facts-block">
    <h4>🧠 Observations</h4>
    <ul>
      <li>Most passed straight through → Atom is mostly empty space</li>
      <li>Some deflected → Positive charge concentrated in nucleus</li>
      <li>A few bounced back → Nucleus is tiny but very dense</li>
    </ul>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 5 – Bohr's Model (1913)</h3>
  <div class="definition-block">
    <h4>🔵 Discovery</h4>
    <p>Electrons orbit the nucleus at fixed distances called energy levels.</p>
  </div>
</div>
<div class="subsection">
  <h3 class="subsection-heading">Subsection 6 – Chadwick's Discovery (1932)</h3>
  <div class="definition-block">
    <h4>🔵 Discovery</h4>
    <p>James Chadwick discovered the neutron, completing the modern atomic model.</p>
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
      }
    ]
  },
  {
    id: "bonding-structure",
    title: "Bonding, structure & the properties of matter",
    status: "coming_soon",
    subsections: []
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
