import * as core from '@actions/core';
import * as fs from 'fs';
import * as readline from 'readline';

async function run(): Promise<void> {
  try {
    const filepath = core.getInput('changelog-path');
    const changelog = await readChangelog(filepath);
    core.setOutput('changelog', changelog);

  } catch (error) {
    core.setFailed(error.message);
  }
}

async function readChangelog(filepath: string): Promise<string> {
  const fileStream = fs.createReadStream(filepath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let versionCounter = 0;
  const changelogLines: Array<string> = [];

  for await (const line of rl) {
    if (/^# \[?[0-9]+\.[0-9]+\.[0-9]+\]?/.test(line)) {
      versionCounter++;
      if (versionCounter > 1) {
        break;
      }
    }
    changelogLines.push(line);
  }
  return changelogLines.slice(1).join('\n').trim();
}

run();
