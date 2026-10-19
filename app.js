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

/* ---- library scripts ------------------------------------------------------
   The library files (numpy.js, pandas.js, matplotlib.js, seaborn.js,
   scikitlearn.js, scipy.js) are loaded directly by <script> tags in
   index.html, AFTER app.js. Each file just calls registerTopic({...}) once per
   topic, with library set to the folder id used in LIBRARY_META above
   (e.g. "scikit-learn" for scikitlearn.js). The app starts on DOMContentLoaded,
   i.e. once every one of those scripts has run. */

/* ---- persistent state (per teacher, per browser) ---------------------- */
let coveredSet = new Set(safeParse(localStorage.getItem("analyticsLab.covered")) || []);
let expandedLibs = new Set(LIBRARY_META.map(l => l.folder)); // all open by default
let activeTopicId = null;
let activeVisualCleanup = null; // teardown for the currently mounted topic.visual, if any

/* Text zoom: one shared level for the whole app, remembered per browser. */
const ZOOM_MIN = 0.8, ZOOM_MAX = 1.6, ZOOM_STEP = 0.1;
const DEFAULT_ZOOM = 1.2; // larger reading size by default; teachers can still zoom with the dock buttons
let textZoom = clampZoom(parseFloat(localStorage.getItem("analyticsLab.textZoom")) || DEFAULT_ZOOM);

function clampZoom(z) {
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Math.round(z * 10) / 10));
}

function applyTextZoom() {
  document.documentElement.style.setProperty("--text-zoom", String(textZoom));
  // Both button pairs (topic header + sidebar footer) share this state.
  document.querySelectorAll("[data-zoom]").forEach((b) => {
    b.disabled = (b.dataset.zoom === "in" && textZoom >= ZOOM_MAX) ||
                 (b.dataset.zoom === "out" && textZoom <= ZOOM_MIN);
  });
}

function changeTextZoom(direction) {
  textZoom = clampZoom(textZoom + (direction === "in" ? ZOOM_STEP : -ZOOM_STEP));
  localStorage.setItem("analyticsLab.textZoom", String(textZoom));
  applyTextZoom();
}

function safeParse(json) {
  try { return JSON.parse(json); } catch (e) { return null; }
}

function persistCovered() {
  localStorage.setItem("analyticsLab.covered", JSON.stringify([...coveredSet]));
}

/* ---- boot --------------------------------------------------------------*/
function initApp() {
  // Apply the saved sidebar state instantly (no slide on page load), then
  // switch transitions back on after the first frames have been painted.
  const shell = document.getElementById("appShell");
  shell.classList.add("no-anim");
  applySidebarCollapsed(localStorage.getItem("analyticsLab.sidebarCollapsed") === "true");
  requestAnimationFrame(() => requestAnimationFrame(() => shell.classList.remove("no-anim")));

  renderSidebar();
  updateProgress();
  renderWelcome();
  buildDock();
  applyTextZoom();
  initImageTools();
  initInk();

  // One delegated listener covers every [data-zoom] button, including the
  // ones re-created each time a topic is opened.
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-zoom]");
    if (btn && !btn.disabled) changeTextZoom(btn.dataset.zoom);
  });

  // Copy buttons on code examples that sit inside a topic's notes panel.
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-copy-code]");
    if (!btn) return;
    copyCode(btn.closest(".intro-code").querySelector("code").textContent, btn);
  });

  document.getElementById("searchInput").addEventListener("input", (e) => {
    renderSidebar(e.target.value);
  });

  // Desktop: collapses the sidebar in place (lives inside the sidebar header).
  document.getElementById("sidebarToggle").addEventListener("click", () => {
    const next = !document.getElementById("appShell").classList.contains("sidebar-collapsed");
    applySidebarCollapsed(next);
    localStorage.setItem("analyticsLab.sidebarCollapsed", String(next));
  });

  // Mobile: tapping the backdrop closes the off-canvas drawer.
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

/* ---- previous / next ordering -------------------------------------------
   Follows the sidebar exactly: libraries in LIBRARY_META order, topics inside
   each library in the order they were registered. Next on a library's last
   topic therefore continues into the next library's first topic. */
