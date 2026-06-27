window.registerSnippets("Zig", [
  { title: "Program entry", code: `pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    const args = try std.process.argsAlloc(allocator);
    defer std.process.argsFree(allocator, args);

    for (args[1..]) |arg| {
        std.debug.print("{s}\\n", .{arg});
    }
}` },
  { title: "Collect into ArrayList", code: `fn collectEven(allocator: std.mem.Allocator, values: []const i32) !std.ArrayList(i32) {
    var result = std.ArrayList(i32).init(allocator);
    errdefer result.deinit();

    for (values) |value| {
        if (@mod(value, 2) == 0) try result.append(value);
    }

    return result;
}` },
  { title: "Word frequency map", code: `fn countWords(allocator: std.mem.Allocator, text: []const u8) !std.StringHashMap(u32) {
    var counts = std.StringHashMap(u32).init(allocator);
    var it = std.mem.tokenizeScalar(u8, text, ' ');

    while (it.next()) |word| {
        const entry = try counts.getOrPut(word);
        if (!entry.found_existing) entry.value_ptr.* = 0;
        entry.value_ptr.* += 1;
    }

    return counts;
}` },
  { title: "Generic stack", code: `fn Stack(comptime T: type) type {
    return struct {
        items: std.ArrayList(T),

        const Self = @This();

        fn init(allocator: std.mem.Allocator) Self {
            return .{ .items = std.ArrayList(T).init(allocator) };
        }

        fn deinit(self: *Self) void {
            self.items.deinit();
        }

        fn push(self: *Self, value: T) !void {
            try self.items.append(value);
        }

        fn pop(self: *Self) ?T {
            return self.items.popOrNull();
        }
    };
}` },
  { title: "Parse with error set", code: `const ParseError = error{ Empty, OutOfRange };

fn parsePort(text: []const u8) ParseError!u16 {
    if (text.len == 0) return error.Empty;
    return std.fmt.parseInt(u16, text, 10) catch error.OutOfRange;
}` },
  { title: "Read file to memory", code: `fn readFile(allocator: std.mem.Allocator, path: []const u8) ![]u8 {
    const file = try std.fs.cwd().openFile(path, .{});
    defer file.close();

    return file.readToEndAlloc(allocator, 1024 * 1024);
}` }
]);

window.registerSnippets("Zig", [
  { category: "algorithms", title: "Lower bound", code: `fn lowerBound(nums: []const i32, target: i32) usize {
    var left: usize = 0;
    var right: usize = nums.len;

    while (left < right) {
        const mid = left + (right - left) / 2;
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
}` },
  { category: "algorithms", title: "Two sum", code: `fn twoSum(allocator: std.mem.Allocator, nums: []const i32, target: i32) !?[2]usize {
    var seen = std.AutoHashMap(i32, usize).init(allocator);
    defer seen.deinit();

    for (nums, 0..) |value, index| {
        if (seen.get(target - value)) |previous| {
            return .{ previous, index };
        }
        try seen.put(value, index);
    }

    return null;
}` },
  { category: "algorithms", title: "Valid parentheses", code: `fn isValid(allocator: std.mem.Allocator, input: []const u8) !bool {
    var stack = std.ArrayList(u8).init(allocator);
    defer stack.deinit();

    for (input) |ch| {
        const expected: u8 = switch (ch) {
            ')' => '(',
            ']' => '[',
            '}' => '{',
            else => {
                try stack.append(ch);
                continue;
            },
        };
        if (stack.popOrNull() != expected) return false;
    }

    return stack.items.len == 0;
}` },
  { category: "algorithms", title: "Kadane max subarray", code: `fn maxSubArray(nums: []const i32) i32 {
    var best = nums[0];
    var current = nums[0];

    for (nums[1..]) |value| {
        current = @max(value, current + value);
        best = @max(best, current);
    }

    return best;
}` },
  { category: "algorithms", title: "Merge sorted slices", code: `fn mergeSorted(out: []i32, a: []const i32, b: []const i32) void {
    var i: usize = 0;
    var j: usize = 0;
    var k: usize = 0;

    while (i < a.len and j < b.len) {
        if (a[i] <= b[j]) {
            out[k] = a[i];
            i += 1;
        } else {
            out[k] = b[j];
            j += 1;
        }
        k += 1;
    }

    while (i < a.len) : (i += 1) {
        out[k] = a[i];
        k += 1;
    }
    while (j < b.len) : (j += 1) {
        out[k] = b[j];
        k += 1;
    }
}` },
  { category: "algorithms", title: "Contains duplicate", code: `fn containsDuplicate(allocator: std.mem.Allocator, nums: []const i32) !bool {
    var seen = std.AutoHashMap(i32, void).init(allocator);
    defer seen.deinit();

    for (nums) |value| {
        const entry = try seen.getOrPut(value);
        if (entry.found_existing) return true;
    }

    return false;
}` },
  { category: "algorithms", title: "Iterative fibonacci", code: `fn fib(n: u32) u64 {
    var a: u64 = 0;
    var b: u64 = 1;
    var i: u32 = 0;

    while (i < n) : (i += 1) {
        const next = a + b;
        a = b;
        b = next;
    }

    return a;
}` },
  { category: "algorithms", title: "Reverse linked list", code: `const Node = struct {
    value: i32,
    next: ?*Node,
};

fn reverseList(head: ?*Node) ?*Node {
    var previous: ?*Node = null;
    var current = head;

    while (current) |node| {
        current = node.next;
        node.next = previous;
        previous = node;
    }

    return previous;
}` },
  { category: "algorithms", title: "Palindrome check", code: `fn isPalindrome(text: []const u8) bool {
    var left: usize = 0;
    var right: usize = text.len;

    while (left < right) {
        right -= 1;
        if (text[left] != text[right]) return false;
        left += 1;
    }

    return true;
}` },
  { category: "algorithms", title: "Euclid gcd", code: `fn gcd(a: u64, b: u64) u64 {
    var x = a;
    var y = b;

    while (y != 0) {
        const t = y;
        y = x % y;
        x = t;
    }

    return x;
}` },
  { category: "algorithms", title: "Reverse in place", code: `fn reverse(buffer: []u8) void {
    var left: usize = 0;
    var right: usize = buffer.len;

    while (left < right) {
        right -= 1;
        std.mem.swap(u8, &buffer[left], &buffer[right]);
        left += 1;
    }
}` },
  { category: "algorithms", title: "Sort descending", code: `fn sortDescending(values: []i32) void {
    std.mem.sort(i32, values, {}, std.sort.desc(i32));
}` }
]);

