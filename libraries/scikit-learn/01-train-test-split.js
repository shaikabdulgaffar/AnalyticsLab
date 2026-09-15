registerTopic({
  "library": "scikit-learn",
  "libraryName": "Scikit-learn",
  "icon": "fa-solid fa-brain",
  "color": "#9B6CF5",
  "id": "train-test-split",
  "title": "Train-Test Split",
  "difficulty": "Beginner",
  "summary": "Split historical sales data so a model can be trained and honestly tested.",
  "code": "from sklearn.model_selection import train_test_split\nimport numpy as np\n\nad_spend = np.array([5, 8, 12, 15, 20, 22, 30, 33, 40, 45]).reshape(-1, 1)\nsales = np.array([45, 60, 75, 90, 110, 115, 140, 150, 170, 185])\n\nX_train, X_test, y_train, y_test = train_test_split(\n    ad_spend, sales, test_size=0.2, random_state=42\n)\n\nprint(\"Training rows:\", len(X_train))\nprint(\"Test rows:\", len(X_test))\n"
});
