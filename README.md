# thaw-tic-tac-toe-engine
A Node.js Tic-Tac-Toe game engine with alpha-beta pruning and a heuristic, packaged for npm.

[![Build Status](https://secure.travis-ci.org/tom-weatherhead/thaw-tic-tac-toe-engine.svg)](https://travis-ci.org/tom-weatherhead/thaw-tic-tac-toe-engine)
[![npm](https://img.shields.io/npm/v/thaw-tic-tac-toe-engine.svg)](https://www.npmjs.com/package/thaw-tic-tac-toe-engine)
[![npm](https://img.shields.io/npm/dt/thaw-tic-tac-toe-engine.svg)](https://www.npmjs.com/package/thaw-tic-tac-toe-engine)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/tom-weatherhead/thaw-tic-tac-toe-engine/blob/master/LICENSE)
[![Maintainability](https://api.codeclimate.com/v1/badges/2c6556b82af3f70217d0/maintainability)](https://codeclimate.com/github/tom-weatherhead/thaw-tic-tac-toe-engine/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/tom-weatherhead/thaw-tic-tac-toe-engine/badge.svg?targetFile=package.json&package-lock.json)](https://snyk.io/test/github/tom-weatherhead/thaw-tic-tac-toe-engine?targetFile=package.json&package-lock.json)

### Git Installation Instructions

```
git clone https://github.com/tom-weatherhead/thaw-tic-tac-toe-engine.git
cd thaw-tic-tac-toe-engine
npm install -g grunt
npm install
grunt
```

### npm Installation Instructions

```
npm install --save thaw-tic-tac-toe-engine
```

Note: The command "grunt" runs lint and unit tests.

### Sample Usage of the npm Package

```js
let engine = require('thaw-tic-tac-toe-engine');

let boardString = 'X X   O  ';
let maxPly = 2;		// maxPly is the desired maximum depth of the best move search tree.

try {
	let result = engine.findBestMove(boardString, maxPly);

	console.log(result);
} catch (error) {
	console.error('engine.findBestMove() threw an exception:', error);
}
```

Output:

```js
{
	bestRow: 0,
	bestColumn: 1,
	bestMoveList: [
		{ row: 0, column: 1 }
	],
	bestScore: 1,
	player: 'O'
}
```

## License
MIT
