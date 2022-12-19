import { access, constants } from 'fs/promises';
import { createWriteStream } from 'fs';
import { normalizePath } from '../utils/utils.js';

export const createFile = async (currentDir, args) => {
  if (args.length > 1) throw new Error();

  const path = normalizePath(currentDir, args[0]);

  let isExist = false;

  try {
    await access(path, constants.F_OK)
      .then(() => isExist = false)
      .catch(() => isExist = true);
    
    if (isExist) {
      const ws = createWriteStream(path);
      ws.close();
    } else {
      throw new Error();
    }
  } catch (error) {
    throw new Error();
  }

}