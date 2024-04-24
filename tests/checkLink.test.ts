import { checkLink } from "../checkLink";

test('api. returns false', async () => {
    expect(await checkLink("https://api.pythagora.io/telemetry")).toBe(false);
});

test('localhost returns false', async () => {
    expect(await checkLink("https://localhost/")).toBe(false);
    expect(await checkLink("https://127.0.0.1/")).toBe(false);
});

test('White Listed URLS return false', async () => {
    expect(await checkLink("https://www.google.com/")).toBe(false);
    expect(await checkLink("https://example.com/")).toBe(false);
    expect(await checkLink("https://www.example.com/")).toBe(false);
    expect(await checkLink("https://example.org/")).toBe(false);
    expect(await checkLink("https://www.example.org/")).toBe(false);
    expect(await checkLink("https://goo.gl/")).toBe(false);
    expect(await checkLink("https://fonts.googleapis.com")).toBe(false);
    expect(await checkLink("https://fonts.gstatic.com")).toBe(false);
});

test('Valid Links return false', async () => {
    expect(await checkLink("https://www.google.com/")).toBe(false);
    expect(await checkLink("https://www.wikipedia.org/")).toBe(false);
    expect(await checkLink("https://www.nasa.gov/")).toBe(false);
    expect(await checkLink("https://www.bbc.com/")).toBe(false);
    expect(await checkLink("https://www.un.org/")).toBe(false);
});

test('Broken Links return true', async () => {
    expect(await checkLink("https://www.google.com/page-not-found")).toBe(true);
    expect(await checkLink("https://www.wikipedia.org/page-not-found")).toBe(true);
    expect(await checkLink("https://www.nasa.gov/page-not-found")).toBe(true);
    expect(await checkLink("https://www.bbc.com/page-not-found")).toBe(true);
    expect(await checkLink("https://www.un.org/page-not-found")).toBe(true);
});
