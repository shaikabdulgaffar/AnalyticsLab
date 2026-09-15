registerTopic({
  "library": "scikit-learn",
  "libraryName": "Scikit-learn",
  "icon": "fa-solid fa-brain",
  "color": "#9B6CF5",
  "id": "decision-tree",
  "title": "Decision Tree \u2014 Customer Segmentation",
  "difficulty": "Intermediate",
  "summary": "Use a decision tree to classify customers into segments based on behavior.",
  "code": "from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\n# annual_spend, visits_per_month -> segment (0=Low, 1=Medium, 2=High value)\nX = np.array([[200, 1], [5000, 8], [1200, 3], [8000, 12], [300, 1], [6000, 9]])\ny = np.array([0, 2, 1, 2, 0, 2])\n\nmodel = DecisionTreeClassifier(max_depth=3, random_state=42)\nmodel.fit(X, y)\n\nnew_customer = [[3500, 5]]\nprint(\"Predicted segment:\", model.predict(new_customer)[0])\nprint(\"Feature importance:\", model.feature_importances_.round(2))\n"
});
