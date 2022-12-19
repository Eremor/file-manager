import { sep } from 'path';
import { rename, access, constants } from 'fs/promises';
import { normalizePath, checkFile } from '../utils/utils.js';

export const renameFile = async (currentDir, args) => {
  if (args.length > 2) throw new Error();

  const path = normalizePath(currentDir, args[0]);

  await checkFile(path);

  const dir = path.split(sep);
  const oldName = dir.pop();
  const newName = args[1];
  const pathToDir = dir.join(sep);

  const pathToOldFile = normalizePath(pathToDir, oldName);
  const pathToNewFile = normalizePath(pathToDir, newName);

  try {
    await access(pathToOldFile, constants.F_OK).catch(() => { throw new Error() });
    rename(pathToOldFile, pathToNewFile);
  } catch (error) {
    throw new Error();
  }

}