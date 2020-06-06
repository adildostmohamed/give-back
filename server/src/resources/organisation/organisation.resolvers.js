const { ApolloError } = require("apollo-server");
const organisation = async (parent, args, ctx, info) => {
  try {
    const organisation = await ctx.models.Organisation.findById(args._id);
    if (!organisation) {
      throw new ApolloError(`Could not find organisation with _id ${args._id}`);
    }
    return organisation;
  } catch (error) {
    throw new ApolloError(`Organisation error ${error}`);
  }
};

const organisations = async (parent, args, ctx, info) => {
  try {
    const organisations = await ctx.models.Organisation.find({}).exec();
    return organisations;
  } catch (error) {
    throw new ApolloError(`Organisation error ${error}`);
  }
};

const createOrganisation = async (parent, args, ctx, info) => {
  try {
    const newOrganisation = await ctx.models.Organisation.create(args.input);
    return newOrganisation;
  } catch (error) {
    throw new ApolloError(`Organisation error ${error}`);
  }
};

const updateOrganisation = async (parent, args, ctx, info) => {
  try {
    const updatedOrganisation = await ctx.models.Organisation.findByIdAndUpdate(
      args.input._id,
      args.input,
      {
        new: true,
      }
    );
    return updatedOrganisation;
  } catch (error) {
    throw new ApolloError(`Organisation error ${error}`);
  }
};

const deleteOrganisation = async (parent, args, ctx, info) => {
  try {
    const deletedOrganisation = await ctx.models.Organisation.findByIdAndRemove(
      args._id
    );
    return deletedOrganisation;
  } catch (error) {
    throw new ApolloError(`Organisation error ${error}`);
  }
};

const addCurrentUserToOrganisation = async (_, args, ctx) => {
  try {
    const { user } = ctx;
    const updatedUser = ctx.models.User.findByIdAndUpdate(
      user._id,
      {
        organisation: args.organisationId,
      },
      {
        new: true,
      }
    )
      .populate("organisation")
      .exec();
    return updatedUser;
  } catch (error) {
    throw new ApolloError(error);
  }
};

module.exports = {
  Query: {
    organisation,
    organisations,
  },
  Mutation: {
    createOrganisation,
    updateOrganisation,
    deleteOrganisation,
    addCurrentUserToOrganisation,
  },
  Organisation: {
    listings: (organisation, args, ctx, info) => {
      const listings = ctx.models.Listing.find({
        organisation: organisation._id,
      });
      return listings;
    },
  },
};
