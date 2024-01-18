#! /usr/bin/env node

import linkInspector from "./index";
import {dirname, basename} from 'path';
import fs from 'fs';

const args = process.argv.slice(2);

if (args.length === 0) {
    console.error("no link or path given");
}

async function writeLink(link: string, path: any) {
    console.log("Broken Link:", link);

    if (path) {
        path = "output/" + path;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(dirname(path), { recursive: true });
        }
        fs.appendFileSync(path, link + "\n");
    }
}

for (const arg of args) {
    let path = '';

    try {new URL(arg)}
    catch {
        path = basename(arg);
    }

    linkInspector(arg, writeLink, path);
}
