const fs = require("fs");

/**
 * buffer 拷贝文件
 * 使用同步方法，不能超过 2G，否则会报错。
 */

const source = process.argv[2];
const target = process.argv[3];

console.time("拷贝耗时");
fs.copyFileSync(source, target);
console.timeEnd("拷贝耗时");
