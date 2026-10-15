---
title: Personal Agents
description: Research notes on always-on personal AI agents — SpaceXAI's Grok Bot, OpenAI's Dots, Meta's Muse, Anthropic's Claude Cowork, and the open-source OpenClaw and Hermes agents.
---

# Appendix: Personal Agents

!!! info "Research notes — not yet a finished chapter"
    This appendix holds raw research gathered on **October 15, 2026**. Nearly
    every claim is vendor-stated or comes from press coverage; we found no
    independent benchmarks or controlled tests of any product listed here.
    Prices, tiers, and features changed several times within weeks of launch,
    so verify against each vendor's own pages before relying on a number.

## Why this matters for EE research

A *personal agent* is an AI system that does not just answer a question but
carries out multi-step work on your behalf — signing in to tools, running
routines, and coming back when it is done or needs a decision. For a
researcher, that could mean overnight literature sweeps, rerunning an analysis
when new lab data lands, or filing bug tickets against a simulation toolchain.
The products below all arrived within roughly two months of each other in
mid-2026, so the category is moving fast.

## Grok Bot (SpaceXAI)

SpaceXAI announced Grok Bot on August 11, 2026, as an early-beta, cloud-based
agent service. "Bot" is the product name; it is not the ordinary Grok chatbot.
It appears to be the first joint product of xAI and Cursor. Sources disagree
on whether SpaceX is acquiring Cursor or merging with it (MacRumors cites a
$60 billion acquisition), so treat the deal terms as unsettled.

### Capabilities

- **Persistent cloud computer.** Each user gets a cloud machine with a
  browser, files, and a terminal. Work continues when the user's laptop is off.
- **Signs in like a human.** Bots log in to websites and apps, including
  services that offer no API or MCP integration.
- **Teachable routines.** A user shows a bot a task once; it saves the
  routine and later runs it on its own.
- **Multiple bots.** Several bots can share one group chat, share context, and
  hand work to each other. A manager bot can delegate to specialist bots.
  AIMultiple reports up to six bots per group chat and "Team Bots" on
  Teams/Enterprise plans (public beta since September 28).
- **Memory.** Bots keep memory across conversations and may start work "before
  you need to ask," per SpaceXAI.
- **Interface.** Work is assigned in a chat window on desktop or iOS. The bot
  returns a result or asks for approval.

SpaceXAI's own example uses include updating a CRM from call transcripts,
onboarding new hires and processing invoices in Gmail, and reproducing a bug,
filing a ticket, and handing the fix to a debugging bot.

### Access, pricing, and platforms

| Item | Detail |
|---|---|
| Launch access (Aug 11) | SuperGrok Heavy, Cursor Ultra, Cursor Teams Premium |
| Expanded access (Aug 26) | SuperGrok, SuperGrok Plus, SuperGrok Heavy, Cursor Pro, Pro+, Ultra, Teams Standard and Premium |
| Launch prices | About $300/mo (SuperGrok Heavy), $200/mo (Cursor Ultra), $120/seat/mo (Teams Premium) |
| Entry prices (Oct 12) | About $30/mo (SuperGrok), $20/mo (Cursor), $40/seat/mo (Cursor Teams) |
| Usage | Weekly allowance included; overage billed at token cost; allowance and rate card unpublished |
| Platforms | macOS, Windows, Linux (.deb), iOS; Android "coming soon" |
| Models | Not disclosed; AIMultiple reports Cursor picks a model per task |
| Enterprise | Waitlist at launch; "through sales" by October 12 |

### Security claims and open questions

SpaceXAI states that Grok Bot uses Cursor SSO and authentication, privacy
mode, encryption in transit and at rest, a training opt-out, and an "Auto
Review" step for sensitive actions. Enterprise admins can configure data-loss
prevention, certificates, proxies, and network controls.

Open questions raised by analysts:

- **Shared logins.** Isolation is per user, not per bot. All of a user's bots
  share one computer, including its files, browser, and logins, so one
  compromised bot exposes the rest.
- **Undocumented details.** Retention defaults, credential handling,
  permission granularity, audit records, which actions need approval by
  default, and whether memory can be viewed or edited.
- **Reliability.** Nothing documents failure handling or what happens to a
  saved routine when a website's interface changes.
- **Cost surprises.** Cursor itself warns that an hourly routine or a busy
  Slack trigger "can use a week of usage in a day."

## Dots (OpenAI)

OpenAI introduced Dots at DevDay on September 29, 2026, as a personal agent
inside ChatGPT, powered by GPT-6 Astra.

- **Always-on.** A dot runs in the background with its own cloud computer and
  browser, pursuing goals with minimal oversight.
