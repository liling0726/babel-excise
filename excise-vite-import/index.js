/**
 * 简单实现按需引入
 *  输入：
 * import { a,b,c as d} from 'foo'
 * 输出：
 * import a from "foo/a";
 * import "foo/a/style.less";
 * import b from "foo/b";
 * import "foo/b/style.less";
 * import d from "foo/c";
 *  import "foo/c/style.less";
 */
const { transformFileSync }  = require('@babel/core');
const viteImport = require('./plugin');
const filename = __dirname+'/simple.js';

const { code } = transformFileSync(filename,{
    plugins:[[viteImport, { name:'foo'}]]
})
console.log(code);