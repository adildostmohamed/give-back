const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Listing must have a title"],
    },
    description: {
      type: String,
      required: [true, "Listing must have a description"],
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organisation",
      required: [true, "Listing must have an organisation"],
    },
    category: [
      {
        type: String,
        enum: ["DATA", "DESIGN", "TECHNOLOGY", "CONSULTING", "ADMIN", "OTHER"],
        required: [true, "Listing must have a category"],
      },
    ],
    status: {
      type: String,
      enum: ["OPEN", "FILLED", "COMPLETED", "PAUSED", "REMOVED"],
      required: [true, "Listing must have a status"],
    },
  },
  { timestamps: true }
);

listingSchema.virtual("id").get(function () {
  return this._id.toString();
});

const Listing = mongoose.model("listing", listingSchema);

module.exports = Listing;
