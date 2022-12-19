import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { pipeline } from 'stream';
import { normalizePath, checkFile } from '../utils/utils.js';

export const hashFile = async (currentDir, args) => {
  if (args.length > 1) throw new Error();

  const path = normalizePath(currentDir, args[0]);
  await checkFile(path);

  // try {
  //   const input = createReadStream(path);
  //   const hash = createHash('sha256');

  //   pipeline(
  //     input,
  //     hash,
  //     process.stdout,
  //     (err) => {
  //       if (err) {
  //         throw new Error();
  //       }
  //     }
  //   );
  //   input.pipe(hash).setEncoding('hex').pipe(process.stdout);
  //   process.stdout.write('\n');
  // } catch (error) {
  //   throw new Error();
  // }
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