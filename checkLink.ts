const axios = require("axios");

// Return true if link is broken
export async function checkLink(link: string): Promise<boolean> {
    const params = {
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8", 
            "Accept-Encoding": "gzip, deflate, br", 
            "Accept-Language": "en-US,en;q=0.5", 
            "Sec-Fetch-Dest": "document", 
            "Sec-Fetch-Mode": "navigate", 
            "Sec-Fetch-Site": "cross-site", 
            "Sec-Fetch-User": "?1", 
            "Upgrade-Insecure-Requests": "1", 
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0", 
            "X-Amzn-Trace-Id": "Root=1-659f58c5-4de24ef7384486270161f185"
        }
    };

    try {
        await axios.head(link, params);
    } catch (err: any) {
        if (err.response.status !== 405) return true;

        try {
            await axios.get(link, params);
        } catch (err) {
            return true;
        }
    }

    return false;
}
