registerTopic({
  "library": "numpy",
  "libraryName": "NumPy",
  "icon": "fa-solid fa-calculator",
  "color": "#4C8BF5",
  "id": "reshape-aggregate",
  "title": "Reshaping & Axis-wise Aggregation",
  "difficulty": "Intermediate",
  "summary": "Reshape 12 months of data into 4 quarters and sum along an axis.",
  "code": "import numpy as np\n\nmonthly_sales = np.array([42, 38, 51, 47, 60, 55, 58, 62, 49, 53, 65, 70])\n\n# Reshape 12 months -> 4 quarters x 3 months\nquarters = monthly_sales.reshape(4, 3)\nprint(\"Quarters grid:\\n\", quarters)\n\n# Sum within each quarter (axis=1 moves across columns)\nquarterly_totals = quarters.sum(axis=1)\nprint(\"Quarterly totals:\", quarterly_totals)\n\n# Best quarter\nprint(\"Best quarter index (0-based):\", np.argmax(quarterly_totals))\n"
});