- **App ecosystem.** It can use the 4,000+ apps already connected to ChatGPT
  and can delegate coding to Codex.
- **Visibility.** The user can open a dot's "computer" at any time to see what
  it is doing, and can connect a dot to their own PC.
- **Communication.** A dot can message or call the user with progress,
  questions, or decisions. Slack and Microsoft Teams integrations were
  announced; text-message support is described as coming later.
- **Safety model.** Passwords used for sign-in are not exposed to the
  underlying model. Proactive background research uses read-only app access.
  Dots have built-in rules for when to act versus ask, and users can write
  custom approval rules. OpenAI says it is working with Microsoft to bring
  Dots under Agent 365 security controls.
- **One dot for now.** Each eligible user gets one primary dot they can name
  and customize. OpenAI says it expects "teams of Dots working together," but
  multi-dot control is not available at launch.
- **Availability.** Launched for Pro and Business Premium users in "eligible
  markets"; reports differ on whether Business and Enterprise are included, and
  some exclude the EEA, Switzerland, and the UK for personal accounts.

!!! warning "Conflicting price reports"
    Engadget reports the first dot is free for Pro and Business Premium
    subscribers. AIMultiple lists a $100/mo starting price. We could not
    reconcile the two; check OpenAI's own announcement.

TechCrunch notes that much of what Dots do was already possible with Codex and
similar agent harnesses — Dots package those capabilities around independent
action.

## Muse (Meta)

Meta launched Muse on September 8, 2026, in the U.S. for users 18 and older,
as a separate app that also runs inside WhatsApp. It is aimed at everyday
tasks: schedules, shopping, travel, and turning long-term goals into plans.

- **Architecture.** Each user's agent runs in its own cloud virtual machine.
- **Permissions.** A layer called Sentinel decides whether each connected-app
  action and outbound request is allowed, blocked, or sent for approval. Meta
  says the agent never sees your actual passwords or payment details, and each
  purchase needs approval showing exact details.
- **Visibility.** Users can watch the agent's browser as it works and review an
  activity log.
- **Memory.** Stored as editable text files.
- **Pricing.** Free tier, plus $20/mo (Power) and $100/mo (Maximum) tiers with
  weekly token allowances.
- **Privacy.** Training on user data is on by default, with an opt-out.
- **Integrations.** Centered on Meta's platforms plus email, calendar,
  payments, and a handful of consumer categories — narrower than the
  developer-oriented tools.

## Claude Cowork (Anthropic)

Cowork launched in January 2026 and became generally available on
April 9, 2026. It lives in a tab inside Claude Desktop, where Claude reads your
files, runs multi-step tasks, and uses plugins and MCP connectors.

- **Platforms.** macOS first, with Windows following in February 2026.
  Anthropic's download page also lists Linux and ChromeOS builds.
- **Scheduled tasks.** Added February 25, 2026. A March 2026 source says they
  require the computer to be awake and Claude Desktop open, which makes
  Cowork the least "always-on" of the commercial products. That may have
  changed since.
- **Dispatch.** Lets you assign a task from your phone.
- **Pricing.** No separate SKU: it is included in Claude Pro ($20/mo), Max
  ($100 or $200/mo), Team, and Enterprise plans. Agentic tasks reportedly burn
  usage allowances five to twenty times faster than ordinary chat, and the
  usage pool is shared with Claude chat and Claude Code.
- **Enterprise.** Role-based access control, per-group spend limits, and usage
  analytics. One source notes Cowork activity is not yet captured in audit
  logs or the Compliance API.

## Open-source alternatives: OpenClaw and Hermes Agent

- **OpenClaw** is an MIT-licensed, self-hosted agent that lives in chat apps
  such as WhatsApp, Telegram, and Discord. You choose the model (Claude, GPT,
  Gemini, or a local model through Ollama). Model usage is the main cost —
  one estimate is $5–50/month. Reviews report reliability problems: runaway
  loops, malicious skills, and unattended deletions.
- **Hermes Agent** (Nous Research, public since February 25, 2026) is also
  MIT-licensed. It runs on a laptop, server, or cloud sandbox, supports many
  model providers, and has a learning loop that writes its own skills. The
  trade-off is that you manage your own servers, secrets, and security.

Press describes Grok Bot as "a user friendly OpenClaw": the same idea, hosted
and managed, in exchange for openness and control.

## Side-by-side comparison

