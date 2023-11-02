const getFilePaths = require("./getFilePaths.js");
const readFile = require("./readFile.js");
const getLinks = require("./getLinks.js");
const writeBrokenLinks = require("./writeBrokenLinks.js");
const help = require("../help.js");
const fs = require('fs');

// path is <file/directory path>
async function links(path) {
  // Error: path does not exist
  if (!fs.existsSync(path)) {
    console.error('Error:', path, 'does not exist');
    help();
    process.exit(1);
  }

  let filePaths = [];

  if (fs.statSync(path).isDirectory()) {
    filePaths = filePaths.concat(getFilePaths(path));
  } else {
    filePaths.push(path);
  }

  filePaths.forEach((filePath) => {
    // gets content of path
    const fileContent = readFile(filePath);

    // gets array of links from fileContent
    const links = getLinks(fileContent);

    // if any broken links are found, it writes 
    // them to an "output" folder
    if (links !== null) {
      writeBrokenLinks(links, filePath);
    }
  });

  console.log("If nothing is output below, no broken links where found");
}

module.exports = links;
