window.registerSnippets("Go", [
  { title: "Worker pool", code: `func worker(id int, jobs <-chan Job, results chan<- Result) {
  for job := range jobs {
    value, err := process(job)
    results <- Result{WorkerID: id, Value: value, Err: err}
  }
}` },
  { category: "algorithms", title: "Two sum", code: `func twoSum(nums []int, target int) []int {
  seen := map[int]int{}

  for index, value := range nums {
    if previous, ok := seen[target-value]; ok {
      return []int{previous, index}
    }
    seen[value] = index
  }

  return nil
}` }
]);

window.expandSnippets("Go", [
  (n) => ({ title: `BFS queue ${n}`, code: `func bfs(graph map[int][]int, start int) []int {
  queue := []int{start}
  seen := map[int]bool{start: true}
  order := []int{}

  for len(queue) > 0 {
    node := queue[0]
    queue = queue[1:]
    order = append(order, node)

    for _, next := range graph[node] {
      if !seen[next] {
        seen[next] = true
        queue = append(queue, next)
      }
    }
  }

  return order
}` }),
  (n) => ({ title: `Binary search ${n}`, code: `func lowerBound(nums []int, target int) int {
  left, right := 0, len(nums)

  for left < right {
    mid := left + (right-left)/2
    if nums[mid] < target {
      left = mid + 1
    } else {
      right = mid
    }
  }

  return left
}` }),
  (n) => ({ title: `Heap top k ${n}`, code: `func topK(values []int, k int) []int {
  h := &IntHeap{}
  heap.Init(h)

  for _, value := range values {
    heap.Push(h, value)
    if h.Len() > k {
      heap.Pop(h)
    }
  }

  return h.Values()
}` })
]);

window.registerSnippets("Go", [
  { title: "HTTP handler", code: `func createProject(w http.ResponseWriter, r *http.Request) {
  var input CreateProjectRequest
  if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
    http.Error(w, "invalid json", http.StatusBadRequest)
    return
  }

  project, err := projects.Create(r.Context(), input)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  writeJSON(w, http.StatusCreated, project)
}` },
  { title: "Context timeout", code: `func loadAccount(ctx context.Context, id string) (*Account, error) {
  ctx, cancel := context.WithTimeout(ctx, 2*time.Second)
  defer cancel()

  account, err := store.FindAccount(ctx, id)
  if err != nil {
    return nil, fmt.Errorf("load account %s: %w", id, err)
  }

  return account, nil
}` },
  { title: "Config defaults", code: `func applyDefaults(cfg *Config) {
  if cfg.Port == 0 {
    cfg.Port = 8080
  }
  if cfg.LogLevel == "" {
    cfg.LogLevel = "info"
  }
  if cfg.RequestTimeout == 0 {
    cfg.RequestTimeout = 15 * time.Second
  }
}` }
]);

