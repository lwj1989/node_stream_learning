const http = require("http");

const server = http.createServer((req, res) => {
  // req 是 http.IncomingMessage 的实例
  // res 是 http.ServerResponse 的实例

  let body = "";

  // 设置编码，如果这里不设置则下面的 chunk 打印出来是 Buffer 二进制对象。如果设置了就等于 toString() 字符串。
  req.setEncoding("utf8");

  req.on("data", (chunk) => {
    console.log(chunk);
    body += chunk;
  });

  req.on("end", () => {
    try {
      const data = JSON.parse(body);

      res.write(typeof data);
      res.end();
    } catch (err) {
      //当传入一个不是 json 的时候上面的 JSON.parse() 方法会报错没就返回 500
      res.statusCode = 500;
      res.end(`Error: ${err.message}`);
    }
  });
});

server.listen(8000, () => {
  console.log("服务器启动成功，监听 8000 端口");
});
