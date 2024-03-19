import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  //categories
  const [categories, setCategories] = useState([
    { name: 'Housing', budget: 0 },
    { name: 'Transportation', budget: 0 },
    { name: 'Food', budget: 0 },
  ]);

  const handleChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index].budget = value;
    setCategories(newCategories);
  };

  const totalBudget = categories.reduce((acc, curr) => acc + curr.budget, 0);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card bg-primary text-white">
            <div className="card-body">
              <h5 className="card-title">Income</h5>
              <p className="card-text">Total Income: {income}</p>
              <input
                type="number"
                className="form-control"
                placeholder="Enter income"
                onChange={(e) => setIncome(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card bg-danger text-white">
            <div className="card-body">
              <h5 className="card-title">Expenses</h5>
              <p className="card-text">Total Expenses: {expenses}</p>
              <input
                type="number"
                className="form-control"
                placeholder="Enter expenses"
                onChange={(e) => setExpenses(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <h2>Budget Categories</h2>
          {categories.map((category, index) => (
            <div key={index} className="mb-3">
              <label htmlFor={`category-${index}`} className="form-label">{category.name}</label>
              <input
                id={`category-${index}`}
                type="number"
                className="form-control"
                placeholder={`Enter budget for ${category.name}`}
                value={category.budget}
                onChange={(e) => handleChange(index, parseFloat(e.target.value))}
              />
            </div>
          ))}
          <h4>Total Budget: {totalBudget}</h4>
        </div>
      </div>
    </div>
  );
};

export default App;
