const LinkCheckResult = require('./LinkCheckResult.js');
const needle = require('needle');
const pkg = require('../../package.json');

function checkLink(link, callback, attempts, additionalMessage) {
    let user_agent = `${pkg.name}/${pkg.version}`;
    const url = encodeURI(decodeURIComponent(new URL(link).toString()));

    const options = {
        user_agent: user_agent,
        follow_max: 8,
        response_timeout: 10000,
        auth: 'auto',
        headers: {},
        parse_response: false
    };

    needle.head(url, options, function (err, res) {
        if (!err && res.statusCode === 200) {
            if (additionalMessage){
                err = (err == null) ? additionalMessage : `${err} ${additionalMessage}`;
            }
            callback(null, new LinkCheckResult(link, res ? res.statusCode : 0, err)); // alive, returned 200 OK
            return;
        }

        // if HEAD fails (405 Method Not Allowed, etc), try GET
        needle.get(url, options, function (err, res) {
            if (additionalMessage){
                err = (err == null) ? additionalMessage : `${err} ${additionalMessage}`;
            }
            callback(null, new LinkCheckResult(link, res ? res.statusCode : 0, err));
        });
    });
};

module.exports = checkLink;
