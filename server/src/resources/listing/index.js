const fs = require("fs");
const path = require("path");

const listingModel = require("./listing.model");
const listingResolvers = require("./listing.resolvers");
const listingTypeDefs = fs.readFileSync(
  path.join(__dirname, "./", "listing.graphql"),
  "utf-8"
);

module.exports = {
  model: listingModel,
  resolvers: listingResolvers,
  typeDefs: listingTypeDefs,
};
