var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

// we define 2 models: USER and POST
var Post = require("./models/post");
var User = require("./models/user");

// Find user

// Here the instruction '.populate("posts")'' is going to those ids and loading its into 'posts' array in User
// After 'exec(function...)' is executing the callback function as usual 
/*
User.findOne({email: "reivaj49@gmail.com"}).populate("posts").exec(function(err, user){
    if (err) {
        console.log(err);
    } else {
        console.log(user);
    }
});
*/

// find all posts for that user


// This creation process returns 'err' or a 'post' created
Post.create({
    title: "Test posts 4",
    content: "test content modified when included modules"
}, function(err, post){
    // We found an user and that user comes in 'foundUser'
    User.findOne({email: "reivaj49@gmail.com"}, function(err, foundUser){
        if (err) {
            console.log(err);  
            
        } else {
            foundUser.posts.push(post);         // In the 'foundUser' we add the post in the 'posts' array
            foundUser.save(function(err, data){ // and save that user to db
                if (err) {
                    console.log(err);
                    
                } else {
                    console.log(data);
                    
                }
            });
            
        }
    });
});

/*
User.create({
    email: "reivaj49@gmail.com",
    name: "Javier Arboleda"
})
*/