# Flask libary to create APIs, flask-cors is to enable CORS security policy
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
import time

# Helper class that contains instances of all the data structures
from modules.helper import Helper
# Dot env file contains CSV Path
from dotenv import dotenv_values

config = dotenv_values(".env")

helper = Helper(config['CSV_PATH'])

# instantiate the Flask app & enable cors
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

# enable CORS
cors = CORS(app, resources={r'/*': {'origins': '*'}})


# Route to get moves via hashmap implementation


@app.route("/hashmap/moves", methods=['GET'])
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

            response = jsonify(
                time=end_time-start_time, count=len(pokemon_list), pokemon=return_string, status=200)
            return response

        except KeyError:
            print('Move does not exist!')
    response = jsonify(status=400, details='Move does not exist!')
    return response

@app.route("/hashmap/pokemon", methods=['GET'])
@cross_origin()
def get_pokemon_hashmap():
    pokemon = request.args.get('name')
    print(pokemon)
    if pokemon is not None:
        print(pokemon)
        try:
            start_time = time.time()
            move_list = helper.get_pokemon_hash(pokemon)
            end_time = time.time()
            return_string = '\n'.join(move_list)

            response = jsonify(
                time=end_time-start_time, count=len(move_list), moves=return_string, status=200)
            return response

        except KeyError:
            print('Move does not exist!')
    response = jsonify(status=400, details='Move does not exist!')
    return response

# Route to get move via graph implementation


@app.route("/graph/moves", methods=['GET'])
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

            response = jsonify(
                time=end_time-start_time, pokemon=return_string, status=200, count=len(pokemon_list))
            return response

        except ValueError:
            print('Move does not exist!')
    response = jsonify(status=400, details='Move does not exist!')
    return response

# Route to get move via splaytree implementation


@app.route("/splaytree/moves", methods=['GET'])
@cross_origin()
def get_move_splay_tree():
    move = request.args.get('name')
    if move is not None:
        # Start the timer
        start_time = time.time()
        # Get list of pokemon from Splay Tree
        pokemon_list = helper.get_move_splay_tree(move)
        # End the timer
        end_time = time.time()

        # If matches are found
        if pokemon_list is not None:
            # Return all the pokemon seperated by newline
            return_string = '\n'.join(pokemon_list)
            # Return the response json with time elapsed, pokemon, status, and # of pokemon
            response = jsonify(
                time=end_time-start_time, pokemon=return_string, status=200, count=len(pokemon_list))
            return response
    # Otherwise return error code
    response = jsonify(status=400, details='Move does not exist!')
    return response

@app.route("/splaytree/pokemon", methods=['GET'])
@cross_origin()
def get_pokemon_splay_tree():
    pokemon = request.args.get('move')
    if pokemon is not None:
        # Start the timer
        start_time = time.time()
        # Get list of pokemon from Splay Tree
        move_list = helper.get_move_splay_tree(pokemon)
        # End the timer
        end_time = time.time()

        # If matches are found
        if move_list is not None:
            # Return all the pokemon seperated by newline
            return_string = '\n'.join(move_list)
            # Return the response json with time elapsed, pokemon, status, and # of pokemon
            response = jsonify(
                time=end_time-start_time, pokemon=return_string, status=200, count=len(move_list))
            return response
    # Otherwise return error code
    response = jsonify(status=400, details='Move does not exist!')
    return response


app.run()