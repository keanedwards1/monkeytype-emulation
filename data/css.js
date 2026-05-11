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
