registerTopic({
  "library": "seaborn",
  "libraryName": "Seaborn",
  "icon": "fa-solid fa-chart-simple",
  "color": "#E0559F",
  "id": "pairplot",
  "title": "Pairplot \u2014 Multiple Relationships at Once",
  "difficulty": "Intermediate",
  "summary": "See every pairwise relationship between financial metrics in one grid.",
  "code": "import seaborn as sns\nimport pandas as pd\n\ndf = pd.DataFrame({\n    \"ad_spend\": [5, 8, 12, 15, 20, 22, 30],\n    \"price\": [20, 19, 18, 17, 16, 15, 14],\n    \"sales\": [45, 60, 75, 90, 110, 115, 140],\n    \"segment\": [\"A\",\"A\",\"B\",\"B\",\"B\",\"A\",\"A\"],\n})\n\nsns.pairplot(df, hue=\"segment\")\n"
});
