registerTopic({
  "library": "scikit-learn",
  "libraryName": "Scikit-learn",
  "icon": "fa-solid fa-brain",
  "color": "#9B6CF5",
  "id": "model-evaluation",
  "title": "Model Evaluation Metrics",
  "difficulty": "Advanced",
  "summary": "Check how good a model actually is with accuracy, confusion matrix and R\u00b2.",
  "code": "from sklearn.metrics import (\n    accuracy_score, confusion_matrix, r2_score, mean_squared_error\n)\nimport numpy as np\n\n# --- Classification example ---\ny_true = [0, 1, 1, 0, 1, 0]\ny_pred = [0, 1, 0, 0, 1, 1]\n\nprint(\"Accuracy:\", accuracy_score(y_true, y_pred))\nprint(\"Confusion matrix:\\n\", confusion_matrix(y_true, y_pred))\n\n# --- Regression example ---\nactual_sales = np.array([45, 60, 75, 90])\npredicted_sales = np.array([50, 58, 80, 85])\n\nprint(\"R-squared:\", r2_score(actual_sales, predicted_sales).round(2))\nprint(\"RMSE:\", np.sqrt(mean_squared_error(actual_sales, predicted_sales)).round(2))\n"
});
