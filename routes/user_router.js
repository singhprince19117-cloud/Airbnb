const express = require("express");
const router = express.Router();
// const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
// const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const { isLoggedIn } = require("../middleware.js");
const { SaveRedirectUrl } = require("../middleware.js");
const { SignupForm, Signup, LoginForm, Login, Logout} = require("../controller/user.js");

//Router.route Method

// router.route("/signup")
//     .get(SignupForm)
//     .post(wrapAsync(Signup));

// router.route("/login")
//     .get(LoginForm)
//     .post(SaveRedirectUrl,
//             passport.authenticate("local", { failureRedirect: '/login', failureFlash: "Invalid username or password" }),
//             Login);

//signup form
router.get("/signup", SignupForm);

//signup route
router.post("/signup", wrapAsync(Signup));

//login form
router.get("/login", LoginForm);

// passport.authenticate authenticates the user, checks that is he already present in database or not, for logging in. on failure it redirects to "/login"
router.post("/login",
            SaveRedirectUrl,
            passport.authenticate("local", { failureRedirect: '/login', failureFlash: "Invalid username or password" }),
            Login);

router.get("/logout", isLoggedIn, Logout);

module.exports = router;