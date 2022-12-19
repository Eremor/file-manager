import { sep, join } from 'path';

export const upDir = (currentDir, args) => {
  if (args.length > 0) throw new Error();

  const pathArr = currentDir.split(sep);
  let newDir = currentDir;

  if (pathArr.length > 1) {
    newDir = join(...pathArr, '..');
  }

  return newDir;
}