import { checkLink } from "./checkLink";
import fs from 'fs';

const MAX_CONCURRENT_REQUESTS = 10;

export async function linkInspector(arg: string): Promise<string[]> {
    const linkQueue: string[] = [arg]; // Initialize the queue with the initial argument

    const brokenLinks: string[] = [];

    async function processQueue() {
        const currentArg = linkQueue.shift();

        if (!currentArg) {
            return; // Queue is empty
        }

        try {
            const urlObject = new URL(currentArg);
            if (await checkLink(currentArg)) {
                brokenLinks.push(currentArg);
            }
        } catch {
            try {
                const stats = fs.statSync(currentArg);

                if (stats.isDirectory()) {
                    const files: string[] = fs.readdirSync(currentArg);
                    linkQueue.push(...files.map(file => `${currentArg}/${file}`));
                } else {
                    const content: string = fs.readFileSync(currentArg, 'utf8');
                    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                    const links: string[] = content.match(urlRegex) || [];
                    linkQueue.push(...links);
                }
            } catch (err) {
                console.error(currentArg);
                console.error(err);
                console.error("Error: Not a valid link or path");
            }
        }
    }

    async function executeWithConcurrency() {
        const promises: Promise<void>[] = [];

        for (let i = 0; i < MAX_CONCURRENT_REQUESTS; i++) {
            promises.push(processQueue());
        }

        await Promise.all(promises);
    }

    while (linkQueue.length > 0) {
        await executeWithConcurrency();
    }

    return brokenLinks;
}
