registerTopic({
  "library": "numpy",
  "libraryName": "NumPy",
  "icon": "fa-solid fa-calculator",
  "color": "#4C8BF5",
  "id": "array-basics",
  "title": "Array Creation & Basics",
  "difficulty": "Beginner",
  "summary": "Turn a plain list of monthly sales into a NumPy array and compare it with a Python list.",
  "code": "import numpy as np\n\n# Monthly sales figures for a retail store ($'000)\nsales_list = [42, 38, 51, 47, 60, 55]\n\n# Convert to a NumPy array\nsales = np.array(sales_list)\n\nprint(\"Type:\", type(sales))\nprint(\"Shape:\", sales.shape)\nprint(\"Data type:\", sales.dtype)\n\n# Unlike a plain list, arithmetic works element-wise\ngrowth_target = sales * 1.10          # a flat 10% growth target\nprint(\"10% growth target:\", growth_target)\n"
});
