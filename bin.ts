#! /usr/bin/env node

import { linkInspector } from "./index";

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error("no link or path given");
}

for (const arg of args) {
    linkInspector(arg).then((brokenLinks) => {
        console.log(brokenLinks);
    });
}
