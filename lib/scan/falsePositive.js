function isLocalhost(url) {
    const localhostRegex = /^(https?:\/\/)?localhost(:\d+)?(\/|$)/i;
    return localhostRegex.test(url);
}

// Takes in link as string
// Returns true if it is a false positive
function falsePositive(link) {
    if (isLocalhost(link)) return true // Skips localhosts
};

module.exports = falsePositive;
