const listing = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError");
const { listingschema, reviewSchema } = require("./schema.js");

let isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "log in first");
        console.log(req.user);
        return res.redirect("/login");
        // res.send(req.user);
    }

    next();
}

// when we log in, passport automatically clears out the req.session to a new session, therefore, req.session.redirectUrl will become undefined
// so we need to use a res.locals, and to use it we will use middleware.

let SaveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    };
    next();
};

let isOwner = async (req, res, next) => {
    let { id } = req.params;
    let Listing = await listing.findById(id);
    if (!Listing.owner._id.equals(req.user.id)) {
        req.flash("error", "You are not the Owner, Be in Limit")
        return res.redirect(`/listings/${id}`);
    };

    next();
}

let validatelisting = (req, res, next) => {
    let { error } = listingschema.validate(req.body);   //validating if req.body has required constraints.
    if (error) {

        //error has a 'detail' object 
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else{
        next();
    }
};

let validatereview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);

    if(error) {

        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }

    else{
        next();
    }
};

module.exports = { isLoggedIn, SaveRedirectUrl, isOwner, validatelisting, validatereview};