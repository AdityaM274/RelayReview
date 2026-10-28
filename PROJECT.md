# Relay Review

A release rehearsal workspace built for Builder Agent-Native Hackathon 2026. Created28October2026. Domain workflow: /review.

## What works
People and external agents read and edit the same release draft through typed Agent-Native actions. Compare-and-set rejects stale concurrent edits; the UI preserves the unsaved local draft and explains how to reload. Rehearsal checks missing rollback instructions, unverified irreversible steps, dependency cycles, dependency order and downstream blast radius. It does not execute shell/deploy commands. Input is limited to40validatedsteps.

## Start
Node22.22+ and pnpm. Run pnpm install, then pnpm dev, and open /review after local development sign-in. On this Windows computer, the framework CLI/worker failed when the real project path contained spaces. A clean source copy at C:/Users/mitta/relay-review-runtime runs; keep development outside a whitespace-containing path. GPU native dependency builds are explicitly disabled in pnpm-workspace.yaml; no GPU runtime is used. Do not enable ignored scripts indiscriminately.

Use pnpm exec vitest run shared/release-plan.test.ts, pnpm exec agent-native typecheck, pnpm exec agent-native doctor. The scaffold’s generic README is retained; this file describes the custom app.

## External agent workflow
The agent in this demonstration is OpenAI Codex in the development chat, using the official Agent-Native action CLI. CLI get-release-draft read the same revision; update-release-draft changed it and the browser displayed that actual change. In-app chat provider is not configured, and no paid LLM/API inference or autonomous deployment is claimed. Use the existing app provider setup only if you want in-app chat; it is not needed for deterministic checks or an external agent.

One action definition powers UI and agent: actions/get-release-draft.ts, update-release-draft.ts, analyze-release.ts. The current ephemeral review draft lives in authenticated application_state, not a shared production deployment database. It is scoped by the framework’s user context. Never paste production secrets. Production hosting/auth hardening is outside this demo.

## Verified
4core tests pass; typecheck clean; doctor clean. Real browser sample rehearsal, dependency-cycle blocking and two-tab stale-edit rejection verified. Initial conflict threw a generic server error; fixed to return a typed expected conflict message while preserving unsaved text. The source/code tests are separate from real-world deployment validation; none was performed.

Known Windows CLI cleanup bug: a command can apply its action and then exit with a Node UV_HANDLE_CLOSING assertion. Actual shared state was checked in the UI. Never infer that the write failed solely from that exit code, and never repeat a mutation without reading its revision first.

## Originality / disclosure
Official @agent-native/core0.221.0 Chat template is pre-existing MIT software from Builder.io; original custom domain actions, dependency analysis, route, tests, app navigation/prompt integration and documentation were generated with OpenAI Codex under Aditya Mittal’s direction28October2026. The blank scaffold, shared action architecture, auth, chat and design components are not claimed as original. Libraries are pinned in pnpm-lock.yaml, with their own licenses. No earlier competition application code reused.

## Limits / next development
Planning checks operate on declared dependencies and user assertions. A clear result is not proof a backup restores, a rollback is safe or a production release will succeed. No deployment is performed. Next work: validate with actual release engineers, add evidence attachments and recovery drill outcomes, and add scoped integration with change-management systems after authorization. No real users or time savings invented.
