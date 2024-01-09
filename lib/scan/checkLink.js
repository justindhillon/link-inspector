const axios = require("axios");

// Return true if link is broken
async function checkLink(link) { 
    const params = {
        headers: {
            "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        },
    };

    try {
        await axios.head(link, params);
        return false;
    } catch (err) {
        // Head failed
        try {
            await axios.get(link, params);
            return false;
        } catch (err) {
            // Get failed, so it is a bad link
            return true;
        }
    }
}

module.exports = checkLink;
