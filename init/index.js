const mongoose = require("mongoose");
const initdata = require("./data.js");
const listing = require("../models/listing.js");

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

const initDB = async () => {
    await listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({...obj, owner: "695892ce14e7fea6e4d82513"}))
    await listing.insertMany(initdata.data);
};

initDB();