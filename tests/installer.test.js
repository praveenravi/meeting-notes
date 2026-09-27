import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm, rename, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const cli = fileURLToPath(new URL('../bin/cli.js', import.meta.url));
const source = fileURLToPath(new URL('../skills/meeting-notes/SKILL.md', import.meta.url));
const run = (cwd, ...args) => spawnSync(process.execPath, [cli, ...args], { cwd, encoding: 'utf8' });
async function fixture(t) {
  const dir = await mkdtemp(join(tmpdir(), 'meeting-notes-test-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  return dir;
}

test('installs exact skill content and metadata into a project', async t => {
  const dir = await fixture(t);
  assert.equal(run(dir, 'install').status, 0);
  const target = join(dir, '.agents/skills/meeting-notes');
  assert.equal(await readFile(join(target, 'SKILL.md'), 'utf8'), await readFile(source, 'utf8'));
  assert.match(await readFile(join(target, 'agents/openai.yaml'), 'utf8'), /Meeting Notes/);
});

test('preserves local edits when duplicate installation is attempted', async t => {
  const dir = await fixture(t);
  assert.equal(run(dir, 'install').status, 0);
  const file = join(dir, '.agents/skills/meeting-notes/SKILL.md');
  await writeFile(file, 'Local edits');
  assert.equal(run(dir, 'install').status, 1);
  assert.equal(await readFile(file, 'utf8'), 'Local edits');
});

test('supports explicit directories containing spaces and backup-first updates', async t => {
  const dir = await fixture(t);
  const parent = join(dir, 'custom skills');
  assert.equal(run(dir, 'install', '--dir', parent).status, 0);
  await rename(join(parent, 'meeting-notes'), join(dir, 'previous-version'));
  assert.equal(run(dir, 'install', '--dir', parent).status, 0);
  assert.equal(await readFile(join(dir, 'previous-version/SKILL.md'), 'utf8'), await readFile(source, 'utf8'));
});

test('rejects invalid arguments', async t => {
  const dir = await fixture(t);
  for (const args of [['install', '--typo'], ['install', '--dir'], ['remove']]) {
    assert.equal(run(dir, ...args).status, 1);
  }
});

test('does not overwrite a dangling destination symlink', async t => {
  const dir = await fixture(t);
  await symlink(join(dir, 'missing'), join(dir, 'meeting-notes'));
  assert.equal(run(dir, 'install', '--dir', dir).status, 1);
});
