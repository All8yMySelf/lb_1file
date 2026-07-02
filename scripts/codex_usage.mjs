#!/usr/bin/env node
import { mkdir, appendFile, readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { performance } from 'node:perf_hooks';
import path from 'node:path';

const usageDir = path.resolve('.codex-usage');
const jsonlPath = path.join(usageDir, 'requests.jsonl');
const summaryPath = path.join(usageDir, 'usage-summary.md');

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith('--')) {
      args._.push(arg);
      continue;
    }
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      args[key] = true;
    } else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

function unavailable(value = 'unavailable') {
  return value;
}

function localTimestamp() {
  return new Date().toLocaleString('sv-SE', {
    timeZoneName: 'short',
    hour12: false,
  });
}

async function ensureUsageFiles() {
  await mkdir(usageDir, { recursive: true });
  try {
    await readFile(summaryPath, 'utf8');
  } catch {
    await writeFile(summaryPath, [
      '# Codex Usage Summary',
      '',
      'Raw detailed records live in `.codex-usage/requests.jsonl` and should remain local unless Jason explicitly chooses otherwise.',
      '',
      '| Date | Feature | Task ID | Service | Harness | Model | Requests | Input | Cached | Output | Reasoning | Total | Outcome | Duration | Files | Commit |',
      '| --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | ---: | --- | --- |',
      '',
    ].join('\n'));
  }
}

async function appendRecord(record) {
  await ensureUsageFiles();
  await appendFile(jsonlPath, `${JSON.stringify(record)}\n`);
  const m = record.metrics || {};
  const files = Array.isArray(record.files_changed) ? record.files_changed.join(', ') : unavailable();
  const row = [
    record.local_time,
    record.feature || unavailable(),
    record.task_id,
    record.service,
    record.harness,
    record.model,
    m.model_requests ?? unavailable(),
    m.input_tokens ?? m.prompt_eval_count ?? unavailable(),
    m.cached_input_tokens ?? unavailable(),
    m.output_tokens ?? m.eval_count ?? unavailable(),
    m.reasoning_tokens ?? unavailable(),
    m.total_tokens ?? unavailable(),
    record.outcome,
    m.total_task_duration_ms ?? m.total_duration ?? unavailable(),
    files || unavailable(),
    record.git_commit || unavailable(),
  ].map(value => String(value).replaceAll('|', '\\|'));
  await appendFile(summaryPath, `| ${row.join(' | ')} |\n`);
}

function baseRecord(args, service) {
  return {
    schema_version: 1,
    task_id: args['task-id'] || randomUUID(),
    feature: args.feature || unavailable(),
    task_name: args.task || unavailable(),
    service,
    harness: args.harness || unavailable(),
    model: args.model || unavailable(),
    reasoning_level: args.reasoning || unavailable(),
    date: new Date().toISOString(),
    local_time: localTimestamp(),
    outcome: args.outcome || 'success',
    files_changed: args.files ? args.files.split(',').map(s => s.trim()).filter(Boolean) : [],
    git_commit: args.commit || unavailable(),
  };
}

function finalOllamaJson(lines) {
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    try {
      const parsed = JSON.parse(lines[i]);
      if (parsed.done === true) return parsed;
    } catch {
      // Ignore non-JSON response text.
    }
  }
  return null;
}

async function ollamaGenerate(args) {
  if (!args.model) throw new Error('Missing --model');
  if (!args.prompt) throw new Error('Missing --prompt');

  const host = args.host || process.env.OLLAMA_HOST || 'http://127.0.0.1:11434';
  const endpoint = `${host.replace(/\/$/, '')}/api/generate`;
  const started = performance.now();
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      model: args.model,
      prompt: args.prompt,
      stream: args.stream === 'true',
      think: args.reasoning && args.reasoning !== 'unavailable' ? args.reasoning : undefined,
    }),
  });

  const text = await response.text();
  const elapsedMs = Math.round(performance.now() - started);
  if (!response.ok) {
    throw new Error(`Ollama request failed (${response.status}): ${text.slice(0, 500)}`);
  }

  const lines = text.split(/\r?\n/).filter(Boolean);
  const final = args.stream === 'true' ? finalOllamaJson(lines) : JSON.parse(text);
  if (!final) throw new Error('Ollama response did not include a final usage record');

  const record = {
    ...baseRecord({ ...args, harness: args.harness || 'direct Ollama API' }, 'Ollama Cloud'),
    metrics: {
      prompt_eval_count: final.prompt_eval_count ?? unavailable(),
      eval_count: final.eval_count ?? unavailable(),
      prompt_eval_duration: final.prompt_eval_duration ?? unavailable(),
      eval_duration: final.eval_duration ?? unavailable(),
      total_duration: final.total_duration ?? unavailable(),
      load_duration: final.load_duration ?? unavailable(),
      input_tokens: final.prompt_eval_count ?? unavailable(),
      output_tokens: final.eval_count ?? unavailable(),
      total_tokens: Number.isFinite(final.prompt_eval_count) && Number.isFinite(final.eval_count)
        ? final.prompt_eval_count + final.eval_count
        : unavailable(),
      model_requests: 1,
      model_execution_duration_ms: final.eval_duration ?? unavailable(),
      total_task_duration_ms: elapsedMs,
    },
    response_metadata_available: true,
    prompt_logged: false,
    prompt_privacy_note: 'Prompt text is intentionally not stored in usage logs.',
  };
  await appendRecord(record);
  process.stdout.write(JSON.stringify({
    task_id: record.task_id,
    response: final.response,
    metrics: record.metrics,
  }, null, 2));
  process.stdout.write('\n');
}

async function recordManual(args) {
  const record = {
    ...baseRecord(args, args.service || 'Codex'),
    metrics: {
      input_tokens: args['input-tokens'] || unavailable(),
      cached_input_tokens: args['cached-tokens'] || unavailable(),
      output_tokens: args['output-tokens'] || unavailable(),
      reasoning_tokens: args['reasoning-tokens'] || unavailable(),
      total_tokens: args['total-tokens'] || unavailable(),
      model_requests: args.requests || unavailable(),
      model_execution_duration_ms: args['model-duration-ms'] || unavailable(),
      total_task_duration_ms: args['duration-ms'] || unavailable(),
    },
    metric_scope: args.scope || 'manually recorded from exposed tool output',
    unavailable_metrics_note: args.note || unavailable(),
  };
  await appendRecord(record);
  process.stdout.write(`${record.task_id}\n`);
}

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  const args = parseArgs(rest);
  if (command === 'ollama-generate') {
    await ollamaGenerate(args);
  } else if (command === 'record') {
    await recordManual(args);
  } else {
    throw new Error('Usage: scripts/codex_usage.mjs <ollama-generate|record> [--key value]');
  }
}

main().catch(error => {
  console.error(error.message);
  process.exit(1);
});
