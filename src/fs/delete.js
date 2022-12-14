import { join, sep } from 'path';
import { rm, access, constants, stat } from 'fs/promises';

export const deleteFile = async (currentDir, line) => {
  const args = line.split(' ');

  if (args.length > 2) throw new Error();

  const path = args[1].split(sep);
  const fileName = path.pop();
  const pathToFile = path.length > 0 ? join(...path, fileName) : join(currentDir, fileName);

  try {
    await access(pathToFile, constants.F_OK).catch(() => { throw new Error() });

    const file = await stat(pathToFile);
    if (!file.isFile()) throw new Error();

    rm(pathToFile);
  } catch (error) {
    throw new Error();
  }
}