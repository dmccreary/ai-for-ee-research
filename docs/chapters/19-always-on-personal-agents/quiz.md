# Quiz: Always-On Personal Agents for Research

Test your understanding of personal agents, cloud and self-hosted agents, delegated sign-in, blast radius, usage metering, data exposure, vendor claims, and overnight audits with these 10 review questions.

---

#### 1. What is the term for the extent of what an agent can read, change, or send if it is compromised, misdirected, or simply wrong?

<div class="upper-alpha" markdown>
1. Agent blast radius
2. Usage metering
3. Agent data exposure
4. Activity audit
</div>

??? question "Show Answer"
    The correct answer is **A**. Agent blast radius measures how far a failure can spread, given the access the agent holds. Usage metering is about cost, data exposure concerns what happens to inputs, and activity audit is the review of past actions.

    **Concept Tested:** Agent Blast Radius

    **See:** ./index.md#risks-that-define-the-criteria





---

#### 2. What is the term for an agent that runs on a machine the user controls, such as a laptop, server, or own cloud account?

<div class="upper-alpha" markdown>
1. Always-on agent
2. Cloud agent computer
3. Personal agent
4. Self-hosted agent
</div>

??? question "Show Answer"
    The correct answer is **D**. A self-hosted agent runs on infrastructure the user controls, trading vendor management for greater control over data and reach. A cloud agent computer lives in the vendor's data center.

    **Concept Tested:** Self-Hosted Agent

    **See:** ./index.md#what-makes-an-agent-personal-and-always-on





---

#### 3. Why does a cloud agent computer change the risk profile compared to a session-based agent?

<div class="upper-alpha" markdown>
1. Because it uses a weaker model
2. Because it keeps running and holds standing access when your computer is off
3. Because it cannot use tools
4. Because it requires constant supervision
</div>

??? question "Show Answer"
    The correct answer is **B**. A cloud agent computer keeps running in the vendor's data center, so the agent can act when you are away and holds persistent access to your accounts and files. Model strength, tool use, and supervision are not defining differences.

    **Concept Tested:** Cloud Agent Computer

    **See:** ./index.md#what-makes-an-agent-personal-and-always-on





---

#### 4. Why should vendor claims about an always-on agent's safety be tested hands-on before relying on them?

<div class="upper-alpha" markdown>
1. Because vendors never tell the truth
2. Because the claims are always legally binding
3. Because the evidence base is often vendor-stated and untested by independent parties
4. Because testing is required by all journals
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter notes that nearly all product claims are vendor-stated and that independent benchmarks are lacking. Hands-on tests with synthetic data and throwaway accounts are the practical verification method, not blanket distrust or journal requirements.

    **Concept Tested:** Vendor Claim Verification

    **See:** ./index.md#risks-that-define-the-criteria





---

#### 5. What is the main advantage of using a personal knowledge graph as an agent's persistent memory?

<div class="upper-alpha" markdown>
1. The memory is inspectable, correctable, and under your control
2. It automatically trains the vendor's model
3. It requires no setup or maintenance
4. It hides data from the user
</div>

??? question "Show Answer"
    The correct answer is **A**. A knowledge graph stored in files you control can be read, corrected, versioned, and moved between agents or vendors. It does not train the vendor's model, is not maintenance-free, and does not hide data from you.

    **Concept Tested:** Knowledge Graph Memory

    **See:** ./index.md#memory-the-knowledge-graph-and-privacy





---

#### 6. A nightly agent is allowed to search arXiv and write to `docs/reading-queue.md`. The log shows it read `data/raw/capture-07.csv`. How should this action be classified in an overnight activity audit?

<div class="upper-alpha" markdown>
1. In scope, because reading is harmless
2. Out of scope, because it is not in the allowed list
3. In scope, because the file is in the project
4. Out of scope, only if the file contains confidential data
</div>

??? question "Show Answer"
    The correct answer is **B**. An audit compares each action against the explicit allowed list for the task. Reading any other file is out of scope regardless of apparent harm or data sensitivity, because the permission boundary was crossed.

    **Concept Tested:** Overnight Activity Audit

    **See:** ./index.md#auditing-overnight-activity





---

#### 7. A researcher wants to test a vendor's claim that the agent asks before sensitive actions. What is the best test?

<div class="upper-alpha" markdown>
1. Read the claim in the marketing materials
2. Ask the vendor's support team
3. Create a harmless sensitive action and observe whether the agent asks
4. Disable all approvals and see if the agent complains
</div>

??? question "Show Answer"
    The correct answer is **C**. The chapter recommends testing claims with synthetic data and throwaway accounts. A harmless sensitive action is a direct probe of whether the approval mechanism works. Marketing and support are not independent evidence.

    **Concept Tested:** Vendor Claim Verification

    **See:** ./index.md#risks-that-define-the-criteria





---

#### 8. A task involves processing unpublished measurement data from the research group. Which factor is most important when selecting an agent?

<div class="upper-alpha" markdown>
1. How many bots the product supports
2. Whether the agent can make slides
3. The color scheme of the interface
4. Where it runs and what happens to the data
</div>

??? question "Show Answer"
    The correct answer is **D**. Unpublished results belong to a restrictive data class, so the location of computation and the provider's data handling are decisive. Bot count, slide creation, and interface appearance are irrelevant to confidentiality.

    **Concept Tested:** Agent Data Exposure

    **See:** ./index.md#privacy-confidentiality-and-governance (cross-chapter) and ./index.md#risks-that-define-the-criteria





---

#### 9. A product allows all of a user's bots to share one cloud computer and one set of logins. What does this imply about blast radius?

<div class="upper-alpha" markdown>
1. A failure in one bot can act with every credential the shared computer holds
2. Each bot is isolated from the others
3. Blast radius is reduced by having many bots
4. The bots cannot communicate with each other
</div>

??? question "Show Answer"
    The correct answer is **A**. Shared logins and a shared computer mean that a compromise or bad action by one bot can use every credential stored on that computer. Isolation per bot would reduce the blast radius.

    **Concept Tested:** Agent Blast Radius

    **See:** ./index.md#risks-that-define-the-criteria





---

#### 10. A researcher partitions a personal knowledge graph so that a literature agent reads only the papers-and-concepts subgraph and not the unpublished-measurements subgraph. What principle does this follow?

<div class="upper-alpha" markdown>
1. Usage metering
2. Vendor claim verification
3. Activity audit
4. Personal knowledge privacy and least privilege
</div>

??? question "Show Answer"
    The correct answer is **D**. Giving each agent access only to the subgraph its job needs limits what it can see and limits the harm if it is compromised. That is both least privilege and personal knowledge privacy. Metering, claim verification, and audit are separate criteria.

    **Concept Tested:** Personal Knowledge Privacy

    **See:** ./index.md#memory-the-knowledge-graph-and-privacy
