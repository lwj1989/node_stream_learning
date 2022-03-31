const fs = require("fs");
const zlib = require("zlib");

const file = process.argv[2]; // 输入要压缩的文件路径

console.time("压缩耗时");

const readStream = fs.createReadStream(file);
const writeStream = fs.createWriteStream(file + ".gz");

readStream
  .pipe(zlib.createGzip())
  .pipe(writeStream)
  .on("finish", () => {
    console.log("文件压缩成功");
    console.timeEnd("压缩耗时");
  });

  /**
   * Stream 流处理可以进行大文件的压缩.
   * 但是在处理小文件时,Buffer的方式更快,因为创建流也会消耗大量的内存.
   */