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

function shuffleItems(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
  }

  return items;
}

shuffleItems(snippets);

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
  firstVisibleLine: 0,
  horizontalOffset: 0,
  samples: [],
  recentSnippets: [],
  snippetQueue: [],
  snippetQueueKey: ""
};

const languageSelect = document.querySelector("#languageSelect");
const practiceModeSelect = document.querySelector("#practiceModeSelect");
const lengthSelect = document.querySelector("#lengthSelect");
const durationSelect = document.querySelector("#durationSelect");
const lineModeSelect = document.querySelector("#lineModeSelect");
const punctuationToggle = document.querySelector("#punctuationToggle");
const randomLanguageToggle = document.querySelector("#randomLanguageToggle");
const snippetViewport = document.querySelector("#snippetViewport");
const snippetDisplay = document.querySelector("#snippetDisplay");
const typingCaret = document.querySelector("#typingCaret");
const typingInput = document.querySelector("#typingInput");
const restartBtn = document.querySelector("#restartBtn");
const nextBtn = document.querySelector("#nextBtn");
const practiceNextBtn = document.querySelector("#practiceNextBtn");
const practiceActions = document.querySelector("#practiceActions");
const resultActions = document.querySelector(".result-actions");
const resultPanel = document.querySelector("#resultPanel");
const resultText = document.querySelector("#resultText");
const resultStats = document.querySelector("#resultStats");
const resultChart = document.querySelector("#resultChart");
const resultDetails = document.querySelector("#resultDetails");
const wpmStat = document.querySelector("#wpmStat");
const accuracyStat = document.querySelector("#accuracyStat");
const timeStat = document.querySelector("#timeStat");
const errorStat = document.querySelector("#errorStat");
const LANGUAGE_RELOAD_MODE_KEY = "codeType.languageReloadMode";
const SAVED_LANGUAGE_KEY = "codeType.savedLanguage";
const lengthBreakpointsByLanguage = snippets.reduce((breakpoints, snippet) => {
  breakpoints[snippet.language] ??= [];
  breakpoints[snippet.language].push(snippet.code.length);
  return breakpoints;
}, {});

for (const [language, lengths] of Object.entries(lengthBreakpointsByLanguage)) {
  lengths.sort((left, right) => left - right);
  lengthBreakpointsByLanguage[language] = {
    shortMax: lengths[Math.floor(lengths.length / 3)] ?? 0,
    mediumMax: lengths[Math.floor((lengths.length * 2) / 3)] ?? Infinity
  };
}

function uniqueLanguages() {
  return [...new Set(snippetsForFilters().map((snippet) => snippet.language))].sort();
}

function snippetsForMode() {
  if (practiceModeSelect.value === "all") {
    return snippets;
  }

  return snippets.filter((snippet) => snippet.category === practiceModeSelect.value);
}

function snippetLengthCategory(snippet) {
  const breakpoints = lengthBreakpointsByLanguage[snippet.language];

  if (snippet.code.length <= breakpoints.shortMax) {
    return "short";
  }

  if (snippet.code.length <= breakpoints.mediumMax) {
    return "medium";
  }

  return "long";
}

function snippetsForFilters() {
  const modeSnippets = snippetsForMode();

  if (lengthSelect.value === "all") {
    return modeSnippets;
  }

  return modeSnippets.filter((snippet) => snippetLengthCategory(snippet) === lengthSelect.value);
}

