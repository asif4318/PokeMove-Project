import unittest

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
