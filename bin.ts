#! /usr/bin/env node

import linkInspector from "./index";
import {dirname, basename} from 'path';
import fs from 'fs';

const args: string[] = process.argv.slice(2);

if (args.length === 0) {
    console.error("no link or path given");
}

async function writeLink(link: string, path: string, lineNumber: number) {
    path = path.replace(/\/\//g, '/');

    console.log("Broken Link:", link);
    if (path) console.log("Path:", path);
    if (lineNumber) console.log("Line:", lineNumber);
    console.log("");

    if (path) {
        path = "output/" + path;
        if (!fs.existsSync(path))
            fs.mkdirSync(dirname(path), { recursive: true });
        
        fs.appendFileSync(path, link + "\n");
    }
}

for (const arg of args) {
    let path: string = '';

    try { new URL(arg) }
    catch {
        path = basename(arg);
    }

    linkInspector(arg, writeLink, path);
    console.log("");
}
