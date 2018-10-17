// Including Express
// var app = require("express")(); // This way resumes the 2 lines below, but the most of people do this in 2 steps (below)
var express = require("express");
var app = express();

// This line says to Express to look assets at "public" directory. Ej: src="/app.js" search into /public/app.js
app.use(express.static("public")); // For this kind of operations we need the "2 steps" Express including above

// This says to Express we are going to use EJS and so isn't neccesary to put the extension ".ejs" in view files
app.set("view engine", "ejs");

app.get("/", function(req,res){
    // res.send("welcome");
    
    // Lo siguiente es el retorno de código HTML, es posible tecnicamente, pero no es una buena idea escribir toda la página aquí.
    // res.send("<h1>Welcome to thes home page</h1><h2>blah blah</h2>");
    
    /* 
     La siguiente es una mejor manera de escribir nuestro código HTML, CSS, JS que queramos enviar al usuario
     Para ello se usa el método render() de la "response"
     res.render("dogs.html");
     
     NOTA: 
     Hay que tener en cuenta que no podemos escribir HTML plano, se puede hacer pero necesita mas configuraciones. Sin embargo,
     la mayoria de nuestro HTML no va a ser estático sino dinámico y lo llamamos templates EJS (Embedded JavaScript).
     
     El template debe estar en el directorio "views" pues ahi lo buscará automáticamente express.
     
     El módulo "ejs" tiene que estar instalado, de lo contrario arrojará un error:
     "Error: Cannot find module 'ejs' ..."
        
    */
    // res.render("home.ejs"); 
    res.render("home"); // Isn't neccessary to put the extension .ejs since we defined above the view engine
});

/*  HTML Dinámico - Uso de variables
    Lo importante aqui es la logica, porque podemos llenar el template con datos de una BD o datos que el usuario haya suministrado

    EJS nos deja añadir logica JavaSCript (condicionales, loops, funciones, etc, etc.) dentro del HTML
*/
app.get("/youlike/:thing", function(req,res){
    var thing = req.params.thing;
    
    /*  Podemos enviar la respuesta como ya lo habiamos hecho:
        res.send("Do you seems pretty: '" + thing + "'");
       
        Pero lo que queremos es enviar esto de vuelta en un HTML:
            1. creamos el archivo
            2. render the name of the file (it will look at views/)    
            3. Para pasar variables, enviamos en render() un objeto con todo lo que quiero enviar */
    // res.render("like.ejs", {thingVar: thing});
    res.render("like", {thingVar: thing}); // Isn't neccessary to put the extension .ejs since we defined above the view engine
});

/*  Como usar un loop en el template
    Para ello le vamos a pasar a la vista un array de objetos, Luego dentro del template vamos a iterar por ellos.
*/

app.get("/posts", function(req,res){
    var posts = [
        {title: "Post1", author: "Susy"},
        {title: "Post de prueba", author: "Pedro"},
        {title: "Digamos algo", author: "Jose"},
        {title: "Otra cosa", author: "Miguel"},
        {title: "First post", author: "Javier" },
        {title: "El dia esta bonito", author: "Alexander" },
        {title: "Tengo sed", author: "Javier Alexander" }
    ]
    // En el objeto que se pasa a la izquierda de ":" va el nombre de la propiedad y a la derecha el valor contenido. 
    // el nombre de la propiedad es el que se usa en el template y el valor es la variable definida en este archivo.
    // res.render("posts.ejs", { posts: posts } ); 
    res.render("posts", { posts: posts } ); // Isn't neccessary to put the extension .ejs since we defined above the view engine
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server is listening...");
});