#! /usr/bin/env node
const help = require("./help.js");
const links = require("./links/links.js");
const spelling = require("./spelling/spelling.js");

const args = process.argv.slice(2); // Gets npx arguments
const command = args[0]; // Gets <command>
const path = args[1]; // Gets <file/directory-path>

// Error: no command or path given
if (args.length < 1) {
    console.error('Error: no command given');
    help();
    process.exit(1);
}

// npx scan help
if (command === "help") {
    help();
    process.exit(0);
}

// npx scan links
if (command === "links") {
    links(path);
    process.exit(0);
}

// npx scan spelling
if (command === "spelling") {
    spelling(path);
    process.exit(0);
}

// Error: invalid command
console.error('Error: invalid command');
help();
process.exit(1);
