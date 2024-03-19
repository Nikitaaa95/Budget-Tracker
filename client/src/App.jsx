import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([
    { name: "Housing", budget: 0, color: "#b27a03" },
    { name: "Transportation", budget: 0, color: "#689fbd" },
    { name: "Food", budget: 0, color: "#dbe8f8" },
    // Add more categories as needed
  ]);
  const [newIncome, setNewIncome] = useState(0);
  const [newExpense, setNewExpense] = useState({ amount: 0, category: "", note: "" });

  const handleChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index].budget = value;
    setCategories(newCategories);
  };

  const totalBudget = categories.reduce((acc, curr) => acc + curr.budget, 0);
  const expenseTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const handleAddIncome = () => {
    setIncome(income + newIncome);
    setNewIncome(0);
  };

  const handleAddExpense = () => {
    setExpenses([...expenses, newExpense]);
    setNewExpense({ amount: 0, category: "", note: "" });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card" style={{ backgroundColor: "#280000", color: "#dbe8f8" }}>
            <div className="card-body">
              <h5 className="card-title">Income</h5>
              <p className="card-text">Total Income: {income}</p>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter income"
                  value={newIncome}
                  onChange={(e) => setNewIncome(parseFloat(e.target.value))}
                />
                <button className="btn btn-primary" onClick={handleAddIncome}>Add</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card" style={{ backgroundColor: "#06293f", color: "#dbe8f8" }}>
            <div className="card-body">
              <h5 className="card-title">Expenses</h5>
              <p className="card-text">Total Expenses: {expenseTotal}</p>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
                />
                <select
                  className="form-select mt-2"
                  aria-label="Category"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <textarea
                  className="form-control mt-2"
                  rows="2"
                  placeholder="Note"
                  value={newExpense.note}
                  onChange={(e) => setNewExpense({ ...newExpense, note: e.target.value })}
                ></textarea>
                <button className="btn btn-primary mt-2" onClick={handleAddExpense}>Add Expense</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <h2>Budget Categories</h2>
          {categories.map((category, index) => (
            <div key={index} className="mb-3" style={{ backgroundColor: category.color, padding: "10px", color: "#fff" }}>
              <label htmlFor={`category-${index}`} className="form-label">
                {category.name}
              </label>
              <div className="input-group">
                <input
                  id={`category-${index}`}
                  type="number"
                  className="form-control"
                  placeholder={`Enter budget for ${category.name}`}
                  value={category.budget}
                  onChange={(e) => handleChange(index, parseFloat(e.target.value))}
                />
                <span className="input-group-text">{((category.budget / income) * 100).toFixed(2)}%</span>
              </div>
            </div>
          ))}
          <h4>Total Budget: {totalBudget}</h4>
        </div>
      </div>
    </div>
  );
};

export default App;