window.registerSnippets("Go", [
  { category: "algorithms", title: "Contains duplicate", code: `func containsDuplicate(nums []int) bool {
  seen := map[int]bool{}
  for _, value := range nums {
    if seen[value] { return true }
    seen[value] = true
  }
  return false
}` },
  { category: "algorithms", title: "Max profit", code: `func maxProfit(prices []int) int {
  low, best := prices[0], 0
  for _, price := range prices {
    if price < low { low = price }
    if price-low > best { best = price - low }
  }
  return best
}` },
  { category: "algorithms", title: "Move zeroes", code: `func moveZeroes(nums []int) {
  write := 0
  for _, value := range nums {
    if value != 0 { nums[write] = value; write++ }
  }
  for write < len(nums) { nums[write] = 0; write++ }
}` },
  { category: "algorithms", title: "Maximum subarray", code: `func maxSubArray(nums []int) int {
  best, current := nums[0], nums[0]
  for _, value := range nums[1:] {
    current = max(value, current+value)
    best = max(best, current)
  }
  return best
}` },
  { category: "algorithms", title: "Search insert", code: `func searchInsert(nums []int, target int) int {
  left, right := 0, len(nums)
  for left < right {
    mid := left + (right-left)/2
    if nums[mid] < target { left = mid + 1 } else { right = mid }
  }
  return left
}` },
  { category: "algorithms", title: "Group anagrams", code: `func groupAnagrams(words []string) [][]string {
  groups := map[string][]string{}
  for _, word := range words {
    key := sortedString(word)
    groups[key] = append(groups[key], word)
  }
  return mapValues(groups)
}` },
  { category: "algorithms", title: "Merge intervals", code: `func mergeIntervals(items []Interval) []Interval {
  sort.Slice(items, func(i, j int) bool { return items[i].Start < items[j].Start })
  merged := []Interval{}
  for _, item := range items {
    if len(merged) == 0 || item.Start > merged[len(merged)-1].End { merged = append(merged, item) } else { merged[len(merged)-1].End = max(merged[len(merged)-1].End, item.End) }
  }
  return merged
}` },
  { category: "algorithms", title: "Invert tree", code: `func invertTree(root *TreeNode) *TreeNode {
  if root == nil { return nil }
  root.Left, root.Right = invertTree(root.Right), invertTree(root.Left)
  return root
}` },
  { category: "algorithms", title: "Tree depth", code: `func maxDepth(root *TreeNode) int {
  if root == nil { return 0 }
  return 1 + max(maxDepth(root.Left), maxDepth(root.Right))
}` },
  { category: "algorithms", title: "Coin change", code: `func coinChange(coins []int, amount int) int {
  dp := make([]int, amount+1)
  for i := 1; i <= amount; i++ { dp[i] = amount + 1 }
  for _, coin := range coins {
    for value := coin; value <= amount; value++ { dp[value] = min(dp[value], dp[value-coin]+1) }
  }
  if dp[amount] > amount { return -1 }
  return dp[amount]
}` },
  { category: "algorithms", title: "House robber", code: `func rob(nums []int) int {
  take, skip := 0, 0
  for _, value := range nums {
    take, skip = skip+value, max(skip, take)
  }
  return max(take, skip)
}` },
  { category: "algorithms", title: "Subsets", code: `func subsets(nums []int) [][]int {
  result := [][]int{{}}
  for _, value := range nums {
    for _, item := range append([][]int{}, result...) { result = append(result, append(item, value)) }
  }
  return result
}` },
  { title: "Middleware chain", code: `func requireAuth(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    if userFrom(r.Context()) == nil { http.Error(w, "unauthorized", http.StatusUnauthorized); return }
    next.ServeHTTP(w, r)
  })
}` },
  { title: "JSON response", code: `func writeJSON(w http.ResponseWriter, status int, value any) {
  w.Header().Set("content-type", "application/json")
  w.WriteHeader(status)
  _ = json.NewEncoder(w).Encode(value)
}` },
  { title: "Repository lookup", code: `func (r *Repository) FindUser(ctx context.Context, email string) (*User, error) {
  row := r.db.QueryRowContext(ctx, "select id, email from users where email = ?", strings.ToLower(email))
  return scanUser(row)
}` },
  { title: "Transaction wrapper", code: `func withTx(ctx context.Context, db *sql.DB, fn func(*sql.Tx) error) error {
  tx, err := db.BeginTx(ctx, nil)
  if err != nil { return err }
  if err := fn(tx); err != nil { _ = tx.Rollback(); return err }
  return tx.Commit()
}` },
  { title: "Permission check", code: `func canEdit(user User, doc Document) bool {
  return user.Role == "admin" || doc.OwnerID == user.ID
}` },
  { title: "Normalize email", code: `func normalizeEmail(email string) string {
  return strings.ToLower(strings.TrimSpace(email))
}` },
  { title: "Batch slice", code: `func batches[T any](items []T, size int) [][]T {
  out := [][]T{}
  for start := 0; start < len(items); start += size { out = append(out, items[start:min(start+size, len(items))]) }
  return out
}` },
  { title: "Retry delay", code: `func retryDelay(attempt int) time.Duration {
  delay := time.Duration(attempt*200) * time.Millisecond
  if delay > time.Second { return time.Second }
  return delay
}` },
  { title: "Feature flag", code: `func featureEnabled(flags map[string]Flag, key string, user User) bool {
  flag, ok := flags[key]
  return ok && flag.EnabledFor(user)
}` },
  { title: "Audit event", code: `func audit(action string, actor User, target Entity) AuditEvent {
  return AuditEvent{Action: action, ActorID: actor.ID, TargetID: target.ID, CreatedAt: time.Now()}
}` },
  { title: "Cache get", code: `func getCached[T any](cache Cache, key string, load func() (T, error)) (T, error) {
  if value, ok := cache.Get(key).(T); ok { return value, nil }
  value, err := load()
  if err == nil { cache.Set(key, value, time.Minute*5) }
  return value, err
}` },
  { title: "CSV import row", code: `func importContact(row []string) (Contact, error) {
  email := normalizeEmail(row[0])
  if !strings.Contains(email, "@") { return Contact{}, errors.New("invalid email") }
  return Contact{Email: email, Name: row[1]}, nil
}` },
  { title: "Config from env", code: `func configFromEnv() Config {
  return Config{
    Port: envInt("PORT", 8080),
    LogLevel: envString("LOG_LEVEL", "info"),
    DatabaseURL: os.Getenv("DATABASE_URL"),
  }
}` },
  { title: "Health check", code: `func healthz(db *sql.DB) http.HandlerFunc {
  return func(w http.ResponseWriter, r *http.Request) {
    if err := db.PingContext(r.Context()); err != nil { http.Error(w, "down", 503); return }
    w.WriteHeader(http.StatusNoContent)
  }
}` },
  { title: "Worker loop", code: `func runWorker(ctx context.Context, jobs <-chan Job) {
  for {
    select {
    case <-ctx.Done(): return
    case job := <-jobs: process(job)
    }
  }
}` },
  { title: "Path extension", code: `func extension(path string) string {
  ext := filepath.Ext(path)
  return strings.TrimPrefix(ext, ".")
}` },
  { title: "Request logger", code: `func logRequest(next http.Handler) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    start := time.Now()
    next.ServeHTTP(w, r)
    slog.Info("request", "method", r.Method, "path", r.URL.Path, "duration", time.Since(start))
  })
}` },
  { title: "Token bucket", code: `func allow(bucket *Bucket, now time.Time) bool {
  bucket.Refill(now)
  if bucket.Tokens <= 0 { return false }
  bucket.Tokens--
  return true
}` },
  { title: "Event publish", code: `func publish(ctx context.Context, bus Bus, event Event) error {
  event.ID = uuid.NewString()
  event.CreatedAt = time.Now()
  return bus.Publish(ctx, event)
}` },
  { title: "Metrics duration", code: `func observeDuration(metrics Metrics, name string, started time.Time) {
  elapsed := time.Since(started)
  metrics.Observe(name, float64(elapsed.Milliseconds()))
}` }
]);
