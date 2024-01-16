import { checkLink } from "./checkLink";
import fs from 'fs';

export async function linkInspector(arg: string) {
    try { // If arg is a link
        new URL(arg);
        await checkLink(arg);
        return;
    } catch {}

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
    } catch (err) {
        console.error("Error: Not a valid link or path")
    }
}
