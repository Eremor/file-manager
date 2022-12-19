import { join, sep } from 'path';
import { upDir } from './up.js';
import { normalizePath, checkDirectory } from '../utils/utils.js'

export const changeDir = async (currentDir, args) => {
  let newDir = currentDir;

  if (args.length > 1) throw new Error();

  try {
    if (args[0] === '..') {
      return upDir(currentDir, []);
    }

    const path = normalizePath(currentDir, args[0]);

    await checkDirectory(path);

    const sepPath = path.split(sep);
    newDir = join(...sepPath);
  } catch (error) {
    throw new Error();
  }

  return newDir;
}