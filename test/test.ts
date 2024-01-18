import linkInspector from "../index";

const expectedLinks = [
    'https://www.bbc.com/nonexistent-article-abcxyz',
    'https://www.bbc.com/nonexistent-article-abcxyz',
    'https://www.nasa.gov/unknown-page',
    'https://www.nasa.gov/unknown-page',
    'https://www.nationalgeographic.com/404-error-page-not-found',
    'https://www.nationalgeographic.com/404-error-page-not-found',
    'https://www.un.org/en/thispagedoesnotexist',
    'https://www.un.org/en/thispagedoesnotexist',
    'https://www.wikipedia.org/404testpage12345',
    'https://www.wikipedia.org/404testpage12345'
]

const expectedPaths = [
    'test/tests/brokenLinks',
    'test/tests/subfolder/brokenLinks',
    'test/tests/brokenLinks',
    'test/tests/subfolder/brokenLinks',
    'test/tests/brokenLinks',
    'test/tests/subfolder/brokenLinks',
    'test/tests/brokenLinks',
    'test/tests/subfolder/brokenLinks',
    'test/tests/brokenLinks',
    'test/tests/subfolder/brokenLinks'
]

function test() {
    brokenLinks.sort();

    for (const i in brokenLinks) {
        const link = brokenLinks[i]![0];
        const path = brokenLinks[i]![1];
        if (link != expectedLinks[i]) throw Error;
        if (path != expectedPaths[i]) throw Error;
    }
}

let brokenLinks: string[][] = [];

function addLinks(link: string, path: string) {
    brokenLinks.push([link, path]);
}

linkInspector("test/tests", addLinks);

setTimeout(test, 10000);
