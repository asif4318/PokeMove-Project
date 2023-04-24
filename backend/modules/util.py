from hashmap import HashMap
import json

# Read data from JSON file
with open('learnsets.json') as f:
    data = json.load(f)


# maps pokemon to moves they learn
pokemonList = HashMap()
for pokemon, learnset in data.items():
    if 'learnset' not in learnset:
        continue
    pokemonList[f'{pokemon}'] = learnset

# maps moves to pokemon that can learn it
moveList = HashMap()
for pokemon, learnset, in data.items():
    if 'learnset' not in learnset:
        continue
    for move, levels in learnset['learnset'].items():
        if move in moveList:
            moveList[move] += f', {pokemon}'
        else:
            moveList[move] = pokemon

print(moveList['cut'])
