import { checkLink } from "./checkLink";
import fs from 'fs';

function isBinaryFile(filePath: string) {
    const content = fs.readFileSync(filePath);
    for (let i = 0; i < content.length; i++) {
      // Check for binary characters in the content
      if (content[i]! <= 8 || (content[i]! >= 14 && content[i]! <= 31)) {
        return true; // Binary file detected
      }
    }
}

let PROCESSES: string[] = [];
let CURRENTPROCESS = 0;
let RUNNINGPROCESSES = 0;
const MAXPROCESSES = 10;

async function runProcess(callback: any, path: any) {
    if (MAXPROCESSES <= RUNNINGPROCESSES || PROCESSES.length === CURRENTPROCESS) return;

    RUNNINGPROCESSES++;
    const link = PROCESSES[CURRENTPROCESS]!;
    delete PROCESSES[CURRENTPROCESS];
    CURRENTPROCESS++;
    
    try {
        if (await checkLink(link)) {
            callback(link, path);
        }
    } catch {} // Skip invalid urls

    RUNNINGPROCESSES--;
    runProcess(callback, path);
}

export async function linkInspector(arg: string, callback: any, path='') {
    try { // If arg is a link
        new URL(arg);
        PROCESSES.push(arg);
        runProcess(callback, path);
        return;
    } catch {}

    try { // If arg is a path
        const stats = fs.statSync(arg);

        // Handle directory
        if (stats.isDirectory()) {
            const files: string[] = fs.readdirSync(arg);
            for (const file of files) {
                linkInspector(arg + "/" + file, callback);
            }
            return;
        }

        // Handle file
        const content: any = fs.readFileSync(arg, 'utf8');

        // Skip binary files
        if (!/^[\x00-\x7F]*$/.test(content)) {
            console.log('skip');
            return;
        }
        
        // Get all the links
        const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        const links: string[] = content.match(urlRegex) || [];

        for (const link of links) {
            linkInspector(link, callback, arg);
        }
    } catch {
        console.error("Error: Not a valid link or path")
    }
}
