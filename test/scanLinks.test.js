const scanLinks = require("../bin/scan/scanLinks");
const fs = require('fs');

// Documentation on dircompare:
// https://gliviu.github.io/dc-api/index.html
const dircompare = require('dir-compare');
const options = { compareContent: true };

describe('scanLinks.js', () => {
    test('scanLinks returns broken links', async () => {
        // Remove "output/test_suite"
        fs.rm("output/test_suite", { recursive: true, force: true }, (err) => {
            if (err) {
              // An error occurred
              console.error(err);
              process.exit(1);
            }
          });

        await scanLinks("test/test_suite").then(async () => {
            const res = dircompare.compareSync("test/expected_output", "output/test_suite", options);
            console.log(res.same);
            expect(res.same).toEqual(true);
        }).catch(() => {
            process.exit(1);
        });
    });
});
