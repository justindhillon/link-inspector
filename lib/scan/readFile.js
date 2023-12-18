const fs = require('fs');

// filePath is <file/directory path>
function readFile (filePath) {
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return fileContents
    } catch (error) {
        console.error('Error reading the file', filePath, error.message);
        return '';
    }
};

module.exports = readFile;

