window.registerSnippets("C", [
  { title: "Dynamic array push", code: `int array_push(IntArray *array, int value) {
    if (array->count == array->capacity) {
        size_t next = array->capacity == 0 ? 8 : array->capacity * 2;
        int *items = realloc(array->items, next * sizeof(int));
        if (items == NULL) return -1;
        array->items = items;
        array->capacity = next;
    }

    array->items[array->count++] = value;
    return 0;
}` },
  { category: "algorithms", title: "Binary search", code: `int binary_search(const int *nums, int count, int target) {
    int left = 0;
    int right = count - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }

    return -1;
}` }
]);

window.expandSnippets("C", [
  (n) => ({ title: `Merge sorted arrays ${n}`, code: `void merge_sorted(const int *a, int na, const int *b, int nb, int *out) {
    int i = 0;
    int j = 0;
    int k = 0;

    while (i < na && j < nb) {
        if (a[i] <= b[j]) out[k++] = a[i++];
        else out[k++] = b[j++];
    }

    while (i < na) out[k++] = a[i++];
    while (j < nb) out[k++] = b[j++];
}` }),
  (n) => ({ title: `Linked list reverse ${n}`, code: `Node *reverse_list(Node *head) {
    Node *previous = NULL;

    while (head != NULL) {
        Node *next = head->next;
        head->next = previous;
        previous = head;
        head = next;
    }

    return previous;
}` }),
  (n) => ({ title: `Stack parentheses ${n}`, code: `int is_balanced(const char *text) {
    char stack[256];
    int top = 0;

    for (int i = 0; text[i] != '\\0'; i++) {
        if (text[i] == '(') stack[top++] = text[i];
        if (text[i] == ')') {
            if (top == 0) return 0;
            top--;
        }
    }

    return top == 0;
}` })
]);

window.registerSnippets("C", [
  { title: "Config parser", code: `int parse_port(const char *value, int *out) {
    char *end = NULL;
    long port = strtol(value, &end, 10);

    if (end == value || *end != '\\0') return -1;
    if (port < 1 || port > 65535) return -1;

    *out = (int)port;
    return 0;
}` },
  { title: "File read loop", code: `size_t read_all(FILE *file, char *buffer, size_t capacity) {
    size_t total = 0;

    while (total < capacity) {
        size_t n = fread(buffer + total, 1, capacity - total, file);
        total += n;
        if (n == 0) break;
    }

    return total;
}` },
  { title: "Request header lookup", code: `const char *header_value(const Header *headers, size_t count, const char *name) {
    for (size_t i = 0; i < count; i++) {
        if (strcasecmp(headers[i].name, name) == 0) {
            return headers[i].value;
        }
    }

    return NULL;
}` }
]);

