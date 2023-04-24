class Helper:
    def __init__(self, names_csv_path, learnsets_path):
        self.moves: list[str] = []
        self.names_csv_path = names_csv_path
        self.learnsets_path = learnsets_path

    def getSpecies(name: str) -> str:
        upperLetter = ''
        for letter in name:
            if (letter.isupper()):
                upperLetter = letter
                break
        if (upperLetter == ''):
            raise ValueError
        return name.split(upperLetter)[0]

    def getMoves(pokemon_name: str) -> list[str]:
