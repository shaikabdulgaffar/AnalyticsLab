registerTopic({
  "library": "scipy",
  "libraryName": "SciPy",
  "icon": "fa-solid fa-flask",
  "color": "#56C9E0",
  "id": "optimization",
  "title": "Cost Optimization",
  "difficulty": "Advanced",
  "summary": "Find the production quantity that minimizes total cost using scipy.optimize.",
  "code": "from scipy.optimize import minimize_scalar\n\ndef total_cost(units):\n    fixed_cost = 5000\n    variable_cost = 12 * units\n    storage_penalty = 0.02 * units**2   # cost rises fast if you overproduce\n    return fixed_cost + variable_cost + storage_penalty\n\nresult = minimize_scalar(total_cost, bounds=(0, 1000), method=\"bounded\")\n\nprint(\"Optimal production quantity:\", round(result.x))\nprint(\"Minimum total cost: $\", round(result.fun, 2))\n"
});
