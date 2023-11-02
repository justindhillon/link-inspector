const fs = require('fs');
const path = require('path');

// dir is string
// returns array of file paths in dir
function getFilePaths(dir, fileList = []) {
    const files = fs.readdirSync(dir);
  
    files.forEach((file) => {
      const filePath = path.join(dir, file);
  
      if (fs.statSync(filePath).isDirectory()) {
        getFilePaths(filePath, fileList);
      } else {
        fileList.push(filePath);
      }
    });
  
    return fileList;
  }

module.exports = getFilePaths;
