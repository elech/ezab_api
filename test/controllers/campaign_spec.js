var app = require('../../app/app.js');
var request = require('supertest');
var expect = require('chai').expect;
var models = require('../../app/models');
var User = models.User;
var Campaign = models.Campaign;
var seed = require('../../config/seed.js');

describe('Campaigns route', function(){
	var users, cuser;
	before(function(done){
		seed().then(function(seed){
			users = seed.users;
			getUserWithCampaign().then(function(user){
				cuser = user;
				done();	
			})
		}, function(err){
			done(err);
		})
	})

	function getUserWithCampaign(){
		var promise = when.promise(function(resolve, reject, notify){
			User.find({where: {email: 'quin@gmail.com'}}, include: [Campaign]).then(function(users){
				if(users.length !== 1) return reject();
				resolve(users[0]);
			})
		})
		return promise;
	}

	describe('Getting', function(){	
		it('should return a 200 array @ /campaigns', function(done){
			request(app)
				.get('/')
		})
	});
});