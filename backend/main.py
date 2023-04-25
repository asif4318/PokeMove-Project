from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from modules.helper import Helper
from modules.graph import NodeType, Node
from dotenv import dotenv_values

config = dotenv_values(".env")

print("Creating Hash Map")
helper = Helper(config['CSV_PATH'])

# instantiate the app
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

# enable CORS
cors = CORS(app, resources={r'/*': {'origins': '*'}})

# Create a hashmap of pokemon;
# Get names from CSV file, get proper moves from learnsets.json


@app.route("/hashmap", methods=['GET'])
@cross_origin()
def get_move_hashmap():
    move = request.args.get('move')
    print(move)
    if move != None:
        print(move)
        try:
            pokemon_list = helper.get_pokemon_move_hash(move)
            return_string = '\n'.join(pokemon_list)

            response = jsonify(pokemon=return_string, status=200)
            return response

        except KeyError:
            print('Move does not exist!')
    response = jsonify(status=400, details='Move does not exist!')
    return response


@app.route("/graph", methods=['GET'])
@cross_origin()
def get_move_graph():
    move = request.args.get('move')
    if move != None:
        print(move)
        try:
            pokemon_list = helper.get_pokemon_move_graph(move)
            print(pokemon_list)
            return_string = '\n'.join(pokemon_list)

            response = jsonify(pokemon=return_string, status=200)
            return response

        except ValueError:
            print('Move does not exist!')
    response = jsonify(status=400, details='Move does not exist!')
    return response


app.run()
