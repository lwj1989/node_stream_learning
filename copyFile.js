//使用流方式拷贝文件

const fs = require("fs");
const path = require("path");

// 准备两个文件,一个是test.txt 有数据, 一个是test2.txt 空文件.现在使用流方式将test.txt文件的内容拷贝到test2.txt文件中
const fileName1 = path.resolve(__dirname, "test.txt");
const fileName2 = path.resolve(__dirname, "test2.txt");

//读取文件1的内容为stream对象
const readStream = fs.createReadStream(fileName1);
//创建文件2的写入stream对象
const writeStream = fs.createWriteStream(fileName2);

//通过pipe将读取的文件流写入文件2
readStream.pipe(writeStream);

//监听文件1的读取时间结束
readStream.on("end", () => {
  console.log("拷贝完成!");
});
