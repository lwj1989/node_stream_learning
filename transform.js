const fs = require("fs");
const { Transform } = require("stream");

const readStream = fs.createReadStream("./test.txt");

// const writeStream = fs.createWriteStream("./test2.txt");

// 定义一个转换流，一会下面要把上面的可读流通过 pipe 管道进行数据转换。
const myTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});

let data = "";

// readStream.setEncoding('utf8') // 设置编码
readStream
  .pipe(myTransform)
  .on("data", (chunk) => {
    data += chunk;
  })
  // .pipe(writeStream)
  .on("end", () => {
    console.log("读取完成");
  })
  .on("finish", () => {
    console.log(data);
    console.log("转换完成");
  });
