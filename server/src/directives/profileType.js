const { SchemaDirectiveVisitor, ForbiddenError } = require("apollo-server");
const { defaultFieldResolver } = require("graphql");

class ProfileTypeDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
    type._requiredProfileType = this.args.profileType;
  }
  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
    field._requiredProfileType = this.args.profileType;
  }

  ensureFieldsWrapped(objectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._profileTypeFieldsWrapped) return;
    objectType._profileTypeFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function (...args) {
        // Get the required profileType from the field first, falling back
        // to the objectType if no profileType is required by the field:
        const requiredProfileType =
          field._requiredProfileType || objectType._requiredProfileType;

        if (!requiredProfileType) {
          return resolve.apply(this, args);
        }

        const ctx = args[2];
        const user = ctx.user;
        if (user.profileType === "ADMIN") {
          return resolve.apply(this, args);
        }
        if (user.profileType !== requiredProfileType) {
          throw new ForbiddenError("Wrong profile type");
        }

        return resolve.apply(this, args);
      };
    });
  }
}

module.exports = ProfileTypeDirective;
