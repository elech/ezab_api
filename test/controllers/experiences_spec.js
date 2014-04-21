var app = require('../../app/app.js');
var request = require('supertest');
var expect = require('chai').expect;
var models = require('../../app/models');
var seed = require('../../config/seed.js');
var when = require('when');
var User = models.User,
	WebProp = models.WebProperty,
	Campaign = models.Campaign

describe('Experiences route', function(){
	var user, webprop, token, campaign

	before(function(done){
		User.find({where:{email: 'exp@gmail.com'}, include: [{model: WebProp, include: [Campaign]}]}).then(function(expuser){
			user = expuser;
			webprop = expuser.webproperties[0];
			campaign = expuser.webproperties[0].campaigns[0];
			done()
		}, done);
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
				.get('/webproperties/' + webprop.id + '/campaigns/' + campaign.id + '/experiences/' + "wat")
				.set('Bearer', token)
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body).to.be.instanceOf(Array);
					done();
				})
		})
	})
});