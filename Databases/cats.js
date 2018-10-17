var mongoose = require("mongoose"); // Include Mongoose (is needed be installed: npm install mongoose)
mongoose.connect("mongodb://localhost/cat_app") // Connect to DB "cat_app". If the DB provided not exits, mongoose creates it, else uses it

/* 
    Schema defines how cat looks like. This not do anything in MongoDB just tells to the JS side of things how looks the cats I want to save
    to db defined in this way:
    
    Still MongoDB is NoSQL we are a structure because we need a kind of predictable structure to write JS code that can 
    handle cats objects. That not forbids us to add data with a different structure. Is just order inside the code.
    
    If I need to print name, age and temperament in my code, I need to anticipate this and make this structure available.
*/ 
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

/*  We compile the defined schema into a model and save it into the variable Cat 
    Cat now is a pattern that has all the methods have all we want.
    We use that variable Cat to make, remove, update, find cats, etc.
     
    "Cat" inside mongoose.model("Cat", catSchema) is the name of our model and suposed to be the singular version of 
    the MongoDB collection name, so this line is going to make a collection named "Cats" (mongoose pluralizes it).
    
    So our model name is "Cat" but inside de database we acces the collection as: 
            db.cats
    
    Other example of this pluralization is: Person->people without problem
*/
var Cat = mongoose.model("Cat", catSchema);

// Adding a new cat to the database

// This step not add to DB still, just creates an object
// We can leave the fields in white, but this will be dealed with after becaus this should be important to control (i.e login forms)
/*var george = new Cat({
    name: "George",
    age: 11,
    temperament: "Grouchy"
})*/

// We create another cat,the name of the variable not matters in really (is just how we refer it inside our code) 
// since below this insert in DB the info inside the object 

// Uncomment to create cats, we comment since we don't want for each execution cats be created
/*var george = new Cat({
    name: "Gato",
    age: 7,
    temperament: "tender"
})
*/

/*  
    And this step saves to DB
        george.save();
        
    But there is a posibility not saved, for example if Mongo stop working for some reason, or internet is not working, etc. 
    Because this transaction takes time, JS have to cominucate with the MongoDB process and ifgure out if went right or went wrong.
    
    So instead to save blindly we pass a callback function inside save() and this function will be called when save is done, 
    whether it worked or not. 
    It callback function give us 2 things: 
        - Any potential error (empty if not error)
        - The item that was returned/saved
*/

// Uncomment to create cats, we comment since we don't want for each execution cats be created
/*george.save(function(err, cat){
    if (err){
        console.log("SHOMETHIGN WENT WRONG: " + err);
    } else {
        // This object cat that we are printing is the element into the database
        // Of we would to print george would be slightly different since is a JS object.
        console.log("WE JUST SAVED A CAT INTO DATABASE: " + cat);
    }
});
*/

/*  There is another way to create cats instead to make this two steps:
        var george = new Cat({...
        george.save(function(err, cat){....

    We can use the create method in the same way we use find
*/
Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cat){
    if (err){
        console.log("SHOMETHIGN WENT WRONG: " + err);
    } else {
        console.log("WE JUST SAVED A CAT INTO DATABASE: " + cat);
    }
});


// Retrieve all cats from the DB and console.log each one
// First we pass an empty object since we want to find all the cats, nothing in particular (see sec27/4-Mongo_Shell_Basics.txt)
// These callback function parameter names are free of choose not depending in the DB or other variables here
// Te callback function is executed when Cat.find is done whether if works ot not.
Cat.find({}, function(err, cats){
    if (err){
        console.log("SHOMETHIGN WENT WRONG");
        console.log(err);
    } else {
        console.log("ALL THE CATS:");
        console.log(cats);
    }
});