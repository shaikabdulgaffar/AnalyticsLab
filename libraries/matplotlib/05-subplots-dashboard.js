registerTopic({
  "library": "matplotlib",
  "libraryName": "Matplotlib",
  "icon": "fa-solid fa-chart-line",
  "color": "#F5A623",
  "id": "subplots-dashboard",
  "title": "Subplots \u2014 Mini Dashboard",
  "difficulty": "Intermediate",
  "summary": "Combine multiple charts into one figure, like a simple executive dashboard.",
  "code": "import matplotlib.pyplot as plt\n\nmonths = [\"Jan\",\"Feb\",\"Mar\",\"Apr\"]\nrevenue = [42, 38, 51, 47]\ncategories = [\"Electronics\", \"Apparel\", \"Grocery\"]\nshare = [45, 30, 25]\n\nfig, axes = plt.subplots(1, 2, figsize=(10, 4))\n\naxes[0].plot(months, revenue, marker=\"o\", color=\"#4C8BF5\")\naxes[0].set_title(\"Revenue Trend\")\n\naxes[1].pie(share, labels=categories, autopct=\"%1.0f%%\")\naxes[1].set_title(\"Category Share\")\n\nplt.tight_layout()\nplt.show()\n"
});
