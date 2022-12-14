import { join, sep } from 'path';
import { access, constants } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';

export const copyFile = async (line) => {
  const lineArgs = line.slice(3);
  const args = lineArgs.split(' ');
  
  if (args.length > 2) throw new Error();

  const oldPathArr = args[0].split(sep);
  const fileName = oldPathArr[oldPathArr.length - 1];
  const oldPath = args[0];
  const newPath = join(args[1], fileName);

  try {
    await access(oldPath, constants.F_OK).catch(() => { throw new Error() });
    await access(args[1], constants.F_OK).catch(() => { throw new Error() });

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