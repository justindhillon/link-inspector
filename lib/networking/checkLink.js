const LinkCheckResult = require('./LinkCheckResult.js');
const ms = require('ms');
const needle = require('needle');
const pkg = require('../../package.json');

function checkLink(link, callback, attempts, additionalMessage) {

    // default request timeout set to 10s if not provided in options
    let timeout = '10s';

    let user_agent = `${pkg.name}/${pkg.version}`;

    // Decoding and encoding is required to prevent encoding already encoded URLs
    // We decode using the decodeURIComponent as it will decode a wider range of
    // characters that were not necessary to be encoded at first, then we re-encode
    // only the required ones using encodeURI.
    // Note that we don't use encodeURIComponents as it adds too much non-necessary encodings
    // see "Not Escaped" list in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#description
    const url = encodeURI(decodeURIComponent(new URL(link).toString()));

    const options = {
        user_agent: user_agent,
        follow_max: 8,
        response_timeout: ms(timeout),
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
