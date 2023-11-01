const readFile = require("./readFile.js");
const help = require("../help.js");

// path is <file/directory path>
function links(path) {
  // Error: no path given
  if (path === undefined) {
    console.error('Error: no path given');
    help();
    process.exit(1);
  }

  // console.log() content of path
  readFile(path);
  process.exit(0);
}

module.exports = links;
