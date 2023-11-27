const linkCheck = require('link-check');
const fs = require('fs');
const path = require('path');

function isLocalhostUrl(url) {
    const localhostRegex = /^(https?:\/\/)?localhost(:\d+)?(\/|$)/i;
    return localhostRegex.test(url);
}

// data is string
// path is <file/directory path>
// Writes data to identical path in "output"
function writeToFile(data, PATH, fluff) {
    PATH = PATH.replace(fluff, '');
    PATH = "output/" + PATH;
    const directoryPath = path.dirname(PATH);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
    
    console.log("Broken Link Found:", PATH);

    // Writes to file
    fs.appendFileSync(PATH, data + "\n", function (err) {
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
async function writeBrokenLinks(links, PATH, fluff) {
    for (const link of links) {
        if (isLocalhostUrl(link)) { continue }

        try {
            const result = await new Promise((resolve, reject) => {
                linkCheck(link, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            if (result.status === "dead") {
                writeToFile(link, PATH, fluff);
            }
        } catch (err) {
            console.error('Error: failed to validate', link, err);
            // Handle the error as needed, maybe continue to the next link instead of exiting
        }
    }

    return;
};

module.exports = writeBrokenLinks;
