var app = require('../app/app.js');
var request = require('supertest');
var should = require('should');

describe('Tokens route', function(){
	it('should have a root success response', function(done){
		request(app)
			.get('/')
			.expect(200)
			.end(function(err, res){
				if(err) throw err;
				done();
			})
	});


	describe('Creating tokens', function(){	
		it('should send a 200 response with valid credentials', function(done){
			request(app)
				.post('/tokens')
				.expect(201)
				.end(function(err, res){
					if(err) return done(err);
					done();
				});
		});
	})

	it('should ', function(done){
		request(app)
			.get('/')
			.expect(200)
			.end(function(err, res){
				if(err) throw err;
				done();
			})
	});
})