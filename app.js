window.TOPICS = [];

function registerTopic(topic) {
  window.TOPICS.push(topic);
}

/* Library metadata — order here controls the sidebar order. Keep this in
   sync with the "folder" values used inside libraries/<folder>/*.js files. */
const LIBRARY_META = [
  { folder: "numpy", name: "NumPy", icon: "fa-solid fa-calculator", color: "#4C8BF5",
    tagline: "Fast numeric arrays for every calculation underneath pandas & sklearn" },
  { folder: "pandas", name: "Pandas", icon: "fa-solid fa-table", color: "#2FBF9B",
    tagline: "The spreadsheet-like workhorse for cleaning and exploring business data" },
  { folder: "matplotlib", name: "Matplotlib", icon: "fa-solid fa-chart-line", color: "#F5A623",
    tagline: "The foundation layer for every chart students will build on top of" },
  { folder: "seaborn", name: "Seaborn", icon: "fa-solid fa-chart-simple", color: "#E0559F",
    tagline: "Statistical, presentation-ready charts with far less code than raw Matplotlib" },
  { folder: "scikit-learn", name: "Scikit-learn", icon: "fa-solid fa-brain", color: "#9B6CF5",
    tagline: "Turn cleaned business data into predictions, classifications and clusters" },
  { folder: "scipy", name: "SciPy", icon: "fa-solid fa-flask", color: "#56C9E0",
    tagline: "The statistics engine behind hypothesis tests and business experiments" },
];

/* ---- persistent state (per teacher, per browser) ---------------------- */
let coveredSet = new Set(safeParse(localStorage.getItem("analyticsLab.covered")) || []);
let expandedLibs = new Set(LIBRARY_META.map(l => l.folder)); // all open by default
let activeTopicId = null;
let activeVisualCleanup = null; // teardown for the currently mounted topic.visual, if any

function safeParse(json) {
  try { return JSON.parse(json); } catch (e) { return null; }
}

function persistCovered() {
  localStorage.setItem("analyticsLab.covered", JSON.stringify([...coveredSet]));
}

/* ---- boot --------------------------------------------------------------*/
function initApp() {
  applyTheme(localStorage.getItem("analyticsLab.theme") || "dark");
  applySidebarCollapsed(localStorage.getItem("analyticsLab.sidebarCollapsed") === "true");

  renderSidebar();
  updateProgress();
  renderWelcome();

  document.getElementById("searchInput").addEventListener("input", (e) => {
    renderSidebar(e.target.value);
  });

  document.getElementById("themeToggle").addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("analyticsLab.theme", next);
  });

  // Desktop: collapses the sidebar in place (lives inside the sidebar header).
  document.getElementById("sidebarToggle").addEventListener("click", () => {
    const next = !document.getElementById("appShell").classList.contains("sidebar-collapsed");
    applySidebarCollapsed(next);
    localStorage.setItem("analyticsLab.sidebarCollapsed", String(next));
  });

  // Mobile: opens/closes the off-canvas drawer.
  document.getElementById("menuToggle").addEventListener("click", () => {
    document.getElementById("appShell").classList.toggle("sidebar-open");
  });
  document.getElementById("sidebarBackdrop").addEventListener("click", () => {
    document.getElementById("appShell").classList.remove("sidebar-open");
  });
}

function closeMobileSidebar() {
  document.getElementById("appShell").classList.remove("sidebar-open");
}

function applySidebarCollapsed(on) {
  document.getElementById("appShell").classList.toggle("sidebar-collapsed", on);
  document.getElementById("sidebarToggle").title = on ? "Expand sidebar" : "Collapse sidebar";
}

/* ---- theme -------------------------------------------------------------*/
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const btn = document.getElementById("themeToggle");
  btn.innerHTML = theme === "dark"
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
}

/* ---- sidebar ------------------------------------------------------------
   Rebuilt on every search keystroke and on every covered/expand toggle —
   the topic list is small (a few dozen items) so a full re-render is cheap
   and keeps the state handling in one place. */
function renderSidebar(filterText = "") {
  const nav = document.getElementById("libraryNav");
  nav.innerHTML = "";
  const q = filterText.trim().toLowerCase();

  LIBRARY_META.forEach((lib) => {
    const topics = window.TOPICS
      .filter((t) => t.library === lib.folder)
      .filter((t) => !q || t.title.toLowerCase().includes(q) || lib.name.toLowerCase().includes(q));

    if (q && topics.length === 0) return;

    const group = document.createElement("div");
    group.className = "lib-group";
    group.style.setProperty("--lib-color", lib.color);

    const isOpen = q ? true : expandedLibs.has(lib.folder);

    const header = document.createElement("button");
    header.className = "lib-header" + (isOpen ? " open" : "");
    header.type = "button";
    header.innerHTML = `
      <i class="${lib.icon} lib-icon"></i>
      <span class="lib-name">${lib.name}</span>
      <span class="lib-count">${topics.length}</span>
      <i class="fa-solid fa-chevron-down lib-chevron"></i>
    `;
    header.addEventListener("click", () => {
      if (expandedLibs.has(lib.folder)) expandedLibs.delete(lib.folder);
      else expandedLibs.add(lib.folder);
      renderSidebar(document.getElementById("searchInput").value);
    });

    const list = document.createElement("ul");
    list.className = "topic-list" + (isOpen ? " open" : "");

    topics.forEach((t) => {
      const topicId = t.library + "::" + t.id;
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "topic-item" + (topicId === activeTopicId ? " active" : "");
      btn.dataset.topicId = topicId;
      const covered = coveredSet.has(topicId);
      btn.innerHTML = `
        <i class="fa-solid ${covered ? "fa-circle-check covered-icon" : "fa-circle topic-dot"}"></i>
        <span>${t.title}</span>
      `;
      btn.addEventListener("click", () => { selectTopic(t); closeMobileSidebar(); });
      li.appendChild(btn);
      list.appendChild(li);
    });

    group.appendChild(header);
    group.appendChild(list);
    nav.appendChild(group);
  });
}

