import React, { useEffect, useState, useRef } from "react";
import "../../App.css";
import { QUERY_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { ADD_INCOME } from "../../utils/mutations";

import { ADD_EXPENSE } from "../../utils/mutations";


function MainPage() {
  
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([
    // { name: "Housing", budget: 0, color: "#b27a03" },
    // { name: "Transportation", budget: 0, color: "#689fbd" },
    // { name: "Food", budget: 0, color: "#b27a03" },
    // Add more categories as needed
  ]);
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


  const handleChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index].budget = value;
    setCategories(newCategories);
  };


  useEffect(() => {
    console.log("use effect");
    setIncome(userData.income.reduce((acc, curr) => acc + curr.amount, 0));
    const uniqueLabels = [...new Set(userData.expense.map((curr) => curr.label))];
    const updatedCategories = uniqueLabels.map((label) => {
      const expensesForCategory = userData.expense.filter((expense) => expense.label === label);
      return {
        name: label,
        budget: expensesForCategory.reduce((acc, curr) => acc + curr.amount, 0),
        color: "#B27A03",
        expenses: expensesForCategory,
      };
    });
    setCategories(updatedCategories);
  }, [userData]); // Add userData as a dependency
  // Add userData as a dependency

  useEffect(() => {
    categories.forEach((category, index) => {
      const newCategories = [...categories];
      newCategories[index].budgetPercentage = ((category.budget / income) * 100).toFixed(2);
      setCategories(newCategories);
    });
  }, [income]);
  // For each loop that we keep appending to array if it doesnt exist 

  const totalBudget = categories.reduce((acc, curr) => acc + curr.budget, 0);
  const expenseTotal = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const handleAddIncome = async () => {
    const {data} = await addIncome({
      variables: {
        amount: parseFloat(newIncome),
      },  
    });

    console.log(data)
    setIncome(prev => prev + data.addIncome.amount)
    setNewIncome(0)

  };

  const handleAddExpense = async () => {
    const {data} = await addExpense({
      variables: {
        amount: newExpense.amount, 
        label: newExpense.category
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
      setExpenses([...expenses, newExpense]);
      setNewExpense({ amount: 0, category: "", note: "" });
    };
    //   const updatedCategories = categories.map((category) => {
    //     if (category.name === newExpense.category) {
    //       return {
    //         ...category,
    //         budget: category.budget + newExpense.amount,
    //         expenses: [...category.expenses, newExpense], // Add expense to category
    //       };
    //     }
    //     return category;
    //   });
    //   setCategories(updatedCategories);
    //   setExpenses([...expenses, newExpense]);
    //   setNewExpense({ amount: 0, category: "", note: "" });
    // };

    const handleAddCategory = () => {
      const color = "#B27A03"; // Set the color to #B27A03
      setCategories([...categories, { ...newCategory, color, budget: 0, expenses: [] }]);
      setNewCategory({ name: "", budget: 0 });
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
              <p className="card-text">Total Expenses: {expenseTotal}</p>
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
        <ul>
          {category.expenses.map((expense, expenseIndex) => (
          <li key={expenseIndex}>
          ${expense.amount}
          <button
            className="btn btn-danger btn-sm ms-2"
            onClick={() => handleDeleteExpense(category.name, expense.id)}
          > Delete </button>
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

