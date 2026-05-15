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

window.registerSnippets("TypeScript", [
  { title: "API client method", code: `async function updateProject(id: string, patch: Partial<Project>): Promise<Project> {
  const response = await api.patch<Project>(\`/projects/\${id}\`, patch);

  if (!response.data.ownerId) {
    throw new Error("project response missing owner");
  }

  cache.projects.set(response.data.id, response.data);
  return response.data;
}` },
  { title: "Form validation", code: `function validateInvite(input: InviteForm): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!input.email.includes("@")) errors.email = "Enter a valid email";
  if (input.role !== "admin" && input.role !== "member") errors.role = "Choose a role";
  if (input.note && input.note.length > 240) errors.note = "Keep the note short";

  return errors;
}` },
  { title: "Event dispatcher", code: `type Listener<T> = (event: T) => void;

class EventBus<T> {
  private listeners = new Set<Listener<T>>();

  subscribe(listener: Listener<T>): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emit(event: T): void {
    for (const listener of this.listeners) listener(event);
  }
}` }
]);

window.registerSnippets("TypeScript", [
  { category: "algorithms", title: "Typed two sum", code: `function twoSumTyped(nums: number[], target: number): [number, number] | null {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const match = seen.get(target - nums[i]);
    if (match !== undefined) return [match, i];
    seen.set(nums[i], i);
  }
  return null;
}` },
  { category: "algorithms", title: "Typed max profit", code: `function maxProfitTyped(prices: number[]): number {
  let low = prices[0];
  let best = 0;
  for (const price of prices) {
    low = Math.min(low, price);
    best = Math.max(best, price - low);
  }
  return best;
}` },
  { category: "algorithms", title: "Typed binary search", code: `function binarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    nums[mid] < target ? left = mid + 1 : right = mid - 1;
  }
  return -1;
}` },
  { category: "algorithms", title: "Typed group anagrams", code: `function groupAnagramsTyped(words: string[]): string[][] {
  const groups = new Map<string, string[]>();
  for (const word of words) {
    const key = [...word].sort().join("");
    groups.set(key, [...groups.get(key) ?? [], word]);
  }
  return [...groups.values()];
}` },
  { category: "algorithms", title: "Typed linked list reverse", code: `function reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {
  let prev: ListNode<T> | null = null;
  while (head) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}` },
  { category: "algorithms", title: "Typed merge lists", code: `function mergeLists(a: ListNode<number> | null, b: ListNode<number> | null): ListNode<number> | null {
  const dummy = new ListNode(0);
  let tail = dummy;
  while (a && b) {
    if (a.value <= b.value) { tail.next = a; a = a.next; }
    else { tail.next = b; b = b.next; }
    tail = tail.next;
  }
  tail.next = a ?? b;
  return dummy.next;
}` },
  { category: "algorithms", title: "Typed tree depth", code: `function treeDepth(node: TreeNode | null): number {
  return node ? 1 + Math.max(treeDepth(node.left), treeDepth(node.right)) : 0;
}` },
  { category: "algorithms", title: "Typed invert tree", code: `function invertTyped(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  [root.left, root.right] = [invertTyped(root.right), invertTyped(root.left)];
  return root;
}` },
  { category: "algorithms", title: "Typed island sink", code: `function sinkIsland(grid: string[][], row: number, col: number): void {
  if (grid[row]?.[col] !== "1") return;
  grid[row][col] = "0";
  sinkIsland(grid, row + 1, col);
  sinkIsland(grid, row - 1, col);
  sinkIsland(grid, row, col + 1);
  sinkIsland(grid, row, col - 1);
}` },
  { category: "algorithms", title: "Typed coin change", code: `function coinChangeTyped(coins: number[], amount: number): number {
  const dp = Array(amount + 1).fill(Number.POSITIVE_INFINITY);
  dp[0] = 0;
  for (const coin of coins)
    for (let value = coin; value <= amount; value++)
      dp[value] = Math.min(dp[value], dp[value - coin] + 1);
  return dp[amount] === Infinity ? -1 : dp[amount];
}` },
  { category: "algorithms", title: "Typed house robber", code: `function robTyped(nums: number[]): number {
  let take = 0;
  let skip = 0;
  for (const value of nums) [take, skip] = [skip + value, Math.max(take, skip)];
  return Math.max(take, skip);
}` },
  { category: "algorithms", title: "Typed subsets", code: `function subsetsTyped(nums: number[]): number[][] {
  const result: number[][] = [[]];
  for (const num of nums) {
    for (const item of [...result]) result.push([...item, num]);
  }
  return result;
}` },
  { category: "algorithms", title: "Typed intervals", code: `function mergeIntervalsTyped(intervals: Array<[number, number]>): Array<[number, number]> {
  intervals.sort((a, b) => a[0] - b[0]);
  const out: Array<[number, number]> = [];
  for (const current of intervals) {
    const last = out.at(-1);
    if (!last || current[0] > last[1]) out.push(current);
    else last[1] = Math.max(last[1], current[1]);
  }
  return out;
}` },
  { title: "Typed route params", code: `function requireParam(params: Record<string, string | undefined>, key: string): string {
  const value = params[key];
  if (!value) throw new Error("missing route param: " + key);
  return value;
}` },
  { title: "Typed API error", code: `class ApiError extends Error {
  constructor(readonly status: number, message: string) {
    super(message);
  }
}` },
  { title: "Typed config parse", code: `function parsePort(value: string | undefined): number {
  const port = Number(value ?? 3000);
  if (!Number.isInteger(port) || port <= 0) throw new Error("invalid port");
  return port;
}` },
  { title: "Typed repository save", code: `async function saveUser(repo: Repository<User>, input: UserInput): Promise<User> {
  const user = User.create(input.email, input.name);
  await repo.save(user);
  return user;
}` },
  { title: "Typed reducer", code: `function reducer(state: State, event: Event): State {
  if (event.type === "loaded") return { ...state, items: event.items, loading: false };
  if (event.type === "failed") return { ...state, error: event.message, loading: false };
  return state;
}` },
  { title: "Typed debounce", code: `function debounceTyped<T extends unknown[]>(fn: (...args: T) => void, wait: number) {
  let timer: number | undefined;
  return (...args: T) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), wait);
  };
}` },
  { title: "Typed event payload", code: `function publishEvent<T extends object>(name: string, payload: T): AuditEvent<T> {
  return { name, payload, createdAt: new Date().toISOString() };
}` },
  { title: "Typed pagination", code: `function pageOf<T>(items: T[], page: number, size: number): T[] {
  const start = Math.max(0, page - 1) * size;
  return items.slice(start, start + size);
}` },
  { title: "Typed dirty check", code: `function isDirty<T extends object>(initial: T, current: T): boolean {
  return Object.keys(current).some((key) => current[key as keyof T] !== initial[key as keyof T]);
}` },
  { title: "Typed retry", code: `async function retry<T>(operation: () => Promise<T>, attempts = 3): Promise<T> {
  try { return await operation(); }
  catch (error) {
    if (attempts <= 1) throw error;
    return retry(operation, attempts - 1);
  }
}` },
  { title: "Typed map values", code: `function mapValues<T, R>(input: Record<string, T>, fn: (value: T) => R): Record<string, R> {
  return Object.fromEntries(Object.entries(input).map(([key, value]) => [key, fn(value)]));
}` },
  { title: "Typed assert never", code: `function assertNever(value: never): never {
  throw new Error("unexpected value: " + JSON.stringify(value));
}` },
  { title: "Typed permissions", code: `function canEdit(user: User, document: Document): boolean {
  return user.role === "admin" || document.ownerId === user.id;
}` },
  { title: "Typed optimistic update", code: `function optimisticUpdate<T extends { id: string }>(items: T[], changed: T): T[] {
  return items.map((item) => item.id === changed.id ? changed : item);
}` },
  { title: "Typed query key", code: `function projectQueryKey(projectId: string, tab: string): readonly string[] {
  return ["project", projectId, tab] as const;
}` },
  { title: "Typed result", code: `type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };` },
  { title: "Typed guard", code: `function isAdmin(user: User): user is AdminUser {
  return user.role === "admin";
}` },
  { title: "Typed serializer", code: `function serializeUser(user: User): UserDto {
  return { id: user.id, email: user.email, name: user.name ?? "" };
}` },
  { title: "Typed action creator", code: `function loaded(items: Item[]): Action {
  return { type: "loaded", items };
}` },
  { title: "Typed fetch timeout", code: `async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);
  try { return await fetch(url, { signal: controller.signal }); }
  finally { clearTimeout(timeout); }
}` }
]);
