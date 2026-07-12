const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");      // to use flash, first we should have installed express-session 

app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

const session_options = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(session_options));
app.use(flash());

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");

    next();
})

app.get("/register", (req,res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    
    if(name != "anonymous"){
        req.flash("success", "user registered successfully");
    }
    else{
        req.flash("error", "user is not registered");
    }

    res.redirect("/hello");  
})

app.get("/hello", (req, res) => {
    res.render("page.ejs", {name: req.session.name});
})

app.get("/reqcount", (req, res) => {

    //we can add many different options in req.sessions and we can also access it in different callbacks. Like
    // req.session.count
    // req.session.name
    // like this.

    if (req.session.count) {
        req.session.count++;
    }
    else {
        req.session.count = 1;
    }
    res.send(`you sent a request ${req.session.count} times`);
})

app.get("/test", (req, res) => {
    res.send("test successfull!");
});

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie", (req, res) => {
//     res.cookie("made-in", "India", { signed: true });
//     res.send("signed cookie sent");
// });

// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies);
//     res.send("verified"); 
// });

// app.get("/getcookies", (req, res) => {
//     res.cookie("greet", "namaste");
//     res.send("cookie sent");
// });

const port = 4000;

app.listen(port, () => {
    console.log("server is listening on port 4000");
});
