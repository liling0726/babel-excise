const { transformSync,transformFromAstSync, transformFileSync } = require('@babel/core');
const filename = __dirname+"/example.js";
const fs = require('fs');
const path = require('path');
const minify = require('babel-preset-minify')
const source = fs.readFileSync(filename, "utf8");

// // Load and compile file normally, but skip code generation.
// const astInfo  = transformSync(source, {
//   ast: true,
//   code: false,
// });

// // Minify the file in a second pass and generate the output code here.
// const { code, map } = transformFromAstSync(astInfo.ast, source, {
//   presets: [minify],
//   babelrc: false,
//   configFile: false,
// });

const { code, map, ast } = transformFileSync(filename)
console.log(code, map,ast)