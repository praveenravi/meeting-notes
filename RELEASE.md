# Meeting Notes 0.2.0

## Changes
- Renamed the skill, display name, installer command, and package to Meeting Notes.
- Added handling for canceled tasks, unresolved conflicting statements, and unknown speakers.
- Added MIT licensing, an installation guide, privacy details, and a GitHub issue template.
- Added eight edge cases and an evaluation rubric.
- Installer now reads and writes the bundled files explicitly, verifies their content,
  and preserves existing installations rather than overwriting them.

## Validation
- Five automated installer tests pass: content and metadata, local-edit protection,
  custom directories and backup-first updates, invalid arguments, and dangling links.
- A fresh-context agent independently applied the skill to the original sample
  and eight edge cases without reading expected results. Manual review passed all nine.
  Cases shared one trial session; they were treated as separate inputs.
- The actual npm archive installed successfully; installed content and included license were verified.
- The Skills CLI discovered and installed the skill from the local source for Codex.
- Automatic discovery was attempted with the locally installed Codex CLI
  (0.27.0), but it failed on configuration and then crashed before model execution.
  No compatibility conclusion can be drawn from that attempt.
- Claude Code and Cursor have not been tested.
- The system skill-validator was run with PyYAML installed in an isolated work folder.
  Metadata and references were also reviewed manually.

## Publication
The package is still marked private and uses a local demo npm name.
The target GitHub repository is praveenravi/meeting-notes; install and issue links are set.
Before npm publication, choose an available package name or an owned npm scope,
remove private: true, and inspect npm pack --dry-run. The MIT license is included.
GitHub publication alone is sufficient for npx skills distribution.

This release is distributed through GitHub. No npm registry package is published.
Third-party Skills CLI updates and installation by another user remain to be verified.
