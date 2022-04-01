//使用流方式拷贝文件
const fs = require("fs");

const source = process.argv[2];
const target = process.argv[3];

console.time("拷贝耗时");
//读取文件 1 的内容为 stream 对象
const readStream = fs.createReadStream(source);
//创建文件 2 的写入 stream 对象
const writeStream = fs.createWriteStream(target);

//通过 pipe 将读取的文件流写入文件 2
readStream.pipe(writeStream);

//监听文件 1 的读取时间结束
readStream.on("end", () => {
  console.timeEnd("拷贝耗时");
});
