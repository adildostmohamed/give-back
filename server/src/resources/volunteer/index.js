const fs = require("fs");
const path = require("path");

const model = require("./volunteer.model");
const resolvers = require("./volunteer.resolvers");
const typeDefs = fs.readFileSync(
  path.join(__dirname, "./", "volunteer.graphql"),
  "utf-8"
);

module.exports = {
  model,
  resolvers,
  typeDefs,
};
