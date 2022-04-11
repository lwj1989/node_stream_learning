const {stdin, stdout} = require('process');

/**
 * stdin 是可读流
 * stdout 是可写流
 * 通过 pipe() 管道将可毒瘤数据传入可写流进行输出
 */

stdin.pipe(stdout);