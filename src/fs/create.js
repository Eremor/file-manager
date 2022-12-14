import { join } from 'path';
import { access, constants } from 'fs/promises';
import { createWriteStream } from 'fs';

export const createFile = async (currentDir, line) => {
  const pathArr = line.split(' ');

  if (pathArr.length > 2) throw new Error();

  const fileName = pathArr[1];
  const pathToFile = join(currentDir, fileName);
  let isExist = false;

  try {
    await access(pathToFile, constants.F_OK)
      .then(() => isExist = false)
      .catch(() => isExist = true);
    
    if (isExist) {
      const ws = createWriteStream(pathToFile);
      ws.close();
    } else {
      throw new Error();
    }
  } catch (error) {
    throw new Error();
  }

}