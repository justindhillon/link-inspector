// console.log() usage and available commands
function help() {
    console.log('usage: npx link-inspector <file/directory path>');
    console.log();
    console.log('   link-inspector  Makes a file in an "output/" directory that');
    console.log('                   containes all the broken links found');
    console.log();
    console.log('   Option     Meaning');
    console.log('   -j         Sets the number of parallel threads');
    console.log();
    console.log('"npx link-inspector help" lists available commands');
    process.exit(1);
}

module.exports = help;
