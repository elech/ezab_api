var app = require('../../app/app.js');
var request = require('supertest');
var expect = require('chai').expect;
var models = require('../../app/models');
var User = models.User;

describe('Users route', function(){
	var users, createdUserId,apiV1Endpoint = "/api/v1";
	before(function(done){
		User.findAll().then(function(cusers){
			users = cusers;
			done();
		}, done)
	})
	describe('Creating users', function(){	


		describe('valid data', function(){
			var user = {name: 'Leo C', email: 'leo@gmail.com', password: 'lolwatispw', confirm: 'lolwatispw'};

			it('should send a 201', function(done){
				request(app)
					.post(apiV1Endpoint +'/users')
					.send(user)
					.expect(201)
					.end(function(err, res){
						if(err) return done(err);
						createdUserId = res.body.id;
						done();
					});
			});
		});

	});

	describe('Getting users', function(){

		it('should get a user by id', function(done){
			request(app)
				.get(apiV1Endpoint +'/users/' + users[0].get('id'))
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					done()
				})
		})

		it('should get a list of users', function(done){
			request(app)
				.get(apiV1Endpoint +'/users')
				.expect(200)
				.end(function(err){
					if(err) return done(err);
					done();
				})
		})
	})

	describe('Editing users', function(){
		it('should update a user by id', function(done){
			var newName = 'newName';
			request(app)
				.put(apiV1Endpoint +'/users/' + users[0].get('id'))
				.send({name: newName})
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body.name).to.equal(newName)
					done();
				})
		})
	})

	describe('Delete users', function(){
		it('should delete a users by id', function(done){
			request(app)
				.del(apiV1Endpoint +'/users/' + createdUserId)
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body.id).to.equal(createdUserId)
					request(app)
						.get(apiV1Endpoint +'/users/' + createdUserId)
						.expect(404)
						.end(function(err, res){
							if(err) return done(err);
							done();
						})
				})
		})
	})
});