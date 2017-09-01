// thaw-tic-tac-toe-engine/test/engine_spec.js

'use strict';

// Chai.js cheat sheet: See http://ricostacruz.com/cheatsheets/chai.html
const chai = require('chai');
const expect = chai.expect;

const engine = require('..');

const test_descriptors = engine.test_descriptors;

describe('App', function () {
	test_descriptors.forEach(test_descriptor => {
		describe(test_descriptor.name, function () {
			it('Rocks!', function (done) {
				// Arrange
				// Act
				let result = engine.findBestMove(test_descriptor.boardString, test_descriptor.maxPly);

				// Assert

				// Chai.js has a flexible, fluent syntax for "expect" :
				// expect(result).not.null;			// eslint-disable-line no-unused-expressions
				// expect(result).to.not.be.null;	// eslint-disable-line no-unused-expressions
				expect(result).to.be.not.null;		// eslint-disable-line no-unused-expressions
				test_descriptor.verificationFunction(engine, expect, result);
				done();
			});
		});
	});
});
