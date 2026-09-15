registerTopic({
  "library": "scipy",
  "libraryName": "SciPy",
  "icon": "fa-solid fa-flask",
  "color": "#56C9E0",
  "id": "descriptive-stats",
  "title": "Descriptive Statistics",
  "difficulty": "Beginner",
  "summary": "Measure skewness and kurtosis to understand the shape of revenue data.",
  "code": "from scipy import stats\nimport numpy as np\n\nrevenue = np.array([220, 245, 198, 260, 400, 210, 233, 190, 800, 245])\n\nprint(\"Skewness:\", round(stats.skew(revenue), 2))\nprint(\"Kurtosis:\", round(stats.kurtosis(revenue), 2))\nprint(\"Mode:\", stats.mode(revenue, keepdims=True))\n"
});
