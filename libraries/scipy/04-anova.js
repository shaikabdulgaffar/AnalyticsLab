registerTopic({
  "library": "scipy",
  "libraryName": "SciPy",
  "icon": "fa-solid fa-flask",
  "color": "#56C9E0",
  "id": "anova",
  "title": "One-Way ANOVA",
  "difficulty": "Advanced",
  "summary": "Compare average sales across three or more store locations at once.",
  "code": "from scipy import stats\n\nstore_a = [220, 245, 198, 260, 233]\nstore_b = [300, 285, 310, 295, 320]\nstore_c = [180, 190, 175, 200, 185]\n\nf_stat, p_value = stats.f_oneway(store_a, store_b, store_c)\n\nprint(\"F-statistic:\", round(f_stat, 3))\nprint(\"p-value:\", round(p_value, 5))\n\nif p_value < 0.05:\n    print(\"At least one store's average differs significantly\")\nelse:\n    print(\"No significant difference found across stores\")\n"
});
