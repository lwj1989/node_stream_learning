const fs = require("fs/promises");
// const fs = require("fs");
const zlib = require("zlib");

const file = process.argv[2]; // 输入要压缩的文件路径

console.time("压缩耗时");

// Promise版本
fs.readFile(file).then((data) => {
  zlib.gzip(data, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      fs.writeFile(file + ".gz", result)
        .then(() => {
          console.log("文件压缩成功");
          console.timeEnd("压缩耗时");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

// 同步版本
// const data = fs.readFileSync(file);
// zlib.gzip(data, (err, result) => {
//     if (err) {
//         console.log(err);
//     } else {
//         fs.writeFileSync(file + ".gz", result);
//         console.log("文件压缩成功");
//         console.timeEnd("压缩耗时");
//     }
// });

/**
 * 这里使用 Buffer 压缩文件,只能压缩小于2G的文件,否则会报错内存溢出.File size (14734612853) is greater than 2 GB
 */
