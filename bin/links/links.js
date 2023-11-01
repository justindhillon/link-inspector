const fs = require("fs");
const help = require("../help.js");

// path is /path/to/your/file/or/directory
function links(path) {
  // Error: no path given
  if (path === undefined) {
    console.error('Error: no path given');
    help.help();
    process.exit(1);
  }

  // Error: file or directory does not exist
  if (fs.existsSync(path)) {
    console.error('Error: file or directory does not exist');
    process.exit(0);

  }

  console.log("Not implemented yet");
}

module.exports = { links };
