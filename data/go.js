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
