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
  let index = countForLanguage() + 1;

  while (countForLanguage() < target) {
    const generator = generators[(index - 1) % generators.length];
    window.CODE_SNIPPETS.push({
      language,
      category: "algorithms",
      ...generator(index)
    });
    index += 1;
  }
};
