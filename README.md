[![npm version](https://badge.fury.io/js/link-inspector.svg)](https://badge.fury.io/js/link-inspector)
[![Total Downloads](https://img.shields.io/npm/dt/link-inspector)](https://www.npmjs.com/package/link-inspector)

<div align="center">
<img height="150px" src="https://raw.githubusercontent.com/justindhillon/link-inspector/test/tests/test-folder/logo.png">

<h1>link-inspector</h1>
<h3>Automatically scan links, files, and directories for broken links.</h3>
</div>

## API

### linkInspector(arg, callback)
The `arg` can be a link, file path, or directory path. The `callback` will be given the broken link and path of the link.

## Examples

```js
import linkInspector from 'link-inspector';

linkInspector('http://example.com', function (link) {
   console.log(`Broken link found: ${link}`);
});
```

If you want to use linkInspector on all the files in a directory:

```js
import linkInspector from 'link-inspector';

linkInspector('./path/to/directory', function (link, path, lineNumber) {
   console.log(`Broken link ${link} found in ${path} on line ${lineNumber}`);
});
```

## Command Line Interface

There is also a cli. You can install it with:

```sh
npm install link-inspector -g
```

You can use it on a links, file paths, or directory paths.

```sh
npx link-inspector ./path/to/directory
```

The cli tool will write the link in an `output` folder.

```
output/
│
├── subfolder/
│   ├── file1.txt
│   └── file2.txt
│
├── file3.txt
└── file4.txt
```

## Development

1. Clone

   ```
   git clone https://github.com/justindhillon/link-inspector.git
   cd link-inspector
   ```

2. Install Dependencies

   ```
   npm install
   ```

3. Build the npm package
   
   ```
   npm run build
   ```

4. Run the npm package
   
   ```
   npx link-inspector <file/directory path>
   ```

5. Testing the npm package
   
    ```
    npm run test
    ```


## License

`link-inspector` uses the AGPL-3.0 license.
