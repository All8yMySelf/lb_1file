# Agent Workflow

This repository is often edited by multiple local agents. Keep changes small,
check the worktree before editing, and avoid overwriting another agent's local
work.

## Branches

- `testing` is the GitHub default branch and should be treated as the live
  branch for published updates.
- `codex/local-work` is the shared local staging branch used for agent changes
  before they are promoted to `testing`.
- If you are already on another feature branch, inspect the branch and diff
  before deciding whether to stay there or switch.

## Before Editing

Run:

```sh
git status --short --branch
git branch -vv
```

If there are unrelated local changes, do not revert or stage them without
explicit user approval. Work only with the files needed for the requested task.

## Version And Docs

For a publishable game update:

- Bump the centralized `GAME_VERSION` value in `index.html`.
- Keep the browser title and start-screen title derived from that version.
- Add matching entries to `CHANGELOG.md` and the README change log summary.
- Keep `index.html` self-contained apart from the existing Firebase CDN scripts
  and checked-in media assets.

## Checks

Run the smoke check before committing or pushing:

```sh
node scripts/smoke_check.mjs
```

Also run `git diff --check` before committing when practical.

## Publishing

Preferred release flow:

```sh
git switch codex/local-work
git status --short --branch
node scripts/smoke_check.mjs
git diff --check
git add README.md CHANGELOG.md index.html
git commit -m "Release vX.YY ..."
git push origin codex/local-work
git switch testing
git merge --ff-only codex/local-work
git push origin testing
```

Use explicit file paths with `git add` unless the user has confirmed that the
entire worktree belongs in the release.

If the fast-forward merge fails, stop and inspect history instead of forcing the
branch. Do not rewrite `testing` unless the user explicitly asks for that.
