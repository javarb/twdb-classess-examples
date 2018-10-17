// Requirements
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true})); // Mirar los docs para mas detalle de esto

// templates engine
app.set("view engine","ejs");

// Esto se resetea cada vez que se inicia la aplicacion y se borran todos los amigos creados (ahora es solo con fines didacticos). 
// Lo que se usan son bases de datos y ya no se tiene el problema del ambito ni de la permanencia
var friends = ['pepe', 'pedro', 'paco'];

// GET routes
app.get("/", function(req, res){
   res.render("home");
});

app.get("/friends", function(req,res){
    // We need to put this outside to the scope be global and can be used in other methods (for push in POST route /addfriend)
    // var friends = ['pepe', 'pedro', 'paco'];
    res.render("friends", {friendsList: friends});
});

// POST routes
// We are going to send data, we use Postman to test if we can reach this route (with the browser we cannot make POST requests only GET)
app.post("/addfriend", function(req, res){
    // We need to tell to Express to create the req.body object (requires body-parser)
    // console.log(req.body);
    var newFriend  = req.body.newfriend;
    friends.push(newFriend);
    // res.send("post route!")   
    res.redirect("/friends"); // instead to send we use redirect to show the list of friends
});



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started...");
});