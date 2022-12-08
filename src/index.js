import readline from 'readline/promises';
import { stdin, stdout } from 'process';
import { getUsername } from './utils/utils.js';

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

// const username = argv.splice(2)[0].split('=')[1];
const username = getUsername();

const commands = {
  '.exit': () => rl.close(),
  'add': (line) => console.log('create file', line)
}

stdout.write(`Welcome to the File Manager, ${username}! \n`);

rl.on('line', (line) => {
  const command = line.split(' ')[0];

  const arr = Object.keys(commands);
  for (let key of arr) {
    if (command == key) {
      commands[command].call(this, line);
    }
  }

  const error = arr.filter((item) => item === command);

  if(error.length === 0) {
    console.log('Invalid input');
  }
});

rl.on('close', () => console.log(`Thank you for using File Manager, ${username}, goodbye!`));