var app = require('../../app/app.js');
var request = require('supertest');
var expect = require('chai').expect;
var models = require('../../app/models');
var seed = require('../../config/seed.js');
var when = require('when');
var User = models.User,
	WebProp = models.WebProperty,
	Campaign = models.Campaign,
	Experience = models.Experience;

describe('Experiences route', function(){
	var user, webprop, token, campaign

	before(function(done){
		User.find({where:{email: 'exp@gmail.com'}}).then(function(foundUser){
			user = foundUser;
			return WebProperty.find({where:{userId: user.get('id'), url: 'http://aws.amazon.com'}})
		}).then(function(prop){
			webprop = prop
			return Campaign.find({where:{webpropertyId: webprop.get('id'), name: 'HomePage'}, include: [Experience]})
		}).then(function(camp){
			campaign = camp;
			done();
		})

	})


	before(function(done){
		request(app)
			.post('/tokens')
			.send({email: 'exp@gmail.com', password: 'password'})
			.expect(201)
			.end(function(err, res){
				if(err) return done(err);
				token = res.body.token;
				done(); 
			})
	})

	describe('Getting', function(){
		it('should get an array of experiences', function(done){
			request(app)
				.get('/webproperties/' + webprop.id + '/campaigns/' + campaign.id + '/experiences')
				.set('Bearer', token)
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body).to.be.instanceOf(Array);
					done();
				})
		})


		it('should get a single of experiences', function(done){
			request(app)
				.get('/webproperties/' + webprop.get('id') + '/campaigns/' + campaign.id + '/experiences/' + campaign.experiences[0].id)
				.set('Bearer', token)
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body.code).to.exist;
					done();
				})
		})
	})
});