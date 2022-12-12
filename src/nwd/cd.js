import { join, sep } from 'path';
import { lstat } from 'fs/promises';
import { upDir } from './up.js';

export const changeDir = async (currentDir, line) => {
  let newDir = currentDir;

  try {
    const path = line.slice(3);
  
    if (path.length < 2) throw new Error();
  

    if (path === '..') {
      return upDir(currentDir, 'up');
    }

    const sd = await lstat(path).catch(() => { throw new Error() });

    if (!sd.isFile()) {
      const pathArr = path.trim().split(sep);
      newDir = join(...pathArr);
    }
  } catch (error) {
    console.log('Invalid input \n');
  }

  return await newDir;
}