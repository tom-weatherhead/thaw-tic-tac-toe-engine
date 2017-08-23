// thaw-tic-tac-toe-engine/test/engine_spec.js

// Chai.js cheat sheet: See http://ricostacruz.com/cheatsheets/chai.html
const chai = require('chai');
const expect = chai.expect;

const engine = require('..');

describe('App', function () {
	describe('SmokeTest00ImmediateVictory', function () {
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
			expect(result.bestMoveList).to.be.deep.equal([{ row: 0, column: 1 }]);
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
			expect(result.bestMoveList).to.be.deep.equal([{ row: 0, column: 1 }]);
			expect(result.bestRow).to.be.equal(0);
			expect(result.bestColumn).to.be.equal(1);
			done();
		});
	});

	describe('VictoryTest1', function () {
		it('Rocks!', function (done) {
			// Arrange
			// X X .
			// . . .
			// O O .
			const boardString = 'XX    OO ';
			const maxPly = 3;

			// Act
			let result = engine.findBestMove(boardString, maxPly);

			// Assert
			// Assert.AreEqual(4, gameEngine.boardPopulation);
			// Assert.AreEqual(victoryValue, bestMoveValue);
			// Assert.AreEqual(2, bestMoveList.Count);
			// Assert.IsTrue(bestMoveList.Contains(2));
			// Assert.IsTrue(bestMoveList.Contains(8));

			// Error: mocha exploded! assert is not defined.
			// assert.equal(result !== null);
			// expect(result).not.null;		// eslint-disable-line no-unused-expressions
			// expect(result).to.not.be.null;		// eslint-disable-line no-unused-expressions
			expect(result).to.be.not.null;		// eslint-disable-line no-unused-expressions
			done();
		});
	});
});

// From wpf-tic-tac-toe/WPFTicTacToe.GameEngine.Tests/GameEngineTests.cs :

// #define USE_OPEN_LINES_HEURISTIC

// [Test]
// public void VictoryTest2()
// {
// O . .
// . O X
// . X .

// int bestMoveValue = gameEngine.FindBestMove(SquareContentType.X, 3, true, bestMoveList, out bestRow, out bestColumn);

// Assert
// Assert.AreEqual(4, gameEngine.boardPopulation);
// Assert.AreEqual(victoryValue, bestMoveValue);
// Assert.AreEqual(1, bestMoveList.Count);
// Assert.IsTrue(bestMoveList.Contains(8));
// }

// [Test]
// public void VictoryTest3()
// {
// X . .
// . . .
// . O .

// int bestMoveValue = gameEngine.FindBestMove(SquareContentType.X, 5, true, bestMoveList, out bestRow, out bestColumn);

// Assert
// Assert.AreEqual(2, gameEngine.boardPopulation);
// Assert.AreEqual(victoryValue, bestMoveValue);
// Assert.AreEqual(3, bestMoveList.Count);
// Assert.IsTrue(bestMoveList.Contains(2));
// Assert.IsTrue(bestMoveList.Contains(4));
// Assert.IsTrue(bestMoveList.Contains(6));
// }

// [Test]
// public void VictoryTest4()
// {
// . X .    X X .    X X O    X X O
// . . . -> . . . -> . . . -> . X .
// O . .    O . .    O . .    O . .

// gameEngine.PlacePiece(SquareContentType.X, 0, 1, false);
// gameEngine.PlacePiece(SquareContentType.O, 2, 0, false);

// Act
// int bestMoveValue = gameEngine.FindBestMove(SquareContentType.X, 5, true, bestMoveList, out bestRow, out bestColumn);

// Assert
// Assert.AreEqual(2, gameEngine.boardPopulation);
// Assert.AreEqual(victoryValue, bestMoveValue);
// Assert.AreEqual(1, bestMoveList.Count);
// Assert.IsTrue(bestMoveList.Contains(0));
// }

// [Test]
// public void VictoryTest5()
// {
// X O .
// . . .
// . . .

// int bestMoveValue = gameEngine.FindBestMove(SquareContentType.X, 5, true, bestMoveList, out bestRow, out bestColumn);

// Assert
// Assert.AreEqual(2, gameEngine.boardPopulation);
// Assert.AreEqual(victoryValue, bestMoveValue);
// Assert.AreEqual(3, bestMoveList.Count);
// Assert.IsTrue(bestMoveList.Contains(3));
// Assert.IsTrue(bestMoveList.Contains(4));
// Assert.IsTrue(bestMoveList.Contains(6));
// }

// [Test]
// public void NoVictoryTest1()
// {
// O X .
// . . .
// . . .

// int bestMoveValue = gameEngine.FindBestMove(SquareContentType.X, 5, false, null, out bestRow, out bestColumn);

// Assert
// Assert.AreEqual(2, gameEngine.boardPopulation);
// Assert.IsTrue(bestMoveValue > GameEngine.defeatValue);
// Assert.IsTrue(bestMoveValue < GameEngine.victoryValue);
// }

// [Test]
// public void VictoryTest6()
// {
// O X .
// . . X
// . . .

// int bestMoveValue = gameEngine.FindBestMove(SquareContentType.O, 5, true, bestMoveList, out bestRow, out bestColumn);

// Assert
// Assert.AreEqual(3, gameEngine.boardPopulation);
// Assert.AreEqual(victoryValue, bestMoveValue);
// Assert.AreEqual(1, bestMoveList.Count);
// Assert.IsTrue(bestMoveList.Contains(6));
// }

// [Test]
// public void NoVictoryTest2()
// {
// O X .
// . . .
// . . .

// int bestMoveValue = gameEngine.FindBestMove(SquareContentType.X, 6, true, bestMoveList, out bestRow, out bestColumn);

// Assert
// Assert.AreEqual(2, gameEngine.boardPopulation);
// Assert.AreEqual(0, bestMoveValue);
// Assert.IsFalse(bestMoveList.Contains(5));    // This would be a losing move.
// Assert.IsFalse(bestMoveList.Contains(7));    // This would be a losing move.
// }
