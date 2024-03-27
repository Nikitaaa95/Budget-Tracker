import React, { useEffect, useState } from "react";
import "../../App.css";
import { QUERY_ME } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_INCOME, REMOVE_EXPENSE, ADD_EXPENSE } from "../../utils/mutations";


function MainPage() {
  const [income, setIncome] = useState(0);
  const [categories, setCategories] = useState([]);
  const [newIncome, setNewIncome] = useState(0);
  const [newExpense, setNewExpense] = useState({
    amount: 0,
    category: "",
    note: "",
  });
  const [newCategory, setNewCategory] = useState({
    name: "",
    budget: 0,
    color: "#ffffff",
  });

  const { data, loading } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  const [addIncome] = useMutation(ADD_INCOME);
  const [addExpense] = useMutation(ADD_EXPENSE);
  const [deleteExpense] = useMutation(REMOVE_EXPENSE);

  const handleAddIncome = async () => {
    try {
      const { data } = await addIncome({
        variables: {
          amount: parseFloat(newIncome),
        },
      });
      setIncome(prev => prev + data.addIncome.amount);
      setNewIncome(0);
    } catch (error) {
      console.error("Failed to add income:", error);
    }
  };

  const handleDeleteExpense = async (categoryName, expenseId) => {
    try {
      await deleteExpense({
        variables: {
          id: expenseId,
        },
      });
      const updatedCategories = categories.map((category) => {
        if (category.name === categoryName) {
          return {
            ...category,
            expenses: category.expenses.filter((expense) => expense.id !== expenseId),
            budget: category.budget - category.expenses.find((expense) => expense.id === expenseId).amount,
          };
        }
        return category;
      });
      setCategories(updatedCategories);
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const handleAddExpense = async () => {
    try {
      const { data } = await addExpense({
        variables: {
          amount: newExpense.amount,
          label: newExpense.category,
        },
      });
      const updatedCategories = categories.map((category) => {
        if (category.name === newExpense.category) {
          return {
            ...category,
            budget: category.budget + newExpense.amount,
          };
        }
        return category;
      });
      setCategories(updatedCategories);
      setNewExpense({ amount: 0, category: "", note: "" });
    } catch (error) {
      console.error("Failed to add expense:", error);
    }
  };

  const handleAddCategory = () => {
    const color = "#B27A03";
    setCategories([...categories, { ...newCategory, color, budget: 0, expenses: [] }]);
    setNewCategory({ name: "", budget: 0, color: "#ffffff" });
  };

  if (loading) return <p>LOADING...</p>;
  
  return (
    <div className="background container mt-5">
      <div className="row">
        {/* Income section */}
        <div className="col-md-6 d-flex">
          <div
            className="card flex-grow-1"
            style={{ backgroundColor: "#280000", color: "#dbe8f8" }}
          >
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
                <button className="btn btn-primary" onClick={handleAddIncome}>
                  Add
                </button>

              </div>
            </div>
          </div>
        </div>
        
        {/* Expenses section */}
        <div className="col-md-6 d-flex">
          <div
            className="card flex-grow-1"
            style={{ backgroundColor: "#06293f", color: "#dbe8f8" }}
          >
            <div className="card-body d-flex flex-column justify-content-between">
              <h5 className="card-title">Expenses</h5>
              {/* <p className="card-text">Total Expenses: {expenseTotal}</p> */}
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Amount"
                  value={newExpense.amount}
                  onChange={(e) =>
                    setNewExpense({
                      ...newExpense,
                      amount: parseFloat(e.target.value),
                    })
                  }
                />
                <select
                  className="form-select mt-2"
                  aria-label="Category"
                  value={newExpense.category}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, category: e.target.value })
                  }
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
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, note: e.target.value })
                  }
                ></textarea>
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleAddExpense}
                >
                  Add Expense
                </button>
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
      <div
        key={index}
        className="mb-3"
        style={{
          backgroundColor: category.color,
          padding: "10px",
          color: "#fff",
        }}
      >
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
            onChange={(e) =>
              handleChange(index, parseFloat(e.target.value))
            }
          />
          <span className="input-group-text">
            {category.budgetPercentage}% 
          </span>
        </div>
        {/* Render expenses for this category */}
        <ul className="list-group">
          {category.expenses.map((expense, expenseIndex) => (
          <li key={expenseIndex} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            ${expense.amount}
          </div>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDeleteExpense(category.name, expense.id)}
        >Delete</button>
    </li>
  ))}
</ul>

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