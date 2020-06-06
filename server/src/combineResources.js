const merge = require("lodash.merge");
// import custom scalar definitions
const date = require("./scalars/date");
const objectId = require("./scalars/objectId");
// import app resouces to construct gql server
const user = require("./resources/user");
const organisation = require("./resources/organisation");
const listing = require("./resources/listing");
const volunteer = require("./resources/volunteer");

// construct typedefs from resources
const typeDefs = [
  date.typeDefs,
  objectId.typeDefs,
  user.typeDefs,
  organisation.typeDefs,
  listing.typeDefs,
  volunteer.typeDefs,
].join(" ");

// combine resolvers from all resources
const resolvers = merge(
  date.resolvers,
  objectId.resolvers,
  user.resolvers,
  organisation.resolvers,
  listing.resolvers,
  volunteer.resolvers
);

// combine models from all resources
const models = {
  User: user.model,
  Organisation: organisation.model,
  Listing: listing.model,
  Volunteer: volunteer.model,
};

module.exports = {
  typeDefs,
  resolvers,
  models,
};
