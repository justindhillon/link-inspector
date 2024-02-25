import { checkLink } from "./checkLink";
import fs from 'fs';

const urlRegex: RegExp = /(?<!xmlns=['"])(?<!xmlns:.*=['"])(?<!targetNamespace=['"])(\bhttps?:\/\/(?!.*\$)(?!.*{)(?!.*"\s\+)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

let QUEUE:Record<number, string[]> = {};
let PROCESS: number = 0;
let CURRENTPROCESS: number = 0;
let RUNNINGPROCESSES: number = 0;
const MAXPROCESSES: number = 100;

async function runProcess(callback: any) {
    if (MAXPROCESSES <= RUNNINGPROCESSES || !QUEUE[PROCESS-1]) return;

    RUNNINGPROCESSES++;
    const [link, path, lineNumber] = QUEUE[CURRENTPROCESS]!;
    delete QUEUE[CURRENTPROCESS];
    CURRENTPROCESS++;
    
    try {
        if (await checkLink(link!))
            callback(link, path, lineNumber);
    } catch {} // Skip invalid urls

    RUNNINGPROCESSES--;
    runProcess(callback);
}

export default async function linkInspector(arg: string, callback: any, path: string = '') { 
    try { // If arg is a link
        new URL(arg);
        QUEUE[PROCESS] = [arg, path];
        PROCESS++;
        runProcess(callback);
        return;
    } catch {}

    try { // If arg is a path
        const stats: fs.Stats = fs.lstatSync(arg);

        // Skip symbolic links
        if (stats.isSymbolicLink()) 
            return;

        // Skip files over 100mb
        if (100*1024*1024 < stats.size) 
            return

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
        if (!/^[\x00-\x7F]*$/.test(content)) 
            return;
                
        // Get all the links
        const lines = content.split('\n');

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const matches = line!.match(urlRegex) || [];

            const directoryIndex: number = arg.indexOf(path);
            const pathAfterDirectory: string = arg.substring(directoryIndex);

            for (const link of matches) {
                try { // Runs link inspector on each link
                    new URL(link);
                    QUEUE[PROCESS] = [link, pathAfterDirectory, (i+1).toString()];
                    PROCESS++;
                    runProcess(callback);
                } catch {}
            }
        }
    } catch {
        console.error(`Error: ${arg} is not a valid link or path`);
    }
}
