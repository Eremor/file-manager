import { stdout } from 'process';
import { sep, join } from 'path';

export const upDir = (currentDir, line) => {
  if (line.split(' ').length > 1) throw new Error();

  const pathArr = currentDir.split(sep);
  let newDir = '';

  if (pathArr.length > 1) {
    newDir = join(...pathArr, '..');
  } else {
    newDir = currentDir;
  }

  return newDir;
}