window.registerSnippets("C", [
  { category: "algorithms", title: "Max profit", code: `int max_profit(const int *prices, int n) {
    int low = prices[0];
    int best = 0;

    for (int i = 1; i < n; i++) {
        if (prices[i] < low) low = prices[i];
        if (prices[i] - low > best) best = prices[i] - low;
    }

    return best;
}` },
  { category: "algorithms", title: "Move zeroes", code: `void move_zeroes(int *nums, int n) {
    int write = 0;

    for (int read = 0; read < n; read++) {
        if (nums[read] != 0) nums[write++] = nums[read];
    }

    while (write < n) nums[write++] = 0;
}` },
  { category: "algorithms", title: "Remove duplicates", code: `int remove_duplicates(int *nums, int n) {
    if (n == 0) return 0;
    int write = 1;

    for (int read = 1; read < n; read++) {
        if (nums[read] != nums[write - 1]) nums[write++] = nums[read];
    }

    return write;
}` },
  { category: "algorithms", title: "Search insert", code: `int search_insert(const int *nums, int n, int target) {
    int left = 0;
    int right = n;

    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < target) left = mid + 1;
        else right = mid;
    }

    return left;
}` },
  { category: "algorithms", title: "Valid palindrome", code: `int is_palindrome(const char *s, int n) {
    int left = 0;
    int right = n - 1;

    while (left < right) {
        if (tolower(s[left]) != tolower(s[right])) return 0;
        left++;
        right--;
    }

    return 1;
}` },
  { category: "algorithms", title: "Majority candidate", code: `int majority_candidate(const int *nums, int n) {
    int candidate = 0;
    int votes = 0;

    for (int i = 0; i < n; i++) {
        if (votes == 0) candidate = nums[i];
        votes += nums[i] == candidate ? 1 : -1;
    }

    return candidate;
}` },
  { category: "algorithms", title: "Climb stairs", code: `int climb_stairs(int n) {
    int prev = 1;
    int curr = 1;

    for (int step = 2; step <= n; step++) {
        int next = prev + curr;
        prev = curr;
        curr = next;
    }

    return curr;
}` },
  { category: "algorithms", title: "Hamming weight", code: `int hamming_weight(unsigned int value) {
    int bits = 0;

    while (value != 0) {
        value &= value - 1;
        bits++;
    }

    return bits;
}` },
  { category: "algorithms", title: "Missing number", code: `int missing_number(const int *nums, int n) {
    int missing = n;

    for (int i = 0; i < n; i++) {
        missing ^= i ^ nums[i];
    }

    return missing;
}` },
  { category: "algorithms", title: "Single number", code: `int single_number(const int *nums, int n) {
    int value = 0;

    for (int i = 0; i < n; i++) {
        value ^= nums[i];
    }

    return value;
}` },
  { category: "algorithms", title: "Minimum subarray length", code: `int min_subarray_len(const int *nums, int n, int target) {
    int left = 0;
    int sum = 0;
    int best = n + 1;

    for (int right = 0; right < n; right++) {
        sum += nums[right];
        while (sum >= target) {
            if (right - left + 1 < best) best = right - left + 1;
            sum -= nums[left++];
        }
    }

    return best == n + 1 ? 0 : best;
}` },
  { category: "algorithms", title: "Prefix sums", code: `void prefix_sums(const int *nums, int n, int *out) {
    int running = 0;

    for (int i = 0; i < n; i++) {
        running += nums[i];
        out[i] = running;
    }
}` },
  { category: "algorithms", title: "Diagonal sum", code: `int diagonal_sum(int matrix[][64], int n) {
    int sum = 0;

    for (int i = 0; i < n; i++) {
        sum += matrix[i][i];
        if (i != n - 1 - i) sum += matrix[i][n - 1 - i];
    }

    return sum;
}` },
  { category: "algorithms", title: "Queue push", code: `int queue_push(Queue *queue, int value) {
    if (queue->count == QUEUE_CAPACITY) return -1;

    queue->items[queue->tail] = value;
    queue->tail = (queue->tail + 1) % QUEUE_CAPACITY;
    queue->count++;
    return 0;
}` },
  { category: "algorithms", title: "Queue pop", code: `int queue_pop(Queue *queue, int *out) {
    if (queue->count == 0) return -1;

    *out = queue->items[queue->head];
    queue->head = (queue->head + 1) % QUEUE_CAPACITY;
    queue->count--;
    return 0;
}` },
  { category: "algorithms", title: "List length", code: `int list_length(const Node *node) {
    int count = 0;

    while (node != NULL) {
        count++;
        node = node->next;
    }

    return count;
}` },
  { category: "algorithms", title: "Middle node", code: `Node *middle_node(Node *head) {
    Node *slow = head;
    Node *fast = head;

    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
    }

    return slow;
}` },
  { category: "algorithms", title: "Detect cycle", code: `int has_cycle(Node *head) {
    Node *slow = head;
    Node *fast = head;

    while (fast != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return 1;
    }

    return 0;
}` },
  { title: "Safe string copy", code: `void copy_name(char *dest, size_t size, const char *source) {
    if (size == 0) return;

    strncpy(dest, source, size - 1);
    dest[size - 1] = '\\0';
}` },
  { title: "Trim newline", code: `void trim_newline(char *line) {
    size_t len = strlen(line);

    if (len > 0 && line[len - 1] == '\\n') {
        line[len - 1] = '\\0';
    }
}` },
  { title: "Environment flag", code: `int env_flag_enabled(const char *name) {
    const char *value = getenv(name);

    return value != NULL && strcmp(value, "1") == 0;
}` },
  { title: "Clamp integer", code: `int clamp_int(int value, int low, int high) {
    if (value < low) return low;
    if (value > high) return high;

    return value;
}` },
  { title: "Parse bool", code: `int parse_bool(const char *value) {
    if (strcmp(value, "true") == 0) return 1;
    if (strcmp(value, "false") == 0) return 0;

    return -1;
}` },
  { title: "Buffer append", code: `int buffer_append(Buffer *buffer, char ch) {
    if (buffer->length + 1 >= buffer->capacity) return -1;

    buffer->data[buffer->length++] = ch;
    buffer->data[buffer->length] = '\\0';
    return 0;
}` },
  { title: "HTTP status text", code: `const char *status_text(int status) {
    switch (status) {
        case 200: return "OK";
        case 404: return "Not Found";
        case 500: return "Server Error";
        default: return "Unknown";
    }
}` },
  { title: "CSV field count", code: `int csv_field_count(const char *line) {
    int count = 1;

    for (int i = 0; line[i] != '\\0'; i++) {
        if (line[i] == ',') count++;
    }

    return count;
}` },
  { title: "Retry sleep", code: `void retry_sleep(int attempt) {
    int millis = attempt * 100;
    if (millis > 1000) millis = 1000;

    sleep_millis(millis);
}` },
  { title: "Open log file", code: `FILE *open_log(const char *dir, const char *name) {
    char path[PATH_MAX];

    snprintf(path, sizeof(path), "%s/%s.log", dir, name);
    return fopen(path, "a");
}` },
  { title: "Token bucket refill", code: `void refill_bucket(Bucket *bucket, int now) {
    int elapsed = now - bucket->updated_at;

    bucket->tokens += elapsed * bucket->rate;
    if (bucket->tokens > bucket->capacity) bucket->tokens = bucket->capacity;
    bucket->updated_at = now;
}` },
  { title: "Feature lookup", code: `int feature_enabled(const Feature *features, int count, const char *key) {
    for (int i = 0; i < count; i++) {
        if (strcmp(features[i].key, key) == 0) return features[i].enabled;
    }

    return 0;
}` },
  { title: "Rate limit allowed", code: `int rate_limit_allowed(Bucket *bucket, int now) {
    refill_bucket(bucket, now);
    if (bucket->tokens <= 0) return 0;

    bucket->tokens--;
    return 1;
}` },
  { title: "Path extension", code: `const char *path_extension(const char *path) {
    const char *dot = strrchr(path, '.');

    if (dot == NULL || dot == path) return "";
    return dot + 1;
}` },
  { title: "Request method parse", code: `Method parse_method(const char *method) {
    if (strcmp(method, "GET") == 0) return METHOD_GET;
    if (strcmp(method, "POST") == 0) return METHOD_POST;
    if (strcmp(method, "DELETE") == 0) return METHOD_DELETE;

    return METHOD_UNKNOWN;
}` },
  { title: "Arena reset", code: `void arena_reset(Arena *arena) {
    arena->offset = 0;
    memset(arena->data, 0, arena->capacity);
}` }
]);
