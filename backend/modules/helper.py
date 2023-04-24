from modules.hashmap import HashMap
import csv


class Helper:
    def __init__(self, csv_path):
        self.csv_path = csv_path
        self.hash_implementation = self.create_hash_map()

    def get_pokemon_move(self, pokemon_name: str) -> list[str]:
        return self.hash_implementation[pokemon_name]

    def create_hash_map(self) -> HashMap:
        moveList = HashMap(100)

        with open(self.csv_path) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            for row in csv_reader:
                pokemon = row[0]
                moves = row[1].split(sep='|')
                for move in moves:
                    moveList[move] = pokemon
        # with open(self.csv_path) as csv_file:
        #     csv_reader = csv.reader(csv_file, delimiter=',')
        #     for row in csv_reader:
        #         pokemon = row[0]
        #         moves = row[1].split(sep='|')
        #         for move in moves:
        #             if move in moveList:
        #                 moveList[move] += f', {pokemon}'
        #             else:
        #                 moveList[move] = pokemon
        return moveList
