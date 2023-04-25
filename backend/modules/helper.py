from modules.hashmap import HashMap
from modules.graph import Graph, Node, NodeType
import csv


class Helper:
    def __init__(self, csv_path):
        self.csv_path = csv_path
        self.hash_implementation = self.create_hash_map()
        self.graph_implementation = self.create_graph()

    def get_pokemon_move_hash(self, move_name: str) -> list[str]:
        return self.hash_implementation[move_name]

    def get_pokemon_move_graph(self, move_name: str) -> list[str]:
        return self.graph_implementation.return_adj_pokemon_nodes(move_name)

    def create_graph(self) -> Graph:
        graph: Graph = Graph()
        with open(self.csv_path) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            for row in csv_reader:
                pokemon = row[0]
                moves = row[1].split(sep='|')
                pokemon_node: Node = Node(NodeType.POKEMON, pokemon)
                graph.add_node(pokemon_node)
                for move in moves:
                    move_node: Node = Node(NodeType.MOVE, move)
                    graph.add_node(move_node)
                    graph.add_edge(pokemon_node, move_node)
        return graph

    def create_hash_map(self) -> HashMap:
        move_list = HashMap(100)

        with open(self.csv_path) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            for row in csv_reader:
                pokemon = row[0]
                moves = row[1].split(sep='|')
                for move in moves:
                    move_list[move] = pokemon
        return move_list
