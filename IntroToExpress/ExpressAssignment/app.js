// https://www.udemy.com/the-web-developer-bootcamp/learn/v4/t/lecture/3861606?start=0
var express = require('express');
var app = express();

app.get("/", function(req,res){
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res){
    // We put in lowercase by default (avoid capitalization problems)
    var animal = req.params.animal.toLowerCase();
    var sounds = {
        cow: "Moo!",
        dog: "Woof Woof!",
        pig: "Oink!",
        cat: "Meow!",
        goldfish: "..."
    }
  //   var sound = "";
//   if (animal === "pig"){
//       sound = "Oink!"
//   }else if (animal === "cow"){
//       sound = "Mooo!";
//   }else if (animal === "dog"){
//       sound = "Woof Woof!";
//   }else {
//       res.redirect("/*");
//   }
    var sound = sounds[animal];
    
    // the response only can be sent one time so we put a condition if the animal us undefined (not in the array)
    if (typeof sound === "undefined"){
        res.send("Sorry, I don't know the sound of that animal ...");
    }else {
        res.send("The " + animal + " says '" + sound + "'");    
    }
   
});

app.get("/repeat/:word/:times", function(req, res){
    var word = req.params.word;
    var times = parseInt(req.params.times);
    var str = "";
    
    // we need to concatenate the word 'n' times and send the reponse at the end: we can only send one respose.
    for (var i = 0 ; i < times ; i++){
        str += word + " ";
    }
    
    res.send(str);
});

// Our wildcard route
app.get("*", function(req, res){
    res.send("Sorry, page not found ...");
})

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("App listening...");
});