// thaw-tic-tac-toe-engine/test/engine_spec.js

'use strict';

// Chai.js cheat sheet: See http://ricostacruz.com/cheatsheets/chai.html
// const chai = require('chai');
// const expect = chai.expect;

// const jest = require('jest');
// const expect = jest.expect;

const engine = require('..');

const testDescriptors = engine.testDescriptors;

describe('App', () => {
	testDescriptors.forEach(testDescriptor => {
		// Jest:
		test(testDescriptor.name, () => {	// eslint-disable-line no-undef
			// expect(2 + 2).toBe(4);

			// try {
			// Arrange
			// Act
			const result = engine.findBestMove(testDescriptor.boardString, testDescriptor.maxPly);

			// Assert
			expect(result).not.toBeNull();	// eslint-disable-line no-undef
			expect(testDescriptor.verificationFunction).not.toBeNull();	// eslint-disable-line no-undef
			testDescriptor.verificationFunction(engine, expect, result);	// eslint-disable-line no-undef
			// } catch (error) {
			// expect(testDescriptor.errorHandlingFunction).not.toBeNull();
			// testDescriptor.errorHandlingFunction(engine, error.message);
			// } finally {
			// done();
			// }
		});
	});
});
