var mongoose = require("mongoose");

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
/* 
* This sets the returned value (objects, multiple pieces, etc.) when this module be required
* But for now we are returned an object (the model)
*/
module.exports = mongoose.model("Post", postSchema); 
