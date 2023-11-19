const mongoose = require("mongoose");

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', function () {
    console.log("MongoDB connection ready");
})

mongoose.connection.on("error", function (error) {
    console.error(error);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
};

async function mongoDisconnect() {
    await mongoose.disconnect();
};

module.exports = {
    mongoConnect,
    mongoDisconnect,
}