# thaw-tic-tac-toe-engine
A Node.js Tic-Tac-Toe game engine with alpha-beta pruning, packaged for npm

Installation Instructions:

	$ git clone https://github.com/tom-weatherhead/thaw-tic-tac-toe-engine.git
	$ cd thaw-tic-tac-toe-engine
	$ npm install -g grunt
	$ npm install
	$ grunt

Note: The command "grunt" runs lint, unit tests, and security tests.

Sample usage:

	let engine = require('thaw-tic-tac-toe-engine');

	let boardString = 'X X   O  ';
	let maxPly = 2;		// maxPly is the desired maximum depth of the best move search tree.

	let result = engine.findBestMove(boardString, maxPly);

	console.log(result);

Output:

	{ bestRow: 0,
	  bestColumn: 1,
	  bestMoveList: [ { row: 0, column: 1 } ],
	  bestScore: 1,
	  player: 'O' }
