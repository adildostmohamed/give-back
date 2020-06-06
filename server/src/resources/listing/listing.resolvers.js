const { ApolloError } = require("apollo-server");

const listing = async (parent, args, ctx, info) => {
  try {
    const listing = await ctx.models.Listing.findById(args._id)
      .populate("organisation")
      .exec();
    if (!listing)
      return new ApolloError(`Could not find listing with _id ${args._id}`);
    return listing;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const listings = async (parent, args, ctx, info) => {
  try {
    const listings = await ctx.models.Listing.find({})
      .sort({ createdAt: -1 })
      .populate("organisation")
      .exec();
    return listings;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const createListing = async (parent, args, ctx, info) => {
  try {
    const { user } = ctx;
    const input = { ...args.input, organisation: user.organisation._id };
    let newListing = await ctx.models.Listing.create(input);
    newListing = await newListing.populate("organisation").execPopulate();
    return newListing;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const updateListing = async (parent, args, ctx, info) => {
  try {
    const updatedListing = await ctx.models.Listing.findByIdAndUpdate(
      args.input._id,
      args.input,
      {
        new: true,
      }
    )
      .populate("organisation")
      .exec();
    return updatedListing;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const deleteListing = async (parent, args, ctx, info) => {
  try {
    const deletedListing = await ctx.models.Listing.findByIdAndRemove(args._id)
      .populate("organisation")
      .exec();
    return deletedListing;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const constructFilters = (filterCategories, filters) => {
  if (filters) {
    // create the query outer $and condition
    let filter = { $and: [] };
    // for each filter category that is available for this resource
    // construct the $or conditions for it
    // and push it back to the outer $and
    filterCategories.forEach((filterCategory) => {
      // get the current set of passed in filter options
      const currentFilterOptions = filters[filterCategory];
      // create the outer $or wrapper for this category in case there are multiple
      let currentFilter = { $or: [] };

      if (!currentFilterOptions || currentFilterOptions.length === 0) {
        return;
      } else {
        // for each specified filter option
        // add it to the $or wrapper
        currentFilterOptions.forEach((filterOption) => {
          const filterObject = Object.assign(
            {},
            { [filterCategory]: filterOption }
          );
          currentFilter.$or.push(filterObject);
        });
        filter.$and.push(currentFilter);
      }
    });
    return filter.$and.length > 0 ? filter : null;
  } else {
    return null;
  }
};

const listingsForUserOrg = async (parent, args, ctx, info) => {
  try {
    const { user } = ctx;
    const constructedFilters = constructFilters(
      ["category", "status"],
      args.filter
    );
    const otherFilters = {
      organisation: user.organisation._id,
    };
    const query = Object.assign({}, constructedFilters, otherFilters);
    const listings = await ctx.models.Listing.find(query)
      .sort({ createdAt: -1 })
      .populate("organisation")
      .exec();
    return listings;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const adminDeleteAllListings = async (parent, args, ctx, info) => {
  try {
    await ctx.models.Listing.deleteMany({}).exec();
    return [];
  } catch (error) {
    throw new ApolloError(error);
  }
};

module.exports = {
  Query: {
    listing,
    listings,
    listingsForUserOrg,
  },
  Mutation: {
    createListing,
    updateListing,
    deleteListing,
    adminDeleteAllListings,
  },
};
