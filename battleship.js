const view = {
	displayMessage: function(msg) {
		let messageArea = document.getElementById('messageArea');
		messageArea.innerHTML = msg;
	},
	displayHit: function(location) {
		let cell = document.getElementById(location);
		cell.setAttribute('class', 'hit');
	},
	displayMiss: function(location) {
		let cell = document.getElementById(location);
		cell.setAttribute('class', 'miss');
	}
};

const model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	ships: [{locations: ['06', '16', '26'], hits: ['', '', ''] }, 
			{locations: ['24', '34', '44'], hits: ['', '', ''] }, 
			{locations: ['10', '11', '12'], hits: ['', '', ''] }],
	fire: function(guess) {
		for (i = 0; i < this.numShips; i++) {
			let ship = this.ships[i];
			let index = ship.locations.indexOf(guess);
			if (index >= 0) {
				ship.hits[index] = 'hit';
				view.displayHit(guess);
				view.displayMessage("HIT!");
				if (this.isSunk(ship)) {
					view.displayMessage("You sunk my battleship!");
					this.shipsSunk++;
				}
				return true;
			}
		};
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},
	isSunk: function(ship) {
		for (i = 0; i <this.shipLength; i++) {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
		return true;
	}
};

const controller = {
	guesses: 0,
	
	processGuess: function(guess) {
		let location = parseGuess(guess);
		if (location) {
			this.guesses++;
			let hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage(`You sank  all my battleships, in ${this.guesses} guesses`)
			}
		}
	}
};

function parseGuess(guess) {
	let alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G']; 
	if (guess === null || guess.length !== 2) {
		alert('Oops, please enter a letter and a number on the board.');
	} else {
		let firstChar = guess.charAt(0);
		let row = alphabet.indexOf(firstChar);
		let column = guess.charAt(1);
		if (isNaN(row) || isNaN(column)) {
			alert(`Oops, this isn't on the board.`);
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			alert(`Oops, that's off the board!`);
		} else {
			return row + column;
		}
	}
	return null;
}

controller.processGuess('A0');

controller.processGuess('A6');
controller.processGuess('B6');
controller.processGuess('C6');

controller.processGuess('C4');
controller.processGuess('D4');
controller.processGuess('E4');

controller.processGuess('B0');
controller.processGuess('B1');
controller.processGuess('B2');

/* OLD OLD OLD OLD OLD OLD OLD
//Declare initial variables
let randomLoc = Math.floor(Math.random() * 5);
let location1 = randomLoc;
let location2 = location1 + 1;
let location3 = location2 + 1;
let guess;
let alreadyGuessed = [];
let numHits = 0;
let numGuesses = 0;
let isSunk = false;
let checkNum = /[^0-9]/g;


//Loop while the ship is not sunk
while (isSunk == false) {
	guess = prompt('Ready, aim, fire! (enter a number from 0-6):');
	if (checkNum.test(guess)) {
		alert(`I don't understand those symbols! Please enter a number.`);
	} else {
		if (alreadyGuessed.includes(guess)) {
			alert(`You've already guessed that number! Please try again.`);
		} else {
			if (guess < 0 || guess > 6) {
				alert('Please enter a valid number! (0-6 only)');
			} else {
				alreadyGuessed.push(guess);
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
	}
}

//Tell user stats
let stats = `You took ${numGuesses} guesses to sink the battleship, which means your shooting accuracy was ${(3/numGuesses) * 100}%`;
alert(stats);
*/