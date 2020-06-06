const fs = require("fs");
const path = require("path");

const dateResolvers = require("./date.resolvers");
const dateTypeDefs = fs.readFileSync(
  path.join(__dirname, "./", "date.graphql"),
  "utf-8"
);

module.exports = {
  resolvers: dateResolvers,
  typeDefs: dateTypeDefs,
};
