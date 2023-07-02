import fs from 'fs';
import path from 'path';

export const checkPath = (currentDirectory, paths) => {
  paths = paths.split(" ");

  let src,
    dest,
    tempPath = [];

  paths.forEach((chunk) => {
    tempPath.push(chunk.replace(/['"]+/g, ''));
    if (
      !src &&
      fs.existsSync(path.resolve(currentDirectory, tempPath.join(" ")))
    ) {
      [src, tempPath] = [
        path.resolve(currentDirectory, tempPath.join(" ")),
        [],
      ];
    }
  });
  dest = path.resolve(currentDirectory, tempPath.join(" "));
  return [src, dest];
};
