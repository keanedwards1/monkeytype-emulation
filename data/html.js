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

window.registerSnippets("HTML", [
  { title: "Account menu", code: `<nav class="account-menu" aria-label="Account">
  <button type="button" aria-expanded="false" aria-controls="account-links">
    Casey Morgan
  </button>
  <ul id="account-links">
    <li><a href="/settings">Settings</a></li>
    <li><a href="/billing">Billing</a></li>
    <li><button type="submit" form="logout-form">Sign out</button></li>
  </ul>
</nav>` },
  { title: "Order summary", code: `<section class="order-summary" aria-labelledby="order-total">
  <h2 id="order-total">Order total</h2>
  <dl>
    <div><dt>Subtotal</dt><dd>$48.00</dd></div>
    <div><dt>Shipping</dt><dd>$6.95</dd></div>
    <div><dt>Total</dt><dd>$54.95</dd></div>
  </dl>
</section>` },
  { title: "Upload field", code: `<fieldset>
  <legend>Import contacts</legend>
  <label for="contacts-file">CSV file</label>
  <input id="contacts-file" name="contacts" type="file" accept=".csv,text/csv">
  <p id="contacts-help">Columns must include email, first_name, and last_name.</p>
  <button type="submit">Start import</button>
</fieldset>` }
]);

