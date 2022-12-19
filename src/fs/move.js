import { copyFile } from './copy.js';
import { deleteFile } from './delete.js';

export const moveFile = async (currentDir, args) => {
  if (args.length > 2) throw new Error();

  const pathToDeleteFile = args[0];

  try {
    await copyFile(currentDir, args);
    await deleteFile(currentDir, [pathToDeleteFile]);
  } catch (error) {
    throw new Error();
  }
}