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

window.registerSnippets("Python", [
  { title: "Django view", code: `def update_profile(request):
    if request.method != "POST":
        return HttpResponseNotAllowed(["POST"])

    form = ProfileForm(request.POST, instance=request.user.profile)
    if not form.is_valid():
        return render(request, "profile/edit.html", {"form": form}, status=400)

    form.save()
    messages.success(request, "Profile updated")
    return redirect("profile")` },
  { title: "Background job", code: `def send_digest(account_id, mailer, clock):
    account = Account.objects.get(id=account_id)
    items = DigestItem.objects.ready_for(account, before=clock.now())

    if not items:
        return {"sent": False, "reason": "empty"}

    mailer.send(account.email, render_digest(items))
    items.update(sent_at=clock.now())
    return {"sent": True, "count": len(items)}` },
  { title: "Settings loader", code: `def load_settings(path):
    with open(path, "r", encoding="utf-8") as handle:
        payload = json.load(handle)

    return Settings(
        database_url=payload["database_url"],
        cache_ttl=int(payload.get("cache_ttl", 300)),
        debug=bool(payload.get("debug", False)),
    )` }
]);

window.registerSnippets("Python", [
  { category: "algorithms", title: "Two sum map", code: `def two_sum(nums, target):
    seen = {}
    for index, value in enumerate(nums):
        if target - value in seen:
            return [seen[target - value], index]
        seen[value] = index
    return []` },
  { category: "algorithms", title: "Max profit", code: `def max_profit(prices):
    low = prices[0]
    best = 0
    for price in prices:
        low = min(low, price)
        best = max(best, price - low)
    return best` },
  { category: "algorithms", title: "Move zeroes", code: `def move_zeroes(nums):
    write = 0
    for value in nums:
        if value != 0:
            nums[write] = value
            write += 1
    nums[write:] = [0] * (len(nums) - write)` },
  { category: "algorithms", title: "Contains duplicate", code: `def contains_duplicate(nums):
    return len(set(nums)) != len(nums)` },
  { category: "algorithms", title: "Product except self", code: `def product_except_self(nums):
    out = [1] * len(nums)
    for i in range(1, len(nums)):
        out[i] = out[i - 1] * nums[i - 1]
    right = 1
    for i in range(len(nums) - 1, -1, -1):
        out[i] *= right
        right *= nums[i]
    return out` },
  { category: "algorithms", title: "Maximum subarray", code: `def max_subarray(nums):
    best = current = nums[0]
    for value in nums[1:]:
        current = max(value, current + value)
        best = max(best, current)
    return best` },
  { category: "algorithms", title: "Search rotated", code: `def search_rotated(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]: right = mid - 1
            else: left = mid + 1
        else:
            if nums[mid] < target <= nums[right]: left = mid + 1
            else: right = mid - 1
    return -1` },
  { category: "algorithms", title: "Group anagrams", code: `def group_anagrams(words):
    groups = defaultdict(list)
    for word in words:
        groups["".join(sorted(word))].append(word)
    return list(groups.values())` },
  { category: "algorithms", title: "Top k frequent", code: `def top_k_frequent(nums, k):
    counts = Counter(nums)
    return [value for value, _ in counts.most_common(k)]` },
  { category: "algorithms", title: "Merge intervals", code: `def merge_intervals(intervals):
    intervals.sort()
    merged = []
    for start, end in intervals:
        if not merged or start > merged[-1][1]:
            merged.append([start, end])
        else:
            merged[-1][1] = max(merged[-1][1], end)
    return merged` },
  { category: "algorithms", title: "Invert tree", code: `def invert_tree(root):
    if not root:
        return None
    root.left, root.right = invert_tree(root.right), invert_tree(root.left)
    return root` },
  { category: "algorithms", title: "Same tree", code: `def same_tree(left, right):
    if not left or not right:
        return left is right
    return left.val == right.val and same_tree(left.left, right.left) and same_tree(left.right, right.right)` },
  { category: "algorithms", title: "Level order", code: `def level_order(root):
    queue = deque([root] if root else [])
    values = []
    while queue:
        node = queue.popleft()
        values.append(node.val)
        if node.left: queue.append(node.left)
        if node.right: queue.append(node.right)
    return values` },
  { category: "algorithms", title: "Coin change", code: `def coin_change(coins, amount):
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for value in range(coin, amount + 1):
            dp[value] = min(dp[value], dp[value - coin] + 1)
    return -1 if dp[amount] > amount else dp[amount]` },
  { category: "algorithms", title: "House robber", code: `def rob(nums):
    take = skip = 0
    for value in nums:
        take, skip = skip + value, max(skip, take)
    return max(take, skip)` },
  { category: "algorithms", title: "Word break", code: `def word_break(text, words):
    words = set(words)
    dp = [False] * (len(text) + 1)
    dp[0] = True
    for i in range(1, len(text) + 1):
        for j in range(i):
            if dp[j] and text[j:i] in words:
                dp[i] = True
    return dp[-1]` },
  { title: "FastAPI route", code: `@router.post("/projects")
async def create_project(payload: ProjectCreate, service: ProjectService = Depends()):
    project = await service.create(payload)
    return ProjectOut.from_model(project)` },
  { title: "SQLAlchemy query", code: `def find_user_by_email(session, email):
    return session.query(User)\\
        .filter(User.email == email.lower())\\
        .one_or_none()` },
  { title: "Dataclass event", code: `@dataclass(frozen=True)
class OrderPlaced:
    order_id: UUID
    customer_id: UUID
    placed_at: datetime` },
  { title: "Celery task", code: `@celery.task(bind=True, max_retries=3)
def sync_account(self, account_id):
    try:
        syncer.sync(account_id)
    except TemporaryError as exc:
        raise self.retry(exc=exc, countdown=30)` },
  { title: "Permission check", code: `def can_edit(user, document):
    return user.is_admin or document.owner_id == user.id` },
  { title: "Pagination helper", code: `def paginate(query, page, size):
    page = max(page, 1)
    return query.offset((page - 1) * size).limit(size)` },
  { title: "Retry delay", code: `def retry_delay(attempt):
    return min(1.0, attempt * 0.2)` },
  { title: "Audit entry", code: `def audit(action, actor, target):
    return {
        "action": action,
        "actor_id": actor.id,
        "target_id": target.id,
        "created_at": datetime.utcnow(),
    }` },
  { title: "Normalize email", code: `def normalize_email(email):
    return email.strip().lower()` },
  { title: "Batch iterator", code: `def batches(items, size):
    for index in range(0, len(items), size):
        yield items[index:index + size]` },
  { title: "Cache lookup", code: `def get_cached(cache, key, loader):
    value = cache.get(key)
    if value is None:
        value = loader()
        cache.set(key, value, timeout=300)
    return value` },
  { title: "Feature flag", code: `def feature_enabled(flags, key, user):
    flag = flags.get(key)
    return bool(flag and flag.enabled_for(user))` },
  { title: "JSON response", code: `def json_response(payload, status=200):
    body = json.dumps(payload, default=str)
    return Response(body, status=status, content_type="application/json")` },
  { title: "Path extension", code: `def extension(path):
    return Path(path).suffix.removeprefix(".")` },
  { title: "CSV import row", code: `def import_contact(row):
    email = normalize_email(row["email"])
    if "@" not in email:
        raise ValueError("invalid email")
    return Contact(email=email, name=row.get("name", ""))` }
]);
