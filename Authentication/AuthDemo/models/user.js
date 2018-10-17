var mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose")

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Take the required packaged passportLocalMongoose and add those methods to our UserSchema
// All that's need to perform user authentication
UserSchema.plugin(passportLocalMongoose);


// The name of the model in singular and the schema above
module.exports = mongoose.model("User", UserSchema);