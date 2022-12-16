import { argv } from 'process';

const quotes = {
  single: '\'',
  double: '\"',
  none: ' '
}

export const getUsername = () => {
  let username = 'Anonymous';
  const arrArgs = argv.splice(2);
  if (arrArgs.length > 0) {
    arrArgs.forEach((arg) => {
      if (arg.startsWith('--username')) {
        username = arg.split('=')[1];
      }
    })
  }

  return username;
}

export const lineParser = (line) => {
  let sep = ' ';

  if (line.includes(quotes.single)) {
    sep = quotes.single;
  } else if (line.includes(quotes.double)) {
    sep = quotes.double;
  } else {
    sep = quotes.none;
  }

  return extractArgs(line, sep);
}

const extractArgs = (line, sep) => {
  const arr = line.split(sep);
  const args = arr.filter((item) => item.trim().length > 0);
  const command = args.shift().trim();
  const argsAsArray = args;

  return [command, argsAsArray]
}
