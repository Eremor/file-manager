import { readdir } from 'fs/promises';
import { join, sep } from 'path';

export const showDir = async (currentDir, args) => {
  if (args.length > 0) throw new Error();

  const cd = currentDir.split(sep);

  try {
    const files = await readdir(join(...cd), { withFileTypes: true });
    const info = [];

    for (const file of files) {
      info.push({
        'Name': file.name,
        'Type': file.isFile() ? 'file' : 'directory'
      });
    }

    console.table(info);
  } catch (error) {
    throw new Error();
  }
}