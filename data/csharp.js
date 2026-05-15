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

window.registerSnippets("C#", [
  { category: "algorithms", title: "Two sum dictionary", code: `public static int[] TwoSum(int[] nums, int target)
{
    var seen = new Dictionary<int, int>();
    for (var i = 0; i < nums.Length; i++)
    {
        if (seen.TryGetValue(target - nums[i], out var j)) return new[] { j, i };
        seen[nums[i]] = i;
    }
    return Array.Empty<int>();
}` },
  { category: "algorithms", title: "Max profit", code: `public static int MaxProfit(int[] prices)
{
    var low = prices[0];
    var best = 0;
    foreach (var price in prices)
    {
        low = Math.Min(low, price);
        best = Math.Max(best, price - low);
    }
    return best;
}` },
  { category: "algorithms", title: "Move zeroes", code: `public static void MoveZeroes(int[] nums)
{
    var write = 0;
    foreach (var value in nums)
        if (value != 0) nums[write++] = value;
    while (write < nums.Length) nums[write++] = 0;
}` },
  { category: "algorithms", title: "Contains duplicate", code: `public static bool ContainsDuplicate(int[] nums)
{
    var seen = new HashSet<int>();
    return nums.Any(value => !seen.Add(value));
}` },
  { category: "algorithms", title: "Product except self", code: `public static int[] ProductExceptSelf(int[] nums)
{
    var output = Enumerable.Repeat(1, nums.Length).ToArray();
    for (var i = 1; i < nums.Length; i++) output[i] = output[i - 1] * nums[i - 1];
    for (var i = nums.Length - 2; i >= 0; i--) output[i] *= nums[(i + 1)..].Aggregate(1, (a, b) => a * b);
    return output;
}` },
  { category: "algorithms", title: "Maximum subarray", code: `public static int MaxSubArray(int[] nums)
{
    var best = nums[0];
    var current = nums[0];
    for (var i = 1; i < nums.Length; i++)
    {
        current = Math.Max(nums[i], current + nums[i]);
        best = Math.Max(best, current);
    }
    return best;
}` },
  { category: "algorithms", title: "Search insert", code: `public static int SearchInsert(int[] nums, int target)
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
}` },
  { category: "algorithms", title: "Valid palindrome", code: `public static bool IsPalindrome(string text)
{
    var clean = new string(text.ToLowerInvariant().Where(char.IsLetterOrDigit).ToArray());
    return clean.SequenceEqual(clean.Reverse());
}` },
  { category: "algorithms", title: "Group anagrams", code: `public static IList<IList<string>> GroupAnagrams(string[] words)
{
    return words.GroupBy(word => new string(word.OrderBy(ch => ch).ToArray()))
        .Select(group => (IList<string>)group.ToList())
        .ToList();
}` },
  { category: "algorithms", title: "Top k frequent", code: `public static int[] TopKFrequent(int[] nums, int k)
{
    return nums.GroupBy(value => value)
        .OrderByDescending(group => group.Count())
        .Take(k)
        .Select(group => group.Key)
        .ToArray();
}` },
  { category: "algorithms", title: "Merge intervals", code: `public static List<int[]> MergeIntervals(List<int[]> intervals)
{
    intervals.Sort((a, b) => a[0].CompareTo(b[0]));
    var merged = new List<int[]>();
    foreach (var current in intervals)
        if (merged.Count == 0 || current[0] > merged[^1][1]) merged.Add(current);
        else merged[^1][1] = Math.Max(merged[^1][1], current[1]);
    return merged;
}` },
  { category: "algorithms", title: "Invert tree", code: `public static TreeNode? InvertTree(TreeNode? root)
{
    if (root is null) return null;
    (root.Left, root.Right) = (InvertTree(root.Right), InvertTree(root.Left));
    return root;
}` },
  { category: "algorithms", title: "Same tree", code: `public static bool SameTree(TreeNode? a, TreeNode? b)
{
    if (a is null || b is null) return a == b;
    return a.Value == b.Value && SameTree(a.Left, b.Left) && SameTree(a.Right, b.Right);
}` },
  { category: "algorithms", title: "Level order", code: `public static List<int> LevelOrder(TreeNode? root)
{
    var queue = new Queue<TreeNode>();
    var values = new List<int>();
    if (root is not null) queue.Enqueue(root);
    while (queue.Count > 0)
    {
        var node = queue.Dequeue();
        values.Add(node.Value);
        if (node.Left is not null) queue.Enqueue(node.Left);
        if (node.Right is not null) queue.Enqueue(node.Right);
    }
    return values;
}` },
  { category: "algorithms", title: "Coin change", code: `public static int CoinChange(int[] coins, int amount)
{
    var dp = Enumerable.Repeat(amount + 1, amount + 1).ToArray();
    dp[0] = 0;
    foreach (var coin in coins)
        for (var value = coin; value <= amount; value++)
            dp[value] = Math.Min(dp[value], dp[value - coin] + 1);
    return dp[amount] > amount ? -1 : dp[amount];
}` },
  { category: "algorithms", title: "House robber", code: `public static int Rob(int[] nums)
{
    var take = 0;
    var skip = 0;
    foreach (var value in nums)
        (take, skip) = (skip + value, Math.Max(skip, take));
    return Math.Max(take, skip);
}` },
  { category: "algorithms", title: "Word break", code: `public static bool WordBreak(string text, HashSet<string> words)
{
    var dp = new bool[text.Length + 1];
    dp[0] = true;
    for (var i = 1; i <= text.Length; i++)
        for (var j = 0; j < i; j++)
            if (dp[j] && words.Contains(text[j..i])) dp[i] = true;
    return dp[^1];
}` },
  { category: "algorithms", title: "Subsets", code: `public static List<List<int>> Subsets(int[] nums)
{
    var result = new List<List<int>> { new() };
    foreach (var num in nums)
        result.AddRange(result.Select(item => item.Append(num).ToList()).ToList());
    return result;
}` },
  { title: "API endpoint mapping", code: `app.MapPost("/projects", async (CreateProjectRequest request, ProjectService service) =>
{
    var project = await service.CreateAsync(request);
    return Results.Created($"/projects/{project.Id}", project);
});` },
  { title: "Repository query", code: `public async Task<User?> FindByEmailAsync(string email)
{
    return await db.Users
        .Where(user => user.Email == email.ToLowerInvariant())
        .SingleOrDefaultAsync();
}` },
  { title: "Domain event", code: `public sealed record OrderPlaced(Guid OrderId, Guid CustomerId, DateTimeOffset PlacedAt)
{
    public static OrderPlaced From(Order order) =>
        new(order.Id, order.CustomerId, DateTimeOffset.UtcNow);
}` },
  { title: "Options binding", code: `builder.Services
    .AddOptions<EmailOptions>()
    .BindConfiguration("Email")
    .ValidateDataAnnotations()
    .ValidateOnStart();` },
  { title: "Background worker", code: `protected override async Task ExecuteAsync(CancellationToken stoppingToken)
{
    while (!stoppingToken.IsCancellationRequested)
    {
        await processor.ProcessPendingAsync(stoppingToken);
        await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
    }
}` },
  { title: "Validation result", code: `public static ValidationResult ValidateInvite(InviteRequest request)
{
    if (string.IsNullOrWhiteSpace(request.Email)) return ValidationResult.Fail("Email is required");
    if (!request.Email.Contains('@')) return ValidationResult.Fail("Email is invalid");
    return ValidationResult.Success();
}` },
  { title: "Cache wrapper", code: `public async Task<T> GetOrCreateAsync<T>(string key, Func<Task<T>> load)
{
    if (cache.TryGetValue(key, out T? value)) return value;
    value = await load();
    cache.Set(key, value, TimeSpan.FromMinutes(5));
    return value;
}` },
  { title: "Problem details", code: `public static IResult ProblemFrom(Exception error)
{
    return Results.Problem(
        title: error.GetType().Name,
        detail: error.Message,
        statusCode: StatusCodes.Status500InternalServerError);
}` },
  { title: "Permission check", code: `public static bool CanEdit(User user, Document document)
{
    return user.Role == Role.Admin || document.OwnerId == user.Id;
}` },
  { title: "Pagination helper", code: `public static IQueryable<T> Page<T>(this IQueryable<T> query, int page, int size)
{
    return query.Skip(Math.Max(0, page - 1) * size).Take(size);
}` },
  { title: "Retry delay", code: `public static TimeSpan RetryDelay(int attempt)
{
    var milliseconds = Math.Min(1000, attempt * 200);
    return TimeSpan.FromMilliseconds(milliseconds);
}` },
  { title: "Audit log entry", code: `public static AuditLog CreateAudit(string action, User actor, Entity target)
{
    return new AuditLog(action, actor.Id, target.Id, DateTimeOffset.UtcNow);
}` },
  { title: "Result mapper", code: `public static ResultDto ToDto(Result result)
{
    return new ResultDto(result.Id, result.Status.ToString(), result.CreatedAt);
}` },
  { title: "Health check", code: `public Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken token)
{
    return database.CanConnectAsync(token)
        ? Task.FromResult(HealthCheckResult.Healthy())
        : Task.FromResult(HealthCheckResult.Unhealthy());
}` }
]);

window.registerSnippets("C#", [
  { title: "Controller action", code: `public async Task<IActionResult> UpdateOrder(Guid id, UpdateOrderRequest request)
{
    var order = await orders.FindAsync(id);
    if (order is null) return NotFound();

    order.SetShippingAddress(request.Address);
    await orders.SaveChangesAsync();

    return Ok(OrderDto.From(order));
}` },
  { title: "Options validation", code: `public sealed class BillingOptionsValidator : IValidateOptions<BillingOptions>
{
    public ValidateOptionsResult Validate(string? name, BillingOptions options)
    {
        if (string.IsNullOrWhiteSpace(options.ApiKey))
            return ValidateOptionsResult.Fail("Billing API key is required.");

        return ValidateOptionsResult.Success;
    }
}` },
  { title: "Retry policy", code: `public async Task<T> WithRetry<T>(Func<Task<T>> operation)
{
    for (var attempt = 1; attempt <= 3; attempt++)
    {
        try { return await operation(); }
        catch when (attempt < 3)
        {
            await Task.Delay(TimeSpan.FromMilliseconds(attempt * 200));
        }
    }

    throw new InvalidOperationException("unreachable retry state");
}` }
]);
