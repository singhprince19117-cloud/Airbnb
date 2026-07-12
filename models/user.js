const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    // passport-local-mongoose will automatically add a username, hash and salt field to store the username.
});

userSchema.plugin(passportLocalMongoose.default);   // without default, passportLocalMongoose returns an object but plugin needs a function

module.exports = mongoose.model("User", userSchema);