function loadSetting(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function saveSetting(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures so private browsing still works normally.
  }
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

function selectRandomLanguage() {
  const options = [...languageSelect.options];

  if (options.length === 0) {
    return;
  }

  languageSelect.value = options[Math.floor(Math.random() * options.length)].value;
}

function restoreSavedLanguage() {
  const savedLanguage = loadSetting(SAVED_LANGUAGE_KEY);
  const option = [...languageSelect.options].find((item) => item.value === savedLanguage);

  if (!option) {
    return false;
  }

  languageSelect.value = option.value;
  return true;
}

function populateSnippets() {
  startShuffledSnippetPlaylist();
}

function snippetsForCurrentLanguage() {
  return snippetsForFilters().filter((snippet) => snippet.language === languageSelect.value);
}

function shuffledSnippetQueue(snippetPool) {
  return shuffleItems([...snippetPool]);
}

function selectRandomAvailableSnippet() {
  const choices = snippetsForFilters();

  if (choices.length === 0) {
    return false;
  }

  const snippet = choices[Math.floor(Math.random() * choices.length)];
  languageSelect.value = snippet.language;
  selectSnippet(snippet);

  state.snippetQueueKey = currentSnippetQueueKey();
  state.snippetQueue = shuffledSnippetQueue(snippetsForCurrentLanguage())
    .filter((item) => item !== snippet);

  return true;
}

function initializeLanguagePreference() {
  const reloadMode = loadSetting(LANGUAGE_RELOAD_MODE_KEY);
  randomLanguageToggle.checked = reloadMode !== "same";
  let selectedSnippet = false;

  if (randomLanguageToggle.checked || !restoreSavedLanguage()) {
    selectedSnippet = selectRandomAvailableSnippet();
  }

  saveSetting(SAVED_LANGUAGE_KEY, languageSelect.value);
  return selectedSnippet;
}

function currentSnippetQueueKey() {
  return [
    languageSelect.value,
    practiceModeSelect.value,
    lengthSelect.value
  ].join("|");
}

function selectSnippet(snippet) {
  state.snippet = snippet;
  state.recentSnippets = [snippet, ...state.recentSnippets.filter((item) => item !== snippet)].slice(0, 4);
}

function resetSnippetQueue() {
  state.snippetQueue = [];
  state.snippetQueueKey = "";
}

function startShuffledSnippetPlaylist() {
  const languageSnippets = snippetsForCurrentLanguage();

  if (languageSnippets.length === 0) {
    return;
  }

  const queue = shuffledSnippetQueue(languageSnippets);
  const first = queue.shift();

  selectSnippet(first);
  state.snippetQueue = queue;
  state.snippetQueueKey = currentSnippetQueueKey();
}

function selectRandomSnippet() {
  const languageSnippets = snippetsForCurrentLanguage();
  const queueKey = currentSnippetQueueKey();

  if (languageSnippets.length === 0) {
    return;
  }

  if (state.snippetQueueKey !== queueKey || state.snippetQueue.length === 0) {
    state.snippetQueue = shuffledSnippetQueue(languageSnippets);
    state.snippetQueueKey = queueKey;
  }

  if (state.snippetQueue[0] === state.snippet && state.snippetQueue.length > 1) {
    state.snippetQueue.push(state.snippetQueue.shift());
  }

  selectSnippet(state.snippetQueue.shift());
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
  const linesBelow = Number.isFinite(visibleLines)
    ? Math.max(0, totalLines - firstVisibleLine - viewportLines)
    : 0;
  const hasMoreBelow = linesBelow > 0;

  snippetViewport.style.setProperty("--visible-lines", String(viewportLines));
  snippetViewport.dataset.firstVisibleLine = String(firstVisibleLine);
  snippetViewport.dataset.moreBelow = String(hasMoreBelow);
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
  const currentLine = current.closest(".snippet-line");
  let nextOffset = 0;
  let caretLeft = currentRect.left - viewportRect.left - 1;

  if (currentLine) {
    const lineWidth = currentLine.scrollWidth;
    const viewportWidth = viewportRect.width;
    const maxOffset = Math.max(0, lineWidth - viewportWidth);
    const cursorXInLine = current.offsetLeft;

    if (maxOffset > 0) {
      const thirdRegionStart = viewportWidth * (2 / 3);
      nextOffset = Math.max(0, Math.min(cursorXInLine - thirdRegionStart, maxOffset));
    }

    caretLeft = cursorXInLine - nextOffset - 1;
  }

  if (Math.abs(nextOffset - state.horizontalOffset) > 0.5) {
    state.horizontalOffset = nextOffset;
    snippetViewport.style.setProperty("--x-offset", `${nextOffset}px`);
  }

  typingCaret.hidden = false;
  typingCaret.style.left = `${caretLeft}px`;
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
  const nextRange = ranges[firstVisibleLine + viewportLines];
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
        className = expected === " " || expected === "\t" ? "wrong-empty" : "wrong";
      }

      currentLine += className
        ? `<span class="${className}">${escapeHtml(expected)}</span>`
        : escapeHtml(expected);
    }

    if (target[range.end] === "\n" && typed[range.end] != null && typed[range.end] !== "\n") {
      currentLine += `<span class="wrong-empty wrong-empty-eol"></span>`;
    }

    if (typed.length === range.end && !state.finished) {
      currentLine += `<span class="current cursor-anchor"></span>`;
    }

    markup += `<span class="snippet-line">${currentLine}</span>`;
  }

  if (nextRange) {
    const nextLine = target
      .slice(nextRange.start, nextRange.end)
      .split("")
      .map(escapeHtml)
      .join("");

    markup += `<span class="snippet-next-line" aria-hidden="true">${nextLine}</span>`;
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
  const rawWpm = Math.round((typedChars / 5) / (elapsedSeconds / 60));
  const accuracy = typedChars === 0 ? 100 : Math.round((correctChars / typedChars) * 100);

  return {
    wpm,
    rawWpm,
    accuracy,
    errors,
    correctChars,
    typedChars,
    elapsedSeconds: Math.round(elapsedSeconds)
  };
}

