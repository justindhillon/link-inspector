const axios = require("axios");

const ignoredCodes: Set<number> = new Set([
  999, 
  429, 
  421,
  405,
  403, 
  401
]);

const ignoredURLs: Set<string> = new Set([
  'example.com',
  'www.example.com',
  'example.org',
  'www.example.org',
  'goo.gl',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
]);

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
  },
};

// Return true if link is broken
export async function checkLink(link: string): Promise<boolean> {
  const url = new URL(link);
  if (ignoredURLs.has(url.host))
    return false;

  try {
    await axios.head(link, params);
    return false;
  } catch (err: any) {
    // If false positive, return false
    if (ignoredCodes.has(err.response.status))
      return false;

    // Head request is not allowed, make get request
    try {
      await axios.get(link, params);
      return false;
    } catch (err: any) {
      if (ignoredCodes.has(err.response.status))
        return false;
    }
    
    // All failed, return true
    return true;
  }
}
