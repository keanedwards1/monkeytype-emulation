const snippets = window.CODE_SNIPPETS ?? [
  {
    language: "JavaScript",
    title: "Debounced search",
    code: `function debounce(callback, wait = 250) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), wait);
  };
}

const search = debounce((term) => {
  console.log("searching for", term.trim());
});`
  },
  {
    language: "JavaScript",
    title: "Array grouping",
    code: `const grouped = orders.reduce((result, order) => {
  const key = order.status;

  if (!result[key]) {
    result[key] = [];
  }

  result[key].push(order);
  return result;
}, {});`
  },
  {
    language: "TypeScript",
    title: "Typed fetch helper",
    code: `type ApiResult<T> = {
  data: T;
  receivedAt: string;
};

async function getJson<T>(url: string): Promise<ApiResult<T>> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(\`Request failed: \${response.status}\`);
  }

  return {
    data: await response.json(),
    receivedAt: new Date().toISOString()
  };
}`
  },
  {
    language: "Python",
    title: "Frequency counter",
    code: `from collections import Counter

def most_common_words(lines, limit=10):
    words = []

    for line in lines:
        words.extend(token.lower() for token in line.split())

    counts = Counter(words)
    return counts.most_common(limit)`
  },
  {
    language: "Python",
    title: "Context manager",
    code: `from contextlib import contextmanager
from time import perf_counter

@contextmanager
def timer(label):
    start = perf_counter()
    try:
        yield
    finally:
        elapsed = perf_counter() - start
        print(f"{label}: {elapsed:.3f}s")`
  },
  {
    language: "Go",
    title: "Worker pool",
    code: `func worker(id int, jobs <-chan Job, results chan<- Result) {
  for job := range jobs {
    result, err := process(job)
    results <- Result{
      WorkerID: id,
      Value:    result,
      Err:      err,
    }
  }
}`
  },
  {
    language: "Rust",
    title: "Parse config",
    code: `fn parse_port(value: Option<&str>) -> Result<u16, String> {
    let raw = value.unwrap_or("8080");

    raw.parse::<u16>()
        .map_err(|_| format!("invalid port: {}", raw))
        .and_then(|port| {
            if port == 0 {
                Err("port must be greater than zero".into())
            } else {
                Ok(port)
            }
        })
}`
  },
  {
    language: "SQL",
    title: "Recent customer orders",
    code: `select
  c.customer_id,
  c.email,
  count(o.order_id) as order_count,
  max(o.created_at) as last_order_at
from customers c
join orders o on o.customer_id = c.customer_id
where o.created_at >= current_date - interval '30 days'
group by c.customer_id, c.email
order by last_order_at desc;`
  },
  {
    language: "C#",
    title: "LINQ projection",
    code: `var activeUsers = users
    .Where(user => user.IsActive)
    .OrderBy(user => user.LastName)
    .Select(user => new UserSummary
    {
        Id = user.Id,
        Name = $"{user.FirstName} {user.LastName}",
        Email = user.Email
    })
    .ToList();`
  },
  {
    language: "HTML",
    title: "Accessible form",
    code: `<form class="signup-form" action="/subscribe" method="post">
  <label for="email">Email address</label>
  <input id="email" name="email" type="email" autocomplete="email" required>
  <button type="submit">Join waitlist</button>
</form>`
  },
  {
    language: "CSS",
    title: "Responsive grid",
    code: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}

.gallery img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 8px;
}`
  }
];

const state = {
  snippet: snippets[0],
  typed: "",
  started: false,
  finished: false,
  duration: 0,
  remaining: 0,
  timerId: null,
  startedAt: null,
  autoAdvanceId: null,
  lineHeight: 52.8,
  firstVisibleLine: 0
};

const languageSelect = document.querySelector("#languageSelect");
const practiceModeSelect = document.querySelector("#practiceModeSelect");
const durationSelect = document.querySelector("#durationSelect");
const lineModeSelect = document.querySelector("#lineModeSelect");
const punctuationToggle = document.querySelector("#punctuationToggle");
const snippetViewport = document.querySelector("#snippetViewport");
const snippetDisplay = document.querySelector("#snippetDisplay");
const typingCaret = document.querySelector("#typingCaret");
const typingInput = document.querySelector("#typingInput");
const restartBtn = document.querySelector("#restartBtn");
const nextBtn = document.querySelector("#nextBtn");
const practiceNextBtn = document.querySelector("#practiceNextBtn");
const practiceActions = document.querySelector("#practiceActions");
const resultPanel = document.querySelector("#resultPanel");
const resultText = document.querySelector("#resultText");
const resultStats = document.querySelector("#resultStats");
const wpmStat = document.querySelector("#wpmStat");
const accuracyStat = document.querySelector("#accuracyStat");
const timeStat = document.querySelector("#timeStat");
const errorStat = document.querySelector("#errorStat");

function uniqueLanguages() {
  return [...new Set(snippetsForMode().map((snippet) => snippet.language))].sort();
}

function snippetsForMode() {
  if (practiceModeSelect.value === "all") {
    return snippets;
  }

  return snippets.filter((snippet) => snippet.category === practiceModeSelect.value);
}

function codeForPractice(snippet = state.snippet) {
  if (punctuationToggle.checked) {
    return snippet.code;
  }

  return snippet.code
    .replace(/[^\w\s]/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*/g, "\n")
    .trim();
}

function populateLanguages() {
  const previousLanguage = languageSelect.value;
  languageSelect.innerHTML = "";
  const languages = uniqueLanguages();

  for (const language of languages) {
    const option = document.createElement("option");
    option.value = language;
    option.textContent = language;
    languageSelect.append(option);
  }

  if (languages.includes(previousLanguage)) {
    languageSelect.value = previousLanguage;
  }
}

function populateSnippets() {
  selectRandomSnippet();
}

function snippetsForCurrentLanguage() {
  return snippetsForMode().filter((snippet) => snippet.language === languageSelect.value);
}

function selectSnippet(snippet) {
  state.snippet = snippet;
}

function selectRandomSnippet() {
  const languageSnippets = snippetsForCurrentLanguage();
  const choices = languageSnippets.filter((snippet) => snippet !== state.snippet);
  const pool = choices.length > 0 ? choices : languageSnippets;
  const randomIndex = Math.floor(Math.random() * pool.length);

  if (pool.length === 0) {
    return;
  }

  selectSnippet(pool[randomIndex]);
}

function escapeHtml(character) {
  return character
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function currentLineIndex(text) {
  return text.slice(0, state.typed.length).split("\n").length - 1;
}

function visibleLineCount() {
  return lineModeSelect.value === "all" ? Infinity : Number(lineModeSelect.value);
}

function syncSnippetViewport() {
  const visibleLines = visibleLineCount();
  const target = codeForPractice();
  const totalLines = target.split("\n").length;
  const viewportLines = Number.isFinite(visibleLines)
    ? Math.min(visibleLines, totalLines)
    : totalLines;
  const activeLine = currentLineIndex(target);
  const firstVisibleLine = Number.isFinite(visibleLines)
    ? Math.max(0, Math.min(activeLine - Math.floor(visibleLines / 2), totalLines - visibleLines))
    : 0;

  snippetViewport.style.setProperty("--visible-lines", String(viewportLines));
  snippetViewport.dataset.firstVisibleLine = String(firstVisibleLine);
  snippetDisplay.style.transform = "translateY(0)";

  return { firstVisibleLine, viewportLines };
}

function lineRanges(target) {
  const ranges = [];
  let start = 0;

  for (let index = 0; index <= target.length; index += 1) {
    if (target[index] === "\n" || index === target.length) {
      ranges.push({ start, end: index });
      start = index + 1;
    }
  }

  return ranges;
}

function syncCaret() {
  const current = snippetDisplay.querySelector(".current");

  if (!current || state.finished || resultPanel.hidden === false) {
    typingCaret.hidden = true;
    return;
  }

  const viewportRect = snippetViewport.getBoundingClientRect();
  const currentRect = current.getBoundingClientRect();

  typingCaret.hidden = false;
  typingCaret.style.left = `${currentRect.left - viewportRect.left - 1}px`;
  typingCaret.style.top = `${currentRect.top - viewportRect.top + currentRect.height * 0.12}px`;
  typingCaret.style.height = `${currentRect.height * 0.76}px`;
}

function renderSnippet() {
  const target = codeForPractice();
  const typed = state.typed;
  const { firstVisibleLine, viewportLines } = syncSnippetViewport();
  const lineDelta = firstVisibleLine - state.firstVisibleLine;
  const isLineChange = lineDelta !== 0;
  const ranges = lineRanges(target);
  const visibleRanges = ranges.slice(firstVisibleLine, firstVisibleLine + viewportLines);
  let markup = "";

  for (const range of visibleRanges) {
    let currentLine = "";

    for (let index = range.start; index < range.end; index += 1) {
      const expected = target[index];
      const actual = typed[index];
      let className = "";

      if (actual == null && index === typed.length && !state.finished) {
        className = "current";
      } else if (actual == null) {
        className = "";
      } else if (actual === expected) {
        className = "typed";
      } else {
        className = "wrong";
      }

      currentLine += className
        ? `<span class="${className}">${escapeHtml(expected)}</span>`
        : escapeHtml(expected);
    }

    if (typed.length === range.end && !state.finished) {
      currentLine += `<span class="current cursor-anchor"></span>`;
    }

    markup += `<span class="snippet-line">${currentLine}</span>`;
  }

  if (isLineChange) {
    snippetDisplay.style.setProperty("--scroll-direction", String(Math.sign(lineDelta)));
    snippetDisplay.classList.add("scroll-out");
    requestAnimationFrame(() => {
      snippetDisplay.innerHTML = markup;
      snippetDisplay.classList.remove("scroll-out");
      snippetDisplay.classList.add("scroll-in");

      requestAnimationFrame(() => {
        snippetDisplay.classList.remove("scroll-in");
        syncCaret();
      });
    });
  } else {
    snippetDisplay.innerHTML = markup;
  }

  state.firstVisibleLine = firstVisibleLine;
  requestAnimationFrame(syncCaret);
}

function syncLineHeight() {
  const style = getComputedStyle(snippetDisplay);
  const lineHeight = parseFloat(style.lineHeight);

  if (Number.isFinite(lineHeight)) {
    state.lineHeight = lineHeight;
    document.documentElement.style.setProperty("--line-height", `${lineHeight}px`);
  }
}

function countErrors() {
  const target = codeForPractice();
  let errors = 0;

  for (let index = 0; index < state.typed.length; index += 1) {
    if (state.typed[index] !== target[index]) {
      errors += 1;
    }
  }

  return errors;
}

function calculateStats() {
  const elapsedSeconds = state.startedAt
    ? Math.max(1, (Date.now() - state.startedAt) / 1000)
    : 1;
  const typedChars = state.typed.length;
  const errors = countErrors();
  const correctChars = Math.max(0, typedChars - errors);
  const wpm = Math.round((correctChars / 5) / (elapsedSeconds / 60));
  const accuracy = typedChars === 0 ? 100 : Math.round((correctChars / typedChars) * 100);

  return { wpm, accuracy, errors, elapsedSeconds: Math.round(elapsedSeconds) };
}

function renderStats() {
  const { wpm, accuracy, errors } = calculateStats();
  wpmStat.textContent = String(wpm);
  accuracyStat.textContent = `${accuracy}%`;
  timeStat.textContent = state.duration === 0 && state.startedAt
    ? String(Math.floor((Date.now() - state.startedAt) / 1000))
    : state.duration === 0
      ? "0"
      : String(state.remaining);
  errorStat.textContent = String(errors);
  document.body.classList.toggle("is-typing", state.started && !state.finished);
}

function renderResultStats() {
  const { wpm, accuracy, errors, elapsedSeconds } = calculateStats();
  const stats = [
    ["wpm", wpm],
    ["accuracy", `${accuracy}%`],
    ["time", `${elapsedSeconds}s`],
    ["errors", errors]
  ];

  resultStats.innerHTML = stats
    .map(([label, value]) => `<div class="result-stat"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
}

