from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from modules.helper import Helper
import time
from modules.graph import NodeType, Node
from dotenv import dotenv_values

config = dotenv_values(".env")

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
            start_time = time.time()
            pokemon_list = helper.get_move_hash(move)
            end_time = time.time()
            return_string = '\n'.join(pokemon_list)

            response = jsonify(time=end_time-start_time, count=len(pokemon_list), pokemon=return_string, status=200)
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
            start_time = time.time()
            pokemon_list = helper.get_move_graph(move)
            end_time = time.time()

            return_string = '\n'.join(pokemon_list)

            response = jsonify(time=end_time-start_time, pokemon=return_string, status=200, count=len(pokemon_list))
            return response

        except ValueError:
            print('Move does not exist!')
    response = jsonify(status=400, details='Move does not exist!')
    return response


@app.route("/splaytree", methods=['GET'])
@cross_origin()
def get_move_splay_tree():
    move = request.args.get('move')
    if move is not None:
        # print(move)
        start_time = time.time()
        pokemon_list = helper.get_move_splay_tree(move)
        end_time = time.time()

        if pokemon_list is not None:
            return_string = '\n'.join(pokemon_list)
            response = jsonify(time=end_time-start_time, pokemon=return_string, status=200, count=len(pokemon_list))
            return response

    response = jsonify(status=400, details='Move does not exist!')
    return response


app.run()
