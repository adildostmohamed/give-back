const { AuthenticationError, ApolloError } = require("apollo-server");
const bcrypt = require("bcrypt");

const currentUser = (parent, args, ctx, info) => {
  return ctx.user;
};

const updateCurrentUser = async (parent, args, ctx, info) => {
  try {
    const updatedUser = await ctx.models.User.findByIdAndUpdate(
      ctx.user._id,
      args.input,
      {
        new: true,
      }
    )
      .populate("organisation")
      .populate("volunteer")
      .exec();
    return updatedUser;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const deleteCurrentUser = async (_, args, ctx) => {
  try {
    const deletedUser = await ctx.models.User.findByIdAndRemove(ctx.user._id)
      .populate("organisation")
      .populate("volunteer")
      .exec();
    return deletedUser;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const users = async (_, __, ctx) => {
  try {
    const users = await ctx.models.User.find({})
      .populate("organisation")
      .populate("volunteer")
      .exec();
    return users;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const user = async (_, args, ctx) => {
  try {
    const user = await ctx.models.User.findById(args._id)
      .populate("organisation")
      .populate("volunteer")
      .exec();
    return user;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const adminCreateUser = async (_, args, ctx) => {
  try {
    let newUser = await ctx.models.User.create(args.input);
    newUser = await newUser
      .populate("organisation")
      .populate("volunteer")
      .execPopulate();
    return newUser;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const adminUpdateUser = async (_, args, ctx) => {
  try {
    const updatedUser = await ctx.models.User.findByIdAndUpdate(
      args.input._id,
      args.input,
      {
        new: true,
      }
    )
      .populate("organisation")
      .populate("volunteer")
      .exec();
    return updatedUser;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const adminDeleteUser = async (_, args, ctx) => {
  try {
    const deletedUser = await ctx.models.User.findByIdAndRemove(args._id)
      .populate("organisation")
      .populate("volunteer")
      .exec();
    return deletedUser;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const signup = async (_, args, ctx) => {
  try {
    const existingUser = await ctx.models.User.findOne({
      email: args.input.email,
    });
    if (existingUser) {
      throw new AuthenticationError("User already exists, sign in instead");
    }
    let user = await ctx.models.User.create(args.input);
    user = await user
      .populate("organisation")
      .populate("volunteer")
      .execPopulate();
    const token = ctx.createUserToken(user);
    return { user, token };
  } catch (error) {
    throw new ApolloError(error);
  }
};

const login = async (_, args, ctx) => {
  try {
    const user = await ctx.models.User.findOne({
      email: args.input.email,
    })
      .populate("organisation")
      .populate("volunteer")
      .exec();
    if (!user) {
      throw new AuthenticationError("Wrong email and password combination");
    }
    try {
      const isPasswordMatch = await bcrypt.compare(
        args.input.password,
        user.password
      );
      if (!isPasswordMatch) {
        throw new AuthenticationError("Wrong email and password combination");
      }
      const token = ctx.createUserToken(user);
      return { user, token };
    } catch (e) {
      throw new AuthenticationError("Wrong email and password combination");
    }
  } catch (error) {
    throw new AuthenticationError(error);
  }
};

module.exports = {
  Query: {
    currentUser,
    user,
    users,
  },
  Mutation: {
    adminCreateUser,
    adminUpdateUser,
    adminDeleteUser,
    signup,
    login,
    updateCurrentUser,
    deleteCurrentUser,
  },
};
