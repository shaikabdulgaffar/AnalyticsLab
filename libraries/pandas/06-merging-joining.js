registerTopic({
  "library": "pandas",
  "libraryName": "Pandas",
  "icon": "fa-solid fa-table",
  "color": "#2FBF9B",
  "id": "merging-joining",
  "title": "Merging & Joining DataFrames",
  "difficulty": "Intermediate",
  "summary": "Combine an orders table with a customers table, like a SQL join.",
  "code": "import pandas as pd\n\norders = pd.DataFrame({\n    \"order_id\": [1, 2, 3, 4],\n    \"customer_id\": [101, 102, 101, 103],\n    \"amount\": [250, 480, 120, 600],\n})\n\ncustomers = pd.DataFrame({\n    \"customer_id\": [101, 102, 103],\n    \"name\": [\"Aisha\", \"Rohit\", \"Meera\"],\n    \"segment\": [\"Retail\", \"Wholesale\", \"Retail\"],\n})\n\nmerged = pd.merge(orders, customers, on=\"customer_id\", how=\"left\")\nprint(merged)\n\nprint(\"\\nRevenue by segment:\\n\", merged.groupby(\"segment\")[\"amount\"].sum())\n"
});
