import { copyFile } from './copy.js';
import { deleteFile } from './delete.js';

export const moveFile = async (currentDir, line) => {
  const lineArgs = line.slice(3);
  const args = lineArgs.split(' ');

  if (args.length > 2) throw new Error();

  const pathToDeleteFile = args[0];

  try {
    await copyFile(line);
    await deleteFile(currentDir, `rm ${pathToDeleteFile}`);
  } catch (error) {
    throw new Error();
  }
}