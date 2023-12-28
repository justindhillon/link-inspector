const needle = require('needle');

// Return true if link is broken
async function checkLink(link) { 
    const url = encodeURI(decodeURIComponent(new URL(link).toString()));

    const user_agent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36`;

    const options = {
        user_agent: user_agent,
        follow_max: 8,
        response_timeout: 10000,
        parse_response: false,
        follow_if_same_protocol: true
    };

    try {
        const headResponse = await needle('head', url, null, options);
        if (headResponse.statusCode !== 200) {
            return true;
        }

        // If HEAD fails, GET
        const getResponse = await needle('get', url, null, options);
        return (getResponse.statusCode !== 200);
    } catch (err) {
        return false;
    }
}

module.exports = checkLink;
