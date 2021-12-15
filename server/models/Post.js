const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema ({
    username: {type: String},
    userid: {type: String},
    lastedited: {type: Date, default: Date.now},
    title: {type: String},
    text: {type: String},
    comments: {type: Array}
});

module.exports = mongoose.model("posts", postSchema);