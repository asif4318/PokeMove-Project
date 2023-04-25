class SplayNode:
    def __init__(self, key: str, data: list[str]):
        self.key = key
        self.data: list[str] = data
        self.parent = None
        self.left = None
        self.right = None


class SplayTree:
    def __init__(self):
        self.root = None
        self.size = 0

    def _splay(self, node):
        while node.parent is not None:
            parent = node.parent
            grandparent = parent.parent

            if grandparent is None:
                # Zig operation
                if node == parent.left:
                    self._rotate_right(parent)
                else:
                    self._rotate_left(parent)
            elif node == parent.left and parent == grandparent.left:
                # Zig-zig operation
                self._rotate_right(grandparent)
                self._rotate_right(parent)
            elif node == parent.right and parent == grandparent.right:
                # Zig-zig operation
                self._rotate_left(grandparent)
                self._rotate_left(parent)
            elif node == parent.right and parent == grandparent.left:
                # Zig-zag operation
                self._rotate_left(parent)
                self._rotate_right(grandparent)
            else:
                # Zag-zig operation
                self._rotate_right(parent)
                self._rotate_left(grandparent)

    def _rotate_left(self, node):
        right_child = node.right
        if right_child is not None:
            node.right = right_child.left
            if right_child.left is not None:
                right_child.left.parent = node

            right_child.parent = node.parent
            if node.parent is None:
                self.root = right_child
            elif node == node.parent.left:
                node.parent.left = right_child
            else:
                node.parent.right = right_child

            right_child.left = node
            node.parent = right_child

    def _rotate_right(self, node):
        left_child = node.left
        if left_child is not None:
            node.left = left_child.right
            if left_child.right is not None:
                left_child.right.parent = node

            left_child.parent = node.parent
            if node.parent is None:
                self.root = left_child
            elif node == node.parent.right:
                node.parent.right = left_child
            else:
                node.parent.left = left_child

            left_child.right = node
            node.parent = left_child

    def insert(self, key, data=None):
        if self.root is None:
            self.root = SplayNode(key, data)
            return

        # Find the position to insert the new node
        parent = None
        node = self.root
        while node is not None:
            parent = node
            if key < node.key:
                node = node.left
            elif key > node.key:
                node = node.right
            else:
                # Key already exists, update the data and splay the node
                node.data.append(data)
                self._splay(node)
                return

        # Create the new node and link it to its parent
        new_node = SplayNode(key, [data])
        new_node.parent = parent
        if key < parent.key:
            parent.left = new_node
        else:
            parent.right = new_node

        # Splay the new node to the root
        self._splay(new_node)

    def get_node(self, key) -> SplayNode:
        node = self.root
        while node is not None:
            if key < node.key:
                node = node.left
            elif key > node.key:
                node = node.right
            else:
                # Node with the given key found, splay it to the root
                self._splay(node)
                return node

        # Node with the given key not found
        return None

