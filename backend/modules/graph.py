from enum import Enum


class NodeType(Enum):
    MOVE = 1
    POKEMON = 2


class Node:
    def __init__(self, type: NodeType):
