import { createReadStream } from 'fs';
import { normalizePath, checkFile } from '../utils/utils.js';

export const readFile = async (currentDir, args) => {
  if (args.length > 1) throw new Error();

  const path = normalizePath(currentDir, args[0]);

  await checkFile(path);

  return new Promise((res, rej) => {
    try {
      const rs = createReadStream(path);
      rs.on('data', (chunk) => process.stdout.write(chunk.toString()+ '\n'));
      rs.on('end', () => res());
    } catch (error) {
      rej();
    }
  })
}