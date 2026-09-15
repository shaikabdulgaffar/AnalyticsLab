registerTopic({
  "library": "pandas",
  "libraryName": "Pandas",
  "icon": "fa-solid fa-table",
  "color": "#2FBF9B",
  "id": "reading-csv",
  "title": "Reading & Inspecting a CSV",
  "difficulty": "Beginner",
  "summary": "Load a sales CSV and get a quick first look with head(), info() and describe().",
  "code": "import pandas as pd\n\n# In class, replace this with your own file path, e.g. \"sales_2025.csv\"\ndf = pd.read_csv(\"sales_2025.csv\")\n\nprint(df.head())          # first 5 rows\nprint(df.info())          # column types & non-null counts\nprint(df.describe())      # quick summary statistics\nprint(\"Missing values per column:\\n\", df.isnull().sum())\n"
});
