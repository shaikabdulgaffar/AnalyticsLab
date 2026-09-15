registerTopic({
  "library": "matplotlib",
  "libraryName": "Matplotlib",
  "icon": "fa-solid fa-chart-line",
  "color": "#F5A623",
  "id": "scatter-plot",
  "title": "Scatter Plot \u2014 Ad Spend vs Sales",
  "difficulty": "Beginner",
  "summary": "Visualize the relationship between marketing spend and resulting sales.",
  "code": "import matplotlib.pyplot as plt\n\nad_spend = [5, 8, 12, 15, 20, 22, 30]\nsales = [45, 60, 75, 90, 110, 115, 140]\n\nplt.figure(figsize=(7, 4))\nplt.scatter(ad_spend, sales, color=\"#E0559F\", s=70)\nplt.title(\"Ad Spend vs Sales\")\nplt.xlabel(\"Ad Spend ($'000)\")\nplt.ylabel(\"Sales ($'000)\")\nplt.tight_layout()\nplt.show()\n"
});
