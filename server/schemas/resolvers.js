const { Profile, Income, Expense } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw AuthenticationError;
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(profile);
      return { token, profile };
    },

    //income resolvers
    addIncome: async (parent, { label, amount }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        const income = await Income.create({
          label,
          amount,
        });

        await Profile.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { income: income },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return income;
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw AuthenticationError;
    },

    // remove an income line
    removeIncome: async (parent, { incomeId }, context) => {
      if (context.user) {
        const income = await Income.findOneAndDelete({
          _id: incomeId,
        });

        await Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { income: income._id } }
        );
        return income;
      }
      throw AuthenticationError;
    },

    updateIncome: async (parent, { incomeId, label, amount }, context) => {
      //checks if user is logged in
      if (context.user) {
        try {
          // find income doc using ID
          const income = await Income.findById(incomeId);

          // update the income with new data
          income.label = label;
          income.amount = amount;
          await income.save();

          return income;
        } catch (error) {
          throw new Error(error.message);
        }
      } else {
        //If user is not logged in throw auth err
        throw new AuthenticationError(
          "You must be logged in to perform this action"
        );
      }
    },

    // expense resolvers

    addExpense: async (parent, { label, amount, note }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        const expense = await Expense.create({
          label,
          amount,
          note,
        });

        await Profile.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { expense: expense },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return expense;
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw AuthenticationError;
    },

    removeExpense: async (parent, { expenseId }, context) => {
      if (context.user) {
        const expense = await Expense.findOneAndDelete({
          _id: expenseId,
        });

        await Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { expense: expense._id } }
        );
        return expense;
      }
      throw AuthenticationError;
    },

    updateExpense: async (parent, { expenseId, label, amount }, context) => {
      //checks if user is logged in
      if (context.user) {
        try {
          // find income doc using ID
          const expense = await Expense.findById(expenseId);

          // update the income with new data
          expense.label = label;
          expense.amount = amount;
          expense.note = note;
          await expense.save();

          return expense;
        } catch (error) {
          throw new Error(error.message);
        }
      } else {
        //If user is not logged in throw auth err
        throw new AuthenticationError(
          "You must be logged in to perform this action"
        );
      }
    },

    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw AuthenticationError;
    },
  },
};
module.exports = resolvers;
