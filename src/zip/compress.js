import { createBrotliCompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { join as joinPath, sep } from 'path';
import { normalizePath, checkFile, checkDirectory } from '../utils/utils.js';

export const compress = async (currentDir, args) => {
  if (args.length > 2) throw new Error();

  const path = normalizePath(currentDir, args[0]);
  const dir = path.split(sep);
  const fileName = dir[dir.length - 1];
  const pathToArchive = normalizePath(currentDir, args[1] || currentDir);

  try {
    await checkFile(path);
    await checkDirectory(pathToArchive);

    const rs = createReadStream(path);
    const brotli = createBrotliCompress();
    const ws = createWriteStream(joinPath(pathToArchive, `${fileName}.br`));

    pipeline(
      rs,
      brotli,
      ws
    );
  } catch (error) {
    throw new Error();
  }
}