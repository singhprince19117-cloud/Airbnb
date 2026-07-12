const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const { Schema } = mongoose;
const review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        url: String,
        filename: String,

        // type: String,
        // default: "https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8xMTQyMDI0OC9vcmlnaW4ucG5nIiwiZXhwaXJlc19hdCI6MTYyMTI3NjE1OX0.QLFHRJCSbgf3gDtv76I4ZIkcC-mkUkOnMWj-oxWi4js/img.png?width=980",

        // /*if the image link is empty then default will run and if the image has link but the string is 
        // empty then set, which is setter function will run. And v will automatically gets the value as 
        // soon as image link is set. */

        // set: (v) => v === "" ? 
        //     "https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8xMTQyMDI0OC9vcmlnaW4ucG5nIiwiZXhwaXJlc19hdCI6MTYyMTI3NjE1OX0.QLFHRJCSbgf3gDtv76I4ZIkcC-mkUkOnMWj-oxWi4js/img.png?width=980" 
        //     : v,
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "review",
        }
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    // geometry: {
    //     type: {
    //         type: String,
    //         enum: ['Point'],  // location type must be 'Point'
    //         required: true,
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true,
    //     },
    // }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await review.deleteMany({ _id: {$in: listing.reviews}});
    }
});

const listing = mongoose.model("listing", listingSchema);

module.exports = listing;