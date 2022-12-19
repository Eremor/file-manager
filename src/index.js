import readline from 'readline/promises';
import { stdin, stdout } from 'process';
import { homedir } from 'os';

import { getUsername, lineParser } from './utils/utils.js';
import { upDir } from './nwd/up.js';
import { changeDir } from './nwd/cd.js';
import { showDir } from './nwd/ls.js';
import { readFile } from './fs/read.js';
import { createFile } from './fs/create.js';
import { renameFile } from './fs/rename.js';
import { copyFile } from './fs/copy.js';
import { moveFile } from './fs/move.js';
import { deleteFile } from './fs/delete.js';
import { getOSInfo } from './os/os.js';
import { hashFile } from './hash/hash.js';

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
  prompt: '> ',
});

const username = getUsername();
let currentDir = homedir();

stdout.write(`Welcome to the File Manager, ${username}! \n\n`);
stdout.write(`You are currently in ${currentDir}! \n`);

rl.prompt();

rl.on('line', async (line) => {
  const [command, args] = lineParser(line);

  try {
    switch (command) {
      case '.exit':
        rl.close();
        break;
      case 'up':
        currentDir = upDir(currentDir, args);
        break;
      case 'cd':
        currentDir = await changeDir(currentDir, args);
        break;
      case 'ls':
        await showDir(currentDir, args);
        break;
      case 'cat':
        await readFile(currentDir, args);
        break;
      case 'add':
        await createFile(currentDir, args);
        break;
      case 'rn':
        await renameFile(currentDir, args);
        break;
      case 'cp':
        await copyFile(currentDir, args);
        break;
      case 'mv':
        await moveFile(currentDir, args);
        break;
      case 'rm':
        await deleteFile(currentDir, args);
        break;
      case 'os':
        await getOSInfo(args);
        break;
      case 'hash':
        await hashFile(currentDir, args);
        break;
    
      default:
        stdout.write('Invalid input \n');
    }
  } catch (err) {
    stdout.write('Operation failed\n');
  }

  console.log(`You are currently in ${currentDir}\n`);
  rl.prompt();
});

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
});