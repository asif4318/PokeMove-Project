/*This file generates a CSV file of 100K random pokemon*/

const { faker } = require("@faker-js/faker"); // Library to generate fake names
const path = require("path"); // Library to get file paths
const fs = require("fs"); // Library for read/write
const { BattleLearnsets } = require("./learnsets.js"); // Pokemon Showdown Dataset

// The keys in the BattleLearnsets object
let keys = Object.keys(BattleLearnsets);
let real_pokemon_names = [];

for (let i = 0; i < keys.length; i++) {
  // Add to the array only if the key is a pokemon and has the "learnset" prop
  if (BattleLearnsets[keys[i]].hasOwnProperty("learnset") == true) {
    real_pokemon_names.push(keys[i]);
  }
}

// Ensure there are unique entries only using a set
let uniqueNames = new Set();

// Generate unique names until we have 100,000 of them
while (uniqueNames.size < 100000) {
  // Get a random pokemon from the list
  const real_pokemon =
    real_pokemon_names[Math.floor(Math.random() * real_pokemon_names.length)];
  // Append a fake name for unique combinations
  const name = real_pokemon + faker.name.firstName();
  uniqueNames.add(name);
}

// Create an array from the set
let names = Array.from(uniqueNames);

// List to store a string in format "pokemon, MOVE1|MOVE2|MOVE3..."
let unique_pokemon_w_moves = [];

// function to replace certain names with proper names in sprite API
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
  //Regex to split names at first capital
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

// Define the CSV header
let header = "POKEMON, LEARNSET\n";
// csv data, separated by a new line for each row
let csvRows = unique_pokemon_w_moves.join("\n");

// Write the CSV rows to a file
fs.writeFile(
  path.join(__dirname, "output/pokemon.csv"),
  header + csvRows,
  (err) => {
    if (err) throw err;
    console.log("Names saved to output/pokemon.csv");
  }
);
