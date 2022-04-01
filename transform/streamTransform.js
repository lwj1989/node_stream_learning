const fs = require("fs");
const { Transform } = require("stream");
const zlib = require("zlib");

console.time("转换耗时");
const readStream = fs.createReadStream("../README.md");
const writeStream = fs.createWriteStream("../README.md.gz");

// 定义一个转换流，一会下面要把上面的可读流通过 pipe 管道进行数据转换。
const myTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString('binary'));
    callback();
  },
});

// readStream.setEncoding('utf8') // 设置编码

//将内容转为二进制然后压缩。
readStream
  .pipe(myTransform)
  .pipe(zlib.createGzip())
  .pipe(writeStream)
  .on("finish", () => {
    console.timeEnd("转换耗时");
  });
