'use strict';

// class BestMoveData {
	// constructor () {
		// this.bestRow = -1;
		// this.bestColumn = -1;
		// this.bestScore = 0;
	// }
// }

// class Player {
// }

// class Board ?

class Game {
	constructor (boardString, maxPly) {
		this.boardWidth = 3;
		this.boardHeight = 3;
		this.boardArea = this.boardWidth * this.boardHeight;
		this.boardIsSquare = (this.boardWidth === this.boardHeight);
		// this.boardString = '         '; // ' ' x this.boardArea
		this.boardString = boardString;
		// TODO? Ensure that maxPly is an integer ?
		this.maxPly = maxPly;
		//var aBoardImageNumbers = null;  // new Array(nBoardArea);
		// this.emptyNumber = -1;
		this.emptyNumber = ' ';
		this.victoryValue = 100;
		this.defeatValue = -this.victoryValue;

		if (typeof this.boardString !== 'string') {
			throw Error('boardString is not a string.');
			// return { squareIndex: -1, message: 'boardString is not a string.' };
		} else if (this.boardString.length != this.boardArea) {
			throw Error('The length of boardString is not ' + this.boardArea + '.');
			// return { squareIndex: -1, message: 'The length of boardString is not ' + boardArea + '.' };
		}

		// Each character must be an 'X', an 'O', or a space. If any other characters are encountered, return an error.

		// If (the X population) == (the O population), then it is X's move;
		// else if (the X population) == (the O population) + 1, then it is O's move;
		// else return an error.
		this.xPopulation = (this.boardString.match(/X/g) || []).length;
		this.oPopulation = (this.boardString.match(/O/g) || []).length;
		this.spacePopulation = (this.boardString.match(/ /g) || []).length;
		// let player;

		this.boardString = this.boardString.split('');

		if (this.xPopulation + this.oPopulation + this.spacePopulation != this.boardArea) {
			throw Error('boardString contains one or more invalid characters.');
			// return { squareIndex: -1, message: 'boardString contains one or more invalid characters.' };
		} else if (this.xPopulation === this.oPopulation) {
			this.playerToStart = 'X';
		} else if (this.xPopulation === this.oPopulation + 1) {
			this.playerToStart = 'O';
		// } else {
			// return { squareIndex: -1, message: 'Invalid boardString due to population counts.' };
		}

		this.boardPopulation = this.xPopulation + this.oPopulation;

		if (this.maxPly <= 0) {
			this.maxPly = 1;
		} else if (this.maxPly > this.spacePopulation) {
			this.maxPly = this.spacePopulation;
		}
	}
	
	getSquareAt(row, col) {
		return this.boardString[row * this.boardWidth + col];
	}
	
	setSquareAt(row, col, value) {
		// TODO? Ensure that value is one of ['X', 'O', ' '] ?
		this.boardString[row * this.boardWidth + col] = value;
	}
//}

// ****

// Best move logic for Tic-Tac-Toe - MoveLogic.js - Javascript - March 10, 2014

// **** Global Variable Declarations ****

// var nBoardDimension = 3;
// var nBoardWidth = nBoardDimension;
// var nBoardHeight = nBoardDimension;
// var nBoardArea = nBoardWidth * nBoardHeight;
// var boardPopulation;
// var aBoardImageNumbers = null;  // new Array(nBoardArea);
// var EmptyNumber = -1;
// var victoryValue = 100;
// var defeatValue = -victoryValue;

// **** Function Declarations ****

