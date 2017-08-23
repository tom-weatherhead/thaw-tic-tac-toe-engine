// thaw-tic-tac-toe-engine/test/engine_spec.js

// Chai.js cheat sheet: See http://ricostacruz.com/cheatsheets/chai.html
const chai = require('chai');
const expect = chai.expect;

const engine = require('..');

describe('App', function () {
	describe('SmokeTest00FirstMove', function () {
		it('Rocks!', function (done) {
			// Arrange
			// . . .
			// . . .
			// . . .
			const boardString = '         ';
			const maxPly = 3;

			// Act
			let result = engine.findBestMove(boardString, maxPly);

			// Assert

			// Chai.js has a flexible, fluent syntax for "expect" :
			// expect(result).not.null;			// eslint-disable-line no-unused-expressions
			// expect(result).to.not.be.null;	// eslint-disable-line no-unused-expressions
			expect(result).to.be.not.null;		// eslint-disable-line no-unused-expressions

			// expect(result.boardPopulation).to.equal(1);

			expect(result.bestScore).to.satisfy(bestScore => bestScore < engine.victoryScore);
			expect(result.bestScore).to.satisfy(bestScore => bestScore > engine.defeatScore);

			done();
		});
	});

	describe('SmokeTest01ImmediateVictory', function () {
		it('Rocks!', function (done) {
			// Arrange
			// X . X
			// . . .
			// O . O
			const boardString = 'X X   O O';
			const maxPly = 1;

			// Act
			const result = engine.findBestMove(boardString, maxPly);

			// Assert
			expect(result).to.be.not.null;		// eslint-disable-line no-unused-expressions
			expect(result.bestScore).to.be.equal(engine.victoryScore);
			expect(result.bestMoveList).to.be.deep.equal([
				{ row: 0, column: 1 }
			]);
			expect(result.bestRow).to.be.equal(0);
			expect(result.bestColumn).to.be.equal(1);
			done();
		});
	});

	describe('SmokeTest02BlockingMove', function () {
		it('Rocks!', function (done) {
			// Arrange
			// X . X
			// . . .
			// O . .
			const boardString = 'X X   O  ';
			const maxPly = 2;

			// Act
			const result = engine.findBestMove(boardString, maxPly);

			// Assert
			expect(result).to.be.not.null;		// eslint-disable-line no-unused-expressions
			expect(result.bestScore).to.satisfy(bestScore => bestScore > engine.defeatScore);
			expect(result.bestMoveList).to.be.deep.equal([
				{ row: 0, column: 1 }
			]);
			expect(result.bestRow).to.be.equal(0);
			expect(result.bestColumn).to.be.equal(1);
			done();
		});
	});

	describe('VictoryTest2', function () {
		it('Rocks!', function (done) {
			// Arrange
			// O . .
			// . O X
			// . X .
			const boardString = 'O   OX X ';
			const maxPly = 3;

			// Act
			const result = engine.findBestMove(boardString, maxPly);

			// Assert
			expect(result).to.be.not.null;		// eslint-disable-line no-unused-expressions
			expect(result.bestScore).to.be.equal(engine.victoryScore);
			expect(result.bestMoveList).to.be.deep.equal([
				{ row: 2, column: 2 }
			]);
			expect(result.bestRow).to.be.equal(2);
			expect(result.bestColumn).to.be.equal(2);
			done();
		});
	});

	describe('VictoryTest3', function () {
		it('Rocks!', function (done) {
			// Arrange
			// X . .
			// . . .
			// . O .
			const boardString = 'X      O ';
			const maxPly = 5;

			// Act
			const result = engine.findBestMove(boardString, maxPly);

			// Assert
			expect(result).to.be.not.null;		// eslint-disable-line no-unused-expressions
			expect(result.bestScore).to.be.equal(engine.victoryScore);
			expect(result.bestMoveList).to.be.deep.equal([
				{ row: 0, column: 2 },
				{ row: 1, column: 1 },
				{ row: 2, column: 0 }
			]);
			done();
		});
	});

	describe('VictoryTest4', function () {
		it('Rocks!', function (done) {
			// Arrange
			// . X .    X X .    X X O    X X O
			// . . . -> . . . -> . . . -> . X .
			// O . .    O . .    O . .    O . .
			const boardString = ' X    O  ';
			const maxPly = 5;

			// Act
			const result = engine.findBestMove(boardString, maxPly);

			// Assert
			expect(result).to.be.not.null;		// eslint-disable-line no-unused-expressions
			expect(result.bestScore).to.be.equal(engine.victoryScore);
			expect(result.bestMoveList).to.be.deep.equal([
				{ row: 0, column: 0 }
			]);
			expect(result.bestRow).to.be.equal(0);
			expect(result.bestColumn).to.be.equal(0);
			done();
		});
	});

	describe('VictoryTest5', function () {
		it('Rocks!', function (done) {
			// Arrange
			// X O .
			// . . .
			// . . .
			const boardString = 'XO       ';
			const maxPly = 5;

			// Act
			const result = engine.findBestMove(boardString, maxPly);

			// Assert
			expect(result).to.be.not.null;		// eslint-disable-line no-unused-expressions
			expect(result.bestScore).to.be.equal(engine.victoryScore);
			expect(result.bestMoveList).to.be.deep.equal([
				{ row: 1, column: 0 },
				{ row: 1, column: 1 },
				{ row: 2, column: 0 }
			]);
			done();
		});
	});

	describe('VictoryTest6', function () {
		it('Rocks!', function (done) {
			// Arrange
			// O X .
			// . . X
			// . . .
			const boardString = 'OX   X   ';
			const maxPly = 5;

			// Act
			const result = engine.findBestMove(boardString, maxPly);

			// Assert
			expect(result).to.be.not.null;		// eslint-disable-line no-unused-expressions
			expect(result.bestScore).to.be.equal(engine.victoryScore);
			expect(result.bestMoveList).to.be.deep.equal([
				{ row: 2, column: 0 }
			]);
			done();
		});
	});

	describe('NoVictoryTest1', function () {
		it('Rocks!', function (done) {
			// Arrange
			// O X .
			// . . .
			// . . .
			const boardString = 'OX       ';
			const maxPly = 5;

			// Act
			const result = engine.findBestMove(boardString, maxPly);

			// Assert
			expect(result).to.be.not.null;		// eslint-disable-line no-unused-expressions
			expect(result.bestScore).to.satisfy(bestScore => bestScore < engine.victoryScore);
			expect(result.bestScore).to.satisfy(bestScore => bestScore > engine.defeatScore);
			done();
		});
	});

	describe('NoVictoryTest2', function () {
		it('Rocks!', function (done) {
			// Arrange
			// O X .
			// . . .
			// . . .
			const boardString = 'OX       ';
			const maxPly = 6;

			// Act
			const result = engine.findBestMove(boardString, maxPly);

			// Assert
			expect(result).to.be.not.null;		// eslint-disable-line no-unused-expressions
			expect(result.bestScore).to.be.equal(0);
			// expect(result.bestMoveList).to.contain({ row: 1, column: 2 });	// This would be a losing move.
			// expect(result.bestMoveList).to.contain({ row: 2, column: 1 });	// This would be a losing move.
			done();
		});
	});
});
