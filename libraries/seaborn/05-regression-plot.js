registerTopic({
  "library": "seaborn",
  "libraryName": "Seaborn",
  "icon": "fa-solid fa-chart-simple",
  "color": "#E0559F",
  "id": "regression-plot",
  "title": "Regression Plot",
  "difficulty": "Intermediate",
  "summary": "Fit and display a trend line for ad spend vs sales in a single call.",
  "code": "import seaborn as sns\nimport matplotlib.pyplot as plt\n\nad_spend = [5, 8, 12, 15, 20, 22, 30]\nsales = [45, 60, 75, 90, 110, 115, 140]\n\nsns.regplot(x=ad_spend, y=sales, color=\"#2FBF9B\")\nplt.title(\"Ad Spend vs Sales, with Trend Line\")\nplt.xlabel(\"Ad Spend ($'000)\")\nplt.ylabel(\"Sales ($'000)\")\nplt.show()\n"
});
