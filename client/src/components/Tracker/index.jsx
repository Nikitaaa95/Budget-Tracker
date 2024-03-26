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
    { name: "Housing", budget: 0, color: "#b27a03" },
    { name: "Transportation", budget: 0, color: "#689fbd" },
    { name: "Food", budget: 0, color: "#b27a03" },
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
    console.log(income);
  }, []);

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
        amount: parseFloat(newIncome), 
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
    setCategories([...categories, newCategory]);
    setNewCategory({ name: "", budget: 0, color: "#ffffff" });
  };

  if (loading) return <p>LOADING...</p>;

  return (
    <div className="background container mt-5">
      <div className="row">
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
                  {((category.budget / income) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
          <h4>Total Budget: {totalBudget}</h4>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
          <div
            className="card"
            style={{ backgroundColor: "#06293f", color: "#dbe8f8" }}
          >
            <div className="card-body">
              <h5 className="card-title">Add New Category</h5>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category Name"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="form-control mt-2"
                  placeholder="Budget"
                  value={newCategory.budget}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      budget: parseFloat(e.target.value),
                    })
                  }
                />
                <input
                  type="color"
                  className="form-control mt-2"
                  value={newCategory.color}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, color: e.target.value })
                  }
                />
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleAddCategory}
                >
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;

