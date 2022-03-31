const fs = require("fs");
const zlib = require("zlib");

const file = process.argv[2]; //获取命令行参数

fs.readFile(file, (err, buffer) => {
  if (err) throw err;
  zlib.gzip(buffer, (err, buffer) => {
    if (err) throw err;
    fs.writeFile(file + ".gz", buffer, (err) => {
      if (err) throw err;
      console.log("文件已经压缩成功");
    });
  });
});

// 执行命令：node buffer.js stream.js
