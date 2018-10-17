// Exercise NPM

// Create a new directory named "MyShop"
// Add a file named "listProducts,js"
// Install the "faker" package (random people data generator)
// Read the faker docs and figure aout how it works
// Use faker to print out 10 random product names and prices
// Run your file with node and make sure ir works!

// https://www.npmjs.com/package/faker
// 1. jaar:~/workspace/IntroToNPM/DemoApp $ npm install faker                                                                                                                                       

// 2. Code into this file

var faker = require('faker');

// We need to use API methods

// Some use samples
/*var randomName = faker.name.findName(); 
console.log(randomName);
var randomEmail = faker.internet.email(); 
console.log(randomEmail);
var randomCard = faker.helpers.createCard(); // random card containing many properties
console.log(randomCard);
*/

console.log("=======================");
console.log("WELCOME TO THIS STORE!");
console.log("=======================");

for (var i=0; i<10; i++){
    console.log(faker.commerce.productName() + " - $" + faker.commerce.price());    
}

// 3.
// jaar:~/workspace/IntroToNPM/DemoApp $ node listProducts.js 