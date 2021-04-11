const fs = require('fs');
const path = require('path');
const util = require('util');

const readDir = util.promisify(fs.readdir);
const copyFile = util.promisify(fs.copyFile);

const folderPath = './seo';
const finalPath = './build/seo';

(async function moveSeoFolder(seoFolder, dest) {
  // Check for dir and make it if it doesn't exist
  fs.access(dest, (err) => {
    if (err) {
      fs.mkdir(dest, async (err) => {
        if (err) throw err;
      });
    }
  });

  try {
    const seoFiles = await readDir(seoFolder);
    if (seoFiles) {
      // Wait to copy over all files to new dest
      Promise.all(seoFiles.map((file) => {
        copyFile(path.join(__dirname, seoFolder, file), path.join(__dirname, dest, file));
      }));
    }
  } catch (err) {
    console.log(err);
  }
}(folderPath, finalPath));
