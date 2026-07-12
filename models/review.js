const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const { Schema } = mongoose;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    created_at: {
        type: Date,
        default: Date.now().toString(),
    },

    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
})

module.exports = mongoose.model("review", reviewSchema);