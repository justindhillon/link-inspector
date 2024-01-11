import { checkLink } from "./checkLink";
import fs from 'fs';

export function linkInspector(arg: string) {
    try { // If arg is a link
        new URL(arg);
        checkLink(arg);
    } catch {}

    try { // If arg is a path
        const stats = fs.statSync(arg);

        if (stats.isDirectory()) {
            const files: string[] = fs.readdirSync(arg);
            for (const file of files) {
                linkInspector(arg + "/" + file);
            }
        }

        
    } catch (err) {
        console.error(err);
        console.error("Error: Not a valid link or path")
    }
}
