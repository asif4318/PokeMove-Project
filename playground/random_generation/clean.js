/*This file generates a CSV file of 100K random pokemon*/
const path = require("path"); // Library to get file paths
const fs = require("fs"); // Library for read/write
const { BattleLearnsets } = require("./learnsets.js"); // Pokemon Showdown Dataset

// The keys in the BattleLearnsets object
let keys = Object.keys(BattleLearnsets);
let real_pokemon_names = [];

// This removes any entries in the data that aren't real pokemon
for (let i = 0; i < keys.length; i++) {
  // Add to the array only if the key is a pokemon and has the "learnset" prop
  if (BattleLearnsets[keys[i]].hasOwnProperty("learnset") == true) {
    real_pokemon_names.push(keys[i]);
  }
}

// List to store a string in format "pokemon, MOVE1|MOVE2|MOVE3..."
let unique_pokemon_w_moves = [];

// function to replace certain names with proper names in sprite API
const replaceBrokenNames = (pokemon_species) => {
  const replacementMap = {
    hooh: "ho-oh",
    ironthorns: "iron-thorns",
    wooperpaldea: "wooper-paldea",
  };

  if (replaceBrokenNames.hasOwnProperty(pokemon_species))
    pokemon_species = replaceBrokenNames[pokemon_species];

  const splitMap = ["totem", "alola", "paldea", "world", "hisui"];

  // Check if pokemon_species contains a substring from an array element above
  for (let i = 0; i < splitMap.length; i++) {
    pokemon_species = pokemon_species.replace(splitMap[i], "-" + splitMap[i]);
  }

  return pokemon_species;
};

for (let i = 0; i < real_pokemon_names.length; i++) {
  //   const name_to_split = names[i];
  //   //Regex to split names at first capital
  //   const regex = /[A-Z]?[a-z]+|[0-9]+|[A-Z]+(?![a-z])/g;
  let pokemon_species = real_pokemon_names[i];

  let delimited_moves = Object.keys(
    BattleLearnsets[pokemon_species].learnset
  ).join("|");

  pokemon_species = replaceBrokenNames(pokemon_species);
  const name_move_string = pokemon_species + "," + delimited_moves;
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
