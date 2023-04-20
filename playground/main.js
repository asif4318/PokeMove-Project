const { BattleLearnsets } = require("./learnsets.js");
const path = require("path");
const fs = require("fs");

let keys = Object.keys(BattleLearnsets);
console.log(keys);

let learnsets = [];

for (let i = 0; i < keys.length; i++) {
  if (BattleLearnsets[keys[i]].hasOwnProperty("learnset") == true) {
    learnsets.push(BattleLearnsets[keys[i]].learnset);
  }
}

let total_moves = 0;
for (let i = 0; i < learnsets.length; i++) {
  for (let j = 0; j < Object.keys(learnsets[i]).length; j++) {
    total_moves++;
  }
}

let level_info = [];
for (let i = 0; i < learnsets.length; i++) {
  for (let j = 0; j < Object.keys(learnsets[i]).length; j++) {
    level_info.push(learnsets[i][Object.keys(learnsets[i])[j]]);
  }
}

let level_sum = 0;
for (let i = 0; i < level_info.length; i++) {
  level_sum += level_info[i].length;
}

console.log(Object.keys(learnsets[0]));
console.log(`Total moves: ${total_moves}`);
console.log(level_sum);

console.log(keys);

let csvRows = keys.map((name) => `"${name}"\n`);
fs.writeFile(
  path.join(__dirname, "random_generation/output/pokemon_names.csv"),
  csvRows.join(""),
  (err) => {
    if (err) throw err;
    console.log("Names saved to names.csv");
  }
);
