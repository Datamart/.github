const fs = require("fs");
const csv = require("csv-parse/sync");

const run = () => {
  const csvFile = process.argv[2];
  const jsonFile = process.argv[3];

  if (
    csvFile &&
    csvFile.endsWith(".csv") &&
    jsonFile &&
    jsonFile.endsWith(".json")
  ) {
    const contents = fs.readFileSync(csvFile, "utf8");
    const rows = csv.parse(contents);
    const data = [];
    rows.forEach((row, index) => {
      if (index !== 0) {
        const message = row[2];
        const url = row[3];
        const hashtags = "";
        data.push([message, hashtags, url]);
      }
    });
    fs.writeFileSync(jsonFile, JSON.stringify(data, null, 2));
  } else {
    console.error("Invalid arguments");
  }
};

run();
