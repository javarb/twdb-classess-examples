// EXERCISE 2 - AVERAGE GRADE

// Create a new file grader.js
// In the file define a new function named "average"
// It should take a single parameter: an array of test scores (all numbers)
// It should return the average score in the array, rounded to the nearest whole number

// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Math/round

function average(arrScores){
	// acumulation pattern, total is keep in a variable
	var total = 0;

	arrScores.forEach(function(score){
		total += score;
	});

	/*for (var i = 0; i < arrScores.length; i++){
		total += arrScores[i];
	}*/

	var avg = total / arrScores.length;
	return Math.round(avg);
}

// Test Cases

var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores)); // should return 94

var scores = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores)); // should return 68