window.registerSnippets("JavaScript", [
  { title: "Debounced search", code: `function debounce(callback, wait = 250) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), wait);
  };
}` },
  { title: "Array grouping", code: `const grouped = orders.reduce((result, order) => {
  const key = order.status;

  if (!result[key]) {
    result[key] = [];
  }

  result[key].push(order);
  return result;
}, {});` },
  { category: "algorithms", title: "Two sum", code: `function twoSum(nums, target) {
  const seen = new Map();

  for (let index = 0; index < nums.length; index += 1) {
    const complement = target - nums[index];

    if (seen.has(complement)) {
      return [seen.get(complement), index];
    }

    seen.set(nums[index], index);
  }

  return [];
}` },
  { category: "algorithms", title: "Valid parentheses", code: `function isValid(s) {
  const stack = [];
  const pairs = new Map([[")", "("], ["]", "["], ["}", "{"]]);

  for (const char of s) {
    if (pairs.has(char)) {
      if (stack.pop() !== pairs.get(char)) return false;
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}` }
]);

window.expandSnippets("JavaScript", [
  (n) => ({ title: `Sliding window ${n}`, code: `function longestUnique(text) {
  const seen = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < text.length; right += 1) {
    const previous = seen.get(text[right]);
    if (previous >= left) left = previous + 1;
    seen.set(text[right], right);
    best = Math.max(best, right - left + 1);
  }

  return best;
}` }),
  (n) => ({ title: `Binary search ${n}`, code: `function lowerBound(nums, target) {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) left = mid + 1;
    else right = mid;
  }

  return left;
}` }),
  (n) => ({ title: `BFS traversal ${n}`, code: `function bfs(graph, start) {
  const queue = [start];
  const seen = new Set([start]);
  const order = [];

  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    for (const next of graph.get(node) ?? []) {
      if (!seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }
  }

  return order;
}` }),
  (n) => ({ title: `Merge intervals ${n}`, code: `function mergeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [];

  for (const current of intervals) {
    const last = merged[merged.length - 1];
    if (!last || current[0] > last[1]) {
      merged.push(current);
    } else {
      last[1] = Math.max(last[1], current[1]);
    }
  }

  return merged;
}` })
]);

window.registerSnippets("JavaScript", [
  { title: "Route guard", code: `async function requireUser(request, response, next) {
  const token = request.cookies.session;
  const user = token ? await sessions.findUser(token) : null;

  if (!user) {
    response.status(401).json({ error: "authentication required" });
    return;
  }

  request.user = user;
  next();
}` },
  { title: "Retry fetch", code: `async function fetchWithRetry(url, options = {}, attempts = 3) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (response.ok || attempt === attempts) return response;
    } catch (error) {
      if (attempt === attempts) throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, attempt * 200));
  }
}` },
  { title: "Settings reducer", code: `function settingsReducer(state, action) {
  switch (action.type) {
    case "theme.changed":
      return { ...state, theme: action.theme };
    case "editor.fontSize":
      return { ...state, fontSize: Math.max(12, action.value) };
    case "settings.reset":
      return defaultSettings;
    default:
      return state;
  }
}` }
]);

