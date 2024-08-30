const mongoose = require("mongoose");

// Define the schema for a real estate listing
const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    regularPrice: {
      type: Number,
      required: [true, "Regular price is required"],
      min: [0, "Regular price must be a positive number"],
    },
    discountPrice: {
      type: Number,
      required: [true, "Discount price is required"],
      min: [0, "Discount price must be a positive number"],
    },
    images: {
      type: [String],
      required: [true, "Images are required"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    bathrooms: {
      type: Number,
      required: [true, "Number of bathrooms is required"],
      min: [0, "Bathrooms must be a positive number or zero"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Number of bedrooms is required"],
      min: [0, "Bedrooms must be a positive number or zero"],
    },
    parking: {
      type: Boolean,
      default: false,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    propertyType: {
      type: String,
      enum: ["House", "Apartment", "Condo", "Townhouse", "Land", "Commercial"],
      required: [true, "Property type is required"],
    },
    listingStatus: {
      type: String,
      enum: ["Active", "Pending", "Sold"],
      default: "Active",
    },
    offer: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: [true, "User is required"],
    },
    dateListed: {
      type: Date,
      default: Date.now,
    },
    dateSold: {
      type: Date,
    },
    transactionType: {
      type: String,
      enum: ["Rent", "Sell"],
      required: [true, "Transaction type is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Listing model
module.exports = mongoose.model("Listing", listingSchema);
