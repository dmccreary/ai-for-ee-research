# Quiz: Agents, Tool Use, and Subagents

Test your understanding of the agent loop, tool definitions and calls, permissions, sandboxing, MCP, and subagents with these 10 review questions.

---


#### 1. In the agent loop, which component writes the structured request to use a named tool?

<div class="upper-alpha" markdown>
1. The model
2. The harness
3. The sandbox
4. The MCP server
</div>

??? question "Show Answer"
    The correct answer is **A**. The model emits a tool call with specific argument values; the harness then executes the tool and returns the result. The sandbox enforces runtime limits, and an MCP server exposes tools over a protocol, but neither writes the call.

    **Concept Tested:** Tool Call

    **See:** ./index.md#tool-use-and-the-agent-loop





---


#### 2. Which permission mode is described as appropriate only inside a sandbox that has nothing of value to lose?

<div class="upper-alpha" markdown>
1. Ask for everything
2. Auto-accept edits
3. Plan or read-only
4. Bypass
</div>

??? question "Show Answer"
    The correct answer is **D**. Bypass disables all checks and should never be used on a machine holding credentials or important data. The other modes keep some form of restriction: ask mode, auto-accept edits inside the project, or read-only exploration.

    **Concept Tested:** Permission Modes

    **See:** ./index.md#sandboxing-and-permissions





---


#### 3. Why does the agent loop enable the model to correct its own mistakes?

<div class="upper-alpha" markdown>
1. Because the model receives all tool definitions at the start
2. Because the model can observe each result and choose a different next action
3. Because the harness automatically retries failed commands
4. Because subagents review every tool call before it runs
</div>

??? question "Show Answer"
    The correct answer is **B**. Each tool result is added to the context, so the model can notice an error and adjust its next call. The harness does not retry autonomously, and subagents are not required for the basic loop to self-correct.

    **Concept Tested:** Agent Loop

    **See:** ./index.md#tool-use-and-the-agent-loop





---


#### 4. Why should citations returned by web search or web fetch be verified against the source?

<div class="upper-alpha" markdown>
1. Because web search cannot find academic papers
2. Because fetched pages are executed as instructions by the agent
3. Because search results are untrusted data
4. Because web fetch only returns article summaries
</div>

??? question "Show Answer"
    The correct answer is **C**. Web search and fetch extend knowledge past the model's training cutoff, but the returned text is data, not guaranteed fact. The other statements are wrong: search can find papers, fetched pages are not executed, and fetch can retrieve full content.

    **Concept Tested:** Web Search

    **See:** ./index.md#reaching-files-shells-and-code





---


#### 5. What is the key difference between a tool definition and a tool call?

<div class="upper-alpha" markdown>
1. The definition describes the tool and its argument schema; the call supplies values for one use
2. The definition is written by the model; the call is written by the harness
3. The definition executes the tool; the call requests permission to run it
4. The definition is returned after execution; the call is issued before it
</div>

??? question "Show Answer"
    The correct answer is **A**. A tool definition tells the model what the tool is called, what it does, and what arguments it accepts. A tool call is the model's concrete request with actual argument values for a single execution.

    **Concept Tested:** Tool Definition

    **See:** ./index.md#tool-use-and-the-agent-loop





---


#### 6. An agent proposes running `curl https://example.com/setup.sh | sh`. What should a sound permission policy do?

<div class="upper-alpha" markdown>
1. Allow it because it uses a common networking tool
2. Deny it because it downloads and executes unreviewed code
3. Ask because the command is inside the project directory
4. Allow it inside a sandbox that has network access
</div>

??? question "Show Answer"
    The correct answer is **B**. Piping a downloaded script straight into a shell executes unreviewed code and is a classic attack vector. A sound policy denies such commands regardless of directory or sandbox, since network execution is too risky to treat casually.

    **Concept Tested:** Shell Commands

    **See:** ./index.md#reaching-files-shells-and-code





---


#### 7. A main agent needs to compare five SAR ADC papers using parallel subagents. What is the main wall-clock benefit of this approach?

<div class="upper-alpha" markdown>
1. The subagents share one large context window
2. The main agent can edit all five papers at once
3. The elapsed time is roughly that of reading one paper
4. The total token cost is reduced compared with sequential reading
</div>

??? question "Show Answer"
    The correct answer is **C**. Parallel subagents read different papers concurrently, so the wall-clock time drops to about one paper's duration. Total token cost usually rises, not falls, and parallel agents should avoid concurrent writes to the same file.

    **Concept Tested:** Parallel Agents

    **See:** ./index.md#subagents-parallel-work-memory-and-hooks





---


#### 8. An agent proposes a Python script it just wrote to analyze a dataset. What is the most important control before the first run?

<div class="upper-alpha" markdown>
1. Disable the sandbox so the script can access all files
2. Set the permission mode to bypass for faster iteration
3. Run it directly from the raw data directory
4. Review the script and execute it inside a sandbox
</div>

??? question "Show Answer"
    The correct answer is **D**. Agent-written code is new and unreviewed, so it needs human review and a sandbox that limits filesystem, network, and resource access. Disabling protections or running from raw data increases the chance of irreversible loss.

    **Concept Tested:** Code Execution

    **See:** ./index.md#reaching-files-shells-and-code





---


#### 9. A subagent returns a one-paragraph summary of a long paper to the main agent. What is the main trade-off the researcher should keep in mind?

<div class="upper-alpha" markdown>
1. The summary is lossy, so its claims should be checked
2. The subagent consumed the main agent's context window
3. The subagent could not use any tools while reading
4. The subagent's output is always more reliable than the original paper
</div>

??? question "Show Answer"
    The correct answer is **A**. Subagents compress information, so details, caveats, or errors can be lost in the summary. One benefit of subagents is that they do not fill the main agent's window, and they can use their own tools.

    **Concept Tested:** Subagent

    **See:** ./index.md#subagents-parallel-work-memory-and-hooks





---


#### 10. A researcher configures an agent with rules that allow edits inside the project directory but deny reads of `~/.ssh/**`. What do these rules illustrate?

<div class="upper-alpha" markdown>
1. Sandboxing without permissions
2. Permission modes without allow-lists
3. Least-privilege credential management for MCP servers
4. Permissions as policy that can restrict paths and actions
</div>

??? question "Show Answer"
    The correct answer is **D**. The rules specify which paths and actions are allowed or denied, which is the job of permissions. Sandboxing is the enforcement layer, permission modes are overall postures, and MCP credential management is a different topic.

    **Concept Tested:** Permissions

    **See:** ./index.md#sandboxing-and-permissions