window.registerSnippets("HTML", [
  { title: "Search landmark", code: `<form role="search" action="/search" method="get">
  <label for="site-search">Search docs</label>
  <input id="site-search" name="q" type="search" autocomplete="off">
  <button type="submit">Search</button>
</form>` },
  { title: "Login form", code: `<form action="/login" method="post">
  <label for="email">Email</label>
  <input id="email" name="email" type="email" autocomplete="email" required>
  <label for="password">Password</label>
  <input id="password" name="password" type="password" autocomplete="current-password" required>
  <button type="submit">Sign in</button>
</form>` },
  { title: "Settings nav", code: `<nav aria-label="Settings">
  <ul>
    <li><a href="/settings/profile" aria-current="page">Profile</a></li>
    <li><a href="/settings/security">Security</a></li>
    <li><a href="/settings/billing">Billing</a></li>
  </ul>
</nav>` },
  { title: "Alert message", code: `<div role="alert" class="alert alert-error">
  <strong>Payment failed.</strong>
  <p>Update your billing method to keep the workspace active.</p>
</div>` },
  { title: "Dialog markup", code: `<dialog id="confirm-delete" aria-labelledby="confirm-title">
  <h2 id="confirm-title">Delete project?</h2>
  <p>This action cannot be undone.</p>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="confirm">Delete</button>
  </form>
</dialog>` },
  { title: "Progress element", code: `<label for="import-progress">Import progress</label>
<progress id="import-progress" value="42" max="100">42%</progress>` },
  { title: "Meter element", code: `<label for="storage-used">Storage used</label>
<meter id="storage-used" min="0" max="100" low="70" high="90" value="82">
  82%
</meter>` },
  { title: "Notification list", code: `<section aria-labelledby="notifications-title">
  <h2 id="notifications-title">Notifications</h2>
  <ul>
    <li><a href="/notifications/1">Build finished successfully</a></li>
    <li><a href="/notifications/2">Invoice is ready</a></li>
  </ul>
</section>` },
  { title: "Breadcrumb nav", code: `<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/projects">Projects</a></li>
    <li aria-current="page">Apollo</li>
  </ol>
</nav>` },
  { title: "Tabs markup", code: `<div role="tablist" aria-label="Project views">
  <button role="tab" aria-selected="true" aria-controls="overview">Overview</button>
  <button role="tab" aria-selected="false" aria-controls="activity">Activity</button>
</div>
<section id="overview" role="tabpanel">Project summary</section>` },
  { title: "Disclosure", code: `<details>
  <summary>Advanced filters</summary>
  <label>
    Status
    <select name="status"><option>Open</option><option>Closed</option></select>
  </label>
</details>` },
  { title: "User card", code: `<article class="user-card">
  <img src="/avatars/casey.jpg" alt="" width="48" height="48">
  <h2>Casey Morgan</h2>
  <p>Frontend engineer</p>
  <a href="/users/casey">View profile</a>
</article>` },
  { title: "Pricing table", code: `<table>
  <caption>Plan limits</caption>
  <thead><tr><th scope="col">Plan</th><th scope="col">Seats</th></tr></thead>
  <tbody><tr><th scope="row">Team</th><td>25</td></tr></tbody>
</table>` },
  { title: "Invoice row", code: `<tr>
  <td><a href="/invoices/in_123">INV-123</a></td>
  <td><time datetime="2026-05-01">May 1, 2026</time></td>
  <td>$240.00</td>
  <td><span class="badge">Paid</span></td>
</tr>` },
  { title: "File input help", code: `<label for="avatar">Profile photo</label>
<input id="avatar" name="avatar" type="file" accept="image/png,image/jpeg" aria-describedby="avatar-help">
<p id="avatar-help">PNG or JPEG, up to 2 MB.</p>` },
  { title: "Address form", code: `<fieldset>
  <legend>Shipping address</legend>
  <label for="street">Street</label>
  <input id="street" name="street" autocomplete="shipping street-address">
  <label for="postal">Postal code</label>
  <input id="postal" name="postal-code" autocomplete="shipping postal-code">
</fieldset>` },
  { title: "Comment form", code: `<form action="/comments" method="post">
  <label for="comment">Comment</label>
  <textarea id="comment" name="body" rows="5" required></textarea>
  <button type="submit">Post comment</button>
</form>` },
  { title: "Pagination nav", code: `<nav aria-label="Pagination">
  <a href="?page=1" rel="prev">Previous</a>
  <span aria-current="page">Page 2</span>
  <a href="?page=3" rel="next">Next</a>
</nav>` },
  { title: "Skip link", code: `<a class="skip-link" href="#main">Skip to main content</a>
<main id="main" tabindex="-1">
  <h1>Dashboard</h1>
</main>` },
  { title: "Status region", code: `<section aria-live="polite" aria-atomic="true">
  <h2 class="sr-only">Upload status</h2>
  <p>3 files uploaded successfully.</p>
</section>` },
  { title: "Video captions", code: `<video controls width="640">
  <source src="/demo.mp4" type="video/mp4">
  <track kind="captions" src="/demo.en.vtt" srclang="en" label="English">
</video>` },
  { title: "Picture sources", code: `<picture>
  <source srcset="/hero.avif" type="image/avif">
  <source srcset="/hero.webp" type="image/webp">
  <img src="/hero.jpg" alt="Team dashboard overview">
</picture>` },
  { title: "Definition list", code: `<dl>
  <div><dt>Repository</dt><dd>monkeytype-copy</dd></div>
  <div><dt>Status</dt><dd>Passing</dd></div>
  <div><dt>Updated</dt><dd><time datetime="2026-05-14">Today</time></dd></div>
</dl>` },
  { title: "Toolbar buttons", code: `<div role="toolbar" aria-label="Editor actions">
  <button type="button" aria-label="Bold">B</button>
  <button type="button" aria-label="Italic">I</button>
  <button type="button" aria-label="Insert link">Link</button>
</div>` },
  { title: "Combobox shell", code: `<label id="assignee-label" for="assignee">Assignee</label>
<input id="assignee" role="combobox" aria-labelledby="assignee-label" aria-expanded="false" aria-autocomplete="list">
<ul role="listbox" id="assignee-options"></ul>` },
  { title: "Error summary", code: `<div role="alert" class="error-summary">
  <h2>Fix the following</h2>
  <ul><li><a href="#email">Email is required</a></li></ul>
</div>` },
  { title: "Marketing card", code: `<article class="feature-card">
  <h2>Realtime sync</h2>
  <p>Keep project data current across every workspace.</p>
  <a href="/features/sync">Learn more</a>
</article>` },
  { title: "Product card", code: `<article class="product-card">
  <img src="/products/keyboard.jpg" alt="Low profile mechanical keyboard">
  <h2>Keyboard Pro</h2>
  <p>$129.00</p>
  <button type="button">Add to cart</button>
</article>` },
  { title: "Admin filter form", code: `<form method="get" action="/admin/users">
  <label for="role">Role</label>
  <select id="role" name="role"><option value="">Any role</option><option>Admin</option></select>
  <button type="submit">Apply filters</button>
</form>` },
  { title: "API key row", code: `<li class="api-key">
  <code>sk_live_••••••••</code>
  <time datetime="2026-04-10">Created Apr 10</time>
  <button type="button">Revoke</button>
</li>` },
  { title: "Empty state markup", code: `<section class="empty-state">
  <h2>No projects yet</h2>
  <p>Create your first project to start tracking work.</p>
  <a href="/projects/new">New project</a>
</section>` },
  { title: "Import result", code: `<section aria-labelledby="import-title">
  <h2 id="import-title">Import complete</h2>
  <p><strong>128</strong> contacts imported, <strong>3</strong> skipped.</p>
</section>` },
  { title: "Keyboard shortcut list", code: `<ul aria-label="Keyboard shortcuts">
  <li><kbd>Ctrl</kbd> + <kbd>K</kbd> opens search</li>
  <li><kbd>Esc</kbd> closes dialogs</li>
</ul>` },
  { title: "Account switcher", code: `<label for="workspace">Workspace</label>
<select id="workspace" name="workspace">
  <option>Acme Inc.</option>
  <option>Personal</option>
</select>` }
]);
