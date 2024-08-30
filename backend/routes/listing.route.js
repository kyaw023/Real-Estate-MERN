const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listing.controller");

router.post("/create", listingController.createListing);
router.get("/read", listingController.getListing);
router.get("/read/:id", listingController.getListingById);
router.get("/read/username/:id", listingController.getListingByUsername);
router.patch("/update/:id/:userID", listingController.updateListing);
router.delete("/delete/:id/:userID", listingController.deleteListing);
router.delete(
  "/delete/image/:id/:userID/:index",
  listingController.deleteImages
);

router.get("/search", listingController.searchListing);

module.exports = router;
