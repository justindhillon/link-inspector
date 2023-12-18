const needle = require('needle');

// Returns True is link is valid
function checkLink(link) {
    return new Promise((resolve) => {
        let user_agent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36`;
        const url = encodeURI(decodeURIComponent(new URL(link).toString()));

        const options = {
            user_agent: user_agent,
            follow_max: 8,
            response_timeout: 10000,
            parse_response: false
        };

        needle.head(url, options, function (err, res) {
            if (!err && res.statusCode === 200) {
                resolve(!err && res.statusCode === 200);
                return;
            }

            // if HEAD fails (405 Method Not Allowed, etc), try GET
            needle.get(url, options, function (err, res) {
                resolve(!err && res.statusCode === 200);
            });
        });
    })
}

module.exports = checkLink;
