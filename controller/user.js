const User = require("../models/user.js");

module.exports.SignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.Signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("/signup");
            }
            req.flash("success", "Welcome to Wanderlust, logged in");
            res.redirect("/listings");
        });
    }
    catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.LoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.Login = async (req, res) => {
    req.flash("success", "Welcome to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.Logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            req.flash("error", "Logout failed. Please try again.");
            return res.redirect("/listings");
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
};