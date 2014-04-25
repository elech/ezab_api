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
	var cuser, token, campaign, user, webprop
	

	before(function(done){
		User.find({where:{email: 'exp@gmail.com'}}).then(function(foundUser){
			user = foundUser;
			return WebProperty.find({where:{userId: user.get('id'), url: 'http://aws.amazon.com'}})
		}).then(function(prop){
			webprop = prop
			return Campaign.find({where:{webpropertyId: webprop.get('id'), name: 'HomePage'}})
		}).then(function(camp){
			campaign = camp;
			return getToken()
		}).then(function(ctoken){
			token = ctoken;
			done()
		}, done)
	})

	function getToken(user){
		var promise = when.promise(function(resolve, reject, notify){
			request(app)
				.post('/tokens')
				.send({email: 'exp@gmail.com', password: 'password'})
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
				.get('/webproperties/' + webprop.get('id') + "/campaigns")
				.set('Authorization', 'Bearer ' + token)
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body).to.be.instanceOf(Array);
					expect(res.body[0]).to.exist;
					expect(res.body[0]).to.have.property('id');
					done();
				})
		})

		it('should get a single campaign', function(done){
			request(app)
				.get('/webproperties/' + webprop.get('id') + '/campaigns/' + campaign.get('id'))
				.set('Authorization', 'Bearer ' + token)
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body).to.have.property('id');
					done();
				})
		})
	});

	describe('Create', function(){
		var candidateCampaign;
		before(function(){
			candidateCampaign = {
				name: 'myNewCampaign',
				start: 'return true;',
				success: 'return 1 ==1;'
			};
		})

		it('should create a campaign on the property', function(done){
			var reqString = '/webproperties/' + webprop.get('id') + '/campaigns'
			request(app)
				.post(reqString)
				.set('Authorization', 'Bearer ' + token)
				.send(candidateCampaign)
				.expect(201)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body).to.have.property('id');
					done();
				})
		})
	});

	describe('Editing', function(){
		var campaign2Edit
		before(function(done){
			Campaign.create({
				webpropertyId: webprop.get('id'),
				name: 'Dat campaign',
				start: 'return 1 === 1',
				success: 'return true;'
			}).then(function(camp){
				campaign2Edit = camp;
				done();
			}, done);
		})

		it('should edit a campaign', function(done){
			var newCampaignName = "newNameHere";
			request(app)
				.put('/webproperties/' + webprop.get('id') + '/campaigns/' + campaign2Edit.get('id'))
				.set('Authorization', 'Bearer ' + token)
				.send({name: newCampaignName})
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body.name).to.equal(newCampaignName);
					done();
				})
		})
	})

	describe('Deleting', function(){
		var campaign2delete;
		before(function(done){
			Campaign.create({
				webpropertyId: webprop.get('id'),
				name: 'dat delete campaign',
				start: 'return 1 === 1',
				success: 'return true;'
			}).then(function(camp){
				campaign2delete = camp;
				done();
			}, done);
		})

		it('should delete a campaign', function(done){
			request(app)
				.del('/webproperties/' + webprop.get('id') + '/campaigns/' + campaign2delete.get('id'))
				.set('Authorization', 'Bearer ' + token)
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body).to.have.property('id');
					expect(parseInt(res.body.id)).to.equal(campaign2delete.id);
					done();
				})
		})
	})


});