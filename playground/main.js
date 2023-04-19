const { BattleLearnsets } = require("./learnsets.js");

let keys = Object.keys(BattleLearnsets);
console.log(keys);

let keys_2 = [];

for (let i = 0; i < keys.length; i++) {
  if (BattleLearnsets[keys[i]].hasOwnProperty("learnset") == true) {
    keys_2.push(Object.keys(BattleLearnsets[keys[i]].learnset));
  }
}

let total_moves = 0;
for (let i = 0; i < keys_2.length; i++) {
  for (let j = 0; j < keys_2[i].length; j++) {
    total_moves++;
  }
}

console.log(Object.keys(keys_2[0]));
console.log(`Total moves: ${total_moves}`);
