const fs = require("fs");
const zlib = require("zlib");

/**
 * Stream 流处理可以进行大文件的压缩。
 * 但是在处理小文件时，Buffer 的方式更快，因为创建流也会消耗一定的资源。
 */
try {
  const source = process.argv[2]; // 输入要压缩的文件路径
  const target = source + ".gz";
  if (!source) throw "请输入要压缩的文件路径";

  console.time("压缩耗时");

  const readStream = fs.createReadStream(source);
  const writeStream = fs.createWriteStream(target);

  readStream
    .pipe(zlib.createGzip())
    .pipe(writeStream)
    .on("finish", () => {
      console.timeEnd("压缩耗时");
    });
} catch (err) {
  console.log(err);
}
