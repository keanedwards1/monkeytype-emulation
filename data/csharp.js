window.registerSnippets("C#", [
  { title: "LINQ projection", code: `var activeUsers = users
    .Where(user => user.IsActive)
    .OrderBy(user => user.LastName)
    .Select(user => new UserSummary(user.Id, user.Email))
    .ToList();` },
  { category: "algorithms", title: "Valid anagram", code: `public static bool IsAnagram(string left, string right)
{
    if (left.Length != right.Length) return false;
    var counts = new Dictionary<char, int>();

    foreach (var ch in left)
        counts[ch] = counts.GetValueOrDefault(ch) + 1;

    foreach (var ch in right)
    {
        if (!counts.TryGetValue(ch, out var count) || count == 0) return false;
        counts[ch] = count - 1;
    }

    return true;
}` }
]);

window.expandSnippets("C#", [
  (n) => ({ title: `Binary search ${n}`, code: `public static int LowerBound(int[] nums, int target)
{
    var left = 0;
    var right = nums.Length;

    while (left < right)
    {
        var mid = left + (right - left) / 2;
        if (nums[mid] < target) left = mid + 1;
        else right = mid;
    }

    return left;
}` }),
  (n) => ({ title: `Queue BFS ${n}`, code: `public static List<int> Bfs(Dictionary<int, List<int>> graph, int start)
{
    var queue = new Queue<int>();
    var seen = new HashSet<int> { start };
    var order = new List<int>();
    queue.Enqueue(start);

    while (queue.Count > 0)
    {
        var node = queue.Dequeue();
        order.Add(node);
        foreach (var next in graph[node])
            if (seen.Add(next)) queue.Enqueue(next);
    }

    return order;
}` }),
  (n) => ({ title: `Tree depth ${n}`, code: `public static int MaxDepth(TreeNode? node)
{
    if (node is null) return 0;

    var left = MaxDepth(node.Left);
    var right = MaxDepth(node.Right);
    return Math.Max(left, right) + 1;
}` })
]);
