from flask import Flask, request, jsonify, make_response
from flask_cors import CORS, cross_origin
from modules.helper import Helper
from dotenv import dotenv_values

config = dotenv_values(".env")

print("Creating Hash Map")
helper = Helper(config['CSV_PATH'])
#
# pokemon_bite = example.get_pokemon_move('bite')
# print(len(pokemon_bite))

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})

# Create a hashmap of pokemon;
# Get names from CSV file, get proper moves from learnsets.json


@app.route("/hashmap", methods=['GET'])
@cross_origin()
def test():
    move = request.args.get('move')
    print(move)
    if move != None:
        print(move)
        try:
            pokemon_list = helper.get_pokemon_move(move)
            return_string = '\n'.join(pokemon_list)

            response = jsonify(pokemon=return_string, status=200)
            # response.headers.add("Access-Control-Allow-Origin", "*");
            # response.headers.add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            # Enable Access-Control-Allow-Origin
            return response

        except KeyError:
            print('Move does not exist!')
    response = jsonify(status=400, details='Move does not exist!')
    # response.headers.add("Access-Control-Allow-Origin", "*");
    # response.headers.add("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    return response


app.run()
