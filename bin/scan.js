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

// It is done this way because we don't know
// how to use process.exit(0) with async functions
// Error: invalid command
if (command !== "help" && command !== "links" && command !== "spelling") {
    console.error('Error: invalid command');
    help();
    process.exit(1);
}

// npx scan help
if (command === "help") {
    help();
}

// npx scan links
if (command === "links") {
    links(path);
}

// npx scan spelling
if (command === "spelling") {
    spelling(path);
}