window.registerSnippets("JavaScript", [
  { category: "algorithms", title: "Contains duplicate", code: `function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}` },
  { category: "algorithms", title: "Best stock profit", code: `function maxProfit(prices) {
  let low = prices[0], best = 0;
  for (const price of prices) {
    low = Math.min(low, price);
    best = Math.max(best, price - low);
  }
  return best;
}` },
  { category: "algorithms", title: "Product except self", code: `function productExceptSelf(nums) {
  const out = Array(nums.length).fill(1);
  for (let i = 1; i < nums.length; i++) out[i] = out[i - 1] * nums[i - 1];
  for (let i = nums.length - 2, right = 1; i >= 0; i--) {
    right *= nums[i + 1];
    out[i] *= right;
  }
  return out;
}` },
  { category: "algorithms", title: "Maximum subarray", code: `function maxSubArray(nums) {
  let best = nums[0], current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}` },
  { category: "algorithms", title: "Find min rotated", code: `function findMin(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;
    else right = mid;
  }
  return nums[left];
}` },
  { category: "algorithms", title: "Container water", code: `function maxArea(height) {
  let left = 0, right = height.length - 1, best = 0;
  while (left < right) {
    best = Math.max(best, (right - left) * Math.min(height[left], height[right]));
    height[left] < height[right] ? left++ : right--;
  }
  return best;
}` },
  { category: "algorithms", title: "Palindrome clean", code: `function isPalindrome(text) {
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  return clean === [...clean].reverse().join("");
}` },
  { category: "algorithms", title: "Expand palindrome", code: `function expandAround(text, left, right) {
  while (left >= 0 && right < text.length && text[left] === text[right]) {
    left--;
    right++;
  }
  return text.slice(left + 1, right);
}` },
  { category: "algorithms", title: "Group anagrams", code: `function groupAnagrams(words) {
  const groups = new Map();
  for (const word of words) {
    const key = [...word].sort().join("");
    groups.set(key, [...groups.get(key) ?? [], word]);
  }
  return [...groups.values()];
}` },
  { category: "algorithms", title: "Encode strings", code: `function encodeStrings(values) {
  return values.map((value) => value.length + "#" + value).join("");
}` },
  { category: "algorithms", title: "Decode strings", code: `function decodeStrings(text) {
  const out = [];
  for (let i = 0; i < text.length;) {
    const j = text.indexOf("#", i);
    const len = Number(text.slice(i, j));
    out.push(text.slice(j + 1, j + 1 + len));
    i = j + 1 + len;
  }
  return out;
}` },
  { category: "algorithms", title: "Kth largest", code: `function kthLargest(nums, k) {
  return nums.sort((a, b) => b - a)[k - 1];
}` },
  { category: "algorithms", title: "Invert tree", code: `function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}` },
  { category: "algorithms", title: "Tree max depth", code: `function maxDepth(root) {
  return root ? 1 + Math.max(maxDepth(root.left), maxDepth(root.right)) : 0;
}` },
  { category: "algorithms", title: "Same tree", code: `function isSameTree(a, b) {
  if (!a || !b) return a === b;
  return a.val === b.val && isSameTree(a.left, b.left) && isSameTree(a.right, b.right);
}` },
  { category: "algorithms", title: "Island count", code: `function numIslands(grid) {
  let count = 0;
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      if (grid[r][c] === "1") { count++; sink(grid, r, c); }
    }
  }
  return count;
}` },
  { category: "algorithms", title: "Coin change", code: `function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (const coin of coins)
    for (let value = coin; value <= amount; value++)
      dp[value] = Math.min(dp[value], dp[value - coin] + 1);
  return dp[amount] === Infinity ? -1 : dp[amount];
}` },
  { category: "algorithms", title: "House robber", code: `function rob(nums) {
  let take = 0, skip = 0;
  for (const value of nums) [take, skip] = [skip + value, Math.max(skip, take)];
  return Math.max(take, skip);
}` },
  { category: "algorithms", title: "Word break", code: `function wordBreak(text, words) {
  const set = new Set(words), dp = Array(text.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= text.length; i++)
    for (let j = 0; j < i; j++)
      if (dp[j] && set.has(text.slice(j, i))) dp[i] = true;
  return dp[text.length];
}` },
  { category: "algorithms", title: "Subsets iterative", code: `function subsets(nums) {
  const result = [[]];
  for (const num of nums) {
    for (const item of [...result]) result.push([...item, num]);
  }
  return result;
}` },
  { title: "Error middleware", code: `function errorHandler(error, request, response, next) {
  request.log.error(error);
  response.status(error.statusCode ?? 500).json({ error: error.message });
}` },
  { title: "Request id middleware", code: `function requestId(request, response, next) {
  request.id = request.headers["x-request-id"] ?? crypto.randomUUID();
  response.setHeader("x-request-id", request.id);
  next();
}` },
  { title: "Get cached value", code: `function getCached(cache, key, loader) {
  if (cache.has(key)) return cache.get(key);
  const value = loader();
  cache.set(key, value);
  return value;
}` },
  { title: "Feature flag check", code: `function isEnabled(flags, key, user) {
  const flag = flags[key];
  return Boolean(flag?.enabled && !flag.deniedUsers?.includes(user.id));
}` },
  { title: "Normalize email", code: `function normalizeEmail(email) {
  return email.trim().toLowerCase();
}` },
  { title: "Build query string", code: `function queryString(params) {
  return new URLSearchParams(
    Object.entries(params).filter(([, value]) => value != null)
  ).toString();
}` },
  { title: "Parse env integer", code: `function envInt(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) ? value : fallback;
}` },
  { title: "Batch records", code: `function batches(items, size) {
  const out = [];
  for (let index = 0; index < items.length; index += size) {
    out.push(items.slice(index, index + size));
  }
  return out;
}` },
  { title: "Audit event", code: `function audit(action, actor, target) {
  return {
    action,
    actorId: actor.id,
    targetId: target.id,
    createdAt: new Date().toISOString()
  };
}` }
]);
