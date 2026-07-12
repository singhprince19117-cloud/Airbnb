if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}
// console.log(process.env.SECRET);

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
// const listing = require("./models/listing.js");
// const review = require("./models/review.js");
const methodoverride = require("method-override");
const ejsmate = require("ejs-mate");
// const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
// const { listingschema, reviewSchema } = require("./schema.js");
const ListingsRouter = require("./routes/listing_router.js");
const ReviewsRouter = require("./routes/review_router.js");
const userRouter = require("./routes/user_router.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
// const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.engine('ejs', ejsmate);
app.use(flash());

const session_options = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 *24 * 60 * 60 * 1000,
        maxAge: 7 *24 * 60 * 60 * 1000,   // we dont need both, when we use maxAge, expires becomes redundant because maxAge takes priority over expires
        httpOnly: true,
    }
};

app.use(session(session_options));
app.use(passport.initialize());     //passport uses pbkdf2 hashing algorithm.  Only after session is set.
app.use(passport.session());      // It connects the passport to express-session. 
passport.use(new LocalStrategy(User.authenticate()));  // Configures Passport to use local username-password authentication. uses localstrategy

// use static serialize and deserialize of model for passport session support
// They do NOT handle login or logout directly.
// They handle session persistence.
passport.serializeUser(User.serializeUser());  // Stores the user's id in the session after successful login
passport.deserializeUser(User.deserializeUser());   // Retrieves the user from the database(cookie) using the id stored in the session and attaches it to req.user on every request

const port = 1000;
const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("connected");
    })
    .catch((err) => {
        console.log(err);
    });


app.listen(port, () => {
    console.log("server is listening");
});

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.Delete = req.flash("Delete");
    res.locals.successReview = req.flash("successReview");
    res.locals.DeleteReview = req.flash("DeleteReview");
    res.locals.update = req.flash("update");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;    // this works only after the user loged in by using serialization and deserialization and attaches it to req.user
    // console.log(res.locals.currentUser);
    next();
});

//Router
app.use("/listings", ListingsRouter);
app.use("/listings/:id/reviews", ReviewsRouter)
app.use("/", userRouter);

app.get("/", (req, res) => {
    res.redirect("/listings");
});

// app.get("/demouser", async (req, res) => {
//     let fakeuser = new User({
//         email: "student@gmail.com",
//         username: "prince",
//     });

//     let registeredUser = await User.register(fakeuser, "helloWorld");   // helloWorld is the password.
//     res.send(registeredUser); 
// })

app.all('/*splat', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
    let { statuscode = 500, message = "something went wrong" } = err;
    res.status(statuscode).render("listings/error.ejs", { statuscode, message });
    // res.status(statuscode).send(message);
})