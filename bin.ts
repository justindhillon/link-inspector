#! /usr/bin/env node

import { linkInspector } from "./index";

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error("no link or path given");
}

function writeLink(link: string) {
    console.log("Broken Link:", link);
}

for (const arg of args) {
    linkInspector(arg, writeLink);
}
