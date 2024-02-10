import { checkLink } from "./checkLink";
import fs from 'fs';

let PROCESSES: string[][] = [];
let CURRENTPROCESS: number = 0;
let RUNNINGPROCESSES: number = 0;
const MAXPROCESSES: number = 100;

async function runProcess(callback: any) {
    if (MAXPROCESSES <= RUNNINGPROCESSES || PROCESSES.length === CURRENTPROCESS) return;

    RUNNINGPROCESSES++;
    const [link, path] = PROCESSES[CURRENTPROCESS]!;
    delete PROCESSES[CURRENTPROCESS];
    CURRENTPROCESS++;
    
    try {
        if (await checkLink(link!)) {
            callback(link, path);
        }
    } catch {} // Skip invalid urls

    RUNNINGPROCESSES--;
    runProcess(callback);
}

export default async function linkInspector(arg: string, callback: any, path: string = '') {    
    try { // If arg is a link
        new URL(arg);
        PROCESSES.push([arg, path]);
        runProcess(callback);
        return;
    } catch {}

    try { // If arg is a path
        const stats: fs.Stats = fs.lstatSync(arg);

        // Skip symbolic links
        if (stats.isSymbolicLink()) return;

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
        const content: string = fs.readFileSync(arg, 'utf8');

        // Skip binary files
        if (!/^[\x00-\x7F]*$/.test(content)) return;
                
        // Get all the links
        const urlRegex: RegExp = /(?<!xmlns=['"])(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        const links: string[] = content.match(urlRegex) || [];

        const directoryIndex: number = arg.indexOf(path);
        const pathAfterDirectory: string = arg.substring(directoryIndex);

        for (const link of links) {
            try { // Runs link inspector on each link
                new URL(link);
                PROCESSES.push([link, pathAfterDirectory]);
                runProcess(callback);
            } catch {}
        }
    } catch {
        console.error(`Error: ${arg} is not a valid link or path`);
    }
}
