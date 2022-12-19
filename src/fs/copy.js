import { join as pathJoin, sep } from 'path';
import { access, constants } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { normalizePath, checkDirectory, checkFile } from '../utils/utils.js';

export const copyFile = async (currentDir, args) => {  
  if (args.length > 2) throw new Error();

  const path = normalizePath(currentDir, args[0]);
  const pathToNewDir = normalizePath(currentDir, args[1]);
  const dir = path.split(sep);
  const fileName = dir[dir.length - 1];
  const oldPath = path;
  const newPath = pathJoin(pathToNewDir, fileName);

  try {
    await checkFile(oldPath);
    await checkDirectory(pathToNewDir);

    await access(oldPath, constants.F_OK).catch(() => { throw new Error() });
    await access(pathToNewDir, constants.F_OK).catch(() => { throw new Error() });

    const rs = createReadStream(oldPath);
    const ws = createWriteStream(newPath);

    pipeline(
      rs,
      ws,
      (err) => {
        if (err) {
          throw new Error();
        }
      }
    );
  } catch (error) {
    throw new Error()
  }
}