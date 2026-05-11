window.registerSnippets("HTML", [
  { title: "Accessible form", code: `<form action="/subscribe" method="post">
  <label for="email">Email address</label>
  <input id="email" name="email" type="email" autocomplete="email" required>
  <button type="submit">Join waitlist</button>
</form>` }
]);

window.expandSnippets("HTML", [
  (n) => ({ title: `Interview markup ${n}`, code: `<section aria-labelledby="question-title">
  <h2 id="question-title">Two Sum</h2>
  <p>Return the indices of two numbers that add up to the target.</p>
  <pre><code>nums = [2, 7, 11, 15]</code></pre>
</section>` }),
  (n) => ({ title: `Semantic table ${n}`, code: `<table>
  <caption>Algorithm complexity</caption>
  <thead>
    <tr><th scope="col">Structure</th><th scope="col">Lookup</th></tr>
  </thead>
  <tbody>
    <tr><td>Hash map</td><td>O(1)</td></tr>
  </tbody>
</table>` })
], 30);

window.CODE_SNIPPETS
  .filter((snippet) => snippet.language === "HTML")
  .forEach((snippet) => {
    snippet.category = "general";
  });
