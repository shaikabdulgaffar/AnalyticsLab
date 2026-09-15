registerTopic({
  "library": "scikit-learn",
  "libraryName": "Scikit-learn",
  "icon": "fa-solid fa-brain",
  "color": "#9B6CF5",
  "id": "logistic-regression",
  "title": "Logistic Regression \u2014 Predicting Churn",
  "difficulty": "Intermediate",
  "summary": "Classify whether a customer is likely to churn based on usage data.",
  "code": "from sklearn.linear_model import LogisticRegression\nimport numpy as np\n\n# months_inactive, support_tickets -> churned (1) or not (0)\nX = np.array([[1, 0], [6, 3], [2, 0], [8, 5], [0, 1], [7, 4]])\ny = np.array([0, 1, 0, 1, 0, 1])\n\nmodel = LogisticRegression()\nmodel.fit(X, y)\n\nnew_customer = [[5, 2]]\nprediction = model.predict(new_customer)\nprobability = model.predict_proba(new_customer)\n\nprint(\"Predicted churn (1 = yes):\", prediction[0])\nprint(\"Churn probability:\", probability[0][1].round(2))\n"
});
