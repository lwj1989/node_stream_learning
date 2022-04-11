const http = require("http");

/**
 * http 服务器的流实现
 *
 * 访问服务器连接，传入 json 数据，预期返回传入的数据
 */

const server = http.createServer((req, res) => {
  // req 是 http.IncomingMessage 的实例
  // res 是 http.ServerResponse 的实例

  let body = "";

  // 设置编码，如果这里不设置则下面的 chunk 打印出来是 Buffer 二进制对象。如果设置了就等于 toString() 字符串。
  req.setEncoding("utf8");

  req.on("data", (chunk) => {
    console.log(chunk); // 如果上面没有设置 setEncoding('utf8'), 这里可以使用 toString() 输出 utf8，否则是二进制 buffer
    body += chunk;
  });

  req.on("end", () => {
    try {
      const data = JSON.parse(body);

      res.write(JSON.stringify(data)); // 调用可写流的 write 方法写入数据。
      res.end("done!"); //结束，在结束前可以发送最后一个额外的数据块。
    } catch (err) {
      //当传入一个不是 json 的时候上面的 JSON.parse() 方法会报错没就返回 500
      res.statusCode = 500;
      res.end(`Error: ${err.message}`);
    }
  });
});

server.listen(8000, () => {
  console.log("服务器启动成功: http://localhost:8000");
});
