const readFile = require("./readFile.js");
const getLinks = require("./getLinks.js");
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

  const linkCheck = require('link-check');

linkCheck('http://example.com', function (err, result) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`${result.link} is ${result.status}`);
});
}

module.exports = links;
