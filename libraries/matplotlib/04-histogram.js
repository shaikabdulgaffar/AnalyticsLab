registerTopic({
  "library": "matplotlib",
  "libraryName": "Matplotlib",
  "icon": "fa-solid fa-chart-line",
  "color": "#F5A623",
  "id": "histogram",
  "title": "Histogram \u2014 Order Value Distribution",
  "difficulty": "Intermediate",
  "summary": "See how order values are distributed across many transactions.",
  "code": "import matplotlib.pyplot as plt\nimport numpy as np\n\nnp.random.seed(1)\norder_values = np.random.gamma(shape=2, scale=40, size=500)  # skewed, like real orders\n\nplt.figure(figsize=(7, 4))\nplt.hist(order_values, bins=25, color=\"#F5A623\", edgecolor=\"white\")\nplt.title(\"Distribution of Order Values\")\nplt.xlabel(\"Order value ($)\")\nplt.ylabel(\"Number of orders\")\nplt.tight_layout()\nplt.show()\n"
});
