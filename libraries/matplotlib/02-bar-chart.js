registerTopic({
  "library": "matplotlib",
  "libraryName": "Matplotlib",
  "icon": "fa-solid fa-chart-line",
  "color": "#F5A623",
  "id": "bar-chart",
  "title": "Bar Chart \u2014 Sales by Category",
  "difficulty": "Beginner",
  "summary": "Compare sales across product categories using a simple bar chart.",
  "code": "import matplotlib.pyplot as plt\n\ncategories = [\"Electronics\", \"Apparel\", \"Grocery\", \"Furniture\"]\nsales = [125000, 98000, 143000, 61000]\n\nplt.figure(figsize=(7, 4))\nplt.bar(categories, sales, color=\"#2FBF9B\")\nplt.title(\"Sales by Product Category\")\nplt.ylabel(\"Sales ($)\")\nplt.xticks(rotation=15)\nplt.tight_layout()\nplt.show()\n"
});
