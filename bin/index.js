#! /usr/bin/env node
const help = require("./help.js");
const scanLinks = require("./scan/scanLinks.js");

const args = process.argv.slice(2); // Gets npx arguments
const path = args[0]; // Gets <file/directory-path>

// Error: no path given
if (args.length < 1) {
    console.error('Error: no path given');
    help();
    process.exit(1);
}

if (path === "help") {
    help();
    process.exit(0);
}

scanLinks(path);
