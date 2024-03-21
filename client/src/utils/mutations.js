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
  mutation addIncome($profileId: ID!, $income: String!) {
    addIncome(profileId: $profileId, income: $income) {
      _id
      name
      income
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
  mutation removeIncome($income: String!) {
    removeIncome(income: $income) {
      _id
      name
      income
    }
  }
`;