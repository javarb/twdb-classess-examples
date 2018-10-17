// https://www.udemy.com/the-web-developer-bootcamp/learn/v4/t/lecture/3861598?start=15

// Include the code
var express = require('express');

// Execute Express. We need to put in a var to can use the methods
var app = express();

// ROUTES - Are executed in order from above to below, so the route order matters!

/* 
app.get takes 2 different parameters:
    - URL (or path) 
    - A code to run. 
The code to run is a function that takes 2 arguments:
 - request 
 - response

We can call those arguments as we want, but the most common (even in the of. doc.) way to call them is "req" and res"

So when there is a GET request to "/" a function is executed with this 2 params request and response. These parameters 
are in really objects which inside of the function contains:
   request - All the information about the request that trigger this route 
   response- All information about what we are going to repond with
*/
// When we go to root route "/" => we expect to have the message "Hi there!"
// NOTE: For a route works, is necessary a server listening - see below app.listen() method.
app.get("/", function(req, res){
    res.send("Hi there!");  // this is the way we respond with some text
});  

//  "/bye" => "Goodbye!"
app.get("/bye", function(req, res){
    res.send("Goodbye!");
});

//  "/dog" => "MEOW!"
app.get("/dog", function(req,res){
    // this line shows a registry in the console when someone from browser or Postman GET this route
    console.log("someone made a request to /dog"); 
    res.send("MEOW!");
})

// ROUTE PARAMETERS (Example simulation Reddit)
// Also called route varibles. We capture them with colons ":"

// Capture one paramenter after a static route
app.get("/r/:patternName", function(req,res){
    // Test to inspect in the request object
    // console.log(req);
    console.log(req.params);
    // We assign to a variable the contetn of "patternName" from the request object
    var category = req.params.patternName; 
    // So we use that varible in the response
    res.send("WELCOME TO THE " + category.toUpperCase() + " SUBREDDIT");
})

//  Several paramater mixed with static route 
app.get("/r/:patternName/comments/:id/:title", function(req,res){
    // Test to inspect in the request object
    console.log(req.params);
    var category = req.params.patternName;
    var id = req.params.id;
    var title = req.params.title;
    res.send("REDDIT COMMENT. Category: " + category + ", Title: " + title + ", ID: " +id);
})

// "*" catch all route, override any other rule 
// NOTE: This route have go at the end (else any another route will no work!)
app.get("*", function(req, res){
    res.send("Default route")
});

 
/* 
For the routes working we need to tell Express to listen for requests (start server) over a port and pass a callback function (optional):
 app.listen(3000, function(){ ...
 
But as we are working in c9, this is a little diferent, so we need to use the PORT and IP env var

Run with node app.js and click on "Preview/Preview Running Application" to see the website
Copy/paste the URL in the browser to better visibility

In first when I write an inexistent e.g. /asdf a error message is displayed "Cannot GET /asd", but after we added the catch all route "*"
so there is not errors.

For each update in this file is necessariy to restar the NodeJS server but later will be told how to avoid this.
*/
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server has started!"); 
});