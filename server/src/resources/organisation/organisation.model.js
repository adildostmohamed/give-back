const mongoose = require("mongoose");

const organisationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Organisation must have a name"],
    },
    contactEmail: {
      type: String,
      required: [true, "Organisation must have a contact email"],
    },
  },
  { timestamps: true }
);

const Organisation = mongoose.model("organisation", organisationSchema);

module.exports = Organisation;
