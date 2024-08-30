const { default: mongoose } = require("mongoose");
const Listing = require("../models/listing.model");
const User = require("../models/user.model");

const listingController = {
  createListing: async (req, res) => {
    try {
      const listing = await Listing.create(req.body);

      res.status(201).json({
        success: true,
        data: listing,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getListing: async (req, res) => {
    try {
      const limit = Math.max(parseInt(req.query.limit) || 4, 1); // Default to 5, minimum 1
      const page = Math.max(parseInt(req.query.page) || 1, 1); // Default to 1, minimum 1

      // Fetch the listings with pagination and lean mode for better performance
      const listings = await Listing.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      // Count total documents for pagination
      const totalListings = await Listing.countDocuments();
      const totalPages = Math.ceil(totalListings / limit);

      const pagination = {
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        currentPage: page,
        totalPages,
        paginationLinks: Array.from({ length: totalPages }, (_, i) => i + 1),
      };

      res.status(200).json({
        success: true,
        data: listings,
        pagination,
      });
    } catch (error) {
      console.error("Error fetching listings:", error); // Use logging tool here
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching listings",
      });
    }
  },

  getListingById: async (req, res) => {
    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: "No listing with that id",
      });
    }

    // check if listing exists
    const listing = await Listing.findById(req.params.id).populate("user");

    res.status(200).json({
      success: true,
      data: listing,
    });
  },

  getListingByUsername: async (req, res) => {
    // check if id is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({
        success: false,
        message: "No User with that id",
      });
    }

    // check if user exists
    const user = await User.findById(req.params.id);

    // if user does not exist
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No User Found!",
      });
    }

    console.log(user);

    // check if user is authorized
    if (req.params.id !== user?._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // get listings by user
    const listings = await Listing.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: listings,
    });
  },

  updateListing: async (req, res) => {
    try {
      // check if id is valid
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({
          success: false,
          message: "No listing with that id",
        });
      }

      // check if user exists
      const user = await User.findById(req.params.userID);

      // check if user is authorized
      if (req.params.userID !== user?._id.toString()) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      // check if listing exists
      const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!listing) {
        return res.status(404).json({
          success: false,
          message: "No listing Found!",
        });
      }

      res.status(200).json({
        success: true,
        data: listing,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  deleteListing: async (req, res) => {
    try {
      // check if id is valid
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({
          success: false,
          message: "No listing with that id",
        });
      }

      // check if user is authorized
      if (req.params.userID !== req.user.id) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      // check if listing exists
      const listing = await Listing.findByIdAndDelete(req.params.id);

      // if listing does not exist
      if (!listing) {
        return res.status(404).json({
          success: false,
          message: "No listing Found!",
        });
      }

      res.status(200).json({
        success: true,
        message: "listing deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  deleteImages: async (req, res) => {
    const { id, userID, index: imageID } = req.params;

    try {
      // check if id is valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
          success: false,
          message: "No listing with that id",
        });
      }

      // check if user is authorized
      if (userID !== req.user.id) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      // check if listing exists
      const listing = await Listing.findById(id);

      // if listing does not exist
      if (!listing) {
        return res.status(404).json({
          success: false,
          message: "No listing Found!",
        });
      }

      // Ensure imageID is a number
      const imageIndex = parseInt(imageID, 10);

      // Check if image exists
      if (imageIndex < 0 || imageIndex >= listing.images.length) {
        return res.status(404).json({
          success: false,
          message: "No image Found!",
        });
      }

      // Delete image from listing
      listing.images = listing.images.filter(
        (_, index) => index !== imageIndex
      );
      await listing.save();

      console.log(listing.images);

      res
        .status(200)
        .json({ success: true, message: "Image deleted from listing" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  searchListing: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 6;

      const startIndex = parseInt(req.query.startIndex) || 0;

      let offer = req.query.offer;

      if (offer === undefined || offer === "false") {
        offer = { $in: [false, true] };
      }

      let parking = req.query.parking;

      if (parking === undefined || parking === "false") {
        parking = { $in: [false, true] };
      }

      let furnished = req.query.furnished;

      if (furnished === undefined || furnished === "false") {
        furnished = { $in: [false, true] };
      }

      let transactionType = req.query.transactionType;

      if (transactionType === undefined || transactionType === "all") {
        transactionType = { $in: ["Sell", "Rent"] }; // $in: ["sell", "rent"] };
      }

      const searchTerm = req.query.searchTerm || "";

      const sort = req.query.sort || "createdAt";

      const order = req.query.order || "desc";

      const query = {
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { address: { $regex: searchTerm, $options: "i" } },
          { description: { $regex: searchTerm, $options: "i" } },
        ],
        offer,
        parking,
        furnished,
        transactionType,
      };

      const listings = await Listing.find(query)
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);

      return res.status(200).json({ success: true, data: listings });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = listingController;
