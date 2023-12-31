const readFile = require("./readFile.js");
const getLinks = require("./getLinks.js");
const writeBrokenLinks = require("./writeBrokenLinks.js");
const isImagePath = require("./isImagePath.js");

function createPromise(filePath, fluff) {
    return new Promise(async (resolve, reject) => {
        try {
            if (isImagePath(filePath)) resolve(); // Skip images

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

            runningPromises++;
            currentIndex++;
            createPromise(filePaths[currentIndex - 2], fluff).then(() => {
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

