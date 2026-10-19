/* =========================================================================
   python.js — Python language topics (concept by concept, not unit by unit).
   Loaded by <script src="python.js"> in index.html (after app.js).
   Same layout as pandas.js: a hero, then numbered sections made from the
   small helpers below (p, bullets, table, callout, codeBlock, figure ...).

   To add a topic: copy any topic({...}, () => [...]) block at the bottom and
   change its id / title / content. Topics appear in the sidebar in the order
   they are written in this file.

   Images: put them in the "attachments" folder next to index.html, using the
   same file names that figure("...") shows. A missing image shows a dashed
   placeholder with the exact path to add.
   ========================================================================= */

(function () {
  // Folder (next to index.html) that holds the topic images.
  const IMAGE_DIR = "attachments/";

  /* ---- small HTML helpers (same look as the Pandas topics) -------------- */
  const section = (num, title, ...parts) => `
    <section class="intro-section">
      ${title ? `<div class="intro-section-head">
        ${num ? `<span class="intro-section-num">${num}</span>` : ""}
        <h3 class="intro-section-title">${title}</h3>
      </div>` : ""}
      ${parts.join("")}
    </section>`;

  const p = (text) => `<p class="intro-section-body">${text}</p>`;
  const sub = (text) => `<h4 class="intro-subhead">${text}</h4>`;
  const minor = (text) => `<h5 class="intro-subhead is-minor">${text}</h5>`;

  const bullets = (items) => `<ul class="intro-bullets">${items.map((t) => `<li>${t}</li>`).join("")}</ul>`;
  const olist = (items) => `<ol class="intro-numlist">${items.map((t) => `<li>${t}</li>`).join("")}</ol>`;

  const callout = (icon, html) => `
    <div class="intro-callout">
      <i class="${icon}"></i>
      <div class="intro-callout-body">${html}</div>
    </div>`;

  const table = (heads, rows) => `
    <div class="intro-table-wrap">
      <table class="intro-table is-wrap">
        ${heads.length ? `<thead><tr>${heads.map((h) => `<th>${h}</th>`).join("")}</tr></thead>` : ""}
        <tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>`;

  // For tables that mix <th> and <td> in the body: pass the inner markup as it is.
  const tableRaw = (html) => `
    <div class="intro-table-wrap">
      <table class="intro-table is-wrap">${html}</table>
    </div>`;

  // Two side-by-side columns, e.g. "Use lists when" / "Use tuples when".
  const col = (title, items) => `
    <div class="intro-split-col">
      <h4>${title}</h4>
      ${bullets(items)}
    </div>`;
  const split = (...cols) => `<div class="intro-split">${cols.join("")}</div>`;

  // A code example with its own copy button (handled in app.js via data-copy-code).
  const codeBlock = (label, code, icon = "fa-brands fa-python") => `
    <div class="intro-code">
      <div class="intro-code-header">
        <span class="intro-code-label"><i class="${icon}"></i> ${label}</span>
        <button class="copy-btn" type="button" data-copy-code><i class="fa-regular fa-copy"></i><span>Copy code</span></button>
      </div>
      <pre><code>${escapeHtml(code)}</code></pre>
    </div>`;

  // Image slot: shows the picture if the file exists in IMAGE_DIR, otherwise
  // a dashed placeholder that names the exact path to add.
  const figure = (file, alt) => `
    <figure class="intro-figure" data-scale="1">
      <div class="intro-figure-stage">
        <img src="${IMAGE_DIR + file}" alt="${alt.replace(/"/g, "&quot;")}" onerror="this.closest('.intro-figure').classList.add('is-missing')">
      </div>
      <div class="intro-figure-tools" role="group" aria-label="Image controls">
        <button class="img-tool-btn" type="button" data-img-action="full" title="View full screen" aria-label="View image full screen"><i class="fa-solid fa-expand"></i></button>
        <button class="img-tool-btn" type="button" data-img-action="in" title="Zoom in image" aria-label="Zoom in image"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
        <button class="img-tool-btn" type="button" data-img-action="out" title="Zoom out image" aria-label="Zoom out image" disabled><i class="fa-solid fa-magnifying-glass-minus"></i></button>
      </div>
      <div class="intro-figure-missing"><i class="fa-regular fa-image"></i><span>Add image: <code>${IMAGE_DIR + file}</code></span></div>
    </figure>`;

  // Registers one topic: hero (icon, title, concept group) + the body sections.
  const topic = (meta, body) => registerTopic({
    library: "python",
    id: meta.id,
    title: meta.title,
    difficulty: meta.difficulty,
    summary: meta.summary,

    visual(panel) {
      panel.classList.add("intro-panel");
      panel.innerHTML = `
        <div class="intro-hero">
          <span class="intro-hero-badge"><i class="${meta.icon}"></i></span>
          <div>
            <h2 class="intro-hero-title">${meta.title.replace(/&/g, "&amp;")}</h2>
            <p class="intro-hero-tag">Python · ${meta.category.replace(/&/g, "&amp;")}</p>
          </div>
        </div>
        ${body().join("")}`;
    },
  });

  /* =====================================================================
     TOPICS (in sidebar order)
     ===================================================================== */

  topic({
    id: "intro-programming-languages",
    title: "Introduction to Programming Languages",
    difficulty: "Beginner",
    summary: "Instructions, programs and programming, plus the five generations of programming languages.",
    icon: "fa-solid fa-laptop-code",
    category: "Getting Started",
  }, () => [
    section("1", "The Building Blocks",
      sub("Instruction"),
      p("An instruction is the smallest unit of work in a computer program. It's a single command that tells the processor to perform a task (for example: add two numbers or store a value)."),
      callout("fa-solid fa-book", "<p><strong>Definition:</strong> A specific direction that tells the processor to perform a task.</p>"),
      callout("fa-solid fa-lightbulb", "<p><strong>Analogy:</strong> In a recipe, one instruction would be: \"Add two cups of flour.\"</p>"),
      p("<strong>Example in Python:</strong> <code>x = 5</code> — store number 5 in a variable named <code>x</code>.")
    ),
    section("2", "Program: The Collection",
      p("A program is a sequence of instructions written in a specific order to achieve a particular result."),
      callout("fa-solid fa-book", "<p><strong>Definition:</strong> A set of instructions stored in a file that can be executed by a computer to perform a specific function.</p>"),
      p("<strong>How it works:</strong> Computers typically read programs top-to-bottom. If the order is wrong the program may fail or produce incorrect output."),
      callout("fa-solid fa-lightbulb", "<p><strong>Analogy:</strong> A single instruction is an ingredient; the whole recipe card (the program) allows you to bake a cake.</p>"),
      p("<strong>Examples:</strong> The calculator on your phone, a web browser (Chrome), a Python script that calculates student grades.")
    ),
    section("3", "Programming: The Process",
      p("Programming is designing, writing, testing, and maintaining the instructions that make up a program."),
      p("Computers speak binary (0s and 1s). Programming languages (Python, Java, C++) let humans write instructions at a higher level which are then translated to machine code."),
      sub("Typical Workflow"),
      olist([
      "<strong>Problem Solving:</strong> Decide what you want to achieve.",
      "<strong>Writing Code:</strong> Type the instructions in a programming language.",
      "<strong>Debugging:</strong> Find and fix errors (bugs).",
      "<strong>Maintaining:</strong> Update and improve the code over time.",
    ]),
      callout("fa-solid fa-bullseye", "<p><strong>Goal:</strong> Automate tasks and solve problems efficiently.</p>")
    ),
    section("4", "Generations of Programming Languages",
      figure("generations.png", "Features & Advantages"),
      p("Programming languages evolved through generations (1GL → 5GL) to become more human-friendly, efficient, and abstract."),
      figure("programming-generations.png", "Features & Advantages"),
      sub("1GL — Machine Language"),
      bullets([
      "Written in binary (0s and 1s).",
      "Very fast for computers, but extremely hard for humans.",
      "Example: <code>10101010</code>",
    ]),
      sub("2GL — Assembly Language"),
      bullets([
      "Uses mnemonics (MOV, ADD, SUB) instead of raw binary.",
      "Requires an assembler to convert to machine code.",
      "Still low-level and machine dependent.",
    ]),
      sub("3GL — High-Level Languages"),
      bullets([
      "English-like syntax; easier to learn and (mostly) machine independent.",
      "Uses compilers or interpreters to translate to machine code.",
      "Examples: C, C++, Java, Python.",
    ]),
      sub("4GL — Very High-Level Languages"),
      bullets([
      "Focus on what to achieve rather than how to do it.",
      "Often used for data management and rapid development.",
      "Examples: SQL, MATLAB.",
    ]),
      sub("5GL — AI &amp; Logic-Based Languages"),
      bullets([
      "Programmer defines the problem; the system finds solutions using logic/constraints.",
      "Examples: Prolog, Mercury.",
    ]),
      p("As technology advanced, languages became easier to use, more efficient, and more abstract (hiding low-level details).")
    ),
    section("5", "Types of Programming Languages",
      p("Different languages exist for different purposes. Examples:"),
      bullets([
      "<strong>Scripting Languages:</strong> JavaScript, VBScript, PHP, Python, Perl, Ruby",
      "<strong>Command Languages:</strong> Bash, sh, ch",
      "<strong>Document Formatting:</strong> TeX, PostScript, LaTeX",
      "<strong>Web Display:</strong> HTML, CSS, XML",
    ])
    ),
    section("6", "Conclusion",
      bullets([
      "An <strong>instruction</strong> is a single command (e.g., <code>x = 5</code>).",
      "A <strong>program</strong> is a sequence of instructions that achieves a goal.",
      "<strong>Programming</strong> is the process of creating, testing, and maintaining programs.",
      "Languages evolved from 1GL (machine) → 5GL (logic/AI) to improve usability, efficiency, and abstraction.",
    ])
    ),
  ]);

  topic({
    id: "what-is-python",
    title: "What is Python?",
    difficulty: "Beginner",
    summary: "What Python is, who created it, how it got its name and what influenced its design.",
    icon: "fa-brands fa-python",
    category: "Getting Started",
  }, () => [
    section("", "",
      p("Python is a general-purpose, dynamic, high-level, interpreted, object-oriented programming language that is easy to learn and widely used in modern technologies."),
      figure("guido_van_rossum.png", "Guido van Rossum"),
      p("Developed by Guido van Rossum at Centrum Wiskunde &amp; Informatica (CWI) in the Netherlands, development began in 1989 and Python was officially released in 1991.")
    ),
    section("1", "Why it's called \"Python\"",
      p("It is a common mistake to think Python was named after the snake! In reality, the name has a much more \"comedic\" origin."),
      sub("The Real Story"),
      p("Python was created by a Dutch programmer named Guido van Rossum in the late 1980s. At the time, he was reading published scripts from \"Monty Python’s Flying Circus,\" a famous BBC comedy sketch show from the 1970s."),
      p("When he needed a name for his new language, he wanted something that was:"),
      bullets([
      "Short",
      "Unique",
      "Slightly mysterious",
    ]),
      p("Being a big fan of the comedy troupe, he chose Python. He wanted to capture the \"fun\" and \"irreverent\" spirit of the show rather than the image of a scary reptile."),
      sub("If it's not a snake, why the snake logo?"),
      p("Even though the name comes from a TV show, the community eventually embraced the snake theme."),
      bullets([
      "<strong>The Logo:</strong> The official Python logo features two interlocking snakes (usually blue and yellow).",
      "<strong>The Terms:</strong> We use terms like \"Snake Case\" (writing_code_like_this) and \"Anaconda\" (a popular distribution for data science).",
    ]),
      sub("Fun Fact"),
      p("Because of the Monty Python connection, you will often find references to the show in Python tutorials. For example, instead of using the standard \"foo\" and \"bar\" as placeholder names, Python documentation often uses \"spam\" and \"eggs\" (a nod to a famous Monty Python sketch).")
    ),
    section("2", "Background &amp; Need for Python",
      p("In the late 1980s and early 1990s, many popular languages had trade-offs:"),
      bullets([
      "<strong>C / C++</strong> — powerful but complex syntax and manual memory management.",
      "<strong>Perl</strong> — great for scripting but often hard to read and maintain.",
    ]),
      p("There was a need for a language that was simple and readable, powerful like C, flexible like scripting languages, and suitable for both small scripts and large applications. Python was designed to bridge the gap between system-level languages and scripting languages.")
    ),
    section("3", "Influences on Python's Design",
      bullets([
      "<strong>ABC</strong> — inspired simple syntax and indentation-based structure.",
      "<strong>C</strong> — influenced core design and extension via C modules.",
      "<strong>Modula-3</strong> — provided ideas for modules and exception handling.",
      "<strong>Perl</strong> — influenced scripting capabilities and string handling.",
      "<strong>Lisp</strong> — contributed functional programming concepts and dynamic typing.",
    ])
    ),
    section("4", "Trending Growth &amp; Demand (2026)",
      p("As of 2026, Python continues to be widely adopted across industries, driven by its role in AI, data, automation, and cloud tooling."),
      olist([
      "<strong>Artificial Intelligence &amp; Machine Learning</strong><br> Python is the primary language for modern AI and deep learning, powering frameworks like PyTorch and TensorFlow and tooling for Explainable AI (XAI) such as SHAP and LIME.",
      "<strong>Performance &amp; Technical Evolution</strong><br> Recent improvements have addressed historic performance concerns: <ul> <li><strong>NoGIL</strong> — removal of the Global Interpreter Lock enables true parallelism on multi-core systems.</li> <li><strong>JIT Compilation</strong> — Just-In-Time compilation boosts execution speed.</li> <li><strong>Edge Computing</strong> — frameworks like TensorFlow Lite and PyTorch Mobile enable Python models on devices and wearables.</li> </ul>",
      "<strong>Market Demand &amp; Careers</strong><br> Strong demand for Python skills in AI, data science, automation, and DevOps. Roles include AI Engineers, ML Engineers, Data Scientists, and Cloud/Automation specialists.",
    ])
    ),
  ]);

  topic({
    id: "features-advantages",
    title: "Features, Advantages & Disadvantages",
    difficulty: "Beginner",
    summary: "The key features of Python, with its advantages and disadvantages.",
    icon: "fa-solid fa-star",
    category: "Getting Started",
  }, () => [
    section("", "",
      figure("python features.png", "Features & Advantages"),
      sub("Core Features of Python"),
      olist([
      "<strong>High-Level Language</strong><br> Python is designed to be easy for humans to read and write. It uses English-like words, so you don't have to worry about the complex technical details of the computer's hardware.",
      "<strong>Interpreted</strong><br> Python executes code line-by-line. This makes it very easy to test small pieces of code and find errors quickly.<br><br> <em>Example:</em> If there is an error on line 10, Python will run lines 1–9 and then stop, telling you exactly where the problem is.",
      "<strong>Dynamic Typing</strong><br> In Python, you don't need to declare what type of data a variable holds (like a number or text) before using it. The language \"figures it out\" automatically while the program is running.",
      "<strong>General-Purpose</strong><br> Python isn't limited to just one type of task. It can be used for web development, data analysis, artificial intelligence, scientific research, and more.",
      "<strong>Large Standard Library</strong><br> Python comes with a \"built-in toolkit\". This library contains pre-written code for many common tasks—like connecting to web servers or reading files—so you don't have to write everything from scratch.",
    ]),
      sub("Flexibility and Accessibility"),
      olist([
      "<strong>Open Source</strong><br> Python is free to use, and its original source code is available for anyone to see, modify, and improve. This has created a massive global community that constantly updates the language.",
      "<strong>Portable / Cross-Platform</strong><br> Python code is \"write once, run anywhere\". A program written on a Windows computer will usually run on a Mac or a Linux system without needing major changes.",
      "<strong>Multi-Paradigm</strong><br> Python supports different \"styles\" of programming. Whether you want to use Object-Oriented programming (organizing code into objects) or Procedural programming (a list of steps), Python allows you to choose the best fit for your project.",
    ]),
      sub("Advanced Capabilities"),
      olist([
      "<strong>GUI Programming</strong><br> Python can be used to create Graphical User Interfaces (GUIs). This means you can build desktop applications with windows, buttons, and menus rather than just text-based programs.<br><br> <em>Example:</em> Apps like a calculator or a simple photo editor.",
      "<strong>Scalable</strong><br> Python is \"scalable,\" meaning it can handle small, simple scripts just as well as it handles massive, complex systems used by giant companies like Google or Netflix.",
    ])
    ),
    section("", "Advantages of Python",
      minor("1. Easy to Learn and Use"),
      p("Python has a very simple and readable syntax. Its code looks almost like normal English, so beginners can easily understand it. There is no need to use complex symbols or brackets like in other programming languages. Because of this, students can focus more on logic rather than syntax rules. Python is widely used as a first programming language for beginners."),
      minor("2. Versatile and Flexible"),
      p("Python can be used in many different fields such as web development, data science and data analysis, artificial intelligence and machine learning, automation and scripting, and game development. The same Python language can be used for small programs as well as large applications. This makes Python a multi-purpose and flexible language."),
      minor("3. Improved Productivity"),
      p("Python allows developers to write programs with fewer lines of code compared to languages like C or Java. This reduces development time and effort. Many ready-made libraries and frameworks are available, so developers do not need to write everything from scratch. As a result, work can be completed faster and productivity increases."),
      minor("4. Highly Secure"),
      p("Python provides good support for secure coding practices. It has built-in features that help in writing safe and reliable programs. Many security tools and libraries are available in Python to handle encryption, authentication, and secure communication. Because of this, Python is also used in cybersecurity applications."),
      minor("5. Strong Community Support"),
      p("Python has a very large and active community of developers. If a programmer faces any problem, solutions are easily available online. There are many tutorials, documentation, videos, and discussion forums. Continuous updates and improvements are made because of strong community support.")
    ),
    section("", "Disadvantages of Python",
      minor("1. Slow Speed"),
      p("Python is an interpreted language, which means it executes code line by line. This makes Python slower compared to compiled languages like C or C++. For applications that require very high performance, Python may not be the best choice."),
      minor("2. Memory Inefficient"),
      p("Python programs use more memory compared to other programming languages. This is because Python stores extra information about data types and objects. Due to high memory usage, Python is not suitable for applications with limited memory."),
      minor("3. Weak Mobile Computation"),
      p("Python is not commonly used for mobile application development. Languages like Java, Kotlin, and Swift are preferred for Android and iOS apps. Although some frameworks exist, Python is still weak in mobile computing."),
      minor("4. Poor Database Access"),
      p("Python’s database access layer is not as strong as some other languages. It may be slower while working with very large and complex databases. For heavy database-driven applications, other languages may perform better."),
      minor("5. Runtime Errors"),
      p("Python checks errors only during program execution (runtime). Errors are not detected during compilation because Python has no compilation step. If the programmer is not careful, runtime errors may occur while running the program.")
    ),
  ]);

  topic({
    id: "history-versions",
    title: "History & Versions",
    difficulty: "Beginner",
    summary: "How Python evolved through Python 1, 2 and 3 and what each version introduced.",
    icon: "fa-solid fa-clock-rotate-left",
    category: "Getting Started",
  }, () => [
    section("", "Major Versions of Python",
      figure("python-versions.png", "Python Versions Timeline"),
      p("Python has evolved through multiple<br> Each major version introduced new features and improvements<br> The versions are mainly classified as:<br> Python 1.x (1991)<br> Python 2.x (2000)<br> Python 3.x (2008 - Present)"),
      sub("Python 1.x (1991)"),
      bullets([
      "First official release of the Python programming language",
      "Focused on simplicity, readability, and ease of use",
      "Laid the foundation for future Python versions",
    ]),
      minor("Key Features"),
      bullets([
      "Supported core data types: Numbers, strings, and lists",
      "Provided: Functions and modular programming, Basic exception handling",
      "Suitable for: Small programs, Scripting tasks",
      "Mainly used in: Academic environments, Research-based applications",
      "Had limited library support compared to later versions",
    ]),
      sub("Python 2.x (2000)"),
      bullets([
      "Released to improve performance and usability over Python 1.x",
      "Became the most widely adopted version of Python for many years",
      "Extensively used in:<ul> <li>Industry applications</li> <li>Web development</li> <li>System scripting</li> </ul>",
    ]),
      minor("Key Improvements"),
      bullets([
      "Introduced important features:<ul> <li>List comprehensions</li> <li>Automatic garbage collection</li> <li>Limited Unicode support</li> </ul>",
      "Faster execution compared to Python 1.x",
      "Supported a large number of third-party libraries",
    ]),
      minor("End of Python 2.x &amp; Language Changes"),
      bullets([
      "Python 2.7 was the final release in the 2.x series",
      "Backward compatibility:<ul> <li>Slowed innovation and modernization</li> </ul>",
      "Official support ended in January 2020",
      "Developers were encouraged to migrate to Python 3",
    ]),
      minor("Syntax Differences (Python 2 → Python 3)"),
      bullets([
      "Input handling:<ul> <li>Python 2: raw_input() and input()</li> <li>Python 3: only input()</li> </ul>",
      "Print statement:<ul> <li>Python 2: print \"Hello\"</li> <li>Python 3: print(\"Hello\") (function)</li> </ul>",
    ]),
      sub("Python 3.x (2008 – Present)"),
      bullets([
      "Designed to overcome the limitations of Python 2",
      "Focused on:<ul> <li>Long-term improvement</li> <li>Code clarity and consistency</li> </ul>",
      "Not backward compatible with Python 2",
      "Represents a major redesign of the Python language",
    ]),
      minor("Key Improvements"),
      bullets([
      "Unicode support by default",
      "Improved standard libraries",
      "Better performance and stronger security",
      "Suitable for modern and large-scale applications",
    ]),
      minor("Major Python 3 Versions &amp; Enhancements"),
      bullets([
      "Python 3.6: Introduced f-strings for easy string formatting",
      "Python 3.8: Introduced Walrus operator (:=) for assignment in expressions",
      "Python 3.9: Added dictionary merge and update operators",
      "Python 3.10: Introduced Structural Pattern Matching",
      "Python 3.11: Major performance improvements",
      "Python 3.12+: Cleaner internal architecture, Further speed and efficiency enhancements",
    ]),
      minor("Python 3 Present &amp; Future"),
      bullets([
      "All new features are released only in Python 3",
      "Widely used in:<ul> <li>Web development</li> <li>Data science</li> <li>Artificial Intelligence</li> <li>Automation and cybersecurity</li> </ul>",
      "Considered the official and future version of Python",
    ])
    ),
  ]);

  topic({
    id: "applications",
    title: "Applications of Python in Various Fields",
    difficulty: "Beginner",
    summary: "Where Python is used: education, business, healthcare, media, banking, space and more.",
    icon: "fa-solid fa-industry",
    category: "Getting Started",
  }, () => [
    section("", "",
      p("Python is a high-level, easy-to-learn programming language. Because of its simplicity and powerful libraries, Python is used in many fields. One language → many uses."),
      figure("applications of python.png", "Python Applications"),
      sub("1. Education &amp; Teaching"),
      p("<strong>Uses:</strong> Teaching programming, simple programs &amp; assignments, quizzes, online learning platforms."),
      p("<strong>Why:</strong> Easy syntax, less boilerplate, students focus on concepts."),
      sub("2. Business &amp; Finance"),
      p("<strong>Uses:</strong> Data analysis &amp; reporting, sales/profit prediction, financial calculations, task automation."),
      p("<strong>Why:</strong> Powerful libraries (NumPy, pandas), automation saves time, aids decision making."),
      sub("3. Healthcare &amp; Medical"),
      p("<strong>Uses:</strong> Medical data analysis, patient records, disease prediction, medical image processing."),
      p("<strong>Why:</strong> Handles large data, strong ML support, used in research and diagnostics."),
      sub("4. Entertainment &amp; Media"),
      p("<strong>Uses:</strong> Animation &amp; VFX, game development, audio/video processing, recommendation systems."),
      p("<strong>Why:</strong> Fast development, integrates with graphics tools and pipelines."),
      sub("5. Banking &amp; Government"),
      p("<strong>Uses:</strong> Banking software, fraud detection, secure transactions, government portals."),
      p("<strong>Why:</strong> Robust libraries, scalability, strong security practices."),
      sub("6. Space &amp; Defense"),
      p("<strong>Uses:</strong> Space research simulations, satellite data analysis, defense modeling, scientific calculations."),
      p("<strong>Why:</strong> High accuracy, used by research organisations, supports complex computations."),
      sub("7. Robotics &amp; Embedded Systems"),
      p("<strong>Uses:</strong> Robot control, sensor interfacing, automation systems, IoT."),
      p("<strong>Why:</strong> Simple control logic, many hardware libraries, rapid prototyping."),
      sub("8. Manufacturing &amp; Industry"),
      p("<strong>Uses:</strong> Machine automation, production monitoring, quality control, predictive maintenance."),
      p("<strong>Why:</strong> Improves accuracy, reduces human effort, cost &amp; time savings."),
      sub("9. Agriculture"),
      p("<strong>Uses:</strong> Crop-yield prediction, weather analysis, smart irrigation, farm-data analytics."),
      p("<strong>Why:</strong> Enables data-driven decisions, uses AI for productivity gains."),
      sub("10. Science &amp; Research"),
      p("<strong>Uses:</strong> Scientific experiments, data visualization, mathematical modeling, simulations."),
      p("<strong>Why:</strong> Extensive research libraries, easy prototyping, academic acceptance.")
    ),
  ]);

  topic({
    id: "installation-ide",
    title: "Installation Setup & IDE's",
    difficulty: "Beginner",
    summary: "Installing Python and choosing an IDE or editor to write and run programs.",
    icon: "fa-solid fa-download",
    category: "Getting Started",
  }, () => [
    section("", "Setting up your environment",
      p("Preparing your system is the first step to writing and running Python code."),
      sub("Installing Python"),
      olist([
      "<strong>Download:</strong> Visit <a href=\"https://python.org\" target=\"_blank\" rel=\"noopener\">python.org</a> and download the latest installer for your OS.",
      "<strong>\"Add to PATH\" (Crucial on Windows):</strong> During installation check the box \"Add Python to PATH\". If you skip this, the <code>python</code> command won't work in Command Prompt.",
      "<strong>Verify:</strong> Open Command Prompt (Windows) or Terminal (macOS/Linux) and run: <code>python --version</code>",
    ]),
      sub("What is an IDE?"),
      p("An IDE (Integrated Development Environment) or code editor helps you write, run, and debug code more efficiently."),
      p("<strong>Code Editor:</strong> Lightweight editor focused on editing (e.g., VS Code).<br> <strong>IDE:</strong> Full-featured environment with debugger, project tools, and integrations (e.g., PyCharm)."),
      sub("Popular Python Editors &amp; IDEs"),
      bullets([
      "<strong>A. IDLE</strong> — Simple editor that comes with Python. Good for absolute beginners.",
      "<strong>B. VS Code</strong> — Lightweight, extensible. Install the \"Python\" extension by Microsoft for autocompletion, linting, and debugging.",
      "<strong>C. PyCharm</strong> — Full-featured IDE (Community &amp; Professional). Great for large projects; uses more RAM.",
      "<strong>D. Jupyter Notebook</strong> — Best for data analysis and reports; lets you mix code cells with markdown and visuals.",
    ]),
      sub("Quick Setup Tips"),
      bullets([
      "Always check \"Add to PATH\" on Windows.",
      "Use a virtual environment: <code>python -m venv venv</code> to isolate project dependencies.",
      "Install editor extensions: linters (flake8), formatters (black), and the Python extension for VS Code.",
    ]),
      sub("Verify Workflow"),
      p("Open your editor/IDE, create <code>hello.py</code> with <code>print(\"Hello, Python\")</code>, then run <code>python hello.py</code> in a terminal to confirm everything works.")
    ),
  ]);

  topic({
    id: "first-program",
    title: "Basic Syntax & First Python Program",
    difficulty: "Beginner",
    summary: "Basic Python syntax and writing your first program.",
    icon: "fa-solid fa-play",
    category: "Python Basics",
  }, () => [
    section("", "Basic Syntax of Python",
      callout("fa-solid fa-book", "<p><strong>Simple Definition:</strong> Syntax is the correct way of writing Python code so that Python can understand and execute it.</p>"),
      sub("Why Python Syntax is Special?"),
      bullets([
      "Simple",
      "English-like",
      "Less symbols",
      "Easy for beginners and non-tech students",
    ]),
      sub("Basic Elements of Syntax"),
      bullets([
      "Comments",
      "Keywords",
      "Variables",
      "Data Types",
      "Indentation",
      "Functions",
      "Escape Sequences",
      "Control Statements",
      "Operators",
    ])
    ),
    section("", "Writing Your First Python Program",
      p("Example:"),
      codeBlock("Python", `print("Hello, World!")`),
      p("Explanation:"),
      bullets([
      "<code>print()</code> — a built-in function that outputs text to the screen.",
      "<code>\"Hello, World!\"</code> — a string (text inside quotes).",
      "This single line instructs Python to display the provided text.",
    ])
    ),
  ]);

  topic({
    id: "comments",
    title: "Comments",
    difficulty: "Beginner",
    summary: "Single-line and multi-line comments, and why they matter.",
    icon: "fa-solid fa-comment",
    category: "Python Basics",
  }, () => [
    section("1", "What is a Comment?",
      p("In Python, a <strong>comment</strong> is a piece of text inside your code that the computer completely ignores. It’s written in plain English (or any language) to explain what the code is doing."),
      callout("fa-solid fa-book", "<p><strong>Formal Definition:</strong> A comment is a line of text ignored by the Python interpreter, used to make code easier for humans to read and understand.</p>")
    ),
    section("2", "Why Are Comments Important?",
      p("Coding is rarely a solo, one-time task. You need comments because:"),
      bullets([
      "<strong>For You:</strong> They help you keep track of your logic while you write.",
      "<strong>For Your Team:</strong> If someone else looks at your code, they can understand your \"why\" without having to guess.",
      "<strong>For Future You:</strong> If you open your code after 6 months, you might forget why you wrote a specific line. Comments act as a \"note to self.\"",
      "<strong>Interview Prep:</strong> Being able to explain your code clearly is a key skill; comments help you structure those explanations.",
    ]),
      p("<strong>The Risk of No Comments:</strong><br>No comments make code a \"black box\"—confusing to fix, hard to maintain, and difficult to explain to others.")
    ),
    section("3", "Single-Line Comments",
      p("These are the most common types of comments. They are used for quick, short explanations."),
      sub("Method 1: Standard Single-Line"),
      p("You start the line with the hash symbol (<code>#</code>). Everything after the <code>#</code> on that line is ignored."),
      p("<strong>Syntax:</strong> <code># Your comment here</code>"),
      p("<strong>Example:</strong>"),
      codeBlock("Python", `# This program greets the students
print("Hello MBA Students")`),
      sub("Method 2: Inline Comment"),
      p("Placed on the <strong>same line</strong> as the code, usually at the end. Great for explaining a specific variable."),
      codeBlock("Python", `marks = 75  # This variable stores the student's marks`)
    ),
    section("4", "Multi-Line Comments",
      p("When you need a longer explanation or a paragraph, you have two main options:"),
      sub("Method 1: Multiple <code>#</code> Symbols (Recommended)"),
      p("Put a <code>#</code> at the start of every new line."),
      codeBlock("Python", `# This program 
# calculates the 
# total marks of a student`),
      sub("Method 2: Triple Quotes (<code>'''</code> or <code>\"\"\"</code>)"),
      p("Technically these are string literals, but Python ignores them if they aren't assigned to a variable. Often used for high-level documentation (docstrings)."),
      codeBlock("Python", `"""
This program calculates 
total and average marks 
for the final semester.
"""`)
    ),
  ]);

  topic({
    id: "indentation",
    title: "Indentation",
    difficulty: "Beginner",
    summary: "How Python uses indentation to mark blocks of code, and the common mistakes to avoid.",
    icon: "fa-solid fa-indent",
    category: "Python Basics",
  }, () => [
    section("1", "What is Indentation?",
      p("In real-world writing, we use paragraphs and bullet points to organize our thoughts. In Python, we use <strong>Indentation</strong>."),
      callout("fa-solid fa-book", "<p><strong>Formal Definition:</strong> Indentation refers to the spaces at the beginning of a code line that define the structure and \"blocks\" of a program.</p>"),
      callout("fa-solid fa-book", "<p><strong>Simple Definition:</strong> It is the \"gap\" or spacing you leave before a line of code to show Python which lines belong together as a group.</p>"),
      callout("fa-solid fa-circle-info", "<p><strong>Key Rule:</strong> In Python, indentation is mandatory. Unlike languages like C or Java that use curly brackets <code>{ }</code>, Python uses blank space to understand your code's logic.</p>")
    ),
    section("2", "Why Does Python Use Indentation?",
      bullets([
      "<strong>Readability:</strong> It makes code look clean and organized, almost like reading English.",
      "<strong>No Messy Brackets:</strong> It removes the need for extra symbols like <code>{ }</code>, making the code less \"noisy.\"",
      "<strong>Discipline:</strong> It forces every programmer to follow a neat, consistent format.",
    ])
    ),
    section("3", "How to Indent Correctly",
      p("When you start a block of code (like an <code>if</code> statement or a loop), the next line must be shifted to the right."),
      callout("fa-solid fa-circle-info", "<p><strong>Standard Rule:</strong> Use 4 spaces for every level of indentation.</p>"),
      callout("fa-solid fa-circle-info", "<p><strong>The Colon Rule:</strong> Almost every time you see a colon (<code>:</code>), the very next line must be indented.</p>"),
      sub("Example: Correct vs Incorrect"),
      codeBlock("Python", `# Correct (Works)
if marks > 50:
    print("Pass")

# Incorrect (Error)
if marks > 50:
print("Pass")  # Python knows the print belongs to the if. Error: expected an indented block`)
    ),
    section("4", "Understanding \"Code Blocks\"",
      p("A <strong>Code Block</strong> is a group of statements that run together. Python creates blocks for:"),
      bullets([
      "Decisions: <code>if</code>, <code>else</code>",
      "Loops: <code>for</code>, <code>while</code>",
      "Functions: <code>def</code>",
    ]),
      p("<strong>Example of a block:</strong>"),
      codeBlock("Python", `if sales > 100000:
    bonus = 5000         # Line 1 of block
    print("Approved")    # Line 2 of block

# This line is NOT in the block because it's not indented`)
    ),
    section("5", "Nested Indentation (Level-by-Level)",
      p("Sometimes you have a \"decision inside a decision.\" This is called Nested Indentation. Each new level moves further to the right."),
      codeBlock("Python", `if marks >= 50:
    if marks >= 75:
        print("Distinction")  # Level 2 indentation
    else:
        print("Pass")         # Level 2 indentation`)
    ),
    section("6", "Common Mistakes to Avoid",
      bullets([
      "<strong>Mixing Tabs and Spaces:</strong> Always stick to one. Prefer spaces (PEP 8: 4 spaces).",
      "<strong>Wrong Alignment:</strong> If two lines are in the same block, they must start at the exact same column.",
      "<strong>Missing Indentation:</strong> Forgetting to indent after a <code>if</code> or <code>for</code> will cause an <strong>IndentationError</strong>.",
    ])
    ),
  ]);

  topic({
    id: "keywords",
    title: "Keywords",
    difficulty: "Beginner",
    summary: "Reserved words in Python, their categories and why they cannot be used as names.",
    icon: "fa-solid fa-key",
    category: "Python Basics",
  }, () => [
    section("1", "What are Keywords?",
      p("Keywords are the \"reserved words\" of the Python language. They have a permanent, built-in meaning that the Python interpreter already understands."),
      callout("fa-solid fa-book", "<p><strong>Formal Definition:</strong> Reserved words with a predefined meaning that cannot be used as identifiers (names for variables or functions).</p>"),
      callout("fa-solid fa-book", "<p><strong>Simple Definition:</strong> These are the special \"command words\" that form the grammar of Python.</p>")
    ),
    section("2", "Why do we need them?",
      p("Keywords provide structure: make decisions (<code>if</code>, <code>else</code>), repeat tasks (<code>for</code>, <code>while</code>), combine logic (<code>and</code>, <code>or</code>, <code>not</code>), define functions (<code>def</code>, <code>return</code>), and import libraries (<code>import</code>).")
    ),
    section("3", "Key Categories",
      sub("Decision Making (Conditional)"),
      bullets([
      "<code>if</code>, <code>elif</code>, <code>else</code>",
    ]),
      sub("Loops (Repetition)"),
      bullets([
      "<code>for</code>, <code>while</code>",
    ]),
      sub("Logical &amp; Boolean"),
      bullets([
      "<code>and</code>, <code>or</code>, <code>not</code>, <code>True</code>, <code>False</code>, <code>None</code>",
    ]),
      sub("Structure &amp; Functions"),
      bullets([
      "<code>def</code>, <code>return</code>, <code>import</code>",
    ])
    ),
    section("4", "Common Mistakes to Avoid",
      bullets([
      "<strong>Case-Sensitivity:</strong> Keywords are lowercase (only <code>True</code>, <code>False</code>, <code>None</code> are capitalized).",
      "<strong>Variable Name Trap:</strong> Don't use a keyword as a variable name (e.g., <code>pass = \"Accepted\"</code> causes an error).",
    ])
    ),
    section("5", "How many keywords?",
      p("At present there are 35 keywords (this count can change between Python versions)."),
      figure("keywords.png", "Python Versions Timeline")
    ),
  ]);

  topic({
    id: "escape-sequence",
    title: "Escape Sequences",
    difficulty: "Beginner",
    summary: "Special characters inside strings: new line, tab, quotes and the backslash.",
    icon: "fa-solid fa-terminal",
    category: "Python Basics",
  }, () => [
    section("1", "What is an Escape Sequence?",
      p("An escape sequence is a special combination of characters that tells Python to \"escape\" from normal text processing and perform a formatting action."),
      callout("fa-solid fa-book", "<p><strong>Formal Definition:</strong> A combination of characters starting with a backslash (<code>\\</code>) used to represent special characters or formatting inside a string.</p>"),
      callout("fa-solid fa-book", "<p><strong>Simple Definition:</strong> Shortcodes used inside quotes to control how text looks (like adding a new line or a quote mark).</p>"),
      callout("fa-solid fa-circle-info", "<p><strong>The Secret Key:</strong> Every escape sequence starts with a backslash (<code>\\</code>).</p>")
    ),
    section("2", "Why Do We Need Them?",
      p("Certain characters confuse Python if used directly inside the same quotes (for example, a double-quote inside a double-quoted string). Escape sequences let you include those characters safely."),
      codeBlock("Python", `# Problem -> Syntax error
print("He said, "Hello"")

# Solution -> use escape sequence for inner quotes
print("He said, \\"Hello\\"")`)
    ),
    section("3", "Common Escape Sequences (\"Big 5\")",
      table(["Escape", "Meaning", "Example"], [
      ["<code>\\n</code>", "New line", "<code>\"Hello\\nWorld\"</code>"],
      ["<code>\\t</code>", "Tab space (useful for columns)", "<code>\"Name\\tAge\"</code>"],
      ["<code>\\\"</code>", "Double quote inside a double-quoted string", "<code>\"She said \\\"Yes\\\"\"</code>"],
      ["<code>\\'</code>", "Single quote inside a single-quoted string", "<code>'It\\'s raining'</code>"],
      ["<code>\\\\</code>", "Backslash character (useful in file paths)", "<code>\"C:\\\\Users\\\\PC\"</code>"],
    ]),
      sub("Advanced: Carriage Return (<code>\\r</code>)"),
      p("<code>\\r</code> moves the cursor to the start of the current line; subsequent text can overwrite the existing text."),
      codeBlock("Python", `print("Hello\\rWorld")  # Output often: World`)
    ),
    section("4", "Important Rules",
      bullets([
      "<strong>Inside Strings Only:</strong> Escape sequences must be inside quotes (<code>\" \"</code> or <code>' '</code>).",
      "<strong>Backslash Direction:</strong> Use backslash (<code>\\</code>), not forward slash (<code>/</code>).",
      "<strong>Case Sensitive:</strong> <code>\\n</code> is newline; <code>\\N</code> is different or invalid.",
    ])
    ),
  ]);

  topic({
    id: "variables",
    title: "Variables",
    difficulty: "Beginner",
    summary: "Creating variables, naming rules and conventions, and multiple assignment.",
    icon: "fa-solid fa-box",
    category: "Python Basics",
  }, () => [
    section("1", "What is a Variable?",
      p("A variable is a name given to a memory location where data is stored."),
      callout("fa-solid fa-book", "<p><strong>Formal Definition:</strong> A named memory location used to store data values that can change during program execution.</p>"),
      callout("fa-solid fa-book", "<p><strong>Simple Definition:</strong> A \"labeled jar\" or container to hold information (like sales figures or names).</p>")
    ),
    section("2", "How Variables Work",
      p("When you write <code>profit = 50000</code>:"),
      olist([
      "Memory is reserved for the value.",
      "The value <code>50000</code> is stored there.",
      "The name <code>profit</code> points to that memory location.",
    ]),
      p("<strong>Dynamic Typing:</strong> Python infers the data type automatically (e.g., <code>100</code> → integer).")
    ),
    section("3", "Rules for Naming Variables",
      bullets([
      "Must start with a letter (a–z) or underscore (<code>_</code>).",
      "Can contain letters, numbers, and underscores.",
      "Cannot start with a number (e.g., <code>1total</code> is invalid).",
      "No spaces or hyphens (use underscores instead).",
      "Cannot use a Python keyword (e.g., <code>if</code>, <code>for</code>).",
      "Case-sensitive: <code>Age</code>, <code>age</code>, and <code>AGE</code> are different.",
    ])
    ),
    section("4", "Variable Naming Conventions",
      bullets([
      "<strong>snake_case</strong> (recommended in Python): <code>student_total_marks</code>",
      "<strong>SCREAMING_SNAKE_CASE</strong> (constants): <code>MAX_LOGIN_ATTEMPTS</code>",
      "<strong>camelCase</strong> (common in JS/Java): <code>studentMarks</code>",
      "<strong>PascalCase</strong> (classes): <code>StudentProfile</code>",
    ])
    ),
    section("5", "Variable Values Can Change",
      codeBlock("Python", `count = 10
count = count + 5  # count is now 15`)
    ),
    section("6", "Multiple Assignments",
      p("Assign different values to multiple variables at once:"),
      codeBlock("Python", `a, b, c = 10, 20, 30  # a=10, b=20, c=30`),
      p("Assign the same value to multiple variables:"),
      codeBlock("Python", `x = y = z = 100  # all three hold 100`),
      sub("Quick Tips"),
      bullets([
      "Use descriptive names for clarity (e.g., <code>monthly_revenue</code>).",
      "Avoid single-letter names except for counters (e.g., <code>i</code> in loops).",
      "Follow the team's naming convention consistently.",
    ])
    ),
  ]);

  topic({
    id: "datatypes",
    title: "Data Type in Python",
    difficulty: "Beginner",
    summary: "What a data type is, dynamic typing, and how Python classifies its data types.",
    icon: "fa-solid fa-shapes",
    category: "Python Basics",
  }, () => [
    section("1", "What is a Data Type?",
      p("In programming, just as you wouldn't store water in a sack or rice in a bottle, you must use the correct \"container\" for different kinds of information. These containers are known as <strong>Data Types</strong>."),
      callout("fa-solid fa-book", "<p><strong>Formal Definition:</strong> A data type defines the type of value a variable can hold and determines what operations (like addition or subtraction) can be performed on that value.</p>"),
      callout("fa-solid fa-book", "<p><strong>Simple Definition:</strong> It tells Python if a piece of information is a number, a piece of text, a simple Yes/No, or a large collection of items.</p>")
    ),
    section("2", "Why Do We Need Data Types?",
      bullets([
      "<strong>Preventing Mistakes:</strong> You cannot add text and numbers together (e.g., \"Rahul\" + 5).",
      "<strong>Guiding Operations:</strong> They tell Python whether to perform math (numbers) or join text (strings).",
      "<strong>Accuracy:</strong> Ensure business reports and calculations use correct precision.",
    ])
    ),
    section("3", "Python’s Special Feature: Dynamic Typing",
      p("In many older languages you must declare types. In Python you simply write <code>x = 10</code> and Python infers the type automatically. This is called <strong>dynamic typing</strong>.")
    ),
    section("4", "Classification of Data Types",
      figure("data-types.png", "Features & Advantages"),
      sub("A. Numeric Types"),
      bullets([
      "<strong>Integer (int):</strong> Whole numbers (e.g., 100, -5).",
      "<strong>Float:</strong> Numbers with decimals (e.g., 99.99, 3.14).",
      "<strong>Complex:</strong> Complex numbers for advanced math (e.g., 3 + 5j).",
    ]),
      sub("B. Sequence Types"),
      bullets([
      "<strong>String (str):</strong> Text in quotes (e.g., \"Hello MBA\").",
      "<strong>List:</strong> Mutable ordered collection (e.g., [10, 20, 30]).",
      "<strong>Tuple:</strong> Immutable ordered collection (e.g., (1, 2, 3)).",
    ]),
      sub("C. Other Important Types"),
      bullets([
      "<strong>Boolean:</strong> Logical values <code>True</code> or <code>False</code>.",
      "<strong>Dictionary (dict):</strong> Key → value mapping (like a phonebook).",
      "<strong>Set:</strong> Unordered collection of unique items (no duplicates).",
    ]),
      sub("Quick Examples"),
      codeBlock("Python", `# Numeric
a = 100        # int
b = 3.14       # float
z = 2 + 3j     # complex

# Sequences
name = "Rahul"         # str
scores = [85, 78, 90]  # list
coords = (10, 20)      # tuple

# Others
flag = True            # bool
person = {"name":"Rahul","age":20}  # dict
unique_ids = {1,2,3}                # set`)
    ),
  ]);

  topic({
    id: "basic-datatypes",
    title: "Basic Data Types",
    difficulty: "Beginner",
    summary: "The fundamental built-in types that hold numbers, text and truth values.",
    icon: "fa-solid fa-cube",
    category: "Python Basics",
  }, () => [
    section("", "",
      figure("datatypes-classification.png", "basic-datatypes"),
      p("Basic Data Types are the fundamental \"containers\" that tell Python what kind of information a variable holds and what operations are valid."),
      figure("basic-datatypes.png", "basic-datatypes"),
      sub("1. Integer (int)"),
      p("Stores whole numbers (no decimal). Can be positive, negative or zero. No size limit."),
      codeBlock("Python", `age = 22
employees = 150
loss = -5000
balance = 0`),
      p("Real-life examples: number of employees, units sold, daily transactions."),
      sub("2. Float (float)"),
      p("Stores numbers with fractional parts (decimal points)."),
      codeBlock("Python", `price = 99.75
profit_percentage = 12.5
interest_rate = 8.25`),
      p("Note: <code>10</code> is int, <code>10.0</code> is float."),
      sub("3. String (str)"),
      p("Stores text enclosed in single or double quotes."),
      codeBlock("Python", `name = "Ravi"
company = 'TCS'
message = "Welcome to Python"`),
      p("Common use: customer names, product names, addresses. Beware: <code>\"85\"</code> is a string, not a number."),
      sub("4. Complex (complex)"),
      p("Numbers with real and imaginary parts; format <code>a + bj</code>. Mostly for scientific/engineering use."),
      codeBlock("Python", `z = 3 + 4j
a = 2.5 + 1.8j`),
      p("Rare in business examples but included for completeness."),
      sub("5. Boolean (bool)"),
      p("Represents truth values: <code>True</code> or <code>False</code>. Used in conditions and logic."),
      codeBlock("Python", `is_pass = True
is_available = False
loan_approved = True`),
      p("Important: <code>True</code> and <code>False</code> must be capitalized."),
      sub("How to Check a Variable's Type"),
      codeBlock("Python", `x = 10
print(type(x))      # <class 'int'>

y = 10.5
print(type(y))      # <class 'float'>

name = "Python"
print(type(name))   # <class 'str'>

z = 3 + 4j
print(type(z))      # <class 'complex'>

flag = True
print(type(flag))   # <class 'bool'>`),
      sub("In Short"),
      bullets([
      "<strong>int</strong> — whole numbers",
      "<strong>float</strong> — decimal numbers",
      "<strong>str</strong> — text",
      "<strong>complex</strong> — real + imaginary numbers",
      "<strong>bool</strong> — True / False",
    ])
    ),
  ]);

  topic({
    id: "advanced-datatypes",
    title: "Advanced Data Types",
    difficulty: "Beginner",
    summary: "Collection types that hold many values at once: list, tuple, set and dictionary.",
    icon: "fa-solid fa-layer-group",
    category: "Python Basics",
  }, () => [
    section("", "",
      sub("Introduction"),
      p("Advanced Data Types help us store and organize multiple related values in one variable (e.g., lists of employees, product catalogs, student records)."),
      figure("datatypes-classification.png", "basic-datatypes"),
      sub("Formal Definition"),
      p("\"Advanced data types in Python are used to store collections of data and provide methods to organize, access, and manipulate multiple values efficiently.\""),
      sub("Simple Definition"),
      p("They allow us to store and manage more than one value in a single variable."),
      figure("advanced-datatypes.png", "basic-datatypes"),
      sub("Types"),
      bullets([
      "List",
      "Tuple",
      "Set",
      "Dictionary",
    ]),
      sub("1. LIST (list)"),
      p("Ordered, mutable collection enclosed in square brackets <code>[]</code>. Can store mixed types."),
      codeBlock("Python", `marks = [70, 80, 90]
employee_names = ["Ravi", "Priya", "Amit"]
mixed_list = ["Apple", 10, 99.99, True]`),
      p("Common operations:"),
      codeBlock("Python", `sales = [100, 200, 150, 300]
print(sales[0])        # 100
sales[1] = 250
sales.append(400)
sales.insert(2, 175)
sales.remove(150)
sales.pop(0)`),
      sub("2. TUPLE (tuple)"),
      p("Ordered, immutable collection enclosed in parentheses <code>()</code>. Faster and used for fixed data."),
      codeBlock("Python", `days = ("Mon", "Tue", "Wed", "Thu", "Fri")
company_details = ("TCS", 1968, "Mumbai", "IT")`),
      p("Tuples cannot be modified; can be concatenated to form a new tuple."),
      sub("3. SET (set)"),
      p("Unordered collection of unique items enclosed in curly braces <code>{}</code>. No duplicates, fast membership tests."),
      codeBlock("Python", `departments = {"HR", "IT", "Finance", "Marketing"}
unique_ids = {101, 102, 103, 101}  # duplicates removed`),
      codeBlock("Python", `skills = {"Python", "Excel", "Statistics"}
skills.add("Communication")
skills.remove("Excel")

set1 = {1,2,3}
set2 = {3,4,5}
print(set1.union(set2))        # {1,2,3,4,5}
print(set1.intersection(set2)) # {3}
print(set1.difference(set2))   # {1,2}`),
      sub("4. DICTIONARY (dict)"),
      p("Stores key → value pairs in curly braces <code>{key: value}</code>. Ordered (Python 3.7+), mutable, fast lookups by key."),
      codeBlock("Python", `employee = {
    "name": "Ravi Sharma",
    "age": 30,
    "department": "Marketing",
    "salary": 75000
}

print(employee["name"])        # Ravi Sharma
print(employee.get("salary"))  # 75000
employee["age"] = 31
employee["location"] = "Mumbai"
employee.pop("department")`),
      sub("Comparison - Advanced Types"),
      table(["Feature", "List", "Tuple", "Set", "Dictionary"], [
      ["Syntax", "[ ]", "( )", "{ }", "{key: value}"],
      ["Ordered", "Yes", "Yes", "No", "Yes"],
      ["Mutable", "Yes", "No", "Yes", "Yes"],
      ["Indexing", "Yes", "Yes", "No", "By key"],
      ["Duplicates", "Allowed", "Allowed", "Not allowed", "No duplicate keys"],
    ]),
      sub("When to Use Which?"),
      bullets([
      "Use LIST for ordered collections you will modify (shopping cart, monthly sales).",
      "Use TUPLE for fixed data that should not change (coordinates, config values).",
      "Use SET when you need unique elements and set operations (unique emails, tags).",
      "Use DICTIONARY for labeled data and fast lookups (employee records, product catalog).",
    ]),
      sub("Practical Examples"),
      codeBlock("Python", `# LIST - Employees
employees = ["Ravi", "Priya", "Amit", "Sneha"]

# TUPLE - Company details
company = ("TCS", 1968, "Mumbai", "IT")

# SET - Unique skills
skills = {"Python", "SQL", "Excel", "Leadership"}

# DICTIONARY - Employee record
employee_record = {
    "id": "E001",
    "name": "Ravi Sharma",
    "department": "Marketing",
    "salary": 75000,
    "skills": ["Digital Marketing", "Analytics", "Communication"]
}`),
      sub("Why Advanced Types Matter"),
      p("They let you model real-world collections efficiently, perform bulk operations, ensure data integrity (sets/dicts), and structure complex information (dictionaries) used across applications and data analysis.")
    ),
  ]);

  topic({
    id: "operators-overview",
    title: "Operators",
    difficulty: "Beginner",
    summary: "What operators and operands are, and the main families of Python operators.",
    icon: "fa-solid fa-plus-minus",
    category: "Operators",
  }, () => [
    section("", "",
      p("In Python programming, operators are special symbols or keywords that are used to perform operations on values and variables."),
      sub("What is an Operator?"),
      p("An operator is a special symbol such as: <code>+  -  *  /  //  %  **  ==  !=  &gt;  &lt;  &gt;=  &lt;=  and  or  not  is  in  &amp;  |  ^  ~  &lt;&lt;  &gt;&gt;</code>."),
      p("These symbols tell Python to perform a specific operation."),
      sub("What is an Operand?"),
      p("An operand is the value or variable on which the operator acts."),
      sub("Example"),
      codeBlock("Python", `5 + 3
# + is the operator
# 5 and 3 are operands`),
      p("So, operators perform operations on operands."),
      sub("Types of Operators in Python"),
      figure("types-of-operators.png", "Types of operators"),
      p("Python operators are categorized into several groups based on the type of operation they perform."),
      olist([
      "<strong>Arithmetic Operators</strong><br> Used to perform mathematical calculations.<br> <em>Examples:</em> <code>+ (Addition), - (Subtraction), * (Multiplication), / (Division), // (Floor Division), % (Modulus), ** (Exponentiation)</code>",
      "<strong>Assignment Operators</strong><br> Used to assign values to variables.<br> <em>Examples:</em> <code>= (Simple assignment), +=, -=, *=, /= (Compound assignment), := (Walrus operator)</code>",
      "<strong>Comparison Operators</strong><br> Used to compare two values and determine relationships between them.<br> <em>Examples:</em> <code>== (Equal to), != (Not equal to), &gt; (&gt;), &lt; (&lt;), &gt;=, &lt;=</code>",
      "<strong>Logical Operators</strong><br> Used to combine conditional expressions.<br> <em>Examples:</em> <code>and, or, not</code>",
      "<strong>Identity Operators</strong><br> Used to check whether two variables refer to the same object.<br> <em>Examples:</em> <code>is, is not</code>",
      "<strong>Membership Operators</strong><br> Used to check whether a value exists within a sequence.<br> <em>Examples:</em> <code>in, not in</code>",
      "<strong>Bitwise Operators</strong><br> Used to perform operations at the binary (bit) level.<br> <em>Examples:</em> <code>&amp;, |, ^, ~, &lt;&lt;, &gt;&gt;</code>",
    ])
    ),
  ]);

  topic({
    id: "arithmetic-operator",
    title: "Python Arithmetic Operators",
    difficulty: "Beginner",
    summary: "Addition, subtraction, multiplication, division, floor division, modulus and exponent.",
    icon: "fa-solid fa-calculator",
    category: "Operators",
  }, () => [
    section("", "",
      p("Python operators are fundamental for performing mathematical calculations..."),
      table(["Operator", "Description", "Syntax"], [
      ["+", "Addition: adds two operands", "x + y"],
      ["-", "Subtraction: subtracts second operand from first", "x - y"],
      ["*", "Multiplication: multiplies two operands", "x * y"],
      ["/", "Division (float): divides and returns float", "x / y"],
      ["//", "Division (floor): divides and returns floored quotient", "x // y"],
      ["%", "Modulus: remainder of division", "x % y"],
      ["**", "Exponentiation: first raised to power of second", "x ** y"],
    ]),
      sub("Addition Operator"),
      codeBlock("Python", `val1 = 2
val2 = 3

# using the addition operator
res = val1 + val2
print(res)
# Output:
# 5`),
      sub("Subtraction Operator"),
      codeBlock("Python", `val1 = 2
val2 = 3

res = val1 - val2
print(res)
# Output:
# -1`),
      sub("Multiplication Operator"),
      codeBlock("Python", `val1 = 2
val2 = 3

res = val1 * val2
print(res)
# Output:
# 6`),
      sub("Division Operators"),
      codeBlock("Python", `print(5/5)
print(10/2)
print(-10/2)
print(20.0/2)
# Output:
# 1.0
# 5.0
# -5.0
# 10.0`),
      minor("Floor (integer) division"),
      codeBlock("Python", `print(10//3)
print(-5//2)
print(5.0//2)
print(-5.0//2)
# Output:
# 3
# -3
# 2.0
# -3.0`),
      sub("Modulus Operator"),
      codeBlock("Python", `val1 = 3
val2 = 2

res = val1 % val2
print(res)
# Output:
# 1`),
      sub("Exponentiation Operator"),
      codeBlock("Python", `val1 = 2
val2 = 3

res = val1 ** val2
print(res)
# Output:
# 8`)
    ),
  ]);

  topic({
    id: "assignment-overview",
    title: "Assignment Operators",
    difficulty: "Beginner",
    summary: "Assigning values to variables, including the shorthand forms such as +=.",
    icon: "fa-solid fa-equals",
    category: "Operators",
  }, () => [
    section("", "",
      p("Assignment operators are used to assign values to variables. Some assignment operators also perform calculations while assigning. They help write shorter and cleaner code."),
      sub("1) Simple Assignment Operator (<code>=</code>)"),
      p("<code>=</code> assigns a value to a variable."),
      p("<strong>Syntax:</strong> <code>variable = value</code>"),
      codeBlock("Python", `a = 5
print(a)  # Output: 5`),
      bullets([
      "Value <code>5</code> is assigned to variable <code>a</code>",
      "<code>a</code> now stores the value <code>5</code>",
    ]),
      sub("2) Add and Assign (<code>+=</code>)"),
      p("<strong>Meaning:</strong> <code>a += 3</code> is same as <code>a = a + 3</code>"),
      codeBlock("Python", `a = 5
a += 3
print(a)  # Output: 8`),
      bullets([
      "Initially <code>a = 5</code>",
      "<code>a += 3</code> means <code>a = 5 + 3</code>",
      "New value becomes <code>8</code>",
    ]),
      sub("3) Subtract and Assign (<code>-=</code>)"),
      p("<strong>Meaning:</strong> <code>a -= 2</code> is same as <code>a = a - 2</code>"),
      codeBlock("Python", `a = 5
a -= 2
print(a)  # Output: 3`),
      sub("4) Multiply and Assign (<code>*=</code>)"),
      p("<strong>Meaning:</strong> <code>a *= 2</code> is same as <code>a = a * 2</code>"),
      codeBlock("Python", `a = 5
a *= 2
print(a)  # Output: 10`),
      sub("5) Divide and Assign (<code>/=</code>)"),
      p("<strong>Meaning:</strong> <code>a /= 2</code> is same as <code>a = a / 2</code>"),
      callout("fa-solid fa-circle-info", "<p><strong>Important:</strong> In Python 3, division results in a float.</p>"),
      codeBlock("Python", `a = 10
a /= 2
print(a)  # Output: 5.0`),
      sub("6) Modulus and Assign (<code>%=</code>)"),
      p("<strong>Meaning:</strong> <code>a %= b</code> is same as <code>a = a % b</code>"),
      codeBlock("Python", `a = 3
b = 5
a %= b
print(a)  # Output: 3`),
      bullets([
      "<code>3 % 5</code> gives remainder <code>3</code> (quotient 0, remainder 3)",
    ]),
      sub("Summary Table"),
      table(["Operator", "Example", "Equivalent"], [
      ["<code>=</code>", "<code>a = 5</code>", "Assign value"],
      ["<code>+=</code>", "<code>a += 3</code>", "<code>a = a + 3</code>"],
      ["<code>-=</code>", "<code>a -= 2</code>", "<code>a = a - 2</code>"],
      ["<code>*=</code>", "<code>a *= 2</code>", "<code>a = a * 2</code>"],
      ["<code>/=</code>", "<code>a /= 2</code>", "<code>a = a / 2</code>"],
      ["<code>%=</code>", "<code>a %= b</code>", "<code>a = a % b</code>"],
    ])
    ),
  ]);

  topic({
    id: "comparision-overview",
    title: "Comparision Operators (Relational Operators)",
    difficulty: "Beginner",
    summary: "Comparing two values with ==, !=, >, <, >= and <=, and chaining comparisons.",
    icon: "fa-solid fa-scale-balanced",
    category: "Operators",
  }, () => [
    section("1", "Relational (Comparison) Operators",
      p("Relational operators (also called <strong>Comparison Operators</strong>) are used to compare two values. They always return a Boolean result: <code>True</code> or <code>False</code>."),
      sub("Python supports comparison between"),
      bullets([
      "Numbers",
      "Strings",
      "Booleans",
    ]),
      callout("fa-solid fa-circle-info", "<p><strong>Note:</strong> String comparison is based on lexicographic (alphabetical) order.</p>"),
      sub("Types of Relational Operators"),
      table(["Operator", "Name", "Example"], [
      ["<code>==</code>", "Equality", "<code>a == b</code>"],
      ["<code>!=</code>", "Inequality", "<code>a != b</code>"],
      ["<code>&gt;</code>", "Greater Than", "<code>a &gt; b</code>"],
      ["<code>&lt;</code>", "Less Than", "<code>a &lt; b</code>"],
      ["<code>&gt;=</code>", "Greater Than or Equal To", "<code>a &gt;= b</code>"],
      ["<code>&lt;=</code>", "Less Than or Equal To", "<code>a &lt;= b</code>"],
    ])
    ),
    section("2", "Examples",
      sub("1) Equality Operator (<code>==</code>)"),
      p("Checks whether two values are exactly the same."),
      codeBlock("Python", `a = 9
b = 5
c = 9

print(a == b)  # Output: False
print(a == c)  # Output: True`),
      sub("2) Inequality Operator (<code>!=</code>)"),
      p("Checks whether two values are not equal."),
      codeBlock("Python", `a = 9
b = 5
c = 9

print(a != b)  # Output: True
print(a != c)  # Output: False`),
      sub("3) Greater Than Operator (<code>&gt;</code>)"),
      codeBlock("Python", `a = 9
b = 5

print(a > b)  # Output: True
print(b > a)  # Output: False`),
      sub("4) Less Than Operator (<code>&lt;</code>)"),
      codeBlock("Python", `a = 9
b = 5

print(a < b)  # Output: False
print(b < a)  # Output: True`),
      sub("5) Greater Than or Equal To (<code>&gt;=</code>)"),
      codeBlock("Python", `a = 9
b = 5
c = 9

print(a >= b)  # Output: True
print(a >= c)  # Output: True
print(b >= a)  # Output: False`),
      sub("6) Less Than or Equal To (<code>&lt;=</code>)"),
      codeBlock("Python", `a = 9
b = 5
c = 9

print(a <= b)  # Output: False
print(a <= c)  # Output: True
print(b <= a)  # Output: True`)
    ),
    section("3", "Chaining Comparison Operators",
      p("Python allows multiple comparisons in a single statement (more readable and Pythonic)."),
      p("Instead of:"),
      codeBlock("Python", `1 < a and a < 10`),
      p("You can write:"),
      codeBlock("Python", `1 < a < 10`),
      sub("Examples of chaining"),
      codeBlock("Python", `a = 5

print(1 < a < 10)            # Output: True
print(10 > a <= 9)           # Output: True
print(5 != a > 4)            # Output: False
print(a < 10 < a*10 == 50)    # Output: True`)
    ),
  ]);

  topic({
    id: "logical-overview",
    title: "Logical Operators",
    difficulty: "Beginner",
    summary: "Combining conditions with and, or and not.",
    icon: "fa-solid fa-code-branch",
    category: "Operators",
  }, () => [
    section("", "",
      p("Logical operators are used to combine conditional statements. They work with Boolean values (<code>True</code> and <code>False</code>). The output is always <code>True</code> or <code>False</code>."),
      sub("Types of Logical Operators"),
      table(["Operator", "Meaning", "Example"], [
      ["<code>and</code>", "Returns True if both conditions are True", "<code>a &gt; 5 and a &lt; 10</code>"],
      ["<code>or</code>", "Returns True if at least one condition is True", "<code>a &gt; 5 or a &lt; 3</code>"],
      ["<code>not</code>", "Reverses the result", "<code>not(a &gt; 5)</code>"],
    ])
    ),
    section("1", "Logical AND (<code>and</code>)",
      p("The <code>and</code> operator returns <code>True</code> only if both conditions are <code>True</code>. If any one condition is <code>False</code>, the result is <code>False</code>."),
      sub("Truth Table"),
      table(["A", "B", "A and B"], [
      ["True", "True", "True"],
      ["True", "False", "False"],
      ["False", "True", "False"],
      ["False", "False", "False"],
    ]),
      sub("Example"),
      codeBlock("Python", `a = 7

print(a > 5 and a < 10)   # Output: True
print(a > 10 and a < 20)  # Output: False`),
      p("<strong>Explanation:</strong>"),
      bullets([
      "<code>a &gt; 5</code> → True and <code>a &lt; 10</code> → True → True",
      "<code>a &gt; 10</code> → False and <code>a &lt; 20</code> → True → False",
    ])
    ),
    section("2", "Logical OR (<code>or</code>)",
      p("The <code>or</code> operator returns <code>True</code> if at least one condition is <code>True</code>. It returns <code>False</code> only when both conditions are <code>False</code>."),
      sub("Truth Table"),
      table(["A", "B", "A or B"], [
      ["True", "True", "True"],
      ["True", "False", "True"],
      ["False", "True", "True"],
      ["False", "False", "False"],
    ]),
      sub("Example"),
      codeBlock("Python", `a = 7

print(a > 5 or a < 3)    # Output: True
print(a > 10 or a < 3)   # Output: False`),
      p("<strong>Explanation:</strong>"),
      bullets([
      "At least one True → result True",
      "Both False → result False",
    ])
    ),
    section("3", "Logical NOT (<code>not</code>)",
      p("The <code>not</code> operator reverses the Boolean result (True ↔ False)."),
      sub("Truth Table"),
      table(["A", "not A"], [
      ["True", "False"],
      ["False", "True"],
    ]),
      sub("Example"),
      codeBlock("Python", `a = 7

print(not(a > 5))  # Output: False
print(not(a < 5))  # Output: True`)
    ),
    section("", "Logical Operators with Comparison Operators",
      p("Logical operators are often used with comparison operators to form complex conditions."),
      codeBlock("Python", `age = 18
print(age >= 18 and age <= 25)  # Output: True`),
      p("<strong>Explanation:</strong> Checks whether age is between 18 and 25 (inclusive).")
    ),
  ]);

  topic({
    id: "bitwise-overview",
    title: "Bitwise Operators",
    difficulty: "Intermediate",
    summary: "Working on integers bit by bit with &, |, ^, ~ and the shift operators.",
    icon: "fa-solid fa-microchip",
    category: "Operators",
  }, () => [
    section("", "",
      p("Bitwise operators perform operations at the <strong>bit level</strong> on <strong>integers only</strong>."),
      sub("Process"),
      olist([
      "Numbers are converted into binary form",
      "Operations are applied on each bit",
      "The final result is converted back to decimal",
    ]),
      callout("fa-solid fa-circle-info", "<p><strong>Important:</strong> Bitwise operators work only on integers (not on floats or strings).</p>"),
      sub("Types of Bitwise Operators"),
      table(["Operator", "Description", "Syntax"], [
      ["<code>&amp;</code>", "Bitwise AND", "<code>x &amp; y</code>"],
      ["<code>|</code>", "Bitwise OR", "<code>x | y</code>"],
      ["<code>~</code>", "Bitwise NOT", "<code>~x</code>"],
      ["<code>^</code>", "Bitwise XOR", "<code>x ^ y</code>"],
      ["<code>&lt;&lt;</code>", "Bitwise Left Shift", "<code>x &lt;&lt; n</code>"],
      ["<code>&gt;&gt;</code>", "Bitwise Right Shift", "<code>x &gt;&gt; n</code>"],
    ])
    ),
    section("1", "Bitwise AND (<code>&amp;</code>)",
      p("The AND operator compares bits of two numbers."),
      p("<strong>Rule:</strong> Result bit is 1 only if both bits are 1; otherwise 0."),
      sub("Truth Table"),
      table(["Bit A", "Bit B", "A &amp; B"], [
      ["0", "0", "0"],
      ["0", "1", "0"],
      ["1", "0", "0"],
      ["1", "1", "1"],
    ]),
      sub("Manual Example"),
      p("<code>X = 7 = (111)₂</code>, <code>Y = 4 = (100)₂</code>"),
      codeBlock("Python", `  111
& 100
-----
  100  → (100)₂ = 4`),
      sub("Code Example"),
      codeBlock("Python", `a = 10
b = 4
print(a & b)  # Output: 0`)
    ),
    section("2", "Bitwise OR (<code>|</code>)",
      p("<strong>Rule:</strong> Result bit is 0 only if both bits are 0; otherwise 1."),
      sub("Truth Table"),
      table(["Bit A", "Bit B", "A | B"], [
      ["0", "0", "0"],
      ["0", "1", "1"],
      ["1", "0", "1"],
      ["1", "1", "1"],
    ]),
      sub("Manual Example"),
      p("<code>X = 7 = (111)₂</code>, <code>Y = 4 = (100)₂</code>"),
      codeBlock("Python", `  111
| 100
-----
  111  → (111)₂ = 7`),
      sub("Code Example"),
      codeBlock("Python", `a = 10
b = 4
print(a | b)  # Output: 14`)
    ),
    section("3", "Bitwise NOT (<code>~</code>)",
      p("The NOT operator is unary (one operand). It flips bits (1→0, 0→1). Python uses 2’s complement, so the result is negative."),
      p("<strong>Rule:</strong> <code>~x = -(x + 1)</code>"),
      sub("Manual Example"),
      p("<code>X = 5 = (101)₂</code> → <code>~101 = 010</code>"),
      sub("Code Example"),
      codeBlock("Python", `a = 10
print(~a)  # Output: -11

# Explanation:
# ~10 = -(10 + 1) = -11`)
    ),
    section("4", "Bitwise Shift Operators (<code>&lt;&lt;</code>, <code>&gt;&gt;</code>)",
      p("Shift operators move bits left or right. They help in multiplying/dividing by powers of 2."),
      sub("A) Left Shift (<code>&lt;&lt;</code>)"),
      p("<strong>Syntax:</strong> <code>x &lt;&lt; n</code>"),
      bullets([
      "Bits move left; zeros are added on the right",
      "Equivalent to: <code>x &lt;&lt; n = x × 2ⁿ</code>",
    ]),
      minor("Example 1: <code>5 &lt;&lt; 1</code>"),
      codeBlock("Python", `5 = 00000101
5 << 1 = 00001010  = 10
# Because: 5 × 2¹ = 10`),
      minor("Example 2: <code>7 &lt;&lt; 2</code>"),
      codeBlock("Python", `7 = 00000111
7 << 2 = 00011100  = 28
# Because: 7 × 2² = 28`),
      sub("B) Right Shift (<code>&gt;&gt;</code>)"),
      p("<strong>Syntax:</strong> <code>x &gt;&gt; n</code>"),
      bullets([
      "Bits move right; rightmost bits are removed",
      "For positive numbers, zeros are added on the left",
      "Equivalent (positive): <code>x &gt;&gt; n = x ÷ 2ⁿ</code> (integer division behavior)",
    ]),
      minor("Example 1: <code>8 &gt;&gt; 1</code>"),
      codeBlock("Python", `8 = 00001000
8 >> 1 = 00000100  = 4
# Because: 8 ÷ 2¹ = 4`),
      minor("Example 2: <code>20 &gt;&gt; 2</code>"),
      codeBlock("Python", `20 = 00010100
20 >> 2 = 00000101  = 5
# Because: 20 ÷ 2² = 5`),
      sub("Right Shift with Negative Numbers"),
      bullets([
      "Python uses <strong>sign extension</strong> for negative numbers (fills left with 1s)",
      "Mathematical behavior: <code>x &gt;&gt; n = floor(x ÷ 2ⁿ)</code>",
      "For negative numbers, Python uses floor division behavior",
    ])
    ),
  ]);

  topic({
    id: "identity-overview",
    title: "Identity Operators",
    difficulty: "Intermediate",
    summary: "Using is and is not to check whether two names point to the same object.",
    icon: "fa-solid fa-fingerprint",
    category: "Operators",
  }, () => [
    section("", "",
      sub("What are identity operators?"),
      p("Identity operators check whether two variables refer to the <strong>same object in memory</strong>, not just whether their values are equal."),
      p("They compare <strong>object identity</strong> (memory address), not data content."),
      sub("Available identity operators"),
      bullets([
      "<code>is</code> → <code>True</code> if both variables refer to the same object in memory.",
      "<code>is not</code> → <code>True</code> if both variables refer to different objects in memory.",
    ]),
      p("These are used when you care about whether two references point to exactly the same underlying object (for example with <code>None</code>, singletons, or cached objects)."),
      sub("Difference between <code>==</code> and <code>is</code>"),
      bullets([
      "<code>==</code> → checks <strong>equality of values</strong> (same content?).",
      "<code>is</code> → checks <strong>identity</strong> (same object in memory?).",
    ]),
      p("Remember:"),
      bullets([
      "<code>==</code> → “Are the <strong>values</strong> equal?”",
      "<code>is</code> → “Is this the <strong>same object</strong>?”",
    ]),
      p("Two different objects can be <code>==</code> (same value) but <code>is</code> will be <code>False</code> because their memory locations differ."),
      sub("Example 1 – <code>is</code> returning True"),
      codeBlock("Python", `a = [1, 2, 3]
b = a

print(a is b)   # True
print(a == b)   # True`),
      bullets([
      "<code>b = a</code> does <strong>not</strong> create a new list; both refer to the same list object.",
      "So <code>a is b</code> is <code>True</code>.",
      "Any change via <code>a</code> is visible via <code>b</code>, because there is only one list object.",
    ]),
      sub("Example 2 – <code>is</code> vs <code>==</code> with different objects"),
      codeBlock("Python", `x = [10, 20]
y = [10, 20]

print(x is y)   # False
print(x == y)   # True`),
      bullets([
      "<code>x</code> and <code>y</code> are two <strong>separate</strong> list objects with the same contents.",
      "<code>x is y</code> → <code>False</code> (different objects in memory).",
      "<code>x == y</code> → <code>True</code> (values are equal).",
    ]),
      sub("Typical use cases"),
      bullets([
      `Checking against <code>None</code> (recommended style): <div class="code-example">${codeBlock("Python", `value = None

if value is None:
    print("No value set yet")

if value is not None:
    print("Got a value")`)}</div>`,
      "Checking singletons or unique objects where only one instance should exist.",
    ])
    ),
  ]);

  topic({
    id: "membership-overview",
    title: "Membership Operators",
    difficulty: "Beginner",
    summary: "Using in and not in to check whether a value exists inside a sequence.",
    icon: "fa-solid fa-magnifying-glass",
    category: "Operators",
  }, () => [
    section("", "",
      p("Membership operators are used to check whether a value exists inside a sequence. They return a Boolean result: <code>True</code> or <code>False</code>."),
      sub("Types of Membership Operators"),
      table(["Operator", "Meaning"], [
      ["<code>in</code>", "Returns True if the value is present in the sequence"],
      ["<code>not in</code>", "Returns True if the value is NOT present in the sequence"],
    ]),
      sub("Where do membership operators work?"),
      bullets([
      "Strings",
      "Lists",
      "Tuples",
      "Sets",
      "Dictionaries (checks only <strong>keys</strong>, not values)",
    ]),
      sub("Simple meaning"),
      bullets([
      "<code>in</code> → “Is it inside?”",
      "<code>not in</code> → “Is it NOT inside?”",
    ])
    ),
    section("", "Examples",
      sub("Example 1: Using <code>in</code> with a List"),
      codeBlock("Python", `numbers = [10, 20, 30, 40]
print(20 in numbers)  # Output: True`),
      bullets([
      "Python checks if <code>20</code> is present in the list",
      "<code>20</code> exists inside <code>[10, 20, 30, 40]</code> → result is <code>True</code>",
    ]),
      sub("Example 2: Using <code>not in</code> with a String"),
      codeBlock("Python", `text = "hello world"
print("z" not in text)  # Output: True`),
      bullets([
      "Python checks if <code>\"z\"</code> is NOT present in the string",
      "<code>\"z\"</code> is not inside <code>\"hello world\"</code> → result is <code>True</code>",
    ])
    ),
    section("", "Important behavior with different data types",
      sub("1) With Strings"),
      p("In strings, membership operators check for characters or substrings."),
      codeBlock("Python", `print("he" in "hello")  # Output: True`),
      p("<strong>Explanation:</strong> <code>\"he\"</code> exists inside <code>\"hello\"</code> as a substring."),
      sub("2) With Dictionaries (special case)"),
      p("In dictionaries, membership operators check only <strong>keys</strong>, not values."),
      codeBlock("Python", `student = {"name": "Ali", "age": 22}

print("name" in student)  # Output: True
print("Ali" in student)   # Output: False`),
      bullets([
      "<code>\"name\"</code> is a key → <code>True</code>",
      "<code>\"Ali\"</code> is a value → <code>False</code> (because it checks keys)",
    ])
    ),
  ]);

  topic({
    id: "input-function",
    title: "input()",
    difficulty: "Beginner",
    summary: "Reading data typed by the user with input().",
    icon: "fa-solid fa-keyboard",
    category: "Input & Output",
  }, () => [
    section("", "input() Function in Python",
      p("The <code>input()</code> function is used to accept user input from the keyboard. When called, the program pauses until the user types a response and presses <strong>Enter</strong>. The returned value is always a <code>str</code>."),
      sub("Purpose &amp; Behaviour"),
      bullets([
      "Pauses program execution and waits for keyboard input.",
      "If a prompt string is provided it is displayed before waiting for input.",
      "Always returns the entered value as a string.",
    ]),
      sub("Syntax"),
      codeBlock("Python", `variable = input(prompt)`),
      p("<strong>Parameter:</strong> <code>prompt</code> (optional) — a string shown to the user."),
      sub("Important — input() Always Returns a String"),
      p("No matter what the user types (numbers, floats, text), <code>input()</code> returns a <code>str</code>. For example, if the user types <code>25</code>, the value received is <code>'25'</code>, not the integer <code>25</code>."),
      sub("Examples"),
      minor("Getting a name"),
      codeBlock("Python", `name = input('What is your name? ')
# User types: Emily
# name -> 'Emily' (str)`),
      minor("Getting an age (note the type)"),
      codeBlock("Python", `age = input('Enter your age: ')
print(type(age))  # <class 'str'>`),
      sub("Type Conversion (When You Need Numbers)"),
      p("To use numeric input in arithmetic, convert the string returned by <code>input()</code> to the desired type."),
      codeBlock("Python", `age = int(input('Enter your age: '))     # convert to int
price = float(input('Enter the price: '))  # convert to float`),
      minor("Common conversion functions"),
      bullets([
      "<code>int()</code> — integer",
      "<code>float()</code> — floating-point number",
      "<code>str()</code> — string",
      "<code>bool()</code> — boolean",
    ]),
      sub("Why input() Returns a String?"),
      bullets([
      "Safety — avoids automatic errors from invalid conversions.",
      "Flexibility — the programmer decides how to interpret the input.",
      "Consistency — predictable return type (<code>str</code>).",
    ]),
      sub("Golden Rule"),
      p("<strong>input() → Always returns → String</strong><br>Wrap <code>input()</code> in conversion functions like <code>int()</code> or <code>float()</code> when numeric types are required.")
    ),
  ]);

  topic({
    id: "type-conversion",
    title: "Type Conversion",
    difficulty: "Beginner",
    summary: "Changing a value from one data type to another, implicitly and explicitly.",
    icon: "fa-solid fa-right-left",
    category: "Input & Output",
  }, () => [
    section("", "",
      p("<strong>Type conversion</strong> (type casting) is the process of changing a value from one data type to another. It ensures correct operations and calculations."),
      sub("Why Type Conversion Matters"),
      bullets([
      "Ensures correct operations and calculations",
      "Prevents type-related runtime errors",
      "Two kinds: <strong>Implicit</strong> and <strong>Explicit</strong>",
    ]),
      figure("type-conversion.png", "Type Conversion"),
      sub("1. Implicit Conversion (Automatic)"),
      p("Python automatically converts a smaller data type to a larger one when needed to prevent data loss (e.g., int → float)."),
      codeBlock("Python", `// Example (conceptual)
x = 10    # int
y = 10.6  # float
z = x + y  # x implicitly converted to 10.0, result 20.6 (float)`),
      minor("Important Points"),
      bullets([
      "Performed automatically by Python at runtime",
      "Conversion direction: smaller type → larger type",
      "Common: int → float (also int/float → complex)",
    ]),
      sub("2. Explicit Conversion (Type Casting)"),
      p("Programmer manually converts types using built-in functions like <code>int()</code>, <code>float()</code>, <code>str()</code>, <code>bool()</code>, etc."),
      minor("Common Functions"),
      bullets([
      "<code>int(x)</code> — to integer",
      "<code>float(x)</code> — to floating point",
      "<code>str(x)</code> — to string",
      "<code>bool(x)</code> — to boolean",
      "<code>list(x), tuple(x), set(x), dict(x)</code> — to collections",
      "<code>complex(x[, y])</code> — to complex number",
      "<code>int(s, base)</code> — parse string in given base (e.g. base=2 for binary)",
    ]),
      minor("Examples"),
      codeBlock("Python", `# int() - truncates decimal part
x = 5.8
print(int(x))   # 5

# int() with base (binary string)
s = "10010"
print(int(s, 2))  # 18

# float()
print(float(10))    # 10.0
print(float("3.14"))# 3.14

# str()
print(str(100))     # "100"

# bool()
print(bool(0))      # False
print(bool("hi"))   # True

# complex()
print(complex(1,2)) # (1+2j)`),
      sub("Converting Between Collections and Strings"),
      bullets([
      "<code>tuple('geeks')</code> → ('g','e','e','k','s')",
      "<code>list('geeks')</code> → ['g','e','e','k','s']",
      "<code>set('geeks')</code> → unique chars, order not guaranteed",
      "<code>dict((('a',1),('b',2)))</code> → {'a':1,'b':2}",
    ]),
      sub("Invalid Conversions"),
      p("Some conversions raise <code>ValueError</code> (e.g., converting non-numeric string to int/float)."),
      codeBlock("Python", `int("hello")    # ValueError: invalid literal for int() with base 10: 'hello'
int("3.14")      # ValueError (use float() first)`),
      sub("Quick Rules"),
      bullets([
      "Use explicit casting when Python does not convert automatically",
      "Remember <code>int()</code> truncates, not rounds",
      "When parsing strings with different bases use the <code>base</code> argument in <code>int()</code>",
      "Validate input before converting to avoid exceptions",
    ])
    ),
  ]);

  topic({
    id: "print-formatting",
    title: "print() Function",
    difficulty: "Beginner",
    summary: "Displaying output with print(), including the sep and end parameters.",
    icon: "fa-solid fa-print",
    category: "Input & Output",
  }, () => [
    section("", "",
      p("The <code>print()</code> function displays output to the console, converts objects to strings, and supports formatting via parameters."),
      figure("print-function.png", "Print Function"),
      sub("Purpose and Basic Behavior"),
      bullets([
      "Displays output to console/terminal",
      "Converts objects to strings automatically",
      "Prints single or multiple values",
      "Supports formatting through optional parameters",
    ]),
      sub("Syntax"),
      p("<code>print(*objects, sep=' ', end='\\n', file=sys.stdout, flush=False)</code>"),
      sub("Parameters"),
      bullets([
      "<strong>*objects</strong> — Values to print (required)",
      "<strong>sep</strong> — Separator between values (default: space)",
      "<strong>end</strong> — String appended after last value (default: newline)",
      "<strong>file</strong> — File-like object to write to (default: sys.stdout)",
      "<strong>flush</strong> — Whether to forcibly flush the stream (default: False)",
    ]),
      sub("Basic Printing"),
      codeBlock("Python", `# Printing a string
print("Hello World")

# Printing multiple values (automatic space separator)
print("Hello", "Gaffar")`),
      sub("Printing Different Data Types"),
      codeBlock("Python", `print(10)          # int
print(5.5)         # float
print(True)        # boolean
print([1, 2, 3])   # list
print(("A","B"))   # tuple`),
      sub("The <code>sep</code> Parameter"),
      p("Controls what appears between multiple values. Default is a single space."),
      codeBlock("Python", `print("2026", "02", "12", sep="-")    # 2026-02-12
print("A", "B", "C", sep=" | ")         # A | B | C`),
      sub("The <code>end</code> Parameter"),
      p("Controls what is printed at the end of the output (default is newline)."),
      codeBlock("Python", `print("Hello")
print("World")                 # prints on two lines

print("Hello", end=" ")
print("World")                 # prints on same line: Hello World

print("Python", end=" ---> END")  # Python ---> END`),
      sub("Combining <code>sep</code> and <code>end</code>"),
      codeBlock("Python", `print("Item1", "Item2", "Item3", sep=" | ", end=" <END>\\n")
# Output: Item1 | Item2 | Item3 <END>`),
      sub("Key Points"),
      bullets([
      "<code>print()</code> auto-converts objects to strings for display",
      "Use <code>sep</code> to control value separators and <code>end</code> to control line endings",
      "Use <code>file</code> to redirect output and <code>flush=True</code> to force immediate write",
    ])
    ),
  ]);

  topic({
    id: "output-formatting",
    title: "Output Formatting",
    difficulty: "Beginner",
    summary: "Presenting output cleanly: alignment, decimal precision and combined text.",
    icon: "fa-solid fa-align-left",
    category: "Input & Output",
  }, () => [
    section("", "",
      p("Displaying data in a clean, readable way. Common uses: reports, aligning numbers, decimal precision, combining text with variables."),
      sub("Methods"),
      olist([
      "String Modulo Operator (%) — old method (not recommended)",
      "<code>.format()</code> method — flexible",
      "f-Strings — modern recommended method (Python 3.6+)",
    ]),
      sub("1. Modulo Operator (%)"),
      p("Older, C-style formatting. Avoid for new code."),
      codeBlock("Python", `print("Hello %s" % "Gaffar")        # Hello Gaffar
print("Age: %d" % 23)                # Age: 23
print("Val: %f" % 3.14)              # Val: 3.140000
print("Price: %.2f" % 99.4567)       # Price: 99.46`),
      sub("2. <code>.format()</code> Method"),
      p("More readable and flexible than % operator."),
      codeBlock("Python", `print("My name is {} and I am {} years old.".format("Gaffar", 23))
print("My name is {0} and I am {1} years old.".format("Gaffar", 23))
print("My name is {n} and I am {a} years old.".format(n="Gaffar", a=23))

pi = 3.14159
print("Value of pi is {:.2f}".format(pi))   # Value of pi is 3.14`),
      sub("3. f-Strings (Formatted String Literals)"),
      p("Recommended: concise, readable, supports expressions."),
      codeBlock("Python", `name = "Gaffar"
print(f"My name is {name}")                 # My name is Gaffar

age = 23
print(f"I am {age} years old.")             # I am 23 years old.

pi = 3.14159
print(f"Value of pi: {pi:.2f}")             # Value of pi: 3.14

a, b = 10, 20
print(f"Sum is {a + b}")                    # Sum is 30

name = "gaffar"
print(f"{name.upper()}")                    # GAFFAR`),
      bullets([
      "Prefer f-Strings for new code (readable and fast)",
      "Use <code>.format()</code> when needing advanced formatting separation",
      "Avoid % formatting for modern codebases",
    ])
    ),
  ]);

  topic({
    id: "strings-basics",
    title: "Strings Basics",
    difficulty: "Beginner",
    summary: "What strings are, how to create them and the special string operations.",
    icon: "fa-solid fa-font",
    category: "Strings",
  }, () => [
    section("", "",
      sub("Definition"),
      p("A <strong>String</strong> is a sequence of characters in Python. Strings are <strong>immutable</strong>, which means once a string is created, it cannot be changed or modified directly. Any operation that appears to modify a string actually creates a new string object."),
      sub("Key Characteristics"),
      bullets([
      "<strong>Immutable Nature:</strong> Once created, the characters in a string cannot be altered",
      "<strong>Sequence Type:</strong> Strings are ordered collections of characters",
      "<strong>Indexed Access:</strong> Each character can be accessed using its position (index)",
    ]),
      sub("Example"),
      codeBlock("Python", `name = "Gaffar"`),
      p("In this example, the text <code>\"Gaffar\"</code> inside quotes becomes a string object containing the sequence of characters: G, a, f, f, a, r."),
      sub("String Object Representation"),
      p("A string like <code>\"PYTHON\"</code> is stored as a sequence of characters:"),
      table([], [
      ["P", "Y", "T", "H", "O", "N"],
    ]),
      p("Each character occupies a specific position in the sequence.")
    ),
    section("2", "Creating Strings in Python",
      sub("2.1 Using Single Quotes"),
      codeBlock("Python", `s1 = 'Hello'`),
      p("Single quotes can be used to create strings."),
      sub("2.2 Using Double Quotes"),
      codeBlock("Python", `s2 = "Python"`),
      p("Double quotes work exactly the same as single quotes in Python."),
      callout("fa-solid fa-circle-info", "<p><strong>Important Note:</strong> Both single and double quotes produce identical results. The choice depends on your content (e.g., if your string contains quotes).</p>"),
      p("<strong>Equivalence Example:</strong>"),
      codeBlock("Python", `'Hello' == "Hello"  # True`),
      sub("2.3 Using Triple Quotes (Multi-line Strings)"),
      codeBlock("Python", `s3 = """This is
multi-line
string"""`),
      p("<strong>Purpose of Triple Quotes:</strong>"),
      bullets([
      "Used for creating multi-line strings",
      "Used for documentation strings (docstrings) in functions and classes",
      "Preserves line breaks and formatting",
    ]),
      p("<strong>Multi-line Example:</strong>"),
      codeBlock("Python", `text = """Line 1
Line 2
Line 3"""`),
      p("This will preserve all three lines exactly as written.")
    ),
    section("3", "Special String Operations in Python",
      sub("3.1 Creating an Empty String"),
      p("<strong>Method 1:</strong> Using Empty Quotes"),
      codeBlock("Python", `s = ""`),
      p("<strong>Method 2:</strong> Using <code>str()</code> Function"),
      codeBlock("Python", `s = str()`),
      p("Both methods create an empty string with length = 0."),
      p("<strong>Verification:</strong>"),
      codeBlock("Python", `s = ""
print(len(s))  # Output: 0`),
      sub("3.2 Raw Strings"),
      callout("fa-solid fa-book", "<p><strong>Definition:</strong> A raw string is used to ignore escape sequences. Raw strings are created by prefixing the string with <code>r</code> or <code>R</code>.</p>"),
      p("<strong>Syntax:</strong>"),
      codeBlock("Python", `path = r"C:\\Users\\Gaffar"`),
      minor("Difference Between Normal and Raw Strings"),
      p("<strong>Normal String:</strong>"),
      codeBlock("Python", `path = "C:\\Users\\Gaffar"`),
      bullets([
      "Python interprets <code>\\U</code> as an escape sequence",
      "This may cause errors or unexpected behavior",
      "The backslash is treated as a special character",
    ]),
      p("<strong>Raw String:</strong>"),
      codeBlock("Python", `path = r"C:\\Users\\Gaffar"`),
      bullets([
      "Python treats backslashes as normal characters",
      "All characters are taken literally",
      "No escape sequence interpretation",
    ]),
      minor("Common Use Cases for Raw Strings"),
      olist([
      `<strong>File Paths</strong> (Windows paths contain backslashes) <div class="code-example">${codeBlock("Python", `path = r"D:\\Projects\\Python\\main.py"`)}</div>`,
      `<strong>Regular Expressions</strong> (regex patterns often contain backslashes) <div class="code-example">${codeBlock("Python", `pattern = r"\\d+\\.\\d+"`)}</div>`,
      `<strong>LaTeX Strings</strong> (math expressions with backslashes) <div class="code-example">${codeBlock("Python", `latex = r"\\frac{1}{2}"`)}</div>`,
    ]),
      sub("3.3 String Repetition"),
      p("<strong>Syntax:</strong> Using the <code>*</code> operator with a string and an integer repeats the string."),
      codeBlock("Python", `print("Hi" * 3)
# Output:
# HiHiHi`),
      sub("4. String Concatenation"),
      callout("fa-solid fa-book", "<p><strong>Definition:</strong> Concatenation means joining two or more strings together using the <code>+</code> operator.</p>"),
      codeBlock("Python", `first = "Hello"
second = "World"
print(first + " " + second)
# Output:
# Hello World`)
    ),
  ]);

  topic({
    id: "string-methods",
    title: "String Methods",
    difficulty: "Intermediate",
    summary: "Built-in string methods for changing case, checking, searching and replacing text.",
    icon: "fa-solid fa-wrench",
    category: "Strings",
  }, () => [
    section("1", "What are String Methods?",
      p("String methods are built-in functions applied to strings to perform operations such as changing case, searching, replacing, splitting/joining, and formatting."),
      sub("Important Concept: Immutability"),
      p("Strings are <strong>immutable</strong> — the original string does not change when a method is used. Most methods return a <strong>new</strong> string."),
      codeBlock("Python", `s = "hello"
print(s.upper())  # Output: HELLO
print(s)          # Output: hello`),
      p("<strong>Visual idea:</strong> <code>\"hello\" → s.upper() → \"HELLO\"</code> (new string created)")
    ),
    section("2", "Built-in String Methods (Common List)",
      table(["Category", "Methods"], [
      ["Case Changing", "<code>upper()</code>, <code>lower()</code>, <code>title()</code>, <code>capitalize()</code>, <code>swapcase()</code>"],
      ["Checking", "<code>startswith()</code>, <code>endswith()</code>, <code>isalpha()</code>, <code>isdigit()</code>, <code>isalnum()</code>, <code>islower()</code>, <code>isupper()</code>"],
      ["Searching", "<code>find()</code>, <code>index()</code>, <code>count()</code>, <code>rfind()</code>, <code>rindex()</code>"],
      ["Modifying (returns new string)", "<code>replace()</code>, <code>strip()</code>, <code>lstrip()</code>, <code>rstrip()</code>"],
      ["Splitting / Joining", "<code>split()</code>, <code>join()</code>, <code>rsplit()</code>, <code>splitlines()</code>"],
      ["Formatting / Alignment", "<code>center()</code>, <code>ljust()</code>, <code>rjust()</code>, <code>format()</code>"],
    ])
    ),
    section("3", "Case Changing Methods",
      sub("1) <code>upper()</code>"),
      p("Converts all characters to uppercase letters."),
      codeBlock("Python", `s = "python"
print(s.upper())  # Output: PYTHON`),
      sub("2) <code>lower()</code>"),
      p("Converts all characters to lowercase letters."),
      codeBlock("Python", `print("PYTHON".lower())  # Output: python`),
      sub("3) <code>title()</code>"),
      p("Capitalizes the first letter of each word."),
      codeBlock("Python", `print("hello world".title())  # Output: Hello World`),
      sub("4) <code>capitalize()</code>"),
      p("Capitalizes only the first letter of the entire string."),
      codeBlock("Python", `print("hello world".capitalize())  # Output: Hello world`)
    ),
    section("4", "Checking Methods (True / False)",
      sub("<code>startswith()</code>"),
      codeBlock("Python", `s = "Python Programming"
print(s.startswith("Python"))  # Output: True`),
      bullets([
      "Returns <code>True</code> if the string starts with the substring",
      "Returns <code>False</code> otherwise",
    ]),
      sub("<code>endswith()</code>"),
      codeBlock("Python", `s = "Python Programming"
print(s.endswith("ing"))  # Output: True`),
      sub("<code>len()</code> (built-in function)"),
      p("Returns the total number of characters in the string."),
      codeBlock("Python", `print(len("Python"))  # Output: 6`),
      sub("<code>isalpha()</code>, <code>isdigit()</code>, <code>isalnum()</code>"),
      codeBlock("Python", `print("Python".isalpha())     # True  (only letters)
print("123".isdigit())        # True  (only digits)
print("Python123".isalnum())  # True  (letters + digits)`),
      sub("<code>islower()</code> and <code>isupper()</code>"),
      codeBlock("Python", `print("hello".islower())  # True
print("HELLO".isupper())  # True`)
    ),
    section("5", "Searching Methods",
      sub("<code>find()</code>"),
      p("Returns the starting index of the substring. If not found, returns <code>-1</code>."),
      codeBlock("Python", `s = "hello world"
print(s.find("world"))  # Output: 6
print(s.find("xyz"))    # Output: -1`),
      sub("<code>index()</code>"),
      p("Like <code>find()</code>, but raises <code>ValueError</code> if not found."),
      codeBlock("Python", `s = "hello world"
print(s.index("world"))  # Output: 6
# print(s.index("xyz"))  # ValueError`),
      sub("<code>count()</code>"),
      p("Returns the number of times a substring appears."),
      codeBlock("Python", `print("banana".count("a"))  # Output: 3`)
    ),
    section("6", "Replace Method",
      sub("<code>replace()</code>"),
      p("Replaces a specified substring with a new substring (returns a new string)."),
      codeBlock("Python", `print("Hello World".replace("World", "Python"))  # Output: Hello Python`),
      p("<strong>Syntax:</strong> <code>string.replace(old_value, new_value)</code>")
    ),
    section("7", "Splitting and Joining Methods",
      sub("<code>split()</code>"),
      p("Divides a string into a list based on a separator."),
      codeBlock("Python", `s = "apple, banana, orange"
print(s.split(","))  # Output: ['apple', ' banana', ' orange']`),
      sub("<code>join()</code>"),
      p("Combines elements of a list into a single string using a separator."),
      codeBlock("Python", `lst = ["apple", "banana", "orange"]
print("-".join(lst))  # Output: apple-banana-orange`)
    ),
    section("8", "Removing Spaces Methods",
      sub("<code>strip()</code>"),
      p("Removes all leading and trailing spaces."),
      codeBlock("Python", `s = "  hello  "
print(s.strip())  # Output: hello`),
      sub("<code>lstrip()</code>"),
      p("Removes spaces only from the left side."),
      codeBlock("Python", `s = "  hello  "
print(s.lstrip())  # Output: hello`),
      sub("<code>rstrip()</code>"),
      p("Removes spaces only from the right side."),
      codeBlock("Python", `s = "  hello  "
print(s.rstrip())  # Output:   hello`)
    ),
  ]);

  topic({
    id: "string-indexing-slicing",
    title: "Indexing & Slicing",
    difficulty: "Intermediate",
    summary: "Picking single characters and slices out of a string with positive and negative indexes.",
    icon: "fa-solid fa-scissors",
    category: "Strings",
  }, () => [
    section("", "String Indexing",
      p("Every character in a string has a position number called an <strong>index</strong>. Indexing starts from <strong>0</strong> in Python."),
      p("<strong>Example String:</strong> <code>s = \"PYTHON\"</code> (contains 6 characters)"),
      sub("Index Table"),
      tableRaw("<thead><tr><th>Character</th><th>P</th><th>Y</th><th>T</th><th>H</th><th>O</th><th>N</th></tr></thead><tbody><tr><th>Positive Index</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr><tr><th>Negative Index</th><td>-6</td><td>-5</td><td>-4</td><td>-3</td><td>-2</td><td>-1</td></tr></tbody>"),
      sub("Key Points"),
      bullets([
      "<strong>Positive indexing</strong>: starts from the beginning (0 to 5)",
      "<strong>Negative indexing</strong>: starts from the end (-1 to -6)",
      "Positive indexing moves left to right",
      "Negative indexing moves right to left",
    ]),
      sub("Accessing Characters Using Indexing"),
      minor("Positive Indexing Examples"),
      codeBlock("Python", `s = "PYTHON"
print(s[0])  # Output: P
print(s[3])  # Output: H`),
      bullets([
      "<code>s[0]</code> → First character → <code>P</code>",
      "<code>s[3]</code> → Fourth character → <code>H</code>",
    ]),
      minor("Negative Indexing Examples"),
      codeBlock("Python", `s = "PYTHON"
print(s[-1])  # Output: N
print(s[-3])  # Output: H`),
      bullets([
      "<code>s[-1]</code> → Last character → <code>N</code>",
      "<code>s[-3]</code> → Third character from end → <code>H</code>",
    ])
    ),
    section("", "String Slicing",
      p("Extracting a part of a string (called a <strong>substring</strong>) is known as <strong>slicing</strong>."),
      sub("Syntax"),
      p("<code>string[start : end : step]</code>"),
      table(["Parameter", "Description"], [
      ["<code>start</code>", "Position from where slicing begins"],
      ["<code>end</code>", "Position before which slicing stops (not included)"],
      ["<code>step</code>", "Gap between characters (optional, default = 1)"],
    ]),
      sub("Basic String Slicing"),
      minor("Example 1: Basic Slice"),
      codeBlock("Python", `s = "PYTHON"
print(s[0:3])  # Output: PYT`),
      p("Start index = 0, End index = 3 (not included). Included indices: 0, 1, 2. The end index is <strong>not</strong> included in slicing."),
      sub("Slicing Without Start or End"),
      minor("Without Start Index"),
      codeBlock("Python", `s = "PYTHON"
print(s[:4])  # Output: PYTH`),
      p("Start is omitted → slicing starts at index 0. End index = 4 (not included)."),
      minor("Without End Index"),
      codeBlock("Python", `s = "PYTHON"
print(s[2:])  # Output: THON`),
      p("End is omitted → slicing continues until the end of the string."),
      minor("Full String Slice"),
      codeBlock("Python", `s = "PYTHON"
print(s[:])  # Output: PYTHON`),
      p("<code>s[:]</code> selects the entire string (a full slice)."),
      sub("Step Value in Slicing"),
      p("The step value determines the gap between selected characters."),
      codeBlock("Python", `s = "PYTHON"
print(s[0:6:2])  # Output: PTO`),
      p("Start = 0, End = 6 (not included), Step = 2 → selected indices: 0 → 2 → 4 → selected characters: P, T, O."),
      minor("Step Value Rules"),
      bullets([
      "Step = 1 (default) → every character is selected",
      "Step = 2 → every second character is selected",
      "Step controls the gap/direction of traversal",
    ]),
      sub("Reverse String Using Slicing"),
      codeBlock("Python", `s = "PYTHON"
print(s[::-1])  # Output: NOTHYP`),
      p("Step = -1 moves right to left, reversing the string."),
      sub("Negative Slicing"),
      codeBlock("Python", `s = "PYTHON"
print(s[-4:-1])  # Output: THO`),
      p("Start = -4, End = -1 (not included). Selected indices: -4, -3, -2 → T, H, O. The end index is not included even in negative slicing.")
    ),
  ]);

  topic({
    id: "control-flow-overview",
    title: "Control Flow Statements in Python",
    difficulty: "Beginner",
    summary: "The order in which statements run, and the three kinds of control flow.",
    icon: "fa-solid fa-diagram-project",
    category: "Decision Making",
  }, () => [
    section("", "",
      sub("Definition"),
      p("<strong>Control flow</strong> refers to the order in which statements within a program execute. Normally, programs follow a <strong>sequential flow</strong> from top to bottom. However, sometimes we need more flexibility in execution."),
      sub("Why Control Flow?"),
      bullets([
      "Executing a block <strong>multiple times</strong>",
      "Executing code based on <strong>conditions</strong>",
      "<strong>Terminate</strong> or <strong>skip</strong> certain statements",
    ]),
      figure("Slide3.JPG", "Control Flow Categories"),
      sub("Types of Control Flow Statements"),
      bullets([
      "<strong>Decision Making:</strong> if, elif, else",
      "<strong>Looping:</strong> for, while",
      "<strong>Loop Control:</strong> break, continue, pass",
    ])
    ),
  ]);

  topic({
    id: "decision-making",
    title: "Decision-Making Statements",
    difficulty: "Beginner",
    summary: "How a program chooses what to do by evaluating conditions.",
    icon: "fa-solid fa-arrows-split-up-and-left",
    category: "Decision Making",
  }, () => [
    section("", "",
      figure("Slide4.JPG", "Decision Making Overview"),
      p("Decision-making statements help a program make <strong>logical choices</strong> during execution. They evaluate a specific condition to determine whether it is <strong>True</strong> or <strong>False</strong>, and then execute the corresponding block of code based on that result."),
      p("<strong>If a condition is true, perform one action; otherwise, perform a different action.</strong>"),
      sub("Types of Decision-Making Statements"),
      bullets([
      "<strong>if:</strong> Executes a block only when the condition is true.",
      "<strong>if-else:</strong> Provides two alternative actions based on the condition.",
      "<strong>if-elif-else:</strong> Checks multiple conditions and executes the first true one.",
      "<strong>Nested if:</strong> An if statement placed inside another if statement.",
    ])
    ),
  ]);

  topic({
    id: "if-statement",
    title: "Python If Statement",
    difficulty: "Beginner",
    summary: "Running a block of code only when a condition is true.",
    icon: "fa-solid fa-circle-question",
    category: "Decision Making",
  }, () => [
    section("", "",
      figure("Slide5.JPG", "If Statement"),
      sub("What is an If Statement?"),
      p("The <strong>if statement</strong> is a decision-making construct in Python. It checks a condition and executes a block of statements only if the condition is true. If the condition is false, the program skips the block and continues execution."),
      sub("Syntax"),
      codeBlock("Python", `if condition:
    statement1
    statement2
    ...`),
      p("The statements inside the block are executed only when the condition evaluates to <code>True</code>."),
      sub("Example"),
      codeBlock("Python", `age = int(input("Enter Age: "))
if age >= 18:
    print("You are eligible for vote")
if age < 0:
    print("You entered Negative Number")`),
      minor("Output (if age = 20):"),
      codeBlock("Output", `You are eligible for vote`, "fa-solid fa-terminal")
    ),
  ]);

  topic({
    id: "if-else-statement",
    title: "Python if-else Statement",
    difficulty: "Beginner",
    summary: "Choosing between two blocks of code with if and else.",
    icon: "fa-solid fa-code-fork",
    category: "Decision Making",
  }, () => [
    section("", "",
      figure("Slide6.JPG", "if-else Statement"),
      sub("What is an if-else Statement?"),
      p("The <strong>if-else</strong> statement is used for decision making in Python. It evaluates a condition and executes one of two blocks of code."),
      bullets([
      "If the condition is <strong>True</strong>, the <strong>if</strong> block is executed.",
      "If the condition is <strong>False</strong>, the <strong>else</strong> block is executed.",
    ]),
      p("This allows a program to take different actions based on conditions."),
      sub("Syntax"),
      codeBlock("Python", `if condition:
    statement
else:
    statement`),
      p("Only one block executes depending on whether the condition is <code>True</code> or <code>False</code>."),
      sub("Example"),
      codeBlock("Python", `age = int(input("Enter Age: "))

if age >= 18:
    print("You are eligible for vote")
else:
    print("You are not eligible for vote")`),
      minor("Output (if age = 16):"),
      codeBlock("Output", `You are not eligible for vote`, "fa-solid fa-terminal")
    ),
  ]);

  topic({
    id: "if-elif-else",
    title: "Python if-elif-else Statement (Ladder)",
    difficulty: "Beginner",
    summary: "Checking several conditions in order with the if-elif-else ladder.",
    icon: "fa-solid fa-list-ol",
    category: "Decision Making",
  }, () => [
    section("", "",
      figure("Slide7.JPG", "if-elif-else Ladder"),
      sub("What is an if-elif-else Statement?"),
      p("The <strong>if-elif-else</strong> statement is a multi-decision making construct in Python. It allows a program to check multiple conditions sequentially."),
      bullets([
      "If the first condition is <strong>True</strong>, its block is executed.",
      "If it is <strong>False</strong>, Python checks the next condition using <strong>elif</strong>.",
      "If none of the conditions are true, the <strong>else</strong> block executes.",
    ]),
      p("This structure is called an <strong>if-elif-else ladder</strong>."),
      sub("Syntax"),
      codeBlock("Python", `if condition1:
    statement1
    statement2
elif condition2:
    statement1
    statement2
else:
    statement1
    statement2`),
      p("Conditions are checked from top to bottom, and only the first true block is executed."),
      sub("Example"),
      codeBlock("Python", `num = int(input("Enter Number: "))

if num > 0:
    print("You entered positive number")
elif num < 0:
    print("You entered negative number")
else:
    print("You entered zero")`),
      minor("Output (if num = -5):"),
      codeBlock("Output", `You entered negative number`, "fa-solid fa-terminal")
    ),
  ]);

  topic({
    id: "nested-if",
    title: "Python Nested if-else Statements",
    difficulty: "Beginner",
    summary: "Placing one if-else statement inside another for multi-level decisions.",
    icon: "fa-solid fa-sitemap",
    category: "Decision Making",
  }, () => [
    section("", "",
      figure("Slide8.JPG", "Nested if-else"),
      sub("What are Nested if-else Statements?"),
      p("A <strong>nested if</strong> statement is an if-else statement placed inside another if or else block. It allows a program to check for further conditions only when an outer condition is met."),
      p("This creates a <strong>hierarchy of decision-making</strong>, enabling more complex logic within a single structure."),
      sub("Example"),
      codeBlock("Python", `num = int(input("Enter Number: "))

if num <= 0:
    if num < 0:
        print("You entered Negative number")
    else:
        print("You entered Zero")
else:
    print("You entered Positive number")`),
      minor("Output (if num = -3):"),
      codeBlock("Output", `You entered Negative number`, "fa-solid fa-terminal"),
      callout("fa-solid fa-circle-info", "<p><strong>Note:</strong> Inner blocks are indented to show their relationship to the outer blocks.</p>")
    ),
  ]);

  topic({
    id: "largest-of-three",
    title: "Example: Finding the Largest of Three Numbers",
    difficulty: "Beginner",
    summary: "A worked example: finding the largest of three numbers with decisions.",
    icon: "fa-solid fa-arrow-up-9-1",
    category: "Decision Making",
  }, () => [
    section("", "",
      figure("Slide9.JPG", "Largest of Three Numbers"),
      sub("Problem"),
      p("Write a Python program to find the largest number among three input numbers."),
      p("The program uses <code>if-elif-else</code> conditional statements to compare the values and determine the largest number."),
      sub("Python Program"),
      codeBlock("Python", `x = int(input("Enter First Number: "))
y = int(input("Enter Second Number: "))
z = int(input("Enter Third Number: "))

if (x >= y and x >= z):
    largest = x
elif (y >= x and y >= z):
    largest = y
else:
    largest = z

print(f"The largest number is: {largest}")`),
      minor("Sample Output:"),
      codeBlock("Output", `Enter First Number: 15
Enter Second Number: 22
Enter Third Number: 18
The largest number is: 22`, "fa-solid fa-terminal")
    ),
  ]);

  topic({
    id: "loops-overview",
    title: "Python Iteration Statements (Loops)",
    difficulty: "Beginner",
    summary: "Repeating a block of code with loops, and the two loop types in Python.",
    icon: "fa-solid fa-repeat",
    category: "Loops",
  }, () => [
    section("", "",
      figure("Slide10.JPG", "Loops Overview"),
      sub("What are Iteration Statements?"),
      p("<strong>Iteration statements (loops)</strong> are used to execute a block of statements repeatedly based on a condition."),
      bullets([
      "The repetition continues as long as the condition evaluates to <strong>True</strong>.",
      "When the condition becomes <strong>False</strong>, the loop stops and the program continues with the next statement.",
    ]),
      p("Loops help <strong>automate tasks</strong> that require repeated execution of code."),
      sub("Types of Loops in Python"),
      bullets([
      "<strong>while loop</strong> – repeats while condition is true",
      "<strong>for loop</strong> – iterates over sequences",
    ]),
      figure("Slide11.JPG", "Four Parts of a Loop"),
      sub("Four Essential Parts of a Loop"),
      bullets([
      "<strong>Initialization</strong> of control variable – Set the starting value",
      "<strong>Condition testing</strong> – Check if the loop should continue",
      "<strong>Body of loop</strong> – Statements that are executed repeatedly",
      "<strong>Increment/Decrement</strong> – Update the control variable to eventually terminate the loop",
    ]),
      p("These four components ensure proper loop execution and prevent infinite loops.")
    ),
  ]);

  topic({
    id: "while-loop",
    title: "Python while Loop",
    difficulty: "Beginner",
    summary: "Repeating code as long as a condition stays true.",
    icon: "fa-solid fa-rotate",
    category: "Loops",
  }, () => [
    section("", "",
      figure("Slide12.JPG", "while Loop"),
      sub("What is a while loop?"),
      p("The <strong>while loop</strong> is a conditional construct that executes a block of statements repeatedly as long as the given condition remains <strong>True</strong>. Whenever the condition becomes <strong>False</strong>, the loop terminates."),
      sub("Syntax"),
      codeBlock("Python", `initialization of control variable
while (condition):
    statement
    updation in control variable`),
      sub("Example: Print 1 to 10"),
      codeBlock("Python", `num = 1    # initialization
while(num <= 10):    # condition testing
    print(num, end=' ')    # Body of loop
    num += 1    # Increment`),
      minor("Output:"),
      codeBlock("Output", `1 2 3 4 5 6 7 8 9 10`, "fa-solid fa-terminal"),
      figure("Slide13.JPG", "Sum of Numbers using while Loop"),
      sub("Example: Sum of Numbers from 1 to 10"),
      codeBlock("Python", `num = 1
sum = 0

while num <= 10:
    sum += num
    num += 1

print("The Sum of 1-10 numbers:", sum)`),
      minor("Output:"),
      codeBlock("Output", `The Sum of 1-10 numbers: 55`, "fa-solid fa-terminal")
    ),
  ]);

  topic({
    id: "range-function",
    title: "Python range() Function",
    difficulty: "Beginner",
    summary: "Generating a sequence of numbers with range() for use in loops.",
    icon: "fa-solid fa-ruler-horizontal",
    category: "Loops",
  }, () => [
    section("", "",
      sub("What is range()?"),
      p("The <strong>range()</strong> function in Python returns a sequence of numbers."),
      p("By default:"),
      bullets([
      "Starts at <strong>0</strong>",
      "Increments by <strong>1</strong>",
      "Ends <strong>before</strong> the specified stop value",
    ]),
      sub("General Format"),
      p("<code>range(start, stop, step)</code>"),
      bullets([
      "<strong>start</strong> → starting number (optional, default = 0)",
      "<strong>stop</strong> → end number (exclusive, required)",
      "<strong>step</strong> → increment/decrement (optional, default = 1)",
    ]),
      figure("Slide14.JPG", "range Function"),
      figure("Slide15.JPG", "range Examples"),
      sub("Examples of range()"),
      codeBlock("Python", `range(5)           → 0, 1, 2, 3, 4
range(2, 5)        → 2, 3, 4
range(1, 10, 2)    → 1, 3, 5, 7, 9
range(5, 0, -1)    → 5, 4, 3, 2, 1
range(0, -5)       → [] (empty list, default step = +1)
range(0, -5, -1)   → 0, -1, -2, -3, -4
range(-5, 1, 1)    → -5, -4, -3, -2, -1, 0`),
      sub("Using range() with list()"),
      codeBlock("Python", `L = list(range(1, 20, 2))
print(L)
# Output: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]`)
    ),
  ]);

  topic({
    id: "for-loop",
    title: "Python for Loop",
    difficulty: "Beginner",
    summary: "Iterating over a list, tuple, string or range with a for loop.",
    icon: "fa-solid fa-arrows-rotate",
    category: "Loops",
  }, () => [
    section("", "",
      figure("Slide16.JPG", "for Loop"),
      sub("What is a for Loop?"),
      p("The <strong>for loop</strong> is used to iterate over a sequence such as a list, tuple, string, or range."),
      bullets([
      "Executes a block of statements <strong>once</strong> for each element in the sequence",
      "Commonly used for counting, traversing lists, or performing repeated operations",
    ]),
      sub("Examples"),
      codeBlock("Python", `# Example 1: Print numbers 1 to 10
for num in range(1, 11, 1):
    print(num, end=" ")
# Output: 1 2 3 4 5 6 7 8 9 10

# Example 2: Print numbers 10 to 1
for num in range(10, 0, -1):
    print(num, end=" ")
# Output: 10 9 8 7 6 5 4 3 2 1`),
      callout("fa-solid fa-circle-info", "<p><strong>Note:</strong> <code>end=\" \"</code> prints numbers on the same line.</p>"),
      figure("Slide17.JPG", "for Loop Iterating Sequences"),
      sub("Iterating Over Lists and Strings"),
      codeBlock("Python", `# Example 1: Iterate over a list
fruits = ["mango", "apple", "grapes", "cherry"]
for x in fruits:
    print(x)
# Output:
# mango
# apple
# grapes
# cherry

# Example 2: Iterate over a string
for x in "TIGER":
    print(x)
# Output:
# T
# I
# G
# E
# R`),
      figure("Slide18.JPG", "for Loop else and Nested"),
      sub("Using else with for Loop"),
      p("The <strong>else</strong> block in a for loop executes after the loop finishes normally (without a <code>break</code>)."),
      codeBlock("Python", `for x in range(4):
    print(x, end=" ")
else:
    print("\\nFinally finished!")
# Output:
# 0 1 2 3
# Finally finished!`),
      sub("Nested Loops (Loop inside a Loop)"),
      p("A <strong>nested loop</strong> is a loop inside another loop. It allows iteration over multiple sequences or multi-dimensional data."),
      codeBlock("Python", `city = ["Jaipur", "Delhi", "Mumbai"]
fruits = ["apple", "mango", "cherry"]
for x in city:
    for y in fruits:
        print(x, ":", y)`),
      minor("Output:"),
      codeBlock("Output", `Jaipur : apple
Jaipur : mango
Jaipur : cherry
Delhi : apple
Delhi : mango
Delhi : cherry
Mumbai : apple
Mumbai : mango
Mumbai : cherry`, "fa-solid fa-terminal")
    ),
  ]);

  topic({
    id: "loop-control",
    title: "Python Loop Control Statements",
    difficulty: "Beginner",
    summary: "The statements that change how a loop runs: break, continue and pass.",
    icon: "fa-solid fa-sliders",
    category: "Loops",
  }, () => [
    section("", "",
      figure("Slide19.JPG", "Loop Control Statements"),
      sub("What are Loop Control Statements?"),
      p("<strong>Loop control statements</strong> in Python are special statements that help manage the execution of loops (for or while)."),
      p("They allow you to modify the default behavior of a loop:"),
      bullets([
      "Stop it <strong>early</strong>",
      "<strong>Skip</strong> an iteration",
      "<strong>Do nothing</strong> temporarily",
    ]),
      sub("Python Supports Three Control Statements"),
      bullets([
      "<strong>break</strong> – exits the loop immediately",
      "<strong>continue</strong> – skips the current iteration and moves to the next",
      "<strong>pass</strong> – acts as a placeholder; does nothing",
    ])
    ),
  ]);

  topic({
    id: "break-statement",
    title: "Python break Statement",
    difficulty: "Beginner",
    summary: "Leaving a loop early with break.",
    icon: "fa-solid fa-hand",
    category: "Loops",
  }, () => [
    section("", "",
      figure("Slide20.JPG", "break Statement"),
      sub("What is break?"),
      p("The <strong>break</strong> statement in Python is used to exit a loop prematurely, whether it is a for loop or while loop."),
      sub("Key Points"),
      bullets([
      "Stops the loop <strong>immediately</strong>",
      "Control moves to the <strong>next statement</strong> after the loop",
      "Useful to end iteration <strong>early</strong> when a condition is met",
    ]),
      sub("Examples"),
      codeBlock("Python", `# For Loop Example
for i in range(5):
    if i == 3:
        break  # Exit the loop
    print(i)
# Output:
# 0
# 1
# 2

# While Loop Example
i = 0
while i < 5:
    if i == 3:
        break  # Exit the loop
    print(i)
    i += 1
# Output:
# 0
# 1
# 2`),
      callout("fa-solid fa-circle-info", "<p><strong>Note:</strong> <code>break</code> prevents further iteration once the condition is True.</p>")
    ),
  ]);

  topic({
    id: "continue-statement",
    title: "Python continue Statement",
    difficulty: "Beginner",
    summary: "Skipping the rest of one iteration with continue.",
    icon: "fa-solid fa-forward",
    category: "Loops",
  }, () => [
    section("", "",
      figure("Slide21.JPG", "continue Statement"),
      sub("What is continue?"),
      p("The <strong>continue</strong> statement in Python is a loop control statement that skips the rest of the code inside the loop for the current iteration and proceeds to the next iteration."),
      sub("Key Points"),
      bullets([
      "Only affects the <strong>current iteration</strong>",
      "The loop <strong>continues</strong> running for remaining elements",
      "Useful to skip certain conditions without terminating the loop",
    ]),
      sub("Examples"),
      codeBlock("Python", `# For Loop Example
for i in range(5):
    if i == 3:
        continue  # Skip iteration when i = 3
    print(i)
# Output:
# 0
# 1
# 2
# 4

# While Loop Example
count = 0
while count < 5:
    count += 1
    if count == 3:
        continue  # Skip iteration when count = 3
    print(count)
# Output:
# 1
# 2
# 4
# 5`),
      callout("fa-solid fa-circle-info", "<p><strong>Note:</strong> <code>continue</code> skips only the current iteration, unlike <code>break</code> which stops the loop entirely.</p>")
    ),
  ]);

  topic({
    id: "pass-statement",
    title: "Python pass Statement",
    difficulty: "Beginner",
    summary: "Using pass as a do-nothing placeholder.",
    icon: "fa-solid fa-ban",
    category: "Loops",
  }, () => [
    section("", "",
      figure("Slide22.JPG", "pass Statement"),
      sub("What is pass?"),
      p("The <strong>pass</strong> statement in Python is a <strong>null operation</strong> or placeholder."),
      bullets([
      "Does <strong>nothing</strong> when executed",
      "Used when a statement is <strong>syntactically required</strong> but you don't want any code to run",
      "Helps maintain program <strong>structure</strong>",
    ]),
      sub("Examples"),
      codeBlock("Python", `# For Loop Example
for i in range(5):
    if i == 3:
        pass  # Placeholder for future code
    print(i)
# Output:
# 0
# 1
# 2
# 3
# 4

# While Loop Example
count = 0
while count < 5:
    count += 1
    if count == 3:
        pass  # Placeholder for future code; does nothing
    print(f"Current count: {count}")
# Output:
# Current count: 1
# Current count: 2
# Current count: 3
# Current count: 4
# Current count: 5`),
      callout("fa-solid fa-circle-info", "<p><strong>Note:</strong> <code>pass</code> does not affect loop execution; it is only a syntactic placeholder.</p>")
    ),
  ]);

  topic({
    id: "functions-overview",
    title: "Functions in Python",
    difficulty: "Beginner",
    summary: "What functions are, the types of functions and why we use them.",
    icon: "fa-solid fa-gears",
    category: "Functions",
  }, () => [
    section("", "",
      figure("Slide23.JPG", "Functions Overview"),
      sub("What is a Function?"),
      bullets([
      "A <strong>reusable block</strong> of code that performs a specific task",
      "Executes only when it is <strong>called</strong>",
      "Helps avoid repetition (<strong>DRY</strong> principle)",
      "Allows reuse of the same code with <strong>different inputs</strong>",
    ]),
      figure("Slide24.JPG", "Types of Functions"),
      sub("Types of Functions in Python"),
      bullets([
      "<strong>Built-in Functions:</strong> <code>print()</code>, <code>len()</code>, <code>type()</code>, <code>id()</code>, <code>sorted()</code>",
      "<strong>User-Defined Functions:</strong> <code>def function_name()</code> – Custom tasks, reusable code, specific logic",
      "<strong>Lambda Functions:</strong> <code>lambda x, y: x + y</code> – Anonymous, one-line expression, inline use",
      "<strong>Specialized Functions:</strong> Recursive Functions, Nested/Inner Functions, Closures",
    ]),
      sub("Why Use Functions?"),
      bullets([
      "<strong>Code Reusability</strong> – Write once, use multiple times",
      "<strong>Modularity</strong> – Break complex problems into smaller parts",
      "<strong>Readability</strong> – Code becomes easier to understand",
      "<strong>Maintainability</strong> – Easier to update and debug",
    ])
    ),
  ]);

  topic({
    id: "defining-calling-functions",
    title: "Defining and Calling a Function",
    difficulty: "Beginner",
    summary: "Writing a function with def and calling it.",
    icon: "fa-solid fa-phone",
    category: "Functions",
  }, () => [
    section("", "",
      figure("Slide25.JPG", "Defining and Calling Functions"),
      sub("Defining a Function"),
      bullets([
      "Use the <strong>def</strong> keyword to define a function",
      "A function can take <strong>parameters</strong> as input",
      "Contains statements inside the <strong>function body</strong>",
      "May <strong>return</strong> a value using <code>return</code>",
    ]),
      sub("Calling a Function"),
      bullets([
      "Call a function using its <strong>name</strong>",
      "Use <strong>parentheses ()</strong> after the function name",
      "Executes the <strong>function code</strong>",
    ]),
      sub("Syntax"),
      codeBlock("Python", `def function_name(parameters):
    # statements
    return expression`),
      sub("Example"),
      codeBlock("Python", `def yvumba():
    print("Welcome to YVU MBA")

yvumba()`),
      minor("Output:"),
      codeBlock("Output", `Welcome to YVU MBA`, "fa-solid fa-terminal")
    ),
  ]);

  topic({
    id: "return-statement",
    title: "Return Statement in Python Functions",
    difficulty: "Beginner",
    summary: "Sending a result back from a function with return.",
    icon: "fa-solid fa-reply",
    category: "Functions",
  }, () => [
    section("", "",
      figure("Slide26.JPG", "Return Statement"),
      sub("What is return?"),
      bullets([
      "Ends the <strong>execution</strong> of a function",
      "Sends a <strong>value</strong> back to the caller",
      "Can <strong>return</strong> any data type",
      "Can <strong>return</strong> multiple values (as a tuple)",
      "<strong>Returns None</strong> if no value is specified",
    ]),
      sub("Syntax"),
      codeBlock("Python", `return [expression]`),
      sub("Example"),
      codeBlock("Python", `def sq_value(num):
    """Returns square of number"""
    return num**2

print(sq_value(2))
print(sq_value(-4))`),
      minor("Output:"),
      codeBlock("Output", `4
16`, "fa-solid fa-terminal"),
      callout("fa-solid fa-circle-info", "<p><strong>Note:</strong> <code>return</code> sends the result back instead of just printing it.</p>")
    ),
  ]);

  topic({
    id: "assign-functions-to-variables",
    title: "Assigning Functions to Variables",
    difficulty: "Intermediate",
    summary: "Storing a function in a variable and calling it through that name.",
    icon: "fa-solid fa-link",
    category: "Functions",
  }, () => [
    section("", "",
      figure("Slide27.JPG", "Assigning Functions to Variables"),
      sub("Functions as First-Class Objects"),
      bullets([
      "Functions can be <strong>assigned</strong> to variables",
      "Functions can be <strong>passed</strong> as <strong>arguments</strong>",
      "Functions can be <strong>returned</strong> from other functions",
      "Enables <strong>flexible</strong> and <strong>reusable</strong> code",
    ]),
      sub("Key Idea"),
      p("A function can be called using a <strong>variable name</strong>."),
      sub("Example"),
      codeBlock("Python", `def a():
    print("GFG")

var = a
var()`),
      minor("Output:"),
      codeBlock("Output", `GFG`, "fa-solid fa-terminal"),
      callout("fa-solid fa-circle-info", "<p><strong>Note:</strong> <code>var</code> refers to the function, not the result of the function.</p>")
    ),
  ]);

  topic({
    id: "function-arguments",
    title: "Function Arguments in Python",
    difficulty: "Beginner",
    summary: "Passing data into functions through parameters and arguments.",
    icon: "fa-solid fa-arrow-right-to-bracket",
    category: "Functions",
  }, () => [
    section("", "",
      sub("What are Arguments?"),
      bullets([
      "<strong>Arguments</strong> are values passed inside function parentheses",
      "Used to provide <strong>input</strong> to functions",
      "A function can have <strong>multiple</strong> arguments separated by commas",
    ]),
      sub("Syntax"),
      codeBlock("Python", `def function_name(parameters):
    """Docstring"""
    # body of the function
    return expression`),
      sub("Example: Even or Odd"),
      codeBlock("Python", `def evenOdd(x):
    if (x % 2 == 0):
        return "Even"
    else:
        return "Odd"

print(evenOdd(16))
print(evenOdd(7))`),
      minor("Output:"),
      codeBlock("Output", `Even
Odd`, "fa-solid fa-terminal")
    ),
  ]);

  topic({
    id: "types-of-arguments",
    title: "Types of Arguments",
    difficulty: "Intermediate",
    summary: "Positional, keyword, default and arbitrary arguments at a glance.",
    icon: "fa-solid fa-list-check",
    category: "Functions",
  }, () => [
    section("", "",
      figure("Slide29.JPG", "Types of Arguments"),
      sub("1. Positional Arguments"),
      p("Assigned based on their <strong>position</strong> in the call."),
      codeBlock("Python", `def greet(name, age):
    print(name, age)

greet("Alice", 25)`),
      sub("2. Keyword Arguments"),
      p("Assigned by <strong>parameter name</strong>, out of order."),
      codeBlock("Python", `def describe_pet(animal, name):
    print(name, animal)

describe_pet(name="Buddy", animal="Dog")`),
      sub("3. Default Arguments"),
      p("Have <strong>predefined values</strong>, used if omitted."),
      codeBlock("Python", `def multiply(a, b=2):
    print(a * b)

multiply(5)      # 10
multiply(5, 3)   # 15`),
      sub("4. Variable Length Arguments (*args)"),
      p("Handle an <strong>arbitrary number</strong> of positional arguments."),
      codeBlock("Python", `def sum_all(*args):
    print(sum(args))

sum_all(1, 2, 3)  # 6
sum_all(1, 2, 3, 4, 5)  # 15`),
      sub("5. Variable Length Keyword Arguments (**kwargs)"),
      p("Handle an <strong>arbitrary number</strong> of keyword arguments."),
      codeBlock("Python", `def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(x=18, y=29)
# Output:
# x: 18
# y: 29`)
    ),
  ]);

  topic({
    id: "positional-arguments",
    title: "Positional Arguments in Python",
    difficulty: "Beginner",
    summary: "Arguments matched to parameters by their position in the call.",
    icon: "fa-solid fa-arrow-down-1-9",
    category: "Functions",
  }, () => [
    section("", "",
      figure("Slide30.JPG", "Positional Arguments"),
      sub("What are Positional Arguments?"),
      bullets([
      "Values are assigned based on their <strong>position</strong>",
      "<strong>Order</strong> of arguments must match parameters",
      "Changing <strong>order</strong> changes the output",
      "Important for correct function execution",
    ]),
      sub("Example"),
      codeBlock("Python", `def nameAge(name, age):
    print("Hi, I am", name)
    print("My age is", age)

print("Case-1:")
nameAge("Suraj", 27)

print("\\nCase-2:")
nameAge(27, "Suraj")`),
      minor("Output:"),
      codeBlock("Output", `Case-1:
Hi, I am Suraj
My age is 27

Case-2:
Hi, I am 27
My age is Suraj`, "fa-solid fa-terminal")
    ),
  ]);

  topic({
    id: "keyword-arguments",
    title: "Keyword Arguments in Python",
    difficulty: "Beginner",
    summary: "Passing arguments by name so that their order does not matter.",
    icon: "fa-solid fa-tag",
    category: "Functions",
  }, () => [
    section("", "",
      figure("Slide31.JPG", "Keyword Arguments"),
      sub("What are Keyword Arguments?"),
      bullets([
      "Values are passed using <strong>parameter names</strong>",
      "<strong>Order of arguments does not matter</strong>",
      "Improves <strong>clarity</strong> and <strong>readability</strong>",
      "Reduces <strong>errors</strong> in function calls",
    ]),
      sub("Example"),
      codeBlock("Python", `def student(fname, lname):
    print(fname, lname)

student(fname='Abdul', lname='Gaffar')
student(lname='Gaffar', fname='Abdul')`),
      minor("Output:"),
      codeBlock("Output", `Abdul Gaffar
Abdul Gaffar`, "fa-solid fa-terminal"),
      p("<strong>Same output even when order is changed</strong>")
    ),
  ]);

  topic({
    id: "default-arguments",
    title: "Default Arguments in Python",
    difficulty: "Beginner",
    summary: "Giving parameters default values that are used when no argument is passed.",
    icon: "fa-solid fa-flag",
    category: "Functions",
  }, () => [
    section("", "",
      figure("Slide32.JPG", "Default Arguments"),
      sub("What are Default Arguments?"),
      bullets([
      "A <strong>default argument</strong> has a predefined value",
      "Used when <strong>no value</strong> is provided during function call",
      "Makes parameters <strong>optional</strong>",
      "Helps avoid errors and simplifies function usage",
    ]),
      sub("Example"),
      codeBlock("Python", `def myFun(x, y=50):
    print("x:", x)
    print("y:", y)

myFun(10)`),
      minor("Output:"),
      codeBlock("Output", `x: 10
y: 50`, "fa-solid fa-terminal"),
      p("<strong>y takes default value since it is not passed</strong>")
    ),
  ]);

  topic({
    id: "arbitrary-arguments",
    title: "Arbitrary Arguments in Python",
    difficulty: "Intermediate",
    summary: "Accepting any number of arguments with *args and **kwargs.",
    icon: "fa-solid fa-infinity",
    category: "Functions",
  }, () => [
    section("", "",
      sub("1. What are Arbitrary Arguments?"),
      bullets([
      "Allow a function to accept a <strong>variable number</strong> of inputs",
      "Useful when the number of arguments is <strong>unknown</strong>",
      "Makes function design more <strong>flexible</strong>",
    ]),
      sub("2. Types"),
      bullets([
      "<strong>*args</strong> – Collects extra <strong>positional</strong> arguments, stored as a <strong>tuple</strong>",
      "<strong>**kwargs</strong> – Collects extra <strong>keyword</strong> arguments, stored as a <strong>dictionary</strong>",
    ]),
      sub("3. Purpose"),
      bullets([
      "Makes functions more <strong>flexible</strong>",
      "Allows handling <strong>multiple inputs</strong> dynamically",
    ])
    ),
  ]);

  topic({
    id: "args-parameter",
    title: "Non-Keyword Arguments – *args in Python",
    difficulty: "Intermediate",
    summary: "Collecting extra positional values with *args.",
    icon: "fa-solid fa-asterisk",
    category: "Functions",
  }, () => [
    section("", "",
      sub("What is *args?"),
      bullets([
      "Allows a function to accept <strong>any number</strong> of positional arguments",
      "Arguments are passed <strong>without parameter names</strong>",
      "All values are stored as a <strong>tuple</strong>",
      "Useful when number of inputs is <strong>unknown</strong>",
    ]),
      sub("Examples"),
      codeBlock("Python", `# Example 1: Printing Values
def myFun(*args):
    for arg in args:
        print(arg)

myFun('Hello', 'Welcome', 'to', 'Python')
# Output:
# Hello
# Welcome
# to
# Python

# Example 2: Multiplication
def multiply(*args):
    result = 1
    for num in args:
        result *= num
    return result

print(multiply(2, 3, 4))  # 24`),
      p("<strong>*args enables handling multiple values dynamically</strong>")
    ),
  ]);

  topic({
    id: "kwargs-parameter",
    title: "Keyword Arguments – **kwargs in Python",
    difficulty: "Intermediate",
    summary: "Collecting extra named values with **kwargs.",
    icon: "fa-solid fa-key",
    category: "Functions",
  }, () => [
    section("", "",
      sub("What is **kwargs?"),
      bullets([
      "Allows a function to accept <strong>any number</strong> of keyword arguments",
      "Arguments are passed in the form <strong>key = value</strong>",
      "Values are stored in a <strong>dictionary</strong>",
      "Useful for handling <strong>named inputs</strong> dynamically",
    ]),
      sub("Examples"),
      codeBlock("Python", `# Example 1: Using kwargs
def fun(**kwargs):
    for key, val in kwargs.items():
        print(key, "=", val)

fun(s1='Python', s2='is', s3='Awesome')
# Output:
# s1 = Python
# s2 = is
# s3 = Awesome

# Example 2: Using Both *args and **kwargs
def student_info(*args, **kwargs):
    print("Subjects:", args)
    print("Details:", kwargs)

student_info("Math", "Science", "English", Name="Alice", Age=20, City="New York")
# Output:
# Subjects: ('Math', 'Science', 'English')
# Details: {'Name': 'Alice', 'Age': 20, 'City': 'New York'}`),
      p("<strong>*args</strong> handles positional values, <strong>**kwargs</strong> handles named values")
    ),
  ]);

  topic({
    id: "lambda-functions",
    title: "Anonymous Functions (Lambda) in Python",
    difficulty: "Intermediate",
    summary: "Writing short, one-line anonymous functions with lambda.",
    icon: "fa-solid fa-bolt",
    category: "Functions",
  }, () => [
    section("", "",
      sub("What are Anonymous Functions?"),
      bullets([
      "Functions <strong>without a name</strong>",
      "Created using the <strong>lambda</strong> keyword",
      "Used for <strong>short, simple</strong> operations",
      "Typically written in a <strong>single line</strong>",
      "Useful when a function is needed <strong>temporarily</strong>",
    ]),
      sub("Example"),
      codeBlock("Python", `# Without lambda
def cube(x):
    return x*x*x

# With lambda
cube_1 = lambda x: x*x*x

print(cube(7))
print(cube_1(7))`),
      minor("Output:"),
      codeBlock("Output", `343
343`, "fa-solid fa-terminal"),
      p("Both functions give the same result, but <strong>lambda</strong> is shorter.")
    ),
  ]);

  topic({
    id: "recursive-functions",
    title: "Recursive Functions in Python",
    difficulty: "Advanced",
    summary: "Functions that call themselves on smaller inputs until a base case is reached.",
    icon: "fa-solid fa-circle-nodes",
    category: "Functions",
  }, () => [
    section("", "",
      figure("Slide37.JPG", "Recursive Functions"),
      sub("What is Recursion?"),
      bullets([
      "A function that <strong>calls itself</strong> to solve a problem",
      "Breaks a problem into <strong>smaller subproblems</strong>",
      "Commonly used in mathematical and divide-and-conquer problems",
      "Must include a <strong>base case</strong> to stop recursion",
      "Without a base case, it leads to <strong>infinite recursion</strong>",
    ]),
      figure("Slide38.JPG", "Core Concept of Recursion"),
      sub("Core Concept"),
      p("<strong>Recursion is a technique where a function solves a problem by calling itself on smaller inputs until it reaches a base case.</strong>"),
      sub("Example: Factorial"),
      codeBlock("Python", `def factorial(n):
    if n == 0:
        return 1  # Base case
    else:
        return n * factorial(n - 1)

print(factorial(4))`),
      minor("Output:"),
      codeBlock("Output", `24`, "fa-solid fa-terminal"),
      p("<strong>Function keeps calling itself until <code>base case (n == 0)</code> is reached</strong>")
    ),
  ]);

  topic({
    id: "nested-functions",
    title: "Function within Functions (Nested Functions)",
    difficulty: "Intermediate",
    summary: "Defining a function inside another function and the closure idea.",
    icon: "fa-solid fa-layer-group",
    category: "Functions",
  }, () => [
    section("", "",
      figure("Slide39.JPG", "Nested Functions"),
      sub("What are Nested Functions?"),
      bullets([
      "A function defined <strong>inside another function</strong>",
      "Also called an <strong>inner</strong> or <strong>nested function</strong>",
      "Can access variables from the <strong>outer (enclosing) function</strong>",
      "Helps organize and <strong>protect</strong> logic",
      "Improves code <strong>structure</strong> and <strong>readability</strong>",
    ]),
      sub("Example"),
      codeBlock("Python", `def f1():
    s = 'I love GeeksforGeeks'
    def f2():
        print(s)
    f2()

f1()`),
      minor("Output:"),
      codeBlock("Output", `I love GeeksforGeeks`, "fa-solid fa-terminal"),
      callout("fa-solid fa-circle-info", "<p><strong>Note:</strong> Inner function can access outer function variables (closure concept).</p>")
    ),
  ]);

  topic({
    id: "variable-scope",
    title: "Scope of Variables in Python (LEGB Rule)",
    difficulty: "Intermediate",
    summary: "Where a variable can be seen: local, enclosing, global and built-in (LEGB).",
    icon: "fa-solid fa-eye",
    category: "Functions",
  }, () => [
    section("", "",
      figure("Slide40.JPG", "LEGB Rule"),
      sub("1. What is Variable Scope?"),
      bullets([
      "Scope defines <strong>where</strong> a variable can be accessed",
      "Determines the <strong>visibility</strong> of variables in a program",
      "Python follows a specific order to search for variables",
    ]),
      sub("2. LEGB Rule"),
      bullets([
      "<strong>L</strong> → <strong>Local</strong> (inside a function)",
      "<strong>E</strong> → <strong>Enclosing</strong> (inside outer function)",
      "<strong>G</strong> → <strong>Global</strong> (entire script)",
      "<strong>B</strong> → <strong>Built-in</strong> (Python reserved names)",
    ]),
      sub("3. Key Idea"),
      p("Python searches variables in this order:"),
      p("<strong>Local → Enclosing → Global → Built-in</strong>"),
      sub("Types of Variable Scope"),
      minor("1. Local Variables"),
      p("Defined inside a function, accessible only within that function."),
      codeBlock("Python", `def test():
    x = 10
    print(x)

test()`),
      minor("2. Global Variables"),
      p("Defined <strong>outside</strong> all functions, accessible throughout the program."),
      codeBlock("Python", `x = 20

def show():
    print(x)

show()`),
      minor("3. Nonlocal Variables"),
      p("Used in <strong>nested</strong> functions, refers to variables in the outer function."),
      codeBlock("Python", `def outer():
    x = 5
    def inner():
        nonlocal x
        x = 10
    inner()
    print(x)

outer()  # Output: 10`),
      sub("Modifying Variable Scope with Keywords"),
      minor("1. global Keyword"),
      p("Used to modify global variables inside a function."),
      codeBlock("Python", `global x
# Allows access to variables defined outside the function`),
      minor("2. nonlocal Keyword"),
      p("Used to modify variables in the <strong>enclosing (outer) function</strong>."),
      p("Works only with <strong>nested functions</strong>."),
      codeBlock("Python", `def outer():
    x = 5
    def inner():
        nonlocal x
        x = 15
    inner()
    print(x)

outer()  # Output: 15`)
    ),
  ]);

  topic({
    id: "lists-intro",
    title: "List and its Properties",
    difficulty: "Beginner",
    summary: "What a list is and the core properties of Python lists.",
    icon: "fa-solid fa-list",
    category: "Lists",
  }, () => [
    section("", "What is a List?",
      p("A <strong>list</strong> is a built-in data structure used to store an ordered collection of items. They are dynamic, resizable and capable of storing multiple data types. It is one of the most versatile and heavily used built-in sequence data types in the language.")
    ),
    section("", "Core Properties of Python Lists",
      bullets([
      "<strong>Ordered:</strong> Items maintain their exact insertion sequence unless explicitly reordered.",
      "<strong>Mutable:</strong> Elements can be added, updated, or removed after creation.",
      "<strong>Heterogeneous:</strong> A single list can simultaneously store integers, strings, booleans, or other lists.",
      "<strong>Indexed:</strong> Elements are zero-indexed, meaning the first element starts at position 0.",
      "<strong>Allows Duplicates:</strong> The same value can occur multiple times at different indices.",
      "<strong>Dynamic Size:</strong> The list automatically expands or shrinks in memory as you add or delete items.",
      "<strong>Nestable:</strong> Lists can contain other lists as elements, enabling multidimensional structures.",
      "<strong>Iterable:</strong> You can traverse through the elements using standard for loops or list comprehensions.",
      "<strong>Slicable:</strong> Subsections can be extracted using the standard <code>list[start:stop:step]</code> colon syntax.",
    ]),
      sub("Example Demonstrating List Properties"),
      codeBlock("Python", `# Creating a list showing various properties
my_list = [10, "Python", 3.14, True, 10, [1, 2, 3]]

# Ordered - elements maintain insertion order
print(my_list)  # [10, 'Python', 3.14, True, 10, [1, 2, 3]]

# Mutable - can change elements
my_list[1] = "Java"
print(my_list)  # [10, 'Java', 3.14, True, 10, [1, 2, 3]]

# Heterogeneous - different data types
print(type(my_list[0]))  # int
print(type(my_list[1]))  # str
print(type(my_list[2]))  # float

# Indexed - access by position
print(my_list[0])   # 10 (first element)
print(my_list[-1])  # [1, 2, 3] (last element)

# Allows duplicates
print(my_list.count(10))  # 2 (10 appears twice)

# Dynamic size - can grow or shrink
my_list.append("New Item")
print(len(my_list))  # 7 (original size was 6)

# Nestable - list containing another list
print(my_list[5][1])  # 2 (access nested list element)

# Slicable
print(my_list[1:4])  # ['Java', 3.14, True]`)
    ),
  ]);

  topic({
    id: "creating-list",
    title: "Creating List",
    difficulty: "Beginner",
    summary: "The different ways of creating a list.",
    icon: "fa-solid fa-square-plus",
    category: "Lists",
  }, () => [
    section("", "Creating Lists in Python",
      p("In Python, the list data type can be created in several distinct ways depending on your specific programming needs. The most common and direct method is using square brackets <code>[]</code>."),
      sub("1. Using Square Brackets (List Literals)"),
      p("This is the standard and fastest way to define a list. You place items separated by commas inside square brackets."),
      codeBlock("Python", `# Empty List
empty_list = []

# Populated List
numbers = [1, 2, 3, 4, 5]

# Mixed Data Types
mixed = [1, "Hello", 3.14, True]

# Nested List (List inside List)
nested = [[1, 2], [3, 4], [5, 6]]

print("Empty List:", empty_list)
print("Numbers:", numbers)
print("Mixed:", mixed)
print("Nested:", nested)`),
      sub("2. Using the list() Constructor"),
      p("The <code>list()</code> function initializes an empty list or converts an existing iterable object (like strings, tuples, or sets) into a list data type."),
      codeBlock("Python", `# From a String (splits into individual characters)
chars = list("abc")
print(chars)  # ['a', 'b', 'c']

# From a Tuple
nums = list((1, 2, 3))
print(nums)   # [1, 2, 3]

# From a Range
range_list = list(range(5))
print(range_list)  # [0, 1, 2, 3, 4]

# From a Set
set_to_list = list({10, 20, 30})
print(set_to_list)  # [10, 20, 30] (order may vary)

# Empty Constructor
empty_list = list()
print(empty_list)  # []`),
      sub("3. Using List Comprehensions"),
      p("This is a highly optimized, single-line technique used to generate or filter data dynamically."),
      codeBlock("Python", `# Basic Generation - squares of numbers 0 to 4
squares = [x**2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

# With Condition - even numbers only
evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]`),
      sub("4. Using the Multiplication Operator (*)"),
      p("If you need to initialize a fixed-size list with identical or placeholder elements, you can repeat a single-item list."),
      codeBlock("Python", `# Zeros List
zeros = [0] * 5
print(zeros)  # [0, 0, 0, 0, 0]

# Repeating a pattern
pattern = [1, 2] * 3
print(pattern)  # [1, 2, 1, 2, 1, 2]`)
    ),
  ]);

  topic({
    id: "accessing-list-items",
    title: "Accessing List Items",
    difficulty: "Beginner",
    summary: "Reading list items by index, with negative indexes, slicing and loops.",
    icon: "fa-solid fa-arrow-pointer",
    category: "Lists",
  }, () => [
    section("", "",
      p("Accessing means retrieving one or more specific data values stored inside a list container using its position or structure. There are various methods to access list elements."),
      sub("1. Indexing (Positive &amp; Negative)"),
      p("Retrieves a single item based on its exact, unique position number."),
      bullets([
      "<strong>Positive Indexing:</strong> Counts from left to right, starting at 0.",
      "<strong>Negative Indexing:</strong> Counts from right to left, starting at -1.",
    ]),
      codeBlock("Python", `# Setup
colors = ["red", "green", "blue"]

# Positive Indexing
print(colors[0])   # Output: "red"   (First item)
print(colors[2])   # Output: "blue"  (Third item)

# Negative Indexing
print(colors[-1])  # Output: "blue"  (Last item)
print(colors[-2])  # Output: "green" (Second-to-last item)

# IndexError Example (trying to access out of range)
# print(colors[3])  # IndexError: list index out of range`),
      sub("2. Slicing"),
      p("Extracts a sublist (subset of elements) using a specific range."),
      p("<strong>Syntax:</strong> <code>list[start:stop:step]</code>"),
      bullets([
      "<strong>start:</strong> Initial index (included). Defaults to 0.",
      "<strong>stop:</strong> Upper boundary index (excluded). Defaults to end of list.",
      "<strong>step:</strong> Number of increments to skip forward or backward. Defaults to 1.",
    ]),
      codeBlock("Python", `nums = [10, 20, 30, 40, 50]

# Basic Slice
print(nums[1:4])   # Output: [20, 30, 40] (Indices 1, 2, 3)

# Omitted Boundaries
print(nums[:3])    # Output: [10, 20, 30] (Start to index 2)
print(nums[3:])    # Output: [40, 50]     (Index 3 to end)
print(nums[:])     # Output: [10, 20, 30, 40, 50] (Full copy)

# Step Slicing
print(nums[::2])   # Output: [10, 30, 50] (Every second item)
print(nums[::3])   # Output: [10, 40]     (Every third item)
print(nums[::-1])  # Output: [50, 40, 30, 20, 10] (Reverses list)

# Slicing with negative indices
print(nums[-4:-1]) # Output: [20, 30, 40] (Indices -4, -3, -2)`),
      sub("3. Iteration"),
      p("Traverses and processes every element sequentially using loops."),
      bullets([
      "<strong>Direct loop:</strong> Safest for reading values only.",
      "<strong>enumerate() loop:</strong> Tracks both the index number and the item simultaneously.",
    ]),
      codeBlock("Python", `animals = ["cat", "dog", "bird", "fish"]

# Direct iteration
print("Direct iteration:")
for pet in animals:
    print(pet)
Output:
  cat
  dog
  bird
  fish

# Enumerate iteration
print("\\nEnumerate iteration:")
for index, pet in enumerate(animals):
    print(f"{index}: {pet}")
Output:
0: cat
1: dog
2: bird
3: fish

# Iteration with index using range
print("\\nUsing range:")
for i in range(len(animals)):
    print(f"{i}: {animals[i]}")`),
      sub("4. Unpacking"),
      p("Unpacks elements directly into distinct variables in a single operation. Use <code>*</code> to capture leftover items into a dynamic sublist."),
      codeBlock("Python", `skills = ["Python", "SQL", "Git", "Docker"]

# Exact unpacking (must match number of elements)
a, b, c, d = skills
print(a)  # "Python"
print(b)  # "SQL"
print(c)  # "Git"
print(d)  # "Docker"

# Extended unpacking using *
leader, *tools = skills
print(leader)  # Output: "Python"
print(tools)   # Output: ["SQL", "Git", "Docker"]`),
      sub("5. Chained Indexing (Multi-Dimensional Data)"),
      p("Accesses items within nested structures (lists inside lists, or matrices). Each additional set of square brackets <code>[]</code> moves one layer deeper into the data structure."),
      p("<strong>Syntax:</strong> <code>matrix[row_index][column_index]</code>"),
      codeBlock("Python", `# 2D Grid Matrix (Rows and Columns)
matrix = [
    [1, 2, 3],  # Row 0
    [4, 5, 6],  # Row 1
    [7, 8, 9]   # Row 2
]

# Access entire row
print(matrix[1])       # Output: [4, 5, 6]

# Chained indexing for a specific element
print(matrix[0][2])    # Output: 3 (Row 0, Column 2)
print(matrix[2][1])    # Output: 8 (Row 2, Column 1)

# 3D List Example
three_d = [
    [[1, 2], [3, 4]],
    [[5, 6], [7, 8]]
]
print(three_d[1][0][1])  # Output: 6

# Modifying nested elements
matrix[1][1] = 99
print(matrix)  # [[1, 2, 3], [4, 99, 6], [7, 8, 9]]`)
    ),
  ]);

  topic({
    id: "builtin-methods-functions",
    title: "Built-in Methods vs Built-in Functions",
    difficulty: "Beginner",
    summary: "How built-in methods differ from built-in functions.",
    icon: "fa-solid fa-code-compare",
    category: "Lists",
  }, () => [
    section("", "",
      p("The primary difference lies in how they are called and what they belong to. <strong>Functions</strong> are standalone blocks of code, while <strong>methods</strong> are functions that belong specifically to an object (like a list)."),
      sub("Key Differences"),
      table(["Feature", "Built-in Functions", "Built-in Methods"], [
      ["<strong>Definition</strong>", "Standalone global functions available anywhere.", "Functions defined inside a specific class (like list)."],
      ["<strong>Syntax</strong>", "<code>function_name(object)</code>", "<code>object.method_name()</code>"],
      ["<strong>Ownership</strong>", "Independent.", "Bound to a specific data type object."],
      ["<strong>Modification</strong>", "Often returns a new object, leaves original intact.", "Often modifies the original object in-place."],
    ]),
      sub("When to Use Which?"),
      bullets([
      "<strong>Use functions</strong> (like <code>sorted()</code>) when you want to protect your original data and get a new copy back.",
      "<strong>Use methods</strong> (like <code>.sort()</code>) when you want to change your data directly to save memory.",
    ])
    ),
  ]);

  topic({
    id: "builtin-methods-list",
    title: "Built-in Methods of List",
    difficulty: "Intermediate",
    summary: "List methods for adding, removing, searching and reordering items.",
    icon: "fa-solid fa-screwdriver-wrench",
    category: "Lists",
  }, () => [
    section("", "",
      p("Built-in methods are pre-programmed functions attached to list objects that allow you to modify data, search items, or reorder elements."),
      sub("1. Adding Elements"),
      p("Methods used to insert new items into a list."),
      bullets([
      "<strong>append(x):</strong> Adds item x to the very end of the list.",
      "<strong>extend(iterable):</strong> Appends all items from an iterable (like another list or tuple) to the end.",
      "<strong>insert(index, x):</strong> Inserts item x at a specific position index, shifting remaining items to the right.",
    ]),
      codeBlock("Python", `# Setup
nums = [1, 2]

# Append - adds to the end
nums.append(4)
print(nums)  # [1, 2, 4]

# Insert - adds at specific position
nums.insert(2, 3)  # Insert 3 at index 2
print(nums)        # [1, 2, 3, 4]

# Extend - adds multiple items from another list
nums.extend([5, 6])
print(nums)  # [1, 2, 3, 4, 5, 6]

# Extend with string (adds each character)
nums.extend("7")
print(nums)  # [1, 2, 3, 4, 5, 6, '7']

# Extend with tuple
nums.extend((8, 9))
print(nums)  # [1, 2, 3, 4, 5, 6, '7', 8, 9]`),
      sub("2. Removing Elements"),
      p("Methods used to delete items from a list."),
      bullets([
      "<strong>pop([index]):</strong> Removes and returns the item at the given index. If no index is specified, it removes and returns the last item.",
      "<strong>remove(x):</strong> Searches for and removes the first occurrence of value x. Raises a ValueError if the item is not found.",
      "<strong>clear():</strong> Deletes every single item from the list, leaving it completely empty.",
    ]),
      codeBlock("Python", `fruits = ["apple", "banana", "cherry", "banana", "date"]

# Pop by index - removes and returns item
popped_item = fruits.pop(1)  # Removes "banana" at index 1
print(popped_item)           # "banana"
print(fruits)                # ['apple', 'cherry', 'banana', 'date']

# Pop without index - removes last item
last_item = fruits.pop()
print(last_item)             # "date"
print(fruits)                # ['apple', 'cherry', 'banana']

# Remove by value - removes first occurrence
fruits.remove("banana")
print(fruits)                # ['apple', 'cherry']

# Remove non-existent value (raises ValueError)
# fruits.remove("mango")     # ValueError: list.remove(x): x not in list

# Clear - removes all items
fruits.clear()
print(fruits)                # []`),
      sub("3. Utility &amp; Searching"),
      p("Methods used to locate elements or gather details about list values without modifying them."),
      bullets([
      "<strong>index(x):</strong> Returns the position index of the first occurrence of value x. Raises a ValueError if missing.",
      "<strong>count(x):</strong> Returns the total number of times value x appears in the list.",
    ]),
      codeBlock("Python", `letters = ["a", "b", "c", "b", "a", "d"]

# Index search - finds first occurrence
print(letters.index("c"))    # 2
print(letters.index("b"))    # 1 (first occurrence)

# Index with start and end parameters
print(letters.index("b", 2)) # 3 (search starting from index 2)
print(letters.index("a", 1, 5)) # 4 (search between indices 1 and 5)

# Count occurrences
print(letters.count("b"))    # 2
print(letters.count("z"))    # 0
print(letters.count("a"))    # 2

# Non-existent value (raises ValueError)
# print(letters.index("z"))  # ValueError: 'z' is not in list`),
      sub("4. Ordering &amp; Copying"),
      p("Methods used to rearrange the sequence of elements or duplicate the list container."),
      bullets([
      "<strong>sort(key=None, reverse=False):</strong> Rearranges the list items in-place (ascending order by default). Modifies the original list directly.",
      "<strong>reverse():</strong> Flips the order of elements in-place from back to front.",
      "<strong>copy():</strong> Generates a shallow duplicate copy of the list.",
    ]),
      codeBlock("Python", `data = [10, 30, 20, 40, 15]

# Sort - ascending (default)
data.sort()
print(data)  # [10, 15, 20, 30, 40]

# Sort - descending
data.sort(reverse=True)
print(data)  # [40, 30, 20, 15, 10]

# Sort with key parameter
words = ["banana", "apple", "cherry", "date"]
words.sort(key=len)  # Sort by length
print(words)  # ['date', 'apple', 'banana', 'cherry']

words.sort(key=lambda x: x[-1])  # Sort by last letter
print(words)  # ['banana', 'apple', 'cherry', 'date']

# Reverse - flips order
items = ["first", "second", "third"]
items.reverse()
print(items)  # ['third', 'second', 'first']

# Copy - creates a shallow copy
original = [1, 2, [3, 4]]
backup = original.copy()
backup[0] = 99
backup[2][0] = 99
print(original)  # [1, 2, [99, 4]] - nested list still shared
print(backup)    # [99, 2, [99, 4]]

# Alternative copy methods
copy1 = original[:]        # Slicing
copy2 = list(original)     # list() constructor`),
      sub("Summary Table of List Methods"),
      table(["Method", "Description", "Example"], [
      ["<code>append(x)</code>", "Adds x to the end", "<code>list.append(5)</code>"],
      ["<code>extend(iterable)</code>", "Adds all items from iterable", "<code>list.extend([1,2])</code>"],
      ["<code>insert(i, x)</code>", "Inserts x at index i", "<code>list.insert(0, x)</code>"],
      ["<code>remove(x)</code>", "Removes first occurrence of x", "<code>list.remove(5)</code>"],
      ["<code>pop([i])</code>", "Removes and returns item at i", "<code>list.pop()</code>"],
      ["<code>clear()</code>", "Removes all items", "<code>list.clear()</code>"],
      ["<code>index(x)</code>", "Returns index of first occurrence", "<code>list.index(5)</code>"],
      ["<code>count(x)</code>", "Counts occurrences of x", "<code>list.count(5)</code>"],
      ["<code>sort([reverse])</code>", "Sorts in-place", "<code>list.sort()</code>"],
      ["<code>reverse()</code>", "Reverses in-place", "<code>list.reverse()</code>"],
      ["<code>copy()</code>", "Returns a shallow copy", "<code>list.copy()</code>"],
    ])
    ),
  ]);

  topic({
    id: "builtin-functions-list",
    title: "Built-in Functions of List",
    difficulty: "Intermediate",
    summary: "Built-in functions that work on lists, such as len(), sum(), min() and sorted().",
    icon: "fa-solid fa-toolbox",
    category: "Lists",
  }, () => [
    section("", "Built-in Functions Used with Lists",
      p("Unlike list methods, built-in functions are standalone utilities. They accept the list as an argument inside parentheses—<code>function(list)</code>—and typically return a new value or object without changing the original list."),
      sub("1. Information &amp; Aggregation"),
      bullets([
      "<strong>len(list):</strong> Returns the total number of elements.",
      "<strong>sum(list, start=0):</strong> Adds all numerical elements together.",
      "<strong>min(list):</strong> Extracts the smallest item in the list.",
      "<strong>max(list):</strong> Extracts the largest item in the list.",
    ]),
      codeBlock("Python", `nums = [10, 20, 30, 40, 50]

# len() - length of list
print(len(nums))  # 5

# sum() - sum of all elements
print(sum(nums))  # 150

# sum() with start value
print(sum(nums, 10))  # 160

# min() - smallest element
print(min(nums))  # 10

# max() - largest element
print(max(nums))  # 50

# With mixed data types (must be comparable)
mixed = [10, 20, 30]
print(min(mixed))  # 10
print(max(mixed))  # 30

# For strings (alphabetical comparison)
words = ["apple", "banana", "cherry"]
print(min(words))  # "apple"
print(max(words))  # "cherry"`),
      sub("2. Ordering &amp; Transformations"),
      bullets([
      "<strong>sorted(iterable, reverse=False):</strong> Generates a brand new sorted list leaving the original completely unaltered.",
      "<strong>reversed(list):</strong> Returns a memory-efficient iterator that reads items backward. Wrap it in <code>list()</code> to print it.",
    ]),
      codeBlock("Python", `letters = ["c", "a", "b", "e", "d"]

# sorted() - returns new sorted list
sorted_letters = sorted(letters)
print(sorted_letters)  # ['a', 'b', 'c', 'd', 'e']
print(letters)         # ['c', 'a', 'b', 'e', 'd'] (Untouched!)

# sorted() with reverse parameter
sorted_desc = sorted(letters, reverse=True)
print(sorted_desc)     # ['e', 'd', 'c', 'b', 'a']

# sorted() with key parameter
words = ["banana", "apple", "cherry", "date"]
sorted_by_len = sorted(words, key=len)
print(sorted_by_len)   # ['date', 'apple', 'banana', 'cherry']

# reversed() - returns an iterator
data = [1, 2, 3, 4, 5]
rev_iter = reversed(data)
print(list(rev_iter))  # [5, 4, 3, 2, 1]
print(data)            # [1, 2, 3, 4, 5] (Untouched!)

# Using reversed() in a loop
for item in reversed(data):
    print(item)        # 5, 4, 3, 2, 1`),
      sub("3. Iteration &amp; Element Validation"),
      bullets([
      "<strong>any(list):</strong> Returns <code>True</code> if at least one item in the list evaluates to <code>True</code> (non-zero, non-empty, or <code>True</code>).",
      "<strong>all(list):</strong> Returns <code>True</code> only if every single item in the list evaluates to <code>True</code>.",
      "<strong>enumerate(list):</strong> Couples each item with its sequential index number, yielding an iterable of index-value pairs.",
    ]),
      codeBlock("Python", `# any() - checks if any element is truthy
flags = [0, False, "hello", ""]
print(any(flags))  # True (because of "hello")

flags2 = [0, False, "", None]
print(any(flags2))  # False (all are falsy)

# all() - checks if all elements are truthy
checks = [True, 1, "yes"]
print(all(checks))  # True

checks2 = [True, 1, 0]
print(all(checks2))  # False (0 is falsy)

# enumerate() - pairs index with value
tasks = ["code", "test", "deploy"]
for index, task in enumerate(tasks):
    print(f"{index}: {task}")
# Output:
# 0: code
# 1: test
# 2: deploy

# enumerate() with start parameter
for index, task in enumerate(tasks, start=1):
    print(f"{index}: {task}")
# Output:
# 1: code
# 2: test
# 3: deploy

# list of enumerate pairs
print(list(enumerate(tasks)))  # [(0, 'code'), (1, 'test'), (2, 'deploy')]`),
      sub("4. Data Type Conversion"),
      bullets([
      "<strong>list(iterable):</strong> Converts other data types (like strings, tuples, or sets) into a standard Python list.",
      "<strong>zip(*iterables):</strong> Takes multiple lists (or other iterables) and aggregates their corresponding elements into tuples. Stops at the length of the shortest list.",
    ]),
      codeBlock("Python", `# list() conversion
word = "AI"
print(list(word))  # ['A', 'I']

tuple_data = (1, 2, 3)
print(list(tuple_data))  # [1, 2, 3]

range_data = range(5)
print(list(range_data))  # [0, 1, 2, 3, 4]

# zip() - combines multiple lists element-wise
names = ["Alice", "Bob", "Charlie"]
scores = [85, 92, 78]
grades = ["A", "B", "C"]

# Combine lists
zipped_data = zip(names, scores, grades)
print(list(zipped_data))
# Output: [('Alice', 85, 'A'), ('Bob', 92, 'B'), ('Charlie', 78, 'C')]

# zip() with uneven lengths (stops at shortest)
names2 = ["Alice", "Bob", "Charlie", "David"]
scores2 = [85, 92]
zipped2 = zip(names2, scores2)
print(list(zipped2))  # [('Alice', 85), ('Bob', 92)]

# Unzipping with zip(*)
pairs = [('Alice', 85), ('Bob', 92), ('Charlie', 78)]
names_unzipped, scores_unzipped = zip(*pairs)
print(names_unzipped)   # ('Alice', 'Bob', 'Charlie')
print(scores_unzipped)  # (85, 92, 78)`),
      sub("Summary Table of Built-in Functions for Lists"),
      table(["Function", "Description", "Example"], [
      ["<code>len(list)</code>", "Returns number of elements", "<code>len([1,2,3]) → 3</code>"],
      ["<code>sum(list)</code>", "Sums numerical elements", "<code>sum([1,2,3]) → 6</code>"],
      ["<code>min(list)</code>", "Returns smallest element", "<code>min([3,1,2]) → 1</code>"],
      ["<code>max(list)</code>", "Returns largest element", "<code>max([3,1,2]) → 3</code>"],
      ["<code>sorted(list)</code>", "Returns new sorted list", "<code>sorted([3,1,2]) → [1,2,3]</code>"],
      ["<code>reversed(list)</code>", "Returns reverse iterator", "<code>list(reversed([1,2,3])) → [3,2,1]</code>"],
      ["<code>any(list)</code>", "True if any element is truthy", "<code>any([0,1]) → True</code>"],
      ["<code>all(list)</code>", "True if all elements are truthy", "<code>all([1,2]) → True</code>"],
      ["<code>enumerate(list)</code>", "Returns index-value pairs", "<code>list(enumerate(['a','b'])) → [(0,'a'),(1,'b')]</code>"],
      ["<code>list(iterable)</code>", "Converts to list", "<code>list('abc') → ['a','b','c']</code>"],
      ["<code>zip(*iterables)</code>", "Combines iterables element-wise", "<code>zip([1,2],['a','b']) → [(1,'a'),(2,'b')]</code>"],
    ])
    ),
  ]);

  topic({
    id: "tuples-intro",
    title: "Tuple and its Properties",
    difficulty: "Beginner",
    summary: "What a tuple is and why its immutability matters.",
    icon: "fa-solid fa-lock",
    category: "Tuples",
  }, () => [
    section("", "What is a Tuple?",
      p("A <strong>tuple</strong> is a built-in data structure used to store an ordered collection of items. Tuples are <strong>immutable</strong>, meaning once created, they cannot be modified (no addition, removal, or replacement of elements).")
    ),
    section("", "Core Properties of Python Tuples",
      bullets([
      "<strong>Ordered:</strong> Items maintain their exact insertion sequence.",
      "<strong>Immutable:</strong> Elements cannot be added, updated, or removed after creation.",
      "<strong>Heterogeneous:</strong> A single tuple can store different data types.",
      "<strong>Indexed:</strong> Elements are zero-indexed, starting at position 0.",
      "<strong>Allows Duplicates:</strong> The same value can appear multiple times.",
      "<strong>Fixed Size:</strong> The tuple size is fixed at creation and cannot change.",
      "<strong>Nestable:</strong> Tuples can contain other tuples or lists.",
      "<strong>Iterable:</strong> Can be traversed using loops.",
      "<strong>Slicable:</strong> Subsections can be extracted using colon syntax.",
      "<strong>Hashable:</strong> Tuples can be used as dictionary keys (if all elements are hashable).",
    ]),
      sub("Example Demonstrating Tuple Properties"),
      codeBlock("Python", `# Creating a tuple
my_tuple = (10, "Python", 3.14, True, 10, (1, 2, 3))

# Ordered - maintains insertion order
print(my_tuple)  # (10, 'Python', 3.14, True, 10, (1, 2, 3))

# Immutable - cannot change elements
# my_tuple[1] = "Java"  # TypeError: 'tuple' object does not support item assignment

# Heterogeneous - different data types
print(type(my_tuple[0]))  # int
print(type(my_tuple[1]))  # str
print(type(my_tuple[2]))  # float

# Indexed - access by position
print(my_tuple[0])   # 10 (first element)
print(my_tuple[-1])  # (1, 2, 3) (last element)

# Allows duplicates
print(my_tuple.count(10))  # 2 (10 appears twice)

# Fixed size - cannot grow or shrink
print(len(my_tuple))  # 6

# Nestable - tuple containing another tuple
print(my_tuple[5][1])  # 2

# Slicable
print(my_tuple[1:4])  # ('Python', 3.14, True)

# Hashable - can be used as dictionary key
my_dict = {(1, 2): "coordinates"}
print(my_dict)  # {(1, 2): 'coordinates'}`),
      sub("When to Use Tuples vs Lists?"),
      bullets([
      "<strong>Use tuples when:</strong> Data should not change (e.g., coordinates, configuration values, days of the week).",
      "<strong>Use lists when:</strong> Data needs to be modified (e.g., user input, dynamic collections).",
      "Tuples are faster and use less memory than lists.",
      "Tuples can be used as dictionary keys (lists cannot).",
    ])
    ),
  ]);

  topic({
    id: "creating-tuple",
    title: "Creating Tuple",
    difficulty: "Beginner",
    summary: "The different ways of creating a tuple.",
    icon: "fa-solid fa-square-plus",
    category: "Tuples",
  }, () => [
    section("", "Creating Tuples in Python",
      p("Tuples can be created using parentheses <code>()</code> or the <code>tuple()</code> constructor. Here are various ways to create tuples:"),
      sub("1. Using Parentheses (Tuple Literals)"),
      p("This is the standard way to define a tuple. Items are placed inside parentheses separated by commas."),
      codeBlock("Python", `# Empty Tuple
empty_tuple = ()
print(empty_tuple)  # ()

# Single Element Tuple (note the trailing comma)
single_tuple = (5,)
print(single_tuple)  # (5,)
# Without comma, it's just a number, not a tuple
not_a_tuple = (5)
print(type(not_a_tuple))  # int

# Multiple Elements
numbers = (1, 2, 3, 4, 5)
print(numbers)  # (1, 2, 3, 4, 5)

# Mixed Data Types
mixed = (1, "Hello", 3.14, True)
print(mixed)  # (1, 'Hello', 3.14, True)

# Nested Tuple
nested = ((1, 2), (3, 4), (5, 6))
print(nested)  # ((1, 2), (3, 4), (5, 6))

# Tuple without parentheses (tuple packing)
packed = 1, 2, 3
print(packed)          # (1, 2, 3)
print(type(packed))    # tuple`),
      sub("2. Using the tuple() Constructor"),
      p("The <code>tuple()</code> function converts other iterable objects into tuples."),
      codeBlock("Python", `# From a String
char_tuple = tuple("abc")
print(char_tuple)  # ('a', 'b', 'c')

# From a List
list_to_tuple = tuple([1, 2, 3])
print(list_to_tuple)  # (1, 2, 3)

# From a Range
range_tuple = tuple(range(5))
print(range_tuple)  # (0, 1, 2, 3, 4)

# From a Set
set_to_tuple = tuple({10, 20, 30})
print(set_to_tuple)  # (10, 20, 30) (order may vary)

# Empty Tuple Constructor
empty_tuple = tuple()
print(empty_tuple)  # ()`),
      sub("3. Tuple Packing and Unpacking"),
      codeBlock("Python", `# Tuple Packing - creating tuple without parentheses
packed = 10, 20, 30
print(packed)  # (10, 20, 30)

# Tuple Unpacking - assigning tuple elements to variables
a, b, c = packed
print(a)  # 10
print(b)  # 20
print(c)  # 30

# Unpacking with *
first, *rest = packed
print(first)  # 10
print(rest)   # [20, 30]

# Swapping variables using tuples (Pythonic)
x = 5
y = 10
x, y = y, x
print(x, y)  # 10 5`)
    ),
  ]);

  topic({
    id: "accessing-tuple-items",
    title: "Accessing Tuple Items",
    difficulty: "Beginner",
    summary: "Reading tuple items by index, slicing and unpacking.",
    icon: "fa-solid fa-arrow-pointer",
    category: "Tuples",
  }, () => [
    section("", "",
      p("Accessing tuple items is similar to lists because tuples are also sequence types. However, since tuples are immutable, you cannot modify elements after creation."),
      sub("1. Indexing (Positive &amp; Negative)"),
      p("Retrieves a single item based on its exact position number."),
      codeBlock("Python", `# Setup
colors = ("red", "green", "blue", "yellow")

# Positive Indexing
print(colors[0])   # "red"   (First item)
print(colors[2])   # "blue"  (Third item)

# Negative Indexing
print(colors[-1])  # "yellow" (Last item)
print(colors[-2])  # "blue"   (Second-to-last item)

# IndexError Example (trying to access out of range)
# print(colors[4])  # IndexError: tuple index out of range`),
      sub("2. Slicing"),
      p("Extracts a subtuple (subset of elements) using a specific range."),
      codeBlock("Python", `nums = (10, 20, 30, 40, 50)

# Basic Slice
print(nums[1:4])   # (20, 30, 40) (Indices 1, 2, 3)

# Omitted Boundaries
print(nums[:3])    # (10, 20, 30) (Start to index 2)
print(nums[3:])    # (40, 50)     (Index 3 to end)
print(nums[:])     # (10, 20, 30, 40, 50) (Full copy)

# Step Slicing
print(nums[::2])   # (10, 30, 50) (Every second item)
print(nums[::-1])  # (50, 40, 30, 20, 10) (Reverses tuple)`),
      sub("3. Iteration"),
      p("Traverses every element sequentially using loops."),
      codeBlock("Python", `animals = ("cat", "dog", "bird", "fish")

# Direct iteration
print("Direct iteration:")
for pet in animals:
    print(pet)
# Output:
# cat
# dog
# bird
# fish

# Enumerate iteration
print("\\nEnumerate iteration:")
for index, pet in enumerate(animals):
    print(f"{index}: {pet}")
# Output:
# 0: cat
# 1: dog
# 2: bird
# 3: fish`),
      sub("4. Unpacking"),
      p("Unpacks elements directly into distinct variables."),
      codeBlock("Python", `skills = ("Python", "SQL", "Git", "Docker")

# Exact unpacking
a, b, c, d = skills
print(a)  # "Python"
print(b)  # "SQL"
print(c)  # "Git"
print(d)  # "Docker"

# Extended unpacking with *
leader, *tools = skills
print(leader)  # "Python"
print(tools)   # ["SQL", "Git", "Docker"]

# Unpacking with underscore for unused values
numbers = (10, 20, 30, 40)
x, _, y, _ = numbers
print(x)  # 10
print(y)  # 30`),
      sub("5. Chained Indexing (Multi-Dimensional Data)"),
      p("Accesses items within nested tuple structures."),
      codeBlock("Python", `# 2D Tuple
matrix = (
    (1, 2, 3),  # Row 0
    (4, 5, 6),  # Row 1
    (7, 8, 9)   # Row 2
)

# Access entire row
print(matrix[1])       # (4, 5, 6)

# Chained indexing for a specific element
print(matrix[0][2])    # 3 (Row 0, Column 2)
print(matrix[2][1])    # 8 (Row 2, Column 1)

# Mixed nested structures (tuple containing lists)
mixed = (1, [2, 3], (4, 5))
print(mixed[1][1])     # 3 (accessing list inside tuple)
print(mixed[2][0])     # 4 (accessing nested tuple)`)
    ),
  ]);

  topic({
    id: "builtin-methods-tuples",
    title: "Built-in Methods of Tuples",
    difficulty: "Beginner",
    summary: "The two tuple methods, count() and index().",
    icon: "fa-solid fa-screwdriver-wrench",
    category: "Tuples",
  }, () => [
    section("", "",
      p("Tuples have only two built-in methods because they are immutable. Unlike lists, tuples do not have methods like <code>append()</code>, <code>extend()</code>, <code>insert()</code>, <code>remove()</code>, <code>pop()</code>, <code>clear()</code>, <code>sort()</code>, <code>reverse()</code>, or <code>copy()</code>."),
      sub("1. count() Method"),
      p("Returns the number of times a specified value appears in the tuple."),
      codeBlock("Python", `# count() - returns number of occurrences
colors = ("red", "blue", "red", "green", "red", "yellow")

print(colors.count("red"))    # 3
print(colors.count("blue"))   # 1
print(colors.count("purple")) # 0

# With mixed data types
mixed = (1, "hello", 1, 3.14, 1, True)
print(mixed.count(1))  # 3 (counts both 1 and True)`),
      sub("2. index() Method"),
      p("Returns the index of the first occurrence of a specified value. Raises a ValueError if not found."),
      codeBlock("Python", `# index() - returns first occurrence index
colors = ("red", "blue", "green", "blue", "yellow")

print(colors.index("green"))   # 2
print(colors.index("blue"))    # 1 (first occurrence)

# index() with start and end parameters
print(colors.index("blue", 2))  # 3 (search from index 2)
print(colors.index("blue", 2, 4))  # 3 (search between 2 and 4)

# Non-existent value (raises ValueError)
# print(colors.index("purple"))  # ValueError: tuple.index(x): x not in tuple`),
      sub("Summary Table of Tuple Methods"),
      table(["Method", "Description", "Example"], [
      ["<code>count(x)</code>", "Returns number of occurrences of x", "<code>tuple.count(5)</code>"],
      ["<code>index(x)</code>", "Returns index of first occurrence of x", "<code>tuple.index(5)</code>"],
    ]),
      sub("Important Note"),
      p("Since tuples are immutable, they do not have methods that modify the tuple. All operations that appear to modify a tuple actually create a new tuple."),
      codeBlock("Python", `# These operations create NEW tuples, they don't modify the original
t = (1, 2, 3)

# Concatenation creates a new tuple
new_t = t + (4, 5)
print(t)      # (1, 2, 3) - original unchanged
print(new_t)  # (1, 2, 3, 4, 5)

# Repetition creates a new tuple
repeated = t * 2
print(repeated)  # (1, 2, 3, 1, 2, 3)

# Slicing creates a new tuple
sliced = t[1:3]
print(sliced)  # (2, 3)`)
    ),
  ]);

  topic({
    id: "builtin-functions-tuples",
    title: "Built-in Functions of Tuples",
    difficulty: "Intermediate",
    summary: "Built-in functions that work on tuples.",
    icon: "fa-solid fa-toolbox",
    category: "Tuples",
  }, () => [
    section("", "Built-in Functions Used with Tuples",
      p("Similar to lists, tuples can be used with various built-in functions. Since tuples are sequence types, most functions that work with lists also work with tuples."),
      sub("1. Information &amp; Aggregation"),
      bullets([
      "<strong>len(tuple):</strong> Returns the total number of elements.",
      "<strong>sum(tuple, start=0):</strong> Adds all numerical elements together.",
      "<strong>min(tuple):</strong> Extracts the smallest item in the tuple.",
      "<strong>max(tuple):</strong> Extracts the largest item in the tuple.",
    ]),
      codeBlock("Python", `nums = (10, 20, 30, 40, 50)

# len() - length of tuple
print(len(nums))  # 5

# sum() - sum of all elements
print(sum(nums))  # 150

# sum() with start value
print(sum(nums, 10))  # 160

# min() - smallest element
print(min(nums))  # 10

# max() - largest element
print(max(nums))  # 50

# With strings (alphabetical comparison)
words = ("apple", "banana", "cherry")
print(min(words))  # "apple"
print(max(words))  # "cherry"`),
      sub("2. Ordering &amp; Transformations"),
      bullets([
      "<strong>sorted(iterable, reverse=False):</strong> Generates a brand new sorted list from the tuple (leaves original unchanged).",
      "<strong>reversed(tuple):</strong> Returns a memory-efficient iterator that reads items backward.",
    ]),
      codeBlock("Python", `letters = ("c", "a", "b", "e", "d")

# sorted() - returns new list (not tuple)
sorted_letters = sorted(letters)
print(sorted_letters)  # ['a', 'b', 'c', 'd', 'e']
print(letters)         # ('c', 'a', 'b', 'e', 'd') (Untouched!)

# Convert back to tuple
sorted_tuple = tuple(sorted(letters))
print(sorted_tuple)    # ('a', 'b', 'c', 'd', 'e')

# reversed() - returns an iterator
data = (1, 2, 3, 4, 5)
rev_iter = reversed(data)
print(tuple(rev_iter))  # (5, 4, 3, 2, 1)
print(data)             # (1, 2, 3, 4, 5) (Untouched!)`),
      sub("3. Iteration &amp; Element Validation"),
      bullets([
      "<strong>any(tuple):</strong> Returns <code>True</code> if at least one item is truthy.",
      "<strong>all(tuple):</strong> Returns <code>True</code> only if every single item is truthy.",
      "<strong>enumerate(tuple):</strong> Couples each item with its index number.",
    ]),
      codeBlock("Python", `# any() - checks if any element is truthy
flags = (0, False, "hello", "")
print(any(flags))  # True (because of "hello")

# all() - checks if all elements are truthy
checks = (True, 1, "yes")
print(all(checks))  # True

checks2 = (True, 1, 0)
print(all(checks2))  # False (0 is falsy)

# enumerate() - pairs index with value
tasks = ("code", "test", "deploy")
for index, task in enumerate(tasks):
    print(f"{index}: {task}")
# Output:
# 0: code
# 1: test
# 2: deploy

# enumerate() with start parameter
for index, task in enumerate(tasks, start=1):
    print(f"{index}: {task}")
# Output:
# 1: code
# 2: test
# 3: deploy`),
      sub("4. Data Type Conversion"),
      bullets([
      "<strong>tuple(iterable):</strong> Converts other data types into a standard Python tuple.",
      "<strong>zip(*iterables):</strong> Aggregates corresponding elements from multiple iterables into tuples.",
    ]),
      codeBlock("Python", `# tuple() conversion
word = "AI"
print(tuple(word))  # ('A', 'I')

list_data = [1, 2, 3]
print(tuple(list_data))  # (1, 2, 3)

range_data = range(5)
print(tuple(range_data))  # (0, 1, 2, 3, 4)

# zip() - combines multiple iterables
names = ("Alice", "Bob", "Charlie")
scores = (85, 92, 78)

zipped_data = zip(names, scores)
print(tuple(zipped_data))
# Output: (('Alice', 85), ('Bob', 92), ('Charlie', 78))

# zip() with uneven lengths (stops at shortest)
names2 = ("Alice", "Bob", "Charlie", "David")
scores2 = (85, 92)
zipped2 = zip(names2, scores2)
print(tuple(zipped2))  # (('Alice', 85), ('Bob', 92))`),
      sub("Summary Table of Built-in Functions for Tuples"),
      table(["Function", "Description", "Example"], [
      ["<code>len(tuple)</code>", "Returns number of elements", "<code>len((1,2,3)) → 3</code>"],
      ["<code>sum(tuple)</code>", "Sums numerical elements", "<code>sum((1,2,3)) → 6</code>"],
      ["<code>min(tuple)</code>", "Returns smallest element", "<code>min((3,1,2)) → 1</code>"],
      ["<code>max(tuple)</code>", "Returns largest element", "<code>max((3,1,2)) → 3</code>"],
      ["<code>sorted(tuple)</code>", "Returns new sorted list", "<code>sorted((3,1,2)) → [1,2,3]</code>"],
      ["<code>reversed(tuple)</code>", "Returns reverse iterator", "<code>tuple(reversed((1,2,3))) → (3,2,1)</code>"],
      ["<code>any(tuple)</code>", "True if any element is truthy", "<code>any((0,1)) → True</code>"],
      ["<code>all(tuple)</code>", "True if all elements are truthy", "<code>all((1,2)) → True</code>"],
      ["<code>enumerate(tuple)</code>", "Returns index-value pairs", "<code>list(enumerate(('a','b'))) → [(0,'a'),(1,'b')]</code>"],
      ["<code>tuple(iterable)</code>", "Converts to tuple", "<code>tuple('abc') → ('a','b','c')</code>"],
      ["<code>zip(*iterables)</code>", "Combines iterables element-wise", "<code>zip((1,2),('a','b')) → ((1,'a'),(2,'b'))</code>"],
    ])
    ),
  ]);

  topic({
    id: "list-vs-tuple",
    title: "List vs Tuple",
    difficulty: "Intermediate",
    summary: "A side-by-side comparison of lists and tuples, and when to use which.",
    icon: "fa-solid fa-code-compare",
    category: "Lists & Tuples",
  }, () => [
    section("", "List vs Tuple: A Detailed Comparison",
      p("Understanding the differences between lists and tuples is crucial for writing efficient and appropriate Python code."),
      sub("Key Differences"),
      table(["Feature", "List", "Tuple"], [
      ["<strong>Mutability</strong>", "Mutable (can be modified)", "Immutable (cannot be modified)"],
      ["<strong>Syntax</strong>", "<code>[ ]</code> square brackets", "<code>( )</code> parentheses"],
      ["<strong>Memory Usage</strong>", "More memory (larger)", "Less memory (smaller)"],
      ["<strong>Speed</strong>", "Slower (due to mutability overhead)", "Faster (optimized)"],
      ["<strong>Methods</strong>", "Many methods (<code>append</code>, <code>pop</code>, etc.)", "Only <code>count</code> and <code>index</code>"],
      ["<strong>Use as Dictionary Key</strong>", "No (unhashable)", "Yes (hashable)"],
      ["<strong>Size</strong>", "Dynamic (can grow/shrink)", "Fixed (cannot resize)"],
      ["<strong>Representation</strong>", "Best for dynamic data", "Best for fixed data"],
    ]),
      sub("Examples Showing Differences"),
      codeBlock("Python", `# Mutability Comparison
my_list = [1, 2, 3]
my_tuple = (1, 2, 3)

# List - can be modified
my_list[0] = 99
my_list.append(4)
print(my_list)  # [99, 2, 3, 4]

# Tuple - cannot be modified
# my_tuple[0] = 99  # TypeError
# Cannot append, pop, insert, etc.

# Memory Usage (approximate)
import sys
list_data = [1, 2, 3, 4, 5]
tuple_data = (1, 2, 3, 4, 5)
print(sys.getsizeof(list_data))   # Larger
print(sys.getsizeof(tuple_data))  # Smaller

# Speed (tuples are faster)
import timeit
list_time = timeit.timeit('x = [1,2,3,4,5]', number=1000000)
tuple_time = timeit.timeit('x = (1,2,3,4,5)', number=1000000)
print(f"List time: {list_time:.4f} sec")
print(f"Tuple time: {tuple_time:.4f} sec")

# Methods Available
print(dir(list))  # Shows all list methods
print(dir(tuple)) # Shows only count and index

# Dictionary Keys
dict_with_tuple = {(1, 2): "valid"}  # Works
# dict_with_list = {[1, 2]: "invalid"}  # TypeError`),
      sub("When to Use Which?"),
      split(
      col("Use Lists When:", [
        "Data needs to change (add, remove, update)",
        "Storing user input",
        "Building dynamic collections",
        "Performance is not critical",
        "Need sorting or reversing in-place",
      ]),
      col("Use Tuples When:", [
        "Data should never change (constants)",
        "Storing coordinates or fixed values",
        "Dictionary keys are needed",
        "Memory efficiency is important",
        "Performance is critical",
        "Data represents a record/row",
      ]),
    ),
      sub("Practical Examples"),
      codeBlock("Python", `# Real-world examples

# Use tuple for fixed data
days_of_week = ("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
rgb_colors = (255, 128, 0)  # Orange
coordinates = (40.7128, -74.0060)  # NYC coordinates

# Use list for dynamic data
shopping_cart = []  # Empty cart
shopping_cart.append("apple")
shopping_cart.append("banana")
shopping_cart.remove("apple")
# Users can add/remove items freely

# Tuple as dictionary key (list would fail)
location_data = {}
location_data[(40.7128, -74.0060)] = "New York City"
print(location_data)  # {(40.7128, -74.006): 'New York City'}`),
      sub("Converting Between List and Tuple"),
      codeBlock("Python", `# List to Tuple
my_list = [1, 2, 3, 4, 5]
my_tuple = tuple(my_list)
print(my_tuple)  # (1, 2, 3, 4, 5)

# Tuple to List
my_tuple = (1, 2, 3, 4, 5)
my_list = list(my_tuple)
print(my_list)  # [1, 2, 3, 4, 5]

# Use this when you need to modify a tuple temporarily
data_tuple = (1, 2, 3)
data_list = list(data_tuple)
data_list.append(4)
data_list[0] = 99
data_tuple = tuple(data_list)
print(data_tuple)  # (99, 2, 3, 4)`),
      sub("Performance Comparison"),
      p("Tuples are generally faster and more memory-efficient than lists. Here's why:"),
      bullets([
      "<strong>Memory:</strong> Tuples allocate exactly the memory needed; lists allocate extra space for growth.",
      "<strong>Creation:</strong> Tuples are faster to create.",
      "<strong>Access:</strong> Both have O(1) access time, but tuples are slightly faster.",
      "<strong>Iteration:</strong> Tuples iterate faster due to smaller memory footprint.",
    ])
    ),
  ]);

  topic({
    id: "sets-intro",
    title: "Set and its Properties",
    difficulty: "Beginner",
    summary: "What a set is: an unordered collection of unique items.",
    icon: "fa-solid fa-circle-dot",
    category: "Sets",
  }, () => [
    section("", "What is a Set?",
      p("A <strong>set</strong> is a built-in data structure used to store an unordered collection of unique items. Sets are mutable, but the elements inside a set must be immutable (hashable). Sets are one of the most useful data structures when you need to eliminate duplicates or perform mathematical set operations.")
    ),
    section("", "Core Properties of Python Sets",
      bullets([
      "<strong>Mutable:</strong> The set itself can be modified (add or remove elements).",
      "<strong>Immutable Items:</strong> Elements stored in a set must be immutable (hashable). You cannot store lists or other sets inside a set.",
      "<strong>Unordered:</strong> Elements have no defined order. You cannot access elements by index.",
      "<strong>No Indexing:</strong> Sets do not support indexing or slicing because they are unordered.",
      "<strong>Unique Values:</strong> Sets automatically eliminate duplicate values. Each element appears only once.",
      "<strong>Fast Membership Testing:</strong> Checking if an element exists in a set is very fast (O(1) average time).",
      "<strong>Heterogeneous:</strong> A set can store elements of different immutable data types.",
    ]),
      sub("Example Demonstrating Set Properties"),
      codeBlock("Python", `# Creating a set
my_set = {1, 2, 3, "Python", 3.14, True}

# Mutable - can add and remove
my_set.add(4)
my_set.remove(2)
print(my_set)  # {1, 3, 4, 3.14, 'Python'} (order may vary)

# Unique values - duplicates are automatically removed
duplicate_set = {1, 2, 3, 2, 1, 4, 3}
print(duplicate_set)  # {1, 2, 3, 4}

# No indexing - trying to access by index gives error
# print(my_set[0])  # TypeError: 'set' object is not subscriptable

# Fast membership testing
print(3 in my_set)   # True
print(10 in my_set)  # False

# Immutable items required
# my_set.add([1, 2])  # TypeError: unhashable type: 'list'
my_set.add((1, 2))    # Tuple is immutable, works fine

# Heterogeneous - different data types
mixed_set = {1, "hello", 3.14, (1, 2), True}
print(mixed_set)`),
      sub("Important Points to Remember"),
      bullets([
      "Sets are <strong>unordered</strong>, so the order of elements is not guaranteed.",
      "Elements must be <strong>hashable</strong> (immutable). Lists, dictionaries, and other sets cannot be stored in a set.",
      "Sets are <strong>mutable</strong> - you can add or remove elements.",
      "Sets automatically handle <strong>duplicate elimination</strong>.",
      "Sets provide <strong>mathematical operations</strong> like union, intersection, etc.",
    ])
    ),
  ]);

  topic({
    id: "creating-set",
    title: "Creating Set",
    difficulty: "Beginner",
    summary: "Creating sets, including the empty-set trap with curly braces.",
    icon: "fa-solid fa-square-plus",
    category: "Sets",
  }, () => [
    section("", "Creating Sets in Python",
      p("Sets can be created using curly braces <code>{}</code> or the <code>set()</code> constructor. There is an important distinction between creating an empty set and an empty dictionary."),
      sub("1. Using Curly Braces (Set Literals)"),
      p("Items are placed inside curly braces separated by commas. This method creates a set with elements."),
      codeBlock("Python", `# Populated Set
fruits = {"apple", "banana", "cherry", "apple"}  # Duplicate removed
print(fruits)  # {'apple', 'banana', 'cherry'}

# Set with different data types
mixed_set = {1, "hello", 3.14, True, (1, 2)}
print(mixed_set)  # {1, 3.14, 'hello', (1, 2)} (True is treated as 1)

# Important: Empty braces {} create a dictionary, NOT a set
empty_dict = {}
print(type(empty_dict))  # dict`),
      sub("2. Using the set() Constructor"),
      p("The <code>set()</code> function creates a set from any iterable object. This is the only way to create an empty set."),
      codeBlock("Python", `# Empty Set (using set() constructor)
empty_set = set()
print(empty_set)        # set()
print(type(empty_set))  # set

# From a List
set_from_list = set([1, 2, 3, 2, 1])
print(set_from_list)  # {1, 2, 3}

# From a String (creates set of characters)
set_from_string = set("hello")
print(set_from_string)  # {'h', 'e', 'l', 'o'}

# From a Tuple
set_from_tuple = set((1, 2, 3, 2))
print(set_from_tuple)  # {1, 2, 3}

# From a Range
set_from_range = set(range(5))
print(set_from_range)  # {0, 1, 2, 3, 4}

# From a Dictionary (creates set of keys)
dict_data = {"a": 1, "b": 2, "c": 3}
set_from_dict = set(dict_data)
print(set_from_dict)  # {'a', 'b', 'c'}

# From a Set (creates a copy)
original = {1, 2, 3}
copy_set = set(original)
print(copy_set)  # {1, 2, 3}`),
      sub("3. Set Comprehensions"),
      p("Similar to list comprehensions, sets can be created using set comprehensions."),
      codeBlock("Python", `# Basic set comprehension - squares of numbers
squares = {x**2 for x in range(5)}
print(squares)  # {0, 1, 4, 9, 16}

# Set comprehension with condition - even squares
even_squares = {x**2 for x in range(10) if x % 2 == 0}
print(even_squares)  # {0, 4, 16, 36, 64}

# Set comprehension from another iterable
text = "hello world"
vowels = {char for char in text if char in 'aeiou'}
print(vowels)  # {'e', 'o'}`),
      sub("Important: Empty Set vs Empty Dictionary"),
      table(["Syntax", "Result", "Type"], [
      ["<code>{}</code>", "Creates an empty dictionary", "<code>dict</code>"],
      ["<code>set()</code>", "Creates an empty set", "<code>set</code>"],
      ["<code>{1, 2, 3}</code>", "Creates a set with elements", "<code>set</code>"],
      ["<code>{\"a\": 1, \"b\": 2}</code>", "Creates a dictionary", "<code>dict</code>"],
    ])
    ),
  ]);

  topic({
    id: "accessing-set-items",
    title: "Accessing Set Items",
    difficulty: "Beginner",
    summary: "Why sets have no index, and how to loop over or test for items.",
    icon: "fa-solid fa-arrow-pointer",
    category: "Sets",
  }, () => [
    section("", "",
      p("Since sets are unordered, they do not support indexing or slicing. However, there are several ways to access, iterate through, and work with set elements."),
      sub("1. Iteration (Looping)"),
      p("You can iterate through all elements of a set using a <code>for</code> loop. The order is not guaranteed."),
      codeBlock("Python", `# Basic iteration
fruits = {"apple", "banana", "cherry", "date"}

print("Iterating through set:")
for fruit in fruits:
    print(fruit)
# Output (order may vary):
# apple
# banana
# cherry
# date

# Iteration with enumerated values
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
# Output (order may vary):
# 0: apple
# 1: banana
# 2: cherry
# 3: date`),
      sub("2. Membership Testing"),
      p("Checking if an element exists in a set is very fast and the most common way to \"access\" set data."),
      codeBlock("Python", `# Membership testing
numbers = {10, 20, 30, 40, 50}

print(30 in numbers)   # True
print(25 in numbers)   # False
print(50 not in numbers) # False
print(100 not in numbers) # True

# Using membership in condition
if 30 in numbers:
    print("30 is present in the set")

# Membership testing with strings
colors = {"red", "green", "blue"}
print("red" in colors)   # True
print("yellow" in colors) # False`),
      sub("3. Converting to List (for Indexing Access)"),
      p("If you need ordered access, convert the set to a list or tuple."),
      codeBlock("Python", `# Convert to list for ordered access
my_set = {"a", "b", "c", "d"}
list_from_set = list(my_set)
tuple_from_set = tuple(my_set)

print(list_from_set)   # ['a', 'b', 'c', 'd'] (order may vary)
print(tuple_from_set)  # ('a', 'b', 'c', 'd') (order may vary)

# Now you can use indexing
print(list_from_set[0])  # First element
print(list_from_set[-1]) # Last element

# Sorting the set for consistent order
sorted_list = sorted(my_set)
print(sorted_list)       # ['a', 'b', 'c', 'd'] (sorted order)`),
      sub("4. Using pop() to Retrieve and Remove"),
      p("The <code>pop()</code> method removes and returns an arbitrary element from the set."),
      codeBlock("Python", `# Using pop() - removes arbitrary element
my_set = {1, 2, 3, 4, 5}
element = my_set.pop()
print(f"Removed: {element}")
print(f"Remaining: {my_set}")

# Continue popping until set is empty
my_set = {1, 2, 3, 4, 5}
while my_set:
    print(my_set.pop())
# Output: 1, 2, 3, 4, 5 (order may vary)`),
      sub("5. Using List Comprehensions with Sets"),
      p("You can transform set elements using comprehensions."),
      codeBlock("Python", `# Set comprehension for transformation
numbers = {1, 2, 3, 4, 5}
squared = {x**2 for x in numbers}
print(squared)  # {16, 1, 4, 25, 9} (order may vary)

# Filtering with comprehension
numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
evens = {x for x in numbers if x % 2 == 0}
print(evens)  # {2, 4, 6, 8, 10}`),
      sub("Summary of Access Methods"),
      bullets([
      "<strong>Iteration:</strong> Use <code>for item in set:</code>",
      "<strong>Membership Testing:</strong> Use <code>item in set</code>",
      "<strong>Convert to List:</strong> Use <code>list(set)</code> for indexing",
      "<strong>Convert to Tuple:</strong> Use <code>tuple(set)</code> for immutable ordered access",
      "<strong>Sort:</strong> Use <code>sorted(set)</code> for ordered iteration",
      "<strong>pop():</strong> Removes and returns an arbitrary element",
    ])
    ),
  ]);

  topic({
    id: "builtin-methods-set",
    title: "Built-in Methods of Set",
    difficulty: "Intermediate",
    summary: "Set methods for adding, removing and mathematical set operations.",
    icon: "fa-solid fa-screwdriver-wrench",
    category: "Sets",
  }, () => [
    section("", "",
      p("Sets come with several built-in methods for adding, removing, and performing mathematical set operations. Here are the most important methods:"),
      sub("1. Adding Elements"),
      bullets([
      "<strong>add(x):</strong> Adds element x to the set. If x already exists, nothing happens.",
      "<strong>update(iterable):</strong> Adds all elements from an iterable to the set.",
    ]),
      codeBlock("Python", `# add() - adds a single element
my_set = {1, 2, 3}
my_set.add(4)
print(my_set)  # {1, 2, 3, 4}

my_set.add(2)  # Duplicate - no change
print(my_set)  # {1, 2, 3, 4}

# update() - adds multiple elements from an iterable
my_set.update([5, 6, 7])
print(my_set)  # {1, 2, 3, 4, 5, 6, 7}

# update() with string (adds each character)
my_set.update("abc")
print(my_set)  # {1, 2, 3, 4, 5, 6, 7, 'a', 'b', 'c'}

# update() with another set
set2 = {8, 9, 10}
my_set.update(set2)
print(my_set)  # {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'a', 'b', 'c'}`),
      sub("2. Removing Elements"),
      bullets([
      "<strong>remove(x):</strong> Removes element x from the set. Raises KeyError if not found.",
      "<strong>discard(x):</strong> Removes element x from the set. Does nothing if not found (no error).",
      "<strong>pop():</strong> Removes and returns an arbitrary element. Raises KeyError if set is empty.",
      "<strong>clear():</strong> Removes all elements from the set.",
    ]),
      codeBlock("Python", `# remove() - removes element, raises error if not found
fruits = {"apple", "banana", "cherry"}
fruits.remove("banana")
print(fruits)  # {'apple', 'cherry'}

# fruits.remove("mango")  # KeyError: 'mango'

# discard() - removes element, no error if not found
fruits.discard("apple")
print(fruits)  # {'cherry'}

fruits.discard("mango")  # No error
print(fruits)  # {'cherry'}

# pop() - removes and returns arbitrary element
my_set = {1, 2, 3, 4, 5}
element = my_set.pop()
print(f"Removed: {element}")  # Removed: 1 (may vary)
print(f"Remaining: {my_set}")

# clear() - removes all elements
my_set.clear()
print(my_set)  # set()`),
      sub("3. Set Operations"),
      bullets([
      "<strong>union(set2):</strong> Returns a new set with elements from both sets (| operator).",
      "<strong>intersection(set2):</strong> Returns a new set with elements common to both sets (&amp; operator).",
      "<strong>difference(set2):</strong> Returns a new set with elements in first set but not in second (- operator).",
      "<strong>symmetric_difference(set2):</strong> Returns a new set with elements in either set but not both (^ operator).",
    ]),
      codeBlock("Python", `# Define two sets
set_a = {1, 2, 3, 4, 5}
set_b = {4, 5, 6, 7, 8}

# Union - all elements from both sets
print(set_a.union(set_b))  # {1, 2, 3, 4, 5, 6, 7, 8}
print(set_a | set_b)       # {1, 2, 3, 4, 5, 6, 7, 8}

# Intersection - common elements
print(set_a.intersection(set_b))  # {4, 5}
print(set_a & set_b)              # {4, 5}

# Difference - elements in set_a but not in set_b
print(set_a.difference(set_b))  # {1, 2, 3}
print(set_a - set_b)            # {1, 2, 3}

# Symmetric Difference - elements in either set but not both
print(set_a.symmetric_difference(set_b))  # {1, 2, 3, 6, 7, 8}
print(set_a ^ set_b)                      # {1, 2, 3, 6, 7, 8}

# Methods with multiple sets
set_c = {1, 2, 9, 10}
print(set_a.union(set_b, set_c))  # {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}`),
      sub("4. Relationship Methods"),
      bullets([
      "<strong>issubset(set2):</strong> Checks if all elements of first set are in second set (&lt;= operator).",
      "<strong>issuperset(set2):</strong> Checks if all elements of second set are in first set (&gt;= operator).",
      "<strong>isdisjoint(set2):</strong> Checks if two sets have no common elements.",
      "<strong>isinstance(obj, type):</strong> Checks if an object is of a specific type (built-in function).",
    ]),
      codeBlock("Python", `# issubset() - checks if set is subset of another
set_a = {1, 2, 3}
set_b = {1, 2, 3, 4, 5}
set_c = {1, 2, 6}

print(set_a.issubset(set_b))  # True
print(set_a <= set_b)         # True
print(set_c.issubset(set_b))  # False

# issuperset() - checks if set is superset of another
print(set_b.issuperset(set_a))  # True
print(set_b >= set_a)           # True

# isdisjoint() - checks if sets have no common elements
set_a = {1, 2, 3}
set_b = {4, 5, 6}
set_c = {3, 4, 5}

print(set_a.isdisjoint(set_b))  # True
print(set_a.isdisjoint(set_c))  # False

# isinstance() - checks object type (built-in function)
my_set = {1, 2, 3}
print(isinstance(my_set, set))   # True
print(isinstance(my_set, dict))  # False
print(isinstance([1, 2], list))  # True`),
      sub("Summary Table of Set Methods"),
      table(["Method", "Description", "Example"], [
      ["<code>add(x)</code>", "Adds element x", "<code>set.add(5)</code>"],
      ["<code>update(iterable)</code>", "Adds all elements from iterable", "<code>set.update([1,2])</code>"],
      ["<code>remove(x)</code>", "Removes x (error if not found)", "<code>set.remove(5)</code>"],
      ["<code>discard(x)</code>", "Removes x (no error if not found)", "<code>set.discard(5)</code>"],
      ["<code>pop()</code>", "Removes and returns arbitrary element", "<code>set.pop()</code>"],
      ["<code>clear()</code>", "Removes all elements", "<code>set.clear()</code>"],
      ["<code>union(set2)</code>", "Returns union of sets", "<code>set.union(set2)</code>"],
      ["<code>intersection(set2)</code>", "Returns intersection of sets", "<code>set.intersection(set2)</code>"],
      ["<code>difference(set2)</code>", "Returns difference of sets", "<code>set.difference(set2)</code>"],
      ["<code>symmetric_difference(set2)</code>", "Returns symmetric difference", "<code>set.symmetric_difference(set2)</code>"],
      ["<code>issubset(set2)</code>", "Checks if set is subset", "<code>set.issubset(set2)</code>"],
      ["<code>issuperset(set2)</code>", "Checks if set is superset", "<code>set.issuperset(set2)</code>"],
      ["<code>isdisjoint(set2)</code>", "Checks if sets are disjoint", "<code>set.isdisjoint(set2)</code>"],
    ])
    ),
  ]);

  topic({
    id: "builtin-functions-set",
    title: "Built-in Functions of Set",
    difficulty: "Intermediate",
    summary: "Built-in functions that work on sets.",
    icon: "fa-solid fa-toolbox",
    category: "Sets",
  }, () => [
    section("", "Built-in Functions Used with Sets",
      p("Sets can be used with various built-in functions for information, transformation, and validation."),
      sub("1. Information Functions"),
      bullets([
      "<strong>len(set):</strong> Returns the number of elements in the set.",
      "<strong>min(set):</strong> Returns the smallest element in the set.",
      "<strong>max(set):</strong> Returns the largest element in the set.",
      "<strong>sum(set):</strong> Returns the sum of all numerical elements in the set.",
      "<strong>type(object):</strong> Returns the type of the object.",
    ]),
      codeBlock("Python", `# len() - number of elements
my_set = {10, 20, 30, 40, 50}
print(len(my_set))  # 5

# min() - smallest element
print(min(my_set))  # 10

# max() - largest element
print(max(my_set))  # 50

# sum() - sum of all elements
print(sum(my_set))  # 150

# type() - type of object
print(type(my_set))  # set`),
      sub("2. Sorting and Ordering"),
      bullets([
      "<strong>sorted(iterable, reverse=False):</strong> Returns a new sorted list from the set.",
      "<strong>reversed(iterable):</strong> Returns a reverse iterator (works on sorted set).",
    ]),
      codeBlock("Python", `# sorted() - returns sorted list
my_set = {30, 10, 50, 20, 40}
sorted_set = sorted(my_set)
print(sorted_set)  # [10, 20, 30, 40, 50]
print(my_set)      # {10, 20, 30, 40, 50} (original unchanged)

# sorted() with reverse
sorted_desc = sorted(my_set, reverse=True)
print(sorted_desc)  # [50, 40, 30, 20, 10]

# reversed() - works on sorted set
for item in reversed(sorted(my_set)):
    print(item)  # 50, 40, 30, 20, 10`),
      sub("3. Conversion Functions"),
      bullets([
      "<strong>list(iterable):</strong> Converts set to a list.",
      "<strong>tuple(iterable):</strong> Converts set to a tuple.",
      "<strong>set(iterable):</strong> Converts iterable to a set.",
      "<strong>frozenset(iterable):</strong> Converts iterable to an immutable set.",
    ]),
      codeBlock("Python", `# list() - convert to list
my_set = {1, 2, 3, 4, 5}
list_from_set = list(my_set)
print(list_from_set)  # [1, 2, 3, 4, 5] (order may vary)

# tuple() - convert to tuple
tuple_from_set = tuple(my_set)
print(tuple_from_set)  # (1, 2, 3, 4, 5) (order may vary)

# set() - create set from iterable
list_data = [1, 2, 2, 3, 3, 4]
set_from_list = set(list_data)
print(set_from_list)  # {1, 2, 3, 4}

# frozenset() - create immutable set
frozen_set = frozenset(my_set)
print(frozen_set)  # frozenset({1, 2, 3, 4, 5})

# frozenset properties - immutable
# frozen_set.add(6)  # AttributeError: 'frozenset' object has no attribute 'add'`),
      sub("4. Iteration and Validation"),
      bullets([
      "<strong>any(iterable):</strong> Returns True if at least one element is truthy.",
      "<strong>all(iterable):</strong> Returns True if all elements are truthy.",
      "<strong>enumerate(iterable):</strong> Returns index-value pairs (order not guaranteed).",
    ]),
      codeBlock("Python", `# any() - checks if any element is truthy
set1 = {0, False, "hello", ""}
print(any(set1))  # True (because of "hello")

set2 = {0, False, "", None}
print(any(set2))  # False (all are falsy)

# all() - checks if all elements are truthy
set3 = {True, 1, "yes"}
print(all(set3))  # True

set4 = {True, 1, 0}
print(all(set4))  # False (0 is falsy)

# enumerate() - pairs index with value (order may vary)
colors = {"red", "green", "blue"}
for index, color in enumerate(colors):
    print(f"{index}: {color}")
# Output (order may vary):
# 0: red
# 1: green
# 2: blue

# zip() - combine multiple sets
set_a = {1, 2, 3}
set_b = {"a", "b", "c"}
zipped = zip(set_a, set_b)
print(list(zipped))  # [(1, 'a'), (2, 'b'), (3, 'c')] (order may vary)`),
      sub("Summary Table of Built-in Functions for Sets"),
      table(["Function", "Description", "Example"], [
      ["<code>len(set)</code>", "Returns number of elements", "<code>len({1,2,3}) → 3</code>"],
      ["<code>min(set)</code>", "Returns smallest element", "<code>min({3,1,2}) → 1</code>"],
      ["<code>max(set)</code>", "Returns largest element", "<code>max({3,1,2}) → 3</code>"],
      ["<code>sum(set)</code>", "Sums numerical elements", "<code>sum({1,2,3}) → 6</code>"],
      ["<code>sorted(set)</code>", "Returns sorted list", "<code>sorted({3,1,2}) → [1,2,3]</code>"],
      ["<code>list(set)</code>", "Converts to list", "<code>list({1,2,3}) → [1,2,3]</code>"],
      ["<code>tuple(set)</code>", "Converts to tuple", "<code>tuple({1,2,3}) → (1,2,3)</code>"],
      ["<code>frozenset(set)</code>", "Converts to immutable set", "<code>frozenset({1,2,3})</code>"],
      ["<code>any(set)</code>", "True if any element is truthy", "<code>any({0,1}) → True</code>"],
      ["<code>all(set)</code>", "True if all elements are truthy", "<code>all({1,2}) → True</code>"],
      ["<code>enumerate(set)</code>", "Returns index-value pairs", "<code>list(enumerate({'a','b'}))</code>"],
      ["<code>zip(set1, set2)</code>", "Combines sets element-wise", "<code>zip({1,2},{'a','b'})</code>"],
      ["<code>type(object)</code>", "Returns type of object", "<code>type({1,2}) → set</code>"],
    ])
    ),
  ]);

  topic({
    id: "dict-intro",
    title: "Dictionary and its Properties",
    difficulty: "Beginner",
    summary: "What a dictionary is: data stored as key-value pairs.",
    icon: "fa-solid fa-book",
    category: "Dictionaries",
  }, () => [
    section("", "What is a Dictionary?",
      p("A <strong>dictionary</strong> is a built-in data structure used to store data in <strong>key-value pairs</strong>. Each key is unique and maps to a value. Dictionaries are one of the most powerful and commonly used data structures in Python.")
    ),
    section("", "Core Properties of Python Dictionaries",
      bullets([
      "<strong>Key-Value Pairs:</strong> Each element is a pair consisting of a key and its associated value.",
      "<strong>Ordered (Python 3.7+):</strong> Dictionaries maintain the insertion order of keys (guaranteed in Python 3.7 and later).",
      "<strong>Mutable:</strong> Dictionaries can be modified - you can add, remove, or update key-value pairs.",
      "<strong>Unique Keys:</strong> Each key can appear only once. Duplicate keys overwrite previous values.",
      "<strong>Hashable Keys:</strong> Keys must be immutable (hashable). Strings, numbers, and tuples can be keys.",
      "<strong>Heterogeneous Values:</strong> Values can be of any data type, including lists, sets, and other dictionaries.",
      "<strong>Indexed by Keys:</strong> Access values using keys, not numeric indices.",
      "<strong>Fast Lookup:</strong> Accessing values by key is very fast (O(1) average time).",
    ]),
      sub("Example Demonstrating Dictionary Properties"),
      codeBlock("Python", `# Creating a dictionary
student = {
    "name": "Rahul",
    "age": 20,
    "course": "Python",
    "grades": [85, 92, 78]
}

# Key-Value Pairs
print(student["name"])   # Rahul
print(student["age"])    # 20

# Ordered - maintains insertion order (Python 3.7+)
print(student.keys())  # dict_keys(['name', 'age', 'course', 'grades'])

# Mutable - can modify
student["age"] = 21
student["city"] = "Mumbai"  # Add new key
del student["course"]       # Remove key
print(student)

# Unique Keys - duplicate overwrites
student["name"] = "Ravi"  # Updates existing key
print(student["name"])    # Ravi

# Hashable Keys - keys must be immutable
# student[[1, 2]] = "value"  # TypeError: unhashable type: 'list'
student[(1, 2)] = "tuple key"  # Tuple is hashable, works

# Heterogeneous Values
mixed_dict = {
    "string": "hello",
    "number": 42,
    "float": 3.14,
    "boolean": True,
    "list": [1, 2, 3],
    "tuple": (1, 2, 3),
    "dict": {"nested": "value"}
}
print(mixed_dict)

# Fast Lookup
print("name" in student)  # True (O(1) lookup)`),
      sub("Important Points to Remember"),
      bullets([
      "Keys must be <strong>immutable</strong> (strings, numbers, tuples). Lists and dictionaries cannot be keys.",
      "Values can be <strong>any data type</strong> (mutable or immutable).",
      "Dictionaries are <strong>ordered</strong> in Python 3.7+ (maintain insertion order).",
      "Accessing a non-existent key raises a <strong>KeyError</strong>.",
      "Use <code>get()</code> method to safely access values with a default.",
    ])
    ),
  ]);

  topic({
    id: "creating-dictionary",
    title: "Creating Dictionary",
    difficulty: "Beginner",
    summary: "The different ways of creating a dictionary.",
    icon: "fa-solid fa-square-plus",
    category: "Dictionaries",
  }, () => [
    section("", "Creating Dictionaries in Python",
      p("Dictionaries can be created using curly braces <code>{}</code> with key-value pairs, or using the <code>dict()</code> constructor in various ways."),
      sub("1. Using Curly Braces (Dictionary Literals)"),
      p("This is the most common and readable way to create dictionaries. Keys and values are separated by colons <code>:</code> and pairs are separated by commas."),
      codeBlock("Python", `# Empty Dictionary
empty_dict = {}
print(empty_dict)  # {}
print(type(empty_dict))  # dict

# Populated Dictionary
student = {
    "name": "Rahul",
    "age": 20,
    "course": "Python"
}
print(student)  # {'name': 'Rahul', 'age': 20, 'course': 'Python'}

# Dictionary with mixed data types
mixed = {
    "name": "Alice",
    "age": 25,
    "is_student": True,
    "grades": [85, 92, 78],
    "address": {"city": "Mumbai", "pincode": 400001}
}
print(mixed)

# Dictionary with numeric keys
numeric_keys = {
    1: "one",
    2: "two",
    3: "three"
}
print(numeric_keys)  # {1: 'one', 2: 'two', 3: 'three'}`),
      sub("2. Using the dict() Constructor"),
      p("The <code>dict()</code> constructor provides several ways to create dictionaries."),
      minor("a) From Keyword Arguments"),
      codeBlock("Python", `# Using keyword arguments
student = dict(name="Rahul", age=20, course="Python")
print(student)  # {'name': 'Rahul', 'age': 20, 'course': 'Python'}

# Note: Keys must be valid Python identifiers (no spaces, etc.)`),
      minor("b) From a List of Tuples (Key-Value Pairs)"),
      codeBlock("Python", `# From list of tuples
pairs = [("name", "Rahul"), ("age", 20), ("course", "Python")]
student = dict(pairs)
print(student)  # {'name': 'Rahul', 'age': 20, 'course': 'Python'}

# From tuple of tuples
pairs = (("name", "Rahul"), ("age", 20))
student = dict(pairs)
print(student)  # {'name': 'Rahul', 'age': 20}`),
      minor("c) Using zip() with Two Sequences"),
      codeBlock("Python", `# Using zip() to combine two sequences
keys = ["name", "age", "course"]
values = ["Rahul", 20, "Python"]
student = dict(zip(keys, values))
print(student)  # {'name': 'Rahul', 'age': 20, 'course': 'Python'}`),
      minor("d) Empty Dictionary with dict()"),
      codeBlock("Python", `# Empty dictionary using dict()
empty_dict = dict()
print(empty_dict)  # {}`),
      sub("3. Using Dictionary Comprehensions"),
      p("Similar to list comprehensions, dictionaries can be created using dictionary comprehensions."),
      codeBlock("Python", `# Basic dictionary comprehension - squares
squares = {x: x**2 for x in range(5)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Dictionary comprehension with condition
even_squares = {x: x**2 for x in range(10) if x % 2 == 0}
print(even_squares)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

# Swapping keys and values
original = {"a": 1, "b": 2, "c": 3}
swapped = {value: key for key, value in original.items()}
print(swapped)  # {1: 'a', 2: 'b', 3: 'c'}`),
      sub("4. Using fromkeys() Method"),
      p("The <code>fromkeys()</code> method creates a new dictionary with specified keys and a default value."),
      codeBlock("Python", `# fromkeys() - creates dictionary with default value
keys = ["name", "age", "course"]
student = dict.fromkeys(keys, "Unknown")
print(student)  # {'name': 'Unknown', 'age': 'Unknown', 'course': 'Unknown'}

# Without default value (defaults to None)
student = dict.fromkeys(keys)
print(student)  # {'name': None, 'age': None, 'course': None}`),
      sub("Summary of Dictionary Creation Methods"),
      table(["Method", "Syntax", "Example"], [
      ["Curly Braces", "<code>{key: value}</code>", "<code>{\"a\": 1, \"b\": 2}</code>"],
      ["Keyword Arguments", "<code>dict(key=value)</code>", "<code>dict(a=1, b=2)</code>"],
      ["List of Tuples", "<code>dict([(k,v)])</code>", "<code>dict([(\"a\",1),(\"b\",2)])</code>"],
      ["zip()", "<code>dict(zip(keys, values))</code>", "<code>dict(zip([\"a\",\"b\"], [1,2]))</code>"],
      ["Comprehension", "<code>{k: v for k, v in iterable}</code>", "<code>{x: x**2 for x in range(5)}</code>"],
      ["fromkeys()", "<code>dict.fromkeys(keys, value)</code>", "<code>dict.fromkeys([\"a\",\"b\"], 0)</code>"],
      ["Empty", "<code>{}</code> or <code>dict()</code>", "<code>{}</code> or <code>dict()</code>"],
    ])
    ),
  ]);

  topic({
    id: "accessing-dict-items",
    title: "Accessing Dictionary Items",
    difficulty: "Beginner",
    summary: "Reading, looping over and working with keys, values and items.",
    icon: "fa-solid fa-key",
    category: "Dictionaries",
  }, () => [
    section("", "",
      p("Dictionaries provide several ways to access, iterate through, and work with key-value pairs."),
      sub("1. Accessing Values by Key (Direct Indexing)"),
      p("Use square brackets <code>[]</code> with the key to get its value. Raises KeyError if key doesn't exist."),
      codeBlock("Python", `# Direct indexing
student = {
    "name": "Rahul",
    "age": 20,
    "course": "Python",
    "grades": [85, 92, 78]
}

print(student["name"])     # Rahul
print(student["age"])      # 20
print(student["grades"])   # [85, 92, 78]
print(student["grades"][1]) # 92 (nested access)

# KeyError - accessing non-existent key
# print(student["city"])  # KeyError: 'city'`),
      sub("2. Using get() Method (Safe Access)"),
      p("The <code>get()</code> method returns the value for a key, or a default value if the key doesn't exist. No KeyError is raised."),
      codeBlock("Python", `# get() - returns value or None if key not found
student = {"name": "Rahul", "age": 20}

print(student.get("name"))     # Rahul
print(student.get("course"))   # None
print(student.get("city"))     # None

# get() with default value
print(student.get("course", "Not enrolled"))  # Not enrolled
print(student.get("city", "Mumbai"))          # Mumbai

# get() with default when key exists
print(student.get("name", "Unknown"))  # Rahul (ignores default)`),
      sub("3. Using setdefault() Method"),
      p("The <code>setdefault()</code> method returns the value for a key. If the key doesn't exist, it adds the key with a default value."),
      codeBlock("Python", `# setdefault() - returns value, adds default if key doesn't exist
student = {"name": "Rahul", "age": 20}

# Key exists - returns value
print(student.setdefault("name", "Unknown"))  # Rahul

# Key doesn't exist - adds with default value
print(student.setdefault("course", "Python"))  # Python
print(student)  # {'name': 'Rahul', 'age': 20, 'course': 'Python'}

# Key doesn't exist - adds with None (no default specified)
print(student.setdefault("city"))  # None
print(student)  # {'name': 'Rahul', 'age': 20, 'course': 'Python', 'city': None}`),
      sub("4. Iterating Through Keys, Values, and Items"),
      p("Dictionaries can be iterated to access keys, values, or both."),
      codeBlock("Python", `student = {
    "name": "Rahul",
    "age": 20,
    "course": "Python",
    "city": "Mumbai"
}

# Iterating through keys (default)
print("Keys:")
for key in student:
    print(key)
# name, age, course, city

# Iterating through keys (using keys() method)
print("\\nKeys using keys():")
for key in student.keys():
    print(f"{key}: {student[key]}")

# Iterating through values
print("\\nValues:")
for value in student.values():
    print(value)
# Rahul, 20, Python, Mumbai

# Iterating through key-value pairs
print("\\nKey-Value Pairs:")
for key, value in student.items():
    print(f"{key}: {value}")
# name: Rahul, age: 20, course: Python, city: Mumbai`),
      sub("5. Checking if a Key Exists"),
      p("Use the <code>in</code> operator to check if a key exists in a dictionary."),
      codeBlock("Python", `# Using 'in' operator
student = {"name": "Rahul", "age": 20, "course": "Python"}

print("name" in student)      # True
print("city" in student)      # False
print("age" not in student)   # False

# Conditional access
if "course" in student:
    print(f"Course: {student['course']}")
else:
    print("Course not found")

# Using get() for conditional access
course = student.get("course", "Not enrolled")
print(course)  # Python`),
      sub("6. Accessing Nested Dictionary Values"),
      p("Dictionaries can contain other dictionaries, requiring chained indexing."),
      codeBlock("Python", `# Nested dictionary
student = {
    "name": "Rahul",
    "age": 20,
    "address": {
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": 400001
    },
    "grades": [85, 92, 78]
}

# Accessing nested values
print(student["address"]["city"])      # Mumbai
print(student["address"]["state"])     # Maharashtra
print(student["grades"][1])            # 92

# Safe nested access using get()
city = student.get("address", {}).get("city")
print(city)  # Mumbai

# Using try-except for nested access
try:
    print(student["address"]["country"])
except KeyError:
    print("Country not found")`),
      sub("Summary of Access Methods"),
      table(["Method", "Description", "Example"], [
      ["<code>dict[key]</code>", "Direct access (raises KeyError)", "<code>student[\"name\"]</code>"],
      ["<code>dict.get(key, default)</code>", "Safe access with default value", "<code>student.get(\"name\", \"Unknown\")</code>"],
      ["<code>dict.setdefault(key, default)</code>", "Returns value, adds key if missing", "<code>student.setdefault(\"course\", \"Python\")</code>"],
      ["<code>key in dict</code>", "Checks if key exists", "<code>\"name\" in student</code>"],
      ["<code>dict.keys()</code>", "Returns all keys", "<code>student.keys()</code>"],
      ["<code>dict.values()</code>", "Returns all values", "<code>student.values()</code>"],
      ["<code>dict.items()</code>", "Returns key-value pairs", "<code>student.items()</code>"],
    ])
    ),
  ]);

  topic({
    id: "builtin-methods-dict",
    title: "Built-in Methods of Dictionary",
    difficulty: "Intermediate",
    summary: "Dictionary methods for adding, removing and updating key-value pairs.",
    icon: "fa-solid fa-screwdriver-wrench",
    category: "Dictionaries",
  }, () => [
    section("", "",
      p("Dictionaries come with several built-in methods for adding, removing, and manipulating key-value pairs."),
      sub("1. Adding and Updating"),
      bullets([
      "<strong>update(iterable):</strong> Updates the dictionary with key-value pairs from another dictionary or iterable.",
      "<strong>setdefault(key, default):</strong> Returns value for key, adds key with default if missing.",
    ]),
      codeBlock("Python", `# update() - merges another dictionary
student = {"name": "Rahul", "age": 20}
new_data = {"course": "Python", "city": "Mumbai"}

student.update(new_data)
print(student)  # {'name': 'Rahul', 'age': 20, 'course': 'Python', 'city': 'Mumbai'}

# update() with keyword arguments
student.update(grade="A", semester=1)
print(student)  # ... 'grade': 'A', 'semester': 1

# update() with list of tuples
student.update([("phone", "1234567890")])
print(student)  # ... 'phone': '1234567890'

# setdefault() - adds key if missing
student = {"name": "Rahul"}
student.setdefault("age", 20)     # Adds age: 20
student.setdefault("age", 25)     # Returns 20 (existing value unchanged)
print(student)  # {'name': 'Rahul', 'age': 20}`),
      sub("2. Removing Elements"),
      bullets([
      "<strong>pop(key, default):</strong> Removes and returns the value for the key. Raises KeyError if not found (unless default provided).",
      "<strong>popitem():</strong> Removes and returns the last inserted key-value pair (LIFO order in Python 3.7+).",
      "<strong>clear():</strong> Removes all key-value pairs from the dictionary.",
    ]),
      codeBlock("Python", `# pop() - removes and returns value
student = {"name": "Rahul", "age": 20, "course": "Python"}

age = student.pop("age")
print(age)       # 20
print(student)   # {'name': 'Rahul', 'course': 'Python'}

# pop() with default (no error if key not found)
city = student.pop("city", "Mumbai")
print(city)      # Mumbai (default value)
print(student)   # {'name': 'Rahul', 'course': 'Python'}

# popitem() - removes and returns last key-value pair
student = {"name": "Rahul", "age": 20, "course": "Python"}
last_pair = student.popitem()
print(last_pair)  # ('course', 'Python')
print(student)    # {'name': 'Rahul', 'age': 20}

# clear() - removes all items
student.clear()
print(student)  # {}`),
      sub("3. Copying"),
      bullets([
      "<strong>copy():</strong> Returns a shallow copy of the dictionary.",
    ]),
      codeBlock("Python", `# copy() - creates shallow copy
original = {"name": "Rahul", "age": 20, "address": {"city": "Mumbai"}}
copied = original.copy()

copied["name"] = "Ravi"  # Modifies copy only
copied["address"]["city"] = "Delhi"  # Modifies both (shallow copy)

print(original)  # {'name': 'Rahul', 'age': 20, 'address': {'city': 'Delhi'}}
print(copied)    # {'name': 'Ravi', 'age': 20, 'address': {'city': 'Delhi'}}

# Deep copy (using copy module)
import copy
deep_copied = copy.deepcopy(original)
deep_copied["address"]["city"] = "Mumbai"
print(original)      # {'name': 'Rahul', 'age': 20, 'address': {'city': 'Delhi'}}
print(deep_copied)   # {'name': 'Rahul', 'age': 20, 'address': {'city': 'Mumbai'}}`),
      sub("4. Getting Keys, Values, and Items"),
      bullets([
      "<strong>keys():</strong> Returns a view object of all keys.",
      "<strong>values():</strong> Returns a view object of all values.",
      "<strong>items():</strong> Returns a view object of all key-value pairs.",
    ]),
      codeBlock("Python", `student = {"name": "Rahul", "age": 20, "course": "Python"}

# keys() - get all keys
keys = student.keys()
print(keys)  # dict_keys(['name', 'age', 'course'])
print(list(keys))  # ['name', 'age', 'course']

# values() - get all values
values = student.values()
print(values)  # dict_values(['Rahul', 20, 'Python'])

# items() - get all key-value pairs
items = student.items()
print(items)  # dict_items([('name', 'Rahul'), ('age', 20), ('course', 'Python')])

# Converting to lists
print(list(student.keys()))    # ['name', 'age', 'course']
print(list(student.values()))  # ['Rahul', 20, 'Python']
print(list(student.items()))   # [('name', 'Rahul'), ('age', 20), ('course', 'Python')]`),
      sub("5. Getting Values with Default"),
      bullets([
      "<strong>get(key, default):</strong> Returns value for key, or default if key doesn't exist.",
      "<strong>setdefault(key, default):</strong> Returns value for key, sets default if key doesn't exist.",
    ]),
      codeBlock("Python", `# get() vs setdefault() comparison
student = {"name": "Rahul", "age": 20}

# get() - doesn't modify dictionary
course = student.get("course", "Python")
print(course)  # Python
print(student) # {'name': 'Rahul', 'age': 20} (unchanged)

# setdefault() - modifies dictionary if key missing
course = student.setdefault("course", "Python")
print(course)  # Python
print(student) # {'name': 'Rahul', 'age': 20, 'course': 'Python'} (updated)`),
      sub("Summary Table of Dictionary Methods"),
      table(["Method", "Description", "Example"], [
      ["<code>clear()</code>", "Removes all items", "<code>dict.clear()</code>"],
      ["<code>copy()</code>", "Returns a shallow copy", "<code>dict.copy()</code>"],
      ["<code>fromkeys(seq, value)</code>", "Creates dict from keys", "<code>dict.fromkeys(['a','b'], 0)</code>"],
      ["<code>get(key, default)</code>", "Returns value or default", "<code>dict.get('key', 'default')</code>"],
      ["<code>items()</code>", "Returns key-value pairs", "<code>dict.items()</code>"],
      ["<code>keys()</code>", "Returns all keys", "<code>dict.keys()</code>"],
      ["<code>values()</code>", "Returns all values", "<code>dict.values()</code>"],
      ["<code>pop(key, default)</code>", "Removes and returns value", "<code>dict.pop('key', 'default')</code>"],
      ["<code>popitem()</code>", "Removes and returns last pair", "<code>dict.popitem()</code>"],
      ["<code>setdefault(key, default)</code>", "Returns value, sets if missing", "<code>dict.setdefault('key', 0)</code>"],
      ["<code>update(iterable)</code>", "Updates with key-value pairs", "<code>dict.update({'a':1})</code>"],
    ])
    ),
  ]);

  topic({
    id: "builtin-functions-dict",
    title: "Built-in Functions of Dictionary",
    difficulty: "Intermediate",
    summary: "Built-in functions that work on dictionaries.",
    icon: "fa-solid fa-toolbox",
    category: "Dictionaries",
  }, () => [
    section("", "Built-in Functions Used with Dictionaries",
      p("Dictionaries can be used with various built-in functions. Most functions operate on the <strong>keys</strong> of the dictionary, not the values."),
      sub("1. Information Functions"),
      bullets([
      "<strong>len(dict):</strong> Returns the number of key-value pairs.",
      "<strong>type(object):</strong> Returns the type of the object.",
      "<strong>id(object):</strong> Returns the unique identifier (memory address) of the object.",
    ]),
      codeBlock("Python", `# len() - number of key-value pairs
student = {"name": "Rahul", "age": 20, "course": "Python"}
print(len(student))  # 3

# type() - type of object
print(type(student))  # dict

# id() - unique identifier
print(id(student))  # some number (memory address)`),
      sub("2. Sorting and Ordering (Operates on Keys)"),
      bullets([
      "<strong>sorted(iterable, reverse=False):</strong> Returns a sorted list of keys.",
      "<strong>min(iterable):</strong> Returns the smallest key (lexicographically).",
      "<strong>max(iterable):</strong> Returns the largest key (lexicographically).",
      "<strong>reversed(iterable):</strong> Returns reverse iterator on keys.",
    ]),
      codeBlock("Python", `# sorted() - returns sorted list of keys
student = {"name": "Rahul", "age": 20, "course": "Python", "city": "Mumbai"}
sorted_keys = sorted(student)
print(sorted_keys)  # ['age', 'city', 'course', 'name']

# sorted() with reverse
sorted_desc = sorted(student, reverse=True)
print(sorted_desc)  # ['name', 'course', 'city', 'age']

# min() - smallest key
print(min(student))  # age (lexicographically smallest)

# max() - largest key
print(max(student))  # name (lexicographically largest)

# Sorting by values
sorted_by_values = sorted(student, key=student.get)
print(sorted_by_values)  # Sorted by values`),
      sub("3. Iteration and Validation"),
      bullets([
      "<strong>any(iterable):</strong> Returns True if any key is truthy.",
      "<strong>all(iterable):</strong> Returns True if all keys are truthy.",
      "<strong>enumerate(iterable):</strong> Returns index-key pairs.",
    ]),
      codeBlock("Python", `# any() - checks if any key is truthy
dict1 = {"": "empty", "name": "Rahul"}
print(any(dict1))  # True (because 'name' is truthy)

dict2 = {"": "empty", "0": "zero"}
print(any(dict2))  # True (both keys are truthy strings)

# any() with empty dictionary
empty = {}
print(any(empty))  # False

# all() - checks if all keys are truthy
dict3 = {"name": "Rahul", "age": 20}
print(all(dict3))  # True (both keys are truthy)

dict4 = {"": "empty", "name": "Rahul"}
print(all(dict4))  # False ('' is falsy)

# enumerate() - pairs index with key
for index, key in enumerate(student):
    print(f"{index}: {key}")
# 0: name
# 1: age
# 2: course
# 3: city`),
      sub("4. Combining Dictionaries (zip)"),
      bullets([
      "<strong>zip(*iterables):</strong> Combines multiple dictionaries or iterables.",
    ]),
      codeBlock("Python", `# Combining two dictionaries' keys
dict_a = {"a": 1, "b": 2, "c": 3}
dict_b = {"x": 10, "y": 20, "z": 30}

# zip() on dictionary keys
for key_a, key_b in zip(dict_a, dict_b):
    print(f"{key_a}: {dict_a[key_a]}, {key_b}: {dict_b[key_b]}")
# a: 1, x: 10
# b: 2, y: 20
# c: 3, z: 30

# zip() on values
for val_a, val_b in zip(dict_a.values(), dict_b.values()):
    print(val_a + val_b)  # 11, 22, 33

# Creating dictionary from two lists using zip
keys = ["name", "age", "course"]
values = ["Rahul", 20, "Python"]
new_dict = dict(zip(keys, values))
print(new_dict)  # {'name': 'Rahul', 'age': 20, 'course': 'Python'}`),
      sub("Important Note"),
      p("<strong>Most built-in functions operate on the keys of the dictionary, not the values.</strong> When you call <code>min()</code>, <code>max()</code>, <code>sorted()</code>, etc., on a dictionary, they work with the keys."),
      codeBlock("Python", `# Demonstrating functions work on keys
student = {"name": "Rahul", "age": 20, "course": "Python"}

# min() on dictionary - compares keys
print(min(student))  # age (lexicographically smallest key)

# To compare values, use key parameter
print(min(student, key=student.get))  # age (assuming age has smallest value)

# max() on dictionary - compares keys
print(max(student))  # name (lexicographically largest key)

# To get value with max, use key parameter
print(max(student, key=student.get))  # course (assuming "Python" is largest value)`),
      sub("Summary Table of Built-in Functions for Dictionaries"),
      table(["Function", "Description", "Example"], [
      ["<code>len(dict)</code>", "Returns number of key-value pairs", "<code>len({\"a\":1, \"b\":2}) → 2</code>"],
      ["<code>type(dict)</code>", "Returns type of object", "<code>type({\"a\":1}) → dict</code>"],
      ["<code>id(dict)</code>", "Returns unique identifier", "<code>id({\"a\":1}) → number</code>"],
      ["<code>sorted(dict)</code>", "Returns sorted list of keys", "<code>sorted({\"b\":2, \"a\":1}) → ['a','b']</code>"],
      ["<code>min(dict)</code>", "Returns smallest key", "<code>min({\"b\":2, \"a\":1}) → 'a'</code>"],
      ["<code>max(dict)</code>", "Returns largest key", "<code>max({\"b\":2, \"a\":1}) → 'b'</code>"],
      ["<code>reversed(dict)</code>", "Reverse iterator on keys", "<code>list(reversed({\"a\":1,\"b\":2})) → ['b','a']</code>"],
      ["<code>any(dict)</code>", "True if any key is truthy", "<code>any({\"a\":1}) → True</code>"],
      ["<code>all(dict)</code>", "True if all keys are truthy", "<code>all({\"a\":1, \"\":2}) → False</code>"],
      ["<code>enumerate(dict)</code>", "Returns index-key pairs", "<code>list(enumerate({\"a\":1,\"b\":2})) → [(0,'a'),(1,'b')]</code>"],
      ["<code>zip(dict1, dict2)</code>", "Combines keys from dictionaries", "<code>zip({\"a\":1},{\"b\":2})</code>"],
    ])
    ),
  ]);

  topic({
    id: "set-vs-dict",
    title: "Set vs Dictionary",
    difficulty: "Intermediate",
    summary: "A side-by-side comparison of sets and dictionaries.",
    icon: "fa-solid fa-code-compare",
    category: "Sets & Dictionaries",
  }, () => [
    section("", "Set vs Dictionary: A Detailed Comparison",
      p("Sets and dictionaries are both built-in data structures in Python that use curly braces, but they serve very different purposes. Understanding their differences is crucial for choosing the right data structure."),
      sub("Key Differences"),
      table(["Feature", "Set", "Dictionary"], [
      ["<strong>Data Structure</strong>", "Collection of unique elements", "Collection of key-value pairs"],
      ["<strong>Syntax</strong>", "<code>{1, 2, 3}</code>", "<code>{\"a\": 1, \"b\": 2}</code>"],
      ["<strong>Elements</strong>", "Single values", "Key-value pairs"],
      ["<strong>Uniqueness</strong>", "All elements are unique", "Keys are unique, values can repeat"],
      ["<strong>Access</strong>", "No indexing (unorderd)", "Access by keys"],
      ["<strong>Mutability</strong>", "Mutable (elements must be immutable)", "Mutable (keys must be immutable)"],
      ["<strong>Order</strong>", "Unordered", "Ordered (Python 3.7+)"],
      ["<strong>Use Case</strong>", "Membership testing, deduplication", "Key-value mapping, data organization"],
      ["<strong>Memory</strong>", "Less memory (stores only values)", "More memory (stores keys and values)"],
      ["<strong>Methods</strong>", "<code>add()</code>, <code>update()</code>, set operations", "<code>get()</code>, <code>keys()</code>, <code>values()</code>, <code>items()</code>"],
    ]),
      sub("Examples Showing Differences"),
      codeBlock("Python", `# Creating set vs dictionary
my_set = {1, 2, 3, 4, 5}
my_dict = {"a": 1, "b": 2, "c": 3}

print(my_set)   # {1, 2, 3, 4, 5}
print(my_dict)  # {'a': 1, 'b': 2, 'c': 3}

# Accessing elements
# Set - membership testing
print(3 in my_set)   # True
# Set cannot be accessed by index
# print(my_set[0])   # TypeError

# Dictionary - access by key
print(my_dict["a"])  # 1
print(my_dict.get("b"))  # 2

# Adding elements
my_set.add(6)
my_dict["d"] = 4
print(my_set)   # {1, 2, 3, 4, 5, 6}
print(my_dict)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# Duplicate handling
my_set.add(3)  # No change (already exists)
my_dict["a"] = 99  # Updates existing key
print(my_set)   # {1, 2, 3, 4, 5, 6}
print(my_dict)  # {'a': 99, 'b': 2, 'c': 3, 'd': 4}

# Iteration
for element in my_set:
    print(element)  # prints elements (order may vary)

for key, value in my_dict.items():
    print(f"{key}: {value}")  # prints key-value pairs`),
      sub("When to Use Which?"),
      split(
      col("Use Set When:", [
        "You need to eliminate duplicates",
        "You need fast membership testing",
        "You need set operations (union, intersection, etc.)",
        "Order of elements doesn't matter",
        "You only need to store values, not relationships",
      ]),
      col("Use Dictionary When:", [
        "You need to store key-value relationships",
        "You need to access data by a meaningful identifier",
        "You need fast lookup by key",
        "You need to maintain order (Python 3.7+)",
        "You have structured data with attributes",
      ]),
    ),
      sub("Practical Examples"),
      codeBlock("Python", `# Set example - removing duplicates
students = ["Rahul", "Priya", "Rahul", "Amit", "Priya"]
unique_students = set(students)
print(unique_students)  # {'Priya', 'Amit', 'Rahul'}

# Set example - finding common elements
set_a = {1, 2, 3, 4}
set_b = {3, 4, 5, 6}
common = set_a.intersection(set_b)
print(common)  # {3, 4}

# Dictionary example - student records
student_records = {
    "Rahul": {"age": 20, "course": "Python", "grades": [85, 92]},
    "Priya": {"age": 22, "course": "Java", "grades": [90, 88]},
    "Amit": {"age": 21, "course": "Python", "grades": [78, 85]}
}

# Access by key
print(student_records["Rahul"]["course"])  # Python

# Update
student_records["Rahul"]["age"] = 21
print(student_records["Rahul"])  # {'age': 21, 'course': 'Python', 'grades': [85, 92]}

# Finding all Python students
python_students = {name for name, data in student_records.items() if data["course"] == "Python"}
print(python_students)  # {'Rahul', 'Amit'}`)
    ),
  ]);

  topic({
    id: "modules-intro",
    title: "Modules Introduction",
    difficulty: "Beginner",
    summary: "What a module is, its advantages and the types of modules.",
    icon: "fa-solid fa-puzzle-piece",
    category: "Modules",
  }, () => [
    section("1", "What is a Module?",
      p("A <strong>module</strong> is a file containing Python definitions and statements. Modules allow you to organize related code into separate files, making it easier to manage, reuse, and share code.")
    ),
    section("2", "Definition",
      p("A module is a Python file (with the <code>.py</code> extension) that contains functions, classes, and variables. It allows you to logically organize your Python code into reusable components.")
    ),
    section("3", "Advantages of Using Modules",
      bullets([
      "<strong>Code Reusability:</strong> Write once, use multiple times across different programs.",
      "<strong>Organization:</strong> Keep related functions and classes in a single file for better structure.",
      "<strong>Namespace Management:</strong> Avoid naming conflicts between functions and variables.",
      "<strong>Maintainability:</strong> Easier to update and debug code when it's organized into modules.",
      "<strong>Collaboration:</strong> Multiple developers can work on different modules simultaneously.",
      "<strong>Performance:</strong> Modules are compiled only once and cached for faster execution.",
    ])
    ),
    section("4", "Types of Modules",
      sub("1. Built-in Modules"),
      p("These modules come pre-installed with Python and provide a wide range of functionality. Examples include <code>math</code>, <code>random</code>, <code>os</code>, <code>sys</code>, <code>datetime</code>, and <code>json</code>."),
      codeBlock("Python", `# Using built-in modules
import math
import random
import os

print(math.pi)        # 3.141592653589793
print(random.randint(1, 10))  # Random number between 1 and 10
print(os.getcwd())    # Current working directory`),
      sub("2. Third-Party Modules"),
      p("These modules are developed by the Python community and can be installed using package managers like <code>pip</code>. Examples include <code>numpy</code>, <code>pandas</code>, <code>requests</code>, and <code>matplotlib</code>."),
      codeBlock("Python", `# Installing and using third-party modules
# pip install numpy requests

# import numpy as np
# import requests

# Using the installed modules
# arr = np.array([1, 2, 3])
# response = requests.get("https://api.example.com")`),
      sub("3. Local Modules (User-defined)"),
      p("These are modules you create yourself for your own projects. Simply create a <code>.py</code> file with your functions and classes, and import it in your main program."),
      codeBlock("Python", `# my_module.py (file content)
# def greet(name):
#     return f"Hello, {name}!"

# def add(a, b):
#     return a + b

# main.py (using the module)
# import my_module
# print(my_module.greet("Rahul"))  # Hello, Rahul!`),
      sub("4. Packages"),
      p("A package is a collection of related modules organized in directories. Each package must contain a special <code>__init__.py</code> file (can be empty) to indicate it's a package."),
      codeBlock("Python", `# Package structure
# my_package/
#     __init__.py
#     module1.py
#     module2.py
#     sub_package/
#         __init__.py
#         module3.py

# Importing from package
# from my_package import module1
# from my_package.sub_package import module3`),
      sub("Module Search Path"),
      p("When you import a module, Python searches for it in the following order:"),
      olist([
      "The current directory (where your script is located)",
      "The <code>PYTHONPATH</code> environment variable directories",
      "The standard Python library directories",
      "The site-packages directory (for third-party modules)",
    ]),
      codeBlock("Python", `import sys
print(sys.path)  # Prints the list of directories Python searches for modules`)
    ),
  ]);

  topic({
    id: "modules-imports",
    title: "Import Patterns",
    difficulty: "Beginner",
    summary: "The different ways to import a module and its names.",
    icon: "fa-solid fa-file-import",
    category: "Modules",
  }, () => [
    section("", "Importing Modules in Python",
      p("Python provides several ways to import modules, each with its own syntax and use cases. Here are the most common import patterns:"),
      sub("1. Using import (Standard Import)"),
      p("Imports the entire module. You need to prefix the module name to access its contents."),
      codeBlock("Python", `# Import the entire module
import math

# Access functions using module name
print(math.sqrt(25))      # 5.0
print(math.pi)            # 3.141592653589793
print(math.floor(3.7))    # 3

# Import multiple modules
import math, random, os

print(random.randint(1, 10))
print(os.getcwd())`),
      sub("2. Using import with Alias"),
      p("Imports the module with a shorter alias to reduce typing."),
      codeBlock("Python", `# Import with alias
import math as m
import random as r

print(m.sqrt(16))     # 4.0
print(m.pi)           # 3.141592653589793
print(r.randint(1, 6))  # Random number between 1 and 6

# Common aliases in Python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt`),
      sub("3. Using from ... import"),
      p("Imports specific functions, classes, or variables from a module directly into the current namespace. No module prefix needed."),
      codeBlock("Python", `# Import specific functions
from math import sqrt, pi, floor

# Use directly without prefix
print(sqrt(25))    # 5.0
print(pi)          # 3.141592653589793
print(floor(3.7))  # 3

# Import multiple items
from math import sin, cos, tan
print(sin(0))      # 0.0
print(cos(0))      # 1.0

# Import everything (NOT recommended - pollutes namespace)
# from math import *`),
      sub("4. Using from ... import with Alias"),
      p("Imports specific items with custom names."),
      codeBlock("Python", `# Import with alias for specific items
from math import sqrt as square_root
from math import pi as PI_VALUE

print(square_root(100))  # 10.0
print(PI_VALUE)          # 3.141592653589793`),
      sub("5. Creating Your Own Module"),
      p("To create a module, simply save a Python file with a <code>.py</code> extension in the same directory or in Python's search path."),
      codeBlock("Python", `# my_utils.py (Create this file)
# def greet(name):
#     return f"Hello, {name}!"
#
# def add(a, b):
#     return a + b
#
# def multiply(a, b):
#     return a * b
#
# PI = 3.14159

# my_program.py (Import and use the module)
import my_utils

print(my_utils.greet("Rahul"))      # Hello, Rahul!
print(my_utils.add(5, 3))           # 8
print(my_utils.multiply(4, 2))      # 8
print(my_utils.PI)                  # 3.14159

# Using from ... import with custom module
from my_utils import greet, add
print(greet("Priya"))   # Hello, Priya!
print(add(10, 20))      # 30`),
      sub("6. Importing from Packages"),
      p("When modules are organized in directories (packages), use dot notation."),
      codeBlock("Python", `# Package structure
# my_package/
#     __init__.py
#     module1.py
#     module2.py

# Import module from package
import my_package.module1
# or
from my_package import module1
# or
from my_package.module1 import function_name`),
      sub("Important Rules"),
      bullets([
      "<strong>Place import statements at the top</strong> of your Python file (after the shebang line and docstring).",
      "Group imports in order: standard library, third-party, local modules.",
      "Avoid using <code>from module import *</code> as it pollutes the namespace and makes code less readable.",
      "Use <code>if __name__ == \"__main__\":</code> guard to prevent code from running when imported.",
    ]),
      codeBlock("Python", `# Example of proper import organization
#!/usr/bin/env python3
"""This is a module docstring."""

# 1. Standard library imports
import os
import sys
from math import pi, sqrt

# 2. Third-party imports
# import numpy as np
# import pandas as pd

# 3. Local imports
# import my_utils

# Guard for script execution
if __name__ == "__main__":
    print("This code runs only when the script is executed directly")
    print(f"Pi value: {pi}")`)
    ),
  ]);

  topic({
    id: "module-random",
    title: "Random Module",
    difficulty: "Intermediate",
    summary: "Generating random numbers and making random choices with the random module.",
    icon: "fa-solid fa-dice",
    category: "Modules",
  }, () => [
    section("", "",
      p("The <code>random</code> module provides functions for generating random numbers and performing random selections. It is widely used in games, simulations, testing, and security applications."),
      sub("How to Import the Random Module"),
      codeBlock("Python", `# Import the random module
import random

# Or import specific functions
from random import randint, choice, shuffle`),
      sub("Common Functions in Random Module"),
      minor("1. random() - Random Float between 0 and 1"),
      p("Returns a random floating-point number between 0.0 and 1.0 (exclusive)."),
      codeBlock("Python", `import random

# random() - float between 0.0 and 1.0
value = random.random()
print(value)  # 0.123456789 (example)

# Generate multiple random floats
for i in range(5):
    print(random.random())`),
      minor("2. randint(a, b) - Random Integer in Range"),
      p("Returns a random integer N such that <code>a &lt;= N &lt;= b</code> (inclusive)."),
      codeBlock("Python", `import random

# randint(a, b) - random integer between a and b
dice_roll = random.randint(1, 6)
print(f"Dice roll: {dice_roll}")

# Random age between 18 and 65
age = random.randint(18, 65)
print(f"Random age: {age}")

# Generate 10 random numbers between 1 and 100
for i in range(10):
    print(random.randint(1, 100), end=" ")`),
      minor("3. randrange(start, stop, step) - Random from Range"),
      p("Returns a random element from the range generated by <code>range(start, stop, step)</code>."),
      codeBlock("Python", `import random

# randrange(stop)
print(random.randrange(10))  # 0 to 9

# randrange(start, stop)
print(random.randrange(5, 15))  # 5 to 14

# randrange(start, stop, step)
print(random.randrange(0, 20, 2))  # 0, 2, 4, 6, 8, 10, 12, 14, 16, 18

# Use to generate random even numbers
even_number = random.randrange(2, 20, 2)
print(f"Random even: {even_number}")`),
      minor("4. choice(sequence) - Random Choice from Sequence"),
      p("Returns a randomly selected element from a non-empty sequence (list, tuple, string, etc.)."),
      codeBlock("Python", `import random

# choice() from list
fruits = ["apple", "banana", "cherry", "date", "elderberry"]
print(random.choice(fruits))  # Random fruit

# choice() from string
letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
print(random.choice(letters))  # Random uppercase letter

# choice() from tuple
colors = ("red", "green", "blue", "yellow")
print(random.choice(colors))  # Random color

# Random winner
participants = ["Alice", "Bob", "Charlie", "Diana"]
winner = random.choice(participants)
print(f"The winner is: {winner}")`),
      minor("5. shuffle(sequence) - Shuffle Sequence in Place"),
      p("Randomly shuffles the elements of a sequence in place (modifies the original list)."),
      codeBlock("Python", `import random

# shuffle() - shuffles list in place
cards = ["A♠", "K♠", "Q♠", "J♠", "10♠", "9♠", "8♠", "7♠", "6♠", "5♠", "4♠", "3♠", "2♠"]
print("Original:", cards)
random.shuffle(cards)
print("Shuffled:", cards)

# Shuffle a deck for a game
deck = list(range(1, 53))  # 1-52
random.shuffle(deck)
print(f"Top card: {deck[0]}")
print(f"Bottom card: {deck[-1]}")`),
      minor("6. sample(population, k) - Random Sample without Replacement"),
      p("Returns a list of k unique elements chosen from the population without replacement."),
      codeBlock("Python", `import random

# sample() - selects k unique items
participants = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank"]
winners = random.sample(participants, 3)  # Select 3 unique winners
print(winners)

# Lottery numbers
numbers = list(range(1, 50))
lottery = random.sample(numbers, 6)  # Select 6 unique numbers
print(f"Lottery numbers: {sorted(lottery)}")`),
      minor("7. uniform(a, b) - Random Float between a and b"),
      p("Returns a random floating-point number between a and b (inclusive of both ends)."),
      codeBlock("Python", `import random

# uniform(a, b) - float between a and b
temperature = random.uniform(20.0, 35.0)
print(f"Random temperature: {temperature:.2f}°C")

price = random.uniform(10.50, 100.75)
print(f"Random price: \${price:.2f}")`)
    ),
  ]);

  topic({
    id: "module-math",
    title: "Math Module",
    difficulty: "Intermediate",
    summary: "Mathematical functions and constants from the math module.",
    icon: "fa-solid fa-square-root-variable",
    category: "Modules",
  }, () => [
    section("", "",
      p("The <code>math</code> module provides mathematical functions and constants for performing mathematical operations. It is used in scientific computing, engineering, statistics, and general programming."),
      sub("How to Import the Math Module"),
      codeBlock("Python", `# Import the math module
import math

# Or import specific functions
from math import pi, sqrt, ceil, floor`),
      sub("Constants in Math Module"),
      minor("1. pi (π)"),
      p("The mathematical constant pi (approximately 3.14159)."),
      codeBlock("Python", `import math

print(math.pi)          # 3.141592653589793
print(f"π = {math.pi:.10f}")

# Calculate circumference
radius = 5
circumference = 2 * math.pi * radius
print(f"Circumference: {circumference}")`),
      minor("2. e (Euler's Number)"),
      p("The base of natural logarithms (approximately 2.71828)."),
      codeBlock("Python", `import math

print(math.e)           # 2.718281828459045
print(f"e = {math.e:.10f}")

# Natural exponential
print(math.exp(1))      # 2.718281828459045 (same as e)`),
      minor("3. inf (Infinity)"),
      p("Represents positive infinity. Used for comparisons and representing unbounded values."),
      codeBlock("Python", `import math

print(math.inf)         # inf
print(float('inf'))     # inf

# Comparisons with infinity
print(math.inf > 1000)  # True
print(math.inf + 5)     # inf`),
      minor("4. nan (Not a Number)"),
      p("Represents an undefined or unrepresentable value (e.g., 0/0)."),
      codeBlock("Python", `import math

print(math.nan)         # nan

# Checking for nan
value = float('nan')
print(math.isnan(value))  # True
print(math.isnan(10))     # False`),
      sub("Common Functions in Math Module"),
      minor("1. ceil(x) - Ceiling Function"),
      p("Returns the smallest integer greater than or equal to x (rounds up)."),
      codeBlock("Python", `import math

print(math.ceil(3.2))   # 4
print(math.ceil(3.0))   # 3
print(math.ceil(3.9))   # 4
print(math.ceil(-3.2))  # -3
print(math.ceil(-3.9))  # -3`),
      minor("2. floor(x) - Floor Function"),
      p("Returns the largest integer less than or equal to x (rounds down)."),
      codeBlock("Python", `import math

print(math.floor(3.2))   # 3
print(math.floor(3.9))   # 3
print(math.floor(3.0))   # 3
print(math.floor(-3.2))  # -4
print(math.floor(-3.9))  # -4`),
      minor("3. sqrt(x) - Square Root"),
      p("Returns the square root of x. Raises ValueError for negative numbers."),
      codeBlock("Python", `import math

print(math.sqrt(25))    # 5.0
print(math.sqrt(2))     # 1.4142135623730951
print(math.sqrt(100))   # 10.0

# Calculate distance
x1, y1 = 0, 0
x2, y2 = 3, 4
distance = math.sqrt((x2-x1)**2 + (y2-y1)**2)
print(f"Distance: {distance}")  # 5.0

# math.sqrt(-1)  # ValueError: math domain error`),
      minor("4. pow(x, y) - Power Function"),
      p("Returns x raised to the power of y. Similar to <code>x ** y</code>."),
      codeBlock("Python", `import math

print(math.pow(2, 3))    # 8.0
print(math.pow(5, 2))    # 25.0
print(math.pow(2, 0.5))  # 1.4142135623730951 (sqrt of 2)
print(math.pow(10, -1))  # 0.1

# Compare with ** operator
print(2 ** 3)            # 8
print(math.pow(2, 3))    # 8.0 (always returns float)`),
      minor("5. log(x, base) - Logarithm"),
      p("Returns the logarithm of x to the specified base. Default is natural logarithm (base e)."),
      codeBlock("Python", `import math

# Natural logarithm (base e)
print(math.log(10))          # 2.302585092994046
print(math.log(math.e))      # 1.0

# Logarithm with specified base
print(math.log(100, 10))     # 2.0 (log base 10)
print(math.log(8, 2))        # 3.0 (log base 2)

# Common logarithms
print(math.log10(100))       # 2.0 (base 10)
print(math.log2(8))          # 3.0 (base 2)`),
      minor("6. factorial(x) - Factorial"),
      p("Returns the factorial of x (x! = x * (x-1) * (x-2) * ... * 1)."),
      codeBlock("Python", `import math

print(math.factorial(5))    # 120 (5*4*3*2*1)
print(math.factorial(0))    # 1 (by definition)
print(math.factorial(10))   # 3628800

# Calculate permutations
n = 5
r = 3
permutations = math.factorial(n) // math.factorial(n - r)
print(f"P(5,3) = {permutations}")  # 60`),
      sub("Additional Useful Math Functions"),
      minor("Trigonometric Functions"),
      codeBlock("Python", `import math

# Angle in radians
angle = math.radians(45)  # Convert 45° to radians

print(math.sin(angle))    # 0.7071067811865475
print(math.cos(angle))    # 0.7071067811865476
print(math.tan(angle))    # 0.9999999999999999

# Convert radians to degrees
degrees = math.degrees(math.pi / 4)
print(degrees)            # 45.0`),
      minor("Absolute Value"),
      codeBlock("Python", `import math

print(math.fabs(-5.5))     # 5.5
print(math.fabs(3.2))      # 3.2`),
      minor("Rounding and Truncation"),
      codeBlock("Python", `import math

print(math.trunc(3.7))     # 3 (removes decimal part)
print(math.trunc(-3.7))    # -3 (removes decimal part)`)
    ),
  ]);

})();