function orderedTopics() {
  return LIBRARY_META.flatMap((lib) => window.TOPICS.filter((t) => t.library === lib.folder));
}

/* Right-side dock (Previous / Next). Before any topic is open, Next starts at
   the first topic. */
function currentTopicIndex() {
  return orderedTopics().findIndex((t) => t.library + "::" + t.id === activeTopicId);
}

function updateNavDock() {
  const prev = document.getElementById("navPrev");
  const next = document.getElementById("navNext");
  if (!prev || !next) return;
  const total = orderedTopics().length;
  const i = currentTopicIndex();
  prev.disabled = i <= 0;
  next.disabled = total === 0 || i >= total - 1;

  const cover = document.getElementById("navCover");
  if (cover) {
    const on = coveredSet.has(activeTopicId);
    cover.disabled = i === -1;
    cover.classList.toggle("is-covered", on);
    cover.setAttribute("aria-pressed", String(on));
    cover.title = cover.ariaLabel = on ? "Covered in class (tap to undo)" : "Mark as covered";
    cover.querySelector("i").className = "fa-solid " + (on ? "fa-circle-check" : "fa-circle");
  }
}

function stepTopic(delta) {
  const order = orderedTopics();
  const i = currentTopicIndex();
  const target = i === -1 ? (delta > 0 ? order[0] : null) : order[i + delta];
  goToTopic(target);
}

function goToTopic(topic) {
  if (!topic) return;
  expandedLibs.add(topic.library); // make sure the target is visible in the sidebar
  renderSidebar(document.getElementById("searchInput").value);
  selectTopic(topic);
  document.getElementById("contentArea").scrollTop = 0;
  const activeItem = document.querySelector(".topic-item.active");
  if (activeItem) activeItem.scrollIntoView({ block: "nearest" });
}

/* ---- topic detail -------------------------------------------------------*/
function selectTopic(topic) {
  activeTopicId = topic.library + "::" + topic.id;

  document.querySelectorAll(".topic-item").forEach((b) => {
    b.classList.toggle("active", b.dataset.topicId === activeTopicId);
  });

  const libMeta = LIBRARY_META.find((l) => l.folder === topic.library);

  document.getElementById("contentArea").innerHTML = `
    <div class="topic-card fade-in" style="--accent:${libMeta.color}">
      <div class="topic-card-head">
        <div class="topic-card-heading">
          <span class="pill difficulty-${topic.difficulty.toLowerCase()}">${topic.difficulty}</span>
          <h1>${topic.title}</h1>
          <p class="topic-summary">${topic.summary}</p>
        </div>
      </div>

      ${topic.visual ? `<div class="visual-panel" id="visualPanel"></div>` : ""}

      ${topic.code ? `
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
      ` : ""}

    </div>
  `;

  const copyBtn = document.getElementById("copyBtn"); // absent for theory-only topics (no code)
  if (copyBtn) copyBtn.addEventListener("click", () => copyCode(topic.code));
  applyTextZoom(); // the freshly rendered header buttons need their enabled/disabled state
  updateNavDock(); // Previous / Next enabled state for this topic
  updateInkUI();   // pen button state + this topic's saved strokes
  redrawInk();

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

/* ---- image tools: per-image zoom + full view ----------------------------
   Works on any <figure class="intro-figure"> (see the figure() helper in the
   library files). Zoom only resizes THAT image inside its own scrollable
   stage - the page, the text and other images are untouched. */
const IMG_ZOOM_MIN = 1, IMG_ZOOM_MAX = 4, IMG_ZOOM_STEP = 0.25;
let lightbox = null;
let lightboxScale = 1;
let lightboxBaseWidth = 0;
let lightboxReturnFocus = null;
let dragState = null;
let justDragged = false;

function setImageScale(fig, scale) {
  scale = Math.min(IMG_ZOOM_MAX, Math.max(IMG_ZOOM_MIN, Math.round(scale * 100) / 100));
  fig.dataset.scale = String(scale);
  const img = fig.querySelector("img");
  img.style.width = scale > 1 ? (scale * 100) + "%" : "";
  img.style.maxWidth = scale > 1 ? "none" : "";
  fig.classList.toggle("is-zoomed", scale > 1);
  fig.querySelector('[data-img-action="in"]').disabled = scale >= IMG_ZOOM_MAX;
  fig.querySelector('[data-img-action="out"]').disabled = scale <= IMG_ZOOM_MIN;
}

function buildLightbox() {
  const el = document.createElement("div");
  el.className = "img-lightbox";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "true");
  el.setAttribute("aria-label", "Image full view");
  el.innerHTML = `
    <div class="img-lightbox-bar">
      <button class="img-tool-btn" type="button" data-lb="in" title="Zoom in image" aria-label="Zoom in image"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
      <button class="img-tool-btn" type="button" data-lb="out" title="Zoom out image" aria-label="Zoom out image"><i class="fa-solid fa-magnifying-glass-minus"></i></button>
      <button class="img-tool-btn" type="button" data-lb="close" title="Close (Esc)" aria-label="Close full view"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="img-lightbox-stage"><img alt=""></div>`;
  document.body.appendChild(el);
  return el;
}

