const scanLinks = require("../bin/scan/scanLinks");

// Documentation on dircompare:
// https://gliviu.github.io/dc-api/index.html
const dircompare = require('dir-compare');
const options = { compareContent: true };

describe('scanLinks.js', () => {
    test('scanLinks returns broken links', async () => {
        await scanLinks("test/test_suite").then(async () => {
            const res = dircompare.compareSync("test/expected_output", "output/test_suite", options);
            console.log(res.same);
            expect(res.same).toEqual(true);
        }).catch(() => {
            process.exit(1);
        });
    });
});
