registerTopic({
  "library": "pandas",
  "libraryName": "Pandas",
  "icon": "fa-solid fa-table",
  "color": "#2FBF9B",
  "id": "selection-filtering",
  "title": "Selection & Filtering",
  "difficulty": "Beginner",
  "summary": "Use loc/iloc and boolean conditions to find high-value customers.",
  "code": "import pandas as pd\n\ndf = pd.DataFrame({\n    \"customer\": [\"A\", \"B\", \"C\", \"D\", \"E\"],\n    \"revenue\": [12000, 4500, 30500, 8700, 21000],\n    \"region\": [\"North\", \"South\", \"North\", \"East\", \"West\"],\n})\n\n# Label-based selection\nprint(df.loc[df[\"region\"] == \"North\"])\n\n# Filter: customers above $10,000 revenue\nhigh_value = df[df[\"revenue\"] > 10000]\nprint(\"\\nHigh value customers:\\n\", high_value)\n\n# Position-based selection: first two rows, first two columns\nprint(\"\\niloc slice:\\n\", df.iloc[0:2, 0:2])\n"
});
