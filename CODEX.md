# Codex Orchestration Workflow

This file supplements `AGENTS.md`; it does not replace it. At the beginning of
future Codex sessions in this repository, read both `AGENTS.md` and `CODEX.md`
before planning or editing.

## Roles

- Codex is the lead planner, task splitter, orchestrator, and final reviewer.
- Claude Code or Hermes, connected to Ollama Cloud, may perform selected
  token-heavy implementation tasks.
- Codex chooses the worker model according to task difficulty and expected
  Ollama Cloud usage.
- Prefer lower-usage models for routine work, medium-usage models for
  substantial implementation, and GLM-5.2 or Kimi K2.7 Coder only for justified
  escalation.
- Delegated jobs receive narrow task packets. Do not include the whole project
  history unless the worker truly needs it.
- Parallel workers must use separate Git worktrees or branches.
- All work remains inside the local repository.

## Repository Safety

- Do not commit, push, publish, deploy, or modify the live GitHub version unless
  Jason explicitly requests it.
- Existing uncommitted work must never be discarded or overwritten.
- Codex must inspect and approve every delegated change, run available
  validation, and review the final Git diff before handing work back.

## Usage Accounting

Track usage for every Codex feature and every delegated worker request under
`.codex-usage/`.

Recommended privacy arrangement:

- Keep `.codex-usage/` local and ignored by Git.
- Optionally track only a sanitized summary such as `docs/ai-usage-summary.md`.
- Ask Jason before changing the root `.gitignore`.

Machine-readable request records use JSON Lines in
`.codex-usage/requests.jsonl`. A concise human-readable summary is maintained in
`.codex-usage/usage-summary.md`.

Record as much of the following as the relevant tool exposes:

- date and local time
- feature or task name
- unique task ID
- service: Codex or Ollama Cloud
- harness: Codex CLI, Claude Code, or Hermes
- exact model name
- reasoning level when available
- input or prompt tokens
- cached input tokens when available
- output tokens
- reasoning tokens when separately available
- total tokens
- number of model requests
- model execution duration
- total task duration
- outcome: success, failure, retry, or escalation
- files changed
- Git commit, once a commit eventually exists
- unavailable metrics marked clearly as unavailable, never estimated as exact

For Ollama API responses, preserve the final response metadata fields when
available:

- `prompt_eval_count`
- `eval_count`
- `prompt_eval_duration`
- `eval_duration`
- `total_duration`
- `load_duration`

Do not lose the final usage record when streaming responses. If Claude Code or
Hermes does not expose these metrics directly, use a wrapper or proxy that calls
the Ollama API and logs the final response metadata.

For Codex usage:

- Inspect the installed Codex CLI version and supported commands.
- Inspect structured JSON or JSONL event output.
- Determine which token and session-usage fields this version exposes.
- Use exact reported values only.
- If interactive Codex does not expose per-request token usage, record the
  nearest reliable session or task total and label its scope accurately.
- Do not infer exact token usage from text length.
- Do not claim ChatGPT-plan usage has a monetary API cost.
- Distinguish token counts from plan limits and monetary costs.

## Feature Completion Report

At the end of every completed feature, display a short report in this form:

```text
Feature: <name>

Codex
- Model: <model>
- Requests: <number>
- Input tokens: <number or unavailable>
- Cached tokens: <number or unavailable>
- Output tokens: <number or unavailable>
- Reasoning tokens: <number or unavailable>
- Total tokens: <number or unavailable>

Ollama Cloud workers
- <model>: <requests>, <input tokens> in, <output tokens> out
- <model>: <requests>, <input tokens> in, <output tokens> out
- Total Ollama input tokens: <number>
- Total Ollama output tokens: <number>
- Total Ollama tokens: <number>

Execution
- Retries: <number>
- Escalations: <number>
- Duration: <time>
- Result: <result>
- Files changed: <list>

Cost
- Codex monetary cost: included in ChatGPT plan unless a separately billed API key was used
- Ollama monetary cost: report only when a reliable plan or API price can be calculated
- Otherwise report token and usage totals without inventing a dollar amount
```

Also append a one-line entry to the cumulative feature table in
`.codex-usage/usage-summary.md`.
