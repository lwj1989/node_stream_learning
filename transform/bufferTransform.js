const fs = require("fs");
const zlib = require("zlib");

console.time("转换耗时");
const sourceBuffer = fs.readFileSync("../README.md");
const binaryData = sourceBuffer.toString("binary");
const gzipData = zlib.gzipSync(binaryData);
fs.writeFileSync('../README.md.gz', gzipData);
console.timeEnd("转换耗时");