function finishTest(advanceAfterFinish = false) {
  if (state.finished) {
    return;
  }

  state.finished = true;
  clearInterval(state.timerId);
  typingInput.disabled = true;
  renderSnippet();
  renderStats();
  renderResultStats();

  resultText.textContent = `${state.snippet.language} - ${state.snippet.title}`;
  resultPanel.hidden = false;
  practiceActions.hidden = true;

  if (advanceAfterFinish) {
    state.autoAdvanceId = setTimeout(() => {
      selectRandomSnippet();
      resetTest();
    }, 1200);
  }
}

function startTimer() {
  state.started = true;
  state.startedAt = Date.now();

  if (state.duration === 0) {
    state.timerId = setInterval(renderStats, 1000);
    return;
  }

  state.timerId = setInterval(() => {
    state.remaining -= 1;
    renderStats();

    if (state.remaining <= 0) {
      finishTest();
    }
  }, 1000);
}

function resetTest(focusInput = true) {
  clearInterval(state.timerId);
  clearTimeout(state.autoAdvanceId);
  state.typed = "";
  state.started = false;
  state.finished = false;
  state.duration = Number(durationSelect.value);
  state.remaining = state.duration;
  state.timerId = null;
  state.startedAt = null;
  state.autoAdvanceId = null;
  state.firstVisibleLine = 0;
  typingInput.value = "";
  typingInput.disabled = false;
  typingCaret.hidden = false;
  resultPanel.hidden = true;
  practiceActions.hidden = false;
  renderSnippet();
  renderStats();

  if (focusInput) {
    typingInput.focus();
  }
}

