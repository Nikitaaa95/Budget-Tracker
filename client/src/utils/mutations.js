import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
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
      token
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
