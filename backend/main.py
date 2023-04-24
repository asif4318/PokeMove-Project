from flask import Flask, request, jsonify
from modules.helper import Helper
from dotenv import dotenv_values

config = dotenv_values(".env")

print("Creating Hash Map")
helper = Helper(config['CSV_PATH'])
#
# pokemon_bite = example.get_pokemon_move('bite')
# print(len(pokemon_bite))

app = Flask(__name__)

# Create a hashmap of pokemon;
# Get names from CSV file, get proper moves from learnsets.json

@app.route("/hashmap", methods = ['GET'])
def test():
    move = request.args.get('move')
    print(move)
    if move != None:
        print(move)
        try:
            pokemon_list = helper.get_pokemon_move(move)
            return_string = '\n'.join(pokemon_list);
            return jsonify(status=200, pokemon=pokemon_list, count=len(pokemon_list))
        except KeyError:
            print('Move does not exist!')
    return jsonify(status=400, details='Move does not exist!')
