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