function shouldCaptureTyping(event) {
  const activeElement = document.activeElement;
  const isEditable = activeElement?.matches?.("input, textarea, select, button, [contenteditable='true']");

  return !event.ctrlKey
    && !event.metaKey
    && !event.altKey
    && event.key.length === 1
    && activeElement !== typingInput
    && !isEditable
    && !state.finished;
}

function moveToNextSnippet() {
  selectRandomSnippet();
  resetTest();
}

typingInput.addEventListener("input", () => {
  const target = codeForPractice();

  if (!state.started) {
    startTimer();
  }

  state.typed = typingInput.value.slice(0, target.length);
  typingInput.value = state.typed;
  renderSnippet();
  renderStats();

  if (state.typed.length === target.length) {
    finishTest();
  }
});

languageSelect.addEventListener("change", () => {
  populateSnippets();
  resetTest();
});

practiceModeSelect.addEventListener("change", () => {
  populateLanguages();
  populateSnippets();
  resetTest();
});

durationSelect.addEventListener("change", () => resetTest());
lineModeSelect.addEventListener("change", () => resetTest());
punctuationToggle.addEventListener("change", () => resetTest());
restartBtn.addEventListener("click", () => resetTest());
nextBtn.addEventListener("click", moveToNextSnippet);
practiceNextBtn.addEventListener("click", moveToNextSnippet);

