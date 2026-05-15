window.registerSnippets("CSS", [
  { title: "Responsive grid", code: `.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}` }
]);

window.expandSnippets("CSS", [
  (n) => ({ title: `Complexity badge ${n}`, code: `.complexity {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent), transparent 86%);
  padding: 0.25rem 0.5rem;
}` }),
  (n) => ({ title: `Code grid ${n}`, code: `.code-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: baseline;
  column-gap: 1rem;
}` })
], 30);

window.CODE_SNIPPETS
  .filter((snippet) => snippet.language === "CSS")
  .forEach((snippet) => {
    snippet.category = "general";
  });

window.registerSnippets("CSS", [
  { title: "Button states", code: `.button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.5rem;
  padding-inline: 0.875rem;
}` },
  { title: "Button disabled", code: `.button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
  box-shadow: none;
}` },
  { title: "Form grid", code: `.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem 1.25rem;
}` },
  { title: "Field stack", code: `.field {
  display: grid;
  gap: 0.375rem;
  align-content: start;
}` },
  { title: "Invalid field", code: `.field[data-invalid="true"] input {
  border-color: var(--danger);
  background: color-mix(in srgb, var(--danger), transparent 94%);
}` },
  { title: "Error text", code: `.field-error {
  color: var(--danger);
  font-size: 0.8125rem;
  line-height: 1.4;
}` },
  { title: "Toolbar layout", code: `.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}` },
  { title: "Segmented control", code: `.segmented {
  display: inline-grid;
  grid-auto-flow: column;
  padding: 0.25rem;
  border-radius: 0.5rem;
}` },
  { title: "Segment active", code: `.segmented button[aria-pressed="true"] {
  background: var(--surface);
  color: var(--text);
  box-shadow: var(--shadow-sm);
}` },
  { title: "Card list", code: `.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1rem;
}` },
  { title: "Data table", code: `.data-table {
  width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}` },
  { title: "Sticky table header", code: `.data-table thead th {
  position: sticky;
  top: 0;
  background: var(--surface);
  box-shadow: inset 0 -1px var(--border);
}` },
  { title: "Table row hover", code: `.data-table tbody tr:hover {
  background: color-mix(in srgb, var(--accent), transparent 94%);
}` },
  { title: "Modal overlay", code: `.modal-overlay {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgb(0 0 0 / 0.48);
}` },
  { title: "Modal panel", code: `.modal {
  width: min(42rem, calc(100vw - 2rem));
  max-height: calc(100vh - 2rem);
  overflow: auto;
  border-radius: 0.5rem;
}` },
  { title: "Toast stack", code: `.toast-stack {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  display: grid;
  gap: 0.5rem;
}` },
  { title: "Skeleton loader", code: `.skeleton {
  border-radius: 0.375rem;
  background: linear-gradient(90deg, var(--muted), var(--surface), var(--muted));
  background-size: 200% 100%;
}` },
  { title: "Avatar group", code: `.avatar-group {
  display: flex;
  align-items: center;
}
.avatar-group > * + * {
  margin-left: -0.5rem;
}` },
  { title: "Sidebar shell", code: `.app-layout {
  display: grid;
  grid-template-columns: 16rem minmax(0, 1fr);
  min-height: 100vh;
}` },
  { title: "Responsive sidebar", code: `@media (max-width: 760px) {
  .app-layout {
    grid-template-columns: 1fr;
  }
}` },
  { title: "Dashboard stats", code: `.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}` },
  { title: "Stat compact", code: `.stat {
  display: grid;
  gap: 0.25rem;
  padding: 1rem;
  border: 1px solid var(--border);
}` },
  { title: "Command menu", code: `.command-menu {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  width: min(42rem, 100%);
}` },
  { title: "Search input", code: `.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 0;
  outline: 0;
}` },
  { title: "Empty state", code: `.empty-state {
  display: grid;
  place-items: center;
  min-height: 18rem;
  text-align: center;
}` },
  { title: "Visually hidden", code: `.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}` },
  { title: "Focus ring", code: `:where(button, a, input, select):focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}` },
  { title: "Tooltip bubble", code: `.tooltip {
  position: absolute;
  z-index: 20;
  padding: 0.375rem 0.5rem;
  border-radius: 0.375rem;
}` },
  { title: "Progress bar", code: `.progress {
  height: 0.5rem;
  overflow: hidden;
  border-radius: 999px;
  background: var(--track);
}` },
  { title: "Progress value", code: `.progress > span {
  display: block;
  height: 100%;
  width: var(--value);
  background: var(--accent);
}` },
  { title: "Dropdown menu", code: `.dropdown-menu {
  position: absolute;
  min-width: 12rem;
  padding: 0.375rem;
  border: 1px solid var(--border);
  background: var(--surface);
}` },
  { title: "Breadcrumbs", code: `.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  color: var(--muted);
}` },
  { title: "Code block", code: `.code-block {
  overflow-x: auto;
  padding: 1rem;
  border-radius: 0.5rem;
  font-family: ui-monospace, monospace;
}` },
  { title: "Print cleanup", code: `@media print {
  .sidebar,
  .toolbar {
    display: none;
  }
}` }
]);

window.registerSnippets("CSS", [
  { title: "Settings panel", code: `.settings-panel {
  display: grid;
  grid-template-columns: minmax(12rem, 18rem) minmax(0, 1fr);
  gap: 1.25rem;
  padding-block: 1rem;
  border-block-start: 1px solid var(--border);
}` },
  { title: "Form error state", code: `.field[data-invalid="true"] input {
  border-color: var(--danger);
  background: color-mix(in srgb, var(--danger), transparent 94%);
}

.field-error {
  margin-block-start: 0.35rem;
  color: var(--danger);
}` },
  { title: "Sticky table header", code: `.data-table thead th {
  position: sticky;
  top: var(--toolbar-height);
  z-index: 1;
  background: var(--surface);
  box-shadow: inset 0 -1px var(--border);
}` }
]);
