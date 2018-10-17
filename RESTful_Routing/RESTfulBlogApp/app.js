// 1. REQUIRED LIBRARIES
var expressSanitizer = require("express-sanitizer"),  // To remove scripts tags from body
methodOverride  = require("method-override"),         // To specify the HTTP METHOD
bodyParser      = require("body-parser"),
mongoose        = require("mongoose"),
express         = require("express"),
app             = express();

// 2. APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");  // It's needed to install EJS module
app.use(express.static("public")); // where we load static resources from (stylesheets, etc.)
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer()); // This has to be set after body-parser
app.use(methodOverride("_method")); // take <METHOD> given as argument in _method=<METHOD> and treat the request as it (PUT, DELETE, GET, POST..)

// 3. MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}    // In this way se set a default value if not provided
});

var Blog = mongoose.model("Blog", blogSchema); // This will create blogs collection in MongoDB

// just for test
/*Blog.create({
   title: "Landscape",
   image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e471a27144269e4b573dfdee025e7327&auto=format&fit=crop&w=840&q=80",
   body: "This is a landscape image post"
});*/

// RESTful ROUTES
// We will get "Cannot GET /" if we visit the website since we don't have a root route
// We create a redirection to go to our INDEX RESTful route (applications as reddit or facebook do this)
app.get("/", function(req, res){
    res.redirect("/blogs")    
});

// INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if (err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res){
    
    /* 'req.body' is the body of the data coming from the form and
    *  'req.body.blog.body' is the body of an object contained into the form's body */
    
    // Sanitize this object
    // console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    /*console.log("=========");
    console.log(req.body);*/
    
    // Create blog
    Blog.create(req.body.blog, function(err, newBlog){   // this needs body-parser installed
        if (err) {
            res.render("new");
        } else {
            // Redirect to the index
            res.redirect("/blogs")
        }
    })
    
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err) {
           res.redirect("/blogs")
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
    
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
    // We need to preload the data in the form
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("edit",{blog: foundBlog});        
        }
    });
    
});
// UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    
    // Sanitize this object
    // console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    /*console.log("=========");
    console.log(req.body);*/
    
    // Method for update
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id); // id here can be obtained also from updatedBlog
        }
    })
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    // destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        // Same output in condition but just for check for errors (this error response could be changed after)
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    })
})

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("server is running ...");
});