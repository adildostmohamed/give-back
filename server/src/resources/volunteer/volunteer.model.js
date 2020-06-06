const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    interests: [{ type: String }],
    viewedListings: [{ type: mongoose.Schema.Types.ObjectId, ref: "listing" }],
    shortlistedListings: [
      { type: mongoose.Schema.Types.ObjectId, ref: "listing" },
    ],
    contactedListings: [
      { type: mongoose.Schema.Types.ObjectId, ref: "listing" },
    ],
    activeListings: [{ type: mongoose.Schema.Types.ObjectId, ref: "listing" }],
    completedListings: [
      { type: mongoose.Schema.Types.ObjectId, ref: "listing" },
    ],
  },
  { timestamps: true }
);

const Volunteer = mongoose.model("volunteer", volunteerSchema);

module.exports = Volunteer;
