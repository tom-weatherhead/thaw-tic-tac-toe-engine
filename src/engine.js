'use strict';

const victoryScore = 100;
const defeatScore = -victoryScore;

// class Player {
// }

// class Board ?

class Game {
	constructor (boardString, maxPly) {
		// I.e The game is being played on a 3-by-3 board.
		this.boardWidth = 3;
		this.boardHeight = 3;
		this.boardArea = this.boardWidth * this.boardHeight;
		this.boardIsSquare = this.boardWidth === this.boardHeight;
		this.boardString = boardString;
		// TODO? Ensure that maxPly is an integer ?
		this.maxPly = maxPly;
		this.emptyNumber = ' ';
		this.victoryValue = victoryScore;
		this.defeatValue = defeatScore;

		if (typeof this.boardString !== 'string') {
			throw new Error('boardString is not a string.');
		} else if (this.boardString.length !== this.boardArea) {
			throw new Error('The length of boardString is not ' + this.boardArea + '.');
		}

		// Each character must be an 'X', an 'O', or a space. If any other characters are encountered, return an error.

		// If (the X population) == (the O population), then it is X's move;
		// else if (the X population) == (the O population) + 1, then it is O's move;
		// else return an error.

		this.xPopulation = (this.boardString.match(/X/g) || []).length;
		this.oPopulation = (this.boardString.match(/O/g) || []).length;
		this.spacePopulation = (this.boardString.match(/ /g) || []).length;

		this.boardString = this.boardString.split('');
		// This should be: this.boardArray = this.boardString.split('');

		if (this.xPopulation + this.oPopulation + this.spacePopulation !== this.boardArea) {
			throw Error('boardString contains one or more invalid characters.');
		} else if (this.xPopulation === this.oPopulation) {
			this.playerToStart = 'X';
		} else if (this.xPopulation === this.oPopulation + 1) {
			this.playerToStart = 'O';
		} else {
			throw new Error('Invalid boardString due to population counts.');
		}

		this.boardPopulation = this.xPopulation + this.oPopulation;

		if (this.maxPly <= 0) {
			this.maxPly = 1;
		} else if (this.maxPly > this.spacePopulation) {
			this.maxPly = this.spacePopulation;
		}
	}

	getSquareAt (row, col) {
		return this.boardString[row * this.boardWidth + col];
	}

	setSquareAt (row, col, value) {
		// TODO? Ensure that value is one of ['X', 'O', ' '] ?
		this.boardString[row * this.boardWidth + col] = value;
	}

	isVictory (player, row, column) {
		// 1) Check the specified row.
		var victory = true;

		for (var column2 = 0; column2 < this.boardWidth; ++column2) {

			if (this.getSquareAt(row, column2) !== player) {
				victory = false;
				break;
			}
		}

		if (victory) {
			return true;
		}

		// 2) Check the specified column.
		victory = true;

		for (var row2 = 0; row2 < this.boardHeight; ++row2) {

			if (this.getSquareAt(row2, column) !== player) {
				victory = false;
				break;
			}
		}

		if (victory) {
			return true;
		}

		if (this.boardIsSquare) {
			// The board is square, so there are two diagonals that we can check.
			let i;

			if (row === column) {
				// 3) Check the primary diagonal.
				victory = true;

				for (i = 0; i < this.boardHeight; ++i) {

					if (this.getSquareAt(i, i) !== player) {
						victory = false;
						break;
					}
				}

				if (victory) {
					return true;
				}
			}

			if (row + column === this.boardHeight - 1) {
				// 4) Check the secondary diagonal.
				victory = true;

				for (i = 0; i < this.boardHeight; ++i) {

					if (this.getSquareAt(i, this.boardWidth - 1 - i) !== player) {
						victory = false;
						break;
					}
				}

				if (victory) {
					return true;
				}
			}
		}

		return false;
	}

	placePiece (player, row, column) {
		// If player is X or O, the square being written to must be empty just before the move is made.
		// If player is Empty, the square being written to must be non-empty just before the move is made, and displayMove must be false.

		if (row < 0 || row >= this.boardHeight) {
			// console.log("placePiece() : row", row, "is out of range; this.boardHeight ==", this.boardHeight);
			// return false;
			throw new Error('placePiece() : row ' + row + ' is out of range; this.boardHeight == ' + this.boardHeight);
		}

		if (column < 0 || column >= this.boardWidth) {
			// console.log("placePiece() : column", column, "is out of range; this.boardWidth ==", this.boardWidth);
			// return false;
			throw new Error('placePiece() : column ' + column + ' is out of range; this.boardWidth == ' + this.boardWidth);
		}

		var oldSquareContent = this.getSquareAt(row, column);

		if (player !== this.emptyNumber) {

			if (oldSquareContent !== this.emptyNumber) {
				// console.log("placePiece() : Attempted to write an X or an O into a non-empty square.");
				// return false;
				throw new Error('placePiece() : Attempted to write an X or an O into a non-empty square.');
			}
		} else if (oldSquareContent === this.emptyNumber) {
			// console.log("placePiece() : Attempted to erase an already-empty square.");
			// return false;
			throw new Error('placePiece() : Attempted to erase an already-empty square.');
		}

		this.setSquareAt(row, column, player);

		if (player === this.emptyNumber) {
			// --this.boardPopulation;
			this.boardPopulation = this.boardPopulation - 1;

			return false;
		} else {
			// ++this.boardPopulation;
			this.boardPopulation = this.boardPopulation + 1;

			return this.isVictory(player, row, column); // This can return true for real or speculative moves.
		}
	}

