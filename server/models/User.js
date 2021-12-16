const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// source for date: https://stackoverflow.com/questions/35501273/what-is-the-difference-between-date-now-and-date-now-in-mongoose/35501545
let userSchema = new Schema ({
    username: {type: String},
    email: {type: String},
    password: {type: String},
    bio: {type: String, default: 'No bio.'},
    registerdate: {type: Date, default: Date.now},
    admin: {type: Boolean}
});

module.exports = mongoose.model("users", userSchema);