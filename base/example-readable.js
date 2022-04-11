const fs = require("fs");

const readableStream = fs.createReadStream("./files/file1.txt", {
  encoding: "utf8",
  highWaterMark: 10, //分片大小
});

readableStream.on("data", (data) => {
  console.log("Received Data ", data.toString());
});

readableStream.on("end", () => {
  console.log("End of file reached!!!");
});
