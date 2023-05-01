# Flask libary to create APIs, flask-cors is to enable CORS security policy
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
import time

# Helper class that contains instances of all the data structures
from modules.helper import Helper

helper = Helper("static/pokemon.csv")

# instantiate the Flask app & enable cors (security policy)
app = Flask(__name__)

# enable CORS
CORS(app)


# Route to get moves via hashmap implementation


@app.route("/hashmap/moves", methods=['GET'])
# @cross_origin()
def get_move_hashmap():
    move = request.args.get('name')
    print(move)
    if move != None:
        print(move)
        try:
            start_time = time.time_ns()  # start timer
            pokemon_list = helper.get_move_hash(move)  # Get pokemon list
            end_time = time.time_ns()  # end timer
            # Combine results into string
            return_string = '\n'.join(pokemon_list)
            # Return JSON response
            response = jsonify(
                time=end_time-start_time, count=len(pokemon_list), pokemon=return_string, status=200)
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response

        except KeyError:  # If error
            print('Move does not exist!')
    response = jsonify(status=400, details='Move does not exist!', count=0)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/hashmap/pokemon", methods=['GET'])
# @cross_origin()
def get_pokemon_hashmap():
    pokemon = request.args.get('name')
    print(pokemon)
    if pokemon is not None:
        print(pokemon)
        try:
            start_time = time.time_ns()  # Start timer
            move_list = helper.get_pokemon_hash(pokemon)  # Get moves
            end_time = time.time_ns()  # End timer
            return_string = '\n'.join(move_list)  # Stringify moves

            response = jsonify(
                time=end_time-start_time, count=len(move_list), moves=return_string, status=200)  # Create response
            response.headers.add('Access-Control-Allow-Origin', '*')  # CORS
            return response

        except KeyError:
            print('Pokemon does not exist!')
    # Handle does not exist
    response = jsonify(status=400, details='Pokemon does not exist!', count=0)
    response.headers.add('Access-Control-Allow-Origin', '*')  # CORS
    return response

# Route to get move via splaytree implementation


@app.route("/splaytree/moves", methods=['GET'])
# @cross_origin()
def get_move_splay_tree():
    move = request.args.get('name')
    if move is not None:
        # Start the timer
        start_time = time.time_ns()
        # Get list of pokemon from Splay Tree
        pokemon_list = helper.get_move_splay_tree(move)
        # End the timer
        end_time = time.time_ns()

        # If matches are found
        if pokemon_list is not None:
            # Return all the pokemon seperated by newline
            return_string = '\n'.join(pokemon_list)
            # Return the response json with time elapsed, pokemon, status, and # of pokemon
            response = jsonify(
                time=end_time-start_time, pokemon=return_string, status=200, count=len(pokemon_list))
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
    # Otherwise return error code
    response = jsonify(status=400, details='Move does not exist!')
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route("/splaytree/pokemon", methods=['GET'])
# @cross_origin()
def get_pokemon_splay_tree():
    pokemon = request.args.get('name')
    if pokemon is not None:
        # Start the timer
        start_time = time.time_ns()
        # Get list of pokemon from Splay Tree
        move_list = helper.get_pokemon_splay_tree(pokemon)
        # End the timer
        end_time = time.time_ns()

        # If matches are found
        if move_list is not None:
            # Return all the pokemon seperated by newline
            return_string = '\n'.join(move_list)
            # Return the response json with time elapsed, pokemon, status, and # of pokemon
            response = jsonify(
                time=end_time-start_time, moves=return_string, status=200, count=len(move_list))
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
    # Otherwise return error code
    response = jsonify(status=400, details='Pokemon does not exist!')
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    app.run()
