const typeDefs = `
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    income: [Income]
  }

  type Auth {
    token: ID!
    profile: Profile
  }
type Income {
  _id: ID
  label: String!
  amount: Int!
}
  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
  }

  type Expense {
  _id: ID
  label: String!
  amount: Int!
}

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addIncome(label: String!, amount: Int!): Income
    removeIncome(incomeId: ID!): Income
    updateIncome(label: String!, amount: Int!, incomeId: ID!) : Income

    addExpense(label: String!, amount: Int!): Expense
    removeExpense(expenseId: ID!): Expense
    updateExpense(label: String!, amount: Int!, expenseId: ID!) : Expense

    
    removeProfile: Profile
  }
`;

module.exports = typeDefs;
