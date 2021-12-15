const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema ({
    username: {type: String},
    email: {type: String},
    password: {type: String},
    bio: {type: String},
    registerdate: {type: Date, default: Date.now},
    admin: {type: Boolean}
});

module.exports = mongoose.model("users", userSchema);