registerTopic({
  "library": "seaborn",
  "libraryName": "Seaborn",
  "icon": "fa-solid fa-chart-simple",
  "color": "#E0559F",
  "id": "distribution-plot",
  "title": "Distribution Plot",
  "difficulty": "Beginner",
  "summary": "Look at the shape of customer age data with a histogram + density curve.",
  "code": "import seaborn as sns\nimport matplotlib.pyplot as plt\nimport numpy as np\n\nnp.random.seed(0)\nages = np.random.normal(loc=35, scale=8, size=300).astype(int)\n\nsns.histplot(ages, kde=True, color=\"#4C8BF5\")\nplt.title(\"Customer Age Distribution\")\nplt.xlabel(\"Age\")\nplt.show()\n"
});
