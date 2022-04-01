const fs = require("fs");

const source = process.argv[2];
const target = process.argv[3];

console.time("拷贝耗时");
fs.copyFileSync(source, target);
console.timeEnd("拷贝耗时");
