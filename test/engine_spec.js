// node-js-express-template/test/app_spec.js

// Use chai and chai-http. See https://groundberry.github.io/development/2016/12/10/testing-express-with-mocha-and-chai.html and our repo test-express-mocha-chai-perello

const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

chai.use(chaiHttp);

const expect = chai.expect;

describe('App', function () {
	describe('/get', function () {
		it('responds with status 200', function (done) {
			chai.request(app)
				.get('/')
				.end(function (err, res) {
					expect(err).to.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(200);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe('/get notfound', function () {
		it('responds with status 404', function (done) {
			chai.request(app)
				.get('/notfound')
				.end(function (err, res) {
					expect(err).to.not.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(404);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe('/get servererror', function () {
		it('responds with status 500', function (done) {
			chai.request(app)
				.get('/servererror')
				.end(function (err, res) {
					expect(err).to.not.be.null;		// eslint-disable-line no-unused-expressions
					expect(res).to.have.status(500);
					// expect(res.text).to.equal('somevalue');
					done();
				});
		});
	});

	describe('/get teapot', function () {
		it('responds with status 200', function (done) {
			chai.request(app)
				.get('/teapot')
				.end(function (err, res) {
					// All three of these lines work:
					// expect(err).not.to.be.null;		// eslint-disable-line no-unused-expressions
					expect(err).to.not.be.null;		// eslint-disable-line no-unused-expressions
					// expect(err).to.be.not.null;		// eslint-disable-line no-unused-expressions

					expect(res).to.have.status(418);
					expect(res.text).to.equal('I\'m a teapot');
					done();
				});
		});
	});
});
