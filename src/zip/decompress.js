import { createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { join as joinPath, sep } from 'path';
import { normalizePath, checkFile, checkDirectory } from '../utils/utils.js';

export const decompress = async (currentDir, args) => {
  if (args.length > 2) throw new Error();

  const path = normalizePath(currentDir, args[0]);
  const dir = path.split(sep);
  const fileName = dir[dir.length - 1];
  const pathToFile = normalizePath(currentDir, args[1] || currentDir);

  try {
    await checkFile(path);
    await checkDirectory(pathToFile);

    const rs = createReadStream(path);
    const brotli = createBrotliDecompress();
    const ws = createWriteStream(joinPath(pathToFile, `${fileName.slice(0, fileName.length - 3)}`));

    pipeline(
      rs,
      brotli,
      ws
    );
  } catch (error) {
    throw new Error();
  }
}