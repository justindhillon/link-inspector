const readFile = require("./readFile.js");
const getLinks = require("./getLinks.js");
const writeBrokenLinks = require("./writeBrokenLinks.js");
const help = require("../help.js");

// path is <file/directory path>
async function links(path) {
  // Error: no path given
  if (path === undefined) {
    console.error('Error: no path given');
    help();
    process.exit(1);
  }

  // gets content of path
  const fileContent = readFile(path);

  // gets array of links from fileContent
  const links = getLinks(fileContent);

  // if any broken links are found, it writes 
  // them to an "output" folder
  writeBrokenLinks(links, path);
}

module.exports = links;
