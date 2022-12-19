import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { normalizePath, checkFile } from '../utils/utils.js';

export const hashFile = async (currentDir, args) => {
  if (args.length > 1) throw new Error();

  const path = normalizePath(currentDir, args[0]);
  await checkFile(path);

  return new Promise((res, rej) => {
    try {
      const rs = createReadStream(path);
      const hash = createHash('sha256');

      rs.on('data', (chunk) => {
        hash.update(chunk.toString());
        console.log(`Hash: ${hash.digest('hex')}\n`);
      });
      rs.on('end', () => res());
    } catch (error) {
      rej();
    }
  })
}