registerTopic({
  "library": "matplotlib",
  "libraryName": "Matplotlib",
  "icon": "fa-solid fa-chart-line",
  "color": "#F5A623",
  "id": "line-chart",
  "title": "Line Chart \u2014 Revenue Trend",
  "difficulty": "Beginner",
  "summary": "Plot monthly revenue over a year to spot the overall trend.",
  "code": "import matplotlib.pyplot as plt\n\nmonths = [\"Jan\",\"Feb\",\"Mar\",\"Apr\",\"May\",\"Jun\"]\nrevenue = [42, 38, 51, 47, 60, 55]\n\nplt.figure(figsize=(7, 4))\nplt.plot(months, revenue, marker=\"o\", color=\"#4C8BF5\", linewidth=2)\nplt.title(\"Monthly Revenue Trend\")\nplt.xlabel(\"Month\")\nplt.ylabel(\"Revenue ($'000)\")\nplt.grid(alpha=0.3)\nplt.tight_layout()\nplt.show()\n"
});
