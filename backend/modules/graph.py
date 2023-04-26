from enum import Enum

# Enum to define the type of node


class NodeType(Enum):
    MOVE = 1
    POKEMON = 2


class Node:
    def __init__(self, type: NodeType, name: str):
        self.type: NodeType = type
        self.name: str = name

    # Overload equality operator for comparison
    def __eq__(self, other):
        if isinstance(other, Node):
            return self.name == other.name

    # Make nodes hashable
    def __hash__(self):
        temp = hash(str(self.name) + str(self.type.value))
        return temp


# Bipartite Undirected graph
class Graph:
    def __init__(self):
        self.adjList: dict = dict()

    def add_node(self, node: Node):
        if node not in self.adjList:
            self.adjList[node] = []

    def add_edge(self, node1: Node, node2: Node):
        if node1 in self.adjList and node2 in self.adjList:
            self.adjList[node1].append(node2)
            self.adjList[node2].append(node1)

    def remove_node(self, node: Node):
        if node in self.adjList:
            del self.adjList[node]
            for adj_nodes in self.adjList.values():
                if node in adj_nodes:
                    adj_nodes.remove(node)

    def remove_edge(self, node1: Node, node2: Node):
        if node1 in self.adjList and node2 in self.adjList:
            if node2 in self.adjList[node1]:
                self.adjList[node1].remove(node2)
            if node1 in self.adjList[node2]:
                self.adjList[node2].remove(node1)

    def get_edge(self, node1: Node, node2: Node) -> bool:
        """
        Returns True if there is an edge between node1 and node2, and False otherwise.
        """
        if node1 in self.adjList and node2 in self.adjList:
            print("There is an edge")
            return node2 in self.adjList[node1] and node1 in self.adjList[node2]
        else:
            return False

    def return_adj_pokemon_nodes(self, name: str):
        pokemon: list[str] = []
        for adjacent in self.adjList[Node(NodeType.MOVE, name)]:
            pokemon.append(adjacent.name)
        return pokemon
