const listing = require("../models/listing.js");
const review = require("../models/review.js");

module.exports.CreateReview = async (req, res) => {
    let { id } = req.params;
    let Listing = await listing.findById(id);
    let newReview = new review(req.body.review);

    newReview.author = req.user._id;

    Listing.reviews.push(newReview);

    await newReview.save();
    await Listing.save();

    req.flash("successReview", "Review Added");

    res.redirect(`/listings/${Listing._id}`);
};

module.exports.DestroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await review.findByIdAndDelete(reviewId);

    req.flash("DeleteReview", "Review Deleted");

    res.redirect(`/listings/${id}`);
};