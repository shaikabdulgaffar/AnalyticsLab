registerTopic({
  "library": "numpy",
  "libraryName": "NumPy",
  "icon": "fa-solid fa-calculator",
  "color": "#4C8BF5",
  "id": "statistical-functions",
  "title": "Statistical Functions",
  "difficulty": "Intermediate",
  "summary": "Summarize a revenue dataset with mean, median, std deviation and percentiles.",
  "code": "import numpy as np\n\nrevenue = np.array([220, 245, 198, 260, 400, 210, 233, 190, 800, 245])  # $'000\n\nprint(\"Mean:\", np.mean(revenue))\nprint(\"Median:\", np.median(revenue))          # robust to the 800 outlier\nprint(\"Std deviation:\", round(np.std(revenue), 2))\nprint(\"25th percentile:\", np.percentile(revenue, 25))\nprint(\"75th percentile:\", np.percentile(revenue, 75))\n\n# Note how the mean is pulled up by the 800 outlier while the median isn't \u2014\n# a useful talking point when discussing skewed business data.\n"
});
