const linkCheck = require('link-check');
const fs = require('fs');
const path = require('path');

// data is string
// path is <file/directory path>
// Writes data to identical path in "output"
function writeToFile(data, PATH) {
    PATH = "output/" + PATH;
    const directoryPath = path.dirname(PATH);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    // Writes to file
    fs.appendFile(PATH, data + "\n", function (err) {
        if (err) {
            console.error('Error: failed to write to', path, err);
            process.exit(1);
        }
    });
}

// links is array of strings
// path is <file/directory path>
// If broken links are found, it writes them
// in an "output" folder
async function writeBrokenLinks(links, PATH) {
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
