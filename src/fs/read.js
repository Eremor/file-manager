import { lstat } from 'fs/promises';
import { createReadStream } from 'fs';
import { sep, join } from 'path';

export const read = async (currentDir, line) => {
  const path = line.slice(4);
  const pathArr = path.trim().split(sep);
  const pathToFile = (pathArr.length === 1 && pathArr[0].includes('.')) ? join(currentDir, ...pathArr) : path;

  const sd = await lstat(pathToFile);

  if (!sd.isFile()) {
    throw new Error();
  }

  return new Promise((res, rej) => {
    try {
      const rs = createReadStream(pathToFile);
      rs.on('data', (chunk) => process.stdout.write(chunk.toString()+ '\n'));
      rs.on('end', () => res());
    } catch (error) {
      rej();
    }
  })
}