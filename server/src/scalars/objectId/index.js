const fs = require("fs");
const path = require("path");

const resolvers = require("./objectId.resolvers");
const typeDefs = fs.readFileSync(
  path.join(__dirname, "./", "objectId.graphql"),
  "utf-8"
);

module.exports = {
  resolvers,
  typeDefs,
};
