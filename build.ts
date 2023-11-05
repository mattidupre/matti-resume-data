import fs from 'node:fs/promises';
import { parse as parseYaml } from 'yaml';

const resumeRaw = parseYaml(
  await fs.readFile('./src/resume.yaml', {
    encoding: 'utf8',
  })
);

await fs.mkdir('./dist-data', { recursive: true });

await fs.writeFile(
  './dist-data/resume.json',
  JSON.stringify(resumeRaw, undefined, 2)
);