function applyLightboxScale() {
  const img = lightbox.querySelector("img");
  const stage = lightbox.querySelector(".img-lightbox-stage");
  if (lightboxScale > 1) {
    img.style.maxWidth = "none";
    img.style.maxHeight = "none";
    img.style.width = (lightboxBaseWidth * lightboxScale) + "px";
  } else {
    img.style.maxWidth = "";
    img.style.maxHeight = "";
    img.style.width = "";
  }
  stage.classList.toggle("is-zoomed", lightboxScale > 1);
  lightbox.querySelector('[data-lb="in"]').disabled = lightboxScale >= IMG_ZOOM_MAX;
  lightbox.querySelector('[data-lb="out"]').disabled = lightboxScale <= IMG_ZOOM_MIN;
}

function changeLightboxScale(delta) {
  const img = lightbox.querySelector("img");
  if (lightboxScale === 1) lightboxBaseWidth = img.getBoundingClientRect().width; // size when "fit to screen"
  lightboxScale = Math.min(IMG_ZOOM_MAX, Math.max(IMG_ZOOM_MIN, Math.round((lightboxScale + delta) * 100) / 100));
  applyLightboxScale();
}

function openLightbox(sourceImg) {
  if (!lightbox) lightbox = buildLightbox();
  const img = lightbox.querySelector("img");
  lightboxScale = 1;
  lightbox.querySelector(".img-lightbox-stage").scrollTo(0, 0);
  img.src = sourceImg.currentSrc || sourceImg.src;
  img.alt = sourceImg.alt;
  applyLightboxScale();
  lightboxReturnFocus = document.activeElement;
  lightbox.classList.add("open");
  document.body.classList.add("lightbox-open");
  lightbox.querySelector('[data-lb="close"]').focus();
}

function closeLightbox() {
  if (!lightbox || !lightbox.classList.contains("open")) return;
  lightbox.classList.remove("open");
  document.body.classList.remove("lightbox-open");
  if (lightboxReturnFocus && lightboxReturnFocus.focus) lightboxReturnFocus.focus();
}

