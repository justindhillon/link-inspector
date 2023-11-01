const fs = require('fs');

function readFile (filePath) {
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        console.log(fileContents);
        process.exit(1);
    } catch (error) {
        console.error('Error reading the file:', error.message);
        process.exit(1);
    }
};

module.exports = { readFile };