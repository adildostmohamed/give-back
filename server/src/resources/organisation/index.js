const fs = require("fs");
const path = require("path");

const organisationModel = require("./organisation.model");
const organisationResolvers = require("./organisation.resolvers");
const organisationTypeDefs = fs.readFileSync(
  path.join(__dirname, "./", "organisation.graphql"),
  "utf-8"
);

module.exports = {
  model: organisationModel,
  resolvers: organisationResolvers,
  typeDefs: organisationTypeDefs,
};
