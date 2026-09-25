#!/usr/bin/env node
// PreToolUse hook for Bash: blocks commands that bypass project safeguards.
// Exit code 2 blocks the tool call and shows stderr to Claude.

const chunks = [];
for await (const chunk of process.stdin) chunks.push(chunk);

let command = "";
try {
  const input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  command = String(input?.tool_input?.command ?? "");
} catch {
  process.exit(0);
}

const rules = [
  { pattern: /--no-verify\b/, reason: "Git hooks must not be bypassed (--no-verify)." },
  { pattern: /\bgit\s+push\b[^;&|]*\s(--force\b|--force-with-lease\b|-f\b)/, reason: "Force-push is not allowed." },
  { pattern: /\bgit\s+push\b[^;&|]*\s(origin\s+)?(HEAD:)?main\b/, reason: "Pushing to main is not allowed. Open a pull request instead." },
  { pattern: /\bgit\s+commit\b[^;&|]*\s-n\b/, reason: "Git hooks must not be bypassed (-n)." },
];

for (const { pattern, reason } of rules) {
  if (pattern.test(command)) {
    process.stderr.write(`Blocked by .claude/hooks/guard-git.mjs: ${reason}\n`);
    process.exit(2);
  }
}

process.exit(0);
