#!/usr/bin/env node
import { mkdir, lstat, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
if (!args.length || args.includes('--help')) {
  console.log('Usage: meeting-notes install [--dir <skills-directory>]');
  console.log('Defaults to .agents/skills in the current project. Existing skills are never overwritten.');
} else {
  try {
    if (args[0] !== 'install' || !(args.length === 1 ||
        (args.length === 3 && args[1] === '--dir' && !args[2].startsWith('--')))) {
      throw new Error('Use: meeting-notes install [--dir <skills-directory>]');
    }
    const parent = resolve(args[2] ?? '.agents/skills');
    const destination = join(parent, 'meeting-notes');
    await mkdir(parent, { recursive: true });
    try {
      await lstat(destination);
      throw new Error('Already installed: ' + destination + '. Move the existing folder to a backup location before installing an update.');
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
    const source = fileURLToPath(new URL('../skills/meeting-notes', import.meta.url));
    const files = ['SKILL.md', 'agents/openai.yaml'];
    const contents = await Promise.all(files.map(file => readFile(join(source, file))));
    await mkdir(destination);
    await mkdir(join(destination, 'agents'));
    for (const [index, file] of files.entries()) {
      const target = join(destination, file);
      await writeFile(target, contents[index], { flag: 'wx' });
      if (!(await readFile(target)).equals(contents[index])) {
        throw new Error('Installation verification failed: ' + target);
      }
    }
    console.log('Installed Meeting Notes at ' + destination);
    console.log('Ask your agent to use meeting-notes with your meeting notes.');
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