document.addEventListener("keydown", (event) => {
  if (!resultPanel.hidden && event.key === "Tab") {
    event.preventDefault();
    nextBtn.focus();
    return;
  }

  if (shouldCaptureTyping(event)) {
    typingInput.focus();
  }

  if (event.key === "Enter" && document.activeElement === typingInput) {
    const target = codeForPractice();
    const start = typingInput.selectionStart;
    const end = typingInput.selectionEnd;

    if (start === end && target[start] === "\n") {
      event.preventDefault();
      let nextIndex = start + 1;

      while (target[nextIndex] === " " || target[nextIndex] === "\t") {
        nextIndex += 1;
      }

      typingInput.value = `${typingInput.value.slice(0, start)}${target.slice(start, nextIndex)}${typingInput.value.slice(end)}`;
      typingInput.selectionStart = typingInput.selectionEnd = nextIndex;
      typingInput.dispatchEvent(new Event("input"));
    }
  }

  if (event.key === "Tab" && document.activeElement === typingInput) {
    event.preventDefault();
    const start = typingInput.selectionStart;
    const end = typingInput.selectionEnd;
    typingInput.value = `${typingInput.value.slice(0, start)}  ${typingInput.value.slice(end)}`;
    typingInput.selectionStart = typingInput.selectionEnd = start + 2;
    typingInput.dispatchEvent(new Event("input"));
  }

  if (event.key === "Escape") {
    resetTest();
  }
});

populateLanguages();
populateSnippets();
syncLineHeight();
resetTest(false);

window.addEventListener("resize", () => {
  syncLineHeight();
  syncSnippetViewport();
  syncCaret();
});
