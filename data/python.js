window.registerSnippets("Python", [
  { title: "Frequency counter", code: `from collections import Counter

def most_common_words(lines, limit=10):
    words = []
    for line in lines:
        words.extend(token.lower() for token in line.split())
    return Counter(words).most_common(limit)` },
  { category: "algorithms", title: "Two pointers", code: `def max_area(heights):
    left = 0
    right = len(heights) - 1
    best = 0

    while left < right:
        width = right - left
        best = max(best, width * min(heights[left], heights[right]))
        if heights[left] < heights[right]:
            left += 1
        else:
            right -= 1

    return best` },
  { category: "algorithms", title: "LRU cache", code: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.items = OrderedDict()

    def get(self, key):
        if key not in self.items:
            return -1
        self.items.move_to_end(key)
        return self.items[key]

    def put(self, key, value):
        self.items[key] = value
        self.items.move_to_end(key)
        if len(self.items) > self.capacity:
            self.items.popitem(last=False)` }
]);

window.expandSnippets("Python", [
  (n) => ({ title: `Binary search ${n}`, code: `def lower_bound(nums, target):
    left = 0
    right = len(nums)

    while left < right:
        mid = (left + right) // 2
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid

    return left` }),
  (n) => ({ title: `BFS shortest path ${n}`, code: `from collections import deque

def shortest_path(graph, start, goal):
    queue = deque([(start, 0)])
    seen = {start}

    while queue:
        node, distance = queue.popleft()
        if node == goal:
            return distance
        for next_node in graph[node]:
            if next_node not in seen:
                seen.add(next_node)
                queue.append((next_node, distance + 1))

    return -1` }),
  (n) => ({ title: `Dynamic programming ${n}`, code: `def climb_stairs(n):
    if n <= 2:
        return n

    prev = 1
    curr = 2
    for _ in range(3, n + 1):
        prev, curr = curr, prev + curr

    return curr` }),
  (n) => ({ title: `Backtracking subsets ${n}`, code: `def subsets(nums):
    result = []
    path = []

    def backtrack(index):
        if index == len(nums):
            result.append(path[:])
            return
        backtrack(index + 1)
        path.append(nums[index])
        backtrack(index + 1)
        path.pop()

    backtrack(0)
    return result` })
]);
