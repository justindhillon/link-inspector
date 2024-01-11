import { checkLink } from "./checkLink";
import fs from 'fs';

export function linkInspector(arg: string) {
    try { // If arg is a link
        new URL(arg);
        checkLink(arg);
        return;
    } catch {}

    try { // If arg is a path
        const stats = fs.statSync(arg);

        if (stats.isDirectory()) {
            const files: string[] = fs.readdirSync(arg);
            for (const file of files) {
                linkInspector(arg + "/" + file);
            }
            return;
        }

        const content: string = fs.readFileSync(arg, 'utf8');
        const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        const links: string[] = content.match(urlRegex) || [];

        for (const link of links) {
            linkInspector(link);
        }
    } catch (err) {
        console.error(arg);
        console.error(err);
        console.error("Error: Not a valid link or path")
    }
}
