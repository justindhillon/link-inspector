import { checkLink } from "./checkLink";
import fs from 'fs';

let PROCESSES: string[][] = [[]];
let CURRENTPROCESS = 0;
let RUNNINGPROCESSES = 0;
const MAXPROCESSES = 10;

async function runProcess(callback: any) {
    if (MAXPROCESSES <= RUNNINGPROCESSES || PROCESSES.length === CURRENTPROCESS) return;

    RUNNINGPROCESSES++;
    const link = PROCESSES[CURRENTPROCESS]![0]!;
    const path = PROCESSES[CURRENTPROCESS]![1]!;
    delete PROCESSES[CURRENTPROCESS];
    CURRENTPROCESS++;
    
    try {
        if (await checkLink(link)) {
            callback(link, path);
        }
    } catch {} // Skip invalid urls

    RUNNINGPROCESSES--;
    runProcess(callback);
}

export default async function linkInspector(arg: string, callback: any, path='') {    
    try { // If arg is a link
        new URL(arg);
        PROCESSES.push([arg, path]);
        runProcess(callback);
        return;
    } catch {}

    try { // If arg is a path
        const stats = fs.statSync(arg);

        // Skip files over 100mb
        if (100*1024*1024 < stats.size) return

        // Handle directory
        if (stats.isDirectory()) {
            const files: string[] = fs.readdirSync(arg);
            for (const file of files) {
                linkInspector(arg + "/" + file, callback, path);
            }
            return;
        }

        // Handle file
        const content: any = fs.readFileSync(arg, 'utf8');

        // Skip binary files
        if (!/^[\x00-\x7F]*$/.test(content)) return;
                
        // Get all the links
        const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        const links: string[] = content.match(urlRegex) || [];

        const directoryIndex = arg.indexOf(path);
        const pathAfterDirectory = arg.substring(directoryIndex);

        for (const link of links) {
            try { // Runs link inspector on each link
                new URL(link);
                PROCESSES.push([link, pathAfterDirectory]);
                runProcess(callback);
            } catch { return }
        }
    } catch {
        console.error("Error: Not a valid link or path")
    }
}
