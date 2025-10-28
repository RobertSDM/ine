from dataclasses import dataclass


@dataclass
class Vector:
    x: int
    y: int


class Map:
    def __init__(self):
        self._map: list[Vector] = []

    def find(self, x, y):
        target = x + y
        l, r = 0, len(self._map)

        while l < r:
            mid = (l + r) // 2
            value = self._map[mid].x + self._map[mid].y

            if target == value:
                return self._map[mid]
            elif target < value:
                r = mid - 1
            else:
                l = mid + 1

        return None

    def insert(self, vec: Vector):
        self._map.append(vec)


def main():
    vec1 = Vector(0, 0)
    vec2 = Vector(1, 1)
    vec3 = Vector(2, 2)
    vec4 = Vector(3, 3)

    _map = Map()

    _map.insert(vec1)
    _map.insert(vec2)
    _map.insert(vec3)
    _map.insert(vec4)

    assert _map.find(3, 4), "Vector not found"


if __name__ == "__main__":
    main()
