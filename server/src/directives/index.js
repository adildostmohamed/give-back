const AuthorizationDirective = require("./authorization");
const AuthenticationDirective = require("./authentication");
const ProfileTypeDirective = require("./profileType");

const schemaDirectives = {
  authorization: AuthorizationDirective,
  authentication: AuthenticationDirective,
  profileType: ProfileTypeDirective,
};

module.exports = schemaDirectives;
