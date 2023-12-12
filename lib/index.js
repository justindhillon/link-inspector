#! /usr/bin/env node
const help = require("./help.js");
const scanLinks = require("./scan/scanLinks.js");

const args = process.argv.slice(2); // Gets npx arguments

// Initialize variables for path and -j option
let path = '';
let jOptionValue = null;

// Parse the arguments
args.forEach((arg, index) => {
    if (arg === '-j' && args[index + 1]) {
        jOptionValue = parseInt(args[index + 1], 10); // Parse the next argument as an integer
    } else if (index === 0 || (index === 1 && args[0] === '-j')) {
        path = arg; // The path is expected to be the first or second argument
    }
});

// Error handling for no path given
if (!path) {
    console.error('Error: no path given');
    help();
}

if (path === "help") {
    help();
}

// Pass the -j option value to scanLinks, if provided
scanLinks(path, jOptionValue).then(() => {
    process.exit(0);
}).catch(() => {
    process.exit(1);
});
