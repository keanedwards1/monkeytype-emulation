window.registerSnippets("TypeScript", [
  { title: "Typed fetch helper", code: `type ApiResult<T> = {
  data: T;
  receivedAt: string;
};

async function getJson<T>(url: string): Promise<ApiResult<T>> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(String(response.status));
  return { data: await response.json(), receivedAt: new Date().toISOString() };
}` },
  { category: "algorithms", title: "Min stack", code: `class MinStack {
  private values: number[] = [];
  private mins: number[] = [];

  push(value: number): void {
    this.values.push(value);
    const min = this.mins.length === 0 ? value : Math.min(value, this.getMin());
    this.mins.push(min);
  }

  pop(): number | undefined {
    this.mins.pop();
    return this.values.pop();
  }

  getMin(): number {
    return this.mins[this.mins.length - 1];
  }
}` }
]);

window.expandSnippets("TypeScript", [
  (n) => ({ title: `Trie node ${n}`, code: `class TrieNode {
  children = new Map<string, TrieNode>();
  isWord = false;
}

class Trie {
  private root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) node.children.set(char, new TrieNode());
      node = node.children.get(char)!;
    }
    node.isWord = true;
  }
}` }),
  (n) => ({ title: `DFS island count ${n}`, code: `function numIslands(grid: string[][]): number {
  let count = 0;

  function dfs(row: number, col: number): void {
    if (!grid[row]?.[col] || grid[row][col] !== "1") return;
    grid[row][col] = "0";
    dfs(row + 1, col); dfs(row - 1, col);
    dfs(row, col + 1); dfs(row, col - 1);
  }

  for (let r = 0; r < grid.length; r += 1)
    for (let c = 0; c < grid[r].length; c += 1)
      if (grid[r][c] === "1") { count += 1; dfs(r, c); }

  return count;
}` }),
  (n) => ({ title: `Top k frequency ${n}`, code: `function topKFrequent(nums: number[], k: number): number[] {
  const counts = new Map<number, number>();
  for (const num of nums) counts.set(num, (counts.get(num) ?? 0) + 1);

  return [...counts.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, k)
    .map(([num]) => num);
}` })
]);
