/* =========================================================================
   pandas.js — Pandas library topics.
   Loaded by <script src="pandas.js"> in index.html (after app.js).
   Add further Pandas topics below with more registerTopic({...}) calls.
   ========================================================================= */

/* ---- Pandas Introduction (theory-only visual + runnable demo) ----------- */
(function () {
  const section = (num, title, body) => `
    <section class="intro-section">
      <div class="intro-section-head">
        ${num ? `<span class="intro-section-num">${num}</span>` : ""}
        <h3 class="intro-section-title">${title}</h3>
      </div>
      ${body}
    </section>`;

  const p = (text) => `<p class="intro-section-body">${text}</p>`;

  const chips = (items) => `
    <div class="intro-chip-grid">
      ${items.map(([icon, text]) => `<span class="intro-chip"><i class="${icon}"></i>${text}</span>`).join("")}
    </div>`;

  const callout = (icon, html) => `
    <div class="intro-callout">
      <i class="${icon}"></i>
      <div class="intro-callout-body">${html}</div>
    </div>`;

  const table = (heads, rows) => `
    <div class="intro-table-wrap">
      <table class="intro-table">
        <thead><tr>${heads.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>`;

  const bullets = (items) => `<ul class="intro-bullets">${items.map((t) => `<li>${t}</li>`).join("")}</ul>`;

  // A code example with its own copy button (handled in app.js via data-copy-code).
  const codeBlock = (label, code) => `
    <div class="intro-code">
      <div class="intro-code-header">
        <span class="intro-code-label"><i class="fa-brands fa-python"></i> ${label}</span>
        <button class="copy-btn" type="button" data-copy-code><i class="fa-regular fa-copy"></i><span>Copy code</span></button>
      </div>
      <pre><code>${escapeHtml(code)}</code></pre>
    </div>`;

  // Folder (next to index.html) that holds the topic images.
  const IMAGE_DIR = "attachments/";

  // Image slot: shows the picture if the file exists in IMAGE_DIR, otherwise
  // a dashed placeholder that names the exact path to add.
  const figure = (file, alt) => `
    <figure class="intro-figure" data-scale="1">
      <div class="intro-figure-stage">
        <img src="${IMAGE_DIR + file}" alt="${alt}" onerror="this.closest('.intro-figure').classList.add('is-missing')">
      </div>
      <div class="intro-figure-tools" role="group" aria-label="Image controls">
        <button class="img-tool-btn" type="button" data-img-action="full" title="View full screen" aria-label="View image full screen"><i class="fa-solid fa-expand"></i></button>
        <button class="img-tool-btn" type="button" data-img-action="in" title="Zoom in image" aria-label="Zoom in image"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
        <button class="img-tool-btn" type="button" data-img-action="out" title="Zoom out image" aria-label="Zoom out image" disabled><i class="fa-solid fa-magnifying-glass-minus"></i></button>
      </div>
      <div class="intro-figure-missing"><i class="fa-regular fa-image"></i><span>Add image: <code>${IMAGE_DIR + file}</code></span></div>
    </figure>`;

  const numlist = (cls, items) => `
    <ol class="intro-numlist ${cls}">
      ${items.map(([title, text]) => `<li><strong>${title}</strong> – ${text}</li>`).join("")}
    </ol>`;

  registerTopic({
    library: "pandas",
    id: "introduction",
    title: "Pandas Introduction",
    difficulty: "Beginner",
    summary: "What Pandas is, where it came from, the problem it solves, and how Series and DataFrames work.",

    visual(panel) {
      panel.classList.add("intro-panel");
      panel.innerHTML = `
        <div class="intro-hero">
          <span class="intro-hero-badge"><i class="fa-solid fa-table"></i></span>
          <div>
            <h2 class="intro-hero-title">Pandas</h2>
            <p class="intro-hero-tag">Python's library for data manipulation, analysis and processing</p>
          </div>
        </div>

        ${section("1", "Definition and Nomenclature",
          p("Pandas is an open-source Python library designed for data manipulation, data analysis, and data processing. It provides high-performance, easy-to-use data structures and tools for working with structured data.") +
          callout("fa-solid fa-tag", `<p><strong>Name origin:</strong> the name is derived from the econometric and statistical term “Panel Data”, which refers to multidimensional structured data observed over time. The library was designed to handle such structured datasets efficiently.</p>`) +
          p("<br>Pandas can ingest and process data from a variety of sources:") +
          chips([
            ["fa-solid fa-file-csv", "CSV files"],
            ["fa-solid fa-file-excel", "Excel spreadsheets"],
            ["fa-solid fa-database", "SQL database tables"],
            ["fa-solid fa-file-code", "JSON data"],
            ["fa-solid fa-chart-pie", "Statistical datasets"],
            ["fa-solid fa-briefcase", "Business datasets"],
          ])
        )}

        ${section("2", "Historical Development",
          table(["Year", "Milestone"], [
            ["2008", "Development of Pandas commenced."],
            ["2009", "Pandas became an open-source project."],
            ["2010s", "Adoption increased significantly in data science and analytics."],
            ["2015", "Pandas became a NumFOCUS-sponsored project."],
            ["Present", "One of the most widely used Python libraries for data analysis."],
          ]) +
          callout("fa-solid fa-user-tie", `
            <p><strong>Creator:</strong> Wes McKinney</p>
            <p><strong>Organization:</strong> AQR Capital Management (a quantitative investment management company)</p>
            <p><strong>Motivation:</strong> the need for a powerful Python tool to manipulate and analyze financial data. NumPy provided numerical computing capabilities, but a more convenient solution was required for tabular and labeled data.</p>`)
        )}

        ${section("3", "The Problem Pandas Solves",
          callout("fa-solid fa-hourglass-half", `<p><strong>Before Pandas</strong></p><p>Data scientists relied on Python lists, NumPy arrays, dictionaries, and custom functions to handle structured data. Working with large datasets using these tools became inconvenient and inefficient, as each operation required manually coded solutions.</p>`) +
          callout("fa-solid fa-bolt", `<p><strong>With Pandas</strong></p><p>Pandas introduced specialized data structures that made common data operations significantly easier. A single library now provides multiple integrated tools:</p>`) +
          chips([
            ["fa-solid fa-filter", "Filtering"],
            ["fa-solid fa-arrow-down-wide-short", "Sorting"],
            ["fa-solid fa-link", "Joining"],
            ["fa-solid fa-layer-group", "Grouping"],
            ["fa-solid fa-eraser", "Missing-value handling"],
            ["fa-solid fa-arrows-rotate", "Data transformation"],
          ]) +
          callout("fa-solid fa-lightbulb", `<p><strong>Takeaway:</strong> Pandas converts raw data into analysis-ready data, making it easier to analyze and understand.</p>`)
        )}

        ${section("4", "Core Functions of Pandas",
          p("Pandas transforms raw data into a structured, analyzable form through four primary functions:") +
          table(["Function", "What it covers"], [
            ["Data Access &amp; Organization", "Read the data · Organize the data · Select required information · Filter records"],
            ["Data Cleaning", "Clean incorrect data · Handle missing values · Remove duplicate records"],
            ["Data Analysis", "Calculate statistics · Group data · Combine datasets · Analyze trends"],
            ["Data Preparation", "Prepare data for visualization · Prepare data for machine learning"],
          ])
        )}

        ${section("5", "Features of Pandas",
          table(["Feature", "Description"], [
            ["Data Structures", "Series (1D) and DataFrame (2D)"],
            ["Data Cleaning", "Tools for handling missing, incorrect, or duplicate data"],
            ["Data Selection", "Efficient indexing and selection mechanisms"],
            ["Data Filtering", "Conditional extraction of records"],
            ["Data Aggregation", "Summary statistics and grouped computations"],
            ["Grouping", "Split-apply-combine operations"],
            ["Data Integration", "Merging and joining datasets"],
            ["File Handling", "Reading from and writing to multiple file formats"],
          ])
        )}

        ${section("6", "Applications of Pandas",
          p("Pandas is utilized across multiple domains:") +
          table(["Domain", "How Pandas is used"], [
            ["Data Analytics", "Exploratory data analysis and reporting"],
            ["Data Science", "End-to-end data workflows"],
            ["Business Analytics", "Business intelligence and decision support"],
            ["Machine Learning", "Feature engineering and data preprocessing"],
            ["Scientific Research", "Handling experimental and observational data"],
            ["Education", "Teaching data manipulation and analysis"],
          ])
        )}

        ${section("7", "Advantages of Pandas",
          numlist("is-pro", [
            ["Easy to Use", "intuitive API and syntax"],
            ["Powerful Data Structures", "Series and DataFrame"],
            ["Excellent Data Cleaning Capabilities", "robust handling of missing and inconsistent data"],
            ["Works Well with Other Python Libraries", "interoperability with NumPy, Matplotlib, Scikit-learn, etc."],
            ["Supports Multiple Data Formats", "CSV, Excel, SQL, JSON, and more"],
            ["Powerful Grouping and Aggregation", "efficient split-apply-combine operations"],
            ["Open Source", "freely available and community-supported"],
            ["Excellent for Tabular Data", "optimized for structured, spreadsheet-like data"],
          ])
        )}

        ${section("8", "Disadvantages of Pandas",
          numlist("is-con", [
            ["High Memory Usage", "in-memory processing can be resource-intensive"],
            ["Not Ideal for Extremely Large Datasets", "performance degrades with data that exceeds available memory"],
            ["Performance Limitations", "not optimized for all computational workloads"],
            ["Learning Curve", "requires time to master its full capabilities"],
            ["Not Primarily a Visualization Library", "relies on external libraries (e.g., Matplotlib, Seaborn) for visualization"],
          ])
        )}

        ${section("9.1", "Comparative Analysis: Pandas vs. NumPy",
          table(["Aspect", "NumPy", "Pandas"], [
            ["Purpose", "Numerical computing", "Data manipulation and analysis"],
            ["Data Structures", "Mainly arrays", "Series and DataFrames"],
            ["Data Types", "Primarily numerical data", "Numerical + categorical + textual data"],
            ["Labels", "Less focus on labels", "Strong support for labels"],
            ["Main Operations", "Mathematical operations", "Data cleaning and analysis"],
            ["Common Use", "Scientific computing", "Business/data analytics"],
          ])
        )}

        ${section("9.2", "Comparative Analysis: Pandas vs. Excel",
          table(["Aspect", "Excel", "Pandas"], [
            ["Interface", "GUI-based", "Programming-based"],
            ["Analysis", "Good for manual analysis", "Good for automated analysis"],
            ["Workflow", "Suitable for interactive spreadsheets", "Suitable for repeatable workflows"],
            ["Flexibility", "Limited programming flexibility", "Highly programmable"],
            ["Operations", "Manual operations are common", "Operations can be automated"],
            ["Typical Use", "Good for smaller business tasks", "Excellent for data-processing workflows"],
          ])
        )}

        ${section("10", "Core Data Structures: Series vs. DataFrame",
          table(["Feature", "Pandas Series", "Pandas DataFrame"], [
            ["Dimensionality", "1D (one-dimensional)", "2D (two-dimensional)"],
            ["Structure", "A single column with an index", "A spreadsheet-like table with rows and columns"],
            ["Data Types", "Contains elements of a single data type", "Can contain heterogeneous data types across columns"],
            ["Conceptual Analogy", "A standard Python list or a single Excel column", "A Python dictionary of lists or a full Excel sheet"],
            ["Creation Method", "<code>pd.Series(data)</code>", "<code>pd.DataFrame(data)</code>"],
          ])
        )}
      `;
    },
  });

  /* ---- Merging (joins with pd.merge) ------------------------------------ */
  // Same two small tables in every example, so students can compare the
  // four joins directly: customers 3 and 4 have no sales, and order 104
  // belongs to customer 5, who is not in the customers table.
  const joinDemo = (how, comment) => [
    "import pandas as pd",
    "",
    "customers = pd.DataFrame({",
    '    "CustomerID": [1, 2, 3, 4],',
    '    "Name": ["Asha", "Ravi", "Meera", "Kabir"],',
    "})",
    "sales = pd.DataFrame({",
    '    "OrderID": [101, 102, 103, 104],',
    '    "CustomerID": [1, 2, 2, 5],',
    '    "Amount": [250, 400, 150, 300],',
    "})",
    "",
    "# " + comment,
    `result = pd.merge(customers, sales, how="${how}", on="CustomerID")`,
    "print(result)",
  ].join("\n");

  // File names inside IMAGE_DIR. Rename here if your files are called something else.
  const MERGE_IMAGES = {
    types: "pandas-merge-join-types.png",
    inner: "pandas-merge-inner.png",
    outer: "pandas-merge-outer.png",
    left:  "pandas-merge-left.png",
    right: "pandas-merge-right.png",
  };

  const joinSection = (num, title, how, points, useCase, imageFile, imageAlt, comment) =>
    section(num, title,
      bullets(points) +
      callout("fa-solid fa-bullseye", `<p><strong>Use Case:</strong> ${useCase}</p>`) +
      codeBlock("Example", `pd.merge(customers, sales, how="${how}", on="CustomerID")`) +
      figure(imageFile, imageAlt) +
      codeBlock("Code example", joinDemo(how, comment))
    );

  registerTopic({
    library: "pandas",
    id: "merging",
    title: "Merging",
    difficulty: "Intermediate",
    summary: "Combine datasets with pd.merge() and see how inner, outer, left and right joins decide which rows appear.",

    visual(panel) {
      panel.classList.add("intro-panel");
      panel.innerHTML = `
        <div class="intro-hero">
          <span class="intro-hero-badge"><i class="fa-solid fa-code-merge"></i></span>
          <div>
            <h2 class="intro-hero-title">Merging</h2>
            <p class="intro-hero-tag">Combining datasets with pd.merge()</p>
          </div>
        </div>

        ${section("", "What is Merging?",
          bullets([
            "Merging is the process of combining two or more datasets into a single dataset.",
            "In real-world scenarios, data is often spread across multiple tables (like in relational databases).",
            "In Pandas, the function <code>pd.merge()</code> is mainly used for this purpose.",
            "Merging is done based on common columns (keys), such as <code>CustomerID</code>, <code>OrderID</code>, etc.",
          ])
        )}

        ${section("", "Syntax",
          codeBlock("Syntax", 'pd.merge(df1, df2, how="join_type", on="key_column")') +
          bullets([
            "<code>df1</code>, <code>df2</code> → DataFrames to merge.",
            '<code>how</code> → type of join (<code>"inner"</code>, <code>"outer"</code>, <code>"left"</code>, <code>"right"</code>).',
            "<code>on</code> → the column name on which merging happens (common column).",
          ])
        )}

        ${section("", "What are Joins?",
          bullets([
            "Join is a method of merging two datasets based on a common key.",
            "Concept comes from SQL (Structured Query Language), but Pandas supports the same.",
            "Joins decide which rows appear in the result depending on whether they exist in one or both DataFrames.",
          ])
        )}

        ${section("", "Types of Joins in Pandas",
          figure(MERGE_IMAGES.types, "The four join types in Pandas (inner, outer, left, right) shown as Venn diagrams")
        )}

        ${joinSection("1", "Inner Join", "inner",
          [
            "Returns only the rows that have matching values in both DataFrames.",
            "Intersection of sets.",
            "If a customer has no sales → they won’t appear.",
            "If a sale doesn’t belong to a customer → won’t appear.",
          ],
          "Find only customers who actually made purchases.",
          MERGE_IMAGES.inner, "Inner join: only the overlapping rows of customers and sales",
          "Inner join: only customers who have sales (and sales that have a customer)"
        )}

        ${joinSection("2", "Outer Join (Full Outer Join)", "outer",
          [
            "Returns all rows from both DataFrames.",
            "If there is no match → fills with NaN.",
            "Like a Union of sets.",
          ],
          "To see all customers and all sales (even unmatched ones).",
          MERGE_IMAGES.outer, "Outer join: all rows from both customers and sales",
          "Outer join: all customers and all sales, NaN where there is no match"
        )}

        ${joinSection("3", "Left Join", "left",
          [
            "Returns all rows from the left DataFrame + matching rows from right DataFrame.",
            "If there is no match in right → fills with NaN.",
            "Focuses on left DataFrame (customers).",
          ],
          "List all customers and their purchases (if any).",
          MERGE_IMAGES.left, "Left join: all customers plus their matching sales",
          "Left join: all customers, with their sales if any"
        )}

        ${joinSection("4", "Right Join", "right",
          [
            "Returns all rows from the right DataFrame + matching rows from left DataFrame.",
            "If no match in left → fills with NaN.",
            "Focuses on right DataFrame (sales).",
          ],
          "List all sales and include customer details (if available).",
          MERGE_IMAGES.right, "Right join: all sales plus their matching customers",
          "Right join: all sales, with customer details if available"
        )}
      `;
    },
  });

})();