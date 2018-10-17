// https://github.com/request/request - Code of HTTP request module 

// We need to install the package request and import here
var request = require('request');

// Making a request to http://google.com - we expect the HTML (as with curl)
// Para hacer algo con la información que recibimos debemos usar una funcion callback 
// La solicitud toma tiempo pueden ocurrir errores, retardos, etc. entonces pasamos 3 parametros a la función callback:
//   error      Cualquier error que pueda ocurrir (el servidor no responde, etc.)
//   response   Tiene diferentes elementos de la respuesta como el statusCode
//   body       El cuerpo de la respuesta, donde vienen las cosas
// 
// Solicitudes
// - Request with error
// request('http://googleasdasdasdas.com', function(error, response, body){
// ----
// HTTP request
// request('http://google.com', function(error, response, body){    
// ----
// API Yahoo weather
request('https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(error, response, body){
// ----
    if (error){
        // Error handling is important. For example if we are going to save data to a DB so we ned ensure we got the data first.
        console.log('SOMETHING WENT WRONG!');
        console.log(error);
        
    } else {
        
        if(response.statusCode == 200){   // 200 OK - https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
            // THINGS WORKED!
            console.log(body); // Este body es un string no un objeto (aunque lo parece ver ejmplo sunset.js)
        }
        
    }
    
});

/*
var request = require('request');

request('http://www.google.com', function (error, response, body) {

  // Print the error if one occurred
  console.log('error:', error); 
  
  // Print the response status code if a response was received
  console.log('statusCode:', response && response.statusCode); 
  
  // Print the HTML for the Google homepage.
  console.log('body:', body); 

  // El ejemplo de https://github.com/request/request en el tiempo que el profesor hizo el vídeo  
  // statusCode 200 means OK
  // this also handles error is the shor version of above but not prints the error.
  if (!error && response.statusCode == 200){
              console.log(body);

  }
});
*/