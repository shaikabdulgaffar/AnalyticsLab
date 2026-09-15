registerTopic({
  "library": "scikit-learn",
  "libraryName": "Scikit-learn",
  "icon": "fa-solid fa-brain",
  "color": "#9B6CF5",
  "id": "kmeans-clustering",
  "title": "K-Means Clustering",
  "difficulty": "Advanced",
  "summary": "Group customers into segments without predefined labels \u2014 unsupervised learning.",
  "code": "from sklearn.cluster import KMeans\nimport numpy as np\n\n# annual_spend ($'000), visits_per_month\nX = np.array([\n    [2, 1], [3, 2], [2.5, 1.5],      # low engagement cluster\n    [30, 10], [28, 9], [32, 11],     # high engagement cluster\n    [12, 5], [10, 4], [14, 6],       # mid engagement cluster\n])\n\nmodel = KMeans(n_clusters=3, random_state=42, n_init=10)\nlabels = model.fit_predict(X)\n\nprint(\"Cluster assignments:\", labels)\nprint(\"Cluster centers:\\n\", model.cluster_centers_.round(2))\n"
});
