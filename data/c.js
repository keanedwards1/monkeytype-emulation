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
