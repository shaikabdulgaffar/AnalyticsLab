registerTopic({
  "library": "scipy",
  "libraryName": "SciPy",
  "icon": "fa-solid fa-flask",
  "color": "#56C9E0",
  "id": "correlation-significance",
  "title": "Correlation & Significance",
  "difficulty": "Intermediate",
  "summary": "Check not just the correlation between ad spend and sales, but whether it's significant.",
  "code": "from scipy import stats\n\nad_spend = [5, 8, 12, 15, 20, 22, 30]\nsales = [45, 60, 75, 90, 110, 115, 140]\n\ncorr, p_value = stats.pearsonr(ad_spend, sales)\n\nprint(\"Correlation coefficient:\", round(corr, 3))\nprint(\"p-value:\", round(p_value, 5))\nprint(\"Significant at 5%?\", p_value < 0.05)\n"
});
