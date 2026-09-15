registerTopic({
  "library": "pandas",
  "libraryName": "Pandas",
  "icon": "fa-solid fa-table",
  "color": "#2FBF9B",
  "id": "groupby-aggregation",
  "title": "GroupBy & Aggregation",
  "difficulty": "Intermediate",
  "summary": "Summarize total and average sales by region \u2014 the pandas equivalent of a pivot table.",
  "code": "import pandas as pd\n\ndf = pd.DataFrame({\n    \"region\": [\"North\", \"South\", \"North\", \"East\", \"South\", \"East\"],\n    \"sales\": [4200, 3800, 5100, 4700, 6000, 5300],\n})\n\nsummary = df.groupby(\"region\")[\"sales\"].agg([\"sum\", \"mean\", \"count\"])\nprint(summary)\n\n# Sort regions by total sales, highest first\nprint(\"\\nRanked by total sales:\\n\", summary.sort_values(\"sum\", ascending=False))\n"
});