window.registerSnippets("Zig", [
  { title: "Tagged union area", code: `const Shape = union(enum) {
    circle: f64,
    rectangle: struct { width: f64, height: f64 },

    fn area(self: Shape) f64 {
        return switch (self) {
            .circle => |radius| std.math.pi * radius * radius,
            .rectangle => |r| r.width * r.height,
        };
    }
};` },
  { title: "Enum with method", code: `const Direction = enum {
    north,
    east,
    south,
    west,

    fn turnRight(self: Direction) Direction {
        return switch (self) {
            .north => .east,
            .east => .south,
            .south => .west,
            .west => .north,
        };
    }
};` },
  { title: "Vector struct", code: `const Vec2 = struct {
    x: f32,
    y: f32,

    fn add(self: Vec2, other: Vec2) Vec2 {
        return .{ .x = self.x + other.x, .y = self.y + other.y };
    }

    fn length(self: Vec2) f32 {
        return @sqrt(self.x * self.x + self.y * self.y);
    }
};` },
  { title: "Custom iterator", code: `const Range = struct {
    current: usize,
    end: usize,

    fn next(self: *Range) ?usize {
        if (self.current >= self.end) return null;
        defer self.current += 1;
        return self.current;
    }
};` },
  { title: "Sort with context", code: `fn sortByAge(people: []Person) void {
    std.mem.sort(Person, people, {}, struct {
        fn lessThan(_: void, a: Person, b: Person) bool {
            return a.age < b.age;
        }
    }.lessThan);
}` },
  { title: "Format into buffer", code: `fn label(buffer: []u8, id: u32, name: []const u8) ![]u8 {
    return std.fmt.bufPrint(buffer, "#{d} {s}", .{ id, name });
}` },
  { title: "Allocate formatted string", code: `fn greeting(allocator: std.mem.Allocator, name: []const u8) ![]u8 {
    return std.fmt.allocPrint(allocator, "Hello, {s}!", .{name});
}` },
  { title: "Duplicate slice", code: `fn duplicate(allocator: std.mem.Allocator, source: []const u8) ![]u8 {
    const copy = try allocator.alloc(u8, source.len);
    @memcpy(copy, source);
    return copy;
}` },
  { title: "Split into lines", code: `fn printLines(text: []const u8) void {
    var it = std.mem.splitScalar(u8, text, '\\n');
    while (it.next()) |line| {
        std.debug.print("> {s}\\n", .{line});
    }
}` },
  { title: "Config with defaults", code: `const Config = struct {
    port: u16 = 8080,
    log_level: []const u8 = "info",
    timeout_ms: u32 = 15000,
};

fn loadConfig(port: ?u16) Config {
    var config = Config{};
    if (port) |value| config.port = value;
    return config;
}` },
  { title: "Handle error by tag", code: `fn run(path: []const u8) void {
    const data = readConfig(path) catch |err| switch (err) {
        error.FileNotFound => {
            std.debug.print("missing config\\n", .{});
            return;
        },
        else => unreachable,
    };
    apply(data);
}` },
  { title: "Generic max", code: `fn maxOf(comptime T: type, values: []const T) ?T {
    if (values.len == 0) return null;

    var best = values[0];
    for (values[1..]) |value| {
        if (value > best) best = value;
    }

    return best;
}` },
  { title: "Packed permission flags", code: `const Permissions = packed struct {
    read: bool = false,
    write: bool = false,
    execute: bool = false,
};

fn canWrite(perms: Permissions) bool {
    return perms.write;
}` },
  { title: "Scoped timer with defer", code: `fn process(items: []const Item) !void {
    var timer = try std.time.Timer.start();
    defer std.debug.print("took {d}ns\\n", .{timer.read()});

    for (items) |item| {
        try handle(item);
    }
}` },
  { title: "Copy file", code: `fn copyFile(allocator: std.mem.Allocator, src: []const u8, dst: []const u8) !void {
    const input = try std.fs.cwd().openFile(src, .{});
    defer input.close();

    const output = try std.fs.cwd().createFile(dst, .{});
    defer output.close();

    const data = try input.readToEndAlloc(allocator, std.math.maxInt(usize));
    defer allocator.free(data);

    try output.writeAll(data);
}` },
  { title: "Builder copy-on-write", code: `const QueryBuilder = struct {
    table: []const u8,
    limit: usize = 0,

    fn take(self: QueryBuilder, n: usize) QueryBuilder {
        var copy = self;
        copy.limit = n;
        return copy;
    }
};` },
  { title: "Generic pair factory", code: `fn Pair(comptime A: type, comptime B: type) type {
    return struct {
        first: A,
        second: B,
    };
}` },
  { title: "Sum anytype values", code: `fn sum(values: anytype) @TypeOf(values[0]) {
    var total: @TypeOf(values[0]) = 0;
    for (values) |value| total += value;
    return total;
}` },
  { title: "First matching value", code: `fn firstEven(values: []const i32) ?i32 {
    for (values) |value| {
        if (@mod(value, 2) == 0) return value;
    }
    return null;
}` }
]);

