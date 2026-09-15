registerTopic({
  "library": "scikit-learn",
  "libraryName": "Scikit-learn",
  "icon": "fa-solid fa-brain",
  "color": "#9B6CF5",
  "id": "linear-regression",
  "title": "Linear Regression \u2014 Predicting Sales",
  "difficulty": "Intermediate",
  "summary": "Fit a straight-line model to predict sales from advertising spend.",
  "code": "from sklearn.linear_model import LinearRegression\nimport numpy as np\n\nad_spend = np.array([5, 8, 12, 15, 20, 22, 30]).reshape(-1, 1)\nsales = np.array([45, 60, 75, 90, 110, 115, 140])\n\nmodel = LinearRegression()\nmodel.fit(ad_spend, sales)\n\nprint(\"Slope (extra sales per $1k ad spend):\", model.coef_[0].round(2))\nprint(\"Intercept:\", model.intercept_.round(2))\n\npredicted = model.predict([[25]])\nprint(\"Predicted sales at $25k ad spend:\", predicted[0].round(2))\n"
});
