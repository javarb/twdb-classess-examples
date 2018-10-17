var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

// we define 2 models: USER and POST

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

// USER - email,name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

/* To create fields statically*/

/*
var newUser = new User({
    email: "javier@arboleda.edu",
    name: "Javier Arboleda"
})

newUser.posts.push({
    title: "post1", 
    content: "content1"
});

newUser.save(function(err, user){
    if (err) {
        console.log(err);
    } else {
        console.log(user);
    }
});

var newPost = new Post({
   title: "Reflections on Apples",
   content: "They are delicious"
});
newPost.save(function(err, post){
    if (err) {
        console.log(err);
    } else {
        console.log(post);
    }
});
*/

/* Find a user and add a post for that user*/
User.findOne({name: "Javier Arboleda"}, function(err, user){ // this user is the resulting of the find
    if (err) {
        console.log(err);
        
    } else {
        user.posts.push({
           title: "Post 2",
           content: "Content 2"
        });
        
        user.save(function(err, user){  // this user is the resulting of the save in mongodb, so have the new post
            if (err) {
                console.log(err)    
                
            } else {
                console.log(user);
                
            }
            
        });
        
    }
});