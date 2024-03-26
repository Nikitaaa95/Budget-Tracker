import React, { useEffect, useState, useRef } from "react";
import "../../App.css";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { ADD_INCOME } from "../../utils/mutations";

function MainPage() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([
    { name: "Housing", budget: 0, color: "#b27a03", expenses: [] },
    { name: "Transportation", budget: 0, color: "#689fbd", expenses: [] },
    { name: "Food", budget: 0, color: "#3a923a", expenses: [] },
  ]);

  const [newIncome, setNewIncome] = useState(0);
  const [newExpense, setNewExpense] = useState({ amount: 0, category: "", note: "" });
  const [newCategory, setNewCategory] = useState({ name: "", budget: 0 });

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
    const updatedCategories = categories.map((category) => {
      if (category.name === newExpense.category) {
        return {
          ...category,
          budget: category.budget + newExpense.amount,
          expenses: [...category.expenses, newExpense],
        };
      }
      return category;
    });
    setCategories(updatedCategories);
    setExpenses([...expenses, newExpense]);
    setNewExpense({ amount: 0, category: "", note: "" });
  };

  const handleAddCategory = () => {
    const color = getRandomColor(); // Generate a random color
    setCategories([...categories, { ...newCategory, color, expenses: [] }]);
    setNewCategory({ name: "", budget: 0 });
  };
  

  const handleDeleteExpense = (categoryIndex, expenseIndex) => {
    const updatedCategories = [...categories];
    const deletedExpense = updatedCategories[categoryIndex].expenses.splice(expenseIndex, 1)[0];
    setCategories(updatedCategories);
    setExpenses(expenses.filter(expense => expense !== deletedExpense));
  };
  
  

  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <div className="background container mt-5">
      <div className="row">
        {/* Income section */}
        <div className="col-md-6 d-flex">
          <div className="card flex-grow-1" style={{ backgroundColor: "#280000", color: "#dbe8f8" }}>
            <div className="card-body d-flex flex-column justify-content-between">
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
        
        {/* Expenses section */}
        <div className="col-md-6 d-flex">
          <div className="card flex-grow-1" style={{ backgroundColor: "#06293f", color: "#dbe8f8" }}>
            <div className="card-body d-flex flex-column justify-content-between">
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
      
      {/* Budget Categories */}
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
                <span className="input-group-text">{((category.budget / totalBudget) * 100).toFixed(2)}%</span>
              </div>
              <div>
                <h5>Expenses</h5>
                {category.expenses.map((expense, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ marginRight: "auto" }}>{expense.amount} - {expense.note}</p>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteExpense(index, i)}>Delete</button>
                </div>
                ))}
              </div>
            </div>
          ))}
          <h4>Total Budget: {totalBudget}</h4>
        </div>
      </div>
      
      {/* Add New Category */}
      <div className="row mt-5">
        <div className="col-md-6">
          <div className="card" style={{ backgroundColor: "#06293f", color: "#dbe8f8" }}>
            <div className="card-body">
              <h5 className="card-title">Add New Category</h5>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category Name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
                <input
                  type="number"
                  className="form-control mt-2"
                  placeholder="Budget"
                  value={newCategory.budget}
                  onChange={(e) => setNewCategory({ ...newCategory, budget: parseFloat(e.target.value) })}
                />
                <button className="btn btn-primary mt-2" onClick={handleAddCategory}>Add Category</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
