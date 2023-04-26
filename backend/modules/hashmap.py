
class HashMap:
    def __init__(self, capacity=8):
        self.capacity = capacity
        self.size = 0
        self.table = [None] * self.capacity

    def __len__(self):
        return self.size

    def __contains__(self, key):
        index = self._get_index(key)
        if self.table[index] is not None:
            return True
        return False

    def __getitem__(self, key):
        index = self._get_index(key)
        if self.table[index] is None:
            raise KeyError(key)
        values = self.table[index]
        names = []

        for pairs in values:
            names.append(pairs[1])

        return names

    def __setitem__(self, key, value):
        if self.size >= self.capacity * 0.8:
            self._resize()
        index = self._get_index(key)
        if self.table[index] is None:
            self.table[index] = [(key, value)]
        else:
            self.table[index].append((key, value))
        self.size += 1

    def _resize(self):
        old_table = self.table
        self.capacity *= 2
        self.size = 0
        self.table = [None] * self.capacity
        for pairs in old_table:
            if pairs is not None:
                for pair in pairs:
                    self[pair[0]] = pair[1]

    def _hash(self, key):
        return hash(key) % self.capacity

    def _get_index(self, key):
        index = self._hash(key)
        i = 1
        while self.table[index] is not None:
            for k, v in self.table[index]:
                if k == key:
                    return index
            index = (index + i * i) % self.capacity
            i += 1
        return index
