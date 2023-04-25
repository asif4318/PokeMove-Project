import unittest
from modules.splaytree import SplayNode,SplayTree

class TestSplayTree(unittest.TestCase):
    def test_insertion_retrieval(self):
        tree = SplayTree()
        tree.insert("cut", ['Lilipup', 'Dwebble'])
        print(tree.get_node("cut").data)
        tree.insert("chomp", ['watchog', 'stoutland', 'herdier'])
        self.assertEqual(['watchog', 'stoutland', 'herdier'], tree.get_node('chomp').data)
        self.assertEqual(tree.get_node('akdfakjl'), None)
        tree.insert('chomp', 'trump')
        self.assertEqual(['watchog', 'stoutland', 'herdier', 'trump'], tree.get_node('chomp').data)