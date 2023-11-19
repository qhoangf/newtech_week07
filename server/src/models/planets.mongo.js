const mongoose = require("mongoose");

const planetSchema = new mongoose.Schema({
    kelperName: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Platnet", planetSchema);