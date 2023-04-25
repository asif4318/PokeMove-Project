

class SplayNode:
    def __init__(self, key: str, data: list[str]):
        self.key = key
        self.data = data
        self.parent = None
        self.left = None
        self.right = None

class SplayTree:
    def __init__(self):
        self.root = None
        self.size = 0

    def splay(self, root: SplayNode, key: str):
        if root is None or root.data:
            return root

    def insert(self, key: str, data: list[str]):
        node = SplayNode(data)
        if self.root is None:
            self.root = node
            self.size += 1
            return








