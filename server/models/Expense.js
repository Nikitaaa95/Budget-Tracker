// models file

const { Schema, model } = require("mongoose");

const expenseSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
});

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
