const fs = require("fs/promises");
// const fs = require("fs");
const zlib = require("zlib");

/**
 * 这里使用 Buffer 压缩文件，只能压缩小于 2G 的文件，否则会报错内存溢出.File size (14734612853) is greater than 2 GB
 *
 * 如果出现 fs/promises 找不到，需要切换 node 版本到 14+
 */
try {
  const source = process.argv[2]; // 输入要压缩的文件路径
  const target = source + ".gz";
  if (!source) throw "请输入要压缩的文件路径";

  console.time("压缩耗时");

  /**
   * Promise 压缩文件
   */
  fs.readFile(source).then((readBuffer) => {
    zlib.gzip(readBuffer, (err, gzipBuffer) => {
      fs.writeFile(target, gzipBuffer).then(() => {
        console.timeEnd("压缩耗时");
      });
    });
  });

  /**
   * Sync 压缩文件
   */
  // const data = fs.readFileSync(source);
  // const result = zlib.gzipSync(data);
  // fs.writeFileSync(target, result);
  // console.timeEnd("压缩耗时");

  /**
   * Async 压缩文件
   */
  // fs.readFile(source, (err, readBuffer) => {
  //   if (err) throw err;
  //   zlib.gzip(readBuffer, (err, gzipBuffer) => {
  //     if (err) throw err;
  //     fs.writeFile(target, gzipBuffer, (err) => {
  //       if (err) throw err;
  //       console.timeEnd("压缩耗时");
  //     });
  //   });
  // });
} catch (err) {
  console.log(err);
}
