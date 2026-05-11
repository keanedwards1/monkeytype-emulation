window.registerSnippets("C++", [
  { title: "Vector transform", code: `std::vector<std::string> normalize_names(const std::vector<std::string>& names) {
    std::vector<std::string> result;
    result.reserve(names.size());
    std::transform(names.begin(), names.end(), std::back_inserter(result), normalize);
    return result;
}` },
  { category: "algorithms", title: "Union find", code: `class DSU {
public:
    explicit DSU(int n) : parent(n), rank(n, 0) {
        std::iota(parent.begin(), parent.end(), 0);
    }

    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }

    bool unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b) return false;
        if (rank[a] < rank[b]) std::swap(a, b);
        parent[b] = a;
        if (rank[a] == rank[b]) rank[a]++;
        return true;
    }

private:
    std::vector<int> parent;
    std::vector<int> rank;
};` }
]);

window.expandSnippets("C++", [
  (n) => ({ title: `Dijkstra ${n}`, code: `std::vector<int> dijkstra(const Graph& graph, int start) {
    std::vector<int> dist(graph.size(), INF);
    std::priority_queue<Node, std::vector<Node>, std::greater<Node>> heap;
    dist[start] = 0;
    heap.push({0, start});

    while (!heap.empty()) {
        auto [cost, node] = heap.top();
        heap.pop();
        if (cost != dist[node]) continue;

        for (auto [next, weight] : graph[node]) {
            if (cost + weight < dist[next]) {
                dist[next] = cost + weight;
                heap.push({dist[next], next});
            }
        }
    }

    return dist;
}` }),
  (n) => ({ title: `Binary search ${n}`, code: `int lower_bound_index(const std::vector<int>& nums, int target) {
    int left = 0;
    int right = static_cast<int>(nums.size());

    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < target) left = mid + 1;
        else right = mid;
    }

    return left;
}` }),
  (n) => ({ title: `Tree inorder ${n}`, code: `void inorder(TreeNode* node, std::vector<int>& values) {
    if (node == nullptr) return;
    inorder(node->left, values);
    values.push_back(node->value);
    inorder(node->right, values);
}` })
]);