	isVictory(player, row, column) {
		// 1) Check the specified row.
		var victory = true;

		for (var column2 = 0; column2 < this.boardWidth; ++column2) {

			if (this.getSquareAt(row, column2) != player) {
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

			if (this.getSquareAt(row2, column) != player) {
				victory = false;
				break;
			}
		}

		if (victory) {
			return true;
		}

		if (this.boardIsSquare) {
			// The board is square, so there are two diagonals that we can check.

			if (row == column) {
				// 3) Check the primary diagonal.
				victory = true;

				for (var i = 0; i < this.boardHeight; ++i) {

					if (this.getSquareAt(i, i) != player) {
						victory = false;
						break;
					}
				}

				if (victory) {
					return true;
				}
			}

			if (row + column == this.boardHeight - 1) {
				// 4) Check the secondary diagonal.
				victory = true;

				for (var i = 0; i < this.boardHeight; ++i) {

					if (this.getSquareAt(i, this.boardWidth - 1 - i) != player) {
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

	placePiece(player, row, column) {
		// If player is X or O, the square being written to must be empty just before the move is made.
		// If player is Empty, the square being written to must be non-empty just before the move is made, and displayMove must be false.

		if (row < 0 || row >= this.boardHeight) {
			// alert("PlacePiece() : row " + row + " is out of range; nBoardDimension == " + nBoardDimension);
			console.log("placePiece() : row", row, "is out of range; this.boardHeight ==", this.boardHeight);
			return false;
		}

		if (column < 0 || column >= this.boardWidth) {
			// alert("PlacePiece() : column is out of range.");
			console.log("placePiece() : column", column, "is out of range; this.boardWidth ==", this.boardWidth);
			return false;
		}

		var oldSquareContent = this.getSquareAt(row, column);

		if (player != this.emptyNumber) {

			if (oldSquareContent != this.emptyNumber) {
				// alert("PlacePiece() : Attempted to write an X or an O into a non-empty square.");
				console.log("placePiece() : Attempted to write an X or an O into a non-empty square.");
				return false;
			}
		} else {

			if (oldSquareContent == this.emptyNumber) {
				// alert("PlacePiece() : Attempted to erase an already-empty square.");
				console.log("placePiece() : Attempted to erase an already-empty square.");
				return false;
			}
		}

		// aBoardImageNumbers[row * nBoardDimension + column] = player;
		this.setSquareAt(row, column, player);

		if (player == this.emptyNumber) {
			// --this.boardPopulation;
			this.boardPopulation = this.boardPopulation - 1;
			return false;
		} else {
			// ++this.boardPopulation;
			this.boardPopulation = this.boardPopulation + 1;
			return this.isVictory(player, row, column); // This can return true for real or speculative moves.
		}

		// var victory = player != EmptyNumber && isVictory(player, row, column);

		// return victory; // This can return true for real or speculative moves.
	}

	getNumOpenLines(opponent) {
		var numOpenLines = this.boardWidth + this.boardHeight + (this.boardIsSquare ? 2 : 0);
		var row;
		var column;

		// 1) Check all rows.

		for (row = 0; row < this.boardHeight; ++row) {

			for (column = 0; column < this.boardWidth; ++column) {

				if (this.getSquareAt(row, column) == opponent) {
					--numOpenLines;
					break;
				}
			}
		}

		// 2) Check all columns.

		for (column = 0; column < this.boardWidth; ++column) {

			for (row = 0; row < this.boardHeight; ++row) {

				if (this.getSquareAt(row, column) == opponent) {
					--numOpenLines;
					break;
				}
			}
		}

		if (this.boardIsSquare) {
			// 3) Check the primary diagonal.

			for (row = 0; row < this.boardWidth; ++row) {

				if (this.getSquareAt(row, row) == opponent) {
					--numOpenLines;
					break;
				}
			}

			// 4) Check the secondary diagonal.

			for (row = 0; row < this.boardWidth; ++row) {

				if (this.getSquareAt(row, this.boardWidth - 1 - row) == opponent) {
					--numOpenLines;
					break;
				}
			}
		}

		return numOpenLines;
	}

	getBoardValue(player, opponent) {
		return this.getNumOpenLines(player) - this.getNumOpenLines(opponent);
	}

	// findBestMove(player, ply,
		// bestUncleRecursiveScore,	// For alpha-beta pruning.
		// returnBestCoordinates) {

	findBestMove(player, ply,
		bestUncleRecursiveScore) {	// For alpha-beta pruning.

		var returnBestCoordinates = (ply === this.maxPly);
		// var opponent = 1 - player;
		let opponent;
		
		if (player === 'X') {
			opponent = 'O';
		} else if (player === 'O') {
			opponent = 'X';
		} else {
			throw new Error('Cannot calculate the opponent of \'' + player + '\'.');
		}

		var bestMoveValue = this.defeatValue - 1;     // Worse than the worst possible move value.
		var bestMoveList = returnBestCoordinates ? [] : null;
		var doneSearching = false;

		for (var row = 0; row < this.boardHeight && !doneSearching; ++row)
		{

			for (var column = 0; column < this.boardWidth; ++column)
			{
				var moveValue = 0;
				//var currentSquareIndex = row * nBoardDimension + column;

				// if (aBoardImageNumbers[currentSquareIndex] != EmptyNumber)
				if (this.getSquareAt(row, column) !== this.emptyNumber) {
					continue;
				}

				if (this.placePiece(player, row, column)) // I.e. if this move results in immediate victory.
				{
					moveValue = this.victoryValue;
				}
				else if (this.boardPopulation < this.boardArea && ply > 1)
				{
					//var bestChildMoveData = findBestMove(opponent, ply - 1, bestMoveValue, false);

					//moveValue = -bestChildMoveData.bestScore;
					moveValue = -this.findBestMove(opponent, ply - 1, bestMoveValue);
				}
				else
				{
					moveValue = this.getBoardValue(player, opponent);
				}

				this.placePiece(this.emptyNumber, row, column);	// Erase the piece that was just placed.

				if (moveValue == bestMoveValue && returnBestCoordinates)
				// if (moveValue == bestMoveValue && ply === this.maxPly)
				{
					// bestMoveList.push(currentSquareIndex);
					bestMoveList.push({row: row, column: column});
				}
				else if (moveValue > bestMoveValue)
				{
					bestMoveValue = moveValue;

					if (bestMoveValue > -bestUncleRecursiveScore) 
					{
						// Alpha-beta pruning.  Because of the initial parameters for the top-level move, this break is never executed for the top-level move.
						doneSearching = true;
						break; // ie. return.
					}
					else if (returnBestCoordinates)
					{
						bestMoveList = [];
						// bestMoveList.push(currentSquareIndex);
						bestMoveList.push({row: row, column: column});
					}
					else if (bestMoveValue == this.victoryValue)
					{
						// Prune the search tree, since we are not constructing a list of all of the best moves.
						doneSearching = true;
						break;
					}
				}
			}
		}

		//var bestMoveData = new BestMoveData();
		var bestMoveData = bestMoveValue;

		if (bestMoveValue < this.defeatValue || bestMoveValue > this.victoryValue)
		{
			// alert("FindBestMove() : bestMoveValue is out of range.");
			console.error('this.defeatValue is:', this.defeatValue);
			console.error('bestMoveValue is:', bestMoveValue);
			console.error('this.victoryValue is:', this.victoryValue);
			throw new Error("FindBestMove() : bestMoveValue is out of range.");
		}
		else if (!returnBestCoordinates)
		{
			//bestRow = -1;
			//bestColumn = -1;
			;
		}
		else if (bestMoveList.length == 0)
		{
			// alert("FindBestMove() : The bestMoveList is empty at the end of the method.");
			throw new Error("FindBestMove() : The bestMoveList is empty at the end of the method.");
		}
		else
		{
			var i = parseInt(Math.random() * bestMoveList.length, 10);
			var bestMove = bestMoveList[i];

			// bestMoveData = new BestMoveData();
			// bestMoveData.bestRow = bestMove.row;
			// bestMoveData.bestColumn = bestMove.column;
			// bestMoveData.bestScore = bestMoveValue;
			// bestMoveData.player = player;

			bestMoveData = {
				bestRow: bestMove.row,
				bestColumn: bestMove.column,
				bestScore: bestMoveValue,
				player: player
			};
		}

		return bestMoveData; // If returnBestCoordinates then we are returning a BestMoveData object; else we are returning an int.
	}
}

/*
public int FindBestMove(SquareContentType player, int ply,
    // no bestUncleRecursiveScore
bool returnBestCoordinates, List<int> bestMoveListCopy,
out int bestRow, out int bestColumn)
{
return FindBestMove(player, ply, defeatValue - 1, returnBestCoordinates, bestMoveListCopy, out bestRow, out bestColumn);
}

public BestMoveData FindBestMoveWrapper(SquareContentType player, int ply)
{
int bestRow;
int bestColumn;
int bestScore = FindBestMove(player, ply, true, null, out bestRow, out bestColumn);

return new BestMoveData(bestScore, bestRow, bestColumn);
}
 */

// function WorkerParameters(nPlayer, nPly) {
    // If we ever make the board dimension variable, add it as a parameter here.
    // this.aBoardImageNumbers = aBoardImageNumbers;
    // this.boardPopulation = boardPopulation;
    // this.nPlayer = nPlayer;
    // this.nPly = nPly;
// }

// ****

// TODO: Rename the four-parameter findBestMove() above (unless JavScript now supports function overloading).

function findBestMoveFoo(boardString, maxPly) {
	let game = new Game(boardString, maxPly);

	// boardString must have a length of exactly 9 characters.
	// const boardSize = 3;	// I.e The game is being played on a 3-by-3 board.
	// const boardArea = boardSize * boardSize;

	// if (typeof boardString !== 'string') {
		// return { squareIndex: -1, message: 'boardString is not a string.' };
	// } else if (boardString.length() != boardArea) {
		// return { squareIndex: -1, message: 'The length of boardString is not ' + boardArea + '.' };
	// }

	// Each character must be an 'X', an 'O', or a space. If any other characters are encountered, return an error.

	// If (the X population) == (the O population), then it is X's move;
	// else if (the X population) == (the O population) + 1, then it is O's move;
	// else return an error.
	// let xPopulation = boardString.count('X');
	// let oPopulation = boardString.count('O');
	// let spacePopulation = boardString.count(' ');
	// let player;

	// if (xPopulation + oPopulation + spacePopulation != boardArea) {
		// return { squareIndex: -1, message: 'boardString contains one or more invalid characters.' };
	// } else if (xPopulation === oPopulation) {
		// player = 'X';
	// } else if (xPopulation === oPopulation + 1) {
		// player = 'O';
	// } else {
		// return { squareIndex: -1, message: 'Invalid boardString due to population counts.' };
	// }

	// The third parameter is for alpha-beta pruning.
	// let squareIndex = findBestMove(player, ply, defeatValue - 1, true);

	// return 7;
	// return { squareIndex: squareIndex, message: 'Success!' };
	
	// If .squareIndex < 0, the an error occurred, and the error message willbe in .message .
	return game.findBestMove(game.playerToStart, game.maxPly, game.defeatValue - 1);
}

module.exports = {
	findBestMove: findBestMoveFoo
};

// Or just: module.exports = findBestMove;
