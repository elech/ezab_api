var app = require('../../app/app.js');
var request = require('supertest');
var expect = require('chai').expect;
var models = require('../../app/models');
var seed = require('../../config/seed.js');
var when = require('when');
var User = models.User,
	WebProp = models.WebProperty;

describe('Web Properties route', function(){
	var users, token, wuser;
	var userDeets = {name: 'Quiin', email: 'quin@gmail.com', password: 'password', confirm: 'password'};
	var goodProp = {name: 'BRS', url: 'http://www.amazon.com'}
	before(function(done){
		seed().then(function(seed){
			users = seed.users;
			User.find({where:{email: 'quin@gmail.com'}, include: [WebProp]}).then(function(wuserw){
				wuser = wuserw;
				done();
			}, done)				
		}, done)
	})


	before(function(done){
		request(app)
			.post('/tokens')
			.send({email: userDeets.email, password: userDeets.password})
			.expect(201)
			.end(function(err, res){
				if(err) return done(err);
				token = res.body.token;
				done(); 
			})
	})


	describe('Getting', function(){
		it('should get an array of properties', function(done){
			request(app)
				.get('/webproperties')
				.set('Bearer', token)
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body).to.be.instanceOf(Array);
					expect(res.body).to.have.length(1);
					done();
				})
		})

		it('should get a single property', function(done){
			request(app)
				.get('/webproperties/' + wuser.webproperties[0].get('id'))
				.set('Bearer', token)
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body.id).to.equal(wuser.webproperties[0].get('id'));
					done();
				})
		})
	})

	describe('Creating', function(){
		it('should send a 201', function(done){
			request(app)
				.post('/webproperties')
				.set('Bearer', token)
				.send(goodProp)
				.expect(201)
				.end(function(err, res){
					if(err) return done(err);
					done();
				})
		})
	})

});