function recordSample() {
  if (!state.startedAt) {
    return;
  }

  const { wpm, rawWpm, accuracy, errors, elapsedSeconds } = calculateStats();
  const lastSample = state.samples[state.samples.length - 1];

  if (lastSample && lastSample.time === elapsedSeconds) {
    state.samples[state.samples.length - 1] = { time: elapsedSeconds, wpm, rawWpm, accuracy, errors };
    return;
  }

  state.samples.push({ time: elapsedSeconds, wpm, rawWpm, accuracy, errors });
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

function consistencyFromSamples() {
  const values = state.samples.map((sample) => sample.wpm).filter((value) => value > 0);

  if (values.length < 2) {
    return 100;
  }

  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance = values.reduce((sum, value) => sum + ((value - average) ** 2), 0) / values.length;
  const standardDeviation = Math.sqrt(variance);

  return Math.max(0, Math.round(100 - ((standardDeviation / Math.max(average, 1)) * 100)));
}

function renderResultStats() {
  const { wpm, rawWpm, accuracy, errors, elapsedSeconds } = calculateStats();
  const stats = [
    ["wpm", wpm],
    ["raw", rawWpm],
    ["accuracy", `${accuracy}%`],
    ["time", `${elapsedSeconds}s`]
  ];

  resultStats.innerHTML = stats
    .map(([label, value]) => `<div class="result-stat"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
}

function renderResultChart() {
  const samples = state.samples.length > 0
    ? state.samples
    : [{ time: 0, wpm: 0, rawWpm: 0, accuracy: 100, errors: 0 }];
  const width = 720;
  const height = 220;
  const padding = 28;
  const maxTime = Math.max(...samples.map((sample) => sample.time), 1);
  const maxWpm = Math.max(...samples.map((sample) => sample.rawWpm), ...samples.map((sample) => sample.wpm), 10);
  const scaleX = (time) => padding + ((time / maxTime) * (width - padding * 2));
  const scaleY = (wpm) => height - padding - ((wpm / maxWpm) * (height - padding * 2));
  const pathFor = (key) => samples
    .map((sample, index) => `${index === 0 ? "M" : "L"} ${scaleX(sample.time).toFixed(1)} ${scaleY(sample[key]).toFixed(1)}`)
    .join(" ");

  resultChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="WPM over time">
      <line class="chart-axis" x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}"></line>
      <line class="chart-axis" x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}"></line>
      <path class="chart-line chart-raw" d="${pathFor("rawWpm")}"></path>
      <path class="chart-line chart-wpm" d="${pathFor("wpm")}"></path>
      ${samples.map((sample) => `<circle class="chart-dot" cx="${scaleX(sample.time).toFixed(1)}" cy="${scaleY(sample.wpm).toFixed(1)}" r="3"></circle>`).join("")}
    </svg>
    <div class="chart-legend">
      <span><i class="legend-wpm"></i>wpm</span>
      <span><i class="legend-raw"></i>raw</span>
    </div>
  `;
}

function renderResultDetails() {
  const { correctChars, typedChars, errors } = calculateStats();
  const target = codeForPractice();
  const details = [
    ["characters", `${correctChars}/${typedChars}/${target.length}`],
    ["incorrect", errors],
    ["consistency", `${consistencyFromSamples()}%`],
    ["mode", practiceModeSelect.options[practiceModeSelect.selectedIndex].textContent],
    ["language", state.snippet.language],
    ["snippet", state.snippet.title]
  ];

  resultDetails.innerHTML = details
    .map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
}

function finishTest(advanceAfterFinish = false) {
  if (state.finished) {
    return;
  }

  state.finished = true;
  clearInterval(state.timerId);
  typingInput.disabled = true;
  recordSample();
  renderSnippet();
  renderStats();
  renderResultStats();
  renderResultChart();
  renderResultDetails();

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
    state.timerId = setInterval(() => {
      recordSample();
      renderStats();
    }, 1000);
    return;
  }

  state.timerId = setInterval(() => {
    state.remaining -= 1;
    recordSample();
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
  state.horizontalOffset = 0;
  state.samples = [];
  snippetViewport.style.setProperty("--x-offset", "0px");
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
  const isControl = activeElement?.matches?.("select, input[type='checkbox'], input[type='radio'], [contenteditable='true']");
  const isTextField = activeElement?.matches?.("input:not([type]), input[type='text'], input[type='search'], textarea");

  return !event.ctrlKey
    && !event.metaKey
    && !event.altKey
    && event.key.length === 1
    && activeElement !== typingInput
    && !isControl
    && !isTextField
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
  recordSample();
  renderSnippet();
  renderStats();

  if (state.typed.length === target.length) {
    finishTest();
  }
});

languageSelect.addEventListener("change", () => {
  saveSetting(SAVED_LANGUAGE_KEY, languageSelect.value);
  resetSnippetQueue();
  populateSnippets();
  resetTest();
});

practiceModeSelect.addEventListener("change", () => {
  populateLanguages();
  saveSetting(SAVED_LANGUAGE_KEY, languageSelect.value);
  resetSnippetQueue();
  populateSnippets();
  resetTest();
});

lengthSelect.addEventListener("change", () => {
  populateLanguages();
  saveSetting(SAVED_LANGUAGE_KEY, languageSelect.value);
  resetSnippetQueue();
  populateSnippets();
  resetTest();
});

durationSelect.addEventListener("change", () => resetTest());
lineModeSelect.addEventListener("change", () => resetTest());
punctuationToggle.addEventListener("change", () => resetTest());
randomLanguageToggle.addEventListener("change", () => {
  saveSetting(LANGUAGE_RELOAD_MODE_KEY, randomLanguageToggle.checked ? "random" : "same");
  saveSetting(SAVED_LANGUAGE_KEY, languageSelect.value);
});
restartBtn.addEventListener("click", () => resetTest());
resultActions.addEventListener("click", (event) => {
  if (event.target.closest("#nextBtn")) {
    moveToNextSnippet();
  }
});
practiceActions.addEventListener("click", (event) => {
  if (event.target.closest("#practiceNextBtn")) {
    moveToNextSnippet();
  }
});

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
if (!initializeLanguagePreference()) {
  resetSnippetQueue();
  populateSnippets();
}
syncLineHeight();
resetTest(false);

window.addEventListener("resize", () => {
  syncLineHeight();
  syncSnippetViewport();
  syncCaret();
});
