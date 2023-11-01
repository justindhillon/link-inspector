#! /usr/bin/env node
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Please enter a file or directory');
  console.error('   npx getBrokenLinks /path/to/your/file/or/directory');
  process.exit(1); // an error occurred
}

const total = args.reduce((previous, current) => parseFloat(current) * parseFloat(previous));

if (isNaN(total)) {
  console.error('One or more arguments are not numbers');
  process.exit(1); // an error occurred
}

console.log(total);
process.exit(0); // no errors occurred
