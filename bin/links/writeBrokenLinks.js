const linkCheck = require('link-check');

// link is string
// path is <file/directory path>
// Writes link to 
function writeToFile(link, path) {
    console.log(link, path);
}

// links is array of strings
// path is <file/directory path>
// If broken links are found, it writes them
// in an "output" folder
async function writeBrokenLinks(links, path) {
    for (const link of links) {
        linkCheck(link, function (err, result) {
            if (err) {
                console.error('Error: failed to validate', link);
                process.exit(1);
            }
            if (result.status === "dead") {
                writeToFile(link, path);
            }
        });
    }
};

module.exports = writeBrokenLinks;
