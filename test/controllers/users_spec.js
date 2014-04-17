var app = require('../../app/app.js');
var request = require('supertest');
var expect = require('chai').expect;
var models = require('../../app/models');
var User = models.User;
var seed = require('../../config/seed.js');

describe('Users route', function(){
	var users;	
	beforeEach(function(done){
		seed().then(function(seed){
			users = seed.users;
			done();
		}, function(err){
			done(err);
		})
	})
	describe('Creating users', function(){	


		describe('valid data', function(){
			var user = {name: 'Leo C', email: 'leo@gmail.com', password: 'lolwatispw'};

			it('should send a 201', function(done){
				request(app)
					.post('/users')
					.send(user)
					.expect(201)
					.end(function(err, res){
						if(err) return done(err);
						done();
					});
			});
		});

	});

	describe('Getting users', function(){

		it('should get a user by id', function(done){
			request(app)
				.get('/users/' + users[0].get('id'))
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					done()
				})
		})

		it('should get a list of users', function(){
		})

	})

	after(function(){
		app.close();
	});
});