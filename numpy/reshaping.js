registerTopic({
  library: "numpy",
  id: "reshape-aggregate",
  title: "Reshaping & Aggregation",
  difficulty: "Intermediate",
  summary: "Change the shape of an array without changing its data, and collapse arrays down with sum/mean/max along an axis.",

  visual: mountReshapeAnimation,

  code: `import numpy as np

# Start with a flat array of 12 values (shape: (12,))
arr = np.arange(12)
print("original:", arr.shape)
print(arr)

# Reshape into 3 rows of 4 columns — same data, new shape
grid = arr.reshape(3, 4)
print("\\nreshaped to (3, 4):")
print(grid)

# Reshape into 4 rows of 3 columns
grid2 = arr.reshape(4, 3)
print("\\nreshaped to (4, 3):")
print(grid2)

# Reshape into a 3D array: 2 blocks of 2 rows x 3 columns
cube = arr.reshape(2, 2, 3)
print("\\nreshaped to (2, 2, 3):")
print(cube)

# -1 tells NumPy to work out that dimension automatically
flat_again = cube.reshape(-1)
print("\\nflattened back:", flat_again.shape)
print(flat_again)

# Aggregation: collapse an axis down to a single summary value
print("\\ncolumn sums (axis=0):", grid.sum(axis=0))
print("row sums    (axis=1):", grid.sum(axis=1))
print("overall mean:", grid.mean())
`
});

/* -------------------------------------------------------------------------
   Reshape animation
   A strip of 12 numbered cells continuously regroups: 1D -> (3,4) -> (4,3)
   -> 3D(2,2,3) -> back to 1D, looping. The cell DOM nodes are physically
   moved between row containers each step (not recreated), so the browser's
   own layout transition shows the same values sliding into their new
   positions — that's the intuition this is meant to build: reshape
   reorders the *view*, the underlying 12 values never change.
   ---------------------------------------------------------------------- */
function mountReshapeAnimation(root) {
  injectReshapeStylesOnce();

  const N = 12;
  const STEPS = [
    {
      shape: "(12,)", call: "arr",
      rows: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
      caption: "A flat array of 12 elements, one after another."
    },
    {
      shape: "(3, 4)", call: "arr.reshape(3, 4)",
      rows: [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]],
      caption: "Same 12 values, regrouped into 3 rows of 4."
    },
    {
      shape: "(4, 3)", call: "arr.reshape(4, 3)",
      rows: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]],
      caption: "Same order, different grouping: 4 rows of 3."
    },
    {
      shape: "(2, 2, 3)", call: "arr.reshape(2, 2, 3)",
      rows: [[0, 1, 2], [3, 4, 5], "gap", [6, 7, 8], [9, 10, 11]],
      caption: "3D: two stacked blocks, each 2 rows of 3."
    },
    {
      shape: "(12,)", call: "arr.reshape(-1)",
      rows: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]],
      caption: "Flattened back to one dimension — the data never moved, only its shape did."
    }
  ];

  root.innerHTML = `
    <div class="reshape-demo">
      <div class="reshape-head">
        <span class="reshape-shape" id="rsShape">shape: (12,)</span>
        <span class="reshape-call" id="rsCall">arr</span>
      </div>
      <div class="reshape-stage" id="rsStage"></div>
      <p class="reshape-caption" id="rsCaption"></p>
      <div class="reshape-dots" id="rsDots"></div>
    </div>
  `;

  const stage = root.querySelector("#rsStage");
  const shapeLabel = root.querySelector("#rsShape");
  const callLabel = root.querySelector("#rsCall");
  const caption = root.querySelector("#rsCaption");
  const dotsWrap = root.querySelector("#rsDots");

  // Build the 12 persistent cell nodes once.
  const cells = [];
  const initialBlock = document.createElement("div");
  initialBlock.className = "reshape-block";
  const initialRow = document.createElement("div");
  initialRow.className = "reshape-row";
  initialBlock.appendChild(initialRow);
  stage.appendChild(initialBlock);
  for (let i = 0; i < N; i++) {
    const cell = document.createElement("div");
    cell.className = "reshape-cell";
    cell.textContent = i;
    initialRow.appendChild(cell);
    cells.push(cell);
  }

  STEPS.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "reshape-dot" + (i === 0 ? " active" : "");
    dotsWrap.appendChild(dot);
  });

  let idx = 0;

  function render(step) {
    const block = document.createElement("div");
    block.className = "reshape-block";
    stage.innerHTML = "";
    stage.appendChild(block);

    step.rows.forEach((r) => {
      if (r === "gap") {
        const spacer = document.createElement("div");
        spacer.className = "reshape-gap";
        block.appendChild(spacer);
        return;
      }
      const rowEl = document.createElement("div");
      rowEl.className = "reshape-row";
      block.appendChild(rowEl);
      r.forEach((val) => rowEl.appendChild(cells[val]));
    });

    shapeLabel.textContent = "shape: " + step.shape;
    callLabel.textContent = step.call;
    caption.textContent = step.caption;

    [...dotsWrap.children].forEach((d, i) => d.classList.toggle("active", i === idx));
  }

  render(STEPS[0]);

  const timer = setInterval(() => {
    idx = (idx + 1) % STEPS.length;
    render(STEPS[idx]);
  }, 2200);

  // Returned to app.js so it can clear this interval when the teacher
  // navigates away — otherwise it keeps ticking in the background forever.
  return () => clearInterval(timer);
}

function injectReshapeStylesOnce() {
  if (document.getElementById("reshape-anim-styles")) return;
  const style = document.createElement("style");
  style.id = "reshape-anim-styles";
  style.textContent = `
    .reshape-demo { max-width: 480px; margin: 0 auto; }
    .reshape-head {
      display: flex; align-items: baseline; justify-content: space-between;
      margin-bottom: 20px; flex-wrap: wrap; gap: 8px;
    }
    .reshape-shape {
      font-family: "JetBrains Mono", monospace; font-size: 14.5px; font-weight: 600;
      color: var(--accent); letter-spacing: 0.2px;
    }
    .reshape-call {
      font-family: "JetBrains Mono", monospace; font-size: 12px; color: var(--text-faint);
    }
    .reshape-stage {
      min-height: 176px; display: flex; align-items: center; justify-content: center;
    }
    .reshape-block { display: flex; flex-direction: column; gap: 7px; }
    .reshape-row { display: flex; gap: 7px; justify-content: center; }
    .reshape-gap { height: 3px; }
    .reshape-cell {
      width: 34px; height: 34px; border-radius: 6px; flex-shrink: 0;
      background: var(--bg-elevated); border: 1px solid var(--border); color: var(--text);
      font-family: "JetBrains Mono", monospace; font-size: 12.5px;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.4s ease, border-color 0.4s ease;
    }
    .reshape-caption {
      margin: 16px 0 0; font-size: 13px; color: var(--text-muted); text-align: center;
      min-height: 34px; max-width: 42ch; margin-left: auto; margin-right: auto;
    }
    .reshape-dots { display: flex; gap: 6px; justify-content: center; margin-top: 10px; }
    .reshape-dot {
      width: 6px; height: 6px; border-radius: 50%; background: var(--border);
      transition: background 0.3s ease, transform 0.3s ease;
    }
    .reshape-dot.active { background: var(--accent); transform: scale(1.3); }
    @media (prefers-reduced-motion: reduce) {
      .reshape-cell { transition: none; }
    }
  `;
  document.head.appendChild(style);
}