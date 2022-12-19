import { rm, access, constants, stat } from 'fs/promises';
import { normalizePath, checkFile } from '../utils/utils.js';

export const deleteFile = async (currentDir, args) => {
  if (args.length > 1) throw new Error();

  const path = normalizePath(currentDir, args[0]);

  try {
    await checkFile(path);
    await access(path, constants.F_OK).catch(() => { throw new Error() });

    rm(path);
  } catch (error) {
    throw new Error();
  }
}