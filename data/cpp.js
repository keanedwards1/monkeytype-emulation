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

window.registerSnippets("C++", [
  { title: "Request middleware", code: `Response require_api_key(const Request& request, Handler next) {
    auto header = request.headers.find("x-api-key");

    if (header == request.headers.end() || !keys.contains(header->second)) {
        return Response::json(401, {{"error", "invalid api key"}});
    }

    return next(request);
}` },
  { title: "Settings merge", code: `Settings merge_settings(Settings base, const Settings& override) {
    if (!override.region.empty()) base.region = override.region;
    if (override.max_connections > 0) base.max_connections = override.max_connections;
    if (override.timeout_ms > 0) base.timeout_ms = override.timeout_ms;

    for (const auto& [name, enabled] : override.features) {
        base.features[name] = enabled;
    }

    return base;
}` },
  { title: "Log rotation check", code: `bool should_rotate(const std::filesystem::path& path, std::uintmax_t limit) {
    std::error_code error;
    const auto size = std::filesystem::file_size(path, error);

    if (error) {
        logger.warn("could not stat log file: {}", error.message());
        return false;
    }

    return size >= limit;
}` }
]);

window.registerSnippets("C++", [
  { category: "algorithms", title: "Two sum map", code: `std::vector<int> two_sum(const std::vector<int>& nums, int target) {
    std::unordered_map<int, int> seen;
    for (int i = 0; i < static_cast<int>(nums.size()); ++i) {
        if (seen.contains(target - nums[i])) return {seen[target - nums[i]], i};
        seen[nums[i]] = i;
    }
    return {};
}` },
  { category: "algorithms", title: "Max profit", code: `int max_profit(const std::vector<int>& prices) {
    int low = prices.front();
    int best = 0;
    for (int price : prices) {
        low = std::min(low, price);
        best = std::max(best, price - low);
    }
    return best;
}` },
  { category: "algorithms", title: "Move zeroes", code: `void move_zeroes(std::vector<int>& nums) {
    int write = 0;
    for (int value : nums) if (value != 0) nums[write++] = value;
    while (write < static_cast<int>(nums.size())) nums[write++] = 0;
}` },
  { category: "algorithms", title: "Contains duplicate", code: `bool contains_duplicate(const std::vector<int>& nums) {
    std::unordered_set<int> seen;
    for (int value : nums) if (!seen.insert(value).second) return true;
    return false;
}` },
  { category: "algorithms", title: "Maximum subarray", code: `int max_subarray(const std::vector<int>& nums) {
    int best = nums.front();
    int current = nums.front();
    for (size_t i = 1; i < nums.size(); ++i) {
        current = std::max(nums[i], current + nums[i]);
        best = std::max(best, current);
    }
    return best;
}` },
  { category: "algorithms", title: "Search insert", code: `int search_insert(const std::vector<int>& nums, int target) {
    auto it = std::lower_bound(nums.begin(), nums.end(), target);
    return static_cast<int>(std::distance(nums.begin(), it));
}` },
  { category: "algorithms", title: "Group anagrams", code: `std::vector<std::vector<std::string>> group_anagrams(const std::vector<std::string>& words) {
    std::unordered_map<std::string, std::vector<std::string>> groups;
    for (auto word : words) {
        auto key = word;
        std::sort(key.begin(), key.end());
        groups[key].push_back(word);
    }
    return values(groups);
}` },
  { category: "algorithms", title: "Merge intervals", code: `std::vector<Interval> merge_intervals(std::vector<Interval> items) {
    std::sort(items.begin(), items.end(), [](auto& a, auto& b) { return a.start < b.start; });
    std::vector<Interval> out;
    for (const auto& item : items)
        if (out.empty() || item.start > out.back().end) out.push_back(item);
        else out.back().end = std::max(out.back().end, item.end);
    return out;
}` },
  { category: "algorithms", title: "Invert tree", code: `TreeNode* invert_tree(TreeNode* root) {
    if (root == nullptr) return nullptr;
    std::swap(root->left, root->right);
    invert_tree(root->left);
    invert_tree(root->right);
    return root;
}` },
  { category: "algorithms", title: "Same tree", code: `bool same_tree(TreeNode* a, TreeNode* b) {
    if (a == nullptr || b == nullptr) return a == b;
    return a->value == b->value && same_tree(a->left, b->left) && same_tree(a->right, b->right);
}` },
  { category: "algorithms", title: "Level order", code: `std::vector<int> level_order(TreeNode* root) {
    std::queue<TreeNode*> queue;
    std::vector<int> values;
    if (root) queue.push(root);
    while (!queue.empty()) {
        auto node = queue.front(); queue.pop();
        values.push_back(node->value);
        if (node->left) queue.push(node->left);
        if (node->right) queue.push(node->right);
    }
    return values;
}` },
  { category: "algorithms", title: "Coin change", code: `int coin_change(const std::vector<int>& coins, int amount) {
    std::vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int coin : coins)
        for (int value = coin; value <= amount; ++value)
            dp[value] = std::min(dp[value], dp[value - coin] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}` },
  { category: "algorithms", title: "House robber", code: `int rob(const std::vector<int>& nums) {
    int take = 0, skip = 0;
    for (int value : nums) {
        int next = skip + value;
        skip = std::max(skip, take);
        take = next;
    }
    return std::max(take, skip);
}` },
  { category: "algorithms", title: "Subsets", code: `std::vector<std::vector<int>> subsets(const std::vector<int>& nums) {
    std::vector<std::vector<int>> out{{}};
    for (int value : nums) {
        auto copy = out;
        for (auto item : copy) { item.push_back(value); out.push_back(item); }
    }
    return out;
}` },
  { category: "algorithms", title: "Kth largest", code: `int kth_largest(std::vector<int> nums, int k) {
    std::nth_element(nums.begin(), nums.begin() + k - 1, nums.end(), std::greater<int>());
    return nums[k - 1];
}` },
  { category: "algorithms", title: "Word break", code: `bool word_break(const std::string& text, const std::unordered_set<std::string>& words) {
    std::vector<bool> dp(text.size() + 1);
    dp[0] = true;
    for (size_t i = 1; i <= text.size(); ++i)
        for (size_t j = 0; j < i; ++j)
            if (dp[j] && words.contains(text.substr(j, i - j))) dp[i] = true;
    return dp.back();
}` },
  { title: "Config defaults", code: `void apply_defaults(Config& config) {
    if (config.port == 0) config.port = 8080;
    if (config.log_level.empty()) config.log_level = "info";
    if (config.timeout_ms == 0) config.timeout_ms = 15000;
}` },
  { title: "Request id", code: `std::string request_id(const Request& request) {
    if (auto id = request.header("x-request-id"); !id.empty()) return id;
    return uuid::generate();
}` },
  { title: "JSON response", code: `Response json_response(int status, const nlohmann::json& body) {
    Response response(status);
    response.set_header("content-type", "application/json");
    response.body = body.dump();
    return response;
}` },
  { title: "Cache get or load", code: `std::shared_ptr<User> get_user_cached(Cache& cache, Repository& repo, int id) {
    if (auto cached = cache.get<User>(id)) return cached;
    auto user = repo.find_user(id);
    cache.put(id, user);
    return user;
}` },
  { title: "Feature enabled", code: `bool feature_enabled(const Flags& flags, std::string_view key, const User& user) {
    auto flag = flags.find(key);
    return flag != flags.end() && flag->second.enabled_for(user);
}` },
  { title: "Retry delay", code: `std::chrono::milliseconds retry_delay(int attempt) {
    auto value = std::min(1000, attempt * 200);
    return std::chrono::milliseconds(value);
}` },
  { title: "Trim string", code: `std::string trim(std::string value) {
    value.erase(value.begin(), std::find_if(value.begin(), value.end(), not_space));
    value.erase(std::find_if(value.rbegin(), value.rend(), not_space).base(), value.end());
    return value;
}` },
  { title: "Split CSV line", code: `std::vector<std::string> split_csv(const std::string& line) {
    std::stringstream stream(line);
    std::vector<std::string> fields;
    for (std::string field; std::getline(stream, field, ',');) fields.push_back(field);
    return fields;
}` },
  { title: "Audit event", code: `AuditEvent make_audit(std::string action, const User& actor, const Entity& target) {
    return AuditEvent{std::move(action), actor.id, target.id, Clock::now()};
}` },
  { title: "Permission check", code: `bool can_edit(const User& user, const Document& document) {
    return user.role == Role::Admin || document.owner_id == user.id;
}` },
  { title: "Batch vector", code: `std::vector<std::vector<int>> batches(const std::vector<int>& values, size_t size) {
    std::vector<std::vector<int>> out;
    for (size_t i = 0; i < values.size(); i += size)
        out.emplace_back(values.begin() + i, values.begin() + std::min(values.size(), i + size));
    return out;
}` },
  { title: "Path extension", code: `std::string extension(const std::filesystem::path& path) {
    auto ext = path.extension().string();
    if (!ext.empty() && ext.front() == '.') ext.erase(ext.begin());
    return ext;
}` },
  { title: "Status text", code: `std::string_view status_text(int status) {
    switch (status) {
        case 200: return "OK";
        case 404: return "Not Found";
        default: return "Unknown";
    }
}` },
  { title: "Token bucket", code: `bool allow_request(Bucket& bucket, Clock::time_point now) {
    bucket.refill(now);
    if (bucket.tokens == 0) return false;
    bucket.tokens--;
    return true;
}` },
  { title: "Email normalize", code: `std::string normalize_email(std::string email) {
    std::transform(email.begin(), email.end(), email.begin(), [](unsigned char ch) { return std::tolower(ch); });
    return trim(email);
}` },
  { title: "Metrics timer", code: `ScopedTimer::ScopedTimer(Metrics& metrics, std::string name)
    : metrics_(metrics), name_(std::move(name)), started_(Clock::now()) {
}` },
  { title: "Database transaction", code: `void save_order(Database& db, Order& order) {
    auto transaction = db.begin_transaction();
    db.orders().save(order);
    db.events().append(order.release_events());
    transaction.commit();
}` }
]);
