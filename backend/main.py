from flask import Flask
from modules import hashmap

app = Flask(__name__)

# Create a hashmap of pokemon;
# Get names from CSV file, get proper moves from learnsets.json


def getSpecies(name: str) -> str:
    upperLetter = ''
    for letter in name:
        if (letter.isupper()):
            upperLetter = letter
            break
    if (upperLetter == ''):
        raise ValueError
    return name.split(upperLetter)[0]


@app.route("/")
def test():
    return '<p>Hi</p>'
