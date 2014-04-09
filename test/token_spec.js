var app = require('../app/app.js');
var request = require('supertest');
var should = require('should');

describe('Tokens route', function(){
	
	describe('Creating tokens', function(){	
		it('should send a 201 response with valid credentials', function(done){
			request(app)
				.post('/tokens')
				.expect(201)
				.end(function(err, res){
					if(err) return done(err);
					done();
				});
		});
	});

	after(function(){
		app.close();
	});
});