function initImageTools() {
  document.addEventListener("click", (e) => {
    // Buttons on a figure (full view / zoom in / zoom out)
    const tool = e.target.closest("[data-img-action]");
    if (tool && !tool.disabled) {
      const fig = tool.closest(".intro-figure");
      const action = tool.dataset.imgAction;
      if (action === "full") openLightbox(fig.querySelector("img"));
      else setImageScale(fig, parseFloat(fig.dataset.scale) + (action === "in" ? IMG_ZOOM_STEP : -IMG_ZOOM_STEP));
      return;
    }
    // Buttons inside the full-view overlay
    const lb = e.target.closest("[data-lb]");
    if (lb && !lb.disabled) {
      if (lb.dataset.lb === "close") closeLightbox();
      else changeLightboxScale(lb.dataset.lb === "in" ? IMG_ZOOM_STEP : -IMG_ZOOM_STEP);
      return;
    }
    // Click on the dark backdrop (not the image) closes the overlay
    if (lightbox && lightbox.classList.contains("open") && !justDragged &&
        (e.target === lightbox || e.target.classList.contains("img-lightbox-stage"))) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // Drag-to-pan for a zoomed image (mouse; touch already scrolls natively).
  document.addEventListener("pointerdown", (e) => {
    const stage = e.target.closest(".intro-figure-stage, .img-lightbox-stage");
    if (!stage || e.pointerType === "touch" || e.button !== 0) return;
    if (stage.scrollWidth <= stage.clientWidth && stage.scrollHeight <= stage.clientHeight) return;
    dragState = { stage, x: e.clientX, y: e.clientY, left: stage.scrollLeft, top: stage.scrollTop, moved: false };
    e.preventDefault();
  });
  document.addEventListener("pointermove", (e) => {
    if (!dragState) return;
    const dx = e.clientX - dragState.x, dy = e.clientY - dragState.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) { dragState.moved = true; dragState.stage.classList.add("is-dragging"); }
    dragState.stage.scrollLeft = dragState.left - dx;
    dragState.stage.scrollTop = dragState.top - dy;
  });
  const endDrag = () => {
    if (!dragState) return;
    dragState.stage.classList.remove("is-dragging");
    if (dragState.moved) { justDragged = true; setTimeout(() => { justDragged = false; }, 0); }
    dragState = null;
  };
  document.addEventListener("pointerup", endDrag);
  document.addEventListener("pointercancel", endDrag);
}

/* ---- tool dock: pen + text zoom ------------------------------------------
   A small column of buttons at the bottom-left corner of the main panel, i.e.
   directly outside the sidebar's edge. Because it lives INSIDE .main-panel it
   moves with the sidebar when the sidebar opens, collapses or slides in. The
   pen options (#inkBar) open vertically above the pen button. */
function buildDock() {
  const dock = document.createElement("div");
  dock.className = "tool-dock";
  dock.id = "toolDock";
  dock.innerHTML = `
    <div class="ink-bar" id="inkBar" role="toolbar" aria-label="Pen tools"></div>
    <div class="dock-buttons" role="group" aria-label="Page tools">
      <button class="icon-btn" type="button" data-ink-toggle title="Pen: write or draw on the screen" aria-label="Pen: write or draw on the screen" aria-pressed="false"><i class="fa-solid fa-pen"></i></button>
      <button class="icon-btn" type="button" data-zoom="in" title="Zoom in text" aria-label="Zoom in text"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
      <button class="icon-btn" type="button" data-zoom="out" title="Zoom out text" aria-label="Zoom out text"><i class="fa-solid fa-magnifying-glass-minus"></i></button>
    </div>`;
  document.querySelector(".main-panel").appendChild(dock);

  // Right-side twin of the zoom dock: Previous / Next topic.
  const nav = document.createElement("div");
  nav.className = "nav-dock";
  nav.setAttribute("role", "group");
  nav.setAttribute("aria-label", "Topic navigation");
  nav.innerHTML = `
    <button class="nav-dock-btn" type="button" id="navPrev" title="Previous topic" aria-label="Previous topic"><i class="fa-solid fa-arrow-left"></i></button>
    <button class="nav-dock-btn nav-dock-cover" type="button" id="navCover" title="Mark as covered" aria-label="Mark as covered" aria-pressed="false"><i class="fa-solid fa-circle"></i></button>
    <button class="nav-dock-btn" type="button" id="navNext" title="Next topic" aria-label="Next topic"><i class="fa-solid fa-arrow-right"></i></button>`;
  document.querySelector(".main-panel").appendChild(nav);
  document.getElementById("navPrev").addEventListener("click", () => stepTopic(-1));
  document.getElementById("navNext").addEventListener("click", () => stepTopic(1));
  document.getElementById("navCover").addEventListener("click", () => {
    const t = orderedTopics()[currentTopicIndex()];
    if (t) toggleCovered(t);
  });
  updateNavDock();
}

/* ---- pen overlay: write / draw on top of the page ------------------------
   For classes on an interactive touch panel. The pen button (in the tool dock,
   bottom-left) opens a vertical toolbar and a transparent canvas laid over
   the content area, so the page underneath looks and behaves exactly the same:
     - Pen mode:     finger / pen / mouse draws; the mouse wheel still scrolls.
     - Pointer mode: the canvas lets clicks and scrolling through to the page.
   Strokes are stored in content coordinates (they scroll with the page) and
   are remembered per topic until "Clear". Closing the pen hides them; opening
   it again brings them back. */
const INK_COLORS = [
  { name: "Black",     value: "#111827" },
  { name: "Dark red",  value: "#B91C1C" },
  { name: "Dark blue", value: "#1E40AF" },
];
const INK_WIDTH = 4;
let inkOn = false;
let inkMode = "draw"; // "draw" | "pointer"
let inkColor = INK_COLORS[0].value;
let inkCanvas = null, inkCtx = null, inkBar = null;
let inkCurrent = null, inkPointerId = null, inkRedrawQueued = false;
const inkStrokes = {};       // topicId -> [{ color, width, points: [[x, y], ...], done }]
const inkClearedBackup = {}; // topicId -> strokes removed by "Clear" (so Undo can restore them)

function inkKey() { return activeTopicId || "welcome"; }
function inkList() { return inkStrokes[inkKey()] || (inkStrokes[inkKey()] = []); }

function inkMid(a, b) { return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; }

// Draws the k-th smoothed segment (k = 0 .. n-1) of a stroke.
function inkSegment(ctx, p, k, sx, sy) {
  const n = p.length;
  const X = (q) => q[0] - sx, Y = (q) => q[1] - sy;
  ctx.beginPath();
  if (k === 0) {
    const m = inkMid(p[0], p[1]);
    ctx.moveTo(X(p[0]), Y(p[0])); ctx.lineTo(X(m), Y(m));
  } else if (k < n - 1) {
    const a = inkMid(p[k - 1], p[k]), b = inkMid(p[k], p[k + 1]);
    ctx.moveTo(X(a), Y(a)); ctx.quadraticCurveTo(X(p[k]), Y(p[k]), X(b), Y(b));
  } else {
    const a = inkMid(p[n - 2], p[n - 1]);
    ctx.moveTo(X(a), Y(a)); ctx.lineTo(X(p[n - 1]), Y(p[n - 1]));
  }
  ctx.stroke();
}

function inkStyle(ctx, stroke) {
  ctx.strokeStyle = stroke.color;
  ctx.fillStyle = stroke.color;
  ctx.lineWidth = stroke.width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

function inkDot(ctx, stroke, sx, sy) {
  ctx.beginPath();
  ctx.arc(stroke.points[0][0] - sx, stroke.points[0][1] - sy, stroke.width / 2, 0, Math.PI * 2);
  ctx.fill();
}

function redrawInk() {
  if (!inkCanvas) return;
  const area = document.getElementById("contentArea");
  const w = inkCanvas.clientWidth, h = inkCanvas.clientHeight;
  inkCtx.clearRect(0, 0, w, h);
  if (!inkOn) return;
  const sx = area.scrollLeft, sy = area.scrollTop;
  (inkStrokes[inkKey()] || []).forEach((s) => {
    inkStyle(inkCtx, s);
    const n = s.points.length;
    if (n === 1) { inkDot(inkCtx, s, sx, sy); return; }
    for (let k = 0; k < n; k++) inkSegment(inkCtx, s.points, k, sx, sy);
  });
}

function queueInkRedraw() {
  if (inkRedrawQueued) return;
  inkRedrawQueued = true;
  requestAnimationFrame(() => { inkRedrawQueued = false; redrawInk(); });
}

function syncInkCanvas() {
  if (!inkCanvas) return;
  const area = document.getElementById("contentArea");
  const a = area.getBoundingClientRect(), p = inkCanvas.parentElement.getBoundingClientRect();
  const w = area.clientWidth, h = area.clientHeight, dpr = window.devicePixelRatio || 1;
  inkCanvas.style.left = (a.left - p.left + area.clientLeft) + "px";
  inkCanvas.style.top = (a.top - p.top + area.clientTop) + "px";
  inkCanvas.style.width = w + "px";
  inkCanvas.style.height = h + "px";
  inkCanvas.width = Math.max(1, Math.round(w * dpr));
  inkCanvas.height = Math.max(1, Math.round(h * dpr));
  inkCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  redrawInk();
}

function inkPoint(e) {
  const r = inkCanvas.getBoundingClientRect(), area = document.getElementById("contentArea");
  return [e.clientX - r.left + area.scrollLeft, e.clientY - r.top + area.scrollTop];
}

function inkDown(e) {
  if (inkMode !== "draw" || inkCurrent) return;
  if (e.pointerType === "mouse" && e.button !== 0) return;
  e.preventDefault();
  try { inkCanvas.setPointerCapture(e.pointerId); } catch (err) { /* pointer already gone */ }
  inkPointerId = e.pointerId;
  inkCurrent = { color: inkColor, width: INK_WIDTH, points: [inkPoint(e)], done: 0 };
  inkList().push(inkCurrent);
  inkClearedBackup[inkKey()] = null;
  inkStyle(inkCtx, inkCurrent);
  inkDot(inkCtx, inkCurrent, document.getElementById("contentArea").scrollLeft, document.getElementById("contentArea").scrollTop);
  updateInkUI();
}

function inkMove(e) {
  if (!inkCurrent || e.pointerId !== inkPointerId) return;
  const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [];
  (events.length ? events : [e]).forEach((ev) => inkCurrent.points.push(inkPoint(ev)));
  const area = document.getElementById("contentArea"), p = inkCurrent.points;
  inkStyle(inkCtx, inkCurrent);
  for (let k = inkCurrent.done; k <= p.length - 2; k++) inkSegment(inkCtx, p, k, area.scrollLeft, area.scrollTop);
  inkCurrent.done = Math.max(inkCurrent.done, p.length - 1);
}

function inkUp(e) {
  if (!inkCurrent || e.pointerId !== inkPointerId) return;
  const p = inkCurrent.points, area = document.getElementById("contentArea");
  if (p.length > 1) { // the last half-segment is only drawn once the stroke ends
    inkStyle(inkCtx, inkCurrent);
    inkSegment(inkCtx, p, p.length - 1, area.scrollLeft, area.scrollTop);
  }
  inkCurrent = null;
  inkPointerId = null;
  updateInkUI();
}

function inkUndo() {
  const key = inkKey(), list = inkList();
  if (list.length) list.pop();
  else if (inkClearedBackup[key]) { inkStrokes[key] = inkClearedBackup[key]; inkClearedBackup[key] = null; }
  redrawInk();
  updateInkUI();
}

function inkClear() {
  const list = inkList();
  if (!list.length) return;
  inkClearedBackup[inkKey()] = list.slice();
  inkStrokes[inkKey()] = [];
  redrawInk();
  updateInkUI();
}

function setInkMode(mode) { inkMode = mode; updateInkUI(); }
function setInkColor(color) { inkColor = color; inkMode = "draw"; updateInkUI(); }

function toggleInk(force) {
  inkOn = typeof force === "boolean" ? force : !inkOn;
  if (inkOn) {
    if (!inkCanvas) buildInk();
    inkMode = "draw";
    syncInkCanvas();
  }
  updateInkUI();
  redrawInk();
}

function updateInkUI() {
  document.querySelectorAll("[data-ink-toggle]").forEach((b) => {
    b.classList.toggle("active", inkOn);
    b.setAttribute("aria-pressed", String(inkOn));
  });
  if (!inkCanvas) return;
  inkCanvas.classList.toggle("on", inkOn);
  inkCanvas.classList.toggle("draw", inkOn && inkMode === "draw");
  inkBar.classList.toggle("open", inkOn);
  inkBar.querySelectorAll("[data-ink-mode]").forEach((b) => b.classList.toggle("active", b.dataset.inkMode === inkMode));
  inkBar.querySelectorAll("[data-ink-color]").forEach((b) => b.classList.toggle("active", b.dataset.inkColor === inkColor));
  const list = inkStrokes[inkKey()] || [];
  inkBar.querySelector('[data-ink-action="undo"]').disabled = !list.length && !inkClearedBackup[inkKey()];
  inkBar.querySelector('[data-ink-action="clear"]').disabled = !list.length;
}

function buildInk() {
  const panel = document.querySelector(".main-panel");
  const area = document.getElementById("contentArea");

  inkCanvas = document.createElement("canvas");
  inkCanvas.className = "ink-canvas";
  panel.appendChild(inkCanvas);
  inkCtx = inkCanvas.getContext("2d");

  inkBar = document.getElementById("inkBar"); // lives inside the dock, above the pen button
  inkBar.innerHTML = `
    <button class="ink-btn" type="button" data-ink-mode="draw" title="Pen: write or draw" aria-label="Pen: write or draw"><i class="fa-solid fa-pen"></i></button>
    <button class="ink-btn" type="button" data-ink-mode="pointer" title="Pointer: use the page (click and scroll)" aria-label="Pointer: use the page"><i class="fa-solid fa-arrow-pointer"></i></button>
    ${INK_COLORS.map((c) => `<button class="ink-swatch" type="button" data-ink-color="${c.value}" style="--c:${c.value}" title="${c.name} pen" aria-label="${c.name} pen"></button>`).join("")}
    <button class="ink-btn" type="button" data-ink-action="undo" title="Undo" aria-label="Undo"><i class="fa-solid fa-rotate-left"></i></button>
    <button class="ink-btn" type="button" data-ink-action="clear" title="Clear all" aria-label="Clear all"><i class="fa-solid fa-trash-can"></i></button>
    <button class="ink-btn" type="button" data-ink-action="close" title="Close pen" aria-label="Close pen"><i class="fa-solid fa-xmark"></i></button>`;


  inkBar.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b || b.disabled) return;
    if (b.dataset.inkMode) setInkMode(b.dataset.inkMode);
    else if (b.dataset.inkColor) setInkColor(b.dataset.inkColor);
    else if (b.dataset.inkAction === "undo") inkUndo();
    else if (b.dataset.inkAction === "clear") inkClear();
    else if (b.dataset.inkAction === "close") toggleInk(false);
  });

  // Drawing
  inkCanvas.addEventListener("pointerdown", inkDown);
  inkCanvas.addEventListener("pointermove", inkMove);
  inkCanvas.addEventListener("pointerup", inkUp);
  inkCanvas.addEventListener("pointercancel", inkUp);
  // The mouse wheel keeps scrolling the page while the pen is active.
  inkCanvas.addEventListener("wheel", (e) => area.scrollBy(e.deltaX, e.deltaY), { passive: true });

  // Keep the canvas matched to the content area, and strokes glued to the content.
  area.addEventListener("scroll", queueInkRedraw, { passive: true });
  window.addEventListener("resize", syncInkCanvas);
  if (window.ResizeObserver) new ResizeObserver(syncInkCanvas).observe(area);
}

function initInk() {
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-ink-toggle]")) toggleInk();
  });
}

/* ---- copy to clipboard (with fallback for non-secure / file:// contexts) */
function copyCode(code, btn = document.getElementById("copyBtn")) {
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

  updateNavDock(); // refresh the dock's mark-as-covered icon
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

/* ---- start-up: runs after all <script> tags in index.html have executed --*/
function bootstrap() {
  // Console hint if a library file is missing, empty, or uses a wrong library id.
  LIBRARY_META.forEach((lib) => {
    if (!window.TOPICS.some((t) => t.library === lib.folder)) {
      console.warn("Analytics Lab: no topics registered for '" + lib.folder + "' - check its <script> tag in index.html");
    }
  });
  initApp();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}