import unittest


def getSpecies(name: str) -> str:
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
        self.assertEqual('pikachu', getSpecies('pikachuHey'))
        self.assertRaises(ValueError, getSpecies, 'trash')
