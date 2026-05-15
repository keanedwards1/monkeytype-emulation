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

window.registerSnippets("Rust", [
  { title: "Actix handler", code: `async fn create_project(
    state: web::Data<AppState>,
    payload: web::Json<CreateProject>,
) -> Result<HttpResponse, ApiError> {
    let project = state.projects.create(payload.into_inner()).await?;

    Ok(HttpResponse::Created().json(project))
}` },
  { title: "Config from env", code: `fn config_from_env() -> Result<Config, VarError> {
    let port = std::env::var("PORT")?
        .parse()
        .unwrap_or(8080);

    Ok(Config {
        database_url: std::env::var("DATABASE_URL")?,
        port,
        log_level: std::env::var("LOG_LEVEL").unwrap_or_else(|_| "info".into()),
    })
}` },
  { title: "CSV import row", code: `fn import_user(row: &csv::StringRecord) -> Result<User, ImportError> {
    let email = row.get(0).ok_or(ImportError::MissingEmail)?.trim();
    let name = row.get(1).unwrap_or("").trim();

    if !email.contains('@') {
        return Err(ImportError::InvalidEmail(email.to_owned()));
    }

    Ok(User::new(email, name))
}` }
]);

window.registerSnippets("Rust", [
  { category: "algorithms", title: "Contains duplicate", code: `fn contains_duplicate(nums: &[i32]) -> bool {
    let mut seen = std::collections::HashSet::new();
    nums.iter().any(|value| !seen.insert(*value))
}` },
  { category: "algorithms", title: "Max profit", code: `fn max_profit(prices: &[i32]) -> i32 {
    let mut low = prices[0];
    let mut best = 0;
    for &price in prices {
        low = low.min(price);
        best = best.max(price - low);
    }
    best
}` },
  { category: "algorithms", title: "Move zeroes", code: `fn move_zeroes(nums: &mut [i32]) {
    let mut write = 0;
    for read in 0..nums.len() {
        if nums[read] != 0 {
            nums[write] = nums[read];
            write += 1;
        }
    }
    nums[write..].fill(0);
}` },
  { category: "algorithms", title: "Maximum subarray", code: `fn max_subarray(nums: &[i32]) -> i32 {
    let mut best = nums[0];
    let mut current = nums[0];
    for &value in &nums[1..] {
        current = value.max(current + value);
        best = best.max(current);
    }
    best
}` },
  { category: "algorithms", title: "Search insert", code: `fn search_insert(nums: &[i32], target: i32) -> usize {
    let mut left = 0;
    let mut right = nums.len();
    while left < right {
        let mid = left + (right - left) / 2;
        if nums[mid] < target { left = mid + 1; } else { right = mid; }
    }
    left
}` },
  { category: "algorithms", title: "Group anagrams", code: `fn group_anagrams(words: Vec<String>) -> Vec<Vec<String>> {
    let mut groups = std::collections::HashMap::new();
    for word in words {
        let mut chars: Vec<char> = word.chars().collect();
        chars.sort_unstable();
        groups.entry(chars).or_insert_with(Vec::new).push(word);
    }
    groups.into_values().collect()
}` },
  { category: "algorithms", title: "Coin change", code: `fn coin_change(coins: &[usize], amount: usize) -> i32 {
    let mut dp = vec![amount + 1; amount + 1];
    dp[0] = 0;
    for &coin in coins {
        for value in coin..=amount {
            dp[value] = dp[value].min(dp[value - coin] + 1);
        }
    }
    if dp[amount] > amount { -1 } else { dp[amount] as i32 }
}` },
  { category: "algorithms", title: "House robber", code: `fn rob(nums: &[i32]) -> i32 {
    let (mut take, mut skip) = (0, 0);
    for &value in nums {
        (take, skip) = (skip + value, skip.max(take));
    }
    take.max(skip)
}` },
  { category: "algorithms", title: "Subsets", code: `fn subsets(nums: &[i32]) -> Vec<Vec<i32>> {
    let mut result = vec![vec![]];
    for &num in nums {
        let mut next = result.clone();
        for item in &mut next { item.push(num); }
        result.extend(next);
    }
    result
}` },
  { category: "algorithms", title: "Merge intervals", code: `fn merge_intervals(mut intervals: Vec<Interval>) -> Vec<Interval> {
    intervals.sort_by_key(|item| item.start);
    let mut out: Vec<Interval> = Vec::new();
    for item in intervals {
        match out.last_mut() {
            Some(last) if item.start <= last.end => last.end = last.end.max(item.end),
            _ => out.push(item),
        }
    }
    out
}` },
  { title: "Axum handler", code: `async fn create_project(
    State(state): State<AppState>,
    Json(payload): Json<CreateProject>,
) -> Result<Json<Project>, ApiError> {
    let project = state.projects.create(payload).await?;
    Ok(Json(project))
}` },
  { title: "Repository lookup", code: `async fn find_user(pool: &PgPool, email: &str) -> Result<Option<User>, sqlx::Error> {
    sqlx::query_as("select id, email from users where email = $1")
        .bind(email.to_lowercase())
        .fetch_optional(pool)
        .await
}` },
  { title: "Permission check", code: `fn can_edit(user: &User, document: &Document) -> bool {
    user.role == Role::Admin || document.owner_id == user.id
}` },
  { title: "Normalize email", code: `fn normalize_email(email: &str) -> String {
    email.trim().to_lowercase()
}` },
  { title: "Retry delay", code: `fn retry_delay(attempt: u32) -> std::time::Duration {
    let millis = (attempt * 200).min(1000);
    std::time::Duration::from_millis(millis.into())
}` },
  { title: "Audit event", code: `fn audit(action: &str, actor: &User, target: &Entity) -> AuditEvent {
    AuditEvent {
        action: action.to_owned(),
        actor_id: actor.id,
        target_id: target.id,
        created_at: Utc::now(),
    }
}` },
  { title: "Batch chunks", code: `fn batches<T>(items: &[T], size: usize) -> impl Iterator<Item = &[T]> {
    items.chunks(size.max(1))
}` },
  { title: "Feature flag", code: `fn feature_enabled(flags: &Flags, key: &str, user: &User) -> bool {
    flags.get(key).map(|flag| flag.enabled_for(user)).unwrap_or(false)
}` },
  { title: "JSON response", code: `fn json_response<T: serde::Serialize>(status: StatusCode, value: T) -> Response {
    (status, Json(value)).into_response()
}` },
  { title: "Config defaults", code: `fn apply_defaults(config: &mut Config) {
    if config.port == 0 { config.port = 8080; }
    if config.log_level.is_empty() { config.log_level = "info".into(); }
}` },
  { title: "Path extension", code: `fn extension(path: &Path) -> String {
    path.extension()
        .and_then(|value| value.to_str())
        .unwrap_or("")
        .to_owned()
}` },
  { title: "Token bucket", code: `fn allow_request(bucket: &mut Bucket, now: Instant) -> bool {
    bucket.refill(now);
    if bucket.tokens == 0 { return false; }
    bucket.tokens -= 1;
    true
}` },
  { title: "Error mapping", code: `impl From<sqlx::Error> for ApiError {
    fn from(error: sqlx::Error) -> Self {
        ApiError::Database(error.to_string())
    }
}` },
  { title: "Event publish", code: `async fn publish_event(bus: &Bus, mut event: Event) -> Result<(), BusError> {
    event.id = Uuid::new_v4();
    event.created_at = Utc::now();
    bus.publish(event).await
}` },
  { title: "Cache lookup", code: `async fn cached_user(cache: &Cache, repo: &Repo, id: UserId) -> Result<User, Error> {
    if let Some(user) = cache.get_user(id).await {
        return Ok(user);
    }
    let user = repo.find_user(id).await?;
    cache.put_user(&user).await;
    Ok(user)
}` },
  { title: "Health check", code: `async fn health(pool: State<PgPool>) -> StatusCode {
    match sqlx::query("select 1").execute(&*pool).await {
        Ok(_) => StatusCode::NO_CONTENT,
        Err(_) => StatusCode::SERVICE_UNAVAILABLE,
    }
}` },
  { title: "Worker loop", code: `async fn run_worker(mut jobs: Receiver<Job>, processor: Processor) {
    while let Some(job) = jobs.recv().await {
        if let Err(error) = processor.process(job).await {
            tracing::error!(%error, "job failed");
        }
    }
}` },
  { title: "Serde DTO", code: `#[derive(Debug, serde::Serialize)]
struct UserDto {
    id: Uuid,
    email: String,
    name: String,
}` },
  { title: "Request logger", code: `async fn log_request<B>(request: Request<B>, next: Next<B>) -> Response {
    let method = request.method().clone();
    let path = request.uri().path().to_owned();
    let response = next.run(request).await;
    tracing::info!(%method, %path, status = %response.status());
    response
}` },
  { title: "Form validation", code: `fn validate_invite(input: &InviteForm) -> Result<(), ValidationError> {
    if !input.email.contains('@') { return Err(ValidationError::Email); }
    if input.role.is_empty() { return Err(ValidationError::Role); }
    Ok(())
}` },
  { title: "Pagination", code: `fn paginate(query: Query, page: i64, size: i64) -> Query {
    let offset = (page.max(1) - 1) * size;
    query.limit(size).offset(offset)
}` },
  { title: "Status text", code: `fn status_text(status: u16) -> &'static str {
    match status {
        200 => "OK",
        404 => "Not Found",
        _ => "Unknown",
    }
}` }
]);
