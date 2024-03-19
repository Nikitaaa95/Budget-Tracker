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
  const [newCategory, setNewCategory] = useState({ name: "", budget: 0, color: "#ffffff" });

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

  const handleAddExpense = () =>
