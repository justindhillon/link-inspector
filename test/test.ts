import { linkInspector } from "../index";

let brokenLinks: string[] = [];

function addLink(link: string) {
    brokenLinks.push(link);
}

// Assuming linkInspector returns a Promise
async function inspectLinks() {
    await linkInspector("https://www.nationalgeographic.com/404-error-page-not-found", addLink);
    console.log(brokenLinks);
}

inspectLinks();
