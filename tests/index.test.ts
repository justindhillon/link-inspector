import linkInspector from "../index";

test('Broken link calls callback', async () => {
    const promise1 = new Promise<void>((resolve) => {
        const callback = (link: string) => {
            expect(link).toBe('https://www.google.com/page-not-found');
            resolve();
        };
        
        linkInspector("https://www.google.com/page-not-found", callback);
    });

    const promise2 = new Promise<void>((resolve) => {
        const callback = (link: string) => {
            expect(link).toBe('https://www.wikipedia.org/page-not-found');
            resolve();
        };
        
        linkInspector("https://www.wikipedia.org/page-not-found", callback);
    });

    await promise1;
    await promise2;
});

test('Test on real folder', async () => {
    const promise = new Promise<void>((resolve) => {
        const callback = (link: string) => {
            expect(link).toBe('https://www.wikipedia.org/page-not-found');
            resolve();
        };
        
        linkInspector("tests/test-folder", callback);
    });

    await promise;
});
