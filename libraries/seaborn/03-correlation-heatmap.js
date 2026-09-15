registerTopic({
  "library": "seaborn",
  "libraryName": "Seaborn",
  "icon": "fa-solid fa-chart-simple",
  "color": "#E0559F",
  "id": "correlation-heatmap",
  "title": "Correlation Heatmap",
  "difficulty": "Intermediate",
  "summary": "Visualize how marketing spend, price and sales relate to each other.",
  "code": "import seaborn as sns\nimport matplotlib.pyplot as plt\nimport pandas as pd\n\ndf = pd.DataFrame({\n    \"ad_spend\": [5, 8, 12, 15, 20, 22, 30],\n    \"price\": [20, 19, 18, 17, 16, 15, 14],\n    \"sales\": [45, 60, 75, 90, 110, 115, 140],\n})\n\ncorr = df.corr()\nsns.heatmap(corr, annot=True, cmap=\"coolwarm\", vmin=-1, vmax=1)\nplt.title(\"Correlation Matrix\")\nplt.show()\n"
});
