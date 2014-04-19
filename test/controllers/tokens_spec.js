var app = require('../../app/app.js');
var request = require('supertest');
var expect = require('chai').expect;
var models = require('../../app/models');
var User = models.User;
var seed = require('../../config/seed.js');

describe('Tokens route', function(){

	describe('Creating tokens', function(){	
		var userDeets = {name: 'Eric D', password: 'password', confirm: 'password', email: 'ed@gmail.com'}
		it('should respond with a 201 & token', function(done){
			User.salt(userDeets).then(function(user){
				request(app)
					.post('/tokens')
					.send({email: userDeets.email, password: userDeets.password})
					.expect(201)
					.end(function(err, res){
						if(err) return done(err);
						done();
					})
			}, done)
		})
	});
});