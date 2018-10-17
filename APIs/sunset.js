// requiring request
var request = require('request');
// Sunset time in Hawaii https://developer.yahoo.com/weather/
request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(error, response, body) {    

    if (!error && response.statusCode == 200) {
        
        // console.log('body:', body); // Es un string no un objeto
        
        /* Inpeccionando la URL de la API vemos que el primer objeto es query, luego results, channel, astronomy 
           y por ultimo la variable sunset, así que este elemento es el que necesitamos acceder
        */
        
        // para probar accedemos inicialmente a "query"
        
        // console.log(body["query"]); // No se puede acceder así porque es un string no un objeto y no podemos accederlo como tal
        // console.log(typeof body);   // De esta manera verificamos que es un string 
        
        
        // Para poder acceder a query debemos interpretar (del ingles parse) el body y para ello usamos JSON.parse
        var parsedBody = JSON.parse(body);  // Con esto ya tenemos el objeto del body del JSON de la respuesta de la API
        // console.log(parsedBody);  // Imprime el body de la respuesta de la API como un objeto 
        // console.log(parsedBody["query"]); // El primer objeto "query"
        
        console.log('Sunset in Hawaii is at...')
        console.log(parsedBody["query"]["results"]["channel"]["astronomy"]["sunset"]);  // El objeto sunset contiene la hora del atardecer (ocaso), pero esta dentro de todos estos objetos
        
    } else {
        if (error){
            console.log('SOMETHING WENT WRONG!');
            console.log('error:', error);
            
        } else {
            console.log('statusCode:', response.statusCode)
            
        }
        
    }
});