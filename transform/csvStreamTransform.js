const csv = require("csv");
const fs = require("fs");

const csvFileName =
  "/Users/liwenjiao/Downloads/ads_user_dimension_d_20220103.csv";

console.time("csv 耗时");
const csvData = fs.createReadStream(csvFileName);

csvData
  .pipe(
    csv.parse({
      columns: true,
      skip_empty_lines: true,
      skip_records_with_error: true,
    })
  )
  .pipe(
    csv.transform((row) => {
      return Object.entries(row).map((v) => {
        return v.toString().toUpperCase();
      });
    })
  )
  .pipe(csv.stringify({ quoted: true, quote: "'" }))
  .on("end", () => {
    console.timeEnd("csv 耗时");
  })
  .pipe(process.stdout);
