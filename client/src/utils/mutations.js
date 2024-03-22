import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_INCOME = gql`
mutation AddIncome($label: String!, $amount: Int!) {
  addIncome(label: $label, amount: $amount) {
    _id
    amount
    label
  }
}
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_INCOME = gql`
mutation RemoveIncome($incomeId: ID!) {
  removeIncome(incomeId: $incomeId) {
    _id
    amount
    label
  }
}
`;

export const UPDATE_INCOME = gql`
mutation UpdateIncome($label: String!, $amount: Int!, $incomeId: ID!) {
  updateIncome(label: $label, amount: $amount, incomeId: $incomeId) {
    _id
    amount
    label
  }
}
`;

export const ADD_EXPENSE = gql`
mutation AddExpense($label: String!, $amount: Int!) {
  addExpense(label: $label, amount: $amount) {
    _id
    amount
    label
  }
}
`;

export const UPDATE_EXPENSE = gql`
mutation UpdateExpense($label: String!, $amount: Int!, $expenseId: ID!) {
  updateExpense(label: $label, amount: $amount, expenseId: $expenseId) {
    _id
    amount
    label
  }
}
`;

export const REMOVE_EXPENSE = gql`
mutation RemoveExpense($expenseId: ID!) {
  removeExpense(expenseId: $expenseId) {
    _id
    amount
    label
  }
}`;

export const REMOVE_PROFILE = gql`
mutation RemoveProfile {
  removeProfile {
    _id
    name
  }
}`;