window.registerSnippets("Zig", [
  { category: "algorithms", title: "Unit test", code: `test "lowerBound finds insertion point" {
    const nums = [_]i32{ 1, 3, 5, 7 };
    try std.testing.expectEqual(@as(usize, 2), lowerBound(&nums, 4));
    try std.testing.expectEqual(@as(usize, 0), lowerBound(&nums, 0));
}` },
  { category: "algorithms", title: "Count set bits", code: `fn hammingWeight(value: u64) u32 {
    return @popCount(value);
}` },
  { category: "algorithms", title: "Factorial", code: `fn factorial(n: u6) u64 {
    var result: u64 = 1;
    var i: u6 = 2;

    while (i <= n) : (i += 1) {
        result *= i;
    }

    return result;
}` },
  { category: "algorithms", title: "Move zeroes", code: `fn moveZeroes(nums: []i32) void {
    var write: usize = 0;

    for (nums) |value| {
        if (value != 0) {
            nums[write] = value;
            write += 1;
        }
    }

    while (write < nums.len) : (write += 1) {
        nums[write] = 0;
    }
}` },
  { category: "algorithms", title: "Binary tree depth", code: `const TreeNode = struct {
    value: i32,
    left: ?*TreeNode = null,
    right: ?*TreeNode = null,
};

fn maxDepth(root: ?*TreeNode) u32 {
    const node = root orelse return 0;
    return 1 + @max(maxDepth(node.left), maxDepth(node.right));
}` },
  { category: "algorithms", title: "Breadth first search", code: `fn bfs(allocator: std.mem.Allocator, graph: []const []const usize, start: usize) !std.ArrayList(usize) {
    var order = std.ArrayList(usize).init(allocator);
    errdefer order.deinit();

    var queue = std.fifo.LinearFifo(usize, .Dynamic).init(allocator);
    defer queue.deinit();

    const seen = try allocator.alloc(bool, graph.len);
    defer allocator.free(seen);
    @memset(seen, false);

    seen[start] = true;
    try queue.writeItem(start);

    while (queue.readItem()) |node| {
        try order.append(node);
        for (graph[node]) |next| {
            if (!seen[next]) {
                seen[next] = true;
                try queue.writeItem(next);
            }
        }
    }

    return order;
}` }
]);

window.registerSnippets("Zig", [
  { title: "Arena allocator scope", code: `fn renderPage(parent: std.mem.Allocator, page: Page) ![]u8 {
    var arena = std.heap.ArenaAllocator.init(parent);
    defer arena.deinit();
    const allocator = arena.allocator();

    const header = try std.fmt.allocPrint(allocator, "<h1>{s}</h1>", .{page.title});
    const body = try renderBody(allocator, page);

    return std.mem.concat(parent, u8, &.{ header, body });
}` },
  { title: "Optional chaining with orelse", code: `fn displayName(user: ?User) []const u8 {
    const account = user orelse return "guest";
    return account.nickname orelse account.email;
}` },
  { title: "Build string with writer", code: `fn joinPath(allocator: std.mem.Allocator, parts: []const []const u8) ![]u8 {
    var builder = std.ArrayList(u8).init(allocator);
    errdefer builder.deinit();

    for (parts, 0..) |part, index| {
        if (index != 0) try builder.append('/');
        try builder.appendSlice(part);
    }

    return builder.toOwnedSlice();
}` },
  { title: "Compile-time lookup table", code: `fn squares(comptime n: usize) [n]u32 {
    var table: [n]u32 = undefined;
    comptime var i: usize = 0;
    inline while (i < n) : (i += 1) {
        table[i] = i * i;
    }
    return table;
}` }
]);
