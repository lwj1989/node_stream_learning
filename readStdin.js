/**
 * readStdin.js 运行起来后，终端输入，就会监听到输入的新数据。并打印。
 */

process.stdin
  .on("readable", () => {
    // 当流有可用的数据或者已到达流的末尾时触发 readable 事件. http://nodejs.cn/api/stream.html#event-readable
    let chunk;
    console.log("有新的数据可用...");
    while ((chunk = process.stdin.read())) {
      process.stdout.write(`data: ${chunk.toString()}\n\n`);
    }
  })
  .on("end", () => {
    process.stdout.write("end");
  });
