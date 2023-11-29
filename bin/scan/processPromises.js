const readFile = require("./readFile.js");
const getLinks = require("./getLinks.js");
const writeBrokenLinks = require("./writeBrokenLinks.js");

function createPromise(filePath, fluff) {
    console.log(filePath);
    return new Promise(async (resolve, reject) => {
        try {
          const fileContent = readFile(filePath);
          const links = getLinks(fileContent);
  
          if (links !== null) {
            await writeBrokenLinks(links, filePath, fluff);
          }
          resolve();
        } catch (error) {
          reject(error);
        }
    });
}

function processPromises(maxConcurrent, filePaths, fluff) {
    let runningPromises = 0;
    let currentIndex = 1;
    let results = [];

    return new Promise((resolve, reject) => {
        const startNextPromise = () => {
            if (currentIndex > filePaths.length) {
                if (runningPromises === 0) {
                    resolve(results);
                }
                return;
            }

            const promiseIndex = currentIndex;
            currentIndex++;

            runningPromises++;
            createPromise(filePaths[promiseIndex - 1], fluff).then(() => {
                runningPromises--;
                startNextPromise();
            }).catch(reject);

            if (runningPromises < maxConcurrent) {
                startNextPromise();
            }
        };

        startNextPromise();
    });
}

module.exports = processPromises;

