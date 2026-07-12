const listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.index = async (req, res) => {
    let alllistings = await listing.find({});
    res.render("listings/index.ejs", { alllistings });
};

module.exports.NewListingForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.ShowListing = async (req, res) => {
    let { id } = req.params;
    const show_listing = await listing.findById(id).populate("reviews").populate("owner");
    if (!show_listing) {
        req.flash("error", "Listing does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { show_listing });
};

module.exports.CreateListing = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;

    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data for listing");
    }

    let newlisting = new listing(req.body.listing);
    newlisting.owner = req.user._id;
    newlisting.image = { url, filename };
    await newlisting.save();
    req.flash("success", "New Listing is created");
    res.redirect("/listings");
};

module.exports.EditListingForm = async (req, res) => {
    let { id } = req.params;
    let Listing = await listing.findById(id);
    if (!Listing) {
        req.flash("error", "Listing does not exist");
        return res.redirect("/listings");
    }

    let originalUrl = Listing.image.url;
    originalUrl = originalUrl.replace("/upload", "/upload/h_300,w_300");
    res.render("listings/edit.ejs", { Listing, originalUrl });
};

module.exports.UpdateListing = async (req, res) => {
    let { id } = req.params;
    let Listing = await listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file != "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;

        Listing.image = { url, filename };

        await Listing.save();
    }

    req.flash("update", "List Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.DestroyListing = async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("Delete", "Listing Deleted Successfully");
    res.redirect("/listings");
};