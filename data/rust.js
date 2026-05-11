window.registerSnippets("Rust", [
  { title: "Iterator filter", code: `fn active_names(users: &[User]) -> Vec<String> {
    users.iter()
        .filter(|user| user.active)
        .map(|user| user.name.trim().to_string())
        .collect()
}` },
  { category: "algorithms", title: "Two sum", code: `fn two_sum(nums: Vec<i32>, target: i32) -> Option<(usize, usize)> {
    let mut seen = std::collections::HashMap::new();

    for (index, value) in nums.iter().enumerate() {
        if let Some(previous) = seen.get(&(target - value)) {
            return Some((*previous, index));
        }
        seen.insert(*value, index);
    }

    None
}` }
]);

window.expandSnippets("Rust", [
  (n) => ({ title: `Binary search ${n}`, code: `fn lower_bound(nums: &[i32], target: i32) -> usize {
    let mut left = 0;
    let mut right = nums.len();

    while left < right {
        let mid = left + (right - left) / 2;
        if nums[mid] < target {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    left
}` }),
  (n) => ({ title: `Stack validation ${n}`, code: `fn is_valid(input: &str) -> bool {
    let mut stack = Vec::new();

    for ch in input.chars() {
        match ch {
            '(' | '[' | '{' => stack.push(ch),
            ')' if stack.pop() != Some('(') => return false,
            ']' if stack.pop() != Some('[') => return false,
            '}' if stack.pop() != Some('{') => return false,
            _ => {}
        }
    }

    stack.is_empty()
}` }),
  (n) => ({ title: `Graph DFS ${n}`, code: `fn dfs(node: usize, graph: &[Vec<usize>], seen: &mut [bool]) {
    if seen[node] {
        return;
    }

    seen[node] = true;
    for &next in &graph[node] {
        dfs(next, graph, seen);
    }
}` })
]);
