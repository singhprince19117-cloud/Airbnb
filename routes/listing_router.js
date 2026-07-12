const express = require("express");
// const router = express.Router();
const router = express.Router({ mergeParams: true });
const listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
// const { listingschema} = require("../schema.js");
const passport = require("passport");
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js");
const { index, NewListingForm, ShowListing, CreateListing, EditListingForm, UpdateListing, DestroyListing } = require("../controller/listing.js");
const multer  = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//All Listings
router.get("/", wrapAsync(index));
 
//Create New Listing
router.get("/new", isLoggedIn, NewListingForm);

// router.get("/new", (req, res) => {
//     console.log("isAuthenticated:", req.isAuthenticated());
//     console.log("req.user:", req.user);
//     console.log("session:", req.session);

//     res.send("check terminal");
// });

//Show Route
router.get("/:id", isLoggedIn, wrapAsync(ShowListing));

//Create/Post Route
router.post("/", isLoggedIn, upload.single('listing[image]'), validatelisting, wrapAsync(CreateListing));

// router.post("/", upload.single('listing[image]'), (req, res) => {
//     res.send(req.body);
// });

//Edit Route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(EditListingForm));

//Update Route
router.put("/:id", isLoggedIn, isOwner, upload.single('listing[image]'), validatelisting, wrapAsync(UpdateListing));

//Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(DestroyListing));

module.exports = router;