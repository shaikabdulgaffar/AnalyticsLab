registerTopic({
  "library": "seaborn",
  "libraryName": "Seaborn",
  "icon": "fa-solid fa-chart-simple",
  "color": "#E0559F",
  "id": "box-plot",
  "title": "Box Plot \u2014 Outlier Detection",
  "difficulty": "Beginner",
  "summary": "Compare sales spread across regions and spot outlier transactions.",
  "code": "import seaborn as sns\nimport matplotlib.pyplot as plt\nimport pandas as pd\n\ndf = pd.DataFrame({\n    \"region\": [\"North\"]*20 + [\"South\"]*20 + [\"East\"]*20,\n    \"order_value\": (\n        list(range(100, 300, 10)) +\n        list(range(150, 350, 10)) +\n        list(range(80, 280, 10))\n    ),\n})\n\nsns.boxplot(data=df, x=\"region\", y=\"order_value\", palette=\"Set2\")\nplt.title(\"Order Value Spread by Region\")\nplt.show()\n"
});
