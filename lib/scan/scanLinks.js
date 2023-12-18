const fs = require('fs');
const help = require("../help.js");
const getFilePaths = require("./getFilePaths.js");
const processPromises = require("./processPromises.js");

// path is <file/directory path>
// j is concurrent threads
async function scanLinks(path, j=1) {
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

  await processPromises(j, filePaths, fluff)
    .then(() => {
      console.log("Finished!");
    });
}

module.exports = scanLinks;
