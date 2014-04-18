var app = require('../../app/app.js');
var request = require('supertest');
var expect = require('chai').expect;
var models = require('../../app/models');
var User = models.User;
var Campaign = models.Campaign;
var WebProperty = models.WebProperty;
var seed = require('../../config/seed.js');
var when = require('when');

describe('Campaigns route', function(){
	var users, cuser;
	before(function(done){
		seed().then(function(seedz){
			users = seedz.users;
			getUserWithCampaign().then(function(user){
				cuser = user;
				
				getToken().then(function(tokenz){
					token = tokenz
					done();	
				}, done)
			}, done)
		}, done)
	})

	function getUserWithCampaign(){
		var promise = when.promise(function(resolve, reject, notify){
			User.find({where: {email: 'quin@gmail.com'}, include: [WebProperty]}).then(function(user){
				if(!user) return reject('No users');
				resolve(user);
			}, reject);
		})
		return promise;
	}

	function getToken(){
		var promise = when.promise(function(resolve, reject, notify){
			request(app)
				.post('/tokens')
				.send({email: 'quin@gmail.com', password: 'password'})
				.expect(201)
				.end(function(err, res){
					if(err) return reject(err);
					return resolve(res.body.token);
				});
		});
		return promise;
	}

	describe('Getting', function(){	
		it('should return a 200 array @ /campaigns', function(done){
			request(app)
				.get('/webproperties/' + cuser.webproperties[0].get('id'))
				.set('Bearer', token)
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					done();
				})
		})
	});
});