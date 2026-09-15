registerTopic({
  "library": "numpy",
  "libraryName": "NumPy",
  "icon": "fa-solid fa-calculator",
  "color": "#4C8BF5",
  "id": "vectorized-math",
  "title": "Vectorized Business Calculations",
  "difficulty": "Beginner",
  "summary": "Apply a discount and tax to a whole price list in one line \u2014 no loops needed.",
  "code": "import numpy as np\n\nprices = np.array([1200, 950, 430, 2100, 780])   # product prices ($)\n\ndiscount = 0.15   # 15% seasonal discount\ntax = 0.18         # 18% GST\n\ndiscounted = prices * (1 - discount)\nfinal_price = discounted * (1 + tax)\n\nprint(\"Discounted prices:\", np.round(discounted, 2))\nprint(\"Final price w/ tax:\", np.round(final_price, 2))\nprint(\"Total revenue if all sold:\", round(final_price.sum(), 2))\n"
});
