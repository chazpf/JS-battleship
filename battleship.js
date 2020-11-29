//Declare initial variables
let location1 = 3;
let location2 = 4;
let location3 = 5;
let guess;
let numHits = 0;
let numGuesses = 0;
let isSunk = false;

//Loop while the ship is not sunk
while (isSunk == false) {
	guess = prompt('Ready, aim, fire! (enter a number from 0-6):');
	if (guess < 0 || guess > 6) {
		alert('Please enter a valid cell number!');
	} else {
		numGuesses += 1;
		if (guess == location1 || guess == location2 || guess ==location3) {
			alert('HIT!');
			numHits += 1;
			if (numHits == 3) {
				isSunk = true;
				alert('You sunk my battleship!');
			}
		} else {
			alert('MISS!');
		}
	}
}

//Tell user stats
let stats = `You took ${numGuesses} guesses to sink the battleship, which means your shooting accuracy was ${3/numGuesses}`;
alert(stats)