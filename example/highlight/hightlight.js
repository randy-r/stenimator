const fs = require('fs-extra');
const hljs = require('highlight.js/lib/core');
const typescript = require('highlight.js/lib/languages/typescript');
const html = require('highlight.js/lib/languages/xml');
const css = require('highlight.js/lib/languages/css');
const jsx = require('highlight.js/lib/languages/javascript');
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', html);
hljs.registerLanguage('css', css);
hljs.registerLanguage('jsx', jsx);

// const highlightedCode = hljs.highlight('const x: number = 1;', { language: 'typescript' }).value;

async function main() {
  const inputDirs = await fs.readdir(__dirname + '/input');
  for (const name of inputDirs) {
    const inputFiles = await fs.readdir(__dirname + '/input/' + name);
    for (const fName of inputFiles) {
      const content = await fs.readFile(__dirname + '/input/' + name + '/' + fName, {
        encoding: 'utf8',
      });
      let options = { language: 'invalid' };
      if (fName.endsWith('css.txt')) {
        options.language = 'css';
      } else if (fName.endsWith('tsx.txt')) {
        options.language = 'html';
      }
      const highlighted = hljs.highlight(content, options).value;
      await fs.writeFile(__dirname + `/../src/assets/code-snippets//${fName}`, highlighted);
    }
  }
}

main();
