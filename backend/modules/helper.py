from modules.hashmap import HashMap
from modules.graph import Graph, Node, NodeType
from modules.splaytree import SplayNode, SplayTree
import csv


class Helper:
    def __init__(self, csv_path):
        self.csv_path = csv_path
        self.moves_hash_implementation = None
        self.pokemon_hash_implementation = None
        self.moves_splay_tree_implementation = None
        self.pokemon_splay_tree_implementation = None

        print('Loading Hashmap!')
        self.create_hash_map()
        print('Loading Hashmap complete!')

        # Graph implementation no longer used
        # print('Loading Graph!')
        # self.graph_implementation = self.create_graph()
        # print('Loading Graph complete!')

        print('Loading Splay Tree!')
        self.create_splay_tree()
        print('Loading Splay Tree complete!')

    def get_move_hash(self, move_name: str) -> list[str]:
        return self.moves_hash_implementation[move_name]

    def get_pokemon_hash(self, pokemon_name: str) -> list[str]:
        return self.pokemon_hash_implementation[pokemon_name]

    # def get_move_graph(self, move_name: str) -> list[str]:
    #     return self.graph_implementation.return_adj_pokemon_nodes(move_name)

    def get_move_splay_tree(self, move_name: str) -> list[str] | None:
        result = self.moves_splay_tree_implementation.get_node(move_name)
        print(type(result))
        if result is not None:
            return result.data
        return None

    def get_pokemon_splay_tree(self, pokemon_name: str) -> list[str] | None:
        result = self.pokemon_splay_tree_implementation.get_node(pokemon_name)
        if result is not None:
            return result.data
        return None


# Unused from graph implementation
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

    def create_splay_tree(self):
        pokemon_list = SplayTree()
        move_list = SplayTree()
        with open(self.csv_path) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            for row in csv_reader:
                pokemon = row[0]
                moves = row[1].split(sep='|')
                for move in moves:
                    move_list.insert(key=move, data=pokemon)
                    pokemon_list.insert(key=pokemon, data=move)
        self.moves_splay_tree_implementation = move_list
        self.pokemon_splay_tree_implementation = pokemon_list

    def create_hash_map(self) -> HashMap:
        move_list = HashMap(1000)
        pokemon_list = HashMap(1000)
        with open(self.csv_path) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=',')
            for row in csv_reader:
                pokemon = row[0]
                moves = row[1].split(sep='|')
                for move in moves:
                    move_list[move] = pokemon
                    pokemon_list[pokemon] = move
        self.moves_hash_implementation = move_list
        self.pokemon_hash_implementation = pokemon_list
