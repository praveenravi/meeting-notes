# Meeting Notes

Turn pasted meeting notes into **decisions, action items, and open questions**.

Meeting Notes is a small instruction-based agent skill. It keeps missing owners
and deadlines explicit, separates conditional offers from commitments, and
preserves unresolved disagreements. No account or API key is required by the skill.

## Before and after

**Notes**
> Maya: Let's launch Monday.
> Leo: QA won't finish until Wednesday.
> Maya: Agreed, launch Thursday instead.
> Leo: I'll send QA results Wednesday.

**Result**
- **Decision:** Launch Thursday instead of Monday.
- **Action:** Send QA results — Leo — Wednesday.
- **Open questions:** None recorded.

## Install

**Version 0.2.0** · [Source on GitHub](https://github.com/praveenravi/meeting-notes)

Install from GitHub:

```sh
npx skills add praveenravi/meeting-notes --skill meeting-notes
```

Select your agent in the installer. To install specifically for Codex in a project:

```sh
npx skills add praveenravi/meeting-notes --skill meeting-notes --agent codex
```

To try the downloaded source locally, run this from your target project, replacing
the path with the location of this package:

```sh
node /absolute/path/to/meeting-notes/bin/cli.js install
```

Or install the provided npm archive:

```sh
npm install /absolute/path/to/meeting-notes-lifecycle-demo-0.2.0.tgz
npx meeting-notes install
```

The bundled installer defaults to your current project's `.agents/skills`.
Use `--dir <skills-directory>` for a different agent's documented skill location.
It verifies written files and refuses to overwrite an existing skill.
The npm package and the skill registration are separate steps.

## Use

Ask your agent:

> Use Meeting Notes on the transcript below.

In Codex, you can explicitly mention `$meeting-notes`. Paste your notes or supply
a file. If the skill does not appear, start a fresh chat or restart the agent.
Try [the sample](examples/notes.md) and compare it with [the reference](examples/expected.md).

By default, results have Decisions, Action items, and Open questions sections.
An action includes its task, owner, and deadline. Missing values are marked
"Not specified". You can request a different output format.

## Compatibility and testing

The skill uses portable Markdown instructions and no agent-specific execution tools.
Optional `agents/openai.yaml` provides Codex display metadata.

- A fresh-context agent trial passed the original sample and eight edge cases.
  The agent was explicitly directed to the skill, so this does not prove automatic discovery.
- The local npm installer passed five automated checks and a packaged-install smoke test.
- The third-party Skills CLI discovered and installed the skill from this local source.
  Public installation is verified separately from agent behavior.
- Automatic discovery in a new local Codex session remains unverified: the installed
  CLI failed before running the task.
- Claude Code and Cursor have not been tested. Their supported installation
  locations do not by themselves establish behavioral compatibility.

See [test inputs](examples/edge-cases.md), [evaluation rubric](examples/evaluation.md),
and [release notes](RELEASE.md). These examples are small checks, not a guarantee
of accuracy on every transcript. Review extracted commitments before acting on them.

## Update and uninstall

If installed with the Skills CLI:

```sh
npx skills update meeting-notes
npx skills remove meeting-notes
```

If installed with our npm package, install the newer package/archive, move the
existing `meeting-notes` skill directory to a backup location outside the skills
directory, then rerun `npx meeting-notes install`. Restore the backup to roll back.

To uninstall a copy created by our installer, remove only its `meeting-notes`
directory and uninstall the npm package. The npm uninstall step alone does not
remove the copied skill.

If migrating from the earlier `meeting-actions` demo, move that old skill out of
the skills directory before installing this renamed version.

## Privacy

The skill contains instructions, and its installer only writes local files.
Neither includes telemetry or sends your meeting notes to a service. Your chosen
agent and model provider still process the notes under their own settings and
terms. The separate third-party Skills CLI has its own telemetry policy:
[Skills CLI documentation](https://github.com/vercel-labs/skills#telemetry).

## Report a problem

Use [GitHub Issues](https://github.com/praveenravi/meeting-notes/issues). Include your agent and
version, the Meeting Notes version, and a small fictional or anonymized example.
Do not post confidential meeting notes. An issue template is included.

## Develop

Requires Node.js 20 or newer for the optional installer.

```sh
npm test
npm pack --dry-run
npm pack
```

The source has no npm dependencies. The skill itself does not require Node.js
once its files have been installed.

## License

[MIT](LICENSE). You may use, modify, and redistribute it, including commercially,
under the license terms.
