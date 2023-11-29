const getFilePaths = require("./getFilePaths.js");
const readFile = require("./readFile.js");
const getLinks = require("./getLinks.js");
const writeBrokenLinks = require("./writeBrokenLinks.js");
const help = require("../help.js");
const fs = require('fs');

// path is <file/directory path>
async function scanLinks(path) {
  // Error: path does not exist
  if (!fs.existsSync(path)) {
    console.error('Error:', path, 'does not exist');
    help();
  }

  let filePaths = [];

  if (fs.statSync(path).isDirectory()) {
    filePaths = getFilePaths(path);
  } else {
    filePaths.push(path);
  }
  
  const removeSlash = path.replace(/\/$/, "");
  const lastSlashIndex = removeSlash.lastIndexOf('/');
  const fluff = removeSlash.substring(0, lastSlashIndex + 1);

  console.log("If nothing is output below, no broken links where found");

  let promises = filePaths.map(filePath => {
    return new Promise(async (resolve, reject) => {
      try {
        const fileContent = readFile(filePath);
        const links = getLinks(fileContent);

        if (links !== null) {
          await writeBrokenLinks(links, filePath, fluff);
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });

  await Promise.all(promises)
    .then(() => {
      console.log("Finished!");
    })
    .catch(error => {
      console.error("An error occurred:", error);
    });
}

module.exports = scanLinks;
