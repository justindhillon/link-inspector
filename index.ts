import { checkLink } from "./checkLink";
import fs from 'fs';

let PROCESSES: string[] = [];
let CURRENTPROCESS = 0;
let RUNNINGPROCESSES = 0;
const MAXPROCESSES = 10;

async function runProcess() {
    if (MAXPROCESSES <= RUNNINGPROCESSES || PROCESSES.length === CURRENTPROCESS) return;

    RUNNINGPROCESSES++;
    const link = PROCESSES[CURRENTPROCESS]!;
    delete PROCESSES[CURRENTPROCESS];
    CURRENTPROCESS++;
    
    if (await checkLink(link)) {
        console.log(link);
    }

    RUNNINGPROCESSES--;
    runProcess();
}

export async function linkInspector(arg: string) {
    try { // If arg is a link
        new URL(arg);
        PROCESSES.push(arg);
        runProcess();
        return;
    } catch (err: any) {
        if (err.message == "Cannot read properties of undefined (reading 'status')") return;
    }

    try { // If arg is a path
        const stats = fs.statSync(arg);

        // Handle directory
        if (stats.isDirectory()) {
            const files: string[] = fs.readdirSync(arg);
            for (const file of files) {
                await linkInspector(arg + "/" + file);
            }
            return;
        }

        // Handle file
        const content: string = fs.readFileSync(arg, 'utf8');
        const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        const links: string[] = content.match(urlRegex) || [];

        for (const link of links) {
            await linkInspector(link);
        }
    } catch {
        console.error("Error: Not a valid link or path")
    }
}
