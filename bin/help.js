// console.log() usage and available commands
function help() {
    console.log('usage: npx scan <command> <file/directory path>');
    console.log();
    console.log('   links       Creates directory with all broken links');
    console.log('   spelling    Not implemented yet');
    console.log();
    console.log('"npx scan help" lists available commands');
}

module.exports = help;