/* ---- welcome / empty state --------------------------------------------- */
function renderWelcome() {
  const libCount = LIBRARY_META.length;
  const topicCount = window.TOPICS.length;
  document.getElementById("contentArea").innerHTML = `
    <div class="welcome fade-in">
      <i class="fa-solid fa-diagram-project welcome-icon"></i>
      <h1>Pick a topic to run the simulation</h1>
      <p>Expand a library on the left and choose a concept — the code appears here,
         ready to talk through and copy straight into your compiler.</p>
      <div class="welcome-stats">
        <div><strong>${libCount}</strong><span>libraries</span></div>
        <div><strong>${topicCount}</strong><span>ready simulations</span></div>
      </div>
    </div>
  `;
}

/* ---- topic detail -------------------------------------------------------*/
function selectTopic(topic) {
  activeTopicId = topic.library + "::" + topic.id;

  document.querySelectorAll(".topic-item").forEach((b) => {
    b.classList.toggle("active", b.dataset.topicId === activeTopicId);
  });

  const libMeta = LIBRARY_META.find((l) => l.folder === topic.library);
  const covered = coveredSet.has(activeTopicId);

  document.getElementById("contentArea").innerHTML = `
    <div class="topic-card fade-in" style="--accent:${libMeta.color}">
      <div class="topic-card-head">
        <div class="topic-card-heading">
          <span class="pill difficulty-${topic.difficulty.toLowerCase()}">${topic.difficulty}</span>
          <h1>${topic.title}</h1>
          <p class="topic-summary">${topic.summary}</p>
        </div>
        <button class="cover-btn ${covered ? "is-covered" : ""}" id="coverBtn" type="button">
          <i class="fa-solid ${covered ? "fa-circle-check" : "fa-circle"}"></i>
          <span>${covered ? "Covered in class" : "Mark as covered"}</span>
        </button>
      </div>

      ${topic.visual ? `<div class="visual-panel" id="visualPanel"></div>` : ""}

      <div class="code-panel">
        <div class="code-panel-header">
          <span class="code-panel-lang"><i class="fa-brands fa-python"></i> Python</span>
          <button class="copy-btn" id="copyBtn" type="button">
            <i class="fa-regular fa-copy"></i><span>Copy code</span>
          </button>
        </div>
        <pre><code>${escapeHtml(topic.code)}</code></pre>
      </div>

      <div class="topic-footer">
        <a class="run-link" href="https://www.online-python.com/" target="_blank" rel="noopener">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Open online compiler
        </a>
        <span class="hint">Copy the code, paste it into the compiler tab, and run it live in class.</span>
      </div>
    </div>
  `;

  document.getElementById("copyBtn").addEventListener("click", () => copyCode(topic.code));
  document.getElementById("coverBtn").addEventListener("click", () => toggleCovered(topic));

  // Visual topics: stop any previous animation's interval/listeners, then
  // mount this topic's animation into its own panel. topic.visual is a
  // function that receives the mount element and returns an optional
  // cleanup function (e.g. clearInterval), which we run on the next
  // navigation so switching topics never leaves a stray timer running.
  if (activeVisualCleanup) {
    activeVisualCleanup();
    activeVisualCleanup = null;
  }
  if (topic.visual) {
    const panel = document.getElementById("visualPanel");
    activeVisualCleanup = topic.visual(panel) || null;
  }
}

/* ---- copy to clipboard (with fallback for non-secure / file:// contexts) */
function copyCode(code) {
  const btn = document.getElementById("copyBtn");
  const showCopied = () => {
    btn.classList.add("copied");
    btn.innerHTML = '<i class="fa-solid fa-check"></i><span>Copied!</span>';
    setTimeout(() => {
      btn.classList.remove("copied");
      btn.innerHTML = '<i class="fa-regular fa-copy"></i><span>Copy code</span>';
    }, 1600);
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(code).then(showCopied).catch(() => fallbackCopy(code, showCopied));
  } else {
    fallbackCopy(code, showCopied);
  }
}

function fallbackCopy(text, done) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try { document.execCommand("copy"); } catch (e) { /* no-op */ }
  document.body.removeChild(ta);
  done();
}

/* ---- "covered in class" progress tracking ------------------------------*/
function toggleCovered(topic) {
  const id = topic.library + "::" + topic.id;
  if (coveredSet.has(id)) coveredSet.delete(id);
  else coveredSet.add(id);
  persistCovered();
  updateProgress();
  renderSidebar(document.getElementById("searchInput").value);
  selectTopic(topic);
}

function updateProgress() {
  const total = window.TOPICS.length;
  const done = coveredSet.size;
  document.getElementById("progressLabel").textContent = `${done} / ${total} covered`;
  document.getElementById("progressFill").style.width = total ? `${(done / total) * 100}%` : "0%";
}

/* ---- utils ---------------------------------------------------------------*/
function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}