const help = require("../help.js");

// path is /path/to/your/file/or/directory
function links(path) {
  // Error: no path given
  if (path === undefined) {
    console.error('Error: no path given');
    help.help();
    process.exit(1);
  }
  console.log(path);
  process.exit(0);
}

module.exports = { links };
