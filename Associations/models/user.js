var mongoose = require("mongoose");

// USER - email,name
// posts is an array of ObjectId belonging to Post
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
        
        ]
});
/* 
* This sets the returned value (objects, multiple pieces, etc.) when this module be required
* But for now we are returned an object (the model)
*/
module.exports = mongoose.model("User", userSchema); 