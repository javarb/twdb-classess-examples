var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose");
    
mongoose.connect("mongodb://localhost:27017/auth_demo_app", { useNewUrlParser: true });

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true})); //needed every time we put data in a form in POST req

// In this way we execute some options in the required package require("express-session")({...})
// secret is used to code an decode information in the session
app.use(require("express-session")({
    secret: "Algo que funcione",
    resave: false,
    saveUninitialized: false
}));



// Setting up passport to work in our application
app.use(passport.initialize()); // Initialize passport
app.use(passport.session());    // Start a session

// Here we are creating a new local strategy using the method inside User model (by UserSchema.plugin(passportLocalMongoose); in user.js)
// this is for the authentication work in login POST route
passport.use(new LocalStrategy(User.authenticate()));

// These methods take the data from the session encode and decode them
// We have defined those methods into User model because we already have them: UserSchema.plugin(passportLocalMongoose);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===========
// ROUTES
// ===========

app.get("/", function(req, res){
    res.render("home");
});

// Here the function that test if the user is logged in, is added
// as a middleware so first thing that's runned is isLoggedIn() function
// and if is logged in (there makes return next), continues rendering this view
app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

// Auth Routes

// Show sign up form
app.get("/register", function(req, res){
    res.render("register");
});
// Handle user sign up
app.post("/register", function(req,res){
    //res.send("REGISTER POST ROUTE");    
    // we pass username but not password because we don't want to save password in plain text, password must be passed 
    // as other argument in order User.register encrypt it into a HASH that will be saved to the database
    // if all go well we will have a user with username and the HASH password into our callback function
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err){
            console.log(err);    
            return res.render('register');
        }
       // If the registration succeeds so this log in the user, executes the serialization of the user using the local strategy
       passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
       });
    });
});

// LOGIN ROUTES 
// Pt.4
//  * Add Login routes
//  * Add Login form
// Pt. 5
//  * Add Logout Route
//  * Add isLoggedIn middleware

// render login form
app.get("/login", function(req, res){
   res.render("login"); 
});

// login logic
// We do the authentication before of the callback function, this is called a Middleware,
// this middleware is executed inmediately the /login post route is called, before the final hanler (callback function) be executed
// so its in the middle, hence its name Middleware. There can be several middleware stacked up 
// In order to make the authentication, passport automatically takes the request.body object with the username and password
// information provided in the form
app.post(
    "/login", 
    passport.authenticate(
        "local", 
        {
            successRedirect: "/secret",
            failureRedirect: "login"
        }
    ), 
    function(req, res){
    }
);

app.get("/logout", function(req, res){
    //res.send("Bye!");
    // This detroy the data of the user session, but not check if the user is logged in
    // So by doing this, not forbids we continue visiting our /secret path
    req.logout();
    res.redirect("/");
});

// This function will be added as a middleware into /secret get route
// If the user is loged in continues execution of the route rendering
// but if the user isn't logged in, is redirected to login
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started...");
})

