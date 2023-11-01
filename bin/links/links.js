const readFile = require("./readFile.js");
const help = require("../help.js");

// path is <file-path>
function links(path) {
  console.log(path);

  // Error: no path given
  if (path === undefined) {
    console.error('Error: no path given');
    help.help();
    process.exit(1);
  }

  // console.log() content of path
  readFile.readFile(path);
  process.exit(0);
}

module.exports = { links };
