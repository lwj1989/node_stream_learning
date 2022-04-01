const fs = require("fs");
const http = require("http");
const path = require("path");

/**
 * 传统 Buffer 下载，需要将整个文件加载到内存中，再下载，这种方式有一个问题就是如果超出内存大小就会报错。一般 64 位下 node 为 2G,32 位下为 1G
 */
const server = http.createServer((req, res) => {
  try {
    // const filePath = path.join(__dirname, "./Docker.dmg");
    const filePath = "/Users/liwenjiao/Downloads/heiying/heiying.mkv";
    const file = fs.readFileSync(filePath);
    console.log(file);
    res.setHeader("Content-Type", "application/octet-stream"); //表示是一个二进制文件
    res.setHeader("Content-Disposition", "attachment; filename=fsDownload.dmg"); // 告诉浏览器是一个文件附件下载，并命名
    res.end(file);
  } catch (err) {
    res.statusCode = 500;
    res.end("服务器错误:" + err.message);
  }
});

server.listen(4000, () => {
  console.log("服务器启动成功: http://localhost:4000");
});
