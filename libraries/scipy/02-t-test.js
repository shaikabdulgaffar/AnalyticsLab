registerTopic({
  "library": "scipy",
  "libraryName": "SciPy",
  "icon": "fa-solid fa-flask",
  "color": "#56C9E0",
  "id": "t-test",
  "title": "Independent t-test",
  "difficulty": "Intermediate",
  "summary": "Test whether average sales genuinely differ between two store locations.",
  "code": "from scipy import stats\nimport numpy as np\n\nstore_a = np.array([220, 245, 198, 260, 233])\nstore_b = np.array([300, 285, 310, 295, 320])\n\nt_stat, p_value = stats.ttest_ind(store_a, store_b)\n\nprint(\"t-statistic:\", round(t_stat, 3))\nprint(\"p-value:\", round(p_value, 4))\n\nif p_value < 0.05:\n    print(\"Result: statistically significant difference between the stores\")\nelse:\n    print(\"Result: no statistically significant difference\")\n"
});
