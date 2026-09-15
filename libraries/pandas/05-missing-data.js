registerTopic({
  "library": "pandas",
  "libraryName": "Pandas",
  "icon": "fa-solid fa-table",
  "color": "#2FBF9B",
  "id": "missing-data",
  "title": "Handling Missing Data",
  "difficulty": "Intermediate",
  "summary": "Detect, fill and drop missing values in a customer dataset.",
  "code": "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    \"customer\": [\"A\", \"B\", \"C\", \"D\"],\n    \"age\": [34, np.nan, 29, 41],\n    \"income\": [55000, 62000, np.nan, 48000],\n})\n\nprint(\"Missing values:\\n\", df.isnull().sum())\n\n# Fill missing age with the column mean\ndf[\"age\"] = df[\"age\"].fillna(df[\"age\"].mean())\n\n# Drop any remaining rows with missing data\ndf_clean = df.dropna()\n\nprint(\"\\nAfter cleaning:\\n\", df_clean)\n"
});