	getNumOpenLines (opponent) {
		var numOpenLines = this.boardWidth + this.boardHeight + (this.boardIsSquare ? 2 : 0);
		let row;
		let column;

		// 1) Check all rows.

		for (row = 0; row < this.boardHeight; ++row) {

			for (column = 0; column < this.boardWidth; ++column) {

				if (this.getSquareAt(row, column) === opponent) {
					// --numOpenLines;
					numOpenLines = numOpenLines - 1;
					break;
				}
			}
		}

		// 2) Check all columns.

		for (column = 0; column < this.boardWidth; ++column) {

			for (row = 0; row < this.boardHeight; ++row) {

				if (this.getSquareAt(row, column) === opponent) {
					// --numOpenLines;
					numOpenLines = numOpenLines - 1;
					break;
				}
			}
		}

		if (this.boardIsSquare) {
			// 3) Check the primary diagonal.

			for (row = 0; row < this.boardWidth; ++row) {

				if (this.getSquareAt(row, row) === opponent) {
					// --numOpenLines;
					numOpenLines = numOpenLines - 1;
					break;
				}
			}

			// 4) Check the secondary diagonal.

			for (row = 0; row < this.boardWidth; ++row) {

				if (this.getSquareAt(row, this.boardWidth - 1 - row) === opponent) {
					// --numOpenLines;
					numOpenLines = numOpenLines - 1;
					break;
				}
			}
		}

		return numOpenLines;
	}

	getBoardValue (player, opponent) {
		return this.getNumOpenLines(player) - this.getNumOpenLines(opponent);
	}

	findBestMove (player, ply, bestUncleRecursiveScore) {	// For alpha-beta pruning.
		var returnBestCoordinates = ply === this.maxPly;
		let opponent;

		if (player === 'X') {
			opponent = 'O';
		} else if (player === 'O') {
			opponent = 'X';
		} else {
			throw new Error('Cannot calculate the opponent of \'' + player + '\'.');
		}

		var bestMoveValue = this.defeatValue - 1;		// Worse than the worst possible move value.
		var bestMoveList = returnBestCoordinates ? [] : null;
		var doneSearching = false;

		for (var row = 0; row < this.boardHeight && !doneSearching; ++row) {

			for (var column = 0; column < this.boardWidth; ++column) {
				//var moveValue = 0;
				let moveValue;

				if (this.getSquareAt(row, column) !== this.emptyNumber) {
					continue;
				}

				if (this.placePiece(player, row, column)) { // I.e. if this move results in immediate victory.
					moveValue = this.victoryValue;
				} else if (this.boardPopulation < this.boardArea && ply > 1) {
					moveValue = -this.findBestMove(opponent, ply - 1, bestMoveValue);
				} else {
					moveValue = this.getBoardValue(player, opponent);
				}

				this.placePiece(this.emptyNumber, row, column);	// Erase the piece that was just placed.

				if (moveValue === bestMoveValue && returnBestCoordinates) {
					bestMoveList.push({row: row, column: column});
				} else if (moveValue > bestMoveValue) {
					bestMoveValue = moveValue;

					if (bestMoveValue > -bestUncleRecursiveScore) {
						// Alpha-beta pruning.  Because of the initial parameters for the top-level move, this break is never executed for the top-level move.
						doneSearching = true;
						break; // ie. return.
					} else if (returnBestCoordinates) {
						// bestMoveList = [];
						// bestMoveList.push({row: row, column: column});
						bestMoveList = [{row: row, column: column}];
					} else if (bestMoveValue === this.victoryValue) {
						// Prune the search tree, since we are not constructing a list of all of the best moves.
						doneSearching = true;
						break;
					}
				}
			}
		}

		var bestMoveData = bestMoveValue;

		if (bestMoveValue < this.defeatValue || bestMoveValue > this.victoryValue) {
			// console.error('this.defeatValue is:', this.defeatValue);
			// console.error('bestMoveValue is:', bestMoveValue);
			// console.error('this.victoryValue is:', this.victoryValue);
			throw new Error('findBestMove() : bestMoveValue is out of range.');
		} else if (!returnBestCoordinates) {
		} else if (bestMoveList.length === 0) {
			throw new Error('findBestMove() : The bestMoveList is empty at the end of the method.');
		} else {
			var i = parseInt(Math.random() * bestMoveList.length, 10);
			var bestMove = bestMoveList[i];

			bestMoveData = {
				bestRow: bestMove.row,
				bestColumn: bestMove.column,
				bestMoveList: bestMoveList.sort(function (move1, move2) {

					if (move1.row !== move2.row) {
						return move1.row - move2.row;
					} else {
						return move1.column - move2.column;
					}
				}),
				bestScore: bestMoveValue,
				player: player
			};
		}

		return bestMoveData; // If returnBestCoordinates then we are returning a BestMoveData object; else we are returning an int.
	}
}

function findBestMove (boardString, maxPly) {
	// boardString must have a length of exactly 9 characters.
	let game = new Game(boardString, maxPly);

	// The third parameter is for alpha-beta pruning.
	return game.findBestMove(game.playerToStart, game.maxPly, game.defeatValue - 1);
}

module.exports = {
	victoryScore: victoryScore,
	defeatScore: defeatScore,
	findBestMove: findBestMove
};

// Or just: module.exports = findBestMove;
