# Quiz: MicroSims and Research Communication

Test your understanding of research communication, slide decks, interactive simulations, MicroSims, p5.js, learning graphs, and intelligent textbooks with these 10 review questions.

---

#### 1. What is the standard JavaScript library used in this book for building MicroSims?

<div class="upper-alpha" markdown>
1. p5.js
2. D3.js
3. React
4. Three.js
</div>

??? question "Show Answer"
    The correct answer is **A**. p5.js is the library chosen for MicroSims in this book because it runs in the browser, needs no installation, and provides built-in controls. The other libraries are useful for other purposes but are not the standard here.

    **Concept Tested:** p5.js

    **See:** ./index.md#microsims





---

#### 2. What is the term for placing a MicroSim in a web page using an HTML iframe that points at the sim's `main.html`?

<div class="upper-alpha" markdown>
1. Concept dependency
2. Parameter sweep
3. Handoff protocol
4. Embedding simulations
</div>

??? question "Show Answer"
    The correct answer is **D**. Embedding simulations means placing the sim in a page with an iframe, which isolates the sim from the surrounding page and lets the same sim be reused in decks, course pages, and papers.

    **Concept Tested:** Embedding Simulations

    **See:** ./index.md#embedding-concept-dependencies-and-intelligent-textbooks





---

#### 3. Why is an interactive simulation a better choice than a static figure when showing how ENOB changes with added noise?

<div class="upper-alpha" markdown>
1. Because static figures cannot include numbers
2. Because the relationship depends on a parameter the viewer can manipulate
3. Because static figures cannot be included in papers
4. Because interactive simulations are always easier to create
</div>

??? question "Show Answer"
    The correct answer is **B**. A MicroSim suits a dependence: moving the noise slider shows the whole relationship. Static figures are fine for facts without parameters, and interactivity is not always easier to build.

    **Concept Tested:** Interactive Simulation

    **See:** ./index.md#communicating-research





---

#### 4. Why should a MicroSim specification include evidence of mastery before any code is written?

<div class="upper-alpha" markdown>
1. Because the agent needs it to choose colors
2. Because the evidence determines the file name
3. Because the evidence defines what the sim must check to be useful
4. Because the specification cannot be written without code
</div>

??? question "Show Answer"
    The correct answer is **C**. Evidence of mastery states what the learner must be able to do and how the sim will detect it. Without that, the sim has no purpose and may become a toy. Colors and file names are secondary, and the specification precedes code.

    **Concept Tested:** MicroSim Generation

    **See:** ./index.md#generating-a-microsim-with-an-agent





---

#### 5. What is the role of a learning graph in organizing an intelligent textbook?

<div class="upper-alpha" markdown>
1. It orders concepts by their dependencies
2. It generates the MicroSim code automatically
3. It replaces the need for written chapters
4. It stores student data for adaptive content
</div>

??? question "Show Answer"
    The correct answer is **A**. A learning graph is a directed acyclic graph of concepts in which edges are dependencies; it helps decide teaching order and how much space each concept deserves. It does not generate code, replace chapters, or store student data.

    **Concept Tested:** Learning Graph

    **See:** ./index.md#embedding-concept-dependencies-and-intelligent-textbooks





---

#### 6. A slide deck is being prepared from a paper. What is the most important check to perform on the figures copied into the slides?

<div class="upper-alpha" markdown>
1. Make the slides mirror the paper's section order
2. Run the number check on every figure to catch changed values
3. Use screenshots instead of source figures
4. Add as many words as possible to each slide
</div>

??? question "Show Answer"
    The correct answer is **B**. Figures in slides are often copied and edited, so numbers can change silently. The number check of Chapter 15 should be run on every slide. Slides should carry one message with few words, and source figures are preferred over screenshots.

    **Concept Tested:** Slide Deck

    **See:** ./index.md#communicating-research





---

#### 7. A researcher wants to teach how a SAR ADC's successive-approximation search converges bit by bit. Which medium is most appropriate?

<div class="upper-alpha" markdown>
1. A static table of digital codes
2. A reference list
3. A MicroSim that lets the learner step through the conversion
4. A cover letter
</div>

??? question "Show Answer"
    The correct answer is **C**. Bit-by-bit convergence is a process the learner can step through and predict, which is exactly what a MicroSim can make interactive. A static table, reference list, or cover letter does not show the process.

    **Concept Tested:** MicroSim

    **See:** ./index.md#microsims





---

#### 8. An agent has implemented a MicroSim from a specification. What is the final step before learners use it?

<div class="upper-alpha" markdown>
1. Set the status to approved automatically
2. Add the sim to the learning graph
3. Skip verification if the sim looks right
4. A person tests it and sets the status to approved
</div>

??? question "Show Answer"
    The correct answer is **D**. Only a human author may mark a sim `approved` after testing the controls and behavior. Agents may set `scaffold`, `built`, or `instrumented`, but approval is a human gate.

    **Concept Tested:** MicroSim Generation

    **See:** ./index.md#generating-a-microsim-with-an-agent





---

#### 9. A paper includes a die photograph of a fabricated converter. Why is this content not a good candidate for a MicroSim?

<div class="upper-alpha" markdown>
1. It is a single image with no parameter or process for the learner to manipulate
2. Die photographs are too large to embed
3. p5.js cannot display images
4. MicroSims are only for electrical measurements
</div>

??? question "Show Answer"
    The correct answer is **A**. A die photograph is a static fact with no parameter or process. A MicroSim earns its place when the viewer can change something or step through a process. Size and display capability are not the issues.

    **Concept Tested:** Interactive Simulation

    **See:** ./index.md#communicating-research





---

#### 10. A researcher is deciding whether to build a MicroSim for the derivation of the Walden figure of merit. Why might a static figure or text be better?

<div class="upper-alpha" markdown>
1. The derivation is too complex for a simulation
2. Students prefer reading equations
3. The Walden figure of merit is not a real concept
4. The derivation has no parameter to vary, so a short derivation in text serves it better
</div>

??? question "Show Answer"
    The correct answer is **D**. A MicroSim suits dependencies or processes. A derivation with no variable parameter is better explained by text and equations. Complexity and student preference are not the deciding factors, and the Walden figure of merit is a real metric.

    **Concept Tested:** MicroSim

    **See:** ./index.md#microsims
