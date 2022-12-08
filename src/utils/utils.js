import { argv } from 'process';

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