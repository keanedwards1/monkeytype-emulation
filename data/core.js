window.CODE_SNIPPETS = [];

window.registerSnippets = function registerSnippets(language, snippets) {
  for (const snippet of snippets) {
    window.CODE_SNIPPETS.push({
      category: "general",
      ...snippet,
      language
    });
  }
};

window.expandSnippets = function expandSnippets(language, generators, target = 30) {
  const countForLanguage = () => window.CODE_SNIPPETS
    .filter((snippet) => snippet.language === language)
    .length;
  const seenCode = new Set(
    window.CODE_SNIPPETS
      .filter((snippet) => snippet.language === language)
      .map((snippet) => snippet.code)
  );
  let index = countForLanguage() + 1;
  let attempts = 0;
  const maxAttempts = Math.max(target * generators.length * 4, generators.length);

  while (countForLanguage() < target && attempts < maxAttempts) {
    const generator = generators[(index - 1) % generators.length];
    const snippet = generator(index);

    if (!seenCode.has(snippet.code)) {
      seenCode.add(snippet.code);
      window.CODE_SNIPPETS.push({
        language,
        category: "algorithms",
        ...snippet
      });
    }

    index += 1;
    attempts += 1;
  }
};
