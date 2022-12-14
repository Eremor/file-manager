import readline from 'readline/promises';
import { stdin, stdout } from 'process';
import { homedir } from 'os';

import { getUsername } from './utils/utils.js';
import { upDir } from './nwd/up.js';
import { changeDir } from './nwd/cd.js';
import { showDir } from './nwd/ls.js';
import { readFile } from './fs/read.js';
import { createFile } from './fs/create.js';
import { renameFile } from './fs/rename.js';
import { copyFile } from './fs/copy.js';

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
  prompt: '> ',
});

const username = getUsername();
let currentDir = homedir();

// const commands = {
//   '.exit': () => rl.close(),
//   'add': (line) => console.log('create file', line)
// }

stdout.write(`Welcome to the File Manager, ${username}! \n\n`);
stdout.write(`You are currently in ${currentDir}! \n`);

rl.prompt();

rl.on('line', async (line) => {
  const command = line.split(' ')[0];

  // const arr = Object.keys(commands);
  // for (let key of arr) {
  //   if (command == key) {
  //     commands[command].call(this, line);
  //   }
  // }

  // const error = arr.filter((item) => item === command);

  // if(error.length === 0) {
  //   console.log('Invalid input');
  // }
  
  try {
    switch (command) {
      case '.exit':
        rl.close();
        break;
      case 'up':
        currentDir = upDir(currentDir, line);
        break;
      case 'cd':
        currentDir = await changeDir(currentDir, line);
        break;
      case 'ls':
        await showDir(currentDir);
        break;
      case 'cat':
        await readFile(currentDir, line);
        break;
      case 'add':
        await createFile(currentDir, line);
        break;
      case 'rm':
        await renameFile(currentDir, line);
        break;
      case 'cp':
        await copyFile(line);
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