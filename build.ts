import path from 'path';
import fs from 'node:fs/promises';
import { parse as parseYaml } from 'yaml';

const SRC_DIR = './src';
const DIST_DIR = './dist-data';
await fs.mkdir(DIST_DIR, { recursive: true });

const files = await fs.readdir(SRC_DIR);

await Promise.all(
  files.map(async (file) => {
    const base = path.parse(file).name;

    const resumeRaw = parseYaml(
      await fs.readFile(path.join(SRC_DIR, file), {
        encoding: 'utf8',
      })
    );

    await fs.writeFile(
      path.join(DIST_DIR, `${base}.json`),
      JSON.stringify(resumeRaw, undefined, 2)
    );

    console.log(`${base} built`);
  })
);
