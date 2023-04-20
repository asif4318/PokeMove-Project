const { faker } = require("@faker-js/faker");
const path = require("path");
const fs = require("fs");

// Create an empty Set to keep track of unique names
let uniqueNames = new Set();

// Generate unique names until we have 100,000 of them
while (uniqueNames.size < 100000) {
  let name = faker.name.firstName() + faker.name.lastName();
  uniqueNames.add(name);
}

// Convert the Set to an array and print it out
let names = Array.from(uniqueNames);
let csvRows = names.map((name) => `"${name}"\n`);

// Write the CSV rows to a file
fs.writeFile(
  path.join(__dirname, "output/names.csv"),
  csvRows.join(""),
  (err) => {
    if (err) throw err;
    console.log("Names saved to names.csv");
  }
);
