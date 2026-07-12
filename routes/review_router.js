const express = require("express");
// const router = express.Router();
const router = express.Router({ mergeParams: true }); 
// const listing = require("../models/listing.js");
// const review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
const { validatereview, isLoggedIn} = require("../middleware.js");
const { CreateReview, DestroyReview } = require("../controller/review.js");

//Reviews POST route
router.post("/", isLoggedIn, validatereview, wrapAsync(CreateReview));

//delete review route
router.delete("/:reviewId", isLoggedIn, wrapAsync(DestroyReview));

module.exports = router;