// includes
var express = require('express');
var request = require('request'); // Hacer solicitudes desde node
// for the post data in form (I made this option)
var bodyParser = require("body-parser"); // $ npm install body-parser --save

var app = express(); // express framework init

app.use(bodyParser.urlencoded({extended: true})); // Mirar los docs para mas detalle de esto
app.use(express.static('public'));  // Para que use la carpeta public donde van los CSS y JS
app.set("view engine", "ejs");      // The template engine

// Get Routes

// Home
app.get("/", function(req, res){
    res.render("search");
});

// I created this POST route to receive the form data in the video classes this was made with GET
// https://www.udemy.com/the-web-developer-bootcamp/learn/v4/t/lecture/5102532?start=0
/*
Question about Sending data by GET-POST:
https://www.udemy.com/the-web-developer-bootcamp/learn/v4/questions/4377822?utm_campaign=email&utm_source=sendgrid.com&utm_medium=email

If you're production site uses SSL (https instead of http) then you'll be fine in terms of security.
Most any time you're sending a password for login then you'll be using POST requests anyway.

NOTE: I could had put for this POST route the same name of the GET route "/results" like in YelpCamp v1 is done with /campgroundss
*/
app.post("/search", function(req, res){
    
    // We need body-parser module to obtain values passed over POST method from the form in search page (route /)
    var book = req.body.book;
    var chapter = req.body.chapter;
    var verses = req.body.verses;
    var API_URL = 'https://bible-api.com/'; // Browse the link for see the docs
    // console.log("API_URL:" + API_URL + ", book: " + book + ", chapter: " + chapter + ", verses: "+ verses);
    
    //Dynamic URL processing over the query send from the form in the search page (route /)
    var url = API_URL + book + chapter + ":" + verses;
    // console.log("search url:" + url)
    
    // We set this variables to be used in the /results route
    // https://stackoverflow.com/questions/20712712/how-to-pass-variable-from-app-js-to-routes-index-js
    app.set('reqBook', book);
    app.set('url', url);

    // res.send("post route!")   
    res.redirect("/results"); // instead to send we use redirect to show the list of friends
});


// results
app.get("/results", function(req, res){
    
    /*      THIS IS FOR GET METHOD IN FORM, I CHANGED TO POST (SEE ABOVE)
    
    // We start hardcoding (test)
    //var url = 'https://bible-api.com/romans%2012:1-2,5-7,9,13:1-9&10';
    //var url = 'https://bible-api.com/john 3:16-20';
    
    // We need to process the input sent from the form in search page (route /) with name="search" (ID)
    var book = req.query.book;
    var chapter = req.query.chapter;
    var verses = req.query.verses;
    
    // Test redirection if there is a empty field (just for test because the best is to make required in HTML)
    if (!verses){
        console.log("Is neccesary a value");
        res.redirect('/');
    }
    
    var API_URL = 'https://bible-api.com/'; // Browse the link for see the docs
    
    //Dynamic URL processing over the query send from the form in the search page (route /)
    var url = API_URL + book + chapter + ":" + verses;
    */
    // FOR POST IN FORM, we set the variable in the POST route /search (above)
    var url = req.app.get('url');
    
    request(url, function(error, response, body){

       if (!error && response.statusCode == 200){
           // We can send the body response of the API as the response to our route here is a string
            //res.send(body);     
            
            // Now we parse this response JSON body string to an JS object
            var dataAPI = JSON.parse(body);     
            //console.log(dataAPI); 
            //res.send(dataAPI['verses'][0]['text']); //  primero miramos si funciona la conectividad con la API y luego nos ocupamos de la presentacion
            
            // Enviando la respuesta a nuestro template
            // res.render("results", {data: dataAPI, book: book}); // se pass the requested book
            res.render("results", { data: dataAPI, book: req.app.get('reqBook') }); // this book was setted in the POST route /search
            
       } else {
            console.log('Something gone wrong...');
            console.log('error:', error);
            console.log('statusCode:', response.statusCode);
           
       }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Bible App has started...') 
});