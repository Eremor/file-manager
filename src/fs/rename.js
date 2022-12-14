import { join, sep } from 'path';
import { rename, access, constants } from 'fs/promises';

export const renameFile = async (currentDir, line) => {
  const path = line.slice(3)
  const args = path.split(' ');

  if (args.length > 2) throw new Error();

  const dir = args[0].split(sep);
  const oldName = dir.pop();
  const newName = args[1];
  const pathToOldFile = dir.length > 0 ? join(...dir, oldName) : join(currentDir, oldName);
  const pathToNewFile = dir.length > 0 ? join(...dir, newName) : join(currentDir, newName);

  try {
    await access(pathToOldFile, constants.F_OK).catch(() => { throw new Error() });
    rename(pathToOldFile, pathToNewFile);
  } catch (error) {
    throw new Error();
  }

}