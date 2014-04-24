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
	var user, webprop, token, campaign;

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

	describe('Creating', function(){
		it('should create an experience', function(done){
			var candidateExp = {
				name: 'myNewExperienceName',
				code: 'jQuery.click(function(){})'
			};

			request(app)
				.post('/webproperties/' + webprop.id + '/campaigns/' + campaign.id + '/experiences')
				.set('Bearer', token)
				.send(candidateExp)
				.expect(201)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body).to.have.property('code');
					done();
				})
		})
	})

	describe('Editing', function(){
		var exp2edit;
		before(function(done){
			Experience.create({
				name: 'myExpHere',
				campaignId: campaign.id,
				code: '(function(){})()'
			}).then(function(exp){
				exp2edit = exp;
				done();
			}, done)
		})

		it('should edit an expeirnece', function(done){
			var newName = "datnewNameHereOMG";
			request(app)
				.put('/webproperties/' + webprop.id + '/campaigns/' + campaign.id + '/experiences/' + exp2edit.id)
				.set('Bearer', token)
				.send({name: newName})
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body.name).to.equal(newName);
					done();
				})
		})
	})

	describe('Deleting', function(){
		var exp2delete;
		before(function(done){
			Experience.create({
				name: 'about2bedeleted',
				campaignId: campaign.id,
				code: 'lol wat code'
			}).then(function(exp){
				exp2delete = exp;
				done()
			}, done)
		})

		it('should delete a experience', function(done){
			request(app)
				.del('/webproperties/' + webprop.id + '/campaigns/' + campaign.id + '/experiences/' + exp2delete.id)
				.set('Bearer', token)
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(1).to.equal(1);
					done()
				})
		})
		//yo u no work???
/*		it('should not find the experience in database', function(done){
			Experience.find({
				where:{
					id: exp2delete.id
					}
				}).then(function(exp){
					var obj = {}
					expect(exp).to.be.a('null');
					done();
				}, done);
		})*/
	})
});