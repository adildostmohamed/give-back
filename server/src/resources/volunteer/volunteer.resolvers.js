const { AuthenticationError, ApolloError } = require("apollo-server");

const volunteer = async (parent, args, ctx, info) => {
  try {
    const volunteer = await ctx.models.Volunteer.findById(args._id, ctx);
    if (!volunteer)
      throw new ApolloError("Could not find volunteer by that _id");
    return volunteer;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const volunteers = async (parent, args, ctx, info) => {
  try {
    const volunteers = await ctx.models.Volunteer.find()
      .populate("user")
      .populate("listing")
      .exec();
    return volunteers;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const currentUserVolunteer = async (parent, args, ctx, info) => {
  try {
    const { user } = ctx;
    const volunteer = await ctx.models.Volunteer.findById(
      user.volunteer._id
    ).populate("user");
    if (!volunteer)
      throw new ApolloError("Could not find volunteer by that _id");
    return volunteer;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const createVolunteer = async (parent, args, ctx, info) => {
  try {
    const newVolunteer = await ctx.models.Volunteer.create(args.input);
    return newVolunteer;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const updateVolunteer = async (parent, args, ctx, info) => {
  try {
    const updatedVolunteer = await ctx.models.Volunteer.findByIdAndUpdate(
      args.input._id,
      args.input,
      {
        new: true,
      }
    );
    return updatedVolunteer;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const deleteVolunteer = async (parent, args, ctx, info) => {
  try {
    const deletedVolunteer = await ctx.models.Volunteer.findByIdAndRemove(
      args._id
    ).exec();
    return deletedVolunteer;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const createVolunteerForCurrentUser = async (parent, args, ctx, info) => {
  try {
    const { user } = ctx;
    const input = Object.assign({}, args.input, { user: user._id });
    let newVolunteer = await ctx.models.Volunteer.create(input);
    await ctx.models.User.findByIdAndUpdate(user._id, {
      volunteer: newVolunteer._id,
    });
    return newVolunteer;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const volunteerViewListing = async (parent, args, ctx, info) => {
  try {
    const { user } = ctx;
    let volunteer = await ctx.models.Volunteer.findById(user.volunteer._id);
    const isAlreadyViewed = volunteer.viewedListings.some((listing) =>
      listing.equals(args.listingId)
    );
    if (!isAlreadyViewed) {
      await volunteer.viewedListings.push(args.listingId);
      await volunteer.save();
    }
    return volunteer;
  } catch (error) {
    throw new ApolloError(error);
  }
};

const volunteerShortlistListing = async (parent, args, ctx, info) => {
  try {
    const { user } = ctx;
    let volunteer = await ctx.models.Volunteer.findById(user.volunteer._id);
    const isAlreadyShortlisted = volunteer.shortlistedListings.some((listing) =>
      listing.equals(args.listingId)
    );
    if (!isAlreadyShortlisted) {
      await volunteer.shortlistedListings.push(args.listingId);
      await volunteer.save();
    }
    return volunteer;
  } catch (error) {
    throw new ApolloError(error);
  }
};

module.exports = {
  Query: {
    volunteer,
    volunteers,
    currentUserVolunteer,
  },
  Mutation: {
    createVolunteer,
    updateVolunteer,
    deleteVolunteer,
    createVolunteerForCurrentUser,
    volunteerViewListing,
    volunteerShortlistListing,
  },
  Volunteer: {
    user: async (volunteer, args, ctx, info) => {
      const volunteerProfile = await ctx.models.Volunteer.findById(
        volunteer._id
      ).populate("user");
      return volunteerProfile.user;
    },
    shortlistedListings: async (volunteer, args, ctx, info) => {
      const volunteerProfile = await ctx.models.Volunteer.findById(
        volunteer._id
      ).populate({
        path: "shortlistedListings",
        model: "listing",
      });
      return volunteerProfile.shortlistedListings;
    },
    viewedListings: async (volunteer, args, ctx, info) => {
      const volunteerProfile = await ctx.models.Volunteer.findById(
        volunteer._id
      ).populate({
        path: "viewedListings",
        model: "listing",
      });
      return volunteerProfile.viewedListings;
    },
    contactedListings: async (volunteer, args, ctx, info) => {
      const volunteerProfile = await ctx.models.Volunteer.findById(
        volunteer._id
      ).populate({
        path: "contactedListings",
        model: "listing",
      });
      return volunteerProfile.contactedListings;
    },
    activeListings: async (volunteer, args, ctx, info) => {
      const volunteerProfile = await ctx.models.Volunteer.findById(
        volunteer._id
      ).populate({
        path: "activeListings",
        model: "listing",
      });
      return volunteerProfile.activeListings;
    },
    completedListings: async (volunteer, args, ctx, info) => {
      const volunteerProfile = await ctx.models.Volunteer.findById(
        volunteer._id
      ).populate({
        path: "completedListings",
        model: "listing",
      });
      return volunteerProfile.completedListings;
    },
  },
};
