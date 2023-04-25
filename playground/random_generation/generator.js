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
  let name = real_pokemon + faker.name.firstName();
  uniqueNames.add(name);
}

let names = Array.from(uniqueNames);
let unique_pokemon_w_moves = [];

const replaceBrokenNames = (pokemon_species) => {
  const replacementMap = {
    hooh: "ho-oh",
    ironthorns: "iron-thorns",
    mimikyutotem: "mimikyu-totem",
    togedemarutotem: "togedemaru-totem",
    pikachualola: "pikachu-alola",
    pikachuworld: "pikachu-world",
    wooperpaldea: "wooper-paldea",
  };

  const splitMap = ["totem", "alola", "paldea", "world"];

  splitMap.map((elem) => {
    if (pokemon_species.includes(elem)) {
      const index = pokemon_species.indexOf(elem);
      const fname = pokemon_species.substring(0, index);
      const lname = pokemon_species.substring(index);
      return fname + "-" + lname;
    }
  });

  if (replaceBrokenNames.hasOwnProperty(pokemon_species)) {
    return replacementMap[pokemon_species];
  }

  return pokemon_species;
};

for (let i = 0; i < names.length; i++) {
  const name_to_split = names[i];
  const regex = /[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g;
  let pokemon_species = name_to_split.match(regex)[0];

  let delimited_moves = Object.keys(
    BattleLearnsets[pokemon_species].learnset
  ).join("|");

  pokemon_species = replaceBrokenNames(pokemon_species);
  const name_move_string =
    pokemon_species + faker.name.lastName() + "," + delimited_moves;
  unique_pokemon_w_moves.push(name_move_string);
}

// Convert the Set to an array and print it out
let header = "POKEMON, LEARNSET\n";
let csvRows = unique_pokemon_w_moves.join("\n");

//console.log(unique_pokemon_w_moves);

// console.log(
//   Object.keys(BattleLearnsets[real_pokemon_names[0]].learnset).join("|")
// );

// Write the CSV rows to a file
fs.writeFile(
  path.join(__dirname, "output/pokemon.csv"),
  header + csvRows,
  (err) => {
    if (err) throw err;
    console.log("Names saved to output/pokemon.csv");
  }
);
