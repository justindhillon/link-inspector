const axios = require("axios");

// Return true if link is broken
export async function checkLink(link: string): Promise<boolean> {
    const params: object = {
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
        // If false positive, return false
        if (err.response.status === 999) return false;
        if (err.response.status === 429) return false;

        // If HEAD is not allowed try GET
        if (err.response.status === 405) {
            try {
                await axios.get(link, params);
            } catch (error: any) {
                // If method not allowed, return false
                if (error.response.status === 405) return false;

                return true;
            }
        }
    }

    return false;
}
