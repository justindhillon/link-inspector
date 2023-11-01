#! /usr/bin/env node
const args = process.argv.slice(2); // Gets npx arguments
const command = args[0]; // Gets <command>
const path = args[1]; // Gets /path/to/your/file/or/directory

// console.log() usage and available commands
function help() {
    console.log('usage: scan <command> /path/to/your/file/or/directory');
    console.log();
    console.log('   links       Creates directory with all broken links');
    console.log('   spelling    Not implemented yet');
    console.log();
    console.log('"scan help" lists available commands');
}

// npx scan help
if (command === "help") {
    help();
    process.exit(0);
}

// Error: no command or path given
if (args.length < 1) {
  console.error('Error: no command given');
  help();
  process.exit(1);
}

if (command === "links") {
    console.log("links");
    process.exit(0); // no errors occurred
}

if (command === "spelling") {
    console.log("spelling");
    process.exit(0); // no errors occurred
}

// Error: invalid command
console.error('Error: invalid command');
help();
process.exit(1);
