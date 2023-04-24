import unittest
from modules.graph import Graph, Node, NodeType

def get_species(name: str) -> str:
    upperLetter = ''
    for letter in name:
        if (letter.isupper()):
            upperLetter = letter
            break
    if (upperLetter == ''):
        raise ValueError
    return name.split(upperLetter)[0]


class TestGetSpecies(unittest.TestCase):
    def test_case(self):
        self.assertEqual('pikachu', get_species('pikachuHey'))
        self.assertRaises(ValueError, get_species, 'trash')


class TestGraphTest(unittest.TestCase):
    def test_insertion(self):
        graph = Graph()
        # Create two nodes
        node1 = Node(NodeType.POKEMON, "Pikachu")
        node2 = Node(NodeType.MOVE, "Thunderbolt")

        # Add nodes to the graph
        graph.add_node(node1)
        graph.add_node(node2)

        # Insert an edge between node1 and node2
        graph.add_edge(node1, node2)

        # Retrieve the edge between node1 and node2
        edge_exists = graph.get_edge(node1, node2)
        self.assertEqual(True, edge_exists)  #

    def test_node_equality(self):
        self.assertEqual(True,  Node(NodeType.POKEMON, "Pikachu") ==  Node(NodeType.POKEMON, "Pikachu"))
        self.assertEqual(False,  Node(NodeType.MOVE, "Pikachu") ==  Node(NodeType.POKEMON, "Pikachu"))

    def test_adj_pokemon(self):
        graph = Graph()
        # Create two nodes
        graph.add_node(Node(NodeType.POKEMON, "pikachu"))
        graph.add_node(Node(NodeType.POKEMON, "pichu"))
        graph.add_node(Node(NodeType.MOVE, "Thunderbolt"))

        graph.add_edge(Node(NodeType.POKEMON, "pikachu"), Node(NodeType.MOVE, "Thunderbolt"))
        graph.add_edge(Node(NodeType.POKEMON, "pichu"), Node(NodeType.MOVE, "Thunderbolt"))
        print(graph.return_adj_pokemon_nodes(Node(NodeType.MOVE, "Thunderbolt")))
