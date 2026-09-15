registerTopic({
  "library": "numpy",
  "libraryName": "NumPy",
  "icon": "fa-solid fa-calculator",
  "color": "#4C8BF5",
  "id": "indexing-slicing",
  "title": "Indexing & Boolean Filtering",
  "difficulty": "Beginner",
  "summary": "Select specific quarters and filter out only the high-performing months.",
  "code": "import numpy as np\n\nsales = np.array([42, 38, 51, 47, 60, 55])   # Jan-Jun sales ($'000)\n\n# Positional slicing: first quarter (Jan-Mar)\nq1 = sales[0:3]\nprint(\"Q1 sales:\", q1)\n\n# Boolean mask: months that beat the 50k target\ntop_months = sales[sales > 50]\nprint(\"Months above target:\", top_months)\n\n# How many months hit the target?\nprint(\"Months hitting target:\", (sales > 50).sum())\n"
});
