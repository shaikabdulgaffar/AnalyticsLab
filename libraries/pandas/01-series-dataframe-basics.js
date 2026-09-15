registerTopic({
  "library": "pandas",
  "libraryName": "Pandas",
  "icon": "fa-solid fa-table",
  "color": "#2FBF9B",
  "id": "series-dataframe-basics",
  "title": "Series & DataFrame Basics",
  "difficulty": "Beginner",
  "summary": "Build a small sales DataFrame from a dictionary and inspect it.",
  "code": "import pandas as pd\n\ndata = {\n    \"region\": [\"North\", \"South\", \"East\", \"West\"],\n    \"sales\": [42000, 38500, 51200, 47800],\n    \"units\": [210, 190, 260, 240],\n}\n\ndf = pd.DataFrame(data)\nprint(df)\nprint(\"\\nColumns:\", df.columns.tolist())\nprint(\"Shape:\", df.shape)\nprint(df.describe())\n"
});
