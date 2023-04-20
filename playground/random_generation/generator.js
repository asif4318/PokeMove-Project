const { faker } = require("@faker-js/faker");
const path = require("path");
const fs = require("fs");
const { BattleLearnsets } = require("./learnsets.js");

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

let keys = Object.keys(BattleLearnsets);
let real_pokemon_names = [];

for (let i = 0; i < keys.length; i++) {
  if (BattleLearnsets[keys[i]].hasOwnProperty("learnset") == true) {
    real_pokemon_names.push(keys[i]);
  }
}

let uniqueNames = new Set();

// Generate unique names until we have 100,000 of them
while (uniqueNames.size < 100000) {
  var real_pokemon =
    real_pokemon_names[Math.floor(Math.random() * real_pokemon_names.length)];
  let name = capitalize(real_pokemon) + faker.name.firstName();
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
