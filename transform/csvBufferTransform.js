const csv = require("csv/sync");
const fs = require("fs");

const csvFileName =
  "/Users/liwenjiao/Downloads/ads_user_dimension_d_20220103.csv";

/**
 * 同步读取 csv 文件
 * https://github.com/adaltas/node-csv/blob/master/demo/esm/lib/csv_sync.js
 */

console.time("csv 耗时");

const csvData = fs.readFileSync(csvFileName);

const csvParser = csv.parse(csvData, {
  columns: true,
  skip_empty_lines: true,
  skip_records_with_error: true,
});

const transformData = csv.transform(csvParser, (record) => {
  return Object.entries(record).map((v) => {
    return v.toString().toUpperCase();
  });
});

const output = csv.stringify(transformData, { quoted: true, quote: "'" });

process.stdout.write(output);

console.timeEnd("csv 耗时");
