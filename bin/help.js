// console.log() usage and available commands
function help() {
    console.log('usage: npx scan-links <file/directory path>');
    console.log();
    console.log('   scan-links  Makes a file in an "output/" directory that');
    console.log('               containes all the broken links found');
    console.log();
    console.log('"npx scan help" lists available commands');
}

module.exports = help;
