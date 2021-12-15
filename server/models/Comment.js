const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// source for date: https://stackoverflow.com/questions/35501273/what-is-the-difference-between-date-now-and-date-now-in-mongoose/35501545
let commentSchema = new Schema ({
    username: {type: String},
    userid: {type: String},
    lastedited: {type: Date, default: Date.now},
    text: {type: String}
});

module.exports = mongoose.model("comments", commentSchema);