// content is string
// returns array of http links as strings
function getLinks(content) {
    // Creddit:
    // https://stackoverflow.com/questions/1500260/detect-urls-in-text-with-javascript
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    const links = content.match(urlRegex);
    return links;
};

module.exports = getLinks;