| | **Grok Bot** | **Dots** | **Muse** | **Claude Cowork** | **OpenClaw / Hermes** |
|---|---|---|---|---|---|
| Vendor | SpaceXAI / Cursor | OpenAI | Meta | Anthropic | Community / Nous Research |
| Announced | Aug 11, 2026 | Sep 29, 2026 | Sep 8, 2026 | GA Apr 9, 2026 | Hermes public Feb 2026 |
| Runs where | Cloud computer shared by your bots | Own cloud computer and browser | Dedicated cloud VM per user | Mostly local sandbox plus connectors | Your laptop, server, or cloud |
| Model | Undisclosed | GPT-6 Astra | Muse Spark | Claude | Any |
| Multi-agent | Yes: many bots, group chats | One dot now; teams planned | One agent | Single session | Build your own |
| Always-on | Yes | Yes | Yes | Needs computer awake (Mar 2026 source) | Yes, if you host it |
| Integrations | Browser/computer use, Slack, connected apps | 4,000+ ChatGPT apps, Codex, Slack/Teams | Email, calendar, payments, WhatsApp | MCP connectors, plugins | Chat apps, skills, your own tools |
| Safety model | Auto Review model; shared logins | Read-only background access; approval rules | Sentinel layer; per-purchase approval; activity log | Local sandbox; enterprise RBAC | You manage it |
| Price | From $20/mo plus usage | Conflicting reports | Free, $20, $100/mo | Included in $20–$200/mo plans | Free software plus API costs |
| Open source | No | No | No | No | Yes (MIT) |

## Contrast: what actually differs

- **Grok Bot's differentiator is the manager/specialist bot model.** OpenAI
  says multi-dot control is planned but not shipped; Muse is one agent per
  user.
- **Grok Bot is the least transparent.** Models are undisclosed, usage
  allowances are unpublished, and the shared-login design widens the blast
  radius of any one failure. Dots and Muse document their approval rules more
  explicitly.
- **Dots lean on the ChatGPT ecosystem** — its apps, Codex, and voice calls.
- **Muse targets consumers**, with the strongest purchase-approval story but
  the narrowest work-tool integrations.
- **Cowork is session-oriented** and the most mature knowledge-work tool, but
  the least autonomous.
- **OpenClaw and Hermes trade convenience for control**: you pick the model and
  own the security.

## Caveats and gaps

- **No independent testing.** AIMultiple's comparison reports no benchmarks or
  controlled tests of Dots, Grok Bot, or Muse; the only first-hand evidence is
  the author's anecdotal use of Grok Bot.
- **Moving prices.** Tiers and prices changed within weeks of each launch.
- **Beta status.** SpaceXAI's October 12 pages checked by Kingy.ai do not say
  whether Grok Bot is still in beta.
- **Source bias.** Many comparison blogs host or sell one of the products they
  rank.
- **Unread source.** The Neowin article returned HTTP 403 and was not read
  directly.
- **Cowork currency.** The newest Cowork source we found is from August 2026.

## Questions to resolve before this becomes a chapter

1. Which of these agents suits an EE research workflow (long simulations,
   licensed EDA tools, lab data) — and which cannot reach those tools at all?
2. What is each agent's behavior on sensitive or unpublished research data
   (training defaults, retention, memory)?
3. How should a research group audit what an always-on agent did overnight?
4. Which claims can the author verify first-hand with a hands-on trial?

## Sources

- [The Information — SpaceXAI announces Grok Bot](https://www.theinformation.com/briefings/spacexai-announces-ai-agents-product-grok-bot)
- [MacRumors — Grok Bot brings always-on AI agents to macOS and iOS](https://www.macrumors.com/2026/08/11/grok-bot-macos-ios/)
- [Constellation Research — SpaceXAI launches Grok Bot](https://www.constellationr.com/insights/news/spacexai-launches-grok-bot-work-assistant)
- [Kingy.ai — What is Grok Bot?](https://kingy.ai/blog/what-is-grok-bot/)
- [TechCrunch — OpenAI launches Dots](https://techcrunch.com/2026/09/29/openai-launches-dots-its-bubbly-agentic-avatar/)
- [Engadget — Dots are OpenAI's new personal agents](https://www.engadget.com/2272230/dots-are-openais-new-personal-agents-and-soon-youll-be-able-to-control-several-of-them/)
- [CBS News — Sam Altman unveils dots](https://www.cbsnews.com/news/sam-altman-openai-dots-chatgpt-agents-safety/)
- [PBS NewsHour — Meta launches Muse](https://www.pbs.org/newshour/nation/meta-launches-personal-ai-agent-muse-to-help-with-everyday-tasks)
- [AIMultiple — Always-on agents: Dots vs Grok Bot vs Muse](https://aimultiple.com/always-on-agents)
- [Zenken — Claude Cowork guide](https://ai.zenken.co.jp/en/post/claude-cowork-howto/)
- [Softr — Claude Cowork vs OpenClaw](https://softr.io/blog/claude-cowork-vs-openclaw)
